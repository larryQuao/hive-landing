import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { AppMockup } from './AppMockup'

/** CSS-drawn mockup of the Hive dashboard / booking screen. */
function DashboardMockup({ className = '' }: { className?: string }) {
  return (
    <div className={`overflow-hidden rounded-xl bg-white shadow-2xl shadow-indigo-950/20 ${className}`}>
      <div className="flex items-center justify-between px-3 py-2">
        <span className="text-[10px] font-extrabold text-gray-900">
          H<span className="text-blue-500">i</span>ve
        </span>
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-gray-200" />
          <span className="h-2 w-2 rounded-full bg-gray-200" />
          <span className="h-2 w-2 rounded-full bg-blue-400" />
        </div>
      </div>
      <div className="grid grid-cols-[1fr_1.4fr] gap-2 px-3 pb-3">
        <div className="space-y-2">
          <div className="h-14 rounded-md bg-gradient-to-br from-[#c9b8a0] to-[#a5947e]" />
          <div className="rounded-md border border-gray-100 p-2">
            <p className="text-[7px] font-bold text-gray-800">Book a property here</p>
            <div className="mt-1.5 space-y-1">
              <div className="h-2.5 rounded bg-gray-100" />
              <div className="h-2.5 rounded bg-gray-100" />
            </div>
            <div className="mt-1.5 flex justify-end">
              <span className="rounded bg-blue-500 px-1.5 py-0.5 text-[6px] text-white">Book</span>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-2.5 w-3/4 rounded bg-gray-100" />
          <div className="h-2.5 w-1/2 rounded bg-gray-100" />
          {/* map */}
          <div className="relative h-24 rounded-md bg-[#e8eef2]">
            <div className="absolute left-2 right-2 top-1/2 h-0.5 -rotate-6 rounded bg-amber-300/70" />
            <div className="absolute left-1/2 top-1/2 h-0 w-0 -translate-x-1/2 -translate-y-full border-x-[4px] border-b-[8px] border-x-transparent border-b-blue-500" />
            <div className="absolute left-4 top-4 h-2 w-2 rounded-full border-2 border-white bg-red-400" />
            <div className="absolute bottom-3 right-5 h-2 w-2 rounded-full border-2 border-white bg-red-400" />
            <div className="absolute bottom-8 left-6 h-2 w-2 rounded-full border-2 border-white bg-red-400" />
            <div className="absolute bottom-4 right-10 h-2 w-2 rounded-full border-2 border-white bg-blue-400" />
          </div>
          <div className="h-2.5 w-2/3 rounded bg-gray-100" />
          <div className="grid grid-cols-3 gap-1.5">
            <div className="h-6 rounded bg-gray-100" />
            <div className="h-6 rounded bg-gray-100" />
            <div className="h-6 rounded bg-gray-100" />
          </div>
        </div>
      </div>
    </div>
  )
}

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
    <section ref={root} className="relative overflow-hidden bg-gradient-to-b from-white via-[#e6e0fa] to-[#cfc3f5] px-4 pb-24 pt-32 sm:pt-40">
      <div className="mx-auto max-w-5xl text-center">
        <div data-hero-badge className="inline-flex items-center gap-2 rounded-full bg-white p-1 pr-4 shadow-md shadow-black/5">
          <span className="rounded-full bg-gray-900 px-3 py-1 text-xs font-semibold text-white">New</span>
          <span className="text-sm font-medium text-gray-700">Real estate, Done right.</span>
        </div>

        <h1
          data-hero-heading
          className="mx-auto mt-8 max-w-4xl text-5xl font-extrabold tracking-tight text-gray-900 sm:text-7xl"
        >
          <span className="block overflow-hidden">
            <span className="block">Make real estate work</span>
          </span>
          <span className="block overflow-hidden">
            <span className="block">for everyone</span>
          </span>
        </h1>

        <p data-hero-copy className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
          Hive centralizes the real estate process, making it transparent, accessible, and
          data-driven infrastructure for real estate transactions—unlocking opportunity across the
          market.
        </p>

        <div data-hero-cta className="mt-10 flex justify-center">
          <a
            href="#"
            className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-b from-violet-500 to-violet-600 px-7 py-4 text-base font-semibold text-white shadow-xl shadow-violet-500/40 ring-1 ring-white/30 transition-transform hover:scale-105"
          >
            Join our Waitlist
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>

      {/* App screenshots */}
      <div className="relative mx-auto mt-16 flex max-w-5xl items-start justify-center gap-0 sm:gap-8">
        <div data-parallax="-40" className="w-full max-w-2xl">
          <div data-hero-shot>
            <AppMockup className="rotate-0 sm:-rotate-2" />
          </div>
        </div>
        <div data-parallax="-90" className="absolute -right-4 top-8 hidden w-64 md:block lg:-right-10">
          <div data-hero-shot>
            <DashboardMockup />
          </div>
        </div>
      </div>
    </section>
  )
}
