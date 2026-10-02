import { AppMockup } from './AppMockup'

const steps = [
  {
    n: '01',
    title: 'Discover Properties',
    body: 'Search, browse, and compare listings. Connect with verified agents and landlords effortlessly.',
  },
  {
    n: '02',
    title: 'Secure Transactions',
    body: 'Pay rent, buy, or co-rent safely with escrow-protected payments.',
  },
  {
    n: '03',
    title: 'Invest & Grow',
    body: 'Access property investments, track your portfolio, and watch dividends grow seamlessly.',
  },
]

export function Steps() {
  return (
    <section className="bg-white px-4 pb-24 pt-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <h2 data-reveal="left" className="text-4xl font-extrabold tracking-tight text-black-90 sm:text-5xl">
            Simplify Your Real Estate Experience
          </h2>
          <ol data-stagger className="space-y-10">
            {steps.map((step) => (
              <li key={step.n} data-stagger-item className="flex gap-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black-10 text-sm font-bold text-black-70">
                  {step.n}
                </span>
                <div>
                  <h3 className="text-xl font-bold text-black-90">{step.title}</h3>
                  <p className="mt-1.5 max-w-lg leading-relaxed text-black-50">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* App preview inside a large soft card */}
        <div data-reveal="scale" className="mt-20 rounded-[2.5rem] bg-gradient-to-b from-black-5 to-primary-10/60 p-6 sm:p-14">
          <AppMockup className="mx-auto max-w-3xl" />
          <p className="mt-10 text-center text-sm text-black-50">
            Available on the Web now. Coming soon on PlayStore.&rdquo;
          </p>
        </div>
      </div>
    </section>
  )
}
