'use client'

import React from 'react'
import { TrialModal } from './TrialModal'
import { useTrialModal } from '@/providers/TrialModalProvider'

export const TrialModalWrapper: React.FC = () => {
  const { isOpen, mode, closeModal } = useTrialModal()
  return <TrialModal isOpen={isOpen} mode={mode} onClose={closeModal} />
}
