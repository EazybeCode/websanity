import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '5awzi0t4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function checkBlogIndex() {
  const query = `*[_type == "blogIndex"]{
    _id,
    "locale": language,
    hero,
    categories,
    featuredSection,
    allArticlesSection,
    detailLabels
  }`;

  try {
    const indices = await client.fetch(query);

    console.log(`Found ${indices.length} blog index documents\n`);

    if (indices.length === 0) {
      console.log('❌ No blog index found in Sanity!');
      console.log('\nThis means the blog listing page will use fallback categories.');
      return;
    }

    indices.forEach((index: any) => {
      console.log(`=== Blog Index (${index.locale || 'unknown'}) ===`);
      console.log(`ID: ${index._id}\n`);

      console.log('Categories:');
      if (index.categories && index.categories.length > 0) {
        index.categories.forEach((cat: any) => {
          console.log(`  - ${cat.name || cat.value}`);
        });
      } else {
        console.log('  ❌ No categories configured (will use defaults)');
      }

      console.log('\nHero configured:', index.hero ? '✅' : '❌');
      console.log('Featured section configured:', index.featuredSection ? '✅' : '❌');
      console.log('All articles section configured:', index.allArticlesSection ? '✅' : '❌');
      console.log('');
    });

  } catch (error: any) {
    console.error('Error:', error.message);
  }
}

checkBlogIndex();
