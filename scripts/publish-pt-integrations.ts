/**
 * Publish Portuguese integrations page
 */

import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: '5awzi0t4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'skkDdo4y11RjfAKjVBfE2lnIn3jlXIvzxxyDidInUrabhYFWJf4dDoUpF41nPCti3qNsXDLYO1fboYOOOVrYg9hdWnjW5nJArkiMC6HwwfTMzz08s7AayDbqS6PTS6h3wQzgxM5v6afWCGmSoKFhvlvH5dPH1tBvLZwYcgdEZuDNdiGSdmVW'
});

async function publishPortugueseIntegrations() {
  console.log('📤 Publicando página de integrações em Português...\n');

  // Get draft ID
  const draft = await sanityClient.fetch(
    `*[_type == "categoryIndexPage" && slug.current == "integrations" && language == "pt"][0]{_id}`
  );

  if (!draft) {
    console.log('❌ Documento não encontrado');
    return;
  }

  console.log(`📝 Draft ID: ${draft._id}`);

  // Publish by creating published version
  const publishedId = draft._id.replace('drafts.', '');
  console.log(`📝 Published ID será: ${publishedId}`);

  // Create published version
  const publishedDoc = await sanityClient.fetch(
    `*[_id == "${publishedId}"][0]{_id}`
  );

  if (publishedDoc) {
    console.log('⚠️ Versão publicada já existe. Atualizando...');
    // Copy draft content to published
    const draftContent = await sanityClient.getDocument(draft._id);
    const { _id, _rev, ...contentToPublish } = draftContent as any;

    await sanityClient
      .patch(publishedId)
      .set(contentToPublish)
      .commit();

    console.log('✅ Versão publicada atualizada!');
  } else {
    console.log('Criando nova versão publicada...');
    // Create published version from draft
    const draftContent = await sanityClient.getDocument(draft._id);
    const { _id, _rev, ...contentToPublish } = draftContent as any;

    await sanityClient.create({
      ...contentToPublish,
      _id: publishedId
    });

    console.log('✅ Versão publicada criada!');
  }

  console.log(`\n🌐 Ver em: https://eazybe.com/br/integrations\n`);
}

publishPortugueseIntegrations().catch(console.error);
