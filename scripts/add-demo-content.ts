/**
 * Script to add demo content with all new content types to a blog post
 * For local testing and verification
 */

import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: '5awzi0t4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'skSZVkNDe8k5TuJi2Tld6H34XcnMqKi7lilBvkqb3yPyKf3oHEhohk2SnEqBLAYdYvCvfQxtcmjXuBEJcYE4MvfiIfl8ypfuAxnYp3aL2R12HWxewdfKkH3rywCejLzWdY8lxT4ggzXlqFTQZSdMzYEiG59ImYozOfuNBw5PuANtxQp28tSA'
});

// Demo content with all new content types
const demoContent = [
  // 1. TABLE
  {
    _type: 'table',
    _key: 'table-demo',
    headers: ['CRM Platform', 'WhatsApp Sync', 'AI Agents', 'Starting Price'],
    rows: [
      ['HubSpot', '✓ Yes', '✓ Yes', '$116/month'],
      ['Salesforce', '✓ Yes', '✓ Yes', '$116/month'],
      ['Zoho', '✓ Yes', '✓ Yes', '$96/month'],
      ['Pipedrive', '✓ Yes', 'Planned', '$109/month'],
    ],
    variant: 'striped',
    caption: 'Popular CRM integrations comparison',
  },

  // 2. CALLOUT
  {
    _type: 'callout',
    _key: 'callout-demo',
    content: 'Eazybe supports 50+ CRM integrations. HubSpot and Salesforce are our most popular integrations with enterprise teams.',
    type: 'info',
    icon: 'Info',
    title: 'Did you know?',
  },

  // 3. ACCORDION / FAQ
  {
    _type: 'accordion',
    _key: 'accordion-demo',
    title: 'Frequently Asked Questions',
    items: [
      {
        question: 'How do I connect WhatsApp to HubSpot?',
        answer: 'Install Eazybe Chrome extension, open WhatsApp Web, and connect your HubSpot account in one click.',
        initiallyOpen: true,
      },
      {
        question: 'Does Eazybe work with Salesforce?',
        answer: 'Yes! Eazybe integrates seamlessly with Salesforce, syncing conversations and updating deal stages automatically.',
      },
      {
        question: 'Can I use AI agents for customer support?',
        answer: 'Absolutely. Eazybe AI agents can handle FAQs, qualify leads, and even book meetings on your calendar.',
      },
    ],
    allowMultipleOpen: false,
    variant: 'default',
  },

  // 4. VIDEO EMBED
  {
    _type: 'videoEmbed',
    _key: 'video-demo',
    platform: 'youtube',
    videoId: 'dQw4w9WgXcQ',
    title: 'Watch Eazybe in Action',
    autoplay: false,
    controls: true,
    aspectRatio: '16:9',
  },

  // 5. BUTTON CTA
  {
    _type: 'buttonCTA',
    _key: 'cta-demo',
    text: 'Try Eazybe Free',
    url: 'https://eazybe.com',
    variant: 'primary',
    size: 'lg',
    alignment: 'center',
    openInNewTab: false,
  },

  // 6. QUOTE / TESTIMONIAL
  {
    _type: 'quote',
    _key: 'quote-demo',
    content: 'Eazybe transformed how we handle WhatsApp leads. Our sales team now responds 3x faster and nothing falls through the cracks.',
    author: 'Sarah Johnson',
    role: 'Sales Director',
    company: 'TechCorp Inc',
    variant: 'card',
    rating: 5,
  },

  // 7. CODE BLOCK
  {
    _type: 'codeBlock',
    _key: 'code-demo',
    code: `// Example: Integrating WhatsApp with HubSpot API
const hubspot = require('@hubspot/api-client');

const hubspotClient = new hubspot.Client({
  accessToken: process.env.HUBSPOT_API_KEY
});

// Sync WhatsApp message to HubSpot contact
async function syncWhatsAppMessage(phone, message) {
  const contact = await hubspotClient.crm.contacts.basicApi.getByPhone(phone);
  await hubspotClient.crm.objects.notes.basicApi.create({
    properties: {
      hs_note_body: \`WhatsApp: \${message}\`,
      hs_timestamp: Date.now()
    }
  });
}`,
    language: 'javascript',
    filename: 'hubspot-integration.js',
    showLineNumbers: true,
    theme: 'dark',
  },
];

async function addDemoContent() {
  console.log('🚀 Adding demo content to blog post...\n');

  try {
    const slug = 'best-ai-agents-for-customer-support';
    console.log(`📝 Fetching blog post: ${slug}`);

    const post = await sanityClient.fetch(
      `*[_type == "blogPost" && slug.current == $slug][0]{_id, title, content}`,
      { slug }
    );

    if (!post) {
      console.error(`❌ Blog post not found: ${slug}`);
      return;
    }

    console.log(`✅ Found post: "${post.title}"`);
    console.log(`   Current content blocks: ${post.content?.length}`);

    // Add demo content at the end
    const newContent = [...(post.content || []), ...demoContent];

    console.log(`\n📊 Adding ${demoContent.length} demo content blocks...`);
    console.log(`   New total blocks: ${newContent.length}`);

    const updated = await sanityClient
      .patch(post._id)
      .set({ content: newContent })
      .commit();

    console.log(`✅ Demo content added successfully!`);
    console.log(`   Updated ID: ${updated._id}`);
    console.log(`\n🌐 View at: https://eazybe.com/blog/${slug}\n`);
    console.log(`\n📋 Demo content includes:`);
    console.log(`   1. Table - CRM comparison`);
    console.log(`   2. Callout - Info box`);
    console.log(`   3. Accordion - FAQs`);
    console.log(`   4. Video - YouTube embed`);
    console.log(`   5. Button - CTA button`);
    console.log(`   6. Quote - Testimonial card`);
    console.log(`   7. Code Block - JavaScript example\n`);

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Also create a function to remove demo content
async function removeDemoContent() {
  console.log('🗑️  Removing demo content from blog post...\n');

  try {
    const slug = 'best-ai-agents-for-customer-support';
    const post = await sanityClient.fetch(
      `*[_type == "blogPost" && slug.current == $slug][0]{_id, content}`,
      { slug }
    );

    if (!post) return;

    // Remove all demo content blocks
    const filteredContent = (post.content || []).filter((block: any) => {
      const key = block._key || '';
      return !key.includes('-demo');
    });

    console.log(`📊 Removed ${post.content.length - filteredContent.length} demo blocks`);

    const updated = await sanityClient
      .patch(post._id)
      .set({ content: filteredContent })
      .commit();

    console.log(`✅ Demo content removed!`);

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Run add by default
const action = process.argv[2];
if (action === 'remove') {
  removeDemoContent().catch(console.error);
} else {
  addDemoContent().catch(console.error);
}
