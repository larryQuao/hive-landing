/**
 * Company-wide details for Hive Agency Ltd's site: contact, social accounts
 * and the home page sections. Each vertical's details live in verticals.ts.
 */
export const contact = {
  email: 'hiveghagency@gmail.com',
  phone: '+233 24 130 2496',
  phoneHref: 'tel:+233241302496',
  whatsappHref: 'https://wa.me/233241302496',
  location: 'Osu, Accra, Ghana',
}

/**
 * Hive's social accounts, shown as icons in the footer.
 * TODO: replace each '#' with the real profile link. An empty string hides that icon.
 */
export const socials = {
  instagram: '#',
  linkedin: '#',
  x: '#',
  facebook: '#',
  tiktok: '#',
  youtube: '#',
}

/** Home page sections, used by the header and footer (they also work from other pages). */
export const sectionLinks = [
  { href: '/#about', label: 'About' },
  { href: '/#what-we-do', label: 'What we do' },
  { href: '/#contact', label: 'Contact' },
]
