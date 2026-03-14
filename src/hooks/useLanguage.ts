'use client'

import { useCallback } from 'react'
import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'

export type SupportedLanguage = 'en' | 'br' | 'es' | 'tr'

export const supportedLanguages: SupportedLanguage[] = ['en', 'br', 'es', 'tr']

export const languageNames: Record<SupportedLanguage, string> = {
  en: 'English',
  br: 'Portugues',
  es: 'Espanol',
  tr: 'Turkce',
}

export const languageFlags: Record<SupportedLanguage, string> = {
  en: '\u{1F1FA}\u{1F1F8}',
  br: '\u{1F1E7}\u{1F1F7}',
  es: '\u{1F1EA}\u{1F1F8}',
  tr: '\u{1F1F9}\u{1F1F7}',
}

function removeLanguagePrefix(path: string): string {
  const prefixes = ['/br', '/es', '/tr']
  for (const prefix of prefixes) {
    if (path === prefix || path.startsWith(prefix + '/')) {
      return path.slice(prefix.length) || '/'
    }
  }
  return path
}

function addLanguagePrefix(path: string, lang: SupportedLanguage): string {
  const cleanPath = removeLanguagePrefix(path)
  if (lang === 'en') return cleanPath
  return `/${lang}${cleanPath}`
}

export function useLanguage() {
  const locale = useLocale() as SupportedLanguage
  const pathname = usePathname()
  const router = useRouter()

  const currentLanguage = locale

  const changeLanguage = useCallback(
    (lang: SupportedLanguage) => {
      const currentPath = removeLanguagePrefix(pathname)
      const newPath = addLanguagePrefix(currentPath, lang)
      router.push(newPath)
    },
    [pathname, router]
  )

  const getLocalizedPath = useCallback(
    (path: string) => {
      return addLanguagePrefix(path, currentLanguage)
    },
    [currentLanguage]
  )

  return {
    currentLanguage,
    changeLanguage,
    getLocalizedPath,
    supportedLanguages,
    languageNames,
    languageFlags,
  }
}

export default useLanguage
