/**
 * Content for /case-studies/lokmaxltda — the Lokmax (heavy equipment rental,
 * Brazil) customer story, referred by Hook Digital. English only for now; the
 * structure is locale-keyed so translations can slot in later without
 * touching the page component.
 */

export interface LokmaxContent {
  meta: { title: string; description: string; ogDescription: string }
  breadcrumb: { home: string; hub: string; current: string }
  hero: {
    eyebrow: string
    h1Lead: string
    h1Highlight: string
    subtitle: string
    referral: string
    ctaResults: string
    ctaStory: string
    facts: { value: string; label: string }[]
  }
  reality: {
    tag: string
    h2: string
    paras: string[]
    chatIntro: string
    chats: string[]
    chatOutro: string
  }
  problems: {
    tag: string
    h2: string
    intro: string
    items: { title: string; body: string; quotes?: string[] }[]
  }
  solution: {
    tag: string
    h2: string
    body: string
    pullQuote: string
  }
  how: {
    tag: string
    h2: string
    items: { title: string; body: string; example?: string }[]
  }
  beforeAfter: {
    tag: string
    h2: string
    beforeLabel: string
    afterLabel: string
    rows: { aspect: string; before: string; after: string }[]
  }
  shifts: {
    h2: string
    items: { from: string; to: string; body: string }[]
  }
  closing: { quote: string }
  article: {
    tocTitle: string
    shareLabel: string
    readTime: string
    inlineTitle: string
    inlineBody: string
  }
  finalCta: { h2: string; body: string; primary: string; secondary: string; backToHub: string }
}

const en: LokmaxContent = {
  meta: {
    title: 'Lokmax Case Study - WhatsApp + HubSpot For Equipment Rental | Eazybe',
    description:
      'How Lokmax, Brazil’s compact machinery rental specialist, unified WhatsApp and HubSpot with Eazybe: quotes in under 3 hours, proactive lease extensions and a pipeline that matches reality.',
    ogDescription:
      'Lokmax turned WhatsApp into an extension of HubSpot with Eazybe: faster quotes, proactive lease renewals and full commercial visibility.',
  },
  breadcrumb: { home: 'Home', hub: 'Case Studies', current: 'Lokmax' },
  hero: {
    eyebrow: 'Case Study · Equipment Rental',
    h1Lead: 'From Fragmented Chats to a',
    h1Highlight: 'Predictable Revenue Engine',
    subtitle:
      'How Lokmax, Brazil’s leading compact machinery rental specialist, eliminated operational blind spots, accelerated quote-to-contract cycles and scaled consultative B2B sales by unifying WhatsApp and HubSpot CRM with Eazybe.',
    referral: 'A growth story referred by Hook Digital',
    ctaResults: 'See the results',
    ctaStory: 'Read the story',
    facts: [
      { value: '16+', label: 'years in business' },
      { value: '5,000+', label: 'clients across Brazil' },
      { value: 'Nova Lima, MG', label: 'national fleet' },
      { value: 'Sales & rental', label: 'compact machinery' },
    ],
  },
  reality: {
    tag: 'The reality',
    h2: 'Demand Was High, But Deals Lived On Personal Phones',
    paras: [
      'Lokmax built its reputation across Brazil’s construction, infrastructure and mining sectors by pioneering consultative machinery rental. Rather than simply renting out yellow-line machines, Lokmax’s technical consultants analyse job-site terrain, recommend the right attachments (hydraulic hammers, trenchers, augers) and calculate productivity gains for project engineers and contractors.',
      'Inbound demand was strong. Contractors, site managers and procurement heads were reaching out through digital ads, website enquiries and industry referrals. To structure the influx, Lokmax implemented HubSpot CRM, which gave the team clean pipelines and organised deal stages.',
      'But there was a critical gap: while the sales consultant and the contractor exchanged job-site photos, soil condition videos and price counter-offers on WhatsApp, HubSpot displayed blank activity logs. In Brazil’s construction and industrial equipment market, closing machinery deals over email is practically non-existent. The moment a contractor needs a compactor or a mini excavator, the negotiation moves to WhatsApp.',
    ],
    chatIntro: 'WhatsApp became the primary channel for real commercial discussions:',
    chats: [
      '“We’ve struck hard rock at the Nova Lima excavation site — is it possible to swap the standard bucket for a hydraulic breaker first thing tomorrow?”',
      '“Please send daily versus monthly pricing for two Bobcat skid steers with operators.”',
      '“Rain delayed our concrete pour. Can we extend the roller rental by another 10 days at a discounted rate?”',
      '“Forward the equipment spec sheet, operator certification and insurance invoice directly to my WhatsApp.”',
    ],
    chatOutro:
      'These exchanges carried the deal’s real commercial intelligence: tight delivery schedules, machine specs, job-site access rules, rate adjustments and verbal agreements made by Lokmax representatives. Virtually none of it reached HubSpot.',
  },
  problems: {
    tag: 'The problem',
    h2: 'Selling On Invisible Chats And Rep Memory',
    intro:
      'Running consultative equipment rentals without a bridge between WhatsApp and HubSpot created four operational bottlenecks:',
    items: [
      {
        title: 'No pipeline transparency',
        body:
          'Sales leadership could track deal stages in HubSpot but had no view of genuine deal progression or why momentum stalled. Managers were left probing reps with questions:',
        quotes: [
          '“Did the client approve the transport charge for the dumper?”',
          '“What is holding up the master service agreement with the mining firm?”',
          '“Did we lose the rental to a competitor because the proposal went out late?”',
        ],
      },
      {
        title: 'Unrecorded contract extensions',
        body:
          'Short-term rentals often turn into lucrative long-term extensions. When contractors requested extra weeks over WhatsApp, reps routinely failed to log the change or adjust billing in HubSpot, and revenue leaked.',
      },
      {
        title: 'Disrupted lead handoffs',
        body:
          'When a rep took time off, went into the field or left the company, the covering rep faced blank CRM activity logs. Asking clients to restate project specs, equipment needs and pre-negotiated rates eroded trust and weakened Lokmax’s consultative standing.',
      },
      {
        title: 'The operational trade-off',
        body:
          'Field consultants were torn between closing deals and CRM hygiene. Manually copying WhatsApp voice notes, price adjustments and technical specs into HubSpot burned selling time and still produced incomplete records.',
      },
    ],
  },
  solution: {
    tag: 'The solution',
    h2: 'The Eazybe Bridge',
    body:
      'Lokmax needed an AI-powered bridge between HubSpot CRM and WhatsApp, so the team introduced Eazybe: personal WhatsApp connected directly to HubSpot, with AI reading every conversation to flag high-intent leads and keep deal data current. The goal was clear:',
    pullQuote:
      'Reps should not have to change a single thing about how they message contractors. Instead, embed HubSpot intelligence directly inside the WhatsApp interface where business was already being conducted.',
  },
  how: {
    tag: 'What changed',
    h2: 'How Lokmax Transformed Operations',
    items: [
      {
        title: 'Personal WhatsApp and HubSpot synced completely',
        body:
          'Reps no longer juggle tabs or copy-paste between screens. When a contractor messages on WhatsApp, Eazybe’s sidebar shows the full HubSpot profile: company name, active job sites, current leased fleet, open deals and payment terms. Reps update pipeline stages, create deals and let AI fill custom HubSpot properties straight from the conversation.',
      },
      {
        title: 'Site photos, machine specs and chat logs synced in one click',
        body:
          'When a client sends photos of an excavation trench or a specific coupler requirement, reps sync the media and conversation history to the HubSpot deal timeline. Logistics, maintenance and dispatch see the exact site conditions inside HubSpot before machinery is loaded onto transport trailers.',
      },
      {
        title: 'Systematic lease extensions and follow-ups',
        body:
          'With scheduled follow-ups and quick-response agents, reps never lose track of a project timeline. Three days before a rental expires, Eazybe prompts the rep with the exact context:',
        example:
          'Nova Lima site: Mini Excavator #14 ends in 72 hours and no extension is confirmed. One click sends the follow-up on WhatsApp.',
      },
      {
        title: 'Full commercial visibility without chasing reps',
        body:
          'Pipeline meetings changed completely. Commercial leaders no longer need verbal recaps: they open HubSpot and see conversation highlights, customer objections and negotiation progress synced from WhatsApp.',
      },
      {
        title: 'Institutional continuity and frictionless handoffs',
        body:
          'When a lead moves from inbound qualification to a specialised machinery consultant, or an account manager is out of office, the entire WhatsApp history is preserved in HubSpot. The new consultant steps in knowing the client’s preferred machine models, previous rates and project timelines.',
      },
      {
        title: 'AI flags high-intent leads',
        body:
          'Eazybe’s AI reads the tone and urgency behind every conversation and flags high-intent buyers, like a contractor asking for same-day pricing or a client confirming site measurements, so reps know which deals to prioritise instead of working every chat with equal urgency.',
      },
    ],
  },
  beforeAfter: {
    tag: 'The results',
    h2: 'Before vs After: Operational Transformation',
    beforeLabel: 'Before Eazybe',
    afterLabel: 'With Eazybe',
    rows: [
      {
        aspect: 'CRM data entry',
        before: 'Manual, delayed and frequently skipped by reps',
        after: 'Automatic one-click sync from WhatsApp, in real time',
      },
      {
        aspect: 'Site media and specs',
        before: 'Stored on individual phones; lost during handoffs',
        after: 'Attached directly to the HubSpot contact and deal timeline',
      },
      {
        aspect: 'Quote turnaround',
        before: '24–48 hours spent cross-checking specs across channels',
        after: 'Under 3 hours with unified specs and in-chat templates',
      },
      {
        aspect: 'Fleet lease extensions',
        before: 'Reactive; dependent on rep memory or last-minute client calls',
        after: 'Proactive follow-ups triggered before contract end dates',
      },
      {
        aspect: 'Pipeline accuracy',
        before: 'CRM stages rarely matched chat reality',
        after: 'CRM reflects live customer conversations',
      },
      {
        aspect: 'Lead reassignment',
        before: 'Painful; new reps had to re-interview the customer',
        after: 'Instant; full chat and technical history visible in HubSpot',
      },
    ],
  },
  shifts: {
    h2: 'What The Shift Looked Like',
    items: [
      {
        from: 'Individual chat silos',
        to: 'Centralised corporate intelligence',
        body:
          'Client relationships and technical negotiation records no longer belong to personal phones. Lokmax owns complete institutional memory for every contractor, developer and infrastructure project.',
      },
      {
        from: 'Lagging response times',
        to: 'Rapid fleet mobilisation',
        body:
          'In equipment rental, speed wins deals. If an excavator breaks down on a job site, the contractor rents from whoever responds with a spec and a delivery window first. By syncing HubSpot data into WhatsApp, Lokmax cut quotation and availability confirmation time by 70%.',
      },
      {
        from: 'Static deal stages',
        to: 'Actionable commercial intelligence',
        body:
          'Managers no longer review vanity metrics. They coach reps on active objections, pricing benchmarks and fleet availability based on real WhatsApp customer dialogue.',
      },
    ],
  },
  closing: {
    quote:
      'You can buy the strongest CRM on the market and fill it with qualified B2B leads, but if the real negotiation is happening inside a chat nobody else can open, the company is running on trust rather than visibility. For Lokmax, success wasn’t about replacing WhatsApp or forcing reps to become data entry clerks. It was about turning WhatsApp into an integrated extension of HubSpot with Eazybe, so consultants sell faster while the enterprise keeps complete commercial control.',
  },
  article: {
    tocTitle: 'In this article',
    shareLabel: 'Share',
    readTime: '8 min read',
    inlineTitle: 'See it on your own WhatsApp',
    inlineBody:
      'Eazybe installs beside WhatsApp Web and connects to HubSpot in minutes, on the numbers your reps already use.',
  },
  finalCta: {
    h2: 'Run Your WhatsApp Pipeline The Way Lokmax Does',
    body:
      'Eazybe connects the WhatsApp your reps already use to HubSpot, Salesforce, Zoho, Pipedrive and more, so every negotiation shows up where the business can see it.',
    primary: 'Start free',
    secondary: 'Book a demo',
    backToHub: 'All case studies',
  },
}

export const LOKMAX_CONTENT_BY_LOCALE: Record<string, LokmaxContent> = { en }

export function getLokmaxContent(locale: string): LokmaxContent {
  return LOKMAX_CONTENT_BY_LOCALE[locale] ?? en
}
