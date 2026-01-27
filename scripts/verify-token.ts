import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const client = createClient({
  projectId: '5awzi0t4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

async function main() {
  console.log('Verifying token permissions...\n');

  try {
    // Try to fetch - this should work with read permissions
    const docs = await client.fetch(`*[_type == "productPage"][0..1]`);
    console.log('✅ Read permission: Working');
    console.log('   Found', docs.length, 'product pages');

    // Try to create a test document
    try {
      const testDoc = {
        _type: 'productPage',
        _id: 'test-permissions-doc',
        title: 'Test',
        language: 'en'
      };

      await client.create(testDoc);
      console.log('✅ Create permission: Working');

      // Delete the test doc
      await client.delete('test-permissions-doc');
      console.log('✅ Delete permission: Working');
    } catch (createError: any) {
      console.log('❌ Create permission:', createError.message);
      console.log('\nThis token does NOT have write permissions.');
      console.log('You need to create a token with "Editor" or "Administrator" permissions.');
    }
  } catch (error: any) {
    console.error('❌ Token error:', error.message);
  }
}

main();
