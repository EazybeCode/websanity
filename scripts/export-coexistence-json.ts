import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

  testimonial: {
    quote: 'We were sending 50 messages a day and living in fear of getting banned. Now we broadcast to 10,000+ contacts weekly. Same number. Zero issues.',
    author: '[Name]',
    title: '[Role]',
    company: '[Company]'
  },

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

// Write to file
const outputPath = path.join(__dirname, '..', 'coexistence-page.json');
fs.writeFileSync(outputPath, JSON.stringify(coexistencePage, null, 2));

console.log('✅ Coexistence page JSON generated!');
console.log('   File:', outputPath);
console.log('\nTo import into Sanity Studio:');
console.log('1. Open your Sanity Studio');
console.log('2. Go to the Vision tool or use the import feature');
console.log('3. Copy the content from coexistence-page.json');
console.log('4. Create a new productPage document');
console.log('5. Paste the JSON content');
console.log('\nAlternatively, you can manually create the document with this structure.');
