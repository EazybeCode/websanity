import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '5awzi0t4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function checkTranslationGroups() {
  const query = `*[_type == "post"] | order(publishedAt desc){
    _id,
    title,
    "slug": slug.current,
    language,
    translationGroupId,
    publishedAt
  }`;

  try {
    const posts = await client.fetch(query);

    // Group by translationGroupId
    const groups: Record<string, any[]> = {};
    posts.forEach((post: any) => {
      const groupId = post.translationGroupId || 'no-group';
      if (!groups[groupId]) groups[groupId] = [];
      groups[groupId].push(post);
    });

    console.log('=== Blog Post Translation Groups ===\n');

    Object.entries(groups).forEach(([groupId, posts]) => {
      if (posts.length > 1 || posts[0].translationGroupId) {
        console.log(`Group: ${groupId}`);
        posts.forEach((post: any) => {
          const langCode = post.language === 'pt-BR' ? 'br' : post.language;
          console.log(`  [${langCode}] ${post.title}`);
          console.log(`        /${langCode === 'en' ? '' : langCode + '/'}blog/${post.slug}`);
        });
        console.log('');
      }
    });

    // Find posts without translations
    const noTranslations = groups['no-group'] || [];
    if (noTranslations.length > 0) {
      console.log('=== Posts without translations ===');
      noTranslations.forEach((post: any) => {
        console.log(`[${post.language}] ${post.title}`);
      });
    }

  } catch (error: any) {
    console.error('Error:', error.message);
  }
}

checkTranslationGroups();
