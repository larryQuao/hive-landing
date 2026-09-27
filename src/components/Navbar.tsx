import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

export function Navbar() {
  const nav = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.from(nav.current, { y: -48, opacity: 0, duration: 0.8, ease: 'power3.out' })
    }, nav)
    return () => ctx.revert()
  }, [])

  const links = ['Why Hive', 'Products', 'Resources', 'Contact Us']
  return (
    <header ref={nav} className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav className="flex w-full max-w-3xl items-center justify-between rounded-full bg-white/80 px-6 py-3 shadow-lg shadow-black/5 backdrop-blur-md">
        <a href="#" className="text-xl font-extrabold tracking-tight text-gray-900">
          H<span className="text-violet-600">i</span>ve
        </a>
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
            >
              {link}
            </a>
          ))}
        </div>
        <a
          href="#"
          className="rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
        >
          Sign up
        </a>
      </nav>
    </header>
  )
}
