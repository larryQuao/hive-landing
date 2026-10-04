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
    ctaStyle: 'primary',
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
  return (
    <section className="bg-white px-4 pb-24">
      <div className="mx-auto max-w-6xl">
        <p data-reveal className="text-center text-lg text-black-60">
          Find your next property or client in just a few simple steps.
        </p>
        {/* <div data-reveal data-reveal-delay="0.1" className="mt-8 flex items-center justify-center gap-3">
          <span className="text-sm font-medium text-black-50">Start Here</span>
          <button
            type="button"
            aria-label="Toggle"
            onClick={() => setOn((v) => !v)}
            className={`flex h-7 w-14 items-center rounded-full px-1 transition-colors ${
              on ? 'justify-end bg-black-10' : 'justify-start bg-black-20'
            }`}
          >
            <span
              className={`h-6 w-6 rounded-full transition-all ${
                on ? 'bg-primary-100' : 'bg-black-40'
              }`}
            />
          </button>
        </div> */}

        <div data-stagger className="mt-10 grid gap-6 md:grid-cols-2">
          {audiences.map((a) => (
            <article
              key={a.title}
              data-stagger-item
              className={`rounded-[2rem] bg-gradient-to-b from-black-5 to-primary-10/50 p-8 ring-1 ring-black/5 ${
                a.wide ? 'md:col-span-2' : ''
              }`}
            >
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h3 className="text-2xl font-bold text-black-90">{a.title}</h3>
                <p className="mt-1 text-sm text-black-50">{a.subtitle}</p>
                <a
                  href="#"
                  className={`mt-6 block rounded-full py-3.5 text-center text-sm font-semibold shadow-lg transition-transform hover:scale-[1.02] ${
                    a.ctaStyle === 'primary'
                      ? 'bg-gradient-to-b from-primary-75 to-primary-100 text-white shadow-primary-100/40'
                      : 'bg-gradient-to-b from-black-80 to-black-100 text-white shadow-black/20'
                  }`}
                >
                  {a.cta}
                </a>
              </div>
              <div className="px-2 py-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-black-40">
                  Feature Cards :
                </p>
                <ul className="mt-3 space-y-2.5">
                  {a.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-black-70">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-black-90" />
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
