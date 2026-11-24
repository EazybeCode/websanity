/**
 * Copy for /case-studies/blendus, from the BlendUs_Eazybe_Case_Study_v7 deck
 * (14 slides). Strings only; layout and markup live in the page component.
 *
 * English only for now: every locale falls back to `en` until br/es/tr are
 * translated. Chat mock-ups and the client quotes stay in Portuguese (they are
 * the real words), with the English translation under each quote.
 */

export interface Stat {
  value: string
  label: string
  note?: string
}

export interface BlendusContent {
  meta: { title: string; description: string; ogDescription: string }
  breadcrumb: { home: string; hub: string; current: string }
  hero: {
    eyebrow: string
    h1Pre: string
    h1Company: string
    h1Highlight: string
    h1Italic: string
    h1With: string
    h1Bold: string
    subtitle: string
    stats: Stat[]
  }
  about: {
    tag: string
    h2Lead: string
    h2Highlight: string
    body1Bold: string
    body1: string
    body1Bold2: string
    body1End: string
    body2Pre: string
    body2Bold: string
    body2Mid: string
    body2Bold2: string
    body2End: string
    missionLabel: string
    missionQuote: string
    missionEn: string
    facts: Stat[]
    recognitionLabel: string
    recognition: string[]
    source: string
  }
  numbers: {
    tag: string
    h2Lead: string
    h2Highlight: string
    subPre: string
    subBold: string
    subPost: string
    stats: Stat[]
    tiers: { name: string; body: string }[]
    fitBold: string
    fitBody: string
    fitHighlight: string
    note: string
    source: string
  }
  history: {
    tag: string
    h2Lead: string
    h2Highlight: string
    clientsPre: string
    clients: string[]
    clientsPost: string
    question: string
    eazybePre: string
    eazybeBold: string
    eazybePost: string
    photoAlt: string
    quotes: { quote: string; en: string; by: string }[]
    source: string
  }
  challenge: {
    tag: string
    h2Lead: string
    h2Highlight: string
    subtitle: string
    cards: { label: string; title: string; body: string }[]
  }
  rollout: {
    tag: string
    h2Lead: string
    h2Highlight: string
    steps: { date: string; label: string; state: 'done' | 'next' }[]
    stats: { label: string; value: string; note: string; met?: boolean }[]
  }
  flow: {
    tag: string
    h2Lead: string
    h2Highlight: string
    subtitle: string
    nodes: { name: string; label: string; body: string }[]
    note: string
    won: { title: string; body: string }
    lost: { title: string; body: string }
  }
  block: {
    tag: string
    h2Lead: string
    h2Highlight: string
    subtitle: string
    waTitle: string
    waBadge: string
    hsTitle: string
    hsBadge: string
    blockTitle: string
    blockBadge: string
    footNote: string
    note: string
  }
  privacy: {
    tag: string
    h2Lead: string
    h2Highlight: string
    body: string
    rows: { label: string; text: string; tone: 'green' | 'red' | 'blue' }[]
    photoAlt: string
    photoChip: string
    source: string
  }
  benefits: {
    tag: string
    h2Lead: string
    h2Highlight: string
    subtitle: string
    factLabel: string
    benefitLabel: string
    items: { factPre: string; factBold: string; factPost: string; title: string; body: string }[]
    source: string
  }
  results: {
    tag: string
    h2Lead: string
    h2Highlight: string
    stats: Stat[]
    beforeLabel: string
    afterLabel: string
    aspectLabel: string
    rows: { aspect: string; before: string; after: string }[]
    note: string
  }
  views: {
    tag: string
    h2Lead: string
    h2Highlight: string
    subtitle: string
    cards: { chip: string; title: string; body: string; alt: string }[]
    note: string
  }
  words: {
    tag: string
    /** BlendUs has not approved this quote yet; it only renders once true. */
    quoteApproved: boolean
    quote: string
    quoteBy: string
    photoAlt: string
    nextLabel: string
    next: { badge: string; title: string; body: string }[]
  }
  why: { tag: string; partners: string; stats: Stat[] }
  finalCta: { h2: string; body: string; primary: string; secondary: string; footnote: string; backToHub: string }
}

/** One day of WhatsApp talk with a health plan client (kept in Portuguese). */
export const BLENDUS_DAY_CHAT = [
  { dir: 'in', text: 'Bom dia, Danilo!' },
  { dir: 'out', text: 'Bom dia! Enviei a proposta.' },
  { dir: 'in', text: 'Uma dúvida sobre o módulo Premium' },
  { dir: 'in', text: 'audio 0:42' },
  { dir: 'out', text: 'Perfeito, explico na call.' },
  { dir: 'in', text: 'Vamos levar à diretoria.' },
] as const

/** The same day, as the one HubSpot block Eazybe writes. */
export const BLENDUS_DAY_BLOCK = [
  'Bom dia, Danilo! · Bom dia! Enviei a proposta.',
  'Uma dúvida sobre o módulo Premium · audio 0:42',
  'Perfeito, explico na call. · Vamos levar à diretoria.',
] as const

const en: BlendusContent = {
  meta: {
    title: 'BlendUs Case Study - WhatsApp Deals in HubSpot | Eazybe',
    description:
      'How BlendUs, a Brazilian health tech with 140+ health plan clients, saves every WhatsApp deal talk in HubSpot with Eazybe, one clean block per day.',
    ogDescription:
      '3 sellers. Big health plan clients. Deals that take months. Now every WhatsApp chat is saved in HubSpot.',
  },
  breadcrumb: { home: 'Home', hub: 'Case Studies', current: 'BlendUs' },
  hero: {
    eyebrow: 'Customer story · Conversation management · Health tech · Brazil',
    h1Pre: 'How',
    h1Company: 'BlendUs',
    h1Highlight: 'Saves Every WhatsApp Deal',
    h1Italic: 'in HubSpot,',
    h1With: 'with',
    h1Bold: 'Eazybe',
    subtitle: '3 sellers. Big health plan clients. Deals that take months. Now every WhatsApp chat is saved in HubSpot.',
    stats: [
      { value: '140+', label: 'health plan clients' },
      { value: '3', label: 'sellers on the team' },
      { value: '1', label: 'clean block per day in HubSpot' },
    ],
  },
  about: {
    tag: 'About the customer',
    h2Lead: 'Making Brazil’s Health Data',
    h2Highlight: 'More Reliable',
    body1Bold: 'Blendus Tecnologia em Saúde',
    body1: ' is a health tech company in Florianópolis, Brazil. It helps health plans check their data before it goes to the ',
    body1Bold2: 'ANS',
    body1End: ', the government regulator, so they get a good quality score.',
    body2Pre: 'Founder ',
    body2Bold: 'Flavio Exterkoetter',
    body2Mid: ' is a doctor and a computer scientist. The team has ',
    body2Bold2: '20+ years',
    body2End: ' of experience.',
    missionLabel: 'Their mission',
    missionQuote: '“Tornar as informações em saúde mais confiáveis e qualificadas.”',
    missionEn: 'To make health information more reliable and qualified.',
    facts: [
      { label: 'Clients', value: '140+', note: 'health plan operators' },
      { label: 'Reach', value: '17', note: 'Brazilian states' },
      { label: 'TISS monitoring', value: '2015', note: 'doing it since' },
      { label: 'Sales team', value: '3', note: 'sellers, relationship led' },
    ],
    recognitionLabel: 'Recognition and ecosystem',
    recognition: ['EXAME Negócios em Expansão 2025', 'ACATE Saúde member', 'MIDITEC incubated', 'Sebrae supported', 'Floripa Mais Tec'],
    source: 'Source: blendus.com.br (Quem somos, Clientes) · Eazybe call, 11 Nov 2026',
  },
  numbers: {
    tag: 'BlendUs in numbers',
    h2Lead: 'A Small Team Behind',
    h2Highlight: 'A Big Data Engine',
    subPre: 'Their product, ',
    subBold: 'Gestor IDSS',
    subPost: ', checks health plan data, finds errors and predicts the quality score.',
    stats: [
      { label: 'Guides validated', value: '86M', note: 'guide entries checked by Gestor IDSS' },
      { label: 'Errors caught', value: '55M', note: 'critiques detected before reaching the regulator' },
      { label: 'Client results', value: '70%', note: 'of clients reached an IDSS excellence score' },
    ],
    tiers: [
      { name: 'Simulador', body: 'Predicts the quality score' },
      { name: 'Qualifica', body: 'Adds deeper data checks' },
      { name: 'Premium', body: 'Adds expert mentoring and meetings' },
    ],
    fitBold: 'Where Eazybe fits:',
    fitBody: 'BlendUs sells Gestor IDSS through months of WhatsApp talks.',
    fitHighlight: 'Eazybe saves every one of those chats in HubSpot.',
    note: 'Figures as published by BlendUs',
    source: 'Source: blendus.com.br/gestor-idss',
  },
  history: {
    tag: 'Why history matters here',
    h2Lead: 'Clients Stay For Years.',
    h2Highlight: 'So Must The Story',
    clientsPre: 'BlendUs clients are big health plans like ',
    clients: ['SulAmérica', 'Unimed', 'Postal Saúde', 'Real Grandeza'],
    clientsPost: '. Some have been clients for years.',
    question: 'So every renewal starts with one question: what did we talk about last time?',
    eazybePre: 'With ',
    eazybeBold: 'Eazybe',
    eazybePost: ', the answer is in HubSpot: every WhatsApp talk, saved.',
    photoAlt: 'A health plan team reviewing plan data on a screen in a meeting',
    quotes: [
      {
        quote: 'Desde 2018 mantemos parceria com a Blendus Tecnologia em Saúde.',
        en: 'We have worked with BlendUs since 2018.',
        by: 'Leandro José João · Executive Director, SIM Caixa de Assistência à Saúde',
      },
      {
        quote: 'O sistema Gestor IDSS nos traz em tempo real o cenário de evolução da operadora no IDSS.',
        en: 'Gestor IDSS shows us, in real time, how our IDSS score is moving.',
        by: 'Layane Barcelos · Evida Assistência à Saúde',
      },
    ],
    source: 'Source: blendus.com.br (Clientes, Gestor IDSS) · photo is an AI-generated scene',
  },
  challenge: {
    tag: 'The challenge',
    h2Lead: 'Months Of Deal Talks.',
    h2Highlight: 'All On Personal Phones',
    subtitle: 'Every client is a big health plan. One deal can take months, and most talks happen on WhatsApp.',
    cards: [
      { label: 'The risk', title: 'When a person leaves, their chats leave too', body: 'A team member left, and their deal history was on their phone.' },
      { label: 'The gap', title: 'HubSpot only saw part of the story', body: 'Emails were saved. WhatsApp chats were not.' },
      { label: 'The stakes', title: 'Every deal counts', body: 'Brazil has only 700–800 health plans. Losing one chat can mean losing one big client.' },
    ],
  },
  rollout: {
    tag: 'The rollout',
    h2Lead: 'From Worry To',
    h2Highlight: 'Every Chat Saved',
    steps: [
      { date: 'Apr 2026', label: 'Joins Eazybe, Starter plan', state: 'done' },
      { date: 'Step 1', label: 'WhatsApp synced to HubSpot', state: 'done' },
      { date: 'Step 2', label: 'One block per day', state: 'done' },
      { date: 'Nov 2026', label: 'Goal met, review call', state: 'done' },
      { date: 'Next', label: 'MCP, broadcast, coexistence', state: 'next' },
    ],
    stats: [
      { label: 'Where the team works', value: 'WhatsApp Web', note: 'with the Eazybe extension, nothing new to learn' },
      { label: 'Support', value: 'In Portuguese', note: 'Danilo called it out as a highlight' },
      { label: 'Main goal', value: 'Met ✓', note: 'every WhatsApp talk now in HubSpot', met: true },
    ],
  },
  flow: {
    tag: 'How it works',
    h2Lead: 'From First Chat',
    h2Highlight: 'To Client Onboarding',
    subtitle: 'The full story now goes with the client, from the first chat to onboarding.',
    nodes: [
      { name: 'WhatsApp', label: 'Client · 18:42', body: '“Vamos levar à diretoria.”' },
      { name: 'Eazybe', label: 'Synced', body: 'Business chat only · 1 block today' },
      { name: 'HubSpot', label: 'Deal timeline', body: 'Email + WhatsApp, side by side' },
      { name: 'AI summary', label: 'Deal won', body: 'Summary written from saved chats' },
      { name: 'ClickUp', label: 'Onboarding', body: 'Task created with full history' },
    ],
    note: 'Illustrative · sample message',
    won: { title: 'Won deal', body: 'AI writes a summary from the saved chats. It goes to the onboarding team.' },
    lost: { title: 'Lost deal', body: 'AI explains why the deal was lost, so the team learns.' },
  },
  block: {
    tag: 'A small fix that mattered',
    h2Lead: 'One Day Of Talks.',
    h2Highlight: 'One Clean Block',
    subtitle: 'At first, every message was a separate note in HubSpot. Danilo asked for a cleaner view, and Eazybe now saves each day as one block.',
    waTitle: 'WhatsApp · Health plan client',
    waBadge: 'Live',
    hsTitle: 'HubSpot · Deal timeline',
    hsBadge: '1 block per day',
    blockTitle: 'WhatsApp · Full day',
    blockBadge: 'Synced by Eazybe',
    footNote: 'Now: one clean block per day',
    note: 'Illustrative · sample messages',
  },
  privacy: {
    tag: 'Built for sensitive data',
    h2Lead: 'Business Chats In.',
    h2Highlight: 'Private Chats Out',
    body: 'BlendUs handles health data, so it has strict rules. Eazybe fits them.',
    rows: [
      { label: 'Synced', text: 'Only the business chats the team picks', tone: 'green' },
      { label: 'Never synced', text: 'Personal chats and private groups', tone: 'red' },
      { label: 'AI, on their terms', text: 'Eazybe MCP connects to AI tools they already pay for', tone: 'blue' },
    ],
    photoAlt: 'A phone showing Chat sync settings: client chats on, personal chats off',
    photoChip: 'You pick what syncs',
    source: 'Photo is an AI-generated scene',
  },
  benefits: {
    tag: 'Benefits',
    h2Lead: 'What BlendUs Gets',
    h2Highlight: 'With Eazybe',
    subtitle: 'Real facts about BlendUs, and what Eazybe changes.',
    factLabel: 'The fact',
    benefitLabel: 'The benefit',
    items: [
      { factPre: '3 sellers, 140+ clients: ', factBold: 'about 47 clients each', factPost: '', title: 'Every client’s history in one place', body: 'No seller has to remember 47 relationships. HubSpot does.' },
      { factPre: 'Deals take ', factBold: 'months', factPost: ' of talks', title: 'The whole deal, one block a day', body: 'Easy to read before a call.' },
      { factPre: 'Clients stay for years, like ', factBold: 'SIM since 2018', factPost: '', title: 'Smarter renewals and upgrades', body: 'Every upgrade talk starts with the full history.' },
      { factPre: 'Only ', factBold: '700–800', factPost: ' operators exist, and 140+ are already clients', title: 'No prospect slips away', body: 'Every saved chat protects a future deal.' },
      { factPre: 'They work with ', factBold: 'sensitive health data', factPost: '', title: 'Only business chats sync', body: 'Personal chats stay private.' },
      { factPre: 'A team member ', factBold: 'left with deal history', factPost: '', title: 'History stays when people change', body: 'Every chat stays in HubSpot.' },
    ],
    source: 'Sources: blendus.com.br and Eazybe call, 11 Nov 2026',
  },
  results: {
    tag: 'Results so far',
    h2Lead: 'The Deal Story,',
    h2Highlight: 'Finally Complete',
    stats: [
      { label: 'Main goal', value: 'Met', note: 'every WhatsApp talk logged in HubSpot' },
      { label: 'Live since', value: '7 months', note: 'April to November 2026' },
      { label: 'HubSpot view', value: '1 block', note: 'per day, per conversation' },
      { label: 'Tools connected', value: '4', note: 'WhatsApp, HubSpot, Pluga, ClickUp' },
    ],
    beforeLabel: 'Before',
    afterLabel: 'With Eazybe',
    aspectLabel: 'Area',
    rows: [
      { aspect: 'WhatsApp talks', before: 'On sellers’ phones', after: 'Saved in HubSpot' },
      { aspect: 'When a seller leaves', before: 'History at risk', after: 'History stays' },
      { aspect: 'Deal reviews', before: 'From memory', after: 'AI summary of real chats' },
      { aspect: 'Onboarding', before: 'Starts from scratch', after: 'Full history in ClickUp' },
    ],
    note: 'All results are from BlendUs’s review call with Eazybe on 11 November 2026.',
  },
  views: {
    tag: 'Two views, one story',
    h2Lead: 'Sellers Keep Chatting.',
    h2Highlight: 'Managers See It All',
    subtitle: 'Nobody changes how they work. The CRM just fills itself.',
    cards: [
      { chip: 'For sellers', title: 'Chat on WhatsApp like always', body: 'Business chats save to HubSpot on their own. No copy-paste, no extra notes.', alt: 'A seller chatting on WhatsApp on his phone next to a laptop' },
      { chip: 'For managers', title: 'See every deal with its WhatsApp history', body: 'One clean block per day sits next to emails on each deal.', alt: 'A sales manager looking at a deal pipeline with a WhatsApp full-day entry' },
    ],
    note: 'Photos are AI-generated scenes, numbers on screens are not BlendUs data',
  },
  words: {
    tag: 'In their words',
    quoteApproved: false,
    quote: 'Our main goal was to keep every WhatsApp conversation in HubSpot. That’s done, and it gave our team real peace of mind.',
    quoteBy: 'Danilo Cândido · BlendUs',
    photoAlt: 'Two people shaking hands across a desk in an office',
    nextLabel: 'What’s next for BlendUs',
    next: [
      { badge: 'MCP', title: 'Ask AI about the sales pipeline', body: 'Use AI tools they already pay for' },
      { badge: 'Broadcasts', title: 'Follow up after events', body: 'Message HubSpot lists, reply one to one' },
      { badge: 'Coexistence', title: 'One number, app and API', body: 'Same number on the phone and the API' },
    ],
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
  },
  finalCta: {
    h2: 'Never Lose A WhatsApp Deal Again',
    body: 'Save every business chat in HubSpot, Salesforce, Zoho, Pipedrive and more, without changing how your team sells.',
    primary: 'Start 4-day free trial',
    secondary: 'Book a demo',
    footnote: 'eazybe.com · no card needed',
    backToHub: 'All case studies',
  },
}

export const BLENDUS_CONTENT_BY_LOCALE: Record<string, BlendusContent> = { en }

export function getBlendusContent(locale: string): BlendusContent {
  return BLENDUS_CONTENT_BY_LOCALE[locale] ?? en
}

export function blendusHeadline(t: BlendusContent): string {
  const h = t.hero
  return [h.h1Pre, h.h1Company, h.h1Highlight, h.h1Italic, h.h1With, h.h1Bold].filter(Boolean).join(' ')
}
