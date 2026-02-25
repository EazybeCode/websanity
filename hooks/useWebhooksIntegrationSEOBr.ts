import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Webhooks Integration Page SEO (Brazilian Portuguese) - /br/webhooks-whatsapp-integration
 * Adds meta tags and JSON-LD schemas for the Brazilian Webhooks WhatsApp Integration page
 * All schemas are crawlable by bots (no @id for SEO)
 */

export const useWebhooksIntegrationSEOBr = () => {
  const location = useLocation()

  useEffect(() => {
    // Check if we're on the Brazilian Webhooks integration page
    const isBrWebhooksPage = location.pathname === '/br/webhooks-whatsapp-integration'

    if (isBrWebhooksPage) {
      // ==================== META TAGS ====================

      // Document title
      document.title = 'Webhooks WhatsApp Integration e agentes de IA - Eazybe'

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
      setMetaTag('description', 'Conecte WhatsApp a Webhooks. Sincronize conversas, use agentes de IA, acompanhe negócios e gerencie vendas automaticamente com integrações personalizadas.')
      setMetaTag('keywords', 'integração WhatsApp webhooks, webhooks WhatsApp integração, WhatsApp API webhooks, sincronizar WhatsApp via webhooks, automação WhatsApp webhooks, integração WhatsApp API, agentes de IA WhatsApp automação')
      setMetaTag('author', 'Eazybe')
      setMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
      setMetaTag('googlebot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
      setMetaTag('bingbot', 'index, follow')
      setMetaTag('thumbnail', 'https://eazybe.com/logo.png')

      // Article meta tags
      setMetaTag('article:published_time', '2026-02-03T08:00:00+00:00', true)
      setMetaTag('article:modified_time', '2026-02-03T10:30:00+00:00', true)
      setMetaTag('article:section', 'Technology', true)
      setMetaTag('article:tag', 'Integração WhatsApp Webhooks', true)

      // Open Graph tags
      setMetaTag('og:type', 'website', true)
      setMetaTag('og:url', 'https://eazybe.com/br/webhooks-whatsapp-integration', true)
      setMetaTag('og:title', 'Webhooks WhatsApp Integration e agentes de IA - Eazybe', true)
      setMetaTag('og:description', 'Conecte WhatsApp a Webhooks. Sincronize conversas, use agentes de IA, acompanhe negócios e gerencie vendas automaticamente com integrações personalizadas.', true)
      setMetaTag('og:image', 'https://eazybe.com/logo.png', true)
      setMetaTag('og:image:width', '1200', true)
      setMetaTag('og:image:height', '630', true)
      setMetaTag('og:image:alt', 'Integração WhatsApp via Webhooks - Eazybe', true)
      setMetaTag('og:locale', 'pt_BR', true)
      setMetaTag('og:site_name', 'Eazybe', true)

      // Twitter Card tags
      setMetaTag('twitter:card', 'summary_large_image', true)
      setMetaTag('twitter:site', '@eazybe', true)
      setMetaTag('twitter:creator', '@eazybe', true)
      setMetaTag('twitter:title', 'Webhooks WhatsApp Integration e agentes de IA - Eazybe', true)
      setMetaTag('twitter:description', 'Conecte WhatsApp a Webhooks. Sincronize conversas, use agentes de IA e automatize fluxos de vendas com integrações personalizadas.', true)
      setMetaTag('twitter:image', 'https://eazybe.com/logo.png', true)
      setMetaTag('twitter:image:alt', 'Integração WhatsApp via Webhooks da Eazybe', true)
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
      setMetaTag('target-audience', 'desenvolvedores, equipes de vendas, gestores de CRM, automação de marketing, empresas B2B')
      setMetaTag('content-intent', 'investigação-comercial, transacional')
      setMetaTag('conversational-query', 'como integrar WhatsApp com webhooks, automação WhatsApp via API, integrar WhatsApp com sistemas personalizados')
      setMetaTag('ai-readability', 'conversacional, profissional, orientado-a-soluções')
      setMetaTag('context-window', 'automação WhatsApp API, integração via webhooks, sincronização de dados em tempo real, automação de vendas, WhatsApp integrado a sistemas')
      setMetaTag('user-problem', 'WhatsApp não conectado a sistemas internos, falta de automação, dados isolados em mensagens')
      setMetaTag('solution-summary', 'integração automática do WhatsApp via webhooks com automação por IA')
      setMetaTag('primary-benefit', 'automatize conversas e dados do WhatsApp em qualquer sistema usando webhooks')
      setMetaTag('use-case', 'equipes integrando WhatsApp com sistemas personalizados, CRMs ou plataformas internas via webhooks')
      setMetaTag('implementation-difficulty', 'moderado, integração técnica via API/webhooks')
      setMetaTag('time-to-value', 'rápido, sincronização do WhatsApp em tempo real após configuração')

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
            "name": "Como conecto WhatsApp via webhooks?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Instale o Eazybe e configure webhooks para enviar dados do WhatsApp para seu endpoint preferido. O Eazybe sincroniza os chats do WhatsApp via webhooks para que as conversas se integrem aos seus sistemas existentes."
            }
          },
          {
            "@type": "Question",
            "name": "O Eazybe sincroniza mensagens do WhatsApp via webhooks automaticamente?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sim. O Eazybe pode enviar conversas do WhatsApp para seus endpoints de webhook automaticamente, reduzindo copiar/colar manual e mantendo a atividade de vendas atualizada."
            }
          },
          {
            "@type": "Question",
            "name": "Vários membros da equipe podem usar uma caixa de entrada compartilhada com Webhooks + WhatsApp?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sim. O Eazybe suporta fluxos de trabalho de caixa de entrada compartilhada para que as equipes possam colaborar em leads do WhatsApp enquanto os dados do webhook permanecem sincronizados com seus sistemas."
            }
          },
          {
            "@type": "Question",
            "name": "O que agentes de IA podem fazer por conversas via Webhooks + WhatsApp?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A IA pode ajudar a elaborar respostas, resumir conversas e acelerar follow-ups—para que os representantes respondam mais rápido mantendo uma mensagem consistente."
            }
          },
          {
            "@type": "Question",
            "name": "É seguro usar esta integração com WhatsApp e Webhooks?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "O Eazybe é projetado para casos de uso de negócios e foca em fluxos de trabalho seguros para sincronizar conversas do WhatsApp via webhooks. Sempre revise seus requisitos de segurança e conformidade antes da implementação."
            }
          },
          {
            "@type": "Question",
            "name": "Quais dados posso enviar via webhooks do WhatsApp?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Você pode enviar conteúdo de mensagens, informações de contato, timestamps e metadados para seus endpoints de webhook. Os campos de dados exatos dependem da sua configuração de webhook e requisitos."
            }
          }
        ]
      }

      // Organization Schema
      const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Eazybe",
        "url": "https://eazybe.com/br",
        "logo": { "@type": "ImageObject", "url": "https://eazybe.com/logo.png", "width": 600, "height": 60 },
        "image": "https://eazybe.com/logo.png",
        "description": "A Eazybe ajuda equipes de vendas a conectar WhatsApp com plataformas de CRM, APIs e webhooks para sincronizar conversas, automatizar follow-ups e melhorar o engajamento do cliente.",
        "foundingDate": "2021",
        "sameAs": ["https://twitter.com/eazybe", "https://linkedin.com/company/eazybe", "https://youtube.com/@eazybe"],
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "contactType": "customer support",
            "email": "support@eazybe.com",
            "url": "https://eazybe.com/br/webhooks-whatsapp-integration",
            "areaServed": "BR",
            "availableLanguage": ["Portuguese"]
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
        "knowsAbout": [
          "WhatsApp CRM",
          "integração WhatsApp Webhooks",
          "Automação de vendas",
          "integração API",
          "agentes de IA para WhatsApp",
          "Engajamento do cliente"
        ]
      }

      // BreadcrumbList Schema
      const breadcrumbSchema = {
        "@context": "https://schema.org/",
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
            "name": "Integrações",
            "item": "https://eazybe.com/br/integrations"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Webhooks WhatsApp Integration",
            "item": "https://eazybe.com/br/webhooks-whatsapp-integration"
          }
        ]
      }

      // WebPage Schema
      const webpageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "url": "https://eazybe.com/br/webhooks-whatsapp-integration",
        "name": "Webhooks WhatsApp Integration e agentes de IA - Eazybe",
        "description": "Conecte WhatsApp a Webhooks. Sincronize conversas, use agentes de IA, acompanhe negócios e gerencie vendas automaticamente com integrações personalizadas.",
        "inLanguage": "pt-BR",
        "datePublished": "2026-02-03T08:00:00+00:00",
        "dateModified": "2026-02-03T10:30:00+00:00"
      }

      // SoftwareApplication Schema
      const softwareApplicationSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Integração Webhooks WhatsApp - Eazybe",
        "applicationCategory": "BusinessApplication",
        "applicationSubCategory": "Integração API, Automação WhatsApp, Agentes de IA para WhatsApp",
        "operatingSystem": "Web, Chrome Extension",
        "offers": {
          "@type": "AggregateOffer",
          "url": "https://eazybe.com/br/pricing",
          "priceCurrency": "BRL",
          "lowPrice": 96,
          "highPrice": 162,
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
          "Sincronização automática do WhatsApp para webhooks",
          "Sugestões de resposta alimentadas por IA",
          "Caixa de entrada compartilhada para colaboração em equipe",
          "Envio de dados em tempo real para endpoints",
          "Configuração personalizada de webhooks",
          "Agendamento de mensagens",
          "Agentes de IA para Webhooks"
        ]
      }

      // Product Schema
      const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Integração Webhooks WhatsApp - Eazybe",
        "url": "https://eazybe.com/br/webhooks-whatsapp-integration",
        "image": ["https://eazybe.com/logo.png"],
        "description": "A Eazybe conecta WhatsApp com webhooks para sincronizar chats automaticamente, ajudar equipes de vendas a responder mais rápido com IA e gerenciar conversas do cliente com fluxos de trabalho de caixa de entrada compartilhada.",
        "brand": { "@type": "Brand", "name": "Eazybe" },
        "manufacturer": { "@type": "Organization", "name": "Eazybe", "url": "https://eazybe.com/br" },
        "category": "Software de Integração API",
        "audience": {
          "@type": "BusinessAudience",
          "audienceType": "Equipes de vendas, desenvolvedores, usuários de API, gestores de CRM, empresas B2B"
        },
        "offers": {
          "@type": "AggregateOffer",
          "url": "https://eazybe.com/br/pricing",
          "priceCurrency": "BRL",
          "lowPrice": 96,
          "highPrice": 162,
          "offerCount": 5,
          "availability": "https://schema.org/InStock"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": 4.9,
          "bestRating": 5,
          "worstRating": 1,
          "ratingCount": 53978
        }
      }

      // HowTo Schema
      const howToSchema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "Como conectar WhatsApp a Webhooks usando o Eazybe",
        "description": "Siga estes passos para instalar o Eazybe e sincronizar conversas do WhatsApp com webhooks para que sua equipe possa rastrear chats, acelerar follow-ups e manter sistemas atualizados.",
        "totalTime": "PT5M",
        "estimatedCost": { "@type": "MonetaryAmount", "currency": "BRL", "value": "0" },
        "supply": [
          { "@type": "HowToSupply", "name": "URL do endpoint webhook" },
          { "@type": "HowToSupply", "name": "Conta WhatsApp com acesso ao WhatsApp Web" }
        ],
        "tool": [
          { "@type": "HowToTool", "name": "Google Chrome (ou navegador baseado em Chromium)" },
          { "@type": "HowToTool", "name": "Extensão Eazybe para Chrome" }
        ],
        "step": [
          {
            "@type": "HowToStep",
            "url": "https://eazybe.com/br/webhooks-whatsapp-integration#step1",
            "name": "Instale a extensão Eazybe",
            "text": "Abra a Chrome Web Store e instale a extensão oficial Eazybe no seu navegador.",
            "image": "https://eazybe.com/logo.png"
          },
          {
            "@type": "HowToStep",
            "url": "https://eazybe.com/br/webhooks-whatsapp-integration#step2",
            "name": "Abra o WhatsApp Web",
            "text": "Vá para o WhatsApp Web no seu computador e faça login. O painel Eazybe aparecerá dentro do WhatsApp Web.",
            "image": "https://eazybe.com/logo.png"
          },
          {
            "@type": "HowToStep",
            "url": "https://eazybe.com/br/webhooks-whatsapp-integration#step3",
            "name": "Configure webhooks",
            "text": "No painel Eazybe, escolha Webhooks e insira a URL do seu endpoint para conectar seu sistema com segurança.",
            "image": "https://eazybe.com/logo.png"
          },
          {
            "@type": "HowToStep",
            "url": "https://eazybe.com/br/webhooks-whatsapp-integration#step4",
            "name": "Ative a sincronização de chat via webhooks",
            "text": "Selecione um contato ou conversa e ative a sincronização. As mensagens do WhatsApp e os dados começarão a ser enviados para seu endpoint webhook automaticamente.",
            "image": "https://eazybe.com/logo.png"
          },
          {
            "@type": "HowToStep",
            "url": "https://eazybe.com/br/webhooks-whatsapp-integration#step5",
            "name": "Use respostas de IA e fluxos de trabalho de equipe",
            "text": "Use respostas assistidas por IA para responder mais rápido e fluxos de trabalho de caixa de entrada compartilhada para colaborar com sua equipe mantendo seus sistemas atualizados.",
            "image": "https://eazybe.com/logo.png"
          }
        ],
        "inLanguage": "pt-BR"
      }

      // Add all schemas to head
      addJsonLdSchema(faqSchema, 'faq-webhooks-br')
      addJsonLdSchema(organizationSchema, 'organization-webhooks-br')
      addJsonLdSchema(breadcrumbSchema, 'breadcrumb-webhooks-br')
      addJsonLdSchema(webpageSchema, 'webpage-webhooks-br')
      addJsonLdSchema(softwareApplicationSchema, 'software-webhooks-br')
      addJsonLdSchema(productSchema, 'product-webhooks-br')
      addJsonLdSchema(howToSchema, 'howto-webhooks-br')

      // Cleanup function - remove schemas when leaving the page
      return () => {
        const faqScript = document.querySelector('script[type="application/ld+json"][data-schema="faq-webhooks-br"]')
        if (faqScript) faqScript.remove()
        const orgScript = document.querySelector('script[type="application/ld+json"][data-schema="organization-webhooks-br"]')
        if (orgScript) orgScript.remove()
        const breadcrumbScript = document.querySelector('script[type="application/ld+json"][data-schema="breadcrumb-webhooks-br"]')
        if (breadcrumbScript) breadcrumbScript.remove()
        const webpageScript = document.querySelector('script[type="application/ld+json"][data-schema="webpage-webhooks-br"]')
        if (webpageScript) webpageScript.remove()
        const softwareAppScript = document.querySelector('script[type="application/ld+json"][data-schema="software-webhooks-br"]')
        if (softwareAppScript) softwareAppScript.remove()
        const productScript = document.querySelector('script[type="application/ld+json"][data-schema="product-webhooks-br"]')
        if (productScript) productScript.remove()
        const howToScript = document.querySelector('script[type="application/ld+json"][data-schema="howto-webhooks-br"]')
        if (howToScript) howToScript.remove()
      }
    }
  }, [location.pathname])
}
