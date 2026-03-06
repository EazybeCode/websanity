import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Google Sheets Integration Page SEO (ES) - /es/google-sheets-whatsapp-integration
 * Adds meta tags and JSON-LD schemas for the Google Sheets WhatsApp Integration page (Spanish)
 * All schemas are crawlable by bots (no @id for SEO)
 */

export const useGoogleSheetsIntegrationSEOEs = () => {
  const location = useLocation()

  useEffect(() => {
    // Check if we're on the ES Google Sheets integration page
    const isGoogleSheetsEsPage = location.pathname === '/es/google-sheets-whatsapp-integration'

    if (isGoogleSheetsEsPage) {
      // ==================== META TAGS ====================

      // Document title
      document.title = 'Integración de Hojas de Cálculo de Google y WhatsApp | Eazybe'

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
      setMetaTag('description', 'Conecta WhatsApp con Google Sheets. Sincroniza chats automáticamente, usa agentes de IA, rastrea oportunidades y gestiona conversaciones de ventas directamente en Sheets.')
      setMetaTag('keywords', 'integración WhatsApp Google Sheets, WhatsApp CRM Google Sheets, sincronizar WhatsApp con Google Sheets, automatización WhatsApp Google Sheets, CRM WhatsApp Google Sheets, agentes IA WhatsApp Google Sheets')
      setMetaTag('author', 'Eazybe')
      setMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
      setMetaTag('googlebot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
      setMetaTag('bingbot', 'index, follow')
      setMetaTag('thumbnail', 'https://eazybe.com/logo.png')

      // Article meta tags
      setMetaTag('article:published_time', '2026-02-03T08:00:00+00:00', true)
      setMetaTag('article:modified_time', '2026-02-03T10:30:00+00:00', true)
      setMetaTag('article:section', 'Tecnología', true)
      setMetaTag('article:tag', 'Integración WhatsApp Google Sheets', true)

      // Open Graph tags
      setMetaTag('og:type', 'website', true)
      setMetaTag('og:url', 'https://eazybe.com/es/google-sheets-whatsapp-integration', true)
      setMetaTag('og:title', 'Integración WhatsApp con Google Sheets | Eazybe', true)
      setMetaTag('og:description', 'Sincroniza WhatsApp con Google Sheets automáticamente. Gestiona conversaciones, usa IA y controla oportunidades de venta directamente desde Sheets.', true)
      setMetaTag('og:image', 'https://eazybe.com/logo.png', true)
      setMetaTag('og:image:width', '1200', true)
      setMetaTag('og:image:height', '630', true)
      setMetaTag('og:image:alt', 'Integración WhatsApp con Google Sheets - Eazybe', true)
      setMetaTag('og:locale', 'es_ES', true)
      setMetaTag('og:site_name', 'Eazybe', true)

      // Twitter Card tags
      setMetaTag('twitter:card', 'summary_large_image', true)
      setMetaTag('twitter:site', '@eazybe', true)
      setMetaTag('twitter:creator', '@eazybe', true)
      setMetaTag('twitter:title', 'Integración WhatsApp con Google Sheets | Eazybe', true)
      setMetaTag('twitter:description', 'Conecta WhatsApp con Google Sheets y sincroniza chats automáticamente. Usa IA para gestionar clientes y mejorar tu flujo de ventas.', true)
      setMetaTag('twitter:image', 'https://eazybe.com/logo.png', true)
      setMetaTag('twitter:image:alt', 'Integración CRM WhatsApp Google Sheets por Eazybe', true)
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
      setMetaTag('answer-type', 'guía, información de producto, comparación de funciones')
      setMetaTag('target-audience', 'usuarios de Google Sheets, equipos de ventas, gestores CRM, equipos de automatización, empresas B2B')
      setMetaTag('content-intent', 'investigación comercial, transaccional')
      setMetaTag('conversational-query', 'cómo conectar WhatsApp con Google Sheets, mejor integración WhatsApp Google Sheets, sincronizar WhatsApp con Google Sheets CRM')
      setMetaTag('ai-readability', 'conversacional, profesional, orientado a soluciones')
      setMetaTag('context-window', 'automatización Google Sheets, sincronización CRM WhatsApp, seguimiento de oportunidades, gestión de pipeline, WhatsApp dentro de Google Sheets')
      setMetaTag('user-problem', 'WhatsApp no conectado a Google Sheets, leads perdidos de WhatsApp, actualizaciones manuales del CRM')
      setMetaTag('solution-summary', 'sincronización automática entre WhatsApp y Google Sheets con automatización mediante IA')
      setMetaTag('primary-benefit', 'gestionar conversaciones de WhatsApp directamente en Google Sheets')
      setMetaTag('use-case', 'equipos de ventas sincronizando conversaciones de WhatsApp con Google Sheets automáticamente')
      setMetaTag('implementation-difficulty', 'fácil, integración con un clic')
      setMetaTag('time-to-value', 'instantáneo, sincronización de WhatsApp en tiempo real')

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
        "mainEntity": [
          {
            "@type": "Question",
            "name": "¿Cómo conecto WhatsApp con Google Sheets?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Instala Eazybe y conecta tu cuenta de Google. Eazybe sincroniza los chats de WhatsApp con Google Sheets para que las conversaciones y el contexto del cliente permanezcan organizados en tus hojas de cálculo."
            }
          },
          {
            "@type": "Question",
            "name": "¿Eazybe sincroniza mensajes de WhatsApp en Google Sheets automáticamente?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sí. Eazybe puede sincronizar conversaciones de WhatsApp con Google Sheets automáticamente, reduciendo el copiar/pegar manual y manteniendo la actividad de ventas actualizada."
            }
          },
          {
            "@type": "Question",
            "name": "¿Varios compañeros pueden usar una bandeja de entrada compartida con Google Sheets + WhatsApp?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sí. Eazybe soporta flujos de trabajo de bandeja de entrada compartida para que los equipos puedan colaborar en leads de WhatsApp manteniendo los registros de Google Sheets alineados."
            }
          },
          {
            "@type": "Question",
            "name": "¿Qué pueden hacer los agentes de IA para conversaciones de Google Sheets + WhatsApp?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "La IA puede ayudar a redactar respuestas, resumir conversaciones y acelerar seguimientos—para que los representantes respondan más rápido manteniendo una mensajería consistente."
            }
          },
          {
            "@type": "Question",
            "name": "¿Es segura esta integración para usar con WhatsApp y Google Sheets?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Eazybe está diseñado para casos de uso empresarial y se enfoca en flujos de trabajo seguros para sincronizar conversaciones de WhatsApp con Google Sheets. Siempre revisa tus requisitos de seguridad y cumplimiento antes del implementación."
            }
          },
          {
            "@type": "Question",
            "name": "¿Qué datos de Google Sheets puedo asociar con conversaciones de WhatsApp?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "La mayoría de los equipos sincronizan conversaciones de WhatsApp con datos de clientes en hojas de cálculo para rastrear el contexto en todo el pipeline de ventas. La mejor asignación depende de tu flujo de trabajo de Google Sheets."
            }
          },
          {
            "@type": "Question",
            "name": "¿Cuánto tiempo toma configurar la integración de WhatsApp con Google Sheets?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "La mayoría de los equipos completan la configuración en menos de 5 minutos. Simplemente instala Eazybe, conecta tu cuenta de Google y comienza a sincronizar conversaciones de WhatsApp."
            }
          },
          {
            "@type": "Question",
            "name": "¿Puedo usar WhatsApp Business API con Google Sheets?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sí. Eazybe soporta tanto WhatsApp Web como WhatsApp Business API, dándote flexibilidad para elegir el enfoque que se adapte a tus necesidades comerciales."
            }
          }
        ]
      }

      // BreadcrumbList Schema (without @id)
      const breadcrumbSchema = {
        "@context": "https://schema.org/",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Eazybe",
            "item": "https://eazybe.com/es"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Integraciones",
            "item": "https://eazybe.com/es/integrations"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Integración WhatsApp con Google Sheets",
            "item": "https://eazybe.com/es/google-sheets-whatsapp-integration"
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
        "description": "Eazybe ayuda a los equipos de ventas a conectar WhatsApp con plataformas CRM como HubSpot, Zoho, Salesforce y Google Sheets para sincronizar conversaciones, automatizar seguimientos y mejorar el compromiso del cliente.",
        "foundingDate": "2021",
        "sameAs": [
          "https://twitter.com/eazybe",
          "https://linkedin.com/company/eazybe",
          "https://youtube.com/@eazybe"
        ],
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "contactType": "customer support",
            "email": "support@eazybe.com",
            "url": "https://eazybe.com/es/google-sheets-whatsapp-integration",
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
        "knowsAbout": ["WhatsApp CRM", "Integración WhatsApp Google Sheets", "Automatización de ventas", "Integración con hojas de cálculo", "Agentes de IA para WhatsApp", "Compromiso del cliente"]
      }

      // WebPage Schema (without @id)
      const webpageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "url": "https://eazybe.com/es/google-sheets-whatsapp-integration",
        "name": "Integración de Hojas de Cálculo de Google y WhatsApp | Eazybe",
        "description": "Conecta WhatsApp con Google Sheets. Sincroniza chats automáticamente, usa agentes de IA, rastrea oportunidades y gestiona conversaciones de ventas directamente en Sheets.",
        "inLanguage": "es",
        "datePublished": "2026-02-03T08:00:00+00:00",
        "dateModified": "2026-02-03T10:30:00+00:00"
      }

      // SoftwareApplication Schema (without @id)
      const softwareApplicationSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Integración WhatsApp Google Sheets - Eazybe",
        "applicationCategory": "BusinessApplication",
        "applicationSubCategory": "Integración con hojas de cálculo, Automatización WhatsApp, Agentes de IA para WhatsApp",
        "operatingSystem": "Web, Extensión Chrome",
        "offers": {
          "@type": "AggregateOffer",
          "url": "https://eazybe.com/es/pricing",
          "priceCurrency": "EUR",
          "lowPrice": 25,
          "highPrice": 42,
          "offerCount": 5,
          "availability": "https://schema.org/InStock"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.7",
          "bestRating": "5",
          "worstRating": "1",
          "ratingCount": 53978
        },
        "featureList": [
          "Sincronización automática de WhatsApp con Google Sheets",
          "Sugerencias de respuesta con IA",
          "Bandeja de entrada compartida para colaboración en equipo",
          "Seguimiento de oportunidades desde WhatsApp",
          "Sincronización de contactos",
          "Programación de mensajes",
          "Agentes de IA para Google Sheets"
        ]
      }

      // Product Schema (without @id)
      const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Integración WhatsApp Google Sheets - Eazybe",
        "url": "https://eazybe.com/es/google-sheets-whatsapp-integration",
        "image": [
          "https://eazybe.com/logo.png"
        ],
        "description": "Eazybe conecta WhatsApp con Google Sheets para sincronizar chats automáticamente, ayudar a los equipos de ventas a responder más rápido con IA y gestionar conversaciones con clientes con flujos de trabajo de bandeja de entrada compartida.",
        "brand": {
          "@type": "Brand",
          "name": "Eazybe"
        },
        "manufacturer": {
          "@type": "Organization",
          "name": "Eazybe",
          "url": "https://eazybe.com/es"
        },
        "category": "Software de integración con hojas de cálculo",
        "audience": {
          "@type": "BusinessAudience",
          "audienceType": "Equipos de ventas, usuarios de Google Sheets, gestores de hojas de cálculo, empresas B2B"
        },
        "offers": {
          "@type": "AggregateOffer",
          "url": "https://eazybe.com/es/pricing",
          "priceCurrency": "EUR",
          "lowPrice": 25,
          "highPrice": 42,
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

      // HowTo Schema (without @id)
      const howToSchema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "Cómo conectar WhatsApp con Google Sheets usando Eazybe",
        "description": "Sigue estos pasos para instalar Eazybe y sincronizar conversaciones de WhatsApp con Google Sheets para que tu equipo pueda rastrear chats, acelerar seguimientos y mantener registros de hojas de cálculo actualizados.",
        "totalTime": "PT5M",
        "estimatedCost": {
          "@type": "MonetaryAmount",
          "currency": "EUR",
          "value": "0"
        },
        "supply": [
          {
            "@type": "HowToSupply",
            "name": "Cuenta de Google activa"
          },
          {
            "@type": "HowToSupply",
            "name": "Cuenta WhatsApp con acceso a WhatsApp Web"
          }
        ],
        "tool": [
          {
            "@type": "HowToTool",
            "name": "Google Chrome (o navegador basado en Chromium)"
          },
          {
            "@type": "HowToTool",
            "name": "Extensión Eazybe para Chrome"
          }
        ],
        "step": [
          {
            "@type": "HowToStep",
            "url": "https://eazybe.com/es/google-sheets-whatsapp-integration#step1",
            "name": "Instala la extensión Eazybe",
            "text": "Abra la Chrome Web Store e instala la extensión oficial Eazybe en tu navegador.",
            "image": "https://eazybe.com/logo.png"
          },
          {
            "@type": "HowToStep",
            "url": "https://eazybe.com/es/google-sheets-whatsapp-integration#step2",
            "name": "Abre WhatsApp Web",
            "text": "Ve a WhatsApp Web en tu computadora e inicia sesión. El panel Eazybe aparecerá dentro de WhatsApp Web.",
            "image": "https://eazybe.com/logo.png"
          },
          {
            "@type": "HowToStep",
            "url": "https://eazybe.com/es/google-sheets-whatsapp-integration#step3",
            "name": "Conecta tu cuenta de Google",
            "text": "En el panel Eazybe, elige Google Sheets y completa el flujo de autorización para conectar tu cuenta de forma segura.",
            "image": "https://eazybe.com/logo.png"
          },
          {
            "@type": "HowToStep",
            "url": "https://eazybe.com/es/google-sheets-whatsapp-integration#step4",
            "name": "Activa la sincronización de chat con Google Sheets",
            "text": "Selecciona un contacto o conversa y activa la sincronización. Los mensajes de WhatsApp y el contexto del cliente comenzarán a sincronizarse con Google Sheets automáticamente.",
            "image": "https://eazybe.com/logo.png"
          },
          {
            "@type": "HowToStep",
            "url": "https://eazybe.com/es/google-sheets-whatsapp-integration#step5",
            "name": "Usa respuestas de IA y flujos de trabajo en equipo",
            "text": "Usa respuestas asistidas por IA para responder más rápido y flujos de trabajo de bandeja de entrada compartida para colaborar con tu equipo manteniendo Google Sheets actualizado.",
            "image": "https://eazybe.com/logo.png"
          }
        ],
        "inLanguage": "es-ES"
      }

      // Add all schemas to head
      addJsonLdSchema(faqSchema, 'faq-googlesheets-es')
      addJsonLdSchema(breadcrumbSchema, 'breadcrumb-googlesheets-es')
      addJsonLdSchema(organizationSchema, 'organization-googlesheets-es')
      addJsonLdSchema(webpageSchema, 'webpage-googlesheets-es')
      addJsonLdSchema(softwareApplicationSchema, 'software-googlesheets-es')
      addJsonLdSchema(productSchema, 'product-googlesheets-es')
      addJsonLdSchema(howToSchema, 'howto-googlesheets-es')

      // Cleanup function - remove meta tags and schema when leaving the page
      return () => {
        // Remove FAQ schema
        const faqScript = document.querySelector('script[type="application/ld+json"][data-schema="faq-googlesheets-es"]')
        if (faqScript) faqScript.remove()
        // Remove breadcrumb schema
        const breadcrumbScript = document.querySelector('script[type="application/ld+json"][data-schema="breadcrumb-googlesheets-es"]')
        if (breadcrumbScript) breadcrumbScript.remove()
        // Remove organization schema
        const orgScript = document.querySelector('script[type="application/ld+json"][data-schema="organization-googlesheets-es"]')
        if (orgScript) orgScript.remove()
        // Remove webpage schema
        const webpageScript = document.querySelector('script[type="application/ld+json"][data-schema="webpage-googlesheets-es"]')
        if (webpageScript) webpageScript.remove()
        // Remove software application schema
        const softwareAppScript = document.querySelector('script[type="application/ld+json"][data-schema="software-googlesheets-es"]')
        if (softwareAppScript) softwareAppScript.remove()
        // Remove product schema
        const productScript = document.querySelector('script[type="application/ld+json"][data-schema="product-googlesheets-es"]')
        if (productScript) productScript.remove()
        // Remove how-to schema
        const howToScript = document.querySelector('script[type="application/ld+json"][data-schema="howto-googlesheets-es"]')
        if (howToScript) howToScript.remove()
      }
    }
  }, [location.pathname])
}

export default useGoogleSheetsIntegrationSEOEs
