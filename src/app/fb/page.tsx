'use client'

import React, { useEffect } from 'react'
import { StandaloneShell } from '@/components/StandaloneShell'
import '@/components/landing/landing-v3.css'

export default function FbPage() {
  useEffect(() => {
    const trackAndUpdate = async () => {
      ;(window as any).lintrk?.('track', 'StartTrial')
      ;(window as any).fbq?.('track', 'StartTrial')
      ;(window as any).gtag?.('event', 'extension_install')
      ;(window as any).gtagAW?.('event', 'extension_install')

      const params = new URLSearchParams(window.location.search)
      const urlWorkspaceId = params.get('workspaceId')
      if (urlWorkspaceId) {
        localStorage.setItem('workspaceId', urlWorkspaceId)
      }

      const rawWorkspaceId = urlWorkspaceId || localStorage.getItem('workspaceId')
      const finalWorkspaceId =
        rawWorkspaceId && !isNaN(Number(rawWorkspaceId)) ? Number(rawWorkspaceId) : null

      const referrer = localStorage.getItem('referrer')

      if (finalWorkspaceId) {
        const body: Record<string, any> = { workspaceId: finalWorkspaceId }
        if (referrer) body.referrer = referrer

        try {
          const resp = await fetch(
            'https://cerberus.eazybe.com/prod/api/v1/updateutmonhubspot',
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
    <StandaloneShell>
      <div className="landing" data-accent="iris" data-typeset="geist">
        <div className="processing">
          <div className="processing-inner">
            <div className="orb" aria-hidden />
            <h1>
              Processing<span style={{ color: 'var(--accent-ink)', fontStyle: 'italic' }}>…</span>
            </h1>
            <p>Setting up your workspace. Hold tight — this takes just a moment.</p>
          </div>
        </div>
      </div>
    </StandaloneShell>
  )
}
