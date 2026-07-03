'use client'

import { useState, useEffect } from 'react'
import { Home, ArrowLeft, Calendar, Languages } from 'lucide-react'
import Link from 'next/link'

/**
 * Custom 404 Not Found Page
 * - Multilingual support (en, es, pt, tr)
 * - Auto-detects browser language
 * - Conversion-focused CTAs
 * - Animated 404 design
 */

const content = {
  en: {
    title: "Oops! Page Not Found",
    subtitle: "The page you're looking for doesn't exist or has been moved.",
    description: "Don't worry! You can find what you're looking for from our main sections below.",
    goToHome: "Go to Homepage",
    viewPricing: "View Pricing",
    suggestedPages: "Suggested Pages",
    integrations: "Integrations",
    blog: "Blog",
    features: "Features",
    comparison: "Comparison",
    popularIntegrations: "Popular Integrations",
    goBack: "Go back"
  },
  es: {
    title: "¡Ups! Página No Encontrada",
    subtitle: "La página que buscas no existe o ha sido movida.",
    description: "¡No te preocupes! Puedes encontrar lo que buscas en nuestras secciones principales abajo.",
    goToHome: "Ir al Inicio",
    viewPricing: "Ver Precios",
    suggestedPages: "Páginas Sugeridas",
    integrations: "Integraciones",
    blog: "Blog",
    features: "Características",
    comparison: "Comparación",
    popularIntegrations: "Integraciones Populares",
    goBack: "Volver"
  },
  pt: {
    title: "Ops! Página Não Encontrada",
    subtitle: "A página que você procura não existe ou foi movida.",
    description: "Não se preocupe! Você pode encontrar o que procura em nossas principais seções abaixo.",
    goToHome: "Ir para o Início",
    viewPricing: "Ver Preços",
    suggestedPages: "Páginas Sugeridas",
    integrations: "Integrações",
    blog: "Blog",
    features: "Recursos",
    comparison: "Comparação",
    popularIntegrations: "Integrações Populares",
    goBack: "Voltar"
  },
  tr: {
    title: "Hata! Sayfa Bulunamadı",
    subtitle: "Aradığınız sayfa mevcut değil veya taşınmış.",
    description: "Endişelenmeyin! Aşağıdaki ana bölümlerimizden aradığınızı bulabilirsiniz.",
    goToHome: "Ana Sayfaya Git",
    viewPricing: "Fiyatları Gör",
    suggestedPages: "Önerilen Sayfalar",
    integrations: "Entegrasyonlar",
    blog: "Blog",
    features: "Özellikler",
    comparison: "Karşılaştırma",
    popularIntegrations: "Popüler Entegrasyonlar",
    goBack: "Geri git"
  }
}

const integrations = [
  { name: 'HubSpot', slug: 'hubspot-whatsapp-integration' },
  { name: 'Salesforce', slug: 'salesforce-whatsapp-integration' },
  { name: 'Zoho', slug: 'zoho-whatsapp-integration' },
  { name: 'Bitrix24', slug: 'bitrix24-whatsapp-integration' },
  { name: 'Monday.com', slug: 'monday-whatsapp-integration' },
]

// Map browser language codes to our content keys
function detectLocale(): keyof typeof content {
  if (typeof window === 'undefined') return 'en'

  const browserLang = navigator.language.toLowerCase()
  const localeCode = browserLang.split('-')[0]

  // Map browser codes to our content keys
  const localeMap: Record<string, keyof typeof content> = {
    'en': 'en',
    'es': 'es',
    'pt': 'pt',
    'br': 'pt',  // Brazilian Portuguese uses pt content
    'tr': 'tr',
  }

  return localeMap[localeCode] || 'en'
}

function getLocalePaths(locale: keyof typeof content) {
  const prefix = locale === 'en' ? '' : `/${locale === 'pt' ? 'br' : locale}`
  return {
    home: prefix || '/',
    pricing: `${prefix}/pricing`,
    integrations: `${prefix}/integrations`,
    blog: `${prefix}/blog`,
    features: `${prefix}/features`,
    comparison: `${prefix}/comparison`,
  }
}

export default function NotFound() {
  const [locale, setLocale] = useState<keyof typeof content>('en')
  const [paths, setPaths] = useState(getLocalePaths('en'))

  useEffect(() => {
    const detectedLocale = detectLocale()
    setLocale(detectedLocale)
    setPaths(getLocalePaths(detectedLocale))
  }, [])

  const t = content[locale]

  return (
    <div data-tone="dark" className="min-h-screen bg-gradient-to-br from-brand-black via-brand-dark to-brand-black flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 relative">
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
          {t.title}
        </h2>

        <p className="text-lg text-gray-400 mb-6 max-w-lg mx-auto">
          {t.subtitle}
        </p>

        <p className="text-gray-500 mb-10 max-w-md mx-auto">
          {t.description}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href={paths.home}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            <Home size={20} />
            {t.goToHome}
          </Link>

          <Link
            href={paths.pricing}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-all duration-200 border border-white/20"
          >
            <Calendar size={20} />
            {t.viewPricing}
          </Link>
        </div>

        {/* Suggested Pages */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">
            {t.suggestedPages}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Link
              href={paths.integrations}
              className="px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-all duration-200 text-sm font-medium"
            >
              {t.integrations}
            </Link>
            <Link
              href={paths.blog}
              className="px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-all duration-200 text-sm font-medium"
            >
              {t.blog}
            </Link>
            <Link
              href={paths.features}
              className="px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-all duration-200 text-sm font-medium"
            >
              {t.features}
            </Link>
            <Link
              href={paths.comparison}
              className="px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-all duration-200 text-sm font-medium"
            >
              {t.comparison}
            </Link>
          </div>

          {/* Popular Integrations */}
          <div className="mt-4 pt-4 border-t border-white/10">
            <p className="text-xs text-gray-500 mb-3">{t.popularIntegrations}:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {integrations.map((integration, index) => (
                <Link
                  key={integration.slug}
                  href={locale === 'en' ? `/${integration.slug}` : `/${locale === 'pt' ? 'br' : locale}/${integration.slug}`}
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
          {t.goBack}
        </button>

        {/* Language Switcher */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <Languages size={16} className="text-gray-500" />
          <div className="flex gap-1">
            {(['en', 'es', 'pt', 'tr'] as const).map((lang) => {
              const langPrefix = lang === 'pt' ? 'BR' : lang.toUpperCase()
              const isActive = locale === lang
              return (
                <button
                  key={lang}
                  onClick={() => {
                    setLocale(lang)
                    setPaths(getLocalePaths(lang))
                  }}
                  className={`px-3 py-1 text-xs font-medium rounded transition-all ${
                    isActive
                      ? 'bg-brand-blue text-white'
                      : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {langPrefix}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
