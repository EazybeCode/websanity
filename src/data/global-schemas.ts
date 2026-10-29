/**
 * Global JSON-LD schemas for SoftwareApplication and Organization
 * Localized for all supported locales (en, br, es, tr)
 * Used across all pages via the locale layout
 */

export interface GlobalSchemas {
  softwareApplication: object
  organization: object
}

const BASE_URL = 'https://eazybe.com'
const CHROME_STORE_URL = 'https://chrome.google.com/webstore/detail/aihpfgoknheimieofcfjiobnmddldjeb'
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.eazybe.workspace'
// Real product screen from the homepage CRM section
const SCREENSHOT_URL = `${BASE_URL}/homepage/refined-crm/hubspot.webp`
// Stable node ids so page-level schemas (WebPage, FAQPage) can reference these
export const ORG_ID = `${BASE_URL}/#organization`
export const SOFTWARE_ID = `${BASE_URL}/#software`

export function getGlobalSchemas(locale: string): GlobalSchemas {
  const schemas: Record<string, GlobalSchemas> = {
    en: {
      softwareApplication: {
        "@context": "https://schema.org/",
        "@type": "SoftwareApplication",
        "@id": SOFTWARE_ID,
        "publisher": { "@id": ORG_ID },
        "name": "Eazybe",
        "applicationCategory": "BusinessApplication",
        "applicationSubCategory": "WhatsApp CRM Integration, Sales Intelligence, AI Agents for WhatsApp and Calls",
        "operatingSystem": "Web, Chrome Extension, Android",
        "url": `${BASE_URL}/`,
        "image": `${BASE_URL}/logo.png`,
        "description": "Eazybe powers sales conversations across WhatsApp and calls. It connects your team's personal WhatsApp numbers, WhatsApp groups and calls to your CRM (HubSpot, Salesforce, Zoho, Pipedrive and more), and lets AI handle qualification and follow-ups.",
        "downloadUrl": CHROME_STORE_URL,
        "installUrl": PLAY_STORE_URL,
        "screenshot": SCREENSHOT_URL,
        // Live pricing page (US): Starter annual $19 → Basic AI monthly $79; 3 priced plans (Custom AI = contact sales)
        "offers": {
          "@type": "AggregateOffer",
          "url": `${BASE_URL}/pricing`,
          "priceCurrency": "USD",
          "lowPrice": 19,
          "highPrice": 79,
          "offerCount": 3,
          "availability": "https://schema.org/InStock"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": 4.9,
          "bestRating": 5,
          "worstRating": 1,
          "ratingCount": 30597
        },
        "featureList": [
          "WhatsApp CRM sync",
          "WhatsApp groups in the CRM",
          "Call tracking and auto dialer",
          "Broadcast from WhatsApp Web, Google Sheets, CRM or API",
          "Sales intelligence (AI-filled CRM fields)",
          "WhatsApp, Voice and Website AI agents",
          "Privacy controls for business chats"
        ]
      },
      organization: {
        "@context": "https://schema.org/",
        "@type": "Organization",
        "@id": ORG_ID,
        "name": "Eazybe",
        "url": `${BASE_URL}/`,
        "logo": { "@type": "ImageObject", "url": `${BASE_URL}/logo.png`, "width": 1608, "height": 377 },
        "image": `${BASE_URL}/logo.png`,
        "description": "Eazybe helps sales teams automate WhatsApp conversations with WhatsApp AI agents, qualify leads, detect cold deals, and sync chats with CRM platforms like HubSpot, Zoho, Salesforce, and Google Sheets.",
        "foundingDate": "2022-09-13",
        "founder": {
          "@type": "Person",
          "name": "Sagar Dewan",
          "sameAs": ["https://www.linkedin.com/in/sagar-dewan-b43b9931/"]
        },
        "legalName": "Eazybe, Inc.",
        "sameAs": [
          "https://x.com/EazybeHQ",
          "https://www.linkedin.com/company/eazybe",
          "https://www.youtube.com/@eazybe",
          "https://www.facebook.com/EazyBe.WhatsApp.Marketing/",
          "https://www.threads.com/@eazybe.supercharge",
          "https://www.instagram.com/eazybe.supercharge/",
          PLAY_STORE_URL
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer support",
          "email": "support@eazybe.com",
          "url": `${BASE_URL}/`,
          "areaServed": "US",
          "availableLanguage": ["English"]
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "8, The Green STE B",
          "addressLocality": "Dover",
          "addressRegion": "DE",
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
      }
    },
    br: {
      softwareApplication: {
        "@context": "https://schema.org/",
        "@type": "SoftwareApplication",
        "@id": SOFTWARE_ID,
        "publisher": { "@id": ORG_ID },
        "name": "Eazybe",
        "applicationCategory": "BusinessApplication",
        "applicationSubCategory": "Integração do WhatsApp com CRM, Inteligência de vendas, Agentes de IA para WhatsApp e ligações",
        "operatingSystem": "Web, Extensão Chrome, Android",
        "url": `${BASE_URL}/br`,
        "image": `${BASE_URL}/logo.png`,
        "description": "O Eazybe impulsiona conversas de vendas no WhatsApp e em ligações. Conecta os números pessoais de WhatsApp da sua equipe, os grupos de WhatsApp e as ligações ao seu CRM (HubSpot, Salesforce, Zoho, Pipedrive e mais) e deixa a IA cuidar da qualificação e dos follow-ups.",
        "downloadUrl": CHROME_STORE_URL,
        "installUrl": PLAY_STORE_URL,
        "screenshot": SCREENSHOT_URL,
        // Live /br/pricing (BRL): Inicial anual R$63 → IA Básica mensal R$261
        "offers": {
          "@type": "AggregateOffer",
          "url": `${BASE_URL}/br/pricing`,
          "priceCurrency": "BRL",
          "lowPrice": 63,
          "highPrice": 261,
          "offerCount": 3,
          "availability": "https://schema.org/InStock"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": 4.9,
          "bestRating": 5,
          "worstRating": 1,
          "ratingCount": 30597
        },
        "featureList": [
          "Sincronização do WhatsApp com o CRM",
          "Grupos de WhatsApp no CRM",
          "Rastreamento de ligações e discador automático",
          "Disparos a partir do WhatsApp Web, Google Sheets, CRM ou API",
          "Inteligência de vendas (campos do CRM preenchidos pela IA)",
          "Agentes de IA para WhatsApp, voz e site",
          "Controles de privacidade para conversas de negócios"
        ]
      },
      organization: {
        "@context": "https://schema.org/",
        "@type": "Organization",
        "@id": ORG_ID,
        "name": "Eazybe",
        "url": `${BASE_URL}/br`,
        "logo": { "@type": "ImageObject", "url": `${BASE_URL}/logo.png`, "width": 1608, "height": 377 },
        "image": `${BASE_URL}/logo.png`,
        "description": "A Eazybe ajuda equipes de vendas a automatizar conversas no WhatsApp com agentes de IA, qualificar leads, identificar negócios frios e sincronizar chats com plataformas de CRM como HubSpot, Zoho, Salesforce e Google Sheets.",
        "foundingDate": "2022-09-13",
        "founder": {
          "@type": "Person",
          "name": "Sagar Dewan",
          "sameAs": ["https://www.linkedin.com/in/sagar-dewan-b43b9931/"]
        },
        "legalName": "Eazybe, Inc.",
        "sameAs": [
          "https://x.com/EazybeHQ",
          "https://www.linkedin.com/company/eazybe",
          "https://www.youtube.com/@eazybe",
          "https://www.facebook.com/EazyBe.WhatsApp.Marketing/",
          "https://www.threads.com/@eazybe.supercharge",
          "https://www.instagram.com/eazybe.supercharge/",
          PLAY_STORE_URL
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "suporte ao cliente",
          "email": "support@eazybe.com",
          "url": `${BASE_URL}/br`,
          "areaServed": "Brazil",
          "availableLanguage": ["Português"]
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "8, The Green STE B",
          "addressLocality": "Dover",
          "addressRegion": "DE",
          "postalCode": "19901",
          "addressCountry": "US"
        },
        "knowsAbout": [
          "Agente de IA para WhatsApp",
          "Agentes de IA para equipes de vendas",
          "Integração de CRM com WhatsApp",
          "Automação de vendas",
          "Qualificação de leads",
          "Sincronização com CRM"
        ]
      }
    },
    es: {
      softwareApplication: {
        "@context": "https://schema.org/",
        "@type": "SoftwareApplication",
        "@id": SOFTWARE_ID,
        "publisher": { "@id": ORG_ID },
        "name": "Eazybe",
        "applicationCategory": "BusinessApplication",
        "applicationSubCategory": "Integración de WhatsApp con CRM, Inteligencia de ventas, Agentes de IA para WhatsApp y llamadas",
        "operatingSystem": "Web, Extensión de Chrome, Android",
        "url": `${BASE_URL}/es`,
        "image": `${BASE_URL}/logo.png`,
        "description": "Eazybe impulsa las conversaciones de venta en WhatsApp y llamadas. Conecta a tu CRM (HubSpot, Salesforce, Zoho, Pipedrive y más) los números personales de WhatsApp de tu equipo, los grupos de WhatsApp y las llamadas, y deja que la IA se encargue de calificar y dar seguimiento.",
        "downloadUrl": CHROME_STORE_URL,
        "installUrl": PLAY_STORE_URL,
        "screenshot": SCREENSHOT_URL,
        // Live /es/pricing for Spain (EUR): Inicial anual €17 → IA Básica mensual €71
        "offers": {
          "@type": "AggregateOffer",
          "url": `${BASE_URL}/es/pricing`,
          "priceCurrency": "EUR",
          "lowPrice": 17,
          "highPrice": 71,
          "offerCount": 3,
          "availability": "https://schema.org/InStock"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": 4.9,
          "bestRating": 5,
          "worstRating": 1,
          "ratingCount": 30597
        },
        "featureList": [
          "Sincronización de WhatsApp con el CRM",
          "Grupos de WhatsApp en el CRM",
          "Seguimiento de llamadas y marcador automático",
          "Difusiones desde WhatsApp Web, Google Sheets, CRM o API",
          "Inteligencia de ventas (campos del CRM completados por IA)",
          "Agentes de IA para WhatsApp, voz y sitio web",
          "Controles de privacidad para chats de negocio"
        ]
      },
      organization: {
        "@context": "https://schema.org/",
        "@type": "Organization",
        "@id": ORG_ID,
        "name": "Eazybe",
        "url": `${BASE_URL}/es`,
        "logo": { "@type": "ImageObject", "url": `${BASE_URL}/logo.png`, "width": 1608, "height": 377 },
        "image": `${BASE_URL}/logo.png`,
        "description": "Eazybe ayuda a los equipos de ventas a automatizar conversaciones de WhatsApp con agentes de IA, calificar leads, detectar oportunidades estancadas y sincronizar chats con CRM como HubSpot, Zoho, Salesforce y Google Sheets.",
        "foundingDate": "2022-09-13",
        "founder": {
          "@type": "Person",
          "name": "Sagar Dewan",
          "sameAs": ["https://www.linkedin.com/in/sagar-dewan-b43b9931/"]
        },
        "legalName": "Eazybe, Inc.",
        "sameAs": [
          "https://x.com/EazybeHQ",
          "https://www.linkedin.com/company/eazybe",
          "https://www.youtube.com/@eazybe",
          "https://www.facebook.com/EazyBe.WhatsApp.Marketing/",
          "https://www.threads.com/@eazybe.supercharge",
          "https://www.instagram.com/eazybe.supercharge/",
          PLAY_STORE_URL
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer support",
          "email": "support@eazybe.com",
          "url": `${BASE_URL}/es`,
          "areaServed": "ES",
          "availableLanguage": ["Spanish"]
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "8, The Green STE B",
          "addressLocality": "Dover",
          "addressRegion": "DE",
          "postalCode": "19901",
          "addressCountry": "US"
        },
        "knowsAbout": [
          "Agente de IA para WhatsApp",
          "Agentes de IA para equipos de ventas",
          "Integración de WhatsApp con CRM",
          "Automatización de ventas",
          "Calificación de leads",
          "Sincronización con CRM"
        ]
      }
    },
    tr: {
      softwareApplication: {
        "@context": "https://schema.org/",
        "@type": "SoftwareApplication",
        "@id": SOFTWARE_ID,
        "publisher": { "@id": ORG_ID },
        "name": "Eazybe",
        "applicationCategory": "BusinessApplication",
        "applicationSubCategory": "WhatsApp CRM Entegrasyonu, Satış Zekası, WhatsApp ve Aramalar için Yapay Zeka Ajanları",
        "operatingSystem": "Web, Chrome Uzantısı, Android",
        "url": `${BASE_URL}/tr`,
        "image": `${BASE_URL}/logo.png`,
        "description": "Eazybe, WhatsApp'ta ve aramalarda satış konuşmalarınıza güç verir. Ekibinizin kişisel WhatsApp numaralarını, WhatsApp gruplarını ve aramalarını CRM'inize (HubSpot, Salesforce, Zoho, Pipedrive ve daha fazlası) bağlar; nitelendirme ve takipleri Yapay Zeka'ya bırakır.",
        "downloadUrl": CHROME_STORE_URL,
        "installUrl": PLAY_STORE_URL,
        "screenshot": SCREENSHOT_URL,
        // Live /tr/pricing (TRY): Başlangıç yıllık ₺947 → Temel Yapay Zeka aylık ₺3939 (moves with the exchange rate)
        "offers": {
          "@type": "AggregateOffer",
          "url": `${BASE_URL}/tr/pricing`,
          "priceCurrency": "TRY",
          "lowPrice": 947,
          "highPrice": 3939,
          "offerCount": 3,
          "availability": "https://schema.org/InStock"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": 4.9,
          "bestRating": 5,
          "worstRating": 1,
          "ratingCount": 30597
        },
        "featureList": [
          "WhatsApp CRM senkronizasyonu",
          "CRM'de WhatsApp grupları",
          "Arama takibi ve otomatik arayıcı",
          "WhatsApp Web, Google Sheets, CRM veya API'den toplu mesaj",
          "Satış zekası (Yapay Zeka ile doldurulan CRM alanları)",
          "WhatsApp, sesli arama ve web sitesi için Yapay Zeka ajanları",
          "İş sohbetleri için gizlilik kontrolleri"
        ]
      },
      organization: {
        "@context": "https://schema.org/",
        "@type": "Organization",
        "@id": ORG_ID,
        "name": "Eazybe",
        "url": `${BASE_URL}/tr`,
        "logo": { "@type": "ImageObject", "url": `${BASE_URL}/logo.png`, "width": 1608, "height": 377 },
        "image": `${BASE_URL}/logo.png`,
        "description": "Eazybe, satış ekiplerinin WhatsApp konuşmalarını yapay zeka ajanları ile otomatikleştirmesine, lead'leri nitelendirmesine, soğuyan fırsatları tespit etmesine ve sohbetleri HubSpot, Zoho, Salesforce ve Google Sheets gibi CRM platformlarıyla senkronize etmesine yardımcı olur.",
        "foundingDate": "2022-09-13",
        "founder": {
          "@type": "Person",
          "name": "Sagar Dewan",
          "sameAs": ["https://www.linkedin.com/in/sagar-dewan-b43b9931/"]
        },
        "legalName": "Eazybe, Inc.",
        "sameAs": [
          "https://x.com/EazybeHQ",
          "https://www.linkedin.com/company/eazybe",
          "https://www.youtube.com/@eazybe",
          "https://www.facebook.com/EazyBe.WhatsApp.Marketing/",
          "https://www.threads.com/@eazybe.supercharge",
          "https://www.instagram.com/eazybe.supercharge/",
          PLAY_STORE_URL
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "müşteri desteği",
          "email": "support@eazybe.com",
          "url": `${BASE_URL}/tr`,
          "areaServed": "TR",
          "availableLanguage": ["Türkçe"]
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "8, The Green STE B",
          "addressLocality": "Dover",
          "addressRegion": "DE",
          "postalCode": "19901",
          "addressCountry": "US"
        },
        "knowsAbout": [
          "WhatsApp yapay zeka ajanı",
          "Satış ekipleri için yapay zeka ajanları",
          "WhatsApp CRM entegrasyonu",
          "Satış otomasyonu",
          "Lead nitelendirme",
          "CRM senkronizasyonu"
        ]
      }
    }
  }

  return schemas[locale] || schemas.en
}
