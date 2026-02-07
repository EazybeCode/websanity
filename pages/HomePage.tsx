import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { ChunkyFooter } from '../components/footer/ChunkyFooter'
import { SectionRenderer } from '../components/SectionRenderer'
import { useLandingPage } from '../hooks/useLandingPage'
import { LeadSidebar } from '../components/LeadSidebar'
import { LeadMobileButton } from '../components/LeadMobileButton'

export const HomePage: React.FC = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const [showForm, setShowForm] = useState(false)

  // Note: JSON-LD schemas are now in index.html as static markup for better SEO
  // They are immediately crawlable without waiting for JavaScript execution

  // Homepage Meta Tags - ONLY for root path (/)
  useEffect(() => {
    if (location.pathname === '/') {
      // Helper function to set/update meta tag
      const setMetaTag = (nameOrProperty: string, content: string, isProperty = false) => {
        const attr = isProperty ? 'property' : 'name'
        let meta = document.querySelector(`meta[${attr}="${nameOrProperty}"]`)
        if (!meta) {
          meta = document.createElement('meta')
          meta.setAttribute(attr, nameOrProperty)
          document.head.appendChild(meta)
        }
        meta.setAttribute('content', content)
      }

      // Helper function to set document title
      const setDocumentTitle = (title: string) => {
        document.title = title
      }

      // Helper function to set link tag
      const setLinkTag = (rel: string, href: string) => {
        let link = document.querySelector(`link[rel="${rel}"]`)
        if (!link) {
          link = document.createElement('link')
          link.setAttribute('rel', rel)
          document.head.appendChild(link)
        }
        link.setAttribute('href', href)
      }

      // Set document title
      setDocumentTitle('WhatsApp CRM Integration | Eazybe - WhatsApp Sales Platform')

      // Basic meta tags
      setMetaTag('title', 'WhatsApp CRM Integration | Eazybe - WhatsApp Sales Platform')
      setMetaTag('description', 'WhatsApp CRM integration for (HubSpot, Zoho, Salesforce, Sheets). CRM integration with WhatsApp sync chats with your CRM, AI replies, & shared inboxes.')
      setMetaTag('keywords', 'WhatsApp CRM, WhatsApp CRM Integration, CRM integration with WhatsApp, WhatsApp Web extension, CRM integration, CRM WhatsApp integration, sales productivity, WhatsApp productivity')
      setMetaTag('author', 'Eazybe')
      setMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
      setMetaTag('googlebot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
      setMetaTag('bingbot', 'index, follow')
      setMetaTag('thumbnail', 'https://eazybe.com/logo.png')

      // Article meta tags
      setMetaTag('article:published_time', '2025-02-03T08:00:00+00:00', true)
      setMetaTag('article:modified_time', '2025-02-03T10:30:00+00:00', true)
      setMetaTag('article:section', 'Technology', true)
      setMetaTag('article:tag', 'WhatsApp CRM Integration', true)

      // Open Graph meta tags
      setMetaTag('og:type', 'website', true)
      setMetaTag('og:url', 'https://eazybe.com/', true)
      setMetaTag('og:title', 'Eazybe — WhatsApp CRM & Productivity Tool for Sales Teams', true)
      setMetaTag('og:description', 'Integrate WhatsApp Web directly with HubSpot, Zoho, Salesforce & more. Manage chats, schedule messages, and boost customer engagement — all inside WhatsApp Web.', true)
      setMetaTag('og:image', 'https://eazybe.com/logo.png', true)
      setMetaTag('og:image:width', '1200', true)
      setMetaTag('og:image:height', '630', true)
      setMetaTag('og:image:alt', 'Eazybe – WhatsApp Sales Platform for CRM Teams', true)
      setMetaTag('og:locale', 'en_US', true)
      setMetaTag('og:site_name', 'Eazybe', true)

      // Twitter Card meta tags
      setMetaTag('twitter:card', 'summary_large_image')
      setMetaTag('twitter:site', '@eazybe')
      setMetaTag('twitter:creator', '@eazybe')
      setMetaTag('twitter:title', 'Eazybe | WhatsApp CRM & Sales Productivity Extension')
      setMetaTag('twitter:description', 'Turn WhatsApp Web into a powerful CRM tool with Eazybe. Sync chats with HubSpot, Zoho, Salesforce & more — schedule messages, use smart replies, and boost sales.')
      setMetaTag('twitter:image', 'https://eazybe.com/logo.png')
      setMetaTag('twitter:image:alt', 'Eazybe WhatsApp CRM Integration Extension')
      setMetaTag('twitter:label1', 'Rating')
      setMetaTag('twitter:data1', '4.7/5')
      setMetaTag('twitter:label2', 'Price')
      setMetaTag('twitter:data2', 'Free')

      // Mobile web app meta tags
      setMetaTag('mobile-web-app-capable', 'yes')
      setMetaTag('apple-mobile-web-app-capable', 'yes')
      setMetaTag('apple-mobile-web-app-status-bar-style', 'default')
      setMetaTag('apple-mobile-web-app-title', 'Eazybe')

      // Custom SEO meta tags
      setMetaTag('answer-type', 'how-to, product-information, feature-comparison')
      setMetaTag('target-audience', 'sales teams, business owners, CRM managers, B2B professionals')
      setMetaTag('content-intent', 'informational, commercial-investigation, transactional')
      setMetaTag('conversational-query', 'how to manage whatsapp leads in crm, best whatsapp crm integration')
      setMetaTag('ai-readability', 'conversational, professional, solution-oriented')
      setMetaTag('context-window', 'sales automation, customer communication, lead tracking, CRM integration, business messaging')
      setMetaTag('user-problem', 'losing leads in WhatsApp, missed follow-ups, disconnected sales workflow')
      setMetaTag('solution-summary', 'automatic WhatsApp to CRM synchronization')
      setMetaTag('primary-benefit', 'never miss a lead or follow-up')
      setMetaTag('use-case', 'sales teams managing customer conversations across WhatsApp and CRM')
      setMetaTag('implementation-difficulty', 'easy, one-click installation')
      setMetaTag('time-to-value', 'immediate, instant sync')

      // Link tags
      setLinkTag('preconnect', 'https://fonts.googleapis.com')
      setLinkTag('dns-prefetch', 'https://fonts.googleapis.com')

      // HTTP equiv meta tags
      let httpEquiv = document.querySelector('meta[http-equiv="X-UA-Compatible"]')
      if (!httpEquiv) {
        httpEquiv = document.createElement('meta')
        httpEquiv.setAttribute('http-equiv', 'X-UA-Compatible')
        document.head.appendChild(httpEquiv)
      }
      httpEquiv.setAttribute('content', 'IE=edge')

      // Referrer meta tag
      setMetaTag('referrer', 'origin-when-cross-origin')
    }

    // Cleanup function - remove meta tags when leaving homepage
    return () => {
      // Optionally reset title when leaving homepage
      // document.title = 'Eazybe'
    }
  }, [location.pathname])

  useEffect(() => {
    // Show form on English (/), Brazilian Portuguese (/br), and Spanish (/es) pages
    const shouldShow = window.location.pathname === '/' ||
                       window.location.pathname === '/br' ||
                       window.location.pathname === '/es'
    setShowForm(shouldShow)
  }, [])
  const { data, loading, error } = useLandingPage()

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-brand-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">{t('common.loading')}</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center">
        <div className="text-center text-red-400">
          <p>{t('common.error')}: {error.message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-black font-sans text-slate-400 antialiased selection:bg-brand-blue selection:text-white overflow-x-hidden">
      <Navbar />

      {/* Desktop sticky sidebar - English, Brazilian Portuguese, and Spanish */}
      {showForm && <LeadSidebar />}

      {/* Mobile sticky bottom button - English, Brazilian Portuguese, and Spanish */}
      {showForm && <LeadMobileButton />}

      <main>
        {data?.sections
          ?.filter((section) => section._type !== 'securitySection' && section._type !== 'ctaSection')
          .map((section) => (
            <SectionRenderer key={section._key} section={section} />
          ))}
      </main>
      <ChunkyFooter />
    </div>
  )
}

export default HomePage
