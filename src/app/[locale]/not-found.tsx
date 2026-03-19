import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Home, Calendar, ArrowLeft } from 'lucide-react'
import { useLocale } from 'next-intl'

/**
 * Locale-aware 404 Not Found Page
 * - Automatically detects locale from URL
 * - Uses next-intl for translations
 * - Inherits Header/Footer from [locale]/layout.tsx
 * - Generates locale-prefixed links
 */
export default function NotFound() {
  const t = useTranslations('notFound')
  const locale = useLocale()

  const homeLink = locale === 'en' ? '/' : `/${locale}`
  const pricingLink = locale === 'en' ? '/pricing' : `/${locale}/pricing`
  const blogLink = locale === 'en' ? '/blog' : `/${locale}/blog`
  const integrationsLink = locale === 'en' ? '/integrations' : `/${locale}/integrations`
  const featuresLink = locale === 'en' ? '/features' : `/${locale}/features`
  const teamInboxLink = locale === 'en' ? '/team-inbox' : `/${locale}/team-inbox`

  const integrations: { name: string; slug: string }[] = [
    { name: 'HubSpot', slug: 'hubspot-whatsapp-integration' },
    { name: 'Salesforce', slug: 'salesforce-whatsapp-integration' },
    { name: 'Zoho', slug: 'zoho-whatsapp-integration' },
    { name: 'Bitrix24', slug: 'bitrix24-whatsapp-integration' },
    { name: 'Monday.com', slug: 'monday-whatsapp-integration' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-black via-brand-dark to-brand-black flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 relative">
      {/* Animated background pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-blue/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-brand-blue/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative max-w-2xl w-full mx-auto text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-[120px] sm:text-[150px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-cyan-400 leading-none select-none">
            404
          </h1>
        </div>

        {/* Content */}
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
          {t('title')}
        </h2>

        <p className="text-lg text-gray-400 mb-6 max-w-lg mx-auto">
          {t('subtitle')}
        </p>

        <p className="text-gray-500 mb-10 max-w-md mx-auto">
          {t('description')}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href={homeLink}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            <Home size={20} />
            {t('goToHome')}
          </Link>

          <Link
            href={pricingLink}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-all duration-200 border border-white/20"
          >
            <Calendar size={20} />
            {t('viewPricing')}
          </Link>
        </div>

        {/* Suggested Pages */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">
            {t('suggestedPages')}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Link
              href={integrationsLink}
              className="px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-all duration-200 text-sm font-medium"
            >
              {t('integrations')}
            </Link>
            <Link
              href={blogLink}
              className="px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-all duration-200 text-sm font-medium"
            >
              {t('blog')}
            </Link>
            <Link
              href={featuresLink}
              className="px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-all duration-200 text-sm font-medium"
            >
              {t('features')}
            </Link>
            <Link
              href={teamInboxLink}
              className="px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-all duration-200 text-sm font-medium"
            >
              {t('teamInbox')}
            </Link>
          </div>

          {/* Popular Integrations */}
          <div className="mt-4 pt-4 border-t border-white/10">
            <p className="text-xs text-gray-500 mb-3">{t('popularIntegrations')}:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {integrations.map((integration, index) => (
                <Link
                  key={integration.slug}
                  href={locale === 'en' ? `/${integration.slug}` : `/${locale}/${integration.slug}`}
                  className="text-xs text-brand-blue hover:text-cyan-400 transition-colors"
                >
                  {integration.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Back button */}
        <button
          onClick={() => window.history.back()}
          className="mt-8 inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors duration-200 text-sm cursor-pointer"
        >
          <ArrowLeft size={16} />
          {t('goBack')}
        </button>
      </div>
    </div>
  )
}
