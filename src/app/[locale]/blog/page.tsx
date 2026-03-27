import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getBlogPosts, getBlogIndex } from '@/lib/sanity-queries'
import { BlogListingClient } from '@/components/pages/BlogListingClient'
import { BlogJsonLd } from '@/components/BlogJsonLd'

// ISR: Revalidate every 10 seconds to pick up Sanity CMS changes immediately
export const revalidate = 10

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const blogIndex = await getBlogIndex(locale)

  const seo = blogIndex?.seo

  const canonicalUrl = `https://eazybe.com${locale === 'en' ? '' : `/${locale}`}/blog`

  // Override everything for English blog page with provided meta tags
  if (locale === 'en') {
    return {
      title: 'Blog',
      description: 'Explore the Eazybe blog for insights on WhatsApp automation, chatbots, sales strategies, and CRM tools to streamline workflows and grow your business.',
      keywords: 'whatsapp automation, whatsapp chatbot, business automation, sales strategies, crm tools, marketing automation, customer engagement, automate whatsapp messages',
      authors: [{ name: 'Victor' }],
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-snippet': -1,
          'max-image-preview': 'large',
          'max-video-preview': -1,
        },
      },
      alternates: {
        canonical: canonicalUrl,
        languages: {
          'en': 'https://eazybe.com/blog',
          'pt-BR': 'https://eazybe.com/br/blog',
          'es': 'https://eazybe.com/es/blog',
          'tr': 'https://eazybe.com/tr/blog',
          'x-default': 'https://eazybe.com/blog',
        },
      },
      openGraph: {
        type: 'website',
        url: 'https://eazybe.com/blog',
        title: 'Eazybe Blog | WhatsApp Automation & Business Growth Insights',
        description: 'Learn how to automate WhatsApp, improve customer engagement, and grow your business with actionable strategies and tools.',
        images: [
          {
            url: 'https://eazybe.com/logo.png',
            width: 1200,
            height: 630,
            alt: 'Eazybe blog on WhatsApp automation and business growth',
          }
        ],
        locale: 'en_US',
        siteName: 'Eazybe',
      },
      twitter: {
        card: 'summary_large_image',
        site: '@eazybe',
        creator: '@eazybe',
        title: 'Eazybe Blog | WhatsApp Automation & Sales Strategies',
        description: 'Discover WhatsApp automation tools, chatbots, and sales strategies to optimize workflows and scale your business.',
        images: ['https://eazybe.com/logo.png'],
      },
      other: {
        'article:section': 'Sales & Marketing',
        'article:tag': 'WhatsApp Automation, Chatbots, Sales Growth, CRM Integration, Marketing Automation',
        'thumbnail': 'https://eazybe.com/logo.png',
        'googlebot': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
        'bingbot': 'index, follow',
        'answer-type': 'guide, insights, strategies',
        'target-audience': 'business owners, marketers, sales teams, SaaS founders, CRM users',
        'content-intent': 'informational',
        'conversational-query': 'whatsapp automation blog, business automation tips, sales strategies blog, marketing automation insights',
        'ai-readability': 'professional, informative, strategy-focused',
        'context-window': 'whatsapp automation, chatbots, sales strategies, crm tools, marketing automation, customer engagement',
        'user-problem': 'businesses need insights and strategies to improve automation, engagement, and sales performance',
        'solution-summary': 'blog content providing actionable strategies, tools, and insights for automation and business growth',
        'primary-benefit': 'help users learn, implement, and optimize automation and sales strategies',
        'use-case': 'users exploring blog content to improve business processes and marketing strategies',
        'implementation-difficulty': 'low',
        'time-to-value': 'immediate through actionable blog insights',
        'twitter:image:alt': 'WhatsApp automation and business growth blog',
      },
    }
  }

  // Override everything for Brazilian Portuguese blog page with provided meta tags
  if (locale === 'br') {
    return {
      title: 'Blog',
      description: 'Explore o blog da Eazybe para insights sobre automação de WhatsApp, chatbots, estratégias de vendas e ferramentas de CRM para otimizar processos e impulsionar seu negócio.',
      keywords: 'automação whatsapp, chatbot whatsapp, automação de negócios, estratégias de vendas, ferramentas crm, automação de marketing, engajamento do cliente, automatizar mensagens whatsapp',
      robots: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
        googleBot: {
          index: true,
          follow: true,
          'max-snippet': -1,
          'max-image-preview': 'large',
          'max-video-preview': -1,
        },
      },
      alternates: {
        canonical: canonicalUrl,
        languages: {
          'en': 'https://eazybe.com/blog',
          'pt-BR': 'https://eazybe.com/br/blog',
          'es': 'https://eazybe.com/es/blog',
          'tr': 'https://eazybe.com/tr/blog',
          'x-default': 'https://eazybe.com/blog',
        },
      },
      openGraph: {
        type: 'website',
        url: 'https://eazybe.com/br/blog',
        title: 'Blog Eazybe | Automação de WhatsApp, Vendas e CRM',
        description: 'Descubra insights sobre automação de WhatsApp, chatbots, estratégias de vendas e ferramentas de CRM para crescer com a Eazybe.',
        images: [
          {
            url: 'https://eazybe.com/logo.png',
            width: 1200,
            height: 630,
            alt: 'Blog da Eazybe sobre automação, CRM e estratégias de vendas',
          }
        ],
        locale: 'pt_BR',
        siteName: 'Eazybe',
      },
      twitter: {
        card: 'summary_large_image',
        site: '@eazybe',
        creator: '@eazybe',
        title: 'Blog Eazybe | Automação, Vendas e CRM',
        description: 'Aprenda sobre automação de WhatsApp, chatbots, ferramentas de CRM e estratégias de vendas para escalar seu negócio.',
        images: ['https://eazybe.com/logo.png'],
      },
      other: {
        'thumbnail': 'https://eazybe.com/logo.png',
        'googlebot': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
        'bingbot': 'index, follow',
        'answer-type': 'blog, insights, guias',
        'target-audience': 'equipes de vendas, profissionais de marketing, fundadores de SaaS, empreendedores, usuários de CRM, especialistas em automação',
        'content-intent': 'informacional',
        'conversational-query': 'blog de automação WhatsApp, dicas de automação de vendas, insights sobre CRM, estratégias de chatbot, guias de automação de negócios',
        'ai-readability': 'profissional, acionável, educacional',
        'context-window': 'automação de WhatsApp, estratégias de vendas, ferramentas de CRM, chatbots, geração de leads, crescimento de negócios',
        'user-problem': 'empresas precisam de insights e estratégias para automatizar processos, melhorar vendas e escalar com eficiência',
        'solution-summary': 'o blog da Eazybe oferece insights práticos, estratégias e ferramentas para automatizar vendas e melhorar o desempenho do negócio',
        'primary-benefit': 'aprender a automatizar processos, melhorar vendas e crescer com insights especializados',
        'use-case': 'leitura de conteúdos para aprender sobre automação, CRM e estratégias de vendas',
        'implementation-difficulty': 'varia conforme os temas e ferramentas abordadas',
        'time-to-value': 'insights imediatos com estratégias práticas',
        'twitter:image:alt': 'Blog Eazybe',
      },
    }
  }

  // Override everything for Spanish blog page with provided meta tags
  if (locale === 'es') {
    return {
      title: 'Blog',
      description: 'Explora el blog de Eazybe para conocer insights sobre automatización de WhatsApp, chatbots, estrategias de ventas y herramientas CRM para optimizar procesos y hacer crecer tu negocio.',
      keywords: 'automatización whatsapp, chatbot whatsapp, automatización de negocios, estrategias de ventas, herramientas crm, automatización de marketing, compromiso del cliente, automatizar mensajes whatsapp',
      robots: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
        googleBot: {
          index: true,
          follow: true,
          'max-snippet': -1,
          'max-image-preview': 'large',
          'max-video-preview': -1,
        },
      },
      alternates: {
        canonical: canonicalUrl,
        languages: {
          'en': 'https://eazybe.com/blog',
          'pt-BR': 'https://eazybe.com/br/blog',
          'es': 'https://eazybe.com/es/blog',
          'tr': 'https://eazybe.com/tr/blog',
          'x-default': 'https://eazybe.com/blog',
        },
      },
      openGraph: {
        type: 'website',
        url: 'https://eazybe.com/es/blog',
        title: 'Blog Eazybe | Automatización de WhatsApp, Ventas y CRM',
        description: 'Descubre insights sobre automatización de WhatsApp, chatbots, estrategias de ventas y herramientas CRM para hacer crecer tu negocio con Eazybe.',
        images: [
          {
            url: 'https://eazybe.com/logo.png',
            width: 1200,
            height: 630,
            alt: 'Blog de Eazybe sobre automatización, CRM y estrategias de ventas',
          }
        ],
        locale: 'es_ES',
        siteName: 'Eazybe',
      },
      twitter: {
        card: 'summary_large_image',
        site: '@eazybe',
        creator: '@eazybe',
        title: 'Blog Eazybe | Automatización, Ventas y CRM',
        description: 'Aprende sobre automatización de WhatsApp, chatbots, herramientas CRM y estrategias de ventas para escalar tu negocio.',
        images: ['https://eazybe.com/logo.png'],
      },
      other: {
        'thumbnail': 'https://eazybe.com/logo.png',
        'googlebot': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
        'bingbot': 'index, follow',
        'answer-type': 'blog, insights, guías',
        'target-audience': 'equipos de ventas, profesionales de marketing, fundadores de SaaS, emprendedores, usuarios de CRM, especialistas en automatización',
        'content-intent': 'informacional',
        'conversational-query': 'blog de automatización WhatsApp, consejos de ventas automatizadas, herramientas CRM insights, estrategias de chatbot, guías de automatización empresarial',
        'ai-readability': 'profesional, accionable, educativo',
        'context-window': 'automatización de WhatsApp, estrategias de ventas, herramientas CRM, chatbots, generación de leads, crecimiento empresarial',
        'user-problem': 'las empresas necesitan estrategias e insights para automatizar procesos, mejorar ventas y escalar eficientemente',
        'solution-summary': 'el blog de Eazybe ofrece estrategias prácticas, insights y herramientas para automatizar ventas y mejorar el rendimiento empresarial',
        'primary-benefit': 'aprender a automatizar procesos, mejorar ventas y crecer con insights expertos',
        'use-case': 'lectura de contenido para aprender sobre automatización, CRM y estrategias de ventas',
        'implementation-difficulty': 'varía según los temas y herramientas tratadas',
        'time-to-value': 'insights inmediatos con estrategias aplicables',
        'twitter:image:alt': 'Blog Eazybe',
      },
    }
  }

  // Override everything for Turkish blog page with provided meta tags
  if (locale === 'tr') {
    return {
      title: 'Blog',
      description: 'Eazybe blog unda WhatsApp otomasyonu, chatbotlar, satış stratejileri ve CRM araçları hakkında içgörüler keşfedin. İş süreçlerinizi optimize edin ve işinizi büyütün.',
      keywords: 'WhatsApp otomasyonu, chatbot WhatsApp, iş otomasyonu, satış stratejileri, CRM araçları, pazarlama otomasyonu, müşteri etkileşimi, WhatsApp mesajlarını otomatikleştirme',
      robots: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
        googleBot: {
          index: true,
          follow: true,
          'max-snippet': -1,
          'max-image-preview': 'large',
          'max-video-preview': -1,
        },
      },
      alternates: {
        canonical: canonicalUrl,
        languages: {
          'en': 'https://eazybe.com/blog',
          'pt-BR': 'https://eazybe.com/br/blog',
          'es': 'https://eazybe.com/es/blog',
          'tr': 'https://eazybe.com/tr/blog',
          'x-default': 'https://eazybe.com/blog',
        },
      },
      openGraph: {
        type: 'website',
        url: 'https://eazybe.com/tr/blog',
        title: 'Eazybe Blog | WhatsApp Otomasyonu, Satış ve CRM',
        description: 'WhatsApp otomasyonu, chatbotlar, satış stratejileri ve CRM araçları hakkında içgörüler keşfedin ve Eazybe ile işinizi büyütün.',
        images: [
          {
            url: 'https://eazybe.com/logo.png',
            width: 1200,
            height: 630,
            alt: 'Eazybe blog - otomasyon, CRM ve satış stratejileri',
          }
        ],
        locale: 'tr_TR',
        siteName: 'Eazybe',
      },
      twitter: {
        card: 'summary_large_image',
        site: '@eazybe',
        creator: '@eazybe',
        title: 'Eazybe Blog | Otomasyon, Satış ve CRM',
        description: 'WhatsApp otomasyonu, chatbotlar, CRM araçları ve satış stratejileri hakkında bilgi edinin ve işinizi büyütün.',
        images: ['https://eazybe.com/logo.png'],
      },
      other: {
        'thumbnail': 'https://eazybe.com/logo.png',
        'googlebot': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
        'bingbot': 'index, follow',
        'answer-type': 'blog, içgörüler, rehberler',
        'target-audience': 'satış ekipleri, pazarlamacılar, SaaS kurucuları, girişimciler, CRM kullanıcıları, otomasyon uzmanları',
        'content-intent': 'bilgilendirici',
        'conversational-query': 'WhatsApp otomasyon blogu, satış otomasyonu ipuçları, CRM araçları içgörüleri, chatbot stratejileri, iş otomasyonu rehberleri',
        'ai-readability': 'profesyonel, uygulanabilir, eğitici',
        'context-window': 'WhatsApp otomasyonu, satış stratejileri, CRM araçları, chatbotlar, lead oluşturma, iş büyümesi',
        'user-problem': 'işletmeler süreçlerini otomatikleştirmek, satışlarını geliştirmek ve verimli şekilde büyümek için içgörülere ihtiyaç duyar',
        'solution-summary': 'Eazybe blogu, satışları otomatikleştirmek ve iş performansını artırmak için uygulanabilir stratejiler ve araçlar sunar',
        'primary-benefit': 'iş süreçlerini otomatikleştirmeyi, satışları geliştirmeyi ve uzman içgörülerle büyümeyi öğrenmek',
        'use-case': 'otomasyon, CRM ve satış stratejileri hakkında bilgi edinmek için blog içeriklerini okumak',
        'implementation-difficulty': 'konuya ve kullanılan araçlara bağlı olarak değişir',
        'time-to-value': 'uygulanabilir stratejilerle anında içgörüler',
        'twitter:image:alt': 'Eazybe Blog',
      },
    }
  }

  // For other locales, use Sanity CMS data
  return {
    title: seo?.metaTitle || 'Blog - Eazybe',
    description:
      seo?.metaDescription ||
      'Tips, guides, and insights on WhatsApp CRM integration, sales automation, and customer engagement.',
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': 'https://eazybe.com/blog',
        'pt-BR': 'https://eazybe.com/br/blog',
        'es': 'https://eazybe.com/es/blog',
        'tr': 'https://eazybe.com/tr/blog',
        'x-default': 'https://eazybe.com/blog',
      },
    },
    openGraph: {
      title: seo?.ogTitle || seo?.metaTitle || 'Blog - Eazybe',
      description:
        seo?.ogDescription ||
        seo?.metaDescription ||
        'Tips, guides, and insights on WhatsApp CRM integration, sales automation, and customer engagement.',
      ...(seo?.ogImage && { images: [{ url: seo.ogImage }] }),
    },
  }
}

export default async function BlogListingPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const [allPosts, blogIndex] = await Promise.all([
    getBlogPosts(locale),
    getBlogIndex(locale),
  ])

  // Only add JSON-LD schemas for English blog page
  if (locale === 'en') {
    return (
      <>
        <BlogJsonLd />
        <BlogListingClient
          allPosts={allPosts || []}
          blogIndex={blogIndex}
          locale={locale}
        />
      </>
    )
  }

  // Add JSON-LD schemas for Brazilian Portuguese blog page
  if (locale === 'br') {
    const brSchemas = [
      {
        "@context": "https://schema.org/",
        "@type": "Organization",
        "name": "Eazybe",
        "url": "https://eazybe.com/br",
        "logo": {
          "@type": "ImageObject",
          "url": "https://eazybe.com/logo.png",
          "width": 600,
          "height": 60
        },
        "image": "https://eazybe.com/logo.png",
        "description": "A Eazybe ajuda equipes de vendas a automatizar conversas no WhatsApp com agentes de IA, qualificar leads, identificar negócios frios e sincronizar chats com plataformas de CRM como HubSpot, Zoho, Salesforce e Google Sheets.",
        "foundingDate": "2022-09-13",
        "founder": {
          "@type": "Person",
          "name": "Sagar Dewan",
          "sameAs": [
            "https://www.linkedin.com/in/sagar-dewan-b43b9931/"
          ]
        },
        "parentOrganization": {
          "@type": "Organization",
          "name": "Eazybe Inc."
        },
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
          "url": "https://eazybe.com/br",
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
      },
      {
        "@context": "https://schema.org/",
        "@type": "SoftwareApplication",
        "name": "Eazybe",
        "applicationCategory": "BusinessApplication",
        "applicationSubCategory": "Integração com CRM, Automação para WhatsApp, Agentes de IA para WhatsApp",
        "operatingSystem": "Web, Extensão Chrome",
        "url": "https://eazybe.com/br",
        "image": "https://eazybe.com/logo.png",
        "description": "A Eazybe ajuda equipes de vendas a automatizar conversas no WhatsApp com agentes de IA, qualificar leads, identificar negócios frios e sincronizar chats com plataformas de CRM como HubSpot, Zoho, Salesforce e Google Sheets.",
        "softwareVersion": "latest",
        "downloadUrl": "https://chrome.google.com/webstore/detail/clgficggccelgifppbcaepjdkklfcefd",
        "screenshot": "https://cdn.prod.website-files.com/64cb8fe9dae4f2e5a069eb37/687f71bf8e51d6931ee45917_hero_image_without_AI-p-1080.webp",
        "offers": {
          "@type": "AggregateOffer",
          "url": "https://eazybe.com/br/pricing",
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
      }
    ]

    return (
      <>
        {brSchemas.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
        <BlogListingClient
          allPosts={allPosts || []}
          blogIndex={blogIndex}
          locale={locale}
        />
      </>
    )
  }

  // Add JSON-LD schemas for Spanish blog page
  if (locale === 'es') {
    const esSchemas = [
      {
        "@context": "https://schema.org/",
        "@type": "BreadcrumbList",
        "itemListElement": [{
          "@type": "ListItem",
          "position": 1,
          "name": "Eazybe",
          "item": "https://eazybe.com/es"
        },{
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": "https://eazybe.com/es/blog"
        }]
      },
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Eazybe",
        "url": "https://eazybe.com/es",
        "logo": {
          "@type": "ImageObject",
          "url": "https://eazybe.com/logo.png",
          "width": 600,
          "height": 60
        },
        "image": "https://eazybe.com/logo.png",
        "description": "Eazybe ayuda a los equipos de ventas a automatizar conversaciones de WhatsApp con agentes de IA, calificar leads, detectar oportunidades estancadas y sincronizar chats con CRM como HubSpot, Zoho, Salesforce y Google Sheets.",
        "foundingDate": "2022-09-13",
        "founder": {
          "@type": "Person",
          "name": "Sagar Dewan",
          "sameAs": [
            "https://www.linkedin.com/in/sagar-dewan-b43b9931/"
          ]
        },
        "parentOrganization": {
          "@type": "Organization",
          "name": "Eazybe Inc."
        },
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
          "url": "https://eazybe.com/es",
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
      },
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Eazybe",
        "applicationCategory": "BusinessApplication",
        "applicationSubCategory": "Integración CRM, Automatización de WhatsApp, Agentes de IA para WhatsApp",
        "operatingSystem": "Web, Chrome Extension",
        "url": "https://eazybe.com/es",
        "image": "https://eazybe.com/logo.png",
        "description": "Eazybe ayuda a los equipos de ventas a automatizar conversaciones de WhatsApp con agentes de IA, calificar leads, detectar oportunidades estancadas y sincronizar chats con CRM como HubSpot, Zoho, Salesforce y Google Sheets.",
        "softwareVersion": "latest",
        "downloadUrl": "https://chrome.google.com/webstore/detail/clgficggccelgifppbcaepjdkklfcefd",
        "screenshot": "https://cdn.prod.website-files.com/64cb8fe9dae4f2e5a069eb37/687f71bf8e51d6931ee45917_hero_image_without_AI-p-1080.webp",
        "offers": {
          "@type": "AggregateOffer",
          "url": "https://eazybe.com/es/pricing",
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
      }
    ]

    return (
      <>
        {esSchemas.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
        <BlogListingClient
          allPosts={allPosts || []}
          blogIndex={blogIndex}
          locale={locale}
        />
      </>
    )
  }

  // Add JSON-LD schemas for Turkish blog page
  if (locale === 'tr') {
    const trSchemas = [
      {
        "@context": "https://schema.org/",
        "@type": "Organization",
        "name": "Eazybe",
        "url": "https://eazybe.com/tr",
        "logo": {
          "@type": "ImageObject",
          "url": "https://eazybe.com/logo.png",
          "width": 600,
          "height": 60
        },
        "image": "https://eazybe.com/logo.png",
        "description": "Eazybe, satış ekiplerinin WhatsApp konuşmalarını yapay zeka ajanları ile otomatikleştirmesine, lead'leri nitelendirmesine, soğuyan fırsatları tespit etmesine ve sohbetleri HubSpot, Zoho, Salesforce ve Google Sheets gibi CRM platformlarıyla senkronize etmesine yardımcı olur.",
        "foundingDate": "2022-09-13",
        "founder": {
          "@type": "Person",
          "name": "Sagar Dewan",
          "sameAs": [
            "https://www.linkedin.com/in/sagar-dewan-b43b9931/"
          ]
        },
        "parentOrganization": {
          "@type": "Organization",
          "name": "Eazybe Inc."
        },
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
          "url": "https://eazybe.com/tr",
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
      },
      {
        "@context": "https://schema.org/",
        "@type": "SoftwareApplication",
        "name": "Eazybe",
        "applicationCategory": "BusinessApplication",
        "applicationSubCategory": "CRM Entegrasyonu, WhatsApp Otomasyonu, WhatsApp için Yapay Zeka Ajanları",
        "operatingSystem": "Web, Chrome Uzantısı",
        "url": "https://eazybe.com/tr",
        "image": "https://eazybe.com/logo.png",
        "description": "Eazybe, satış ekiplerinin WhatsApp konuşmalarını yapay zeka ajanları ile otomatikleştirmesine, lead'leri nitelendirmesine, soğuyan fırsatları tespit etmesine ve sohbetleri HubSpot, Zoho, Salesforce ve Google Sheets gibi CRM platformlarıyla senkronize etmesine yardımcı olur.",
        "softwareVersion": "latest",
        "downloadUrl": "https://chrome.google.com/webstore/detail/clgficggccelgifppbcaepjdkklfcefd",
        "screenshot": "https://cdn.prod.website-files.com/64cb8fe9dae4f2e5a069eb37/687f71bf8e51d6931ee45917_hero_image_without_AI-p-1080.webp",
        "offers": {
          "@type": "AggregateOffer",
          "url": "https://eazybe.com/tr/pricing",
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
      }
    ]

    return (
      <>
        {trSchemas.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
        <BlogListingClient
          allPosts={allPosts || []}
          blogIndex={blogIndex}
          locale={locale}
        />
      </>
    )
  }

  return (
    <BlogListingClient
      allPosts={allPosts || []}
      blogIndex={blogIndex}
      locale={locale}
    />
  )
}
