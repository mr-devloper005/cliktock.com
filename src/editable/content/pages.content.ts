import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'CLIKTOCK social bookmarking discovery',
      description: 'Explore saved resources, bookmarks, collections, and useful public posts through a premium discovery interface.',
      openGraphTitle: 'CLIKTOCK social bookmarking discovery',
      openGraphDescription: 'Discover saved links, collections, and useful posts through a polished archive.',
      keywords: ['social bookmarking', 'saved resources', 'public archive'],
    },
    hero: {
      badge: 'Public archive',
      title: ['Save smarter', 'share cleaner', 'discover faster'],
      description: 'A polished place to browse saved resources, collections, and connected posts.',
      primaryCta: { label: 'Explore bookmarks', href: '/social-bookmarking' },
      secondaryCta: { label: 'Search archive', href: '/search' },
      searchPlaceholder: 'Search saved pages, collections, topics, and titles',
      focusLabel: 'Focus',
      featureCardBadge: 'Featured resource',
      featureCardTitle: 'Useful posts stay readable, searchable, and connected.',
      featureCardDescription: 'Recent entries shape the homepage without changing how the site receives or renders post data.',
    },
    intro: {
      badge: 'Archive rhythm',
      title: 'A cleaner way to move between bookmarks, collections, and public posts.',
      paragraphs: [
        'The site keeps useful entries easy to scan while still giving every post enough room for context.',
        'Bookmarks, collections, articles, visuals, listings, and documents can sit in one visual system without losing their own purpose.',
        'Visitors can start with search, a category, or a featured bookmark and continue discovering related material naturally.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'Search-first browsing for saved resources and collections.',
        'Multiple card styles for different post types and reading moments.',
        'Detail pages that stay safe when media or summaries are missing.',
        'Dark premium styling with focused green action cues.',
      ],
      primaryLink: { label: 'Browse bookmarks', href: '/social-bookmarking' },
      secondaryLink: { label: 'Search bookmarks', href: '/search' },
    },
    cta: {
      badge: 'Start exploring',
      title: 'Find useful public entries through one connected experience.',
      description: 'Move between saved pages, resources, collections, and topics without losing context.',
      primaryCta: { label: 'Browse Bookmarks', href: '/social-bookmarking' },
      secondaryCta: { label: 'Contact', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest posts in this section.',
    },
  },
  about: {
    badge: 'About CLIKTOCK',
    title: 'A refined way to collect, revisit, and share useful links.',
    description: 'CLIKTOCK is built around public discovery, making bookmarked resources feel easier to explore, revisit, and understand at a glance.',
    paragraphs: [
      'The experience is shaped for people who browse with intent, save useful pages, and want a cleaner way to move through public resources online.',
      'Instead of treating every entry the same, the site gives bookmarked pages a more editorial presentation with space for titles, summaries, categories, source links, and safe fallbacks when details are missing.',
      'Search, discovery, and browsing work together so visitors can land on one useful page and continue naturally into related resources without losing context.',
    ],
    values: [
      { title: 'Bookmark-first discovery', description: 'Useful links are presented as readable entries instead of bare URLs, helping visitors decide faster what to open next.' },
      { title: 'Clean public browsing', description: 'Categories, summaries, and structured layouts keep the archive easy to scan across search, listing, and detail views.' },
      { title: 'Reliable presentation', description: 'Each post stays usable even when optional fields like images, summaries, or categories are unavailable.' },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'Send a note about publishing, bookmarks, or saved resources.',
    description: 'Tell us what you are trying to submit, update, or clarify. The message will move through the existing contact workflow.',
    formTitle: 'Send a message',
  },
  search: {
    metadata: {
      title: 'Search',
      description: 'Search saved resources, collections, categories, and posts across the site.',
    },
    hero: {
      badge: 'Search the archive',
      title: 'Find saved pages, collections, visuals, and resources faster.',
      description: 'Use keywords, categories, and content types to discover public entries from every active section.',
      placeholder: 'Search by keyword, topic, category, or title',
    },
    resultsTitle: 'Latest searchable entries',
  },
  create: {
    metadata: {
      title: 'Create',
      description: 'Create and submit new content for the site.',
    },
    locked: {
      badge: 'Creator access',
      title: 'Login to create a new entry.',
      description: 'Use your account to open the publishing workspace and create posts for the active sections of this site.',
    },
    hero: {
      badge: 'Publishing workspace',
      title: 'Create entries for every active section.',
      description: 'Choose the content type, add details, and prepare a clean post with images, links, summary, and body content.',
    },
    formTitle: 'Entry details',
    submitLabel: 'Submit entry',
    successTitle: 'Entry submitted successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Login page for this site.',
      badge: 'Member access',
      title: 'Welcome back to the archive.',
      description: 'Login to continue browsing, managing submissions, and creating new entries from your account.',
      formTitle: 'Login',
      submitLabel: 'Continue',
      noAccount: 'No account matched these details. Create an account first, then login.',
      success: 'Login successful. Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Signup page for this site.',
      badge: 'Site access',
      title: 'Create your account and start publishing.',
      description: 'Create an account to access the publishing workspace, save details, and submit content through the site.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created successfully. Redirecting...',
      loginCta: 'Login',
    },
  },
  detailPages: {
    article: { relatedTitle: 'Related articles', fallbackTitle: 'Article details' },
    listing: { relatedTitle: 'Related listings', fallbackTitle: 'Listing details' },
    image: { relatedTitle: 'Related visuals', fallbackTitle: 'Image details' },
    profile: { relatedTitle: 'Suggested entries', fallbackDescription: 'Profile details will appear here once available.', visitButton: 'Visit site' },
  },
} as const
