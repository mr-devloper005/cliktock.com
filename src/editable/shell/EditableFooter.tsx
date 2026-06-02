'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const taskLinks = SITE_CONFIG.tasks.filter((task) => task.enabled && task.key !== 'profile' && task.key !== 'sbm')
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <footer className="editable-cosmos border-t border-white/10 bg-[#070b14] text-white">
      <div className="relative mx-auto grid max-w-[1200px] gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div>
          <Link href="/" className="text-2xl font-black tracking-tight">
            CLIKTO<span className="text-[var(--slot4-accent-fill)]">CK</span>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-7 text-white/62">{globalContent.footer.description}</p>
          <p className="mt-5 text-xs font-black uppercase tracking-[0.28em] text-[var(--slot4-accent-fill)]">{globalContent.footer.bottomNote}</p>
        </div>

        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.28em] text-white/45"></h3>
          <div className="mt-4 grid gap-2">
            {taskLinks.map((task) => (
              <Link key={task.key} href={task.route} className="inline-flex items-center gap-2 text-sm font-bold text-white/68 transition hover:text-[var(--slot4-accent-fill)]">
                {task.key === 'sbm' ? 'Bookmarks' : task.label} <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.28em] text-white/45">Site</h3>
          <div className="mt-4 grid gap-2">
            {[
              ['About', '/about'],
              ['Contact', '/contact'],
              ['Search', '/search'],
              ...(session ? [['Create', '/create']] : [['Login', '/login'], ['Join', '/signup']]),
            ].map(([label, href]) => (
              <Link key={href} href={href} className="text-sm font-bold text-white/68 transition hover:text-[var(--slot4-accent-fill)]">
                {label}
              </Link>
            ))}
            {session ? <button type="button" onClick={logout} className="text-left text-sm font-bold text-white/68 transition hover:text-[var(--slot4-accent-fill)]">Logout</button> : null}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs font-bold text-white/45">
        © {year} {SITE_CONFIG.name}. All rights reserved.
      </div>
    </footer>
  )
}
