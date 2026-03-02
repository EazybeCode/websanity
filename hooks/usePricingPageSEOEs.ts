import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Pricing Page SEO (Spanish) - /es/pricing
 * Adds comprehensive meta tags and JSON-LD schemas for the Eazybe pricing page
 * All schemas are crawlable by bots (no @id for SEO)
 */
export const usePricingPageSEOEs = () => {
  const location = useLocation()

  useEffect(() => {
    // Check if we're on the Spanish pricing page
    const isPricingPage = location.pathname === '/es/pricing'

    if (isPricingPage) {
      // ==================== META TAGS ====================

      // Document title
      document.title = 'Precios'

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
      setMetaTag('description', 'Descubre los planes y precios de Eazybe para integrar WhatsApp con tu CRM. Automatiza conversaciones, gestiona ventas y mejora la productividad de tu equipo.')
      setMetaTag('keywords', 'precios Eazybe, precios WhatsApp CRM, planes WhatsApp CRM, integración WhatsApp CRM costo, automatización WhatsApp precios, bandeja compartida CRM')
      setMetaTag('author', 'Eazybe')
      setMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
      setMetaTag('googlebot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
      setMetaTag('bingbot', 'index, follow')
      setMetaTag('thumbnail', 'https://eazybe.com/logo.png')

      // Open Graph tags
      setMetaTag('og:type', 'website', true)
      setMetaTag('og:url', 'https://eazybe.com/es/pricing', true)
      setMetaTag('og:title', 'Precios de Eazybe | Planes WhatsApp CRM', true)
      setMetaTag('og:description', 'Compara los planes de Eazybe para integrar WhatsApp con tu CRM y automatizar ventas, seguimientos y conversaciones con clientes.', true)
      setMetaTag('og:image', 'https://eazybe.com/logo.png', true)
      setMetaTag('og:image:width', '1200', true)
      setMetaTag('og:image:height', '630', true)
      setMetaTag('og:image:alt', 'Planes de precios de Eazybe WhatsApp CRM', true)
      setMetaTag('og:locale', 'es_ES', true)
      setMetaTag('og:site_name', 'Eazybe', true)

      // Twitter Card tags
      setMetaTag('twitter:card', 'summary_large_image', true)
      setMetaTag('twitter:site', '@eazybe', true)
      setMetaTag('twitter:creator', '@eazybe', true)
      setMetaTag('twitter:title', 'Precios de Eazybe | Planes WhatsApp CRM', true)
      setMetaTag('twitter:description', 'Consulta los precios de Eazybe para integrar WhatsApp con CRM, automatizar seguimientos y optimizar la productividad comercial.', true)
      setMetaTag('twitter:image', 'https://eazybe.com/logo.png', true)
      setMetaTag('twitter:image:alt', 'Precios de integración WhatsApp CRM Eazybe', true)
      setMetaTag('twitter:label1', 'Tipo de plan', true)
      setMetaTag('twitter:data1', 'Suscripción', true)
      setMetaTag('twitter:label2', 'Disponibilidad', true)
      setMetaTag('twitter:data2', 'Planes flexibles', true)

      // Mobile web app tags
      setMetaTag('mobile-web-app-capable', 'yes')
      setMetaTag('apple-mobile-web-app-capable', 'yes')
      setMetaTag('apple-mobile-web-app-status-bar-style', 'default')
      setMetaTag('apple-mobile-web-app-title', 'Eazybe')

      // AI and SEO specific meta tags
      setMetaTag('answer-type', 'precios, información-del-producto, comparación-de-planes')
      setMetaTag('target-audience', 'equipos de ventas, gestores CRM, startups, pymes, empresas y equipos de soporte')
      setMetaTag('content-intent', 'transaccional, investigación-comercial')
      setMetaTag('conversational-query', 'precios Eazybe, planes WhatsApp CRM, costo integración WhatsApp CRM, suscripción Eazybe')
      setMetaTag('ai-readability', 'claro, profesional, orientado-a-conversión')
      setMetaTag('context-window', 'precios WhatsApp CRM, automatización de ventas, bandeja compartida, suscripción IA')
      setMetaTag('user-problem', 'falta de claridad en precios CRM WhatsApp y procesos manuales de ventas')
      setMetaTag('solution-summary', 'planes transparentes para automatizar WhatsApp y gestionar ventas desde el CRM')
      setMetaTag('primary-benefit', 'elegir el mejor plan WhatsApp CRM para escalar tu negocio')
      setMetaTag('use-case', 'equipos comparando precios antes de implementar WhatsApp CRM')
      setMetaTag('implementation-difficulty', 'configuración sencilla')
      setMetaTag('time-to-value', 'valor inmediato tras la activación')

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

      // FAQPage Schema (Spanish)
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "inLanguage": "es",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "¿Puedo probar Eazybe gratis?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "¡Sí! Ofrecemos una prueba gratuita de 14 días en los planes Starter y Scaler. No se requiere tarjeta de crédito. Puedes explorar todas las funciones y ver cómo se integra Eazybe con tu flujo de trabajo antes de comprometerte."
            }
          },
          {
            "@type": "Question",
            "name": "¿Qué es Revenue Inbox?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Revenue Inbox es nuestro panel inteligente que resalta las conversaciones de WhatsApp más importantes que necesitan atención. Utiliza IA para identificar ofertas clave, escalaciones y oportunidades que podrías perder en una bandeja de entrada ocupada."
            }
          },
          {
            "@type": "Question",
            "name": "¿Qué es RevOps Agent?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "RevOps Agent es nuestro asistente con IA que automatiza tareas de operaciones de ingresos. Puede analizar conversaciones, actualizar registros CRM, identificar riesgos en acuerdos y proporcionar información procesable para ayudar a cerrar más ventas."
            }
          },
          {
            "@type": "Question",
            "name": "¿Qué es WhatsApp Web Copilot?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "WhatsApp Web Copilot es nuestro asistente de IA que funciona directamente en la interfaz de WhatsApp Web. Te ayuda a redactar respuestas, resumir conversaciones y proporcionar sugerencias en tiempo real para mejorar la comunicación con clientes."
            }
          },
          {
            "@type": "Question",
            "name": "¿Cómo funciona el precio por usuario?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Pagas por cada miembro del equipo que usa activamente Eazybe. Un usuario es cualquier persona que sincroniza sus conversaciones de WhatsApp con el CRM. Los administradores que solo ven datos no cuentan como usuarios."
            }
          },
          {
            "@type": "Question",
            "name": "¿Con qué CRMs se integra?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Starter se integra con HubSpot, Zoho CRM, Bitrix24 y Google Sheets. Scaler agrega integraciones con Salesforce y webhooks para CRMs personalizados. Omnis incluye APIs dedicadas y sincronización avanzada con acuerdos y tickets."
            }
          },
          {
            "@type": "Question",
            "name": "¿Puedo cambiar de plan después?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "¡Absolutamente! Puedes actualizar o bajar tu plan en cualquier momento. Al actualizar, obtienes acceso inmediato a nuevas funciones. Al bajar, el cambio entra en vigencia en el próximo ciclo de facturación."
            }
          },
          {
            "@type": "Question",
            "name": "¿Están mis datos seguros?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sí. Utilizamos encriptación de nivel bancario de 256 bits para todos los datos en tránsito y en reposo. Somos compatibles con GDPR, verificados como Meta Business Partner y realizamos auditorías de seguridad regularmente."
            }
          }
        ]
      }

      // WebPage Schema (Spanish)
      const webpageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Precios Eazybe",
        "url": "https://eazybe.com/es/pricing",
        "description": "Descubre los planes y precios de Eazybe para integrar WhatsApp con tu CRM, automatizar ventas y mejorar la productividad.",
        "inLanguage": "es",
        "isPartOf": {
          "@type": "WebSite",
          "name": "Eazybe",
          "url": "https://eazybe.com/es"
        },
        "about": [
          { "@type": "Thing", "name": "WhatsApp CRM" },
          { "@type": "Thing", "name": "Automatización de Ventas" },
          { "@type": "Thing", "name": "Integración CRM" }
        ]
      }

      // Organization Schema
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
        "description": "Eazybe ayuda a equipos a integrar WhatsApp con CRMs para sincronizar conversaciones, automatizar seguimientos y aumentar la productividad en ventas.",
        "foundingDate": "2021",
        "sameAs": [
          "https://twitter.com/eazybe",
          "https://linkedin.com/company/eazybe",
          "https://youtube.com/@eazybe"
        ],
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "8, The Green STE B",
          "addressLocality": "Dover",
          "addressRegion": "Delaware",
          "postalCode": "19901",
          "addressCountry": "US"
        },
        "knowsAbout": [
          "WhatsApp CRM",
          "Integración CRM",
          "Automatización de ventas",
          "Bandeja de entrada compartida",
          "Productividad en WhatsApp"
        ]
      }

      // BreadcrumbList Schema
      const breadcrumbSchema = {
        "@context": "https://schema.org",
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
            "name": "Precios",
            "item": "https://eazybe.com/es/pricing"
          }
        ]
      }

      // WebSite Schema (Spanish)
      const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "url": "https://eazybe.com/es",
        "name": "Eazybe",
        "description": "Integra WhatsApp con CRM, automatiza ventas y gestiona conversaciones con la plataforma Eazybe.",
        "inLanguage": "es",
        "publisher": {
          "@type": "Organization",
          "name": "Eazybe",
          "logo": {
            "@type": "ImageObject",
            "url": "https://eazybe.com/logo.png"
          }
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://eazybe.com/es/search?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      }

      // SoftwareApplication Schema (Spanish)
      const softwareApplicationSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Integraciones WhatsApp CRM - Eazybe",
        "url": "https://eazybe.com/es/integrations",
        "applicationCategory": "BusinessApplication",
        "applicationSubCategory": "Integración CRM, Automatización WhatsApp, Plataforma de Integraciones",
        "operatingSystem": "Web, Extensión Chrome",
        "description": "Eazybe permite integrar WhatsApp con CRMs y herramientas de ventas como HubSpot, Zoho, Salesforce, Bitrix24, LeadSquared y Google Sheets para sincronizar conversaciones, automatizar seguimientos y mejorar la productividad de los equipos.",
        "image": "https://eazybe.com/logo.png",
        "offers": {
          "@type": "AggregateOffer",
          "url": "https://eazybe.com/es/pricing",
          "priceCurrency": "EUR",
          "lowPrice": 24,
          "highPrice": 41,
          "offerCount": 5,
          "availability": "https://schema.org/InStock"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.7",
          "bestRating": "5",
          "worstRating": "1",
          "ratingCount": 53766
        },
        "featureList": [
          "Integración de WhatsApp con múltiples CRMs",
          "Sincronización automática de conversaciones",
          "Bandeja de entrada compartida para equipos",
          "Automatización de mensajes y seguimientos",
          "Sincronización de contactos y acuerdos",
          "Integraciones vía Webhooks",
          "Agentes de IA para ventas y soporte",
          "Gestión de leads directamente desde WhatsApp"
        ],
        "inLanguage": "es"
      }

      // Add all schemas to head
      addJsonLdSchema(faqSchema, 'faq-pricing-es')
      addJsonLdSchema(webpageSchema, 'webpage-pricing-es')
      addJsonLdSchema(organizationSchema, 'organization-pricing-es')
      addJsonLdSchema(breadcrumbSchema, 'breadcrumb-pricing-es')
      addJsonLdSchema(websiteSchema, 'website-pricing-es')
      addJsonLdSchema(softwareApplicationSchema, 'software-pricing-es')

      // Cleanup function - remove meta tags and schemas when leaving the page
      return () => {
        // Remove all pricing schemas
        const schemaIds = ['faq-pricing-es', 'webpage-pricing-es', 'organization-pricing-es', 'breadcrumb-pricing-es', 'website-pricing-es', 'software-pricing-es']
        schemaIds.forEach(id => {
          const script = document.querySelector(`script[type="application/ld+json"][data-schema="${id}"]`)
          if (script) script.remove()
        })
      }
    }
  }, [location.pathname])
}
