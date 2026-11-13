import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from '@phosphor-icons/react'
import { Link } from 'react-router'
import { Container } from '@/components/layout/container'
import { pageSideGap } from '@/lib/page-width'
import { VERTICALS, verticalHref } from '@/lib/verticals'

gsap.registerPlugin(ScrollTrigger)

/** How close the opened-up row comes to the screen edges, in px. */
const WIDE_GAP = 16

const EASE = 'ease-[cubic-bezier(0.22,1,0.36,1)]'

/** How long each panel stays open while the row plays by itself. */
const AUTOPLAY_MS = 5000

/** Looks like a button; the whole card is the link. */
function LearnMore() {
  return (
    <span className="mt-7 inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-medium text-ink transition-colors group-hover:bg-brand group-hover:text-white">
      Learn more
      <ArrowRight className="h-4 w-4" weight="bold" />
    </span>
  )
}

/**
 * Desktop: one row of tall panels. The open panel is lit and in colour; the
 * rest are dark, muted strips. Hovering or focusing a panel opens it;
 * clicking goes to that vertical's page. While the row is on screen and nobody
 * has touched it, it moves on by itself.
 */
function Panels() {
  const [active, setActive] = useState(0)
  // Visitors who ask for less motion never get the automatic advance.
  const [autoplay, setAutoplay] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [inView, setInView] = useState(false)
  const row = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = row.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.5 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const playing = autoplay && inView
  useEffect(() => {
    if (!playing) return
    const id = window.setTimeout(() => setActive((i) => (i + 1) % VERTICALS.length), AUTOPLAY_MS)
    return () => window.clearTimeout(id)
  }, [playing, active])

  const choose = (i: number) => {
    setAutoplay(false)
    setActive(i)
  }

  return (
    <div ref={row} className="hidden h-[40rem] gap-3 lg:flex">
      {VERTICALS.map((b, i) => {
        const open = i === active
        return (
          <Link
            key={b.name}
            to={verticalHref(b)}
            onMouseEnter={() => choose(i)}
            onFocus={() => choose(i)}
            className={`group relative min-w-0 basis-0 overflow-hidden rounded-3xl bg-ink transition-[flex-grow] duration-[900ms] ${EASE} motion-reduce:transition-none ${
              open ? 'grow-[5]' : 'grow'
            }`}
          >
            <img
              src={b.image}
              alt=""
              loading="lazy"
              className={`absolute inset-0 h-full w-full object-cover transition-[transform,filter] duration-[1400ms] ${EASE} ${
                open ? 'scale-100 grayscale-0' : 'scale-110 grayscale'
              }`}
            />
            <div className={`absolute inset-0 bg-black/55 transition-opacity duration-700 ${open ? 'opacity-0' : 'opacity-100'}`} />
            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent transition-opacity duration-700 ${
                open ? 'opacity-100' : 'opacity-0'
              }`}
            />

            <b.icon className="absolute top-7 left-7 h-8 w-8 text-white" weight="fill" />

            {/* Closed: the name runs up the strip. */}
            <span
              className={`absolute bottom-8 left-1/2 -translate-x-1/2 rotate-180 font-display text-lg font-semibold tracking-[-0.01em] whitespace-nowrap text-white transition-opacity duration-300 [writing-mode:vertical-rl] ${
                open ? 'opacity-0' : 'opacity-100 delay-300'
              }`}
            >
              {b.name}
            </span>

            {/* Open: fixed width so the text doesn't reflow while the panel grows. */}
            <div
              className={`absolute bottom-0 left-0 w-[32rem] max-w-full p-9 text-white transition-all duration-700 ${EASE} ${
                open ? 'translate-y-0 opacity-100 delay-300' : 'pointer-events-none translate-y-6 opacity-0'
              }`}
            >
              <h3 className="text-[2.5rem] leading-[1.05] font-semibold tracking-[-0.035em]">{b.name}</h3>
              <p className="mt-4 max-w-sm text-[17px] leading-relaxed text-white/85">{b.summary}</p>
              <LearnMore />
            </div>

            {/* Fills while the row waits to move on. */}
            {open && playing && (
              <span
                key={active}
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-white/80"
                style={{ animation: `panel-progress ${AUTOPLAY_MS}ms linear forwards` }}
              />
            )}
          </Link>
        )
      })}
    </div>
  )
}

/** Phones and tablets: a sideways swipe row, with the next card peeking in. */
function Carousel() {
  return (
    <div className="-mx-6 lg:hidden">
      <div className="scrollbar-none flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-6 px-6 pb-2">
        {VERTICALS.map((b) => (
          <Link
            key={b.name}
            to={verticalHref(b)}
            className="group relative isolate flex aspect-[4/5] w-[82%] shrink-0 snap-start flex-col justify-end overflow-hidden rounded-3xl bg-ink p-7 text-white sm:w-[46%]"
          >
            <img src={b.image} alt="" loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/55 to-black/10" />
            <b.icon className="absolute top-7 left-7 h-8 w-8" weight="fill" />
            <h3 className="text-[1.75rem] leading-tight font-semibold tracking-[-0.03em]">{b.name}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-white/85">{b.summary}</p>
            <div>
              <LearnMore />
            </div>
          </Link>
        ))}
      </div>
      <p className="mt-4 px-6 text-sm text-ink-soft">Swipe to see all five</p>
    </div>
  )
}

export function WhatWeDo() {
  const row = useRef<HTMLDivElement>(null)

  // Desktop: the row of panels opens out towards the screen edges as it
  // scrolls into view (the hero does the reverse).
  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const pull = () => -(pageSideGap() - WIDE_GAP)
      gsap.fromTo(
        row.current,
        { marginLeft: 0, marginRight: 0 },
        {
          marginLeft: pull,
          marginRight: pull,
          ease: 'none',
          scrollTrigger: { trigger: row.current, start: 'top 90%', end: 'top 25%', scrub: 0.6, invalidateOnRefresh: true },
        },
      )
    })
    return () => mm.revert()
  }, [])

  return (
    <section id="what-we-do" className="py-24 lg:py-36">
      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 data-reveal className="text-[2.25rem] leading-[1.08] font-bold tracking-[-0.04em] text-ink sm:text-5xl lg:col-span-5 lg:text-[3.5rem]">
            What we do
          </h2>
          <p data-reveal data-reveal-delay="0.1" className="max-w-md text-[17px] leading-relaxed text-ink-muted lg:col-span-5 lg:col-start-8">
            Five verticals covering the whole life of a property, all under one name.
          </p>
        </div>

        <div data-reveal className="mt-14 lg:mt-20">
          <div ref={row}>
            <Panels />
          </div>
          <Carousel />
        </div>
      </Container>
    </section>
  )
}
