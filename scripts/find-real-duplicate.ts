/**
 * Find the actual duplicate causing the Sanity Studio error
 * Error ID: whatsappAiAgentsWork4XFasterWithoutHiringMoreStaff
 */

import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: '5awzi0t4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'skSZVkNDe8k5TuJi2Tld6H34XcnMqKi7lilBvkqb3yPyKf3oHEhohk2SnEqBLAYdYvCvfQxtcmjXuBEJcYE4MvfiIfl8ypfuAxnYp3aL2R12HWxewdfKkH3rywCejLzWdY8lxT4ggzXlqFTQZSdMzYEiG59ImYozOfuNBw5PuANtxQp28tSA'
});

async function findRealDuplicate() {
  const targetId = 'whatsappAiAgentsWork4XFasterWithoutHiringMoreStaff';

  console.log('🔍 Searching for posts with translationGroupId or ID containing:', targetId, '\n');

  // Search by translationGroupId (exact match)
  const query1 = `
    *[_type == "post" && translationGroupId == $targetId] {
      _id,
      _rev,
      title,
      "slug": slug.current,
      language,
      translationGroupId,
      publishedAt
    } | order(language asc)
  `;

  const exactMatches = await sanityClient.fetch(query1, { targetId });

  if (exactMatches && exactMatches.length > 0) {
    console.log('✅ Found exact matches by translationGroupId:');
    exactMatches.forEach((post: any, idx: number) => {
      const isDraft = post._id.startsWith('drafts.');
      console.log(`   ${idx + 1}. _id: ${post._id}`);
      console.log(`      Slug: ${post.slug}`);
      console.log(`      Language: ${post.language}`);
      console.log(`      Status: ${isDraft ? 'DRAFT' : 'PUBLISHED'}`);
      console.log('');
    });
  } else {
    console.log('❌ No exact matches found for translationGroupId:', targetId, '\n');
  }

  // Search for similar IDs (case-insensitive, partial match)
  const query2 = `
    *[_type == "post" && translationGroupId match $pattern] {
      _id,
      _rev,
      title,
      "slug": slug.current,
      language,
      translationGroupId,
      publishedAt
    } | order(language asc)
  `;

  const pattern = 'whatsapp.*faster';
  const similarMatches = await sanityClient.fetch(query2, { pattern });

  if (similarMatches && similarMatches.length > 0) {
    console.log('🔍 Found similar matches (pattern: whatsapp.*faster):');
    similarMatches.forEach((post: any, idx: number) => {
      const isDraft = post._id.startsWith('drafts.');
      console.log(`   ${idx + 1}. _id: ${post._id}`);
      console.log(`      Slug: ${post.slug}`);
      console.log(`      Language: ${post.language}`);
      console.log(`      Translation Group: ${post.translationGroupId || 'none'}`);
      console.log(`      Status: ${isDraft ? 'DRAFT' : 'PUBLISHED'}`);
      console.log('');
    });
  }

  // Search all posts with "whatsapp" and "agent" in title or slug
  const query3 = `
    *[_type == "post" && (title match "whatsapp" + "agent" || slug.current match "whatsapp" + "agent")] {
      _id,
      _rev,
      title,
      "slug": slug.current,
      language,
      translationGroupId,
      publishedAt
    } | order(language asc)
  `;

  const titleMatches = await sanityClient.fetch(query3);

  if (titleMatches && titleMatches.length > 0) {
    console.log('🔍 Found posts with "whatsapp" and "agent" in title/slug:');
    titleMatches.forEach((post: any, idx: number) => {
      const isDraft = post._id.startsWith('drafts.');
      console.log(`   ${idx + 1}. _id: ${post._id}`);
      console.log(`      Title: ${post.title}`);
      console.log(`      Slug: ${post.slug}`);
      console.log(`      Language: ${post.language}`);
      console.log(`      Translation Group: ${post.translationGroupId || 'none'}`);
      console.log(`      Status: ${isDraft ? 'DRAFT' : 'PUBLISHED'}`);
      console.log('');
    });
  }

  // Group by translationGroupId to find duplicates
  const query4 = `
    *[_type == "post"] {
      _id,
      "slug": slug.current,
      language,
      translationGroupId
    }
  `;

  const allPosts = await sanityClient.fetch(query4);
  const groupMap = new Map<string, any[]>();

  for (const post of allPosts) {
    if (post.translationGroupId) {
      if (!groupMap.has(post.translationGroupId)) {
        groupMap.set(post.translationGroupId, []);
      }
      groupMap.get(post.translationGroupId)!.push(post);
    }
  }

  // Find groups with duplicate languages
  console.log('════════════════════════════════════════════════════════════════');
  console.log('🔍 Translation Groups with Duplicate Languages:');
  console.log('════════════════════════════════════════════════════════════════\n');

  let foundIssue = false;
  for (const [groupId, posts] of groupMap.entries()) {
    if (posts.length > 1) {
      const languages = posts.map(p => p.language);
      const uniqueLanguages = [...new Set(languages)];

      if (uniqueLanguages.length < posts.length) {
        foundIssue = true;
        console.log(`⚠️  Translation Group: ${groupId}`);
        console.log(`   Posts: ${posts.length}`);
        posts.forEach((post: any, idx: number) => {
          const isDraft = post._id.startsWith('drafts.');
          console.log(`   ${idx + 1}. ${post._id} - ${post.language} ${isDraft ? '(DRAFT)' : '(PUBLISHED)'}`);
        });
        console.log('');
      }
    }
  }

  if (!foundIssue) {
    console.log('✅ No duplicate languages found in translation groups!\n');
  }
}

findRealDuplicate().catch(console.error);
