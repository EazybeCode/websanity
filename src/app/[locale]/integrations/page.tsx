import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getCategoryIndex } from '@/lib/sanity-queries'
import CategoryIndexClient from '@/components/pages/CategoryIndexClient'
import { getAlternates, buildFaqPageSchema } from '@/lib/seo-helpers'

// ─── Metadata ────────────────────────────────────────────────────────────────

const sanityLangMap: Record<string, string> = { en: 'en', br: 'pt-BR', es: 'es', tr: 'tr' }

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const language = sanityLangMap[locale] || 'en'
  const data = await getCategoryIndex('integrations', language)

  const title =
    locale === 'en'
      ? 'CRM Integrations'
      : locale === 'tr'
        ? 'Entegrasyonlar'
        : locale === 'es'
          ? 'CRM Integraciones'
          : locale === 'br'
            ? 'Integrações de CRM'
            : (data?.metaTitle || 'WhatsApp CRM Integrations | Connect CRM With Business Tools')

  return {
    title,
    description: data?.metaDescription || 'Connect WhatsApp with HubSpot, Zoho, Salesforce, Google Sheets and more using Eazybe. Sync chats, automate workflows, and manage customer conversations.',
    openGraph: {
      title,
      description: data?.metaDescription || 'Connect WhatsApp with your CRM using Eazybe.',
      type: 'website',
      siteName: 'Eazybe',
    },
    alternates: getAlternates(locale, '/integrations'),
  }
}

// ─── Page Component ──────────────────────────────────────────────────────────

export default async function IntegrationsIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const language = sanityLangMap[locale] || 'en'
  const rawData = await getCategoryIndex('integrations', language)

  // The integrations page already inherits the footer's "Ready To Automate
  // Your WhatsApp Sales?" CTA via ChunkyFooter, so the in-page Sanity CTA
  // ("Stop flying blind on WhatsApp deals") is redundant and stacks two CTAs
  // back to back. Suppress only the page-level CTA; keep everything else.
  //
  // The hero CTAs are also overridden in code so they match the rest of the
  // site's primary/secondary funnel buttons (Install for Free + Book a Demo)
  // instead of Sanity's older "Start Free Trial / Compare Integrations".
  // Per-locale strings mirror messages/{locale}.json `cta.*` values.
  const heroCtaLabels: Record<string, { install: string; demo: string }> = {
    en: { install: 'Install for Free', demo: 'Book a Demo' },
    es: { install: 'Instalar Gratis', demo: 'Reservar Demo' },
    br: { install: 'Instalar Grátis', demo: 'Agendar Demo' },
    tr: { install: 'Ücretsiz Yükle', demo: 'Demo Rezervasyonu Yap' },
  }
  const labels = heroCtaLabels[locale] || heroCtaLabels.en

  // Use the same modal-trigger URLs the homepage hero uses (`#trial` /
  // `#demo`); CategoryIndexClient routes those through the global trial
  // modal instead of doing a navigation.
  const data = rawData
    ? {
        ...rawData,
        cta: null,
        hero: rawData.hero
          ? {
              ...rawData.hero,
              primaryCta: rawData.hero.primaryCta
                ? { ...rawData.hero.primaryCta, label: labels.install, url: '#trial' }
                : rawData.hero.primaryCta,
              secondaryCta: rawData.hero.secondaryCta
                ? { ...rawData.hero.secondaryCta, label: labels.demo, url: '#demo' }
                : rawData.hero.secondaryCta,
            }
          : rawData.hero,
      }
    : rawData

  // JSON-LD schemas for integrations page - only BreadcrumbList
  const getSchemas = (locale: string) => {
    if (locale === 'en') {
      return [
        {
          '@context': 'https://schema.org/',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'eazybe', item: 'https://eazybe.com/' },
            { '@type': 'ListItem', position: 2, name: 'integrations', item: 'https://eazybe.com/integrations' }
          ]
        }
      ]
    }

    if (locale === 'es') {
      return [
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', position: 1, 'name': 'eazybe', item: 'https://eazybe.com/es' },
            { '@type': 'ListItem', position: 2, name: 'integraciones', item: 'https://eazybe.com/es/integrations' }
          ]
        },
      ]
    }

    if (locale === 'br') {
      return [
        {
          '@context': 'https://schema.org/',
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'eazybe', item: 'https://eazybe.com/br' },
            { '@type': 'ListItem', 'position': 2, 'name': 'integrações', item: 'https://eazybe.com/br/integrations' }
          ]
        },
      ]
    }

    if (locale === 'tr') {
      return [
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, 'name': 'eazybe', item: 'https://eazybe.com/tr' },
            { '@type': 'ListItem', position: 2, name: 'entegrasyonlar', item: 'https://eazybe.com/tr/integrations' }
          ]
        },
      ]
    }

    return null
  }

  const integrationSchemas = getSchemas(locale)
  // Auto-generate FAQPage JSON-LD from the actual FAQ items rendered on the
  // page so structured data stays in sync with content (including translated
  // FAQs on non-English locales).
  const faqSchema = buildFaqPageSchema(data?.faq?.items)

  return (
    <>
      {integrationSchemas &&
        integrationSchemas.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <CategoryIndexClient data={data} category="integration" />
    </>
  )
}
