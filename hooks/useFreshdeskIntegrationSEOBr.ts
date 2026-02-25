import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Freshdesk Integration Page SEO (Brazilian Portuguese) - /br/freshdesk-whatsapp-integration
 * Adds meta tags and JSON-LD schemas for the Brazilian Freshdesk WhatsApp Integration page
 * All schemas are crawlable by bots (no @id for SEO)
 */

export const useFreshdeskIntegrationSEOBr = () => {
  const location = useLocation()

  useEffect(() => {
    // Check if we're on the Brazilian Freshdesk integration page
    const isBrFreshdeskPage = location.pathname === '/br/freshdesk-whatsapp-integration'

    if (isBrFreshdeskPage) {
      // ==================== META TAGS ====================

      // Document title
      document.title = 'Freshdesk WhatsApp Integration e agentes de IA - Eazybe'

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
      setMetaTag('description', 'Conecte WhatsApp ao Freshdesk CRM. Sincronize conversas, use agentes de IA, acompanhe negócios e gerencie vendas sem sair do Freshdesk.')
      setMetaTag('keywords', 'integração WhatsApp Freshdesk, Freshdesk WhatsApp integração, WhatsApp Freshdesk CRM, sincronizar WhatsApp com Freshdesk, automação WhatsApp Freshdesk, CRM WhatsApp Freshdesk, agentes de IA WhatsApp Freshdesk')
      setMetaTag('author', 'Eazybe')
      setMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
      setMetaTag('googlebot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
      setMetaTag('bingbot', 'index, follow')
      setMetaTag('thumbnail', 'https://eazybe.com/logo.png')

      // Article meta tags
      setMetaTag('article:published_time', '2026-02-03T08:00:00+00:00', true)
      setMetaTag('article:modified_time', '2026-02-03T10:30:00+00:00', true)
      setMetaTag('article:section', 'Technology', true)
      setMetaTag('article:tag', 'Integração WhatsApp Freshdesk', true)

      // Open Graph tags
      setMetaTag('og:type', 'website', true)
      setMetaTag('og:url', 'https://eazybe.com/br/freshdesk-whatsapp-integration', true)
      setMetaTag('og:title', 'Freshdesk WhatsApp Integration e agentes de IA - Eazybe', true)
      setMetaTag('og:description', 'Conecte WhatsApp ao Freshdesk CRM. Sincronize conversas, use agentes de IA, acompanhe negócios e gerencie vendas sem sair do Freshdesk.', true)
      setMetaTag('og:image', 'https://eazybe.com/logo.png', true)
      setMetaTag('og:image:width', '1200', true)
      setMetaTag('og:image:height', '630', true)
      setMetaTag('og:image:alt', 'Integração WhatsApp com Freshdesk CRM - Eazybe', true)
      setMetaTag('og:locale', 'pt_BR', true)
      setMetaTag('og:site_name', 'Eazybe', true)

      // Twitter Card tags
      setMetaTag('twitter:card', 'summary_large_image', true)
      setMetaTag('twitter:site', '@eazybe', true)
      setMetaTag('twitter:creator', '@eazybe', true)
      setMetaTag('twitter:title', 'Freshdesk WhatsApp Integration e agentes de IA - Eazybe', true)
      setMetaTag('twitter:description', 'Conecte WhatsApp ao Freshdesk CRM. Sincronize conversas, use agentes de IA, acompanhe negócios e gerencie vendas sem sair do Freshdesk.', true)
      setMetaTag('twitter:image', 'https://eazybe.com/logo.png', true)
      setMetaTag('twitter:image:alt', 'Integração WhatsApp Freshdesk CRM da Eazybe', true)
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
      setMetaTag('target-audience', 'usuários do Freshdesk, equipes de vendas, gestores de CRM, automação de marketing, empresas B2B')
      setMetaTag('content-intent', 'investigação-comercial, transacional')
      setMetaTag('conversational-query', 'como conectar WhatsApp ao Freshdesk, melhor integração WhatsApp Freshdesk, sincronizar WhatsApp com Freshdesk CRM')
      setMetaTag('ai-readability', 'conversacional, profissional, orientado-a-soluções')
      setMetaTag('context-window', 'automação Freshdesk, sincronização WhatsApp CRM, acompanhamento de negócios, gestão de pipeline de vendas, WhatsApp dentro do Freshdesk')
      setMetaTag('user-problem', 'Freshdesk sem WhatsApp, leads perdidos no WhatsApp, atualizações manuais no CRM')
      setMetaTag('solution-summary', 'sincronização automática do WhatsApp com o Freshdesk com automação por IA')
      setMetaTag('primary-benefit', 'gerencie conversas do WhatsApp diretamente dentro do Freshdesk')
      setMetaTag('use-case', 'equipes de vendas sincronizando conversas do WhatsApp com o Freshdesk CRM automaticamente')
      setMetaTag('implementation-difficulty', 'fácil, integração com Freshdesk em um clique')
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
            "name": "Como conecto WhatsApp ao Freshdesk CRM?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Instale o Eazybe e conecte sua conta do Freshdesk. O Eazybe sincroniza os chats do WhatsApp para o Freshdesk para que as conversas e o contexto do cliente permaneçam vinculados aos registros certos do CRM."
            }
          },
          {
            "@type": "Question",
            "name": "O Eazybe sincroniza mensagens do WhatsApp para o Freshdesk automaticamente?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sim. O Eazybe pode sincronizar conversas do WhatsApp para o Freshdesk automaticamente, reduzindo copiar/colar manual e mantendo a atividade de vendas atualizada."
            }
          },
          {
            "@type": "Question",
            "name": "Vários membros da equipe podem usar uma caixa de entrada compartilhada com Freshdesk + WhatsApp?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sim. O Eazybe suporta fluxos de trabalho de caixa de entrada compartilhada para que as equipes possam colaborar em leads do WhatsApp enquanto mantêm os registros do Freshdesk alinhados."
            }
          },
          {
            "@type": "Question",
            "name": "O que agentes de IA podem fazer por conversas do Freshdesk + WhatsApp?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A IA pode ajudar a elaborar respostas, resumir conversas e acelerar follow-ups—para que os representantes respondam mais rápido mantendo uma mensagem consistente."
            }
          },
          {
            "@type": "Question",
            "name": "É seguro usar esta integração com WhatsApp e Freshdesk?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "O Eazybe é projetado para casos de uso de negócios e foca em fluxos de trabalho seguros para sincronizar conversas do WhatsApp com registros do CRM. Sempre revise seus requisitos de segurança e conformidade antes da implementação."
            }
          },
          {
            "@type": "Question",
            "name": "Quais entidades do Freshdesk posso associar às conversas do WhatsApp?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A maioria das equipes associa conversas do WhatsApp a contatos e tickets para rastrear o contexto através do pipeline de suporte ao cliente. O melhor mapeamento depende do seu fluxo de trabalho do Freshdesk."
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
        "description": "A Eazybe ajuda equipes de vendas a conectar WhatsApp com plataformas de CRM como HubSpot, Zoho, Salesforce, Bitrix24, LeadSquared, Freshdesk e Google Sheets para sincronizar conversas, automatizar follow-ups e melhorar o engajamento do cliente.",
        "foundingDate": "2021",
        "sameAs": ["https://twitter.com/eazybe", "https://linkedin.com/company/eazybe", "https://youtube.com/@eazybe"],
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "contactType": "customer support",
            "email": "support@eazybe.com",
            "url": "https://eazybe.com/br/freshdesk-whatsapp-integration",
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
          "integração WhatsApp Freshdesk",
          "Automação de vendas",
          "integração CRM",
          "agentes de IA para CRM",
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
            "name": "Freshdesk WhatsApp Integration",
            "item": "https://eazybe.com/br/freshdesk-whatsapp-integration"
          }
        ]
      }

      // WebPage Schema
      const webpageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "url": "https://eazybe.com/br/freshdesk-whatsapp-integration",
        "name": "Freshdesk WhatsApp Integration e agentes de IA - Eazybe",
        "description": "Conecte WhatsApp ao Freshdesk CRM. Sincronize conversas, use agentes de IA, acompanhe negócios e gerencie vendas sem sair do Freshdesk.",
        "inLanguage": "pt-BR",
        "datePublished": "2026-02-03T08:00:00+00:00",
        "dateModified": "2026-02-03T10:30:00+00:00"
      }

      // SoftwareApplication Schema
      const softwareApplicationSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Integração Freshdesk WhatsApp - Eazybe",
        "applicationCategory": "BusinessApplication",
        "applicationSubCategory": "Integração CRM, Automação WhatsApp, Agentes de IA para WhatsApp",
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
          "Sincronização automática do WhatsApp para o Freshdesk",
          "Sugestões de resposta alimentadas por IA",
          "Caixa de entrada compartilhada para colaboração em equipe",
          "Acompanhamento de tickets do WhatsApp",
          "Sincronização de contatos",
          "Agendamento de mensagens",
          "Agentes de IA para Freshdesk"
        ]
      }

      // Product Schema
      const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Integração Freshdesk WhatsApp - Eazybe",
        "url": "https://eazybe.com/br/freshdesk-whatsapp-integration",
        "image": ["https://eazybe.com/logo.png"],
        "description": "A Eazybe conecta WhatsApp com o Freshdesk CRM para sincronizar chats automaticamente, ajudar equipes de vendas a responder mais rápido com IA e gerenciar conversas do cliente com fluxos de trabalho de caixa de entrada compartilhada.",
        "brand": { "@type": "Brand", "name": "Eazybe" },
        "manufacturer": { "@type": "Organization", "name": "Eazybe", "url": "https://eazybe.com/br" },
        "category": "Software de Integração CRM",
        "audience": {
          "@type": "BusinessAudience",
          "audienceType": "Equipes de vendas, usuários do Freshdesk, gestores de CRM, empresas B2B"
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
        "name": "Como conectar WhatsApp ao Freshdesk CRM usando o Eazybe",
        "description": "Siga estes passos para instalar o Eazybe e sincronizar conversas do WhatsApp com o Freshdesk CRM para que sua equipe possa rastrear chats, acelerar follow-ups e manter registros do CRM atualizados.",
        "totalTime": "PT5M",
        "estimatedCost": { "@type": "MonetaryAmount", "currency": "BRL", "value": "0" },
        "supply": [
          { "@type": "HowToSupply", "name": "Conta Freshdesk ativa" },
          { "@type": "HowToSupply", "name": "Conta WhatsApp com acesso ao WhatsApp Web" }
        ],
        "tool": [
          { "@type": "HowToTool", "name": "Google Chrome (ou navegador baseado em Chromium)" },
          { "@type": "HowToTool", "name": "Extensão Eazybe para Chrome" }
        ],
        "step": [
          {
            "@type": "HowToStep",
            "url": "https://eazybe.com/br/freshdesk-whatsapp-integration#step1",
            "name": "Instale a extensão Eazybe",
            "text": "Abra a Chrome Web Store e instale a extensão oficial Eazybe no seu navegador.",
            "image": "https://eazybe.com/logo.png"
          },
          {
            "@type": "HowToStep",
            "url": "https://eazybe.com/br/freshdesk-whatsapp-integration#step2",
            "name": "Abra o WhatsApp Web",
            "text": "Vá para o WhatsApp Web no seu computador e faça login. O painel Eazybe aparecerá dentro do WhatsApp Web.",
            "image": "https://eazybe.com/logo.png"
          },
          {
            "@type": "HowToStep",
            "url": "https://eazybe.com/br/freshdesk-whatsapp-integration#step3",
            "name": "Conecte sua conta do Freshdesk",
            "text": "No painel Eazybe, escolha Freshdesk e complete o fluxo de autorização para conectar seu CRM com segurança.",
            "image": "https://eazybe.com/logo.png"
          },
          {
            "@type": "HowToStep",
            "url": "https://eazybe.com/br/freshdesk-whatsapp-integration#step4",
            "name": "Ative a sincronização de chat para o Freshdesk",
            "text": "Selecione um contato ou conversa e ative a sincronização. As mensagens do WhatsApp e o contexto do cliente começarão a sincronizar para o Freshdesk automaticamente.",
            "image": "https://eazybe.com/logo.png"
          },
          {
            "@type": "HowToStep",
            "url": "https://eazybe.com/br/freshdesk-whatsapp-integration#step5",
            "name": "Use respostas de IA e fluxos de trabalho de equipe",
            "text": "Use respostas assistidas por IA para responder mais rápido e fluxos de trabalho de caixa de entrada compartilhada para colaborar com sua equipe mantendo o Freshdesk atualizado.",
            "image": "https://eazybe.com/logo.png"
          }
        ],
        "inLanguage": "pt-BR"
      }

      // Add all schemas to head
      addJsonLdSchema(faqSchema, 'faq-freshdesk-br')
      addJsonLdSchema(organizationSchema, 'organization-freshdesk-br')
      addJsonLdSchema(breadcrumbSchema, 'breadcrumb-freshdesk-br')
      addJsonLdSchema(webpageSchema, 'webpage-freshdesk-br')
      addJsonLdSchema(softwareApplicationSchema, 'software-freshdesk-br')
      addJsonLdSchema(productSchema, 'product-freshdesk-br')
      addJsonLdSchema(howToSchema, 'howto-freshdesk-br')

      // Cleanup function - remove schemas when leaving the page
      return () => {
        const faqScript = document.querySelector('script[type="application/ld+json"][data-schema="faq-freshdesk-br"]')
        if (faqScript) faqScript.remove()
        const orgScript = document.querySelector('script[type="application/ld+json"][data-schema="organization-freshdesk-br"]')
        if (orgScript) orgScript.remove()
        const breadcrumbScript = document.querySelector('script[type="application/ld+json"][data-schema="breadcrumb-freshdesk-br"]')
        if (breadcrumbScript) breadcrumbScript.remove()
        const webpageScript = document.querySelector('script[type="application/ld+json"][data-schema="webpage-freshdesk-br"]')
        if (webpageScript) webpageScript.remove()
        const softwareAppScript = document.querySelector('script[type="application/ld+json"][data-schema="software-freshdesk-br"]')
        if (softwareAppScript) softwareAppScript.remove()
        const productScript = document.querySelector('script[type="application/ld+json"][data-schema="product-freshdesk-br"]')
        if (productScript) productScript.remove()
        const howToScript = document.querySelector('script[type="application/ld+json"][data-schema="howto-freshdesk-br"]')
        if (howToScript) howToScript.remove()
      }
    }
  }, [location.pathname])
}
