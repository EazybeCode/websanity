import { sanityClient } from './sanity'

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
