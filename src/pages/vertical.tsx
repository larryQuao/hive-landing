import { ArrowLeft, ArrowRight, ArrowUpRight } from '@phosphor-icons/react'
import { useRef } from 'react'
import { Link, useParams } from 'react-router'
import { Container } from '@/components/layout/container'
import { PageMeta } from '@/components/seo/page-meta'
import { useNarrowOnScroll } from '@/hooks/use-narrow-on-scroll'
import { NotFoundPage } from '@/pages/not-found'
import { VERTICALS, verticalHref, type Vertical } from '@/lib/verticals'

/** The button to the vertical's own site. */
function Action({ v, tone }: { v: Vertical; tone: 'light' | 'brand' }) {
  const style =
    tone === 'light'
      ? 'bg-white text-ink hover:bg-brand hover:text-white'
      : 'bg-brand text-white hover:bg-brand-hover'
  const base = `inline-flex h-12 w-fit shrink-0 items-center gap-2 rounded-full px-7 text-[15px] font-medium transition-colors ${style}`

  return (
    <a
      href={v.href}
      // Placeholder '#' links stay in this tab; real addresses open in a new one.
      {...(v.href !== '#' && { target: '_blank', rel: 'noopener noreferrer' })}
      className={base}
    >
      Visit {v.name}
      <ArrowUpRight className="h-4 w-4" weight="bold" />
    </a>
  )
}

/** One vertical's page: a full photo opening, what it is, what it offers, then onward. */
export function VerticalPage() {
  const { slug } = useParams()
  const photo = useRef<HTMLDivElement>(null)
  useNarrowOnScroll(photo)
  const index = VERTICALS.findIndex((v) => v.slug === slug)
  if (index === -1) return <NotFoundPage />
  const v = VERTICALS[index]
  const next = VERTICALS[(index + 1) % VERTICALS.length]

  return (
    <main className="pt-[72px]">
        <PageMeta title={v.name} description={`${v.name}, a vertical of Hive Agency Ltd. ${v.summary}`} />
        {/* Opening: the photo carries the page, edge to edge, narrowing on scroll. */}
        <div ref={photo} className="relative isolate h-[calc(100svh-72px)] min-h-[32rem] max-h-[60rem] overflow-hidden bg-ink text-white">
          <img key={v.slug} src={v.image} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />

          {/* Words sit within the page width, so they stay put as the photo narrows. */}
          <Container className="h-full">
            <div className="flex h-full flex-col justify-between p-7 sm:p-10 lg:p-14">
              <Link
                to="/#what-we-do"
                className="inline-flex w-fit items-center gap-2 text-sm text-white/80 transition-colors hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" weight="bold" />
                All verticals
              </Link>

              <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <v.icon className="h-14 w-14 lg:h-20 lg:w-20" weight="fill" />
                  <h1 className="mt-6 text-[2.75rem] leading-[1.02] font-bold tracking-[-0.045em] sm:text-7xl lg:text-[6rem]">
                    {v.name}
                    <span className="text-brand">.</span>
                  </h1>
                </div>
                <Action v={v} tone="light" />
              </div>
            </div>
          </Container>
        </div>

        {/* The statement. */}
        <Container className="py-24 lg:py-36">
          <p className="max-w-5xl font-display text-[1.75rem] leading-[1.2] font-semibold tracking-[-0.03em] text-ink sm:text-[2.25rem] lg:text-[3rem]">
            {v.intro}
          </p>
        </Container>

        {v.points && (
          <Container className="grid gap-12 border-t border-line pt-16 pb-24 lg:grid-cols-12 lg:pt-20 lg:pb-36">
            <h2 className="text-[2rem] leading-[1.1] font-bold tracking-[-0.04em] text-ink sm:text-4xl lg:col-span-4 lg:text-[2.75rem]">
              What it offers
            </h2>
            <ul className="grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:col-span-8">
              {v.points.map(({ icon: Icon, text }) => (
                <li key={text}>
                  <Icon className="h-12 w-12 text-brand lg:h-14 lg:w-14" weight="fill" />
                  <p className="mt-5 max-w-sm text-[17px] leading-relaxed text-ink">{text}</p>
                </li>
              ))}
            </ul>
          </Container>
        )}

        {/* Closing: one clear next step. */}
        <Container className="pb-24 lg:pb-32">
          <div className="flex flex-col gap-8 rounded-[2rem] bg-[#f4f5f7] p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between lg:p-16">
            <p className="text-[2rem] leading-[1.1] font-bold tracking-[-0.04em] text-ink sm:text-4xl lg:text-[2.75rem] font-display">
              Explore {v.name}
            </p>
            <Action v={v} tone="brand" />
          </div>
        </Container>

        {/* Onward to the next vertical, so visitors can browse them in turn. */}
        <Link to={verticalHref(next)} className="group block border-t border-line">
          <Container className="flex items-center justify-between gap-6 py-12 lg:py-16">
            <span className="flex items-center gap-5 lg:gap-7">
              <next.icon className="h-11 w-11 shrink-0 text-ink transition-colors group-hover:text-brand lg:h-14 lg:w-14" weight="fill" />
              <span>
                <span className="block text-sm text-ink-soft">Next vertical</span>
                <span className="mt-1 block font-display text-[2rem] leading-tight font-bold tracking-[-0.04em] text-ink transition-colors group-hover:text-brand sm:text-4xl lg:text-5xl">
                  {next.name}
                </span>
              </span>
            </span>
            <ArrowRight
              className="h-8 w-8 shrink-0 text-ink transition-transform group-hover:translate-x-1 group-hover:text-brand"
              weight="light"
            />
          </Container>
        </Link>
    </main>
  )
}
