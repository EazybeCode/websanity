/**
 * Check integrations category index content
 */

import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: '5awzi0t4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'skkDdo4y11RjfAKjVBfE2lnIn3jlXIvzxxyDidInUrabhYFWJf4dDoUpF41nPCti3qNsXDLYO1fboYOOOVrYg9hdWnjW5nJArkiMC6HwwfTMzz08s7AayDbqS6PTS6h3wQzgxM5v6afWCGmSoKFhvlvH5dPH1tBvLZwYcgdEZuDNdiGSdmVW'
});

async function checkIntegrationsContent() {
  console.log('🔍 Checking integrations category index content...\n');

  // Check English version
  console.log('1. English version:');
  const enContent = await sanityClient.fetch(
    `*[_type == "categoryIndexPage" && slug.current == "integrations" && language == "en"][0]{
      _id,
      title,
      language,
      hero{badge, headline, headlineHighlight, description},
      intro{headline, description},
      featuredItems{title, slug, description, isFeatured},
      comparisonTable{headline, description, columns},
      benefits{headline, items},
      howItWorks{headline, steps},
      faq{headline, items}
    }`
  );
  console.log(JSON.stringify(enContent, null, 2));

  // Check Portuguese version
  console.log('\n2. Portuguese version:');
  const ptContent = await sanityClient.fetch(
    `*[_type == "categoryIndexPage" && slug.current == "integrations" && language == "pt"][0]{
      _id,
      title,
      language,
      hero{badge, headline, headlineHighlight, description},
      intro{headline, description},
      featuredItems{title, slug, description, isFeatured},
      comparisonTable{headline, description, columns},
      benefits{headline, items},
      howItWorks{headline, steps},
      faq{headline, items}
    }`
  );
  console.log(JSON.stringify(ptContent, null, 2));
}

checkIntegrationsContent().catch(console.error);
