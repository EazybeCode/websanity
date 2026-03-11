/**
 * Check current state of duplicate titles in English posts
 * This is what the structure query sees
 */

import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: '5awzi0t4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'skSZVkNDe8k5TuJi2Tld6H34XcnMqKi7lilBvkqb3yPyKf3oHEhohk2SnEqBLAYdYvCvfQxtcmjXuBEJcYE4MvfiIfl8ypfuAxnYp3aL2R12HWxewdfKkH3rywCejLzWdY8lxT4ggzXlqFTQZSdMzYEiG59ImYozOfuNBw5PuANtxQp28tSA'
});

async function checkEnglishPosts() {
  console.log('🔍 Checking English posts (what the structure query sees)...\n');

  // This is the exact query from the structure configuration
  const query = `
    *[_type == "post" && language == "en"] | order(publishedAt desc) {
      _id,
      title,
      translationGroupId,
      "slug": slug.current,
      "translations": *[_type == "post" && translationGroupId == ^.translationGroupId && _id != ^._id]{_id, language, title}
    }
  `;

  const posts = await sanityClient.fetch(query);

  console.log(`📊 Found ${posts.length} English posts\n`);

  // Check for duplicate titles among English posts
  const titleMap = new Map<string, any[]>();

  for (const post of posts) {
    const title = post.title || 'Untitled';
    if (!titleMap.has(title)) {
      titleMap.set(title, []);
    }
    titleMap.get(title)!.push(post);
  }

  console.log('════════════════════════════════════════════════════════════════');
  console.log('🔍 DUPLICATE TITLES IN ENGLISH POSTS');
  console.log('════════════════════════════════════════════════════════════════\n');

  let hasDuplicates = false;
  for (const [title, postsWithTitle] of titleMap.entries()) {
    if (postsWithTitle.length > 1) {
      hasDuplicates = true;
      console.log(`⚠️  Duplicate title: "${title}"`);
      console.log(`   Count: ${postsWithTitle.length}\n`);

      postsWithTitle.forEach((post: any, idx: number) => {
        console.log(`   ${idx + 1}. _id: ${post._id}`);
        console.log(`      Translation Group: ${post.translationGroupId || 'none'}`);
        console.log(`      Translations: ${post.translations?.length || 0}`);
        console.log(`      Translation languages: ${post.translations?.map((t: any) => t.language).join(', ') || 'none'}`);
        console.log('');
      });
    }
  }

  if (!hasDuplicates) {
    console.log('✅ No duplicate titles in English posts!\n');
  }

  // Show the specific posts causing the error
  console.log('\n════════════════════════════════════════════════════════════════');
  console.log('🔍 POSTS RELATED TO ERROR: "bestAiAgentsForCustomerSupport..."');
  console.log('════════════════════════════════════════════════════════════════\n');

  const errorPosts = posts.filter(p =>
    p.title?.toLowerCase().includes('ai agents') &&
    p.title?.toLowerCase().includes('customer support')
  );

  if (errorPosts.length > 0) {
    errorPosts.forEach((post: any, idx: number) => {
      console.log(`${idx + 1}. Title: ${post.title}`);
      console.log(`   _id: ${post._id}`);
      console.log(`   Translation Group: ${post.translationGroupId || 'none'}`);
      console.log(`   Translations: ${post.translations?.length || 0}\n`);

      if (post.translations && post.translations.length > 0) {
        post.translations.forEach((t: any) => {
          console.log(`      ↳ Translation: ${t.title}`);
          console.log(`         _id: ${t._id}`);
          console.log(`         Language: ${t.language}\n`);
        });
      }
    });
  } else {
    console.log('❌ No posts found with "ai agents" and "customer support" in title\n');
  }
}

checkEnglishPosts().catch(console.error);
