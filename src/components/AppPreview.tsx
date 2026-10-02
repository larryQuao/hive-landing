function PhoneOne() {
  return (
    <div className="w-44 shrink-0 overflow-hidden rounded-[1.6rem] bg-black-90 p-4 shadow-2xl shadow-black/40">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-extrabold text-white">Hive</span>
        <span className="text-xs text-black-50">≡</span>
      </div>
      <p className="mt-3 text-center text-xs font-bold leading-tight text-white">
        Unlock Your Dream Home, Today.
      </p>
      <p className="mt-1 text-center text-[6px] text-black-40">
        Seamless lending, built to impact the market from lend
      </p>
      <div className="mx-auto mt-2 w-max rounded-full bg-primary-100 px-3 py-1 text-[7px] font-semibold text-white">
        Apply Now
      </div>
      <p className="mt-1 text-center text-[6px] text-black-40">Check Eligibility</p>

      <p className="mt-4 text-[7px] font-bold text-white">How It Works</p>
      <div className="mt-2 space-y-1.5">
        {['Browse Property', 'Get Approved', 'Get Approved', 'Secure Property'].map((s, i) => (
          <div key={i} className="flex items-center gap-1.5 rounded-md bg-black-80 px-2 py-1.5">
            <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary-100 text-[6px] text-white">
              {i + 1}
            </span>
            <span className="text-[6.5px] text-black-30">{s}</span>
          </div>
        ))}
      </div>

      <p className="mt-4 text-[7px] font-bold text-white">Application Status</p>
      <div className="mt-1.5 h-1 rounded-full bg-primary-100">
        <div className="h-1 w-1/3 rounded-full bg-primary-30" />
      </div>
      <div className="mt-2 space-y-1.5">
        {['Full name', 'Phone Number', 'Current Address'].map((f) => (
          <div key={f} className="flex items-center justify-between rounded-md bg-black-80 px-2 py-1.5">
            <span className="text-[6.5px] text-black-40">{f}</span>
            <span className="text-[6.5px] text-black-50">›</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function PhoneTwo({ className = '' }: { className?: string }) {
  return (
    <div className={`w-40 shrink-0 overflow-hidden rounded-[1.6rem] bg-black-90 p-4 shadow-2xl shadow-black/40 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-extrabold text-white">Hive</span>
        <span className="text-xs text-black-50">≡</span>
      </div>
      <p className="mt-3 text-[8px] font-bold text-white">Escrow Financing Calculator</p>
      <p className="mt-0.5 text-[6px] text-black-50">Input Amount</p>
      <div className="mt-1 rounded-md bg-black-80 px-2 py-1.5 text-[7px] text-black-30">
        $ 2500
      </div>
      <div className="mt-2 flex gap-1">
        {['Monthly', 'Biannually', 'Annually'].map((t, i) => (
          <span
            key={t}
            className={`rounded-full px-1.5 py-0.5 text-[5.5px] ${
              i === 2 ? 'bg-primary-100 text-white' : 'bg-black-80 text-black-40'
            }`}
          >
            {t}
          </span>
        ))}
      </div>
      <div className="mt-3 rounded-md bg-black-80 p-2">
        <p className="text-[6px] text-black-50">Monthly:</p>
        <p className="text-[9px] font-bold text-white">$450</p>
        <p className="text-[5.5px] text-black-50">Includes fees and interest.</p>
        <div className="mt-1.5 flex justify-between border-t border-white/10 pt-1.5 text-[6px] text-black-40">
          <span>Principal</span>
          <span className="font-semibold text-white">$250</span>
        </div>
        <div className="mt-1 flex justify-between text-[6px] text-black-40">
          <span>Interest</span>
          <span className="font-semibold text-white">$200</span>
        </div>
      </div>
      <div className="mt-3 rounded-full bg-primary-100 py-1.5 text-center text-[7px] font-semibold text-white">
        Continue Application
      </div>
    </div>
  )
}

export function AppPreview() {
  return (
    <section className="px-4 pb-24">
      <div className="mx-auto flex max-w-7xl items-center justify-center rounded-[2.5rem] bg-black-5 py-24">
        <div data-reveal="scale" className="relative flex items-start">
          <PhoneOne />
          <PhoneTwo className="-ml-10 mt-24" />
          {/* color style card */}
          <div data-reveal="right" data-reveal-delay="0.3" className="absolute -right-40 top-16 hidden w-40 rounded-2xl bg-white p-4 shadow-xl lg:block">
            <p className="text-xs font-bold text-black-90">Color style</p>
            <div className="mt-2 rounded-md border border-black-20 px-2 py-1 text-[9px] text-black-40">
              🔍 Search...
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2.5">
              {['bg-primary-100', 'bg-primary-75', 'bg-primary-50', 'bg-primary-30', 'bg-primary-10', 'bg-black-90', 'bg-black-60', 'bg-black-30'].map(
                (c) => (
                  <span key={c} className={`h-4 w-4 rounded-full ${c}`} />
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
