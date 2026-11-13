import { ArrowLeft, ArrowRight } from '@phosphor-icons/react'
import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { Link, useParams } from 'react-router'
import { BlogClosing } from '@/components/blog/blog-closing'
import { PostCard, PostMeta } from '@/components/blog/post-card'
import { ShareLinks } from '@/components/blog/share-links'
import { Container } from '@/components/layout/container'
import { PageMeta } from '@/components/seo/page-meta'
import { NotFoundPage } from '@/pages/not-found'
import { formatPostDate, postHref, POSTS, relatedPosts, topicHref } from '@/lib/blog'

/** Average reading speed, in words a minute. */
const WORDS_PER_MINUTE = 200

/** One labelled fact in the column beside the writing. */
function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="text-sm text-ink-soft">{label}</dt>
      <dd className="mt-1.5 text-[15px] font-medium text-ink">{children}</dd>
    </div>
  )
}

/**
 * One post: a wide opening (title, summary, photo), then the writing beside a
 * column with who wrote it, when, how long it takes and where to share it,
 * then more to read.
 */
export function PostPage() {
  const { slug } = useParams()
  const body = useRef<HTMLDivElement>(null)
  const [minutes, setMinutes] = useState<number | null>(null)
  const post = POSTS.find((p) => p.slug === slug)

  useLayoutEffect(() => {
    const words = body.current?.textContent?.trim().split(/\s+/).length ?? 0
    setMinutes(words ? Math.max(1, Math.round(words / WORDS_PER_MINUTE)) : null)
  }, [slug])

  if (!post) return <NotFoundPage />
  const more = relatedPosts(post, 3)

  return (
    <main className="pt-[72px]">
      <PageMeta title={post.title} description={post.summary} />

      <article>
        <Container className="pt-14 lg:pt-20">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink">
            <ArrowLeft className="h-4 w-4" weight="bold" />
            All posts
          </Link>

          <div className="mt-14 lg:mt-20">
            <PostMeta post={post} />
            <h1 className="mt-6 max-w-5xl text-[2.5rem] leading-[1.04] font-bold tracking-[-0.045em] text-ink sm:text-6xl lg:text-[5rem]">
              {post.title}
              <span className="text-brand">.</span>
            </h1>
            <p className="mt-8 max-w-3xl font-display text-[1.375rem] leading-[1.35] font-semibold tracking-[-0.02em] text-ink-muted sm:text-[1.625rem]">
              {post.summary}
            </p>
          </div>

          <div className="mt-14 aspect-[4/3] overflow-hidden rounded-[2rem] bg-ink sm:aspect-[16/9] lg:mt-20 lg:aspect-[21/9]">
            <img src={post.image} alt="" className="h-full w-full object-cover" />
          </div>
        </Container>

        <Container className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-16 lg:py-28">
          <aside className="lg:col-span-3">
            <div className="flex flex-col gap-8 border-y border-line py-8 lg:sticky lg:top-28 lg:border-y-0 lg:border-t lg:pb-0">
              <dl className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-1">
                <Fact label="Written by">{post.author}</Fact>
                <Fact label="Published">
                  <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                </Fact>
                {minutes && <Fact label="Reading time">{minutes} min read</Fact>}
                <Fact label="Topic">
                  <Link to={topicHref(post.topic)} className="text-brand hover:underline">
                    {post.topic}
                  </Link>
                </Fact>
              </dl>
              <div>
                <p className="text-sm text-ink-soft">Share this post</p>
                <div className="mt-3">
                  <ShareLinks path={postHref(post)} title={post.title} />
                </div>
              </div>
            </div>
          </aside>

          <div ref={body} className="post-body lg:col-span-7 lg:col-start-5">
            {post.body}
          </div>
        </Container>
      </article>

      {more.length > 0 && (
        <section className="border-t border-line py-20 lg:py-28">
          <Container>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="text-[2rem] leading-[1.1] font-bold tracking-[-0.04em] text-ink sm:text-4xl lg:text-[2.75rem]">
                Keep reading
              </h2>
              <Link to="/blog" className="inline-flex w-fit items-center gap-2 text-[15px] font-medium text-ink transition-colors hover:text-brand">
                All posts
                <ArrowRight className="h-4 w-4" weight="bold" />
              </Link>
            </div>
            <ul className="mt-12 grid gap-x-10 gap-y-20 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
              {more.map((p) => (
                <li key={p.slug}>
                  <PostCard post={p} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <BlogClosing />
    </main>
  )
}
