import { sign } from "node:crypto";

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SHEETS_URL = "https://sheets.googleapis.com/v4/spreadsheets";
const SCOPE = "https://www.googleapis.com/auth/spreadsheets";
const RANGE = "'Leads'!A:F";

type GoogleConfig = {
  email: string;
  privateKey: string;
  spreadsheetId: string;
};

// Values pasted into environment variable settings often keep their
// surrounding quotes or trailing whitespace; normalize before use.
function normalize(value: string | undefined): string {
  return (value ?? "").trim().replace(/^"(.*)"$/s, "$1").trim();
}

export function getGoogleConfig(): GoogleConfig {
  const email = normalize(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL);
  const privateKey = normalize(process.env.GOOGLE_PRIVATE_KEY).replace(
    /\\n/g,
    "\n"
  );
  const spreadsheetId = normalize(process.env.GOOGLE_SHEET_ID);

  // Check that all environment variables exist
  if (!email || !privateKey || !spreadsheetId) {
    throw new Error("Missing Google Sheets environment variables.");
  }

  return { email, privateKey, spreadsheetId };
}

function base64Url(value: string): string {
  return Buffer.from(value).toString("base64url");
}

// Service-account JWT flow, signed locally so the function stays small.
// The full `googleapis` SDK aggregates every Google API (hundreds of MB),
// which is too large to bundle into a serverless function.
async function getAccessToken({
  email,
  privateKey,
}: GoogleConfig): Promise<string> {
  const issuedAt = Math.floor(Date.now() / 1000);
  const header = base64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = base64Url(
    JSON.stringify({
      iss: email,
      scope: SCOPE,
      aud: TOKEN_URL,
      iat: issuedAt,
      exp: issuedAt + 3600,
    })
  );

  const signature = sign(
    "RSA-SHA256",
    Buffer.from(`${header}.${claims}`),
    privateKey
  ).toString("base64url");

  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${header}.${claims}.${signature}`,
    }),
  });

  const data = (await response.json()) as {
    access_token?: string;
    error?: string;
    error_description?: string;
  };

  if (!response.ok || !data.access_token) {
    throw new Error(
      `Google token request failed (${response.status}): ${
        data.error_description ?? data.error ?? "unknown error"
      }`
    );
  }

  return data.access_token;
}

// Cache the token between warm invocations of the same function instance
let cachedToken: { token: string; expiresAt: number } | null = null;

async function getCachedToken(config: GoogleConfig): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now()) {
    return cachedToken.token;
  }

  const token = await getAccessToken(config);

  cachedToken = {
    token,
    expiresAt: Date.now() + 55 * 60_000,
  };

  return token;
}

// Append a single lead row to the 'Leads' sheet
export async function appendLead(values: string[]): Promise<void> {
  const config = getGoogleConfig();
  const token = await getCachedToken(config);

  const range = encodeURIComponent(RANGE);
  const url =
    `${SHEETS_URL}/${config.spreadsheetId}/values/${range}:append` +
    "?valueInputOption=RAW&insertDataOption=INSERT_ROWS";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ values: [values] }),
  });

  if (!response.ok) {
    const detail = await response.text();

    throw new Error(
      `Google Sheets append failed (${response.status}): ${detail.slice(0, 500)}`
    );
  }
}
