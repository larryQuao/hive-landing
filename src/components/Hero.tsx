import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ArrowRight, Bell } from 'lucide-react'
import heroSectionUrl from '../assets/images/Hero-section.png'
import productPageUrl from '../assets/images/product-page.png'

export function Hero() {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('[data-hero-badge]', { opacity: 0, y: 24, duration: 0.7 })
        .from(
          '[data-hero-heading] > span > span',
          { yPercent: 110, duration: 1, stagger: 0.12, ease: 'power4.out' },
          '-=0.3',
        )
        .from('[data-hero-copy]', { opacity: 0, y: 24, duration: 0.8 }, '-=0.5')
        .from('[data-hero-cta]', { opacity: 0, y: 24, duration: 0.8 }, '-=0.55')
        .from(
          '[data-hero-shot]',
          { opacity: 0, y: 80, scale: 0.96, duration: 1.1, stagger: 0.12 },
          '-=0.4',
        )
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="relative overflow-hidden bg-gradient-to-b from-white via-primary-10 to-primary-30 px-4 pb-24 pt-32 sm:pt-40">
      <div className="mx-auto max-w-5xl text-center">
        <div data-hero-badge className="inline-flex items-center gap-2 rounded-full bg-white p-1 pr-4 shadow-md shadow-black/5">
          <span className="rounded-full bg-black-90 px-3 py-1 text-xs font-semibold text-white">New</span>
          <span className="text-sm font-medium text-black-70">Real estate, Done right.</span>
        </div>

        <h1
          data-hero-heading
          className="mx-auto mt-8 max-w-4xl text-5xl font-extrabold tracking-tight text-black-90 sm:text-7xl"
        >
          <span className="block overflow-hidden">
            <span className="block">Make real estate work</span>
          </span>
          <span className="block overflow-hidden">
            <span className="block">for everyone</span>
          </span>
        </h1>

        <p data-hero-copy className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-black-60 sm:text-lg">
          Hive centralizes the real estate process, making it transparent, accessible, and
          data-driven infrastructure for real estate transactions—unlocking opportunity across the
          market.
        </p>

        <div data-hero-cta className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#"
            className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-b from-primary-75 to-primary-100 px-7 py-4 text-base font-semibold text-white shadow-xl shadow-primary-100/40 ring-1 ring-white/30 transition-transform hover:scale-105"
          >
            Explore Hive
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:translate-x-1">
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </span>
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-base font-semibold text-black-90 shadow-md shadow-black/5 ring-1 ring-black-10 transition-colors hover:bg-black-5"
          >
            <Bell className="h-4 w-4 text-black-50" strokeWidth={2.5} />
            Join Waitlist for Hive Invest
          </a>
        </div>
      </div>

      {/* App screenshots */}
      <div className="relative mx-auto mt-16 flex max-w-5xl items-start justify-center gap-0 sm:gap-8">
        <div data-parallax="-40" className="w-full max-w-2xl">
          <div data-hero-shot>
            <img
              src={heroSectionUrl}
              alt="Hive web app home screen"
              className="w-full rotate-0 rounded-xl shadow-2xl shadow-black-90/20 sm:-rotate-2"
            />
          </div>
        </div>
        <div data-parallax="-90" className="absolute -right-4 top-8 hidden w-64 md:block lg:-right-10">
          <div data-hero-shot>
            <img
              src={productPageUrl}
              alt="Hive property listing page"
              className="w-full rounded-xl shadow-2xl shadow-black-90/20"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
