import { useEffect, useState } from 'react'
import { List, X } from '@phosphor-icons/react'
import { Link } from 'react-router'
import logoUrl from '@/assets/brand/hive-logo.png'
import { Container } from '@/components/layout/container'
import { sectionLinks } from '@/lib/site'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // The hairline only appears once content scrolls underneath.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b bg-white/90 backdrop-blur-md transition-colors duration-300 ${
        scrolled || open ? 'border-line' : 'border-transparent'
      }`}
    >
      <Container className="flex h-[72px] items-center justify-between">
        <Link to="/" aria-label="Hive home" className="rounded-md outline-none focus-visible:ring-2 focus-visible:ring-brand/30">
          <img src={logoUrl} alt="Hive" width={325} height={171} className="h-8 w-auto" />
        </Link>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Main">
          {sectionLinks.map((l) => (
            <Link key={l.href} to={l.href} className="text-sm text-ink-muted transition-colors hover:text-ink">
              {l.label}
            </Link>
          ))}
          <Link
            to="/#contact"
            className="inline-flex h-10 items-center rounded-full bg-brand px-5 text-sm font-medium text-white transition-colors hover:bg-brand-hover"
          >
            Get in touch
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="-mr-2 flex h-10 w-10 items-center justify-center rounded-full text-ink md:hidden"
        >
          {open ? <X className="h-5 w-5" weight="bold" /> : <List className="h-5 w-5" weight="bold" />}
        </button>
      </Container>

      {open && (
        <div id="mobile-menu" className="border-t border-line bg-white md:hidden">
          <Container className="py-4">
            <nav className="flex flex-col" aria-label="Mobile">
              {sectionLinks.map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-line py-4 font-display text-xl font-semibold tracking-[-0.02em] text-ink last:border-0"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </Container>
        </div>
      )}
    </header>
  )
}
