import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { Link } from 'react-router'
import { Container } from '@/components/layout/container'
import { HeroSlideshow } from '@/components/sections/hero-slideshow'
import { useNarrowOnScroll } from '@/hooks/use-narrow-on-scroll'

/**
 * The first screen: the verticals' photos fill it edge to edge, with the
 * headline, a short introduction and the main actions over them. As the
 * visitor scrolls, the photo draws in from the sides and its corners round
 * until it lines up with the rest of the page.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null)
  const photo = useRef<HTMLDivElement>(null)
  useNarrowOnScroll(photo)

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-hero-photo]', { opacity: 0, duration: 1.4 })
        .from('[data-hero-in]', { opacity: 0, y: 20, duration: 1.1, stagger: 0.1 }, 0.3)

    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="pt-[72px]">
      <div ref={photo} data-hero-photo>
        <HeroSlideshow className="h-[calc(100svh-72px)] min-h-[36rem] max-h-[64rem]">
          {/* Shade under the words, so they read on every photo. */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />

          {/* Words sit within the page width, so they stay put as the photo narrows. */}
          <div className="absolute inset-x-0 bottom-0 text-white">
            <Container>
              <div className="px-7 pb-8 sm:px-10 sm:pb-10 lg:px-14 lg:pb-14">
                <h1
                  data-hero-in
                  className="max-w-[15ch] text-[2.75rem] leading-[1.02] font-bold tracking-[-0.045em] sm:text-7xl lg:max-w-none lg:text-[5.25rem] xl:text-[5.75rem]"
                >
                  Simpler, transparent, smarter real estate<span className="text-brand">.</span>
                </h1>

                <div className="mt-6 flex flex-col gap-8 lg:mt-10 lg:flex-row lg:items-end lg:justify-between">
                  <p data-hero-in className="max-w-md text-[17px] leading-relaxed text-white/85">
                    Hive Agency Ltd is a real estate company in Accra. We bring renting, buying, investing,
                    financing and property services together under one name people can trust.
                  </p>
                  <div data-hero-in className="flex shrink-0 flex-wrap items-center gap-x-6 gap-y-3 text-[15px]">
                    <Link
                      to="/#what-we-do"
                      className="inline-flex h-12 items-center rounded-full bg-brand px-6 font-medium text-white transition-colors hover:bg-brand-hover"
                    >
                      What we do
                    </Link>
                    <Link
                      to="/#contact"
                      className="font-medium text-white underline decoration-white/40 underline-offset-[6px] transition-colors hover:decoration-white"
                    >
                      Get in touch
                    </Link>
                  </div>
                </div>
              </div>
            </Container>
          </div>
        </HeroSlideshow>
      </div>
    </section>
  )
}
