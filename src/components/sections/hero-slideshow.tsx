import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowUpRight } from '@phosphor-icons/react'
import { Link } from 'react-router'
import { Container } from '@/components/layout/container'
import { VERTICALS, verticalHref } from '@/lib/verticals'

/** How long each photo stays before the next one fades in. */
const HOLD_MS = 5500
const FADE_MS = 1600

/**
 * The hero's photo backdrop: slowly cross-fades through the verticals, each drifting in a
 * little while it's shown, with its name in the top corner linking to its page.
 * Pauses when off screen; a single still photo for visitors who ask for less
 * motion. Anything passed as children sits on top of the photos.
 */
export function HeroSlideshow({ className = '', children }: { className?: string; children?: ReactNode }) {
  const [calm] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [active, setActive] = useState(0)
  const [previous, setPrevious] = useState<number | null>(null)
  const [inView, setInView] = useState(true)
  const frame = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = frame.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const playing = !calm && inView
  useEffect(() => {
    if (!playing) return
    const id = window.setTimeout(() => {
      setPrevious(active)
      setActive((active + 1) % VERTICALS.length)
    }, HOLD_MS)
    return () => window.clearTimeout(id)
  }, [playing, active])

  const current = VERTICALS[active]

  return (
    <div ref={frame} className={`relative isolate overflow-hidden bg-ink ${className}`}>
      {VERTICALS.map((v, i) => {
        const shown = i === active
        // The outgoing photo keeps drifting while it fades, so it never jumps.
        const drifting = !calm && (shown || i === previous)
        return (
          <img
            key={v.slug}
            src={v.image}
            alt=""
            fetchPriority={i === 0 ? 'high' : 'low'}
            className="absolute inset-0 -z-10 h-full w-full object-cover transition-opacity ease-in-out"
            style={{
              opacity: shown ? 1 : 0,
              transitionDuration: `${FADE_MS}ms`,
              animation: drifting ? `hero-drift ${HOLD_MS + FADE_MS * 2}ms linear forwards` : undefined,
            }}
          />
        )
      })}

      {/* A soft shade at the top so the label reads on any photo. */}
      <div className="absolute inset-x-0 top-0 -z-10 h-2/5 bg-gradient-to-b from-black/60 to-transparent" />

      {/* Top corner, so it's in view on the first screen. Lined up with the page
          width, so it stays put while the hero narrows on scroll. */}
      <div className="absolute inset-x-0 top-0">
        <Container>
          <div className="px-7 pt-7 sm:px-10 sm:pt-10 lg:px-14">
        <Link
          to={verticalHref(current)}
          className="group inline-flex items-center gap-1.5 font-display text-lg font-semibold tracking-[-0.02em] text-white"
        >
          {current.name}
          <ArrowUpRight weight="bold" className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
        {/* Fills while the photo waits to move on. */}
        <div className="mt-3 h-[2px] w-28 overflow-hidden rounded-full bg-white/30">
          {playing && (
            <span
              key={active}
              aria-hidden="true"
              className="block h-full origin-left bg-white"
              style={{ animation: `panel-progress ${HOLD_MS}ms linear forwards` }}
            />
          )}
        </div>
          </div>
        </Container>
      </div>

      {children}
    </div>
  )
}
