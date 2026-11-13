import type { ReactNode } from 'react'

/** The topics a post can be filed under, in the order the filters show them. */
export const TOPICS = ['Renting', 'Buying', 'Sharing', 'Investing', 'News'] as const
export type Topic = (typeof TOPICS)[number]

export type Post = {
  /** Page address: /blog/<slug>. Must match the file name in src/content/blog. */
  slug: string
  title: string
  /** One or two lines, shown on the cards, under the title and in search results. */
  summary: string
  topic: Topic
  /** Publication date, as YYYY-MM-DD. */
  date: string
  author: string
  image: string
  /** The post itself. Use <p>, <h2>, <h3>, <ul>, <ol>, <blockquote> and <Link>. */
  body: ReactNode
}

/** Every file in src/content/blog is a post; each one exports `post`. */
const files = import.meta.glob<{ post: Post }>('/src/content/blog/*.tsx', { eager: true })

/** Every post, newest first. */
export const POSTS: Post[] = Object.values(files)
  .map((file) => file.post)
  .sort((a, b) => b.date.localeCompare(a.date))

/** Topics that have at least one post, so the filters never lead nowhere. */
export const USED_TOPICS = TOPICS.filter((t) => POSTS.some((p) => p.topic === t))

export const postHref = (p: Post) => `/blog/${p.slug}`

export const topicHref = (t: Topic) => `/blog?topic=${encodeURIComponent(t)}`

export const isTopic = (value: string | null): value is Topic => TOPICS.includes(value as Topic)

/** Other posts to read next: the same topic first, then the newest. */
export function relatedPosts(post: Post, count: number) {
  const others = POSTS.filter((p) => p.slug !== post.slug)
  return [...others.filter((p) => p.topic === post.topic), ...others.filter((p) => p.topic !== post.topic)].slice(
    0,
    count,
  )
}

/** "10 November 2026". */
export function formatPostDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}
