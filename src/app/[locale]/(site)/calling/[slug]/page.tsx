import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { CALLING_SLUGS } from '@/data/calling-content'
import { CALLING_LOCALES } from '@/data/calling-i18n'
import { getCallingPageContent } from '@/lib/sanity-queries'
import { CallingPage, callingMetadata } from '@/components/pages/CallingPage'
import { pageDates, getSanityDocDates, withPageAuthor, withPageDates } from '@/lib/page-dates'

// Copy can be managed in Sanity ("Calling Pages"), so CMS edits go live without a redeploy.
export const revalidate = 60
// Unknown slugs are a real 404.
export const dynamicParams = false

export function generateStaticParams() {
  return CALLING_LOCALES.flatMap((locale) => CALLING_SLUGS.map((slug) => ({ locale, slug })))
}

type Props = { params: Promise<{ locale: string; slug: string }> }

async function baseMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const page = await getCallingPageContent(slug, locale)
  return page ? callingMetadata(page, locale) : {}
}

export default async function CallingProductPage({ params }: Props) {
  const { locale, slug } = await params
  const page = slug ? await getCallingPageContent(slug, locale) : undefined
  if (!CALLING_LOCALES.includes(locale) || !page) notFound()
  setRequestLocale(locale)
  const dates = pageDates({ page: `/calling/${slug}`, doc: await getSanityDocDates('callingPage', locale, slug) })
  return <CallingPage page={page} locale={locale} dates={dates} />
}

// Published / last-modified dates as meta tags (article:published_time / article:modified_time).
export async function generateMetadata(props: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await props.params
  return withPageAuthor(withPageDates(await baseMetadata(props), pageDates({ page: `/calling/${slug}`, doc: await getSanityDocDates('callingPage', locale, slug) })), locale)
}
