import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Blog Listing Page SEO (Portuguese) - /br/blog
 * Adds comprehensive meta tags and JSON-LD schemas for the Eazybe blog page
 * All schemas are crawlable by bots (no @id for SEO)
 */
export const useBlogListingSEOBr = () => {
  const location = useLocation()

  useEffect(() => {
    // Check if we're on the Portuguese blog listing page
    const isBlogPage = location.pathname === '/br/blog'

    if (isBlogPage) {
      // Document title
      document.title = 'Blog Eazybe - Dicas de CRM WhatsApp, Automação de Vendas & Insights de IA'

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

      // Basic meta tags
      setMetaTag('description', 'Explore insights especializados sobre integração de CRM WhatsApp, automação de vendas, fluxos de trabalho de caixa de entrada da equipe e engajamento do cliente com IA. Aprenda estratégias para crescer receita com Eazybe.')
      setMetaTag('keywords', 'dicas de CRM WhatsApp, blog de automação de vendas, estratégias de vendas WhatsApp, automação de fluxos de trabalho CRM, estratégias de engajamento do cliente, dicas de crescimento de negócios WhatsApp')
      setMetaTag('author', 'Eazybe')
      setMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
      setMetaTag('googlebot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
      setMetaTag('bingbot', 'index, follow')
      setMetaTag('thumbnail', 'https://eazybe.com/logo.png')

      // Article meta tags
      setMetaTag('article:section', 'Tecnologia', true)
      setMetaTag('article:tag', 'Blog CRM WhatsApp', true)

      // Open Graph tags
      setMetaTag('og:type', 'website', true)
      setMetaTag('og:url', 'https://eazybe.com/br/blog', true)
      setMetaTag('og:title', 'Blog Eazybe | CRM WhatsApp, Automação de Vendas & Estratégias de IA', true)
      setMetaTag('og:description', 'Leia guias práticos sobre fluxos de trabalho CRM WhatsApp, automação de vendas e engajamento do cliente com suporte de IA. Insights acionáveis para equipes de vendas modernas.', true)
      setMetaTag('og:image', 'https://eazybe.com/logo.png', true)
      setMetaTag('og:image:width', '1200', true)
      setMetaTag('og:image:height', '630', true)
      setMetaTag('og:image:alt', 'Blog Eazybe - Insights de automação de vendas e CRM WhatsApp', true)
      setMetaTag('og:locale', 'pt_BR', true)
      setMetaTag('og:site_name', 'Eazybe', true)

      // Twitter Card tags
      setMetaTag('twitter:card', 'summary_large_image', true)
      setMetaTag('twitter:site', '@eazybe', true)
      setMetaTag('twitter:creator', '@eazybe', true)
      setMetaTag('twitter:title', 'Blog Eazybe - CRM e Automação de Vendas WhatsApp Insights', true)
      setMetaTag('twitter:description', 'Guias e insights sobre fluxos de trabalho CRM WhatsApp, automação de vendas com IA e estratégias de engajamento do cliente para empresas modernas.', true)
      setMetaTag('twitter:image', 'https://eazybe.com/logo.png', true)
      setMetaTag('twitter:image:alt', 'Blog Eazybe - Estratégias CRM WhatsApp', true)
      setMetaTag('twitter:label1', 'Tipo de Conteúdo', true)
      setMetaTag('twitter:data1', 'Blog & Guias', true)
      setMetaTag('twitter:label2', 'Foco', true)
      setMetaTag('twitter:data2', 'CRM, WhatsApp, Automação de Vendas', true)

      // Mobile web app tags
      setMetaTag('mobile-web-app-capable', 'yes')
      setMetaTag('apple-mobile-web-app-capable', 'yes')
      setMetaTag('apple-mobile-web-app-status-bar-style', 'default')
      setMetaTag('apple-mobile-web-app-title', 'Eazybe')

      // AI and SEO specific meta tags
      setMetaTag('answer-type', 'como-fazer, guias, melhores-praticas, tutoriais')
      setMetaTag('target-audience', 'equipes de vendas, usuários de CRM, fundadores, equipes de marketing, equipes de suporte, empresas B2B')
      setMetaTag('content-intent', 'informacional')
      setMetaTag('conversational-query', 'dicas de CRM WhatsApp, como automatizar vendas WhatsApp, melhores praticas de fluxo de trabalho CRM, guias de automação de vendas IA')
      setMetaTag('ai-readability', 'educacional, pratico, profissional')
      setMetaTag('context-window', 'automação de vendas, fluxos de trabalho WhatsApp, estratégia CRM, colaboração em equipe, gerenciamento de ciclo de vida do cliente')
      setMetaTag('user-problem', 'falta de fluxo de trabalho de vendas WhatsApp estruturado, follow-ups manuais, uso ineficiente de CRM')
      setMetaTag('solution-summary', 'guias educacionais e melhores praticas para melhorar fluxos de trabalho de vendas baseados em WhatsApp')
      setMetaTag('primary-benefit', 'aprenda como melhorar a produtividade de vendas e o engajamento do cliente usando WhatsApp e automação de CRM')
      setMetaTag('use-case', 'equipes de empresas pesquisando estratégias de CRM WhatsApp e métodos de automação')
      setMetaTag('implementation-difficulty', 'varia por guia')
      setMetaTag('time-to-value', 'insights imediatos de cada artigo')

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

      // BreadcrumbList Schema (Portuguese)
      const breadcrumbSchema = {
        "@context": "https://schema.org/",
        "@type": "BreadcrumbList",
        "itemListElement": [{
          "@type": "ListItem",
          "position": 1,
          "name": "Eazybe",
          "item": "https://eazybe.com/"
        }, {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": "https://eazybe.com/br/blog"
        }]
      }

      // CollectionPage Schema (Portuguese)
      const collectionPageSchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "url": "https://eazybe.com/br/blog",
        "name": "Blog Eazybe - Dicas de CRM WhatsApp, Automação de Vendas & Insights de IA",
        "description": "Explore insights especializados sobre integração de CRM WhatsApp, automação de vendas, fluxos de trabalho de caixa de entrada da equipe e engajamento do cliente com IA.",
        "inLanguage": "pt-BR",
        "about": [
          {
            "@type": "Thing",
            "name": "WhatsApp CRM"
          },
          {
            "@type": "Thing",
            "name": "Automação de Vendas"
          },
          {
            "@type": "Thing",
            "name": "Engajamento do Cliente"
          }
        ]
      }

      // Organization Schema (Portuguese)
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
        "description": "Eazybe ajuda equipes de vendas a conectar WhatsApp com plataformas CRM para sincronizar conversas, automatizar follow-ups e melhorar engajamento do cliente."
      }

      // WebSite Schema (Portuguese)
      const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "url": "https://eazybe.com/",
        "name": "Eazybe",
        "description": "Plataforma CRM WhatsApp & Automação de Vendas"
      }

      // FAQPage Schema (Portuguese)
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Quais tópicos o blog Eazybe cobre?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "O blog Eazybe cobre dicas de integração CRM WhatsApp, estratégias de automação de vendas, fluxos de trabalho de equipe compartilhada, engajamento do cliente com suporte de IA, automação de fluxos de trabalho CRM e dicas de crescimento de negócios WhatsApp."
            }
          },
          {
            "@type": "Question",
            "name": "Como posso melhorar meu fluxo de vendas WhatsApp?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Você pode melhorar seu fluxo de vendas WhatsApp implementando automação CRM, usando agentes de IA para respostas mais rápidas, configurando fluxos de trabalho de equipe compartilhada e seguindo as melhores práticas para engajamento do cliente descritas em nossos artigos."
            }
          },
          {
            "@type": "Question",
            "name": "Quais plataformas de CRM integram com WhatsApp?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Plataformas de CRM populares que integram com WhatsApp incluem HubSpot, Salesforce, Zoho, Bitrix24, LeadSquared, Freshdesk, Pipedrive e Monday.com. Nosso blog fornece guias detalhados para cada integração."
            }
          }
        ]
      }

      // SoftwareApplication Schema (Portuguese)
      const softwareApplicationSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Integração CRM WhatsApp - Eazybe",
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
          "Sincronização automática WhatsApp para CRM",
          "Sugestões de resposta alimentadas por IA",
          "Caixa de entrada compartilhada para colaboração em equipe",
          "Acompanhamento de negócios do WhatsApp",
          "Sincronização de contatos",
          "Agendamento de mensagens",
          "Agentes de IA para CRM"
        ]
      }

      // Add all schemas to head
      addJsonLdSchema(breadcrumbSchema, 'breadcrumb-blog-br')
      addJsonLdSchema(collectionPageSchema, 'collection-blog-br')
      addJsonLdSchema(organizationSchema, 'organization-blog-br')
      addJsonLdSchema(websiteSchema, 'website-blog-br')
      addJsonLdSchema(faqSchema, 'faq-blog-br')
      addJsonLdSchema(softwareApplicationSchema, 'software-blog-br')

      // Cleanup function
      return () => {
        document.querySelectorAll('script[type="application/ld+json"][data-schema*="-blog-br"]').forEach(el => el.remove())
      }
    }
  }, [location.pathname])
}
