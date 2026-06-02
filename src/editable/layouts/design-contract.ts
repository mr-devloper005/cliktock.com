import type { CSSProperties } from 'react'

export const editableRootStyle = {
  '--slot4-page-bg': '#070b14',
  '--slot4-page-text': '#f5f7f0',
  '--slot4-panel-bg': '#101621',
  '--slot4-surface-bg': '#0b111d',
  '--slot4-muted-text': '#b9c2b3',
  '--slot4-soft-muted-text': '#7f8b84',
  '--slot4-accent': '#79AE6F',
  '--slot4-accent-fill': '#00e986',
  '--slot4-accent-soft': '#9FCB98',
  '--slot4-dark-bg': '#050911',
  '--slot4-dark-text': '#f7faef',
  '--slot4-media-bg': '#142216',
  '--slot4-cream': '#F2EDC2',
  '--slot4-warm': '#346739',
  '--slot4-lavender': '#18251d',
  '--slot4-gray': '#0f151f',
  '--slot4-border': 'rgba(242,237,194,0.13)',
  '--slot4-nav-bg': 'rgba(22,27,38,0.94)',
  '--slot4-star-a': 'rgba(159,203,152,0.38)',
  '--slot4-star-b': 'rgba(242,237,194,0.24)',
  '--slot4-body-gradient':
    'radial-gradient(circle at 50% 17%, rgba(52,103,57,0.28), transparent 28%), radial-gradient(circle at 78% 48%, rgba(159,203,152,0.09), transparent 28%), linear-gradient(180deg, #0b111b 0%, #060a12 45%, #08101a 100%)',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent-fill)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  accentSoftBg: 'bg-[var(--slot4-accent-soft)]',
  accentSoftText: 'text-[var(--slot4-accent-soft)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  border: 'border-white/10',
  darkBorder: 'border-white/10',
  shadow: 'shadow-[0_18px_70px_rgba(0,0,0,0.28)]',
  shadowStrong: 'shadow-[0_28px_110px_rgba(0,0,0,0.46)]',
  overlay: 'bg-[linear-gradient(180deg,rgba(5,9,17,0.08),rgba(5,9,17,0.86))]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8',
    sectionY: 'py-16 sm:py-20 lg:py-28',
  },
  layout: {
    safeGrid: 'grid gap-5 md:grid-cols-2 xl:grid-cols-3',
    featureGrid: 'grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center',
    rail: 'flex snap-x gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    minRailCard: 'w-[280px] shrink-0 snap-start sm:w-[340px]',
  },
  type: {
    eyebrow: 'text-xs font-black uppercase tracking-[0.32em]',
    heroTitle: 'text-5xl font-black leading-[1.03] tracking-tight sm:text-6xl lg:text-[4.75rem]',
    sectionTitle: 'text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl',
    body: 'text-base leading-8',
  },
  surface: {
    card: `rounded-lg border ${editablePalette.border} bg-[#0c1320]/88 ${editablePalette.shadow}`,
    soft: `rounded-lg border ${editablePalette.border} bg-white/[0.045]`,
    dark: `rounded-lg border ${editablePalette.darkBorder} ${editablePalette.darkBg} ${editablePalette.darkText} ${editablePalette.shadowStrong}`,
  },
  button: {
    primary:
      'inline-flex items-center justify-center gap-2 rounded-md bg-[var(--slot4-accent-fill)] px-7 py-3 text-sm font-black text-[#04120c] transition hover:-translate-y-0.5 hover:bg-[#79AE6F]',
    secondary:
      'inline-flex items-center justify-center gap-2 rounded-md border border-[var(--slot4-accent-fill)] px-7 py-3 text-sm font-black text-[var(--slot4-accent-fill)] transition hover:-translate-y-0.5 hover:bg-[var(--slot4-accent-fill)] hover:text-[#04120c]',
    accent:
      'inline-flex items-center justify-center gap-2 rounded-md bg-[#F2EDC2] px-7 py-3 text-sm font-black text-[#0a120d] transition hover:-translate-y-0.5',
  },
  media: {
    frame: `relative overflow-hidden rounded-md ${editablePalette.mediaBg}`,
    ratio: 'aspect-[4/3]',
  },
  motion: {
    lift: 'transition duration-300 hover:-translate-y-1 hover:border-[var(--slot4-accent-fill)]/55 hover:shadow-[0_22px_70px_rgba(0,233,134,0.12)]',
    fade: 'transition duration-300 hover:opacity-85',
  },
} as const

export const aiLayoutRules = [
  'Keep the entire editable UI in a dark celestial visual system with green luxury accents.',
  'Keep dynamic post fetching intact; do not replace real posts with mock arrays.',
  'Use postHref() for task links so supported routes continue to work.',
  'Render missing image, category, and summary values with graceful fallbacks.',
] as const
