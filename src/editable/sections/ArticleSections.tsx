import Link from 'next/link'
import { ArrowRight, ChevronLeft } from 'lucide-react'
import type { SitePost, SiteFeedPagination } from '@/lib/site-connector'
import { CATEGORY_OPTIONS } from '@/lib/categories'
import { taskPageVoices } from '@/editable/content/task-pages.content'
import { pagesContent } from '@/editable/content/pages.content'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'
import { ArticleListCard, postHref } from '@/editable/cards/PostCards'

export function EditableArticleArchive({ posts, pagination, category = 'all', basePath = '/article' }: { posts: SitePost[]; pagination: SiteFeedPagination; category?: string; basePath?: string }) {
  const voice = taskPageVoices.article
  const page = pagination.page || 1
  const pageHref = (nextPage: number) => `${basePath}?${new URLSearchParams({ ...(category && category !== 'all' ? { category } : {}), page: String(nextPage) }).toString()}`
  return (
    <main className={`${dc.shell.page} editable-cosmos`}>
      <section className={`${dc.shell.section} pt-14 sm:pt-16 lg:pt-20`}>
        <div className="rounded-lg border border-white/10 bg-[#101621]/90 p-7 text-white shadow-[0_28px_100px_rgba(0,0,0,0.34)] sm:p-10 lg:p-14">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-[var(--slot4-accent-fill)]">{voice.eyebrow}</p>
          <h1 className={`${dc.type.heroTitle} mt-5 max-w-5xl`}>{voice.headline}</h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-white/72 sm:text-lg">{voice.description}</p>
          <form action={basePath} className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
            <select name="category" defaultValue={category || 'all'} className="min-w-0 flex-1 rounded-md border border-white/10 bg-[#070b14] px-5 py-3 text-sm font-bold text-white outline-none">
              <option value="all">All categories</option>
              {CATEGORY_OPTIONS.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
            </select>
            <button className="rounded-md bg-[var(--slot4-accent-fill)] px-6 py-3 text-sm font-black text-[#04120c]">Filter</button>
          </form>
        </div>
      </section>

      <section className={`${dc.shell.section} ${dc.shell.sectionY}`}>
        {posts.length ? (
          <div className="grid gap-5">
            {posts.map((post, index) => <ArticleListCard key={post.id} post={post} href={postHref('article', post, basePath)} index={index + (page - 1) * pagination.limit} />)}
          </div>
        ) : (
          <div className="rounded-lg border border-white/10 bg-white/[0.045] p-8 text-center">
            <h2 className="text-3xl font-black tracking-tight">No articles found</h2>
            <p className="mt-3 text-sm leading-7 text-white/60">Try another category or return to all articles.</p>
          </div>
        )}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {pagination.hasPrevPage ? <Link href={pageHref(page - 1)} className="rounded-md border border-white/10 bg-white/[0.045] px-5 py-3 text-sm font-black">Previous</Link> : null}
          <span className="rounded-md bg-[var(--slot4-accent-fill)] px-5 py-3 text-sm font-black text-[#04120c]">Page {page} of {pagination.totalPages || 1}</span>
          {pagination.hasNextPage ? <Link href={pageHref(page + 1)} className="rounded-md border border-white/10 bg-white/[0.045] px-5 py-3 text-sm font-black">Next</Link> : null}
        </div>
      </section>
    </main>
  )
}

export function EditableArticleDetailShell({ slug, post }: { slug: string; post: SitePost | null }) {
  const voice = taskPageVoices.article
  return (
    <main className={`${dc.shell.page} editable-cosmos`}>
      <section className={`${dc.shell.section} pt-14 sm:pt-16 lg:pt-20`}>
        <div className="grid gap-6 rounded-lg border border-white/10 bg-[#101621]/90 p-6 shadow-[0_28px_100px_rgba(0,0,0,0.34)] lg:grid-cols-[minmax(0,1fr)_320px] lg:p-10">
          <div className="min-w-0">
            <Link href="/article" className="inline-flex items-center gap-2 rounded-md border border-white/10 px-4 py-2 text-sm font-black text-white/78"><ChevronLeft className="h-4 w-4" /> Articles</Link>
            <p className="mt-8 text-xs font-black uppercase tracking-[0.3em] text-[var(--slot4-accent-fill)]">{voice.eyebrow}</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-7xl">{post?.title || pagesContent.detailPages.article.fallbackTitle}</h1>
          </div>
          <aside className="min-w-0 rounded-lg border border-white/10 bg-white/[0.045] p-6 text-white">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[var(--slot4-accent-fill)]">Reading note</p>
            <p className="mt-4 text-sm leading-7 text-white/72">{voice.secondaryNote}</p>
            <Link href="/contact" className="mt-6 inline-flex items-center gap-2 rounded-md bg-[var(--slot4-accent-fill)] px-5 py-3 text-sm font-black text-[#04120c]">Contact <ArrowRight className="h-4 w-4" /></Link>
          </aside>
        </div>
      </section>
      <section className="mx-auto w-full max-w-5xl px-4 pb-16 pt-6 sm:px-6 lg:px-8 lg:pb-24">
        <div className="rounded-lg border border-white/10 bg-[#0c1320]/90 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.24)] sm:p-8 lg:p-10">
          <p className="text-sm leading-8 text-white/64">{post?.summary || `Article detail content for ${slug} will render through the editable detail page.`}</p>
        </div>
      </section>
    </main>
  )
}
