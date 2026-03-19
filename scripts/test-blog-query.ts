import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '5awzi0t4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
});

// Replicate the exact query from getBlogPosts
const sanityLangMap: Record<string, string> = { en: 'en', es: 'es', br: 'pt-BR', pt: 'pt', tr: 'tr' };

function toSanityLang(locale: string): string {
  return sanityLangMap[locale] || locale;
}

async function testGetBlogPosts(locale: string = 'en', limit?: number) {
  const language = toSanityLang(locale);
  const slice = limit ? `[0...${limit}]` : '';
  const query = `*[_type == "post" && language == $language] | order(publishedAt desc) ${slice}{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    category,
    language,
    "featuredImage": featuredImage.asset->url,
    publishedAt,
    readTime,
    author->{
      name
    }
  }`;

  console.log(`\n=== Testing getBlogPosts('${locale}') ===`);
  console.log(`Language query parameter: "${language}"`);

  try {
    const posts = await client.fetch(query, { language });

    console.log(`\n✅ Found ${posts.length} posts`);

    if (posts.length === 0) {
      console.log(`❌ No posts found for language "${language}"`);
      return [];
    }

    posts.forEach((post: any, index: number) => {
      console.log(`\n${index + 1}. ${post.title}`);
      console.log(`   Slug: ${post.slug}`);
      console.log(`   Language: ${post.language}`);
      console.log(`   Category: ${post.category}`);
    });

    return posts;
  } catch (error: any) {
    console.error(`❌ Error:`, error.message);
    return [];
  }
}

async function main() {
  // Test all locales
  await testGetBlogPosts('en');
  await testGetBlogPosts('br');
  await testGetBlogPosts('es');
  await testGetBlogPosts('tr');
}

main();
