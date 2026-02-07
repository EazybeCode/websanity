import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '5awzi0t4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function listBlogPosts() {
  const query = `*[_type == "blogPost" && language == "en"] | order(publishedAt desc){
    title,
    "slug": slug.current,
    publishedAt
  }`;

  try {
    const posts = await client.fetch(query);
    console.log('Available blog posts:');
    console.log('======================');
    posts.forEach(post => {
      console.log(`\nTitle: ${post.title}`);
      console.log(`Slug: /blog/${post.slug}`);
      console.log(`Published: ${post.publishedAt}`);
    });
    console.log(`\nTotal: ${posts.length} posts`);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

listBlogPosts();
