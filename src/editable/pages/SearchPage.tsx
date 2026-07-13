import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Filter, Search } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { fetchSiteFeed } from '@/lib/site-connector'
import { buildPostUrl, getPostTaskKey } from '@/lib/task-data'
import { getMockPostsForTask } from '@/lib/mock-posts'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { pagesContent } from '@/editable/content/pages.content'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'
import { Ads } from '@/lib/ads'

export const revalidate = 3

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/search',
    title: pagesContent.search.metadata.title,
    description: pagesContent.search.metadata.description,
  })
}

const stripHtml = (value: string) =>
  value
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim()
const compactText = (value: unknown) => typeof value === 'string' ? stripHtml(value).replace(/\s+/g, ' ').trim().toLowerCase() : ''
const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const compactRaw = (value: unknown) => typeof value === 'string' ? stripHtml(value) : ''
const summaryOf = (post: SitePost) => compactRaw(post.summary) || compactRaw(getContent(post).description) || compactRaw(getContent(post).excerpt) || ''

const matches = (post: SitePost, query: string, category: string, task: string) => {
  const content = getContent(post)
  const typeText = compactText(content.type)
  if (typeText === 'comment') return false
  const derivedTask = getPostTaskKey(post) || typeText
  if (task && derivedTask !== task) return false
  const categoryText = compactText(content.category)
  const tagsText = compactText(Array.isArray(post.tags) ? post.tags.join(' ') : '')
  if (category && !(categoryText || tagsText).includes(category)) return false
  if (!query) return true
  return [post.title, post.summary, content.description, content.body, content.excerpt, content.category, Array.isArray(post.tags) ? post.tags.join(' ') : '']
    .some((value) => compactText(value).includes(query))
}

function SearchResultCard({ post, index }: { post: SitePost; index: number }) {
  const task = getPostTaskKey(post) as TaskKey | null
  const href = task ? buildPostUrl(task, post.slug) : `/article/${post.slug}`
  const summary = summaryOf(post)
  const strong = index % 5 === 0

  return (
    <Link href={href} className={`${dc.surface.card} ${dc.motion.lift} group block overflow-hidden ${strong ? 'md:col-span-2' : ''}`}>
      <div className="p-5 sm:p-6">
        <h2 className="text-2xl font-black leading-tight tracking-tight text-white">{stripHtml(post.title)}</h2>
        <p className="mt-4 text-sm font-semibold leading-7 text-white/62">{summary || 'Open this entry for details and source context.'}</p>
      </div>
    </Link>
  )
}

export default async function SearchPage({ searchParams }: { searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }> }) {
  const resolved = (await searchParams) || {}
  const query = (resolved.q || '').trim()
  const normalized = query.toLowerCase()
  const category = (resolved.category || '').trim().toLowerCase()
  const task = (resolved.task || '').trim().toLowerCase()
  const useMaster = resolved.master !== '0'
  const feed = await fetchSiteFeed(useMaster ? 1000 : 300, useMaster ? { fresh: true, category: category || undefined, task: task || undefined } : undefined)
  const posts = feed?.posts?.length ? feed.posts : useMaster ? [] : SITE_CONFIG.tasks.filter((item) => item.enabled).flatMap((item) => getMockPostsForTask(item.key))
  const results = posts.filter((post) => matches(post, normalized, category, task)).slice(0, normalized ? 80 : 36)
  const enabledTasks = SITE_CONFIG.tasks.filter((item) => item.enabled)

  return (
    <EditableSiteShell>
      <main className={`editable-cosmos ${dc.shell.page}`}>
        <section className={`${dc.shell.section} py-16 sm:py-20 lg:py-28`}>
          <div className={`${dc.surface.card} grid gap-8 p-6 backdrop-blur md:grid-cols-[0.9fr_1.1fr] md:items-end lg:p-10`}>
            <div>
              <p className={`${dc.type.eyebrow} text-[var(--slot4-accent-fill)]`}>{pagesContent.search.hero.badge}</p>
              <h1 className={`${dc.type.heroTitle} mt-5`}>{pagesContent.search.hero.title}</h1>
              <p className={`${dc.type.body} mt-6 max-w-xl text-white/70`}>{pagesContent.search.hero.description}</p>
            </div>
            <form action="/search" className={`${dc.surface.soft} self-end p-4 sm:p-5`}>
              <input type="hidden" name="master" value="1" />
              <label className="flex items-center gap-3 rounded-md border border-white/10 bg-[#070b14] px-4 py-3">
                <Search className="h-5 w-5 text-white/45" />
                <input name="q" defaultValue={query} placeholder={pagesContent.search.hero.placeholder} className="min-w-0 flex-1 bg-transparent text-base font-bold text-white outline-none placeholder:text-white/35" />
              </label>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <label className="flex items-center gap-2 rounded-md border border-white/10 bg-[#070b14] px-4 py-3">
                  <Filter className="h-4 w-4 text-white/45" />
                  <input name="category" defaultValue={category} placeholder="Category" className="min-w-0 flex-1 bg-transparent text-sm font-bold text-white outline-none placeholder:text-white/35" />
                </label>
                <select name="task" defaultValue={task} className="rounded-md border border-white/10 bg-[#070b14] px-4 py-3 text-sm font-black text-white outline-none">
                  <option value="">All content types</option>
                  {enabledTasks.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}
                </select>
              </div>
              <button className={`${dc.button.primary} mt-3 h-12 w-full uppercase tracking-[0.18em]`} type="submit">Search</button>
            </form>
          </div>

          <div className="mt-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-white/45">{results.length} results</p>
              <h2 className={`${dc.type.sectionTitle} mt-2`}>{query ? `Results for "${query}"` : pagesContent.search.resultsTitle}</h2>
            </div>
            <Link href="/article" className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.045] px-5 py-3 text-sm font-black">Browse latest <ArrowRight className="h-4 w-4" /></Link>
          </div>

          {results.length ? (
            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {results.map((post, index) => <SearchResultCard key={post.id || post.slug} post={post} index={index} />)}
            </div>
          ) : (
            <div className="mt-8 rounded-lg border border-dashed border-white/15 bg-white/[0.045] p-10 text-center">
              <p className="text-2xl font-black tracking-tight">No matching posts found.</p>
              <p className="mt-3 text-sm font-semibold text-white/60">Try a different keyword, task type, or category.</p>
            </div>
          )}

          <div className="mt-16">
            <div className="mx-auto max-w-6xl px-4 py-6">
              <Ads
                slot="footer"
                showLabel
                eager
                className="mx-auto w-full"
                fallback={(
                  <div className="mx-auto max-w-[400px]">
                    <Ads slot="popup" showLabel eager className="mx-auto w-full" />
                  </div>
                )}
              />
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
