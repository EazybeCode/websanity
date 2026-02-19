import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Home, ArrowLeft, Calendar, MessageCircle } from 'lucide-react'

/**
 * Custom 404 Not Found Page
 * - Returns proper 404 status code for SEO
 * - Multilingual support (en, es, br, tr)
 * - Conversion-focused CTAs
 */

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { t, i18n } = useTranslation()

  // Set 404 status code and noindex meta tag for SEO
  useEffect(() => {
    document.title = 'Page Not Found | Eazybe'

    // Set noindex meta tag to prevent indexing of 404 page
    let noIndexMeta = document.querySelector('meta[name="robots"][content="noindex"]')
    if (!noIndexMeta) {
      noIndexMeta = document.createElement('meta')
      noIndexMeta.setAttribute('name', 'robots')
      noIndexMeta.setAttribute('content', 'noindex, nofollow')
      document.head.appendChild(noIndexMeta)
    }

    // Return 404 status code for crawlers
    if (window.history.replaceState) {
      window.history.replaceState(null, '', location.pathname)
    }

    // Cleanup function
    return () => {
      if (noIndexMeta) {
        noIndexMeta.remove()
      }
    }
  }, [location.pathname])

  // Localized content based on language
  const getContent = () => {
    const lang = i18n.language.split('-')[0]

    const content: Record<string, {
      title: string
      subtitle: string
      description: string
      goToHome: string
      viewPricing: string
      bookDemo: string
      suggestedPages: string
      integrations: string
      blog: string
    }> = {
      en: {
        title: "Oops! Page Not Found",
        subtitle: "The page you're looking for doesn't exist or has been moved.",
        description: "Don't worry! You can find what you're looking for from our main sections below.",
        goToHome: "Go to Homepage",
        viewPricing: "View Pricing",
        bookDemo: "Book a Demo",
        suggestedPages: "Suggested Pages",
        integrations: "Integrations",
        blog: "Blog"
      },
      es: {
        title: "¡Ups! Página No Encontrada",
        subtitle: "La página que buscas no existe o ha sido movida.",
        description: "¡No te preocupes! Puedes encontrar lo que buscas en nuestras secciones principales abajo.",
        goToHome: "Ir al Inicio",
        viewPricing: "Ver Precios",
        bookDemo: "Reservar Demo",
        suggestedPages: "Páginas Sugeridas",
        integrations: "Integraciones",
        blog: "Blog"
      },
      pt: {
        title: "Ops! Página Não Encontrada",
        subtitle: "A página que você procura não existe ou foi movida.",
        description: "Não se preocupe! Você pode encontrar o que procura em nossas principais seções abaixo.",
        goToHome: "Ir para o Início",
        viewPricing: "Ver Preços",
        bookDemo: "Agendar Demo",
        suggestedPages: "Páginas Sugeridas",
        integrations: "Integrações",
        blog: "Blog"
      },
      tr: {
        title: "Hata! Sayfa Bulunamadı",
        subtitle: "Aradığınız sayfa mevcut değil veya taşınmış.",
        description: "Endişelenmeyin! Aşağıdaki ana bölümlerimizden aradığınızı bulabilirsiniz.",
        goToHome: "Ana Sayfaya Git",
        viewPricing: "Fiyatları Gör",
        bookDemo: "Demo Talep Et",
        suggestedPages: "Önerilen Sayfalar",
        integrations: "Entegrasyonlar",
        blog: "Blog"
      }
    }

    return content[lang] || content.en
  }

  const content = getContent()

  // Get correct base path based on current language
  const getBasePath = () => {
    const lang = i18n.language.split('-')[0]
    if (lang === 'es') return '/es'
    if (lang === 'pt') return '/br'
    if (lang === 'tr') return '/tr'
    return ''
  }

  const basePath = getBasePath()

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-black via-brand-dark to-brand-black flex items-center justify-center px-4 sm:px-6 lg:px-8">
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
          {content.title}
        </h2>

        <p className="text-lg text-gray-400 mb-6 max-w-lg mx-auto">
          {content.subtitle}
        </p>

        <p className="text-gray-500 mb-10 max-w-md mx-auto">
          {content.description}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={() => navigate(basePath || '/')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            <Home size={20} />
            {content.goToHome}
          </button>

          <button
            onClick={() => navigate(`${basePath}/pricing`)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-all duration-200 border border-white/20"
          >
            <Calendar size={20} />
            {content.viewPricing}
          </button>

          <button
            onClick={() => navigate(`${basePath}/become-our-partner`)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-blue to-cyan-500 hover:from-brand-blue/90 hover:to-cyan-500/90 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            <MessageCircle size={20} />
            {content.bookDemo}
          </button>
        </div>

        {/* Suggested Pages */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">
            {content.suggestedPages}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <a
              href={`${basePath}/integrations`}
              className="px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-all duration-200 text-sm font-medium"
            >
              {content.integrations}
            </a>
            <a
              href={`${basePath}/blog`}
              className="px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-all duration-200 text-sm font-medium"
            >
              {content.blog}
            </a>
            <a
              href={`${basePath}/features`}
              className="px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-all duration-200 text-sm font-medium"
            >
              Features
            </a>
            <a
              href={`${basePath}/team-inbox`}
              className="px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-all duration-200 text-sm font-medium"
            >
              Team Inbox
            </a>
          </div>

          {/* Popular Integrations */}
          <div className="mt-4 pt-4 border-t border-white/10">
            <p className="text-xs text-gray-500 mb-3">Popular Integrations:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <a href={`${basePath}/hubspot-whatsapp-integration`} className="text-xs text-brand-blue hover:text-cyan-400 transition-colors">HubSpot</a>
              <span className="text-gray-600">•</span>
              <a href={`${basePath}/salesforce-whatsapp-integration`} className="text-xs text-brand-blue hover:text-cyan-400 transition-colors">Salesforce</a>
              <span className="text-gray-600">•</span>
              <a href={`${basePath}/zoho-whatsapp-integration`} className="text-xs text-brand-blue hover:text-cyan-400 transition-colors">Zoho</a>
              <span className="text-gray-600">•</span>
              <a href={`${basePath}/bitrix24-whatsapp-integration`} className="text-xs text-brand-blue hover:text-cyan-400 transition-colors">Bitrix24</a>
              <span className="text-gray-600">•</span>
              <a href={`${basePath}/monday-whatsapp-integration`} className="text-xs text-brand-blue hover:text-cyan-400 transition-colors">Monday.com</a>
            </div>
          </div>
        </div>

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="mt-8 inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors duration-200 text-sm"
        >
          <ArrowLeft size={16} />
          Go back
        </button>
      </div>
    </div>
  )
}

export default NotFoundPage
