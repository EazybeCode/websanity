/**
 * Verify Portuguese integrations content
 */

import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: '5awzi0t4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'skkDdo4y11RjfAKjVBfE2lnIn3jlXIvzxxyDidInUrabhYFWJf4dDoUpF41nPCti3qNsXDLYO1fboYOOOVrYg9hdWnjW5nJArkiMC6HwwfTMzz08s7AayDbqS6PTS6h3wQzgxM5v6afWCGmSoKFhvlvH5dPH1tBvLZwYcgdEZuDNdiGSdmVW'
});

async function verifyContent() {
  console.log('🔍 Verificando conteúdo em Português...\n');

  // Check published Portuguese version
  const ptContent = await sanityClient.fetch(
    `*[_type == "categoryIndexPage" && slug.current == "integrations" && language == "pt"][0]{
      _id,
      title,
      language,
      hero{headline, headlineHighlight},
      benefits{headline},
      faq{headline}
    }`
  );

  console.log('Versão Publicada PT:');
  console.log(JSON.stringify(ptContent, null, 2));

  // Also check the hooks
  const { useCategoryIndex } = await import('../hooks/useCategoryIndex');
  console.log('\n✅ useCategoryIndex hook exists');

  // Check language detection
  const testPaths = ['/br/integrations', '/integrations', '/es/integrations'];
  console.log('\n📋 Testando detecção de idioma:');
  for (const path of testPaths) {
    const match = path.match(/^\/(br|es|tr)(\/|$)/);
    const lang = match ? match[1] : 'en';
    console.log(`   ${path} → ${lang}`);
  }
}

verifyContent().catch(console.error);
