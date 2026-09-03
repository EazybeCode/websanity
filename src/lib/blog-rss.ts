import { getBlogPosts, getComparisonPosts } from '@/lib/sanity-queries'
import { routing } from '@/i18n/routing'

const SITE_URL = 'https://eazybe.com'

export type FeedKind = 'blog' | 'comparison'

// Channel-level copy per (feed kind, locale).
const CHANNEL: Record<FeedKind, Record<string, { title: string; description: string; language: string }>> = {
  blog: {
    en: {
      title: 'Eazybe Blog',
      description: 'WhatsApp CRM, AI agents, sales automation, and customer success — straight from the Eazybe team.',
      language: 'en-us',
    },
    br: {
      title: 'Blog da Eazybe',
      description: 'WhatsApp CRM, agentes de IA, automação de vendas e sucesso do cliente — direto do time da Eazybe.',
      language: 'pt-br',
    },
    es: {
      title: 'Blog de Eazybe',
      description: 'WhatsApp CRM, agentes de IA, automatización de ventas y éxito del cliente — directo del equipo de Eazybe.',
      language: 'es',
    },
    tr: {
      title: 'Eazybe Blog',
      description: 'WhatsApp CRM, AI agent\'leri, satış otomasyonu ve müşteri başarısı — doğrudan Eazybe ekibinden.',
      language: 'tr',
    },
  },
  comparison: {
    en: {
      title: 'Eazybe Comparison Reviews',
      description: 'Head-to-head reviews of every WhatsApp CRM tool we test — Wati, Interakt, Respond.io, AiSensy, Trengo, and more.',
      language: 'en-us',
    },
    br: {
      title: 'Comparações Eazybe',
      description: 'Análises lado a lado de todas as ferramentas de WhatsApp CRM que testamos — Wati, Interakt, Respond.io, AiSensy, Trengo e mais.',
      language: 'pt-br',
    },
    es: {
      title: 'Comparaciones Eazybe',
      description: 'Análisis cara a cara de cada herramienta de WhatsApp CRM que probamos — Wati, Interakt, Respond.io, AiSensy, Trengo y más.',
      language: 'es',
    },
    tr: {
      title: 'Eazybe Karşılaştırmaları',
      description: 'Test ettiğimiz tüm WhatsApp CRM araçlarının karşılaştırmalı incelemeleri — Wati, Interakt, Respond.io, AiSensy, Trengo ve daha fazlası.',
      language: 'tr',
    },
  },
}

function escapeXml(text: string | null | undefined): string {
  if (!text) return ''
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

// MIME type for the enclosure, derived from the image URL's extension.
function enclosureType(url: string): string {
  const ext = url.split('?')[0].split('.').pop()?.toLowerCase()
  const types: Record<string, string> = {
    webp: 'image/webp', png: 'image/png', gif: 'image/gif',
    jpg: 'image/jpeg', jpeg: 'image/jpeg', avif: 'image/avif', svg: 'image/svg+xml',
  }
  return (ext && types[ext]) || 'image/jpeg'
}

function cdata(text: string | null | undefined): string {
  if (!text) return '<![CDATA[]]>'
  const safe = String(text).replace(/]]>/g, ']]]]><![CDATA[>')
  return `<![CDATA[${safe}]]>`
}

function toRfc822(isoOrDate: string | Date | undefined): string {
  if (!isoOrDate) return new Date(0).toUTCString()
  const d = isoOrDate instanceof Date ? isoOrDate : new Date(isoOrDate)
  return d.toUTCString()
}

async function fetchPosts(kind: FeedKind, locale: string): Promise<any[]> {
  if (kind === 'comparison') {
    return (await getComparisonPosts(locale, 30)) || []
  }
  return (await getBlogPosts(locale, 30)) || []
}

export async function buildRssResponse(kind: FeedKind, locale: string): Promise<Response> {
  if (!routing.locales.includes(locale as any)) {
    return new Response('Not Found', { status: 404 })
  }

  const channel = CHANNEL[kind][locale] || CHANNEL[kind].en
  const localePath = locale === 'en' ? '' : `/${locale}`
  const sectionPath = kind === 'comparison' ? '/comparison' : '/blog'
  const indexUrl = `${SITE_URL}${localePath}${sectionPath}`
  const feedUrl = `${SITE_URL}${localePath}${sectionPath}/feed.xml`

  const posts = await fetchPosts(kind, locale)

  const items = posts
    .map((post: any) => {
      const link = `${SITE_URL}${localePath}${sectionPath}/${post.slug}`
      const pubDate = toRfc822(post.publishedAt)
      const lines = [
        `<title>${cdata(post.title)}</title>`,
        `<link>${link}</link>`,
        `<guid isPermaLink="true">${link}</guid>`,
        `<pubDate>${pubDate}</pubDate>`,
        `<description>${cdata(post.excerpt || '')}</description>`,
        post.author?.name ? `<dc:creator>${cdata(post.author.name)}</dc:creator>` : '',
        post.category ? `<category>${cdata(post.category)}</category>` : '',
        post.featuredImage
          ? `<enclosure url="${escapeXml(post.featuredImage)}" type="${enclosureType(post.featuredImage)}" length="0" />`
          : '',
      ].filter(Boolean)
      return `    <item>\n      ${lines.join('\n      ')}\n    </item>`
    })
    .join('\n')

  const lastBuildDate = posts.length
    ? toRfc822(posts[0].publishedAt)
    : new Date().toUTCString()

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/feed.xsl"?>
<rss version="2.0"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${cdata(channel.title)}</title>
    <link>${indexUrl}</link>
    <description>${cdata(channel.description)}</description>
    <language>${channel.language}</language>
    <generator>Eazybe Next.js RSS Generator</generator>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    <image>
      <url>${SITE_URL}/logo.png</url>
      <title>${cdata(channel.title)}</title>
      <link>${indexUrl}</link>
    </image>
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=600, s-maxage=3600',
    },
  })
}

// Back-compat shim: existing route handlers still call buildBlogRssResponse.
export async function buildBlogRssResponse(locale: string): Promise<Response> {
  return buildRssResponse('blog', locale)
}
