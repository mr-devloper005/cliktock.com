import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="editable-cosmos px-4 py-16 text-white sm:px-6 lg:px-8 lg:py-24">
        <section className="mx-auto grid max-w-[1200px] gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-lg border border-white/10 bg-[#101621]/90 p-8 shadow-[0_28px_100px_rgba(0,0,0,0.34)] lg:p-12">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--slot4-accent-fill)]">{pagesContent.about.badge}</p>
            <h1 className="mt-5 max-w-4xl text-5xl font-black tracking-tight sm:text-6xl">{pagesContent.about.title}</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/70">{pagesContent.about.description}</p>
            <div className="mt-8 space-y-4 text-sm leading-8 text-white/72">
              {pagesContent.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </article>
          <aside className="space-y-4">
            {pagesContent.about.values.map((value, index) => (
              <div key={value.title} className="rounded-lg border border-white/10 bg-white/[0.045] p-6 shadow-sm">
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-[rgba(0,233,134,0.12)] text-sm font-black text-[var(--slot4-accent-fill)]">{index + 1}</span>
                <h2 className="mt-8 text-xl font-black tracking-tight">{value.title}</h2>
                <p className="mt-3 text-sm leading-7 text-white/66">{value.description}</p>
              </div>
            ))}
          </aside>
        </section>
      </main>
    </EditableSiteShell>
  )
}
