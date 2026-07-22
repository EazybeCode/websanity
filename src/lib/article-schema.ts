/**
 * Builds Article JSON-LD dynamically from a blog/comparison post document —
 * the same auto-generation approach as the Breadcrumb/FAQ schemas. Every value
 * comes from the post itself, so each locale's translated document yields a
 * localized schema (Spanish title/URL for /es, etc.). Optional fields are
 * omitted when the source data is empty rather than emitted blank.
 */

const SITE = 'https://eazybe.com'

// URL locale → schema.org inLanguage code. `br` (Brazilian Portuguese URL folder)
// maps to "pt" to match the site's existing Article examples.
const IN_LANGUAGE: Record<string, string> = { en: 'en', es: 'es', br: 'pt', tr: 'tr' }

interface ArticlePost {
  title?: string
  slug?: string
  excerpt?: string
  metaTitle?: string
  metaDescription?: string
  metaKeywords?: string
  category?: string
  categories?: Array<{ title?: string }>
  featuredImage?: string
  featuredImageAlt?: string
  featuredImageMeta?: { width?: number; height?: number }
  publishedAt?: string
  updatedAt?: string
  author?: { name?: string; slug?: string }
}

export function buildArticleSchema(
  post: ArticlePost,
  locale: string,
  section: 'blog' | 'comparison',
): Record<string, unknown> {
  const prefix = locale === 'en' ? '' : `/${locale}`
  const pageUrl = `${SITE}${prefix}/${section}/${post.slug}`

  const headline = post.metaTitle || post.title || ''
  const description = post.metaDescription || post.excerpt || ''
  const keywords = (post.metaKeywords || '')
    .split(',')
    .map((k) => k.trim())
    .filter(Boolean)
  const articleSection = post.category || post.categories?.[0]?.title
  const modified = post.updatedAt || post.publishedAt
  const authorUrl = post.author?.slug
    ? `${SITE}${prefix}/blog/authors/${post.author.slug}`
    : undefined

  const w = post.featuredImageMeta?.width
  const h = post.featuredImageMeta?.height
  const image = post.featuredImage
    ? {
        '@type': 'ImageObject',
        url: post.featuredImage,
        ...(h ? { height: h } : {}),
        ...(w ? { width: w } : {}),
      }
    : undefined

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
    inLanguage: IN_LANGUAGE[locale] || locale,
    headline,
    ...(description ? { description } : {}),
    ...(keywords.length ? { keywords } : {}),
    ...(articleSection ? { articleSection } : {}),
    url: pageUrl,
    ...(image ? { image } : {}),
    ...(post.publishedAt ? { datePublished: post.publishedAt } : {}),
    ...(modified ? { dateModified: modified } : {}),
    ...(description ? { articleBody: description } : {}),
    ...(post.author?.name
      ? {
          author: [
            {
              '@type': 'Person',
              name: post.author.name,
              ...(authorUrl ? { url: authorUrl } : {}),
            },
          ],
        }
      : {}),
    publisher: {
      '@type': 'Organization',
      name: 'Eazybe',
      url: `${SITE}${prefix}`,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE}/logo.png`,
        width: 600,
        height: 60,
      },
    },
    ...(image
      ? {
          associatedMedia: {
            '@type': 'ImageObject',
            url: post.featuredImage,
            caption: post.featuredImageAlt || post.title || headline,
            description: post.featuredImageAlt || post.title || headline,
            ...(h ? { height: h } : {}),
            ...(w ? { width: w } : {}),
          },
        }
      : {}),
  }
}
