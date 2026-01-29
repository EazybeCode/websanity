import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, ChevronDown, Check } from 'lucide-react'
import { useLanguage } from '../../hooks/useLanguage'
import type { SupportedLanguage } from '../../i18n'

interface LanguageSwitcherProps {
  variant?: 'desktop' | 'mobile'
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ variant = 'desktop' }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { currentLanguage, changeLanguage, supportedLanguages, languageNames, languageFlags } = useLanguage()

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleSelect = (lang: SupportedLanguage) => {
    changeLanguage(lang)
    setIsOpen(false)
  }

  if (variant === 'mobile') {
    return (
      <div className="px-4 py-4 border-t border-slate-800">
        <div className="flex items-center gap-2 text-slate-400 text-sm mb-3">
          <Globe size={16} />
          <span>Language</span>
        </div>
        <div className="flex gap-2">
          {supportedLanguages.map((lang) => (
            <button
              key={lang}
              onClick={() => changeLanguage(lang)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentLanguage === lang
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <span>{languageFlags[lang]}</span>
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/5"
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <span className="text-base">{languageFlags[currentLanguage]}</span>
        <span className="uppercase">{currentLanguage}</span>
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={14} className="text-slate-400" />
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-2 w-40 bg-[#12121f] border border-slate-700 rounded-xl shadow-xl overflow-hidden z-50"
          >
            {supportedLanguages.map((lang) => (
              <button
                key={lang}
                onClick={() => handleSelect(lang)}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm transition-colors ${
                  currentLanguage === lang
                    ? 'bg-blue-600/10 text-blue-400'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="text-base">{languageFlags[lang]}</span>
                  {languageNames[lang]}
                </span>
                {currentLanguage === lang && <Check size={16} />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default LanguageSwitcher
