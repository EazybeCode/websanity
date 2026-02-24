/**
 * Deploy Sanity Schemas via Sanity API
 * This creates/updates the blogPost schema with all new content types
 */

import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: '5awzi0t4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'skSZVkNDe8k5TuJi2Tld6H34XcnMqKi7lilBvkqb3yPyKf3oHEhohk2SnEqBLAYdYvCvfQxtcmjXuBEJcYE4MvfiIfl8ypfuAxnYp3aL2R12HWxewdfKkH3rywCejLzWdY8lxT4ggzXlqFTQZSdMzYEiG59ImYozOfuNBw5PuANtxQp28tSA'
});

/**
 * NOTE: Sanity schemas are managed through the Sanity Studio UI.
 * There's no direct API to update schemas programmatically.
 *
 * To add these content types, you need to:
 *
 * 1. Copy the schema files to your Sanity Studio project:
 *    cp sanity-content-types/*.js /path/to/sanity-studio/schemas/objects/
 *
 * 2. Update your blogPost schema to include the new types:
 *
 *    In sanity-studio/schemas/blogPost.js:
 *
 *    export default {
 *      name: 'blogPost',
 *      title: 'Blog Post',
 *      type: 'document',
 *      fields: [
 *        // ... existing fields ...
 *        {
 *          name: 'content',
 *          title: 'Content',
 *          type: 'array',
 *          of: [
 *            { type: 'block' },
 *            { type: 'image' },
 *            { type: 'table' },           // NEW
 *            { type: 'accordion' },       // NEW
 *            { type: 'callout' },         // NEW
 *            { type: 'codeBlock' },       // NEW
 *            { type: 'imageGallery' },    // NEW
 *            { type: 'videoEmbed' },      // NEW
 *            { type: 'buttonCTA' },       // NEW
 *            { type: 'quote' },           // NEW
 *            { type: 'fileDownload' },    // NEW
 *            { type: 'comparisonTable' }, // NEW
 *          ],
 *        },
 *      ],
 *    };
 *
 * 3. Deploy your Sanity Studio:
 *    npx sanity deploy
 *
 * Or open Sanity Studio at https://www.sanity.io/manage
 */

// Since we can't directly update schemas via API, let's create a guide file
async function generateSetupGuide() {
  console.log('📋 Sanity CMS Setup Guide\n');
  console.log('═'.repeat(60));

  console.log('\n📁 Step 1: Copy Schema Files\n');
  console.log('   Copy all files from: sanity-content-types/');
  console.log('   To your Sanity Studio: schemas/objects/\n');

  console.log('📝 Step 2: Update blogPost Schema\n');
  console.log('   Add these types to the content field:\n');
  const contentTypes = [
    'table',
    'accordion',
    'callout',
    'codeBlock',
    'imageGallery',
    'videoEmbed',
    'buttonCTA',
    'quote',
    'fileDownload',
    'comparisonTable',
  ];

  contentTypes.forEach((type, i) => {
    console.log(`   ${i + 1}. {{ type: '${type}' }}`);
  });

  console.log('\n🚀 Step 3: Deploy Sanity Studio\n');
  console.log('   Run: npx sanity deploy');
  console.log('   Or visit: https://www.sanity.io/manage/project/5awzi0t4\n');

  console.log('✅ Step 4: Verify in Sanity Studio\n');
  console.log('   Open your Sanity Studio');
  console.log('   Create/Edit a blog post');
  console.log('   You should see new content type options:\n');

  contentTypes.forEach((type) => {
    console.log(`   • ${type}`);
  });

  console.log('\n' + '═'.repeat(60));
  console.log('\n🌐 Sanity Manage Dashboard:\n');
  console.log('   https://www.sanity.io/manage/project/5awzi0t4');
  console.log('   Project: Eazybe (5awzi0t4)');
  console.log('   Dataset: production\n');

  console.log('💡 Quick Alternative:\n');
  console.log('   If you don\'t have a Sanity Studio setup locally, you can:\n');
  console.log('   1. Go to https://www.sanity.io/manage\n');
  console.log('   2. Open your project\n');
  console.log('   3. Go to "Settings" > "API" > "Tokens"\n');
  console.log('   4. Or edit schemas directly in the Sanity Studio web UI\n');
}

generateSetupGuide();
