import Link from 'next/link'
import type { CSSProperties } from 'react'
import { notFound } from 'next/navigation'
import { ArrowLeft, Bookmark, Building2, Camera, CheckCircle2, Download, ExternalLink, FileText, Globe2, Mail, MapPin, MessageCircle, Phone, Tag, UserRound } from 'lucide-react'
import { buildPostMetadata, buildTaskMetadata } from '@/lib/seo'
import { buildPostUrl, fetchArticleComments, fetchTaskPostBySlug, fetchTaskPosts } from '@/lib/task-data'
import { getTaskConfig, SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { ProfileHeaderActions } from '@/editable/components/ProfileHeaderActions'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { getVisualPreset, visualSystem } from '@/editable/theme/visual-system'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'
import { Ads } from '@/lib/ads'

export const revalidate = 3

export async function generateEditableDetailMetadata(task: TaskKey, params: Promise<{ slug?: string; username?: string }>) {
  const resolved = await params
  const slug = resolved.slug || resolved.username || ''
  const post = await fetchTaskPostBySlug(task, slug)
  return post ? await buildPostMetadata(task, post) : await buildTaskMetadata(task)
}

export async function EditableTaskDetailRoute({ task, params }: { task: TaskKey; params: Promise<{ slug?: string; username?: string }> }) {
  const resolved = await params
  const slug = resolved.slug || resolved.username || ''
  const post = await fetchTaskPostBySlug(task, slug)
  if (!post) notFound()
  const related = (await fetchTaskPosts(task, 7)).filter((item) => item.slug !== post.slug).slice(0, 4)
  const comments = task === 'article' ? await fetchArticleComments(post.slug, 50) : []
  return <TaskDetailView task={task} post={post} related={related} comments={comments} />
}

const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const asText = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const isUrl = (value: string) => value.startsWith('/') || /^https?:\/\//i.test(value)

const getField = (post: SitePost, keys: string[]) => {
  const content = getContent(post)
  for (const key of keys) {
    const value = asText(content[key])
    if (value) return value
  }
  return ''
}

const getImages = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.map((item) => item?.url).filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const images = Array.isArray(content.images) ? content.images.filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const singleImages = ['image', 'featuredImage', 'thumbnail', 'logo', 'avatar'].map((key) => asText(content[key])).filter((url) => url && isUrl(url))
  return [...media, ...images, ...singleImages].filter(Boolean).slice(0, 12)
}

const getBody = (post: SitePost) => {
  const content = getContent(post)
  return asText(content.body) || asText(content.description) || asText(content.details) || post.summary || 'Details will appear here once available.'
}

const escapeHtml = (value: string) => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;')

const safeUrl = (value: string) => /^https?:\/\//i.test(value) ? value : '#'

const linkifyMarkdown = (value: string) => value
  .replace(/\[([^\]]+)]\((https?:\/\/[^\s)]+)\)/gi, (_match, label, url) => `<a href="${safeUrl(url)}" target="_blank" rel="nofollow noopener noreferrer">${label}</a>`)

const linkifyText = (value: string) => linkifyMarkdown(value)
  .replace(/(^|[\s(>])((https?:\/\/)[^\s<)]+)/gi, (_match, prefix, url) => `${prefix}<a href="${safeUrl(url)}" target="_blank" rel="nofollow noopener noreferrer">${url}</a>`)

const hardenLinks = (html: string) => html.replace(/<a\s+([^>]*href=["'][^"']+["'][^>]*)>/gi, (_match, attrs) => {
  let next = String(attrs).replace(/\s+on\w+=("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
  if (!/\starget=/i.test(next)) next += ' target="_blank"'
  if (!/\srel=/i.test(next)) next += ' rel="nofollow noopener noreferrer"'
  return `<a ${next}>`
})

const sanitizeHtml = (html: string) => hardenLinks(html
  .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
  .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
  .replace(/<(iframe|object|embed)[^>]*>[\s\S]*?<\/\1>/gi, '')
  .replace(/\s+on\w+=("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
  .replace(/(href|src)=(['"])javascript:[\s\S]*?\2/gi, '$1="#"'))

const formatPlainText = (raw: string) => {
  const value = raw.trim()
  if (!value) return ''
  if (/<[a-z][\s\S]*>/i.test(value)) return sanitizeHtml(linkifyMarkdown(value))
  return value
    .split(/\n{2,}/)
    .map((part) => `<p>${linkifyText(escapeHtml(part).replace(/\n/g, '<br />'))}</p>`)
    .join('')
}

const summaryText = (post: SitePost) => post.summary || asText(getContent(post).description) || asText(getContent(post).excerpt) || ''
const categoryOf = (post: SitePost, fallback: string) => asText(getContent(post).category) || post.tags?.[0] || fallback
const mapSrcFor = (post: SitePost) => {
  const address = getField(post, ['address', 'location', 'city'])
  const lat = getField(post, ['lat', 'latitude'])
  const lng = getField(post, ['lng', 'lon', 'longitude'])
  if (lat && lng) return `https://maps.google.com/maps?q=${encodeURIComponent(`${lat},${lng}`)}&z=14&output=embed`
  if (address) return `https://maps.google.com/maps?q=${encodeURIComponent(address)}&z=13&output=embed`
  return ''
}

export function TaskDetailView({ task, post, related, comments = [] }: { task: TaskKey; post: SitePost; related: SitePost[]; comments?: Array<{ id: string; name: string; comment: string; createdAt: string }> }) {
  const preset = getVisualPreset(visualSystem.recommendedPreset as any)
  const detailVars = { '--detail-bg': preset.colors.background, '--detail-text': preset.colors.foreground, '--detail-surface': preset.colors.surface, '--detail-accent': preset.colors.primary } as CSSProperties

  return (
    <EditableSiteShell>
      <main style={detailVars} className={`editable-cosmos ${dc.shell.page}`}>
        {task === 'listing' ? <ListingDetail post={post} related={related} /> : null}
        {task === 'classified' ? <ClassifiedDetail post={post} related={related} /> : null}
        {task === 'image' ? <ImageDetail post={post} related={related} /> : null}
        {task === 'sbm' ? <BookmarkDetail post={post} related={related} /> : null}
        {task === 'pdf' ? <PdfDetail post={post} related={related} /> : null}
        {task === 'profile' ? <ProfileDetail post={post} related={related} /> : null}
        {task === 'article' ? <ArticleDetail post={post} related={related} comments={comments} /> : null}
        <div className="mx-auto max-w-6xl px-4 py-6">
          <Ads
            slot="article-bottom"
            showLabel
            eager
            className="mx-auto w-full"
            fallback={(
              <div className="mx-auto max-w-[336px]">
                <Ads slot="sidebar" showLabel eager className="mx-auto w-full" />
              </div>
            )}
          />
        </div>
      </main>
    </EditableSiteShell>
  )
}

function BackLink({ task }: { task: TaskKey }) {
  const taskConfig = getTaskConfig(task)
  return (
    <Link href={taskConfig?.route || '/'} className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.045] px-4 py-2 text-sm font-black text-white/78 transition hover:text-[var(--detail-accent)]">
      <ArrowLeft className="h-4 w-4" /> Back to {taskConfig?.label || 'posts'}
    </Link>
  )
}

function ArticleDetail({ post, related, comments }: { post: SitePost; related: SitePost[]; comments: Array<{ id: string; name: string; comment: string; createdAt: string }> }) {
  const images = getImages(post)
  return (
    <section className="mx-auto grid max-w-[1200px] gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_350px] lg:px-8 lg:py-20">
      <article className="min-w-0 rounded-lg border border-white/10 bg-[var(--detail-surface)]/90 p-5 shadow-[0_30px_100px_rgba(0,0,0,0.34)] sm:p-8 lg:p-12">
        <BackLink task="article" />
        <p className="mt-8 text-xs font-black uppercase tracking-[0.28em] text-[var(--detail-accent)]">{categoryOf(post, 'Article')}</p>
        <h1 className="mt-4 text-4xl font-black leading-[0.98] tracking-[-0.07em] sm:text-5xl lg:text-7xl">{post.title}</h1>
        {images[0] ? <img src={images[0]} alt="" className="mt-8 max-h-[620px] w-full rounded-md object-cover" /> : null}
        <BodyContent post={post} />
        <EditableComments slug={post.slug} comments={comments} />
      </article>
      <RelatedPanel task="article" post={post} related={related} />
    </section>
  )
}

function ListingDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const images = getImages(post)
  const logo = images[0]
  const address = getField(post, ['address', 'location', 'city'])
  const phone = getField(post, ['phone', 'telephone', 'mobile'])
  const email = getField(post, ['email'])
  const website = getField(post, ['website', 'url'])
  const mapSrc = mapSrcFor(post)
  return (
    <section className="mx-auto max-w-[1200px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <BackLink task="listing" />
      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
        <article className="rounded-lg border border-white/10 bg-[#0c1320]/90 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.32)] sm:p-9">
          <div className="grid gap-6 sm:grid-cols-[150px_1fr]">
            <div className="flex h-36 w-36 items-center justify-center overflow-hidden rounded-md bg-black/30 ring-1 ring-white/10">
              {logo ? <img src={logo} alt="" className="h-full w-full object-cover" /> : <Building2 className="h-14 w-14 opacity-40" />}
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--detail-accent)]">Business listing</p>
              <h1 className="mt-3 text-4xl font-black leading-[0.98] tracking-[-0.07em] sm:text-6xl">{post.title}</h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-white/70">{summaryText(post)}</p>
            </div>
          </div>
          <InfoGrid items={[['Location', address, MapPin], ['Phone', phone, Phone], ['Email', email, Mail], ['Website', website, Globe2]]} />
          <BodyContent post={post} />
          <ImageStrip images={images.slice(1)} label="Business showcase" />
        </article>
        <aside className="space-y-5">
          {mapSrc ? <MapBox src={mapSrc} label={address || post.title} /> : <ContactAction website={website} phone={phone} email={email} />}
          {mapSrc ? <ContactAction website={website} phone={phone} email={email} /> : null}
          <RelatedPanel task="listing" post={post} related={related} compact />
        </aside>
      </div>
    </section>
  )
}

function ClassifiedDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const images = getImages(post)
  const price = getField(post, ['price', 'amount', 'budget'])
  const location = getField(post, ['location', 'address', 'city'])
  const condition = getField(post, ['condition', 'availability', 'type'])
  const phone = getField(post, ['phone', 'telephone', 'mobile'])
  const email = getField(post, ['email'])
  const website = getField(post, ['website', 'url'])
  return (
    <section className="mx-auto grid max-w-[1200px] gap-7 px-4 py-14 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8 lg:py-20">
      <aside className="rounded-lg border border-white/10 bg-[#101621] p-7 text-white shadow-xl lg:sticky lg:top-24 lg:self-start">
        <BackLink task="classified" />
        <p className="mt-10 text-xs font-black uppercase tracking-[0.28em] opacity-60">Classified notice</p>
        <h1 className="mt-4 text-4xl font-black leading-[0.98] tracking-[-0.07em] sm:text-5xl">{post.title}</h1>
        <div className="mt-8 grid gap-3">
          {price ? <BadgeLine label="Price" value={price} /> : null}
          {condition ? <BadgeLine label="Condition" value={condition} /> : null}
          {location ? <BadgeLine label="Location" value={location} /> : null}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          {phone ? <a href={`tel:${phone}`} className="rounded-full bg-[var(--detail-bg)] px-5 py-3 text-sm font-black text-[var(--detail-text)]">Call now</a> : null}
          {email ? <a href={`mailto:${email}`} className="rounded-full border border-white/25 px-5 py-3 text-sm font-black">Email</a> : null}
        </div>
      </aside>
        <article className="rounded-lg border border-white/10 bg-[#0c1320]/90 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.32)] sm:p-9">
        <ImageStrip images={images} label="Offer images" large />
        <BodyContent post={post} />
        <ContactAction website={website} phone={phone} email={email} />
        <RelatedPanel task="classified" post={post} related={related} />
      </article>
    </section>
  )
}

function ImageDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const images = getImages(post)
  return (
    <section className="mx-auto max-w-[1200px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <BackLink task="image" />
      <div className="mt-8 grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
        <aside className="rounded-lg border border-white/10 bg-[#0c1320]/90 p-7 lg:sticky lg:top-24 lg:self-start">
          <div className="inline-flex items-center gap-2 rounded-md bg-[var(--detail-accent)] px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#04120c]"><Camera className="h-4 w-4" /> Image story</div>
          <h1 className="mt-6 text-4xl font-black leading-[0.98] tracking-[-0.07em] sm:text-5xl">{post.title}</h1>
          <p className="mt-5 text-base leading-8 text-white/70">{summaryText(post)}</p>
          <BodyContent post={post} compact />
        </aside>
        <div className="columns-1 gap-5 space-y-5 md:columns-2">
          {(images.length ? images : ['/placeholder.svg?height=900&width=1200']).map((image, index) => (
            <figure key={`${image}-${index}`} className="break-inside-avoid overflow-hidden rounded-lg border border-white/10 bg-[#0c1320]/90 shadow-sm">
              <img src={image} alt="" className="w-full object-cover" />
              {index === 0 ? <figcaption className="p-5 text-sm font-bold opacity-65">Featured visual from this image post.</figcaption> : null}
            </figure>
          ))}
        </div>
      </div>
      <div className="mt-10"><RelatedPanel task="image" post={post} related={related} /></div>
    </section>
  )
}

function BookmarkDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const website = getField(post, ['website', 'url', 'link'])
  const category = categoryOf(post, 'Saved resource')
  const body = formatPlainText(getBody(post))
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-[1200px]">
        <BackLink task="sbm" />

        <article className="mt-7 overflow-hidden rounded-lg border border-white/10 bg-[#08101a] shadow-[0_34px_120px_rgba(0,0,0,0.42)]">
          <div className="grid lg:grid-cols-[minmax(0,1.08fr)_260px]">
            <div className="relative flex flex-col justify-between overflow-hidden p-7 sm:p-10 lg:p-12">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(0,233,134,0.22),transparent_28%),linear-gradient(135deg,rgba(159,203,152,0.08),transparent_46%)]" />
              <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full border border-[var(--detail-accent)]/20" />
              <div className="pointer-events-none absolute bottom-12 right-12 h-44 w-44 rounded-full border border-white/10" />

              <div className="relative">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-md bg-[var(--detail-accent)] px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#04120c]">
                    <Bookmark className="h-4 w-4" /> Saved page
                  </span>
                  <span className="rounded-md border border-white/10 bg-white/[0.045] px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-white/58">{category}</span>
                </div>
                <h1 className="mt-10 max-w-4xl text-4xl font-black leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">{post.title}</h1>
              </div>

              <div className="relative mt-10 h-px w-full bg-gradient-to-r from-[var(--detail-accent)]/60 via-white/10 to-transparent" />
            </div>
            <aside className="flex items-center border-t border-white/10 bg-white/[0.035] p-7 lg:border-l lg:border-t-0">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-white/42">Original source</p>
                <p className="mt-4 text-sm leading-7 text-white/65">Continue to the saved page when you are ready to explore the full resource.</p>
                {website ? <Link href={website} target="_blank" rel="nofollow noopener noreferrer" className={`${dc.button.primary} mt-6 w-full`}>Visit resource <ExternalLink className="h-4 w-4" /></Link> : null}
              </div>
            </aside>
          </div>

          <div className="grid gap-6 border-t border-white/10 p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_320px] lg:p-10">
            <section className="rounded-lg border border-white/10 bg-white/[0.035] p-6 sm:p-8">
              <p className="text-xs font-black uppercase tracking-[0.26em] text-[var(--detail-accent)]">Resource notes</p>
              <div className="article-content mt-6 max-w-none text-base leading-8 text-white/74" dangerouslySetInnerHTML={{ __html: body }} />
            </section>

            <aside className="rounded-lg border border-white/10 bg-white/[0.035] p-6">
              <p className="text-xs font-black uppercase tracking-[0.26em] text-white/42">Bookmark dossier</p>
              <div className="mt-5 grid gap-3 text-sm font-bold text-white/68">
                <p className="inline-flex items-center gap-2"><Tag className="h-4 w-4 text-[var(--detail-accent)]" /> {category}</p>
                <p className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[var(--detail-accent)]" /> Saved on {SITE_CONFIG.name}</p>
              </div>
            </aside>
          </div>
        </article>

        {related.length ? (
          <section className="mt-8 rounded-lg border border-white/10 bg-white/[0.035] p-5 sm:p-7">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.26em] text-[var(--detail-accent)]">Related shelf</p>
                <h2 className="mt-2 text-2xl font-black tracking-tight text-white">More saved resources</h2>
              </div>
              <Link href={getTaskConfig('sbm')?.route || '/sbm'} className="text-xs font-black uppercase tracking-[0.18em] text-white/45 transition hover:text-[var(--detail-accent)]">View all</Link>
            </div>
            <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {related.map((item) => <RelatedCard key={item.id || item.slug} task="sbm" post={item} />)}
            </div>
          </section>
        ) : null}
      </div>
    </section>
  )
}

function PdfDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const fileUrl = getField(post, ['fileUrl', 'pdfUrl', 'documentUrl', 'url'])
  return (
    <section className="mx-auto grid max-w-[1200px] gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8 lg:py-20">
      <article className="rounded-lg border border-white/10 bg-[#0c1320]/90 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.32)] sm:p-9">
        <BackLink task="pdf" />
        <div className="mt-8 grid gap-6 sm:grid-cols-[120px_1fr]">
          <div className="flex h-28 w-28 items-center justify-center rounded-md bg-[var(--detail-accent)] text-[#04120c]"><FileText className="h-12 w-12" /></div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--detail-accent)]">PDF resource</p>
            <h1 className="mt-3 text-4xl font-black leading-[0.98] tracking-[-0.07em] sm:text-6xl">{post.title}</h1>
          </div>
        </div>
        <BodyContent post={post} />
        {fileUrl ? (
          <div className="mt-8 overflow-hidden rounded-lg border border-white/10 bg-[#070b14]">
            <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-[#101621] p-4">
              <span className="text-sm font-black">Document preview</span>
              <Link href={fileUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md bg-[var(--detail-accent)] px-4 py-2 text-xs font-black text-[#04120c]">Download <Download className="h-4 w-4" /></Link>
            </div>
            <iframe src={`${fileUrl}#toolbar=0&navpanes=0&scrollbar=0`} title={post.title} className="h-[78vh] w-full" />
          </div>
        ) : null}
      </article>
      <RelatedPanel task="pdf" post={post} related={related} />
    </section>
  )
}

function ProfileDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const images = getImages(post)
  const heroImage = images[0]
  const gallery = images.slice(1)
  const role = getField(post, ['role', 'designation', 'company', 'location'])
  const company = getField(post, ['company', 'organization', 'business'])
  const location = getField(post, ['location', 'city', 'address'])
  const website = getField(post, ['website', 'url'])
  const email = getField(post, ['email'])
  const category = categoryOf(post, 'Profile')
  return (
    <section className={`${dc.shell.section} py-14 sm:py-20 lg:py-24`}>
      <div>
        <BackLink task="profile" />
        <article className={`${dc.surface.card} relative mt-7 overflow-hidden p-6 sm:p-9 lg:p-12`}>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_5%,rgba(0,233,134,0.18),transparent_28%)]" />
          <div className="relative grid gap-8 lg:grid-cols-[150px_minmax(0,1fr)_220px] lg:items-start">
            <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-black/30">
              {heroImage ? <img src={heroImage} alt="" className="h-full w-full object-cover" /> : <UserRound className="h-12 w-12 text-white/45" />}
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-md bg-[var(--detail-accent)] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#04120c]">{category}</span>
                {role ? <span className="text-xs font-black uppercase tracking-[0.18em] text-white/48">{role}</span> : null}
              </div>
              <h1 className={`${dc.type.heroTitle} mt-5`}>{post.title}</h1>
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold text-white/65">
                {company ? <span>{company}</span> : null}
                {location ? <span>{location}</span> : null}
              </div>
            </div>
            <ProfileHeaderActions />
          </div>

          <div className="relative mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
            <div className="min-w-0">
              <section className={`${dc.surface.soft} p-6 sm:p-8`}>
                <p className={`${dc.type.eyebrow} text-[var(--detail-accent)]`}>About</p>
                <BodyContent post={post} compact />
              </section>
              {gallery.length ? <ImageStrip images={gallery.slice(0, 8)} label="Profile media" /> : null}
            </div>
            <aside className="space-y-5">
              <div className={`${dc.surface.soft} p-6`}>
                <p className={`${dc.type.eyebrow} text-white/45`}>Profile details</p>
                <div className="mt-5 grid gap-4 text-sm font-bold text-white/70">
                  {role ? <p>Role: {role}</p> : null}
                  {company ? <p>Organization: {company}</p> : null}
                  {location ? <p>Location: {location}</p> : null}
                  {email ? <p className="break-all">Email: {email}</p> : null}
                </div>
              </div>
              <ContactAction website={website} email={email} />
              <RelatedPanel task="profile" post={post} related={related} compact />
            </aside>
          </div>
        </article>
      </div>
    </section>
  )
}

function BodyContent({ post, compact = false }: { post: SitePost; compact?: boolean }) {
  return <div className={`article-content mt-8 max-w-none ${compact ? 'text-base leading-8' : 'text-lg leading-9'} opacity-80`} dangerouslySetInnerHTML={{ __html: formatPlainText(getBody(post)) }} />
}

function InfoGrid({ items }: { items: Array<[string, string, typeof MapPin]> }) {
  const visible = items.filter(([, value]) => value)
  if (!visible.length) return null
  return (
    <div className="mt-8 grid gap-3 sm:grid-cols-2">
      {visible.map(([label, value, Icon]) => (
        <div key={label} className="rounded-md border border-white/10 bg-white/[0.045] p-4">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-white/45"><Icon className="h-4 w-4" /> {label}</div>
          <p className="mt-2 break-words text-sm font-bold leading-6 text-white/78">{value}</p>
        </div>
      ))}
    </div>
  )
}

function ImageStrip({ images, label, large = false }: { images: string[]; label: string; large?: boolean }) {
  if (!images.length) return null
  return (
    <section className="mt-8">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--detail-accent)]">{label}</p>
      <div className={`mt-4 grid gap-3 ${large ? 'sm:grid-cols-2' : 'grid-cols-2 sm:grid-cols-4'}`}>
        {images.slice(0, large ? 4 : 8).map((image, index) => <img key={`${image}-${index}`} src={image} alt="" className="aspect-[4/3] rounded-md object-cover ring-1 ring-white/10" />)}
      </div>
    </section>
  )
}

function MapBox({ src, label }: { src: string; label: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-[#0c1320]/90 shadow-sm">
      <div className="flex items-center gap-2 p-4 text-sm font-black"><MapPin className="h-4 w-4" /> {label || 'Map location'}</div>
      <iframe src={src} title="Map" loading="lazy" className="h-80 w-full border-0" />
    </div>
  )
}

function ContactAction({ website, phone, email }: { website?: string; phone?: string; email?: string }) {
  if (!website && !phone && !email) return null
  return (
    <div className="mt-5 rounded-lg border border-white/10 bg-white/[0.045] p-5 shadow-sm">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-white/45">Quick actions</p>
      <div className="mt-4 flex flex-wrap gap-3">
        {website ? <Link href={website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md bg-[var(--detail-accent)] px-4 py-2 text-sm font-black text-[#04120c]">Website <ExternalLink className="h-4 w-4" /></Link> : null}
        {phone ? <a href={`tel:${phone}`} className="inline-flex items-center gap-2 rounded-md border border-white/10 px-4 py-2 text-sm font-black"><Phone className="h-4 w-4" /> Call</a> : null}
        {email ? <a href={`mailto:${email}`} className="inline-flex items-center gap-2 rounded-md border border-white/10 px-4 py-2 text-sm font-black"><Mail className="h-4 w-4" /> Email</a> : null}
      </div>
    </div>
  )
}

function BadgeLine({ label, value }: { label: string; value: string }) {
  return <div className="flex items-center justify-between gap-4 rounded-md border border-white/15 bg-white/10 px-4 py-3 text-sm"><span className="font-black uppercase tracking-[0.16em] opacity-60">{label}</span><span className="font-black">{value}</span></div>
}

function RelatedPanel({ task, post, related, compact = false }: { task: TaskKey; post: SitePost; related: SitePost[]; compact?: boolean }) {
  const taskConfig = getTaskConfig(task)
  return (
    <aside className="min-w-0 space-y-5">
      {!compact ? (
        <div className="rounded-lg border border-white/10 bg-white/[0.045] p-5 backdrop-blur">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-white/45">About this post</p>
          <div className="mt-4 grid gap-3 text-sm font-bold text-white/70">
            <p className="inline-flex items-center gap-2"><Tag className="h-4 w-4" /> Task: {taskConfig?.label || task}</p>
            <p className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Site: {SITE_CONFIG.name}</p>
            {post.publishedAt ? <p>Published: {new Date(post.publishedAt).toLocaleDateString()}</p> : null}
          </div>
        </div>
      ) : null}
      {related.length ? (
        <div className="rounded-lg border border-white/10 bg-white/[0.045] p-5 backdrop-blur">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-black tracking-[-0.04em]">More like this</h2>
            <Link href={taskConfig?.route || '/'} className="text-xs font-black uppercase tracking-[0.16em] text-white/45">View all</Link>
          </div>
          <div className="mt-5 grid gap-3">
            {related.map((item) => <RelatedCard key={item.id || item.slug} task={task} post={item} />)}
          </div>
        </div>
      ) : null}
    </aside>
  )
}

function RelatedCard({ task, post }: { task: TaskKey; post: SitePost }) {
  const image = getImages(post)[0]
  return (
    <Link href={buildPostUrl(task, post.slug)} className="group flex gap-3 rounded-md border border-white/10 bg-[#0c1320] p-3 transition hover:-translate-y-0.5 hover:border-[var(--detail-accent)]/60">
      {image && task !== 'sbm' ? <img src={image} alt="" className="h-20 w-20 shrink-0 rounded-md object-cover" /> : <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-md bg-black/30"><FileText className="h-6 w-6 opacity-45" /></div>}
      <div className="min-w-0">
        <h3 className="line-clamp-3 text-sm font-black leading-tight tracking-[-0.03em]">{post.title}</h3>
        <p className="mt-2 line-clamp-2 text-xs leading-5 text-white/52">{summaryText(post) || 'Related context opens inside.'}</p>
      </div>
    </Link>
  )
}

function EditableComments({ slug, comments }: { slug: string; comments: Array<{ id: string; name: string; comment: string; createdAt: string }> }) {
  return (
    <section className="mt-10 rounded-lg border border-white/10 bg-white/[0.045] p-5">
      <div className="flex items-center gap-2 text-lg font-black"><MessageCircle className="h-5 w-5" /> Comments</div>
      <div className="mt-5 grid gap-3">
        {comments.slice(0, 5).map((comment) => (
          <div key={comment.id} className="rounded-md border border-white/10 bg-[#0c1320] p-4">
            <p className="text-sm font-black">{comment.name}</p>
            <p className="mt-2 text-sm leading-6 text-white/68">{comment.comment}</p>
          </div>
        ))}
        {!comments.length ? <p className="text-sm text-white/55">No comments yet for {slug}.</p> : null}
      </div>
    </section>
  )
}
