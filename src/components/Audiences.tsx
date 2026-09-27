import { useState } from 'react'

const audiences = [
  {
    title: 'Homeseekers',
    subtitle: 'For Home Buyers & Renters',
    cta: 'Start browsing',
    ctaStyle: 'dark',
    features: [
      'Easily browse listings',
      'Book tours instantly or schedule later',
      'Pay safety with escrow - only pay for what you see',
      'Share a space with co-renters',
      'Access rent financing offers',
    ],
    wide: false,
  },
  {
    title: 'Agent & Agency',
    subtitle: 'List and manage properties and agents effortlessly.',
    cta: 'List Property (Free)',
    ctaStyle: 'violet',
    features: [
      'List properties for free',
      'Manage your portfolio in one place',
      'Track bookings and payments securely',
      'Connect with investors and buyers',
      'Access premium features and CRM',
    ],
    wide: false,
  },
  {
    title: 'Homeowners',
    subtitle: 'Advertise and manage your properties professionally with ease.',
    cta: 'Get Started',
    ctaStyle: 'dark',
    features: [
      'List properties for free',
      'Promote and showcase your listings to the right audience',
      'Manage bookings and tenants seamlessly',
      'Track payments securely',
      'Access premium tools for property management',
    ],
    wide: true,
  },
]

export function Audiences() {
  const [on, setOn] = useState(true)

  return (
    <section className="bg-white px-4 pb-24">
      <div className="mx-auto max-w-6xl">
        <p data-reveal className="text-center text-lg text-gray-600">
          Find your next property or client in just a few simple steps.
        </p>
        <div data-reveal data-reveal-delay="0.1" className="mt-8 flex items-center justify-center gap-3">
          <span className="text-sm font-medium text-gray-500">Start Here</span>
          <button
            type="button"
            aria-label="Toggle"
            onClick={() => setOn((v) => !v)}
            className={`flex h-7 w-14 items-center rounded-full px-1 transition-colors ${
              on ? 'justify-end bg-gray-100' : 'justify-start bg-gray-200'
            }`}
          >
            <span
              className={`h-6 w-6 rounded-full transition-all ${
                on ? 'bg-violet-600' : 'bg-gray-400'
              }`}
            />
          </button>
        </div>

        <div data-stagger className="mt-10 grid gap-6 md:grid-cols-2">
          {audiences.map((a) => (
            <article
              key={a.title}
              data-stagger-item
              className={`rounded-[2rem] bg-gradient-to-b from-gray-50 to-indigo-50/50 p-8 ring-1 ring-black/5 ${
                a.wide ? 'md:col-span-2' : ''
              }`}
            >
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h3 className="text-2xl font-bold text-gray-900">{a.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{a.subtitle}</p>
                <a
                  href="#"
                  className={`mt-6 block rounded-full py-3.5 text-center text-sm font-semibold shadow-lg transition-transform hover:scale-[1.02] ${
                    a.ctaStyle === 'violet'
                      ? 'bg-gradient-to-b from-violet-500 to-violet-600 text-white shadow-violet-500/40'
                      : 'bg-gradient-to-b from-gray-800 to-black text-white shadow-black/20'
                  }`}
                >
                  {a.cta}
                </a>
              </div>
              <div className="px-2 py-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Feature Cards :
                </p>
                <ul className="mt-3 space-y-2.5">
                  {a.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-900" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
