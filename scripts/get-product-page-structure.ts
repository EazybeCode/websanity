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
  // Get one productPage to understand structure
  const samplePage = await client.fetch(`*[_type == "productPage"][0]`);

  console.log('Sample productPage structure:');
  console.log('Fields:', Object.keys(samplePage).filter(k => !k.startsWith('_')));
  console.log('\nFull document:');
  console.log(JSON.stringify(samplePage, null, 2));
}

main();
