/**
 * JSON-LD structured data for Bitrix24 WhatsApp Integration page
 * Includes: FAQPage, BreadcrumbList, WebPage, Product, HowTo
 */

export function Bitrix24StructuredData() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': 'https://eazybe.com/bitrix24-whatsapp-integration/#faq',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I connect WhatsApp to Bitrix24 CRM?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Install Eazybe and connect your Bitrix24 account. Eazybe syncs WhatsApp chats to Bitrix24 so conversations and customer context stay linked to the right CRM records.'
        }
      },
      {
        '@type': 'Question',
        name: 'Does Eazybe sync WhatsApp messages into Bitrix24 automatically?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Eazybe can sync WhatsApp conversations to Bitrix24 automatically, reducing manual copy/paste and keeping sales activity up to date.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can multiple teammates use a shared inbox with Bitrix24 + WhatsApp?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Eazybe supports shared inbox workflows so teams can collaborate on WhatsApp leads while keeping Bitrix24 records aligned.'
        }
      },
      {
        '@type': 'Question',
        name: 'What can AI agents do for Bitrix24 + WhatsApp conversations?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'AI can help draft replies, summarize conversations, and speed up follow-ups—so reps respond faster while maintaining consistent messaging.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is this integration safe to use with WhatsApp and Bitrix24?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Eazybe is designed for business use cases and focuses on secure workflows for syncing WhatsApp conversations with CRM records. Always review your security and compliance requirements before rollout.'
        }
      },
      {
        '@type': 'Question',
        name: 'Which Bitrix24 objects can I associate WhatsApp conversations with?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most teams associate WhatsApp conversations with contacts and deals to track context across the sales pipeline. The best mapping depends on your Bitrix24 workflow.'
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
        name: 'bitrix24 whatsapp integration',
        item: 'https://eazybe.com/bitrix24-whatsapp-integration'
      }
    ]
  }

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: 'https://eazybe.com/bitrix24-whatsapp-integration',
    name: 'Bitrix24 WhatsApp Integration | Connect WhatsApp To Bitrix24',
    description: 'Connect WhatsApp with Bitrix24 CRM. Sync chats automatically, use AI agents, track deals, and manage sales conversations directly inside Bitrix24.',
    inLanguage: 'en',
    datePublished: '2026-02-03T08:00:00+00:00',
    dateModified: '2026-04-01T10:30:00+00:00'
  }

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Bitrix24 WhatsApp Integration - Eazybe',
    url: 'https://eazybe.com/bitrix24-whatsapp-integration',
    image: ['https://eazybe.com/logo.png'],
    description: 'Eazybe connects WhatsApp with Bitrix24 CRM to automatically sync chats, help sales teams respond faster with AI, and manage customer conversations with shared inbox workflows.',
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
      audienceType: 'Sales teams, Bitrix24 users, CRM managers, B2B businesses'
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
    name: 'How to connect WhatsApp to Bitrix24 CRM using Eazybe',
    description: 'Follow these steps to install Eazybe and sync WhatsApp conversations with Bitrix24 CRM so your team can track chats, speed up follow-ups, and keep CRM records up to date.',
    totalTime: 'PT5M',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: '0'
    },
    supply: [
      {
        '@type': 'HowToSupply',
        name: 'Active Bitrix24 account'
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
        url: 'https://eazybe.com/bitrix24-whatsapp-integration#step1',
        name: 'Install the Eazybe extension',
        text: 'Open the Chrome Web Store and install the official Eazybe extension in your browser.',
        image: 'https://eazybe.com/logo.png'
      },
      {
        '@type': 'HowToStep',
        url: 'https://eazybe.com/bitrix24-whatsapp-integration#step2',
        name: 'Open WhatsApp Web',
        text: 'Go to WhatsApp Web on your computer and sign in. The Eazybe panel will appear inside WhatsApp Web.',
        image: 'https://eazybe.com/logo.png'
      },
      {
        '@type': 'HowToStep',
        url: 'https://eazybe.com/bitrix24-whatsapp-integration#step3',
        name: 'Connect your Bitrix24 account',
        text: 'In the Eazybe panel, choose Bitrix24 and complete the authorization flow to connect your CRM securely.',
        image: 'https://eazybe.com/logo.png'
      },
      {
        '@type': 'HowToStep',
        url: 'https://eazybe.com/bitrix24-whatsapp-integration#step4',
        name: 'Enable chat sync to Bitrix24',
        text: 'Select a contact or conversation and enable syncing. WhatsApp messages and customer context will start syncing to Bitrix24 automatically.',
        image: 'https://eazybe.com/logo.png'
      },
      {
        '@type': 'HowToStep',
        url: 'https://eazybe.com/bitrix24-whatsapp-integration#step5',
        name: 'Use AI replies and team workflows',
        text: 'Use AI-assisted replies to respond faster and shared inbox workflows to collaborate with your team while keeping Bitrix24 updated.',
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
        data-schema="breadcrumb-bitrix24"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        data-schema="webpage-bitrix24"
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
