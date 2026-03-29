import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { ComparisonPageClient } from '@/components/pages/ComparisonPageClient'
import { getAlternates } from '@/lib/seo-helpers'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  const titles: Record<string, string> = {
    en: 'Comparison',
    pt: 'Eazybe vs Wati vs Interakt vs QuickReply - Comparacao WhatsApp CRM',
    es: 'Eazybe vs Wati vs Interakt vs QuickReply - Comparacion WhatsApp CRM',
    tr: 'Eazybe vs Wati vs Interakt vs QuickReply - WhatsApp CRM Karsilastirma',
  }

  const descriptions: Record<string, string> = {
    en: 'Compare Eazybe with 20+ WhatsApp CRM platforms including Wati, Interakt, QuickReply, Cooby, Timelines, and Rasayel. See features, pricing, and why 30,000+ businesses choose Eazybe.',
    pt: 'Compare o Eazybe com mais de 20 plataformas de WhatsApp CRM incluindo Wati, Interakt, QuickReply, Cooby, Timelines e Rasayel.',
    es: 'Compare Eazybe con mas de 20 plataformas de WhatsApp CRM incluyendo Wati, Interakt, QuickReply, Cooby, Timelines y Rasayel.',
    tr: 'Eazybe\'yi Wati, Interakt, QuickReply, Cooby, Timelines ve Rasayel dahil 20+ WhatsApp CRM platformuyla karsilastirin.',
  }

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
    },
    alternates: getAlternates(locale, '/comparison'),
  }
}

export default async function ComparisonPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  // JSON-LD schemas for English comparison page only
  if (locale === 'en') {
    const comparisonSchemas = [
      {
        "@context": "https://schema.org/",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "eazybe", "item": "https://eazybe.com/" },
          { "@type": "ListItem", "position": 2, "name": "comparison", "item": "https://eazybe.com/comparison" }
        ]
      },
      {
        "@context": "https://schema.org/",
        "@type": "Organization",
        "name": "Eazybe",
        "url": "https://eazybe.com/",
        "logo": { "@type": "ImageObject", "url": "https://eazybe.com/logo.png", "width": 600, "height": 60 },
        "image": "https://eazybe.com/logo.png",
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
          "url": "https://eazybe.com/",
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
      },
      {
        "@context": "https://schema.org/",
        "@type": "SoftwareApplication",
        "name": "Eazybe",
        "applicationCategory": "BusinessApplication",
        "applicationSubCategory": "CRM Integration, WhatsApp Automation, AI Agents for WhatsApp",
        "operatingSystem": "Web, Chrome Extension",
        "url": "https://eazybe.com/",
        "image": "https://eazybe.com/logo.png",
        "description": "Eazybe helps sales teams automate WhatsApp conversations with WhatsApp AI agents, qualify leads, detect cold deals, and sync chats with CRM platforms like HubSpot, Zoho, Salesforce, and Google Sheets.",
        "softwareVersion": "latest",
        "downloadUrl": "https://chrome.google.com/webstore/detail/clgficggccelgifppbcaepjdkklfcefd",
        "screenshot": "https://cdn.prod.website-files.com/64cb8fe9dae4f2e5a069eb37/687f71bf8e51d6931ee45917_hero_image_without_AI-p-1080.webp",
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
      }
    ]

    return (
      <>
        {comparisonSchemas.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
        <ComparisonPageClient />
      </>
    )
  }

  return <ComparisonPageClient />
}
