import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '5awzi0t4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function checkPtBrPost() {
  // Check the pt-BR post
  const query = `*[_type == "post" && language == "pt-BR"][0]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    category,
    "featuredImage": featuredImage.asset->url,
    publishedAt,
    readTime,
    author->{
      name
    }
  }`;

  try {
    const post = await client.fetch(query);

    if (!post) {
      console.log('No pt-BR post found!');
      return;
    }

    console.log('pt-BR Blog Post Details:');
    console.log('========================');
    console.log(JSON.stringify(post, null, 2));

    // Check for missing fields
    const requiredFields = ['_id', 'title', 'slug', 'excerpt', 'category', 'publishedAt'];
    const missingFields = requiredFields.filter(field => !post[field]);

    if (missingFields.length > 0) {
      console.log('\n⚠️  Missing required fields:', missingFields);
    } else {
      console.log('\n✅ All required fields present');
    }

    // Check optional fields
    console.log('\nOptional Fields:');
    console.log('  featuredImage:', post.featuredImage ? '✅' : '❌ (using fallback)');
    console.log('  readTime:', post.readTime || '❌ (using fallback: 5)');
    console.log('  author:', post.author?.name || '❌ (not displayed)');

  } catch (error: any) {
    console.error('Error:', error.message);
  }
}

checkPtBrPost();
