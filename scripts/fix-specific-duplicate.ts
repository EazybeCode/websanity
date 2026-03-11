/**
 * Fix the specific duplicate post causing the Sanity Studio error
 * Target: whatsapp-ai-agents-work-4x-faster-without-hiring-more-staff
 *
 * Error: "List items with same ID found (whatsappAiAgentsWork4XFasterWithoutHiringMoreStaff)"
 */

import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: '5awzi0t4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'skSZVkNDe8k5TuJi2Tld6H34XcnMqKi7lilBvkqb3yPyKf3oHEhohk2SnEqBLAYdYvCvfQxtcmjXuBEJcYE4MvfiIfl8ypfuAxnYp3aL2R12HWxewdfKkH3rywCejLzWdY8lxT4ggzXlqFTQZSdMzYEiG59ImYozOfuNBw5PuANtxQp28tSA'
});

async function fixSpecificDuplicate() {
  const targetSlug = 'whatsapp-ai-agents-work-4x-faster-without-hiring-more-staff';

  console.log('🔍 Finding duplicates for:', targetSlug, '\n');

  const query = `
    *[_type == "post" && slug.current == $slug] {
      _id,
      _rev,
      title,
      "slug": slug.current,
      language,
      translationGroupId,
      publishedAt
    }
  `;

  const posts = await sanityClient.fetch(query, { slug: targetSlug });

  if (!posts || posts.length === 0) {
    console.log('❌ No posts found with slug:', targetSlug);
    return;
  }

  console.log(`📊 Found ${posts.length} post(s) with this slug:\n`);

  posts.forEach((post: any, idx: number) => {
    const isDraft = post._id.startsWith('drafts.');
    console.log(`   ${idx + 1}. _id: ${post._id}`);
    console.log(`      Language: ${post.language}`);
    console.log(`      Title: ${post.title}`);
    console.log(`      Translation Group: ${post.translationGroupId || 'none'}`);
    console.log(`      Status: ${isDraft ? 'DRAFT' : 'PUBLISHED'}`);
    console.log(`      Published: ${post.publishedAt || 'never'}`);
    console.log('');
  });

  if (posts.length === 1) {
    console.log('✅ Only one post found - no duplicates to fix!\n');
    return;
  }

  // Determine which to keep and which to delete
  // Strategy: Keep the Spanish one since it was created first (appears first in results)
  // Or prefer one with translationGroupId set

  const sortedPosts = [...posts].sort((a, b) => {
    // Prefer draft with translationGroupId
    if (a.translationGroupId && !b.translationGroupId) return -1;
    if (!a.translationGroupId && b.translationGroupId) return 1;

    // Both have or don't have translationGroupId, prefer Spanish (es) for this content
    if (a.language === 'es' && b.language !== 'es') return -1;
    if (a.language !== 'es' && b.language === 'es') return 1;

    return 0;
  });

  const toKeep = sortedPosts[0];
  const toDelete = sortedPosts.slice(1);

  console.log('════════════════════════════════════════════════════════════════');
  console.log('📋 PROPOSED FIX:');
  console.log('════════════════════════════════════════════════════════════════\n');

  console.log('✅ KEEP:');
  console.log(`   _id: ${toKeep._id}`);
  console.log(`   Language: ${toKeep.language}`);
  console.log(`   Title: ${toKeep.title}`);
  console.log(`   Translation Group: ${toKeep.translationGroupId || 'none'}\n`);

  if (toDelete.length > 0) {
    console.log('🗑️  DELETE:');
    toDelete.forEach((post: any, idx: number) => {
      console.log(`   ${idx + 1}. _id: ${post._id}`);
      console.log(`      Language: ${post.language}`);
      console.log(`      Title: ${post.title}`);
      console.log(`      Translation Group: ${post.translationGroupId || 'none'}`);
    });
    console.log('');
  }

  // For the English draft, we should update its slug to be unique
  // rather than deleting it, since it's a different language
  const englishPost = posts.find((p: any) => p.language === 'en');
  const spanishPost = posts.find((p: any) => p.language === 'es');

  if (englishPost && spanishPost && englishPost._id !== spanishPost._id) {
    console.log('💡 BETTER SOLUTION:');
    console.log('   Since these are different language versions, we should:');
    console.log('   1. Keep the Spanish version (es) with current slug');
    console.log('   2. Update the English version to have a language-specific slug\n');

    console.log('⚠️  This requires updating the slug in Sanity Studio manually:');
    console.log('   1. Go to https://www.sanity.io/manage/project/5awzi0t4/desk');
    console.log('   2. Open the English draft');
    console.log('   3. Change slug from: whatsapp-ai-agents-work-4x-faster-without-hiring-more-staff');
    console.log('   4. To: en-whatsapp-ai-agents-work-4x-faster-without-hiring-more-staff');
    console.log('   5. Or delete the English draft if it\'s not needed\n');

    return;
  }

  // If they're the same language, delete the duplicate
  console.log('⏳ Proceeding with deletion in 5 seconds (Ctrl+C to cancel)...');
  await new Promise(resolve => setTimeout(resolve, 5000));

  for (const post of toDelete) {
    try {
      await sanityClient.delete(post._id);
      console.log(`✅ Deleted: ${post._id}`);
    } catch (error) {
      console.error(`❌ Failed to delete ${post._id}:`, error);
    }
  }

  console.log('\n✅ Fix complete! Please refresh Sanity Studio to verify.\n');
}

fixSpecificDuplicate().catch(console.error);
