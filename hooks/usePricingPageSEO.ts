import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Pricing Page SEO - /pricing
 * Adds comprehensive meta tags and JSON-LD schemas for the Eazybe pricing page
 * All schemas are crawlable by bots (no @id for SEO)
 */
export const usePricingPageSEO = () => {
  const location = useLocation()

  useEffect(() => {
    // Check if we're on the pricing page
    const isPricingPage = location.pathname === '/pricing'

    if (isPricingPage) {
      // ==================== META TAGS ====================

      // Document title
      document.title = 'Pricing'

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
      setMetaTag('description', 'Eazybe pricing plans for WhatsApp CRM integration. Sync conversations, automate follow-ups, use AI agents, and manage sales workflows with flexible plans for teams and businesses.')
      setMetaTag('keywords', 'Eazybe pricing, WhatsApp CRM pricing, WhatsApp CRM plans, CRM WhatsApp integration cost, WhatsApp automation pricing, shared inbox pricing, sales automation software pricing')
      setMetaTag('author', 'Eazybe')
      setMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
      setMetaTag('googlebot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
      setMetaTag('bingbot', 'index, follow')
      setMetaTag('thumbnail', 'https://eazybe.com/logo.png')

      // Open Graph tags
      setMetaTag('og:type', 'website', true)
      setMetaTag('og:url', 'https://eazybe.com/pricing', true)
      setMetaTag('og:title', 'Eazybe Pricing | WhatsApp CRM Integration Plans', true)
      setMetaTag('og:description', 'Compare Eazybe pricing plans and choose the best WhatsApp CRM solution for your sales team. Automate conversations, track leads, and scale customer engagement.', true)
      setMetaTag('og:image', 'https://eazybe.com/logo.png', true)
      setMetaTag('og:image:width', '1200', true)
      setMetaTag('og:image:height', '630', true)
      setMetaTag('og:image:alt', 'Eazybe WhatsApp CRM Pricing Plans', true)
      setMetaTag('og:locale', 'en_US', true)
      setMetaTag('og:site_name', 'Eazybe', true)

      // Twitter Card tags
      setMetaTag('twitter:card', 'summary_large_image', true)
      setMetaTag('twitter:site', '@eazybe', true)
      setMetaTag('twitter:creator', '@eazybe', true)
      setMetaTag('twitter:title', 'Eazybe Pricing | WhatsApp CRM Plans & Features', true)
      setMetaTag('twitter:description', 'View Eazybe pricing plans to integrate WhatsApp with your CRM, automate follow-ups, and improve sales productivity with AI-powered workflows.', true)
      setMetaTag('twitter:image', 'https://eazybe.com/logo.png', true)
      setMetaTag('twitter:image:alt', 'Eazybe Pricing for WhatsApp CRM Integration', true)
      setMetaTag('twitter:label1', 'Plan Type', true)
      setMetaTag('twitter:data1', 'Subscription', true)
      setMetaTag('twitter:label2', 'Starting Price', true)
      setMetaTag('twitter:data2', 'Flexible Plans Available', true)

      // Mobile web app tags
      setMetaTag('mobile-web-app-capable', 'yes')
      setMetaTag('apple-mobile-web-app-capable', 'yes')
      setMetaTag('apple-mobile-web-app-status-bar-style', 'default')
      setMetaTag('apple-mobile-web-app-title', 'Eazybe')

      // AI and SEO specific meta tags
      setMetaTag('answer-type', 'pricing, product-information, feature-comparison')
      setMetaTag('target-audience', 'sales teams, CRM managers, startups, SMBs, enterprise businesses, customer support teams')
      setMetaTag('content-intent', 'transactional, commercial-investigation')
      setMetaTag('conversational-query', 'Eazybe pricing, WhatsApp CRM pricing plans, cost of WhatsApp CRM integration, Eazybe subscription plans')
      setMetaTag('ai-readability', 'clear, conversion-focused, professional')
      setMetaTag('context-window', 'WhatsApp CRM pricing, sales automation plans, shared inbox pricing, AI automation subscription')
      setMetaTag('user-problem', 'unclear WhatsApp CRM pricing, manual sales workflows, disconnected communication tools')
      setMetaTag('solution-summary', 'transparent pricing plans for WhatsApp CRM automation and team collaboration')
      setMetaTag('primary-benefit', 'choose the right WhatsApp CRM plan for your business growth')
      setMetaTag('use-case', 'teams comparing WhatsApp CRM pricing before purchase')
      setMetaTag('implementation-difficulty', 'easy setup')
      setMetaTag('time-to-value', 'instant after activation')

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

      // SoftwareApplication Schema
      const softwareApplicationSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "WhatsApp CRM Integration - Eazybe",
        "applicationCategory": "BusinessApplication",
        "applicationSubCategory": "CRM Integration, WhatsApp Automation, AI Agents for WhatsApp",
        "operatingSystem": "Web, Chrome Extension",
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
          "Automatic WhatsApp to CRM sync",
          "AI-powered reply suggestions",
          "Shared inbox for team collaboration",
          "Deal tracking from WhatsApp",
          "Contact synchronization",
          "Message scheduling",
          "AI Agents for CRM"
        ]
      }

      // WebSite Schema
      const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "url": "https://eazybe.com/",
        "name": "Eazybe",
        "description": "Eazybe helps teams integrate WhatsApp with CRM and business tools to sync chats, automate workflows, and improve sales productivity.",
        "inLanguage": "en-US",
        "publisher": {
          "@type": "Organization",
          "name": "Eazybe",
          "url": "https://eazybe.com/",
          "logo": { "@type": "ImageObject", "url": "https://eazybe.com/logo.png", "width": 600, "height": 60 }
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": { "@type": "EntryPoint", "urlTemplate": "https://eazybe.com/search?q={search_term_string}" },
          "query-input": "required name=search_term_string"
        }
      }

      // BreadcrumbList Schema
      const breadcrumbSchema = {
        "@context": "https://schema.org/",
        "@type": "BreadcrumbList",
        "itemListElement": [{
          "@type": "ListItem",
          "position": 1,
          "name": "Eazybe",
          "item": "https://eazybe.com/"
        }, {
          "@type": "ListItem",
          "position": 2,
          "name": "Pricing",
          "item": "https://eazybe.com/pricing"
        }]
      }

      // WebPage Schema
      const webpageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Eazybe Pricing",
        "url": "https://eazybe.com/pricing",
        "description": "Explore Eazybe pricing plans for WhatsApp CRM integration, sales automation, AI agents, and shared team inbox solutions.",
        "inLanguage": "en-US",
        "isPartOf": {
          "@type": "WebSite",
          "name": "Eazybe",
          "url": "https://eazybe.com"
        },
        "about": [
          { "@type": "Thing", "name": "WhatsApp CRM" },
          { "@type": "Thing", "name": "Sales Automation" },
          { "@type": "Thing", "name": "CRM Integration" }
        ]
      }

      // ItemList Schema (Integrations)
      const integrationsSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Eazybe Integrations",
        "description": "WhatsApp integrations supported by Eazybe.",
        "itemListOrder": "https://schema.org/ItemListUnordered",
        "numberOfItems": 11,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "item": {
              "@type": "SoftwareApplication",
              "name": "HubSpot WhatsApp Integration",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web, Chrome Extension",
              "url": "https://eazybe.com/hubspot-whatsapp-integration"
            }
          },
          {
            "@type": "ListItem",
            "position": 2,
            "item": {
              "@type": "SoftwareApplication",
              "name": "Salesforce WhatsApp Integration",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web, Chrome Extension",
              "url": "https://eazybe.com/salesforce-whatsapp-integration"
            }
          },
          {
            "@type": "ListItem",
            "position": 3,
            "item": {
              "@type": "SoftwareApplication",
              "name": "Zoho WhatsApp Integration",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web, Chrome Extension",
              "url": "https://eazybe.com/zoho-whatsapp-integration"
            }
          },
          {
            "@type": "ListItem",
            "position": 4,
            "item": {
              "@type": "SoftwareApplication",
              "name": "Bitrix24 WhatsApp Integration",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web, Chrome Extension",
              "url": "https://eazybe.com/bitrix24-whatsapp-integration"
            }
          },
          {
            "@type": "ListItem",
            "position": 5,
            "item": {
              "@type": "SoftwareApplication",
              "name": "LeadSquared WhatsApp Integration",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web, Chrome Extension",
              "url": "https://eazybe.com/leadsquared-whatsapp-integration"
            }
          },
          {
            "@type": "ListItem",
            "position": 6,
            "item": {
              "@type": "SoftwareApplication",
              "name": "Freshdesk WhatsApp Integration",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web, Chrome Extension",
              "url": "https://eazybe.com/freshdesk-whatsapp-integration"
            }
          },
          {
            "@type": "ListItem",
            "position": 7,
            "item": {
              "@type": "SoftwareApplication",
              "name": "Google Sheets WhatsApp Integration",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web, Chrome Extension",
              "url": "https://eazybe.com/google-sheets-whatsapp-integration"
            }
          },
          {
            "@type": "ListItem",
            "position": 8,
            "item": {
              "@type": "SoftwareApplication",
              "name": "Webhooks & Custom Integrations",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web, Chrome Extension",
              "url": "https://eazybe.com/webhooks-whatsapp-integration"
            }
          },
          {
            "@type": "ListItem",
            "position": 9,
            "item": {
              "@type": "SoftwareApplication",
              "name": "Pipedrive WhatsApp Integration",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web, Chrome Extension",
              "url": "https://eazybe.com/pipedrive-whatsapp-integration"
            }
          },
          {
            "@type": "ListItem",
            "position": 10,
            "item": {
              "@type": "SoftwareApplication",
              "name": "Monday WhatsApp Integrations",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web, Chrome Extension",
              "url": "https://eazybe.com/monday-whatsapp-integration"
            }
          },
          {
            "@type": "ListItem",
            "position": 11,
            "item": {
              "@type": "SoftwareApplication",
              "name": "Google WhatsApp Integrations",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web, Chrome Extension",
              "url": "https://eazybe.com/google-calendar-whatsapp-integration"
            }
          }
        ]
      }

      // FAQPage Schema
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [{
          "@type": "Question",
          "name": "Can I try Eazybe for free?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! We offer a 14-day free trial on Starter and Scaler plans. No credit card required. You can explore all features and see how Eazybe integrates with your existing workflow before committing."
          }
        }, {
          "@type": "Question",
          "name": "What is Revenue Inbox?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Revenue Inbox is our intelligent dashboard that surfaces the most important WhatsApp conversations that need attention. It uses AI to identify hot deals, escalations, and opportunities you might miss in a busy inbox."
          }
        }, {
          "@type": "Question",
          "name": "What is RevOps Agent?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "RevOps Agent is our AI-powered assistant that automates revenue operations tasks. It can analyze conversations, update CRM records, identify deal risks, and provide actionable insights to help you close more deals."
          }
        }, {
          "@type": "Question",
          "name": "What is WhatsApp Web Copilot?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "WhatsApp Web Copilot is our AI assistant that works directly in your WhatsApp Web interface. It helps you draft responses, summarize conversations, and provides real-time suggestions to improve your customer communication."
          }
        }, {
          "@type": "Question",
          "name": "How does per-user pricing work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You pay for each team member who actively uses Eazybe. A user is anyone who syncs their WhatsApp conversations to your CRM. Admins who only view data don't count as users."
          }
        }, {
          "@type": "Question",
          "name": "Which CRMs do you integrate with?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Starter integrates with HubSpot, Zoho CRM, Bitrix24, and Google Sheets. Scaler adds Salesforce and webhook integrations for custom CRMs. Omnis includes dedicated APIs and sync to deals/tickets."
          }
        }, {
          "@type": "Question",
          "name": "Can I switch plans later?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely! You can upgrade or downgrade your plan at any time. When upgrading, you get immediate access to new features. When downgrading, the change takes effect at your next billing cycle."
          }
        }, {
          "@type": "Question",
          "name": "Is my data secure?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. We use bank-grade 256-bit encryption for all data in transit and at rest. We are GDPR compliant, Meta Business Partner verified, and undergo regular security audits."
          }
        }]
      }

      // Add all schemas to head
      addJsonLdSchema(softwareApplicationSchema, 'software-pricing')
      addJsonLdSchema(websiteSchema, 'website-pricing')
      addJsonLdSchema(breadcrumbSchema, 'breadcrumb-pricing')
      addJsonLdSchema(webpageSchema, 'webpage-pricing')
      addJsonLdSchema(integrationsSchema, 'integrations-pricing')
      addJsonLdSchema(faqSchema, 'faq-pricing')

      // Cleanup function - remove meta tags and schemas when leaving the page
      return () => {
        // Remove all pricing schemas
        const schemaIds = ['software-pricing', 'website-pricing', 'breadcrumb-pricing', 'webpage-pricing', 'integrations-pricing', 'faq-pricing']
        schemaIds.forEach(id => {
          const script = document.querySelector(`script[type="application/ld+json"][data-schema="${id}"]`)
          if (script) script.remove()
        })
      }
    }
  }, [location.pathname])
}
