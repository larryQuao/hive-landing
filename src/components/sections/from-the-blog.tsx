import { ArrowRight } from '@phosphor-icons/react'
import { Link } from 'react-router'
import { PostCard } from '@/components/blog/post-card'
import { Container } from '@/components/layout/container'
import { POSTS } from '@/lib/blog'

/** The three newest posts on the home page. Hidden until there is a post. */
export function FromTheBlog() {
  if (POSTS.length === 0) return null

  return (
    <section id="blog" className="border-t border-line py-24 lg:py-36">
      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 data-reveal className="text-[2.25rem] leading-[1.08] font-bold tracking-[-0.04em] text-ink sm:text-5xl lg:col-span-5 lg:text-[3.5rem]">
            From the blog
          </h2>
          <div data-reveal data-reveal-delay="0.1" className="lg:col-span-5 lg:col-start-8">
            <p className="max-w-md text-[17px] leading-relaxed text-ink-muted">
              Practical guides and news on renting, sharing and investing in property in Ghana.
            </p>
            <Link
              to="/blog"
              className="mt-6 inline-flex items-center gap-2 text-[15px] font-medium text-ink transition-colors hover:text-brand"
            >
              All posts
              <ArrowRight className="h-4 w-4" weight="bold" />
            </Link>
          </div>
        </div>

        <ul data-stagger className="mt-16 grid gap-x-10 gap-y-20 md:grid-cols-2 lg:mt-24 lg:grid-cols-3">
          {POSTS.slice(0, 3).map((post) => (
            <li key={post.slug} data-stagger-item>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
