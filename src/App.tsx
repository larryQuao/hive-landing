import { AboutUs } from './components/AboutUs'
import { AppPreview } from './components/AppPreview'
import { Audiences } from './components/Audiences'
import { ContactUs } from './components/ContactUs'
import { DarkFeatures } from './components/DarkFeatures'
import { Features } from './components/Features'
import { FooterCta } from './components/FooterCta'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Platform } from './components/Platform'
import { Steps } from './components/Steps'
import { SupportLinks } from './components/SupportLinks'
import { Testimonial } from './components/Testimonial'
import { useSiteAnimations } from './lib/useSiteAnimations'

function App() {
  useSiteAnimations()
  return (
    <div className="min-h-screen bg-white font-sans text-black-90 antialiased">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Steps />
        <Platform />
        <DarkFeatures />
        <Testimonial />
        <AboutUs />
        <Audiences />
        <AppPreview />
        <SupportLinks />
        <ContactUs />
      </main>
      <FooterCta />
    </div>
  )
}

export default App
