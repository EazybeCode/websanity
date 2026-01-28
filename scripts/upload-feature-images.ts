import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'
import { createClient } from '@sanity/client'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Sanity client with write access
const sanityClient = createClient({
  projectId: '5awzi0t4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'skyGWH6GzKUWxM1ZekEDdO1pgiNJgpgJDt8luNyvrUz0cDznZEHMwOzsl1AhoLVqWpK9QdW21KUecLTViCi7fHjlqMYhNYQXL3j4nwRa3QKH6LBmqEqx0kSkrCLOzhzZiY7367ZLrEgWXCZ72nH2hysPNFNezkhnEJOEuc7qGQjNdvkQtmR9'
})

// Feature slugs to process
const featureSlugs = [
  'cloud-backup',
  'team-inbox',
  'whatsapp-crm',
  'revenue-inbox',
  'whatsapp-copilot',
  'quick-reply',
  'scheduler',
  'rep-radar'
]

async function uploadSVGToSanity(svgPath: string, filename: string): Promise<string | null> {
  try {
    const svgContent = fs.readFileSync(svgPath)

    // Upload as an image asset
    const asset = await sanityClient.assets.upload('image', svgContent, {
      filename: filename,
      contentType: 'image/svg+xml'
    })

    console.log(`  ✓ Uploaded ${filename}: ${asset._id}`)
    return asset._id
  } catch (error) {
    console.error(`  ✗ Failed to upload ${filename}:`, error)
    return null
  }
}

async function updateFeaturePageWithImage(slug: string, assetId: string) {
  try {
    // Find the document
    const doc = await sanityClient.fetch(
      `*[_type == "productPage" && slug.current == $slug][0]{ _id, features }`,
      { slug }
    )

    if (!doc) {
      console.log(`  Document not found for ${slug}`)
      return
    }

    // Update each feature section with the image
    if (doc.features && doc.features.length > 0) {
      const updatedFeatures = doc.features.map((feature: any, index: number) => {
        // Only add image to first feature section (or all if you prefer)
        if (index === 0 && !feature.image) {
          return {
            ...feature,
            image: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: assetId
              }
            }
          }
        }
        return feature
      })

      await sanityClient
        .patch(doc._id)
        .set({ features: updatedFeatures })
        .commit()

      console.log(`  ✓ Updated ${slug} with image`)
    } else {
      console.log(`  No features array found for ${slug}`)
    }
  } catch (error) {
    console.error(`  ✗ Failed to update ${slug}:`, error)
  }
}

async function main() {
  console.log('Uploading feature images to Sanity...\n')

  const imagesDir = path.join(__dirname, '..', 'generated-images')

  for (const slug of featureSlugs) {
    const svgPath = path.join(imagesDir, `${slug}.svg`)

    if (!fs.existsSync(svgPath)) {
      console.log(`Skipping ${slug}: No SVG found`)
      continue
    }

    console.log(`Processing ${slug}...`)

    // Upload SVG
    const assetId = await uploadSVGToSanity(svgPath, `${slug}.svg`)

    if (assetId) {
      // Update the feature page
      await updateFeaturePageWithImage(slug, assetId)
    }

    // Small delay between operations
    await new Promise(resolve => setTimeout(resolve, 500))
  }

  console.log('\n✓ Done!')
}

main().catch(console.error)
