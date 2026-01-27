import { useState, useEffect } from 'react'
import { getBlogPost, getBlogPosts } from '../lib/sanity'

export interface BlogAuthor {
  name: string
  bio?: string
  image?: string
}

export interface BlogPost {
  _id: string
  title: string
  slug: {
    current: string
  }
  excerpt: string
  content: string
  category: string
  featuredImage?: string
  publishedAt: string
  readTime: number
  author?: BlogAuthor
  quickAnswer?: string
  tableOfContents?: Array<{
    label: string
    id: string
  }>
  faqs?: Array<{
    question: string
    answer: string
  }>
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
}

export function useBlogPost(slug: string) {
  const [data, setData] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!slug) {
      setLoading(false)
      return
    }

    getBlogPost(slug)
      .then((result) => {
        setData(result)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }, [slug])

  return { data, loading, error }
}

export function useBlogPosts(limit?: number) {
  const [data, setData] = useState<BlogPost[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    getBlogPosts(limit)
      .then((result) => {
        setData(result)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }, [limit])

  return { data, loading, error }
}
