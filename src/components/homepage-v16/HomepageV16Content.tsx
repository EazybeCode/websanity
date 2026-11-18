'use client'

import { useEffect, useMemo, useRef } from 'react'
import { useTrialModal } from '@/providers/TrialModalProvider'
import { initializeV16 } from './initialize-v16'
import type { V16Labels } from './localize-v16'

export function HomepageV16Content({ markup, labels }: { markup: string; labels: V16Labels }) {
  const ref = useRef<HTMLElement>(null)
  const { openModal } = useTrialModal()
  // One stable object: React 19 re-applies innerHTML whenever the
  // dangerouslySetInnerHTML object changes (even with an identical string), so an
  // inline {{ __html }} rebuilt the whole page on every re-render — e.g. when the
  // demo/trial modal opened — wiping the reveal state and scroll observers.
  const html = useMemo(() => ({ __html: markup }), [markup])

  useEffect(() => {
    const root = ref.current
    if (!root) return
    return initializeV16(root, labels)
  }, [labels])

  // <main> marks the page body as the primary content (Nav/Footer sit outside it).
  return (
    <main
      ref={ref}
      id="ezv16"
      className="fp"
      onClick={(event) => {
        if (!(event.target instanceof Element)) return
        if (event.target.closest('[data-v16-bea]')) {
          event.preventDefault()
          window.dispatchEvent(new Event('eazybe:open-bea-form'))
          return
        }
        const button = event.target.closest<HTMLElement>('[data-homepage-cta]')
        const mode = button?.dataset.homepageCta
        if (mode !== 'trial' && mode !== 'demo') return
        event.preventDefault()
        openModal(mode)
      }}
      dangerouslySetInnerHTML={html}
    />
  )
}
