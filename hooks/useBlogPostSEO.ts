import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { BlogPost } from './useBlog'

const BASE_URL = 'https://eazybe.com'

/**
 * Blog Post SEO Hook
 * Adds comprehensive meta tags and JSON-LD schemas for individual blog posts
 * Uses smart defaults from blog post data with Sanity SEO field overrides
 */
export const useBlogPostSEO = (blogPost: BlogPost | null) => {
  const location = useLocation()

  useEffect(() => {
    if (!blogPost) return

    const {
      title,
      slug,
      excerpt,
      category,
      publishedAt,
      readTime,
      author,
      featuredImage,
      featuredImageAlt,
      language,
      faqs,
      metaTitle,
      metaDescription,
      ogImage,
      noindex,
      nofollow
    } = blogPost

    // Determine locale based on language
    const getLocale = (): string => {
      const localeMap: Record<string, string> = {
        'en': 'en_US',
        'pt-BR': 'pt_BR',
        'pt': 'pt_BR',
        'es': 'es_ES',
        'tr': 'tr_TR'
      }
      return localeMap[language || 'en'] || 'en_US'
    }

    const locale = getLocale()
    const canonicalUrl = `${BASE_URL}${location.pathname}`

    // Helper function to set/update meta tag
    const setMetaTag = (nameOrProperty: string, content: string, isProperty = false) => {
      if (!content) return
      const attr = isProperty ? 'property' : 'name'
      let meta = document.querySelector(`meta[${attr}="${nameOrProperty}"]`)
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute(attr, nameOrProperty)
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', content)
    }

    // Helper function to add JSON-LD schema
    const addJsonLdSchema = (schema: any, id: string) => {
      let script = document.querySelector(`script[type="application/ld+json"][data-schema="${id}"]`)
      if (!script) {
        script = document.createElement('script')
        script.type = 'application/ld+json'
        ;(script as HTMLScriptElement).setAttribute('data-schema', id)
        document.head.appendChild(script)
      }
      script.textContent = JSON.stringify(schema)
    }

    // ==================== META TAGS ====================

    // Smart defaults with Sanity overrides
    const finalTitle = metaTitle || title
    const finalDescription = metaDescription || excerpt
    const finalImage = ogImage || featuredImage || 'https://eazybe.com/logo.png'
    const finalImageAlt = featuredImageAlt || title

    // Document title
    document.title = finalTitle

    // Basic meta tags
    setMetaTag('description', finalDescription)
    setMetaTag('keywords', `${category}, WhatsApp CRM, sales automation, ${title}`)
    setMetaTag('author', author?.name || 'Eazybe')
    setMetaTag('robots', noindex ? 'noindex' : nofollow ? 'nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
    setMetaTag('thumbnail', finalImage)

    // Open Graph tags
    setMetaTag('og:type', 'article', true)
    setMetaTag('og:url', canonicalUrl, true)
    setMetaTag('og:title', finalTitle, true)
    setMetaTag('og:description', finalDescription, true)
    setMetaTag('og:image', finalImage, true)
    setMetaTag('og:image:alt', finalImageAlt, true)
    setMetaTag('og:image:width', '1200', true)
    setMetaTag('og:image:height', '630', true)
    setMetaTag('og:locale', locale, true)
    setMetaTag('og:site_name', 'Eazybe', true)

    // Article-specific Open Graph tags
    if (publishedAt) {
      setMetaTag('article:published_time', publishedAt, true)
    }
    if (category) {
      setMetaTag('article:section', category, true)
      setMetaTag('article:tag', category, true)
    }

    // Twitter Card tags
    setMetaTag('twitter:card', 'summary_large_image', true)
    setMetaTag('twitter:site', '@eazybe', true)
    setMetaTag('twitter:creator', '@eazybe', true)
    setMetaTag('twitter:title', finalTitle, true)
    setMetaTag('twitter:description', finalDescription, true)
    setMetaTag('twitter:image', finalImage, true)
    setMetaTag('twitter:image:alt', finalImageAlt, true)
    setMetaTag('twitter:label1', 'Content Type', true)
    setMetaTag('twitter:data1', 'Blog Article', true)
    if (readTime) {
      setMetaTag('twitter:label2', 'Read Time', true)
      setMetaTag('twitter:data2', `${readTime} min read`, true)
    }

    // AI and SEO specific meta tags
    setMetaTag('answer-type', 'how-to, guides, best-practices, tutorials')
    setMetaTag('target-audience', 'sales teams, CRM users, founders, marketing teams')
    setMetaTag('content-intent', 'informational')
    setMetaTag('conversational-query', title.toLowerCase())
    setMetaTag('ai-readability', 'educational, practical, professional')
    setMetaTag('context-window', `${category}, sales automation, WhatsApp workflows, CRM strategy`)
    setMetaTag('user-problem', 'inefficient sales workflows, manual follow-ups, disconnected CRM systems')
    setMetaTag('solution-summary', finalDescription)
    setMetaTag('primary-benefit', `learn ${category.toLowerCase()} strategies and best practices`)
    setMetaTag('use-case', 'business teams researching WhatsApp CRM and sales automation')

    // ==================== JSON-LD SCHEMAS ====================

    // Article/BlogPosting Schema
    const articleSchema: any = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "url": canonicalUrl,
      "headline": finalTitle,
      "description": finalDescription,
      "inLanguage": locale,
      "datePublished": publishedAt,
      "dateModified": publishedAt,
      "author": {
        "@type": "Person",
        "name": author?.name || "Eazybe Team",
        "url": author?.url || `${BASE_URL}/blog`
      },
      "publisher": {
        "@type": "Organization",
        "name": "Eazybe",
        "logo": {
          "@type": "ImageObject",
          "url": "https://eazybe.com/logo.png",
          "width": 600,
          "height": 60
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": canonicalUrl
      }
    }

    if (featuredImage) {
      articleSchema.image = {
        "@type": "ImageObject",
        "url": featuredImage,
        "width": 1200,
        "height": 630
      }
    }

    if (category) {
      articleSchema.articleSection = category
    }

    // Add FAQs as mainEntity if they exist
    if (faqs && faqs.length > 0) {
      articleSchema.mainEntity = faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }

    addJsonLdSchema(articleSchema, `blog-${slug.current}-article`)

    // FAQPage Schema (if FAQs exist)
    if (faqs && faqs.length > 0) {
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }
      addJsonLdSchema(faqSchema, `blog-${slug.current}-faq`)
    }

    // BreadcrumbList Schema
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": BASE_URL
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": `${BASE_URL}/blog`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": title
        }
      ]
    }
    addJsonLdSchema(breadcrumbSchema, `blog-${slug.current}-breadcrumb`)

    // Person Schema (Author)
    if (author?.name) {
      const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": author.name,
        "url": author.url || `${BASE_URL}/blog`,
        "jobTitle": "Content Creator",
        "worksFor": {
          "@type": "Organization",
          "name": "Eazybe"
        }
      }
      addJsonLdSchema(personSchema, `blog-${slug.current}-author`)
    }

    // Organization Schema
    const orgSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Eazybe",
      "url": BASE_URL,
      "logo": {
        "@type": "ImageObject",
        "url": "https://eazybe.com/logo.png",
        "width": 600,
        "height": 60
      },
      "sameAs": [
        "https://twitter.com/eazybe",
        "https://linkedin.com/company/eazybe",
        "https://facebook.com/eazybe"
      ]
    }
    addJsonLdSchema(orgSchema, `blog-${slug.current}-organization`)

    // ==================== CLEANUP FUNCTION ====================

    return () => {
      // Remove all meta tags set by this hook
      const metaTags = [
        'meta[name="description"]',
        'meta[name="keywords"]',
        'meta[name="author"]',
        'meta[name="robots"]',
        'meta[name="thumbnail"]',
        'meta[property^="og:"]',
        'meta[property^="article:"]',
        'meta[property^="twitter:"]',
        'meta[name^="answer-"]',
        'meta[name^="target-"]',
        'meta[name^="content-"]',
        'meta[name^="conversational-"]',
        'meta[name^="ai-"]',
        'meta[name^="context-"]',
        'meta[name^="user-"]',
        'meta[name^="solution-"]',
        'meta[name^="primary-"]',
        'meta[name^="use-"]'
      ]

      metaTags.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => el.remove())
      })

      // Remove all JSON-LD schemas
      document.querySelectorAll(`script[type="application/ld+json"][data-schema^="blog-${slug?.current}"]`)
        .forEach(el => el.remove())
    }
  }, [blogPost, location.pathname])
}

export default useBlogPostSEO
