import type { Metadata } from 'next'

const BASE_URL = 'https://eazybe.com'

export function getHomepageMetadata(locale: string): Metadata {
  const meta: Record<string, Metadata> = {
    en: {
      title: 'WhatsApp AI Agent For Sales Teams: Automate Sales | Eazybe',
      description: 'Automate sales with WhatsApp AI Agents by Eazybe. Qualify leads, detect cold deals, use AI chatbots, and sync conversations with HubSpot, Salesforce, Zoho and other CRMs.',
      keywords: 'whatsapp ai agent, ai agents for whatsapp, whatsapp ai agents, ai agents on whatsapp, ai whatsapp agent, whatsapp agent ai, ai agent for whatsapp automation, whatsapp ai agent for sales teams',
      authors: [{ name: 'Eazybe' }],
      robots: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large' as const,
        'max-video-preview': -1,
        googleBot: {
          index: true,
          follow: true,
          'max-snippet': -1,
          'max-image-preview': 'large' as const,
          'max-video-preview': -1,
        },
      },
      referrer: 'origin-when-cross-origin',
      appleWebApp: {
        capable: true,
        title: 'Eazybe',
        statusBarStyle: 'default',
      },
      openGraph: {
        type: 'website',
        url: `${BASE_URL}/`,
        title: 'WhatsApp AI Agent For Sales Teams | Automate Sales | Eazybe',
        description: 'Automate sales using WhatsApp AI Agents. Qualify leads, detect cold deals, and sync chats with HubSpot, Salesforce, Zoho and other CRM platforms.',
        images: [{ url: `${BASE_URL}/logo.png`, width: 1200, height: 630, alt: 'WhatsApp AI Agent for Sales Automation by Eazybe' }],
        locale: 'en_US',
        siteName: 'Eazybe',
      },
      twitter: {
        card: 'summary_large_image',
        site: '@eazybe',
        creator: '@eazybe',
        title: 'WhatsApp AI Agent For Sales Teams | Automate Sales | Eazybe',
        description: 'Use WhatsApp AI Agents to qualify leads, detect cold deals, automate sales workflows and sync conversations with your CRM.',
        images: [{ url: `${BASE_URL}/logo.png`, alt: 'WhatsApp AI Agent for Sales Teams' }],
      },
      alternates: {
        canonical: `${BASE_URL}`,
        languages: {
          'en': `${BASE_URL}`,
          'pt-BR': `${BASE_URL}/br`,
          'es': `${BASE_URL}/es`,
          'tr': `${BASE_URL}/tr`,
          'x-default': `${BASE_URL}`,
        },
      },
      other: {
        'bingbot': 'index, follow',
        'thumbnail': `${BASE_URL}/logo.png`,
        'article:published_time': '2026-02-03T08:00:00+00:00',
        'article:modified_time': '2026-02-03T10:30:00+00:00',
        'article:section': 'AI Sales Automation',
        'article:tag': 'WhatsApp AI Agents',
        'twitter:label1': 'Product',
        'twitter:data1': 'WhatsApp AI Agents',
        'twitter:label2': 'Use Case',
        'twitter:data2': 'Sales Automation',
        'mobile-web-app-capable': 'yes',
        'answer-type': 'product-information, automation, ai-agents',
        'target-audience': 'sales teams, revenue teams, SaaS founders, CRM managers, marketing automation teams, B2B companies',
        'content-intent': 'commercial-investigation, transactional',
        'conversational-query': 'whatsapp ai agent for sales, automate sales with whatsapp ai, ai agents for whatsapp crm, whatsapp ai automation for sales teams',
        'ai-readability': 'professional, solution-oriented, automation-focused',
        'context-window': 'whatsapp ai agents, sales automation, crm sync, lead qualification, revenue operations automation',
        'user-problem': 'manual lead qualification, slow sales follow ups, disconnected crm conversations',
        'solution-summary': 'whatsapp ai agents automate lead qualification and sync conversations with crm platforms',
        'primary-benefit': 'automate sales conversations and qualify leads using whatsapp ai agents',
        'use-case': 'sales teams automating lead qualification and crm updates using whatsapp ai agents',
        'implementation-difficulty': 'easy, no-code crm integration',
        'time-to-value': 'instant automation after connecting whatsapp and crm',
      },
    },
    br: {
      title: 'CRM integrado com WhatsApp para equipes | Eazybe',
      description: 'Integre WhatsApp ao CRM (HubSpot, Zoho, Salesforce e Sheets). Sincronize chats, use IA e caixa compartilhada para vender mais.',
      keywords: 'crm integrado com whatsapp, crm com whatsapp integrado, crm com integração whatsapp, crm integrado com whatsapp grátis, crm with whatsapp integration, best crm with whatsapp integration, crm gratuito com integração whatsapp',
      authors: [{ name: 'Eazybe' }],
      robots: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large' as const,
        'max-video-preview': -1,
        googleBot: {
          index: true,
          follow: true,
          'max-snippet': -1,
          'max-image-preview': 'large' as const,
          'max-video-preview': -1,
        },
      },
      referrer: 'origin-when-cross-origin',
      appleWebApp: {
        capable: true,
        title: 'Eazybe',
        statusBarStyle: 'default',
      },
      openGraph: {
        type: 'website',
        url: `${BASE_URL}/br`,
        title: 'Melhor CRM integrado com WhatsApp? Conheça Eazybe',
        description: 'CRM integrado com WhatsApp: sincronize chats, respostas com IA e inbox compartilhado para HubSpot, Zoho, Salesforce e Sheets.',
        images: [{ url: `${BASE_URL}/logo.png`, width: 1200, height: 630, alt: 'Eazybe – CRM integrado com WhatsApp para equipes' }],
        locale: 'PT-BR',
        siteName: 'Eazybe',
      },
      twitter: {
        card: 'summary_large_image',
        site: '@eazybe',
        creator: '@eazybe',
        title: 'Integração CRM com WhatsApp simplificada | Eazybe',
        description: 'CRM com integração WhatsApp para HubSpot, Zoho, Salesforce e Sheets. Sincronize conversas, IA e inbox compartilhado.',
        images: [{ url: `${BASE_URL}/logo.png`, alt: 'Extensão de integração do Eazybe com o WhatsApp para CRM' }],
      },
      alternates: {
        canonical: `${BASE_URL}/br`,
        languages: {
          'en': `${BASE_URL}`,
          'pt-BR': `${BASE_URL}/br`,
          'es': `${BASE_URL}/es`,
          'tr': `${BASE_URL}/tr`,
          'x-default': `${BASE_URL}`,
        },
      },
      other: {
        'bingbot': 'index, follow',
        'thumbnail': `${BASE_URL}/logo.png`,
        'article:published_time': '2026-02-03T08:00:00+00:00',
        'article:modified_time': '2026-02-03T10:30:00+00:00',
        'article:section': 'Technology',
        'article:tag': 'crm integrado com whatsapp',
        'twitter:label1': 'Rating',
        'twitter:data1': '4.7/5',
        'twitter:label2': 'Price',
        'twitter:data2': 'Free',
        'mobile-web-app-capable': 'yes',
        'answer-type': 'tutorial, informações do produto, comparação de recursos',
        'target-audience': 'equipes de vendas, donos de empresas, gestores de CRM, profissionais B2B, suporte ao cliente, desenvolvimento de negócios',
        'content-intent': 'informativo, investigação comercial, transacional',
        'conversational-query': 'como gerenciar leads do whatsapp no crm, melhor integração whatsapp crm, agentes de IA para suporte ao cliente, como acompanhar desempenho de vendas no crm, agentes de vendas com IA, como fazer backup de conversas do whatsapp no crm',
        'ai-readability': 'conversacional, profissional, focado em solução',
        'context-window': 'automação de vendas, comunicação com cliente, rastreamento de leads, integração de CRM, mensagens de negócios, acompanhamento de performance de vendas, automação de fluxo de trabalho de CRM, CRM dentro do WhatsApp',
        'user-problem': 'perda de leads no WhatsApp, esquecimento de follow-ups, fluxo de trabalho de vendas desconectado',
        'solution-summary': 'sincronização automática do WhatsApp com o CRM',
        'primary-benefit': 'nunca mais perca um lead ou um acompanhamento',
        'use-case': 'equipes de vendas gerenciando conversas com clientes entre o WhatsApp e o CRM',
        'implementation-difficulty': 'fácil, instalação em um clique',
        'time-to-value': 'imediato, sincronização instantânea',
      },
    },
    es: {
      title: 'Integración WhatsApp CRM | Plataforma de ventas WA - Eazybe',
      description: 'Integra WhatsApp con tu CRM y no pierdas clientes. Sincroniza chats, automatiza seguimientos y usa IA para gestionar ventas en un solo lugar.',
      keywords: 'CRM WhatsApp, integración CRM WhatsApp, CRM con WhatsApp, integración WhatsApp CRM, extensión WhatsApp Web CRM, CRM para ventas, productividad WhatsApp, plataforma de ventas WhatsApp',
      authors: [{ name: 'Eazybe' }],
      robots: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large' as const,
        'max-video-preview': -1,
        googleBot: {
          index: true,
          follow: true,
          'max-snippet': -1,
          'max-image-preview': 'large' as const,
          'max-video-preview': -1,
        },
      },
      referrer: 'origin-when-cross-origin',
      appleWebApp: {
        capable: true,
        title: 'Eazybe',
        statusBarStyle: 'default',
      },
      openGraph: {
        type: 'website',
        url: `${BASE_URL}/es`,
        title: 'CRM con WhatsApp para ventas y equipos | Eazybe',
        description: 'Convierte WhatsApp en tu CRM de ventas. Sincroniza chats, automatiza seguimientos y gestiona clientes con IA y bandeja compartida.',
        images: [{ url: `${BASE_URL}/logo.png`, width: 1200, height: 630, alt: 'Eazybe – Plataforma de ventas por WhatsApp para equipos CRM' }],
        locale: 'es_ES',
        siteName: 'Eazybe',
      },
      twitter: {
        card: 'summary_large_image',
        site: '@eazybe',
        creator: '@eazybe',
        title: 'CRM de WhatsApp y extensión de productividad para ventas - Eazybe',
        description: 'Sincroniza WhatsApp con tu CRM, automatiza mensajes y gestiona clientes en un solo lugar con IA y bandeja compartida.',
        images: [{ url: `${BASE_URL}/logo.png`, alt: 'Extensión de integración CRM con WhatsApp de Eazybe' }],
      },
      alternates: {
        canonical: `${BASE_URL}/es`,
        languages: {
          'en': `${BASE_URL}`,
          'pt-BR': `${BASE_URL}/br`,
          'es': `${BASE_URL}/es`,
          'tr': `${BASE_URL}/tr`,
          'x-default': `${BASE_URL}`,
        },
      },
      other: {
        'bingbot': 'index, follow',
        'thumbnail': `${BASE_URL}/logo.png`,
        'article:published_time': '2026-02-03T08:00:00+00:00',
        'article:modified_time': '2026-02-03T10:30:00+00:00',
        'article:section': 'Tecnología',
        'article:tag': 'Integración CRM con WhatsApp',
        'twitter:label1': 'Valoración',
        'twitter:data1': '4.7/5',
        'twitter:label2': 'Precio',
        'twitter:data2': 'Gratis',
        'mobile-web-app-capable': 'yes',
        'answer-type': 'guía, información-del-producto, comparación-de-funciones',
        'target-audience': 'equipos de ventas, dueños de negocios, gestores de CRM, profesionales B2B',
        'content-intent': 'informativo, investigación-comercial, transaccional',
        'conversational-query': 'cómo gestionar leads de WhatsApp en CRM, mejor integración CRM con WhatsApp',
        'ai-readability': 'conversacional, profesional, orientado-a-soluciones',
        'context-window': 'automatización de ventas, comunicación con clientes, seguimiento de leads, integración CRM, mensajería empresarial',
        'user-problem': 'pérdida de leads en WhatsApp, seguimientos olvidados, flujo de ventas desconectado',
        'solution-summary': 'sincronización automática de WhatsApp con el CRM',
        'primary-benefit': 'nunca pierdas un lead ni un seguimiento',
        'use-case': 'equipos de ventas gestionando conversaciones de clientes entre WhatsApp y el CRM',
        'implementation-difficulty': 'fácil, instalación en un clic',
        'time-to-value': 'inmediato, sincronización instantánea',
      },
    },
    tr: {
      title: 'WhatsApp CRM Entegrasyonu | WhatsApp Satış Platformu - Eazybe',
      description: "HubSpot, Zoho, Salesforce ve Sheets için WhatsApp CRM entegrasyonu. Sohbetleri CRM'inizle senkronize edin; yapay zekâ yanıtları ve paylaşılan gelen kutusu kullanın.",
      keywords: 'WhatsApp CRM, WhatsApp CRM entegrasyonu, WhatsApp ile CRM entegrasyonu, WhatsApp Web uzantısı, CRM entegrasyonu, CRM WhatsApp entegrasyonu, satış verimliliği, WhatsApp verimliliği',
      authors: [{ name: 'Eazybe' }],
      robots: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large' as const,
        'max-video-preview': -1,
        googleBot: {
          index: true,
          follow: true,
          'max-snippet': -1,
          'max-image-preview': 'large' as const,
          'max-video-preview': -1,
        },
      },
      referrer: 'origin-when-cross-origin',
      appleWebApp: {
        capable: true,
        title: 'Eazybe',
        statusBarStyle: 'default',
      },
      openGraph: {
        type: 'website',
        url: `${BASE_URL}/tr`,
        title: 'Eazybe — Satış Ekipleri İçin WhatsApp CRM ve Verimlilik Aracı',
        description: "WhatsApp Web'i HubSpot, Zoho, Salesforce ve daha fazlasıyla entegre edin. Sohbetleri yönetin, mesajları planlayın ve müşteri etkileşimini artırın — hepsi WhatsApp Web içinde.",
        images: [{ url: `${BASE_URL}/logo.png`, width: 1200, height: 630, alt: 'Eazybe – CRM Ekipleri İçin WhatsApp Satış Platformu' }],
        locale: 'tr_TR',
        siteName: 'Eazybe',
      },
      twitter: {
        card: 'summary_large_image',
        site: '@eazybe',
        creator: '@eazybe',
        title: 'Eazybe | WhatsApp CRM ve Satış Verimliliği Uzantısı',
        description: "Eazybe ile WhatsApp Web'i güçlü bir CRM aracına dönüştürün. HubSpot, Zoho, Salesforce ve daha fazlasıyla sohbetleri senkronize edin; mesaj planlayın, akıllı yanıtlar kullanın ve satışları artırın.",
        images: [{ url: `${BASE_URL}/logo.png`, alt: 'Eazybe WhatsApp CRM Entegrasyon Uzantısı' }],
      },
      alternates: {
        canonical: `${BASE_URL}/tr`,
        languages: {
          'en': `${BASE_URL}`,
          'pt-BR': `${BASE_URL}/br`,
          'es': `${BASE_URL}/es`,
          'tr': `${BASE_URL}/tr`,
          'x-default': `${BASE_URL}`,
        },
      },
      other: {
        'bingbot': 'index, follow',
        'thumbnail': `${BASE_URL}/logo.png`,
        'article:published_time': '2025-02-03T08:00:00+00:00',
        'article:modified_time': '2025-02-03T10:30:00+00:00',
        'article:section': 'Teknoloji',
        'article:tag': 'WhatsApp CRM Entegrasyonu',
        'twitter:label1': 'Puan',
        'twitter:data1': '4.7/5',
        'twitter:label2': 'Fiyat',
        'twitter:data2': 'Ücretsiz',
        'mobile-web-app-capable': 'yes',
        'answer-type': 'nasıl-yapılır, ürün-bilgisi, özellik-karşılaştırması',
        'target-audience': 'satış ekipleri, işletme sahipleri, CRM yöneticileri, B2B profesyonelleri',
        'content-intent': 'bilgilendirici, ticari-araştırma, işlemsel',
        'conversational-query': "crm'de whatsapp lead'lerini nasıl yönetirim, en iyi whatsapp crm entegrasyonu",
        'ai-readability': 'konuşma dili, profesyonel, çözüm-odaklı',
        'context-window': 'satış otomasyonu, müşteri iletişimi, lead takibi, CRM entegrasyonu, iş mesajlaşması',
        'user-problem': "WhatsApp'ta lead kaybı, kaçırılan takipler, kopuk satış iş akışı",
        'solution-summary': "WhatsApp'tan CRM'e otomatik senkronizasyon",
        'primary-benefit': "hiçbir lead'i veya takibi kaçırmayın",
        'use-case': 'satış ekiplerinin WhatsApp ve CRM arasında müşteri konuşmalarını yönetmesi',
        'implementation-difficulty': 'kolay, tek tıkla kurulum',
        'time-to-value': 'hemen, anında senkronizasyon',
      },
    },
  }

  return meta[locale] || meta.en
}

export function getHomepageJsonLd(locale: string): object[] {
  const schemas: Record<string, object[]> = {
    en: [
      // Organization Schema
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Eazybe",
        "url": "https://eazybe.com/",
        "logo": { "@type": "ImageObject", "url": "https://eazybe.com/logo.png", "width": 600, "height": 60 },
        "image": "https://eazybe.com/logo.png",
        "description": "Eazybe helps sales teams automate WhatsApp conversations with AI agents, qualify leads, detect cold deals, and sync chats with CRM platforms like HubSpot, Zoho, Salesforce, and Google Sheets.",
        "foundingDate": "2021",
        "sameAs": ["https://twitter.com/eazybe", "https://linkedin.com/company/eazybe", "https://youtube.com/@eazybe"],
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "contactType": "customer support",
            "email": "support@eazybe.com",
            "url": "https://eazybe.com/",
            "areaServed": "US",
            "availableLanguage": ["English"]
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
          "WhatsApp AI agent",
          "AI agents for sales teams",
          "WhatsApp CRM integration",
          "Sales automation",
          "Lead qualification",
          "CRM sync"
        ]
      },
      // FAQPage Schema
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is Eazybe WhatsApp AI Agent for Sales Teams?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Eazybe provides WhatsApp AI Agents that automate sales workflows. Qualify leads, detect cold deals, use AI chatbots, and sync conversations with HubSpot, Salesforce, Zoho and other CRMs - all inside WhatsApp Web.",
              "inLanguage": "en"
            }
          },
          {
            "@type": "Question",
            "name": "How do WhatsApp AI Agents work for sales automation?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Eazybe's AI Agents integrate directly with WhatsApp Web as a Chrome extension. They automatically qualify leads using AI, detect cold deals, sync conversations to CRM in real-time, and help sales teams automate follow-ups without leaving WhatsApp Web.",
              "inLanguage": "en"
            }
          },
          {
            "@type": "Question",
            "name": "Which CRMs does Eazybe integrate with?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Eazybe supports WhatsApp AI Agent integration with HubSpot, Zoho CRM, Salesforce, Bitrix24, Freshdesk, Pipedrive, Leadsquared, and Google Sheets. The AI-powered integration is one-click setup and works instantly.",
              "inLanguage": "en"
            }
          },
          {
            "@type": "Question",
            "name": "Is Eazybe WhatsApp AI Agent free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, Eazybe offers a free plan with basic WhatsApp AI Agent features. Premium plans start with advanced features like AI lead qualification, automated follow-ups, and team collaboration tools.",
              "inLanguage": "en"
            }
          },
          {
            "@type": "Question",
            "name": "Can AI Agents qualify leads automatically?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, Eazybe's WhatsApp AI Agents automatically qualify leads based on conversations, detect cold deals, and update your CRM. AI analyzes chat patterns and helps sales teams prioritize hot leads while automating follow-ups.",
              "inLanguage": "en"
            }
          },
          {
            "@type": "Question",
            "name": "How do AI chatbots help sales teams?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Eazybe's AI chatbots handle initial customer conversations, qualify leads 24/7, detect buying intent, and sync qualified leads to your CRM. Sales teams can focus on closing deals while AI handles routine queries and lead qualification.",
              "inLanguage": "en"
            }
          }
        ]
      },
      // BreadcrumbList Schema
      {
        "@context": "https://schema.org/",
        "@type": "BreadcrumbList",
        "itemListElement": [{
          "@type": "ListItem",
          "position": 1,
          "name": "Eazybe",
          "item": "https://eazybe.com/"
        }]
      },
      // WebPage Schema
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "url": "https://eazybe.com/",
        "name": "WhatsApp AI Agent For Sales Teams | Automate Sales | Eazybe",
        "description": "Automate sales with WhatsApp AI Agents by Eazybe. Qualify leads, detect cold deals, use AI chatbots, and sync conversations with HubSpot, Salesforce, Zoho and other CRMs.",
        "inLanguage": "en-US",
        "datePublished": "2026-02-03T08:00:00+00:00",
        "dateModified": "2026-02-03T10:30:00+00:00"
      },
      // SoftwareApplication Schema
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Eazybe",
        "applicationCategory": "BusinessApplication",
        "applicationSubCategory": "AI Sales Automation, WhatsApp CRM Integration, AI Agents for WhatsApp",
        "operatingSystem": "Web, Chrome Extension",
        "url": "https://eazybe.com/",
        "description": "Eazybe helps sales teams automate WhatsApp conversations with WhatsApp AI agents, qualify leads, detect cold deals, and sync chats with CRM platforms.",
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
          "ratingValue": "4.6",
          "bestRating": "5",
          "worstRating": "1",
          "ratingCount": 800
        },
        "featureList": [
          "WhatsApp AI agents for sales teams",
          "Automatic lead qualification",
          "Cold deal detection",
          "CRM sync for chats and contacts",
          "AI-powered reply suggestions",
          "Shared inbox for team collaboration",
          "Message scheduling"
        ]
      }

    ],
    br: [
      // FAQPage Schema
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "O que \u00e9 o Eazybe?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "O Eazybe \u00e9 uma plataforma de CRM e vendas para WhatsApp que ajuda empresas a gerenciar conversas com clientes, automatizar respostas, rastrear receita e integrar o WhatsApp com ferramentas de CRM populares como HubSpot, Salesforce e mais."
            }
          },
          {
            "@type": "Question",
            "name": "O que \u00e9 Coexist\u00eancia de API do WhatsApp?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A coexist\u00eancia permite que voc\u00ea use o WhatsApp Web e a API do WhatsApp simultaneamente. Isso significa que voc\u00ea pode manter suas conversas manuais enquanto automatiza mensagens em massa e modelos atrav\u00e9s da API."
            }
          },
          {
            "@type": "Question",
            "name": "Quais integra\u00e7\u00f5es o Eazybe suporta?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "O Eazybe se integra com HubSpot, Salesforce, Zoho CRM, Bitrix24, LeadSquared, Freshdesk, Google Sheets e webhooks personalizados. Estamos constantemente adicionando novas integra\u00e7\u00f5es."
            }
          },
          {
            "@type": "Question",
            "name": "O Eazybe \u00e9 seguro de usar?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sim! O Eazybe \u00e9 parceiro de neg\u00f3cios da Meta e compat\u00edvel com LGPD/GDPR. Usamos criptografia de n\u00edvel banc\u00e1rio para proteger seus dados e nunca armazenamos suas credenciais do WhatsApp em nossos servidores."
            }
          },
          {
            "@type": "Question",
            "name": "Como funciona o teste gratuito?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Voc\u00ea pode come\u00e7ar com nosso teste gratuito de 14 dias sem necessidade de cart\u00e3o de cr\u00e9dito. Ap\u00f3s o teste, voc\u00ea pode escolher um plano que atenda \u00e0s suas necessidades - de usu\u00e1rios individuais a equipes empresariais."
            }
          },
          {
            "@type": "Question",
            "name": "Posso usar o Eazybe para colabora\u00e7\u00e3o em equipe?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Com certeza! O Eazybe inclui uma caixa de entrada de equipe compartilhada, modelos de resposta r\u00e1pida, agendador de mensagens e WhatsApp Copilot para ajudar toda a sua equipe a trabalhar de forma eficiente."
            }
          },
          {
            "@type": "Question",
            "name": "Como funciona a Caixa de Entrada de Receita?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A Caixa de Entrada de Receita rastreia e atribui receita a conversas espec\u00edficas do WhatsApp, dando visibilidade sobre quais mensagens levam a vendas e ajudando sua equipe a focar em leads de alto valor."
            }
          }
        ]
      },
      // BreadcrumbList Schema
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Eazybe",
            "item": "https://eazybe.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "BR",
            "item": "https://eazybe.com/br"
          }
        ]
      },
      // Organization Schema
      {
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
        "image": "https://eazybe.com/logo.png",
        "description": "Eazybe \u00e9 uma plataforma de integra\u00e7\u00e3o de CRM para WhatsApp que ajuda equipes de vendas a sincronizar conversas, agendar mensagens e aumentar o engajamento de clientes diretamente no WhatsApp Web.",
        "foundingDate": "2021",
        "sameAs": [
          "https://twitter.com/eazybe",
          "https://linkedin.com/company/eazybe",
          "https://youtube.com/@eazybe"
        ],
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "email": "support@eazybe.com",
            "url": "https://eazybe.com/br",
            "areaServed": "Brazil",
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
        "knowsAbout": ["WhatsApp CRM", "Sales Automation", "CRM Integration", "CRM AI Agents", "Customer Engagement"]
      },
      // WebSite Schema
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://eazybe.com/br/#website",
        "url": "https://eazybe.com/br",
        "name": "Eazybe",
        "description": "Integra\u00e7\u00e3o CRM com WhatsApp | Eazybe - Plataforma de Vendas. Integra\u00e7\u00e3o com HubSpot, Zoho, Salesforce, Google Sheets e mais.",
        "publisher": {
          "@type": "Organization",
          "name": "Eazybe",
          "url": "https://eazybe.com/br"
        },
        "inLanguage": "pt-BR",
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://eazybe.com/br/search?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      },
      // SoftwareApplication Schema
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "@id": "https://eazybe.com/br/#softwareapplication",
        "name": "Eazybe",
        "operatingSystem": "Web, Chrome Extension",
        "applicationCategory": "BusinessApplication",
        "applicationSubCategory": "CRM, Mensageria, Automa\u00e7\u00e3o de WhatsApp",
        "image": ["https://eazybe.com/logo.png"],
        "description": "Eazybe \u00e9 uma extens\u00e3o para Chrome que transforma o WhatsApp Web em uma poderosa ferramenta de CRM. Integra-se ao HubSpot, Zoho, Salesforce e Google Sheets para ajudar equipes de vendas, marketing e suporte no Brasil a gerenciar conversas e dados de clientes com efici\u00eancia.",
        "softwareVersion": "latest",
        "url": "https://eazybe.com/br",
        "downloadUrl": "https://chrome.google.com/webstore/detail/clgficggccelgifppbcaepjdkklfcefd",
        "screenshot": "https://cdn.prod.website-files.com/64cb8fe9dae4f2e5a069eb37/687f71bf8e51d6931ee45917_hero_image_without_AI-p-1080.webp",
        "offers": {
          "@type": "AggregateOffer",
          "url": "https://eazybe.com/br",
          "priceCurrency": "BRL",
          "lowPrice": 96,
          "highPrice": 162,
          "offerCount": 5,
          "availability": "https://schema.org/InStock"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": 4.6,
          "bestRating": 5,
          "worstRating": 1,
          "ratingCount": 800
        },
        "publisher": {
          "@id": "https://eazybe.com/br/#"
        }
      },
      // ProfessionalService Schema
      {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": "https://eazybe.com/br/#professionalservice",
        "name": "Eazybe",
        "url": "https://eazybe.com/br",
        "image": ["https://eazybe.com/logo.png"],
        "logo": "https://eazybe.com/logo.png",
        "telephone": "+13099294280",
        "priceRange": "A partir de $92/m\u00eas",
        "address": {
          "@type": "PostalAddress",
          "addressRegion": "RJ",
          "postalCode": "25943-380",
          "addressCountry": "BR"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -22.870241,
          "longitude": -43.232622
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday"
            ],
            "opens": "00:00",
            "closes": "23:59"
          }
        ]
      }
    ],
    es: [
      // FAQPage Schema
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "inLanguage": "es-ES",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "\u00bfQu\u00e9 es Eazybe?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Eazybe es una plataforma de CRM y ventas para WhatsApp que ayuda a las empresas a gestionar conversaciones con clientes, automatizar respuestas, medir ingresos e integrar WhatsApp con CRMs populares como HubSpot, Salesforce y m\u00e1s."
            }
          },
          {
            "@type": "Question",
            "name": "\u00bfQu\u00e9 es la coexistencia de la API de WhatsApp?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "La coexistencia te permite usar WhatsApp Web y la API de WhatsApp al mismo tiempo. Esto significa que puedes mantener conversaciones manuales mientras automatizas env\u00edos masivos y plantillas mediante la API."
            }
          },
          {
            "@type": "Question",
            "name": "\u00bfQu\u00e9 integraciones admite Eazybe?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Eazybe se integra con HubSpot, Salesforce, Zoho CRM, Bitrix24, LeadSquared, Freshdesk, Google Sheets y webhooks personalizados. Estamos a\u00f1adiendo nuevas integraciones continuamente."
            }
          },
          {
            "@type": "Question",
            "name": "\u00bfEazybe es seguro de usar?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "S\u00ed. Eazybe es Meta Business Partner y cumple con LGPD/GDPR. Usamos cifrado de nivel bancario para proteger tus datos y nunca almacenamos tus credenciales de WhatsApp en nuestros servidores."
            }
          },
          {
            "@type": "Question",
            "name": "\u00bfC\u00f3mo funciona la prueba gratuita?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Puedes empezar con una prueba gratuita de 14 d\u00edas sin tarjeta de cr\u00e9dito. Al finalizar la prueba, puedes elegir un plan que se adapte a tus necesidades, desde usuarios individuales hasta equipos empresariales."
            }
          },
          {
            "@type": "Question",
            "name": "\u00bfPuedo usar Eazybe para colaborar en equipo?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "S\u00ed. Eazybe incluye una bandeja de entrada compartida para equipos, plantillas de respuestas r\u00e1pidas, programador de mensajes y WhatsApp Copilot para que todo el equipo trabaje de forma m\u00e1s eficiente."
            }
          },
          {
            "@type": "Question",
            "name": "\u00bfC\u00f3mo funciona la Bandeja de ingresos (Revenue Inbox)?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "La Bandeja de ingresos rastrea y atribuye ingresos a conversaciones espec\u00edficas de WhatsApp, mostrando qu\u00e9 mensajes generan ventas y ayudando a tu equipo a priorizar leads de alto valor."
            }
          }
        ]
      },
      // Organization Schema
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Eazybe",
        "url": "https://eazybe.com/es",
        "logo": {
          "@type": "ImageObject",
          "url": "https://eazybe.com/logo.png",
          "width": 600,
          "height": 60
        },
        "image": "https://eazybe.com/logo.png",
        "description": "Eazybe es una plataforma de integraci\u00f3n CRM para WhatsApp que ayuda a los equipos de ventas a sincronizar conversaciones, programar mensajes y aumentar el engagement de clientes directamente en WhatsApp Web.",
        "foundingDate": "2021",
        "sameAs": [
          "https://twitter.com/eazybe",
          "https://linkedin.com/company/eazybe",
          "https://youtube.com/@eazybe"
        ],
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "contactType": "atenci\u00f3n al cliente",
            "email": "support@eazybe.com",
            "url": "https://eazybe.com/es",
            "areaServed": "ES",
            "availableLanguage": ["Spanish"]
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
        "knowsAbout": ["CRM de WhatsApp", "Automatizaci\u00f3n de ventas", "Integraci\u00f3n CRM", "Agentes de IA para CRM", "Engagement de clientes"]
      },
      // BreadcrumbList Schema
      {
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
            "name": "ES",
            "item": "https://eazybe.com/es"
          }
        ]
      },
      // WebSite Schema
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "url": "https://eazybe.com/es",
        "name": "Eazybe",
        "description": "Integraci\u00f3n CRM con WhatsApp | Eazybe - Plataforma de ventas. Integraci\u00f3n con HubSpot, Zoho, Salesforce, Google Sheets y m\u00e1s.",
        "publisher": {
          "@type": "Organization",
          "name": "Eazybe"
        },
        "inLanguage": "es-ES",
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://eazybe.com/es/search?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      },
      // SoftwareApplication Schema
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Eazybe",
        "operatingSystem": "Web, Extensi\u00f3n de Chrome",
        "applicationCategory": "BusinessApplication",
        "applicationSubCategory": "CRM, Mensajer\u00eda, Automatizaci\u00f3n de WhatsApp",
        "image": ["https://eazybe.com/logo.png"],
        "description": "Eazybe es una extensi\u00f3n de Chrome que convierte WhatsApp Web en una potente herramienta de CRM. Se integra con HubSpot, Zoho, Salesforce y Google Sheets para ayudar a equipos de ventas, marketing y soporte a gestionar conversaciones y datos de clientes con eficiencia.",
        "softwareVersion": "latest",
        "url": "https://eazybe.com/es",
        "downloadUrl": "https://chrome.google.com/webstore/detail/clgficggccelgifppbcaepjdkklfcefd",
        "screenshot": "https://cdn.prod.website-files.com/64cb8fe9dae4f2e5a069eb37/687f71bf8e51d6931ee45917_hero_image_without_AI-p-1080.webp",
        "offers": {
          "@type": "AggregateOffer",
          "url": "https://eazybe.com/es/precios",
          "priceCurrency": "EUR",
          "lowPrice": 25,
          "highPrice": 42,
          "offerCount": 5,
          "availability": "https://schema.org/InStock"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": 4.6,
          "bestRating": 5,
          "worstRating": 1,
          "ratingCount": 800
        },
        "publisher": {
          "@type": "Organization",
          "name": "Eazybe"
        },
        "inLanguage": "es-ES"
      },
      // ProfessionalService Schema
      {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "Eazybe",
        "url": "https://eazybe.com/es",
        "image": ["https://eazybe.com/logo.png"],
        "logo": "https://eazybe.com/logo.png",
        "telephone": "+13099294280",
        "priceRange": "Desde $92/mes",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday"
            ],
            "opens": "00:00",
            "closes": "23:59"
          }
        ]
      }
    ],
    tr: [
      // FAQPage Schema
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "inLanguage": "tr-TR",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Eazybe nedir?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Eazybe, i\u015fletmelerin m\u00fc\u015fteri konu\u015fmalar\u0131n\u0131 y\u00f6netmesine, yan\u0131tlar\u0131 otomatikle\u015ftirmesine, geliri \u00f6l\u00e7mesine ve WhatsApp'\u0131 HubSpot, Salesforce gibi pop\u00fcler CRM'lerle entegre etmesine yard\u0131mc\u0131 olan bir WhatsApp CRM ve sat\u0131\u015f platformudur."
            }
          },
          {
            "@type": "Question",
            "name": "WhatsApp API Birlikte Kullan\u0131m (Coexistence) nedir?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Birlikte kullan\u0131m, WhatsApp Web ile WhatsApp API'yi ayn\u0131 anda kullanman\u0131za olanak tan\u0131r. B\u00f6ylece manuel sohbetlerinizi s\u00fcrd\u00fcr\u00fcrken API \u00fczerinden toplu mesajlar ve \u015fablonlar\u0131 otomatikle\u015ftirebilirsiniz."
            }
          },
          {
            "@type": "Question",
            "name": "Eazybe hangi entegrasyonlar\u0131 destekler?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Eazybe; HubSpot, Salesforce, Zoho CRM, Bitrix24, LeadSquared, Freshdesk, Google Sheets ve \u00f6zel webhooks ile entegre olur. S\u00fcrekli yeni entegrasyonlar ekliyoruz."
            }
          },
          {
            "@type": "Question",
            "name": "Eazybe'yi kullanmak g\u00fcvenli mi?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Evet. Eazybe bir Meta Business Partner'd\u0131r ve LGPD/GDPR ile uyumludur. Verilerinizi korumak i\u00e7in bankac\u0131l\u0131k seviyesinde \u015fifreleme kullan\u0131r\u0131z ve WhatsApp kimlik bilgilerinizi sunucular\u0131m\u0131zda asla saklamay\u0131z."
            }
          },
          {
            "@type": "Question",
            "name": "\u00dccretsiz deneme nas\u0131l \u00e7al\u0131\u015f\u0131r?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Kredi kart\u0131 gerektirmeden 14 g\u00fcnl\u00fck \u00fccretsiz denemeyle ba\u015flayabilirsiniz. Deneme sonras\u0131, bireysel kullan\u0131mdan kurumsal ekiplere kadar ihtiya\u00e7lar\u0131n\u0131za uygun bir plan se\u00e7ebilirsiniz."
            }
          },
          {
            "@type": "Question",
            "name": "Eazybe'yi ekip i\u00e7i i\u015f birli\u011fi i\u00e7in kullanabilir miyim?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Evet. Eazybe; ekipler i\u00e7in payla\u015f\u0131lan gelen kutusu, h\u0131zl\u0131 yan\u0131t \u015fablonlar\u0131, mesaj planlay\u0131c\u0131 ve WhatsApp Copilot ile t\u00fcm ekibin daha verimli \u00e7al\u0131\u015fmas\u0131na yard\u0131mc\u0131 olur."
            }
          },
          {
            "@type": "Question",
            "name": "Gelir Gelen Kutusu (Revenue Inbox) nas\u0131l \u00e7al\u0131\u015f\u0131r?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Gelir Gelen Kutusu, belirli WhatsApp konu\u015fmalar\u0131na geliri izler ve ili\u015fkilendirir; hangi mesajlar\u0131n sat\u0131\u015fa d\u00f6n\u00fc\u015ft\u00fc\u011f\u00fcn\u00fc g\u00f6sterir ve ekibinizin y\u00fcksek de\u011ferli lead'lere odaklanmas\u0131na yard\u0131mc\u0131 olur."
            }
          }
        ]
      },
      // Organization Schema
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Eazybe",
        "url": "https://eazybe.com/tr",
        "logo": {
          "@type": "ImageObject",
          "url": "https://eazybe.com/logo.png",
          "width": 600,
          "height": 60
        },
        "image": "https://eazybe.com/logo.png",
        "description": "Eazybe, sat\u0131\u015f ekiplerinin WhatsApp Web \u00fczerinden konu\u015fmalar\u0131 senkronize etmesine, mesajlar\u0131 planlamas\u0131na ve m\u00fc\u015fteri etkile\u015fimini art\u0131rmas\u0131na yard\u0131mc\u0131 olan bir WhatsApp CRM entegrasyon platformudur.",
        "foundingDate": "2021",
        "sameAs": [
          "https://twitter.com/eazybe",
          "https://linkedin.com/company/eazybe",
          "https://youtube.com/@eazybe"
        ],
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "contactType": "m\u00fc\u015fteri hizmetleri",
            "email": "support@eazybe.com",
            "url": "https://eazybe.com/tr",
            "areaServed": "TR",
            "availableLanguage": ["Turkish"]
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
        "knowsAbout": ["WhatsApp CRM", "Sat\u0131\u015f otomasyonu", "CRM entegrasyonu", "CRM i\u00e7in yapay zek\u00e2 ajanlar\u0131", "M\u00fc\u015fteri etkile\u015fimi"]
      },
      // BreadcrumbList Schema
      {
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
            "name": "TR",
            "item": "https://eazybe.com/tr"
          }
        ]
      },
      // WebSite Schema
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "url": "https://eazybe.com/tr",
        "name": "Eazybe",
        "description": "WhatsApp ile CRM entegrasyonu | Eazybe - Sat\u0131\u015f Platformu. HubSpot, Zoho, Salesforce, Google Sheets ve daha fazlas\u0131 ile entegrasyon.",
        "publisher": {
          "@type": "Organization",
          "name": "Eazybe"
        },
        "inLanguage": "tr-TR",
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://eazybe.com/tr/search?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      },
      // SoftwareApplication Schema
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Eazybe",
        "operatingSystem": "Web, Chrome Uzant\u0131s\u0131",
        "applicationCategory": "BusinessApplication",
        "applicationSubCategory": "CRM, Mesajla\u015fma, WhatsApp Otomasyonu",
        "image": ["https://eazybe.com/logo.png"],
        "description": "Eazybe, WhatsApp Web'i g\u00fc\u00e7l\u00fc bir CRM arac\u0131na d\u00f6n\u00fc\u015ft\u00fcren bir Chrome uzant\u0131s\u0131d\u0131r. HubSpot, Zoho, Salesforce ve Google Sheets ile entegre olarak sat\u0131\u015f, pazarlama ve destek ekiplerinin konu\u015fmalar\u0131 ve m\u00fc\u015fteri verilerini verimli \u015fekilde y\u00f6netmesine yard\u0131mc\u0131 olur.",
        "softwareVersion": "latest",
        "url": "https://eazybe.com/tr",
        "downloadUrl": "https://chrome.google.com/webstore/detail/clgficggccelgifppbcaepjdkklfcefd",
        "screenshot": "https://cdn.prod.website-files.com/64cb8fe9dae4f2e5a069eb37/687f71bf8e51d6931ee45917_hero_image_without_AI-p-1080.webp",
        "offers": {
          "@type": "AggregateOffer",
          "url": "https://eazybe.com/tr/fiyatlar",
          "priceCurrency": "TRY",
          "lowPrice": 1272,
          "highPrice": 2149,
          "offerCount": 5,
          "availability": "https://schema.org/InStock"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": 4.6,
          "bestRating": 5,
          "worstRating": 1,
          "ratingCount": 800
        },
        "publisher": {
          "@type": "Organization",
          "name": "Eazybe"
        },
        "inLanguage": "tr-TR"
      }
    ],
  }

  return schemas[locale] || schemas.en
}
