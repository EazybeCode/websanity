'use client'

import { Suspense } from 'react'
import { TrialModalProvider } from './TrialModalProvider'
import { AttributionTracker } from '@/components/AttributionTracker'
import { AutoOpenDemoFromAd } from '@/components/analytics/AutoOpenDemoFromAd'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TrialModalProvider>
      <Suspense fallback={null}>
        <AttributionTracker />
      </Suspense>
      {/* LinkedIn-ads visitors land with utm_source=linkedin-ads — the
          demo modal auto-opens for them, once per session. */}
      <AutoOpenDemoFromAd />
      {children}
    </TrialModalProvider>
  )
}
