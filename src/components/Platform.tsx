import oneplatformEndlessUrl from '../assets/images/oneplatformendless.png'

export function Platform() {
  return (
    <section className="bg-white px-4 py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        {/* Illustration */}
        <div data-reveal="left" data-parallax="-30" className="rounded-[2.5rem] bg-gradient-to-b from-black-5 to-primary-10/70 p-10">
          <img
            src={oneplatformEndlessUrl}
            alt="Hive Invest, agents, and agencies connected through the Hive platform"
            className="w-full rounded-2xl"
          />
        </div>

        <div data-reveal="right">
          <h2 className="text-4xl font-extrabold tracking-tight text-black-90 sm:text-5xl">
            One Platform, Endless Opportunities
          </h2>
          <a
            href="#"
            className="mt-8 inline-block rounded-full bg-black-90 px-7 py-4 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105"
          >
            List &amp; Earn for Free
          </a>
          <blockquote className="mt-10 max-w-md text-lg leading-relaxed text-black-80">
            &ldquo;I use Hive to manage my bookings, maximize earnings, and fund more developments
            in Accra.—it makes running my portfolio effortless.&rdquo;
          </blockquote>
          <div className="mt-5 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary-30 to-primary-50 text-lg">
              👤
            </span>
            <span className="text-sm font-semibold text-black-90">Daniel Vaughn, Founder &amp; CEO</span>
          </div>
        </div>
      </div>
    </section>
  )
}
