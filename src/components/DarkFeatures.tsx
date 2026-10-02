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
            <div className="relative h-64 overflow-hidden rounded-2xl bg-black-90">
              {/* cloud upload illustration */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="flex h-24 w-40 items-center justify-center rounded-full bg-gradient-to-b from-primary-50 to-primary-100 shadow-2xl shadow-primary-100/40">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M12 16V4m0 0l-4 4m4-4l4 4" />
                    <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
                  </svg>
                </div>
                <div className="mx-auto h-6 w-3 bg-primary-30/70" />
              </div>
              {/* dotted globe hint */}
              <div className="absolute bottom-0 left-0 right-0 h-20 opacity-30 [background-image:radial-gradient(circle,var(--color-black-60)_1px,transparent_1px)] [background-size:10px_10px]" />
              {/* collaborator cursors */}
              <div className="absolute bottom-8 left-6 flex items-center">
                <svg width="16" height="16" viewBox="0 0 24 24" className="mr-1">
                  <path d="M4 2l16 8-7 2-3 7z" fill="#47A3E9" />
                </svg>
                <span className="rounded-full bg-primary-75 px-2.5 py-1 text-xs font-semibold text-white">
                  Emily brook
                </span>
              </div>
              <div className="absolute bottom-16 right-8 flex items-center">
                <svg width="16" height="16" viewBox="0 0 24 24" className="mr-1">
                  <path d="M4 2l16 8-7 2-3 7z" fill="#1176F9" />
                </svg>
                <span className="rounded-full bg-primary-100 px-2.5 py-1 text-xs font-semibold text-white">
                  Mark wolf
                </span>
              </div>
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
            <div className="relative h-64 overflow-hidden rounded-2xl bg-black-90">
              <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center">
                <span className="-mr-6 text-7xl drop-shadow-[0_0_20px_rgba(17,118,249,0.5)]">⚡</span>
                <span className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-b from-primary-50 to-primary-100 text-5xl shadow-2xl shadow-primary-100/40">
                  🛡️
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold text-white">Track and Control Every Revenue</h3>
              <p className="mt-2 text-sm leading-relaxed text-black-40">
                Track and manage payments securely—all in one seamless platform.
              </p>
            </div>
            {/* floating badge */}
            <div className="absolute -right-3 top-8 flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-black-90 shadow-xl">
              Get it for FREE <span>🏷️</span>
            </div>
          </article>
        </div>

        <div className="h-32" />
      </div>
    </section>
  )
}
