'use client'

import { useEffect } from 'react'
import { useTrialModal, type ModalMode } from '@/providers/TrialModalProvider'

/**
 * Site-wide: every plain "Book a demo" / "Start free" link opens the same
 * lead-capture popups (DemoModal / TrialModal) instead of navigating away.
 *
 * Many CTAs already call openModal(); this catches the rest — links written as
 * plain <a href> to the demo booking page or to an install destination (CMS
 * content, page-level markup, the v16 homepage export). One delegated listener,
 * so new links are covered automatically.
 *
 * Left alone: clicks another handler already handled (defaultPrevented), modified
 * clicks (cmd/ctrl/shift/alt, middle button — "open in new tab"), and links inside
 * the popups / lead forms themselves (the trial form sends the visitor to the
 * Chrome Web Store after submit).
 */

const DEMO_PATTERNS = [/^https?:\/\/eazybe\.info\/demono\b/i]
const TRIAL_PATTERNS = [
  /^https?:\/\/eazybe\.info\/6c2a82\b/i, // INSTALL_REDIRECT_URL (Rebrandly → Chrome Web Store)
  /^https?:\/\/chromewebstore\.google\.com\/detail\/[^/]+\/aihpfgoknheimieofcfjiobnmddldjeb/i,
  /^https?:\/\/chrome\.google\.com\/webstore\/detail\/(?:[^/]+\/)?aihpfgoknheimieofcfjiobnmddldjeb/i,
]

// Containers whose links must keep their real destination.
const EXCLUDED = '.conversion-modal, .bea-corner-form, .lead-sidebar-panel, [data-cta-native]'

const modeFor = (href: string): ModalMode | null => {
  if (DEMO_PATTERNS.some((re) => re.test(href))) return 'demo'
  if (TRIAL_PATTERNS.some((re) => re.test(href))) return 'trial'
  return null
}

export function CtaModalBridge() {
  const { openModal } = useTrialModal()

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const link = (event.target as Element | null)?.closest?.<HTMLAnchorElement>('a[href]')
      if (!link || link.closest(EXCLUDED)) return
      const mode = modeFor(link.href)
      if (!mode) return
      event.preventDefault()
      openModal(mode)
    }
    // Bubble phase on document: component handlers (which call preventDefault when
    // they open a modal themselves) run first.
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [openModal])

  return null
}
