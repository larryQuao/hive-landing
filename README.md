# Hive Agency Ltd: company website

The public site for Hive Agency Ltd. It introduces the company and summarises its
five verticals (Hive, Hive Invest, Co-renting, Financing, Development), each with its own page.

Built with Vite, React, TypeScript and Tailwind CSS. Fonts: Manrope (headings)
and Inter (text). Colours: Hive blue `#0042e6`, black and white.

## Run it

```sh
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # production build into dist/
pnpm preview    # serve the build locally
pnpm lint
```

Copy `.env.example` to `.env` and fill it in (see the notes inside).

## Pages

One React app, with pages handled by React Router. All pages are listed in
`src/routes.tsx`; they share the header and footer from
`src/components/layout/site-layout.tsx`.

| Address              | Page                          |
| -------------------- | ----------------------------- |
| `/`                  | `src/pages/home.tsx`          |
| `/verticals/:slug`   | `src/pages/vertical.tsx`      |
| `/blog`              | `src/pages/blog.tsx`          |
| `/blog/:slug`        | `src/pages/post.tsx`          |
| `/privacy`           | `src/pages/privacy.tsx`       |
| anything else        | `src/pages/not-found.tsx`     |

**Adding a page:** create it in `src/pages/`, add one line to `src/routes.tsx`,
give it a `<PageMeta title="…" description="…" />` (sets the browser title and
search description), and add its address to `PAGES` in `vite.config.ts` so it
goes in the sitemap.

`vercel.json` sends every address to the app, so pages work when opened
directly or refreshed.

## Where to change things

- **Contact details and social links**: `src/lib/site.ts`.
  Social links are `#` until set; an empty value hides that icon.
- **Verticals** (name, wording, photo, icons, link): `src/lib/verticals.ts`,
  the only place they're defined. Each vertical's `href` is `#` until its real
  address is known. To add one, add an entry there and a photo in
  `src/assets/photos/verticals/`; its page and sitemap entry follow automatically.
- **Blog posts**: one file per post in `src/content/blog/`, named after the
  post's address (`before-you-rent-in-accra.tsx` is `/blog/before-you-rent-in-accra`).
  Copy an existing post to start a new one: set the title, summary, topic
  (one of `TOPICS` in `src/lib/blog.ts`), date, author and photo, then write
  the body. It appears on `/blog`, under its topic, on the home page while it's
  among the newest three, and in the sitemap, with nothing else to change.
- **Privacy policy**: `src/pages/privacy.tsx` (update the date when it changes).
- **Share preview**: the title, description and image that WhatsApp, LinkedIn
  and others show are in `index.html`; the image is `public/og-image.jpg`
  (1200 × 630).

## Settings

| Variable         | What it does                                                         |
| ---------------- | -------------------------------------------------------------------- |
| `VITE_SITE_URL`  | The site's own address. Needed for link previews, the sitemap and search. |
| `GOOGLE_*`       | Let the contact form save messages to the team's Google Sheet.       |

## Hosting

The site runs on Cloudflare Workers, set up in `wrangler.jsonc`. Every push to
`main` deploys. Cloudflare serves the built pages from `dist/` and sends any
`/api/*` request to `worker/index.ts`.

In the Cloudflare dashboard (Settings → Variables and Secrets), add the three
`GOOGLE_*` values as secrets. Add `VITE_SITE_URL` under build variables,
because it's baked into the pages when they're built.

The contact form's server code is in `server/contact.ts`. The Cloudflare worker
and `api/contact.ts` both use it. `api/contact.ts` is the Vercel version, which
`pnpm dev` also uses, so the site could move back to Vercel unchanged.
