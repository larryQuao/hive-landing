import { AppMockup } from './AppMockup'
import logoUrl from '../assets/Hive-logo.png'

export function FooterCta() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-white via-primary-30 to-primary-50 px-4 pt-20">
      <div data-reveal="scale" className="mx-auto max-w-4xl">
        <AppMockup className="rounded-b-none" />
      </div>

      {/* dark footer */}
      <div className="relative z-10 mt-[-2px] rounded-t-[2rem] bg-black-90 px-6 pb-16 pt-20 sm:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-start justify-between gap-8 border-b border-white/10 pb-10 md:flex-row md:items-center">
            <img
              src={logoUrl}
              alt="Hive"
              className="h-8 w-auto brightness-0 invert"
            />
            <div className="flex flex-wrap gap-8 text-sm text-black-40">
              {['Why Hive', 'Products', 'Resources', 'Contact Us'].map((l) => (
                <a key={l} href="#" className="transition-colors hover:text-white">
                  {l}
                </a>
              ))}
            </div>
          </div>
          <div className="mt-10 flex flex-col justify-between gap-4 text-xs text-black-50 sm:flex-row">
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
