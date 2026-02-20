import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * HubSpot Integration Page SEO - /hubspot-whatsapp-integration
 * Adds meta tags and JSON-LD schemas for the HubSpot WhatsApp Integration page
 * All schemas are crawlable by bots (no @id for SEO)
 */

export const useHubSpotIntegrationSEO = () => {
  const location = useLocation()

  useEffect(() => {
    // Check if we're on the HubSpot integration page (English only - exclude BR which has its own hook)
    const isHubSpotPage = location.pathname === '/hubspot-whatsapp-integration'

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
      setMetaTag('twitter:card', 'summary_large_image', true)
      setMetaTag('twitter:site', '@eazybe', true)
      setMetaTag('twitter:creator', '@eazybe', true)
      setMetaTag('twitter:title', 'HubSpot WhatsApp Integration | Sync CRM With WhatsApp', true)
      setMetaTag('twitter:description', 'Automatically sync WhatsApp chats with HubSpot CRM. Use AI agents, track pipeline activity, and manage customer conversations in one place.', true)
      setMetaTag('twitter:image', 'https://eazybe.com/logo.png', true)
      setMetaTag('twitter:image:alt', 'HubSpot WhatsApp CRM Integration by Eazybe', true)
      setMetaTag('twitter:label1', 'Rating', true)
      setMetaTag('twitter:data1', '4.7/5', true)
      setMetaTag('twitter:label2', 'Price', true)
      setMetaTag('twitter:data2', 'Free', true)

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
            "name": "HubSpot WhatsApp Integration",
            "item": "https://eazybe.com/hubspot-whatsapp-integration"
          }
        ]
      }

      // Organization Schema (without @id)
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
        "image": "https://eazybe.com/logo.png",
        "description": "Eazybe helps sales teams connect WhatsApp with CRM platforms like HubSpot, Zoho, Salesforce, and Google Sheets to sync conversations, automate follow-ups, and improve customer engagement.",
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
            "url": "https://eazybe.com/hubspot-whatsapp-integration",
            "areaServed": "US",
            "availableLanguage": ["English"]
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
        "knowsAbout": ["WhatsApp CRM", "HubSpot WhatsApp integration", "Sales automation", "CRM integration", "AI agents for CRM", "Customer engagement"]
      }

      // WebPage Schema (without @id)
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

      // SoftwareApplication Schema (without @id)
      const softwareApplicationSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "HubSpot WhatsApp Integration - Eazybe",
        "applicationCategory": "BusinessApplication",
        "applicationSubCategory": "CRM Integration, WhatsApp Automation, AI Agents for WhatsApp",
        "operatingSystem": "Web, Chrome Extension",
        "offers": {
          "@type": "AggregateOffer",
          "url": "https://eazybe.com/pricing",
          "priceCurrency": "USD",
          "lowPrice": 1160,
          "highPrice": 1960,
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
          "Automatic WhatsApp to HubSpot sync",
          "AI-powered reply suggestions",
          "Shared inbox for team collaboration",
          "Deal tracking from WhatsApp",
          "Contact synchronization",
          "Message scheduling",
          "AI Agents for Hubspot"
        ]
      }

      // Product Schema (without @id)
      const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "HubSpot WhatsApp Integration - Eazybe",
        "url": "https://eazybe.com/hubspot-whatsapp-integration",
        "image": [
          "https://eazybe.com/logo.png"
        ],
        "description": "Eazybe connects WhatsApp with HubSpot CRM to automatically sync chats, help sales teams respond faster with AI, and manage customer conversations with shared inbox workflows.",
        "brand": {
          "@type": "Brand",
          "name": "Eazybe"
        },
        "manufacturer": {
          "@type": "Organization",
          "name": "Eazybe",
          "url": "https://eazybe.com/"
        },
        "category": "CRM Integration Software",
        "audience": {
          "@type": "BusinessAudience",
          "audienceType": "Sales teams, HubSpot users, CRM managers, B2B businesses"
        },
        "offers": {
          "@type": "AggregateOffer",
          "url": "https://eazybe.com/pricing",
          "priceCurrency": "USD",
          "lowPrice": 1160,
          "highPrice": 1960,
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
        "name": "How to connect WhatsApp to HubSpot CRM using Eazybe",
        "description": "Follow these steps to install Eazybe and sync WhatsApp conversations with HubSpot CRM so your team can track chats, speed up follow-ups, and keep CRM records up to date.",
        "totalTime": "PT5M",
        "estimatedCost": {
          "@type": "MonetaryAmount",
          "currency": "USD",
          "value": "0"
        },
        "supply": [
          {
            "@type": "HowToSupply",
            "name": "Active HubSpot account"
          },
          {
            "@type": "HowToSupply",
            "name": "WhatsApp account with access to WhatsApp Web"
          }
        ],
        "tool": [
          {
            "@type": "HowToTool",
            "name": "Google Chrome (or Chromium-based browser)"
          },
          {
            "@type": "HowToTool",
            "name": "Eazybe Chrome Extension"
          }
        ],
        "step": [
          {
            "@type": "HowToStep",
            "url": "https://eazybe.com/hubspot-whatsapp-integration#step1",
            "name": "Install the Eazybe extension",
            "text": "Open the Chrome Web Store and install the official Eazybe extension in your browser.",
            "image": "https://eazybe.com/logo.png"
          },
          {
            "@type": "HowToStep",
            "url": "https://eazybe.com/hubspot-whatsapp-integration#step2",
            "name": "Open WhatsApp Web",
            "text": "Go to WhatsApp Web on your computer and sign in. The Eazybe panel will appear inside WhatsApp Web.",
            "image": "https://eazybe.com/logo.png"
          },
          {
            "@type": "HowToStep",
            "url": "https://eazybe.com/hubspot-whatsapp-integration#step3",
            "name": "Connect your HubSpot account",
            "text": "In the Eazybe panel, choose HubSpot and complete the authorization flow to connect your CRM securely.",
            "image": "https://eazybe.com/logo.png"
          },
          {
            "@type": "HowToStep",
            "url": "https://eazybe.com/hubspot-whatsapp-integration#step4",
            "name": "Enable chat sync to HubSpot",
            "text": "Select a contact or conversation and enable syncing. WhatsApp messages and customer context will start syncing to HubSpot automatically.",
            "image": "https://eazybe.com/logo.png"
          },
          {
            "@type": "HowToStep",
            "url": "https://eazybe.com/hubspot-whatsapp-integration#step5",
            "name": "Use AI replies and team workflows",
            "text": "Use AI-assisted replies to respond faster and shared inbox workflows to collaborate with your team while keeping HubSpot updated.",
            "image": "https://eazybe.com/logo.png"
          }
        ],
        "inLanguage": "en-US"
      }

      // Add all schemas to head
      addJsonLdSchema(faqSchema, 'faq-hubspot')
      addJsonLdSchema(breadcrumbSchema, 'breadcrumb-hubspot')
      addJsonLdSchema(organizationSchema, 'organization-hubspot')
      addJsonLdSchema(webpageSchema, 'webpage-hubspot')
      addJsonLdSchema(softwareApplicationSchema, 'software-hubspot')
      addJsonLdSchema(productSchema, 'product-hubspot')
      addJsonLdSchema(howToSchema, 'howto-hubspot')

      // Cleanup function - remove meta tags and schema when leaving the page
      return () => {
        // Remove FAQ schema
        const faqScript = document.querySelector('script[type="application/ld+json"][data-schema="faq-hubspot"]')
        if (faqScript) faqScript.remove()
        // Remove breadcrumb schema
        const breadcrumbScript = document.querySelector('script[type="application/ld+json"][data-schema="breadcrumb-hubspot"]')
        if (breadcrumbScript) breadcrumbScript.remove()
        // Remove organization schema
        const orgScript = document.querySelector('script[type="application/ld+json"][data-schema="organization-hubspot"]')
        if (orgScript) orgScript.remove()
        // Remove webpage schema
        const webpageScript = document.querySelector('script[type="application/ld+json"][data-schema="webpage-hubspot"]')
        if (webpageScript) webpageScript.remove()
        // Remove software application schema
        const softwareAppScript = document.querySelector('script[type="application/ld+json"][data-schema="software-hubspot"]')
        if (softwareAppScript) softwareAppScript.remove()
        // Remove product schema
        const productScript = document.querySelector('script[type="application/ld+json"][data-schema="product-hubspot"]')
        if (productScript) productScript.remove()
        // Remove how-to schema
        const howToScript = document.querySelector('script[type="application/ld+json"][data-schema="howto-hubspot"]')
        if (howToScript) howToScript.remove()
      }
    }
  }, [location.pathname])
}
