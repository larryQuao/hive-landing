import { Link } from 'react-router'
import photo from '@/assets/photos/verticals/co-renting.webp'
import type { Post } from '@/lib/blog'

export const post: Post = {
  slug: 'what-is-co-renting',
  title: 'Co-renting: sharing a home without the guesswork',
  summary: 'How sharing a home or an office can lower your costs, and what makes a good match.',
  topic: 'Sharing',
  date: '2026-11-03',
  author: 'Hive team',
  image: photo,
  body: (
    <>
      <p>
        Renting on your own in a good part of the city can take a large share of your income. Sharing a home with the
        right people is one of the simplest ways to bring that cost down.
      </p>

      <h2>What makes a good match</h2>
      <p>
        Most sharing problems come from mismatched expectations, not bad people. The things that matter most are a
        similar budget, the area you want to live in, and when you want to move in.
      </p>

      <h2>Agree the basics early</h2>
      <ul>
        <li>How rent and bills are split.</li>
        <li>Who pays whom, and when.</li>
        <li>House rules on guests, cleaning and quiet hours.</li>
      </ul>

      <h2>Not just for homes</h2>
      <p>
        The same idea works for offices. Small teams and freelancers can share a workspace and its costs instead of
        each renting a whole floor.
      </p>
      <p>
        <Link to="/verticals/co-renting">Co-renting</Link> matches people by budget, location and move-in date, and
        holds payments in escrow until both sides confirm.
      </p>
    </>
  ),
}
