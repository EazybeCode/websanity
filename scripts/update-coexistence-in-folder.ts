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

async function findCoexistencePage() {
  console.log('🔍 Looking for Coexistence page in Sanity...\n');

  try {
    // Query for all documents to understand structure
    const allDocs = await client.fetch(`*[!(_id in path("_.**"))] {
      _type,
      _id,
      title,
      name,
      slug,
      folder,
      category,
      parent
    } | order(_type asc)`);

    console.log('📋 Found', allDocs.length, 'documents\n');

    // Look for folder/category structures
    const folders = allDocs.filter((doc: any) =>
      doc._type === 'folder' ||
      doc._type === 'category' ||
      (doc.name && doc.name.toLowerCase().includes('whatsapp'))
    );

    console.log('📁 Potential folder/category documents:');
    folders.forEach((f: any) => {
      console.log(`  - ${f._type}: ${f.name || f.title || f._id}`);
    });

    // Look for coexistence pages
    const coexistencePages = allDocs.filter((doc: any) =>
      doc.title?.toLowerCase().includes('coexistence') ||
      doc.name?.toLowerCase().includes('coexistence') ||
      doc.slug?.current?.includes('coexistence') ||
      doc._id.toLowerCase().includes('coexistence')
    );

    console.log('\n📄 Coexistence-related documents:');
    if (coexistencePages.length > 0) {
      coexistencePages.forEach((p: any) => {
        console.log(`  - ${p._type} (${p._id}): ${p.title || p.name || 'Untitled'}`);
        if (p.folder || p.category || p.parent) {
          console.log(`    Parent: ${p.folder || p.category || p.parent}`);
        }
      });
    } else {
      console.log('  ❌ No coexistence pages found');
    }

    // Look for WhatsApp API related documents
    const whatsappDocs = allDocs.filter((doc: any) =>
      doc.title?.toLowerCase().includes('whatsapp') ||
      doc.name?.toLowerCase().includes('whatsapp') ||
      doc._id.toLowerCase().includes('whatsapp')
    );

    console.log('\n📱 WhatsApp-related documents:');
    whatsappDocs.forEach((w: any) => {
      console.log(`  - ${w._type} (${w._id}): ${w.title || w.name || 'Untitled'}`);
    });

    // Fetch full details if we found a coexistence page
    if (coexistencePages.length > 0) {
      console.log('\n🔎 Fetching full details of coexistence page...');
      const fullPage = await client.fetch(`*[_id == "${coexistencePages[0]._id}"][0]{...}`);
      console.log('\nFull page structure:');
      console.log('Fields:', Object.keys(fullPage).filter(k => !k.startsWith('_')));

      return { found: true, page: fullPage, allDocs };
    }

    return { found: false, allDocs };
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    throw error;
  }
}

async function updateCoexistencePage(existingPage: any) {
  console.log('\n📝 Updating Coexistence page with new content...\n');

  const updatedContent = {
    ...existingPage,

    // Hero Section Data
    heroHeadline: 'API Power. App Freedom. Zero Compromise.',
    heroSubheadline: 'Convert your WhatsApp Business number to API and keep using your app—broadcast at scale without risking your number.',
    heroCTAPrimary: 'Start Free Trial',
    heroCTASecondary: 'Watch Demo',
    heroTrustBadges: [
      '✓ No Number Blocking Risk',
      '✓ Works with Any CRM',
      '✓ Setup in Minutes'
    ],

    // Problem Section
    problemHeadline: 'The Impossible Choice Every Business Faces',
    problemOptions: [
      {
        _type: 'problemOption',
        _key: 'option-a',
        title: 'Option A: Stay on WhatsApp App',
        items: [
          '❌ Limited broadcast capacity',
          '❌ High risk of number ban',
          '❌ No CRM integration',
          '❌ Manual, time-consuming outreach'
        ]
      },
      {
        _type: 'problemOption',
        _key: 'option-b',
        title: 'Option B: Switch to WhatsApp API',
        items: [
          '❌ Lose access to your WhatsApp app completely',
          '❌ Can\'t see messages on your phone',
          '❌ Complicated dashboard switching',
          '❌ Feels disconnected from your customers'
        ]
      }
    ],
    problemTransition: 'What if you didn\'t have to choose?',

    // Solution Section
    solutionHeadline: 'Introducing Coexistence',
    solutionSubheadline: 'The only solution that gives you full API capabilities while keeping your WhatsApp app fully functional.',
    solutionFeatures: [
      {
        _type: 'feature',
        _key: 'sol-1',
        title: 'Dual Access',
        description: 'Your number works on API AND your WhatsApp app simultaneously. No lockouts. No restrictions.',
        icon: 'dual-access'
      },
      {
        _type: 'feature',
        _key: 'sol-2',
        title: 'Safe Broadcasting',
        description: 'Send bulk messages through secure API infrastructure—not the app\'s risky broadcast feature that gets numbers banned.',
        icon: 'safe-broadcasting'
      },
      {
        _type: 'feature',
        _key: 'sol-3',
        title: 'Universal CRM Sync',
        description: 'Connect to any CRM you already use with the Eqzy extension. Salesforce, HubSpot, Zoho, custom solutions—all compatible.',
        icon: 'universal-crm'
      },
      {
        _type: 'feature',
        _key: 'sol-4',
        title: 'Unified Inbox',
        description: 'Every client message appears in your WhatsApp app. No dashboard hopping. No missed conversations.',
        icon: 'unified-inbox'
      }
    ],

    // How It Works
    howItWorksHeadline: 'Live in 4 Simple Steps',
    howItWorksSteps: [
      {
        _type: 'step',
        _key: 'step-1',
        number: 1,
        title: 'Connect Your Number',
        description: 'Link your existing WhatsApp Business number through our secure connection process.'
      },
      {
        _type: 'step',
        _key: 'step-2',
        number: 2,
        title: 'Enable API Access',
        description: 'Your number converts to API-enabled status in minutes—not days.'
      },
      {
        _type: 'step',
        _key: 'step-3',
        number: 3,
        title: 'Install Eqzy Extension',
        description: 'Add the browser extension to connect your number with your preferred CRM.'
      },
      {
        _type: 'step',
        _key: 'step-4',
        number: 4,
        title: 'Broadcast from WhatsApp Web',
        description: 'Send campaigns directly from the familiar WhatsApp Web interface. Start reaching customers at scale.'
      }
    ],

    // Features Grid
    featuresHeadline: 'Everything You Need. Nothing You Don\'t.',
    features: [
      {
        _type: 'feature',
        _key: 'feat-1',
        title: 'App Continuity',
        description: 'Keep using WhatsApp on your phone exactly as before. Chat, call, send voice notes—nothing changes.'
      },
      {
        _type: 'feature',
        _key: 'feat-2',
        title: 'Broadcast Protection',
        description: 'API-level sending infrastructure protects your number from WhatsApp\'s spam detection algorithms.'
      },
      {
        _type: 'feature',
        _key: 'feat-3',
        title: 'CRM Integration',
        description: 'One-click connection to any CRM through Eqzy extension. Sync contacts, conversations, and campaigns.'
      },
      {
        _type: 'feature',
        _key: 'feat-4',
        title: 'WhatsApp Web Broadcasting',
        description: 'Run bulk campaigns from the interface you already know. No learning curve.'
      },
      {
        _type: 'feature',
        _key: 'feat-5',
        title: 'Real-Time Message Sync',
        description: 'All incoming messages visible in your WhatsApp app instantly—even from API-triggered conversations.'
      },
      {
        _type: 'feature',
        _key: 'feat-6',
        title: 'Multi-User Access',
        description: 'Your team can access the same number across devices without conflicts.'
      }
    ],

    // Comparison Table
    comparisonHeadline: 'See the Difference',
    comparisonRows: [
      {
        _type: 'comparisonRow',
        _key: 'comp-1',
        feature: 'Bulk Broadcasting',
        regularWhatsApp: '⚠️ Limited & Risky',
        standardAPI: '✅ Yes',
        coexistence: '✅ Yes'
      },
      {
        _type: 'comparisonRow',
        _key: 'comp-2',
        feature: 'App Access',
        regularWhatsApp: '✅ Yes',
        standardAPI: '❌ No',
        coexistence: '✅ Yes'
      },
      {
        _type: 'comparisonRow',
        _key: 'comp-3',
        feature: 'CRM Integration',
        regularWhatsApp: '❌ No',
        standardAPI: '✅ Yes',
        coexistence: '✅ Yes'
      },
      {
        _type: 'comparisonRow',
        _key: 'comp-4',
        feature: 'See Messages on Phone',
        regularWhatsApp: '✅ Yes',
        standardAPI: '❌ No',
        coexistence: '✅ Yes'
      },
      {
        _type: 'comparisonRow',
        _key: 'comp-5',
        feature: 'Number Ban Protection',
        regularWhatsApp: '❌ High Risk',
        standardAPI: '✅ Protected',
        coexistence: '✅ Protected'
      },
      {
        _type: 'comparisonRow',
        _key: 'comp-6',
        feature: 'WhatsApp Web Access',
        regularWhatsApp: '✅ Yes',
        standardAPI: '❌ No',
        coexistence: '✅ Yes'
      },
      {
        _type: 'comparisonRow',
        _key: 'comp-7',
        feature: 'Setup Time',
        regularWhatsApp: 'Instant',
        standardAPI: 'Days/Weeks',
        coexistence: 'Minutes'
      }
    ],

    // Use Cases
    useCasesHeadline: 'Built For Businesses Like Yours',
    useCases: [
      {
        _type: 'useCase',
        _key: 'uc-1',
        title: 'E-Commerce & D2C Brands',
        description: 'Send flash sale alerts, restock notifications, and abandoned cart reminders to thousands—without losing your personal touch with VIP customers.'
      },
      {
        _type: 'useCase',
        _key: 'uc-2',
        title: 'Marketing Agencies',
        description: 'Manage multiple client campaigns with CRM precision while keeping client communication natural and responsive.'
      },
      {
        _type: 'useCase',
        _key: 'uc-3',
        title: 'Real Estate & Property',
        description: 'Broadcast new listings to your buyer database and still have one-on-one conversations with serious prospects—all from one number.'
      },
      {
        _type: 'useCase',
        _key: 'uc-4',
        title: 'Education & Coaching',
        description: 'Send batch updates to students and parents while maintaining individual support conversations.'
      },
      {
        _type: 'useCase',
        _key: 'uc-5',
        title: 'Local Service Businesses',
        description: 'Keep the number your customers know and trust. Add API power without confusing your client base with a new number.'
      }
    ],

    // Testimonials
    testimonialsHeadline: 'Trusted by Growing Businesses',
    testimonials: [
      {
        _type: 'testimonial',
        _key: 'test-1',
        quote: 'We were sending 50 messages a day and living in fear of getting banned. Now we broadcast to 10,000+ contacts weekly. Same number. Zero issues.',
        name: '[Name]',
        role: '[Role]',
        company: '[Company]'
      },
      {
        _type: 'testimonial',
        _key: 'test-2',
        quote: 'The fact that I can still see all my chats on my phone while running API campaigns is a game-changer. It doesn\'t feel like I\'m using some cold automation tool.',
        name: '[Name]',
        role: '[Role]',
        company: '[Company]'
      },
      {
        _type: 'testimonial',
        _key: 'test-3',
        quote: 'Setup took 15 minutes. Connected to our HubSpot in another 10. We were broadcasting by lunch.',
        name: '[Name]',
        role: '[Role]',
        company: '[Company]'
      }
    ],

    // FAQ
    faqHeadline: 'Common Questions',
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
  };

  try {
    const result = await client.createOrReplace(updatedContent);
    console.log('✅ Success! Coexistence page updated');
    console.log('   Document ID:', result._id);
    console.log('   Revision:', result._rev);
    return result;
  } catch (error: any) {
    console.error('❌ Error updating page:', error.message);
    if (error.details) {
      console.error('   Details:', JSON.stringify(error.details, null, 2));
    }
    throw error;
  }
}

async function main() {
  console.log('🚀 Updating Coexistence Page in Sanity\n');
  console.log('='.repeat(60));

  if (!process.env.SANITY_API_TOKEN) {
    console.error('\n❌ ERROR: SANITY_API_TOKEN environment variable is required.');
    console.log('\nMake sure you have a .env file with:');
    console.log('SANITY_API_TOKEN=your_token_here');
    process.exit(1);
  }

  try {
    // Find the coexistence page
    const result = await findCoexistencePage();

    if (result.found) {
      // Update it with new content
      await updateCoexistencePage(result.page);
      console.log('\n' + '='.repeat(60));
      console.log('🎉 Done! Coexistence page updated in Sanity.');
    } else {
      console.log('\n⚠️  No coexistence page found.');
      console.log('\nPlease check your Sanity Studio and create the coexistence page first,');
      console.log('or provide the document ID so I can create it.');
    }

    process.exit(0);
  } catch (error: any) {
    console.error('\n💥 Failed:', error.message);
    process.exit(1);
  }
}

main();
