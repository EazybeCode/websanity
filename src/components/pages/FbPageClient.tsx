'use client'

import React, { useEffect } from 'react'

declare global {
  interface Window {
    lintrk: any
    fbq: any
    gtag: any
    gtagAW: any
  }
}

export function FbPageClient() {
  useEffect(() => {
    const trackAndUpdate = async () => {
      // Track events
      window.lintrk?.('track', 'StartTrial')
      window.fbq?.('track', 'StartTrial')
      window.gtag?.('event', 'extension_install')
      window.gtagAW?.('event', 'extension_install')

      // Save workspaceId in localStorage if present in URL
      const params = new URLSearchParams(window.location.search)
      const urlWorkspaceId = params.get('workspaceId')
      if (urlWorkspaceId) {
        localStorage.setItem('workspaceId', urlWorkspaceId)
      }

      const rawWorkspaceId = urlWorkspaceId || localStorage.getItem('workspaceId')
      const finalWorkspaceId =
        rawWorkspaceId && !isNaN(Number(rawWorkspaceId)) ? Number(rawWorkspaceId) : null

      const referrer = localStorage.getItem('referrer')
      const entryPage = localStorage.getItem('entryPage')
      const exitPage = localStorage.getItem('exitPage')

      if (finalWorkspaceId) {
        const body: Record<string, any> = { workspaceId: finalWorkspaceId }
        if (referrer) body.referrer = referrer
        if (entryPage) body.entry_page = entryPage
        if (exitPage) body.exit_page = exitPage

        try {
          const resp = await fetch(
            `https://cerberus.eazybe.com/prod/api/v1/updateutmonhubspot`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(body),
            },
          )
          const response = await resp.json()
          console.log('API response:', response)
        } catch (error) {
          console.error('API call failed:', error)
        }
      }
    }

    trackAndUpdate()
  }, [])

  return (
    <div className="processing">
      <div className="processing-inner">
        <div className="orb" aria-hidden />
        <h1>Processing<em style={{ fontStyle: 'italic', color: 'var(--accent-ink)' }}>…</em></h1>
        <p>Setting up your workspace. Hold tight — this takes just a moment.</p>
      </div>
    </div>
  )
}
