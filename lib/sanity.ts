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
