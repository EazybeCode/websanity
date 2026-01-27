import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: '5awzi0t4',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

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
  const query = `*[_type == "productPage" && slug.current == $slug && category == "feature" && language == $language][0]{
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
