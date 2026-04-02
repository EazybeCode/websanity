/**
 * JSON-LD structured data for Zoho WhatsApp Integration page
 * Includes: FAQPage, BreadcrumbList, WebPage, Product, HowTo
 */

export function ZohoStructuredData() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': 'https://eazybe.com/zoho-whatsapp-integration/#faq',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I connect WhatsApp to Zoho CRM?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Install Eazybe and connect your Zoho account. Eazybe syncs WhatsApp chats to Zoho so conversations and customer context stay linked to the right CRM records.'
        }
      },
      {
        '@type': 'Question',
        name: 'Does Eazybe sync WhatsApp messages into Zoho automatically?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Eazybe can sync WhatsApp conversations to Zoho automatically, reducing manual copy/paste and keeping sales activity up to date.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can multiple teammates use a shared inbox with Zoho + WhatsApp?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Eazybe supports shared inbox workflows so teams can collaborate on WhatsApp leads while keeping Zoho records aligned.'
        }
      },
      {
        '@type': 'Question',
        name: 'What can AI agents do for Zoho + WhatsApp conversations?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'AI can help draft replies, summarize conversations, and speed up follow-ups—so reps respond faster while maintaining consistent messaging.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is this integration safe to use with WhatsApp and Zoho?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Eazybe is designed for business use cases and focuses on secure workflows for syncing WhatsApp conversations with CRM records. Always review your security and compliance requirements before rollout.'
        }
      },
      {
        '@type': 'Question',
        name: 'Which Zoho objects can I associate WhatsApp conversations with?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most teams associate WhatsApp conversations with contacts, leads, and deals (potentials) to track context across the sales pipeline. The best mapping depends on your Zoho workflow.'
        }
      }
    ]
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Eazybe', item: 'https://eazybe.com/' },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Zoho WhatsApp Integration',
        item: 'https://eazybe.com/zoho-whatsapp-integration'
      }
    ]
  }

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: 'https://eazybe.com/zoho-whatsapp-integration',
    name: 'Zoho WhatsApp Integration: Sync WhatsApp With AI Agents',
    description: 'Connect WhatsApp with Zoho CRM. Sync chats automatically, use AI agents, track deals, and manage sales conversations directly inside Zoho.',
    inLanguage: 'en',
    datePublished: '2026-02-03T08:00:00+00:00',
    dateModified: '2026-04-02T10:30:00+00:00'
  }

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Zoho WhatsApp Integration - Eazybe',
    url: 'https://eazybe.com/zoho-whatsapp-integration',
    image: ['https://eazybe.com/logo.png'],
    description: 'Eazybe connects WhatsApp with Zoho CRM to automatically sync chats, help sales teams respond faster with AI, and manage customer conversations with shared inbox workflows.',
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
      audienceType: 'Sales teams, Zoho users, CRM managers, B2B businesses'
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
    name: 'How to connect WhatsApp to Zoho CRM using Eazybe',
    description: 'Follow these steps to install Eazybe and sync WhatsApp conversations with Zoho CRM so your team can track chats, speed up follow-ups, and keep CRM records up to date.',
    totalTime: 'PT5M',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: '0'
    },
    supply: [
      {
        '@type': 'HowToSupply',
        name: 'Active Zoho account'
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
        url: 'https://eazybe.com/zoho-whatsapp-integration#step1',
        name: 'Install the Eazybe extension',
        text: 'Open the Chrome Web Store and install the official Eazybe extension in your browser.',
        image: 'https://eazybe.com/logo.png'
      },
      {
        '@type': 'HowToStep',
        url: 'https://eazybe.com/zoho-whatsapp-integration#step2',
        name: 'Open WhatsApp Web',
        text: 'Go to WhatsApp Web on your computer and sign in. The Eazybe panel will appear inside WhatsApp Web.',
        image: 'https://eazybe.com/logo.png'
      },
      {
        '@type': 'HowToStep',
        url: 'https://eazybe.com/zoho-whatsapp-integration#step3',
        name: 'Connect your Zoho account',
        text: 'In the Eazybe panel, choose Zoho and complete the authorization flow to connect your CRM securely.',
        image: 'https://eazybe.com/logo.png'
      },
      {
        '@type': 'HowToStep',
        url: 'https://eazybe.com/zoho-whatsapp-integration#step4',
        name: 'Enable chat sync to Zoho',
        text: 'Select a contact or conversation and enable syncing. WhatsApp messages and customer context will start syncing to Zoho automatically.',
        image: 'https://eazybe.com/logo.png'
      },
      {
        '@type': 'HowToStep',
        url: 'https://eazybe.com/zoho-whatsapp-integration#step5',
        name: 'Use AI replies and team workflows',
        text: 'Use AI-assisted replies to respond faster and shared inbox workflows to collaborate with your team while keeping Zoho updated.',
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
        data-schema="breadcrumb-zoho"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        data-schema="webpage-zoho"
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
