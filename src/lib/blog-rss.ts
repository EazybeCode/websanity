import { getBlogPosts } from '@/lib/sanity-queries'
import { routing } from '@/i18n/routing'

const SITE_URL = 'https://eazybe.com'

// Channel-level copy per locale. Keep it short — RSS readers display it
// as the subscription title.
const CHANNEL: Record<string, { title: string; description: string; language: string }> = {
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

// Wrap text in CDATA so RSS readers display it verbatim (no entity decoding
// needed). Strip any literal `]]>` sequences to keep the CDATA closer valid.
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

export async function buildBlogRssResponse(locale: string): Promise<Response> {
  if (!routing.locales.includes(locale as any)) {
    return new Response('Not Found', { status: 404 })
  }

  const channel = CHANNEL[locale] || CHANNEL.en
  const localePath = locale === 'en' ? '' : `/${locale}`
  const blogUrl = `${SITE_URL}${localePath}/blog`
  const feedUrl = `${SITE_URL}${localePath}/blog/feed.xml`

  const posts = (await getBlogPosts(locale, 30)) || []

  const items = posts
    .map((post: any) => {
      const link = `${SITE_URL}${localePath}/blog/${post.slug}`
      const title = cdata(post.title)
      const description = cdata(post.excerpt || '')
      const pubDate = toRfc822(post.publishedAt)
      const author = post.author?.name ? `<dc:creator>${cdata(post.author.name)}</dc:creator>` : ''
      const category = post.category ? `<category>${cdata(post.category)}</category>` : ''
      const image = post.featuredImage
        ? `<enclosure url="${escapeXml(post.featuredImage)}" type="image/jpeg" length="0" />`
        : ''
      return `
    <item>
      <title>${title}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${description}</description>
      ${author}
      ${category}
      ${image}
    </item>`
    })
    .join('')

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
    <link>${blogUrl}</link>
    <description>${cdata(channel.description)}</description>
    <language>${channel.language}</language>
    <generator>Eazybe Next.js RSS Generator</generator>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    <image>
      <url>${SITE_URL}/logo.png</url>
      <title>${cdata(channel.title)}</title>
      <link>${blogUrl}</link>
    </image>${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=600, s-maxage=3600',
    },
  })
}
