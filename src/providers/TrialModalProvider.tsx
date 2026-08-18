'use client'

import React, { createContext, useContext, useState, type ReactNode } from 'react'
import { useLocale } from 'next-intl'

export type ModalMode = 'trial' | 'demo'

interface TrialModalContextType {
  isOpen: boolean
  mode: ModalMode
  openModal: (mode?: ModalMode) => void
  closeModal: () => void
}

const TrialModalContext = createContext<TrialModalContextType | undefined>(undefined)

export const useTrialModal = () => {
  const context = useContext(TrialModalContext)

  // During SSR, return a no-op function instead of throwing
  if (!context) {
    return {
      isOpen: false,
      mode: 'trial' as ModalMode,
      openModal: () => {}, // no-op during SSR
      closeModal: () => {}, // no-op during SSR
    }
  }

  return context
}

export const TrialModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [mode, setMode] = useState<ModalMode>('trial')
  const locale = useLocale()

  const openModal = (modalMode: ModalMode = 'trial') => {
    ;(window as any).gtag?.('event', modalMode === 'demo' ? `book_demo_click_${locale}` : `install_free_click_${locale}`)
    // Rebrandly click beacon — silent GET to the shortlink so the counter
    // increments per Book a Demo click without navigating the user.
    if (modalMode === 'demo' && typeof window !== 'undefined') {
      try { new Image().src = 'https://eazybe.info/b8y' } catch { /* ignore */ }
    }
    // Both Book a Demo (DemoModal) and Start Free (TrialModal) open an
    // in-page lead-capture form. The old "window.open(eazybe.info/demono)"
    // short-circuit was reverted — we want the form back so the lead is
    // captured before the calendar step.
    setMode(modalMode)
    setIsOpen(true)
  }

  const closeModal = () => setIsOpen(false)

  return (
    <TrialModalContext.Provider value={{ isOpen, mode, openModal, closeModal }}>
      {children}
    </TrialModalContext.Provider>
  )
}
