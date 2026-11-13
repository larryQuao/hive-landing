import { Link } from 'react-router'
import photo from '@/assets/photos/verticals/hive.webp'
import type { Post } from '@/lib/blog'

export const post: Post = {
  slug: 'before-you-rent-in-accra',
  title: 'Six things to check before you rent in Accra',
  summary: 'A short checklist for viewing a home, so you know what you are paying for before any money changes hands.',
  topic: 'Renting',
  date: '2026-11-10',
  author: 'Hive team',
  image: photo,
  body: (
    <>
      <p>
        Finding a place to rent is exciting, and it is easy to rush. A few minutes of checking at the viewing can save
        you months of trouble. Here is what we suggest looking at every time.
      </p>

      <h2>1. Who you are dealing with</h2>
      <p>
        Ask whether the person showing the home is the owner or an agent acting for them. If it is an agent, ask how
        long they have worked with the owner and how to reach the owner if something goes wrong.
      </p>

      <h2>2. The full cost, written down</h2>
      <p>
        Rent is rarely the only cost. Ask for every amount in writing: the rent, how many months are due upfront, any
        agent fee, and any charges for water, refuse or security.
      </p>

      <h2>3. Water and power</h2>
      <ul>
        <li>Turn on the taps and check the pressure.</li>
        <li>Ask whether there is a water tank and how often it is filled.</li>
        <li>Ask whether the meter is prepaid and shared with anyone else.</li>
      </ul>

      <h2>4. The state of the home</h2>
      <p>
        Look for damp on walls and ceilings, test doors and windows, and take photos of anything already damaged.
        Share the photos with the owner before you move in.
      </p>

      <h2>5. The area at different times</h2>
      <p>If you can, visit once in the evening. Traffic, noise and lighting can feel very different after dark.</p>

      <h2>6. How you will pay</h2>
      <p>
        Avoid handing over cash before you have a signed agreement. On <Link to="/verticals/hive">Hive</Link>, payments
        are held in escrow, so the money only moves on when both sides are happy.
      </p>

      <blockquote>If something feels rushed or unclear, it is fine to walk away and keep looking.</blockquote>
    </>
  ),
}
