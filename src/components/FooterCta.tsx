import { AppMockup } from './AppMockup'

export function FooterCta() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-white via-[#d9d0f7] to-[#b7a8f0] px-4 pt-20">
      <div data-reveal="scale" className="mx-auto max-w-4xl">
        <AppMockup className="rounded-b-none" />
      </div>

      {/* dark footer */}
      <div className="relative z-10 mt-[-2px] rounded-t-[2rem] bg-[#111111] px-6 pb-16 pt-20 sm:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-start justify-between gap-8 border-b border-white/10 pb-10 md:flex-row md:items-center">
            <span className="text-2xl font-extrabold text-white">
              H<span className="text-violet-400">i</span>ve
            </span>
            <div className="flex flex-wrap gap-8 text-sm text-gray-400">
              {['Why Hive', 'Products', 'Resources', 'Contact Us'].map((l) => (
                <a key={l} href="#" className="transition-colors hover:text-white">
                  {l}
                </a>
              ))}
            </div>
          </div>
          <div className="mt-10 flex flex-col justify-between gap-4 text-xs text-gray-500 sm:flex-row">
            <span>© {new Date().getFullYear()} Hive. All rights reserved.</span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
