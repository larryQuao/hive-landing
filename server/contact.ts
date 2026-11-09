/**
 * The contact form's server side: checks a message and adds it as a row to
 * the team's Google Sheet. Written with web-standard APIs only (fetch,
 * WebCrypto), so the same code runs on Cloudflare (worker/index.ts), on
 * Vercel (api/contact.ts) and in `pnpm dev`.
 */

const TOKEN_URL = 'https://oauth2.googleapis.com/token'
const SHEETS_URL = 'https://sheets.googleapis.com/v4/spreadsheets'
const SHEET_RANGE = "'Leads'!A:F"
const SCOPE = 'https://www.googleapis.com/auth/spreadsheets'

export type ContactEnv = {
  GOOGLE_SERVICE_ACCOUNT_EMAIL?: string
  GOOGLE_PRIVATE_KEY?: string
  GOOGLE_SHEET_ID?: string
}

export type ContactResult = {
  status: number
  body: { success: boolean; message: string }
}

type GoogleConfig = { email: string; privateKey: string; spreadsheetId: string }

class ConfigError extends Error {}

/** Trims text from the form and caps its length. */
function clean(value: unknown, maxLength: number): string {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

/** Values pasted into hosting settings often keep their quotes or trailing spaces. */
function normalize(value: string | undefined): string {
  return (value ?? '').trim().replace(/^"(.*)"$/s, '$1').trim()
}

function getGoogleConfig(env: ContactEnv): GoogleConfig {
  const email = normalize(env.GOOGLE_SERVICE_ACCOUNT_EMAIL)
  const privateKey = normalize(env.GOOGLE_PRIVATE_KEY).replace(/\\n/g, '\n')
  const spreadsheetId = normalize(env.GOOGLE_SHEET_ID)
  if (!email || !privateKey || !spreadsheetId) {
    throw new ConfigError('Missing Google Sheets environment variables.')
  }
  return { email, privateKey, spreadsheetId }
}

function base64Url(bytes: Uint8Array): string {
  let binary = ''
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

const encodeJson = (value: unknown) => base64Url(new TextEncoder().encode(JSON.stringify(value)))

/** Turns the PEM private key from Google's JSON key file into a signing key. */
async function importPrivateKey(pem: string) {
  const der = Uint8Array.from(
    atob(pem.replace(/-----(BEGIN|END) PRIVATE KEY-----/g, '').replace(/\s+/g, '')),
    (c) => c.charCodeAt(0),
  )
  return crypto.subtle.importKey('pkcs8', der, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['sign'])
}

/** Service-account sign-in: a signed token exchanged for a short-lived access token. */
async function getAccessToken({ email, privateKey }: GoogleConfig): Promise<string> {
  const issuedAt = Math.floor(Date.now() / 1000)
  const unsigned = `${encodeJson({ alg: 'RS256', typ: 'JWT' })}.${encodeJson({
    iss: email,
    scope: SCOPE,
    aud: TOKEN_URL,
    iat: issuedAt,
    exp: issuedAt + 3600,
  })}`

  const key = await importPrivateKey(privateKey)
  const signature = new Uint8Array(
    await crypto.subtle.sign('RSASSA-PKCS1-v1_5', key, new TextEncoder().encode(unsigned)),
  )

  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${unsigned}.${base64Url(signature)}`,
    }),
  })

  const data = (await response.json()) as { access_token?: string; error?: string; error_description?: string }
  if (!response.ok || !data.access_token) {
    throw new Error(
      `Google token request failed (${response.status}): ${data.error_description ?? data.error ?? 'unknown error'}`,
    )
  }
  return data.access_token
}

// Reused while the same server instance stays warm.
let cachedToken: { token: string; expiresAt: number } | null = null

async function getCachedToken(config: GoogleConfig): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now()) return cachedToken.token
  const token = await getAccessToken(config)
  cachedToken = { token, expiresAt: Date.now() + 55 * 60_000 }
  return token
}

/** Adds one row to the 'Leads' sheet. */
async function appendLead(env: ContactEnv, values: string[]): Promise<void> {
  const config = getGoogleConfig(env)
  const token = await getCachedToken(config)
  const url =
    `${SHEETS_URL}/${config.spreadsheetId}/values/${encodeURIComponent(SHEET_RANGE)}:append` +
    '?valueInputOption=RAW&insertDataOption=INSERT_ROWS'

  const response = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ values: [values] }),
  })
  if (!response.ok) {
    const detail = await response.text()
    throw new Error(`Google Sheets append failed (${response.status}): ${detail.slice(0, 500)}`)
  }
}

/** Handles one form submission: the request's method and parsed JSON body. */
export async function submitContact(method: string | undefined, body: unknown, env: ContactEnv): Promise<ContactResult> {
  if (method !== 'POST') {
    return { status: 405, body: { success: false, message: 'Method not allowed.' } }
  }

  const form = (body && typeof body === 'object' ? body : {}) as Record<string, unknown>

  // Honeypot: people never fill the hidden "website" field, bots do.
  if (form.website) {
    return { status: 200, body: { success: true, message: 'Submission received.' } }
  }

  const fullName = clean(form.fullName, 150)
  const email = clean(form.email, 254).toLowerCase()
  const message = clean(form.message, 5000)

  if (!fullName || !email || !message) {
    return { status: 400, body: { success: false, message: 'Please complete all required fields.' } }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: 400, body: { success: false, message: 'Please provide a valid email address.' } }
  }

  try {
    await appendLead(env, [crypto.randomUUID(), new Date().toISOString(), fullName, email, message, 'New'])
    return { status: 200, body: { success: true, message: 'Your message has been submitted successfully!' } }
  } catch (error) {
    console.error('Contact form submission error:', error)
    // Missing settings are a hosting problem, not the visitor's.
    return error instanceof ConfigError
      ? {
          status: 503,
          body: { success: false, message: 'The contact form is not configured yet. Please email us directly instead.' },
        }
      : { status: 500, body: { success: false, message: 'Unable to submit your message. Please try again.' } }
  }
}
