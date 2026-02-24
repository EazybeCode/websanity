/**
 * Translation utility for blog content
 * Translates PortableText blocks and other content from English to target languages
 */

export type SupportedLanguage = 'en' | 'br' | 'es' | 'tr'

// Translation dictionaries for common UI elements
const uiTranslations: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    'min read': 'min read',
    'By': 'By',
    'Featured': 'Featured',
    'All': 'All',
    'Search': 'Search',
    'Load More': 'Load More',
    'Related Posts': 'Related Posts',
    'Table of Contents': 'Table of Contents',
    'Share this article': 'Share this article',
    'Subscribe to newsletter': 'Subscribe to newsletter'
  },
  br: {
    'min read': 'min de leitura',
    'By': 'Por',
    'Featured': 'Destaque',
    'All': 'Todos',
    'Search': 'Pesquisar',
    'Load More': 'Carregar mais',
    'Related Posts': 'Posts relacionados',
    'Table of Contents': 'Índice',
    'Share this article': 'Compartilhe este artigo',
    'Subscribe to newsletter': 'Inscrever-se na newsletter'
  },
  es: {
    'min read': 'min de lectura',
    'By': 'Por',
    'Featured': 'Destacado',
    'All': 'Todos',
    'Search': 'Buscar',
    'Load More': 'Cargar más',
    'Related Posts': 'Artículos relacionados',
    'Table of Contents': 'Tabla de contenidos',
    'Share this article': 'Compartir este artículo',
    'Subscribe to newsletter': 'Suscríbete al boletín'
  },
  tr: {
    'min read': 'dk okuma',
    'By': 'Yazan',
    'Featured': 'Öne çıkan',
    'All': 'Tümü',
    'Search': 'Ara',
    'Load More': 'Daha fazla',
    'Related Posts': 'İlgili gönderiler',
    'Table of Contents': 'İçindekiler',
    'Share this article': 'Bu makaleyi paylaş',
    'Subscribe to newsletter': 'Bültene abone ol'
  }
}

// Simple translation API integration placeholder
// In production, you would integrate with Google Translate, DeepL, or OpenAI API
async function translateText(text: string, targetLanguage: SupportedLanguage): Promise<string> {
  // For now, return the original text
  // TODO: Integrate with translation API
  if (targetLanguage === 'en') return text

  // Placeholder - in production, call actual translation API
  return text
}

/**
 * Translate PortableText content blocks
 */
export async function translatePortableText(
  blocks: any[],
  targetLanguage: SupportedLanguage
): Promise<any[]> {
  if (!blocks || targetLanguage === 'en') return blocks

  // Clone the blocks to avoid mutating original
  const translatedBlocks = blocks.map(block => {
    if (block._type === 'block' && block.children) {
      return {
        ...block,
        children: block.children.map((child: any) => {
          if (child._type === 'span' && child.text) {
            return {
              ...child,
              text: translateTextSync(child.text, targetLanguage)
            }
          }
          return child
        })
      }
    }
    return block
  })

  return translatedBlocks
}

/**
 * Synchronous translation for known phrases
 * For full content translation, you'd need an API call
 */
function translateTextSync(text: string, targetLanguage: SupportedLanguage): string {
  if (targetLanguage === 'en') return text

  // Check if it's a UI phrase we know
  const phrases = uiTranslations[targetLanguage]
  for (const [en, translated] of Object.entries(phrases)) {
    if (text === en) return translated
    if (text.toLowerCase() === en.toLowerCase()) return translated
  }

  // Return original text if no translation available
  // In production, you would call an async translation API here
  return text
}

/**
 * Translate a blog post object to target language
 */
export async function translateBlogPost(post: any, targetLanguage: SupportedLanguage): Promise<any> {
  if (!post || targetLanguage === 'en') return post

  const translatedContent = await translatePortableText(post.content, targetLanguage)

  return {
    ...post,
    title: translateTextSync(post.title, targetLanguage),
    excerpt: translateTextSync(post.excerpt, targetLanguage),
    content: translatedContent,
    // Keep original slug and other metadata
    slug: post.slug,
    category: post.category,
    featuredImage: post.featuredImage,
    publishedAt: post.publishedAt,
    readTime: post.readTime,
    author: post.author,
    quickAnswer: post.quickAnswer ? translateTextSync(post.quickAnswer, targetLanguage) : null
  }
}

/**
 * Get UI translation for a key
 */
export function getUIText(key: string, language: SupportedLanguage): string {
  return uiTranslations[language]?.[key] || uiTranslations['en'][key] || key
}

export { uiTranslations }
