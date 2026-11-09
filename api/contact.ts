/**
 * Contact form endpoint for Vercel and `pnpm dev`. The real work is in
 * server/contact.ts, shared with the Cloudflare worker.
 */
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { submitContact } from '../server/contact'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const result = await submitContact(req.method, req.body, process.env)
  return res.status(result.status).json(result.body)
}
