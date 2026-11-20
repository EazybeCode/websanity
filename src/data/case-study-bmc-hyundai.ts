/**
 * Content for /case-studies/bmc-hyundai — BMC Hyundai (heavy machinery,
 * Brazil) AI-agent pilot story. Source: "BMC_Hyundai_Eazybe_Case_Study_v7"
 * deck. Figures marked "pilot goal" are targets until the 2-week pilot ends;
 * keep those labels when editing. English only for now; locale-keyed so
 * translations can slot in later.
 */

export interface Stat {
  value: string
  label: string
  note?: string
}

export interface BmcContent {
  meta: { title: string; description: string; ogDescription: string }
  breadcrumb: { home: string; hub: string; current: string }
  hero: {
    eyebrow: string
    h1Lead: string
    h1Highlight: string
    h1Tail: string
    subtitle: string
    stats: Stat[]
  }
  about: { tag: string; h2: string; body: string; facts: Stat[]; source: string }
  history: {
    tag: string
    h2: string
    stats: Stat[]
    milestones: { year: string; label: string }[]
    source: string
  }
  challenge: {
    tag: string
    h2Lead: string
    h2Highlight: string
    replyTime: Stat
    questions: Stat
    industry: Stat
    loadTitle: string
    load: { label: string; value: string; pct: number }[]
    loadNote: string
  }
  rule: {
    tag: string
    h2Lead: string
    h2Highlight: string
    quote: string
    quoteBy: string
    notOption: { label: string; body: string }
    built: { label: string; body: string }
    privacy: string
  }
  parts: {
    tag: string
    h2Lead: string
    h2Highlight: string
    subtitle: string
    items: { num: string; status: 'live' | 'offered' | 'pilot'; statusLabel: string; title: string; body: string; foot: string }[]
  }
  agent: {
    tag: string
    h2Lead: string
    h2Highlight: string
    flow: string[]
    stats: Stat[]
  }
  crm: {
    tag: string
    h2Lead: string
    h2Highlight: string
    cards: { title: string; body: string; metric: string; checklist?: string[] }[]
  }
  sla: {
    tag: string
    h2Lead: string
    h2Highlight: string
    cards: { title: string; body: string }[]
    stats: Stat[]
  }
  handover: {
    tag: string
    h2Lead: string
    h2Highlight: string
    steps: string[]
  }
  beforeAfter: {
    tag: string
    h2Lead: string
    h2Highlight: string
    barsTitle: string
    bars: { label: string; value: string; pct: number; tone: 'bad' | 'goal' | 'good' }[]
    barsNote: string
    beforeLabel: string
    afterLabel: string
    rows: { aspect: string; before: string; after: string }[]
  }
  results: { tag: string; h2: string; stats: Stat[]; note: string }
  why: {
    tag: string
    partners: string
    stats: Stat[]
    nextLabel: string
    next: string
  }
  finalCta: {
    h2: string
    body: string
    primary: string
    secondary: string
    footnote: string
    backToHub: string
  }
  shareLabel: string
}

const en: BmcContent = {
  meta: {
    title: 'BMC Hyundai Case Study - WhatsApp AI Agents | Eazybe',
    description:
      'How BMC Hyundai, Hyundai’s heavy machinery partner in Brazil, put Eazybe AI agents on its sellers’ own WhatsApp numbers to reply to leads in seconds and sync every chat to HubSpot.',
    ogDescription:
      'BMC Hyundai’s top sellers were too busy to reply. Now Eazybe AI answers on their own WhatsApp numbers, in seconds, and logs every lead in HubSpot.',
  },
  breadcrumb: { home: 'Home', hub: 'Case Studies', current: 'BMC Hyundai' },
  hero: {
    eyebrow: 'Customer story · AI agents · Heavy machinery · Brazil',
    h1Lead: 'How BMC Hyundai',
    h1Highlight: 'Replies 4x Faster',
    h1Tail: 'to WhatsApp leads with Eazybe AI Agents',
    subtitle: 'Top sellers were too busy to reply. Now AI answers on their own numbers, in seconds.',
    stats: [
      { value: '4x', label: 'faster replies', note: 'pilot goal' },
      { value: '2 → 170+', label: 'sellers: pilot to rollout' },
      { value: '0', label: 'phone numbers changed' },
    ],
  },
  about: {
    tag: 'About the customer',
    h2: 'Hyundai machines, built and served in Brazil.',
    body:
      'BMC Hyundai brought the first Hyundai machine to Brazil in 2003. Today it sells excavators, wheel loaders, forklifts and parts to farms, mines, builders and rental fleets across the country.',
    facts: [
      { value: '2003', label: 'Since', note: 'first Hyundai machine sold in Brazil, a forklift' },
      { value: '13', label: 'Branches', note: 'branches in 13 states, from Paraná to Pará' },
      { value: '800+', label: 'Field service', note: 'active technicians across Brazil' },
      { value: '2,000+', label: 'Customers', note: 'customers served by the service network each year' },
      { value: '38', label: 'Catalogue', note: 'machine models in 6 product lines' },
      { value: '7', label: 'Sectors', note: 'farming, building, forestry, government, industry, mining, rental' },
    ],
    source: 'Sources: bmchyundai.com.br (Nossa História, SAB)',
  },
  history: {
    tag: '23 years in Brazil',
    h2: 'From one forklift to 10,000 machines.',
    stats: [
      { value: 'US$175M', label: 'Factory · Itatiaia RJ', note: 'investment, opened 2013' },
      { value: '562,000 m²', label: 'Plant size', note: 'site area' },
      { value: '10,000', label: 'Built in Brazil', note: 'machines by 2024' },
    ],
    milestones: [
      { year: '2003', label: 'First forklift' },
      { year: '2007', label: 'BMC founded' },
      { year: '2013', label: 'Itatiaia factory' },
      { year: '2014', label: 'Service and parts network' },
      { year: '2024', label: '10,000 machines' },
      { year: '2026', label: 'Eazybe AI pilot' },
    ],
    source: 'Sources: bmchyundai.com.br · hyundai-ce.com.br · KHL (2013)',
  },
  challenge: {
    tag: 'The challenge',
    h2Lead: 'Customers wrote fast.',
    h2Highlight: 'Replies came slow.',
    replyTime: { value: '~20', label: 'Time to first reply · top sellers', note: 'BMC Hyundai’s own estimate for its busiest parts sellers' },
    questions: { value: '3', label: 'Every new lead', note: 'questions typed by hand: tax ID, part, machine' },
    industry: { value: '7x', label: 'Industry data', note: 'more likely to qualify a lead when replying within 1 hour (HBR, 2011)' },
    loadTitle: 'Who carries the load',
    load: [
      { label: 'Parts sellers', value: '20+', pct: 12 },
      { label: 'Field sellers', value: '~150', pct: 88 },
    ],
    loadNote: 'Both sell from their own WhatsApp. The sales head screenshotted slow chats to push for speed.',
  },
  rule: {
    tag: 'The one rule',
    h2Lead: 'Keep the number.',
    h2Highlight: 'Add the AI.',
    quote: 'Our customers are hooked on that number. If I put an AI on a different number, I lose them.',
    quoteBy: 'Alexandre de Freitas · BMC Hyundai',
    notOption: { label: 'Not an option', body: 'A new bot number customers don’t know' },
    built: { label: 'What Eazybe built', body: 'AI inside each seller’s own WhatsApp' },
    privacy: 'Only business chats sync to HubSpot. Sellers’ personal and private group chats are never synced.',
  },
  parts: {
    tag: 'How Eazybe works at BMC Hyundai',
    h2Lead: 'Four parts.',
    h2Highlight: 'One connected flow.',
    subtitle: 'From first message to closed deal. BMC Hyundai started with the part where deals leaked the most.',
    items: [
      {
        num: '01',
        status: 'live',
        statusLabel: 'Live',
        title: 'Conversation management',
        body:
          'Sellers’ WhatsApp chats, files and voice notes sync to the right HubSpot contact. Duplicate contacts merged so every history sits on one record.',
        foot: 'WhatsApp → HubSpot',
      },
      {
        num: '02',
        status: 'offered',
        statusLabel: 'Offered',
        title: 'Outreach',
        body:
          'Broadcasts through the official Meta number, sent to HubSpot lists, with every reply landing back on the contact.',
        foot: 'Broadcast · Auto dialer',
      },
      {
        num: '03',
        status: 'pilot',
        statusLabel: 'Pilot',
        title: 'Sales intelligence',
        body:
          'AI reads each chat and fills HubSpot fields: tax ID, part, machine. SLA alerts flag a late reply. Next: lost-sale reasons by part.',
        foot: 'Fields · SLA · Insights',
      },
      {
        num: '04',
        status: 'pilot',
        statusLabel: 'Pilot',
        title: 'AI agents',
        body:
          'A WhatsApp agent on the sellers’ own numbers replies in seconds, qualifies the lead and hands it to the seller. Next: automatic quotes.',
        foot: 'Reply · Qualify · Hand over',
      },
    ],
  },
  agent: {
    tag: 'Part 4 · AI agents',
    h2Lead: 'The AI answers',
    h2Highlight: 'while the seller is busy.',
    flow: ['WhatsApp', 'AI agent', 'HubSpot'],
    stats: [
      { value: '8 sec', label: 'First reply', note: 'example from the demo' },
      { value: 'PT-BR', label: 'Language', note: 'tuned to Portuguese in testing' },
      { value: '30 days', label: 'Memory', note: 'of chat context per customer' },
      { value: '24/7', label: 'Availability', note: 'nights, weekends, lunch breaks' },
    ],
  },
  crm: {
    tag: 'Part 1 + 3 · Conversation management and sales intelligence',
    h2Lead: 'From chat to CRM,',
    h2Highlight: 'without typing a thing.',
    cards: [
      {
        title: 'The AI asks the right questions',
        body: 'Tax ID, part and machine, collected in the chat.',
        metric: '3/3',
        checklist: ['Tax ID', 'Part', 'Machine model'],
      },
      {
        title: 'Everything lands in HubSpot',
        body: 'Chats and details saved on the right contact.',
        metric: '0 typing',
      },
    ],
  },
  sla: {
    tag: 'Part 3 · Sales intelligence: SLA alerts and team view',
    h2Lead: 'The manager',
    h2Highlight: 'coaches instead of chasing.',
    cards: [
      { title: 'No chat is left waiting.', body: 'The AI takes over and the manager is told.' },
      { title: 'Reply time for every seller.', body: 'AI sellers vs the rest, compared side by side.' },
    ],
    stats: [
      { value: '10 min', label: 'AI steps in after', note: 'with no reply, set by the team' },
      { value: '0', label: 'Screenshots needed', note: 'reply time per seller in one view' },
    ],
  },
  handover: {
    tag: 'Part 4 · AI agents: handover to the rep',
    h2Lead: 'The AI starts.',
    h2Highlight: 'The seller closes.',
    steps: [
      'The seller is told when a lead is ready',
      'One click to join, with the full chat history',
      'A human stays in charge of every sale',
    ],
  },
  beforeAfter: {
    tag: 'Before vs after',
    h2Lead: 'Same team. Same numbers.',
    h2Highlight: 'A different day.',
    barsTitle: 'Time to first reply',
    bars: [
      { label: 'Before', value: '~20 min', pct: 100, tone: 'bad' },
      { label: 'Pilot goal', value: '5 min', pct: 25, tone: 'goal' },
      { label: 'AI first touch', value: 'seconds', pct: 3, tone: 'good' },
    ],
    barsNote: '“Before” is BMC Hyundai’s estimate. Final numbers come after the 2-week pilot.',
    beforeLabel: 'Before',
    afterLabel: 'With Eazybe',
    rows: [
      { aspect: 'Lead details', before: 'By hand', after: 'Collected by AI' },
      { aspect: 'HubSpot', before: 'If time allows', after: 'Always updated' },
      { aspect: 'Slow chats', before: 'Screenshots', after: 'Alerts' },
      { aspect: 'After hours', before: 'Waits for morning', after: 'Answered 24/7' },
      { aspect: 'Customer’s number', before: 'Seller’s own', after: 'Still seller’s own' },
    ],
  },
  results: {
    tag: 'The results so far',
    h2: '4x faster replies, on the numbers customers already trust.',
    stats: [
      { value: '4x', label: 'Reply speed', note: 'faster · pilot goal' },
      { value: '100%', label: 'HubSpot', note: 'of new leads saved · pilot goal' },
      { value: '0', label: 'Numbers changed', note: 'customers keep their seller' },
      { value: '170+', label: 'Next rollout', note: 'parts and field sellers' },
    ],
    note: 'Pilot goals until the 2-week test ends.',
  },
  why: {
    tag: 'Why teams choose Eazybe',
    partners: 'Meta Official Business Partner · HubSpot App Partner',
    stats: [
      { value: '30,000+', label: 'users worldwide' },
      { value: '40+', label: 'countries' },
      { value: '4.3★', label: 'HubSpot App Marketplace rating' },
      { value: 'SOC 2 Type II', label: 'GDPR · CCPA · PCI DSS' },
    ],
    nextLabel: 'Next for BMC Hyundai',
    next: 'Automatic quotes · Lost-sale insights by part · AI for 150 field sellers',
  },
  finalCta: {
    h2: 'Every lead answered in seconds, on your team’s own WhatsApp.',
    body: 'WhatsApp AI agents for CRM teams. HubSpot, Salesforce, Zoho, Pipedrive, Odoo and more.',
    primary: 'Start 4-day free trial',
    secondary: 'Book a demo',
    footnote: '4-day free trial · no card',
    backToHub: 'All case studies',
  },
  shareLabel: 'Share',
}

export const BMC_CONTENT_BY_LOCALE: Record<string, BmcContent> = { en }

export function getBmcContent(locale: string): BmcContent {
  return BMC_CONTENT_BY_LOCALE[locale] ?? en
}
