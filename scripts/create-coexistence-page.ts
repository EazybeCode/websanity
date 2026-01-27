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

const coexistencePage = {
  _type: 'productPage',
  _id: 'productPage-coexistence-en',
  title: 'Coexistence',
  language: 'en',
  category: 'whatsapp-api',

  slug: {
    _type: 'slug',
    current: 'coexistence'
  },

  seo: {
    metaTitle: 'Coexistence - API Power with App Freedom | Eazybe',
    metaDescription: 'Convert your WhatsApp Business number to API and keep using your app—broadcast at scale without risking your number.'
  },

  // Hero Section
  hero: {
    badge: 'NEW PRODUCT',
    headline: 'API Power. App Freedom.',
    headlineHighlight: 'Zero Compromise.',
    description: 'Convert your WhatsApp Business number to API and keep using your app—broadcast at scale without risking your number.',
    primaryCta: {
      label: 'Start Free Trial',
      url: '/signup?product=coexistence'
    },
    secondaryCta: {
      label: 'Watch Demo',
      url: '/demo?product=coexistence'
    },
    stats: [
      {
        label: 'No Number Blocking Risk',
        value: '✓'
      },
      {
        label: 'Works with Any CRM',
        value: '✓'
      },
      {
        label: 'Setup in Minutes',
        value: '✓'
      }
    ]
  },

  // Benefits / Problem Section
  benefits: {
    badge: 'The Impossible Choice',
    headline: 'The Impossible Choice Every Business Faces',
    items: [
      {
        icon: 'alert',
        title: 'Option A: Stay on WhatsApp App',
        description: 'Limited broadcast capacity. High risk of number ban. No CRM integration. Manual, time-consuming outreach.'
      },
      {
        icon: 'alert',
        title: 'Option B: Switch to WhatsApp API',
        description: 'Lose access to your WhatsApp app completely. Can\'t see messages on your phone. Complicated dashboard switching. Feels disconnected from your customers.'
      }
    ]
  },

  // Features Section (Solution)
  features: [
    {
      alignRight: false,
      badge: 'Introducing Coexistence',
      headline: 'The only solution that gives you full',
      headlineHighlight: 'API capabilities',
      description: 'Keep your WhatsApp app fully functional while unlocking the power of API. What if you didn\'t have to choose?',
      image: 'coexistence-overview',
      points: [
        'Your number works on API AND your WhatsApp app simultaneously',
        'No lockouts. No restrictions.',
        'Send bulk messages through secure API infrastructure',
        'Every client message appears in your WhatsApp app'
      ],
      cta: {
        label: 'Learn More',
        url: '#how-it-works'
      }
    },
    {
      alignRight: true,
      badge: 'Dual Access',
      headline: 'Your number,',
      headlineHighlight: 'two superpowers',
      description: 'Coexistence gives you API-level broadcasting power without losing the convenience of your WhatsApp app. No dashboard hopping. No missed conversations.',
      image: 'dual-access-visual',
      points: [
        'API for broadcasts - Safe, scalable, professional',
        'App for chats - Quick, personal, familiar',
        'Both use the same number simultaneously',
        'Zero conflicts, zero compromise'
      ],
      cta: {
        label: 'See How',
        url: '#features'
      }
    },
    {
      alignRight: false,
      badge: 'Safe Broadcasting',
      headline: 'Broadcast at scale without',
      headlineHighlight: 'risking your number',
      description: 'Regular WhatsApp broadcasts go through the app\'s consumer infrastructure with strict spam limits. Coexistence routes your bulk messages through official API infrastructure designed for business-scale messaging.',
      image: 'safe-broadcasting-visual',
      points: [
        'Send to 10,000+ contacts weekly',
        'Protected from WhatsApp\'s spam detection',
        'Professional message delivery',
        'Same number, zero ban risk'
      ],
      cta: {
        label: 'Explore',
        url: '#comparison'
      }
    },
    {
      alignRight: true,
      badge: 'Universal CRM Sync',
      headline: 'Works with',
      headlineHighlight: 'any CRM',
      description: 'Connect to any CRM you already use with the Eqzy extension. Salesforce, HubSpot, Zoho, custom solutions—all compatible. One-click connection syncs contacts, conversations, and campaigns.',
      image: 'crm-integration-visual',
      points: [
        'Salesforce, HubSpot, Zoho support',
        'Custom CRM API integration',
        'Automatic contact & conversation sync',
        'Campaign management from your CRM'
      ],
      cta: {
        label: 'View Integrations',
        url: '/integrations'
      }
    },
    {
      alignRight: false,
      badge: 'Everything You Need',
      headline: 'Complete feature set.',
      headlineHighlight: 'Nothing unnecessary.',
      description: 'All the features you need to manage WhatsApp at scale, with none of the bloat.',
      image: 'features-grid-visual',
      points: [
        'App Continuity - Use WhatsApp on your phone as before',
        'Broadcast Protection - API-level spam protection',
        'CRM Integration - One-click Eqzy extension connection',
        'WhatsApp Web Broadcasting - Familiar interface',
        'Real-Time Message Sync - Instant visibility',
        'Multi-User Access - Team access without conflicts'
      ],
      cta: {
        label: 'Full Features',
        url: '#features-detail'
      }
    }
  ],

  // How It Works
  howItWorks: {
    badge: 'Live in 4 Simple Steps',
    headline: 'From signup to broadcasting',
    description: 'in minutes, not days',
    steps: [
      {
        number: '01',
        title: 'Connect Your Number',
        description: 'Link your existing WhatsApp Business number through our secure connection process.'
      },
      {
        number: '02',
        title: 'Enable API Access',
        description: 'Your number converts to API-enabled status in minutes—not days.'
      },
      {
        number: '03',
        title: 'Install Eqzy Extension',
        description: 'Add the browser extension to connect your number with your preferred CRM.'
      },
      {
        number: '04',
        title: 'Broadcast from WhatsApp Web',
        description: 'Send campaigns directly from the familiar WhatsApp Web interface. Start reaching customers at scale.'
      }
    ]
  },

  // Use Cases
  useCases: {
    badge: 'Who It\'s For',
    headline: 'Built For Businesses Like Yours',
    items: [
      {
        icon: 'shopping-cart',
        title: 'E-Commerce & D2C Brands',
        description: 'Send flash sale alerts, restock notifications, and abandoned cart reminders to thousands—without losing your personal touch with VIP customers.',
        benefits: [
          'Flash sale broadcasts to 10,000+',
          'Personal VIP customer chats',
          'Abandoned cart automation'
        ]
      },
      {
        icon: 'megaphone',
        title: 'Marketing Agencies',
        description: 'Manage multiple client campaigns with CRM precision while keeping client communication natural and responsive.',
        benefits: [
          'Multi-client campaign management',
          'CRM-powered precision targeting',
          'Natural conversation flow'
        ]
      },
      {
        icon: 'building',
        title: 'Real Estate & Property',
        description: 'Broadcast new listings to your buyer database and still have one-on-one conversations with serious prospects—all from one number.',
        benefits: [
          'Broadcast new listings instantly',
          'Personal prospect conversations',
          'Same trusted number'
        ]
      },
      {
        icon: 'graduation-cap',
        title: 'Education & Coaching',
        description: 'Send batch updates to students and parents while maintaining individual support conversations.',
        benefits: [
          'Batch updates to all students',
          'Individual support chats',
          'Parent communication'
        ]
      },
      {
        icon: 'briefcase',
        title: 'Local Service Businesses',
        description: 'Keep the number your customers know and trust. Add API power without confusing your client base with a new number.',
        benefits: [
          'Same number customers know',
          'API-level capabilities',
          'Zero customer confusion'
        ]
      }
    ]
  },

  // Comparison Table as a feature
  // Note: This might need a custom section type, adding as description for now

  // Testimonials
  testimonial: {
    quote: 'We were sending 50 messages a day and living in fear of getting banned. Now we broadcast to 10,000+ contacts weekly. Same number. Zero issues.',
    author: '[Name]',
    title: '[Role]',
    company: '[Company]'
  },

  // FAQ
  faq: {
    badge: 'Common Questions',
    headline: 'What you need to know',
    items: [
      {
        question: 'Will I lose access to my WhatsApp app after connecting?',
        answer: 'No. That\'s the entire point of Coexistence. Your app works exactly as before—you can chat, make calls, send media, and see all your messages.'
      },
      {
        question: 'How does this protect my number from getting banned?',
        answer: 'Regular WhatsApp broadcasts go through the app\'s consumer infrastructure, which has strict spam limits. Coexistence routes your bulk messages through official API infrastructure, which is designed for business-scale messaging.'
      },
      {
        question: 'Can I connect to my existing CRM?',
        answer: 'Yes. The Eqzy extension works with all major CRMs including Salesforce, HubSpot, Zoho, Freshworks, and custom solutions via API.'
      },
      {
        question: 'How long does setup take?',
        answer: 'Most users are fully connected and broadcasting within 30 minutes.'
      },
      {
        question: 'Do I need a new WhatsApp number?',
        answer: 'No. You use your existing WhatsApp Business number. That\'s what makes Coexistence different.'
      },
      {
        question: 'Will my customers know I\'m using API?',
        answer: 'No. Messages appear exactly the same to recipients. There\'s no "sent via API" label or any difference in how your messages look.'
      },
      {
        question: 'What happens to my existing chats and contacts?',
        answer: 'Everything stays intact. Your chat history, contacts, and groups remain exactly as they are.'
      }
    ]
  },

  // CTA Section
  cta: {
    headline: 'Ready to stop',
    headlineHighlight: 'choosing?',
    description: 'Join hundreds of businesses using Coexistence to broadcast at scale while keeping their WhatsApp app fully functional.',
    primaryCta: {
      label: 'Start Free Trial',
      url: '/signup?product=coexistence'
    },
    secondaryCta: {
      label: 'Book a Demo',
      url: '/demo?product=coexistence'
    },
    footnote: '14-day free trial • No credit card • Setup in minutes'
  }
};

async function main() {
  console.log('🚀 Creating Coexistence Product Page\n');
  console.log('='.repeat(60));

  if (!process.env.SANITY_API_TOKEN) {
    console.error('\n❌ ERROR: SANITY_API_TOKEN required');
    process.exit(1);
  }

  try {
    console.log('📤 Uploading Coexistence page to Sanity...\n');

    const result = await client.createOrReplace(coexistencePage);

    console.log('✅ Success!');
    console.log('   Document ID:', result._id);
    console.log('   Document Type:', result._type);
    console.log('   Revision:', result._rev);
    console.log('\n' + '='.repeat(60));
    console.log('🎉 Coexistence page is now live in Sanity!');
    console.log('   Category: whatsapp-api');
    console.log('   Slug: /coexistence');
    console.log('\nNote: Testimonials have placeholder [Name], [Role], [Company]');
    console.log('      Update these in Sanity Studio with real data.');

    process.exit(0);
  } catch (error: any) {
    console.error('\n❌ Error:', error.message);
    if (error.details) {
      console.error('Details:', JSON.stringify(error.details, null, 2));
    }
    process.exit(1);
  }
}

main();
