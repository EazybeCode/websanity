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

      // FAQPage Schema (Portuguese)
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "inLanguage": "pt-BR",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Posso testar o Eazybe gratuitamente?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sim! Oferecemos um teste gratuito de 14 dias nos planos Starter e Scaler, sem necessidade de cartão de crédito. Você pode explorar todos os recursos e verificar como o Eazybe se integra ao seu fluxo de trabalho antes de contratar."
            }
          },
          {
            "@type": "Question",
            "name": "O que é o Revenue Inbox?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "O Revenue Inbox é um painel inteligente que destaca as conversas do WhatsApp mais importantes que precisam de atenção. Utilizando IA, ele identifica oportunidades de vendas, negociações prioritárias e possíveis escalonamentos que podem passar despercebidos em uma caixa de entrada movimentada."
            }
          },
          {
            "@type": "Question",
            "name": "O que é o RevOps Agent?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "O RevOps Agent é um assistente com inteligência artificial que automatiza tarefas de operações de receita. Ele analisa conversas, atualiza registros no CRM, identifica riscos em negociações e fornece insights acionáveis para ajudar sua equipe a fechar mais vendas."
            }
          },
          {
            "@type": "Question",
            "name": "O que é o WhatsApp Web Copilot?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "O WhatsApp Web Copilot é um assistente de IA que funciona diretamente no WhatsApp Web. Ele ajuda a criar respostas, resumir conversas e oferecer sugestões em tempo real para melhorar a comunicação com clientes."
            }
          },
          {
            "@type": "Question",
            "name": "Como funciona o preço por usuário?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "O pagamento é feito por cada membro da equipe que utiliza ativamente o Eazybe. Um usuário é qualquer pessoa que sincroniza conversas do WhatsApp com o CRM. Administradores que apenas visualizam dados não são contabilizados como usuários."
            }
          },
          {
            "@type": "Question",
            "name": "Com quais CRMs o Eazybe se integra?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "O plano Starter integra com HubSpot, Zoho CRM, Bitrix24 e Google Sheets. O plano Scaler adiciona integrações com Salesforce e Webhooks para CRMs personalizados. O plano Omnis inclui APIs dedicadas e sincronização avançada com negócios e tickets."
            }
          },
          {
            "@type": "Question",
            "name": "Posso mudar de plano depois?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. Ao atualizar, novos recursos ficam disponíveis imediatamente. Ao reduzir o plano, a alteração entra em vigor no próximo ciclo de cobrança."
            }
          },
          {
            "@type": "Question",
            "name": "Meus dados estão seguros?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sim. Utilizamos criptografia de nível bancário de 256 bits para dados em trânsito e em repouso. Somos compatíveis com o GDPR, parceiros oficiais da Meta Business e realizamos auditorias de segurança regularmente."
            }
          }
        ]
      }

      // WebPage Schema (Portuguese)
      const webpageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Preços Eazybe",
        "url": "https://eazybe.com/br/pricing",
        "description": "Conheça os planos e preços do Eazybe para integração do WhatsApp com CRM, automação de vendas e agentes de IA.",
        "inLanguage": "pt-BR",
        "isPartOf": {
          "@type": "WebSite",
          "name": "Eazybe",
          "url": "https://eazybe.com/br"
        },
        "about": [
          { "@type": "Thing", "name": "WhatsApp CRM" },
          { "@type": "Thing", "name": "Automação de Vendas" },
          { "@type": "Thing", "name": "Integração CRM" }
        ]
      }

      // Organization Schema
      const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Eazybe",
        "url": "https://eazybe.com/br",
        "logo": {
          "@type": "ImageObject",
          "url": "https://eazybe.com/logo.png",
          "width": 600,
          "height": 60
        },
        "description": "A Eazybe ajuda equipes a integrar o WhatsApp com CRMs para sincronizar conversas, automatizar follow-ups e aumentar a produtividade em vendas.",
        "foundingDate": "2021",
        "sameAs": [
          "https://twitter.com/eazybe",
          "https://linkedin.com/company/eazybe",
          "https://youtube.com/@eazybe"
        ],
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "8, The Green STE B",
          "addressLocality": "Dover",
          "addressRegion": "Delaware",
          "postalCode": "19901",
          "addressCountry": "US"
        },
        "knowsAbout": [
          "WhatsApp CRM",
          "Integração CRM",
          "Automação de vendas",
          "Caixa de entrada compartilhada",
          "Produtividade no WhatsApp"
        ]
      }

      // BreadcrumbList Schema
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Eazybe",
            "item": "https://eazybe.com/br"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Preços",
            "item": "https://eazybe.com/br/pricing"
          }
        ]
      }

      // WebSite Schema (Portuguese)
      const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "url": "https://eazybe.com/br",
        "name": "Eazybe",
        "description": "Integre o WhatsApp ao CRM, automatize vendas e gerencie conversas com a plataforma Eazybe.",
        "inLanguage": "pt-BR",
        "publisher": {
          "@type": "Organization",
          "name": "Eazybe",
          "logo": {
            "@type": "ImageObject",
            "url": "https://eazybe.com/logo.png"
          }
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://eazybe.com/br/search?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      }

      // Add all schemas to head
      addJsonLdSchema(faqSchema, 'faq-pricing-br')
      addJsonLdSchema(webpageSchema, 'webpage-pricing-br')
      addJsonLdSchema(organizationSchema, 'organization-pricing-br')
      addJsonLdSchema(breadcrumbSchema, 'breadcrumb-pricing-br')
      addJsonLdSchema(websiteSchema, 'website-pricing-br')

      // Cleanup function - remove meta tags and schemas when leaving the page
      return () => {
        // Remove all pricing schemas
        const schemaIds = ['faq-pricing-br', 'webpage-pricing-br', 'organization-pricing-br', 'breadcrumb-pricing-br', 'website-pricing-br']
        schemaIds.forEach(id => {
          const script = document.querySelector(`script[type="application/ld+json"][data-schema="${id}"]`)
          if (script) script.remove()
        })
      }
    }
  }, [location.pathname])
}
