import { Eye, HeartHandshake, TrendingUp } from 'lucide-react'

const values = [
  {
    icon: Eye,
    title: 'Transparency',
    body: 'Verified listings, clear pricing, and honest process steps at every stage of your property journey.',
  },
  {
    icon: HeartHandshake,
    title: 'Accessibility',
    body: 'From first-time renters to seasoned investors, we open the real estate market to everyone.',
  },
  {
    icon: TrendingUp,
    title: 'Data-driven decisions',
    body: 'Real-time market insights power every listing, tour, and transaction on the platform.',
  },
]

export function AboutUs() {
  return (
    <section id="about" className="relative overflow-hidden bg-white px-4 py-24">
      {/* soft background accents */}
      <div aria-hidden="true" className="absolute -left-32 top-24 h-80 w-80 rounded-full bg-primary-10 blur-3xl" />
      <div aria-hidden="true" className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-primary-30/60 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <span
            data-reveal
            className="inline-flex items-center rounded-full bg-primary-10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary-100"
          >
            About Us
          </span>
          <h2
            data-reveal
            data-reveal-delay="0.1"
            className="mt-6 text-4xl font-extrabold tracking-tight text-black-90 sm:text-5xl"
          >
            Real estate, rebuilt around people
          </h2>
          <p data-reveal data-reveal-delay="0.2" className="mt-5 leading-relaxed text-black-60">
            Hive centralizes the entire real estate process into one transparent, accessible,
            data-driven platform&mdash;empowering home seekers, agents, homeowners, and investors
            to unlock opportunity across the market.
          </p>
        </div>

        <div data-stagger className="mt-14 grid gap-6 md:grid-cols-3">
          {values.map((value) => (
            <article
              key={value.title}
              data-stagger-item
              className="rounded-3xl bg-white p-7 shadow-xl shadow-black/5 ring-1 ring-black/5"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-75 to-primary-100 text-white shadow-md shadow-primary-100/30">
                <value.icon className="h-5 w-5" strokeWidth={2.25} />
              </span>
              <h3 className="mt-5 text-lg font-bold text-black-90">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-black-50">{value.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
