import { ArrowRight } from '@phosphor-icons/react'
import { Link } from 'react-router'
import { Container } from '@/components/layout/container'
import { PageMeta } from '@/components/seo/page-meta'
import { HiveMark } from '@/components/ui/hive-mark'

/** Shown for any address that doesn't match a page (see routes.tsx). */
export function NotFoundPage() {
  return (
    <main className="flex min-h-[80svh] items-center pt-[72px]">
        <PageMeta title="Page not found" />
        {/* Keep this page out of search results. */}
        <meta name="robots" content="noindex" />
        <Container className="py-24 lg:py-32">
          <HiveMark className="h-20 w-auto text-ink lg:h-24" />
          <h1 className="mt-10 text-[2.75rem] leading-[1.02] font-bold tracking-[-0.045em] text-ink sm:text-7xl lg:text-[5.75rem]">
            Page not found<span className="text-brand">.</span>
          </h1>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-ink-muted">
            The page you’re looking for doesn’t exist or has moved.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-[15px]">
            <Link
              to="/"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-brand px-7 font-medium text-white transition-colors hover:bg-brand-hover"
            >
              Back to home
              <ArrowRight className="h-4 w-4" weight="bold" />
            </Link>
            <Link to="/#contact" className="font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-ink">
              Get in touch
            </Link>
          </div>
        </Container>
    </main>
  )
}
