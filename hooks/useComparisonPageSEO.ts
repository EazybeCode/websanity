import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Comparison Page SEO - /comparison
 * Adds comprehensive meta tags for the Eazybe comparison page
 * Ensures the page is crawlable for all bots for better indexing and ranking
 */
export const useComparisonPageSEO = () => {
  const location = useLocation()

  useEffect(() => {
    // Check if we're on the comparison page
    const isComparisonPage = location.pathname === '/comparison'

    if (isComparisonPage) {
      // ==================== META TAGS ====================

      // Document title
      document.title = 'Comparison'

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
      setMetaTag('description', 'Unlock the full potential of WhatsApp Web with Eazybe\'s unmatched productivity features. Compare Eazybe vs others on features, support, pricing, and more!')
      setMetaTag('keywords', 'Eazybe comparison, Eazybe vs others, WhatsApp CRM comparison, WhatsApp automation tools comparison, WhatsApp Web productivity tools, WhatsApp CRM alternatives')
      setMetaTag('author', 'Eazybe')
      setMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
      setMetaTag('googlebot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
      setMetaTag('bingbot', 'index, follow')
      setMetaTag('thumbnail', 'https://eazybe.com/logo.png')

      // Open Graph tags
      setMetaTag('og:type', 'website', true)
      setMetaTag('og:url', 'https://eazybe.com/comparison', true)
      setMetaTag('og:title', 'Comparison', true)
      setMetaTag('og:description', 'Unlock the full potential of WhatsApp Web with Eazybe\'s unmatched productivity features. Compare Eazybe vs others on features, support, pricing, and more!', true)
      setMetaTag('og:image', 'https://eazybe.com/logo.png', true)
      setMetaTag('og:image:width', '1200', true)
      setMetaTag('og:image:height', '630', true)
      setMetaTag('og:image:alt', 'Eazybe vs other WhatsApp CRM tools comparison', true)
      setMetaTag('og:locale', 'en_US', true)
      setMetaTag('og:site_name', 'Eazybe', true)

      // Twitter Card tags
      setMetaTag('twitter:card', 'summary_large_image', true)
      setMetaTag('twitter:site', '@eazybe', true)
      setMetaTag('twitter:creator', '@eazybe', true)
      setMetaTag('twitter:title', 'Comparison', true)
      setMetaTag('twitter:description', 'Unlock the full potential of WhatsApp Web with Eazybe. Compare Eazybe vs other tools across features, support, pricing, and productivity.', true)
      setMetaTag('twitter:image', 'https://eazybe.com/logo.png', true)
      setMetaTag('twitter:image:alt', 'Eazybe WhatsApp CRM comparison', true)
      setMetaTag('twitter:label1', 'Content Type', true)
      setMetaTag('twitter:data1', 'Comparison Guide', true)
      setMetaTag('twitter:label2', 'Platform', true)
      setMetaTag('twitter:data2', 'WhatsApp CRM Tools', true)

      // Mobile web app tags
      setMetaTag('mobile-web-app-capable', 'yes')
      setMetaTag('apple-mobile-web-app-capable', 'yes')
      setMetaTag('apple-mobile-web-app-status-bar-style', 'default')
      setMetaTag('apple-mobile-web-app-title', 'Eazybe')

      // AI and SEO specific meta tags
      setMetaTag('answer-type', 'comparison, guide, feature-comparison')
      setMetaTag('target-audience', 'sales teams, support leaders, CX managers, SaaS founders, operations teams')
      setMetaTag('content-intent', 'informational, commercial-investigation')
      setMetaTag('conversational-query', 'Eazybe vs alternatives, WhatsApp CRM comparison, best WhatsApp productivity tools, WhatsApp CRM tools comparison')
      setMetaTag('ai-readability', 'professional, comparison-focused')
      setMetaTag('context-window', 'WhatsApp Web productivity, CRM integration, shared inbox, AI replies, sales automation')
      setMetaTag('user-problem', 'finding the best WhatsApp productivity and CRM integration tool')
      setMetaTag('solution-summary', 'compare Eazybe with other WhatsApp productivity and CRM tools')
      setMetaTag('primary-benefit', 'choose the best WhatsApp CRM and automation tool faster')
      setMetaTag('use-case', 'teams comparing WhatsApp CRM and productivity tools before adoption')
      setMetaTag('implementation-difficulty', 'easy setup')
      setMetaTag('time-to-value', 'instant productivity improvements')

      // Link tags
      setLinkTag('canonical', 'https://eazybe.com/comparison')

      // ==================== JSON-LD SCHEMAS ====================

      // Helper function to add JSON-LD schema
      const addJsonLdSchema = (schema: Record<string, unknown>, id: string) => {
        let script = document.querySelector(`script[type="application/ld+json"][data-schema="${id}"]`)
        if (!script) {
          script = document.createElement('script')
          script.type = 'application/ld+json'
          ;(script as HTMLScriptElement).setAttribute('data-schema', id)
          document.head.appendChild(script)
        }
        script.textContent = JSON.stringify(schema)
      }

      // WebPage Schema
      const webpageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "url": "https://eazybe.com/comparison",
        "name": "Comparison | WhatsApp CRM Tools & WhatsApp Web Productivity - Eazybe",
        "description": "Unlock the full potential of WhatsApp Web with Eazybe's productivity features. Compare Eazybe vs other WhatsApp CRM tools on features, support, pricing, and more.",
        "inLanguage": "en-US",
        "isPartOf": {
          "@type": "WebSite",
          "url": "https://eazybe.com/",
          "name": "Eazybe"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Eazybe",
          "url": "https://eazybe.com/",
          "logo": {
            "@type": "ImageObject",
            "url": "https://eazybe.com/logo.png",
            "width": 600,
            "height": 60
          }
        },
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": "https://eazybe.com/logo.png",
          "width": 1200,
          "height": 630
        },
        "about": [
          { "@type": "Thing", "name": "WhatsApp CRM comparison" },
          { "@type": "Thing", "name": "WhatsApp automation tools" },
          { "@type": "Thing", "name": "WhatsApp Web productivity" },
          { "@type": "Thing", "name": "Shared team inbox" },
          { "@type": "Thing", "name": "AI replies for WhatsApp" }
        ]
      }

      // Organization Schema
      const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Eazybe",
        "url": "https://eazybe.com/",
        "logo": { "@type": "ImageObject", "url": "https://eazybe.com/logo.png", "width": 600, "height": 60 },
        "image": "https://eazybe.com/logo.png",
        "description": "Eazybe helps sales teams connect WhatsApp with CRM platforms to sync conversations, automate follow-ups, and improve customer engagement.",
        "foundingDate": "2021",
        "sameAs": ["https://twitter.com/eazybe", "https://linkedin.com/company/eazybe", "https://youtube.com/@eazybe"],
        "publishingPrinciples": "https://eazybe.com/comparison",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "8, The Green STE B",
          "addressLocality": "Dover",
          "addressRegion": "Delaware",
          "postalCode": "19901",
          "addressCountry": "US"
        },
        "knowsAbout": ["WhatsApp CRM", "CRM integration", "Sales automation", "Shared inbox", "WhatsApp productivity"]
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

      // BreadcrumbList Schema
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Eazybe", "item": "https://eazybe.com/" },
          { "@type": "ListItem", "position": 2, "name": "Comparison", "item": "https://eazybe.com/comparison" }
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

      // SoftwareApplication Schema
      const softwareApplicationSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Eazybe",
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

      // FAQPage Schema
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [{
          "@type": "Question",
          "name": "How does Eazybe compare to other WhatsApp CRMs?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Eazybe outperforms 20+ WhatsApp CRM platforms including Wati, Interakt, QuickReply, Cooby, Timelines, and Rasayel. We offer 70% cost savings, exclusive AI features like WhatsApp Web Copilot and Revenue Inbox, more CRM integrations including Salesforce, and features no one else has like WhatsApp Chat Backup."
          }
        },{
          "@type": "Question",
          "name": "Why is Eazybe more affordable than competitors?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Eazybe starts at just $13/month while competitors charge $25-$49/month. We believe powerful WhatsApp CRM should be accessible to all businesses. Our efficient operations and larger user base (50,000+) allow us to offer premium features at a fraction of the cost."
          }
        },{
          "@type": "Question",
          "name": "What exclusive features does Eazybe offer?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Eazybe offers exclusive features you won't find anywhere else: WhatsApp Chat Backup, Salesforce Integration, WhatsApp Web Copilot, Revenue Inbox, RevOps Agent, AI Unreplied Chats Agent, and Bitrix24 Integration. These features are not available on Wati, Interakt, QuickReply, Cooby, Timelines, or Rasayel."
          }
        },{
          "@type": "Question",
          "name": "Is Eazybe suitable for enterprise teams?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely! Eazybe serves businesses of all sizes. Our Omnis plan includes dedicated APIs, unlimited message sync, Revenue Inbox, RevOps Agent, and a dedicated account manager for enterprise teams. We scale with your business needs."
          }
        },{
          "@type": "Question",
          "name": "Can I migrate from another platform?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! We make migration easy from any WhatsApp CRM platform. Import your existing contacts, messages, and workflows. Our team provides free migration support for annual plans to ensure a smooth transition from Wati, Interakt, QuickReply, Cooby, or any other platform."
          }
        },{
          "@type": "Question",
          "name": "What integrations does Eazybe support?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Eazybe integrates with 10+ platforms including HubSpot, Salesforce, Zoho CRM, Bitrix24, Google Sheets, Pipedrive, Monday.com, LeadSquared, Freshdesk, Google Calendar, and custom webhooks for any other platform. More integrations than any other WhatsApp CRM."
          }
        },{
          "@type": "Question",
          "name": "Is there a free trial?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! We offer a 7-day free trial on all plans with no credit card required. You can explore all features, test integrations, and see how Eazybe fits your workflow before committing."
          }
        }]
      }

      // Add all schemas to head
      addJsonLdSchema(webpageSchema, 'webpage-comparison')
      addJsonLdSchema(organizationSchema, 'organization-comparison')
      addJsonLdSchema(integrationsSchema, 'integrations-comparison')
      addJsonLdSchema(breadcrumbSchema, 'breadcrumb-comparison')
      addJsonLdSchema(websiteSchema, 'website-comparison')
      addJsonLdSchema(softwareApplicationSchema, 'software-comparison')
      addJsonLdSchema(faqSchema, 'faq-comparison')

      console.log('✅ Comparison Page: SEO meta tags and JSON-LD schemas added/updated')

      // Cleanup function - remove schemas when leaving the page
      return () => {
        const schemaIds = ['webpage-comparison', 'organization-comparison', 'integrations-comparison', 'breadcrumb-comparison', 'website-comparison', 'software-comparison', 'faq-comparison']
        schemaIds.forEach(id => {
          const script = document.querySelector(`script[type="application/ld+json"][data-schema="${id}"]`)
          if (script) script.remove()
        })
        console.log('🧹 Comparison Page: JSON-LD schemas removed')
      }
    }
  }, [location.pathname])
}
