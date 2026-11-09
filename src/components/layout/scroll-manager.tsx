import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'

/**
 * Scrolling between pages: a new page starts at the top, and a link with a
 * section (/#contact) lands on that section, gliding there when it's already
 * on the same page.
 */
export function ScrollManager() {
  const { pathname, hash, key } = useLocation()
  const lastPath = useRef(pathname)

  useEffect(() => {
    const samePage = lastPath.current === pathname
    lastPath.current = pathname
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const behavior: ScrollBehavior = samePage && !calm ? 'smooth' : 'instant'

    if (hash) {
      // Wait a frame so the new page's sections exist.
      requestAnimationFrame(() => document.querySelector(hash)?.scrollIntoView({ behavior }))
    } else if (!samePage) {
      // Switch off the site-wide smooth scrolling for this jump, so a glide
      // still in progress can't carry the new page away from the top.
      const root = document.documentElement
      root.style.scrollBehavior = 'auto'
      window.scrollTo(0, 0)
      requestAnimationFrame(() => {
        window.scrollTo(0, 0)
        root.style.scrollBehavior = ''
      })
    }
  }, [pathname, hash, key])

  return null
}
