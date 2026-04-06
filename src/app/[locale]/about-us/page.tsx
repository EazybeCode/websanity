import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { AboutUsClient } from '@/components/pages/AboutUsClient'
import { getAlternates } from '@/lib/seo-helpers'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  // English-only full meta tags
  if (locale === 'en') {
    return {
      title: 'About Us',
      description: 'Learn about Eazybe, our mission to simplify sales workflows, empower teams, and boost productivity. Discover our story, values, and the team behind Eazybe.',
      keywords: 'about Eazybe, Eazybe company, Eazybe mission, sales productivity company, CRM workflow tools, sales enablement company, Eazybe team',
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
        url: 'https://eazybe.com/about-us',
        title: 'About US - Eazybe',
        description: "Discover Eazybe's journey, mission, and the team building smarter sales workflows and productivity tools.",
        images: [
          {
            url: 'https://eazybe.com/logo.png',
            width: 1200,
            height: 630,
            alt: 'About Eazybe company and team',
          },
        ],
        locale: 'en_US',
        siteName: 'Eazybe',
      },
      twitter: {
        card: 'summary_large_image',
        site: '@eazybe',
        creator: '@eazybe',
        title: 'About Us | Eazybe',
        description: 'Learn about Eazybe, our mission, and how we help sales teams streamline workflows and improve productivity.',
        images: [
          {
            url: 'https://eazybe.com/logo.png',
            alt: 'Eazybe company overview',
          },
        ],
      },
      other: {
        'thumbnail': 'https://eazybe.com/logo.png',
        'bingbot': 'index, follow',
        'answer-type': 'company, about, overview',
        'target-audience': 'sales teams, SaaS founders, CRM users, businesses, potential customers',
        'content-intent': 'informational, brand-awareness',
        'conversational-query': 'what is Eazybe, about Eazybe company, Eazybe mission, who created Eazybe, Eazybe team',
        'ai-readability': 'professional, brand-focused, informative',
        'context-window': 'Eazybe company, sales productivity, workflow automation, CRM tools, team collaboration',
        'user-problem': 'users want to understand the company behind the product before trusting or purchasing',
        'solution-summary': "provides transparency about Eazybe's mission, vision, and team to build trust and credibility",
        'primary-benefit': 'helps users understand the brand, values, and people behind Eazybe',
        'use-case': 'users researching the company before using or purchasing Eazybe products',
        'implementation-difficulty': 'none',
        'time-to-value': 'immediate',
      },
      alternates: getAlternates(locale, '/about-us'),
    }
  }

  // Spanish full meta tags
  if (locale === 'es') {
    return {
      title: 'Sobre Nosotros',
      description: 'Conoce Eazybe: simplificamos flujos de ventas, impulsamos la productividad y empoderamos equipos. Descubre nuestra misi\u00f3n, valores e historia.',
      keywords: 'Eazybe, sobre Eazybe, empresa Eazybe, misi\u00f3n Eazybe, productividad de ventas, herramientas CRM, software de ventas, equipo Eazybe',
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
        url: 'https://eazybe.com/es/about-us',
        title: 'Sobre Nosotros - Eazybe',
        description: 'Descubre la historia de Eazybe, nuestra misi\u00f3n y el equipo que crea soluciones para mejorar la productividad en ventas.',
        images: [
          {
            url: 'https://eazybe.com/logo.png',
            width: 1200,
            height: 630,
            alt: 'Sobre la empresa Eazybe y su equipo',
          },
        ],
        locale: 'es_ES',
        siteName: 'Eazybe',
      },
      twitter: {
        card: 'summary_large_image',
        site: '@eazybe',
        creator: '@eazybe',
        title: 'Sobre Eazybe | Nuestra misi\u00f3n, visi\u00f3n y equipo',
        description: 'Conoce Eazybe, nuestra misi\u00f3n y c\u00f3mo ayudamos a los equipos de ventas a optimizar sus procesos y productividad.',
        images: [
          {
            url: 'https://eazybe.com/logo.png',
            alt: 'Resumen de la empresa Eazybe',
          },
        ],
      },
      other: {
        'thumbnail': 'https://eazybe.com/logo.png',
        'bingbot': 'index, follow',
        'answer-type': 'empresa, sobre, informaci\u00f3n',
        'target-audience': 'equipos de ventas, empresas SaaS, usuarios CRM, negocios, clientes potenciales',
        'content-intent': 'informacional, reconocimiento de marca',
        'conversational-query': 'qu\u00e9 es Eazybe, sobre la empresa Eazybe, misi\u00f3n de Eazybe, qui\u00e9n cre\u00f3 Eazybe, equipo Eazybe',
        'ai-readability': 'profesional, informativo, enfocado en marca',
        'context-window': 'empresa Eazybe, productividad de ventas, automatizaci\u00f3n de flujos, herramientas CRM, colaboraci\u00f3n de equipos',
        'user-problem': 'los usuarios quieren entender la empresa antes de confiar o comprar el producto',
        'solution-summary': 'proporciona informaci\u00f3n clara sobre la misi\u00f3n, visi\u00f3n y equipo de Eazybe para generar confianza',
        'primary-benefit': 'ayuda a los usuarios a conocer la marca y las personas detr\u00e1s de Eazybe',
        'use-case': 'usuarios investigando la empresa antes de usar o comprar productos de Eazybe',
        'implementation-difficulty': 'ninguna',
        'time-to-value': 'inmediato',
      },
      alternates: getAlternates(locale, '/about-us'),
    }
  }

  // Other locales (br, tr) - basic metadata
  const titles: Record<string, string> = {
    br: 'Sobre Nos - Conheca a Equipe por Tras da Eazybe | Eazybe',
    tr: 'Hakkimizda - Eazybe Ekibini Taniyin | Eazybe',
  }

  const descriptions: Record<string, string> = {
    br: 'Conheca a Eazybe, a plataforma #1 de CRM para WhatsApp. Fundada por Sagar Dewan, ajudamos mais de 25.000 equipes de vendas a automatizar conversas no WhatsApp com agentes de IA.',
    tr: 'WhatsApp CRM platformu #1 Eazybe hakkinda bilgi edinin. Sagar Dewan tarafindan kurulan Eazybe, 25.000+ satis ekibinin WhatsApp konusmalarini yapay zeka ajanlariyla otomatiklestirmesine yardimci oluyor.',
  }

  return {
    title: titles[locale] || titles.br,
    description: descriptions[locale] || descriptions.br,
    openGraph: {
      title: titles[locale] || titles.br,
      description: descriptions[locale] || descriptions.br,
    },
    alternates: getAlternates(locale, '/about-us'),
  }
}

export default async function AboutUsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const localePrefix = locale === 'en' ? '' : `/${locale}`
  const breadcrumbNames: Record<string, string> = {
    en: 'about us',
    es: 'sobre nosotros',
    br: 'sobre nos',
    tr: 'hakkimizda',
  }
  const breadcrumbSchema = {
    "@context": "https://schema.org/",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "eazybe",
        "item": `https://eazybe.com${localePrefix || '/'}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": breadcrumbNames[locale] || 'about us',
        "item": `https://eazybe.com${localePrefix}/about-us`
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AboutUsClient locale={locale} />
    </>
  )
}
