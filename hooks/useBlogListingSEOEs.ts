import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Blog Listing Page SEO (Spanish) - /es/blog
 * Adds comprehensive meta tags and JSON-LD schemas for the Eazybe blog page
 * All schemas are crawlable by bots (no @id for SEO)
 */
export const useBlogListingSEOEs = () => {
  const location = useLocation()

  useEffect(() => {
    // Check if we're on the Spanish blog listing page
    const isBlogPage = location.pathname === '/es/blog'

    if (isBlogPage) {
      // Document title
      document.title = 'Blog Eazybe - Consejos CRM de WhatsApp, Automatización de Ventas e Insights de IA'

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

      // Basic meta tags
      setMetaTag('description', 'Explora insights expertos sobre integración de CRM de WhatsApp, automatización de ventas, flujos de trabajo de bandeja de entrada del equipo y participación del cliente con IA. Aprende estrategias para crecer ingresos con Eazybe.')
      setMetaTag('keywords', 'consejos de WhatsApp CRM, blog de automatización de ventas, estrategias de ventas WhatsApp, automatización de flujos de trabajo CRM, estrategias de participación del cliente, consejos de crecimiento empresarial WhatsApp')
      setMetaTag('author', 'Eazybe')
      setMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
      setMetaTag('googlebot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
      setMetaTag('bingbot', 'index, follow')
      setMetaTag('thumbnail', 'https://eazybe.com/logo.png')

      // Article meta tags
      setMetaTag('article:section', 'Tecnología', true)
      setMetaTag('article:tag', 'Blog CRM WhatsApp', true)

      // Open Graph tags
      setMetaTag('og:type', 'website', true)
      setMetaTag('og:url', 'https://eazybe.com/es/blog', true)
      setMetaTag('og:title', 'Blog Eazybe | CRM WhatsApp, Automatización de Ventas y Estrategias de IA', true)
      setMetaTag('og:description', 'Lee guías prácticas sobre flujos de trabajo CRM WhatsApp, automatización de ventas y participación del cliente con IA. Insights accionables para equipos de ventas modernos.', true)
      setMetaTag('og:image', 'https://eazybe.com/logo.png', true)
      setMetaTag('og:image:width', '1200', true)
      setMetaTag('og:image:height', '630', true)
      setMetaTag('og:image:alt', 'Blog Eazybe - Insights de automatización de ventas y CRM WhatsApp', true)
      setMetaTag('og:locale', 'es_ES', true)
      setMetaTag('og:site_name', 'Eazybe', true)

      // Twitter Card tags
      setMetaTag('twitter:card', 'summary_large_image', true)
      setMetaTag('twitter:site', '@eazybe', true)
      setMetaTag('twitter:creator', '@eazybe', true)
      setMetaTag('twitter:title', 'Blog Eazybe - CRM y Automatización de Ventas WhatsApp Insights', true)
      setMetaTag('twitter:description', 'Guías e insights sobre flujos de trabajo CRM WhatsApp, automatización de ventas con IA y estrategias de participación del cliente para empresas modernas.', true)
      setMetaTag('twitter:image', 'https://eazybe.com/logo.png', true)
      setMetaTag('twitter:image:alt', 'Blog Eazybe - Estrategias CRM WhatsApp', true)
      setMetaTag('twitter:label1', 'Tipo de Contenido', true)
      setMetaTag('twitter:data1', 'Blog y Guías', true)
      setMetaTag('twitter:label2', 'Enfoque', true)
      setMetaTag('twitter:data2', 'CRM, WhatsApp, Automatización de Ventas', true)

      // Mobile web app tags
      setMetaTag('mobile-web-app-capable', 'yes')
      setMetaTag('apple-mobile-web-app-capable', 'yes')
      setMetaTag('apple-mobile-web-app-status-bar-style', 'default')
      setMetaTag('apple-mobile-web-app-title', 'Eazybe')

      // AI and SEO specific meta tags
      setMetaTag('answer-type', 'cómo-hacer, guías, mejores-prácticas, tutoriales')
      setMetaTag('target-audience', 'equipos de ventas, usuarios de CRM, fundadores, equipos de marketing, equipos de soporte, empresas B2B')
      setMetaTag('content-intent', 'informacional')
      setMetaTag('conversational-query', 'consejos CRM WhatsApp, cómo automatizar ventas WhatsApp, mejores prácticas de flujo de trabajo CRM, guías de automatización de ventas IA')
      setMetaTag('ai-readability', 'educacional, práctico, profesional')
      setMetaTag('context-window', 'automatización de ventas, flujos de trabajo WhatsApp, estrategia CRM, colaboración en equipo, gestión del ciclo de vida del cliente')
      setMetaTag('user-problem', 'falta de flujo de trabajo de ventas WhatsApp estructurado, seguimientos manuales, uso ineficiente de CRM')
      setMetaTag('solution-summary', 'guías educacionales y mejores prácticas para mejorar flujos de trabajo de ventas basados en WhatsApp')
      setMetaTag('primary-benefit', 'aprende cómo mejorar la productividad de ventas y la participación del cliente usando WhatsApp y automatización de CRM')
      setMetaTag('use-case', 'equipos de empresas investigando estrategias de CRM WhatsApp y métodos de automatización')
      setMetaTag('implementation-difficulty', 'varía por guía')
      setMetaTag('time-to-value', 'insights inmediatos de cada artículo')

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

      // BreadcrumbList Schema (Spanish)
      const breadcrumbSchema = {
        "@context": "https://schema.org/",
        "@type": "BreadcrumbList",
        "itemListElement": [{
          "@type": "ListItem",
          "position": 1,
          "name": "Eazybe",
          "item": "https://eazybe.com/es"
        }, {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": "https://eazybe.com/es/blog"
        }]
      }

      // CollectionPage Schema (Spanish)
      const collectionPageSchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "url": "https://eazybe.com/es/blog",
        "name": "Blog Eazybe - Consejos CRM de WhatsApp, Automatización de Ventas e Insights de IA",
        "description": "Explora insights expertos en integración de CRM de WhatsApp, automatización de ventas, flujos de trabajo de bandeja de entrada compartida y participación del cliente con soporte de IA.",
        "inLanguage": "es",
        "about": [
          {
            "@type": "Thing",
            "name": "WhatsApp CRM"
          },
          {
            "@type": "Thing",
            "name": "Automatización de Ventas"
          },
          {
            "@type": "Thing",
            "name": "Participación del Cliente"
          }
        ]
      }

      // Organization Schema (Spanish)
      const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Eazybe",
        "url": "https://eazybe.com/",
        "logo": {
          "@type": "ImageObject",
          "url": "https://eazybe.com/logo.png",
          "width": 600,
          "height": 60
        },
        "description": "Eazybe ayuda a los equipos de ventas a conectar WhatsApp con plataformas CRM para sincronizar conversaciones, automatizar seguimientos y mejorar la participación del cliente."
      }

      // WebSite Schema (Spanish)
      const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "url": "https://eazybe.com/",
        "name": "Eazybe",
        "description": "Plataforma CRM WhatsApp y Automatización de Ventas"
      }

      // FAQPage Schema (Spanish)
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "¿Qué temas cubre el blog Eazybe?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "El blog Eazybe cubre consejos de integración CRM WhatsApp, estrategias de automatización de ventas, flujos de trabajo de equipo compartido, participación del cliente con soporte de IA, automatización de flujos de trabajo CRM y consejos de crecimiento empresarial WhatsApp."
            }
          },
          {
            "@type": "Question",
            "name": "¿Cómo puedo mejorar mi flujo de ventas de WhatsApp?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Puedes mejorar tu flujo de ventas de WhatsApp implementando automatización CRM, usando agentes de IA para respuestas más rápidas, configurando flujos de trabajo de equipo compartido y siguiendo las mejores prácticas para la participación del cliente descritas en nuestros artículos."
            }
          },
          {
            "@type": "Question",
            "name": "¿Qué plataformas de CRM integran con WhatsApp?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Las plataformas de CRM populares que integran con WhatsApp incluyen HubSpot, Salesforce, Zoho, Bitrix24, LeadSquared, Freshdesk, Pipedrive y Monday.com. Nuestro blog proporciona guías detalladas para cada integración."
            }
          }
        ]
      }

      // SoftwareApplication Schema (Spanish)
      const softwareApplicationSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Integración CRM WhatsApp - Eazybe",
        "applicationCategory": "BusinessApplication",
        "applicationSubCategory": "Integración CRM, Automatización WhatsApp, Agentes de IA para WhatsApp",
        "operatingSystem": "Web, Extensión Chrome",
        "offers": {
          "@type": "AggregateOffer",
          "url": "https://eazybe.com/pricing",
          "priceCurrency": "USD",
          "lowPrice": 29,
          "highPrice": 49,
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
          "Sincronización automática de WhatsApp a CRM",
          "Sugerencias de respuesta impulsadas por IA",
          "Bandeja de entrada compartida para colaboración en equipo",
          "Seguimiento de acuerdos desde WhatsApp",
          "Sincronización de contactos",
          "Programación de mensajes",
          "Agentes de IA para CRM"
        ]
      }

      // Add all schemas to head
      addJsonLdSchema(breadcrumbSchema, 'breadcrumb-blog-es')
      addJsonLdSchema(collectionPageSchema, 'collection-blog-es')
      addJsonLdSchema(organizationSchema, 'organization-blog-es')
      addJsonLdSchema(websiteSchema, 'website-blog-es')
      addJsonLdSchema(faqSchema, 'faq-blog-es')
      addJsonLdSchema(softwareApplicationSchema, 'software-blog-es')

      // Cleanup function
      return () => {
        document.querySelectorAll('script[type="application/ld+json"][data-schema*="-blog-es"]').forEach(el => el.remove())
      }
    }
  }, [location.pathname])
}
