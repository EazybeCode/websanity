/**
 * Fix duplicate translationGroupId: bestAiAgentsForCustomerSupportIn2026WhatActuallyWorksForRealTeams
 */

import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: '5awzi0t4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'skSZVkNDe8k5TuJi2Tld6H34XcnMqKi7lilBvkqb3yPyKf3oHEhohk2SnEqBLAYdYvCvfQxtcmjXuBEJcYE4MvfiIfl8ypfuAxnYp3aL2R12HWxewdfKkH3rywCejLzWdY8lxT4ggzXlqFTQZSdMzYEiG59ImYozOfuNBw5PuANtxQp28tSA'
});

async function fixBestAiAgentsDuplicate() {
  const targetGroupId = 'bestAiAgentsForCustomerSupportIn2026WhatActuallyWorksForRealTeams';

  console.log('🔍 Finding posts with translationGroupId:', targetGroupId, '\n');

  // Search for posts with this translationGroupId (case-insensitive)
  const query = `
    *[_type == "post" && translationGroupId match $pattern] {
      _id,
      _rev,
      title,
      "slug": slug.current,
      language,
      translationGroupId
    }
  `;

  const posts = await sanityClient.fetch(query, { pattern: 'ai-agents-for-customer-support' });

  if (!posts || posts.length === 0) {
    console.log('❌ No posts found\n');
    return;
  }

  console.log(`📊 Found ${posts.length} post(s) in "ai-agents-for-customer-support" group:\n`);

  // Group by exact translationGroupId
  const groupMap = new Map<string, any[]>();
  for (const post of posts) {
    const groupId = post.translationGroupId || 'no-group';
    if (!groupMap.has(groupId)) {
      groupMap.set(groupId, []);
    }
    groupMap.get(groupId)!.push(post);
  }

  for (const [groupId, groupPosts] of groupMap.entries()) {
    console.log(`\n📦 Translation Group: "${groupId}"`);
    console.log(`   Posts: ${groupPosts.length}\n`);

    groupPosts.forEach((post: any, idx: number) => {
      const isDraft = post._id.startsWith('drafts.');
      console.log(`   ${idx + 1}. _id: ${post._id}`);
      console.log(`      Title: ${post.title}`);
      console.log(`      Slug: ${post.slug}`);
      console.log(`      Language: ${post.language}`);
      console.log(`      Status: ${isDraft ? 'DRAFT' : 'PUBLISHED'}`);
      console.log('');
    });

    // Check for duplicate languages
    const languages = groupPosts.map(p => p.language);
    const uniqueLanguages = [...new Set(languages)];

    if (uniqueLanguages.length < groupPosts.length) {
      console.log(`   ⚠️  DUPLICATE LANGUAGES: ${languages.join(', ')}`);
      console.log(`   ⚠️  Need to remove duplicates\n`);
    }
  }

  // Find the actual duplicate and fix it
  console.log('════════════════════════════════════════════════════════════════');
  console.log('🔧 FIXING DUPLICATES');
  console.log('════════════════════════════════════════════════════════════════\n');

  for (const [groupId, groupPosts] of groupMap.entries()) {
    const languages = groupPosts.map(p => p.language);
    const uniqueLanguages = [...new Set(languages)];

    if (uniqueLanguages.length < groupPosts.length) {
      // Find which language is duplicated
      const langCounts = languages.reduce((acc: Record<string, any[]>, lang) => {
        if (!acc[lang]) acc[lang] = [];
        acc[lang].push(...groupPosts.filter(p => p.language === lang));
        return acc;
      }, {});

      for (const [lang, langPosts] of Object.entries(langCounts)) {
        if ((langPosts as any[]).length > 1) {
          console.log(`\n⚠️  Found ${langPosts.length} posts with language "${lang}":`);

          // Keep published, delete draft
          const sorted = (langPosts as any[]).sort((a, b) => {
            const aIsDraft = a._id.startsWith('drafts.');
            const bIsDraft = b._id.startsWith('drafts.');
            if (aIsDraft && !bIsDraft) return 1;
            if (!aIsDraft && bIsDraft) return -1;
            return 0;
          });

          const toKeep = sorted[0];
          const toDelete = sorted.slice(1);

          console.log(`   ✅ KEEP: ${toKeep._id} (${toKeep.title})`);
          console.log(`   🗑️  DELETE: ${toDelete.map(p => p._id).join(', ')}\n`);

          console.log('⏳ Deleting in 3 seconds (Ctrl+C to cancel)...');
          await new Promise(resolve => setTimeout(resolve, 3000));

          for (const post of toDelete) {
            try {
              await sanityClient.delete(post._id);
              console.log(`✅ Deleted: ${post._id}`);
            } catch (error) {
              console.error(`❌ Failed to delete ${post._id}:`, error);
            }
          }
          console.log('');
        }
      }
    }
  }

  console.log('✅ Fix complete! Please refresh Sanity Studio to verify.\n');
}

fixBestAiAgentsDuplicate().catch(console.error);
