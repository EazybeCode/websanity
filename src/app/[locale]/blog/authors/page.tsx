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

  // Brazilian Portuguese full meta tags
  if (locale === 'br') {
    return {
      title: 'Painel de autores, biografia completa dos autores - Eazybe',
      description: 'Explore todos os autores da Eazybe. Descubra conte\u00fados especializados sobre agentes de IA, integra\u00e7\u00e3o com CRM, automa\u00e7\u00e3o do WhatsApp e fluxos de vendas.',
      keywords: 'autores Eazybe, equipe Eazybe, especialistas em WhatsApp, autores CRM, blog Eazybe autores, especialistas em automa\u00e7\u00e3o, autores SaaS, conte\u00fado de vendas e marketing',
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
        url: 'https://eazybe.com/br/blog/authors',
        title: 'Autores da Eazybe | Equipe e especialistas em IA, CRM e WhatsApp',
        description: 'Conhe\u00e7a os autores da Eazybe. Aprenda com especialistas em automa\u00e7\u00e3o do WhatsApp, agentes de IA, CRM e crescimento de vendas.',
        images: [
          {
            url: 'https://eazybe.com/logo.png',
            width: 1200,
            height: 630,
            alt: 'Autores e equipe de especialistas da Eazybe',
          },
        ],
        locale: 'pt_BR',
        siteName: 'Eazybe',
      },
      twitter: {
        card: 'summary_large_image',
        site: '@eazybe',
        creator: '@eazybe',
        title: 'Autores da Eazybe | Especialistas em IA, CRM e WhatsApp',
        description: 'Descubra a equipe por tr\u00e1s do conte\u00fado da Eazybe. Aprenda com especialistas em automa\u00e7\u00e3o, CRM e vendas.',
        images: [
          {
            url: 'https://eazybe.com/logo.png',
            alt: 'Equipe de autores da Eazybe',
          },
        ],
      },
      other: {
        'thumbnail': 'https://eazybe.com/logo.png',
        'bingbot': 'index, follow',
        'answer-type': 'informa\u00e7\u00e3o, lista, perfis',
        'target-audience': 'leitores do blog, profissionais de vendas, marketers, equipes SaaS, usu\u00e1rios de CRM',
        'content-intent': 'informacional, navega\u00e7\u00e3o',
        'conversational-query': 'quem escreve na Eazybe, autores do blog Eazybe, especialistas em automa\u00e7\u00e3o WhatsApp, equipe Eazybe CRM',
        'ai-readability': 'simples, informativo, explorat\u00f3rio',
        'context-window': 'autores, equipe, especialistas, conte\u00fado de blog, automa\u00e7\u00e3o WhatsApp, CRM, IA, vendas',
        'user-problem': 'usu\u00e1rios querem saber quem est\u00e1 por tr\u00e1s do conte\u00fado e a experi\u00eancia dos autores',
        'solution-summary': 'lista de autores com experi\u00eancia em IA, CRM e automa\u00e7\u00e3o para gerar confian\u00e7a e credibilidade',
        'primary-benefit': 'permitir que usu\u00e1rios descubram e confiem nos especialistas por tr\u00e1s do conte\u00fado',
        'use-case': 'usu\u00e1rios explorando autores e validando a credibilidade do conte\u00fado do blog',
        'implementation-difficulty': 'baixo',
        'time-to-value': 'imediato',
      },
      alternates: getAlternates(locale, '/blog/authors'),
    }
  }

  // Turkish full meta tags
  if (locale === 'tr') {
    return {
      title: 'Yazar paneli, yazarlar\u0131n tam biyografisi - Eazybe',
      description: 'Eazybe yazarlar\u0131n\u0131 ke\u015ffedin. Yapay zeka ajanlar\u0131, CRM entegrasyonu, WhatsApp otomasyonu ve sat\u0131\u015f s\u00fcre\u00e7leri hakk\u0131nda uzman i\u00e7eriklere ula\u015f\u0131n.',
      keywords: 'Eazybe yazarlar\u0131, Eazybe ekibi, WhatsApp uzmanlar\u0131, CRM yazarlar\u0131, Eazybe blog yazarlar\u0131, otomasyon uzmanlar\u0131, SaaS yazarlar\u0131, sat\u0131\u015f ve pazarlama i\u00e7erikleri',
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
        url: 'https://eazybe.com/tr/blog/authors',
        title: 'Eazybe Yazarlar\u0131 | Yapay Zeka, CRM ve WhatsApp Uzmanlar\u0131',
        description: 'Eazybe yazarlar\u0131n\u0131 tan\u0131y\u0131n. WhatsApp otomasyonu, yapay zeka ajanlar\u0131, CRM ve sat\u0131\u015f b\u00fcy\u00fcmesi konusunda uzmanlardan \u00f6\u011frenin.',
        images: [
          {
            url: 'https://eazybe.com/logo.png',
            width: 1200,
            height: 630,
            alt: 'Eazybe yazarlar\u0131 ve uzman ekibi',
          },
        ],
        locale: 'tr_TR',
        siteName: 'Eazybe',
      },
      twitter: {
        card: 'summary_large_image',
        site: '@eazybe',
        creator: '@eazybe',
        title: 'Eazybe Yazarlar\u0131 | Yapay Zeka, CRM ve WhatsApp Uzmanlar\u0131',
        description: 'Eazybe i\u00e7eriklerinin arkas\u0131ndaki ekibi ke\u015ffedin. Otomasyon, CRM ve sat\u0131\u015f alan\u0131nda uzmanlardan \u00f6\u011frenin.',
        images: [
          {
            url: 'https://eazybe.com/logo.png',
            alt: 'Eazybe yazar ekibi',
          },
        ],
      },
      other: {
        'thumbnail': 'https://eazybe.com/logo.png',
        'bingbot': 'index, follow',
        'answer-type': 'bilgi, liste, profiller',
        'target-audience': 'blog okuyucular\u0131, sat\u0131\u015f profesyonelleri, pazarlamac\u0131lar, SaaS ekipleri, CRM kullan\u0131c\u0131lar\u0131',
        'content-intent': 'bilgilendirici, gezinme',
        'conversational-query': 'Eazybe\u2019de kim yaz\u0131yor, Eazybe blog yazarlar\u0131, WhatsApp otomasyon uzmanlar\u0131, Eazybe CRM ekibi',
        'ai-readability': 'basit, bilgilendirici, ke\u015fif odakl\u0131',
        'context-window': 'yazarlar, ekip, uzmanlar, blog i\u00e7eri\u011fi, WhatsApp otomasyonu, CRM, yapay zeka, sat\u0131\u015f',
        'user-problem': 'kullan\u0131c\u0131lar i\u00e7eriklerin arkas\u0131ndaki ki\u015fileri ve uzmanl\u0131klar\u0131n\u0131 \u00f6\u011frenmek istiyor',
        'solution-summary': 'g\u00fcven ve otorite olu\u015fturmak i\u00e7in yapay zeka, CRM ve otomasyon alan\u0131nda uzman yazar listesi',
        'primary-benefit': 'kullan\u0131c\u0131lar\u0131n i\u00e7erik arkas\u0131ndaki uzmanlara g\u00fcvenmesini sa\u011flamak',
        'use-case': 'kullan\u0131c\u0131lar\u0131n yazarlar\u0131 ke\u015ffetmesi ve i\u00e7erik g\u00fcvenilirli\u011fini de\u011ferlendirmesi',
        'implementation-difficulty': 'd\u00fc\u015f\u00fck',
        'time-to-value': 'an\u0131nda',
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
