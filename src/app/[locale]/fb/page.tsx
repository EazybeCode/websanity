import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { FbPageClient } from '@/components/pages/FbPageClient'
import { getCanonicalOnly } from '@/lib/seo-helpers'
import { LandingShell } from '@/components/landing/LandingShell'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  return {
    title: 'Processing | Eazybe',
    robots: { index: false, follow: false },
    alternates: getCanonicalOnly(locale, '/fb'),
  }
}

export default async function FbPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <LandingShell hideFooter hideBea>
      <FbPageClient />
    </LandingShell>
  )
}
