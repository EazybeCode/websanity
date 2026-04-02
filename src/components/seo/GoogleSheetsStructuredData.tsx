/**
 * JSON-LD structured data for Google Sheets WhatsApp Integration page
 * Includes: FAQPage, BreadcrumbList, WebPage, Product, HowTo
 */

export function GoogleSheetsStructuredData() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': 'https://eazybe.com/google-sheets-whatsapp-integration/#faq',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I connect WhatsApp to Google Sheets?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Install Eazybe and connect your Google account. Eazybe syncs WhatsApp chats to Google Sheets so conversations and customer data are automatically captured in your spreadsheets.'
        }
      },
      {
        '@type': 'Question',
        name: 'Does Eazybe sync WhatsApp messages into Google Sheets automatically?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Eazybe can sync WhatsApp conversations to Google Sheets automatically, reducing manual data entry and keeping your records up to date.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can multiple teammates use a shared inbox with Google Sheets + WhatsApp?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Eazybe supports shared inbox workflows so teams can collaborate on WhatsApp leads while keeping Google Sheets records synchronized.'
        }
      },
      {
        '@type': 'Question',
        name: 'What can AI agents do for Google Sheets + WhatsApp conversations?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'AI can help draft replies, summarize conversations, and speed up follow-ups—so reps respond faster while maintaining consistent messaging.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is this integration safe to use with WhatsApp and Google Sheets?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Eazybe is designed for business use cases and focuses on secure workflows for syncing WhatsApp conversations with Google Sheets. Always review your security and compliance requirements before rollout.'
        }
      },
      {
        '@type': 'Question',
        name: 'What data gets synced from WhatsApp to Google Sheets?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Eazybe can sync contact information, message content, timestamps, and custom fields to Google Sheets. The exact data mapping depends on your workflow requirements.'
        }
      }
    ]
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'integrations', item: 'https://eazybe.com/integrations' },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'google sheets whatsapp integration',
        item: 'https://eazybe.com/google-sheets-whatsapp-integration'
      }
    ]
  }

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: 'https://eazybe.com/google-sheets-whatsapp-integration',
    name: 'Google Sheets WhatsApp Integration With AI Agents | Eazybe',
    description: 'Connect WhatsApp with Google Sheets. Sync chats automatically, use AI agents, track deals, and manage sales conversations directly inside Google Sheets.',
    inLanguage: 'en',
    datePublished: '2026-02-03T08:00:00+00:00',
    dateModified: '2026-04-01T10:30:00+00:00'
  }

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Google Sheets WhatsApp Integration - Eazybe',
    url: 'https://eazybe.com/google-sheets-whatsapp-integration',
    image: ['https://eazybe.com/logo.png'],
    description: 'Eazybe connects WhatsApp with Google Sheets to automatically sync chats, help sales teams respond faster with AI, and manage customer conversations with shared inbox workflows.',
    brand: {
      '@type': 'Brand',
      name: 'Eazybe'
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Eazybe',
      url: 'https://eazybe.com/'
    },
    category: 'CRM Integration Software',
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'Sales teams, Google Sheets users, spreadsheet users, B2B businesses'
    },
    offers: {
      '@type': 'AggregateOffer',
      url: 'https://eazybe.com/pricing',
      priceCurrency: 'USD',
      lowPrice: 29,
      highPrice: 49,
      offerCount: 5,
      availability: 'https://schema.org/InStock'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: 4.9,
      bestRating: 5,
      worstRating: 1,
      ratingCount: 30597
    }
  }

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to connect WhatsApp to Google Sheets using Eazybe',
    description: 'Follow these steps to install Eazybe and sync WhatsApp conversations with Google Sheets so your team can track chats, speed up follow-ups, and keep spreadsheet records up to date.',
    totalTime: 'PT5M',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: '0'
    },
    supply: [
      {
        '@type': 'HowToSupply',
        name: 'Active Google account'
      },
      {
        '@type': 'HowToSupply',
        name: 'WhatsApp account with access to WhatsApp Web'
      }
    ],
    tool: [
      {
        '@type': 'HowToTool',
        name: 'Google Chrome (or Chromium-based browser)'
      },
      {
        '@type': 'HowToTool',
        name: 'Eazybe Chrome Extension'
      }
    ],
    step: [
      {
        '@type': 'HowToStep',
        url: 'https://eazybe.com/google-sheets-whatsapp-integration#step1',
        name: 'Install the Eazybe extension',
        text: 'Open the Chrome Web Store and install the official Eazybe extension in your browser.',
        image: 'https://eazybe.com/logo.png'
      },
      {
        '@type': 'HowToStep',
        url: 'https://eazybe.com/google-sheets-whatsapp-integration#step2',
        name: 'Open WhatsApp Web',
        text: 'Go to WhatsApp Web on your computer and sign in. The Eazybe panel will appear inside WhatsApp Web.',
        image: 'https://eazybe.com/logo.png'
      },
      {
        '@type': 'HowToStep',
        url: 'https://eazybe.com/google-sheets-whatsapp-integration#step3',
        name: 'Connect your Google Sheets account',
        text: 'In the Eazybe panel, choose Google Sheets and complete the authorization flow to connect your account securely.',
        image: 'https://eazybe.com/logo.png'
      },
      {
        '@type': 'HowToStep',
        url: 'https://eazybe.com/google-sheets-whatsapp-integration#step4',
        name: 'Enable chat sync to Google Sheets',
        text: 'Select a contact or conversation and enable syncing. WhatsApp messages and customer data will start syncing to Google Sheets automatically.',
        image: 'https://eazybe.com/logo.png'
      },
      {
        '@type': 'HowToStep',
        url: 'https://eazybe.com/google-sheets-whatsapp-integration#step5',
        name: 'Use AI replies and team workflows',
        text: 'Use AI-assisted replies to respond faster and shared inbox workflows to collaborate with your team while keeping Google Sheets updated.',
        image: 'https://eazybe.com/logo.png'
      }
    ],
    inLanguage: 'en-US'
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        data-schema="breadcrumb-google-sheets"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        data-schema="webpage-google-sheets"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        data-schema="product"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        data-schema="howto"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
    </>
  )
}
