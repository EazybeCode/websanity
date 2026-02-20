import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Zoho Integration Page SEO (Brazilian Portuguese) - /br/zoho-whatsapp-integration
 * Adds meta tags for the Brazilian Zoho WhatsApp Integration page
 * All tags are crawlable by bots
 */

export const useZohoIntegrationSEOBr = () => {
  const location = useLocation()

  useEffect(() => {
    // Check if we're on the Brazilian Zoho integration page
    const isBrZohoPage = location.pathname === '/br/zoho-whatsapp-integration'

    if (isBrZohoPage) {
      // Document title
      document.title = 'Zoho WhatsApp Integration e agentes de IA - Eazybe'

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
      setMetaTag('description', 'Conecte WhatsApp ao Zoho CRM. Sincronize conversas, use agentes de IA, acompanhe negócios e gerencie vendas sem sair do Zoho.')
      setMetaTag('keywords', 'integração WhatsApp Zoho, Zoho WhatsApp integração, WhatsApp Zoho CRM, sincronizar WhatsApp com Zoho, automação WhatsApp Zoho, CRM WhatsApp Zoho, agentes de IA WhatsApp Zoho')
      setMetaTag('author', 'Eazybe')
      setMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
      setMetaTag('googlebot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
      setMetaTag('bingbot', 'index, follow')
      setMetaTag('thumbnail', 'https://eazybe.com/logo.png')

      // Article meta tags
      setMetaTag('article:published_time', '2026-02-03T08:00:00+00:00', true)
      setMetaTag('article:modified_time', '2026-02-03T10:30:00+00:00', true)
      setMetaTag('article:section', 'Technology', true)
      setMetaTag('article:tag', 'Integração WhatsApp Zoho', true)

      // Open Graph tags
      setMetaTag('og:type', 'website', true)
      setMetaTag('og:url', 'https://eazybe.com/zoho-whatsapp-integration', true)
      setMetaTag('og:title', 'Zoho WhatsApp Integration e agentes de IA - Eazybe', true)
      setMetaTag('og:description', 'Conecte WhatsApp ao Zoho CRM. Sincronize conversas, use agentes de IA, acompanhe negócios e gerencie vendas sem sair do Zoho.', true)
      setMetaTag('og:image', 'https://eazybe.com/logo.png', true)
      setMetaTag('og:image:width', '1200', true)
      setMetaTag('og:image:height', '630', true)
      setMetaTag('og:image:alt', 'Integração WhatsApp com Zoho CRM - Eazybe', true)
      setMetaTag('og:locale', 'pt_BR', true)
      setMetaTag('og:site_name', 'Eazybe', true)

      // Twitter Card tags
      setMetaTag('twitter:card', 'summary_large_image', true)
      setMetaTag('twitter:site', '@eazybe', true)
      setMetaTag('twitter:creator', '@eazybe', true)
      setMetaTag('twitter:title', 'Zoho WhatsApp Integration e agentes de IA - Eazybe', true)
      setMetaTag('twitter:description', 'Conecte WhatsApp ao Zoho CRM. Sincronize conversas, use agentes de IA, acompanhe negócios e gerencie vendas sem sair do Zoho.', true)
      setMetaTag('twitter:image', 'https://eazybe.com/logo.png', true)
      setMetaTag('twitter:image:alt', 'Integração WhatsApp Zoho CRM da Eazybe', true)
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
      setMetaTag('target-audience', 'usuários do Zoho, equipes de vendas, gestores de CRM, automação de marketing, empresas B2B')
      setMetaTag('content-intent', 'investigação-comercial, transacional')
      setMetaTag('conversational-query', 'como conectar WhatsApp ao Zoho, melhor integração WhatsApp Zoho, sincronizar WhatsApp com Zoho CRM')
      setMetaTag('ai-readability', 'conversacional, profissional, orientado-a-soluções')
      setMetaTag('context-window', 'automação Zoho, sincronização WhatsApp CRM, acompanhamento de negócios, gestão de pipeline de vendas, WhatsApp dentro do Zoho')
      setMetaTag('user-problem', 'Zoho sem WhatsApp, leads perdidos no WhatsApp, atualizações manuais no CRM')
      setMetaTag('solution-summary', 'sincronização automática do WhatsApp com o Zoho com automação por IA')
      setMetaTag('primary-benefit', 'gerencie conversas do WhatsApp diretamente dentro do Zoho')
      setMetaTag('use-case', 'equipes de vendas sincronizando conversas do WhatsApp com o Zoho CRM automaticamente')
      setMetaTag('implementation-difficulty', 'fácil, integração com Zoho em um clique')
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

      // Cleanup function
      return () => {
        // Meta tags will be cleaned up naturally or by other SEO hooks
      }
    }
  }, [location.pathname])
}
