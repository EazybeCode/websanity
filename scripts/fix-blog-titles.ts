import { createClient } from '@sanity/client'
import * as cheerio from 'cheerio'
import { config } from 'dotenv'
import { resolve } from 'path'

// Load environment variables
config({ path: resolve(process.cwd(), '.env.local') })

const sanityClient = createClient({
  projectId: '5awzi0t4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN || ''
})

// Blog URL to title mappings (manually extracted or AI-generated)
const blogTitles: Record<string, string> = {
  // English blogs
  'best-ai-agents-for-customer-support': 'Best AI Agents for Customer Support in 2024',
  'complete-guide-whatsapp-crm-integration': 'Complete Guide to WhatsApp CRM Integration',
  'google-calendar-on-whatsapp-eazybe-extension-guide': 'Google Calendar on WhatsApp: Eazybe Extension Guide',
  'how-to-easily-restore-deleted-whatsapp-images-and-videos-revealed': 'How to Easily Restore Deleted WhatsApp Images and Videos',
  'how-to-increase-sales': 'How to Increase Sales: Proven Strategies for 2024',
  'how-to-read-deleted-messages-on-whatsapp': 'How to Read Deleted Messages on WhatsApp',
  'sales-efficiency': 'Sales Efficiency: Tips to Boost Your Team Performance',
  'step-by-step-guide-view-names-on-whatsapp-without-saving-numbers': 'View Names on WhatsApp Without Saving Numbers: Step-by-Step Guide',
  'top-10-whatsapp-business-tools-faster-replies': 'Top 10 WhatsApp Business Tools for Faster Customer Replies',
  'whatsapp-automation': 'WhatsApp Automation: Complete Guide for Business',
  'whatsapp-automation-best-practices-2024': 'WhatsApp Automation Best Practices for 2024',
  'whatsapp-business-description-samples': 'WhatsApp Business Description Samples & Examples',
  'whatsapp-business-tools': 'WhatsApp Business Tools: Essential Features for Growth',
  'whatsapp-client-communication-b2b-sales': 'WhatsApp Client Communication for B2B Sales',
  'whatsapp-hubspot-reporting': 'WhatsApp HubSpot Reporting: Complete Integration Guide',
  'how-to-use-whatsapp-poll-results-to-grow-your-business': 'How to Use WhatsApp Poll Results to Grow Your Business',
  'whatsapp-sales-performance-analytics': 'WhatsApp Sales Performance Analytics Guide',
  'whatsapp-sales-tracking': 'WhatsApp Sales Tracking: Monitor and Improve Performance',
  'whatsapp-team-inbox': 'WhatsApp Team Inbox: Collaborative Communication Solution',

  // Portuguese blogs
  'analise-de-desempenho-de-vendas-do-whatsapp': 'Análise de Desempenho de Vendas do WhatsApp',
  'automacao-do-whatsapp': 'Automação do WhatsApp: Guia Completo',
  'caixa-de-entrada-da-equipe-whatsapp': 'Caixa de Entrada da Equipe WhatsApp',
  'como-aumentar-as-vendas': 'Como Aumentar as Vendas: Estratégias Comprovadas',
  'eficiencia-de-vendas': 'Eficiência de Vendas: Dicas para Melhorar Performance',
  'ferramentas-do-whatsapp-business': 'Ferramentas do WhatsApp Business: Recursos Essenciais',
  'hubspot-conversation-analytics': 'HubSpot Conversation Analytics: Análise de Conversas',
  'rastreamento-de-vendas-do-whatsapp': 'Rastreamento de Vendas do WhatsApp',
  'relatorios-do-hubspot-para-whatsapp': 'Relatórios do HubSpot para WhatsApp',
  'sales-enablement': 'Sales Enablement: Capacitando sua Equipe de Vendas',
  'sincronizacao-de-bate-papo-do-whatsapp': 'Sincronização de Bate-Papo do WhatsApp',
  'whatsapp-hubspot-reporting': 'WhatsApp HubSpot Reporting: Guia de Integração',

  // Spanish blogs
  'los-mejores-agentes-de-inteligencia-artificial-para-atencion-al-cliente': 'Los Mejores Agentes de Inteligencia Artificial para Atención al Cliente',
  'analisis-de-conversaciones-de-hubspot': 'Análisis de Conversaciones de HubSpot',
  'analisis-del-rendimiento-de-ventas-de-whatsapp': 'Análisis del Rendimiento de Ventas de WhatsApp',
  'automatizacion-de-whatsapp': 'Automatización de WhatsApp: Guía Completa',
  'bandeja-de-entrada-del-equipo-de-whatsapp': 'Bandeja de Entrada del Equipo de WhatsApp',
  'como-aumentar-las-ventas': 'Cómo Aumentar las Ventas: Estrategias Probadas',
  'como-leer-mensajes-eliminados-en-whatsapp': 'Cómo Leer Mensajes Eliminados en WhatsApp',
  'desconectarse-de-whatsapp': 'Desconectarse de WhatsApp: Guía Paso a Paso',
  'eficiencia-de-ventas': 'Eficiencia de Ventas: Consejos para Mejorar',
  'habilitacion-de-ventas': 'Habilitación de Ventas: Capacitando a tu Equipo',
  'herramientas-de-whatsapp-business': 'Herramientas de WhatsApp Business',
  'informes-de-hubspot-para-whatsapp': 'Informes de HubSpot para WhatsApp',
  'seguimiento-de-ventas-de-whatsapp': 'Seguimiento de Ventas de WhatsApp',
  'sincronizacion-de-chat-de-whatsapp': 'Sincronización de Chat de WhatsApp',
  'whatsapp-sales-tracking': 'WhatsApp Sales Tracking: Monitorea y Mejora'
}

/**
 * Convert slug to readable title (fallback)
 */
function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Fetch actual content from live page using multiple strategies
 */
async function fetchBlogContent(url: string): Promise<{ title: string; description: string } | null> {
  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    })

    if (!response.ok) return null

    const html = await response.text()
    const $ = cheerio.load(html)

    // Try multiple title sources
    const title =
      $('h1').first().text().trim() ||
      $('meta[property="og:title"]').attr('content') ||
      $('[data-testid="blog-title"]').text().trim() ||
      $('.blog-title').text().trim() ||
      ''

    const description =
      $('meta[name="description"]').attr('content') ||
      $('meta[property="og:description"]').attr('content') ||
      ''

    if (title && title !== 'Eazybe - WhatsApp Sales Platform') {
      return { title, description }
    }
  } catch (error) {
    console.error(`Error fetching ${url}:`, error)
  }

  return null
}

/**
 * Main function to update blog titles
 */
async function updateBlogTitles() {
  console.log('🔧 Starting blog title updates...\n')

  // Fetch all blog posts from Sanity
  const blogs = await sanityClient.fetch(`
    *[_type == "blogPost"]{
      _id,
      title,
      "slug": slug.current,
      language
    }
  `)

  console.log(`Found ${blogs.length} blog posts in Sanity\n`)

  let updated = 0
  let skipped = 0
  let failed = 0

  for (const blog of blogs) {
    const slug = blog.slug
    const currentTitle = blog.title

    // Skip if already has a good title
    if (currentTitle && currentTitle !== 'Eazybe - WhatsApp Sales Platform') {
      console.log(`⊘ Skipping: ${slug} (already has title)`)
      skipped++
      continue
    }

    // Try to get title from mapping
    let newTitle = blogTitles[slug]

    // Fallback: try fetching from live page
    if (!newTitle) {
      const langMap: Record<string, string> = {
        'en': '',
        'pt-BR': '/br',
        'es': '/es'
      }

      const langPrefix = langMap[blog.language] || ''
      const liveUrl = `https://eazybe.com${langPrefix}/blog/${slug}`

      console.log(`🌐 Fetching from live: ${liveUrl}`)
      const content = await fetchBlogContent(liveUrl)

      if (content && content.title) {
        newTitle = content.title
      }
    }

    // Final fallback: generate from slug
    if (!newTitle) {
      newTitle = slugToTitle(slug)
      console.log(`⚠️  Using generated title for: ${slug}`)
    }

    try {
      // Update the blog post
      await sanityClient.patch(blog._id).set({
        title: newTitle,
        excerpt: blog.excerpt || `Read about ${newTitle} on Eazybe blog.`
      }).commit()

      console.log(`✓ Updated: ${slug}`)
      console.log(`  Old: ${currentTitle}`)
      console.log(`  New: ${newTitle}\n`)
      updated++

    } catch (error) {
      console.error(`✗ Failed to update ${slug}:`, error)
      failed++
    }
  }

  console.log('\n' + '='.repeat(60))
  console.log('📊 Update Summary')
  console.log('='.repeat(60))
  console.log(`Total blogs: ${blogs.length}`)
  console.log(`✓ Updated: ${updated}`)
  console.log(`⊘ Skipped: ${skipped}`)
  console.log(`✗ Failed: ${failed}`)
  console.log('='.repeat(60))
}

updateBlogTitles()
  .then(() => {
    console.log('\n✅ Blog title update completed!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Failed:', error)
    process.exit(1)
  })
