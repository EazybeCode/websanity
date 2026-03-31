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

export function getGlobalSchemas(locale: string): GlobalSchemas {
  const schemas: Record<string, GlobalSchemas> = {
    en: {
      softwareApplication: {
        "@context": "https://schema.org/",
        "@type": "SoftwareApplication",
        "name": "Eazybe",
        "applicationCategory": "BusinessApplication",
        "applicationSubCategory": "CRM Integration, WhatsApp Automation, AI Agents for WhatsApp",
        "operatingSystem": "Web, Chrome Extension",
        "url": `${BASE_URL}/`,
        "image": `${BASE_URL}/logo.png`,
        "description": "Eazybe helps sales teams automate WhatsApp conversations with WhatsApp AI agents, qualify leads, detect cold deals, and sync chats with CRM platforms like HubSpot, Zoho, Salesforce, and Google Sheets.",
        "softwareVersion": "latest",
        "downloadUrl": "https://chrome.google.com/webstore/detail/clgficggccelgifppbcaepjdkklfcefd",
        "screenshot": "https://cdn.prod.website-files.com/64cb8fe9dae4f2e5a069eb37/687f71bf8e51d6931ee45917_hero_image_without_AI-p-1080.webp",
        "offers": {
          "@type": "AggregateOffer",
          "url": `${BASE_URL}/pricing`,
          "priceCurrency": "USD",
          "lowPrice": 29,
          "highPrice": 49,
          "offerCount": 5,
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
          "WhatsApp AI agents",
          "Lead qualification",
          "Cold deal detection",
          "AI-powered reply suggestions",
          "Shared inbox for team collaboration",
          "WhatsApp CRM integration"
        ]
      },
      organization: {
        "@context": "https://schema.org/",
        "@type": "Organization",
        "name": "Eazybe",
        "url": `${BASE_URL}/`,
        "logo": { "@type": "ImageObject", "url": `${BASE_URL}/logo.png`, "width": 600, "height": 60 },
        "image": `${BASE_URL}/logo.png`,
        "description": "Eazybe helps sales teams automate WhatsApp conversations with WhatsApp AI agents, qualify leads, detect cold deals, and sync chats with CRM platforms like HubSpot, Zoho, Salesforce, and Google Sheets.",
        "foundingDate": "2022-09-13",
        "founder": {
          "@type": "Person",
          "name": "Sagar Dewan",
          "sameAs": ["https://www.linkedin.com/in/sagar-dewan-b43b9931/"]
        },
        "parentOrganization": { "@type": "Organization", "name": "Eazybe Inc." },
        "sameAs": [
          "https://x.com/EazybeHQ",
          "https://www.linkedin.com/company/eazybe",
          "https://www.youtube.com/@eazybe",
          "https://www.facebook.com/EazyBe.WhatsApp.Marketing/",
          "https://www.threads.com/@eazybe.supercharge",
          "https://www.instagram.com/eazybe.supercharge/"
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
        "name": "Eazybe",
        "applicationCategory": "BusinessApplication",
        "applicationSubCategory": "Integração com CRM, Automação para WhatsApp, Agentes de IA para WhatsApp",
        "operatingSystem": "Web, Extensão Chrome",
        "url": `${BASE_URL}/br`,
        "image": `${BASE_URL}/logo.png`,
        "description": "A Eazybe ajuda equipes de vendas a automatizar conversas no WhatsApp com agentes de IA, qualificar leads, identificar negócios frios e sincronizar chats com plataformas de CRM como HubSpot, Zoho, Salesforce e Google Sheets.",
        "softwareVersion": "latest",
        "downloadUrl": "https://chrome.google.com/webstore/detail/clgficggccelgifppbcaepjdkklfcefd",
        "screenshot": "https://cdn.prod.website-files.com/64cb8fe9dae4f2e5a069eb37/687f71bf8e51d6931ee45917_hero_image_without_AI-p-1080.webp",
        "offers": {
          "@type": "AggregateOffer",
          "url": `${BASE_URL}/br/pricing`,
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
          "ratingCount": 30597
        },
        "featureList": [
          "Agentes de IA para WhatsApp",
          "Qualificação de leads",
          "Detecção de negócios frios",
          "Sugestões de resposta com IA",
          "Caixa de entrada compartilhada para equipes",
          "Integração de CRM com WhatsApp"
        ]
      },
      organization: {
        "@context": "https://schema.org/",
        "@type": "Organization",
        "name": "Eazybe",
        "url": `${BASE_URL}/br`,
        "logo": { "@type": "ImageObject", "url": `${BASE_URL}/logo.png`, "width": 600, "height": 60 },
        "image": `${BASE_URL}/logo.png`,
        "description": "A Eazybe ajuda equipes de vendas a automatizar conversas no WhatsApp com agentes de IA, qualificar leads, identificar negócios frios e sincronizar chats com plataformas de CRM como HubSpot, Zoho, Salesforce e Google Sheets.",
        "foundingDate": "2022-09-13",
        "founder": {
          "@type": "Person",
          "name": "Sagar Dewan",
          "sameAs": ["https://www.linkedin.com/in/sagar-dewan-b43b9931/"]
        },
        "parentOrganization": { "@type": "Organization", "name": "Eazybe Inc." },
        "sameAs": [
          "https://x.com/EazybeHQ",
          "https://www.linkedin.com/company/eazybe",
          "https://www.youtube.com/@eazybe",
          "https://www.facebook.com/EazyBe.WhatsApp.Marketing/",
          "https://www.threads.com/@eazybe.supercharge",
          "https://www.instagram.com/eazybe.supercharge/"
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
        "name": "Eazybe",
        "applicationCategory": "BusinessApplication",
        "applicationSubCategory": "Integración CRM, Automatización de WhatsApp, Agentes de IA para WhatsApp",
        "operatingSystem": "Web, Chrome Extension",
        "url": `${BASE_URL}/es`,
        "image": `${BASE_URL}/logo.png`,
        "description": "Eazybe ayuda a los equipos de ventas a automatizar conversaciones de WhatsApp con agentes de IA, calificar leads, detectar oportunidades estancadas y sincronizar chats con CRM como HubSpot, Zoho, Salesforce y Google Sheets.",
        "softwareVersion": "latest",
        "downloadUrl": "https://chrome.google.com/webstore/detail/clgficggccelgifppbcaepjdkklfcefd",
        "screenshot": "https://cdn.prod.website-files.com/64cb8fe9dae4f2e5a069eb37/687f71bf8e51d6931ee45917_hero_image_without_AI-p-1080.webp",
        "offers": {
          "@type": "AggregateOffer",
          "url": `${BASE_URL}/es/pricing`,
          "priceCurrency": "EUR",
          "lowPrice": 25,
          "highPrice": 42,
          "offerCount": 5,
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
          "Agentes de IA para WhatsApp",
          "Calificación de leads",
          "Detección de oportunidades estancadas",
          "Sugerencias de respuesta con IA",
          "Bandeja de entrada compartida para equipos",
          "Integración de WhatsApp con CRM"
        ]
      },
      organization: {
        "@context": "https://schema.org/",
        "@type": "Organization",
        "name": "Eazybe",
        "url": `${BASE_URL}/es`,
        "logo": { "@type": "ImageObject", "url": `${BASE_URL}/logo.png`, "width": 600, "height": 60 },
        "image": `${BASE_URL}/logo.png`,
        "description": "Eazybe ayuda a los equipos de ventas a automatizar conversaciones de WhatsApp con agentes de IA, calificar leads, detectar oportunidades estancadas y sincronizar chats con CRM como HubSpot, Zoho, Salesforce y Google Sheets.",
        "foundingDate": "2022-09-13",
        "founder": {
          "@type": "Person",
          "name": "Sagar Dewan",
          "sameAs": ["https://www.linkedin.com/in/sagar-dewan-b43b9931/"]
        },
        "parentOrganization": { "@type": "Organization", "name": "Eazybe Inc." },
        "sameAs": [
          "https://x.com/EazybeHQ",
          "https://www.linkedin.com/company/eazybe",
          "https://www.youtube.com/@eazybe",
          "https://www.facebook.com/EazyBe.WhatsApp.Marketing/",
          "https://www.threads.com/@eazybe.supercharge",
          "https://www.instagram.com/eazybe.supercharge/"
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
        "name": "Eazybe",
        "applicationCategory": "BusinessApplication",
        "applicationSubCategory": "CRM Entegrasyonu, WhatsApp Otomasyonu, WhatsApp için Yapay Zeka Ajanları",
        "operatingSystem": "Web, Chrome Uzantısı",
        "url": `${BASE_URL}/tr`,
        "image": `${BASE_URL}/logo.png`,
        "description": "Eazybe, satış ekiplerinin WhatsApp konuşmalarını yapay zeka ajanları ile otomatikleştirmesine, lead'leri nitelendirmesine, soğuyan fırsatları tespit etmesine ve sohbetleri HubSpot, Zoho, Salesforce ve Google Sheets gibi CRM platformlarıyla senkronize etmesine yardımcı olur.",
        "softwareVersion": "latest",
        "downloadUrl": "https://chrome.google.com/webstore/detail/clgficggccelgifppbcaepjdkklfcefd",
        "screenshot": "https://cdn.prod.website-files.com/64cb8fe9dae4f2e5a069eb37/687f71bf8e51d6931ee45917_hero_image_without_AI-p-1080.webp",
        "offers": {
          "@type": "AggregateOffer",
          "url": `${BASE_URL}/tr/pricing`,
          "priceCurrency": "TRY",
          "lowPrice": 1272,
          "highPrice": 2149,
          "offerCount": 5,
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
          "WhatsApp yapay zeka ajanları",
          "Lead nitelendirme",
          "Soğuk fırsat tespiti",
          "Yapay zeka destekli yanıt önerileri",
          "Ekipler için ortak gelen kutusu",
          "WhatsApp CRM entegrasyonu"
        ]
      },
      organization: {
        "@context": "https://schema.org/",
        "@type": "Organization",
        "name": "Eazybe",
        "url": `${BASE_URL}/tr`,
        "logo": { "@type": "ImageObject", "url": `${BASE_URL}/logo.png`, "width": 600, "height": 60 },
        "image": `${BASE_URL}/logo.png`,
        "description": "Eazybe, satış ekiplerinin WhatsApp konuşmalarını yapay zeka ajanları ile otomatikleştirmesine, lead'leri nitelendirmesine, soğuyan fırsatları tespit etmesine ve sohbetleri HubSpot, Zoho, Salesforce ve Google Sheets gibi CRM platformlarıyla senkronize etmesine yardımcı olur.",
        "foundingDate": "2022-09-13",
        "founder": {
          "@type": "Person",
          "name": "Sagar Dewan",
          "sameAs": ["https://www.linkedin.com/in/sagar-dewan-b43b9931/"]
        },
        "parentOrganization": { "@type": "Organization", "name": "Eazybe Inc." },
        "sameAs": [
          "https://x.com/EazybeHQ",
          "https://www.linkedin.com/company/eazybe",
          "https://www.youtube.com/@eazybe",
          "https://www.facebook.com/EazyBe.WhatsApp.Marketing/",
          "https://www.threads.com/@eazybe.supercharge",
          "https://www.instagram.com/eazybe.supercharge/"
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
