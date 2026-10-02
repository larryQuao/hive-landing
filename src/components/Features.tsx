function CardIllustration({ variant }: { variant: 0 | 1 | 2 }) {
  if (variant === 0) {
    return (
      <div className="relative h-56 overflow-hidden rounded-xl bg-gradient-to-b from-primary-10 to-primary-30">
        {/* toolbar */}
        <div className="absolute left-4 right-4 top-5 flex items-center justify-center gap-3 rounded-lg bg-white/90 py-2 shadow-sm">
          {['📎', '🖊️', 'T', '🖼️', '#', '▢'].map((icon, i) => (
            <span
              key={i}
              className={`flex h-6 w-6 items-center justify-center rounded text-[11px] ${
                i === 3 ? 'bg-black-90 text-white' : 'text-black-50'
              }`}
            >
              {icon}
            </span>
          ))}
        </div>
        {/* selection area */}
        <div className="absolute left-6 right-6 top-16 h-24 rounded-lg border-2 border-dashed border-primary-50/70" />
        {/* gradient blob */}
        <div className="absolute -bottom-6 left-0 h-20 w-36 rounded-tr-[3rem] bg-gradient-to-br from-primary-50 via-primary-75 to-primary-100" />
        {/* cursor */}
        <svg className="absolute left-1/2 top-[52%]" width="22" height="22" viewBox="0 0 24 24">
          <path d="M4 2l16 8-7 2-3 7z" fill="#1A1A1A" stroke="#fff" strokeWidth="1.5" />
        </svg>
      </div>
    )
  }
  if (variant === 1) {
    return (
      <div className="relative h-56 overflow-hidden rounded-xl bg-gradient-to-b from-primary-10 to-primary-30">
        {/* connector lines */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 200 160">
          <path
            d="M40 40 C 90 40, 90 30, 140 30 M 40 40 C 40 90, 80 100, 110 110"
            fill="none"
            stroke="#84C1EF"
            strokeWidth="1"
          />
        </svg>
        <div className="absolute left-8 top-8 h-16 w-16 rounded-md bg-gradient-to-br from-primary-30 to-primary-50 shadow-inner" />
        <div className="absolute right-10 top-5 h-16 w-10 rounded-full bg-gradient-to-b from-primary-50 to-primary-75" />
        <div className="absolute bottom-8 left-1/3 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-75 to-primary-100 text-3xl shadow-md">
          😂
        </div>
      </div>
    )
  }
  return (
    <div className="relative h-56 overflow-hidden rounded-xl bg-gradient-to-b from-primary-10 to-primary-30">
      {/* concentric circles */}
      <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary-50/60" />
      <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary-50/70" />
      <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary-50/80" />
      {/* chat bubble */}
      <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-gradient-to-b from-primary-75 to-primary-100 text-2xl shadow-lg shadow-primary-100/40">
        💬
      </div>
      {/* avatars */}
      {[
        'right-8 top-6',
        'left-8 top-16',
        'left-12 bottom-8',
      ].map((pos) => (
        <div
          key={pos}
          className={`absolute ${pos} flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary-30 to-primary-50 text-lg ring-2 ring-white`}
        >
          👤
        </div>
      ))}
    </div>
  )
}

const cards = [
  {
    title: 'Discover & Transact',
    body: 'Browse listings, schedule tours, and manage transactions securely—all in one platform for home seekers, agents, homeowners, and property managers',
  },
  {
    title: 'Invest & Get Funding',
    body: 'Access rent financing and connect investors to make your property goals achievable.',
  },
  {
    title: 'Centralized End-to-End',
    body: 'From listing to payment tracking and property management, Hive centralizes the entire real estate process for full control.',
  },
]

export function Features() {
  return (
    <section className="bg-white px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 data-reveal className="mx-auto max-w-2xl text-center text-4xl font-extrabold tracking-tight text-black-90 sm:text-5xl">
          Everything You Need for Real Estate
        </h2>
        <p data-reveal data-reveal-delay="0.1" className="mx-auto mt-4 max-w-xl text-center text-black-50">
          Everything you need to discover, transact, and invest in real estate—centralized in one
          seamless platform.
        </p>

        <div data-stagger className="mt-14 grid gap-6 md:grid-cols-3">
          {cards.map((card, i) => (
            <article
              key={card.title}
              data-stagger-item
              className="rounded-3xl bg-white p-4 shadow-xl shadow-black/5 ring-1 ring-black/5"
            >
              <CardIllustration variant={i as 0 | 1 | 2} />
              <div className="px-2 pb-4 pt-6">
                <h3 className="text-xl font-bold text-black-90">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-black-50">{card.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
