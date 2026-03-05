import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Comparison Page SEO (Portuguese/Brazil) - /br/comparison
 * Adds comprehensive meta tags for the Eazybe comparison page in Portuguese
 * Ensures the page is crawlable for all bots for better indexing and ranking
 */
export const useComparisonPageSEOBr = () => {
  const location = useLocation()

  useEffect(() => {
    // Check if we're on the Portuguese comparison page
    const isComparisonPage = location.pathname === '/br/comparison' || location.pathname === '/comparison'

    if (isComparisonPage) {
      // ==================== META TAGS ====================

      // Document title
      document.title = 'Comparação'

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

      // Helper function to add JSON-LD schema
      const addJsonLdSchema = (schema: Record<string, unknown>, id: string) => {
        let script = document.querySelector(`script[type="application/ld+json"][data-schema="${id}"]`)
        if (!script) {
          script = document.createElement('script')
          script.type = 'application/ld+json'
          ;(script as HTMLScriptElement).setAttribute('data-schema', id)
          document.head.appendChild(script)
        }
        script.textContent = JSON.stringify(schema)
      }

      // Basic meta tags
      setMetaTag('description', 'Desbloqueie todo o potencial do WhatsApp Web com os recursos de produtividade do Eazybe. Compare o Eazybe vs outras ferramentas em recursos, suporte, preços e mais.')
      setMetaTag('keywords', 'comparação Eazybe, Eazybe vs alternativas, comparação CRM para WhatsApp, comparação ferramentas de automação do WhatsApp, ferramentas de produtividade do WhatsApp Web, alternativas ao Eazybe')
      setMetaTag('author', 'Eazybe')
      setMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
      setMetaTag('googlebot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
      setMetaTag('bingbot', 'index, follow')
      setMetaTag('thumbnail', 'https://eazybe.com/logo.png')

      // Open Graph tags
      setMetaTag('og:type', 'website', true)
      setMetaTag('og:url', 'https://eazybe.com/br/comparison', true)
      setMetaTag('og:title', 'Comparação', true)
      setMetaTag('og:description', 'Desbloqueie todo o potencial do WhatsApp Web com os recursos de produtividade do Eazybe. Compare o Eazybe vs outras ferramentas em recursos, suporte, preços e mais.', true)
      setMetaTag('og:image', 'https://eazybe.com/logo.png', true)
      setMetaTag('og:image:width', '1200', true)
      setMetaTag('og:image:height', '630', true)
      setMetaTag('og:image:alt', 'Comparação do Eazybe vs outras ferramentas de CRM para WhatsApp', true)
      setMetaTag('og:locale', 'pt_BR', true)
      setMetaTag('og:site_name', 'Eazybe', true)

      // Twitter Card tags
      setMetaTag('twitter:card', 'summary_large_image', true)
      setMetaTag('twitter:site', '@eazybe', true)
      setMetaTag('twitter:creator', '@eazybe', true)
      setMetaTag('twitter:title', 'Comparação', true)
      setMetaTag('twitter:description', 'Desbloqueie todo o potencial do WhatsApp Web com o Eazybe. Compare o Eazybe vs outras ferramentas por recursos, suporte, preços e produtividade.', true)
      setMetaTag('twitter:image', 'https://eazybe.com/logo.png', true)
      setMetaTag('twitter:image:alt', 'Comparação do Eazybe para CRM no WhatsApp', true)
      setMetaTag('twitter:label1', 'Tipo de conteúdo', true)
      setMetaTag('twitter:data1', 'Guia de comparação', true)
      setMetaTag('twitter:label2', 'Plataforma', true)
      setMetaTag('twitter:data2', 'Ferramentas de CRM para WhatsApp', true)

      // Mobile web app tags
      setMetaTag('mobile-web-app-capable', 'yes')
      setMetaTag('apple-mobile-web-app-capable', 'yes')
      setMetaTag('apple-mobile-web-app-status-bar-style', 'default')
      setMetaTag('apple-mobile-web-app-title', 'Eazybe')

      // AI and SEO specific meta tags
      setMetaTag('answer-type', 'comparação, guia, comparação-de-recursos')
      setMetaTag('target-audience', 'equipes de vendas, líderes de suporte, gestores de CX, founders de SaaS, equipes de operações')
      setMetaTag('content-intent', 'informacional, investigação-comercial')
      setMetaTag('conversational-query', 'Eazybe vs alternativas, comparação CRM para WhatsApp, melhores ferramentas de produtividade no WhatsApp, comparação de ferramentas de CRM no WhatsApp')
      setMetaTag('ai-readability', 'profissional, focado-em-comparação')
      setMetaTag('context-window', 'produtividade no WhatsApp Web, integração com CRM, caixa de entrada compartilhada, respostas com IA, automação de vendas')
      setMetaTag('user-problem', 'encontrar a melhor ferramenta de produtividade e integração com CRM para WhatsApp')
      setMetaTag('solution-summary', 'comparar o Eazybe com outras ferramentas de produtividade e CRM para WhatsApp')
      setMetaTag('primary-benefit', 'escolher a melhor ferramenta de CRM e automação no WhatsApp mais rápido')
      setMetaTag('use-case', 'equipes comparando ferramentas de CRM e produtividade no WhatsApp antes de adotar')
      setMetaTag('implementation-difficulty', 'configuração fácil')
      setMetaTag('time-to-value', 'ganhos de produtividade imediatos')

      // Link tags
      setLinkTag('canonical', 'https://eazybe.com/br/comparison')

      // ==================== JSON-LD SCHEMAS ====================

      // WebPage Schema
      const webpageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "url": "https://eazybe.com/br/comparison",
        "name": "Comparação | Ferramentas de CRM para WhatsApp & Produtividade do WhatsApp Web - Eazybe",
        "description": "Desbloqueie todo o potencial do WhatsApp Web com os recursos de produtividade do Eazybe. Compare o Eazybe vs outras ferramentas de CRM para WhatsApp em recursos, suporte, preços e mais.",
        "inLanguage": "pt-BR",
        "isPartOf": {
          "@type": "WebSite",
          "url": "https://eazybe.com/",
          "name": "Eazybe"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Eazybe",
          "url": "https://eazybe.com/",
          "logo": {
            "@type": "ImageObject",
            "url": "https://eazybe.com/logo.png",
            "width": 600,
            "height": 60
          }
        },
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": "https://eazybe.com/logo.png",
          "width": 1200,
          "height": 630
        },
        "about": [
          { "@type": "Thing", "name": "comparação de CRM para WhatsApp" },
          { "@type": "Thing", "name": "ferramentas de automação do WhatsApp" },
          { "@type": "Thing", "name": "produtividade do WhatsApp Web" },
          { "@type": "Thing", "name": "caixa de entrada compartilhada" },
          { "@type": "Thing", "name": "respostas com IA para WhatsApp" }
        ]
      }

      // Organization Schema
      const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Eazybe",
        "url": "https://eazybe.com/",
        "logo": { "@type": "ImageObject", "url": "https://eazybe.com/logo.png", "width": 600, "height": 60 },
        "image": "https://eazybe.com/logo.png",
        "description": "O Eazybe ajuda equipes de vendas a conectar o WhatsApp com plataformas de CRM para sincronizar conversas, automatizar follow-ups e melhorar o engajamento do cliente.",
        "foundingDate": "2021",
        "sameAs": ["https://twitter.com/eazybe", "https://linkedin.com/company/eazybe", "https://youtube.com/@eazybe"],
        "publishingPrinciples": "https://eazybe.com/br/comparison",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "8, The Green STE B",
          "addressLocality": "Dover",
          "addressRegion": "Delaware",
          "postalCode": "19901",
          "addressCountry": "US"
        },
        "knowsAbout": ["CRM para WhatsApp", "integração com CRM", "automação de vendas", "caixa de entrada compartilhada", "produtividade do WhatsApp"]
      }

      // ItemList Schema (Integrations)
      const integrationsSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Integrações do Eazybe",
        "description": "Integrações do WhatsApp suportadas pelo Eazybe.",
        "itemListOrder": "https://schema.org/ItemListUnordered",
        "numberOfItems": 11,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "item": {
              "@type": "SoftwareApplication",
              "name": "Integração HubSpot WhatsApp",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web, Extensão Chrome",
              "url": "https://eazybe.com/hubspot-whatsapp-integration"
            }
          },
          {
            "@type": "ListItem",
            "position": 2,
            "item": {
              "@type": "SoftwareApplication",
              "name": "Integração Salesforce WhatsApp",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web, Extensão Chrome",
              "url": "https://eazybe.com/salesforce-whatsapp-integration"
            }
          },
          {
            "@type": "ListItem",
            "position": 3,
            "item": {
              "@type": "SoftwareApplication",
              "name": "Integração Zoho WhatsApp",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web, Extensão Chrome",
              "url": "https://eazybe.com/zoho-whatsapp-integration"
            }
          },
          {
            "@type": "ListItem",
            "position": 4,
            "item": {
              "@type": "SoftwareApplication",
              "name": "Integração Bitrix24 WhatsApp",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web, Extensão Chrome",
              "url": "https://eazybe.com/bitrix24-whatsapp-integration"
            }
          },
          {
            "@type": "ListItem",
            "position": 5,
            "item": {
              "@type": "SoftwareApplication",
              "name": "Integração LeadSquared WhatsApp",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web, Extensão Chrome",
              "url": "https://eazybe.com/leadsquared-whatsapp-integration"
            }
          },
          {
            "@type": "ListItem",
            "position": 6,
            "item": {
              "@type": "SoftwareApplication",
              "name": "Integração Freshdesk WhatsApp",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web, Extensão Chrome",
              "url": "https://eazybe.com/freshdesk-whatsapp-integration"
            }
          },
          {
            "@type": "ListItem",
            "position": 7,
            "item": {
              "@type": "SoftwareApplication",
              "name": "Integração Google Sheets WhatsApp",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web, Extensão Chrome",
              "url": "https://eazybe.com/google-sheets-whatsapp-integration"
            }
          },
          {
            "@type": "ListItem",
            "position": 8,
            "item": {
              "@type": "SoftwareApplication",
              "name": "Webhooks e Integrações Personalizadas",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web, Extensão Chrome",
              "url": "https://eazybe.com/webhooks-whatsapp-integration"
            }
          },
          {
            "@type": "ListItem",
            "position": 9,
            "item": {
              "@type": "SoftwareApplication",
              "name": "Integração Pipedrive WhatsApp",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web, Extensão Chrome",
              "url": "https://eazybe.com/pipedrive-whatsapp-integration"
            }
          },
          {
            "@type": "ListItem",
            "position": 10,
            "item": {
              "@type": "SoftwareApplication",
              "name": "Integrações Monday WhatsApp",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web, Extensão Chrome",
              "url": "https://eazybe.com/monday-whatsapp-integration"
            }
          },
          {
            "@type": "ListItem",
            "position": 11,
            "item": {
              "@type": "SoftwareApplication",
              "name": "Integrações Google WhatsApp",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web, Extensão Chrome",
              "url": "https://eazybe.com/google-calendar-whatsapp-integration"
            }
          }
        ]
      }

      // BreadcrumbList Schema
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Eazybe", "item": "https://eazybe.com/" },
          { "@type": "ListItem", "position": 2, "name": "Comparação", "item": "https://eazybe.com/br/comparison" }
        ]
      }

      // WebSite Schema
      const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "url": "https://eazybe.com/",
        "name": "Eazybe",
        "description": "O Eazybe ajuda equipes a integrar o WhatsApp com ferramentas de CRM e negócios para sincronizar chats, automatizar fluxos de trabalho e melhorar a produtividade de vendas.",
        "inLanguage": "pt-BR",
        "publisher": {
          "@type": "Organization",
          "name": "Eazybe",
          "url": "https://eazybe.com/",
          "logo": { "@type": "ImageObject", "url": "https://eazybe.com/logo.png", "width": 600, "height": 60 }
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": { "@type": "EntryPoint", "urlTemplate": "https://eazybe.com/search?q={search_term_string}" },
          "query-input": "required name=search_term_string"
        }
      }

      // SoftwareApplication Schema
      const softwareApplicationSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Eazybe",
        "applicationCategory": "BusinessApplication",
        "applicationSubCategory": "Integração CRM, Automação WhatsApp, Agentes de IA para WhatsApp",
        "operatingSystem": "Web, Extensão Chrome",
        "offers": {
          "@type": "AggregateOffer",
          "url": "https://eazybe.com/pricing",
          "priceCurrency": "USD",
          "lowPrice": 29,
          "highPrice": 49,
          "offerCount": 5,
          "availability": "https://schema.org/InStock"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.7",
          "bestRating": "5",
          "worstRating": "1",
          "ratingCount": 53766
        },
        "featureList": [
          "Sincronização automática do WhatsApp para CRM",
          "Sugestões de resposta com IA",
          "Caixa de entrada compartilhada para colaboração em equipe",
          "Acompanhamento de negociações do WhatsApp",
          "Sincronização de contatos",
          "Agendamento de mensagens",
          "Agentes de IA para CRM"
        ]
      }

      // FAQPage Schema
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [{
          "@type": "Question",
          "name": "Como o Eazybe se compara a outros CRMs de WhatsApp?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "O Eazybe supera 20+ plataformas de CRM de WhatsApp incluindo Wati, Interakt, QuickReply, Cooby, Timelines e Rasayel. Oferecemos 70% de economia em custos, recursos exclusivos de IA como WhatsApp Web Copilot e Revenue Inbox, mais integrações de CRM incluindo Salesforce, e recursos que ninguém mais tem como WhatsApp Chat Backup."
          }
        },{
          "@type": "Question",
          "name": "Por que o Eazybe é mais acessível que os concorrentes?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "O Eazybe começa a partir de apenas $13/mês enquanto os concorrentes cobram $25-$49/mês. Acreditamos que um CRM poderoso para WhatsApp deve ser acessível para todos os negócios. Nossas operações eficientes e base de usuários maior (50.000+) nos permitem oferecer recursos premium a uma fração do custo."
          }
        },{
          "@type": "Question",
          "name": "Quais recursos exclusivos o Eazybe oferece?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "O Eazybe oferece recursos exclusivos que você não encontrará em nenhum outro lugar: WhatsApp Chat Backup, Integração Salesforce, WhatsApp Web Copilot, Revenue Inbox, RevOps Agent, AI Unreplied Chats Agent e Integração Bitrix24. Estes recursos não estão disponíveis no Wati, Interakt, QuickReply, Cooby, Timelines ou Rasayel."
          }
        },{
          "@type": "Question",
          "name": "O Eazybe é adequado para equipes empresariais?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutamente! O Eazybe atende negócios de todos os tamanhos. Nosso plano Omnis inclui APIs dedicadas, sincronização ilimitada de mensagens, Revenue Inbox, RevOps Agent e um gerente de conta dedicado para equipes empresariais. Escalamos com as necessidades do seu negócio."
          }
        },{
          "@type": "Question",
          "name": "Posso migrar de outra plataforma?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim! Facilitamos a migração de qualquer plataforma de CRM de WhatsApp. Importe seus contatos existentes, mensagens e fluxos de trabalho. Nossa equipe fornece suporte gratuito de migração para planos anuais para garantir uma transição suave do Wati, Interakt, QuickReply, Cooby ou qualquer outra plataforma."
          }
        },{
          "@type": "Question",
          "name": "Quais integrações o Eazybe suporta?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "O Eazybe integra-se com 10+ plataformas incluindo HubSpot, Salesforce, Zoho CRM, Bitrix24, Google Sheets, Pipedrive, Monday.com, LeadSquared, Freshdesk, Google Calendar e webhooks personalizados para qualquer outra plataforma. Mais integrações do que qualquer outro CRM de WhatsApp."
          }
        },{
          "@type": "Question",
          "name": "Existe uma avaliação gratuita?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim! Oferecemos uma avaliação gratuita de 7 dias em todos os planos sem cartão de crédito necessário. Você pode explorar todos os recursos, testar as integrações e ver como o Eazybe se adapta ao seu fluxo de trabalho antes de se comprometer."
          }
        }]
      }

      // Add all schemas to head
      addJsonLdSchema(webpageSchema, 'webpage-comparison-br')
      addJsonLdSchema(organizationSchema, 'organization-comparison-br')
      addJsonLdSchema(integrationsSchema, 'integrations-comparison-br')
      addJsonLdSchema(breadcrumbSchema, 'breadcrumb-comparison-br')
      addJsonLdSchema(websiteSchema, 'website-comparison-br')
      addJsonLdSchema(softwareApplicationSchema, 'software-comparison-br')
      addJsonLdSchema(faqSchema, 'faq-comparison-br')

      console.log('✅ Comparison Page (BR): SEO meta tags and JSON-LD schemas added/updated')

      // Cleanup function - remove schemas when leaving the page
      return () => {
        const schemaIds = ['webpage-comparison-br', 'organization-comparison-br', 'integrations-comparison-br', 'breadcrumb-comparison-br', 'website-comparison-br', 'software-comparison-br', 'faq-comparison-br']
        schemaIds.forEach(id => {
          const script = document.querySelector(`script[type="application/ld+json"][data-schema="${id}"]`)
          if (script) script.remove()
        })
        console.log('🧹 Comparison Page (BR): JSON-LD schemas removed')
      }
    }
  }, [location.pathname])
}
