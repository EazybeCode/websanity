/**
 * Find all posts with matching translationGroupId variations
 * The error ID: whatsappAiAgentsWork4XFasterWithoutHiringMoreStaff
 */

import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: '5awzi0t4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'skSZVkNDe8k5TuJi2Tld6H34XcnMqKi7lilBvkqb3yPyKf3oHEhohk2SnEqBLAYdYvCvfQxtcmjXuBEJcYE4MvfiIfl8ypfuAxnYp3aL2R12HWxewdfKkH3rywCejLzWdY8lxT4ggzXlqFTQZSdMzYEiG59ImYozOfuNBw5PuANtxQp28tSA'
});

async function findAllTranslationGroupVariations() {
  console.log('🔍 Searching for all translation group variations...\n');

  // Get ALL posts with their translationGroupId
  const query = `
    *[_type == "post"] {
      _id,
      title,
      "slug": slug.current,
      language,
      translationGroupId
    } | order(translationGroupId asc, language asc)
  `;

  const allPosts = await sanityClient.fetch(query);

  // Group by translationGroupId
  const groupMap = new Map<string, any[]>();

  for (const post of allPosts) {
    const groupId = post.translationGroupId || 'no-group';
    if (!groupMap.has(groupId)) {
      groupMap.set(groupId, []);
    }
    groupMap.get(groupId)!.push(post);
  }

  // Find groups with "whatsapp", "agent", "faster", or "4x"
  console.log('🔍 Translation Groups matching WhatsApp AI Agents:\n');
  console.log('═'.repeat(80));

  const targetKeywords = ['whatsapp', 'agent', 'faster', '4x'];
  let foundCount = 0;

  for (const [groupId, posts] of groupMap.entries()) {
    const lowerId = groupId.toLowerCase();
    const matches = targetKeywords.some(kw => lowerId.includes(kw));

    if (matches) {
      foundCount++;
      console.log(`\n📦 Translation Group: "${groupId}"`);
      console.log(`   Posts: ${posts.length}\n`);

      posts.forEach((post: any, idx: number) => {
        const isDraft = post._id.startsWith('drafts.');
        console.log(`   ${idx + 1}. _id: ${post._id}`);
        console.log(`      Title: ${post.title}`);
        console.log(`      Slug: ${post.slug}`);
        console.log(`      Language: ${post.language}`);
        console.log(`      Status: ${isDraft ? 'DRAFT' : 'PUBLISHED'}`);
        console.log('');
      });

      // Check for duplicate languages in this group
      const languages = posts.map(p => p.language);
      const uniqueLanguages = [...new Set(languages)];

      if (uniqueLanguages.length < posts.length) {
        console.log(`   ⚠️  DUPLICATE LANGUAGES FOUND IN THIS GROUP!`);
        console.log(`   Languages: ${languages.join(', ')}`);
        console.log(`   Unique: ${uniqueLanguages.join(', ')}`);
        console.log('');
      }
    }
  }

  if (foundCount === 0) {
    console.log('\n❌ No matching translation groups found.\n');
  }

  // Also check for posts with matching title/slug patterns
  console.log('\n\n🔍 Posts with "WhatsApp AI Agents" in title or slug:\n');
  console.log('═'.repeat(80));

  const titleMatches = allPosts.filter(p =>
    p.title?.toLowerCase().includes('whatsapp') &&
    p.title?.toLowerCase().includes('agent')
  );

  if (titleMatches.length > 0) {
    titleMatches.forEach((post: any, idx: number) => {
      const isDraft = post._id.startsWith('drafts.');
      console.log(`   ${idx + 1}. _id: ${post._id}`);
      console.log(`      Title: ${post.title}`);
      console.log(`      Slug: ${post.slug}`);
      console.log(`      Translation Group: ${post.translationGroupId || 'none'}`);
      console.log(`      Language: ${post.language}`);
      console.log(`      Status: ${isDraft ? 'DRAFT' : 'PUBLISHED'}`);
      console.log('');
    });
  } else {
    console.log('\n❌ No posts found with "WhatsApp AI Agents" in title.\n');
  }

  // Check for exact ID match
  const exactId = 'whatsappAiAgentsWork4XFasterWithoutHiringMoreStaff';
  console.log(`\n\n🔍 Exact search for: "${exactId}"\n`);
  console.log('═'.repeat(80));

  const exactMatches = allPosts.filter(p =>
    p.translationGroupId === exactId
  );

  if (exactMatches.length > 0) {
    console.log(`\n✅ Found ${exactMatches.length} post(s) with this exact ID:\n`);
    exactMatches.forEach((post: any, idx: number) => {
      const isDraft = post._id.startsWith('drafts.');
      console.log(`   ${idx + 1}. _id: ${post._id}`);
      console.log(`      Title: ${post.title}`);
      console.log(`      Slug: ${post.slug}`);
      console.log(`      Language: ${post.language}`);
      console.log(`      Status: ${isDraft ? 'DRAFT' : 'PUBLISHED'}`);
      console.log('');
    });
  } else {
    console.log(`\n❌ No posts found with translationGroupId = "${exactId}"`);
    console.log(`   The error might be from a cached structure or a different ID format.\n`);
  }

  // Summary of all problematic groups
  console.log('\n\n════════════════════════════════════════════════════════════════');
  console.log('📊 SUMMARY: All groups with potential issues');
  console.log('════════════════════════════════════════════════════════════════\n');

  for (const [groupId, posts] of groupMap.entries()) {
    if (posts.length > 1) {
      const languages = posts.map(p => p.language);
      const uniqueLanguages = [...new Set(languages)];

      if (uniqueLanguages.length < posts.length) {
        console.log(`⚠️  Group: "${groupId}"`);
        console.log(`   Has ${posts.length} posts but only ${uniqueLanguages.length} unique languages`);
        console.log(`   Duplicate languages: ${languages.filter((l, i) => languages.indexOf(l) !== i).join(', ')}`);
        console.log('');
      }
    }
  }
}

findAllTranslationGroupVariations().catch(console.error);
