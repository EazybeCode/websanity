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
const CHROME_STORE_LISTING_URL = 'https://chromewebstore.google.com/detail/eazybe-whatsapp-web-crm-b/aihpfgoknheimieofcfjiobnmddldjeb'
// Real product screen from the homepage CRM section
const SCREENSHOT_URL = `${BASE_URL}/homepage/refined-crm/hubspot.webp`
// Stable node ids so page-level schemas (WebPage, FAQPage) can reference these
export const ORG_ID = `${BASE_URL}/#organization`
export const SOFTWARE_ID = `${BASE_URL}/#software`
// Market signals for the localized pages. Eazybe is SaaS with no local office, so the
// es/br/tr pages describe the market served and support coverage (areaServed,
// contactPoint) instead of a LocalBusiness/ProfessionalService address.
const SUPPORT_PHONE = '+1-309-929-4280'
const SUPPORT_HOURS = {
  "@type": "OpeningHoursSpecification",
  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  "opens": "00:00",
  "closes": "23:59"
}
const SPANISH_MARKETS = ['ES', 'MX', 'CO', 'AR', 'CL', 'PE']

type OrgLocale = 'en' | 'br' | 'es' | 'tr'

// A named product or section, linked to its page in the active language.
type OrgItem = [name: string, path: string]
type OrgGroup = { name: string; path: string; items?: OrgItem[] }

// Organization copy per language. Product names match the site's nav and footer labels in
// messages/*.json, and every path returned 200 in all four languages (checked 2026-11-04).
const ORG_COPY: Record<OrgLocale, {
  description: string
  slogan: string
  knowsAbout: string[]
  catalogName: string
  catalog: OrgGroup[]
  contactType: string
  contactLanguages: string[]
  // Market signals for the localized sites; see the note above SUPPORT_PHONE.
  areaServed?: object | object[]
  contactAreaServed?: string | string[]
  supportLine: boolean
}> = {
  en: {
    description: "Eazybe is a sales conversation platform for teams that sell over WhatsApp and phone calls. It connects personal WhatsApp numbers, WhatsApp groups and calls to CRMs such as HubSpot, Salesforce, Zoho and Pipedrive, and its AI agents qualify leads, book meetings and handle follow-ups.",
    slogan: "Powering sales conversations across WhatsApp and calls",
    knowsAbout: ["WhatsApp AI agents", "Voice AI agents", "WhatsApp CRM integration", "Sales intelligence", "Lead qualification", "Sales automation", "Auto dialer", "Call tracking", "Call recording", "SIM-based calling", "Virtual phone numbers", "WhatsApp Business API", "WhatsApp broadcast"],
    catalogName: "Eazybe products and solutions",
    catalog: [
      { name: "AI Agents", path: "/whatsapp-ai-agent", items: [["CRM Sync Agent", "/whatsapp-ai-agent#crm-sync"], ["Lead Qualification Agent", "/whatsapp-ai-agent#lead-qualification"], ["Revenue Agent", "/whatsapp-ai-agent#revenue"], ["Customer Success Agent", "/whatsapp-ai-agent#customer-success"], ["Agent Builder", "/whatsapp-ai-agent#agent-builder"]] },
      { name: "Calling", path: "/calling", items: [["Auto Dialer", "/calling/auto-dialer"], ["Virtual Phone Numbers", "/calling/virtual-phone-number"], ["Call Tracking", "/calling/call-tracking"], ["SIM-Based Calling", "/calling/sim-based-calling"], ["Call Recording", "/calling/call-recording"]] },
      { name: "Features", path: "/features", items: [["WhatsApp CRM", "/features/whatsapp-crm"], ["Team Inbox", "/features/team-inbox"], ["Revenue Inbox", "/features/revenue-inbox"], ["Rep Radar", "/features/rep-radar"], ["WhatsApp Copilot", "/features/whatsapp-copilot"], ["Cloud Backup", "/features/cloud-backup"], ["Quick Reply", "/features/quick-reply"], ["Scheduler", "/features/scheduler"]] },
      { name: "WhatsApp API", path: "/whatsapp-api", items: [["Coexistence", "/whatsapp-api/coexistence"], ["Templates", "/whatsapp-api/templates"], ["Broadcast", "/whatsapp-api/broadcast"]] },
      { name: "Integrations", path: "/integrations" },
      { name: "Eazybe MCP", path: "/mcp" },
    ],
    contactType: "customer support",
    contactLanguages: ["English"],
    supportLine: false,
  },
  es: {
    description: "Eazybe es una plataforma de conversaciones de venta para equipos que venden por WhatsApp y por teléfono. Conecta números personales de WhatsApp, grupos de WhatsApp y llamadas con CRM como HubSpot, Salesforce, Zoho y Pipedrive, y sus agentes de IA califican leads, agendan reuniones y dan seguimiento.",
    slogan: "Impulsamos conversaciones de venta en WhatsApp y llamadas",
    knowsAbout: ["Agentes de IA para WhatsApp", "Agentes de voz con IA", "Integración de WhatsApp con CRM", "Inteligencia de ventas", "Calificación de leads", "Automatización de ventas", "Marcador automático", "Seguimiento de llamadas", "Grabación de llamadas", "Llamadas con SIM", "Números de teléfono virtuales", "WhatsApp Business API", "Difusiones de WhatsApp"],
    catalogName: "Productos y soluciones de Eazybe",
    catalog: [
      { name: "Agentes de IA", path: "/whatsapp-ai-agent", items: [["Agente de Sincronización con CRM", "/whatsapp-ai-agent#crm-sync"], ["Agente de Calificación de Leads", "/whatsapp-ai-agent#lead-qualification"], ["Agente de Ingresos", "/whatsapp-ai-agent#revenue"], ["Agente de Customer Success", "/whatsapp-ai-agent#customer-success"], ["Agent Builder", "/whatsapp-ai-agent#agent-builder"]] },
      { name: "Llamadas", path: "/calling", items: [["Marcador Automático", "/calling/auto-dialer"], ["Números de Teléfono Virtuales", "/calling/virtual-phone-number"], ["Seguimiento de Llamadas", "/calling/call-tracking"], ["Llamadas con SIM", "/calling/sim-based-calling"], ["Grabación de Llamadas", "/calling/call-recording"]] },
      { name: "Funciones", path: "/features", items: [["WhatsApp CRM", "/features/whatsapp-crm"], ["Bandeja de Equipo", "/features/team-inbox"], ["Bandeja de Ingresos", "/features/revenue-inbox"], ["Radar de Reps", "/features/rep-radar"], ["WhatsApp Copilot", "/features/whatsapp-copilot"], ["Backup en la Nube", "/features/cloud-backup"], ["Respuesta Rápida", "/features/quick-reply"], ["Programador", "/features/scheduler"]] },
      { name: "WhatsApp API", path: "/whatsapp-api", items: [["Coexistencia", "/whatsapp-api/coexistence"], ["Plantillas", "/whatsapp-api/templates"], ["Difusión", "/whatsapp-api/broadcast"]] },
      { name: "Integraciones", path: "/integrations" },
      { name: "Eazybe MCP", path: "/mcp" },
    ],
    contactType: "atención al cliente",
    contactLanguages: ["Spanish", "English"],
    areaServed: ['Spain', 'Mexico', 'Colombia', 'Argentina', 'Chile', 'Peru'].map((name) => ({ "@type": "Country", "name": name })),
    contactAreaServed: SPANISH_MARKETS,
    supportLine: true,
  },
  br: {
    description: "A Eazybe é uma plataforma de conversas de vendas para equipes que vendem pelo WhatsApp e por telefone. Conecta números pessoais de WhatsApp, grupos de WhatsApp e ligações a CRMs como HubSpot, Salesforce, Zoho e Pipedrive, e seus agentes de IA qualificam leads, agendam reuniões e cuidam dos follow-ups.",
    slogan: "Impulsionando conversas de vendas no WhatsApp e em ligações",
    knowsAbout: ["Agentes de IA para WhatsApp", "Agentes de voz com IA", "Integração do WhatsApp com CRM", "Inteligência de vendas", "Qualificação de leads", "Automação de vendas", "Discador automático", "Rastreamento de ligações", "Gravação de ligações", "Ligações por SIM", "Números de telefone virtuais", "WhatsApp Business API", "Disparos de WhatsApp"],
    catalogName: "Produtos e soluções da Eazybe",
    catalog: [
      { name: "Agentes de IA", path: "/whatsapp-ai-agent", items: [["Agente de Sincronia com CRM", "/whatsapp-ai-agent#crm-sync"], ["Agente de Qualificação de Leads", "/whatsapp-ai-agent#lead-qualification"], ["Agente de Receita", "/whatsapp-ai-agent#revenue"], ["Agente de Customer Success", "/whatsapp-ai-agent#customer-success"], ["Agent Builder", "/whatsapp-ai-agent#agent-builder"]] },
      { name: "Ligações", path: "/calling", items: [["Discador Automático", "/calling/auto-dialer"], ["Números de Telefone Virtuais", "/calling/virtual-phone-number"], ["Rastreamento de Ligações", "/calling/call-tracking"], ["Ligações por SIM", "/calling/sim-based-calling"], ["Gravação de Ligações", "/calling/call-recording"]] },
      { name: "Recursos", path: "/features", items: [["WhatsApp CRM", "/features/whatsapp-crm"], ["Caixa de Entrada da Equipe", "/features/team-inbox"], ["Caixa de Receita", "/features/revenue-inbox"], ["Radar de Vendedores", "/features/rep-radar"], ["WhatsApp Copilot", "/features/whatsapp-copilot"], ["Backup na Nuvem", "/features/cloud-backup"], ["Resposta Rápida", "/features/quick-reply"], ["Agendador", "/features/scheduler"]] },
      { name: "WhatsApp API", path: "/whatsapp-api", items: [["Coexistência", "/whatsapp-api/coexistence"], ["Modelos", "/whatsapp-api/templates"], ["Transmissão", "/whatsapp-api/broadcast"]] },
      { name: "Integrações", path: "/integrations" },
      { name: "Eazybe MCP", path: "/mcp" },
    ],
    contactType: "suporte ao cliente",
    contactLanguages: ["Portuguese", "English"],
    areaServed: { "@type": "Country", "name": "Brazil" },
    contactAreaServed: "BR",
    supportLine: true,
  },
  tr: {
    description: "Eazybe, WhatsApp ve telefon üzerinden satış yapan ekipler için bir satış konuşmaları platformudur. Kişisel WhatsApp numaralarını, WhatsApp gruplarını ve aramaları HubSpot, Salesforce, Zoho ve Pipedrive gibi CRM'lere bağlar; Yapay Zeka ajanları lead'leri nitelendirir, toplantı planlar ve takipleri yürütür.",
    slogan: "WhatsApp ve aramalarda satış konuşmalarına güç veriyoruz",
    knowsAbout: ["WhatsApp Yapay Zeka ajanları", "Sesli Yapay Zeka ajanları", "WhatsApp CRM entegrasyonu", "Satış zekası", "Lead nitelendirme", "Satış otomasyonu", "Otomatik arayıcı", "Çağrı takibi", "Çağrı kaydı", "SIM tabanlı arama", "Sanal telefon numaraları", "WhatsApp Business API", "WhatsApp toplu mesaj"],
    catalogName: "Eazybe ürünleri ve çözümleri",
    catalog: [
      { name: "Yapay Zeka Ajanları", path: "/whatsapp-ai-agent", items: [["CRM Sync Agent", "/whatsapp-ai-agent#crm-sync"], ["Lead Qualification Agent", "/whatsapp-ai-agent#lead-qualification"], ["Revenue Agent", "/whatsapp-ai-agent#revenue"], ["Customer Success Agent", "/whatsapp-ai-agent#customer-success"], ["Agent Builder", "/whatsapp-ai-agent#agent-builder"]] },
      { name: "Aramalar", path: "/calling", items: [["Otomatik Arayıcı", "/calling/auto-dialer"], ["Sanal Telefon Numaraları", "/calling/virtual-phone-number"], ["Çağrı Takibi", "/calling/call-tracking"], ["SIM Tabanlı Arama", "/calling/sim-based-calling"], ["Çağrı Kaydı", "/calling/call-recording"]] },
      { name: "Özellikler", path: "/features", items: [["WhatsApp CRM", "/features/whatsapp-crm"], ["Takım Gelen Kutusu", "/features/team-inbox"], ["Gelir Gelen Kutusu", "/features/revenue-inbox"], ["Temsilci Radarı", "/features/rep-radar"], ["WhatsApp Copilot", "/features/whatsapp-copilot"], ["Bulut Yedekleme", "/features/cloud-backup"], ["Hızlı Yanıt", "/features/quick-reply"], ["Planlayıcı", "/features/scheduler"]] },
      { name: "WhatsApp API", path: "/whatsapp-api", items: [["Birlikte Çalışma", "/whatsapp-api/coexistence"], ["Şablonlar", "/whatsapp-api/templates"], ["Yayın", "/whatsapp-api/broadcast"]] },
      { name: "Entegrasyonlar", path: "/integrations" },
      { name: "Eazybe MCP", path: "/mcp" },
    ],
    contactType: "müşteri desteği",
    contactLanguages: ["Turkish", "English"],
    areaServed: { "@type": "Country", "name": "Türkiye" },
    contactAreaServed: "TR",
    supportLine: true,
  },
}

function buildOrganization(locale: OrgLocale): object {
  const copy = ORG_COPY[locale]
  const prefix = locale === 'en' ? '' : `/${locale}`
  const home = `${BASE_URL}${prefix || '/'}`
  return {
    "@context": "https://schema.org/",
    "@type": "Organization",
    "@id": ORG_ID,
    "name": "Eazybe",
    "url": home,
    "logo": { "@type": "ImageObject", "url": `${BASE_URL}/logo.png`, "width": 1608, "height": 377 },
    "image": `${BASE_URL}/logo.png`,
    "description": copy.description,
    "slogan": copy.slogan,
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
      PLAY_STORE_URL,
      CHROME_STORE_LISTING_URL
    ],
    ...(copy.areaServed ? { "areaServed": copy.areaServed } : {}),
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": copy.contactType,
      "email": "support@eazybe.com",
      ...(copy.supportLine ? { "telephone": SUPPORT_PHONE } : {}),
      "url": home,
      ...(copy.contactAreaServed ? { "areaServed": copy.contactAreaServed } : {}),
      "availableLanguage": copy.contactLanguages,
      ...(copy.supportLine ? { "hoursAvailable": SUPPORT_HOURS } : {})
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "8, The Green STE B",
      "addressLocality": "Dover",
      "addressRegion": "DE",
      "postalCode": "19901",
      "addressCountry": "US"
    },
    "knowsAbout": copy.knowsAbout,
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": copy.catalogName,
      "itemListElement": copy.catalog.map((group) => group.items
        ? {
            "@type": "OfferCatalog",
            "name": group.name,
            "url": `${BASE_URL}${prefix}${group.path}`,
            "itemListElement": group.items.map(([name, path]) => ({ "@type": "Service", "name": name, "url": `${BASE_URL}${prefix}${path}` }))
          }
        : { "@type": "Service", "name": group.name, "url": `${BASE_URL}${prefix}${group.path}` })
    }
  }
}

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
          "ratingValue": 4.2,
          "bestRating": 5,
          "worstRating": 1,
          "ratingCount": 1100
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
      organization: buildOrganization('en')
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
          "ratingValue": 4.2,
          "bestRating": 5,
          "worstRating": 1,
          "ratingCount": 1100
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
      organization: buildOrganization('br')
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
          "ratingValue": 4.2,
          "bestRating": 5,
          "worstRating": 1,
          "ratingCount": 1100
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
      organization: buildOrganization('es')
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
          "ratingValue": 4.2,
          "bestRating": 5,
          "worstRating": 1,
          "ratingCount": 1100
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
      organization: buildOrganization('tr')
    }
  }

  return schemas[locale] || schemas.en
}
