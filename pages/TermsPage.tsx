import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { ChunkyFooter } from '../components/footer/ChunkyFooter'
import { ScrollText } from 'lucide-react'
import { getLanguageFromPath } from '../components/LanguageProvider'

export const TermsPage: React.FC = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const currentLanguage = getLanguageFromPath(location.pathname)

  // Add noindex meta tag for ALL language versions
  useEffect(() => {
    // Check if there's already a meta robots tag
    let metaRobots = document.querySelector('meta[name="robots"]') as HTMLMetaElement

    if (metaRobots) {
      // Update existing meta robots tag
      metaRobots.content = 'noindex, nofollow'
      metaRobots.setAttribute('data-terms-noindex', 'true')
    } else {
      // Create new meta robots tag
      metaRobots = document.createElement('meta')
      metaRobots.name = 'robots'
      metaRobots.content = 'noindex, nofollow'
      metaRobots.setAttribute('data-terms-noindex', 'true')

      // Insert at the beginning of head for visibility
      if (document.head.firstChild) {
        document.head.insertBefore(metaRobots, document.head.firstChild)
      } else {
        document.head.appendChild(metaRobots)
      }
    }

    console.log('✅ Terms Page: Meta robots tag added/updated ->', metaRobots.content)

    return () => {
      // Cleanup: remove or restore the meta tag when component unmounts
      const existingMeta = document.querySelector('meta[data-terms-noindex="true"]')
      if (existingMeta) {
        existingMeta.removeAttribute('data-terms-noindex')
        // If we created the tag, remove it; otherwise just remove our marker
        if (!existingMeta.hasAttribute('data-original')) {
          existingMeta.remove()
        }
        console.log('🧹 Terms Page: Meta robots tag cleaned up')
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-300 antialiased">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-slate-950 border-b border-slate-800/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-purple-600/20 flex items-center justify-center">
              <ScrollText className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                {t('terms.title')}
              </h1>
            </div>
          </div>
          <p className="text-slate-400">
            {t('terms.intro')}
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
              {t('terms.acceptanceTitle')}
            </h2>
            <div className="pl-10 space-y-4 text-slate-300">
              <p>{t('terms.acceptance')}</p>
            </div>
          </div>

          {/* Accounts Section */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-purple-600/20 flex items-center justify-center text-purple-500 text-sm font-mono">2</span>
              {t('terms.accountsTitle')}
            </h2>
            <div className="pl-10 space-y-4 text-slate-300">
              <p>{t('terms.accounts')}</p>
            </div>
          </div>

          {/* Third Party Links Section */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-purple-600/20 flex items-center justify-center text-purple-500 text-sm font-mono">3</span>
              {t('terms.linksTitle')}
            </h2>
            <div className="pl-10 space-y-4 text-slate-300">
              <p>{t('terms.links')}</p>
            </div>
          </div>

          {/* Termination Section */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-purple-600/20 flex items-center justify-center text-purple-500 text-sm font-mono">4</span>
              {t('terms.terminationTitle')}
            </h2>
            <div className="pl-10 space-y-4 text-slate-300">
              <p>{t('terms.termination')}</p>
              <p>{t('terms.terminationAccount')}</p>
            </div>
          </div>

          {/* Governing Law Section */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-purple-600/20 flex items-center justify-center text-purple-500 text-sm font-mono">5</span>
              {t('terms.governingLawTitle')}
            </h2>
            <div className="pl-10 space-y-4 text-slate-300">
              <p>{t('terms.governingLaw')}</p>
            </div>
          </div>

          {/* Entire Agreement Section */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-purple-600/20 flex items-center justify-center text-purple-500 text-sm font-mono">6</span>
              {t('terms.entireAgreementTitle')}
            </h2>
            <div className="pl-10 space-y-4 text-slate-300">
              <p>{t('terms.entireAgreement')}</p>
            </div>
          </div>

          {/* Changes Section */}
          <div className="mb-12 p-6 bg-gradient-to-r from-purple-600/10 to-cyan-600/10 rounded-xl border border-purple-500/20">
            <h2 className="text-xl font-bold text-white mb-4">{t('terms.changesTitle')}</h2>
            <div className="space-y-4 text-slate-300">
              <p>{t('terms.changes')}</p>
            </div>
          </div>

        </div>
      </section>

      <ChunkyFooter />
    </div>
  )
}

export default TermsPage
