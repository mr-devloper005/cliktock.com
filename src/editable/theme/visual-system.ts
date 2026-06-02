import { slot4BrandConfig } from './brand.config'

export type Slot4VisualPreset =
  | 'cliktock-celestial'
  | 'editorial-paper'
  | 'luxury-atelier'
  | 'brutalist-index'
  | 'organic-journal'
  | 'tech-directory'
  | 'retro-bulletin'
  | 'visual-gallery'

export const visualPresets = {
  'cliktock-celestial': {
    label: 'CLIKTOCK Celestial',
    mood: 'premium, dark, spatial, editorial',
    fontDirection: 'clean geometric sans with large centered statements',
    colors: {
      background: '#070b14',
      foreground: '#f5f7f0',
      muted: '#9aa79c',
      primary: '#00e986',
      accent: '#79AE6F',
      surface: '#101621',
    },
    shape: 'floating nav, fine borders, dark panels, constellation details',
  },
  'editorial-paper': {
    label: 'Editorial Paper',
    mood: 'quiet reading authority',
    fontDirection: 'serif headlines with calm body',
    colors: { background: '#070b14', foreground: '#f5f7f0', muted: '#9aa79c', primary: '#00e986', accent: '#79AE6F', surface: '#101621' },
    shape: 'dark reading panels',
  },
  'luxury-atelier': {
    label: 'Luxury Atelier',
    mood: 'premium and restrained',
    fontDirection: 'large display headlines',
    colors: { background: '#070b14', foreground: '#f5f7f0', muted: '#9aa79c', primary: '#00e986', accent: '#79AE6F', surface: '#101621' },
    shape: 'fine bordered dark cards',
  },
  'brutalist-index': {
    label: 'Brutalist Index',
    mood: 'bold index',
    fontDirection: 'dense sans',
    colors: { background: '#070b14', foreground: '#f5f7f0', muted: '#9aa79c', primary: '#00e986', accent: '#79AE6F', surface: '#101621' },
    shape: 'hard dark blocks',
  },
  'organic-journal': {
    label: 'Organic Journal',
    mood: 'natural and connected',
    fontDirection: 'human sans',
    colors: { background: '#070b14', foreground: '#f5f7f0', muted: '#9aa79c', primary: '#00e986', accent: '#79AE6F', surface: '#101621' },
    shape: 'green editorial panels',
  },
  'tech-directory': {
    label: 'Tech Directory',
    mood: 'clean and useful',
    fontDirection: 'modern sans',
    colors: { background: '#070b14', foreground: '#f5f7f0', muted: '#9aa79c', primary: '#00e986', accent: '#79AE6F', surface: '#101621' },
    shape: 'structured dark directory',
  },
  'retro-bulletin': {
    label: 'Retro Bulletin',
    mood: 'active bulletin',
    fontDirection: 'bold sans',
    colors: { background: '#070b14', foreground: '#f5f7f0', muted: '#9aa79c', primary: '#00e986', accent: '#79AE6F', surface: '#101621' },
    shape: 'stacked cards',
  },
  'visual-gallery': {
    label: 'Visual Gallery',
    mood: 'image-led and immersive',
    fontDirection: 'minimal sans',
    colors: { background: '#070b14', foreground: '#f5f7f0', muted: '#9aa79c', primary: '#00e986', accent: '#79AE6F', surface: '#101621' },
    shape: 'cosmic image panels',
  },
} as const

export const visualSystem = {
  productKind: slot4BrandConfig.productKind,
  recommendedPreset: 'cliktock-celestial',
  radius: { sm: '0.375rem', md: '0.5rem', lg: '0.75rem', xl: '1rem' },
  motion: {
    pageLoad: 'animate-in fade-in slide-in-from-bottom-4 duration-700',
    cardHover: 'transition duration-300 hover:-translate-y-1 hover:border-[var(--slot4-accent-fill)]/55',
    softHover: 'transition duration-300 hover:opacity-85',
    reduceMotionSafe: 'motion-reduce:transform-none motion-reduce:transition-none',
  },
  typography: {
    eyebrow: 'text-xs font-black uppercase tracking-[0.32em]',
    heroTitle: 'text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl',
    sectionTitle: 'text-3xl font-black tracking-tight sm:text-4xl',
    body: 'text-base leading-8',
    caption: 'text-xs font-black uppercase tracking-[0.22em]',
  },
  surfaces: {
    glass: 'border border-white/10 bg-white/[0.045] backdrop-blur-xl',
    paper: 'border border-white/10 bg-[#101621]',
    quiet: 'border border-white/10 bg-white/[0.035]',
    dark: 'border border-white/10 bg-[#070b14] shadow-[0_24px_70px_rgba(0,0,0,0.34)]',
  },
  layout: {
    page: 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8',
    sectionY: 'py-16 sm:py-20 lg:py-28',
    cardGrid: 'grid gap-5 sm:grid-cols-2 lg:grid-cols-3',
  },
} as const

export function getVisualPreset(name: Slot4VisualPreset = visualSystem.recommendedPreset as Slot4VisualPreset) {
  return visualPresets[name]
}
