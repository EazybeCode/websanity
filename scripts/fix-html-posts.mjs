import { createClient } from '@sanity/client'
import crypto from 'crypto'

const client = createClient({
  projectId: '5awzi0t4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN
})

function generateKey() {
  return crypto.randomBytes(8).toString('hex')
}

// Simple HTML to Portable Text converter
function htmlToPortableText(html) {
  const blocks = []

  // Clean up the HTML
  html = html.trim()
    .replace(/\r\n/g, '\n')
    .replace(/\n\s*\n/g, '\n')

  // Split into block-level elements
  const blockRegex = /<(h[1-6]|p|ul|ol|li|blockquote)[^>]*>([\s\S]*?)<\/\1>/gi
  let match
  let lastIndex = 0

  // Process block elements
  const rawBlocks = []
  const fullRegex = /<(h[1-6]|p|ul|ol|blockquote)([^>]*)>([\s\S]*?)<\/\1>/gi

  while ((match = fullRegex.exec(html)) !== null) {
    const tag = match[1].toLowerCase()
    const content = match[3].trim()

    if (!content) continue

    if (tag === 'ul' || tag === 'ol') {
      // Parse list items
      const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi
      let liMatch
      while ((liMatch = liRegex.exec(content)) !== null) {
        const liContent = liMatch[1].trim()
        if (liContent) {
          rawBlocks.push({
            type: tag === 'ul' ? 'bullet' : 'number',
            content: liContent
          })
        }
      }
    } else {
      let style = 'normal'
      if (tag === 'h1') style = 'h1'
      else if (tag === 'h2') style = 'h2'
      else if (tag === 'h3') style = 'h3'
      else if (tag === 'h4') style = 'h4'
      else if (tag === 'blockquote') style = 'blockquote'

      rawBlocks.push({
        type: 'block',
        style,
        content
      })
    }
  }

  // If no blocks found via regex, try splitting by tags more aggressively
  if (rawBlocks.length === 0) {
    const lines = html.split(/<\/?(?:h[1-6]|p|div|ul|ol|li|blockquote)[^>]*>/gi).filter(l => l.trim())
    for (const line of lines) {
      if (line.trim()) {
        rawBlocks.push({ type: 'block', style: 'normal', content: line.trim() })
      }
    }
  }

  // Convert raw blocks to Portable Text
  for (const rawBlock of rawBlocks) {
    const block = {
      _type: 'block',
      _key: generateKey(),
      style: rawBlock.style || 'normal',
      markDefs: [],
      children: []
    }

    if (rawBlock.type === 'bullet' || rawBlock.type === 'number') {
      block.listItem = rawBlock.type === 'bullet' ? 'bullet' : 'number'
      block.level = 1
    }

    // Parse inline elements (strong, em, a, code, span)
    const inlineContent = rawBlock.content
    block.children = parseInlineContent(inlineContent, block.markDefs)

    if (block.children.length === 0) {
      block.children = [{
        _type: 'span',
        _key: generateKey(),
        text: stripHtml(rawBlock.content),
        marks: []
      }]
    }

    blocks.push(block)
  }

  return blocks
}

function parseInlineContent(html, markDefs) {
  const children = []

  // Replace <br> with newlines
  html = html.replace(/<br\s*\/?>/gi, '\n')

  // Simple approach: process inline tags
  let remaining = html
  const inlineRegex = /<(strong|b|em|i|a|code|span)([^>]*)>([\s\S]*?)<\/\1>/gi

  let lastIdx = 0
  let match

  // Reset regex
  inlineRegex.lastIndex = 0

  while ((match = inlineRegex.exec(html)) !== null) {
    // Add text before this match
    if (match.index > lastIdx) {
      const text = stripHtml(html.substring(lastIdx, match.index))
      if (text) {
        children.push({
          _type: 'span',
          _key: generateKey(),
          text,
          marks: []
        })
      }
    }

    const tag = match[1].toLowerCase()
    const attrs = match[2]
    const content = match[3]
    const marks = []

    if (tag === 'strong' || tag === 'b') {
      marks.push('strong')
    } else if (tag === 'em' || tag === 'i') {
      marks.push('em')
    } else if (tag === 'code') {
      marks.push('code')
    } else if (tag === 'a') {
      const hrefMatch = attrs.match(/href=['"](.*?)['"]/i)
      if (hrefMatch) {
        const linkKey = generateKey()
        markDefs.push({
          _type: 'link',
          _key: linkKey,
          href: hrefMatch[1]
        })
        marks.push(linkKey)
      }
    }

    // Strip any nested HTML from content
    const text = stripHtml(content)
    if (text) {
      children.push({
        _type: 'span',
        _key: generateKey(),
        text,
        marks
      })
    }

    lastIdx = match.index + match[0].length
  }

  // Add remaining text
  if (lastIdx < html.length) {
    const text = stripHtml(html.substring(lastIdx))
    if (text) {
      children.push({
        _type: 'span',
        _key: generateKey(),
        text,
        marks: []
      })
    }
  }

  return children
}

function stripHtml(html) {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim()
}

async function uploadImageFromUrl(url) {
  try {
    const response = await fetch(url)
    if (!response.ok) return null
    const buffer = Buffer.from(await response.arrayBuffer())
    const asset = await client.assets.upload('image', buffer, {
      filename: url.split('/').pop()?.split('?')[0] || 'featured.jpg'
    })
    return asset
  } catch (err) {
    console.log('  Failed to upload image:', err.message)
    return null
  }
}

async function main() {
  // Get the 3 posts with HTML content
  const allPosts = await client.fetch('*[_type == "blogPost" && language == "en"]{_id, title, "slug": slug.current}')

  const htmlPosts = []
  for (const p of allPosts) {
    const doc = await client.getDocument(p._id)
    if (typeof doc.content === 'string') {
      htmlPosts.push({ ...p, rawContent: doc.content })
    }
  }

  console.log(`Found ${htmlPosts.length} posts with HTML content to fix\n`)

  // Try to fetch featured images from the original blog
  const imageUrls = {
    'top-10-whatsapp-business-tools-faster-replies': 'https://eazybe.com/blog/top-10-whatsapp-business-tools-faster-replies',
    'whatsapp-automation-best-practices-2024': 'https://eazybe.com/blog/whatsapp-automation-best-practices-2024',
    'complete-guide-whatsapp-crm-integration': 'https://eazybe.com/blog/complete-guide-whatsapp-crm-integration',
  }

  for (const post of htmlPosts) {
    console.log(`\nFixing: ${post.title}`)
    console.log(`  Slug: ${post.slug}`)
    console.log(`  HTML length: ${post.rawContent.length}`)

    // Convert HTML to Portable Text
    const blocks = htmlToPortableText(post.rawContent)
    console.log(`  Converted to ${blocks.length} Portable Text blocks`)

    if (blocks.length === 0) {
      console.log('  WARNING: No blocks generated, skipping')
      continue
    }

    // Update the document
    const patch = client.patch(post._id).set({ content: blocks })

    // Try to get featured image from source
    const sourceUrl = imageUrls[post.slug]
    if (sourceUrl) {
      try {
        console.log(`  Fetching featured image from source...`)
        const response = await fetch(sourceUrl)
        if (response.ok) {
          const html = await response.text()
          // Look for og:image or first article image
          const ogMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i)
            || html.match(/<meta\s+content=["']([^"']+)["']\s+property=["']og:image["']/i)
          const imgMatch = html.match(/<article[\s\S]*?<img[^>]+src=["']([^"']+)["']/i)

          const imageUrl = ogMatch?.[1] || imgMatch?.[1]
          if (imageUrl) {
            console.log(`  Found image: ${imageUrl.substring(0, 80)}...`)
            const asset = await uploadImageFromUrl(imageUrl)
            if (asset) {
              patch.set({
                content: blocks,
                featuredImage: {
                  _type: 'image',
                  asset: {
                    _type: 'reference',
                    _ref: asset._id
                  }
                }
              })
              console.log(`  Uploaded featured image!`)
            }
          } else {
            console.log(`  No image found in source page`)
          }
        }
      } catch (err) {
        console.log(`  Could not fetch source page: ${err.message}`)
      }
    }

    await patch.commit()
    console.log(`  Updated successfully!`)
  }

  console.log('\n--- Verification ---')
  for (const post of htmlPosts) {
    const doc = await client.getDocument(post._id)
    console.log(`${doc.title}:`)
    console.log(`  Content type: ${typeof doc.content}, isArray: ${Array.isArray(doc.content)}, blocks: ${Array.isArray(doc.content) ? doc.content.length : 'N/A'}`)
    console.log(`  Has featured image: ${!!doc.featuredImage?.asset}`)
  }
}

main().catch(console.error)
