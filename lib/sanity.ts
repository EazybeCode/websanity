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
