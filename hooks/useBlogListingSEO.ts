import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Blog Listing Page SEO - /blog
 * Adds comprehensive meta tags and JSON-LD schemas for the Eazybe blog page
 * All schemas are crawlable by bots (no @id for SEO)
 */
export const useBlogListingSEO = () => {
  const location = useLocation()

  useEffect(() => {
    // Check if we're on the blog listing page
    const isBlogPage = location.pathname === '/blog' ||
                      location.pathname === '/br/blog' ||
                      location.pathname === '/es/blog' ||
                      location.pathname === '/tr/blog'

    if (isBlogPage) {
      // Determine locale based on path
      const getLocale = (): string => {
        if (location.pathname.startsWith('/br')) return 'pt_BR'
        if (location.pathname.startsWith('/es')) return 'es_ES'
        if (location.pathname.startsWith('/tr')) return 'tr_TR'
        return 'en_US'
      }

      const locale = getLocale()

      // ==================== META TAGS ====================

      // Document title
      document.title = 'Eazybe Blog - WhatsApp CRM Tips, Sales Automation & AI Insights'

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
      setMetaTag('description', 'Explore expert insights on WhatsApp CRM integration, sales automation, team inbox workflows, and AI-powered customer engagement. Learn strategies to grow revenue with Eazybe.')
      setMetaTag('keywords', 'WhatsApp CRM tips, sales automation blog, WhatsApp sales strategies, CRM workflow automation, customer engagement strategies, WhatsApp business growth tips')
      setMetaTag('author', 'Eazybe')
      setMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
      setMetaTag('googlebot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
      setMetaTag('bingbot', 'index, follow')
      setMetaTag('thumbnail', 'https://eazybe.com/logo.png')

      // Article meta tags
      setMetaTag('article:section', 'Technology', true)
      setMetaTag('article:tag', 'WhatsApp CRM Blog', true)

      // Open Graph tags
      setMetaTag('og:type', 'website', true)
      setMetaTag('og:url', 'https://eazybe.com/blog', true)
      setMetaTag('og:title', 'Eazybe Blog | WhatsApp CRM, Sales Automation & AI Strategies', true)
      setMetaTag('og:description', 'Read practical guides on WhatsApp CRM workflows, sales automation, and AI-driven customer engagement. Actionable insights for modern sales teams.', true)
      setMetaTag('og:image', 'https://eazybe.com/logo.png', true)
      setMetaTag('og:image:width', '1200', true)
      setMetaTag('og:image:height', '630', true)
      setMetaTag('og:image:alt', 'Eazybe Blog - WhatsApp CRM and sales automation insights', true)
      setMetaTag('og:locale', locale, true)
      setMetaTag('og:site_name', 'Eazybe', true)

      // Twitter Card tags
      setMetaTag('twitter:card', 'summary_large_image', true)
      setMetaTag('twitter:site', '@eazybe', true)
      setMetaTag('twitter:creator', '@eazybe', true)
      setMetaTag('twitter:title', 'Eazybe Blog - WhatsApp CRM & Sales Automation Insights', true)
      setMetaTag('twitter:description', 'Guides and insights on WhatsApp CRM workflows, AI sales automation, and customer engagement strategies for modern businesses.', true)
      setMetaTag('twitter:image', 'https://eazybe.com/logo.png', true)
      setMetaTag('twitter:image:alt', 'Eazybe Blog - WhatsApp CRM strategies', true)
      setMetaTag('twitter:label1', 'Content Type', true)
      setMetaTag('twitter:data1', 'Blog & Guides', true)
      setMetaTag('twitter:label2', 'Focus', true)
      setMetaTag('twitter:data2', 'CRM, WhatsApp, Sales Automation', true)

      // Mobile web app tags
      setMetaTag('mobile-web-app-capable', 'yes')
      setMetaTag('apple-mobile-web-app-capable', 'yes')
      setMetaTag('apple-mobile-web-app-status-bar-style', 'default')
      setMetaTag('apple-mobile-web-app-title', 'Eazybe')

      // AI and SEO specific meta tags
      setMetaTag('answer-type', 'how-to, guides, best-practices, tutorials')
      setMetaTag('target-audience', 'sales teams, CRM users, founders, marketing teams, support teams, B2B companies')
      setMetaTag('content-intent', 'informational')
      setMetaTag('conversational-query', 'WhatsApp CRM tips, how to automate WhatsApp sales, best CRM workflow practices, AI sales automation guides')
      setMetaTag('ai-readability', 'educational, practical, professional')
      setMetaTag('context-window', 'sales automation, WhatsApp workflows, CRM strategy, team collaboration, customer lifecycle management')
      setMetaTag('user-problem', 'lack of structured WhatsApp sales workflow, manual follow-ups, inefficient CRM usage')
      setMetaTag('solution-summary', 'educational guides and best practices for improving WhatsApp-based sales workflows')
      setMetaTag('primary-benefit', 'learn how to improve sales productivity and customer engagement using WhatsApp and CRM automation')
      setMetaTag('use-case', 'business teams researching WhatsApp CRM strategies and automation methods')
      setMetaTag('implementation-difficulty', 'varies by guide')
      setMetaTag('time-to-value', 'immediate insights from each article')

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
          "name": "Blog",
          "item": "https://eazybe.com/blog"
        }]
      }

      // CollectionPage Schema (for blog listing)
      const collectionPageSchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "url": "https://eazybe.com/blog",
        "name": "Eazybe Blog - WhatsApp CRM Tips, Sales Automation & AI Insights",
        "description": "Explore expert insights on WhatsApp CRM integration, sales automation, team inbox workflows, and AI-powered customer engagement. Learn strategies to grow revenue with Eazybe.",
        "inLanguage": locale === 'pt_BR' ? 'pt-BR' : locale === 'es_ES' ? 'es' : locale === 'tr_TR' ? 'tr' : 'en',
        "about": [
          {
            "@type": "Thing",
            "name": "WhatsApp CRM"
          },
          {
            "@type": "Thing",
            "name": "Sales Automation"
          },
          {
            "@type": "Thing",
            "name": "Customer Engagement"
          }
        ]
      }

      // Organization Schema
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
        "description": "Eazybe helps sales teams connect WhatsApp with CRM platforms to sync conversations, automate follow-ups, and improve customer engagement.",
        "foundingDate": "2021",
        "sameAs": [
          "https://twitter.com/eazybe",
          "https://linkedin.com/company/eazybe",
          "https://youtube.com/@eazybe"
        ],
        "publishingPrinciples": "https://eazybe.com/blog",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "8, The Green STE B",
          "addressLocality": "Dover",
          "addressRegion": "Delaware",
          "postalCode": "19901",
          "addressCountry": "US"
        }
      }

      // WebSite Schema
      const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "url": "https://eazybe.com/",
        "name": "Eazybe",
        "description": "WhatsApp CRM & Sales Automation Platform",
        "publisher": {
          "@type": "Organization",
          "name": "Eazybe",
          "url": "https://eazybe.com/"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://eazybe.com/blog?q={search_term_string}"
          },
          "query-input": {
            "@type": "PropertyValueSpecification",
            "valueRequired": true,
            "valueName": "search_term_string"
          }
        }
      }

      // FAQPage Schema for blog
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What topics does the Eazybe blog cover?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Eazybe blog covers WhatsApp CRM integration tips, sales automation strategies, team inbox workflows, AI-powered customer engagement, CRM workflow automation, and WhatsApp business growth tips for modern sales teams."
            }
          },
          {
            "@type": "Question",
            "name": "How can I improve my WhatsApp sales workflow?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can improve your WhatsApp sales workflow by implementing CRM automation, using AI agents for faster responses, setting up shared inbox workflows, and following best practices for customer engagement outlined in our blog articles."
            }
          },
          {
            "@type": "Question",
            "name": "What CRM platforms integrate with WhatsApp?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Popular CRM platforms that integrate with WhatsApp include HubSpot, Salesforce, Zoho, Bitrix24, LeadSquared, Freshdesk, Pipedrive, and Monday.com. Our blog provides detailed guides for each integration."
            }
          },
          {
            "@type": "Question",
            "name": "How can AI help with WhatsApp sales automation?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "AI can help with WhatsApp sales automation by providing intelligent reply suggestions, summarizing conversations, automating follow-ups, qualifying leads, and helping sales teams respond faster with personalized messages."
            }
          },
          {
            "@type": "Question",
            "name": "Who should read the Eazybe blog?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Eazybe blog is designed for sales teams, CRM users, founders, marketing teams, support teams, and B2B companies looking to improve their customer engagement and sales productivity through WhatsApp and CRM automation."
            }
          }
        ]
      }

      // Add all schemas to head
      addJsonLdSchema(breadcrumbSchema, 'breadcrumb-blog')
      addJsonLdSchema(collectionPageSchema, 'collection-blog')
      addJsonLdSchema(organizationSchema, 'organization-blog')
      addJsonLdSchema(websiteSchema, 'website-blog')
      addJsonLdSchema(faqSchema, 'faq-blog')

      // Cleanup function - remove meta tags and schema when leaving the page
      return () => {
        // Remove breadcrumb schema
        const breadcrumbScript = document.querySelector('script[type="application/ld+json"][data-schema="breadcrumb-blog"]')
        if (breadcrumbScript) breadcrumbScript.remove()
        // Remove collection page schema
        const collectionScript = document.querySelector('script[type="application/ld+json"][data-schema="collection-blog"]')
        if (collectionScript) collectionScript.remove()
        // Remove organization schema
        const orgScript = document.querySelector('script[type="application/ld+json"][data-schema="organization-blog"]')
        if (orgScript) orgScript.remove()
        // Remove website schema
        const websiteScript = document.querySelector('script[type="application/ld+json"][data-schema="website-blog"]')
        if (websiteScript) websiteScript.remove()
        // Remove FAQ schema
        const faqScript = document.querySelector('script[type="application/ld+json"][data-schema="faq-blog"]')
        if (faqScript) faqScript.remove()
      }
    }
  }, [location.pathname])
}
