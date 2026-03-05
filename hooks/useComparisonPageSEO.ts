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

      console.log('✅ Comparison Page: SEO meta tags added/updated')
    }
  }, [location.pathname])
}
