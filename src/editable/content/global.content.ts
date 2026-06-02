import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline || 'Social bookmarking discovery',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: 'Social bookmarking discovery',
    primaryLinks: [
      { label: 'Bookmarks', href: '/social-bookmarking' },
      { label: 'Search', href: '/search' },
      { label: 'Contact', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Explore archive', href: '/social-bookmarking' },
      secondary: { label: 'Create', href: '/create' },
    },
  },
  footer: {
    tagline: 'Useful pages, bookmark collections, and saved resources',
    description: 'A polished discovery surface for saved links, bookmark collections, articles, listings, visuals, documents, and other useful posts.',
    columns: [
      {
        title: 'Explore',
        links: [
          { label: 'Bookmarks', href: '/social-bookmarking' },
          { label: 'Articles', href: '/articles' },
          { label: 'Search', href: '/search' },
        ],
      },
      {
        title: 'Site',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ],
      },
    ],
    bottomNote: 'Built for clean discovery and connected publishing.',
  },
  commonLabels: {
    readMore: 'Open entry',
    viewAll: 'View all',
    explore: 'Explore',
    latest: 'Latest',
    related: 'Related',
    published: 'Published',
  },
} as const
