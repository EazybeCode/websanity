import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * HubSpot Integration Page SEO (Brazilian Portuguese) - /br/hubspot-whatsapp-integration
 * Adds meta tags and JSON-LD schemas for the Brazilian HubSpot WhatsApp Integration page
 * All schemas are crawlable by bots (no @id for SEO)
 */

export const useHubSpotIntegrationSEOBr = () => {
  const location = useLocation()

  useEffect(() => {
    // Check if we're on the Brazilian HubSpot integration page
    const isBrHubSpotPage = location.pathname === '/br/hubspot-whatsapp-integration'

    if (isBrHubSpotPage) {
      // ==================== META TAGS ====================

      // Document title
      document.title = 'HubSpot WhatsApp Integration | Sincronize CRM do WhatsApp'

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
      setMetaTag('description', 'Conecte WhatsApp ao HubSpot CRM. Sincronize conversas, use agentes de IA, acompanhe negócios e gerencie vendas sem sair do HubSpot.')
      setMetaTag('keywords', 'integração WhatsApp HubSpot, HubSpot WhatsApp integração, WhatsApp HubSpot CRM, sincronizar WhatsApp com HubSpot, automação WhatsApp HubSpot, CRM WhatsApp HubSpot, agentes de IA WhatsApp HubSpot')
      setMetaTag('author', 'Eazybe')
      setMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
      setMetaTag('googlebot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
      setMetaTag('bingbot', 'index, follow')
      setMetaTag('thumbnail', 'https://eazybe.com/logo.png')

      // Article meta tags
      setMetaTag('article:published_time', '2026-02-03T08:00:00+00:00', true)
      setMetaTag('article:modified_time', '2026-02-03T10:30:00+00:00', true)
      setMetaTag('article:section', 'Technology', true)
      setMetaTag('article:tag', 'Integração WhatsApp HubSpot', true)

      // Open Graph tags
      setMetaTag('og:type', 'website', true)
      setMetaTag('og:url', 'https://eazybe.com/hubspot-whatsapp-integration', true)
      setMetaTag('og:title', 'HubSpot WhatsApp Integration | Sincronize CRM do WhatsApp', true)
      setMetaTag('og:description', 'Conecte WhatsApp ao HubSpot CRM. Sincronize conversas, use agentes de IA, acompanhe negócios e gerencie vendas sem sair do HubSpot.', true)
      setMetaTag('og:image', 'https://eazybe.com/logo.png', true)
      setMetaTag('og:image:width', '1200', true)
      setMetaTag('og:image:height', '630', true)
      setMetaTag('og:image:alt', 'Integração WhatsApp com HubSpot CRM - Eazybe', true)
      setMetaTag('og:locale', 'pt_BR', true)
      setMetaTag('og:site_name', 'Eazybe', true)

      // Twitter Card tags
      setMetaTag('twitter:card', 'summary_large_image', true)
      setMetaTag('twitter:site', '@eazybe', true)
      setMetaTag('twitter:creator', '@eazybe', true)
      setMetaTag('twitter:title', 'HubSpot WhatsApp Integration | Sincronize CRM do WhatsApp', true)
      setMetaTag('twitter:description', 'Conecte WhatsApp ao HubSpot CRM. Sincronize conversas, use agentes de IA, acompanhe negócios e gerencie vendas sem sair do HubSpot.', true)
      setMetaTag('twitter:image', 'https://eazybe.com/logo.png', true)
      setMetaTag('twitter:image:alt', 'Integração WhatsApp HubSpot CRM da Eazybe', true)
      setMetaTag('twitter:label1', 'Avaliação', true)
      setMetaTag('twitter:data1', '4.7/5', true)
      setMetaTag('twitter:label2', 'Preço', true)
      setMetaTag('twitter:data2', 'Grátis', true)

      // Mobile web app tags
      setMetaTag('mobile-web-app-capable', 'yes')
      setMetaTag('apple-mobile-web-app-capable', 'yes')
      setMetaTag('apple-mobile-web-app-status-bar-style', 'default')
      setMetaTag('apple-mobile-web-app-title', 'Eazybe')

      // AI and SEO specific meta tags
      setMetaTag('answer-type', 'como-fazer, informações-do-produto, comparação-de-recursos')
      setMetaTag('target-audience', 'usuários do HubSpot, equipes de vendas, gestores de CRM, automação de marketing, empresas B2B')
      setMetaTag('content-intent', 'investigação-comercial, transacional')
      setMetaTag('conversational-query', 'como conectar WhatsApp ao HubSpot, melhor integração WhatsApp HubSpot, sincronizar WhatsApp com HubSpot CRM')
      setMetaTag('ai-readability', 'conversacional, profissional, orientado-a-soluções')
      setMetaTag('context-window', 'automação HubSpot, sincronização WhatsApp CRM, acompanhamento de negócios, gestão de pipeline de vendas, WhatsApp dentro do HubSpot')
      setMetaTag('user-problem', 'HubSpot sem WhatsApp, leads perdidos no WhatsApp, atualizações manuais no CRM')
      setMetaTag('solution-summary', 'sincronização automática do WhatsApp com o HubSpot com automação por IA')
      setMetaTag('primary-benefit', 'gerencie conversas do WhatsApp diretamente dentro do HubSpot')
      setMetaTag('use-case', 'equipes de vendas sincronizando conversas do WhatsApp com o HubSpot CRM automaticamente')
      setMetaTag('implementation-difficulty', 'fácil, integração com HubSpot em um clique')
      setMetaTag('time-to-value', 'instantâneo, sincronização do WhatsApp em tempo real')

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
        // Meta tags will be cleaned up naturally or by other SEO hooks
      }
    }
  }, [location.pathname])
}
