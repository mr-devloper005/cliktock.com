import Link from 'next/link'
import { ArrowRight, Bookmark, Clock3, ExternalLink } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'

export function getEditablePostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const images = Array.isArray(content.images) ? content.images : []
  const contentImage = images.find((url): url is string => typeof url === 'string' && Boolean(url))
  const logo = typeof content.logo === 'string' ? content.logo : ''
  const avatar = typeof content.avatar === 'string' ? content.avatar : ''
  return mediaUrl || contentImage || logo || avatar || '/placeholder.svg?height=900&width=1400'
}

export function getEditableExcerpt(post?: SitePost | null, limit = 150) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    (typeof content.excerpt === 'string' && content.excerpt) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean || 'Open the post for details, context, and source information.'
}

export function getEditableCategory(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || 'Featured'
}

export function postHref(task: TaskKey, post: SitePost, route = `/${task}`) {
  return `${route}/${post.slug}`
}

export function EditorialFeatureCard({ post, href, label = 'Featured signal' }: { post: SitePost; href: string; label?: string }) {
  return (
    <Link href={href} className={`group block min-w-0 overflow-hidden ${dc.surface.dark} ${dc.motion.lift}`}>
      <div className="relative min-h-[500px] p-6 sm:p-8">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-46 transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,11,20,0.12),rgba(7,11,20,0.95))]" />
        <div className="relative z-10 flex min-h-[440px] flex-col justify-end">
          <span className="text-xs font-black uppercase tracking-[0.3em] text-[var(--slot4-accent-fill)]">{label}</span>
          <h3 className="mt-5 max-w-3xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl">{post.title}</h3>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70">{getEditableExcerpt(post, 190)}</p>
          <span className={dc.button.secondary + ' mt-8 w-fit'}>
            Open resource <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}

export function RailPostCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className={`group ${dc.layout.minRailCard} block overflow-hidden ${dc.surface.card} ${dc.motion.lift}`}>
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--slot4-media-bg)]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-82 transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070b14]/80 to-transparent" />
        <span className="absolute left-4 top-4 rounded-md bg-[#101621]/85 px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-[var(--slot4-accent-fill)]">No. {String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="p-5">
        <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--slot4-accent-fill)]">{getEditableCategory(post)}</p>
        <h3 className="mt-3 line-clamp-3 text-xl font-black leading-tight tracking-tight text-white">{post.title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/58">{getEditableExcerpt(post, 135)}</p>
      </div>
    </Link>
  )
}

export function CompactIndexCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className={`group block min-w-0 ${dc.surface.soft} p-5 ${dc.motion.lift}`}>
      <div className="flex items-start gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[rgba(0,233,134,0.13)] text-sm font-black text-[var(--slot4-accent-fill)]">{index + 1}</span>
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.22em] text-white/45"><Clock3 className="h-3.5 w-3.5" /> {getEditableCategory(post)}</p>
          <h3 className="mt-2 line-clamp-2 text-lg font-black leading-tight text-white">{post.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/55">{getEditableExcerpt(post, 105)}</p>
        </div>
      </div>
    </Link>
  )
}

export function ArticleListCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className={`group grid min-w-0 gap-5 overflow-hidden ${dc.surface.card} p-4 ${dc.motion.lift} sm:grid-cols-[220px_minmax(0,1fr)]`}>
      <div className="relative aspect-[16/11] overflow-hidden rounded-md bg-[var(--slot4-media-bg)] sm:aspect-auto sm:min-h-[180px]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-88 transition duration-700 group-hover:scale-105" />
      </div>
      <div className="min-w-0 p-2 sm:py-4 sm:pr-5">
        <p className="text-[11px] font-black uppercase tracking-[0.26em] text-[var(--slot4-accent-fill)]">Insight {String(index + 1).padStart(2, '0')}</p>
        <h2 className="mt-3 line-clamp-3 text-2xl font-black leading-tight tracking-tight text-white sm:text-3xl">{post.title}</h2>
        <p className="mt-4 line-clamp-3 text-sm leading-7 text-white/58">{getEditableExcerpt(post, 180)}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[var(--slot4-accent-fill)]">
          Open entry <ExternalLink className="h-4 w-4" />
        </span>
      </div>
    </Link>
  )
}

export function BookmarkSignalCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className={`group block ${dc.surface.card} p-7 ${dc.motion.lift}`}>
      <div className="flex items-center justify-between gap-4">
        <Bookmark className="h-6 w-6 text-[var(--slot4-accent-fill)]" />
        <span className="text-[11px] font-black uppercase tracking-[0.24em] text-white/42">Save {String(index + 1).padStart(2, '0')}</span>
      </div>
      <h3 className="mt-12 line-clamp-3 text-2xl font-black leading-tight text-white">{post.title}</h3>
      <p className="mt-4 line-clamp-4 text-sm leading-7 text-white/58">{getEditableExcerpt(post, 150)}</p>
    </Link>
  )
}
