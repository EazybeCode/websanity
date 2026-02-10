import { createClient } from '@sanity/client'
import { writeFileSync } from 'fs'
import { join } from 'path'

const sanityClient = createClient({
  projectId: '5awzi0t4',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

async function prebuildLandingData() {
  console.log('🚀 Fetching landing page data from Sanity...')
  
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

  try {
    const data = await sanityClient.fetch(query)
    
    // Write to public directory so it's served as static asset
    const outputPath = join(process.cwd(), 'public', 'landing-data.json')
    writeFileSync(outputPath, JSON.stringify(data), 'utf-8')
    
    console.log('✅ Landing page data prebuild complete!')
    console.log(`📦 Data size: ${(JSON.stringify(data).length / 1024).toFixed(2)} KB`)
    console.log(`📍 Output: ${outputPath}`)
  } catch (error) {
    console.error('❌ Failed to prebuild landing data:', error)
    process.exit(1)
  }
}

prebuildLandingData()
