/**
 * Cloudflare entry point (see wrangler.jsonc). The built site in dist/ is
 * served by Cloudflare directly; only /api/* requests reach this code.
 */
import { submitContact, type ContactEnv } from '../server/contact'

type Env = ContactEnv & {
  /** The built site, for anything that isn't an API route. */
  ASSETS: { fetch(request: Request): Promise<Response> }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url)

    if (pathname === '/api/contact') {
      const body = request.method === 'POST' ? await request.json().catch(() => ({})) : {}
      const result = await submitContact(request.method, body, env)
      return Response.json(result.body, { status: result.status })
    }

    if (pathname.startsWith('/api/')) {
      return Response.json({ success: false, message: 'Not found.' }, { status: 404 })
    }

    return env.ASSETS.fetch(request)
  },
}
