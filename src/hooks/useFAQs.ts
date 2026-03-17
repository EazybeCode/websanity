'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@sanity/client'

const clientSideClient = createClient({
  projectId: '5awzi0t4',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

export interface FAQ {
  _id: string
  question: string
  answer: string
  language: string
  order?: number
}

export interface FAQData {
  faqs: FAQ[]
  title: string
  badge: string
}

const faqQuery = `{
  "faqs": *[_type == "faq" && language == $language] | order(order asc) {
    _id,
    question,
    answer,
    language,
    order
  },
  "title": "FAQ",
  "badge": "FAQ"
}`

export function useFAQs(language: string = 'en') {
  const [data, setData] = useState<FAQData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    clientSideClient
      .fetch(faqQuery, { language })
      .then((result: FAQData) => {
        setData(result)
        setLoading(false)
      })
      .catch((err: Error) => {
        setError(err)
        setLoading(false)
      })
  }, [language])

  return { data, loading, error }
}
