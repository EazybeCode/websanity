import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '5awzi0t4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function checkBlogLanguages() {
  // Check both "post" and "blogPost" types
  for (const type of ['post', 'blogPost']) {
    console.log(`\n=== Checking _type: "${type}" ===\n`);

    const query = `*[_type == "${type}"] | order(publishedAt desc){
      title,
      "slug": slug.current,
      language,
      publishedAt
    }`;

    try {
      const posts = await client.fetch(query);

      if (posts.length === 0) {
        console.log(`No posts found with type "${type}"`);
        continue;
      }

      console.log(`Total posts: ${posts.length}\n`);

      // Count by language
      const langCounts: Record<string, number> = {};
      posts.forEach(post => {
        const lang = post.language || 'undefined';
        langCounts[lang] = (langCounts[lang] || 0) + 1;
      });

      console.log('Posts by language:');
      Object.entries(langCounts)
        .sort(([,a], [,b]) => b - a)
        .forEach(([lang, count]) => {
          console.log(`  ${lang}: ${count} posts`);
        });

      // Show posts for each language
      console.log('\nPosts by language:');
      const postsByLang: Record<string, any[]> = {};
      posts.forEach(post => {
        const lang = post.language || 'undefined';
        if (!postsByLang[lang]) postsByLang[lang] = [];
        postsByLang[lang].push(post);
      });

      Object.entries(postsByLang).forEach(([lang, posts]) => {
        console.log(`\n${lang} (${posts.length} posts):`);
        posts.slice(0, 5).forEach(post => {
          console.log(`  - ${post.title} (${post.slug})`);
        });
        if (posts.length > 5) {
          console.log(`  ... and ${posts.length - 5} more`);
        }
      });

    } catch (error: any) {
      console.error(`Error fetching "${type}":`, error.message);
    }
  }
}

checkBlogLanguages();
