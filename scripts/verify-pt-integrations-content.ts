import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: '5awzi0t4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'skkDdo4y11RjfAKjVBfE2lnIn3jlXIvzxxyDidInUrabhYFWJf4dDoUpF41nPCti3qNsXDLYO1fboYOOOVrYg9hdWnjW5nJArkiMC6HwwfTMzz08s7AayDbqS6PTS6h3wQzgxM5v6afWCGmSoKFhvlvH5dPH1tBvLZwYcgdEZuDNdiGSdmVW'
});

async function verify() {
  const doc = await sanityClient.fetch(
    `*[_type == "categoryIndexPage" && slug.current == "integrations" && language == "pt"][0]`
  );

  console.log('🔍 Verificando conteúdo salvo...');
  console.log('ID:', doc._id);
  console.log('Título:', doc.title);
  console.log('Idioma:', doc.language);
  console.log('Slug:', doc.slug?.current);
  console.log('');
  console.log('Hero:');
  console.log('  Badge:', doc.hero?.badge);
  console.log('  Headline:', doc.hero?.headline);
  console.log('  Highlight:', doc.hero?.headlineHighlight);
  console.log('');
  console.log('Featured Items:', doc.featuredItems?.length || 0);
  if (doc.featuredItems?.length > 0) {
    console.log('  Primeiros 3:');
    doc.featuredItems.slice(0, 3).forEach(item => {
      console.log('    -', item.name, ':', item.description?.substring(0, 50) + '...');
    });
  }
  console.log('');
  console.log('SEO Meta Title:', doc.seo?.metaTitle);
  console.log('');
  console.log('✅ Verificação concluída!');
}

verify().catch(console.error);
