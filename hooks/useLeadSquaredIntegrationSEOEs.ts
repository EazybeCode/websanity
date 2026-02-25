import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * LeadSquared Integration Page SEO (ES) - /es/leadsquared-whatsapp-integration
 * Adds meta tags and JSON-LD schemas for the LeadSquared WhatsApp Integration page (Spanish)
 * All schemas are crawlable by bots (no @id for SEO)
 */

export const useLeadSquaredIntegrationSEOEs = () => {
  const location = useLocation()

  useEffect(() => {
    // Check if we're on the ES LeadSquared integration page
    const isLeadSquaredEsPage = location.pathname === '/es/leadsquared-whatsapp-integration'

    if (isLeadSquaredEsPage) {
      // ==================== META TAGS ====================

      // Document title
      document.title = 'Integración de LeadSquared con WhatsApp y agentes de IA | Eazybe'

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
      setMetaTag('description', 'Conecta WhatsApp con LeadSquared CRM. Sincroniza chats automáticamente, usa agentes de IA, gestiona acuerdos y controla las conversaciones de ventas directamente dentro de LeadSquared.')
      setMetaTag('keywords', 'integración WhatsApp LeadSquared, LeadSquared WhatsApp CRM, sincronizar WhatsApp con LeadSquared, automatización WhatsApp LeadSquared, CRM WhatsApp LeadSquared, agentes de IA LeadSquared WhatsApp')
      setMetaTag('author', 'Eazybe')
      setMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
      setMetaTag('googlebot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
      setMetaTag('bingbot', 'index, follow')
      setMetaTag('thumbnail', 'https://eazybe.com/logo.png')

      // Article meta tags
      setMetaTag('article:published_time', '2026-02-03T08:00:00+00:00', true)
      setMetaTag('article:modified_time', '2026-02-03T10:30:00+00:00', true)
      setMetaTag('article:section', 'Technology', true)
      setMetaTag('article:tag', 'Integración LeadSquared WhatsApp', true)

      // Open Graph tags
      setMetaTag('og:type', 'website', true)
      setMetaTag('og:url', 'https://eazybe.com/es/leadsquared-whatsapp-integration', true)
      setMetaTag('og:title', 'Integración de LeadSquared con WhatsApp y agentes de IA | Eazybe', true)
      setMetaTag('og:description', 'Sincroniza WhatsApp con LeadSquared CRM automáticamente. Gestiona acuerdos, usa respuestas de IA, administra chats y aumenta la productividad de ventas directamente dentro de LeadSquared.', true)
      setMetaTag('og:image', 'https://eazybe.com/logo.png', true)
      setMetaTag('og:image:width', '1200', true)
      setMetaTag('og:image:height', '630', true)
      setMetaTag('og:image:alt', 'Integración de LeadSquared con WhatsApp - Eazybe', true)
      setMetaTag('og:locale', 'es_ES', true)
      setMetaTag('og:site_name', 'Eazybe', true)

      // Twitter Card tags
      setMetaTag('twitter:card', 'summary_large_image', true)
      setMetaTag('twitter:site', '@eazybe', true)
      setMetaTag('twitter:creator', '@eazybe', true)
      setMetaTag('twitter:title', 'LeadSquared + WhatsApp | Integra tu CRM con WhatsApp', true)
      setMetaTag('twitter:description', 'Sincroniza automáticamente los chats de WhatsApp con LeadSquared CRM. Usa agentes de IA, rastrea la actividad del pipeline y gestiona las conversaciones con clientes en un solo lugar.', true)
      setMetaTag('twitter:image', 'https://eazybe.com/logo.png', true)
      setMetaTag('twitter:image:alt', 'Integración LeadSquared WhatsApp por Eazybe', true)
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
      setMetaTag('target-audience', 'usuarios de LeadSquared, equipos de ventas, gestores CRM, equipos de automatización de marketing, empresas B2B')
      setMetaTag('content-intent', 'investigación-comercial, transaccional')
      setMetaTag('conversational-query', 'cómo conectar WhatsApp con LeadSquared, mejor integración WhatsApp LeadSquared, sincronizar WhatsApp con LeadSquared CRM')
      setMetaTag('ai-readability', 'conversacional, profesional, orientado-a-soluciones')
      setMetaTag('context-window', 'automatización LeadSquared, sincronización WhatsApp CRM, seguimiento de acuerdos, gestión de pipeline de ventas, WhatsApp dentro de LeadSquared')
      setMetaTag('user-problem', 'LeadSquared no conectado con WhatsApp, leads perdidos en WhatsApp, actualización manual del CRM')
      setMetaTag('solution-summary', 'sincronización automática de WhatsApp a LeadSquared con automatización de IA')
      setMetaTag('primary-benefit', 'gestionar conversaciones de WhatsApp directamente dentro de LeadSquared')
      setMetaTag('use-case', 'equipos de ventas sincronizando conversaciones de WhatsApp con LeadSquared CRM automáticamente')
      setMetaTag('implementation-difficulty', 'fácil, integración con LeadSquared en un clic')
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
            "name": "¿Cómo conecto WhatsApp con LeadSquared CRM?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Instala Eazybe y conecta tu cuenta de LeadSquared. Eazybe sincroniza los chats de WhatsApp con LeadSquared para que las conversaciones y el contexto del cliente permanezcan vinculados a los registros correctos del CRM."
            }
          },
          {
            "@type": "Question",
            "name": "¿Eazybe sincroniza mensajes de WhatsApp en LeadSquared automáticamente?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sí. Eazybe puede sincronizar conversaciones de WhatsApp con LeadSquared automáticamente, reduciendo el copiar/pegar manual y manteniendo la actividad de ventas actualizada."
            }
          },
          {
            "@type": "Question",
            "name": "¿Varios compañeros pueden usar una bandeja de entrada compartida con LeadSquared + WhatsApp?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sí. Eazybe soporta flujos de trabajo de bandeja de entrada compartida para que los equipos puedan colaborar en leads de WhatsApp manteniendo los registros de LeadSquared alineados."
            }
          },
          {
            "@type": "Question",
            "name": "¿Qué pueden hacer los agentes de IA para conversaciones de LeadSquared + WhatsApp?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "La IA puede ayudar a redactar respuestas, resumir conversaciones y acelerar seguimientos—para que los representantes respondan más rápido manteniendo una mensajería consistente."
            }
          },
          {
            "@type": "Question",
            "name": "¿Es segura esta integración para usar con WhatsApp y LeadSquared?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Eazybe está diseñado para casos de uso empresarial y se enfoca en flujos de trabajo seguros para sincronizar conversaciones de WhatsApp con registros CRM. Siempre revisa tus requisitos de seguridad y cumplimiento antes del implementación."
            }
          },
          {
            "@type": "Question",
            "name": "¿Qué entidades de LeadSquared puedo asociar con conversaciones de WhatsApp?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "La mayoría de los equipos asocian conversaciones de WhatsApp con Leads y Contactos para rastrear el contexto en todo el pipeline de ventas. La mejor asignación depende de tu flujo de trabajo de LeadSquared."
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
            "name": "Integración LeadSquared WhatsApp",
            "item": "https://eazybe.com/es/leadsquared-whatsapp-integration"
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
        "description": "Eazybe ayuda a los equipos de ventas a conectar WhatsApp con plataformas CRM como HubSpot, Zoho, Salesforce y LeadSquared para sincronizar conversaciones, automatizar seguimientos y mejorar el compromiso del cliente.",
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
            "url": "https://eazybe.com/es/leadsquared-whatsapp-integration",
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
        "knowsAbout": ["WhatsApp CRM", "Integración WhatsApp LeadSquared", "Automatización de ventas", "Integración CRM", "Agentes de IA para CRM", "Compromiso del cliente"]
      }

      // WebPage Schema (without @id)
      const webpageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "url": "https://eazybe.com/es/leadsquared-whatsapp-integration",
        "name": "Integración de LeadSquared con WhatsApp y Agentes de IA | Eazybe",
        "description": "Conecta WhatsApp con LeadSquared CRM. Sincroniza chats automáticamente, usa agentes de IA, gestiona acuerdos y controla las conversaciones de ventas directamente dentro de LeadSquared.",
        "inLanguage": "es",
        "datePublished": "2026-02-03T08:00:00+00:00",
        "dateModified": "2026-02-03T10:30:00+00:00"
      }

      // SoftwareApplication Schema (without @id)
      const softwareApplicationSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Integración WhatsApp LeadSquared - Eazybe",
        "applicationCategory": "BusinessApplication",
        "applicationSubCategory": "Integración CRM, Automatización WhatsApp, Agentes de IA para WhatsApp",
        "operatingSystem": "Web, Extensión Chrome",
        "offers": {
          "@type": "AggregateOffer",
          "url": "https://eazybe.com/es/pricing",
          "priceCurrency": "EUR",
          "lowPrice": 11,
          "highPrice": 19,
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
          "Sincronización automática de WhatsApp con LeadSquared",
          "Sugerencias de respuesta con IA",
          "Bandeja de entrada compartida para colaboración en equipo",
          "Seguimiento de acuerdos desde WhatsApp",
          "Sincronización de contactos",
          "Programación de mensajes",
          "Agentes de IA para LeadSquared"
        ]
      }

      // Product Schema (without @id)
      const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Integración WhatsApp LeadSquared - Eazybe",
        "url": "https://eazybe.com/es/leadsquared-whatsapp-integration",
        "image": [
          "https://eazybe.com/logo.png"
        ],
        "description": "Eazybe conecta WhatsApp con LeadSquared CRM para sincronizar chats automáticamente, ayudar a los equipos de ventas a responder más rápido con IA y gestionar conversaciones con clientes con flujos de trabajo de bandeja de entrada compartida.",
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
          "audienceType": "Equipos de ventas, usuarios de LeadSquared, gestores CRM, empresas B2B"
        },
        "offers": {
          "@type": "AggregateOffer",
          "url": "https://eazybe.com/es/pricing",
          "priceCurrency": "EUR",
          "lowPrice": 11,
          "highPrice": 19,
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
        "name": "Cómo conectar WhatsApp con LeadSquared CRM usando Eazybe",
        "description": "Sigue estos pasos para instalar Eazybe y sincronizar conversaciones de WhatsApp con LeadSquared CRM para que tu equipo pueda rastrear chats, acelerar seguimientos y mantener registros de CRM actualizados.",
        "totalTime": "PT5M",
        "estimatedCost": {
          "@type": "MonetaryAmount",
          "currency": "EUR",
          "value": "0"
        },
        "supply": [
          {
            "@type": "HowToSupply",
            "name": "Cuenta de LeadSquared activa"
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
            "url": "https://eazybe.com/es/leadsquared-whatsapp-integration#step1",
            "name": "Instala la extensión Eazybe",
            "text": "Abra la Chrome Web Store e instala la extensión oficial Eazybe en tu navegador.",
            "image": "https://eazybe.com/logo.png"
          },
          {
            "@type": "HowToStep",
            "url": "https://eazybe.com/es/leadsquared-whatsapp-integration#step2",
            "name": "Abre WhatsApp Web",
            "text": "Ve a WhatsApp Web en tu computadora e inicia sesión. El panel Eazybe aparecerá dentro de WhatsApp Web.",
            "image": "https://eazybe.com/logo.png"
          },
          {
            "@type": "HowToStep",
            "url": "https://eazybe.com/es/leadsquared-whatsapp-integration#step3",
            "name": "Conecta tu cuenta de LeadSquared",
            "text": "En el panel Eazybe, elige LeadSquared y completa el flujo de autorización para conectar tu CRM de forma segura.",
            "image": "https://eazybe.com/logo.png"
          },
          {
            "@type": "HowToStep",
            "url": "https://eazybe.com/es/leadsquared-whatsapp-integration#step4",
            "name": "Activa la sincronización de chat con LeadSquared",
            "text": "Selecciona un contacto o conversa y activa la sincronización. Los mensajes de WhatsApp y el contexto del cliente comenzarán a sincronizarse con LeadSquared automáticamente.",
            "image": "https://eazybe.com/logo.png"
          },
          {
            "@type": "HowToStep",
            "url": "https://eazybe.com/es/leadsquared-whatsapp-integration#step5",
            "name": "Usa respuestas de IA y flujos de trabajo en equipo",
            "text": "Usa respuestas asistidas por IA para responder más rápido y flujos de trabajo de bandeja de entrada compartida para colaborar con tu equipo manteniendo LeadSquared actualizado.",
            "image": "https://eazybe.com/logo.png"
          }
        ],
        "inLanguage": "es-ES"
      }

      // Add all schemas to head
      addJsonLdSchema(faqSchema, 'faq-leadsquared-es')
      addJsonLdSchema(breadcrumbSchema, 'breadcrumb-leadsquared-es')
      addJsonLdSchema(organizationSchema, 'organization-leadsquared-es')
      addJsonLdSchema(webpageSchema, 'webpage-leadsquared-es')
      addJsonLdSchema(softwareApplicationSchema, 'software-leadsquared-es')
      addJsonLdSchema(productSchema, 'product-leadsquared-es')
      addJsonLdSchema(howToSchema, 'howto-leadsquared-es')

      // Cleanup function - remove meta tags and schema when leaving the page
      return () => {
        // Remove FAQ schema
        const faqScript = document.querySelector('script[type="application/ld+json"][data-schema="faq-leadsquared-es"]')
        if (faqScript) faqScript.remove()
        // Remove breadcrumb schema
        const breadcrumbScript = document.querySelector('script[type="application/ld+json"][data-schema="breadcrumb-leadsquared-es"]')
        if (breadcrumbScript) breadcrumbScript.remove()
        // Remove organization schema
        const orgScript = document.querySelector('script[type="application/ld+json"][data-schema="organization-leadsquared-es"]')
        if (orgScript) orgScript.remove()
        // Remove webpage schema
        const webpageScript = document.querySelector('script[type="application/ld+json"][data-schema="webpage-leadsquared-es"]')
        if (webpageScript) webpageScript.remove()
        // Remove software application schema
        const softwareAppScript = document.querySelector('script[type="application/ld+json"][data-schema="software-leadsquared-es"]')
        if (softwareAppScript) softwareAppScript.remove()
        // Remove product schema
        const productScript = document.querySelector('script[type="application/ld+json"][data-schema="product-leadsquared-es"]')
        if (productScript) productScript.remove()
        // Remove how-to schema
        const howToScript = document.querySelector('script[type="application/ld+json"][data-schema="howto-leadsquared-es"]')
        if (howToScript) howToScript.remove()
      }
    }
  }, [location.pathname])
}
