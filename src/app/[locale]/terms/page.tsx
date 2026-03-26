import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { ScrollText } from 'lucide-react'
import { getAlternates } from '@/lib/seo-helpers'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'terms' })

  return {
    title: t('title') || 'Terms of Service | Eazybe',
    robots: {
      index: false,
      follow: false,
    },
    alternates: getAlternates(locale, '/terms'),
  }
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: 'terms' })

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-300 antialiased">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-slate-950 border-b border-slate-800/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-purple-600/20 flex items-center justify-center">
              <ScrollText className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                {t('title')}
              </h1>
            </div>
          </div>
          <p className="text-slate-400">
            {t('intro')}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Acceptance Section */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-purple-600/20 flex items-center justify-center text-purple-500 text-sm font-mono">1</span>
              {t('acceptanceTitle')}
            </h2>
            <div className="pl-10 space-y-4 text-slate-300">
              <p>{t('acceptance')}</p>
            </div>
          </div>

          {/* Accounts Section */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-purple-600/20 flex items-center justify-center text-purple-500 text-sm font-mono">2</span>
              {t('accountsTitle')}
            </h2>
            <div className="pl-10 space-y-4 text-slate-300">
              <p>{t('accounts')}</p>
            </div>
          </div>

          {/* Third Party Links Section */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-purple-600/20 flex items-center justify-center text-purple-500 text-sm font-mono">3</span>
              {t('linksTitle')}
            </h2>
            <div className="pl-10 space-y-4 text-slate-300">
              <p>{t('links')}</p>
            </div>
          </div>

          {/* Termination Section */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-purple-600/20 flex items-center justify-center text-purple-500 text-sm font-mono">4</span>
              {t('terminationTitle')}
            </h2>
            <div className="pl-10 space-y-4 text-slate-300">
              <p>{t('termination')}</p>
              <p>{t('terminationAccount')}</p>
            </div>
          </div>

          {/* Governing Law Section */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-purple-600/20 flex items-center justify-center text-purple-500 text-sm font-mono">5</span>
              {t('governingLawTitle')}
            </h2>
            <div className="pl-10 space-y-4 text-slate-300">
              <p>{t('governingLaw')}</p>
            </div>
          </div>

          {/* Entire Agreement Section */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-purple-600/20 flex items-center justify-center text-purple-500 text-sm font-mono">6</span>
              {t('entireAgreementTitle')}
            </h2>
            <div className="pl-10 space-y-4 text-slate-300">
              <p>{t('entireAgreement')}</p>
            </div>
          </div>

          {/* Changes Section */}
          <div className="mb-12 p-6 bg-gradient-to-r from-purple-600/10 to-cyan-600/10 rounded-xl border border-purple-500/20">
            <h2 className="text-xl font-bold text-white mb-4">{t('changesTitle')}</h2>
            <div className="space-y-4 text-slate-300">
              <p>{t('changes')}</p>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}
