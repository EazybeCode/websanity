import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Pricing Page SEO (Portuguese) - /br/pricing
 * Adds comprehensive meta tags and JSON-LD schemas for the Eazybe pricing page
 * All schemas are crawlable by bots (no @id for SEO)
 */
export const usePricingPageSEOBr = () => {
  const location = useLocation()

  useEffect(() => {
    // Check if we're on the Portuguese pricing page
    const isPricingPage = location.pathname === '/br/pricing'

    if (isPricingPage) {
      // ==================== META TAGS ====================

      // Document title
      document.title = 'Preços'

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
      setMetaTag('description', 'Conheça os planos e preços do Eazybe para integrar WhatsApp ao CRM, automatizar follow-ups e gerenciar vendas com agentes de IA.')
      setMetaTag('keywords', 'preços Eazybe, preço CRM WhatsApp, planos CRM com WhatsApp, custo integração WhatsApp CRM, automação WhatsApp preço, inbox compartilhada preço, software de automação de vendas preço')
      setMetaTag('author', 'Eazybe')
      setMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
      setMetaTag('googlebot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
      setMetaTag('bingbot', 'index, follow')
      setMetaTag('thumbnail', 'https://eazybe.com/logo.png')

      // Open Graph tags
      setMetaTag('og:type', 'website', true)
      setMetaTag('og:url', 'https://eazybe.com/br/pricing', true)
      setMetaTag('og:title', 'Preços Eazybe | Planos de CRM com WhatsApp', true)
      setMetaTag('og:description', 'Compare os planos do Eazybe e escolha a melhor solução de CRM integrado ao WhatsApp para sua equipe de vendas. Automatize conversas, acompanhe leads e escale o atendimento.', true)
      setMetaTag('og:image', 'https://eazybe.com/logo.png', true)
      setMetaTag('og:image:width', '1200', true)
      setMetaTag('og:image:height', '630', true)
      setMetaTag('og:image:alt', 'Planos e preços do CRM WhatsApp Eazybe', true)
      setMetaTag('og:locale', 'pt_BR', true)
      setMetaTag('og:site_name', 'Eazybe', true)

      // Twitter Card tags
      setMetaTag('twitter:card', 'summary_large_image', true)
      setMetaTag('twitter:site', '@eazybe', true)
      setMetaTag('twitter:creator', '@eazybe', true)
      setMetaTag('twitter:title', 'Preços Eazybe | Planos de CRM com WhatsApp', true)
      setMetaTag('twitter:description', 'Veja os planos do Eazybe para integrar WhatsApp ao CRM, automatizar follow-ups e aumentar a produtividade da sua equipe com IA.', true)
      setMetaTag('twitter:image', 'https://eazybe.com/logo.png', true)
      setMetaTag('twitter:image:alt', 'Preços do Eazybe para integração WhatsApp CRM', true)
      setMetaTag('twitter:label1', 'Tipo de plano', true)
      setMetaTag('twitter:data1', 'Assinatura', true)
      setMetaTag('twitter:label2', 'Preço inicial', true)
      setMetaTag('twitter:data2', 'Planos flexíveis disponíveis', true)

      // Mobile web app tags
      setMetaTag('mobile-web-app-capable', 'yes')
      setMetaTag('apple-mobile-web-app-capable', 'yes')
      setMetaTag('apple-mobile-web-app-status-bar-style', 'default')
      setMetaTag('apple-mobile-web-app-title', 'Eazybe')

      // AI and SEO specific meta tags
      setMetaTag('answer-type', 'preços, informações-do-produto, comparação-de-planos')
      setMetaTag('target-audience', 'equipes de vendas, gestores de CRM, startups, pequenas e médias empresas, empresas corporativas, equipes de atendimento')
      setMetaTag('content-intent', 'transacional, investigação-comercial')
      setMetaTag('conversational-query', 'preços Eazybe, planos CRM WhatsApp, custo integração WhatsApp CRM, assinatura Eazybe')
      setMetaTag('ai-readability', 'claro, profissional, orientado à conversão')
      setMetaTag('context-window', 'preços CRM WhatsApp, planos de automação de vendas, preço inbox compartilhada, assinatura automação com IA')
      setMetaTag('user-problem', 'falta de clareza nos preços do CRM WhatsApp, processos manuais de vendas, comunicação desconectada')
      setMetaTag('solution-summary', 'planos transparentes para automação do WhatsApp e colaboração entre equipes')
      setMetaTag('primary-benefit', 'escolha o plano ideal de CRM WhatsApp para crescer seu negócio')
      setMetaTag('use-case', 'equipes comparando preços de CRM WhatsApp antes da contratação')
      setMetaTag('implementation-difficulty', 'configuração fácil')
      setMetaTag('time-to-value', 'valor imediato após ativação')

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
