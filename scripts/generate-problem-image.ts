import * as fs from 'fs'
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

async function main() {
  const figmaImage = fs.readFileSync('/tmp/figma-exports/scheduler-1.png')
  const base64Figma = figmaImage.toString('base64')

  const prompt = `Create a clean, abstract marketing illustration for a SaaS product.

CONCEPT: "Missed follow-ups and chaos" - the problem of forgotten messages

VISUAL ELEMENTS:
- Several message/envelope icons scattered and fading away (dissolving into particles)
- A broken or cracked hourglass or timer in the center
- Subtle red/orange warning indicators
- Muted notification bell icons (crossed out or dimmed)

STRICT DESIGN REQUIREMENTS:
- Background: solid dark navy/slate #020617
- Accent color: #EC4899 (pink/magenta) for some elements
- Warning elements in muted red/orange
- Style: Minimal, abstract, clean geometric shapes
- Soft glow effects on key elements
- NO text, NO UI elements, NO product screenshots
- Aspect ratio: 16:9 landscape
- Premium SaaS marketing aesthetic

The image should convey "chaos and missed opportunities" elegantly.`

  console.log('Generating "The Problem" image...')

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent?key=${GEMINI_API_KEY}`,
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
    console.error('API error:', response.status, await response.text())
    return
  }

  const data = await response.json()
  const parts = data.candidates?.[0]?.content?.parts || []

  for (const part of parts) {
    if (part.inlineData?.data) {
      const imageBuffer = Buffer.from(part.inlineData.data, 'base64')
      fs.writeFileSync('/tmp/figma-exports/marketing/scheduler-problem.png', imageBuffer)
      console.log('✓ Image saved!')

      // Upload to Sanity
      const asset = await sanityClient.assets.upload('image', imageBuffer, {
        filename: 'scheduler-problem.png',
        contentType: 'image/png'
      })
      console.log('✓ Uploaded:', asset._id)

      // Update Sanity doc
      const doc = await sanityClient.fetch(
        `*[_type == "productPage" && slug.current == "scheduler"][0]{ _id, features }`,
        {}
      )
      
      if (doc) {
        const updatedFeatures = doc.features.map((f: any) => {
          if (f.badge === 'The Problem') {
            return {
              ...f,
              image: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
            }
          }
          return f
        })
        await sanityClient.patch(doc._id).set({ features: updatedFeatures }).commit()
        console.log('✓ Sanity updated!')
      }
      return
    }
  }
  
  console.log('No image generated')
}

main().catch(console.error)
