import Link from 'next/link'
import { ArrowRight, Bookmark, CircleDot, Gem, Layers3, Search, Share2, ShieldCheck, Sparkles } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'
import { BookmarkSignalCard, CompactIndexCard, EditorialFeatureCard, RailPostCard, getEditableExcerpt, postHref } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const marker = <div className="mt-5 flex justify-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-[var(--slot4-accent-fill)]" /><span className="h-1.5 w-1.5 rounded-full bg-[var(--slot4-accent-fill)]" /><span className="h-1.5 w-1.5 rounded-full bg-[var(--slot4-accent-fill)]" /></div>

function taskLabel(task: TaskKey) {
  const label = SITE_CONFIG.tasks.find((item) => item.key === task)?.label || task
  return task === 'sbm' ? 'bookmarks' : label.toLowerCase()
}

function SectionHeader({ title, green, subtitle }: { title: string; green: string; subtitle: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
        {title} <span className="text-[var(--slot4-accent-fill)]">{green}</span>
      </h2>
      <p className="mt-5 text-base leading-7 text-white/78">{subtitle}</p>
      {marker}
    </div>
  )
}

function DarkCard({ accent, title, body, tone = 'green' }: { accent: string; title: string; body: string; tone?: 'green' | 'blue' | 'violet' }) {
  const color = tone === 'blue' ? 'text-cyan-300' : tone === 'violet' ? 'text-violet-300' : 'text-[var(--slot4-accent-fill)]'
  return (
    <article className={`${dc.surface.card} min-h-[280px] p-7 sm:p-8`}>
      <p className={`text-xl font-black ${color}`}>{accent}</p>
      <h3 className="mt-4 text-lg font-black leading-snug text-white">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-white/70">{body}</p>
    </article>
  )
}

function MethodCard({ number, title, quote, body }: { number: number; title: string; quote: string; body: string }) {
  return (
    <article className={`${dc.surface.card} min-h-[360px] p-7 sm:p-8`}>
      <span className="flex h-10 w-10 items-center justify-center rounded-md bg-[rgba(0,233,134,0.12)] text-sm font-black text-[var(--slot4-accent-fill)]">{number}</span>
      <h3 className="mt-16 text-xl font-black leading-tight text-white">{title}</h3>
      <p className="mt-4 text-sm font-bold italic leading-7 text-[var(--slot4-accent-fill)]">{quote}</p>
      <p className="mt-7 text-sm leading-7 text-white/72">{body}</p>
    </article>
  )
}

export function EditableHomeHero({ primaryTask, primaryRoute }: HomeSectionProps) {
  return (
    <section className="editable-cosmos relative flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-20 text-center sm:px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,rgba(52,103,57,0.26),transparent_31%)]" />
      <div className="relative mx-auto max-w-5xl">
        <h1 className="text-5xl font-black leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
          <span className="text-[var(--slot4-accent-fill)]">Save smarter</span> with a classical bookmark library.
          <br />
          Share useful pages.
          <br />
          Let discovery <span className="text-[var(--slot4-accent-fill)]">compound</span>.
        </h1>
        <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-white/74">
          CLIKTOCK brings social bookmarks, saved resources, and useful public pages into a polished archive built for quick scanning and lasting context.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link href={primaryRoute} className={dc.button.primary}>Explore {taskLabel(primaryTask)} <ArrowRight className="h-4 w-4" /></Link>
          <Link href="/search" className={dc.button.secondary}>Search archive <Search className="h-4 w-4" /></Link>
        </div>
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const railPosts = posts.slice(0, 9)
  return (
    <section className="relative bg-[#070b14] px-4 py-20 sm:px-6 lg:py-28">
      <SectionHeader title="The" green="shift" subtitle="Three lanes make public bookmarking easier to browse, trust, and revisit." />
      <div className="mx-auto mt-16 grid max-w-[1200px] gap-5 md:grid-cols-3">
        <DarkCard accent="How links get found" title="Bookmarks become structured entry points." body="Useful pages are easier to scan when every title, category, summary, and source has a calm place to live." tone="violet" />
        <DarkCard accent="Where context matters" title="Saved pages become easier to revisit." body="Categories, summaries, and source details give visitors a clearer path from one useful find to the next." tone="blue" />
        <DarkCard accent="What sharing looks like" title="The archive stays practical and polished." body="The interface gives social bookmarking a premium reading rhythm without hiding the post data that already powers the site." />
      </div>
      {railPosts.length ? (
        <div className="mx-auto mt-14 max-w-[1200px]">
          <div className={dc.layout.rail}>
            {railPosts.map((post, index) => <RailPostCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}
          </div>
        </div>
      ) : null}
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const featured = posts[0]
  const picks = posts.slice(1, 7)
  return (
    <section className="editable-cosmos bg-[#080d17] px-4 py-20 sm:px-6 lg:py-28">
      <SectionHeader title="How we" green="work" subtitle="Three things visitors should notice from the first search onward." />
      <div className="mx-auto mt-16 grid max-w-[1200px] gap-5 md:grid-cols-3">
        <MethodCard number={1} title="Start with a defined route, not a crowded feed." quote="Clear category. Clear summary. Clear next click." body="The redesigned archive gives each resource enough hierarchy to be read quickly without feeling generic." />
        <MethodCard number={2} title="Cards configure around saved resources." quote="Image-first, compact, horizontal, and editorial cards each have a job." body="The layout varies by context so bookmark entries do not all collapse into the same rectangle." />
        <MethodCard number={3} title="Every detail page keeps the post usable." quote="Missing media should never break the experience." body="Fallback summaries, image handling, related posts, and comments are styled to remain readable across supported routes." />
      </div>

      {featured ? (
        <div className="mx-auto mt-20 grid max-w-[1200px] gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <EditorialFeatureCard post={featured} href={postHref(primaryTask, featured, primaryRoute)} label="Featured resource" />
          <div className="grid gap-5">
            {picks.slice(0, 4).map((post, index) => <CompactIndexCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}
          </div>
        </div>
      ) : null}
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const collectionPosts = timeSections.flatMap((section) => section.posts).length ? timeSections.flatMap((section) => section.posts) : posts.slice(4)
  const cards = collectionPosts.slice(0, 8)
  const latest = posts.slice(0, 3)
  return (
    <>
      <section className="bg-[#101621] px-4 py-20 text-center sm:px-6 lg:py-28">
        <p className="text-xs font-black uppercase tracking-[0.32em] text-[var(--slot4-accent-fill)]">Practiced before published</p>
        <h2 className="mx-auto mt-4 max-w-3xl text-2xl font-black leading-tight text-white sm:text-3xl">
          Social bookmarking is a high-signal archive. CLIKTOCK keeps it structured.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/70">Each resource can move from a saved page into a category, collection, or searchable reference without changing backend behavior.</p>
        <Link href="/search" className={dc.button.secondary + ' mt-10'}>How the archive opens <ArrowRight className="h-4 w-4" /></Link>
      </section>

      <section className="editable-cosmos bg-[#070b14] px-4 py-20 sm:px-6 lg:py-28">
        <SectionHeader title="Our discovery" green="constellation" subtitle="A living surface for bookmarks, saved pages, topics, and useful references. Click to explore." />
        <div className="editable-orbit relative mx-auto mt-14 h-[430px] max-w-[760px] rounded-full">
          <Link href={primaryRoute} className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--slot4-accent-fill)] text-sm font-black text-[#04120c] shadow-[0_0_70px_rgba(0,233,134,0.45)]">Your Arc</Link>
          {[
            ['Bookmarks', Bookmark, 'left-[45%] top-[8%]', 'bg-cyan-300 text-[#07101f]'],
            ['Collections', Layers3, 'right-[18%] top-[26%]', 'bg-violet-300 text-[#151022]'],
            ['Shared pages', Share2, 'left-[18%] bottom-[18%]', 'bg-rose-300 text-[#210b10]'],
            ['Topics', Layers3, 'right-[18%] bottom-[18%]', 'bg-yellow-300 text-[#201a04]'],
          ].map(([label, Icon, pos, tone]) => {
            const NodeIcon = Icon as typeof Bookmark
            return (
              <div key={label as string} className={`absolute ${pos as string} text-center`}>
                <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${tone as string} shadow-xl`}><NodeIcon className="h-7 w-7" /></div>
                <p className="mt-3 text-xs font-black uppercase tracking-[0.18em] text-white">{label as string}</p>
              </div>
            )
          })}
        </div>
        <div className="mx-auto mt-8 grid max-w-[1200px] gap-5 md:grid-cols-4">
          {[
            ['Bookmarks', 'Saved resources with context.'],
            ['Collections', 'Grouped resources for public discovery.'],
            ['Shared Pages', 'Useful references arranged to scan.'],
            ['Topics', 'Categories that make browsing easier.'],
          ].map(([title, body]) => (
            <div key={title} className={`${dc.surface.card} p-6`}>
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[var(--slot4-accent-fill)]">{title}</h3>
              <p className="mt-4 text-sm font-bold leading-6 text-white/82">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#080d17] px-4 py-20 sm:px-6 lg:py-28">
        <SectionHeader title="How we" green="engage" subtitle="Outcome-based browsing for public resources, depending on what someone needs to find." />
        <div className="mx-auto mt-14 grid max-w-[1200px] gap-5 md:grid-cols-2 xl:grid-cols-4">
          {[
            [CircleDot, 'Resource Signal', 'Helpful pages grouped with direct entry points.'],
            [Gem, 'Bookmark Shelf', 'Saved resources get a polished public surface.'],
            [Sparkles, 'Category Velocity', 'Topic browsing becomes fast without becoming plain.'],
            [ShieldCheck, 'Readable Context', 'Summaries and fallback states keep every post usable.'],
          ].map(([Icon, title, body], index) => {
            const CardIcon = Icon as typeof CircleDot
            const post = cards[index]
            return post ? (
              <BookmarkSignalCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
            ) : (
              <article key={title as string} className={`${dc.surface.card} min-h-[320px] p-7`}>
                <CardIcon className="h-8 w-8 text-[var(--slot4-accent-fill)]" />
                <h3 className="mt-16 text-xl font-black text-white">{title as string}</h3>
                <p className="mt-6 text-sm leading-7 text-white/66">{body as string}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section className="editable-cosmos bg-[#070b14] px-4 py-20 sm:px-6 lg:py-28">
        <SectionHeader title="Latest" green="Insights" subtitle="Fresh public entries from the CLIKTOCK archive." />
        <div className="mx-auto mt-14 grid max-w-[1200px] gap-5 md:grid-cols-3">
          {latest.map((post, index) => (
            <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className={`${dc.surface.card} p-7 ${dc.motion.lift}`}>
              <p className="text-xs font-black text-[var(--slot4-accent-fill)]">Saved Resource <span className="ml-2 text-white/35">{Math.max(3, getEditableExcerpt(post).length % 8)} min read</span></p>
              <h3 className="mt-6 line-clamp-3 text-lg font-black leading-snug text-white">{post.title}</h3>
              <p className="mt-4 line-clamp-4 text-sm leading-6 text-white/62">{getEditableExcerpt(post, 160)}</p>
              <span className="mt-8 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--slot4-accent-fill)]">Open insight <ArrowRight className="h-4 w-4" /></span>
            </Link>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href={primaryRoute} className={dc.button.secondary}>View all entries <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </>
  )
}

export function EditableHomeCta() {
  return (
    <section className="bg-[#101621] px-4 py-20 text-center sm:px-6">
      <h2 className="text-4xl font-black tracking-tight text-white">Build a cleaner public trail with <span className="text-[var(--slot4-accent-fill)]">CLIKTOCK</span>.</h2>
      <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/70">Explore useful social bookmarks and saved pages through one consistent discovery experience.</p>
      <Link href="/contact" className={dc.button.primary + ' mt-8'}>Contact <ArrowRight className="h-4 w-4" /></Link>
    </section>
  )
}
