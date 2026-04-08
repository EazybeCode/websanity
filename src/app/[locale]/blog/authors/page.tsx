import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getAuthors } from '@/lib/sanity-queries'
import { getAlternates } from '@/lib/seo-helpers'
import { AuthorsListClient } from '@/components/pages/AuthorsListClient'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  return {
    title: 'Our Authors | Eazybe Blog',
    description: 'Meet the experts behind Eazybe blog. Our authors share insights on WhatsApp CRM, sales automation, AI agents, and productivity tips.',
    alternates: getAlternates(locale, '/blog/authors'),
  }
}

export default async function AuthorsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const authors = await getAuthors(locale)

  return <AuthorsListClient authors={authors || []} locale={locale} />
}
