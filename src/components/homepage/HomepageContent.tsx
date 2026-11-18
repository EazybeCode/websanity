'use client'

import { useEffect, useMemo, useRef } from 'react'
import { useTrialModal } from '@/providers/TrialModalProvider'
import { initializeHomepage } from './initialize-homepage'

export function HomepageContent({ markup, dictionary }: { markup: string; dictionary: Record<string, string> }) {
  const ref = useRef<HTMLDivElement>(null)
  const { openModal } = useTrialModal()
  // Stable object so opening a modal (a context re-render) doesn't make React 19
  // re-apply innerHTML and rebuild the page.
  const html = useMemo(() => ({ __html: markup }), [markup])

  useEffect(() => {
    const root = ref.current
    if (!root) return
    return initializeHomepage(root, dictionary)
  }, [dictionary])

  return (
    <div
      ref={ref}
      id="eazybe-system337"
      onClick={(event) => {
        if (!(event.target instanceof Element)) return
        const button = event.target.closest<HTMLElement>('[data-homepage-cta]')
        if (!button) return
        const mode = button.dataset.homepageCta
        if (mode !== 'trial' && mode !== 'demo') return
        event.preventDefault()
        openModal(mode)
      }}
      dangerouslySetInnerHTML={html}
    />
  )
}
