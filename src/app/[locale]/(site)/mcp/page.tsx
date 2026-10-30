import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { McpPageClient } from '@/components/pages/McpPageClient'
import { getAlternates } from '@/lib/seo-helpers'

const TITLE = 'Eazybe MCP Server - Connect WhatsApp & CRM to Claude and AI Agents | Eazybe'
const DESCRIPTION =
  'The Eazybe MCP server gives Claude and any MCP-compatible AI client secure access to your WhatsApp conversations, CRM records, labels, broadcasts and AI agents.'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  return {
    title: TITLE,
    description: DESCRIPTION,
    openGraph: { title: TITLE, description: DESCRIPTION },
    alternates: getAlternates(locale, '/mcp'),
    // Kept out of search for now (noindex, nofollow); also left out of the sitemap.
    robots: { index: false, follow: false },
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
