import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getBlogPosts, getBlogIndex } from '@/lib/sanity-queries'
import { BlogListingClient } from '@/components/pages/BlogListingClient'

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

  return (
    <BlogListingClient
      allPosts={allPosts || []}
      blogIndex={blogIndex}
      locale={locale}
    />
  )
}
