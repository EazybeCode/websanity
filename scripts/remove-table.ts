import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config();

const client = createClient({
  projectId: '5awzi0t4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

async function removeTable() {
  const slug = 'best-ai-agents-for-customer-support';

  console.log('🗑️ REMOVING TABLE FROM BLOG POST...\n');

  const query = `*[_type == "post" && slug.current == $slug && language == "en"][0]{
    _id,
    title,
    body
  }`;

  try {
    const post = await client.fetch(query, { slug });

    if (!post) {
      console.log('❌ Blog post not found!');
      return;
    }

    console.log('📄 Blog post:', post.title);

    // Find and remove the table block
    let tableFound = false;
    let tableIndex = -1;

    post.body?.forEach((block, index) => {
      if (block._type === 'table') {
        tableFound = true;
        tableIndex = index;
        console.log(`📊 Found table at index ${index}`);
      }
    });

    if (tableFound) {
      console.log(`🔄 Removing table at index ${tableIndex}...`);

      // Remove the table block
      const updatedBody = post.body.filter((block, index) => index !== tableIndex);

      console.log('🔄 Updating blog post...');
      const patchResult = await client
        .patch(post._id)
        .set({ body: updatedBody })
        .commit();

      console.log('✅ SUCCESS! Table removed from blog post!');
      console.log('📝 Document ID:', patchResult._id);
      console.log('🔄 Revision:', patchResult._rev);

      console.log('\n📊 Blog post should now work without the table.');
      console.log('🌐 LIVE PREVIEW: https://eazybe.com/blog/' + slug);

    } else {
      console.log('ℹ️ No table found in the blog post.');
      console.log('The blog post should be working normally.');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

removeTable();
