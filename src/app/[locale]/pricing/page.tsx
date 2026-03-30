import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getPricing } from '@/lib/sanity-queries'
import { PricingPageClient } from '@/components/pages/PricingPageClient'
import { getAlternates } from '@/lib/seo-helpers'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const pricingData = await getPricing(locale)

  const seo = pricingData?.seo

  // Set title for locales
  const title = locale === 'en' ? 'Pricing' : locale === 'br' ? 'Preços' : (seo?.metaTitle || 'Pricing - Eazybe')

  return {
    title,
    description:
      seo?.metaDescription ||
      'Simple, transparent pricing for WhatsApp CRM integration. Start free, scale as you grow.',
    openGraph: {
      title,
      description:
        seo?.ogDescription ||
        seo?.metaDescription ||
        'Simple, transparent pricing for WhatsApp CRM integration.',
      ...(seo?.ogImage && { images: [{ url: seo.ogImage }] }),
    },
    alternates: getAlternates(locale, '/pricing'),
  }
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const pricingData = await getPricing(locale)

  // JSON-LD schemas for pricing page
  const getSchemas = (locale: string) => {
    if (locale === 'en') {
      return [
        {
          '@context': 'https://schema.org/',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'eazybe', item: 'https://eazybe.com/' },
            { '@type': 'ListItem', position: 2, name: 'pricing', item: 'https://eazybe.com/pricing' },
          ],
        },
        {
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'Eazybe',
          applicationCategory: 'BusinessApplication',
          applicationSubCategory: 'CRM Integration, WhatsApp Automation, AI Agents for WhatsApp',
          operatingSystem: 'Web, Chrome Extension',
          url: 'https://eazybe.com/',
          image: 'https://eazybe.com/logo.png',
          description:
            'Eazybe helps sales teams automate WhatsApp conversations with WhatsApp AI agents, qualify leads, detect cold deals, and sync chats with CRM platforms like HubSpot, Zoho, Salesforce, and Google Sheets.',
          offers: {
            '@type': 'AggregateOffer',
            url: 'https://eazybe.com/pricing',
            priceCurrency: 'USD',
            lowPrice: 29,
            highPrice: 49,
            offerCount: 5,
            availability: 'https://schema.org/InStock',
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: 4.9,
            bestRating: 5,
            worstRating: 1,
            ratingCount: 30597,
          },
          featureList: [
            'WhatsApp AI agents',
            'Lead qualification',
            'Cold deal detection',
            'AI-powered reply suggestions',
            'Shared inbox for team collaboration',
            'Deal tracking from WhatsApp',
            'Contact synchronization',
            'WhatsApp CRM integration',
            'Sales automation',
          ],
        },
        {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Eazybe',
          url: 'https://eazybe.com/',
          logo: { '@type': 'ImageObject', url: 'https://eazybe.com/logo.png', width: 600, height: 60 },
          image: 'https://eazybe.com/logo.png',
          description:
            'Eazybe helps sales teams automate WhatsApp conversations with WhatsApp AI agents, qualify leads, detect cold deals, and sync chats with CRM platforms like HubSpot, Zoho, Salesforce, and Google Sheets.',
          foundingDate: '2022-09-13',
          founder: {
            '@type': 'Person',
            name: 'Sagar Dewan',
            sameAs: ['https://www.linkedin.com/in/sagar-dewan-b43b9931/'],
          },
          parentOrganization: { '@type': 'Organization', name: 'Eazybe Inc.' },
          sameAs: [
            'https://x.com/EazybeHQ',
            'https://www.linkedin.com/company/eazybe',
            'https://www.youtube.com/@eazybe',
            'https://www.facebook.com/EazyBe.WhatsApp.Marketing/',
            'https://www.threads.com/@eazybe.supercharge',
            'https://www.instagram.com/eazybe.supercharge/',
          ],
          contactPoint: [
            {
              '@type': 'ContactPoint',
              contactType: 'customer support',
              email: 'support@eazybe.com',
              url: 'https://eazybe.com/',
              areaServed: 'US',
              availableLanguage: ['English'],
            },
          ],
          address: {
            '@type': 'PostalAddress',
            streetAddress: '8, The Green STE B',
            addressLocality: 'Dover',
            addressRegion: 'DE',
            postalCode: '19901',
            addressCountry: 'US',
          },
          knowsAbout: [
            'WhatsApp AI agent',
            'AI agents for sales teams',
            'WhatsApp CRM integration',
            'Sales automation',
            'Lead qualification',
            'CRM sync',
          ],
        },
      ]
    }

    if (locale === 'br') {
      return [
        {
          '@context': 'https://schema.org/',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'eazybe', item: 'https://eazybe.com/br' },
            { '@type': 'ListItem', position: 2, name: 'Preços', item: 'https://eazybe.com/br/pricing' },
          ],
        },
        {
          '@context': 'https://schema.org/',
          '@type': 'Organization',
          name: 'Eazybe',
          url: 'https://eazybe.com/br',
          logo: { '@type': 'ImageObject', url: 'https://eazybe.com/logo.png', width: 600, height: 60 },
          image: 'https://eazybe.com/logo.png',
          description:
            'A Eazybe ajuda equipes de vendas a automatizar conversas no WhatsApp com agentes de IA, qualificar leads, identificar negócios frios e sincronizar chats com plataformas de CRM como HubSpot, Zoho, Salesforce e Google Sheets.',
          foundingDate: '2022-09-13',
          founder: {
            '@type': 'Person',
            name: 'Sagar Dewan',
            sameAs: ['https://www.linkedin.com/in/sagar-dewan-b43b9931/'],
          },
          parentOrganization: { '@type': 'Organization', name: 'Eazybe Inc.' },
          sameAs: [
            'https://x.com/EazybeHQ',
            'https://www.linkedin.com/company/eazybe',
            'https://www.youtube.com/@eazybe',
            'https://www.facebook.com/EazyBe.WhatsApp.Marketing/',
            'https://www.threads.com/@eazybe.supercharge',
            'https://www.instagram.com/eazybe.supercharge/',
          ],
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'suporte ao cliente',
            email: 'support@eazybe.com',
            url: 'https://eazybe.com/br',
            areaServed: 'Brazil',
            availableLanguage: ['Português'],
          },
          address: {
            '@type': 'PostalAddress',
            streetAddress: '8, The Green STE B',
            addressLocality: 'Dover',
            addressRegion: 'DE',
            postalCode: '19901',
            addressCountry: 'US',
          },
          knowsAbout: [
            'Agente de IA para WhatsApp',
            'Agentes de IA para equipes de vendas',
            'Integração de CRM com WhatsApp',
            'Automação de vendas',
            'Qualificação de leads',
            'Sincronização com CRM',
          ],
        },
        {
          '@context': 'https://schema.org/',
          '@type': 'SoftwareApplication',
          name: 'Eazybe',
          applicationCategory: 'BusinessApplication',
          applicationSubCategory: 'Integração com CRM, Automação para WhatsApp, Agentes de IA para WhatsApp',
          operatingSystem: 'Web, Extensão Chrome',
          url: 'https://eazybe.com/br',
          image: 'https://eazybe.com/logo.png',
          description:
            'A Eazybe ajuda equipes de vendas a automatizar conversas no WhatsApp com agentes de IA, qualificar leads, identificar negócios frios e sincronizar chats com plataformas de CRM como HubSpot, Zoho, Salesforce e Google Sheets.',
          softwareVersion: 'latest',
          downloadUrl: 'https://chrome.google.com/webstore/detail/clgficggccelgifppbcaepjdkklfcefd',
          screenshot: 'https://cdn.prod.website-files.com/64cb8fe9dae4f2e5a069eb37/687f71bf8e51d6931ee45917_hero_image_without_AI-p-1080.webp',
          offers: {
            '@type': 'AggregateOffer',
            url: 'https://eazybe.com/br/pricing',
            priceCurrency: 'BRL',
            lowPrice: 96,
            highPrice: 162,
            offerCount: 5,
            availability: 'https://schema.org/InStock',
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: 4.9,
            bestRating: 5,
            worstRating: 1,
            ratingCount: 30597,
          },
          featureList: [
            'Agentes de IA para WhatsApp',
            'Qualificação de leads',
            'Detecção de negócios frios',
            'Sugestões de resposta com IA',
            'Caixa de entrada compartilhada para equipes',
            'Integração de CRM com WhatsApp',
          ],
        },
      ]
    }

    return null
  }

  const pricingSchemas = getSchemas(locale)

  return (
    <>
      {/* Render JSON-LD schemas for English locale */}
      {pricingSchemas &&
        pricingSchemas.map((schema, index) => (
          <script
            key={`pricing-schema-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      <PricingPageClient pricingData={pricingData} />
    </>
  )
}
