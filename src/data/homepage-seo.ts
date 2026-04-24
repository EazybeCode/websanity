import type { Metadata } from 'next'

const BASE_URL = 'https://eazybe.com'

export function getHomepageMetadata(locale: string): Metadata {
  const meta: Record<string, Metadata> = {
    en: {
      title: 'WhatsApp AI Agent: No-Code AI Agents For WhatsApp | Eazybe',
      description: 'Deploy best WhatsApp AI agent for real-time sales & support. Capture leads, complete tasks, sync your CRM with no-code WhatsApp AI agents that work 24/7.',
      keywords: 'whatsapp ai agent, ai agents for whatsapp, no-code whatsapp ai agent, whatsapp ai automation, whatsapp sales ai, whatsapp support ai, whatsapp crm integration, ai agents for sales and support',
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
      openGraph: {
        type: 'website',
        url: `${BASE_URL}/`,
        title: 'No-Code WhatsApp AI Agent: AI Agents For WhatsApp | Eazybe',
        description: 'Deploy no-code WhatsApp AI agents for sales and support. Capture leads, automate conversations, complete tasks, and sync CRM data in real time.',
        images: [{ url: `${BASE_URL}/logo.png`, width: 1200, height: 630, alt: 'Eazybe WhatsApp AI Agent platform for sales and support teams' }],
        locale: 'en_US',
        alternateLocale: ['pt_BR', 'es_ES', 'tr_TR'],
        siteName: 'Eazybe',
      },
      twitter: {
        card: 'summary_large_image',
        site: '@eazybe',
        creator: '@eazybe',
        title: 'WhatsApp AI Agent: Build No-Code AI Agents For WhatsApp',
        description: 'Use WhatsApp AI agents to capture leads, automate support, complete tasks, and sync CRM records with no code.',
        images: [{ url: `${BASE_URL}/logo.png`, alt: 'Eazybe WhatsApp AI agent and CRM automation platform' }],
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
        'article:modified_time': '2026-04-14T10:30:00+00:00',
        'article:section': 'Technology',
        'article:tag': 'WhatsApp AI Agent',
        'twitter:label1': 'Rating',
        'twitter:data1': '4.9/5',
        'twitter:label2': 'Price',
        'twitter:data2': 'Free',
        'answer-type': 'product-information, feature-comparison, how-to',
        'target-audience': 'sales teams, support teams, business owners, CRM managers, B2B teams, growth teams',
        'content-intent': 'informational, commercial-investigation, transactional',
        'conversational-query': 'best whatsapp ai agent, no-code ai agents for whatsapp, whatsapp ai agent for sales, whatsapp ai agent for support, how to connect whatsapp ai to crm',
        'ai-readability': 'conversational, professional, solution-oriented',
        'context-window': 'whatsapp ai agents, sales automation, support automation, crm sync, lead capture, business messaging, no-code workflows',
        'user-problem': 'teams lose leads on WhatsApp, miss follow-ups, and struggle with disconnected sales and support workflows',
        'solution-summary': 'no-code WhatsApp AI agents that automate conversations, capture leads, complete tasks, and sync directly with CRM systems',
        'primary-benefit': 'automate WhatsApp sales and support without losing leads or customer context',
        'use-case': 'sales and support teams managing customer conversations and CRM updates through WhatsApp AI agents',
        'implementation-difficulty': 'easy, no-code setup',
        'time-to-value': 'immediate, real-time automation and sync',
      },
    },
    br: {
      title: 'Agente de IA para WhatsApp: Crie agentes sem c\u00f3digo | Eazybe',
      description: 'Implante o melhor agente de IA para WhatsApp. Capture leads, automatize tarefas e integre seu CRM com agentes no-code ativos 24/7.',
      keywords: 'Agente de IA para WhatsApp, Agentes de IA para WhatsApp, Agentes de IA no WhatsApp, Agente de IA No-Code para WhatsApp, Crie um Agente de IA para WhatsApp',
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
      openGraph: {
        type: 'website',
        url: `${BASE_URL}/br`,
        title: 'Agente de IA para WhatsApp: Automatize vendas e conversas | Eazybe',
        description: 'Automatize conversas no WhatsApp com agentes de IA. Integre com CRM, sincronize chats e gerencie vendas com uma caixa de entrada compartilhada.',
        images: [{ url: `${BASE_URL}/logo.png`, width: 1200, height: 630, alt: 'Eazybe - Agentes de IA para WhatsApp e integra\u00e7\u00e3o com CRM' }],
        locale: 'pt_BR',
        alternateLocale: ['en_US', 'es_ES', 'tr_TR'],
        siteName: 'Eazybe',
      },
      twitter: {
        card: 'summary_large_image',
        site: '@eazybe',
        creator: '@eazybe',
        title: 'Agentes de IA para WhatsApp | Automatize vendas com Eazybe',
        description: 'Integre WhatsApp com CRM e automatize conversas com agentes de IA. Sincronize chats, use inbox compartilhado e aumente suas vendas.',
        images: [{ url: `${BASE_URL}/logo.png`, alt: 'Automa\u00e7\u00e3o WhatsApp com IA e CRM - Eazybe' }],
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
        'twitter:label1': 'Avalia\u00e7\u00e3o',
        'twitter:data1': '4.9/5',
        'twitter:label2': 'Pre\u00e7o',
        'twitter:data2': 'Gr\u00e1tis',
        'answer-type': 'produto, guia, automa\u00e7\u00e3o',
        'target-audience': 'equipes de vendas, donos de empresas, gestores de CRM, profissionais B2B, suporte ao cliente, growth teams',
        'content-intent': 'informativo, investiga\u00e7\u00e3o comercial, transacional',
        'conversational-query': 'como automatizar WhatsApp com IA, melhor CRM com WhatsApp, integra\u00e7\u00e3o WhatsApp CRM, agentes de IA para vendas, como gerenciar leads do WhatsApp',
        'ai-readability': 'conversacional, profissional, focado em solu\u00e7\u00e3o',
        'context-window': 'automa\u00e7\u00e3o WhatsApp, agentes de IA, integra\u00e7\u00e3o CRM, gest\u00e3o de leads, comunica\u00e7\u00e3o com clientes, automa\u00e7\u00e3o de vendas, inbox compartilhado',
        'user-problem': 'leads perdidos no WhatsApp, follow-ups esquecidos, comunica\u00e7\u00e3o de vendas desorganizada',
        'solution-summary': 'automa\u00e7\u00e3o de WhatsApp com agentes de IA e sincroniza\u00e7\u00e3o direta com CRM',
        'primary-benefit': 'automatizar conversas e aumentar convers\u00f5es sem esfor\u00e7o manual',
        'use-case': 'equipes gerenciando vendas e conversas do WhatsApp diretamente dentro do CRM',
        'implementation-difficulty': 'f\u00e1cil, configura\u00e7\u00e3o em poucos minutos',
        'time-to-value': 'imediato, resultados em tempo real',
      },
    },
    es: {
      title: 'Agente de IA para WhatsApp: Crea agentes sin c\u00f3digo | Eazybe',
      description: 'Implementa el mejor agente de IA para WhatsApp sin c\u00f3digo. Captura leads, automatiza conversaciones y sincroniza tu CRM con agentes de IA que trabajan 24/7.',
      keywords: 'agente de IA para WhatsApp, automatizaci\u00f3n WhatsApp IA, chatbot WhatsApp IA, agentes de ventas con IA, soporte con IA WhatsApp, integraci\u00f3n CRM WhatsApp, agentes no-code WhatsApp, automatizar WhatsApp',
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
      openGraph: {
        type: 'website',
        url: `${BASE_URL}/es`,
        title: 'Agente de IA para WhatsApp: Automatiza ventas y soporte | Eazybe',
        description: 'Crea agentes de IA para WhatsApp sin c\u00f3digo. Automatiza conversaciones, captura leads y sincroniza tu CRM en tiempo real.',
        images: [{ url: `${BASE_URL}/logo.png`, width: 1200, height: 630, alt: 'Plataforma de agentes de IA para WhatsApp de Eazybe' }],
        locale: 'es_ES',
        alternateLocale: ['en_US', 'pt_BR', 'tr_TR'],
        siteName: 'Eazybe',
      },
      twitter: {
        card: 'summary_large_image',
        site: '@eazybe',
        creator: '@eazybe',
        title: 'Agentes de IA para WhatsApp | Automatiza ventas con Eazybe',
        description: 'Automatiza WhatsApp con agentes de IA. Captura leads, responde clientes y sincroniza tu CRM sin c\u00f3digo.',
        images: [{ url: `${BASE_URL}/logo.png`, alt: 'Automatizaci\u00f3n de WhatsApp con IA y CRM - Eazybe' }],
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
        'article:section': 'Tecnolog\u00eda',
        'article:tag': 'Agente IA WhatsApp',
        'twitter:label1': 'Valoraci\u00f3n',
        'twitter:data1': '4.9/5',
        'twitter:label2': 'Precio',
        'twitter:data2': 'Gratis',
        'answer-type': 'informaci\u00f3n del producto, comparaci\u00f3n, gu\u00eda',
        'target-audience': 'equipos de ventas, atenci\u00f3n al cliente, empresas B2B, gestores de CRM, emprendedores, equipos de crecimiento',
        'content-intent': 'informativo, investigaci\u00f3n comercial, transaccional',
        'conversational-query': 'mejor agente de IA para WhatsApp, c\u00f3mo automatizar WhatsApp con IA, agentes IA para ventas, agentes IA para soporte, integraci\u00f3n WhatsApp CRM',
        'ai-readability': 'conversacional, profesional, orientado a soluciones',
        'context-window': 'agentes de IA WhatsApp, automatizaci\u00f3n de ventas, soporte automatizado, sincronizaci\u00f3n CRM, captaci\u00f3n de leads, mensajer\u00eda empresarial',
        'user-problem': 'los equipos pierden leads en WhatsApp, olvidan seguimientos y tienen procesos de ventas desconectados',
        'solution-summary': 'agentes de IA para WhatsApp sin c\u00f3digo que automatizan conversaciones y sincronizan datos con el CRM',
        'primary-benefit': 'automatizar ventas y soporte en WhatsApp sin perder leads ni contexto',
        'use-case': 'equipos gestionando conversaciones y ventas de WhatsApp directamente integradas con su CRM',
        'implementation-difficulty': 'f\u00e1cil, sin c\u00f3digo',
        'time-to-value': 'inmediato, automatizaci\u00f3n en tiempo real',
      },
    },
    tr: {
      title: 'WhatsApp AI Ajan\u0131: Kodsuz AI Ajanlar\u0131 Olu\u015fturun | Eazybe',
      description: "WhatsApp i\u00e7in en iyi AI ajan\u0131n\u0131 kullan\u0131n. Lead yakala\u0131n, konu\u015fmalar\u0131 otomatikle\u015ftirin ve CRM'inizi 7/24 \u00e7al\u0131\u015fan kodsuz AI ajanlarla senkronize edin.",
      keywords: 'whatsapp ai ajan\u0131, whatsapp yapay zeka ajan\u0131, whatsapp otomasyon ai, whatsapp chatbot ai, sat\u0131\u015f i\u00e7in ai ajan\u0131, destek i\u00e7in ai ajan\u0131, whatsapp crm entegrasyonu, kodsuz whatsapp ai ajan\u0131',
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
      openGraph: {
        type: 'website',
        url: `${BASE_URL}/tr`,
        title: 'WhatsApp AI Ajan\u0131: Sat\u0131\u015f ve destek otomasyonu | Eazybe',
        description: 'Kodsuz WhatsApp AI ajanlar\u0131 ile konu\u015fmalar\u0131 otomatikle\u015ftirin, lead yakala\u0131n ve CRM verilerinizi ger\u00e7ek zamanl\u0131 senkronize edin.',
        images: [{ url: `${BASE_URL}/logo.png`, width: 1200, height: 630, alt: 'Eazybe WhatsApp AI ajan platformu' }],
        locale: 'tr_TR',
        alternateLocale: ['en_US', 'pt_BR', 'es_ES'],
        siteName: 'Eazybe',
      },
      twitter: {
        card: 'summary_large_image',
        site: '@eazybe',
        creator: '@eazybe',
        title: 'WhatsApp AI Ajanlar\u0131 | Sat\u0131\u015f ve destek otomasyonu',
        description: "WhatsApp AI ajanlar\u0131 ile lead yakala\u0131n, m\u00fc\u015fteri mesajlar\u0131n\u0131 otomatik y\u00f6netin ve CRM'inizi entegre edin.",
        images: [{ url: `${BASE_URL}/logo.png`, alt: 'WhatsApp AI otomasyon ve CRM entegrasyonu - Eazybe' }],
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
        'article:section': 'Teknoloji',
        'article:tag': 'WhatsApp AI Ajan\u0131',
        'twitter:label1': 'De\u011ferlendirme',
        'twitter:data1': '4.7/5',
        'twitter:label2': 'Fiyat',
        'twitter:data2': '\u00dccretsiz',
        'answer-type': '\u00fcr\u00fcn bilgisi, kar\u015f\u0131la\u015ft\u0131rma, rehber',
        'target-audience': 'sat\u0131\u015f ekipleri, destek ekipleri, i\u015fletme sahipleri, CRM y\u00f6neticileri, B2B ekipleri, b\u00fcy\u00fcme ekipleri',
        'content-intent': 'bilgilendirici, ticari ara\u015ft\u0131rma, d\u00f6n\u00fc\u015f\u00fcm odakl\u0131',
        'conversational-query': 'en iyi whatsapp ai ajan\u0131, whatsapp ai otomasyonu nas\u0131l yap\u0131l\u0131r, sat\u0131\u015f i\u00e7in ai ajanlar\u0131, destek i\u00e7in ai chatbot, whatsapp crm entegrasyonu nas\u0131l yap\u0131l\u0131r',
        'ai-readability': 'konu\u015fma dili, profesyonel, \u00e7\u00f6z\u00fcm odakl\u0131',
        'context-window': "whatsapp ai ajanlar\u0131, sat\u0131\u015f otomasyonu, m\u00fc\u015fteri deste\u011fi otomasyonu, crm entegrasyonu, lead y\u00f6netimi, i\u015f mesajla\u015fmas\u0131",
        'user-problem': "ekipler WhatsApp'ta lead kaybediyor, takipleri ka\u00e7\u0131r\u0131yor ve sat\u0131\u015f ile destek s\u00fcre\u00e7leri da\u011f\u0131n\u0131k ilerliyor",
        'solution-summary': 'kodsuz WhatsApp AI ajanlar\u0131 ile konu\u015fmalar\u0131 otomatikle\u015ftirme ve CRM ile senkronizasyon',
        'primary-benefit': 'WhatsApp \u00fczerinden sat\u0131\u015f ve destek s\u00fcre\u00e7lerini otomatikle\u015ftirerek lead kayb\u0131n\u0131 \u00f6nlemek',
        'use-case': "sat\u0131\u015f ve destek ekiplerinin WhatsApp konu\u015fmalar\u0131n\u0131 CRM ile entegre \u015fekilde y\u00f6netmesi",
        'implementation-difficulty': 'kolay, kod gerektirmez',
        'time-to-value': 'an\u0131nda, ger\u00e7ek zamanl\u0131 otomasyon',
      },
    },
  }

  return meta[locale] || meta.en
}

export function getHomepageJsonLd(locale: string): object[] {
  const schemas: Record<string, object[]> = {
    en: [
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
              "text": "Voc\u00ea pode come\u00e7ar com nosso teste gratuito de 4 dias sem necessidade de cart\u00e3o de cr\u00e9dito. Ap\u00f3s o teste, voc\u00ea pode escolher um plano que atenda \u00e0s suas necessidades - de usu\u00e1rios individuais a equipes empresariais."
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
    ],
  }

  return schemas[locale] || schemas.en
}
