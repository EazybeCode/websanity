import { sanityClient, sanityDraftClient } from './sanity'
import {
  CRM_ORDER,
  REGION_ORDER,
  type PartnerCrm,
  type PartnerRecord,
  type PartnerRegion,
} from '@/data/partner-directory'

// ─── Language mapping ────────────────────────────────────────────────────────

const sanityLangMap: Record<string, string> = { en: 'en', es: 'es', br: 'pt-BR', pt: 'pt', tr: 'tr' }
function toSanityLang(locale: string): string {
  return sanityLangMap[locale] || locale
}

// ─── Homepage ───────────────────────────────────────────────────────────────

export async function getLandingPage() {
  const query = `*[_type == "landingPage" && _id == "landingPage"][0]{
    title,
    seo,
    sections[]{
      _type,
      _key,
      ...,
      features[]{...},
      problems[]{...},
      integrations[]{...},
      comparisonRows[]{...},
      badges[]{...},
      testimonials[]{...},
      stats[]{...}
    }
  }`
  return sanityClient.fetch(query)
}

// ─── Footer ─────────────────────────────────────────────────────────────────

export async function getFooter() {
  const query = `*[_type == "footer" && _id == "footer"][0]{
    companyName,
    tagline,
    socialLinks[]{...},
    badges,
    columns[]{
      _key,
      title,
      links[]{...}
    },
    copyright,
    legalLinks[]{...}
  }`
  return sanityClient.fetch(query)
}

// ─── Navigation ─────────────────────────────────────────────────────────────

export async function getNavigation(navId: string = 'main-nav') {
  const query = `*[_type == "navigation" && navId == $navId][0]{
    navId,
    items[]{
      _key,
      label,
      url,
      children[]{
        _key,
        label,
        url,
        description,
        icon
      }
    }
  }`
  return sanityClient.fetch(query, { navId })
}

// ─── FAQs ───────────────────────────────────────────────────────────────────

export async function getFAQs(language: string = 'en') {
  const query = `*[_type == "faq" && language == $language][0]{
    questions[]{
      question,
      answer
    }
  }`
  return sanityClient.fetch(query, { language: toSanityLang(language) })
}

// ─── Pricing ────────────────────────────────────────────────────────────────

export async function getPricing(locale: string = 'en') {
  const language = toSanityLang(locale)
  const query = `*[_type == "pricingPage" && language == $language][0]{
    language,
    seo,
    hero{
      badge,
      headline,
      headlineHighlight,
      subheadline,
      billingToggleMonthly,
      billingToggleAnnual,
      saveBadgeText
    },
    plans[]{
      _key,
      name,
      description,
      icon,
      monthlyPrice,
      annualPrice,
      currency,
      isPopular,
      isEnterprise,
      features[]{
        _key,
        text,
        included,
        highlight
      },
      cta{
        label,
        url
      }
    },
    trustSignals[]{
      _key,
      icon,
      text
    },
    comparisonSection{
      badge,
      title,
      subtitle,
      features[]{
        _key,
        feature,
        category,
        starter,
        scaler,
        omnis
      }
    },
    faqSection{
      badge,
      title,
      subtitle,
      contactLinkText,
      "faqs": faq[]{
        _key,
        question,
        answer
      }
    },
    ctaSection{
      headline,
      headlineHighlight,
      subheadline,
      primaryCta{
        label,
        url
      },
      secondaryCta{
        label,
        url
      },
      footnote
    }
  }`
  return sanityClient.fetch(query, { language })
}

// ─── Product (Integration Pages) ────────────────────────────────────────────

// In-process cache for runtime-translated product pages, keyed by
// `${slug}-${language}`. Same lifecycle and rationale as
// `categoryTranslateCache`.
const productTranslateCache = new Map<string, any>()

export async function getProduct(slug: string, locale: string = 'en') {
  const language = toSanityLang(locale)
  const query = `*[_type == "productPage" && slug.current == $slug && language == $language][0]{
    "slug": slug.current,
    crmName,
    crmSlug,
    crmColor,
    metaTitle,
    metaDescription,
    metaKeywords,
    hero{
      badge,
      headline,
      headlineHighlight,
      description,
      primaryCta{ label, url },
      secondaryCta{ label, url },
      stats[]{ value, label }
    },
    benefits{
      badge,
      headline,
      items[]{
        icon,
        title,
        description
      }
    },
    features[]{
      badge,
      headline,
      description,
      points,
      cta{ label, url },
      image,
      alignRight
    },
    howItWorks{
      badge,
      headline,
      description,
      steps[]{
        number,
        title,
        description
      }
    },
    useCases{
      badge,
      headline,
      items[]{
        icon,
        title,
        description,
        benefits
      }
    },
    testimonial{
      quote,
      author,
      title,
      company,
      "avatar": avatar.asset->url
    },
    faq{
      badge,
      headline,
      items[]{
        question,
        answer
      }
    },
    cta{
      headline,
      headlineHighlight,
      description,
      primaryCta{ label, url },
      secondaryCta{ label, url },
      footnote
    }
  }`

  const localeData = await sanityClient.fetch<Record<string, any> | null>(query, {
    slug,
    language,
  })

  // For English, no fallback / translation needed.
  if (language === 'en') return localeData

  // For non-English locales, the productPage doc often only exists in English
  // in Sanity (full content for /hubspot-whatsapp-integration but no per-
  // locale docs for /es, /br, /tr). Fetch the English source-of-truth, run
  // it through the auto-translate pipeline, then overlay any locale-specific
  // Sanity content on top — same pattern as getCategoryIndex.
  const englishData = await sanityClient.fetch<Record<string, any> | null>(query, {
    slug,
    language: 'en',
  })
  if (!englishData) return localeData

  const cacheKey = `${slug}-${language}`
  let translatedEnglish = productTranslateCache.get(cacheKey)
  if (!translatedEnglish) {
    translatedEnglish = await deepTranslate(englishData, language)
    productTranslateCache.set(cacheKey, translatedEnglish)
  }

  if (!localeData) return translatedEnglish

  const isPopulated = (value: unknown): boolean => {
    if (value == null) return false
    if (Array.isArray(value)) return value.length > 0
    if (typeof value === 'object') return Object.keys(value as object).length > 0
    if (typeof value === 'string') return value.trim().length > 0
    return true
  }

  const merged: Record<string, any> = { ...translatedEnglish, ...localeData }
  // Metadata fields strictly belong to the locale doc — empty values should
  // not be replaced by the auto-translated English.
  const localeOnlyFields = ['metaTitle', 'metaDescription', 'metaKeywords']
  for (const key of Object.keys(merged)) {
    if (localeOnlyFields.includes(key)) continue
    if (!isPopulated((localeData as Record<string, any>)[key])) {
      merged[key] = (translatedEnglish as Record<string, any>)[key]
    }
  }
  return merged
}

// ─── Blog Posts (listing) ───────────────────────────────────────────────────

export async function getBlogPosts(locale: string = 'en', limit?: number) {
  const language = toSanityLang(locale)
  const slice = limit ? `[0...${limit}]` : ''
  const query = `*[_type == "post" && language == $language] | order(publishedAt desc) ${slice}{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    category,
    language,
    "featuredImage": featuredImage.asset->url,
    publishedAt,
    readTime,
    author->{
      name
    }
  }`
  return sanityClient.fetch(query, { language })
}

// ─── Blog Post (single) ────────────────────────────────────────────────────

export async function getBlogPost(slug: string, locale: string = 'en', preview: boolean = false) {
  const sanityLanguage = toSanityLang(locale)
  const client = preview ? sanityDraftClient : sanityClient
  const query = `*[_type == "post" && slug.current == $slug && language == $sanityLanguage][0]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "content": body[]{
      ...,
      _type == "image" => {
        ...,
        "url": asset->url
      }
    },
    category,
    "categories": categories[]->{title, "slug": slug.current, link},
    language,
    translationGroupId,
    "featuredImage": featuredImage.asset->url,
    "featuredImageAlt": featuredImage.alt,
    "featuredImageCaption": featuredImage.caption,
    "featuredImageDesktopRatio": featuredImage.desktopRatio,
    "featuredImageMobileRatio": featuredImage.mobileRatio,
    "featuredImageMeta": featuredImage.asset->metadata.dimensions,
    "socialShareImage": socialShareImage.asset->url,
    "socialShareImageAlt": socialShareImage.alt,
    "socialShareImageMeta": socialShareImage.asset->metadata.dimensions,
    ogTitle,
    ogDescription,
    twitterTitle,
    twitterDescription,
    publishedAt,
    updatedAt,
    readTime,
    "author": coalesce(
      authorRef->{
        name,
        "slug": slug.current,
        bio,
        "image": image.asset->url,
        "url": socialLinks.website,
        socialLinks
      },
      author{
        name,
        bio,
        "image": image.asset->url,
        url
      }
    ),
    tldrHeading,
    tldr,
    quickAnswer,
    tableOfContents[]{
      label,
      id
    },
    faqTitle,
    "faqs": faq[]{
      question,
      answer,
      plainAnswer,
      "answerText": pt::text(answer)
    },
    "breadcrumbs": breadcrumbs[]{
      name,
      url
    },
    metaTitle,
    metaDescription,
    metaKeywords,
    "ogImage": ogImage.asset->url,
    noindex,
    nofollow,
    jsonLdSchemas,
    customMetaTags,
    viewCount
  }`
  return client.fetch(query, { slug, sanityLanguage })
}

// ─── Blog Post Translations ───────────────────────────────────────────────────

export async function getBlogPostTranslations(translationGroupId: string) {
  const query = `*[_type == "post" && translationGroupId == $translationGroupId]{
    _id,
    "slug": slug.current,
    language
  }`
  return sanityClient.fetch(query, { translationGroupId })
}

// ─── Blog Index ─────────────────────────────────────────────────────────────

export async function getBlogIndex(locale: string = 'en') {
  const language = toSanityLang(locale)
  const query = `*[_type == "blogIndex" && language == $language][0]{
    language,
    title,
    seo,
    hero{
      badge,
      headline,
      headlineHighlight,
      description,
      searchPlaceholder
    },
    categories[]{
      name,
      value
    },
    featuredSection{
      title,
      badgeText,
      featuredPosts[]->{
        _id,
        title,
        "slug": slug.current,
        excerpt,
        category,
        "featuredImage": featuredImage.asset->url,
        publishedAt,
        readTime,
        author->{ name }
      }
    },
    allArticlesSection{
      badge,
      title,
      emptyStateTitle,
      emptyStateButton
    },
    sidebarCta{
      badge,
      headline,
      description,
      buttonText,
      buttonUrl,
      footnote
    },
    newsletterCta{
      headline,
      description,
      placeholder,
      buttonText
    },
    relatedPostsSection{
      badge,
      title,
      viewAllText
    },
    detailLabels{
      backToBlog,
      tocTitle,
      summaryTitle,
      summarySubtitle,
      faqTitle,
      authorLabel,
      minReadSuffix
    },
    ctaSection{
      headline,
      headlineHighlight,
      description,
      primaryCta{ label, url },
      secondaryCta{ label, url },
      footnote
    }
  }`
  return sanityClient.fetch(query, { language })
}

// ─── Feature Page ───────────────────────────────────────────────────────────

export async function getFeature(slug: string, locale: string = 'en') {
  const language = toSanityLang(locale)
  const query = `*[_type == "productPage" && slug.current == $slug && category in ["feature", "whatsapp-api"] && language == $language][0]{
    "slug": slug.current,
    title,
    category,
    metaTitle,
    metaDescription,
    metaKeywords,
    sections[]{
      _type,
      _key,
      badge,
      headline,
      headlineHighlight,
      description,
      primaryCta{ label, url },
      secondaryCta{ label, url },
      stats[]{ value, label },
      items[]{
        icon,
        title,
        description,
        benefits
      },
      features[]{
        badge,
        headline,
        description,
        points,
        visualType,
        alignRight,
        cta{ label, url }
      },
      steps[]{
        number,
        title,
        description
      },
      quote,
      author,
      "title": title,
      company,
      "avatar": avatar.asset->url,
      badges[]{
        icon,
        title,
        subtitle,
        badge,
        featured
      },
      footnote
    },
    hero{
      badge,
      headline,
      headlineHighlight,
      description,
      primaryCta{ label, url },
      secondaryCta{ label, url },
      stats[]{ value, label }
    },
    benefits{
      badge,
      headline,
      items[]{
        icon,
        title,
        description
      }
    },
    features[]{
      badge,
      headline,
      description,
      points,
      visualType,
      image,
      cta{ label, url }
    },
    howItWorks{
      badge,
      headline,
      description,
      steps[]{
        number,
        title,
        description
      }
    },
    useCases{
      badge,
      headline,
      items[]{
        icon,
        title,
        description,
        benefits
      }
    },
    testimonial{
      quote,
      author,
      title,
      company,
      "avatar": avatar.asset->url
    },
    faq{
      badge,
      headline,
      items[]{
        question,
        answer
      }
    },
    cta{
      headline,
      headlineHighlight,
      description,
      primaryCta{ label, url },
      secondaryCta{ label, url },
      footnote
    }
  }`

  const localeData = await sanityClient.fetch<Record<string, any> | null>(query, {
    slug,
    language,
  })

  // English serves itself.
  if (language === 'en') return localeData

  // Non-EN locales: when no per-locale productPage doc exists in Sanity
  // (the typical case for /features/<slug> and /whatsapp-api/<slug>),
  // pull the English source-of-truth and run it through the same
  // auto-translate pipeline used by getProduct / getCategoryIndex /
  // getCoexistence so sections like howItWorks and useCases render
  // properly in es/br/tr instead of falling through to the messages JSON
  // which doesn't contain those sections.
  if (!localeData) {
    const englishData = await sanityClient.fetch<Record<string, any> | null>(query, {
      slug,
      language: 'en',
    })
    if (!englishData) return null

    const cacheKey = `feature-${slug}-${language}`
    let translated = productTranslateCache.get(cacheKey)
    if (!translated) {
      translated = await deepTranslate(englishData, language)
      productTranslateCache.set(cacheKey, translated)
    }
    return translated
  }

  return localeData
}

// ─── Category Index Page ────────────────────────────────────────────────────

// In-process cache for runtime-translated category index pages. Key:
// `${slug}-${language}`. Lifetime is the lifetime of the Node process —
// each cold start translates once and reuses for all subsequent renders.
const categoryTranslateCache = new Map<string, any>()

// Google's free Translate endpoint — same one used by scripts/bulk-translate.mjs.
// Best-effort: returns the original on failure so the page keeps rendering.
async function gTranslate(text: string, targetLang: string): Promise<string> {
  if (!text || !text.trim()) return text
  const map: Record<string, string> = { es: 'es', tr: 'tr', 'pt-BR': 'pt', en: 'en' }
  const tl = map[targetLang] || targetLang
  if (tl === 'en') return text
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${tl}&dt=t&q=${encodeURIComponent(text)}`
    const res = await fetch(url)
    const data = await res.json()
    if (data && data[0]) return data[0].map((s: any) => s[0]).join('')
    return text
  } catch {
    return text
  }
}

// Recursively translate every string in a category-index payload, skipping
// keys whose values are not user-visible content (URLs, slugs, icons,
// colors, Sanity meta, step numbers).
const NON_TRANSLATABLE_KEYS = new Set([
  'slug',
  'url',
  'icon',
  'color',
  '_id',
  '_type',
  '_key',
  'number',
  'category',
  // Schema-level discriminator on comparison-table cells
  // (`{ type: 'check' | 'cross' | 'partial' | 'text', text?: string }`).
  // Translating "check" into "verificar" etc. broke the renderer's switch
  // so no icon rendered on non-English locales. Skip it.
  'type',
])

async function deepTranslate(value: any, targetLang: string, parentKey?: string): Promise<any> {
  if (value == null) return value
  if (parentKey && NON_TRANSLATABLE_KEYS.has(parentKey)) return value
  if (typeof value === 'string') return gTranslate(value, targetLang)
  if (Array.isArray(value)) {
    return Promise.all(value.map((item) => deepTranslate(item, targetLang, parentKey)))
  }
  if (typeof value === 'object') {
    const out: Record<string, any> = {}
    await Promise.all(
      Object.entries(value).map(async ([k, v]) => {
        out[k] = NON_TRANSLATABLE_KEYS.has(k) ? v : await deepTranslate(v, targetLang, k)
      }),
    )
    return out
  }
  return value
}

// In-process cache for runtime-translated *page-level overrides* (anything
// that page.tsx wants to inject into a categoryIndex render but that lives
// in code, not Sanity). Separate from `categoryTranslateCache` so cache
// invalidation can happen independently when the code-side defaults change.
const overrideTranslateCache = new Map<string, any>()

/**
 * Translate an arbitrary content payload for a target locale, with in-process
 * memoization. Skips the standard `NON_TRANSLATABLE_KEYS` (slug, url, icon,
 * color, etc.). Use this for code-side content (hero/intro/benefits/howItWorks/
 * faq fallbacks) that needs to render in es/br/tr without touching Sanity.
 *
 * @param data - The English-source payload to translate
 * @param locale - Target locale (en passes through, others go through Google)
 * @param cacheKey - Module-level cache key (typically `${slug}-overrides-${locale}`)
 */
export async function translatePageOverrides<T>(
  data: T,
  locale: string,
  cacheKey: string,
): Promise<T> {
  if (locale === 'en') return data
  if (overrideTranslateCache.has(cacheKey)) return overrideTranslateCache.get(cacheKey)
  const targetLang = toSanityLang(locale)
  const translated = await deepTranslate(data, targetLang)
  overrideTranslateCache.set(cacheKey, translated)
  return translated
}

export async function getCategoryIndex(slug: string, locale: string = 'en') {
  const language = toSanityLang(locale)
  const query = `*[_type == "categoryIndexPage" && slug.current == $slug && language == $language][0]{
    "slug": slug.current,
    title,
    category,
    metaTitle,
    metaDescription,
    metaKeywords,
    hero{
      badge,
      headline,
      headlineHighlight,
      description,
      primaryCta{ label, url },
      secondaryCta{ label, url }
    },
    intro{
      headline,
      description
    },
    featuredItems[]{
      name,
      slug,
      description,
      icon,
      color,
      isFeatured,
      tags
    },
    comparisonTable{
      headline,
      description,
      columns,
      rows[]{
        feature,
        values[]{
          type,
          text
        }
      }
    },
    benefits{
      badge,
      headline,
      items[]{
        icon,
        title,
        description
      }
    },
    howItWorks{
      badge,
      headline,
      description,
      steps[]{
        number,
        title,
        description
      }
    },
    faq{
      badge,
      headline,
      items[]{
        question,
        answer
      }
    },
    cta{
      headline,
      headlineHighlight,
      description,
      primaryCta{ label, url },
      secondaryCta{ label, url },
      footnote
    }
  }`

  const localeData = await sanityClient.fetch<Record<string, any> | null>(query, { slug, language })

  // For English, no fallback / translation needed.
  if (language === 'en') return localeData

  // For non-English locales, sections often exist only in English in Sanity
  // (`hero`, `comparisonTable`, `benefits`, `howItWorks`, `faq`, `cta`). We:
  //   1. Fetch the English source-of-truth doc.
  //   2. Run it through Google Translate so the user-facing copy is in their
  //      language. Cached in-process to keep this cheap on warm renders.
  //   3. Overlay any locale-specific Sanity content on top — editor-curated
  //      translations always win over auto-translated English.
  const englishData = await sanityClient.fetch<Record<string, any> | null>(query, { slug, language: 'en' })
  if (!englishData) return localeData

  // Step 2: translate (with cache).
  const cacheKey = `${slug}-${language}`
  let translatedEnglish = categoryTranslateCache.get(cacheKey)
  if (!translatedEnglish) {
    translatedEnglish = await deepTranslate(englishData, language)
    categoryTranslateCache.set(cacheKey, translatedEnglish)
  }

  if (!localeData) return translatedEnglish

  // Step 3: merge — Sanity locale content wins per section.
  const isPopulated = (value: unknown): boolean => {
    if (value == null) return false
    if (Array.isArray(value)) return value.length > 0
    if (typeof value === 'object') return Object.keys(value as object).length > 0
    if (typeof value === 'string') return value.trim().length > 0
    return true
  }

  const merged: Record<string, any> = { ...translatedEnglish, ...localeData }
  // Metadata fields strictly belong to the locale doc; an empty value should
  // not be replaced with the auto-translated English.
  const localeOnlyFields = ['metaTitle', 'metaDescription', 'metaKeywords', 'title']
  for (const key of Object.keys(merged)) {
    if (localeOnlyFields.includes(key)) continue
    if (!isPopulated((localeData as Record<string, any>)[key])) {
      merged[key] = (translatedEnglish as Record<string, any>)[key]
    }
  }
  return merged
}

// ─── Coexistence Page ───────────────────────────────────────────────────────

export async function getCoexistence(locale: string = 'en') {
  const query = `*[_type == "productPage" && _id == $docId][0]{
    _id,
    title,
    language,
    category,
    slug,
    seo,
    hero{
      badge,
      headline,
      headlineHighlight,
      description,
      primaryCta{ label, url },
      secondaryCta{ label, url },
      stats[]{ label, value }
    },
    benefits{
      badge,
      headline,
      items[]{
        icon,
        title,
        description
      }
    },
    features[]{
      alignRight,
      badge,
      headline,
      headlineHighlight,
      description,
      image,
      points[],
      cta{ label, url }
    },
    howItWorks{
      badge,
      headline,
      description,
      steps[]{
        number,
        title,
        description
      }
    },
    useCases{
      badge,
      headline,
      items[]{
        icon,
        title,
        description,
        benefits[]
      }
    },
    testimonial{
      quote,
      author,
      title,
      company
    },
    faq{
      badge,
      headline,
      items[]{
        question,
        answer
      }
    },
    cta{
      headline,
      headlineHighlight,
      description,
      primaryCta{ label, url },
      secondaryCta{ label, url },
      footnote
    }
  }`

  const localeData = await sanityClient.fetch<Record<string, any> | null>(query, {
    docId: `productPage-coexistence-${locale}`,
  })

  // English serves itself.
  if (locale === 'en') return localeData

  // For non-EN locales, the per-locale doc often doesn't exist (only an
  // English source-of-truth lives in Sanity). Pull the EN doc and run it
  // through the same auto-translate pipeline used by getProduct /
  // getCategoryIndex so the page renders fully localized content instead
  // of falling through to CoexistencePageClient's not-found state.
  if (!localeData) {
    const englishData = await sanityClient.fetch<Record<string, any> | null>(query, {
      docId: 'productPage-coexistence-en',
    })
    if (!englishData) return null

    const cacheKey = `coexistence-${locale}`
    let translated = productTranslateCache.get(cacheKey)
    if (!translated) {
      translated = await deepTranslate(englishData, toSanityLang(locale))
      productTranslateCache.set(cacheKey, translated)
    }
    return translated
  }

  return localeData
}

// ─── Authors ─────────────────────────────────────────────────────────────────

export async function getAuthors(locale: string = 'en') {
  const sanityLanguage = toSanityLang(locale)
  const query = `*[_type == "author" && language == $sanityLanguage] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    position,
    email,
    location,
    bio,
    "imageUrl": image.asset->url,
    socialLinks,
    "postCount": count(*[_type == "post" && references(^._id) && language == $sanityLanguage])
  }`
  return sanityClient.fetch(query, { sanityLanguage })
}

export async function getAuthorBySlug(slug: string, locale: string = 'en') {
  const sanityLanguage = toSanityLang(locale)
  const query = `*[_type == "author" && slug.current == $slug && language == $sanityLanguage][0]{
    _id,
    name,
    "slug": slug.current,
    position,
    email,
    location,
    bio,
    detailedBio,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt,
    socialLinks,
    "posts": *[(_type == "post" || _type == "comparisonPost") && references(^._id) && language == $sanityLanguage] | order(publishedAt desc) {
      _id,
      _type,
      title,
      "slug": slug.current,
      excerpt,
      category,
      language,
      "featuredImage": featuredImage.asset->url,
      publishedAt,
      readTime
    }
  }`
  return sanityClient.fetch(query, { slug, sanityLanguage })
}

export async function getAllAuthorSlugs() {
  const query = `*[_type == "author" && defined(slug.current)]{ "slug": slug.current }`
  return sanityClient.fetch(query)
}

// ─── Comparison Posts ────────────────────────────────────────────────────────

export async function getComparisonPosts(locale: string = 'en', limit?: number) {
  const sanityLanguage = toSanityLang(locale)
  const limitClause = limit ? `[0...${limit}]` : ''
  const query = `*[_type == "comparisonPost" && language == $sanityLanguage] | order(publishedAt desc) ${limitClause} {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    category,
    competitors,
    verdict,
    language,
    "featuredImage": featuredImage.asset->url,
    "featuredImageAlt": featuredImage.alt,
    publishedAt,
    readTime,
    author{ name, "image": image.asset->url }
  }`
  return sanityClient.fetch(query, { sanityLanguage })
}

export async function getComparisonPost(slug: string, locale: string = 'en', preview: boolean = false) {
  const sanityLanguage = toSanityLang(locale)
  const client = preview ? sanityDraftClient : sanityClient
  const query = `*[_type == "comparisonPost" && slug.current == $slug && language == $sanityLanguage][0]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "content": body[]{
      ...,
      _type == "image" => {
        ...,
        "url": asset->url
      }
    },
    category,
    "categories": categories[]->{title, "slug": slug.current, link},
    language,
    translationGroupId,
    "featuredImage": featuredImage.asset->url,
    "featuredImageAlt": featuredImage.alt,
    "featuredImageCaption": featuredImage.caption,
    "featuredImageDesktopRatio": featuredImage.desktopRatio,
    "featuredImageMobileRatio": featuredImage.mobileRatio,
    "featuredImageMeta": featuredImage.asset->metadata.dimensions,
    "socialShareImage": socialShareImage.asset->url,
    "socialShareImageAlt": socialShareImage.alt,
    "socialShareImageMeta": socialShareImage.asset->metadata.dimensions,
    ogTitle,
    ogDescription,
    twitterTitle,
    twitterDescription,
    publishedAt,
    updatedAt,
    readTime,
    "author": coalesce(
      authorRef->{
        name,
        "slug": slug.current,
        bio,
        "image": image.asset->url,
        "url": socialLinks.website,
        socialLinks
      },
      author{
        name,
        bio,
        "image": image.asset->url,
        url
      }
    ),
    tldrHeading,
    tldr,
    quickAnswer,
    tableOfContents[]{
      label,
      id
    },
    faqTitle,
    "faqs": faq[]{
      question,
      answer,
      plainAnswer,
      "answerText": pt::text(answer)
    },
    "breadcrumbs": breadcrumbs[]{
      name,
      url
    },
    metaTitle,
    metaDescription,
    metaKeywords,
    "ogImage": ogImage.asset->url,
    noindex,
    nofollow,
    jsonLdSchemas,
    customMetaTags,
    viewCount
  }`
  return client.fetch(query, { slug, sanityLanguage })
}

export async function getAllComparisonSlugs() {
  const query = `*[_type == "comparisonPost" && defined(slug.current)]{ "slug": slug.current, language }`
  return sanityClient.fetch(query)
}

export async function getComparisonPostTranslations(translationGroupId: string) {
  if (!translationGroupId) return []
  const query = `*[_type == "comparisonPost" && translationGroupId == $translationGroupId]{
    _id, "slug": slug.current, language
  }`
  return sanityClient.fetch(query, { translationGroupId })
}

// ─── Partners ("Current Partners at Eazybe" directory) ───────────────────────

const PARTNER_CRM_LABELS: Record<PartnerCrm, string> = {
  hubspot: 'HubSpot',
  pipedrive: 'Pipedrive',
  salesforce: 'Salesforce',
  zoho: 'Zoho',
  other: 'Other',
}

interface SanityPartnerRow {
  _id: string
  name: string | null
  partnerTier: string | null
  crmPlatform: string | null
  crmOtherLabel: string | null
  country: string | null
  region: string | null
  descriptionBlocks: Array<{ children?: Array<{ text?: string }> }> | null
  specialties: Array<string | null> | null
}

const partnerBlockText = (b: { children?: Array<{ text?: string }> }) =>
  (b.children ?? []).map((c) => c.text ?? '').join('').trim()

function toPartnerRecord(row: SanityPartnerRow): PartnerRecord {
  const name = row.name?.trim() || 'Partner'
  const crm: PartnerCrm = (CRM_ORDER as string[]).includes(row.crmPlatform ?? '')
    ? (row.crmPlatform as PartnerCrm)
    : 'other'
  const region: PartnerRegion = (REGION_ORDER as string[]).includes(row.region ?? '')
    ? (row.region as PartnerRegion)
    : 'row'
  const blocks = row.descriptionBlocks ?? []
  // Editorial convention: the first paragraph is the card summary, everything
  // after it goes behind "Read more".
  const detail = blocks.slice(1).map(partnerBlockText).filter(Boolean).join(' ')
  return {
    id: row._id,
    name,
    initials:
      name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0]!.toUpperCase())
        .join('') || 'P',
    tier: row.partnerTier?.trim() || 'Partner',
    crm,
    crmLabel:
      crm === 'other'
        ? row.crmOtherLabel?.trim() || PARTNER_CRM_LABELS.other
        : PARTNER_CRM_LABELS[crm],
    country: row.country?.trim() || '',
    region,
    summary: blocks.length ? partnerBlockText(blocks[0]) : '',
    detail: detail || undefined,
    specialties: (row.specialties ?? []).flatMap((s) => {
      const v = s?.trim()
      return v ? [v] : []
    }),
  }
}

/**
 * Active partners for the /become-our-partner directory, localized.
 *
 * `locale` is a routing locale (en | es | br | tr) — the partner schema keys
 * its per-locale fields the same way, so no pt-BR mapping here. Each locale
 * either inherits English (Translation Mode = "inherit") or shows its own
 * value with an English fallback while the translation is empty.
 *
 * `$mode` is passed pre-computed ("esMode" etc.) because GROQ silently
 * resolves computed bracket keys like field[$locale + "Mode"] to null.
 *
 * Returns null when the CMS is unreachable (sanityClient.fetch swallows
 * errors into null) so callers can fall back; an empty array is a real
 * editorial state — every partner deactivated — and hides the section.
 */
export async function getPartners(locale: string = 'en'): Promise<PartnerRecord[] | null> {
  const query = `*[_type == "partner" && !(_id in path("drafts.**")) && activeStatus != false]
    | order(coalesce(order, 9999) asc, lower(partnerName.en) asc) {
    _id,
    "name": select(
      $locale == "en" => partnerName.en,
      partnerName[$mode] == "inherit" => partnerName.en,
      coalesce(partnerName[$locale], partnerName.en)
    ),
    partnerTier,
    crmPlatform,
    crmOtherLabel,
    country,
    region,
    "descriptionBlocks": select(
      $locale == "en" => description.en,
      description[$mode] == "inherit" => description.en,
      count(description[$locale]) > 0 => description[$locale],
      description.en
    ),
    "specialties": select(
      $locale == "en" => specialties.en,
      specialties[$mode] == "inherit" => specialties.en,
      count(specialties[$locale]) > 0 => specialties[$locale],
      specialties.en
    )
  }`
  const rows: SanityPartnerRow[] | null = await sanityClient.fetch(query, {
    locale,
    mode: `${locale}Mode`,
  })
  if (rows === null) return null
  return rows.map(toPartnerRecord)
}
