'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'

/**
 * Author bio with a mobile-only "Read More" toggle.
 *
 * On mobile (< md) the bio is clamped to the first 4 lines until the reader
 * expands it; on desktop (md+) the full bio always shows and the toggle is
 * hidden. The toggle only renders when the bio actually exceeds 4 lines.
 */
export function AuthorBio({ text }: { text: string }) {
  const t = useTranslations()
  const [expanded, setExpanded] = useState(false)
  const [clampable, setClampable] = useState(false)
  const pRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const el = pRef.current
    if (!el) return
    const measure = () => {
      // The toggle only matters on mobile; desktop always shows the full bio.
      if (window.innerWidth >= 768) {
        setClampable(false)
        return
      }
      const lineHeight = parseFloat(window.getComputedStyle(el).lineHeight) || 0
      // scrollHeight reflects the full (unclamped) content height even while
      // -webkit-line-clamp is hiding the overflow, so this stays correct in
      // both the collapsed and expanded states.
      setClampable(lineHeight > 0 && el.scrollHeight > lineHeight * 4 + 1)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [text])

  return (
    <div>
      <p
        ref={pRef}
        className={`text-lg text-slate-400 leading-relaxed ${
          expanded ? '' : 'line-clamp-4 md:line-clamp-none'
        }`}
      >
        {text}
      </p>
      {clampable && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="md:hidden mt-2 text-sm font-semibold text-brand-cyan hover:text-brand-blue transition-colors"
        >
          {expanded ? t('blog.detail.readLess') : t('blog.detail.readMore')}
        </button>
      )}
    </div>
  )
}

export default AuthorBio
