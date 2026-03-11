/**
 * Quick fix: Delete the English draft duplicate for WhatsApp AI Agents post
 * This resolves the Sanity Studio duplicate ID error
 */

import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: '5awzi0t4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'skSZVkNDe8k5TuJi2Tld6H34XcnMqKi7lilBvkqb3yPyKf3oHEhohk2SnEqBLAYdYvCvfQxtcmjXuBEJcYE4MvfiIfl8ypfuAxnYp3aL2R12HWxewdfKkH3rywCejLzWdY8lxT4ggzXlqFTQZSdMzYEiG59ImYozOfuNBw5PuANtxQp28tSA'
});

async function deleteEnglishDuplicate() {
  const duplicateId = 'drafts.9dba6de2-e250-4dc8-a7ed-6fd3839d0da2';
  const slug = 'whatsapp-ai-agents-work-4x-faster-without-hiring-more-staff';

  console.log('🔍 Checking for the English draft duplicate...\n');

  // Verify the post exists first
  const query = `
    *[_id == $id] {
      _id,
      title,
      language,
      "slug": slug.current,
      translationGroupId
    }
  `;

  const post = await sanityClient.fetch(query, { id: duplicateId });

  if (!post) {
    console.log('❌ Post not found:', duplicateId);
    console.log('   It may have already been deleted.\n');
    return;
  }

  console.log('📋 Found post to delete:');
  console.log(`   _id: ${post._id}`);
  console.log(`   Title: ${post.title}`);
  console.log(`   Language: ${post.language}`);
  console.log(`   Slug: ${post.slug}`);
  console.log('');

  console.log('⏳ Deleting in 3 seconds (Ctrl+C to cancel)...');
  await new Promise(resolve => setTimeout(resolve, 3000));

  try {
    await sanityClient.delete(duplicateId);
    console.log(`\n✅ Successfully deleted: ${duplicateId}`);
    console.log('✅ The Sanity Studio error should now be resolved!\n');
    console.log('💡 Please refresh Sanity Studio to verify the fix.\n');
  } catch (error) {
    console.error('\n❌ Error deleting post:', error);
    console.error('\n💡 Manual fix:');
    console.error('   1. Go to https://www.sanity.io/manage/project/5awzi0t4/desk');
    console.error('   2. Find and delete the draft post:');
    console.error(`      _id: ${duplicateId}`);
    console.error(`      slug: ${slug}\n`);
  }
}

deleteEnglishDuplicate().catch(console.error);
