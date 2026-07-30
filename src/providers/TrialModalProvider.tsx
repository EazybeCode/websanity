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
    // Rebrandly click beacon — silent GET to the short link so its counter
    // increments per Book a Demo click. The destination is never followed
    // by the user; the Image request errors out silently once fetched.
    if (modalMode === 'demo' && typeof window !== 'undefined') {
      try { new Image().src = 'https://eazybe.info/b8y' } catch { /* ignore */ }
      // "Book a Demo" opens the Calendly booking in a NEW TAB (no on-page form
      // or embed). eazybe.info/demono 301s to Calendly. Synchronous in the
      // click handler so popup blockers allow it. Tracking above is preserved.
      window.open('https://eazybe.info/demono', '_blank', 'noopener')
      return
    }
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
