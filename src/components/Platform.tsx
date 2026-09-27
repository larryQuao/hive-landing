const icons = [
  { label: 'chart', bg: 'bg-white', emoji: '📊' },
  { label: 'hive', bg: 'bg-blue-500 text-white', text: 'Hive' },
  { label: 'invest', bg: 'bg-white', emoji: '🤝' },
  { label: 'hive', bg: 'bg-blue-500 text-white', text: 'Hive' },
  { label: 'invest', bg: 'bg-white', emoji: '🤝' },
  { label: 'dots', bg: 'bg-violet-800 text-white', emoji: '⋯' },
  { label: 'hive', bg: 'bg-blue-500 text-white', text: 'Hive' },
  { label: 'invest', bg: 'bg-white', emoji: '🤝' },
  { label: 'hive', bg: 'bg-blue-500 text-white', text: 'Hive' },
  { label: 'send', bg: 'bg-pink-400 text-white', emoji: '✈️' },
]

export function Platform() {
  return (
    <section className="bg-white px-4 py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        {/* Icon funnel illustration */}
        <div data-reveal="left" data-parallax="-30" className="rounded-[2.5rem] bg-gradient-to-b from-gray-50 to-indigo-50/70 p-10">
          <div className="mx-auto grid max-w-xs grid-cols-4 gap-3">
            {icons.map((icon, i) => (
              <div
                key={i}
                className={`flex aspect-square items-center justify-center rounded-2xl text-[10px] font-extrabold shadow-md shadow-black/5 ${icon.bg}`}
              >
                {icon.text ?? icon.emoji}
              </div>
            ))}
          </div>
          {/* funnel lines */}
          <svg className="mx-auto mt-2 h-32 w-64 text-violet-300" viewBox="0 0 260 130" fill="none">
            <path
              d="M30 0 C 80 60, 110 70, 130 110 M 95 0 C 110 55, 122 70, 130 110 M 165 0 C 150 55, 138 70, 130 110 M 230 0 C 180 60, 150 70, 130 110 M 130 0 C 130 40, 130 70, 130 110"
              stroke="currentColor"
              strokeWidth="1.2"
            />
          </svg>
          <div className="mx-auto mt-1 flex h-24 w-24 items-center justify-center rounded-3xl bg-blue-500 text-xl font-extrabold text-white shadow-2xl shadow-blue-500/50">
            Hive
          </div>
        </div>

        <div data-reveal="right">
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            One Platform, Endless Opportunities
          </h2>
          <a
            href="#"
            className="mt-8 inline-block rounded-full bg-gray-900 px-7 py-4 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105"
          >
            List &amp; Earn for Free
          </a>
          <blockquote className="mt-10 max-w-md text-lg leading-relaxed text-gray-800">
            &ldquo;I use Hive to manage my bookings, maximize earnings, and fund more developments
            in Accra.—it makes running my portfolio effortless.&rdquo;
          </blockquote>
          <div className="mt-5 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-200 to-rose-300 text-lg">
              👤
            </span>
            <span className="text-sm font-semibold text-gray-900">Daniel Vaughn, Founder &amp; CEO</span>
          </div>
        </div>
      </div>
    </section>
  )
}
