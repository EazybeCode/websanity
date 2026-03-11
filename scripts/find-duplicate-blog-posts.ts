/**
 * Find and fix duplicate blog posts in Sanity CMS
 * This script identifies posts with duplicate slugs or translationGroupIds
 */

import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: '5awzi0t4',
  dataset: 'production',
  useCdn: false, // Must use CDN=false for writes
  apiVersion: '2024-01-01',
  token: 'skSZVkNDe8k5TuJi2Tld6H34XcnMqKi7lilBvkqb3yPyKf3oHEhohk2SnEqBLAYdYvCvfQxtcmjXuBEJcYE4MvfiIfl8ypfuAxnYp3aL2R12HWxewdfKkH3rywCejLzWdY8lxT4ggzXlqFTQZSdMzYEiG59ImYozOfuNBw5PuANtxQp28tSA'
});

async function findDuplicates() {
  console.log('🔍 Searching for duplicate blog posts...\n');

  // Find all blog posts
  const query = `
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      _rev,
      title,
      "slug": slug.current,
      language,
      translationGroupId,
      publishedAt
    }
  `;

  const posts = await sanityClient.fetch(query);
  console.log(`📊 Found ${posts.length} total blog posts\n`);

  // Check for duplicates by slug
  const slugMap = new Map<string, any[]>();
  const translationGroupMap = new Map<string, any[]>();

  for (const post of posts) {
    // Group by slug
    if (!slugMap.has(post.slug)) {
      slugMap.set(post.slug, []);
    }
    slugMap.get(post.slug)!.push(post);

    // Group by translationGroupId
    if (post.translationGroupId) {
      if (!translationGroupMap.has(post.translationGroupId)) {
        translationGroupMap.set(post.translationGroupId, []);
      }
      translationGroupMap.get(post.translationGroupId)!.push(post);
    }
  }

  // Find duplicates by slug
  console.log('🔍 DUPLICATES BY SLUG:');
  console.log('═'.repeat(80));
  let slugDuplicates = 0;
  for (const [slug, postList] of slugMap.entries()) {
    if (postList.length > 1) {
      slugDuplicates++;
      console.log(`\n⚠️  Slug "${slug}" has ${postList.length} posts:`);
      postList.forEach((post, idx) => {
        console.log(`   ${idx + 1}. _id: ${post._id}`);
        console.log(`      Language: ${post.language}`);
        console.log(`      Title: ${post.title}`);
        console.log(`      Published: ${post.publishedAt}`);
        console.log(`      Translation Group: ${post.translationGroupId || 'none'}`);
      });
    }
  }

  if (slugDuplicates === 0) {
    console.log('✅ No duplicates found by slug!\n');
  } else {
    console.log(`\n❌ Found ${slugDuplicates} duplicate(s) by slug\n`);
  }

  // Find duplicates by translationGroupId
  console.log('\n🔍 DUPLICATES BY TRANSLATION GROUP ID:');
  console.log('═'.repeat(80));
  let groupDuplicates = 0;
  for (const [groupId, postList] of translationGroupMap.entries()) {
    if (postList.length > 2) { // More than 2 languages indicates a problem
      groupDuplicates++;
      console.log(`\n⚠️  Translation Group "${groupId}" has ${postList.length} posts (expected max 4):`);
      postList.forEach((post, idx) => {
        console.log(`   ${idx + 1}. _id: ${post._id}`);
        console.log(`      Language: ${post.language}`);
        console.log(`      Slug: ${post.slug}`);
        console.log(`      Title: ${post.title}`);
      });
    } else if (postList.length > 1) {
      // Check if same language appears twice in group
      const languages = postList.map(p => p.language);
      const uniqueLanguages = [...new Set(languages)];
      if (uniqueLanguages.length < postList.length) {
        groupDuplicates++;
        console.log(`\n⚠️  Translation Group "${groupId}" has duplicate languages:`);
        postList.forEach((post, idx) => {
          console.log(`   ${idx + 1}. _id: ${post._id}`);
          console.log(`      Language: ${post.language}`);
          console.log(`      Slug: ${post.slug}`);
        });
      }
    }
  }

  if (groupDuplicates === 0) {
    console.log('✅ No issues found with translation groups!\n');
  } else {
    console.log(`\n❌ Found ${groupDuplicates} translation group issue(s)\n`);
  }

  // Specific check for the reported issue
  console.log('\n🔍 SPECIFIC CHECK: whatsappAiAgentsWork4XFasterWithoutHiringMoreStaff');
  console.log('═'.repeat(80));
  const problematicPosts = posts.filter(p =>
    p.slug === 'whatsapp-ai-agents-work-4x-faster-without-hiring-more-staff' ||
    p.translationGroupId === 'whatsappAiAgentsWork4XFasterWithoutHiringMoreStaff' ||
    p.slug?.toLowerCase().includes('whatsapp') && p.slug?.toLowerCase().includes('faster')
  );

  if (problematicPosts.length > 0) {
    console.log(`\n🎯 Found ${problematicPosts.length} related post(s):\n`);
    problematicPosts.forEach((post, idx) => {
      console.log(`   ${idx + 1}. _id: ${post._id}`);
      console.log(`      Slug: ${post.slug}`);
      console.log(`      Title: ${post.title}`);
      console.log(`      Language: ${post.language}`);
      console.log(`      Translation Group: ${post.translationGroupId || 'none'}`);
      console.log('');
    });
  } else {
    console.log('\n✅ No problematic posts found\n');
  }

  return {
    totalPosts: posts.length,
    slugDuplicates,
    groupDuplicates,
    problematicPosts
  };
}

async function fixDuplicateTranslationGroup(posts: any[]) {
  console.log('\n🔧 PROPOSED FIX:');
  console.log('═'.repeat(80));

  if (posts.length < 2) {
    console.log('❌ Not enough duplicates to fix\n');
    return;
  }

  // Find which languages are represented
  const languages = posts.map(p => p.language);
  const languageCounts = languages.reduce((acc, lang) => {
    acc[lang] = (acc[lang] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Identify which language has duplicates
  const duplicateLanguages = Object.entries(languageCounts)
    .filter(([_, count]) => count > 1)
    .map(([lang, _]) => lang);

  if (duplicateLanguages.length === 0) {
    console.log('✅ No language duplicates found - each post has unique language\n');
    console.log('💡 If you still see errors, check if translationGroupId needs to be set');
    return;
  }

  console.log(`\n⚠️  Duplicate languages found: ${duplicateLanguages.join(', ')}`);
  console.log('\nRecommended action:');
  console.log('1. Review the posts below to determine which one to keep');
  console.log('2. Update the duplicate to have a unique translationGroupId');
  console.log('3. Or delete the duplicate if it\'s outdated\n');

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    console.log(`Post ${i + 1} (_id: ${post._id}):`);
    console.log(`  - Language: ${post.language}`);
    console.log(`  - Slug: ${post.slug}`);
    console.log(`  - Title: ${post.title}`);
    console.log(`  - Published: ${post.publishedAt}`);
    console.log('');
  }

  console.log('To fix manually in Sanity Studio:');
  console.log('1. Open https://www.sanity.io/manage/project/5awzi0t4');
  console.log('2. Go to Studio > Blog Post');
  console.log('3. Search for the problematic post');
  console.log('4. Either:');
  console.log('   a. Update the translationGroupId to be unique, or');
  console.log('   b. Delete the duplicate document\n');
}

async function main() {
  try {
    const results = await findDuplicates();

    if (results.problematicPosts.length > 0) {
      await fixDuplicateTranslationGroup(results.problematicPosts);
    }

    console.log('═'.repeat(80));
    console.log('\n📋 SUMMARY:');
    console.log(`   Total posts: ${results.totalPosts}`);
    console.log(`   Slug duplicates: ${results.slugDuplicates}`);
    console.log(`   Translation group issues: ${results.groupDuplicates}`);
    console.log('\n');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main();
