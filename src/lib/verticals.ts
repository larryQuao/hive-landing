import type { Icon } from '@phosphor-icons/react'
import {
  Bank,
  Buildings,
  ChartLineUp,
  Crane,
  FileText,
  GlobeHemisphereEast,
  HandCoins,
  HardHat,
  House,
  Key,
  Lightbulb,
  PaintRoller,
  SealCheck,
  ShieldCheck,
  SlidersHorizontal,
  Stack,
  Star,
  UsersThree,
  Wallet,
  Briefcase,
  CalendarCheck,
} from '@phosphor-icons/react'
import coRentingUrl from '@/assets/photos/verticals/co-renting.webp'
import developmentUrl from '@/assets/photos/verticals/development.webp'
import financingUrl from '@/assets/photos/verticals/financing.webp'
import hiveUrl from '@/assets/photos/verticals/hive.webp'
import hiveInvestUrl from '@/assets/photos/verticals/hive-invest.webp'

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
    slug: 'hive',
    href: '#',
    name: 'Hive',
    icon: Buildings,
    image: hiveUrl,
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
]

export const verticalHref = (v: Vertical) => `/verticals/${v.slug}`
