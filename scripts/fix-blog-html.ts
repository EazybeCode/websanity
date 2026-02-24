/**
 * Script to fix the blog post - remove HTML table codes
 */

import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: '5awzi0t4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'skSZVkNDe8k5TuJi2Tld6H34XcnMqKi7lilBvkqb3yPyKf3oHEhohk2SnEqBLAYdYvCvfQxtcmjXuBEJcYE4MvfiIfl8ypfuAxnYp3aL2R12HWxewdfKkH3rywCejLzWdY8lxT4ggzXlqFTQZSdMzYEiG59ImYozOfuNBw5PuANtxQp28tSA'
});

async function fixBlogContent() {
  console.log('🚀 Fixing blog post content...\n');

  try {
    const slug = 'best-ai-agents-for-customer-support';
    console.log(`📝 Fetching blog post: ${slug}`);

    const post = await sanityClient.fetch(
      `*[_type == "blogPost" && slug.current == $slug][0]{_id, _rev, title, content}`,
      { slug }
    );

    if (!post) {
      console.error(`❌ Blog post not found: ${slug}`);
      return;
    }

    console.log(`✅ Found post: "${post.title}"`);
    console.log(`   Content blocks: ${post.content?.length}`);

    if (!Array.isArray(post.content)) {
      console.error('❌ Content is not an array');
      return;
    }

    // Find and remove HTML table blocks
    const newContent: any[] = [];
    let removedCount = 0;
    let inTable = false;

    for (let i = 0; i < post.content.length; i++) {
      const block = post.content[i];
      let text = '';

      if (block._type === 'block' && block.children) {
        text = block.children.map((c: any) => c.text).join('');
      }

      // Detect start of HTML table
      if (text.includes('<table>') || text.includes('<thead>')) {
        inTable = true;
      }

      // Skip blocks that are part of the HTML table
      if (inTable) {
        removedCount++;
        if (text.includes('</tbody>') || text.includes('</table>')) {
          inTable = false;
        }
        continue;
      }

      // Also remove any standalone table object we added
      if (block._type === 'table') {
        removedCount++;
        continue;
      }

      newContent.push(block);
    }

    if (removedCount === 0) {
      console.log('⚠️ No HTML table blocks found to remove');
      return;
    }

    console.log(`\n🗑️  Removed ${removedCount} table-related blocks`);
    console.log(`📊 New content length: ${newContent.length}`);

    console.log(`\n📊 Updating post...`);

    const updated = await sanityClient
      .patch(post._id)
      .set({ content: newContent })
      .commit();

    console.log(`✅ Successfully fixed blog post!`);
    console.log(`   Updated ID: ${updated._id}`);
    console.log(`\n🌐 View at: https://eazybe.com/blog/${slug}\n`);

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

fixBlogContent().catch(console.error);
