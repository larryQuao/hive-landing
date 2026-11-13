import { Check, LinkSimple } from '@phosphor-icons/react'
import { useState } from 'react'
import { siFacebook, siWhatsapp, siX } from 'simple-icons'

/** The site's public address, so shared links point at the live site. */
const SITE_URL = (import.meta.env.VITE_SITE_URL ?? '').replace(/\/$/, '')

const LINKEDIN_PATH =
  'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'

const BUTTON =
  'flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink-muted transition-colors hover:border-ink hover:text-ink'

/** Round buttons to share a post on WhatsApp, LinkedIn, X or Facebook, or copy its link. */
export function ShareLinks({ path, title }: { path: string; title: string }) {
  const [copied, setCopied] = useState(false)
  const url = `${SITE_URL || window.location.origin}${path}`
  const u = encodeURIComponent(url)
  const t = encodeURIComponent(title)

  const targets = [
    { label: 'WhatsApp', href: `https://wa.me/?text=${t}%20${u}`, icon: siWhatsapp.path },
    { label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, icon: LINKEDIN_PATH },
    { label: 'X', href: `https://x.com/intent/post?url=${u}&text=${t}`, icon: siX.path },
    { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, icon: siFacebook.path },
  ]

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <ul className="flex flex-wrap gap-2">
      {targets.map((s) => (
        <li key={s.label}>
          <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`Share on ${s.label}`} className={BUTTON}>
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
              <path d={s.icon} />
            </svg>
          </a>
        </li>
      ))}
      <li>
        <button type="button" onClick={copy} aria-label={copied ? 'Link copied' : 'Copy link'} className={BUTTON}>
          {copied ? <Check className="h-4 w-4 text-brand" weight="bold" /> : <LinkSimple className="h-4 w-4" weight="bold" />}
        </button>
      </li>
    </ul>
  )
}
