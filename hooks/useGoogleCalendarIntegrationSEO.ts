import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Google Calendar Integration Page SEO - /google-calendar-whatsapp-integration
 * Adds meta tags and JSON-LD schemas for the Google Calendar WhatsApp Integration page
 * All schemas are crawlable by bots (no @id for SEO)
 */

export const useGoogleCalendarIntegrationSEO = () => {
  const location = useLocation()

  useEffect(() => {
    // Check if we're on the Google Calendar integration page (with or without language prefix)
    const isGoogleCalendarPage = /^\/[a-z]{2}\/?google-calendar-whatsapp-integration/.test(location.pathname) ||
                                 location.pathname === '/google-calendar-whatsapp-integration'

    if (isGoogleCalendarPage) {
      // ==================== META TAGS ====================

      // Document title
      document.title = 'Google Calendar WhatsApp Integration With AI Agents - Eazybe'

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
      setMetaTag('description', 'Connect WhatsApp with Google Calendar. Sync chats automatically, use AI agents, track deals, and manage sales conversations directly inside Google Calendar.')
      setMetaTag('keywords', 'Google Calendar WhatsApp integration, WhatsApp Google Calendar, sync WhatsApp with Google Calendar, Google Calendar WhatsApp automation, WhatsApp Google Calendar, AI agents Google Calendar WhatsApp')
      setMetaTag('author', 'Eazybe')
      setMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
      setMetaTag('googlebot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
      setMetaTag('bingbot', 'index, follow')
      setMetaTag('thumbnail', 'https://eazybe.com/logo.png')

      // Article meta tags
      setMetaTag('article:published_time', '2026-02-03T08:00:00+00:00', true)
      setMetaTag('article:modified_time', '2026-02-03T10:30:00+00:00', true)
      setMetaTag('article:section', 'Technology', true)
      setMetaTag('article:tag', 'Google Calendar WhatsApp Integration', true)

      // Open Graph tags
      setMetaTag('og:type', 'website', true)
      setMetaTag('og:url', 'https://eazybe.com/google-calendar-whatsapp-integration', true)
      setMetaTag('og:title', 'Google Calendar WhatsApp Integration With AI Agents | Eazybe', true)
      setMetaTag('og:description', 'Sync WhatsApp with Google Calendar automatically. Track deals, use AI replies, manage chats, and boost sales productivity directly inside Google Calendar.', true)
      setMetaTag('og:image', 'https://eazybe.com/logo.png', true)
      setMetaTag('og:image:width', '1200', true)
      setMetaTag('og:image:height', '630', true)
      setMetaTag('og:image:alt', 'Google Calendar WhatsApp Integration Platform - Eazybe', true)
      setMetaTag('og:locale', 'en_US', true)
      setMetaTag('og:site_name', 'Eazybe', true)

      // Twitter Card tags
      setMetaTag('twitter:card', 'summary_large_image', true)
      setMetaTag('twitter:site', '@eazybe', true)
      setMetaTag('twitter:creator', '@eazybe', true)
      setMetaTag('twitter:title', 'Google Calendar WhatsApp Integration | Sync Google Calendar With WhatsApp', true)
      setMetaTag('twitter:description', 'Automatically sync WhatsApp chats with Google Calendar. Use AI agents, track pipeline activity, and manage customer conversations in one place.', true)
      setMetaTag('twitter:image', 'https://eazybe.com/logo.png', true)
      setMetaTag('twitter:image:alt', 'Google Calendar WhatsApp Integration by Eazybe', true)
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
      setMetaTag('target-audience', 'Google Calendar users, sales teams, CRM managers, marketing automation teams, B2B businesses')
      setMetaTag('content-intent', 'commercial-investigation, transactional')
      setMetaTag('conversational-query', 'how to connect WhatsApp to Google Calendar, best Google Calendar WhatsApp integration, sync WhatsApp with Google Calendar')
      setMetaTag('ai-readability', 'conversational, professional, solution-oriented')
      setMetaTag('context-window', 'Google Calendar automation, WhatsApp Google Calendar sync, deal tracking, sales pipeline management, WhatsApp inside Google Calendar')
      setMetaTag('user-problem', 'Google Calendar not connected to WhatsApp, missing WhatsApp leads, manual Google Calendar updates')
      setMetaTag('solution-summary', 'automatic WhatsApp to Google Calendar synchronization with AI automation')
      setMetaTag('primary-benefit', 'manage WhatsApp conversations directly inside Google Calendar')
      setMetaTag('use-case', 'sales teams syncing WhatsApp conversations with Google Calendar automatically')
      setMetaTag('implementation-difficulty', 'easy, one-click Google Calendar integration')
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
            "name": "How do I connect WhatsApp to Google Calendar?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Install Eazybe and connect your Google account. Eazybe syncs WhatsApp chats to Google Calendar so conversations and customer context stay linked to your calendar events."
            }
          },
          {
            "@type": "Question",
            "name": "Does Eazybe sync WhatsApp messages into Google Calendar automatically?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Eazybe can sync WhatsApp conversations to Google Calendar automatically, creating events and reminders from your chats."
            }
          },
          {
            "@type": "Question",
            "name": "Can multiple teammates use a shared inbox with Google Calendar + WhatsApp?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Eazybe supports shared inbox workflows so teams can collaborate on WhatsApp leads while keeping Google Calendar events synchronized."
            }
          },
          {
            "@type": "Question",
            "name": "What can AI agents do for Google Calendar + WhatsApp conversations?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "AI can help draft replies, summarize conversations, and automatically create calendar events—so reps never miss follow-ups."
            }
          },
          {
            "@type": "Question",
            "name": "Is this integration safe to use with WhatsApp and Google Calendar?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Eazybe is designed for business use cases and focuses on secure workflows for syncing WhatsApp conversations with Google Calendar. Always review your security and compliance requirements before rollout."
            }
          },
          {
            "@type": "Question",
            "name": "What Google Calendar data can I sync with WhatsApp conversations?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Most teams sync WhatsApp conversations to create events, set reminders, and track follow-ups directly in Google Calendar. The best mapping depends on your workflow."
            }
          }
        ]
      }

      // BreadcrumbList Schema (without @id)
      const breadcrumbSchema = {
        "@context": "https://schema.org/",
        "@type": "BreadcrumbList",
        "itemListElement": [{
          "@type": "ListItem",
          "position": 1,
          "name": "Eazybe",
          "item": "https://eazybe.com/"
        },{
          "@type": "ListItem",
          "position": 2,
          "name": "Integrations",
          "item": "https://eazybe.com/integrations"
        },{
          "@type": "ListItem",
          "position": 3,
          "name": "Google Calendar WhatsApp Integration",
          "item": "https://eazybe.com/google-calendar-whatsapp-integration"
        }]
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
        "description": "Eazybe helps sales teams connect WhatsApp with productivity tools like Google Calendar, HubSpot, Zoho, and Salesforce to sync conversations, automate follow-ups, and improve customer engagement.",
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
            "url": "https://eazybe.com/google-calendar-whatsapp-integration",
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
        "knowsAbout": ["WhatsApp CRM", "Google Calendar WhatsApp integration", "Sales automation", "Calendar integration", "AI agents for WhatsApp", "Customer engagement"]
      }

      // WebPage Schema (without @id)
      const webpageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "url": "https://eazybe.com/google-calendar-whatsapp-integration",
        "name": "Google Calendar WhatsApp Integration With AI Agents | Sync WhatsApp CRM",
        "description": "Connect WhatsApp with Google Calendar. Sync chats automatically, use AI agents, track deals, and manage sales conversations directly inside Google Calendar.",
        "inLanguage": "en",
        "datePublished": "2026-02-03T08:00:00+00:00",
        "dateModified": "2026-02-03T10:30:00+00:00"
      }

      // SoftwareApplication Schema (without @id)
      const softwareApplicationSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Google Calendar WhatsApp Integration - Eazybe",
        "applicationCategory": "BusinessApplication",
        "applicationSubCategory": "Calendar Integration, WhatsApp Automation, AI Agents for WhatsApp",
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
          "ratingCount": 53978
        },
        "featureList": [
          "Automatic WhatsApp to Google Calendar sync",
          "AI-powered reply suggestions",
          "Shared inbox for team collaboration",
          "Event creation from WhatsApp",
          "Reminder scheduling",
          "Message scheduling",
          "AI Agents for Google Calendar"
        ]
      }

      // Product Schema (without @id)
      const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Google Calendar WhatsApp Integration - Eazybe",
        "url": "https://eazybe.com/google-calendar-whatsapp-integration",
        "image": [
          "https://eazybe.com/logo.png"
        ],
        "description": "Eazybe connects WhatsApp with Google Calendar to automatically sync chats, create events from conversations, help sales teams respond faster with AI, and manage customer communications.",
        "brand": {
          "@type": "Brand",
          "name": "Eazybe"
        },
        "manufacturer": {
          "@type": "Organization",
          "name": "Eazybe",
          "url": "https://eazybe.com/"
        },
        "category": "Calendar Integration Software",
        "audience": {
          "@type": "BusinessAudience",
          "audienceType": "Sales teams, Google Calendar users, productivity managers, B2B businesses"
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
        "name": "How to connect WhatsApp to Google Calendar using Eazybe",
        "description": "Follow these steps to install Eazybe and sync WhatsApp conversations with Google Calendar so your team can track chats, create events, and never miss follow-ups.",
        "totalTime": "PT5M",
        "estimatedCost": {
          "@type": "MonetaryAmount",
          "currency": "USD",
          "value": "0"
        },
        "supply": [
          {
            "@type": "HowToSupply",
            "name": "Active Google account"
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
            "url": "https://eazybe.com/google-calendar-whatsapp-integration#step1",
            "name": "Install the Eazybe extension",
            "text": "Open the Chrome Web Store and install the official Eazybe extension in your browser.",
            "image": "https://eazybe.com/logo.png"
          },
          {
            "@type": "HowToStep",
            "url": "https://eazybe.com/google-calendar-whatsapp-integration#step2",
            "name": "Open WhatsApp Web",
            "text": "Go to WhatsApp Web on your computer and sign in. The Eazybe panel will appear inside WhatsApp Web.",
            "image": "https://eazybe.com/logo.png"
          },
          {
            "@type": "HowToStep",
            "url": "https://eazybe.com/google-calendar-whatsapp-integration#step3",
            "name": "Connect your Google account",
            "text": "In the Eazybe panel, choose Google Calendar and complete the authorization flow to connect your account securely.",
            "image": "https://eazybe.com/logo.png"
          },
          {
            "@type": "HowToStep",
            "url": "https://eazybe.com/google-calendar-whatsapp-integration#step4",
            "name": "Enable chat sync to Google Calendar",
            "text": "Select a contact or conversation and enable syncing. WhatsApp messages will start creating events and reminders in Google Calendar automatically.",
            "image": "https://eazybe.com/logo.png"
          },
          {
            "@type": "HowToStep",
            "url": "https://eazybe.com/google-calendar-whatsapp-integration#step5",
            "name": "Use AI replies and event automation",
            "text": "Use AI-assisted replies to respond faster and automatically create calendar events from WhatsApp conversations.",
            "image": "https://eazybe.com/logo.png"
          }
        ],
        "inLanguage": "en-US"
      }

      // Add all schemas to head
      addJsonLdSchema(faqSchema, 'faq-googlecalendar')
      addJsonLdSchema(breadcrumbSchema, 'breadcrumb-googlecalendar')
      addJsonLdSchema(organizationSchema, 'organization-googlecalendar')
      addJsonLdSchema(webpageSchema, 'webpage-googlecalendar')
      addJsonLdSchema(softwareApplicationSchema, 'software-googlecalendar')
      addJsonLdSchema(productSchema, 'product-googlecalendar')
      addJsonLdSchema(howToSchema, 'howto-googlecalendar')

      // Cleanup function - remove meta tags and schema when leaving the page
      return () => {
        // Remove FAQ schema
        const faqScript = document.querySelector('script[type="application/ld+json"][data-schema="faq-googlecalendar"]')
        if (faqScript) faqScript.remove()
        // Remove breadcrumb schema
        const breadcrumbScript = document.querySelector('script[type="application/ld+json"][data-schema="breadcrumb-googlecalendar"]')
        if (breadcrumbScript) breadcrumbScript.remove()
        // Remove organization schema
        const orgScript = document.querySelector('script[type="application/ld+json"][data-schema="organization-googlecalendar"]')
        if (orgScript) orgScript.remove()
        // Remove webpage schema
        const webpageScript = document.querySelector('script[type="application/ld+json"][data-schema="webpage-googlecalendar"]')
        if (webpageScript) webpageScript.remove()
        // Remove software application schema
        const softwareAppScript = document.querySelector('script[type="application/ld+json"][data-schema="software-googlecalendar"]')
        if (softwareAppScript) softwareAppScript.remove()
        // Remove product schema
        const productScript = document.querySelector('script[type="application/ld+json"][data-schema="product-googlecalendar"]')
        if (productScript) productScript.remove()
        // Remove how-to schema
        const howToScript = document.querySelector('script[type="application/ld+json"][data-schema="howto-googlecalendar"]')
        if (howToScript) howToScript.remove()
      }
    }
  }, [location.pathname])
}
