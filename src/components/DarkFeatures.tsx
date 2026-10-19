import modernPropertyUrl from '../assets/modernProperty.png'
import secureFinancialGrowthUrl from '../assets/secureFinancialGrowth.png'

export function DarkFeatures() {
  return (
    <section className="px-4 pb-8 pt-10">
      <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-black-90 px-6 py-20 sm:px-12">
        <h2 data-reveal className="mx-auto max-w-3xl text-center text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Maximize Revenue from Every Listing
        </h2>

        <div data-stagger className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2">
          {/* Card 1: List Property for Free */}
          <article data-stagger-item className="rounded-3xl bg-black-80 p-5 ring-1 ring-white/10">
            <div className="relative h-64 overflow-hidden rounded-2xl bg-black-90 p-4">
              <img
                src={modernPropertyUrl}
                alt="Modern property listed on Hive"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold text-white">List Property for Free</h3>
              <p className="mt-2 text-sm leading-relaxed text-black-40">
                Maximize earnings and gain access to renters, investors and buyers effortlessly.
              </p>
            </div>
          </article>

          {/* Card 2: Track and Control Every Revenue */}
          <article data-stagger-item className="relative rounded-3xl bg-black-80 p-5 ring-1 ring-white/10">
            <div className="relative h-64 overflow-hidden rounded-2xl bg-black-90 p-4">
              <img
                src={secureFinancialGrowthUrl}
                alt="Secure financial growth tracking on Hive"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold text-white">Track and Control Every Revenue</h3>
              <p className="mt-2 text-sm leading-relaxed text-black-40">
                Track and manage payments securely—all in one seamless platform.
              </p>
            </div>
          </article>
        </div>

        <div className="h-32" />
      </div>
    </section>
  )
}
