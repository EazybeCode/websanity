'use client'

/**
 * Auto-opens the Book a Demo modal for visitors arriving from our paid ad
 * campaigns. Signal: `utm_source=linkedin-ads` on the URL — every LATAM,
 * Brazil, and ROTW shortlink (eazybe.info/*) rewrites to a URL that carries
 * this param, and no organic traffic does. If a visitor lands with that
 * param we open the demo modal automatically ~1.5s after the page settles
 * so they see the hero briefly first (and to give hydration time).
 *
 * Once opened in a session we don't reopen — a sessionStorage flag persists
 * across in-app navigations so the modal doesn't pop again after the user
 * dismissed it once.
 */

import { useEffect } from 'react'
import { useTrialModal } from '@/providers/TrialModalProvider'

const SESSION_FLAG = 'eazybe:demo_auto_opened_v1'
const AD_SIGNAL_PARAM = 'utm_source'
const AD_SIGNAL_VALUE = 'linkedin-ads'
const OPEN_DELAY_MS = 1500

export function AutoOpenDemoFromAd() {
  const { openModal } = useTrialModal()

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      // Only fire once per browser session.
      if (window.sessionStorage.getItem(SESSION_FLAG)) return
      const params = new URLSearchParams(window.location.search)
      if (params.get(AD_SIGNAL_PARAM) !== AD_SIGNAL_VALUE) return
      window.sessionStorage.setItem(SESSION_FLAG, '1')
      const id = window.setTimeout(() => openModal('demo'), OPEN_DELAY_MS)
      return () => window.clearTimeout(id)
    } catch {
      // sessionStorage can throw in private mode / storage-disabled browsers;
      // in that case we simply don't auto-open.
    }
  }, [openModal])

  return null
}
