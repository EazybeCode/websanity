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

      // Cleanup function - remove meta tags when leaving the page
      return () => {
        // Note: We keep some meta tags as they might be used globally
        // Only remove pricing-specific tags if needed
      }
    }
  }, [location.pathname])
}
