import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Scroll motion, driven by data attributes:
 *
 *   data-reveal              fades up a short distance when it enters view
 *   data-reveal-delay="0.1"  extra delay in seconds
 *   data-stagger             its [data-stagger-item] children reveal in turn
 *   data-parallax="-60"      drifts vertically by that many px while scrolling past
 */
export function useSiteAnimations() {
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 16,
          duration: 1.4,
          delay: parseFloat(el.dataset.revealDelay ?? '0'),
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        })
      })

      gsap.utils.toArray<HTMLElement>('[data-stagger]').forEach((group) => {
        const items = group.querySelectorAll('[data-stagger-item]')
        if (!items.length) return
        gsap.from(items, {
          opacity: 0,
          y: 16,
          duration: 1.4,
          ease: 'power2.out',
          stagger: 0.07,
          scrollTrigger: { trigger: group, start: 'top 85%', once: true },
        })
      })

      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
        gsap.fromTo(
          el,
          { y: -parseFloat(el.dataset.parallax ?? '60') / 2 },
          {
            y: parseFloat(el.dataset.parallax ?? '60') / 2,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
      })

    })

    return () => {
      ctx.revert()
      // Leaving the page: don't let ScrollTrigger put back this page's scroll
      // position on top of the next page (which starts at the top).
      ScrollTrigger.clearScrollMemory('manual')
    }
  }, [])
}
