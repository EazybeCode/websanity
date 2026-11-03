import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { CALLING_LOCALES, getCallingPage } from '@/data/calling-i18n'
import { callingMetadata } from '@/components/pages/CallingPage'
import { CallingHubPage } from '@/components/pages/CallingHubPage'

export const dynamic = 'force-static'
export const dynamicParams = false

export function generateStaticParams() {
  return CALLING_LOCALES.map((locale) => ({ locale }))
}

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return callingMetadata(getCallingPage('', locale)!, locale)
}

export default async function CallingHubRoute({ params }: Props) {
  const { locale } = await params
  if (!CALLING_LOCALES.includes(locale)) notFound()
  setRequestLocale(locale)
  return <CallingHubPage page={getCallingPage('', locale)!} locale={locale} />
}
