import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Google Sheets Integration Page SEO (BR) - /br/google-sheets-whatsapp-integration
 * Adds meta tags and JSON-LD schemas for the Google Sheets WhatsApp Integration page (Brazilian Portuguese)
 * All schemas are crawlable by bots (no @id for SEO)
 */

export const useGoogleSheetsIntegrationSEOBr = () => {
  const location = useLocation()

  useEffect(() => {
    // Check if we're on the BR Google Sheets integration page
    const isGoogleSheetsBrPage = location.pathname === '/br/google-sheets-whatsapp-integration'

    if (isGoogleSheetsBrPage) {
      // ==================== META TAGS ====================

      // Document title
      document.title = 'Integração WhatsApp com Google Calendar e agentes de IA - Eazybe'

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
      setMetaTag('description', 'Conecte WhatsApp ao Google Calendar. Sincronize mensagens, automatize agendamentos, use agentes de IA e gerencie reuniões e clientes diretamente no seu calendário.')
      setMetaTag('keywords', 'integração WhatsApp Google Calendar, WhatsApp Google Agenda, sincronizar WhatsApp com Google Calendar, automação WhatsApp calendário, WhatsApp agenda automática, agentes de IA WhatsApp Google Calendar')
      setMetaTag('author', 'Eazybe')
      setMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
      setMetaTag('googlebot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
      setMetaTag('bingbot', 'index, follow')
      setMetaTag('thumbnail', 'https://eazybe.com/logo.png')

      // Article meta tags
      setMetaTag('article:published_time', '2026-02-03T08:00:00+00:00', true)
      setMetaTag('article:modified_time', '2026-02-03T10:30:00+00:00', true)
      setMetaTag('article:section', 'Technology', true)
      setMetaTag('article:tag', 'Integração WhatsApp Google Calendar', true)

      // Open Graph tags
      setMetaTag('og:type', 'website', true)
      setMetaTag('og:url', 'https://eazybe.com/google-calendar-whatsapp-integration', true)
      setMetaTag('og:title', 'Integração WhatsApp com Google Calendar e IA | Eazybe', true)
      setMetaTag('og:description', 'Integre WhatsApp ao Google Calendar para automatizar agendamentos, sincronizar conversas e organizar reuniões com ajuda de IA.', true)
      setMetaTag('og:image', 'https://eazybe.com/logo.png', true)
      setMetaTag('og:image:width', '1200', true)
      setMetaTag('og:image:height', '630', true)
      setMetaTag('og:image:alt', 'Integração WhatsApp com Google Calendar - Eazybe', true)
      setMetaTag('og:locale', 'pt_BR', true)
      setMetaTag('og:site_name', 'Eazybe', true)

      // Twitter Card tags
      setMetaTag('twitter:card', 'summary_large_image', true)
      setMetaTag('twitter:site', '@eazybe', true)
      setMetaTag('twitter:creator', '@eazybe', true)
      setMetaTag('twitter:title', 'Integração WhatsApp Google Calendar | Automatize Agendamentos', true)
      setMetaTag('twitter:description', 'Sincronize WhatsApp com Google Calendar, automatize reuniões, use IA e organize interações com clientes diretamente no calendário.', true)
      setMetaTag('twitter:image', 'https://eazybe.com/logo.png', true)
      setMetaTag('twitter:image:alt', 'Integração WhatsApp Google Calendar da Eazybe', true)
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
      setMetaTag('answer-type', 'como-fazer, informações-do-produto, automação')
      setMetaTag('target-audience', 'profissionais, equipes de vendas, agências, empresas B2B, usuários do Google Workspace')
      setMetaTag('content-intent', 'investigação-comercial, transacional')
      setMetaTag('conversational-query', 'como integrar WhatsApp com Google Calendar, automatizar reuniões WhatsApp, sincronizar mensagens com agenda')
      setMetaTag('ai-readability', 'conversacional, profissional, orientado-a-soluções')
      setMetaTag('context-window', 'automação de agendamentos, integração WhatsApp agenda, gestão de reuniões, WhatsApp com Google Workspace')
      setMetaTag('user-problem', 'reuniões marcadas manualmente no WhatsApp, falta de organização na agenda, perda de compromissos')
      setMetaTag('solution-summary', 'sincronização automática do WhatsApp com Google Calendar usando automação e IA')
      setMetaTag('primary-benefit', 'automatize agendamentos e gerencie reuniões do WhatsApp direto no calendário')
      setMetaTag('use-case', 'empresas sincronizando mensagens do WhatsApp com eventos e reuniões no Google Calendar')
      setMetaTag('implementation-difficulty', 'fácil, integração rápida com Google Calendar')
      setMetaTag('time-to-value', 'instantâneo após conectar a integração')

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
            "name": "Como conectar WhatsApp ao Google Calendar?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Instale o Eazybe e conecte sua conta do Google. O Eazybe sincroniza conversas do WhatsApp com o Google Calendar para que compromissos e interações com clientes fiquem organizados na sua agenda."
            }
          },
          {
            "@type": "Question",
            "name": "O Eazybe sincroniza mensagens do WhatsApp com o Google Calendar automaticamente?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sim. O Eazybe pode sincronizar conversas do WhatsApp com o Google Calendar automaticamente, reduzindo copiar/colar manual e mantendo atividades de vendas atualizadas."
            }
          },
          {
            "@type": "Question",
            "name": "Múltiplos colegas podem usar uma caixa de entrada compartilhada com Google Calendar + WhatsApp?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sim. O Eazybe suporta fluxos de trabalho de caixa de entrada compartilhada para que equipes possam colaborar em leads do WhatsApp mantendo registros do Google Calendar alinhados."
            }
          },
          {
            "@type": "Question",
            "name": "O que agentes de IA podem fazer por conversas do Google Calendar + WhatsApp?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "IA pode ajudar a elaborar respostas, resumir conversas e acelerar acompanhamentos—para que representantes respondam mais rápido mantendo mensagens consistentes."
            }
          },
          {
            "@type": "Question",
            "name": "Esta integração é segura para usar com WhatsApp e Google Calendar?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "O Eazybe foi projetado para casos de uso de negócios e foca em fluxos de trabalho seguros para sincronizar conversas do WhatsApp com o Google Calendar. Sempre revise seus requisitos de segurança e conformidade antes da implementação."
            }
          },
          {
            "@type": "Question",
            "name": "Quais dados do Google Calendar posso sincronizar com conversas do WhatsApp?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A maioria das equipes sincroniza conversas do WhatsApp com eventos e compromissos para rastrear contexto em toda a pipeline de vendas. A melhor mapeamento depende do seu fluxo de trabalho do Google Calendar."
            }
          }
        ]
      }

      // BreadcrumbList Schema (without @id)
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Eazybe",
            "item": "https://eazybe.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Integração WhatsApp Google Calendar",
            "item": "https://eazybe.com/br/google-sheets-whatsapp-integration"
          }
        ]
      }

      // Organization Schema (without @id)
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
        "description": "Eazybe ajuda equipes de vendas a conectar WhatsApp com plataformas de CRM como HubSpot, Zoho, Salesforce e Google Sheets para sincronizar conversas, automatizar acompanhamentos e melhorar engajamento do cliente.",
        "foundingDate": "2021",
        "sameAs": [
          "https://twitter.com/eazybe",
          "https://linkedin.com/company/eazybe",
          "https://youtube.com/@eazybe"
        ],
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "contactType": "customer support",
            "email": "support@eazybe.com",
            "url": "https://eazybe.com/br/google-sheets-whatsapp-integration",
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
        "knowsAbout": ["WhatsApp CRM", "Integração WhatsApp Google Calendar", "Automação de vendas", "Integração de agenda", "Agentes de IA para WhatsApp", "Engajamento do cliente"]
      }

      // WebPage Schema (without @id)
      const webpageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "url": "https://eazybe.com/br/google-sheets-whatsapp-integration",
        "name": "Integração WhatsApp com Google Calendar e Agentes de IA | Eazybe",
        "description": "Conecte WhatsApp ao Google Calendar. Sincronize mensagens, automatize agendamentos, use agentes de IA e gerencie reuniões e clientes diretamente no seu calendário.",
        "inLanguage": "pt-BR",
        "datePublished": "2026-02-03T08:00:00+00:00",
        "dateModified": "2026-02-03T10:30:00+00:00"
      }

      // SoftwareApplication Schema (without @id)
      const softwareApplicationSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Integração WhatsApp Google Calendar - Eazybe",
        "applicationCategory": "BusinessApplication",
        "applicationSubCategory": "Integração de Agenda, Automação WhatsApp, Agentes de IA para WhatsApp",
        "operatingSystem": "Web, Extensão Chrome",
        "offers": {
          "@type": "AggregateOffer",
          "url": "https://eazybe.com/pricing",
          "priceCurrency": "BRL",
          "lowPrice": 1160,
          "highPrice": 1960,
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
          "Sincronização automática do WhatsApp para o Google Calendar",
          "Sugestões de resposta com IA",
          "Caixa de entrada compartilhada para colaboração em equipe",
          "Rastreamento de negociações do WhatsApp",
          "Sincronização de contatos",
          "Agendamento de mensagens",
          "Agentes de IA para Google Calendar"
        ]
      }

      // Product Schema (without @id)
      const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Integração WhatsApp Google Calendar - Eazybe",
        "url": "https://eazybe.com/br/google-sheets-whatsapp-integration",
        "image": [
          "https://eazybe.com/logo.png"
        ],
        "description": "O Eazybe conecta WhatsApp com o Google Calendar para sincronizar chats automaticamente, ajudar equipes de vendas a responder mais rápido com IA e gerenciar conversas com clientes com fluxos de trabalho de caixa de entrada compartilhada.",
        "brand": {
          "@type": "Brand",
          "name": "Eazybe"
        },
        "manufacturer": {
          "@type": "Organization",
          "name": "Eazybe",
          "url": "https://eazybe.com/"
        },
        "category": "Software de Integração de Agenda",
        "audience": {
          "@type": "BusinessAudience",
          "audienceType": "Equipes de vendas, usuários de Google Calendar, gerentes de agenda, empresas B2B"
        },
        "offers": {
          "@type": "AggregateOffer",
          "url": "https://eazybe.com/pricing",
          "priceCurrency": "BRL",
          "lowPrice": 1160,
          "highPrice": 1960,
          "offerCount": 5,
          "availability": "https://schema.org/InStock"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": 4.9,
          "bestRating": 5,
          "worstRating": 1,
          "ratingCount": 53766
        }
      }

      // HowTo Schema (without @id)
      const howToSchema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "Como conectar WhatsApp ao Google Calendar usando Eazybe",
        "description": "Siga estas etapas para instalar o Eazybe e sincronizar conversas do WhatsApp com o Google Calendar para que sua equipe possa rastrear chats, acelerar acompanhamentos e manter registros de agenda atualizados.",
        "totalTime": "PT5M",
        "estimatedCost": {
          "@type": "MonetaryAmount",
          "currency": "BRL",
          "value": "0"
        },
        "supply": [
          {
            "@type": "HowToSupply",
            "name": "Conta Google ativa"
          },
          {
            "@type": "HowToSupply",
            "name": "Conta WhatsApp com acesso ao WhatsApp Web"
          }
        ],
        "tool": [
          {
            "@type": "HowToTool",
            "name": "Google Chrome (ou navegador baseado em Chromium)"
          },
          {
            "@type": "HowToTool",
            "name": "Extensão Eazybe para Chrome"
          }
        ],
        "step": [
          {
            "@type": "HowToStep",
            "url": "https://eazybe.com/br/google-sheets-whatsapp-integration#step1",
            "name": "Instale a extensão Eazybe",
            "text": "Abra a Chrome Web Store e instale a extensão oficial Eazybe no seu navegador.",
            "image": "https://eazybe.com/logo.png"
          },
          {
            "@type": "HowToStep",
            "url": "https://eazybe.com/br/google-sheets-whatsapp-integration#step2",
            "name": "Abra o WhatsApp Web",
            "text": "Vá para o WhatsApp Web no seu computador e faça login. O painel Eazybe aparecerá dentro do WhatsApp Web.",
            "image": "https://eazybe.com/logo.png"
          },
          {
            "@type": "HowToStep",
            "url": "https://eazybe.com/br/google-sheets-whatsapp-integration#step3",
            "name": "Conecte sua conta do Google",
            "text": "No painel Eazybe, escolha Google Calendar e complete o fluxo de autorização para conectar sua conta com segurança.",
            "image": "https://eazybe.com/logo.png"
          },
          {
            "@type": "HowToStep",
            "url": "https://eazybe.com/br/google-sheets-whatsapp-integration#step4",
            "name": "Ative sincronização de chat com o Google Calendar",
            "text": "Selecione um contato ou conversa e ative a sincronização. Mensagens do WhatsApp e contexto do cliente começarão a sincronizar com o Google Calendar automaticamente.",
            "image": "https://eazybe.com/logo.png"
          },
          {
            "@type": "HowToStep",
            "url": "https://eazybe.com/br/google-sheets-whatsapp-integration#step5",
            "name": "Use respostas de IA e fluxos de trabalho em equipe",
            "text": "Use respostas assistidas por IA para responder mais rápido e fluxos de trabalho de caixa de entrada compartilhada para colaborar com sua equipe mantendo o Google Calendar atualizado.",
            "image": "https://eazybe.com/logo.png"
          }
        ],
        "inLanguage": "pt-BR"
      }

      // Add all schemas to head
      addJsonLdSchema(faqSchema, 'faq-googlesheets-br')
      addJsonLdSchema(breadcrumbSchema, 'breadcrumb-googlesheets-br')
      addJsonLdSchema(organizationSchema, 'organization-googlesheets-br')
      addJsonLdSchema(webpageSchema, 'webpage-googlesheets-br')
      addJsonLdSchema(softwareApplicationSchema, 'software-googlesheets-br')
      addJsonLdSchema(productSchema, 'product-googlesheets-br')
      addJsonLdSchema(howToSchema, 'howto-googlesheets-br')

      // Cleanup function - remove meta tags and schema when leaving the page
      return () => {
        // Remove FAQ schema
        const faqScript = document.querySelector('script[type="application/ld+json"][data-schema="faq-googlesheets-br"]')
        if (faqScript) faqScript.remove()
        // Remove breadcrumb schema
        const breadcrumbScript = document.querySelector('script[type="application/ld+json"][data-schema="breadcrumb-googlesheets-br"]')
        if (breadcrumbScript) breadcrumbScript.remove()
        // Remove organization schema
        const orgScript = document.querySelector('script[type="application/ld+json"][data-schema="organization-googlesheets-br"]')
        if (orgScript) orgScript.remove()
        // Remove webpage schema
        const webpageScript = document.querySelector('script[type="application/ld+json"][data-schema="webpage-googlesheets-br"]')
        if (webpageScript) webpageScript.remove()
        // Remove software application schema
        const softwareAppScript = document.querySelector('script[type="application/ld+json"][data-schema="software-googlesheets-br"]')
        if (softwareAppScript) softwareAppScript.remove()
        // Remove product schema
        const productScript = document.querySelector('script[type="application/ld+json"][data-schema="product-googlesheets-br"]')
        if (productScript) productScript.remove()
        // Remove how-to schema
        const howToScript = document.querySelector('script[type="application/ld+json"][data-schema="howto-googlesheets-br"]')
        if (howToScript) howToScript.remove()
      }
    }
  }, [location.pathname])
}
