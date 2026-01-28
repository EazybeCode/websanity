import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'
import { createClient } from '@sanity/client'
import { config } from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables
config({ path: path.join(__dirname, '..', '.env') })

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || ''
const SANITY_TOKEN = 'skyGWH6GzKUWxM1ZekEDdO1pgiNJgpgJDt8luNyvrUz0cDznZEHMwOzsl1AhoLVqWpK9QdW21KUecLTViCi7fHjlqMYhNYQXL3j4nwRa3QKH6LBmqEqx0kSkrCLOzhzZiY7367ZLrEgWXCZ72nH2hysPNFNezkhnEJOEuc7qGQjNdvkQtmR9'

const sanityClient = createClient({
  projectId: '5awzi0t4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: SANITY_TOKEN
})

// Feature sections with descriptive prompts for Gemini 3 Pro image generation
const featurePrompts = [
  {
    slug: 'cloud-backup',
    sections: [
      {
        badge: 'The Problem',
        prompt: 'A dark themed illustration showing scattered smartphones with WhatsApp chat bubbles fading and disappearing into digital dust. The phones are floating disconnected. Use dark slate background (#0f172a) with blue accents (#3B82F6). Modern SaaS product visualization style. No text or labels.'
      },
      {
        badge: 'Real-Time Sync',
        prompt: 'An illustration of WhatsApp chat messages flowing upward as glowing data streams into a secure cloud with a shield and checkmark. Dark slate background (#0f172a), blue glow effects (#3B82F6). Modern tech product style. No text.'
      },
      {
        badge: 'Instant Search',
        prompt: 'A search interface mockup showing a magnifying glass hovering over stacked chat message cards, with one card highlighted. Dark background (#0f172a), blue accent color (#3B82F6). Clean minimal SaaS dashboard style. No text.'
      }
    ]
  },
  {
    slug: 'team-inbox',
    sections: [
      {
        badge: 'Unified View',
        prompt: 'A dashboard view showing multiple WhatsApp conversation cards arranged in a grid layout with a central inbox hub. Dark background (#0f172a), emerald green accents (#10B981). Modern team collaboration tool style. No text.'
      },
      {
        badge: 'Team Visibility',
        prompt: 'User avatar circles connected by glowing lines to a central hub icon, showing team routing and collaboration. Dark slate background (#0f172a), green highlights (#10B981). Network visualization style. No text.'
      }
    ]
  },
  {
    slug: 'whatsapp-crm',
    sections: [
      {
        badge: 'Native CRM',
        prompt: 'A WhatsApp chat window with a sidebar panel showing contact details, deal stages, and customer info. Dark theme (#0f172a), purple accents (#8B5CF6). Chrome extension/browser UI style. No text labels.'
      },
      {
        badge: 'Deal Pipeline',
        prompt: 'A horizontal Kanban board with deal cards moving through stages from left to right. Cards have status indicators. Dark background (#0f172a), violet purple highlights (#8B5CF6). Sales CRM pipeline style. No text.'
      }
    ]
  },
  {
    slug: 'revenue-inbox',
    sections: [
      {
        badge: 'Deal Health',
        prompt: 'Deal cards displayed with health indicator dots (green, yellow, red) showing opportunity status. Analytics dashboard style. Dark background (#0f172a), teal accents (#14B8A6). Revenue intelligence visualization. No text.'
      },
      {
        badge: 'Opportunity Signals',
        prompt: 'AI sparkle icons next to deal cards with trend arrows showing opportunity direction. Dark background (#0f172a), teal highlights (#14B8A6). AI-powered sales insights style. No text.'
      }
    ]
  },
  {
    slug: 'whatsapp-copilot',
    sections: [
      {
        badge: 'AI Assistant',
        prompt: 'A chat interface with an AI sparkle/wand icon generating a suggested reply in a floating bubble above the input. Dark background (#0f172a), sky blue AI glow (#0EA5E9). AI assistant product style. No text.'
      },
      {
        badge: 'Smart Summaries',
        prompt: 'A conversation thread with an AI-generated summary card floating above showing key bullet points. Dark background (#0f172a), blue highlights (#0EA5E9). AI summarization visualization. No text.'
      }
    ]
  },
  {
    slug: 'quick-reply',
    sections: [
      {
        badge: 'Template Library',
        prompt: 'A popup interface showing pre-written message template cards in a grid layout for quick selection. Dark background (#0f172a), amber accents (#F59E0B). Productivity tool picker style. No text.'
      }
    ]
  },
  {
    slug: 'scheduler',
    sections: [
      {
        badge: 'Schedule Messages',
        prompt: 'A calendar with clock icon and a WhatsApp message card being scheduled with a time indicator. Dark background (#0f172a), pink accents (#EC4899). Message scheduling interface style. No text.'
      }
    ]
  },
  {
    slug: 'rep-radar',
    sections: [
      {
        badge: 'Team Analytics',
        prompt: 'A performance dashboard with bar charts, metrics, and user avatar indicators showing team activity. Dark background (#0f172a), indigo accents (#6366F1). Team analytics visualization. No text.'
      }
    ]
  }
]

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function generateImageWithGemini3(prompt: string, featureName: string, sectionBadge: string): Promise<Buffer | null> {
  const fullPrompt = `Create a professional product illustration for a SaaS website feature page. ${prompt} Style: Modern, minimal, dark mode aesthetic matching a premium tech product. Dimensions: Landscape 16:9 ratio.`

  try {
    console.log(`    Calling Gemini 3 Pro Image Preview...`)

    // Using gemini-3-pro-image-preview model
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: fullPrompt }]
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
        console.log(`    Rate limited, waiting 60s...`)
        await sleep(60000)
        return generateImageWithGemini3(prompt, featureName, sectionBadge)
      }
      console.error(`    API error: ${response.status}`)
      console.error(`    ${errorText.substring(0, 200)}`)
      return null
    }

    const data = await response.json()

    // Look for inline data in the response
    const parts = data.candidates?.[0]?.content?.parts || []
    for (const part of parts) {
      if (part.inlineData?.data) {
        return Buffer.from(part.inlineData.data, 'base64')
      }
    }

    console.error(`    No image data in response for ${featureName}/${sectionBadge}`)
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
    console.error(`    Failed to upload: ${error}`)
    return null
  }
}

async function updateFeatureWithImages(slug: string, sectionImages: { badge: string; assetId: string }[]) {
  try {
    const doc = await sanityClient.fetch(
      `*[_type == "productPage" && slug.current == $slug][0]{ _id, features }`,
      { slug }
    )

    if (!doc || !doc.features) {
      console.log(`    No document or features found for ${slug}`)
      return
    }

    const updatedFeatures = doc.features.map((feature: any) => {
      const imageData = sectionImages.find(img => img.badge === feature.badge)
      if (imageData) {
        return {
          ...feature,
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: imageData.assetId
            }
          }
        }
      }
      return feature
    })

    await sanityClient.patch(doc._id).set({ features: updatedFeatures }).commit()
    console.log(`    ✓ Updated Sanity document`)
  } catch (error) {
    console.error(`    Failed to update Sanity: ${error}`)
  }
}

async function main() {
  console.log('Generating feature images with Gemini 3 Pro Image Preview...\n')

  const outputDir = path.join(__dirname, '..', 'generated-images')
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  for (const feature of featurePrompts) {
    console.log(`\n${feature.slug}:`)
    const sectionImages: { badge: string; assetId: string }[] = []

    for (const section of feature.sections) {
      console.log(`  ${section.badge}:`)

      const imageBuffer = await generateImageWithGemini3(
        section.prompt,
        feature.slug,
        section.badge
      )

      if (imageBuffer) {
        const filename = `${feature.slug}-${section.badge.toLowerCase().replace(/\s+/g, '-')}`
        const localPath = path.join(outputDir, `${filename}.png`)
        fs.writeFileSync(localPath, imageBuffer)
        console.log(`    ✓ Saved: ${filename}.png`)

        const assetId = await uploadToSanity(imageBuffer, filename)
        if (assetId) {
          sectionImages.push({ badge: section.badge, assetId })
          console.log(`    ✓ Uploaded to Sanity`)
        }
      }

      // Wait between requests to avoid rate limits
      await sleep(10000)
    }

    if (sectionImages.length > 0) {
      await updateFeatureWithImages(feature.slug, sectionImages)
    }
  }

  console.log('\n✓ Done!')
}

main().catch(console.error)
