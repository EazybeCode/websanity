import { createClient } from '@sanity/client'
import * as cheerio from 'cheerio'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { config } from 'dotenv'

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') })

// Check for SANITY_API_TOKEN
const sanityToken = process.env.SANITY_API_TOKEN || ''

if (!sanityToken || sanityToken === 'your_sanity_api_token_here') {
  console.error('❌ ERROR: SANITY_API_TOKEN is not set or invalid!')
  console.error('\n📝 To fix this issue:')
  console.error('1. Go to: https://sanity.io/manage/project/5awzi0t4/api')
  console.error('2. Click "Add API token"')
  console.error('3. Name it something like "Blog Import Script"')
  console.error('4. ⚠️ IMPORTANT: Select "Editor" permissions (NOT "Viewer")')
  console.error('5. Copy the token and add it to your .env.local file:')
  console.error('\n   SANITY_API_TOKEN=your_actual_token_here\n')
  console.error('Or run this command with the token:')
  console.error('   SANITY_API_TOKEN=your_token npm run import-blogs-from-live\n')
  process.exit(1)
}

const sanityClient = createClient({
  projectId: '5awzi0t4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: sanityToken
})

// Blog URLs from ALL_BLOG_URLS.md
const blogUrls = {
  en: [
    'https://eazybe.com/blog/best-ai-agents-for-customer-support',
    'https://eazybe.com/blog/complete-guide-whatsapp-crm-integration',
    'https://eazybe.com/blog/google-calendar-on-whatsapp-eazybe-extension-guide',
    'https://eazybe.com/blog/how-to-easily-restore-deleted-whatsapp-images-and-videos-revealed',
    'https://eazybe.com/blog/how-to-increase-sales',
    'https://eazybe.com/blog/how-to-read-deleted-messages-on-whatsapp',
    'https://eazybe.com/blog/sales-efficiency',
    'https://eazybe.com/blog/step-by-step-guide-view-names-on-whatsapp-without-saving-numbers',
    'https://eazybe.com/blog/top-10-whatsapp-business-tools-faster-replies',
    'https://eazybe.com/blog/whatsapp-automation',
    'https://eazybe.com/blog/whatsapp-automation-best-practices-2024',
    'https://eazybe.com/blog/whatsapp-business-description-samples',
    'https://eazybe.com/blog/whatsapp-business-tools',
    'https://eazybe.com/blog/whatsapp-client-communication-b2b-sales',
    'https://eazybe.com/blog/whatsapp-hubspot-reporting',
    'https://eazybe.com/blog/how-to-use-whatsapp-poll-results-to-grow-your-business',
    'https://eazybe.com/blog/whatsapp-sales-performance-analytics',
    'https://eazybe.com/blog/whatsapp-sales-tracking',
    'https://eazybe.com/blog/whatsapp-team-inbox'
  ],
  pt: [
    'https://eazybe.com/br/blog/analise-de-desempenho-de-vendas-do-whatsapp',
    'https://eazybe.com/br/blog/automacao-do-whatsapp',
    'https://eazybe.com/br/blog/caixa-de-entrada-da-equipe-whatsapp',
    'https://eazybe.com/br/blog/como-aumentar-as-vendas',
    'https://eazybe.com/br/blog/eficiencia-de-vendas',
    'https://eazybe.com/br/blog/ferramentas-do-whatsapp-business',
    'https://eazybe.com/br/blog/hubspot-conversation-analytics',
    'https://eazybe.com/br/blog/rastreamento-de-vendas-do-whatsapp',
    'https://eazybe.com/br/blog/relatorios-do-hubspot-para-whatsapp',
    'https://eazybe.com/br/blog/sales-enablement',
    'https://eazybe.com/br/blog/sincronizacao-de-bate-papo-do-whatsapp',
    'https://eazybe.com/br/blog/whatsapp-hubspot-reporting'
  ],
  es: [
    'https://eazybe.com/es/blog/los-mejores-agentes-de-inteligencia-artificial-para-atencion-al-cliente',
    'https://eazybe.com/es/blog/analisis-de-conversaciones-de-hubspot',
    'https://eazybe.com/es/blog/analisis-del-rendimiento-de-ventas-de-whatsapp',
    'https://eazybe.com/es/blog/automatizacion-de-whatsapp',
    'https://eazybe.com/es/blog/bandeja-de-entrada-del-equipo-de-whatsapp',
    'https://eazybe.com/es/blog/como-aumentar-las-ventas',
    'https://eazybe.com/es/blog/como-leer-mensajes-eliminados-en-whatsapp',
    'https://eazybe.com/es/blog/desconectarse-de-whatsapp',
    'https://eazybe.com/es/blog/eficiencia-de-ventas',
    'https://eazybe.com/es/blog/habilitacion-de-ventas',
    'https://eazybe.com/es/blog/herramientas-de-whatsapp-business',
    'https://eazybe.com/es/blog/informes-de-hubspot-para-whatsapp',
    'https://eazybe.com/es/blog/seguimiento-de-ventas-de-whatsapp',
    'https://eazybe.com/es/blog/sincronizacion-de-chat-de-whatsapp',
    'https://eazybe.com/es/blog/whatsapp-sales-tracking'
  ]
}

/**
 * Convert HTML content to Portable Text blocks
 */
function htmlToPortableText(html: string): Array<any> {
  const $ = cheerio.load(html)
  const blocks: Array<any> = []

  // Process each element
  $('body > *').each((_, element) => {
    const tagName = element.tagName
    const $el = $(element)
    const text = $el.text().trim()

    if (!text) return

    switch (tagName) {
      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
        blocks.push({
          _type: 'block',
          style: tagName,
          children: [{ _type: 'span', text }]
        })
        break

      case 'p':
        blocks.push({
          _type: 'block',
          style: 'normal',
          children: [{ _type: 'span', text }]
        })
        break

      case 'ul':
      case 'ol':
        const listItems = $el.find('li').map((_, li) => {
          return {
            _type: 'block',
            style: 'normal',
            children: [{ _type: 'span', text: $(li).text().trim() }]
          }
        }).get()

        if (listItems.length > 0) {
          blocks.push({
            _type: tagName === 'ul' ? 'bulletList' : 'numberList',
            level: 1,
            listItem: 'bullet',
            children: listItems
          })
        }
        break

      case 'table':
        const rows: any[] = []
        $el.find('tr').each((_, tr) => {
          const cells = $(tr).find('td, th').map((_, cell) => $(cell).text().trim()).get()
          rows.push(cells)
        })

        blocks.push({
          _type: 'table',
          rows
        })
        break

      default:
        blocks.push({
          _type: 'block',
          style: 'normal',
          children: [{ _type: 'span', text }]
        })
    }
  })

  return blocks
}

/**
 * Extract blog content from HTML
 */
function extractBlogContent(html: string, language: string, slug: string) {
  const $ = cheerio.load(html)

  // Extract title
  const title = $('h1').first().text().trim() ||
               $('meta[property="og:title"]').attr('content') ||
               $('title').text().trim()

  // Extract meta description
  const metaDescription = $('meta[name="description"]').attr('content') ||
                          $('meta[property="og:description"]').attr('content') ||
                          $('meta[name="twitter:description"]').attr('content') || ''

  // Get main content area
  let articleHtml = ''
  const contentSelectors = [
    'article',
    'main',
    '[role="main"]',
    '.blog-content',
    '.post-content',
    '.article-content',
    '.content-wrapper',
    '#content'
  ]

  for (const selector of contentSelectors) {
    const $content = $(selector)
    if ($content.length > 0) {
      articleHtml = $content.html() || ''
      break
    }
  }

  // Fallback: get everything after h1
  if (!articleHtml) {
    const $h1 = $('h1').first()
    if ($h1.length) {
      const siblings = []
      let next = $h1.next()
      while (next.length && !next.is('h1')) {
        siblings.push($.html(next))
        next = next.next()
      }
      articleHtml = siblings.join('\n')
    }
  }

  // Extract featured image
  const featuredImage = $('meta[property="og:image"]').attr('content') ||
                       $('meta[name="twitter:image"]').attr('content') ||
                       $('article img').first().attr('src') ||
                       $('.featured-image img').attr('src') ||
                       $('img[class*="featured"]').attr('src') || ''

  // Extract author
  const author = $('.author-name').text().trim() ||
                $('[itemprop="author"]').text().trim() ||
                $('.author').text().trim() ||
                'Eazybe Editorial'

  // Extract publish date
  const publishDate = $('meta[property="article:published_time"]').attr('content') ||
                     $('time').attr('datetime') ||
                     $('[itemprop="datePublished"]').attr('content') ||
                     new Date().toISOString()

  // Extract category
  const category = $('.category').text().trim() ||
                  $('meta[property="article:section"]').attr('content') ||
                  $('span[class*="category"]').text().trim() ||
                  'WhatsApp'

  // Extract read time
  const readTimeText = $('.read-time').text().match(/\d+/) ||
                      $('meta[property="article:readingTime"]').attr('content')
  const readTime = readTimeText ? parseInt(readTimeText.toString()) : 5

  // Convert HTML to Portable Text
  const content = htmlToPortableText(articleHtml || '<div>No content found</div>')

  // Extract FAQs
  const faqs: any[] = []
  $('.faq-item, .faq, [itemtype="https://schema.org/FAQPage"] .faq-item, .faq-question').each((_, faqEl) => {
    const $faq = $(faqEl)
    const question = $faq.find('.faq-question, .question, h3, h4').first().text().trim() ||
                    $faq.prevAll('.faq-question, .question, h3, h4').first().text().trim()
    const answer = $faq.find('.faq-answer, .answer, p').first().text().trim()

    if (question && answer && !faqs.some(f => f.question === question)) {
      faqs.push({ question, answer })
    }
  })

  return {
    title: title || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    slug,
    excerpt: metaDescription || `Learn about ${title || slug}`,
    content,
    category,
    featuredImage,
    publishedAt: publishDate,
    readTime,
    author: {
      name: author,
      bio: 'Eazybe Team is comprised of CRM experts and automation engineers dedicated to helping businesses leverage the full power of WhatsApp for enterprise-level growth.'
    },
    faqs,
    seo: {
      metaTitle: title || slug.replace(/-/g, ' '),
      metaDescription: metaDescription || `Read about ${title || slug} on Eazybe blog.`
    }
  }
}

/**
 * Main import function
 */
async function importBlogsFromLive() {
  const dryRun = process.env.DRY_RUN === 'true'

  if (dryRun) {
    console.log('🔍 DRY RUN MODE - No documents will be created in Sanity\n')
  }

  console.log('🚀 Starting blog import from live pages...\n')

  let totalProcessed = 0
  let totalSuccess = 0
  let totalFailed = 0
  const failedList: string[] = []

  // Test Sanity connection
  try {
    console.log('🔐 Testing Sanity API connection...')
    const testQuery = await sanityClient.fetch('*[_type == "blogPost"][0]._id')
    console.log('✓ Sanity connection successful!\n')
  } catch (error) {
    console.error('✗ Sanity connection failed:', error instanceof Error ? error.message : error)
    console.error('\nPlease check your SANITY_API_TOKEN and ensure it has "Editor" permissions.\n')
    process.exit(1)
  }

  // Process each language
  for (const [langCode, urls] of Object.entries(blogUrls)) {
    console.log(`\n📚 Processing ${langCode.toUpperCase()} blogs (${urls.length} URLs)...\n`)

    for (const url of urls) {
      totalProcessed++
      const slug = url.split('/').filter(Boolean).pop()

      try {
        console.log(`[${totalProcessed}] Fetching: ${url}`)

        // Fetch the HTML content
        const response = await fetch(url, {
          headers: {
            'User-Agent': 'Eazybe-Blog-Importer/1.0'
          }
        })

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }

        const html = await response.text()

        // Extract blog content
        const blogData = extractBlogContent(html, langCode, slug!)

        // Map language codes
        const languageMap: Record<string, string> = {
          'en': 'en',
          'pt': 'pt-BR',
          'es': 'es'
        }

        // Create Sanity document
        const sanityDoc = {
          _id: `blogPost-${slug}-${langCode}`,
          _type: 'blogPost',
          language: languageMap[langCode] || 'en',
          title: blogData.title,
          slug: {
            _type: 'slug',
            current: blogData.slug
          },
          excerpt: blogData.excerpt,
          content: blogData.content,
          category: blogData.category,
          featuredImage: blogData.featuredImage,
          publishedAt: blogData.publishedAt,
          readTime: blogData.readTime,
          author: blogData.author,
          faqs: blogData.faqs,
          seo: blogData.seo
        }

        if (dryRun) {
          console.log(`   ✓ Would create: ${blogData.title}`)
          console.log(`   📄 Sanity ID: ${sanityDoc._id}`)
          console.log(`   📝 Content blocks: ${blogData.content.length}`)
          console.log(`   ❓ FAQs: ${blogData.faqs.length}\n`)
        } else {
          // Create or replace in Sanity
          const result = await sanityClient.createOrReplace(sanityDoc)

          console.log(`   ✓ Successfully imported: ${blogData.title}`)
          console.log(`   📄 Sanity ID: ${result._id}\n`)
        }

        totalSuccess++

        // Add delay to avoid overwhelming the server
        await new Promise(resolve => setTimeout(resolve, 300))

      } catch (error) {
        totalFailed++
        const errorMsg = error instanceof Error ? error.message : String(error)
        failedList.push(`${slug}: ${errorMsg}`)
        console.error(`   ✗ Failed to import ${slug}:`, errorMsg)
        console.error('')
      }
    }
  }

  console.log('\n' + '='.repeat(60))
  console.log('📊 Import Summary')
  console.log('='.repeat(60))
  console.log(`Total Processed: ${totalProcessed}`)
  console.log(`✓ Successful: ${totalSuccess}`)
  console.log(`✗ Failed: ${totalFailed}`)

  if (failedList.length > 0) {
    console.log('\n❌ Failed URLs:')
    failedList.slice(0, 10).forEach(f => console.log(`   - ${f}`))
    if (failedList.length > 10) {
      console.log(`   ... and ${failedList.length - 10} more`)
    }
  }

  console.log('='.repeat(60))

  if (!dryRun && totalFailed > 0) {
    console.log('\n⚠️  Some blogs failed to import.')
    console.log('Common issues:')
    console.log('  - Page not found (404)')
    console.log('  - Server error (500)')
    console.log('  - Network timeout')
    console.log('  - Invalid HTML structure')
  }

  if (dryRun) {
    console.log('\n💡 To actually import to Sanity, run without DRY_RUN:')
    console.log('   npm run import-blogs-from-live')
  }
}

// Run the import
importBlogsFromLive()
  .then(() => {
    console.log('\n✅ Blog import completed!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Blog import failed:', error)
    process.exit(1)
  })
