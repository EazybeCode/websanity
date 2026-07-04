'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { LeadGenerationForm } from './LeadGenerationForm'

export const LeadMobileButton: React.FC = () => {
  const t = useTranslations()
  const [isExpanded, setIsExpanded] = useState(false)

  const handleToggle = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <>
      {/* Expanded Bottom Sheet */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-4 left-4 right-4 z-40 block lg:hidden"
          >
            <div className="lead-sidebar-panel relative bg-brand-card border border-slate-700/50 rounded-2xl shadow-2xl p-5">
              <button
                onClick={handleToggle}
                className="absolute top-3 right-3 text-slate-500 hover:text-slate-300 transition-colors duration-200 p-1.5 hover:bg-slate-800/50 rounded-lg"
                aria-label="Minimize"
              >
                <X size={16} />
              </button>
              <LeadGenerationForm />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimized sticky side tab \u2014 flush to the left edge, vertically centered, mobile only.
          Static (no fade-in) so it's always visible, even before hydration. */}
      {!isExpanded && (
        <button
          onClick={handleToggle}
          className="fixed left-0 top-1/2 -translate-y-1/2 z-40 block lg:hidden bg-brand-blue hover:bg-blue-700 text-white px-2.5 py-4 rounded-r-xl shadow-glow-blue transition-colors duration-200"
          style={{ writingMode: 'vertical-rl' }}
          aria-label="Open lead form"
        >
          <span className="text-sm font-semibold tracking-wide">{t('leadForm.downloadButton').replace(' \u2192', '')}</span>
        </button>
      )}
    </>
  )
}
