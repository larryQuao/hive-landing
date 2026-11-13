import { useSearchParams } from 'react-router'
import { BlogClosing } from '@/components/blog/blog-closing'
import { FeaturedPost, PostCard } from '@/components/blog/post-card'
import { TopicFilter } from '@/components/blog/topic-filter'
import { Container } from '@/components/layout/container'
import { PageMeta } from '@/components/seo/page-meta'
import { isTopic, POSTS } from '@/lib/blog'

/**
 * Every post, newest first, optionally narrowed to one topic (/blog?topic=Renting):
 * the newest given a whole row, the rest in a grid.
 */
export function BlogPage() {
  const [params] = useSearchParams()
  const asked = params.get('topic')
  const topic = isTopic(asked) ? asked : null
  const posts = topic ? POSTS.filter((p) => p.topic === topic) : POSTS
  const [latest, ...rest] = posts

  return (
    <main className="pt-[72px]">
      <PageMeta
        title={topic ? `${topic} · Blog` : 'Blog'}
        description="Guides and news from Hive Agency Ltd on renting, buying, sharing and investing in property in Ghana."
      />

      <Container className="pt-20 pb-16 lg:pt-28 lg:pb-20">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <h1 className="text-[3rem] leading-[1] font-bold tracking-[-0.045em] text-ink sm:text-7xl lg:col-span-7 lg:text-[6rem]">
            Blog<span className="text-brand">.</span>
          </h1>
          <p className="max-w-md text-[18px] leading-relaxed text-ink-muted lg:col-span-5 lg:justify-self-end">
            Practical guides and news on renting, buying, sharing and investing in property in Ghana.
          </p>
        </div>
        <div className="mt-14 border-t border-line pt-8 lg:mt-20">
          <TopicFilter current={topic} />
        </div>
      </Container>

      {latest ? (
        <>
          <Container className="pb-24 lg:pb-32">
            <FeaturedPost post={latest} />
          </Container>

          {rest.length > 0 && (
            <section className="border-t border-line py-20 lg:py-28">
              <Container>
                <h2 className="text-[2rem] leading-[1.1] font-bold tracking-[-0.04em] text-ink sm:text-4xl lg:text-[2.75rem]">
                  {topic ? `More on ${topic.toLowerCase()}` : 'More posts'}
                </h2>
                <ul className="mt-12 grid gap-x-10 gap-y-20 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
                  {rest.map((post) => (
                    <li key={post.slug}>
                      <PostCard post={post} />
                    </li>
                  ))}
                </ul>
              </Container>
            </section>
          )}
        </>
      ) : (
        <Container className="pb-24 lg:pb-32">
          <p className="text-[18px] text-ink-muted">No posts here yet. Check back soon.</p>
        </Container>
      )}

      <BlogClosing />
    </main>
  )
}
