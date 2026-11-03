import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { CALLING_SLUGS } from '@/data/calling-content'
import { CALLING_LOCALES, getCallingPage } from '@/data/calling-i18n'
import { CallingPage, callingMetadata } from '@/components/pages/CallingPage'

export const dynamic = 'force-static'
// Unknown slugs are a real 404.
export const dynamicParams = false

export function generateStaticParams() {
  return CALLING_LOCALES.flatMap((locale) => CALLING_SLUGS.map((slug) => ({ locale, slug })))
}

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const page = getCallingPage(slug, locale)
  return page ? callingMetadata(page, locale) : {}
}

export default async function CallingProductPage({ params }: Props) {
  const { locale, slug } = await params
  const page = slug ? getCallingPage(slug, locale) : undefined
  if (!CALLING_LOCALES.includes(locale) || !page) notFound()
  setRequestLocale(locale)
  return <CallingPage page={page} locale={locale} />
}
