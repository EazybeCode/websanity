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

  // Homepage-specific JSON-LD Schemas - ONLY for root path (/)
  // Organization and WebSite schemas are in index.html (site-wide)
  useEffect(() => {
    if (location.pathname === '/') {
      // Helper function to add JSON-LD schema
      const addJsonLdSchema = (schema: any, id: string) => {
        let script = document.querySelector(`script[type="application/ld+json"][data-schema="${id}"]`)
        if (!script) {
          script = document.createElement('script')
          script.type = 'application/ld+json'
          ;(script as HTMLScriptElement).setAttribute('data-schema', id)
          document.head.appendChild(script)
        }
        script.textContent = JSON.stringify(schema)
      }

      // FAQPage Schema
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is Eazybe WhatsApp CRM Integration?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Eazybe is a WhatsApp CRM integration tool that syncs your WhatsApp Web conversations directly with your CRM like HubSpot, Zoho, Salesforce, and Google Sheets. It helps sales teams manage leads, schedule messages, and never miss follow-ups - all inside WhatsApp Web.",
              "inLanguage": "en"
            }
          },
          {
            "@type": "Question",
            "name": "How does WhatsApp CRM integration work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Eazybe integrates directly with WhatsApp Web as a Chrome extension. It automatically syncs incoming and outgoing messages to your CRM in real-time. You can schedule messages, use AI-powered smart replies, and manage shared team inboxes without leaving WhatsApp Web.",
              "inLanguage": "en"
            }
          },
          {
            "@type": "Question",
            "name": "Which CRMs does Eazybe integrate with?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Eazybe supports WhatsApp CRM integration with HubSpot, Zoho CRM, Salesforce, Bitrix24, Freshdesk, Pipedrive, Leadsquared, and Google Sheets. The integration is one-click setup and works instantly.",
              "inLanguage": "en"
            }
          },
          {
            "@type": "Question",
            "name": "Is Eazybe WhatsApp CRM integration free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, Eazybe offers a free plan with basic WhatsApp CRM integration features. Premium plans start with advanced features like AI replies, scheduled messages, and team collaboration tools.",
              "inLanguage": "en"
            }
          },
          {
            "@type": "Question",
            "name": "Can I schedule WhatsApp messages with Eazybe?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, Eazybe allows you to schedule WhatsApp messages in advance. You can set date and time for follow-ups, birthday messages, promotional campaigns, and more. Messages are sent automatically even when you're offline.",
              "inLanguage": "en"
            }
          },
          {
            "@type": "Question",
            "name": "Does Eazybe support shared team inboxes?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, Eazybe provides shared team inbox functionality. Multiple team members can access and manage WhatsApp conversations from a single dashboard. Assign chats, add notes, and collaborate seamlessly.",
              "inLanguage": "en"
            }
          }
        ]
      }

      // BreadcrumbList Schema
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": "https://eazybe.com/#breadcrumb",
        "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Eazybe", "item": "https://eazybe.com/" }]
      }

      // WebPage Schema
      const webpageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": "https://eazybe.com/#webpage",
        "url": "https://eazybe.com/",
        "name": "WhatsApp CRM Integration | WhatsApp Sales Platform - Eazybe",
        "description": "WhatsApp CRM integration for (HubSpot, Zoho, Salesforce, Sheets). CRM integration with WhatsApp sync chats with your CRM, AI replies, & shared inboxes.",
        "isPartOf": { "@id": "https://eazybe.com/#website" },
        "about": { "@id": "https://eazybe.com/#organization" },
        "inLanguage": "en",
        "primaryImageOfPage": { "@type": "ImageObject", "url": "https://eazybe.com/logo.png" },
        "datePublished": "2026-01-15T08:00:00+00:00",
        "dateModified": "2026-02-01T10:30:00+00:00",
        "breadcrumb": { "@id": "https://eazybe.com/#breadcrumb" }
      }

      // SoftwareApplication Schema
      const softwareApplicationSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "@id": "https://eazybe.com/#softwareapplication",
        "name": "Eazybe",
        "operatingSystem": "Web",
        "applicationCategory": "BusinessApplication",
        "applicationSubCategory": "CRM, Messaging, WhatsApp Automation",
        "image": ["https://eazybe.com/logo.png"],
        "description": "Eazybe is a WhatsApp Chrome Extension that transforms WhatsApp Web into a powerful CRM tool. It integrates with HubSpot, Zoho, Salesforce, and Google Sheets to help sales, marketing, and support teams manage conversations and customer data more effectively.",
        "softwareVersion": "latest",
        "url": "https://eazybe.com/",
        "downloadUrl": "https://chrome.google.com/webstore/detail/clgficggccelgifppbcaepjdkklfcefd",
        "screenshot": "https://cdn.prod.website-files.com/64cb8fe9dae4f2e5a069eb37/687f71bf8e51d6931ee45917_hero_image_without_AI-p-1080.webp",
        "offers": {
          "@type": "AggregateOffer",
          "url": "https://eazybe.com/pricing",
          "priceCurrency": "USD",
          "lowPrice": 10,
          "highPrice": 50,
          "offerCount": 5,
          "availability": "https://schema.org/InStock"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": 4.9,
          "bestRating": 5,
          "worstRating": 1,
          "ratingCount": 53978
        },
        "publisher": {
          "@type": "Organization",
          "name": "Eazybe"
        }
      }

      // ProfessionalService Schema
      const professionalServiceSchema = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": "https://eazybe.com/#professionalservice",
        "name": "Eazybe",
        "url": "https://eazybe.com/",
        "image": ["https://eazybe.com/logo.png"],
        "logo": "https://eazybe.com/logo.png",
        "telephone": "+13099294280",
        "priceRange": "From $10/month",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "8 The Green, Ste B",
          "addressLocality": "Dover",
          "addressRegion": "DE",
          "postalCode": "19901",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 38.692045,
          "longitude": -75.401331
        },
        "openingHoursSpecification": [{
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "00:00",
          "closes": "23:59"
        }]
      }

      // Product Schema
      const productSchema = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": "Eazybe",
        "image": "https://eazybe.com/logo.png",
        "description": "Eazybe is a WhatsApp Chrome Extension that transforms WhatsApp Web into a powerful CRM tool. It integrates seamlessly with HubSpot, Zoho, Salesforce, and Google Sheets to help sales, marketing, and support teams manage conversations and customer data more effectively.",
        "brand": {
          "@type": "Brand",
          "name": "Eazybe"
        },
        "offers": {
          "@type": "AggregateOffer",
          "url": "https://eazybe.com/pricing",
          "priceCurrency": "USD",
          "lowPrice": 10,
          "highPrice": 50,
          "offerCount": 5
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": 4.9,
          "bestRating": 5.0,
          "worstRating": 4.7,
          "ratingCount": 30766
        }
      }

      // Add all homepage-only schemas
      addJsonLdSchema(faqSchema, 'faq')
      addJsonLdSchema(breadcrumbSchema, 'breadcrumb')
      addJsonLdSchema(webpageSchema, 'webpage')
      addJsonLdSchema(softwareApplicationSchema, 'softwareapplication')
      addJsonLdSchema(professionalServiceSchema, 'professionalservice')
      addJsonLdSchema(productSchema, 'product')
    }

    // Cleanup function
    return () => {
      const schemas = ['faq', 'breadcrumb', 'webpage', 'softwareapplication', 'professionalservice', 'product']
      schemas.forEach(id => {
        const script = document.querySelector(`script[type="application/ld+json"][data-schema="${id}"]`)
        if (script) script.remove()
      })
    }
  }, [location.pathname])

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
