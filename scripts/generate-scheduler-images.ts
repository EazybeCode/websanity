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

// Design system colors
const DESIGN_SYSTEM = {
  pageBg: '#020617',      // Slate 950
  sectionBg: '#0F172A',   // Slate 900
  cardBg: '#1E293B',      // Slate 800
  border: '#334155',      // Slate 700
  accent: '#EC4899',      // Pink 500 (Scheduler accent)
  accentDark: '#BE185D',  // Pink 700
  textMuted: '#94A3B8',   // Slate 400
}

// Three distinct image concepts for Scheduler
const schedulerImages = [
  {
    badge: 'The Problem',
    filename: 'scheduler-problem',
    figmaRef: '/tmp/figma-exports/scheduler-1.png',
    prompt: `Create a clean, abstract marketing illustration for a SaaS product.

CONCEPT: "Missed follow-ups and lost messages" - visualize the chaos of forgotten tasks

VISUAL ELEMENTS:
- Several message bubble icons scattered and fading/dissolving into particles
- A central broken or cracked clock/timer showing urgency
- Subtle red warning indicators floating
- Abstract notification bells that appear muted/crossed out

STRICT DESIGN REQUIREMENTS:
- Background: solid dark color ${DESIGN_SYSTEM.pageBg}
- Accent color: ${DESIGN_SYSTEM.accent} (pink/magenta) for key elements
- Secondary: muted grays like ${DESIGN_SYSTEM.textMuted}
- Style: Minimal, abstract, clean shapes with soft glow effects
- NO text, NO UI elements, NO product screenshots
- Aspect ratio: 16:9 landscape
- Premium SaaS marketing aesthetic
- Elements should float on the dark background with subtle shadows

The image should convey "chaos and missed opportunities" in an elegant, abstract way.`
  },
  {
    badge: 'Smart Scheduling',
    filename: 'scheduler-smart',
    figmaRef: '/tmp/figma-exports/scheduler-1.png',
    prompt: `Create a clean, abstract marketing illustration for a SaaS product.

CONCEPT: "Perfect timing - schedule messages for the right moment"

VISUAL ELEMENTS:
- A stylized calendar icon with a few day cells highlighted
- An elegant analog or digital clock showing a specific time
- A single message/envelope icon with a small clock badge
- Subtle connecting lines or flow arrows suggesting "scheduling"
- Soft pink glow around the timing elements

STRICT DESIGN REQUIREMENTS:
- Background: solid dark color ${DESIGN_SYSTEM.pageBg}
- Primary accent: ${DESIGN_SYSTEM.accent} (pink/magenta)
- Secondary: ${DESIGN_SYSTEM.cardBg} for depth layers
- Style: Clean geometric shapes, minimal, modern
- NO text, NO UI chrome, NO product screenshots
- Aspect ratio: 16:9 landscape
- Elements should have soft glow and subtle shadows
- Premium, polished SaaS marketing aesthetic

The image should convey "precision timing and control" in an elegant, abstract way.`
  },
  {
    badge: 'Follow-up Sequences',
    filename: 'scheduler-sequences',
    figmaRef: '/tmp/figma-exports/scheduler-2.png',
    prompt: `Create a clean, abstract marketing illustration for a SaaS product.

CONCEPT: "Automated follow-up sequences - persistent outreach"

VISUAL ELEMENTS:
- Three connected circular nodes in a horizontal line, linked by glowing lines
- Each node contains a simple message/envelope icon
- Small clock badges on each node showing progression (Day 1, Day 3, Day 7 concept)
- Subtle automation/loop indicator
- The sequence flows from left to right with increasing glow

STRICT DESIGN REQUIREMENTS:
- Background: solid dark color ${DESIGN_SYSTEM.pageBg}
- Primary accent: ${DESIGN_SYSTEM.accent} (pink/magenta) for the flow/connections
- Node backgrounds: ${DESIGN_SYSTEM.cardBg}
- Style: Clean, connected nodes, workflow visualization
- NO text, NO UI elements, NO product screenshots
- Aspect ratio: 16:9 landscape
- Soft glows where nodes connect
- Premium SaaS marketing aesthetic

The image should convey "automated, connected sequences" in an elegant, abstract way.`
  }
]

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function generateImage(prompt: string, figmaRefPath: string): Promise<Buffer | null> {
  try {
    // Read Figma reference image
    const figmaImage = fs.readFileSync(figmaRefPath)
    const base64Figma = figmaImage.toString('base64')

    console.log('    Calling Gemini 3 Pro...')

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: `Reference image for style inspiration (but create something completely different and abstract):\n\n${prompt}` },
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
        return generateImage(prompt, figmaRefPath)
      }
      console.error(`    API error: ${response.status}`)
      console.error(`    ${errorText.substring(0, 300)}`)
      return null
    }

    const data = await response.json()
    const parts = data.candidates?.[0]?.content?.parts || []

    for (const part of parts) {
      if (part.inlineData?.data) {
        return Buffer.from(part.inlineData.data, 'base64')
      }
    }

    console.error('    No image in response')
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
  console.log('='.repeat(60))
  console.log('Generating Scheduler Marketing Images')
  console.log('='.repeat(60))
  console.log('\nDesign System:')
  console.log(`  Background: ${DESIGN_SYSTEM.pageBg}`)
  console.log(`  Accent: ${DESIGN_SYSTEM.accent}`)
  console.log('')

  const outputDir = '/tmp/figma-exports/marketing'
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  const results: { badge: string; assetId: string }[] = []

  for (const img of schedulerImages) {
    console.log(`\n[${img.badge}]`)
    console.log(`  Generating: ${img.filename}`)

    const imageBuffer = await generateImage(img.prompt, img.figmaRef)

    if (imageBuffer) {
      // Save locally
      const localPath = path.join(outputDir, `${img.filename}.png`)
      fs.writeFileSync(localPath, imageBuffer)
      console.log(`    ✓ Saved locally: ${localPath}`)

      // Upload to Sanity
      const assetId = await uploadToSanity(imageBuffer, img.filename)
      if (assetId) {
        results.push({ badge: img.badge, assetId })
        console.log(`    ✓ Uploaded to Sanity: ${assetId}`)
      }
    }

    // Wait between requests
    console.log('    Waiting 15s before next request...')
    await sleep(15000)
  }

  // Update Sanity document
  if (results.length > 0) {
    console.log('\n' + '='.repeat(60))
    console.log('Updating Sanity Document')
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
            console.log(`  Updating: ${feature.badge}`)
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
        console.log('\n✓ Sanity document updated!')
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
