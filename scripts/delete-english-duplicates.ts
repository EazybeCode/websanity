/**
 * Delete duplicate English posts that are causing structure errors
 */

import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: '5awzi0t4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'skSZVkNDe8k5TuJi2Tld6H34XcnMqKi7lilBvkqb3yPyKf3oHEhohk2SnEqBLAYdYvCvfQxtcmjXuBEJcYE4MvfiIfl8ypfuAxnYp3aL2R12HWxewdfKkH3rywCejLzWdY8lxT4ggzXlqFTQZSdMzYEiG59ImYozOfuNBw5PuANtxQp28tSA'
});

async function deleteEnglishDuplicates() {
  const duplicates = [
    {
      id: 'drafts.blogPost-connect-better-the-easy-way-to-whatsapp-web-login',
      title: 'How to Use WhatsApp Reminders to Build Stronger Client Relationships',
      reason: 'Duplicate draft (published version exists)'
    },
    {
      id: 'blogPost-top-10-whatsapp-business-tools',
      title: 'Top 10 WhatsApp Business Tools You Need For Faster Customer Replies',
      reason: 'Duplicate published (another published version exists with translations)'
    }
  ];

  console.log('🗑️  Deleting duplicate English posts...\n');
  console.log('════════════════════════════════════════════════════════════════\n');

  for (const dup of duplicates) {
    console.log(`📋 ${dup.title}`);
    console.log(`   _id: ${dup.id}`);
    console.log(`   Reason: ${dup.reason}\n`);

    // Verify the post exists first
    const post = await sanityClient.fetch(`*[_id == $id]{_id, title}[0]`, { id: dup.id });

    if (!post) {
      console.log(`   ✅ Already deleted or doesn't exist\n\n`);
      continue;
    }

    console.log('⏳ Deleting in 3 seconds (Ctrl+C to cancel)...');
    await new Promise(resolve => setTimeout(resolve, 3000));

    try {
      await sanityClient.delete(dup.id);
      console.log(`   ✅ Deleted successfully\n\n`);
    } catch (error) {
      console.error(`   ❌ Failed to delete:`, error);
      console.error('');
    }
  }

  console.log('════════════════════════════════════════════════════════════════');
  console.log('✅ Cleanup complete!');
  console.log('');
  console.log('📋 NEXT STEPS:');
  console.log('1. Deploy Sanity Studio to apply the config changes:');
  console.log('   cd sanity-studio && npx sanity deploy');
  console.log('');
  console.log('2. Refresh your Sanity Studio');
  console.log('');
  console.log('3. The errors should now be gone!\n');
}

deleteEnglishDuplicates().catch(console.error);
