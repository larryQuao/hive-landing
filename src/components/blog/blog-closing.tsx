import { ArrowRight } from '@phosphor-icons/react'
import { Link } from 'react-router'
import { Container } from '@/components/layout/container'

/** The end of every blog page: one clear next step. */
export function BlogClosing() {
  return (
    <Container className="pb-24 lg:pb-32">
      <div className="flex flex-col gap-8 rounded-[2rem] bg-[#f4f5f7] p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between lg:p-16">
        <div>
          <p className="font-display text-[2rem] leading-[1.1] font-bold tracking-[-0.04em] text-ink sm:text-4xl lg:text-[2.75rem]">
            Have a question about property?
          </p>
          <p className="mt-4 max-w-lg text-[17px] leading-relaxed text-ink-muted">
            Send us a message and we’ll get back to you. Good questions may become our next post.
          </p>
        </div>
        <Link
          to="/#contact"
          className="inline-flex h-12 w-fit shrink-0 items-center gap-2 rounded-full bg-brand px-7 text-[15px] font-medium text-white transition-colors hover:bg-brand-hover"
        >
          Get in touch
          <ArrowRight className="h-4 w-4" weight="bold" />
        </Link>
      </div>
    </Container>
  )
}
