import { Link } from 'react-router'
import { topicHref, USED_TOPICS, type Topic } from '@/lib/blog'

const PILL = 'inline-flex h-10 shrink-0 items-center whitespace-nowrap rounded-full border px-5 text-sm font-medium transition-colors'
const ON = 'border-ink bg-ink text-white'
const OFF = 'border-line text-ink-muted hover:border-ink hover:text-ink'

/** "All" plus each topic that has posts. One row, swiping sideways on small screens. */
export function TopicFilter({ current }: { current: Topic | null }) {
  return (
    <nav aria-label="Topics" className="-mx-6 lg:mx-0">
      <ul className="scrollbar-none flex gap-2 overflow-x-auto px-6 lg:flex-wrap lg:px-0">
        <li>
          <Link to="/blog" aria-current={current === null ? 'page' : undefined} className={`${PILL} ${current === null ? ON : OFF}`}>
            All posts
          </Link>
        </li>
        {USED_TOPICS.map((t) => (
          <li key={t}>
            <Link to={topicHref(t)} aria-current={current === t ? 'page' : undefined} className={`${PILL} ${current === t ? ON : OFF}`}>
              {t}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
