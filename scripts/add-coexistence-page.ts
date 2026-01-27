import { createClient } from '@sanity/client';

// Sanity client with write permissions
// You'll need to provide a token with Editor permissions
const client = createClient({
  projectId: '5awzi0t4',
  dataset: 'production',
  useCdn: false, // We need fresh data for mutations
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN, // Set this in your environment
});

// Coexistence Product Page Content Structure
const coexistencePageContent = {
  _type: 'productPage',
  _id: 'coexistence-product-page',
  title: 'Coexistence',
  slug: { _type: 'slug', current: 'coexistence' },

  // Hero Section
  hero: {
    _type: 'heroSection',
    badge: {
      text: 'NEW PRODUCT',
      variant: 'primary'
    },
    headline: 'API Power. App Freedom. Zero Compromise.',
    subheadline: 'Convert your WhatsApp Business number to API and keep using your app—broadcast at scale without risking your number.',
    ctas: [
      {
        _type: 'cta',
        _key: 'hero-cta-1',
        label: 'Start Free Trial',
        url: '/signup',
        variant: 'primary'
      },
      {
        _type: 'cta',
        _key: 'hero-cta-2',
        label: 'Watch Demo',
        url: '/demo',
        variant: 'secondary'
      }
    ],
    trustBadges: [
      { _type: 'badge', _key: 'badge-1', text: 'No Number Blocking Risk' },
      { _type: 'badge', _key: 'badge-2', text: 'Works with Any CRM' },
      { _type: 'badge', _key: 'badge-3', text: 'Setup in Minutes' }
    ]
  },

  // Problem Section
  problemSection: {
    _type: 'problemSection',
    headline: 'The Impossible Choice Every Business Faces',
    options: [
      {
        _type: 'problemOption',
        _key: 'option-a',
        title: 'Option A: Stay on WhatsApp App',
        problems: [
          { _type: 'problem', _key: 'p1', text: 'Limited broadcast capacity', icon: '❌' },
          { _type: 'problem', _key: 'p2', text: 'High risk of number ban', icon: '❌' },
          { _type: 'problem', _key: 'p3', text: 'No CRM integration', icon: '❌' },
          { _type: 'problem', _key: 'p4', text: 'Manual, time-consuming outreach', icon: '❌' }
        ]
      },
      {
        _type: 'problemOption',
        _key: 'option-b',
        title: 'Option B: Switch to WhatsApp API',
        problems: [
          { _type: 'problem', _key: 'p5', text: 'Lose access to your WhatsApp app completely', icon: '❌' },
          { _type: 'problem', _key: 'p6', text: "Can't see messages on your phone", icon: '❌' },
          { _type: 'problem', _key: 'p7', text: 'Complicated dashboard switching', icon: '❌' },
          { _type: 'problem', _key: 'p8', text: 'Feels disconnected from your customers', icon: '❌' }
        ]
      }
    ],
    transitionText: 'What if you didn\'t have to choose?'
  },

  // Solution Section
  solutionSection: {
    _type: 'featureSection',
    headline: 'Introducing Coexistence',
    subheadline: 'The only solution that gives you full API capabilities while keeping your WhatsApp app fully functional.',
    features: [
      {
        _type: 'feature',
        _key: 'feature-1',
        icon: 'dual-access',
        title: 'Dual Access',
        description: 'Your number works on API AND your WhatsApp app simultaneously. No lockouts. No restrictions.'
      },
      {
        _type: 'feature',
        _key: 'feature-2',
        icon: 'safe-broadcasting',
        title: 'Safe Broadcasting',
        description: "Send bulk messages through secure API infrastructure—not the app's risky broadcast feature that gets numbers banned."
      },
      {
        _type: 'feature',
        _key: 'feature-3',
        icon: 'universal-crm',
        title: 'Universal CRM Sync',
        description: 'Connect to any CRM you already use with the Eqzy extension. Salesforce, HubSpot, Zoho, custom solutions—all compatible.'
      },
      {
        _type: 'feature',
        _key: 'feature-4',
        icon: 'unified-inbox',
        title: 'Unified Inbox',
        description: 'Every client message appears in your WhatsApp app. No dashboard hopping. No missed conversations.'
      }
    ]
  },

  // How It Works Section
  howItWorksSection: {
    _type: 'stepsSection',
    headline: 'Live in 4 Simple Steps',
    steps: [
      {
        _type: 'step',
        _key: 'step-1',
        number: 1,
        icon: 'connect',
        title: 'Connect Your Number',
        description: 'Link your existing WhatsApp Business number through our secure connection process.'
      },
      {
        _type: 'step',
        _key: 'step-2',
        number: 2,
        icon: 'enable',
        title: 'Enable API Access',
        description: 'Your number converts to API-enabled status in minutes—not days.'
      },
      {
        _type: 'step',
        _key: 'step-3',
        number: 3,
        icon: 'install',
        title: 'Install Eqzy Extension',
        description: 'Add the browser extension to connect your number with your preferred CRM.'
      },
      {
        _type: 'step',
        _key: 'step-4',
        number: 4,
        icon: 'broadcast',
        title: 'Broadcast from WhatsApp Web',
        description: 'Send campaigns directly from the familiar WhatsApp Web interface. Start reaching customers at scale.'
      }
    ],
    cta: {
      _type: 'cta',
      label: 'Get Started Now →',
      url: '/signup',
      variant: 'primary'
    }
  },

  // Features Grid Section
  featuresGridSection: {
    _type: 'featureSection',
    headline: 'Everything You Need. Nothing You Don\'t.',
    layout: 'grid',
    features: [
      {
        _type: 'feature',
        _key: 'grid-feature-1',
        title: 'App Continuity',
        description: 'Keep using WhatsApp on your phone exactly as before. Chat, call, send voice notes—nothing changes.'
      },
      {
        _type: 'feature',
        _key: 'grid-feature-2',
        title: 'Broadcast Protection',
        description: "API-level sending infrastructure protects your number from WhatsApp's spam detection algorithms."
      },
      {
        _type: 'feature',
        _key: 'grid-feature-3',
        title: 'CRM Integration',
        description: 'One-click connection to any CRM through Eqzy extension. Sync contacts, conversations, and campaigns.'
      },
      {
        _type: 'feature',
        _key: 'grid-feature-4',
        title: 'WhatsApp Web Broadcasting',
        description: 'Run bulk campaigns from the interface you already know. No learning curve.'
      },
      {
        _type: 'feature',
        _key: 'grid-feature-5',
        title: 'Real-Time Message Sync',
        description: 'All incoming messages visible in your WhatsApp app instantly—even from API-triggered conversations.'
      },
      {
        _type: 'feature',
        _key: 'grid-feature-6',
        title: 'Multi-User Access',
        description: 'Your team can access the same number across devices without conflicts.'
      }
    ]
  },

  // Comparison Section
  comparisonSection: {
    _type: 'comparisonSection',
    headline: 'See the Difference',
    columns: [
      { _type: 'column', _key: 'col-1', name: 'Regular WhatsApp Business' },
      { _type: 'column', _key: 'col-2', name: 'Standard API' },
      { _type: 'column', _key: 'col-3', name: 'Coexistence', highlight: true }
    ],
    comparisonRows: [
      {
        _type: 'comparisonRow',
        _key: 'row-1',
        feature: 'Bulk Broadcasting',
        values: [
          { _key: 'v1', status: 'warning', label: 'Limited & Risky' },
          { _key: 'v2', status: 'yes', label: 'Yes' },
          { _key: 'v3', status: 'yes', label: 'Yes' }
        ]
      },
      {
        _type: 'comparisonRow',
        _key: 'row-2',
        feature: 'App Access',
        values: [
          { _key: 'v4', status: 'yes', label: 'Yes' },
          { _key: 'v5', status: 'no', label: 'No' },
          { _key: 'v6', status: 'yes', label: 'Yes' }
        ]
      },
      {
        _type: 'comparisonRow',
        _key: 'row-3',
        feature: 'CRM Integration',
        values: [
          { _key: 'v7', status: 'no', label: 'No' },
          { _key: 'v8', status: 'yes', label: 'Yes' },
          { _key: 'v9', status: 'yes', label: 'Yes' }
        ]
      },
      {
        _type: 'comparisonRow',
        _key: 'row-4',
        feature: 'See Messages on Phone',
        values: [
          { _key: 'v10', status: 'yes', label: 'Yes' },
          { _key: 'v11', status: 'no', label: 'No' },
          { _key: 'v12', status: 'yes', label: 'Yes' }
        ]
      },
      {
        _type: 'comparisonRow',
        _key: 'row-5',
        feature: 'Number Ban Protection',
        values: [
          { _key: 'v13', status: 'no', label: 'High Risk' },
          { _key: 'v14', status: 'yes', label: 'Protected' },
          { _key: 'v15', status: 'yes', label: 'Protected' }
        ]
      },
      {
        _type: 'comparisonRow',
        _key: 'row-6',
        feature: 'WhatsApp Web Access',
        values: [
          { _key: 'v16', status: 'yes', label: 'Yes' },
          { _key: 'v17', status: 'no', label: 'No' },
          { _key: 'v18', status: 'yes', label: 'Yes' }
        ]
      },
      {
        _type: 'comparisonRow',
        _key: 'row-7',
        feature: 'Setup Time',
        values: [
          { _key: 'v19', status: 'neutral', label: 'Instant' },
          { _key: 'v20', status: 'warning', label: 'Days/Weeks' },
          { _key: 'v21', status: 'yes', label: 'Minutes' }
        ]
      }
    ]
  },

  // Use Cases Section
  useCasesSection: {
    _type: 'useCasesSection',
    headline: 'Built For Businesses Like Yours',
    useCases: [
      {
        _type: 'useCase',
        _key: 'usecase-1',
        title: 'E-Commerce & D2C Brands',
        description: 'Send flash sale alerts, restock notifications, and abandoned cart reminders to thousands—without losing your personal touch with VIP customers.',
        icon: 'shopping-cart'
      },
      {
        _type: 'useCase',
        _key: 'usecase-2',
        title: 'Marketing Agencies',
        description: 'Manage multiple client campaigns with CRM precision while keeping client communication natural and responsive.',
        icon: 'megaphone'
      },
      {
        _type: 'useCase',
        _key: 'usecase-3',
        title: 'Real Estate & Property',
        description: 'Broadcast new listings to your buyer database and still have one-on-one conversations with serious prospects—all from one number.',
        icon: 'building'
      },
      {
        _type: 'useCase',
        _key: 'usecase-4',
        title: 'Education & Coaching',
        description: 'Send batch updates to students and parents while maintaining individual support conversations.',
        icon: 'graduation-cap'
      },
      {
        _type: 'useCase',
        _key: 'usecase-5',
        title: 'Local Service Businesses',
        description: 'Keep the number your customers know and trust. Add API power without confusing your client base with a new number.',
        icon: 'briefcase'
      }
    ]
  },

  // Testimonials Section
  testimonialSection: {
    _type: 'testimonialSection',
    headline: 'Trusted by Growing Businesses',
    testimonials: [
      {
        _type: 'testimonial',
        _key: 'testimonial-1',
        quote: 'We were sending 50 messages a day and living in fear of getting banned. Now we broadcast to 10,000+ contacts weekly. Same number. Zero issues.',
        author: {
          name: '[Name]',
          company: '[Company]',
          role: '[Role]'
        }
      },
      {
        _type: 'testimonial',
        _key: 'testimonial-2',
        quote: 'The fact that I can still see all my chats on my phone while running API campaigns is a game-changer. It doesn\'t feel like I\'m using some cold automation tool.',
        author: {
          name: '[Name]',
          company: '[Company]',
          role: '[Role]'
        }
      },
      {
        _type: 'testimonial',
        _key: 'testimonial-3',
        quote: 'Setup took 15 minutes. Connected to our HubSpot in another 10. We were broadcasting by lunch.',
        author: {
          name: '[Name]',
          company: '[Company]',
          role: '[Role]'
        }
      }
    ]
  },

  // FAQ Section
  faqSection: {
    _type: 'faqSection',
    headline: 'Common Questions',
    faqs: [
      {
        _type: 'faq',
        _key: 'faq-1',
        question: 'Will I lose access to my WhatsApp app after connecting?',
        answer: 'No. That\'s the entire point of Coexistence. Your app works exactly as before—you can chat, make calls, send media, and see all your messages.'
      },
      {
        _type: 'faq',
        _key: 'faq-2',
        question: 'How does this protect my number from getting banned?',
        answer: 'Regular WhatsApp broadcasts go through the app\'s consumer infrastructure, which has strict spam limits. Coexistence routes your bulk messages through official API infrastructure, which is designed for business-scale messaging.'
      },
      {
        _type: 'faq',
        _key: 'faq-3',
        question: 'Can I connect to my existing CRM?',
        answer: 'Yes. The Eqzy extension works with all major CRMs including Salesforce, HubSpot, Zoho, Freshworks, and custom solutions via API.'
      },
      {
        _type: 'faq',
        _key: 'faq-4',
        question: 'How long does setup take?',
        answer: 'Most users are fully connected and broadcasting within 30 minutes.'
      },
      {
        _type: 'faq',
        _key: 'faq-5',
        question: 'Do I need a new WhatsApp number?',
        answer: 'No. You use your existing WhatsApp Business number. That\'s what makes Coexistence different.'
      },
      {
        _type: 'faq',
        _key: 'faq-6',
        question: 'Will my customers know I\'m using API?',
        answer: 'No. Messages appear exactly the same to recipients. There\'s no "sent via API" label or any difference in how your messages look.'
      },
      {
        _type: 'faq',
        _key: 'faq-7',
        question: 'What happens to my existing chats and contacts?',
        answer: 'Everything stays intact. Your chat history, contacts, and groups remain exactly as they are.'
      }
    ]
  }
};

async function createCoexistencePage() {
  try {
    console.log('Creating Coexistence product page in Sanity...');

    // Create or update the document
    const result = await client.createOrReplace(coexistencePageContent);

    console.log('✅ Success! Coexistence page created/updated with ID:', result._id);
    console.log('Document revision:', result._rev);

    return result;
  } catch (error) {
    console.error('❌ Error creating Coexistence page:', error);
    throw error;
  }
}

// Run the script
if (process.env.SANITY_API_TOKEN) {
  createCoexistencePage()
    .then(() => {
      console.log('\n🎉 All done! Your Coexistence page is now in Sanity.');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Failed to create page:', error.message);
      process.exit(1);
    });
} else {
  console.error('❌ ERROR: SANITY_API_TOKEN environment variable is required.');
  console.log('\nTo get your token:');
  console.log('1. Go to https://sanity.io/manage');
  console.log('2. Select your project (5awzi0t4)');
  console.log('3. Go to API settings');
  console.log('4. Create a token with "Editor" permissions');
  console.log('5. Run: export SANITY_API_TOKEN="your-token-here"');
  console.log('6. Then run this script again');
  process.exit(1);
}
