import * as fs from 'fs'
import { createClient } from '@sanity/client'

const SANITY_TOKEN = 'skyGWH6GzKUWxM1ZekEDdO1pgiNJgpgJDt8luNyvrUz0cDznZEHMwOzsl1AhoLVqWpK9QdW21KUecLTViCi7fHjlqMYhNYQXL3j4nwRa3QKH6LBmqEqx0kSkrCLOzhzZiY7367ZLrEgWXCZ72nH2hysPNFNezkhnEJOEuc7qGQjNdvkQtmR9'

const sanityClient = createClient({
  projectId: '5awzi0t4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: SANITY_TOKEN
})

// Map Figma product screenshots to scheduler features
// Based on the actual Figma Anju exports
const imageMapping = [
  {
    featureKey: 'f1', // "The Problem"
    badge: 'The Problem',
    imagePath: '/tmp/figma-exports/scheduler-3.png', // Shows quick replies/templates - the solution
    filename: 'scheduler-problem-figma'
  },
  {
    featureKey: 'f2', // "Smart Scheduling"
    badge: 'Smart Scheduling',
    imagePath: '/tmp/figma-exports/scheduler-1.png', // Shows date/time scheduling dialog
    filename: 'scheduler-smart-figma'
  },
  {
    featureKey: 'f3', // "Follow-up Sequences"
    badge: 'Follow-up Sequences',
    imagePath: '/tmp/figma-exports/scheduler-2.png', // Shows multiple recipients
    filename: 'scheduler-sequences-figma'
  }
]

async function uploadToSanity(imagePath: string, filename: string): Promise<string | null> {
  try {
    if (!fs.existsSync(imagePath)) {
      console.error(`  File not found: ${imagePath}`)
      return null
    }

    const imageBuffer = fs.readFileSync(imagePath)
    console.log(`  Uploading ${filename} (${(imageBuffer.length / 1024).toFixed(1)} KB)...`)

    const asset = await sanityClient.assets.upload('image', imageBuffer, {
      filename: `${filename}.png`,
      contentType: 'image/png'
    })

    console.log(`  ✓ Uploaded: ${asset._id}`)
    return asset._id
  } catch (error) {
    console.error(`  Upload failed:`, error)
    return null
  }
}

async function main() {
  console.log('='.repeat(60))
  console.log('Uploading Figma Product Screenshots to Sanity')
  console.log('='.repeat(60))
  console.log('')

  // Upload images and collect asset IDs
  const results: { badge: string; assetId: string }[] = []

  for (const mapping of imageMapping) {
    console.log(`\n[${mapping.badge}]`)
    console.log(`  Source: ${mapping.imagePath}`)

    const assetId = await uploadToSanity(mapping.imagePath, mapping.filename)
    if (assetId) {
      results.push({ badge: mapping.badge, assetId })
    }
  }

  // Update Sanity document
  if (results.length > 0) {
    console.log('\n' + '='.repeat(60))
    console.log('Updating Scheduler Page in Sanity')
    console.log('='.repeat(60))

    try {
      const doc = await sanityClient.fetch(
        `*[_type == "productPage" && slug.current == "scheduler"][0]{ _id, features }`,
        {}
      )

      if (doc && doc.features) {
        const updatedFeatures = doc.features.map((feature: any) => {
          const newImage = results.find(r => r.badge === feature.badge)
          if (newImage) {
            console.log(`  Updating feature: ${feature.badge}`)
            return {
              ...feature,
              image: {
                _type: 'image',
                asset: { _type: 'reference', _ref: newImage.assetId }
              }
            }
          }
          return feature
        })

        await sanityClient.patch(doc._id).set({ features: updatedFeatures }).commit()
        console.log('\n✓ Scheduler page updated with Figma product images!')
      } else {
        console.error('Scheduler document not found or has no features')
      }
    } catch (error) {
      console.error('Failed to update Sanity:', error)
    }
  }

  console.log('\n' + '='.repeat(60))
  console.log('Done! Check http://localhost:3001/features/scheduler')
  console.log('='.repeat(60))
}

main().catch(console.error)
