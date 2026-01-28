import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'
import { createClient } from '@sanity/client'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const SANITY_TOKEN = 'skyGWH6GzKUWxM1ZekEDdO1pgiNJgpgJDt8luNyvrUz0cDznZEHMwOzsl1AhoLVqWpK9QdW21KUecLTViCi7fHjlqMYhNYQXL3j4nwRa3QKH6LBmqEqx0kSkrCLOzhzZiY7367ZLrEgWXCZ72nH2hysPNFNezkhnEJOEuc7qGQjNdvkQtmR9'

const sanityClient = createClient({
  projectId: '5awzi0t4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: SANITY_TOKEN
})

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
    const asset = await sanityClient.assets.upload('image', svgContent, {
      filename: filename,
      contentType: 'image/svg+xml'
    })
    return asset._id
  } catch (error) {
    console.error(`  Failed to upload: ${error}`)
    return null
  }
}

async function updateAllFeatureSections(slug: string, assetId: string) {
  try {
    const doc = await sanityClient.fetch(
      `*[_type == "productPage" && slug.current == $slug][0]{ _id, features }`,
      { slug }
    )

    if (!doc || !doc.features) {
      console.log(`  No features found for ${slug}`)
      return
    }

    // Update ALL feature sections with the same image
    const updatedFeatures = doc.features.map((feature: any) => ({
      ...feature,
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: assetId
        }
      }
    }))

    await sanityClient.patch(doc._id).set({ features: updatedFeatures }).commit()
    console.log(`  ✓ Updated ${doc.features.length} sections`)
  } catch (error) {
    console.error(`  Failed to update: ${error}`)
  }
}

async function main() {
  console.log('Uploading SVG images to all feature sections...\n')

  const imagesDir = path.join(__dirname, '..', 'generated-images')

  for (const slug of featureSlugs) {
    const svgPath = path.join(imagesDir, `${slug}.svg`)

    if (!fs.existsSync(svgPath)) {
      console.log(`${slug}: No SVG found, skipping`)
      continue
    }

    console.log(`${slug}:`)

    // Upload SVG
    const assetId = await uploadSVGToSanity(svgPath, `${slug}-feature.svg`)

    if (assetId) {
      console.log(`  ✓ Uploaded: ${assetId}`)
      await updateAllFeatureSections(slug, assetId)
    }

    await new Promise(resolve => setTimeout(resolve, 500))
  }

  console.log('\n✓ Done!')
}

main().catch(console.error)
