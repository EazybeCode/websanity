import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { McpPageClient } from '@/components/pages/McpPageClient'
import { getAlternates } from '@/lib/seo-helpers'
import { pageDates, withPageDates } from '@/lib/page-dates'

async function baseMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'mcpPage' })
  const title = t('metaTitle')
  const description = t('metaDescription')

  return {
    title,
    description,
    openGraph: { title, description },
    alternates: getAlternates(locale, '/mcp'),
    robots: { index: true, follow: true },
  }
}

export default async function McpPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return <McpPageClient />
}

// Published / last-modified dates as meta tags (article:published_time / article:modified_time).
export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return withPageDates(await baseMetadata(props), pageDates({ page: '/mcp' }))
}
