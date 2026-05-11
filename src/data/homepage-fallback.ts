/**
 * Static fallback data for the homepage when Sanity CMS is unavailable
 * (e.g. API quota exceeded, network issues, etc.)
 */

export const fallbackSections = [
  {
    _type: 'heroSection',
    _key: 'hero-fallback',
    badge: 'WhatsApp AI Agents for Sales',
    headline: 'Turn WhatsApp into your',
    headlineHighlight: 'revenue engine',
    subheadline:
      'AI agents that qualify leads, detect cold deals, automate follow-ups, and sync every conversation to your CRM — all inside WhatsApp Web.',
    socialProof: 'Trusted by 2,000+ sales teams worldwide',
    primaryCta: { label: 'Install for Free', url: '#' },
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
    headline: 'Your sales team is losing deals on WhatsApp',
    subheadline:
      'Without AI-powered automation, critical conversations slip through the cracks.',
    problems: [
      {
        _key: 'p1',
        title: 'Leads go cold',
        description:
          'Sales reps forget to follow up. Hot leads turn cold within hours.',
        icon: 'clock',
      },
      {
        _key: 'p2',
        title: 'No CRM sync',
        description:
          'Conversations happen on WhatsApp but never reach your CRM. Zero visibility.',
        icon: 'database',
      },
      {
        _key: 'p3',
        title: 'Manual chaos',
        description:
          'Copy-pasting messages, manual data entry, no templates. Hours wasted daily.',
        icon: 'zap',
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
