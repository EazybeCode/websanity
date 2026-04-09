import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getAuthors } from '@/lib/sanity-queries'
import { getAlternates } from '@/lib/seo-helpers'
import { AuthorsListClient } from '@/components/pages/AuthorsListClient'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  // English-only full meta tags
  if (locale === 'en') {
    return {
      title: 'Authors Panel, Complete Bio Of Authors - Eazybe',
      description: 'Explore all authors at Eazybe. Discover expert content on AI agents, CRM integration, WhatsApp automation, and sales workflows created by our editorial team.',
      keywords: 'Eazybe authors, editorial team, AI agents authors, CRM integration experts, WhatsApp automation content, sales enablement writers, Eazybe blog authors',
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
        url: 'https://eazybe.com/blog/authors',
        title: 'Authors Panel, Complete Bio Of Authors - Eazybe',
        description: 'Meet the authors behind Eazybe. Explore expert insights on AI agents, CRM integration, and WhatsApp automation from our editorial team.',
        images: [
          {
            url: 'https://eazybe.com/logo.png',
            width: 1200,
            height: 630,
            alt: 'Eazybe Authors Panel and Editorial Team',
          },
        ],
        locale: 'en_US',
        siteName: 'Eazybe',
      },
      twitter: {
        card: 'summary_large_image',
        site: '@eazybe',
        creator: '@eazybe',
        title: 'Eazybe Authors Panel',
        description: 'Discover Eazybe authors and explore content on AI agents, CRM integration, and WhatsApp automation.',
        images: [
          {
            url: 'https://eazybe.com/logo.png',
            alt: 'Eazybe Authors Page',
          },
        ],
      },
      other: {
        'thumbnail': 'https://eazybe.com/logo.png',
        'bingbot': 'index, follow',
        'answer-type': 'author-directory, informational',
        'target-audience': 'marketers, sales teams, CRM users, SaaS founders, customer support teams, business professionals',
        'content-intent': 'informational',
        'conversational-query': 'Eazybe authors, who writes Eazybe blog, AI agents content authors, CRM integration experts, WhatsApp automation blog writers',
        'ai-readability': 'clear, informative, structured',
        'context-window': 'authors, editorial team, AI agents content, CRM integration, WhatsApp automation, business insights',
        'user-problem': 'users want to know who creates the content and explore expertise behind blog articles',
        'solution-summary': 'a centralized authors panel showcasing all contributors and their expertise areas',
        'primary-benefit': 'helps users discover trusted authors and explore their content easily',
        'use-case': 'users browsing authors, verifying expertise, and exploring related blog content',
        'implementation-difficulty': 'none',
        'time-to-value': 'instant',
      },
      alternates: getAlternates(locale, '/blog/authors'),
    }
  }

  // Spanish full meta tags
  if (locale === 'es') {
    return {
      title: 'Panel de autores, biograf\u00eda completa de los autores - Eazybe',
      description: 'Explora todos los autores de Eazybe. Descubre contenido experto sobre agentes de IA, integraci\u00f3n CRM, automatizaci\u00f3n de WhatsApp y flujos de ventas.',
      keywords: 'autores Eazybe, equipo Eazybe, expertos en WhatsApp, autores de CRM, blog Eazybe autores, expertos en automatizaci\u00f3n, autores SaaS, contenido de ventas y marketing',
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
        url: 'https://eazybe.com/es/blog/authors',
        title: 'Autores de Eazybe | Equipo y expertos en IA, CRM y WhatsApp',
        description: 'Conoce a los autores de Eazybe. Aprende de expertos en automatizaci\u00f3n de WhatsApp, agentes de IA, CRM y crecimiento en ventas.',
        images: [
          {
            url: 'https://eazybe.com/logo.png',
            width: 1200,
            height: 630,
            alt: 'Autores y equipo de expertos de Eazybe',
          },
        ],
        locale: 'es_ES',
        siteName: 'Eazybe',
      },
      twitter: {
        card: 'summary_large_image',
        site: '@eazybe',
        creator: '@eazybe',
        title: 'Autores de Eazybe | Expertos en IA, CRM y WhatsApp',
        description: 'Descubre el equipo detr\u00e1s del contenido de Eazybe. Aprende de expertos en automatizaci\u00f3n, CRM y ventas.',
        images: [
          {
            url: 'https://eazybe.com/logo.png',
            alt: 'Equipo de autores de Eazybe',
          },
        ],
      },
      other: {
        'thumbnail': 'https://eazybe.com/logo.png',
        'bingbot': 'index, follow',
        'answer-type': 'informaci\u00f3n, listado, perfiles',
        'target-audience': 'lectores del blog, profesionales de ventas, marketers, equipos SaaS, usuarios de CRM',
        'content-intent': 'informacional, navegaci\u00f3n',
        'conversational-query': 'qui\u00e9n escribe en Eazybe, autores del blog Eazybe, expertos en automatizaci\u00f3n WhatsApp, equipo Eazybe CRM',
        'ai-readability': 'simple, informativo, exploratorio',
        'context-window': 'autores, equipo, expertos, contenido de blog, automatizaci\u00f3n WhatsApp, CRM, IA, ventas',
        'user-problem': 'los usuarios quieren conocer qui\u00e9n est\u00e1 detr\u00e1s del contenido y la experiencia de los autores',
        'solution-summary': 'listado de autores con experiencia en IA, CRM y automatizaci\u00f3n para generar confianza y credibilidad',
        'primary-benefit': 'permitir a los usuarios descubrir y confiar en los expertos detr\u00e1s del contenido',
        'use-case': 'usuarios explorando autores y validando credibilidad del contenido del blog',
        'implementation-difficulty': 'bajo',
        'time-to-value': 'inmediato',
      },
      alternates: getAlternates(locale, '/blog/authors'),
    }
  }

  return {
    title: 'Our Authors | Eazybe Blog',
    description: 'Meet the experts behind Eazybe blog. Our authors share insights on WhatsApp CRM, sales automation, AI agents, and productivity tips.',
    alternates: getAlternates(locale, '/blog/authors'),
  }
}

export default async function AuthorsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const authors = await getAuthors(locale)

  const localePrefix = locale === 'en' ? '' : `/${locale}`
  const authorsLabel: Record<string, string> = { en: 'authors', br: 'autores', es: 'autores', tr: 'yazarlar' }
  const breadcrumbSchema = {
    "@context": "https://schema.org/",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "blog",
        "item": `https://eazybe.com${localePrefix}/blog`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": authorsLabel[locale] || 'authors',
        "item": `https://eazybe.com${localePrefix}/blog/authors`
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AuthorsListClient authors={authors || []} locale={locale} />
    </>
  )
}
