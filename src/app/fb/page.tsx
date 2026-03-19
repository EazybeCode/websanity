'use client'

import React, { useEffect } from 'react'

export default function FbPage() {
  useEffect(() => {
    const trackAndUpdate = async () => {
      ;(window as any).lintrk?.("track", "StartTrial")
      ;(window as any).fbq?.('track', 'StartTrial')
      ;(window as any).gtag?.('event', 'extension_install')
      ;(window as any).gtagAW?.('event', 'extension_install')

      const params = new URLSearchParams(window.location.search)
      const urlWorkspaceId = params.get('workspaceId')
      if (urlWorkspaceId) {
        localStorage.setItem('workspaceId', urlWorkspaceId)
      }

      const rawWorkspaceId = urlWorkspaceId || localStorage.getItem('workspaceId')
      const finalWorkspaceId = rawWorkspaceId && !isNaN(Number(rawWorkspaceId)) ? Number(rawWorkspaceId) : null

      const referrer = localStorage.getItem('referrer')
      const entryPage = localStorage.getItem('entryPage')
      const exitPage = localStorage.getItem('exitPage')

      if (finalWorkspaceId) {
        const body: Record<string, any> = { workspaceId: finalWorkspaceId }
        if (referrer) body.referrer = referrer
        if (entryPage) body.entry_page = entryPage
        if (exitPage) body.exit_page = exitPage

        try {
          const resp = await fetch('https://eazybe.com/api/v1/whatzapp/updateutmonhubspot', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          })
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
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-white text-lg">Processing...</p>
      </div>
    </div>
  )
}
