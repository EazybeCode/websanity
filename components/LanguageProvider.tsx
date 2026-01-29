import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { supportedLanguages, type SupportedLanguage } from '../i18n'

// Non-English languages that use URL prefixes
const prefixedLanguages = ['pt', 'es', 'tr'] as const

// Extract language from path
export function getLanguageFromPath(pathname: string): SupportedLanguage {
  const match = pathname.match(/^\/(pt|es|tr)(\/|$)/)
  return match ? (match[1] as SupportedLanguage) : 'en'
}

// Remove language prefix from path
export function removeLanguagePrefix(pathname: string): string {
  return pathname.replace(/^\/(pt|es|tr)(\/|$)/, '/').replace(/^$/, '/')
}

// Add language prefix to path
export function addLanguagePrefix(pathname: string, lang: SupportedLanguage): string {
  const cleanPath = removeLanguagePrefix(pathname)
  if (lang === 'en') {
    return cleanPath
  }
  return `/${lang}${cleanPath === '/' ? '' : cleanPath}`
}

// Get localized path for a given route
export function getLocalizedPath(path: string, lang: SupportedLanguage): string {
  if (lang === 'en') {
    return path
  }
  return `/${lang}${path === '/' ? '' : path}`
}

interface LanguageProviderProps {
  children: React.ReactNode
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const { i18n } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()

  // Sync i18n language with URL on mount and location change
  useEffect(() => {
    const urlLanguage = getLanguageFromPath(location.pathname)
    if (i18n.language !== urlLanguage) {
      i18n.changeLanguage(urlLanguage)
    }
  }, [location.pathname, i18n])

  return <>{children}</>
}

export default LanguageProvider
