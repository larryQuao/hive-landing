import { Outlet } from 'react-router'
import { Footer } from '@/components/layout/footer'
import { Navbar } from '@/components/layout/navbar'
import { ScrollManager } from '@/components/layout/scroll-manager'

/** Every page shares the header and footer; the page itself fills <Outlet />. */
export function SiteLayout() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <ScrollManager />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}
