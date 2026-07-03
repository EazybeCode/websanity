'use client'

import { Suspense } from 'react'
import { TrialModalProvider } from './TrialModalProvider'
import { AttributionTracker } from '@/components/AttributionTracker'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TrialModalProvider>
      <Suspense fallback={null}>
        <AttributionTracker />
      </Suspense>
      {children}
    </TrialModalProvider>
  )
}
