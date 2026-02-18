import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Spanish Homepage SEO - /es
 * Adds meta tags and JSON-LD schemas for the Spanish homepage
 * All schemas are crawlable by bots (no @id for SEO)
 */

export const useSpanishHomepageSEO = () => {
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/es') {
      // ==================== META TAGS ====================

      // Document title
      document.title = 'Integración WhatsApp CRM | Plataforma de ventas WA - Eazybe'

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
      setMetaTag('description', 'Integra WhatsApp con tu CRM y no pierdas clientes. Sincroniza chats, automatiza seguimientos y usa IA para gestionar ventas en un solo lugar.')
      setMetaTag('keywords', 'CRM WhatsApp, integración CRM WhatsApp, CRM con WhatsApp, integración WhatsApp CRM, extensión WhatsApp Web CRM, CRM para ventas, productividad WhatsApp, plataforma de ventas WhatsApp')
      setMetaTag('author', 'Eazybe')
      setMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
      setMetaTag('googlebot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
      setMetaTag('bingbot', 'index, follow')
      setMetaTag('thumbnail', 'https://eazybe.com/logo.png')

      // Article meta tags
      setMetaTag('article:published_time', '2026-02-03T08:00:00+00:00', true)
      setMetaTag('article:modified_time', '2026-02-03T10:30:00+00:00', true)
      setMetaTag('article:section', 'Tecnología', true)
      setMetaTag('article:tag', 'Integración CRM con WhatsApp', true)

      // Open Graph tags
      setMetaTag('og:type', 'website', true)
      setMetaTag('og:url', 'https://eazybe.com/es', true)
      setMetaTag('og:title', 'CRM con WhatsApp para ventas y equipos | Eazybe', true)
      setMetaTag('og:description', 'Convierte WhatsApp en tu CRM de ventas. Sincroniza chats, automatiza seguimientos y gestiona clientes con IA y bandeja compartida.', true)
      setMetaTag('og:image', 'https://eazybe.com/logo.png', true)
      setMetaTag('og:image:width', '1200', true)
      setMetaTag('og:image:height', '630', true)
      setMetaTag('og:image:alt', 'Eazybe – Plataforma de ventas por WhatsApp para equipos CRM', true)
      setMetaTag('og:locale', 'es_ES', true)
      setMetaTag('og:site_name', 'Eazybe', true)

      // Twitter Card tags
      setMetaTag('twitter:card', 'summary_large_image', true)
      setMetaTag('twitter:site', '@eazybe', true)
      setMetaTag('twitter:creator', '@eazybe', true)
      setMetaTag('twitter:title', 'CRM de WhatsApp y extensión de productividad para ventas - Eazybe', true)
      setMetaTag('twitter:description', 'Sincroniza WhatsApp con tu CRM, automatiza mensajes y gestiona clientes en un solo lugar con IA y bandeja compartida.', true)
      setMetaTag('twitter:image', 'https://eazybe.com/logo.png', true)
      setMetaTag('twitter:image:alt', 'Extensión de integración CRM con WhatsApp de Eazybe', true)
      setMetaTag('twitter:label1', 'Valoración', true)
      setMetaTag('twitter:data1', '4.7/5', true)
      setMetaTag('twitter:label2', 'Precio', true)
      setMetaTag('twitter:data2', 'Gratis', true)

      // Mobile web app tags
      setMetaTag('mobile-web-app-capable', 'yes')
      setMetaTag('apple-mobile-web-app-capable', 'yes')
      setMetaTag('apple-mobile-web-app-status-bar-style', 'default')
      setMetaTag('apple-mobile-web-app-title', 'Eazybe')

      // AI and SEO specific meta tags
      setMetaTag('answer-type', 'guía, información-del-producto, comparación-de-funciones')
      setMetaTag('target-audience', 'equipos de ventas, dueños de negocios, gestores de CRM, profesionales B2B')
      setMetaTag('content-intent', 'informativo, investigación-comercial, transaccional')
      setMetaTag('conversational-query', 'cómo gestionar leads de WhatsApp en CRM, mejor integración CRM con WhatsApp')
      setMetaTag('ai-readability', 'conversacional, profesional, orientado-a-soluciones')
      setMetaTag('context-window', 'automatización de ventas, comunicación con clientes, seguimiento de leads, integración CRM, mensajería empresarial')
      setMetaTag('user-problem', 'pérdida de leads en WhatsApp, seguimientos olvidados, flujo de ventas desconectado')
      setMetaTag('solution-summary', 'sincronización automática de WhatsApp con el CRM')
      setMetaTag('primary-benefit', 'nunca pierdas un lead ni un seguimiento')
      setMetaTag('use-case', 'equipos de ventas gestionando conversaciones de clientes entre WhatsApp y el CRM')
      setMetaTag('implementation-difficulty', 'fácil, instalación en un clic')
      setMetaTag('time-to-value', 'inmediato, sincronización instantánea')

      // Link tags
      setLinkTag('preconnect', 'https://fonts.googleapis.com')
      setLinkTag('dns-prefetch', 'https://fonts.googleapis.com')

      // ==================== JSON-LD SCHEMAS ====================

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
        "inLanguage": "es-ES",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "¿Qué es Eazybe?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Eazybe es una plataforma de CRM y ventas para WhatsApp que ayuda a las empresas a gestionar conversaciones con clientes, automatizar respuestas, medir ingresos e integrar WhatsApp con CRMs populares como HubSpot, Salesforce y más."
            }
          },
          {
            "@type": "Question",
            "name": "¿Qué es la coexistencia de la API de WhatsApp?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "La coexistencia te permite usar WhatsApp Web y la API de WhatsApp al mismo tiempo. Esto significa que puedes mantener conversaciones manuales mientras automatizas envíos masivos y plantillas mediante la API."
            }
          },
          {
            "@type": "Question",
            "name": "¿Qué integraciones admite Eazybe?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Eazybe se integra con HubSpot, Salesforce, Zoho CRM, Bitrix24, LeadSquared, Freshdesk, Google Sheets y webhooks personalizados. Estamos añadiendo nuevas integraciones continuamente."
            }
          },
          {
            "@type": "Question",
            "name": "¿Eazybe es seguro de usar?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sí. Eazybe es Meta Business Partner y cumple con LGPD/GDPR. Usamos cifrado de nivel bancario para proteger tus datos y nunca almacenamos tus credenciales de WhatsApp en nuestros servidores."
            }
          },
          {
            "@type": "Question",
            "name": "¿Cómo funciona la prueba gratuita?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Puedes empezar con una prueba gratuita de 14 días sin tarjeta de crédito. Al finalizar la prueba, puedes elegir un plan que se adapte a tus necesidades, desde usuarios individuales hasta equipos empresariales."
            }
          },
          {
            "@type": "Question",
            "name": "¿Puedo usar Eazybe para colaborar en equipo?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sí. Eazybe incluye una bandeja de entrada compartida para equipos, plantillas de respuestas rápidas, programador de mensajes y WhatsApp Copilot para que todo el equipo trabaje de forma más eficiente."
            }
          },
          {
            "@type": "Question",
            "name": "¿Cómo funciona la Bandeja de ingresos (Revenue Inbox)?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "La Bandeja de ingresos rastrea y atribuye ingresos a conversaciones específicas de WhatsApp, mostrando qué mensajes generan ventas y ayudando a tu equipo a priorizar leads de alto valor."
            }
          }
        ]
      }

      // Organization Schema (without @id)
      const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Eazybe",
        "url": "https://eazybe.com/es",
        "logo": {
          "@type": "ImageObject",
          "url": "https://eazybe.com/logo.png",
          "width": 600,
          "height": 60
        },
        "image": "https://eazybe.com/logo.png",
        "description": "Eazybe es una plataforma de integración CRM para WhatsApp que ayuda a los equipos de ventas a sincronizar conversaciones, programar mensajes y aumentar el engagement de clientes directamente en WhatsApp Web.",
        "foundingDate": "2021",
        "sameAs": [
          "https://twitter.com/eazybe",
          "https://linkedin.com/company/eazybe",
          "https://youtube.com/@eazybe"
        ],
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "contactType": "atención al cliente",
            "email": "support@eazybe.com",
            "url": "https://eazybe.com/es",
            "areaServed": "ES",
            "availableLanguage": ["Spanish"]
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
        "knowsAbout": ["CRM de WhatsApp", "Automatización de ventas", "Integración CRM", "Agentes de IA para CRM", "Engagement de clientes"]
      }

      // BreadcrumbList Schema (without @id)
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Eazybe",
            "item": "https://eazybe.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "ES",
            "item": "https://eazybe.com/es"
          }
        ]
      }

      // WebSite Schema (publisher uses inline Organization, no @id reference)
      const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "url": "https://eazybe.com/es",
        "name": "Eazybe",
        "description": "Integración CRM con WhatsApp | Eazybe - Plataforma de ventas. Integración con HubSpot, Zoho, Salesforce, Google Sheets y más.",
        "publisher": {
          "@type": "Organization",
          "name": "Eazybe"
        },
        "inLanguage": "es-ES",
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://eazybe.com/es/search?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      }

      // SoftwareApplication Schema
      const softwareApplicationSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Eazybe",
        "operatingSystem": "Web, Extensión de Chrome",
        "applicationCategory": "BusinessApplication",
        "applicationSubCategory": "CRM, Mensajería, Automatización de WhatsApp",
        "image": ["https://eazybe.com/logo.png"],
        "description": "Eazybe es una extensión de Chrome que convierte WhatsApp Web en una potente herramienta de CRM. Se integra con HubSpot, Zoho, Salesforce y Google Sheets para ayudar a equipos de ventas, marketing y soporte a gestionar conversaciones y datos de clientes con eficiencia.",
        "softwareVersion": "latest",
        "url": "https://eazybe.com/es",
        "downloadUrl": "https://chrome.google.com/webstore/detail/clgficggccelgifppbcaepjdkklfcefd",
        "screenshot": "https://cdn.prod.website-files.com/64cb8fe9dae4f2e5a069eb37/687f71bf8e51d6931ee45917_hero_image_without_AI-p-1080.webp",
        "offers": {
          "@type": "AggregateOffer",
          "url": "https://eazybe.com/es/precios",
          "priceCurrency": "EUR",
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
          "@type": "Organization",
          "name": "Eazybe"
        },
        "inLanguage": "es-ES"
      }

      // Product Schema
      const productSchema = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": "Eazybe - CRM para WhatsApp",
        "image": "https://eazybe.com/logo.png",
        "description": "Eazybe es una extensión de CRM para WhatsApp que convierte WhatsApp Web en una herramienta de ventas. Integración nativa con HubSpot, Zoho, Salesforce y Google Sheets.",
        "brand": {
          "@type": "Brand",
          "name": "Eazybe"
        },
        "offers": {
          "@type": "AggregateOffer",
          "url": "https://eazybe.com/es/precios",
          "priceCurrency": "EUR",
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

      // HowTo Schema
      const howToSchema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "Cómo configurar Eazybe para sincronizar WhatsApp con tu CRM",
        "description": "Sigue esta guía paso a paso para instalar la extensión de Eazybe y conectar tus conversaciones de WhatsApp con HubSpot, Zoho o Salesforce en minutos.",
        "totalTime": "PT5M",
        "estimatedCost": {
          "@type": "MonetaryAmount",
          "currency": "EUR",
          "value": "0"
        },
        "supply": [
          {
            "@type": "HowToSupply",
            "name": "Cuenta activa en un CRM (HubSpot, Zoho o Salesforce)"
          }
        ],
        "tool": [
          {
            "@type": "HowToTool",
            "name": "Navegador Google Chrome"
          },
          {
            "@type": "HowToTool",
            "name": "Extensión Eazybe"
          }
        ],
        "step": [
          {
            "@type": "HowToStep",
            "url": "https://eazybe.com/es#step1",
            "name": "Instala la extensión",
            "text": "Ve a Chrome Web Store e instala la extensión oficial de Eazybe en tu navegador.",
            "image": "https://eazybe.com/logo.png"
          },
          {
            "@type": "HowToStep",
            "url": "https://eazybe.com/es#step2",
            "name": "Conecta tu WhatsApp",
            "text": "Abre WhatsApp Web en tu ordenador. El panel de Eazybe aparecerá automáticamente en el lado derecho.",
            "image": "https://eazybe.com/logo.png"
          },
          {
            "@type": "HowToStep",
            "url": "https://eazybe.com/es#step3",
            "name": "Vincula tu CRM",
            "text": "Haz clic en el icono de configuración del panel de Eazybe y elige tu CRM (por ejemplo, HubSpot). Sigue las instrucciones de inicio de sesión para autorizar la conexión.",
            "image": "https://eazybe.com/logo.png"
          },
          {
            "@type": "HowToStep",
            "url": "https://eazybe.com/es#step4",
            "name": "Inicia la sincronización",
            "text": "Selecciona un contacto o conversación y activa la sincronización automática. A partir de ahora, los mensajes y datos se guardarán directamente en tu CRM.",
            "image": "https://eazybe.com/logo.png"
          }
        ],
        "inLanguage": "es-ES"
      }

      // ProfessionalService Schema
      const professionalServiceSchema = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "Eazybe",
        "url": "https://eazybe.com/es",
        "image": ["https://eazybe.com/logo.png"],
        "logo": "https://eazybe.com/logo.png",
        "telephone": "+13099294280",
        "priceRange": "Desde $92/mes",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday"
            ],
            "opens": "00:00",
            "closes": "23:59"
          }
        ]
      }

      // Add all schemas to head
      addJsonLdSchema(faqSchema, 'faq-es')
      addJsonLdSchema(organizationSchema, 'organization-es')
      addJsonLdSchema(breadcrumbSchema, 'breadcrumb-es')
      addJsonLdSchema(websiteSchema, 'website-es')
      addJsonLdSchema(softwareApplicationSchema, 'softwareapplication-es')
      addJsonLdSchema(productSchema, 'product-es')
      addJsonLdSchema(howToSchema, 'howto-es')
      addJsonLdSchema(professionalServiceSchema, 'professionalservice-es')

      // Cleanup function - remove meta tags and schema when leaving /es homepage
      return () => {
        // Remove FAQ schema
        const faqScript = document.querySelector('script[type="application/ld+json"][data-schema="faq-es"]')
        if (faqScript) faqScript.remove()
        // Remove breadcrumb schema
        const breadcrumbScript = document.querySelector('script[type="application/ld+json"][data-schema="breadcrumb-es"]')
        if (breadcrumbScript) breadcrumbScript.remove()
        // Remove organization schema
        const orgScript = document.querySelector('script[type="application/ld+json"][data-schema="organization-es"]')
        if (orgScript) orgScript.remove()
        // Remove website schema
        const websiteScript = document.querySelector('script[type="application/ld+json"][data-schema="website-es"]')
        if (websiteScript) websiteScript.remove()
        // Remove software application schema
        const softwareAppScript = document.querySelector('script[type="application/ld+json"][data-schema="softwareapplication-es"]')
        if (softwareAppScript) softwareAppScript.remove()
        // Remove product schema
        const productScript = document.querySelector('script[type="application/ld+json"][data-schema="product-es"]')
        if (productScript) productScript.remove()
        // Remove how-to schema
        const howToScript = document.querySelector('script[type="application/ld+json"][data-schema="howto-es"]')
        if (howToScript) howToScript.remove()
        // Remove professional service schema
        const professionalServiceScript = document.querySelector('script[type="application/ld+json"][data-schema="professionalservice-es"]')
        if (professionalServiceScript) professionalServiceScript.remove()
      }
    }
  }, [location.pathname])
}
