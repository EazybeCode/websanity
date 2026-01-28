import * as fs from 'fs'
import * as path from 'path'
import { createClient } from '@sanity/client'

const GEMINI_API_KEY = 'AIzaSyCVzxKUgbtXQMpi0lhmT-4B2lpOq28U-Oc'
const SANITY_TOKEN = 'skyGWH6GzKUWxM1ZekEDdO1pgiNJgpgJDt8luNyvrUz0cDznZEHMwOzsl1AhoLVqWpK9QdW21KUecLTViCi7fHjlqMYhNYQXL3j4nwRa3QKH6LBmqEqx0kSkrCLOzhzZiY7367ZLrEgWXCZ72nH2hysPNFNezkhnEJOEuc7qGQjNdvkQtmR9'

const sanityClient = createClient({
  projectId: '5awzi0t4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: SANITY_TOKEN
})

// Design system colors for the scheduler (pink accent)
const DESIGN_SYSTEM = {
  pageBg: '#020617',      // Slate 950 (brand-black)
  surfaceBg: '#0F172A',   // Slate 900 (brand-surface)
  cardBg: '#1E293B',      // Slate 800 (brand-card)
  border: '#334155',      // Slate 700
  accent: '#EC4899',      // Pink 500 (Scheduler accent)
  accentGlow: 'rgba(236, 72, 153, 0.3)',
}

// Mapping Figma screenshots to scheduler features with marketing prompts
const schedulerImageConfig = [
  {
    featureKey: 'f1',
    badge: 'The Problem',
    figmaSource: '/tmp/figma-exports/scheduler-3.png',
    filename: 'scheduler-marketing-problem',
    prompt: `Transform this product screenshot into a polished marketing image.

REFERENCE IMAGE: This is a screenshot of a message scheduling dialog showing quick reply templates (Greeting, Thank You messages).

TASK: Create a marketing-ready version of this product screenshot that:
1. Keeps the core UI elements visible and recognizable as a scheduling/template feature
2. Places the screenshot on a dark gradient background (${DESIGN_SYSTEM.pageBg} to ${DESIGN_SYSTEM.surfaceBg})
3. Adds a subtle pink glow effect (${DESIGN_SYSTEM.accent}) around the dialog
4. Adds subtle floating UI elements or icons in the background suggesting messaging/scheduling
5. Makes it look premium, polished, and marketing-ready
6. Maintains the product-centric focus - this should clearly show it's a REAL product feature

STYLE REQUIREMENTS:
- Dark theme with pink/magenta accents
- Professional SaaS marketing aesthetic
- The product UI should be the hero, enhanced but recognizable
- 16:9 landscape aspect ratio
- Subtle shadows and depth effects
- NO text overlays, just visual enhancement`
  },
  {
    featureKey: 'f2',
    badge: 'Smart Scheduling',
    figmaSource: '/tmp/figma-exports/scheduler-1.png',
    filename: 'scheduler-marketing-smart',
    prompt: `Transform this product screenshot into a polished marketing image.

REFERENCE IMAGE: This is a screenshot of a message scheduling dialog with date/time picker (showing "Schedule Message to User", date 31/12/2025, time 02:34).

TASK: Create a marketing-ready version of this product screenshot that:
1. Keeps the scheduling dialog visible and recognizable
2. Highlights the date/time picker as the key feature
3. Places it on a dark gradient background (${DESIGN_SYSTEM.pageBg} to ${DESIGN_SYSTEM.surfaceBg})
4. Adds a subtle pink glow effect (${DESIGN_SYSTEM.accent}) around the dialog
5. Adds subtle clock/calendar icons floating in the background
6. Makes it look premium and professional

STYLE REQUIREMENTS:
- Dark theme with pink/magenta accents
- Professional SaaS marketing aesthetic
- Product UI is the hero - enhanced but clearly real
- 16:9 landscape aspect ratio
- Subtle shadows, glows, and depth
- NO text overlays`
  },
  {
    featureKey: 'f3',
    badge: 'Follow-up Sequences',
    figmaSource: '/tmp/figma-exports/scheduler-2.png',
    filename: 'scheduler-marketing-sequences',
    prompt: `Transform this product screenshot into a polished marketing image.

REFERENCE IMAGE: This is a screenshot of a message scheduling dialog showing multiple recipients (Dipankar, Priyanka, Roshini, Kapil Pal, +2 more) being scheduled at once.

TASK: Create a marketing-ready version of this product screenshot that:
1. Keeps the multi-recipient scheduling dialog visible
2. Emphasizes the multiple contact tags (showing bulk/sequence capability)
3. Places it on a dark gradient background (${DESIGN_SYSTEM.pageBg} to ${DESIGN_SYSTEM.surfaceBg})
4. Adds a subtle pink glow effect (${DESIGN_SYSTEM.accent}) around the dialog
5. Adds subtle connected nodes or flow arrows in background suggesting sequences
6. Makes it look premium and professional

STYLE REQUIREMENTS:
- Dark theme with pink/magenta accents
- Professional SaaS marketing aesthetic
- Product UI is clearly visible and real
- 16:9 landscape aspect ratio
- Subtle shadows, glows, and depth
- NO text overlays`
  }
]

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function generateMarketingImage(figmaPath: string, prompt: string): Promise<Buffer | null> {
  try {
    if (!fs.existsSync(figmaPath)) {
      console.error(`    Figma source not found: ${figmaPath}`)
      return null
    }

    // Read Figma screenshot
    const figmaImage = fs.readFileSync(figmaPath)
    const base64Figma = figmaImage.toString('base64')
    console.log(`    Read Figma source (${(figmaImage.length / 1024).toFixed(1)} KB)`)

    console.log('    Calling Gemini 2.0 Flash...')

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp-image-generation:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: prompt },
              { inlineData: { mimeType: 'image/png', data: base64Figma } }
            ]
          }],
          generationConfig: {
            responseModalities: ["IMAGE", "TEXT"]
          }
        })
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      if (response.status === 429) {
        console.log('    Rate limited, waiting 60s...')
        await sleep(60000)
        return generateMarketingImage(figmaPath, prompt)
      }
      console.error(`    API error: ${response.status}`)
      console.error(`    ${errorText.substring(0, 500)}`)
      return null
    }

    const data = await response.json()
    const parts = data.candidates?.[0]?.content?.parts || []

    for (const part of parts) {
      if (part.inlineData?.data) {
        console.log('    ✓ Image generated successfully')
        return Buffer.from(part.inlineData.data, 'base64')
      }
    }

    console.error('    No image in response')
    console.error('    Response:', JSON.stringify(data).substring(0, 500))
    return null
  } catch (error) {
    console.error(`    Error: ${error}`)
    return null
  }
}

async function uploadToSanity(imageBuffer: Buffer, filename: string): Promise<string | null> {
  try {
    const asset = await sanityClient.assets.upload('image', imageBuffer, {
      filename: `${filename}.png`,
      contentType: 'image/png'
    })
    return asset._id
  } catch (error) {
    console.error(`    Upload failed: ${error}`)
    return null
  }
}

async function main() {
  console.log('='.repeat(70))
  console.log('Generating Marketing Images from Figma Screenshots with Gemini')
  console.log('='.repeat(70))
  console.log('')
  console.log('Design System:')
  console.log(`  Background: ${DESIGN_SYSTEM.pageBg}`)
  console.log(`  Accent: ${DESIGN_SYSTEM.accent}`)
  console.log('')

  const outputDir = '/tmp/figma-exports/marketing-generated'
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  const results: { badge: string; assetId: string }[] = []

  for (const config of schedulerImageConfig) {
    console.log(`\n[${'='.repeat(50)}]`)
    console.log(`[${config.badge}]`)
    console.log(`  Figma source: ${config.figmaSource}`)
    console.log(`  Output: ${config.filename}`)

    const imageBuffer = await generateMarketingImage(config.figmaSource, config.prompt)

    if (imageBuffer) {
      // Save locally
      const localPath = path.join(outputDir, `${config.filename}.png`)
      fs.writeFileSync(localPath, imageBuffer)
      console.log(`    ✓ Saved locally: ${localPath}`)

      // Upload to Sanity
      console.log('    Uploading to Sanity...')
      const assetId = await uploadToSanity(imageBuffer, config.filename)
      if (assetId) {
        results.push({ badge: config.badge, assetId })
        console.log(`    ✓ Uploaded: ${assetId}`)
      }
    }

    // Wait between requests to avoid rate limiting
    console.log('    Waiting 20s before next request...')
    await sleep(20000)
  }

  // Update Sanity document with new images
  if (results.length > 0) {
    console.log('\n' + '='.repeat(70))
    console.log('Updating Scheduler Page in Sanity')
    console.log('='.repeat(70))

    try {
      const doc = await sanityClient.fetch(
        `*[_type == "productPage" && slug.current == "scheduler"][0]{ _id, features }`,
        {}
      )

      if (doc && doc.features) {
        const updatedFeatures = doc.features.map((feature: any) => {
          const newImage = results.find(r => r.badge === feature.badge)
          if (newImage) {
            console.log(`  ✓ Updating: ${feature.badge}`)
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
        console.log('\n✓ Scheduler page updated with marketing images!')
      }
    } catch (error) {
      console.error('Failed to update Sanity:', error)
    }
  }

  console.log('\n' + '='.repeat(70))
  console.log(`Generated ${results.length}/${schedulerImageConfig.length} marketing images`)
  console.log('Check http://localhost:3001/features/scheduler')
  console.log('='.repeat(70))
}

main().catch(console.error)
