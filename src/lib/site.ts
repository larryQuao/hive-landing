/**
 * Company-wide details for Hive Agency Ltd's site: contact, social accounts
 * and the home page sections. Each vertical's details live in verticals.ts.
 */
export const contact = {
  email: 'info@hiveagency.online',
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

/** Main links in the header and footer: home page sections, plus the blog. */
export const sectionLinks = [
  { href: '/#about', label: 'About' },
  { href: '/#what-we-do', label: 'What we do' },
  { href: '/blog', label: 'Blog' },
  { href: '/#contact', label: 'Contact' },
]
