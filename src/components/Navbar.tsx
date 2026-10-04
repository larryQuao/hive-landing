import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import logoUrl from '../assets/Hive-logo.png'
import hiveInvestLogoUrl from '../assets/hiveinvestlogo.png'

function ProductsDropdown() {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex items-center gap-1 text-sm font-medium text-black-60 transition-colors hover:text-black-90"
      >
        Products
        <svg
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {open && (
        <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3">
          <div className="w-72 rounded-2xl bg-white p-2 shadow-lg shadow-black-90/10 ring-1 ring-black/5">
            <a
              href="#"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-black-5"
            >
              <img src={logoUrl} alt="" className="w-8" />
              <span className="text-sm font-medium text-black-60">Hive</span>
            </a>
            <a
              href="#"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-black-5"
            >
              <img src={hiveInvestLogoUrl} alt="" className="w-8 rounded-lg" />
              <span className="text-sm font-medium text-black-60">Hive Invest</span>
              <span className="ml-auto whitespace-nowrap rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-semibold text-white">
                Coming soon
              </span>
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export function Navbar() {
  const nav = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.from(nav.current, { y: -48, opacity: 0, duration: 0.8, ease: 'power3.out' })
    }, nav)
    return () => ctx.revert()
  }, [])

  const links = ['About Us', 'Products', 'Resources', 'Contact Us']
  return (
    <header ref={nav} className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav className="flex w-full max-w-3xl items-center justify-between rounded-full bg-white/80 px-6 py-3 shadow-lg shadow-black/5 backdrop-blur-md">
        <a href="#" className="flex items-center" aria-label="Hive home">
          <img src={logoUrl} alt="Hive" className="h-8 w-auto" />
        </a>
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) =>
            link === 'Products' ? (
              <ProductsDropdown key={link} />
            ) : (
              <a
                key={link}
                href={link === 'About Us' ? '#about' : link === 'Contact Us' ? '#contact' : '#'}
                className="text-sm font-medium text-black-60 transition-colors hover:text-black-90"
              >
                {link}
              </a>
            ),
          )}
        </div>
      </nav>
    </header>
  )
}
