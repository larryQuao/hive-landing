import { createBrowserRouter } from 'react-router'
import { SiteLayout } from '@/components/layout/site-layout'
import { HomePage } from '@/pages/home'

/**
 * Every page on the site. To add one: create it in src/pages and list it here.
 * (Also add its address to PAGES in vite.config.ts so it goes in the sitemap.)
 *
 * The home page loads with the site; the others load when first visited, so
 * the first screen stays quick as the site grows.
 */
export const router = createBrowserRouter([
  {
    element: <SiteLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      {
        path: '/verticals/:slug',
        lazy: async () => ({ Component: (await import('@/pages/vertical')).VerticalPage }),
      },
      {
        path: '/blog',
        lazy: async () => ({ Component: (await import('@/pages/blog')).BlogPage }),
      },
      {
        path: '/blog/:slug',
        lazy: async () => ({ Component: (await import('@/pages/post')).PostPage }),
      },
      {
        path: '/privacy',
        lazy: async () => ({ Component: (await import('@/pages/privacy')).PrivacyPage }),
      },
      {
        path: '*',
        lazy: async () => ({ Component: (await import('@/pages/not-found')).NotFoundPage }),
      },
    ],
  },
])
