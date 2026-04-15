'use client'

/**
 * ComparisonPostClient renders a single comparison article.
 *
 * It reuses BlogPostClient to avoid duplicating ~1,200 lines of hero / body /
 * FAQ / related-posts / sidebar rendering logic. Comparison posts share the
 * same visual layout as blog posts — the difference is the content type in
 * Sanity and the URL prefix (/comparison/ vs /blog/).
 */

import React from 'react'
import { BlogPostClient } from '@/components/pages/BlogPostClient'

interface ComparisonPostClientProps {
  post: any
  relatedPosts: any[]
  blogIndex: any
  slug: string
  locale: string
  translations?: Array<{ locale: string; slug: string; url: string }>
  initialViewCount?: number
}

export const ComparisonPostClient: React.FC<ComparisonPostClientProps> = ({
  post,
  relatedPosts,
  blogIndex,
  slug,
  locale,
  translations = [],
  initialViewCount = 0,
}) => {
  return (
    <BlogPostClient
      post={post}
      relatedPosts={relatedPosts}
      blogIndex={blogIndex}
      slug={slug}
      locale={locale}
      translations={translations}
      initialViewCount={initialViewCount}
      contentType="comparison"
    />
  )
}
