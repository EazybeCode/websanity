import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const sanityClient = createClient({
  projectId: '5awzi0t4',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

// Image URL builder for Sanity images
const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: any) {
  return builder.image(source)
}

export async function getLandingPage() {
  const query = `*[_type == "landingPage" && _id == "landingPage"][0]{
    title,
    seo,
    sections[]{
      _type,
      _key,
      ...,
      // Expand nested arrays
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

export async function getPricingPage(language: string = 'en') {
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
      faqs[]{
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

export async function getProductPage(slug: string, language: string = 'en') {
  const query = `*[_type == "productPage" && slug.current == $slug && language == $language][0]{
    "slug": slug.current,
    crmName,
    crmSlug,
    crmColor,
    seo{
      metaTitle,
      metaDescription
    },
    hero{
      badge,
      headline,
      headlineHighlight,
      description,
      primaryCta{
        label,
        url
      },
      secondaryCta{
        label,
        url
      },
      stats[]{
        value,
        label
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
    features[]{
      badge,
      headline,
      description,
      points,
      cta{
        label,
        url
      },
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

  return sanityClient.fetch(query, { slug, language })
}

export async function getSharedSections() {
  const query = `*[_type == "sharedSections" && _id == "sharedSections"][0]{
    security{
      badge,
      cards[]{
        _key,
        icon,
        title,
        subtitle,
        showCompliantBadge
      },
      footnote
    },
    cta{
      badge,
      headline,
      headlineHighlight,
      description,
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

  return sanityClient.fetch(query)
}

export async function getFeaturePage(slug: string, language: string = 'en') {
  const query = `*[_type == "productPage" && slug.current == $slug && category in ["feature", "whatsapp-api"] && language == $language][0]{
    "slug": slug.current,
    title,
    category,
    seo{
      metaTitle,
      metaDescription
    },
    // New modular sections array
    sections[]{
      _type,
      _key,
      // productHeroSection fields
      badge,
      headline,
      headlineHighlight,
      description,
      primaryCta{ label, url },
      secondaryCta{ label, url },
      stats[]{ value, label },
      // benefitsSection fields
      items[]{
        icon,
        title,
        description,
        benefits
      },
      // productFeaturesSection fields
      features[]{
        badge,
        headline,
        description,
        points,
        visualType,
        alignRight,
        cta{ label, url }
      },
      // howItWorksSection fields
      steps[]{
        number,
        title,
        description
      },
      // productTestimonialSection fields
      quote,
      author,
      "title": title,
      company,
      "avatar": avatar.asset->url,
      // securitySection fields
      badges[]{
        icon,
        title,
        subtitle,
        badge,
        featured
      },
      footnote
    },
    // Legacy fields for backward compatibility
    hero{
      badge,
      headline,
      headlineHighlight,
      description,
      primaryCta{
        label,
        url
      },
      secondaryCta{
        label,
        url
      },
      stats[]{
        value,
        label
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
    features[]{
      badge,
      headline,
      description,
      points,
      visualType,
      image,
      cta{
        label,
        url
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

  return sanityClient.fetch(query, { slug, language })
}

export async function getCategoryIndexPage(slug: string, language: string = 'en') {
  const query = `*[_type == "categoryIndexPage" && slug.current == $slug && language == $language][0]{
    "slug": slug.current,
    title,
    category,
    seo{
      metaTitle,
      metaDescription
    },
    hero{
      badge,
      headline,
      headlineHighlight,
      description,
      primaryCta{
        label,
        url
      },
      secondaryCta{
        label,
        url
      }
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

  return sanityClient.fetch(query, { slug, language })
}

export async function getCoexistencePage(language: string = 'en') {
  const query = `*[_type == "productPage" && _id == "productPage-coexistence-${language}"][0]{
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
      primaryCta{
        label,
        url
      },
      secondaryCta{
        label,
        url
      },
      stats[]{
        label,
        value
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
    features[]{
      alignRight,
      badge,
      headline,
      headlineHighlight,
      description,
      image,
      points[],
      cta{
        label,
        url
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

  return sanityClient.fetch(query)
}

export async function getBlogPost(slug: string, language: string = 'en') {
  const query = `*[_type == "blogPost" && slug.current == $slug && language == $language][0]{
    _id,
    title,
    slug,
    excerpt,
    content[]{
      ...,
      _type == "image" => {
        ...,
        "url": asset->url
      }
    },
    category,
    language,
    "featuredImage": featuredImage.asset->url,
    publishedAt,
    readTime,
    author->{
      name,
      bio,
      "image": image.asset->url
    },
    quickAnswer,
    tableOfContents[]{
      label,
      id
    },
    faqs[]{
      question,
      answer
    },
    seo{
      metaTitle,
      metaDescription
    }
  }`

  return sanityClient.fetch(query, { slug, language })
}

export async function getBlogPosts(limit?: number, language: string = 'en') {
  const query = limit
    ? `*[_type == "blogPost" && language == $language] | order(publishedAt desc) [0...${limit}]{
        _id,
        title,
        slug,
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
    : `*[_type == "blogPost" && language == $language] | order(publishedAt desc){
        _id,
        title,
        slug,
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

export async function getNavigation(slug: string = 'main-nav') {
  const query = `*[_type == "navigation" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    items[]{
      _key,
      label,
      href,
      isMegaMenu,
      isExternal,
      columns[]{
        _key,
        title,
        links[]{
          _key,
          label,
          href,
          description,
          icon,
          isExternal
        }
      }
    },
    ctaButton{
      label,
      href,
      variant
    },
    signInButton{
      label,
      href
    }
  }`

  return sanityClient.fetch(query, { slug })
}

export async function getBlogIndexPage(language: string = 'en') {
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
        slug,
        excerpt,
        category,
        featuredImage,
        publishedAt,
        readTime,
        author->{
          name
        }
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
