/** Must match Container: max width 1440px, side padding 24px (48px from 1024px). */
const PAGE_MAX = 1440
const sidePadding = () => (window.innerWidth >= 1024 ? 48 : 24)

/** Distance from the screen edge to the page content, in px (for scroll effects). */
export const pageSideGap = () => Math.max(0, (window.innerWidth - PAGE_MAX) / 2) + sidePadding()
