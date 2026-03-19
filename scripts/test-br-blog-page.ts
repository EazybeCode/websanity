import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '5awzi0t4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
});

// Replicate exact queries from the app
const sanityLangMap: Record<string, string> = { en: 'en', es: 'es', br: 'pt-BR', pt: 'pt', tr: 'tr' };

function toSanityLang(locale: string): string {
  return sanityLangMap[locale] || locale;
}

async function getBlogPosts(locale: string = 'en') {
  const language = toSanityLang(locale);
  const query = `*[_type == "post" && language == $language] | order(publishedAt desc){
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
  return client.fetch(query, { language });
}

async function getBlogIndex(locale: string = 'en') {
  const language = toSanityLang(locale);
  const query = `*[_type == "blogIndex" && language == $language][0]{
    language,
    hero{
      badge,
      headline,
      headlineHighlight,
      description,
      searchPlaceholder
    },
    categories[]{
      name,
      value
    }
  }`;
  return client.fetch(query, { language });
}

async function testBrBlogPage() {
  console.log('=== Testing /br/blog Page Data Flow ===\n');

  const locale = 'br';
  const [allPosts, blogIndex] = await Promise.all([
    getBlogPosts(locale),
    getBlogIndex(locale),
  ]);

  console.log(`1. getBlogPosts('${locale}') returned: ${allPosts.length} posts`);
  if (allPosts.length > 0) {
    console.log('   Post details:');
    allPosts.forEach((post: any, i: number) => {
      console.log(`   ${i+1}. ${post.title}`);
      console.log(`      Category: ${post.category}`);
      console.log(`      Language: ${post.language}`);
    });
  }

  console.log(`\n2. getBlogIndex('${locale}') returned: ${blogIndex ? '✅ Found' : '❌ Null'}`);
  if (blogIndex) {
    console.log('   Categories configured:');
    blogIndex.categories?.forEach((cat: any) => {
      console.log(`      - ${cat.name} (${cat.value})`);
    });
  } else {
    console.log('   ⚠️  Will use fallback categories:');
    const fallbackCategories = [
      { name: 'Sales', value: 'Sales' },
      { name: 'Product', value: 'Product' },
      { name: 'Automation', value: 'Automation' },
      { name: 'Best Practices', value: 'Best Practices' },
      { name: 'Case Studies', value: 'Case Studies' },
      { name: 'Security', value: 'Security' },
    ];
    fallbackCategories.forEach((cat: any) => {
      console.log(`      - ${cat.name} (${cat.value})`);
    });
  }

  // Simulate client-side filtering
  console.log('\n3. Client-side filtering simulation:');
  const activeCategory = 'All';
  const searchQuery = '';

  let filteredPosts = allPosts;
  console.log(`   Active category: "${activeCategory}"`);
  console.log(`   Search query: "${searchQuery}"`);

  if (activeCategory !== 'All') {
    filteredPosts = filteredPosts.filter((post: any) => post.category === activeCategory);
    console.log(`   After category filter: ${filteredPosts.length} posts`);
  }

  if (searchQuery) {
    filteredPosts = filteredPosts.filter(
      (post: any) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  console.log(`\n4. Final result: ${filteredPosts.length} posts to display`);

  if (filteredPosts.length === 0) {
    console.log('   ❌ NO POSTS WILL BE DISPLAYED!');
    console.log('\n   This is why /br/blog appears empty.');
  } else {
    console.log('   ✅ Posts will be displayed correctly.');
  }
}

testBrBlogPage();
