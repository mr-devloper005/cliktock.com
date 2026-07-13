'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogIn, Menu, PlusCircle, Search, UserPlus, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

function BrandMark() {
  return (
    <span className="inline-flex items-center gap-3">
      <Image
        src="/favicon.png"
        alt=""
        width={42}
        height={42}
        priority
        className="h-10 w-10 rounded-lg object-cover"
      />
      <span className="text-lg font-black uppercase tracking-tight text-white sm:text-xl">
        Cliktock
      </span>
    </span>
  )
}

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  const navItems = useMemo(() => {
    return SITE_CONFIG.tasks
      .filter((task) => task.enabled && task.key === 'sbm')
      .map((task) => ({ label: '', href: task.route }))
  }, [])

  const allLinks = [
    { label: 'Home', href: '/' },
    ...navItems,
    { label: 'Search', href: '/search' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-2 sm:px-6">
      <nav className="mx-auto flex min-h-[56px] w-full max-w-[1200px] items-center gap-4 rounded-md border border-white/5 bg-[var(--slot4-nav-bg)] px-4 shadow-[0_16px_60px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:px-6">
        <Link href="/" className="shrink-0" aria-label={SITE_CONFIG.name}>
          <BrandMark />
        </Link>

        <div className="ml-auto hidden items-center gap-6 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link key={item.href} href={item.href} className={`text-sm font-black transition ${active ? 'text-[var(--slot4-accent-fill)]' : 'text-white/78 hover:text-white'}`}>
                {item.label}
              </Link>
            )
          })}
          <Link href="/search" className={`text-sm font-black transition ${pathname === '/search' ? 'text-[var(--slot4-accent-fill)]' : 'text-white/78 hover:text-white'}`}>
            Search
          </Link>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2 lg:ml-4">
          {session ? (
            <>
              <Link href="/create" className="hidden items-center gap-2 rounded-md bg-[var(--slot4-accent-fill)] px-5 py-2.5 text-sm font-black text-[#06110c] transition hover:-translate-y-0.5 sm:inline-flex">
                <PlusCircle className="h-4 w-4" /> Create
              </Link>
              <button type="button" onClick={logout} className="hidden text-sm font-black text-white/72 transition hover:text-white sm:inline-flex">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hidden items-center gap-2 text-sm font-black text-white/72 transition hover:text-white sm:inline-flex">
                <LogIn className="h-4 w-4" /> Login
              </Link>
              <Link href="/signup" className="hidden items-center gap-2 rounded-md bg-[var(--slot4-accent-fill)] px-5 py-2.5 text-sm font-black text-[#06110c] transition hover:-translate-y-0.5 sm:inline-flex">
                <UserPlus className="h-4 w-4" /> Join
              </Link>
            </>
          )}
          <button type="button" onClick={() => setOpen((value) => !value)} className="rounded-md border border-white/10 bg-white/[0.04] p-2 text-white lg:hidden" aria-label="Toggle menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="mx-auto mt-2 max-w-[1200px] rounded-md border border-white/10 bg-[#111722]/96 p-3 text-white shadow-2xl backdrop-blur-2xl lg:hidden">
          <form action="/search" className="mb-3 flex items-center gap-2 rounded-md border border-white/10 bg-black/20 px-3 py-2">
            <Search className="h-4 w-4 text-white/50" />
            <input name="q" type="search" placeholder="Search the archive" className="min-w-0 flex-1 bg-transparent text-sm font-bold outline-none placeholder:text-white/35" />
          </form>
          <div className="grid gap-2">
            {[...allLinks, ...(session ? [{ label: 'Create', href: '/create' }] : [{ label: 'Login', href: '/login' }, { label: 'Join', href: '/signup' }])].map((item) => (
              <Link key={`${item.href}-${item.label}`} href={item.href} onClick={() => setOpen(false)} className="rounded-md border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-black text-white/82">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  )
}
