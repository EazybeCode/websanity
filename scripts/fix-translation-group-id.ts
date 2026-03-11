/**
 * Fix the cached translationGroupId by updating the Spanish draft
 * This should resolve the Sanity Studio structure error
 */

import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: '5awzi0t4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'skSZVkNDe8k5TuJi2Tld6H34XcnMqKi7lilBvkqb3yPyKf3oHEhohk2SnEqBLAYdYvCvfQxtcmjXuBEJcYE4MvfiIfl8ypfuAxnYp3aL2R12HWxewdfKkH3rywCejLzWdY8lxT4ggzXlqFTQZSdMzYEiG59ImYozOfuNBw5PuANtxQp28tSA'
});

async function fixTranslationGroupId() {
  const postId = 'drafts.4f6eace7-9584-4fac-92e3-46e7a8a7f151';
  const newGroupId = 'whatsapp-ai-agents-work-faster-2026'; // New unique ID

  console.log('🔧 Updating translationGroupId for Spanish draft...\n');

  // Fetch current post
  const current = await sanityClient.fetch(`*[_id == $id]{_id, title, translationGroupId}[0]`, { id: postId });

  if (!current) {
    console.log('❌ Post not found:', postId);
    return;
  }

  console.log('Current state:');
  console.log(`   _id: ${current._id}`);
  console.log(`   Title: ${current.title}`);
  console.log(`   Translation Group: ${current.translationGroupId || 'none'}`);
  console.log('');

  console.log('Updating to:');
  console.log(`   Translation Group: ${newGroupId}`);
  console.log('');
  console.log('⏳ Executing in 3 seconds (Ctrl+C to cancel)...');
  await new Promise(resolve => setTimeout(resolve, 3000));

  try {
    const patch = sanityClient
      .patch(postId)
      .set({ translationGroupId: newGroupId });

    await patch.commit();
    console.log('\n✅ Successfully updated translationGroupId!');
    console.log('✅ Please refresh Sanity Studio to verify the fix.\n');
  } catch (error) {
    console.error('\n❌ Error updating post:', error);
    console.error('\n💡 Manual fix:');
    console.error('   1. Open Sanity Studio');
    console.error('   2. Find the Spanish draft:');
    console.error(`      _id: ${postId}`);
    console.error(`      Title: ${current.title}`);
    console.error('   3. Update the "Translation Group ID" field to: ' + newGroupId);
    console.error('   4. Save and refresh the Studio\n');
  }
}

fixTranslationGroupId().catch(console.error);
