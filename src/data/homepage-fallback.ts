/**
 * Static fallback data for the homepage when Sanity CMS is unavailable
 * (e.g. API quota exceeded, network issues, etc.)
 */

export const fallbackSections = [
  {
    _type: 'heroSection',
    _key: 'hero-fallback',
    badge: 'WHATSAPP AI · CRM-NATIVE · 24/7',
    headline: 'Sell on WhatsApp.',
    headlineHighlight: 'See it all in your CRM.',
    subheadline:
      'AI agents trained on your best chats. Sync every conversation to your CRM. Qualify leads while you sleep.',
    socialProof: 'Try it live — our agent qualifies you in 60 seconds.',
    primaryCta: { label: 'Talk to our Agent on WhatsApp', url: 'https://wa.me/13023356201?text=Hi%20-%20I%27d%20like%20to%20see%20how%20Eazybe%20works.' },
    secondaryCta: { label: 'Book a Demo', url: '#' },
  },
  {
    _type: 'clientLogosSection',
    _key: 'logos-fallback',
  },
  {
    _type: 'problemSection',
    _key: 'problem-fallback',
    badge: 'The Problem',
    headline: 'Selling on WhatsApp is easy. Everything around it is broken.',
    subheadline:
      'Four blind spots killing your pipeline — each has an agent that fixes it.',
    problems: [
      {
        _key: 'p1',
        title: '200 chats today. Zero in the CRM.',
        description:
          "Reps sell all day. Nothing's logged. No handoff. No trail.",
        icon: 'database',
      },
      {
        _key: 'p2',
        title: '11 PM lead. By morning, gone.',
        description:
          'Nobody answers after hours. You lose them every night.',
        icon: 'clock',
      },
      {
        _key: 'p3',
        title: 'Deals ghosted. Nobody noticed.',
        description:
          'Warm deals stall for weeks in silent threads. Revenue dies quiet.',
        icon: 'zap',
      },
      {
        _key: 'p4',
        title: 'Customers ping. Support sleeps.',
        description:
          'Same questions, every day. No one picks up until Monday.',
        icon: 'message',
      },
    ],
  },
  {
    _type: 'featureSection',
    _key: 'features-fallback',
    features: [
      {
        _key: 'f1',
        badge: 'crm-sync',
        headline: 'One-click CRM Sync',
        description:
          'Every WhatsApp conversation automatically synced to HubSpot, Salesforce, Zoho, or 10+ other CRMs. No manual data entry.',
        points: [
          'Real-time bi-directional sync',
          'Auto-create contacts and deals',
          'Map WhatsApp labels to CRM stages',
          'Sync attachments and media',
        ],
        ctaUrl: '#',
        alignRight: false,
        id: 'crm-sync',
      },
      {
        _key: 'f2',
        badge: 'ai-chatbot',
        headline: 'AI Chatbot Agent',
        description:
          'Let AI handle initial conversations, qualify leads 24/7, and route hot prospects to the right sales rep instantly.',
        points: [
          'Train on your product knowledge',
          'Qualify leads automatically',
          'Smart handoff to human agents',
          'Works in multiple languages',
        ],
        ctaUrl: '#',
        alignRight: true,
        id: 'ai-chatbot',
      },
      {
        _key: 'f3',
        badge: 'team-inbox',
        headline: 'Shared Team Inbox',
        description:
          'Multiple team members collaborating on WhatsApp conversations with assignments, notes, and collision detection.',
        points: [
          'Assign chats to team members',
          'Internal notes on conversations',
          'See who is viewing/typing',
          'Role-based access control',
        ],
        ctaUrl: '#',
        alignRight: false,
        id: 'team-inbox',
      },
      {
        _key: 'f4',
        badge: 'analytics',
        headline: 'Revenue Inbox & Analytics',
        description:
          'Track which WhatsApp conversations drive revenue. See response times, deal velocity, and team performance at a glance.',
        points: [
          'Revenue attribution per conversation',
          'Response time tracking',
          'Team performance leaderboard',
          'Deal pipeline from WhatsApp',
        ],
        ctaUrl: '#',
        alignRight: true,
        id: 'analytics',
      },
    ],
  },
  {
    _type: 'integrationsSection',
    _key: 'integrations-fallback',
    title: 'Integrates with your favorite tools',
    integrations: [
      { _key: 'i1', name: 'HubSpot', logoUrl: '' },
      { _key: 'i2', name: 'Salesforce', logoUrl: '' },
      { _key: 'i3', name: 'Zoho CRM', logoUrl: '' },
      { _key: 'i4', name: 'Bitrix24', logoUrl: '' },
      { _key: 'i5', name: 'Google Sheets', logoUrl: '' },
      { _key: 'i6', name: 'Freshdesk', logoUrl: '' },
    ],
    showWebhooks: true,
    footnote: 'And many more through custom webhooks',
  },
  {
    _type: 'statsSection',
    _key: 'stats-fallback',
  },
  {
    _type: 'testimonialSection',
    _key: 'testimonial-fallback',
  },
  {
    _type: 'comparisonSection',
    _key: 'comparison-fallback',
    badge: 'Why Eazybe?',
    headline: 'Eazybe vs Other Tools',
    description: 'See how Eazybe compares to other WhatsApp business tools.',
    comparisonRows: [
      { _key: 'c1', capability: 'WhatsApp Web Chrome Extension', otherTools: false, eazybe: true },
      { _key: 'c2', capability: 'CRM Integration (HubSpot, Salesforce, Zoho)', otherTools: false, eazybe: true },
      { _key: 'c3', capability: 'AI Chatbot Agent', otherTools: false, eazybe: true },
      { _key: 'c4', capability: 'Revenue Inbox', otherTools: false, eazybe: true },
      { _key: 'c5', capability: 'Team Inbox', otherTools: true, eazybe: true },
      { _key: 'c6', capability: 'WhatsApp API Coexistence', otherTools: false, eazybe: true },
      { _key: 'c7', capability: 'Scheduled Messages', otherTools: true, eazybe: true },
      { _key: 'c8', capability: 'Custom Labels & Filters', otherTools: true, eazybe: true },
    ],
  },
]
