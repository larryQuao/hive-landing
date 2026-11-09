import { Link } from 'react-router'
import logoUrl from '@/assets/brand/hive-logo.png'
import { Container } from '@/components/layout/container'
import { SocialLinks } from '@/components/ui/social-links'
import { contact, sectionLinks } from '@/lib/site'
import { VERTICALS, verticalHref } from '@/lib/verticals'

const YEAR = new Date().getFullYear()

const FOOTER_LINK = 'text-sm text-white/85 transition-colors hover:text-white'

const COLUMNS = [
  { title: 'Hive Agency', items: sectionLinks },
  { title: 'Our verticals', items: VERTICALS.map((v) => ({ href: verticalHref(v), label: v.name })) },
  {
    title: 'Contact',
    items: [
      { href: `mailto:${contact.email}`, label: contact.email },
      { href: contact.phoneHref, label: contact.phone },
      { href: contact.whatsappHref, label: 'WhatsApp' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-ink pt-20 pb-10 text-white lg:pt-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <img src={logoUrl} alt="Hive" width={325} height={171} className="h-9 w-auto brightness-0 invert" />
            <p className="mt-5 max-w-xs font-display text-xl font-semibold tracking-[-0.02em]">
              Simpler, transparent, smarter real estate<span className="text-brand">.</span>
            </p>
            <p className="mt-4 text-sm text-white/65">{contact.location}</p>
            <SocialLinks className="mt-8" />
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
            {COLUMNS.map((col) => (
              <div key={col.title} className={col.title === 'Contact' ? 'col-span-2 sm:col-span-1' : ''}>
                <h3 className="font-sans text-sm text-white/60">{col.title}</h3>
                <ul className="mt-4 space-y-3">
                  {col.items.map((item) => (
                    <li key={item.label}>
                      {item.href.startsWith('/') ? (
                        <Link to={item.href} className={FOOTER_LINK}>
                          {item.label}
                        </Link>
                      ) : (
                        <a href={item.href} className={FOOTER_LINK}>
                          {item.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-wrap justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/55">
          <span>© {YEAR} Hive Agency Ltd. All rights reserved.</span>
          <Link to="/privacy" className="transition-colors hover:text-white">
            Privacy policy
          </Link>
        </div>
      </Container>
    </footer>
  )
}
