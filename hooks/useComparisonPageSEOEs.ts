import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Comparison Page SEO - /es/comparison
 * Adds comprehensive meta tags for the Eazybe comparison page (Spanish)
 * Ensures the page is crawlable for all bots for better indexing and ranking
 */
export const useComparisonPageSEOEs = () => {
  const location = useLocation()

  useEffect(() => {
    // Check if we're on the Spanish comparison page
    const isComparisonPage = location.pathname === '/es/comparison'

    if (isComparisonPage) {
      // ==================== META TAGS ====================

      // Document title
      document.title = 'Comparación'

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

      // Basic meta tags
      setMetaTag('description', 'Descubre todo el potencial de WhatsApp Web con Eazybe. Compara Eazybe con otras herramientas de CRM para WhatsApp en funciones, soporte, precios y más.')
      setMetaTag('keywords', 'comparación Eazybe, Eazybe vs otras herramientas, comparación CRM para WhatsApp, comparación herramientas de automatización de WhatsApp, herramientas de productividad WhatsApp Web, alternativas a CRM para WhatsApp')
      setMetaTag('author', 'Eazybe')
      setMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
      setMetaTag('googlebot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
      setMetaTag('bingbot', 'index, follow')
      setMetaTag('thumbnail', 'https://eazybe.com/logo.png')

      // Open Graph tags
      setMetaTag('og:type', 'website', true)
      setMetaTag('og:url', 'https://eazybe.com/es/comparison', true)
      setMetaTag('og:title', 'Comparación', true)
      setMetaTag('og:description', 'Descubre todo el potencial de WhatsApp Web con Eazybe. Compara Eazybe con otras herramientas de CRM para WhatsApp en funciones, soporte, precios y más.', true)
      setMetaTag('og:image', 'https://eazybe.com/logo.png', true)
      setMetaTag('og:image:width', '1200', true)
      setMetaTag('og:image:height', '630', true)
      setMetaTag('og:image:alt', 'Comparación de Eazybe con otras herramientas de CRM para WhatsApp', true)
      setMetaTag('og:locale', 'es_ES', true)
      setMetaTag('og:site_name', 'Eazybe', true)

      // Twitter Card tags
      setMetaTag('twitter:card', 'summary_large_image', true)
      setMetaTag('twitter:site', '@eazybe', true)
      setMetaTag('twitter:creator', '@eazybe', true)
      setMetaTag('twitter:title', 'Comparación', true)
      setMetaTag('twitter:description', 'Descubre todo el potencial de WhatsApp Web con Eazybe. Compara Eazybe con otras herramientas por funciones, soporte, precios y productividad.', true)
      setMetaTag('twitter:image', 'https://eazybe.com/logo.png', true)
      setMetaTag('twitter:image:alt', 'Comparación de CRM para WhatsApp con Eazybe', true)
      setMetaTag('twitter:label1', 'Tipo de contenido', true)
      setMetaTag('twitter:data1', 'Guía de comparación', true)
      setMetaTag('twitter:label2', 'Plataforma', true)
      setMetaTag('twitter:data2', 'Herramientas CRM para WhatsApp', true)

      // Mobile web app tags
      setMetaTag('mobile-web-app-capable', 'yes')
      setMetaTag('apple-mobile-web-app-capable', 'yes')
      setMetaTag('apple-mobile-web-app-status-bar-style', 'default')
      setMetaTag('apple-mobile-web-app-title', 'Eazybe')

      // AI and SEO specific meta tags
      setMetaTag('answer-type', 'comparación, guía, comparación de funciones')
      setMetaTag('target-audience', 'equipos de ventas, líderes de soporte, gerentes CX, fundadores SaaS, equipos de operaciones')
      setMetaTag('content-intent', 'informacional, investigación-comercial')
      setMetaTag('conversational-query', 'Eazybe vs alternativas, comparación CRM para WhatsApp, mejores herramientas de productividad para WhatsApp, comparación de CRM para WhatsApp')
      setMetaTag('ai-readability', 'profesional, enfocado en comparación')
      setMetaTag('context-window', 'productividad en WhatsApp Web, integración CRM, bandeja de entrada compartida, respuestas con IA, automatización de ventas')
      setMetaTag('user-problem', 'encontrar la mejor herramienta de productividad e integración CRM para WhatsApp')
      setMetaTag('solution-summary', 'comparar Eazybe con otras herramientas de productividad y CRM para WhatsApp')
      setMetaTag('primary-benefit', 'elegir la mejor herramienta CRM y de automatización para WhatsApp más rápido')
      setMetaTag('use-case', 'equipos que comparan herramientas CRM para WhatsApp antes de adoptarlas')
      setMetaTag('implementation-difficulty', 'configuración fácil')
      setMetaTag('time-to-value', 'mejoras inmediatas en productividad')

      // Link tags
      setLinkTag('canonical', 'https://eazybe.com/es/comparison')

      // ==================== JSON-LD SCHEMAS ====================

      // Helper function to add JSON-LD schema
      const addJsonLdSchema = (schema: Record<string, unknown>, id: string) => {
        let script = document.querySelector(`script[type="application/ld+json"][data-schema="${id}"]`)
        if (!script) {
          script = document.createElement('script')
          script.type = 'application/ld+json'
          ;(script as HTMLScriptElement).setAttribute('data-schema', id)
          document.head.appendChild(script)
        }
        script.textContent = JSON.stringify(schema)
      }

      // WebPage Schema
      const webpageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "url": "https://eazybe.com/es/comparison",
        "name": "Comparación | Eazybe",
        "description": "Descubre todo el potencial de WhatsApp Web con las funciones de productividad de Eazybe. Compara Eazybe con otras herramientas de CRM para WhatsApp en funciones, soporte, precios y más.",
        "inLanguage": "es-ES",
        "isPartOf": {
          "@type": "WebSite",
          "url": "https://eazybe.com/es",
          "name": "Eazybe"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Eazybe",
          "url": "https://eazybe.com/es",
          "logo": {
            "@type": "ImageObject",
            "url": "https://eazybe.com/logo.png",
            "width": 600,
            "height": 60
          }
        },
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": "https://eazybe.com/logo.png",
          "width": 1200,
          "height": 630
        },
        "about": [
          { "@type": "Thing", "name": "comparación de CRM para WhatsApp" },
          { "@type": "Thing", "name": "herramientas de automatización de WhatsApp" },
          { "@type": "Thing", "name": "productividad en WhatsApp Web" },
          { "@type": "Thing", "name": "bandeja de entrada compartida para equipos" },
          { "@type": "Thing", "name": "respuestas con IA en WhatsApp" }
        ]
      }

      // Organization Schema
      const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Eazybe",
        "url": "https://eazybe.com/es",
        "logo": { "@type": "ImageObject", "url": "https://eazybe.com/logo.png", "width": 600, "height": 60 },
        "image": "https://eazybe.com/logo.png",
        "description": "Eazybe ayuda a los equipos de ventas a conectar WhatsApp con CRM para sincronizar conversaciones, automatizar seguimientos y mejorar la comunicación con los clientes.",
        "foundingDate": "2021",
        "sameAs": ["https://twitter.com/eazybe", "https://linkedin.com/company/eazybe", "https://youtube.com/@eazybe"],
        "publishingPrinciples": "https://eazybe.com/es/comparison",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "8, The Green STE B",
          "addressLocality": "Dover",
          "addressRegion": "Delaware",
          "postalCode": "19901",
          "addressCountry": "US"
        },
        "knowsAbout": ["CRM para WhatsApp", "integración con CRM", "automatización de ventas", "bandeja de entrada compartida", "productividad en WhatsApp"]
      }

      // ItemList Schema (Integrations)
      const integrationsSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Integraciones de Eazybe",
        "description": "Integraciones de WhatsApp compatibles con Eazybe.",
        "itemListOrder": "https://schema.org/ItemListUnordered",
        "numberOfItems": 11,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "item": {
              "@type": "SoftwareApplication",
              "name": "Integración HubSpot WhatsApp",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web, Extensión Chrome",
              "url": "https://eazybe.com/es/hubspot-whatsapp-integration"
            }
          },
          {
            "@type": "ListItem",
            "position": 2,
            "item": {
              "@type": "SoftwareApplication",
              "name": "Integración Salesforce WhatsApp",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web, Extensión Chrome",
              "url": "https://eazybe.com/es/salesforce-whatsapp-integration"
            }
          },
          {
            "@type": "ListItem",
            "position": 3,
            "item": {
              "@type": "SoftwareApplication",
              "name": "Integración Zoho WhatsApp",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web, Extensión Chrome",
              "url": "https://eazybe.com/es/zoho-whatsapp-integration"
            }
          },
          {
            "@type": "ListItem",
            "position": 4,
            "item": {
              "@type": "SoftwareApplication",
              "name": "Integración Bitrix24 WhatsApp",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web, Extensión Chrome",
              "url": "https://eazybe.com/es/bitrix24-whatsapp-integration"
            }
          },
          {
            "@type": "ListItem",
            "position": 5,
            "item": {
              "@type": "SoftwareApplication",
              "name": "Integración LeadSquared WhatsApp",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web, Extensión Chrome",
              "url": "https://eazybe.com/es/leadsquared-whatsapp-integration"
            }
          },
          {
            "@type": "ListItem",
            "position": 6,
            "item": {
              "@type": "SoftwareApplication",
              "name": "Integración Freshdesk WhatsApp",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web, Extensión Chrome",
              "url": "https://eazybe.com/es/freshdesk-whatsapp-integration"
            }
          },
          {
            "@type": "ListItem",
            "position": 7,
            "item": {
              "@type": "SoftwareApplication",
              "name": "Integración Google Sheets WhatsApp",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web, Extensión Chrome",
              "url": "https://eazybe.com/es/google-sheets-whatsapp-integration"
            }
          },
          {
            "@type": "ListItem",
            "position": 8,
            "item": {
              "@type": "SoftwareApplication",
              "name": "Integraciones Webhooks y personalizadas",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web, Extensión Chrome",
              "url": "https://eazybe.com/es/webhooks-whatsapp-integration"
            }
          },
          {
            "@type": "ListItem",
            "position": 9,
            "item": {
              "@type": "SoftwareApplication",
              "name": "Integración Pipedrive WhatsApp",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web, Extensión Chrome",
              "url": "https://eazybe.com/es/pipedrive-whatsapp-integration"
            }
          },
          {
            "@type": "ListItem",
            "position": 10,
            "item": {
              "@type": "SoftwareApplication",
              "name": "Integración Monday WhatsApp",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web, Extensión Chrome",
              "url": "https://eazybe.com/es/monday-whatsapp-integration"
            }
          },
          {
            "@type": "ListItem",
            "position": 11,
            "item": {
              "@type": "SoftwareApplication",
              "name": "Integración Google Calendar WhatsApp",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web, Extensión Chrome",
              "url": "https://eazybe.com/es/google-calendar-whatsapp-integration"
            }
          }
        ]
      }

      // BreadcrumbList Schema
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Eazybe", "item": "https://eazybe.com/es" },
          { "@type": "ListItem", "position": 2, "name": "Comparación", "item": "https://eazybe.com/es/comparison" }
        ]
      }

      // WebSite Schema
      const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "url": "https://eazybe.com/es",
        "name": "Eazybe",
        "description": "Eazybe permite a los equipos integrar WhatsApp con CRM y herramientas empresariales para sincronizar chats, automatizar flujos de trabajo y mejorar la productividad de ventas.",
        "inLanguage": "es-ES",
        "publisher": {
          "@type": "Organization",
          "name": "Eazybe",
          "url": "https://eazybe.com/es",
          "logo": { "@type": "ImageObject", "url": "https://eazybe.com/logo.png", "width": 600, "height": 60 }
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": { "@type": "EntryPoint", "urlTemplate": "https://eazybe.com/es/search?q={search_term_string}" },
          "query-input": "required name=search_term_string"
        }
      }

      // FAQPage Schema
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "inLanguage": "es-ES",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "¿Cómo se compara Eazybe con otros CRM de WhatsApp?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Eazybe supera a más de 20 plataformas de CRM para WhatsApp, incluyendo Wati, Interakt, QuickReply, Cooby, Timelines y Rasayel. Ofrecemos hasta un 70% de ahorro en costos, funciones exclusivas de IA como WhatsApp Web Copilot y Revenue Inbox, más integraciones de CRM incluyendo Salesforce y funciones únicas como WhatsApp Chat Backup."
            }
          },
          {
            "@type": "Question",
            "name": "¿Por qué Eazybe es más económico que otros competidores?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Eazybe comienza desde solo $13 al mes mientras que muchos competidores cobran entre $25 y $49 al mes. Creemos que un CRM potente para WhatsApp debe ser accesible para todas las empresas. Gracias a nuestras operaciones eficientes y a una base de más de 50.000 usuarios, podemos ofrecer funciones premium a un costo mucho menor."
            }
          },
          {
            "@type": "Question",
            "name": "¿Qué funciones exclusivas ofrece Eazybe?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Eazybe ofrece funciones exclusivas que no encontrarás en otras plataformas, como WhatsApp Chat Backup, integración con Salesforce, WhatsApp Web Copilot, Revenue Inbox, RevOps Agent, AI Unreplied Chats Agent e integración con Bitrix24. Estas funciones no están disponibles en herramientas como Wati, Interakt, QuickReply, Cooby, Timelines o Rasayel."
            }
          },
          {
            "@type": "Question",
            "name": "¿Eazybe es adecuado para equipos empresariales?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "¡Por supuesto! Eazybe está diseñado para empresas de todos los tamaños. Nuestro plan Omnis incluye APIs dedicadas, sincronización ilimitada de mensajes, Revenue Inbox, RevOps Agent y un gestor de cuenta dedicado para equipos empresariales. Eazybe escala junto con las necesidades de tu negocio."
            }
          },
          {
            "@type": "Question",
            "name": "¿Puedo migrar desde otra plataforma?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "¡Sí! Facilitamos la migración desde cualquier CRM de WhatsApp. Puedes importar tus contactos, mensajes y flujos de trabajo existentes. Nuestro equipo ofrece soporte de migración gratuito para planes anuales y garantiza una transición sencilla desde Wati, Interakt, QuickReply, Cooby u otras plataformas."
            }
          },
          {
            "@type": "Question",
            "name": "¿Qué integraciones admite Eazybe?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Eazybe se integra con más de 10 plataformas, incluyendo HubSpot, Salesforce, Zoho CRM, Bitrix24, Google Sheets, Pipedrive, Monday.com, LeadSquared, Freshdesk, Google Calendar y webhooks personalizados para conectarse con cualquier otra plataforma."
            }
          },
          {
            "@type": "Question",
            "name": "¿Hay una prueba gratuita?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "¡Sí! Ofrecemos una prueba gratuita de 7 días en todos los planes sin necesidad de tarjeta de crédito. Puedes explorar todas las funciones, probar integraciones y ver cómo Eazybe se adapta a tu flujo de trabajo antes de suscribirte."
            }
          }
        ]
      }

      // Add all schemas to head
      addJsonLdSchema(webpageSchema, 'webpage-comparison-es')
      addJsonLdSchema(organizationSchema, 'organization-comparison-es')
      addJsonLdSchema(integrationsSchema, 'integrations-comparison-es')
      addJsonLdSchema(breadcrumbSchema, 'breadcrumb-comparison-es')
      addJsonLdSchema(websiteSchema, 'website-comparison-es')
      addJsonLdSchema(faqSchema, 'faq-comparison-es')

      console.log('✅ Spanish Comparison Page: SEO meta tags and JSON-LD schemas added/updated')

      // Cleanup function - remove schemas when leaving the page
      return () => {
        const schemaIds = ['webpage-comparison-es', 'organization-comparison-es', 'integrations-comparison-es', 'breadcrumb-comparison-es', 'website-comparison-es', 'faq-comparison-es']
        schemaIds.forEach(id => {
          const script = document.querySelector(`script[type="application/ld+json"][data-schema="${id}"]`)
          if (script) script.remove()
        })
        console.log('🧹 Spanish Comparison Page: JSON-LD schemas removed')
      }
    }
  }, [location.pathname])
}
