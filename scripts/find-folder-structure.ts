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
  // Get all documents with full details
  const allDocs = await client.fetch(`*[!(_id in path("_.**"))]`);

  console.log('All documents in Sanity:');
  console.log(JSON.stringify(allDocs, null, 2));
}

main();
