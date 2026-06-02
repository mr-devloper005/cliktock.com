'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, Copy } from 'lucide-react'

export function ProfileHeaderActions() {
  const [copied, setCopied] = useState(false)

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="flex flex-col gap-3 lg:items-stretch">
      <Link href="/login" className="inline-flex h-11 items-center justify-center rounded-md bg-[#4058dd] px-5 text-sm font-black text-white transition hover:bg-[#3349c4]">
        Follow
      </Link>
      <button
        type="button"
        onClick={copyLink}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-[#bfc5db] bg-white px-5 text-sm font-black text-[#24305d] transition hover:border-[#4058dd] hover:text-[#4058dd]"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        {copied ? 'Copied' : 'Share'}
      </button>
    </div>
  )
}
