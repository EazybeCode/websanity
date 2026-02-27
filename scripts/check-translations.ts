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

async function checkTranslations() {
  console.log('🔍 Checking blog post translations...\n')

  // Get all blog posts with translation info
  const query = `*[_type == "blogPost"]{
    title,
    "slug": slug.current,
    language,
    translationGroupId,
    publishedAt
  } | order(publishedAt desc)`

  const posts = await sanityClient.fetch(query)

  // Group by translationGroupId
  const grouped = new Map<string, typeof posts>()

  posts.forEach((post: any) => {
    const groupId = post.translationGroupId || 'NO_GROUP'
    if (!grouped.has(groupId)) {
      grouped.set(groupId, [])
    }
    grouped.get(groupId)!.push(post)
  })

  // Display results
  console.log(`📊 Total posts: ${posts.length}`)
  console.log(`📦 Translation groups: ${grouped.size}\n`)

  // Show posts without translation group
  const noGroup = grouped.get('NO_GROUP') || []
  if (noGroup.length > 0) {
    console.log('⚠️  Posts WITHOUT translationGroupId:')
    noGroup.forEach((post: any) => {
      console.log(`   [${post.language}] ${post.title}`)
      console.log(`   Slug: ${post.slug}`)
      console.log('')
    })
  }

  // Show translation groups
  console.log('✅ Posts WITH translationGroupId:')
  for (const [groupId, posts] of grouped.entries()) {
    if (groupId === 'NO_GROUP') continue

    console.log(`\n📦 Group: ${groupId}`)
    posts.forEach((post: any) => {
      const flag = {
        'en': '🇬🇧',
        'pt-BR': '🇧🇷',
        'es': '🇪🇸',
        'tr': '🇹🇷',
      }[post.language] || '🌐'

      console.log(`   ${flag} [${post.language}] ${post.title}`)
      console.log(`   Slug: ${post.slug}`)
    })
  }

  // Check for incomplete groups
  console.log('\n\n📋 Incomplete Translation Groups (missing languages):')
  for (const [groupId, posts] of grouped.entries()) {
    if (groupId === 'NO_GROUP') continue

    const languages = posts.map((p: any) => p.language)
    const missing = []

    if (!languages.includes('en')) missing.push('English (en)')
    if (!languages.includes('pt-BR')) missing.push('Portuguese (pt-BR)')
    if (!languages.includes('es')) missing.push('Spanish (es)')
    if (!languages.includes('tr')) missing.push('Turkish (tr)')

    if (missing.length > 0) {
      console.log(`\n📦 Group: ${groupId}`)
      console.log(`   Missing: ${missing.join(', ')}`)
    }
  }
}

checkTranslations().catch(console.error)
