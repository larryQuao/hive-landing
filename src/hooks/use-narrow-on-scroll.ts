import { useLayoutEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { pageSideGap } from '@/lib/page-width'

gsap.registerPlugin(ScrollTrigger)

/** Header height: the photo starts right under it. */
const HEADER = 72

/**
 * A page-opening photo that starts edge to edge and, as the visitor scrolls,
 * draws in from the sides with rounding corners until it lines up with the
 * page width. Follows the scroll both ways; off for visitors who ask for less
 * motion. Used by the home hero and the vertical pages.
 */
export function useNarrowOnScroll(ref: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { clipPath: 'inset(0px 0px 0px 0px round 0px)' },
        {
          clipPath: () => `inset(0px ${pageSideGap()}px 0px ${pageSideGap()}px round 32px)`,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: `top ${HEADER}px`,
            end: () => `+=${el.offsetHeight * 0.6}`,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        },
      )
    })
    return () => ctx.revert()
  }, [ref])
}
