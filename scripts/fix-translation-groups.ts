import { createClient } from '@sanity/client'
import { config } from 'dotenv'

config()

const sanityClient = createClient({
  projectId: '5awzi0t4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.VITE_SANITY_API_TOKEN,
})

// Translation group mappings - add your posts here
const TRANSLATION_GROUPS = {
  'ai-agents-2026': [
    'best-ai-agents-customer-support',
    'los-mejores-agentes-de-inteligencia-artificial-para-atencion-al-cliente',
  ],
  'increase-sales-2026': [
    'how-to-increase-sales',
    'como-aumentar-las-ventas',
    'como-aumentar-as-vendas',
  ],
  'whatsapp-sales-tracking': [
    'whatsapp-sales-tracking',
    'seguimiento-de-ventas-de-whatsapp',
    'rastreamento-de-vendas-do-whatsapp',
    'whatsapp-satis-takibi',
  ],
  'whatsapp-team-inbox': [
    'whatsapp-team-inbox',
    'bandeja-de-entrada-del-equipo-de-whatsapp',
    'caixa-de-entrada-da-equipe-whatsapp',
    'whatsapp-ekip-gelen-kutusu',
  ],
  'whatsapp-business-tools': [
    'whatsapp-business-tools',
    'ferramentas-do-whatsapp-business',
    'herramientas-de-whatsapp-business',
    'whatsapp-isletme-araclari',
    'top-10-whatsapp-business-tools-faster-replies',
  ],
  'sales-efficiency': [
    'sales-efficiency',
    'eficiencia-de-ventas',
    'eficiencia-de-ventas',
    'satis-verimliligi',
  ],
  'whatsapp-automation': [
    'whatsapp-automation',
    'automacao-do-whatsapp',
    'automatizacion-de-whatsapp',
    'whatsapp-otomasyonu',
    'whatsapp-automation-best-practices-2024',
  ],
  'whatsapp-hubspot-reporting': [
    'whatsapp-hubspot-reporting',
    'relatorios-do-hubspot-para-whatsapp',
    'informes-de-hubspot-para-whatsapp',
    'hubspot-whatsapp-raporlamasi',
  ],
  'sales-performance-analytics': [
    'whatsapp-sales-performance-analytics',
    'analise-de-desempenho-de-vendas-do-whatsapp',
    'analisis-del-rendimiento-de-ventas-de-whatsapp',
    'whatsapp-satis-performansi-analizi',
  ],
  'hubspot-conversation-analytics': [
    'hubspot-conversation-analytics',
    'analise-de-conversacoes-do-hubspot',
    'analisis-de-conversaciones-de-hubspot',
    'hubspot-konusma-analitigi',
  ],
  'whatsapp-chat-sync': [
    'whatsapp-chat-sync',
    'sincronizacao-de-bate-papo-do-whatsapp',
    'sincronizacion-de-chat-de-whatsapp',
  ],
}

async function updateTranslationGroups() {
  console.log('🔧 Updating translation groups...\n')

  for (const [groupId, slugs] of Object.entries(TRANSLATION_GROUPS)) {
    console.log(`📦 Processing group: ${groupId}`)

    for (const slug of slugs) {
      try {
        // Find the post by slug
        const query = `*[_type == "blogPost" && slug.current == $slug][0]{_id, title, slug, language}`
        const post = await sanityClient.fetch(query, { slug })

        if (!post) {
          console.log(`   ⚠️  Not found: ${slug}`)
          continue
        }

        // Update the post with translationGroupId
        await sanityClient
          .patch(post._id)
          .set({ translationGroupId: groupId })
          .commit()

        const flag = {
          'en': '🇬🇧',
          'pt-BR': '🇧🇷',
          'es': '🇪🇸',
          'tr': '🇹🇷',
          'pt': '🇧🇷',
        }[post.language] || '🌐'

        console.log(`   ✅ ${flag} [${post.language}] ${post.title}`)
        console.log(`      Slug: ${slug} → Group: ${groupId}`)
      } catch (error) {
        console.error(`   ❌ Error updating ${slug}:`, error)
      }
    }
    console.log('')
  }

  console.log('✨ Translation groups updated!')
}

updateTranslationGroups().catch(console.error)
