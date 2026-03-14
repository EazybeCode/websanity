'use client'

import { TrialModalProvider } from './TrialModalProvider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TrialModalProvider>
      {children}
    </TrialModalProvider>
  )
}
