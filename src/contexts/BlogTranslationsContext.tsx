'use client'

import React, { createContext, useContext, useEffect, ReactNode } from 'react'

export interface BlogTranslation {
  locale: string
  slug: string
  url: string
}

interface BlogTranslationsContextValue {
  translations: BlogTranslation[]
  currentSlug: string
}

// Global store so the header (outside the provider) can access blog translations
let globalTranslations: BlogTranslation[] = []
let globalSlug = ''
let listeners: Array<() => void> = []
// Cached snapshot object — only replaced when data changes
let cachedSnapshot: BlogTranslationsContextValue = { translations: [], currentSlug: '' }

function notify() {
  listeners.forEach((l) => l())
}

export function setGlobalBlogTranslations(translations: BlogTranslation[], slug: string) {
  globalTranslations = translations
  globalSlug = slug
  cachedSnapshot = { translations: globalTranslations, currentSlug: globalSlug }
  notify()
}

export function clearGlobalBlogTranslations() {
  globalTranslations = []
  globalSlug = ''
  cachedSnapshot = { translations: [], currentSlug: '' }
  notify()
}

export function getGlobalBlogTranslations() {
  return cachedSnapshot
}

export function subscribeGlobalBlogTranslations(listener: () => void) {
  listeners.push(listener)
  return () => {
    listeners = listeners.filter((l) => l !== listener)
  }
}

// React context (still works for components inside the provider)
const BlogTranslationsContext = createContext<BlogTranslationsContextValue | undefined>(
  undefined
)

export function useBlogTranslations() {
  const context = useContext(BlogTranslationsContext)
  if (context) {
    return context
  }
  // Fallback to global store for components outside the provider (e.g. header)
  return getGlobalBlogTranslations()
}

interface BlogTranslationsProviderProps {
  translations: BlogTranslation[]
  currentSlug: string
  children: ReactNode
}

export function BlogTranslationsProvider({
  translations,
  currentSlug,
  children,
}: BlogTranslationsProviderProps) {
  // Sync to global store so header language switcher can access
  useEffect(() => {
    setGlobalBlogTranslations(translations, currentSlug)
    return () => {
      clearGlobalBlogTranslations()
    }
  }, [translations, currentSlug])

  return (
    <BlogTranslationsContext.Provider value={{ translations, currentSlug }}>
      {children}
    </BlogTranslationsContext.Provider>
  )
}
