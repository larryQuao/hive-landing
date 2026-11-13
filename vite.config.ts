import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { defineConfig, loadEnv, normalizePath, type Plugin } from 'vite'

const MAX_BODY_BYTES = 1_000_000

function sendJson(res: ServerResponse, statusCode: number, payload: unknown) {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(payload))
}

function readBody(req: IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    let size = 0

    req.on('data', (chunk: Buffer) => {
      size += chunk.length

      if (size > MAX_BODY_BYTES) {
        reject(new Error('Request body is too large.'))
        req.destroy()
        return
      }

      chunks.push(chunk)
    })

    req.on('end', () => {
      const raw = Buffer.concat(chunks).toString('utf8')

      if (!raw) {
        resolve({})
        return
      }

      try {
        resolve(JSON.parse(raw))
      } catch {
        reject(new Error('Request body must be valid JSON.'))
      }
    })

    req.on('error', reject)
  })
}

// Serves the Vercel serverless handlers in `api/` during `vite dev`, so
// form submissions work locally the same way they do in production.
function apiDevServer(): Plugin {
  return {
    name: 'api-dev-server',
    apply: 'serve',
    configureServer(server) {
      const env = loadEnv(
        server.config.mode,
        server.config.envDir || server.config.root,
        ''
      )

      for (const [key, value] of Object.entries(env)) {
        if (key.startsWith('GOOGLE_') && !process.env[key]) {
          process.env[key] = value
        }
      }

      server.middlewares.use(async (req, res, next) => {
        const pathname = new URL(req.url ?? '/', 'http://localhost').pathname

        if (!pathname.startsWith('/api/')) {
          next()
          return
        }

        const route = pathname.slice('/api/'.length)

        if (!/^[a-z0-9_-]+$/i.test(route)) {
          sendJson(res, 404, { success: false, message: 'Not found.' })
          return
        }

        const filePath = `${server.config.root}/api/${route}.ts`

        if (!existsSync(filePath)) {
          sendJson(res, 404, { success: false, message: 'Not found.' })
          return
        }

        try {
          const body = await readBody(req)
          const apiModule = await server.ssrLoadModule(normalizePath(filePath))
          const handler = apiModule.default as (
            request: {
              method?: string
              body: unknown
              headers: IncomingMessage['headers']
            },
            response: unknown
          ) => unknown

          // Minimal VercelResponse shim for the handlers
          const vercelResponse = {
            status(code: number) {
              res.statusCode = code
              return vercelResponse
            },
            json(payload: unknown) {
              sendJson(res, res.statusCode, payload)
              return vercelResponse
            },
          }

          await handler(
            { method: req.method, body, headers: req.headers },
            vercelResponse
          )

          if (!res.writableEnded) {
            res.end()
          }
        } catch (error) {
          console.error(`[api-dev-server] ${pathname} failed:`, error)

          if (!res.headersSent) {
            sendJson(res, 500, {
              success: false,
              message: 'Unable to submit your request. Please try again.',
            })
          }
        }
      })
    },
  }
}

// Vertical addresses come from the slugs in src/lib/verticals.ts, so the
// sitemap stays in step with the site without importing app code here.
const VERTICAL_SLUGS = [
  ...readFileSync(new URL('./src/lib/verticals.ts', import.meta.url), 'utf8').matchAll(/slug: '([a-z0-9-]+)'/g),
].map((m) => m[1])

/** Blog post addresses: one per file in src/content/blog, named after its slug. */
const POST_SLUGS = readdirSync(new URL('./src/content/blog', import.meta.url))
  .filter((name) => name.endsWith('.tsx'))
  .map((name) => name.replace(/\.tsx$/, ''))

/** Pages on the site, for the sitemap. Add new pages from src/routes.tsx here too. */
const PAGES = [
  '/',
  ...VERTICAL_SLUGS.map((slug) => `/verticals/${slug}`),
  '/blog',
  ...POST_SLUGS.map((slug) => `/blog/${slug}`),
  '/privacy',
]

// Fills in the site's public address (VITE_SITE_URL) where search engines and
// link previews need a full URL, and writes robots.txt and sitemap.xml.
function siteMeta(siteUrl: string): Plugin {
  return {
    name: 'site-meta',
    transformIndexHtml: (html) => html.replaceAll('__SITE_URL__', siteUrl),
    generateBundle() {
      if (!siteUrl) {
        this.warn('VITE_SITE_URL is not set: link previews and the sitemap need the site\'s full address.')
      }
      const sitemap = siteUrl ? `Sitemap: ${siteUrl}/sitemap.xml\n` : ''
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\n${sitemap}` })
      if (siteUrl) {
        const urls = PAGES.map((p) => `  <url><loc>${siteUrl}${p}</loc></url>`).join('\n')
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
        })
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const siteUrl = (loadEnv(mode, process.cwd(), '').VITE_SITE_URL ?? '').replace(/\/$/, '')
  return {
    plugins: [react(), tailwindcss(), apiDevServer(), siteMeta(siteUrl)],
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
  }
})
