import { ArrowRight } from '@phosphor-icons/react'
import { Link } from 'react-router'
import { formatPostDate, postHref, type Post } from '@/lib/blog'

/** "Renting · 10 November 2026". */
export function PostMeta({ post, className = '' }: { post: Post; className?: string }) {
  return (
    <p className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-sm ${className}`}>
      <span className="font-medium text-brand">{post.topic}</span>
      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-ink-soft/50" />
      <time dateTime={post.date} className="text-ink-soft">
        {formatPostDate(post.date)}
      </time>
    </p>
  )
}

/** A post in a grid: photo, topic and date, title, summary. The whole card is the link. */
export function PostCard({ post }: { post: Post }) {
  return (
    <Link to={postHref(post)} className="group flex h-full flex-col">
      <div className="aspect-[3/2] overflow-hidden rounded-3xl bg-ink">
        <img
          src={post.image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
        />
      </div>
      <PostMeta post={post} className="mt-7" />
      <h3 className="mt-3 text-[1.5rem] leading-[1.2] font-semibold tracking-[-0.03em] text-ink transition-colors group-hover:text-brand lg:text-[1.625rem]">
        {post.title}
      </h3>
      <p className="mt-4 text-[17px] leading-relaxed text-ink-muted">{post.summary}</p>
    </Link>
  )
}

/** The newest post, given the room of a whole row: photo on one side, words on the other. */
export function FeaturedPost({ post }: { post: Post }) {
  return (
    <Link to={postHref(post)} className="group grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
      <div className="aspect-[4/3] overflow-hidden rounded-[2rem] bg-ink lg:col-span-7">
        <img
          src={post.image}
          alt=""
          className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
        />
      </div>
      <div className="lg:col-span-5">
        <PostMeta post={post} />
        <h2 className="mt-5 text-[2rem] leading-[1.08] font-bold tracking-[-0.04em] text-ink transition-colors group-hover:text-brand sm:text-[2.75rem] lg:text-[3.25rem]">
          {post.title}
        </h2>
        <p className="mt-6 max-w-md text-[18px] leading-relaxed text-ink-muted">{post.summary}</p>
        <span className="mt-10 inline-flex h-12 items-center gap-2 rounded-full bg-brand px-7 text-[15px] font-medium text-white transition-colors group-hover:bg-brand-hover">
          Read the post
          <ArrowRight className="h-4 w-4" weight="bold" />
        </span>
      </div>
    </Link>
  )
}
