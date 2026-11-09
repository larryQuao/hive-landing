import { PageMeta } from '@/components/seo/page-meta'
import { About } from '@/components/sections/about'
import { Contact } from '@/components/sections/contact'
import { Hero } from '@/components/sections/hero'
import { Principles } from '@/components/sections/principles'
import { WhatWeDo } from '@/components/sections/what-we-do'
import { useSiteAnimations } from '@/hooks/use-site-animations'

export function HomePage() {
  useSiteAnimations()
  return (
    <main>
      <PageMeta />
      <Hero />
      <About />
      <Principles />
      <WhatWeDo />
      <Contact />
    </main>
  )
}
