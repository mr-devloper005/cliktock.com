'use client'

import { Bookmark, Mail, Search, UserRound } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function ContactPage() {
  const lanes = [
    { icon: Bookmark, title: 'Saved resources', body: 'Share questions about link entries, categories, summaries, or public resource pages.' },
    { icon: UserRound, title: 'Profiles', body: 'Ask about profile presentation, public details, and identity-focused browsing.' },
    { icon: Search, title: 'Discovery', body: 'Send notes about search, browsing, categories, or moving through the archive.' },
  ]

  return (
    <EditableSiteShell>
      <main className="editable-cosmos px-4 py-16 text-white sm:px-6 lg:px-8 lg:py-24">
        <section className="mx-auto grid max-w-[1200px] gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--slot4-accent-fill)]">{pagesContent.contact.eyebrow}</p>
            <h1 className="mt-5 text-5xl font-black leading-tight tracking-tight sm:text-6xl">{pagesContent.contact.title}</h1>
            <p className="mt-6 max-w-2xl text-sm leading-8 text-white/70">{pagesContent.contact.description}</p>
            <div className="mt-8 space-y-4">
              {lanes.map((lane) => (
                <div key={lane.title} className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
                  <lane.icon className="h-6 w-6 text-[var(--slot4-accent-fill)]" />
                  <h2 className="mt-4 text-xl font-black">{lane.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-white/64">{lane.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-[#101621]/90 p-7 shadow-[0_28px_100px_rgba(0,0,0,0.34)]">
            <div className="flex items-center gap-3">
              <Mail className="h-6 w-6 text-[var(--slot4-accent-fill)]" />
              <h2 className="text-2xl font-black">{pagesContent.contact.formTitle}</h2>
            </div>
            <EditableContactLeadForm />
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
