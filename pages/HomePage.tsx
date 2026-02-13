import React, { useEffect, lazy, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { SectionRenderer } from '../components/SectionRenderer'
import { useLandingPage } from '../hooks/useLandingPage'

// Lazy load footer - it's below the fold (saves 20 KB on initial load)
const ChunkyFooter = lazy(() => import('../components/footer/ChunkyFooter').then(m => ({ default: m.ChunkyFooter })))

export const HomePage: React.FC = () => {
  const { t } = useTranslation()
  const location = useLocation()

  // Homepage SEO - ONLY for root path (/)
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

      // Organization Schema
      const orgSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": "https://eazybe.com/#organization",
        "name": "Eazybe",
        "url": "https://eazybe.com/",
        "logo": {
          "@type": "ImageObject",
          "url": "https://eazybe.com/logo.png",
          "width": 600,
          "height": 60
        },
        "image": "https://eazybe.com/logo.png",
        "description": "Eazybe is a WhatsApp CRM integration platform that helps sales teams sync conversations with their CRM, schedule messages, and boost customer engagement - all inside WhatsApp Web.",
        "foundingDate": "2024",
        "sameAs": [
          "https://twitter.com/eazybe",
          "https://linkedin.com/company/eazybe",
          "https://youtube.com/@eazybe"
        ],
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "email": "support@eazybe.com",
            "url": "https://eazybe.com",
            "areaServed": "US",
            "availableLanguage": "en"
          }
        ],
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "US"
        }
      }

      // WebSite Schema (with search action)
      const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://eazybe.com/#website",
        "url": "https://eazybe.com/",
        "name": "Eazybe",
        "description": "WhatsApp CRM Integration | Eazybe - WhatsApp Sales Platform. CRM integration with WhatsApp for HubSpot, Zoho, Salesforce, and more.",
        "publisher": { "@id": "https://eazybe.com/#organization" },
        "inLanguage": "en",
        "potentialAction": {
          "@type": "SearchAction",
          "target": { "@type": "EntryPoint", "urlTemplate": "https://eazybe.com/search?q={search_term_string}" },
          "query-input": "required name=search_term_string"
        }
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
        "publisher": { "@id": "https://eazybe.com/#organization" },
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

      // Add all homepage schemas
      addJsonLdSchema(orgSchema, 'organization')
      addJsonLdSchema(websiteSchema, 'website')
      addJsonLdSchema(faqSchema, 'faq')
      addJsonLdSchema(breadcrumbSchema, 'breadcrumb')
      addJsonLdSchema(webpageSchema, 'webpage')
      addJsonLdSchema(softwareApplicationSchema, 'softwareapplication')
      addJsonLdSchema(professionalServiceSchema, 'professionalservice')
      addJsonLdSchema(productSchema, 'product')
    }

    // Cleanup function
    return () => {
      const schemas = ['organization', 'website', 'faq', 'breadcrumb', 'webpage', 'softwareapplication', 'professionalservice', 'product']
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

  // Brazilian Portuguese Homepage Meta Tags - ONLY for /br path
  useEffect(() => {
    if (location.pathname === '/br') {
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
      setDocumentTitle('CRM integrado com WhatsApp para equipes | Eazybe')

      // Basic meta tags
      setMetaTag('title', 'CRM integrado com WhatsApp para equipes | Eazybe')
      setMetaTag('description', 'Integre WhatsApp ao CRM (HubSpot, Zoho, Salesforce e Sheets). Sincronize chats, use IA e caixa compartilhada para vender mais.')
      setMetaTag('keywords', 'crm integrado com whatsapp, crm com whatsapp integrado, crm com integração whatsapp, crm integrado com whatsapp grátis, crm with whatsapp integration, best crm with whatsapp integration, crm gratuito com integração whatsapp')
      setMetaTag('author', 'Eazybe')
      setMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
      setMetaTag('googlebot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
      setMetaTag('bingbot', 'index, follow')
      setMetaTag('thumbnail', 'https://eazybe.com/logo.png')

      // Article meta tags
      setMetaTag('article:published_time', '2026-02-03T08:00:00+00:00', true)
      setMetaTag('article:modified_time', '2026-02-03T10:30:00+00:00', true)
      setMetaTag('article:section', 'Technology', true)
      setMetaTag('article:tag', 'crm integrado com whatsapp', true)

      // Open Graph meta tags
      setMetaTag('og:type', 'website', true)
      setMetaTag('og:url', 'https://eazybe.com/br', true)
      setMetaTag('og:title', 'Melhor CRM integrado com WhatsApp? Conheça Eazybe', true)
      setMetaTag('og:description', 'CRM integrado com WhatsApp: sincronize chats, respostas com IA e inbox compartilhado para HubSpot, Zoho, Salesforce e Sheets.', true)
      setMetaTag('og:image', 'https://eazybe.com/logo.png', true)
      setMetaTag('og:image:width', '1200', true)
      setMetaTag('og:image:height', '630', true)
      setMetaTag('og:image:alt', 'Eazybe – CRM integrado com WhatsApp para equipes', true)
      setMetaTag('og:locale', 'PT-BR', true)
      setMetaTag('og:site_name', 'Eazybe', true)

      // Twitter Card meta tags
      setMetaTag('twitter:card', 'summary_large_image')
      setMetaTag('twitter:site', '@eazybe')
      setMetaTag('twitter:creator', '@eazybe')
      setMetaTag('twitter:title', 'Integração CRM com WhatsApp simplificada | Eazybe')
      setMetaTag('twitter:description', 'CRM com integração WhatsApp para HubSpot, Zoho, Salesforce e Sheets. Sincronize conversas, IA e inbox compartilhado.')
      setMetaTag('twitter:image', 'https://eazybe.com/logo.png')
      setMetaTag('twitter:image:alt', 'Extensão de integração do Eazybe com o WhatsApp para CRM')
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
      setMetaTag('answer-type', 'tutorial, informações do produto, comparação de recursos')
      setMetaTag('target-audience', 'equipes de vendas, donos de empresas, gestores de CRM, profissionais B2B, suporte ao cliente, desenvolvimento de negócios')
      setMetaTag('content-intent', 'informativo, investigação comercial, transacional')
      setMetaTag('conversational-query', 'como gerenciar leads do whatsapp no crm, melhor integração whatsapp crm, agentes de IA para suporte ao cliente, como acompanhar desempenho de vendas no crm, agentes de vendas com IA, como fazer backup de conversas do whatsapp no crm')
      setMetaTag('ai-readability', 'conversacional, profissional, focado em solução')
      setMetaTag('context-window', 'automação de vendas, comunicação com cliente, rastreamento de leads, integração de CRM, mensagens de negócios, acompanhamento de performance de vendas, automação de fluxo de trabalho de CRM, CRM dentro do WhatsApp')
      setMetaTag('user-problem', 'perda de leads no WhatsApp, esquecimento de follow-ups, fluxo de trabalho de vendas desconectado')
      setMetaTag('solution-summary', 'sincronização automática do WhatsApp com o CRM')
      setMetaTag('primary-benefit', 'nunca mais perca um lead ou um acompanhamento')
      setMetaTag('use-case', 'equipes de vendas gerenciando conversas com clientes entre o WhatsApp e o CRM')
      setMetaTag('implementation-difficulty', 'fácil, instalação em um clique')
      setMetaTag('time-to-value', 'imediato, sincronização instantânea')

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

      // Portuguese FAQ JSON-LD Schema
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "O que é o Eazybe?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "O Eazybe é uma plataforma de CRM e vendas para WhatsApp que ajuda empresas a gerenciar conversas com clientes, automatizar respostas, rastrear receita e integrar o WhatsApp com ferramentas de CRM populares como HubSpot, Salesforce e mais."
            }
          },
          {
            "@type": "Question",
            "name": "O que é Coexistência de API do WhatsApp?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A coexistência permite que você use o WhatsApp Web e a API do WhatsApp simultaneamente. Isso significa que você pode manter suas conversas manuais enquanto automatiza mensagens em massa e modelos através da API."
            }
          },
          {
            "@type": "Question",
            "name": "Quais integrações o Eazybe suporta?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "O Eazybe se integra com HubSpot, Salesforce, Zoho CRM, Bitrix24, LeadSquared, Freshdesk, Google Sheets e webhooks personalizados. Estamos constantemente adicionando novas integrações."
            }
          },
          {
            "@type": "Question",
            "name": "O Eazybe é seguro de usar?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sim! O Eazybe é parceiro de negócios da Meta e compatível com LGPD/GDPR. Usamos criptografia de nível bancário para proteger seus dados e nunca armazenamos suas credenciais do WhatsApp em nossos servidores."
            }
          },
          {
            "@type": "Question",
            "name": "Como funciona o teste gratuito?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Você pode começar com nosso teste gratuito de 14 dias sem necessidade de cartão de crédito. Após o teste, você pode escolher um plano que atenda às suas necessidades - de usuários individuais a equipes empresariais."
            }
          },
          {
            "@type": "Question",
            "name": "Posso usar o Eazybe para colaboração em equipe?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Com certeza! O Eazybe inclui uma caixa de entrada de equipe compartilhada, modelos de resposta rápida, agendador de mensagens e WhatsApp Copilot para ajudar toda a sua equipe a trabalhar de forma eficiente."
            }
          },
          {
            "@type": "Question",
            "name": "Como funciona a Caixa de Entrada de Receita?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A Caixa de Entrada de Receita rastreia e atribui receita a conversas específicas do WhatsApp, dando visibilidade sobre quais mensagens levam a vendas e ajudando sua equipe a focar em leads de alto valor."
            }
          }
        ]
      }

      // Add FAQ schema to head
      let faqScript = document.querySelector('script[type="application/ld+json"][data-schema="faq-br"]')
      if (!faqScript) {
        faqScript = document.createElement('script')
        faqScript.type = 'application/ld+json'
        faqScript.setAttribute('data-schema', 'faq-br')
        document.head.appendChild(faqScript)
      }
      faqScript.textContent = JSON.stringify(faqSchema)

      // BreadcrumbList Schema for /br
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Eazybe",
            "item": "https://eazybe.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "BR",
            "item": "https://eazybe.com/br"
          }
        ]
      }

      // Add breadcrumb schema to head
      let breadcrumbScript = document.querySelector('script[type="application/ld+json"][data-schema="breadcrumb-br"]')
      if (!breadcrumbScript) {
        breadcrumbScript = document.createElement('script')
        breadcrumbScript.type = 'application/ld+json'
        breadcrumbScript.setAttribute('data-schema', 'breadcrumb-br')
        document.head.appendChild(breadcrumbScript)
      }
      breadcrumbScript.textContent = JSON.stringify(breadcrumbSchema)

      // Organization Schema for /br
      const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": "https://eazybe.com/br/#organization",
        "name": "Eazybe",
        "url": "https://eazybe.com/br",
        "logo": {
          "@type": "ImageObject",
          "url": "https://eazybe.com/logo.png",
          "width": 600,
          "height": 60
        },
        "image": "https://eazybe.com/logo.png",
        "description": "Eazybe é uma plataforma de integração de CRM para WhatsApp que ajuda equipes de vendas a sincronizar conversas, agendar mensagens e aumentar o engajamento de clientes diretamente no WhatsApp Web.",
        "foundingDate": "2021",
        "sameAs": [
          "https://twitter.com/eazybe",
          "https://linkedin.com/company/eazybe",
          "https://youtube.com/@eazybe"
        ],
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "email": "support@eazybe.com",
            "url": "https://eazybe.com/br",
            "areaServed": "Brazil",
            "availableLanguage": ["Portuguese"]
          }
        ],
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "8, The Green STE B",
          "addressLocality": "Dover",
          "addressRegion": "Delaware",
          "postalCode": "19901",
          "addressCountry": "US"
        },
        "knowsAbout": ["WhatsApp CRM", "Sales Automation", "CRM Integration", "CRM AI Agents", "Customer Engagement"]
      }

      // Add organization schema to head
      let orgScript = document.querySelector('script[type="application/ld+json"][data-schema="organization-br"]')
      if (!orgScript) {
        orgScript = document.createElement('script')
        orgScript.type = 'application/ld+json'
        orgScript.setAttribute('data-schema', 'organization-br')
        document.head.appendChild(orgScript)
      }
      orgScript.textContent = JSON.stringify(organizationSchema)

      // WebSite Schema for /br
      const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://eazybe.com/br/#website",
        "url": "https://eazybe.com/br",
        "name": "Eazybe",
        "description": "Integração CRM com WhatsApp | Eazybe - Plataforma de Vendas. Integração com HubSpot, Zoho, Salesforce, Google Sheets e mais.",
        "publisher": {
          "@id": "https://eazybe.com/br/#organization"
        },
        "inLanguage": "pt-BR",
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://eazybe.com/br/search?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      }

      // Add website schema to head
      let websiteScript = document.querySelector('script[type="application/ld+json"][data-schema="website-br"]')
      if (!websiteScript) {
        websiteScript = document.createElement('script')
        websiteScript.type = 'application/ld+json'
        websiteScript.setAttribute('data-schema', 'website-br')
        document.head.appendChild(websiteScript)
      }
      websiteScript.textContent = JSON.stringify(websiteSchema)

      // WebPage Schema for /br
      const webpageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": "https://eazybe.com/br/#webpage",
        "url": "https://eazybe.com/br",
        "name": "CRM integrado com WhatsApp | Plataforma de Vendas WhatsApp - Eazybe",
        "description": "Integração de CRM com WhatsApp para (HubSpot, Zoho, Salesforce, Sheets). Sincronize conversas com seu CRM, use respostas de IA e caixas de entrada compartilhadas.",
        "isPartOf": {
          "@id": "https://eazybe.com/br/#website"
        },
        "about": {
          "@id": "https://eazybe.com/br/#organization"
        },
        "publisher": {
          "@id": "https://eazybe.com/br/#organization"
        },
        "inLanguage": "pt-BR",
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": "https://eazybe.com/logo.png"
        },
        "datePublished": "2026-02-03T08:00:00+00:00",
        "dateModified": "2026-02-13T10:30:00+00:00",
        "breadcrumb": {
          "@id": "https://eazybe.com/br#breadcrumb"
        }
      }

      // Add webpage schema to head
      let webpageScript = document.querySelector('script[type="application/ld+json"][data-schema="webpage-br"]')
      if (!webpageScript) {
        webpageScript = document.createElement('script')
        webpageScript.type = 'application/ld+json'
        webpageScript.setAttribute('data-schema', 'webpage-br')
        document.head.appendChild(webpageScript)
      }
      webpageScript.textContent = JSON.stringify(webpageSchema)

      // SoftwareApplication Schema for /br
      const softwareApplicationSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "@id": "https://eazybe.com/br/#softwareapplication",
        "name": "Eazybe",
        "operatingSystem": "Web, Chrome Extension",
        "applicationCategory": "BusinessApplication",
        "applicationSubCategory": "CRM, Mensageria, Automação de WhatsApp",
        "image": ["https://eazybe.com/logo.png"],
        "description": "Eazybe é uma extensão para Chrome que transforma o WhatsApp Web em uma poderosa ferramenta de CRM. Integra-se ao HubSpot, Zoho, Salesforce e Google Sheets para ajudar equipes de vendas, marketing e suporte no Brasil a gerenciar conversas e dados de clientes com eficiência.",
        "softwareVersion": "latest",
        "url": "https://eazybe.com/br",
        "downloadUrl": "https://chrome.google.com/webstore/detail/clgficggccelgifppbcaepjdkklfcefd",
        "screenshot": "https://cdn.prod.website-files.com/64cb8fe9dae4f2e5a069eb37/687f71bf8e51d6931ee45917_hero_image_without_AI-p-1080.webp",
        "offers": {
          "@type": "AggregateOffer",
          "url": "https://eazybe.com/br",
          "priceCurrency": "BRL",
          "lowPrice": 92,
          "highPrice": 126,
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
          "@id": "https://eazybe.com/br/#organization"
        }
      }

      // Add software application schema to head
      let softwareAppScript = document.querySelector('script[type="application/ld+json"][data-schema="softwareapplication-br"]')
      if (!softwareAppScript) {
        softwareAppScript = document.createElement('script')
        softwareAppScript.type = 'application/ld+json'
        softwareAppScript.setAttribute('data-schema', 'softwareapplication-br')
        document.head.appendChild(softwareAppScript)
      }
      softwareAppScript.textContent = JSON.stringify(softwareApplicationSchema)

      // Product Schema for /br
      const productSchema = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": "Eazybe - CRM para WhatsApp",
        "image": "https://eazybe.com/logo.png",
        "description": "Eazybe é uma extensão de CRM para WhatsApp que transforma o WhatsApp Web em uma ferramenta de vendas. Integração nativa com HubSpot, Zoho, Salesforce e Google Sheets.",
        "brand": {
          "@type": "Brand",
          "name": "Eazybe"
        },
        "offers": {
          "@type": "AggregateOffer",
          "url": "https://eazybe.com/br/precos",
          "priceCurrency": "BRL",
          "lowPrice": 92,
          "highPrice": 126,
          "offerCount": 5,
          "availability": "https://schema.org/InStock"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": 4.9,
          "bestRating": 5,
          "worstRating": 1,
          "ratingCount": 53766
        }
      }

      // Add product schema to head
      let productScript = document.querySelector('script[type="application/ld+json"][data-schema="product-br"]')
      if (!productScript) {
        productScript = document.createElement('script')
        productScript.type = 'application/ld+json'
        productScript.setAttribute('data-schema', 'product-br')
        document.head.appendChild(productScript)
      }
      productScript.textContent = JSON.stringify(productSchema)
    }

    // Cleanup function - remove meta tags and schema when leaving /br homepage
    return () => {
      // Remove FAQ schema
      const faqScript = document.querySelector('script[type="application/ld+json"][data-schema="faq-br"]')
      if (faqScript) faqScript.remove()
      // Remove breadcrumb schema
      const breadcrumbScript = document.querySelector('script[type="application/ld+json"][data-schema="breadcrumb-br"]')
      if (breadcrumbScript) breadcrumbScript.remove()
      // Remove organization schema
      const orgScript = document.querySelector('script[type="application/ld+json"][data-schema="organization-br"]')
      if (orgScript) orgScript.remove()
      // Remove website schema
      const websiteScript = document.querySelector('script[type="application/ld+json"][data-schema="website-br"]')
      if (websiteScript) websiteScript.remove()
      // Remove webpage schema
      const webpageScript = document.querySelector('script[type="application/ld+json"][data-schema="webpage-br"]')
      if (webpageScript) webpageScript.remove()
      // Remove software application schema
      const softwareAppScript = document.querySelector('script[type="application/ld+json"][data-schema="softwareapplication-br"]')
      if (softwareAppScript) softwareAppScript.remove()
      // Remove product schema
      const productScript = document.querySelector('script[type="application/ld+json"][data-schema="product-br"]')
      if (productScript) productScript.remove()
      // Optionally reset title when leaving /br homepage
      // document.title = 'Eazybe'
    }
  }, [location.pathname])

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

      <main>
        {data?.sections
          ?.filter((section) => section._type !== 'securitySection' && section._type !== 'ctaSection')
          .map((section) => (
            <SectionRenderer key={section._key} section={section} />
          ))}
      </main>
      <Suspense fallback={<div className="h-96" />}>
        <ChunkyFooter />
      </Suspense>
    </div>
  )
}

export default HomePage
