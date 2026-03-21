import { Metadata } from 'next'
import * as cheerio from 'cheerio'

/**
 * Parse SEO metadata from HTML string using Cheerio
 * More reliable than regex-based parsing
 */
export function parseMetadataFromHtml(html: string | null | undefined): Metadata {
  const metadata: Metadata = {}

  if (!html || typeof html !== 'string') {
    return metadata
  }

  const $ = cheerio.load(html)

  // Parse <title> tag
  const title = $('title').first().text()
  if (title) {
    metadata.title = title
  }

  // Parse <meta name="..." content="...">
  $('meta[name]').each((_, el) => {
    const name = $(el).attr('name')
    const content = $(el).attr('content')

    if (!name || !content) return

    switch (name) {
      case 'description':
        metadata.description = content
        break
      case 'keywords':
        metadata.keywords = content
        break
      case 'author':
        metadata.authors = [{ name: content }]
        break
      case 'robots':
        metadata.robots = parseRobotsDirectives(content)
        break
      default:
        // Store other meta tags in 'other' field
        if (!metadata.other) {
          metadata.other = {}
        }
        ;(metadata.other as Record<string, string>)[name] = content
    }
  })

  // Parse <meta property="og:..." content="...">
  const openGraphData: Record<string, any> = {}
  $('meta[property^="og:"]').each((_, el) => {
    const property = $(el).attr('property')
    const content = $(el).attr('content')

    if (!property || !content) return

    // Map OG properties to OpenGraph structure
    const ogKey = property.replace('og:', '')
    switch (ogKey) {
      case 'title':
        openGraphData.title = content
        break
      case 'description':
        openGraphData.description = content
        break
      case 'image':
      case 'image:url':
        if (!openGraphData.images) {
          openGraphData.images = []
        }
        openGraphData.images.push({ url: content })
        break
      case 'image:secure_url':
        if (!openGraphData.images) {
          openGraphData.images = []
        }
        openGraphData.images.push({ url: content, secureUrl: content })
        break
      case 'image:width':
        if (openGraphData.images && openGraphData.images.length > 0) {
          openGraphData.images[openGraphData.images.length - 1].width = parseInt(content)
        }
        break
      case 'image:height':
        if (openGraphData.images && openGraphData.images.length > 0) {
          openGraphData.images[openGraphData.images.length - 1].height = parseInt(content)
        }
        break
      case 'image:alt':
        if (openGraphData.images && openGraphData.images.length > 0) {
          openGraphData.images[openGraphData.images.length - 1].alt = content
        }
        break
      case 'type':
        openGraphData.type = content
        break
      case 'url':
        openGraphData.url = content
        break
      case 'site_name':
        openGraphData.siteName = content
        break
      case 'locale':
        openGraphData.locale = content
        break
      default:
        openGraphData[ogKey] = content
    }
  })

  if (Object.keys(openGraphData).length > 0) {
    metadata.openGraph = openGraphData as any
  }

  // Parse <meta name="twitter:..." content="...">
  const twitterData: Record<string, any> = {}
  $('meta[name^="twitter:"]').each((_, el) => {
    const name = $(el).attr('name')
    const content = $(el).attr('content')

    if (!name || !content) return

    const twitterKey = name.replace('twitter:', '')
    switch (twitterKey) {
      case 'card':
        twitterData.card = content
        break
      case 'site':
        twitterData.site = content
        break
      case 'creator':
        twitterData.creator = content
        break
      case 'title':
        twitterData.title = content
        break
      case 'description':
        twitterData.description = content
        break
      case 'image':
      case 'image:src':
        twitterData.images = [content]
        break
      default:
        twitterData[twitterKey] = content
    }
  })

  if (Object.keys(twitterData).length > 0) {
    metadata.twitter = twitterData as any
  }

  // Parse <link rel="canonical" href="...">
  const canonicalLink = $('link[rel="canonical"]').first()
  const canonicalHref = canonicalLink.attr('href')
  if (canonicalHref) {
    if (!metadata.alternates) {
      metadata.alternates = {}
    }
    ;(metadata.alternates as any).canonical = canonicalHref
  }

  // Parse <link rel="alternate" hreflang="..." href="...">
  const alternates: Record<string, string> = {}
  $('link[rel="alternate"][hreflang]').each((_, el) => {
    const hreflang = $(el).attr('hreflang')
    const href = $(el).attr('href')

    if (hreflang && href) {
      alternates[hreflang] = href
    }
  })

  if (Object.keys(alternates).length > 0) {
    if (!metadata.alternates) {
      metadata.alternates = {}
    }
    ;(metadata.alternates as any).languages = alternates
  }

  return metadata
}

/**
 * Parse robots meta directives
 */
function parseRobotsDirectives(content: string): any {
  const directives = content.split(',').map((s) => s.trim().toLowerCase())
  const robots: any = {}

  directives.forEach((directive) => {
    switch (directive) {
      case 'index':
      case 'all':
        robots.index = true
        break
      case 'noindex':
        robots.index = false
        break
      case 'follow':
        robots.follow = true
        break
      case 'nofollow':
        robots.follow = false
        break
      case 'none':
        robots.index = false
        robots.follow = false
        break
      case 'noarchive':
        robots.noArchive = true
        break
      case 'nosnippet':
        robots.noSnippet = true
        break
      case 'max-snippet:-1':
      case 'max-snippet:0':
        robots.maxSnippet = 'unlimited'
        break
      case 'max-image-preview:large':
        robots.maxImagePreview = 'large'
        break
      case 'max-video-preview:-1':
      case 'max-video-preview:0':
        robots.maxVideoPreview = 'unlimited'
        break
      default:
        // Handle other directives like googlebot, bingbot specific ones
        if (!robots.other) {
          robots.other = []
        }
        robots.other.push(directive)
    }
  })

  return robots
}

/**
 * Parse JSON-LD schemas from HTML string
 * Extracts and validates JSON from <script type="application/ld+json"> tags
 */
export function parseJsonLdSchemas(html: string | null | undefined): any[] {
  if (!html || typeof html !== 'string') {
    return []
  }

  const schemas: any[] = []
  const $ = cheerio.load(html)

  // Find all script tags with type="application/ld+json"
  $('script[type="application/ld+json"]').each((_, el) => {
    const scriptContent = $(el).html()

    if (!scriptContent) return

    try {
      // Parse and validate JSON
      const schema = JSON.parse(scriptContent.trim())
      schemas.push(schema)
    } catch (error) {
      // Skip invalid JSON
      console.warn('Failed to parse JSON-LD schema:', error)
    }
  })

  return schemas
}
