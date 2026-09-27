type Props = {
  className?: string
}

/** A CSS-drawn mockup of the Hive web app home screen. */
export function AppMockup({ className = '' }: Props) {
  return (
    <div className={`overflow-hidden rounded-xl bg-white shadow-2xl shadow-indigo-950/20 ${className}`}>
      {/* App navbar */}
      <div className="flex items-center justify-between px-4 py-2.5">
        <div className="flex items-center gap-4">
          <span className="text-[11px] font-extrabold text-gray-900">
            H<span className="text-blue-500">i</span>ve
          </span>
          <div className="hidden gap-2 text-[8px] font-medium text-gray-500 sm:flex">
            <span>Rent</span>
            <span>Buy</span>
            <span>Short stay</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[8px] font-medium text-gray-600">
          <span className="rounded-full border border-gray-200 px-2 py-0.5">🇬🇭 GHS ▾</span>
          <span className="rounded-full bg-blue-500 px-2 py-1 text-white">Post Property (Free)</span>
          <span className="hidden sm:inline">Sign in</span>
          <span className="hidden rounded-full border border-gray-300 px-2 py-0.5 sm:inline">Sign up</span>
        </div>
      </div>

      {/* Hero area */}
      <div className="relative mx-3 overflow-hidden rounded-lg">
        <div className="relative h-40 bg-gradient-to-br from-[#b9a98f] via-[#cbb99e] to-[#8f8271] sm:h-48">
          {/* window light streaks */}
          <div className="absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-sky-100/50 to-transparent" />
          <div className="absolute left-1/4 top-0 h-full w-10 bg-white/25 blur-md" />
          <div className="absolute right-8 bottom-6 hidden h-16 w-24 rounded-md bg-white/30 sm:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
          <div className="absolute left-4 top-1/2 max-w-[60%] -translate-y-1/2 text-white">
            <p className="text-sm font-extrabold leading-tight sm:text-lg">
              Let&apos;s help you secure your new home
            </p>
            <p className="mt-1 text-[7px] leading-snug opacity-90 sm:text-[9px]">
              Discover your ideal property on our secure platform. Buying, renting, or co-renting,
              we have you covered.
            </p>
          </div>
          {/* cursor tag */}
          <div className="absolute right-16 top-6 hidden items-center sm:flex">
            <span className="rounded-full bg-violet-500 px-2.5 py-1 text-[9px] font-semibold text-white shadow-lg">
              Jody Hekla
            </span>
            <span className="-ml-1 mt-3 h-0 w-0 border-l-[5px] border-t-[7px] border-l-violet-500 border-t-transparent" />
          </div>
        </div>

        {/* Search bar */}
        <div className="absolute inset-x-3 -bottom-4 flex items-center gap-1 rounded-lg bg-white p-1.5 shadow-lg sm:inset-x-5">
          {['Rent', 'Buy', 'Short Stay'].map((t, i) => (
            <span
              key={t}
              className={`rounded px-1.5 py-1 text-[7px] font-semibold sm:text-[8px] ${
                i === 0 ? 'bg-blue-500 text-white' : 'text-gray-500'
              }`}
            >
              {t}
            </span>
          ))}
          <span className="ml-auto hidden flex-1 rounded border border-gray-200 px-2 py-1 text-[7px] text-gray-400 md:block">
            📍 Location in Accra Ghana
          </span>
          <span className="hidden rounded border border-gray-200 px-2 py-1 text-[7px] text-gray-400 lg:block">
            🏠 Property type ▾
          </span>
          <span className="hidden rounded border border-gray-200 px-2 py-1 text-[7px] text-gray-400 lg:block">
            GHS: 700-800 ▾
          </span>
          <span className="rounded bg-blue-500 px-2.5 py-1.5 text-[8px] font-semibold text-white">
            🔍 Search
          </span>
        </div>
      </div>
      <div className="px-4 pb-4 pt-7">
        <p className="text-[9px] font-bold text-blue-600">Featured Properties</p>
        <div className="mt-2 h-1.5 w-3/4 rounded bg-gray-100" />
        <div className="mt-1.5 h-1.5 w-1/2 rounded bg-gray-100" />
      </div>
    </div>
  )
}
