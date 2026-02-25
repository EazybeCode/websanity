import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Bitrix24 Integration Page SEO (ES) - /es/bitrix24-whatsapp-integration
 * Adds meta tags and JSON-LD schemas for the Bitrix24 WhatsApp Integration page (Spanish)
 * All schemas are crawlable by bots (no @id for SEO)
 */

export const useBitrix24IntegrationSEOEs = () => {
  const location = useLocation()

  useEffect(() => {
    // Check if we're on the ES Bitrix24 integration page
    const isBitrix24EsPage = location.pathname === '/es/bitrix24-whatsapp-integration'

    if (isBitrix24EsPage) {
      // ==================== META TAGS ====================

      // Document title
      document.title = 'Integración de Bitrix24 con WhatsApp y agentes de IA | Eazybe'

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
      setMetaTag('description', 'Conecta WhatsApp con Bitrix24 CRM. Sincroniza chats automáticamente, usa agentes de IA, gestiona acuerdos y controla las conversaciones de ventas directamente dentro de Bitrix24.')
      setMetaTag('keywords', 'integración WhatsApp Bitrix24, Bitrix24 WhatsApp CRM, sincronizar WhatsApp con Bitrix24, automatización WhatsApp Bitrix24, CRM WhatsApp Bitrix24, agentes de IA Bitrix24 WhatsApp')
      setMetaTag('author', 'Eazybe')
      setMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
      setMetaTag('googlebot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
      setMetaTag('bingbot', 'index, follow')
      setMetaTag('thumbnail', 'https://eazybe.com/logo.png')

      // Article meta tags
      setMetaTag('article:published_time', '2026-02-03T08:00:00+00:00', true)
      setMetaTag('article:modified_time', '2026-02-03T10:30:00+00:00', true)
      setMetaTag('article:section', 'Technology', true)
      setMetaTag('article:tag', 'Integración Bitrix24 WhatsApp', true)

      // Open Graph tags
      setMetaTag('og:type', 'website', true)
      setMetaTag('og:url', 'https://eazybe.com/es/bitrix24-whatsapp-integration', true)
      setMetaTag('og:title', 'Integración de Bitrix24 con WhatsApp y agentes de IA | Eazybe', true)
      setMetaTag('og:description', 'Sincroniza WhatsApp con Bitrix24 CRM automáticamente. Gestiona acuerdos, usa respuestas de IA, administra chats y aumenta la productividad de ventas directamente dentro de Bitrix24.', true)
      setMetaTag('og:image', 'https://eazybe.com/logo.png', true)
      setMetaTag('og:image:width', '1200', true)
      setMetaTag('og:image:height', '630', true)
      setMetaTag('og:image:alt', 'Integración de Bitrix24 con WhatsApp - Eazybe', true)
      setMetaTag('og:locale', 'es_ES', true)
      setMetaTag('og:site_name', 'Eazybe', true)

      // Twitter Card tags
      setMetaTag('twitter:card', 'summary_large_image', true)
      setMetaTag('twitter:site', '@eazybe', true)
      setMetaTag('twitter:creator', '@eazybe', true)
      setMetaTag('twitter:title', 'Bitrix24 + WhatsApp | Integra tu CRM con WhatsApp', true)
      setMetaTag('twitter:description', 'Sincroniza automáticamente los chats de WhatsApp con Bitrix24 CRM. Usa agentes de IA, rastrea la actividad del pipeline y gestiona las conversaciones con clientes en un solo lugar.', true)
      setMetaTag('twitter:image', 'https://eazybe.com/logo.png', true)
      setMetaTag('twitter:image:alt', 'Integración Bitrix24 WhatsApp por Eazybe', true)
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
      setMetaTag('answer-type', 'cómo-hacer, información-del-producto, comparación-de-funciones')
      setMetaTag('target-audience', 'usuarios de Bitrix24, equipos de ventas, gestores CRM, equipos de automatización de marketing, empresas B2B')
      setMetaTag('content-intent', 'investigación-comercial, transaccional')
      setMetaTag('conversational-query', 'cómo conectar WhatsApp con Bitrix24, mejor integración WhatsApp Bitrix24, sincronizar WhatsApp con Bitrix24 CRM')
      setMetaTag('ai-readability', 'conversacional, profesional, orientado-a-soluciones')
      setMetaTag('context-window', 'automatización Bitrix24, sincronización WhatsApp CRM, seguimiento de acuerdos, gestión de pipeline de ventas, WhatsApp dentro de Bitrix24')
      setMetaTag('user-problem', 'Bitrix24 no conectado con WhatsApp, leads perdidos en WhatsApp, actualización manual del CRM')
      setMetaTag('solution-summary', 'sincronización automática de WhatsApp a Bitrix24 con automatización de IA')
      setMetaTag('primary-benefit', 'gestionar conversaciones de WhatsApp directamente dentro de Bitrix24')
      setMetaTag('use-case', 'equipos de ventas sincronizando conversaciones de WhatsApp con Bitrix24 CRM automáticamente')
      setMetaTag('implementation-difficulty', 'fácil, integración con Bitrix24 en un clic')
      setMetaTag('time-to-value', 'instantáneo con sincronización en tiempo real')

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
            "name": "¿Cómo conecto WhatsApp con Bitrix24 CRM?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Instala Eazybe y conecta tu cuenta de Bitrix24. Eazybe sincroniza los chats de WhatsApp con Bitrix24 para que las conversaciones y el contexto del cliente permanezcan vinculados a los registros correctos del CRM."
            }
          },
          {
            "@type": "Question",
            "name": "¿Eazybe sincroniza mensajes de WhatsApp en Bitrix24 automáticamente?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sí. Eazybe puede sincronizar conversaciones de WhatsApp con Bitrix24 automáticamente, reduciendo el copiar/pegar manual y manteniendo la actividad de ventas actualizada."
            }
          },
          {
            "@type": "Question",
            "name": "¿Varios compañeros pueden usar una bandeja de entrada compartida con Bitrix24 + WhatsApp?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sí. Eazybe soporta flujos de trabajo de bandeja de entrada compartida para que los equipos puedan colaborar en leads de WhatsApp manteniendo los registros de Bitrix24 alineados."
            }
          },
          {
            "@type": "Question",
            "name": "¿Qué pueden hacer los agentes de IA para conversaciones de Bitrix24 + WhatsApp?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "La IA puede ayudar a redactar respuestas, resumir conversaciones y acelerar seguimientos—para que los representantes respondan más rápido manteniendo una mensajería consistente."
            }
          },
          {
            "@type": "Question",
            "name": "¿Es segura esta integración para usar con WhatsApp y Bitrix24?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Eazybe está diseñado para casos de uso empresarial y se enfoca en flujos de trabajo seguros para sincronizar conversaciones de WhatsApp con registros CRM. Siempre revisa tus requisitos de seguridad y cumplimiento antes del implementación."
            }
          },
          {
            "@type": "Question",
            "name": "¿Qué entidades de Bitrix24 puedo asociar con conversaciones de WhatsApp?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "La mayoría de los equipos asocian conversaciones de WhatsApp con Leads y Contactos para rastrear el contexto en todo el pipeline de ventas. La mejor asignación depende de tu flujo de trabajo de Bitrix24."
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
            "name": "Integración",
            "item": "https://eazybe.com/es/integrations"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Integración Bitrix24 WhatsApp",
            "item": "https://eazybe.com/es/bitrix24-whatsapp-integration"
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
        "description": "Eazybe ayuda a los equipos de ventas a conectar WhatsApp con plataformas CRM como HubSpot, Zoho, Salesforce y Bitrix24 para sincronizar conversaciones, automatizar seguimientos y mejorar el compromiso del cliente.",
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
            "url": "https://eazybe.com/es/bitrix24-whatsapp-integration",
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
        "knowsAbout": ["WhatsApp CRM", "Integración WhatsApp Bitrix24", "Automatización de ventas", "Integración CRM", "Agentes de IA para CRM", "Compromiso del cliente"]
      }

      // WebPage Schema (without @id)
      const webpageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "url": "https://eazybe.com/es/bitrix24-whatsapp-integration",
        "name": "Integración de Bitrix24 con WhatsApp y Agentes de IA | Eazybe",
        "description": "Conecta WhatsApp con Bitrix24 CRM. Sincroniza chats automáticamente, usa agentes de IA, gestiona acuerdos y controla las conversaciones de ventas directamente dentro de Bitrix24.",
        "inLanguage": "es",
        "datePublished": "2026-02-03T08:00:00+00:00",
        "dateModified": "2026-02-03T10:30:00+00:00"
      }

      // SoftwareApplication Schema (without @id)
      const softwareApplicationSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Integración WhatsApp Bitrix24 - Eazybe",
        "applicationCategory": "BusinessApplication",
        "applicationSubCategory": "Integración CRM, Automatización WhatsApp, Agentes de IA para WhatsApp",
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
          "Sincronización automática de WhatsApp con Bitrix24",
          "Sugerencias de respuesta con IA",
          "Bandeja de entrada compartida para colaboración en equipo",
          "Seguimiento de acuerdos desde WhatsApp",
          "Sincronización de contactos",
          "Programación de mensajes",
          "Agentes de IA para Bitrix24"
        ]
      }

      // Product Schema (without @id)
      const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Integración WhatsApp Bitrix24 - Eazybe",
        "url": "https://eazybe.com/es/bitrix24-whatsapp-integration",
        "image": [
          "https://eazybe.com/logo.png"
        ],
        "description": "Eazybe conecta WhatsApp con Bitrix24 CRM para sincronizar chats automáticamente, ayudar a los equipos de ventas a responder más rápido con IA y gestionar conversaciones con clientes con flujos de trabajo de bandeja de entrada compartida.",
        "brand": {
          "@type": "Brand",
          "name": "Eazybe"
        },
        "manufacturer": {
          "@type": "Organization",
          "name": "Eazybe",
          "url": "https://eazybe.com/es"
        },
        "category": "Software de Integración CRM",
        "audience": {
          "@type": "BusinessAudience",
          "audienceType": "Equipos de ventas, usuarios de Bitrix24, gestores CRM, empresas B2B"
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
        "name": "Cómo conectar WhatsApp con Bitrix24 CRM usando Eazybe",
        "description": "Sigue estos pasos para instalar Eazybe y sincronizar conversaciones de WhatsApp con Bitrix24 CRM para que tu equipo pueda rastrear chats, acelerar seguimientos y mantener registros de CRM actualizados.",
        "totalTime": "PT5M",
        "estimatedCost": {
          "@type": "MonetaryAmount",
          "currency": "EUR",
          "value": "0"
        },
        "supply": [
          {
            "@type": "HowToSupply",
            "name": "Cuenta de Bitrix24 activa"
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
            "url": "https://eazybe.com/es/bitrix24-whatsapp-integration#step1",
            "name": "Instala la extensión Eazybe",
            "text": "Abra la Chrome Web Store e instala la extensión oficial Eazybe en tu navegador.",
            "image": "https://eazybe.com/logo.png"
          },
          {
            "@type": "HowToStep",
            "url": "https://eazybe.com/es/bitrix24-whatsapp-integration#step2",
            "name": "Abre WhatsApp Web",
            "text": "Ve a WhatsApp Web en tu computadora e inicia sesión. El panel Eazybe aparecerá dentro de WhatsApp Web.",
            "image": "https://eazybe.com/logo.png"
          },
          {
            "@type": "HowToStep",
            "url": "https://eazybe.com/es/bitrix24-whatsapp-integration#step3",
            "name": "Conecta tu cuenta de Bitrix24",
            "text": "En el panel Eazybe, elige Bitrix24 y completa el flujo de autorización para conectar tu CRM de forma segura.",
            "image": "https://eazybe.com/logo.png"
          },
          {
            "@type": "HowToStep",
            "url": "https://eazybe.com/es/bitrix24-whatsapp-integration#step4",
            "name": "Activa la sincronización de chat con Bitrix24",
            "text": "Selecciona un contacto o conversa y activa la sincronización. Los mensajes de WhatsApp y el contexto del cliente comenzarán a sincronizarse con Bitrix24 automáticamente.",
            "image": "https://eazybe.com/logo.png"
          },
          {
            "@type": "HowToStep",
            "url": "https://eazybe.com/es/bitrix24-whatsapp-integration#step5",
            "name": "Usa respuestas de IA y flujos de trabajo en equipo",
            "text": "Usa respuestas asistidas por IA para responder más rápido y flujos de trabajo de bandeja de entrada compartida para colaborar con tu equipo manteniendo Bitrix24 actualizado.",
            "image": "https://eazybe.com/logo.png"
          }
        ],
        "inLanguage": "es-ES"
      }

      // Add all schemas to head
      addJsonLdSchema(faqSchema, 'faq-bitrix24-es')
      addJsonLdSchema(breadcrumbSchema, 'breadcrumb-bitrix24-es')
      addJsonLdSchema(organizationSchema, 'organization-bitrix24-es')
      addJsonLdSchema(webpageSchema, 'webpage-bitrix24-es')
      addJsonLdSchema(softwareApplicationSchema, 'software-bitrix24-es')
      addJsonLdSchema(productSchema, 'product-bitrix24-es')
      addJsonLdSchema(howToSchema, 'howto-bitrix24-es')

      // Cleanup function - remove meta tags and schema when leaving the page
      return () => {
        // Remove FAQ schema
        const faqScript = document.querySelector('script[type="application/ld+json"][data-schema="faq-bitrix24-es"]')
        if (faqScript) faqScript.remove()
        // Remove breadcrumb schema
        const breadcrumbScript = document.querySelector('script[type="application/ld+json"][data-schema="breadcrumb-bitrix24-es"]')
        if (breadcrumbScript) breadcrumbScript.remove()
        // Remove organization schema
        const orgScript = document.querySelector('script[type="application/ld+json"][data-schema="organization-bitrix24-es"]')
        if (orgScript) orgScript.remove()
        // Remove webpage schema
        const webpageScript = document.querySelector('script[type="application/ld+json"][data-schema="webpage-bitrix24-es"]')
        if (webpageScript) webpageScript.remove()
        // Remove software application schema
        const softwareAppScript = document.querySelector('script[type="application/ld+json"][data-schema="software-bitrix24-es"]')
        if (softwareAppScript) softwareAppScript.remove()
        // Remove product schema
        const productScript = document.querySelector('script[type="application/ld+json"][data-schema="product-bitrix24-es"]')
        if (productScript) productScript.remove()
        // Remove how-to schema
        const howToScript = document.querySelector('script[type="application/ld+json"][data-schema="howto-bitrix24-es"]')
        if (howToScript) howToScript.remove()
      }
    }
  }, [location.pathname])
}
