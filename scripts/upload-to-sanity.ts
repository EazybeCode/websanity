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

async function uploadAndUpdate() {
  try {
    console.log('Reading image...')
    const imageBuffer = fs.readFileSync('/tmp/figma-exports/scheduler-marketing.png')
    
    console.log('Uploading to Sanity...')
    const asset = await sanityClient.assets.upload('image', imageBuffer, {
      filename: 'scheduler-smart-scheduling-gemini.png',
      contentType: 'image/png'
    })
    console.log('✓ Uploaded! Asset ID:', asset._id)

    // Update the scheduler feature document
    console.log('\nUpdating scheduler feature document...')
    const doc = await sanityClient.fetch(
      `*[_type == "productPage" && slug.current == "scheduler"][0]{ _id, features }`,
      {}
    )
    
    if (!doc) {
      console.log('Document not found')
      return
    }
    
    console.log('Found document:', doc._id)
    console.log('Features count:', doc.features?.length)
    
    // Update all features with the new image (for demo)
    const updatedFeatures = doc.features.map((feature: any, idx: number) => {
      // Update the "Smart Scheduling" feature (index 1)
      if (idx === 1) {
        console.log(`Updating feature: ${feature.badge}`)
        return {
          ...feature,
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: asset._id
            }
          }
        }
      }
      return feature
    })

    await sanityClient.patch(doc._id).set({ features: updatedFeatures }).commit()
    console.log('✓ Updated Sanity document!')
    console.log('\nDone! Check the scheduler feature page.')
    
  } catch (error) {
    console.error('Error:', error)
  }
}

uploadAndUpdate()
