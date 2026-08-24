'use client'

import React from 'react'
import { TrialModal } from './TrialModal'
import { DemoModal } from './DemoModal'
import { useTrialModal } from '@/providers/TrialModalProvider'

// Routes on modal mode: 'trial' → TrialModal (form → Chrome Store),
// 'demo' → DemoModal (form → embedded Calendly with prefill).
export const TrialModalWrapper: React.FC = () => {
  const { isOpen, mode, redirectUrl, closeModal } = useTrialModal()
  if (mode === 'demo') {
    return <DemoModal isOpen={isOpen} onClose={closeModal} />
  }
  return <TrialModal isOpen={isOpen} mode="trial" onClose={closeModal} redirectUrl={redirectUrl} />
}
