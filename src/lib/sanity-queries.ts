import { sanityClient } from './sanity'

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
  const sanityLang = language === 'br' ? 'pt-BR' : language
  const query = `*[_type == "faq" && language == $language][0]{
    questions[]{
      question,
      answer
    }
  }`
  return sanityClient.fetch(query, { language: sanityLang })
}

// ─── Pricing ────────────────────────────────────────────────────────────────

export async function getPricing(language: string = 'en') {
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

export async function getProduct(slug: string, language: string = 'en') {
  const query = `*[_type == "productPage" && slug.current == $slug && language == $language][0]{
    "slug": slug.current,
    crmName,
    crmSlug,
    crmColor,
    metaTitle,
    metaDescription,
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
  return sanityClient.fetch(query, { slug, language })
}

// ─── Blog Posts (listing) ───────────────────────────────────────────────────

export async function getBlogPosts(language: string = 'en', limit?: number) {
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

export async function getBlogPost(slug: string, language: string = 'en') {
  const langMap: Record<string, string> = { en: 'en', es: 'es', br: 'pt-BR', pt: 'pt', tr: 'tr' }
  const sanityLanguage = langMap[language] || language
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
    language,
    "featuredImage": featuredImage.asset->url,
    "featuredImageAlt": featuredImage.alt,
    publishedAt,
    readTime,
    author{
      name,
      bio,
      "image": image.asset->url,
      url
    },
    quickAnswer,
    tableOfContents[]{
      label,
      id
    },
    "faqs": faq[]{
      question,
      answer,
      acceptedAnswer
    },
    "breadcrumbs": breadcrumbs[]{
      name,
      url
    },
    metaTitle,
    metaDescription,
    "ogImage": ogImage.asset->url,
    noindex,
    nofollow,
    "jsonLdSchemas": jsonLdSchemas[]{
      schemaType,
      schemaJson,
      priority
    }
  }`
  return sanityClient.fetch(query, { slug, sanityLanguage })
}

// ─── Blog Index ─────────────────────────────────────────────────────────────

export async function getBlogIndex(language: string = 'en') {
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

export async function getFeature(slug: string, language: string = 'en') {
  const query = `*[_type == "productPage" && slug.current == $slug && category in ["feature", "whatsapp-api"] && language == $language][0]{
    "slug": slug.current,
    title,
    category,
    metaTitle,
    metaDescription,
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
  return sanityClient.fetch(query, { slug, language })
}

// ─── Category Index Page ────────────────────────────────────────────────────

export async function getCategoryIndex(slug: string, language: string = 'en') {
  const query = `*[_type == "categoryIndexPage" && slug.current == $slug && language == $language][0]{
    "slug": slug.current,
    title,
    category,
    metaTitle,
    metaDescription,
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
  return sanityClient.fetch(query, { slug, language })
}

// ─── Coexistence Page ───────────────────────────────────────────────────────

export async function getCoexistence(language: string = 'en') {
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
  return sanityClient.fetch(query, { docId: `productPage-coexistence-${language}` })
}
