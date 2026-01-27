import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Sanity client with write permissions
const client = createClient({
  projectId: '5awzi0t4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

async function inspectExistingStructure() {
  console.log('🔍 Inspecting existing Sanity structure...\n');

  try {
    // Query all document types
    const allDocs = await client.fetch(`*[!(_id in path("_.**"))] {_type, _id} | order(_type asc)`);

    // Group by type
    const typeGroups = allDocs.reduce((acc: any, doc: any) => {
      if (!acc[doc._type]) {
        acc[doc._type] = [];
      }
      acc[doc._type].push(doc._id);
      return acc;
    }, {});

    console.log('📋 Available document types in Sanity:');
    Object.keys(typeGroups).forEach(type => {
      console.log(`  - ${type} (${typeGroups[type].length} documents)`);
    });

    // Try to fetch a sample landingPage or productPage to see structure
    console.log('\n🔎 Fetching sample documents for reference...\n');

    const landingPage = await client.fetch(`*[_type == "landingPage"][0]`);
    if (landingPage) {
      console.log('✅ Found landingPage structure:');
      console.log('   Fields:', Object.keys(landingPage).filter(k => !k.startsWith('_')));

      if (landingPage.sections) {
        const sectionTypes = landingPage.sections.map((s: any) => s._type);
        console.log('   Section types:', [...new Set(sectionTypes)].join(', '));
      }
    }

    const productPage = await client.fetch(`*[_type == "productPage"][0]`);
    if (productPage) {
      console.log('\n✅ Found productPage structure:');
      console.log('   Fields:', Object.keys(productPage).filter(k => !k.startsWith('_')));
    } else {
      console.log('\n❌ No productPage type found - will use landingPage structure');
    }

    return { typeGroups, landingPage, productPage };
  } catch (error: any) {
    console.error('❌ Error inspecting structure:', error.message);
    throw error;
  }
}

async function createCoexistenceContent(structure: any) {
  console.log('\n📝 Creating Coexistence content based on existing structure...\n');

  // If productPage doesn't exist, we'll create content using landingPage structure
  const useProductPage = !!structure.productPage;

  if (useProductPage) {
    console.log('Using productPage structure');
  } else {
    console.log('Using landingPage structure with sections array');
  }

  const coexistenceContent = useProductPage ? {
    _type: 'productPage',
    _id: 'coexistence-product-page',
    title: 'Coexistence',
    slug: { _type: 'slug', current: 'coexistence' },
    // Will add sections below
  } : {
    _type: 'landingPage',
    _id: 'coexistence-landing-page',
    title: 'Coexistence',
    slug: { _type: 'slug', current: 'coexistence' },
    sections: []
  };

  // Hero Section
  const heroSection = {
    _type: 'heroSection',
    _key: 'hero-section',
    badge: {
      _type: 'badge',
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
    badges: [
      { _type: 'badge', _key: 'badge-1', text: '✓ No Number Blocking Risk' },
      { _type: 'badge', _key: 'badge-2', text: '✓ Works with Any CRM' },
      { _type: 'badge', _key: 'badge-3', text: '✓ Setup in Minutes' }
    ]
  };

  // Problem Section
  const problemSection = {
    _type: 'problemSection',
    _key: 'problem-section',
    headline: 'The Impossible Choice Every Business Faces',
    subheadline: 'Most businesses feel stuck between two bad options',
    problems: [
      {
        _type: 'problem',
        _key: 'problem-1',
        title: 'Option A: Stay on WhatsApp App',
        description: 'Limited broadcast capacity, high risk of number ban, no CRM integration, manual time-consuming outreach',
        items: [
          '❌ Limited broadcast capacity',
          '❌ High risk of number ban',
          '❌ No CRM integration',
          '❌ Manual, time-consuming outreach'
        ]
      },
      {
        _type: 'problem',
        _key: 'problem-2',
        title: 'Option B: Switch to WhatsApp API',
        description: 'Lose app access completely, can\'t see messages on phone, complicated dashboard switching, feels disconnected',
        items: [
          '❌ Lose access to your WhatsApp app completely',
          '❌ Can\'t see messages on your phone',
          '❌ Complicated dashboard switching',
          '❌ Feels disconnected from your customers'
        ]
      }
    ],
    transitionText: 'What if you didn\'t have to choose?'
  };

  // Features Section (Solution)
  const solutionSection = {
    _type: 'featureSection',
    _key: 'solution-section',
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
        description: 'Send bulk messages through secure API infrastructure—not the app\'s risky broadcast feature that gets numbers banned.'
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
  };

  // Features Grid Section
  const featuresGridSection = {
    _type: 'featureSection',
    _key: 'features-grid-section',
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
        description: 'API-level sending infrastructure protects your number from WhatsApp\'s spam detection algorithms.'
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
  };

  // Comparison Section
  const comparisonSection = {
    _type: 'comparisonSection',
    _key: 'comparison-section',
    headline: 'See the Difference',
    subheadline: 'Compare Coexistence with traditional approaches',
    comparisonRows: [
      {
        _type: 'comparisonRow',
        _key: 'row-1',
        feature: 'Bulk Broadcasting',
        regularWhatsApp: '⚠️ Limited & Risky',
        standardAPI: '✅ Yes',
        coexistence: '✅ Yes'
      },
      {
        _type: 'comparisonRow',
        _key: 'row-2',
        feature: 'App Access',
        regularWhatsApp: '✅ Yes',
        standardAPI: '❌ No',
        coexistence: '✅ Yes'
      },
      {
        _type: 'comparisonRow',
        _key: 'row-3',
        feature: 'CRM Integration',
        regularWhatsApp: '❌ No',
        standardAPI: '✅ Yes',
        coexistence: '✅ Yes'
      },
      {
        _type: 'comparisonRow',
        _key: 'row-4',
        feature: 'See Messages on Phone',
        regularWhatsApp: '✅ Yes',
        standardAPI: '❌ No',
        coexistence: '✅ Yes'
      },
      {
        _type: 'comparisonRow',
        _key: 'row-5',
        feature: 'Number Ban Protection',
        regularWhatsApp: '❌ High Risk',
        standardAPI: '✅ Protected',
        coexistence: '✅ Protected'
      },
      {
        _type: 'comparisonRow',
        _key: 'row-6',
        feature: 'WhatsApp Web Access',
        regularWhatsApp: '✅ Yes',
        standardAPI: '❌ No',
        coexistence: '✅ Yes'
      },
      {
        _type: 'comparisonRow',
        _key: 'row-7',
        feature: 'Setup Time',
        regularWhatsApp: 'Instant',
        standardAPI: 'Days/Weeks',
        coexistence: 'Minutes'
      }
    ]
  };

  // Testimonials Section
  const testimonialSection = {
    _type: 'testimonialSection',
    _key: 'testimonial-section',
    headline: 'Trusted by Growing Businesses',
    subheadline: 'See what our customers say',
    testimonials: [
      {
        _type: 'testimonial',
        _key: 'testimonial-1',
        quote: 'We were sending 50 messages a day and living in fear of getting banned. Now we broadcast to 10,000+ contacts weekly. Same number. Zero issues.',
        name: '[Name]',
        role: '[Role]',
        company: '[Company]'
      },
      {
        _type: 'testimonial',
        _key: 'testimonial-2',
        quote: 'The fact that I can still see all my chats on my phone while running API campaigns is a game-changer. It doesn\'t feel like I\'m using some cold automation tool.',
        name: '[Name]',
        role: '[Role]',
        company: '[Company]'
      },
      {
        _type: 'testimonial',
        _key: 'testimonial-3',
        quote: 'Setup took 15 minutes. Connected to our HubSpot in another 10. We were broadcasting by lunch.',
        name: '[Name]',
        role: '[Role]',
        company: '[Company]'
      }
    ]
  };

  // CTA Section
  const ctaSection = {
    _type: 'ctaSection',
    _key: 'cta-section',
    headline: 'Ready to Get Started?',
    subheadline: 'Join hundreds of businesses using Coexistence',
    cta: {
      _type: 'cta',
      label: 'Start Free Trial',
      url: '/signup',
      variant: 'primary'
    }
  };

  // Assemble the complete document
  if (useProductPage) {
    // For productPage type, add sections as top-level fields
    Object.assign(coexistenceContent, {
      hero: heroSection,
      problemSection,
      solutionSection,
      featuresGridSection,
      comparisonSection,
      testimonialSection,
      ctaSection
    });
  } else {
    // For landingPage type, add all sections to the sections array
    (coexistenceContent as any).sections = [
      heroSection,
      problemSection,
      solutionSection,
      featuresGridSection,
      comparisonSection,
      testimonialSection,
      ctaSection
    ];
  }

  return coexistenceContent;
}

async function uploadContent(content: any) {
  console.log('📤 Uploading Coexistence content to Sanity...\n');

  try {
    const result = await client.createOrReplace(content);
    console.log('✅ Success! Content uploaded with ID:', result._id);
    console.log('   Revision:', result._rev);
    return result;
  } catch (error: any) {
    console.error('❌ Error uploading content:', error.message);
    if (error.details) {
      console.error('   Details:', JSON.stringify(error.details, null, 2));
    }
    throw error;
  }
}

async function main() {
  console.log('🚀 Starting Coexistence Content Upload\n');
  console.log('=' .repeat(60));

  if (!process.env.SANITY_API_TOKEN) {
    console.error('\n❌ ERROR: SANITY_API_TOKEN environment variable is required.');
    console.log('\nMake sure you have a .env file with:');
    console.log('SANITY_API_TOKEN=your_token_here');
    process.exit(1);
  }

  try {
    // Step 1: Inspect existing structure
    const structure = await inspectExistingStructure();

    // Step 2: Create content based on structure
    const content = await createCoexistenceContent(structure);

    // Step 3: Upload content
    await uploadContent(content);

    console.log('\n' + '='.repeat(60));
    console.log('🎉 All done! Your Coexistence page is now in Sanity.');
    console.log('   Visit your Sanity Studio to review and publish.');
    process.exit(0);
  } catch (error: any) {
    console.error('\n💥 Failed:', error.message);
    process.exit(1);
  }
}

main();
