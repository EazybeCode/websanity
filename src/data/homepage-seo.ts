import type { Metadata } from 'next'
import { getV16Faq } from '@/components/homepage-v16/localize-v16'
import { ORG_ID, SOFTWARE_ID, getGlobalSchemas } from '@/data/global-schemas'

const BASE_URL = 'https://eazybe.com'

export function getHomepageMetadata(locale: string): Metadata {
  const meta: Record<string, Metadata> = {
    en: {
      title: 'Eazybe - Sales Intelligence Platform For WhatsApp & CRM',
      description: 'Connect your team\'s personal WhatsApp numbers, groups and calls to HubSpot, Salesforce, Zoho and more. AI handles qualification and follow-ups.',
      keywords: 'whatsapp ai agent, ai agents for whatsapp, whatsapp ai agents, ai agent for whatsapp, ai agent on whatsapp, no code whatsapp ai agent, ai agent for whatsapp automation, ai agent whatsapp business, best whatsapp ai agent, top whatsapp ai agent, whatsapp ai agent provider, build ai agent for whatsapp, benefits of using a whatsapp ai agent, ai whatsapp agent, whatsapp agent ai, agent ai whatsapp, ai in whatsapp',
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
        images: [{ url: `${BASE_URL}/og-home-en.png`, width: 1200, height: 630, alt: 'Eazybe: Powering sales conversations across WhatsApp and calls' }],
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
        images: [{ url: `${BASE_URL}/og-home-en.png`, width: 1200, height: 630, alt: 'Eazybe: Powering sales conversations across WhatsApp and calls' }],
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
        'thumbnail': `${BASE_URL}/og-home-en.png`,
        'article:published_time': '2026-02-03T08:00:00+00:00',
        'article:modified_time': '2026-04-14T10:30:00+00:00',
        'article:section': 'Technology',
        'article:tag': 'WhatsApp AI Agent',
        'twitter:label1': 'Rating',
        'twitter:data1': '4.2/5',
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
      title: 'Eazybe - Plataforma de inteligência de vendas para WhatsApp e CRM',
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
        title: 'Agente de IA para WhatsApp: Crie agentes sem código | Eazybe',
        description: 'Automatize conversas no WhatsApp com agentes de IA. Integre com CRM, sincronize chats e gerencie vendas com uma caixa de entrada compartilhada.',
        images: [{ url: `${BASE_URL}/og-home-br.png`, width: 1200, height: 630, alt: 'Eazybe: Impulsionando conversas de vendas no WhatsApp e em ligações' }],
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
        images: [{ url: `${BASE_URL}/og-home-br.png`, width: 1200, height: 630, alt: 'Eazybe: Impulsionando conversas de vendas no WhatsApp e em ligações' }],
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
        'thumbnail': `${BASE_URL}/og-home-br.png`,
        'twitter:label1': 'Avalia\u00e7\u00e3o',
        'twitter:data1': '4.2/5',
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
      title: 'Eazybe - Plataforma de inteligencia de ventas para WhatsApp y CRM',
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
        title: 'Agente de IA para WhatsApp: Crea agentes sin código | Eazybe',
        description: 'Crea agentes de IA para WhatsApp sin c\u00f3digo. Automatiza conversaciones, captura leads y sincroniza tu CRM en tiempo real.',
        images: [{ url: `${BASE_URL}/og-home-es.png`, width: 1200, height: 630, alt: 'Eazybe: Impulsamos conversaciones de venta en WhatsApp y llamadas' }],
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
        images: [{ url: `${BASE_URL}/og-home-es.png`, width: 1200, height: 630, alt: 'Eazybe: Impulsamos conversaciones de venta en WhatsApp y llamadas' }],
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
        'thumbnail': `${BASE_URL}/og-home-es.png`,
        'article:section': 'Tecnolog\u00eda',
        'article:tag': 'Agente IA WhatsApp',
        'twitter:label1': 'Valoraci\u00f3n',
        'twitter:data1': '4.2/5',
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
      title: 'Eazybe - WhatsApp ve CRM için satış zekâsı platformu',
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
        images: [{ url: `${BASE_URL}/og-home-tr.png`, width: 1200, height: 630, alt: 'Eazybe: Satış konuşmalarınıza güç veriyoruz: WhatsApp\'ta ve aramalarda' }],
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
        images: [{ url: `${BASE_URL}/og-home-tr.png`, width: 1200, height: 630, alt: 'Eazybe: Satış konuşmalarınıza güç veriyoruz: WhatsApp\'ta ve aramalarda' }],
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
        'thumbnail': `${BASE_URL}/og-home-tr.png`,
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

const LANGUAGE_TAGS: Record<string, string> = { en: 'en-US', br: 'pt-BR', es: 'es-ES', tr: 'tr-TR' }
const pageUrl = (locale: string) => (locale === 'en' ? `${BASE_URL}/` : `${BASE_URL}/${locale}`)

// FAQPage + WebPage are built from what the page actually renders (visible FAQ,
// real <title>/description, hero H1) so they stay in sync with the content.
function getHomepageFaqJsonLd(locale: string): object {
  const url = pageUrl(locale)
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    "mainEntityOfPage": { "@id": `${url}#webpage` },
    "publisher": { "@id": ORG_ID },
    "inLanguage": LANGUAGE_TAGS[locale] ?? LANGUAGE_TAGS.en,
    "mainEntity": getV16Faq(locale).map(({ question, answer }) => ({
      "@type": "Question",
      "name": question,
      "acceptedAnswer": { "@type": "Answer", "text": answer },
    })),
  }
}

function getHomepageWebPageJsonLd(locale: string): object {
  const meta = getHomepageMetadata(locale)
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl(locale)}#webpage`,
    "url": pageUrl(locale),
    "name": String(meta.title),
    "description": meta.description,
    "inLanguage": LANGUAGE_TAGS[locale] ?? LANGUAGE_TAGS.en,
    "publisher": { "@id": ORG_ID },
    "about": { "@id": SOFTWARE_ID },
    "mainEntity": { "@id": `${pageUrl(locale)}#faq` },
    "datePublished": "2026-02-03T08:00:00+00:00",
    // Static page: this is the build/deploy time, i.e. when the content last changed.
    "dateModified": new Date().toISOString(),
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["#ezv16 h1", "#ezv16 h1 + p"]
    }
  }
}

export function getHomepageJsonLd(locale: string): object[] {
  const schemas: Record<string, object[]> = {
    en: [
      // Organization is emitted globally (GlobalStructuredData); the
      // SoftwareApplication is added for every locale in the return below.
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
    ],
    br: [
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
      },
    ],
    es: [
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
      },
    ],
    tr: [
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

  const key = schemas[locale] ? locale : 'en'
  // The product schema (with its aggregateRating) lives on the homepage only: see the
  // note in GlobalStructuredData.
  return [
    getGlobalSchemas(locale).softwareApplication,
    getHomepageFaqJsonLd(key),
    ...schemas[key],
    getHomepageWebPageJsonLd(key),
  ]
}
