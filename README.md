# Hive Agency Ltd: company website

The public site for Hive Agency Ltd. It introduces the company and summarises its
seven verticals (Hive Core, Hive Invest, Co-renting, Financing, Development,
Service Providers, Commerce), each with its own page.

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
- **Privacy policy**: `src/pages/privacy.tsx` (update the date when it changes).
- **Share preview**: the title, description and image that WhatsApp, LinkedIn
  and others show are in `index.html`; the image is `public/og-image.jpg`
  (1200 × 630).

## Settings

| Variable         | What it does                                                         |
| ---------------- | -------------------------------------------------------------------- |
| `VITE_SITE_URL`  | The site's own address. Needed for link previews, the sitemap and search. |
| `GOOGLE_*`       | Let the contact form save messages to the team's Google Sheet.       |

The contact form posts to `api/contact.ts`, a Vercel serverless function.
`pnpm dev` runs it locally too.
