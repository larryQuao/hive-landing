import type { Icon } from '@phosphor-icons/react'
import {
  Bank,
  Buildings,
  ChartLineUp,
  ClipboardText,
  Crane,
  FileText,
  GlobeHemisphereEast,
  Hammer,
  HandCoins,
  HardHat,
  House,
  Key,
  Lightbulb,
  PaintRoller,
  SealCheck,
  ShieldCheck,
  SlidersHorizontal,
  SprayBottle,
  Stack,
  Star,
  Storefront,
  UsersThree,
  Wallet,
  Wrench,
  Briefcase,
  CalendarCheck,
} from '@phosphor-icons/react'
import coRentingUrl from '@/assets/photos/verticals/co-renting.webp'
import commerceUrl from '@/assets/photos/verticals/commerce.webp'
import developmentUrl from '@/assets/photos/verticals/development.webp'
import financingUrl from '@/assets/photos/verticals/financing.webp'
import hiveCoreUrl from '@/assets/photos/verticals/hive-core.webp'
import hiveInvestUrl from '@/assets/photos/verticals/hive-invest.webp'
import serviceProvidersUrl from '@/assets/photos/verticals/service-providers.webp'

export type Vertical = {
  /** Page address: /verticals/<slug>. */
  slug: string
  name: string
  icon: Icon
  image: string
  /** One line for the card on the home page. */
  summary: string
  /** Opening statement on the vertical's own page. */
  intro: string
  /** What it offers, each with an icon that fits. Optional while details are still being set. */
  points?: { icon: Icon; text: string }[]
  /** Its own site. TODO: replace each '#' with the real address. */
  href: string
}

/**
 * The verticals of Hive Agency Ltd. Public-level wording only: the blueprint
 * is confidential, so nothing here covers pricing, partners or internals.
 */
export const VERTICALS: Vertical[] = [
  {
    slug: 'hive-core',
    href: '#',
    name: 'Hive Core',
    icon: Buildings,
    image: hiveCoreUrl,
    summary: 'Our property marketplace. Verified homes to rent, buy or stay in, with payments held in escrow.',
    intro:
      'Our property marketplace. Find verified homes to rent, buy or stay in, and pay safely, with your money held in escrow until the service is delivered.',
    points: [
      { icon: House, text: 'Long stays, short stays, student housing, shared living and homes for sale.' },
      { icon: SealCheck, text: 'Verified listings with real photos and videos.' },
      { icon: ShieldCheck, text: 'Payments held in escrow, with every fee shown upfront.' },
      { icon: Star, text: 'Reviews and ratings, with agents ranked by how reliably they deliver.' },
    ],
  },
  {
    slug: 'hive-invest',
    href: '#',
    name: 'Hive Invest',
    icon: ChartLineUp,
    image: hiveInvestUrl,
    summary: 'Real estate investment for people in Ghana and abroad.',
    intro: 'Real estate investment for people in Ghana and abroad, made simpler and more secure.',
    points: [
      { icon: Stack, text: 'More choice, with options across different kinds of property.' },
      { icon: FileText, text: 'Clear information before you commit.' },
      { icon: GlobeHemisphereEast, text: 'Simple to use, wherever you are.' },
    ],
  },
  {
    slug: 'co-renting',
    href: '#',
    name: 'Co-renting',
    icon: UsersThree,
    image: coRentingUrl,
    summary: 'Matching people who want to share a home or an office.',
    intro:
      'Matching people and businesses who want to share a home or an office, so rent costs less and better locations come within reach.',
    points: [
      { icon: SlidersHorizontal, text: 'Matched by budget, location and preferences.' },
      { icon: Briefcase, text: 'For homes and for offices.' },
      { icon: CalendarCheck, text: 'Set your move-in date and get matched with people on the same timeline.' },
      { icon: ShieldCheck, text: 'Payments held in escrow until both sides confirm.' },
    ],
  },
  {
    slug: 'financing',
    href: '#',
    name: 'Financing',
    icon: HandCoins,
    image: financingUrl,
    summary: 'Rent financing, mortgage support and developer loans.',
    intro: 'Making property more affordable, for renters, buyers and the people who build.',
    points: [{ icon: Wallet, text: 'Rent financing, to spread the cost of rent.' }, { icon: Key, text: 'Mortgage support for buyers.' }, { icon: Bank, text: 'Loans for developers.' }],
  },
  {
    slug: 'development',
    href: '#',
    name: 'Development',
    icon: HardHat,
    image: developmentUrl,
    summary: 'Building, renovation and smart home integration.',
    intro: 'Building new homes and making existing ones better.',
    points: [{ icon: Crane, text: 'New builds.' }, { icon: PaintRoller, text: 'Renovation.' }, { icon: Lightbulb, text: 'Smart home integration.' }],
  },
  {
    slug: 'service-providers',
    href: '#',
    name: 'Service Providers',
    icon: Wrench,
    image: serviceProvidersUrl,
    summary: 'Vetted professionals for cleaning, repairs and property management.',
    intro: 'Vetted professionals to look after a property, so owners and tenants know who they can rely on.',
    points: [{ icon: SprayBottle, text: 'Cleaning.' }, { icon: Hammer, text: 'Repairs and maintenance.' }, { icon: ClipboardText, text: 'Property management.' }],
  },
  {
    slug: 'commerce',
    href: '#',
    name: 'Commerce',
    icon: Storefront,
    image: commerceUrl,
    summary: 'One marketplace for everything a property needs.',
    intro: 'One marketplace for everything a property needs, from the people who know property.',
  },
]

export const verticalHref = (v: Vertical) => `/verticals/${v.slug}`
