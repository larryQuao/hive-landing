import { Link } from 'react-router'
import photo from '@/assets/photos/hero-building.webp'
import type { Post } from '@/lib/blog'

export const post: Post = {
  slug: 'welcome-to-the-hive-blog',
  title: 'Welcome to the Hive blog',
  summary: 'Why we are writing, and what you can expect to read here.',
  topic: 'News',
  date: '2026-10-27',
  author: 'Hive team',
  image: photo,
  body: (
    <>
      <p>
        Property in Ghana should be simple to find, safe to pay for and straightforward to invest in. A big part of that
        is clear information, so we are starting a blog.
      </p>

      <h2>What we will write about</h2>
      <ul>
        <li>Practical guides for renters, buyers and investors.</li>
        <li>How our services work, in plain words.</li>
        <li>News from Hive and the property market.</li>
      </ul>

      <p>
        Have a question you would like us to answer? <Link to="/#contact">Get in touch</Link> and it may become our next
        post.
      </p>
    </>
  ),
}
