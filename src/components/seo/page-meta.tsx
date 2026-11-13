import { useEffect } from 'react'
import { useLocation } from 'react-router'

const SITE = 'Hive Agency Ltd'
const DEFAULT_TITLE = `${SITE} · Simpler, transparent, smarter real estate`
const DEFAULT_DESCRIPTION =
  'Hive Agency Ltd is a real estate company in Accra, bringing renting, buying, investing, financing and property services together under one name.'

/** The site's public address (VITE_SITE_URL), for the page's canonical link. */
const SITE_URL = (import.meta.env.VITE_SITE_URL ?? '').replace(/\/$/, '')

/** Updates a tag that index.html already has (so there's only ever one). */
function setAttr(selector: string, attr: string, value: string) {
  document.head.querySelector(selector)?.setAttribute(attr, value)
}

/**
 * Sets the current page's title, description and address in the document
 * head. index.html holds the defaults (what link previews read); each page
 * renders this to describe itself.
 */
export function PageMeta({ title, description = DEFAULT_DESCRIPTION }: { title?: string; description?: string }) {
  const { pathname } = useLocation()

  useEffect(() => {
    const fullTitle = title ? `${title} · ${SITE}` : DEFAULT_TITLE
    document.title = fullTitle
    setAttr('meta[name="description"]', 'content', description)
    setAttr('meta[property="og:title"]', 'content', fullTitle)
    setAttr('meta[property="og:description"]', 'content', description)
    if (SITE_URL) {
      setAttr('link[rel="canonical"]', 'href', `${SITE_URL}${pathname}`)
      setAttr('meta[property="og:url"]', 'content', `${SITE_URL}${pathname}`)
    }
  }, [title, description, pathname])

  return null
}
