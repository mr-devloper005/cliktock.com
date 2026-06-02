import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Sign up', description: pagesContent.auth.signup.metadataDescription })
}

export default function SignupPage() {
  return (
    <EditableSiteShell>
      <main className="editable-cosmos text-white">
        <section className="mx-auto grid min-h-[calc(100vh-12rem)] max-w-[1200px] items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1fr] lg:px-8">
          <div className="rounded-lg border border-white/10 bg-[#101621]/90 p-6 shadow-[0_28px_100px_rgba(0,0,0,0.34)] backdrop-blur sm:p-8">
            <h1 className="text-3xl font-black tracking-tight">{pagesContent.auth.signup.formTitle}</h1>
            <EditableLocalSignupForm />
            <p className="mt-5 text-sm text-white/65">Already have an account? <Link href="/login" className="font-black text-[var(--slot4-accent-fill)] underline-offset-4 hover:underline">{pagesContent.auth.signup.loginCta}</Link></p>
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--slot4-accent-fill)]">{pagesContent.auth.signup.badge}</p>
            <h2 className="mt-5 max-w-xl text-5xl font-black leading-tight tracking-tight sm:text-6xl">{pagesContent.auth.signup.title}</h2>
            <p className="mt-6 max-w-lg text-sm leading-8 text-white/68">{pagesContent.auth.signup.description}</p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
