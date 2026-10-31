import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { existsSync } from 'node:fs'
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

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), apiDevServer()],
})
