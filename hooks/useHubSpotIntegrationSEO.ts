import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * HubSpot WhatsApp Integration Page SEO
 * Adds meta tags and JSON-LD schema for /hubspot-whatsapp-integration page
 * All schemas are crawlable by bots (using @id for internal references)
 */

export const useHubSpotIntegrationSEO = () => {
  const location = useLocation()

  useEffect(() => {
    // Check if we're on the HubSpot integration page (including language prefixes)
    const isHubSpotPage = /^\/(pt|es|tr)?\/?hubspot-whatsapp-integration\/?$/.test(location.pathname)

    if (isHubSpotPage) {
      // ==================== META TAGS ====================

      // Document title
      document.title = 'HubSpot WhatsApp Integration With AI Agents | Sync WhatsApp CRM'

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
      setMetaTag('description', 'Connect WhatsApp with HubSpot CRM. Sync chats automatically, use AI agents, track deals, and manage sales conversations directly inside HubSpot.')
      setMetaTag('keywords', 'HubSpot WhatsApp integration, WhatsApp HubSpot CRM, sync WhatsApp with HubSpot, HubSpot WhatsApp automation, WhatsApp CRM HubSpot, AI agents HubSpot WhatsApp')
      setMetaTag('author', 'Eazybe')
      setMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
      setMetaTag('googlebot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
      setMetaTag('bingbot', 'index, follow')
      setMetaTag('thumbnail', 'https://eazybe.com/logo.png')

      // Article meta tags
      setMetaTag('article:published_time', '2026-02-03T08:00:00+00:00', true)
      setMetaTag('article:modified_time', '2026-02-03T10:30:00+00:00', true)
      setMetaTag('article:section', 'Technology', true)
      setMetaTag('article:tag', 'HubSpot WhatsApp Integration', true)

      // Open Graph tags
      setMetaTag('og:type', 'website', true)
      setMetaTag('og:url', 'https://eazybe.com/hubspot-whatsapp-integration', true)
      setMetaTag('og:title', 'HubSpot WhatsApp Integration With AI Agents | Eazybe', true)
      setMetaTag('og:description', 'Sync WhatsApp with HubSpot CRM automatically. Track deals, use AI replies, manage chats, and boost sales productivity directly inside HubSpot.', true)
      setMetaTag('og:image', 'https://eazybe.com/logo.png', true)
      setMetaTag('og:image:width', '1200', true)
      setMetaTag('og:image:height', '630', true)
      setMetaTag('og:image:alt', 'Eazybe HubSpot WhatsApp Integration Platform', true)
      setMetaTag('og:locale', 'en_US', true)
      setMetaTag('og:site_name', 'Eazybe', true)

      // Twitter Card tags
      setMetaTag('twitter:card', 'summary_large_image')
      setMetaTag('twitter:site', '@eazybe')
      setMetaTag('twitter:creator', '@eazybe')
      setMetaTag('twitter:title', 'HubSpot WhatsApp Integration | Sync CRM With WhatsApp')
      setMetaTag('twitter:description', 'Automatically sync WhatsApp chats with HubSpot CRM. Use AI agents, track pipeline activity, and manage customer conversations in one place.')
      setMetaTag('twitter:image', 'https://eazybe.com/logo.png')
      setMetaTag('twitter:image:alt', 'HubSpot WhatsApp CRM Integration by Eazybe')
      setMetaTag('twitter:label1', 'Rating')
      setMetaTag('twitter:data1', '4.7/5')
      setMetaTag('twitter:label2', 'Price')
      setMetaTag('twitter:data2', 'Free')

      // Mobile web app tags
      setMetaTag('mobile-web-app-capable', 'yes')
      setMetaTag('apple-mobile-web-app-capable', 'yes')
      setMetaTag('apple-mobile-web-app-status-bar-style', 'default')
      setMetaTag('apple-mobile-web-app-title', 'Eazybe')

      // AI and SEO specific meta tags
      setMetaTag('answer-type', 'how-to, product-information, feature-comparison')
      setMetaTag('target-audience', 'HubSpot users, sales teams, CRM managers, marketing automation teams, B2B businesses')
      setMetaTag('content-intent', 'commercial-investigation, transactional')
      setMetaTag('conversational-query', 'how to connect WhatsApp to HubSpot, best HubSpot WhatsApp integration, sync WhatsApp with HubSpot CRM')
      setMetaTag('ai-readability', 'conversational, professional, solution-oriented')
      setMetaTag('context-window', 'HubSpot automation, WhatsApp CRM sync, deal tracking, sales pipeline management, WhatsApp inside HubSpot')
      setMetaTag('user-problem', 'HubSpot not connected to WhatsApp, missing WhatsApp leads, manual CRM updates')
      setMetaTag('solution-summary', 'automatic WhatsApp to HubSpot synchronization with AI automation')
      setMetaTag('primary-benefit', 'manage WhatsApp conversations directly inside HubSpot')
      setMetaTag('use-case', 'sales teams syncing WhatsApp conversations with HubSpot CRM automatically')
      setMetaTag('implementation-difficulty', 'easy, one-click HubSpot integration')
      setMetaTag('time-to-value', 'instant, real-time WhatsApp sync')

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
            "name": "How do I connect WhatsApp to HubSpot CRM?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Install Eazybe and connect your HubSpot account. Eazybe syncs WhatsApp chats to HubSpot so conversations and customer context stay linked to the right CRM records."
            }
          },
          {
            "@type": "Question",
            "name": "Does Eazybe sync WhatsApp messages into HubSpot automatically?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Eazybe can sync WhatsApp conversations to HubSpot automatically, reducing manual copy/paste and keeping sales activity up to date."
            }
          },
          {
            "@type": "Question",
            "name": "Can multiple teammates use a shared inbox with HubSpot + WhatsApp?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Eazybe supports shared inbox workflows so teams can collaborate on WhatsApp leads while keeping HubSpot records aligned."
            }
          },
          {
            "@type": "Question",
            "name": "What can AI agents do for HubSpot + WhatsApp conversations?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "AI can help draft replies, summarize conversations, and speed up follow-ups—so reps respond faster while maintaining consistent messaging."
            }
          },
          {
            "@type": "Question",
            "name": "Is this integration safe to use with WhatsApp and HubSpot?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Eazybe is designed for business use cases and focuses on secure workflows for syncing WhatsApp conversations with CRM records. Always review your security and compliance requirements before rollout."
            }
          },
          {
            "@type": "Question",
            "name": "Which HubSpot objects can I associate WhatsApp conversations with?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Most teams associate WhatsApp conversations with contacts and deals to track context across the sales pipeline. The best mapping depends on your HubSpot workflow."
            }
          }
        ]
      }

      // Organization Schema
      const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Eazybe",
        "url": "https://eazybe.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://eazybe.com/logo.png",
          "width": 600,
          "height": 60
        },
        "description": "Eazybe is a HubSpot App Partner that provides WhatsApp CRM integration, helping sales teams sync WhatsApp conversations with HubSpot automatically."
      }

      // BreadcrumbList Schema
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://eazybe.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "HubSpot WhatsApp Integration",
            "item": "https://eazybe.com/hubspot-whatsapp-integration"
          }
        ]
      }

      // WebPage Schema
      const webpageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "url": "https://eazybe.com/hubspot-whatsapp-integration",
        "name": "HubSpot WhatsApp Integration With AI Agents | Sync WhatsApp CRM",
        "description": "Connect WhatsApp with HubSpot CRM. Sync chats automatically, use AI agents, track deals, and manage sales conversations directly inside HubSpot.",
        "inLanguage": "en",
        "datePublished": "2026-02-03T08:00:00+00:00",
        "dateModified": "2026-02-03T10:30:00+00:00"
      }

      // SoftwareApplication Schema
      const softwareApplicationSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Eazybe - HubSpot WhatsApp Integration",
        "applicationCategory": "BusinessApplication",
        "applicationSubCategory": "CRM Integration, WhatsApp Automation",
        "operatingSystem": "Web, Chrome Extension",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.7",
          "bestRating": "5",
          "worstRating": "1",
          "ratingCount": "12453"
        },
        "featureList": [
          "Automatic WhatsApp to HubSpot sync",
          "AI-powered reply suggestions",
          "Shared inbox for team collaboration",
          "Deal tracking from WhatsApp",
          "Contact synchronization",
          "Message scheduling"
        ]
      }

      // Add all schemas to head
      addJsonLdSchema(faqSchema, 'faq-hubspot')
      addJsonLdSchema(organizationSchema, 'organization-hubspot')
      addJsonLdSchema(breadcrumbSchema, 'breadcrumb-hubspot')
      addJsonLdSchema(webpageSchema, 'webpage-hubspot')
      addJsonLdSchema(softwareApplicationSchema, 'software-hubspot')

      // Cleanup function - remove schemas when leaving the page
      return () => {
        const schemas = ['faq-hubspot', 'organization-hubspot', 'breadcrumb-hubspot', 'webpage-hubspot', 'software-hubspot']
        schemas.forEach(id => {
          const script = document.querySelector(`script[type="application/ld+json"][data-schema="${id}"]`)
          if (script) script.remove()
        })
      }
    }
  }, [location.pathname])
}
