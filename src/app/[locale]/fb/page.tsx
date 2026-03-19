import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { FbPageClient } from '@/components/pages/FbPageClient'

export const metadata: Metadata = {
  title: 'Processing | Eazybe',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function FbPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return <FbPageClient />
}
