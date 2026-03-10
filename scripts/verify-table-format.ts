import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config();

const client = createClient({
  projectId: '5awzi0t4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

async function verifyTableFormat() {
  console.log('🔍 VERIFYING TABLE FORMAT IN SANITY CMS\n');

  // Check if any blog posts have tables
  const query = `*[_type == "post" && language == "en"][0...10]{
    _id,
    title,
    "content": body[]{
      _type,
      _key,
      _type == "table" => {
        _type,
        headers,
        rows,
        caption,
        variant
      }
    }
  }`;

  try {
    const posts = await client.fetch(query);

    let tableFound = false;

    for (const post of posts) {
      const tables = post.content?.filter(block => block._type === 'table') || [];

      if (tables.length > 0) {
        tableFound = true;
        console.log(`📄 Blog Post: "${post.title}"`);
        console.log(`   Found ${tables.length} table(s)\n`);

        tables.forEach((table, index) => {
          console.log(`   Table ${index + 1}:`);
          console.log(`   Headers type: ${typeof table.headers}`);
          console.log(`   Headers are array: ${Array.isArray(table.headers)}`);
          console.log(`   Headers sample: ${JSON.stringify(table.headers?.slice(0, 2))}`);

          console.log(`\n   Rows type: ${typeof table.rows}`);
          console.log(`   Rows are array: ${Array.isArray(table.rows)}`);
          console.log(`   Number of rows: ${table.rows?.length}`);

          if (table.rows && table.rows.length > 0) {
            const firstRow = table.rows[0];
            console.log(`\n   First row type: ${typeof firstRow}`);
            console.log(`   First row is array: ${Array.isArray(firstRow)}`);
            console.log(`   First row has cells: ${firstRow && 'cells' in firstRow}`);

            if (firstRow && 'cells' in firstRow) {
              console.log(`   First row cells type: ${typeof firstRow.cells}`);
              console.log(`   First row cells are array: ${Array.isArray(firstRow.cells)}`);
              console.log(`   First row cells sample: ${JSON.stringify(firstRow.cells?.slice(0, 2))}`);

              console.log(`\n   ✅ FORMAT: Sanity uses {cells: string[]} format`);
            } else if (Array.isArray(firstRow)) {
              console.log(`   First row is array: ${JSON.stringify(firstRow.slice(0, 2))}`);
              console.log(`\n   ✅ FORMAT: Sanity uses string[][] format`);
            }
          }

          console.log(`\n   Caption: ${table.caption || 'none'}`);
          console.log(`   Variant: ${table.variant || 'default'}`);
          console.log('\n' + '─'.repeat(60) + '\n');
        });
      }
    }

    if (!tableFound) {
      console.log('ℹ️ No tables found in any blog posts.');
      console.log('This means either:');
      console.log('  1. No tables have been added yet');
      console.log('  2. Tables were removed due to the error');
      console.log('  3. Blog posts don\'t have table blocks in content\n');
    }

    console.log('📋 SANITY SCHEMA EXPECTED FORMAT:');
    console.log('   headers: string[]');
    console.log('   rows: Array<{ cells: string[] }>');
    console.log('   caption?: string');
    console.log('   variant?: string\n');

    console.log('📋 FRONTEND COMPONENT EXPECTED FORMAT:');
    console.log('   headers: string[]');
    console.log('   rows: string[][]');
    console.log('   caption?: string');
    console.log('   variant?: string\n');

    console.log('⚠️ MISMATCH DETECTED!');
    console.log('   Sanity provides: rows = [{cells: [...]}]');
    console.log('   Frontend expects: rows = [[...], [...]]\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

verifyTableFormat();
