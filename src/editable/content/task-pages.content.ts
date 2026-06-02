import type { TaskKey } from '@/lib/site-config'

export type TaskPageVoice = {
  eyebrow: string
  headline: string
  description: string
  filterLabel: string
  secondaryNote: string
  chips: string[]
}

export const taskPageVoices = {
  article: {
    eyebrow: 'Reading desk',
    headline: 'Articles arranged for quiet, confident discovery.',
    description: 'Essays, guides, and updates keep a readable editorial rhythm while staying connected to the rest of the archive.',
    filterLabel: 'Choose article topic',
    secondaryNote: 'Readable posts need space, hierarchy, and clear next steps.',
    chips: ['Editorial pacing', 'Topic filters', 'Long-read friendly'],
  },
  classified: {
    eyebrow: 'Notice board',
    headline: 'Classified entries built for quick decisions.',
    description: 'Offers and notices stay practical, scannable, and direct without losing the premium interface.',
    filterLabel: 'Filter classified category',
    secondaryNote: 'Short summaries and direct action cues matter most here.',
    chips: ['Fast scan', 'Offers', 'Action cues'],
  },
  sbm: {
    eyebrow: 'Saved resources',
    headline: 'Social bookmarks arranged like a high-signal library.',
    description: 'Saved pages, references, tools, and collections become easier to search, compare, and revisit.',
    filterLabel: 'Filter collection',
    secondaryNote: 'Useful links need context, not clutter.',
    chips: ['Collections', 'Resources', 'Reference flow'],
  },
  profile: {
    eyebrow: 'People and profiles',
    headline: 'Profiles with identity, context, and discovery cues.',
    description: 'Profile pages make people, brands, and public identities easier to browse and understand.',
    filterLabel: 'Filter profile category',
    secondaryNote: 'Identity and credibility should be visible before the grid begins.',
    chips: ['Identity first', 'Trust cues', 'Public cards'],
  },
  pdf: {
    eyebrow: 'Document library',
    headline: 'Documents presented as useful reference material.',
    description: 'PDFs, reports, and files receive archive cues and clear action paths.',
    filterLabel: 'Filter document type',
    secondaryNote: 'Document surfaces need file context and clean browsing.',
    chips: ['Documents', 'Guides', 'Archive ready'],
  },
  listing: {
    eyebrow: 'Directory',
    headline: 'Listings designed for comparison and discovery.',
    description: 'Business and directory-style entries highlight identity, location, services, and contact paths.',
    filterLabel: 'Filter listing category',
    secondaryNote: 'Prioritize comparison, location, and direct action paths.',
    chips: ['Directory', 'Compare', 'Discovery'],
  },
  image: {
    eyebrow: 'Visual gallery',
    headline: 'Image posts with a gallery-first browsing experience.',
    description: 'Visual entries lead with media while keeping title, category, and summary context readable.',
    filterLabel: 'Filter visual category',
    secondaryNote: 'Let images carry the page before long text does.',
    chips: ['Gallery', 'Visual-first', 'Portfolio mood'],
  },
} satisfies Record<TaskKey, TaskPageVoice>
