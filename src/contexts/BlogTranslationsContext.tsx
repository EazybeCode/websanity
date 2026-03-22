'use client'

import React, { createContext, useContext, ReactNode } from 'react'

export interface BlogTranslation {
  locale: string
  slug: string
  url: string
}

interface BlogTranslationsContextValue {
  translations: BlogTranslation[]
  currentSlug: string
}

const BlogTranslationsContext = createContext<BlogTranslationsContextValue | undefined>(
  undefined
)

export function useBlogTranslations() {
  const context = useContext(BlogTranslationsContext)
  if (!context) {
    // Return empty context for non-blog pages
    return { translations: [], currentSlug: '' }
  }
  return context
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
  return (
    <BlogTranslationsContext.Provider value={{ translations, currentSlug }}>
      {children}
    </BlogTranslationsContext.Provider>
  )
}
