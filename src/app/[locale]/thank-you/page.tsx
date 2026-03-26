import { setRequestLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { getAlternates } from '@/lib/seo-helpers'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  return {
    title: 'Thank You | Eazybe',
    robots: {
      index: false,
      follow: false,
    },
    alternates: getAlternates(locale, '/thank-you'),
  }
}

export default async function ThankYouPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations()

  return (
    <div className="min-h-screen bg-brand-black font-sans text-slate-400 antialiased">
      <main className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">
              {t('leadForm.thankYouTitle')}
            </h1>
            <p className="text-lg text-slate-300 mb-4">
              {t('leadForm.thankYouMessage')}
            </p>
            <p className="text-slate-400">
              {t('leadForm.thankYouSubtext')}
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
