import { createClient } from '@sanity/client';
import * as fs from 'fs';

// Sanity Client Configuration
const sanityClient = createClient({
  projectId: '5awzi0t4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.VITE_SANITY_API_TOKEN || 'skSZVkNDe8k5TuJi2Tld6H34XcnMqKi7lilBvkqb3yPyKf3oHEhohk2SnEqBLAYdYvCvfQxtcmjXuBEJcYE4MvfiIfl8ypfuAxnYp3aL2R12HWxewdfKkH3rywCejLzWdY8lxT4ggzXlqFTQZSdMzYEiG59ImYozOfuNBw5PuANtxQp28tSA'
});

// Example Content Types
interface BlogPost {
  _type: 'blogPost';
  title: string;
  slug: { current: string };
  excerpt: string;
  content: any[];
  category: string;
  language: string;
  publishedAt: string;
  readTime: number;
  author?: {
    _type: 'reference';
    _ref: string;
  };
  featuredImage?: {
    _type: 'image';
    asset: {
      _type: 'reference';
      _ref: string;
    };
  };
}

// Helper function to create a document
async function createDocument(document: any) {
  try {
    console.log(`\n📝 Creating: ${document._type} - ${document.title || document.name || 'Unnamed'}`);

    // Check if document already exists
    const existing = await sanityClient.fetch(
      `*[_type == "${document._type}" && slug.current == $slug][0]._id`,
      { slug: document.slug?.current }
    );

    if (existing) {
      console.log(`⚠️  Document already exists: ${existing}`);
      const response = await sanityClient
        .patch(existing)
        .set(document)
        .commit();
      console.log(`✅ Updated existing document: ${response._id}`);
      return response;
    }

    const response = await sanityClient.create(document);
    console.log(`✅ Created new document: ${response._id}`);
    return response;
  } catch (error) {
    console.error(`❌ Error creating document:`, error);
    throw error;
  }
}

// Example: Create a Blog Post
async function createBlogPost(post: BlogPost) {
  return await createDocument(post);
}

// Main function - Example usage
async function main() {
  console.log('🚀 Starting Content Push to Sanity...\n');
  console.log(`📊 Project: 5awzi0t4`);
  console.log(`📦 Dataset: production\n`);

  // Example Blog Post
  const exampleBlogPost: BlogPost = {
    _type: 'blogPost',
    title: 'Your Blog Post Title',
    slug: { current: 'your-blog-post-slug' },
    excerpt: 'A brief excerpt describing your blog post...',
    category: 'Sales',
    language: 'en',
    publishedAt: new Date().toISOString(),
    readTime: 5,
    content: [
      {
        _type: 'block',
        _key: 'intro',
        style: 'normal',
        children: [{ _type: 'span', text: 'Your blog post content goes here...' }]
      }
    ]
  };

  // Uncomment to create the example post
  // await createBlogPost(exampleBlogPost);

  console.log('\n✨ Content push complete!');
  console.log('\n💡 To add your own content:');
  console.log('   1. Edit the exampleBlogPost object above');
  console.log('   2. Uncomment the createBlogPost line');
  console.log('   3. Run: npm run push-content');
}

// Alternative: Read from JSON file
async function pushFromJsonFile(filePath: string) {
  try {
    console.log(`📂 Reading from: ${filePath}`);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    if (Array.isArray(data)) {
      for (const item of data) {
        await createDocument(item);
      }
    } else {
      await createDocument(data);
    }

    console.log('\n✅ All content pushed successfully!');
  } catch (error) {
    console.error(`❌ Error reading file:`, error);
  }
}

// Export functions for use in other scripts
export { createDocument, createBlogPost, pushFromJsonFile };

// Run main if executed directly
main().catch(console.error);
