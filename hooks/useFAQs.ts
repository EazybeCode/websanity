import { useState, useEffect } from 'react'
import { getFAQs } from '../lib/sanity'

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

export function useFAQs(language: string = 'en') {
  const [data, setData] = useState<FAQData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    getFAQs(language)
      .then((result) => {
        setData(result)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }, [language])

  return { data, loading, error }
}
