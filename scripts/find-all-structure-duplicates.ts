/**
 * Find ALL translation groups with potential issues
 * Checks for duplicate languages, missing translationGroupIds, etc.
 */

import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: '5awzi0t4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'skSZVkNDe8k5TuJi2Tld6H34XcnMqKi7lilBvkqb3yPyKf3oHEhohk2SnEqBLAYdYvCvfQxtcmjXuBEJcYE4MvfiIfl8ypfuAxnYp3aL2R12HWxewdfKkH3rywCejLzWdY8lxT4ggzXlqFTQZSdMzYEiG59ImYozOfuNBw5PuANtxQp28tSA'
});

async function findAllStructureIssues() {
  console.log('🔍 Finding ALL translation group structure issues...\n');

  // Get all posts
  const query = `
    *[_type == "post"] {
      _id,
      title,
      "slug": slug.current,
      language,
      translationGroupId
    } | order(translationGroupId asc)
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

  console.log('════════════════════════════════════════════════════════════════');
  console.log('📊 ISSUES FOUND');
  console.log('════════════════════════════════════════════════════════════════\n');

  let issueCount = 0;

  for (const [groupId, posts] of groupMap.entries()) {
    if (groupId === 'no-group') continue;

    const languages = posts.map(p => p.language);
    const uniqueLanguages = [...new Set(languages)];

    // Check for duplicate languages
    if (uniqueLanguages.length < posts.length) {
      issueCount++;
      console.log(`⚠️  ${issueCount}. Duplicate languages in group: "${groupId}"`);
      console.log(`   Posts: ${posts.length}`);
      console.log(`   Languages: ${languages.join(', ')}`);
      console.log(`   Unique: ${uniqueLanguages.join(', ')}\n`);

      posts.forEach((post: any, idx: number) => {
        const isDraft = post._id.startsWith('drafts.');
        console.log(`   ${idx + 1}. ${post._id} - ${post.language} ${isDraft ? '(DRAFT)' : '(PUBLISHED)'}`);
      });
      console.log('');
    }

    // Check for posts without translationGroupId but have translations
    if (groupId === 'no-group' && posts.length > 5) {
      issueCount++;
      console.log(`⚠️  ${issueCount}. Many posts without translationGroupId (${posts.length} posts)\n`);
    }
  }

  if (issueCount === 0) {
    console.log('✅ No duplicate language issues found in translation groups!\n');
  }

  // Check for the specific error ID patterns
  console.log('\n════════════════════════════════════════════════════════════════');
  console.log('🔍 SEARCHING FOR SPECIFIC ERROR ID PATTERNS');
  console.log('════════════════════════════════════════════════════════════════\n');

  // The error comes from Sanity structure trying to use title as ID
  // Let's check if any posts have similar titles that could cause conflicts
  const titleMap = new Map<string, any[]>();

  for (const post of allPosts) {
    // Normalize title for comparison (remove spaces, special chars)
    const normalizedTitle = post.title
      ?.toLowerCase()
      .replace(/[^a-z0-9]/g, '');

    if (normalizedTitle) {
      if (!titleMap.has(normalizedTitle)) {
        titleMap.set(normalizedTitle, []);
      }
      titleMap.get(normalizedTitle)!.push(post);
    }
  }

  // Find duplicate normalized titles
  for (const [normalizedTitle, posts] of titleMap.entries()) {
    if (posts.length > 1) {
      console.log(`⚠️  Duplicate normalized title: "${normalizedTitle}"`);
      console.log(`   Posts: ${posts.length}\n`);

      posts.forEach((post: any, idx: number) => {
        console.log(`   ${idx + 1}. ${post.title}`);
        console.log(`      _id: ${post._id}`);
        console.log(`      Language: ${post.language}`);
        console.log(`      Translation Group: ${post.translationGroupId || 'none'}`);
        console.log('');
      });
    }
  }

  // Summary
  console.log('\n════════════════════════════════════════════════════════════════');
  console.log('📋 SUMMARY');
  console.log('════════════════════════════════════════════════════════════════\n');
  console.log(`Total posts: ${allPosts.length}`);
  console.log(`Translation groups: ${groupMap.size - 1}`); // -1 for 'no-group'
  console.log(`Groups with duplicate languages: ${issueCount}`);
  console.log(`\nIf issueCount is 0, the error might be from:`);
  console.log(`1. Cached Sanity Studio data - try hard refresh (Ctrl+Shift+R)`);
  console.log(`2. Browser cache - clear site data in DevTools`);
  console.log(`3. Sanity CDN cache - wait a few minutes for cache to clear\n`);
}

findAllStructureIssues().catch(console.error);
