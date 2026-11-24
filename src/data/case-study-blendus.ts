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
    /** "and" before the last client name. */
    clientsAnd: string
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
    clientsAnd: 'and',
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

/* -------------------------------------------------------------------------- */
/* Brazilian Portuguese (BlendUs' own language: quotes need no translation)   */
/* -------------------------------------------------------------------------- */

const br: BlendusContent = {
  meta: {
    title: 'Case BlendUs - Negócios do WhatsApp no HubSpot | Eazybe',
    description:
      'Como a BlendUs, healthtech com 140+ operadoras clientes, salva cada conversa de venda do WhatsApp no HubSpot com a Eazybe, em um bloco limpo por dia.',
    ogDescription:
      '3 vendedores. Grandes operadoras de saúde. Negócios que levam meses. Agora cada conversa do WhatsApp fica salva no HubSpot.',
  },
  breadcrumb: { home: 'Início', hub: 'Casos de Sucesso', current: 'BlendUs' },
  hero: {
    eyebrow: 'Case de cliente · Gestão de conversas · Healthtech · Brasil',
    h1Pre: 'Como a',
    h1Company: 'BlendUs',
    h1Highlight: 'Salva Cada Negócio do WhatsApp',
    h1Italic: 'no HubSpot,',
    h1With: 'com a',
    h1Bold: 'Eazybe',
    subtitle: '3 vendedores. Grandes operadoras de saúde. Negócios que levam meses. Agora cada conversa do WhatsApp fica salva no HubSpot.',
    stats: [
      { value: '140+', label: 'operadoras clientes' },
      { value: '3', label: 'vendedores na equipe' },
      { value: '1', label: 'bloco limpo por dia no HubSpot' },
    ],
  },
  about: {
    tag: 'Sobre o cliente',
    h2Lead: 'Tornando os dados de saúde do Brasil',
    h2Highlight: 'mais confiáveis.',
    body1Bold: 'Blendus Tecnologia em Saúde',
    body1: ' é uma healthtech de Florianópolis. Ela ajuda operadoras de planos de saúde a checar seus dados antes de enviá-los à ',
    body1Bold2: 'ANS',
    body1End: ', a agência reguladora, para alcançarem uma boa nota de qualidade.',
    body2Pre: 'O fundador ',
    body2Bold: 'Flavio Exterkoetter',
    body2Mid: ' é médico e cientista da computação. A equipe tem ',
    body2Bold2: 'mais de 20 anos',
    body2End: ' de experiência.',
    missionLabel: 'A missão deles',
    missionQuote: '“Tornar as informações em saúde mais confiáveis e qualificadas.”',
    missionEn: '',
    facts: [
      { label: 'Clientes', value: '140+', note: 'operadoras de saúde' },
      { label: 'Alcance', value: '17', note: 'estados brasileiros' },
      { label: 'Monitoramento TISS', value: '2015', note: 'fazendo isso desde' },
      { label: 'Equipe de vendas', value: '3', note: 'vendedores, venda por relacionamento' },
    ],
    recognitionLabel: 'Reconhecimento e ecossistema',
    recognition: ['EXAME Negócios em Expansão 2025', 'Membro ACATE Saúde', 'Incubada no MIDITEC', 'Apoio do Sebrae', 'Floripa Mais Tec'],
    source: 'Fonte: blendus.com.br (Quem somos, Clientes) · conversa com a Eazybe, 11 nov 2026',
  },
  numbers: {
    tag: 'A BlendUs em números',
    h2Lead: 'Uma equipe pequena por trás de',
    h2Highlight: 'um grande motor de dados.',
    subPre: 'O produto deles, o ',
    subBold: 'Gestor IDSS',
    subPost: ', checa os dados da operadora, encontra erros e prevê a nota de qualidade.',
    stats: [
      { label: 'Guias validadas', value: '86M', note: 'registros de guias checados pelo Gestor IDSS' },
      { label: 'Erros encontrados', value: '55M', note: 'críticas detectadas antes de chegar à ANS' },
      { label: 'Resultado dos clientes', value: '70%', note: 'dos clientes chegaram à faixa de excelência no IDSS' },
    ],
    tiers: [
      { name: 'Simulador', body: 'Prevê a nota de qualidade' },
      { name: 'Qualifica', body: 'Adiciona checagens mais profundas' },
      { name: 'Premium', body: 'Adiciona mentoria e reuniões com especialistas' },
    ],
    fitBold: 'Onde a Eazybe entra:',
    fitBody: 'a BlendUs vende o Gestor IDSS em meses de conversas pelo WhatsApp.',
    fitHighlight: 'A Eazybe salva cada uma dessas conversas no HubSpot.',
    note: 'Números divulgados pela BlendUs',
    source: 'Fonte: blendus.com.br/gestor-idss',
  },
  history: {
    tag: 'Por que o histórico importa aqui',
    h2Lead: 'Os clientes ficam por anos.',
    h2Highlight: 'A história também precisa ficar.',
    clientsPre: 'Os clientes da BlendUs são grandes operadoras como ',
    clients: ['SulAmérica', 'Unimed', 'Postal Saúde', 'Real Grandeza'],
    clientsPost: '. Alguns são clientes há anos.',
    clientsAnd: 'e',
    question: 'Então toda renovação começa com uma pergunta: o que conversamos da última vez?',
    eazybePre: 'Com a ',
    eazybeBold: 'Eazybe',
    eazybePost: ', a resposta está no HubSpot: cada conversa do WhatsApp, salva.',
    photoAlt: 'Equipe de uma operadora analisando dados de planos em uma tela durante uma reunião',
    quotes: [
      {
        quote: 'Desde 2018 mantemos parceria com a Blendus Tecnologia em Saúde.',
        en: '',
        by: 'Leandro José João · Diretor Executivo, SIM Caixa de Assistência à Saúde',
      },
      {
        quote: 'O sistema Gestor IDSS nos traz em tempo real o cenário de evolução da operadora no IDSS.',
        en: '',
        by: 'Layane Barcelos · Evida Assistência à Saúde',
      },
    ],
    source: 'Fonte: blendus.com.br (Clientes, Gestor IDSS) · a foto é uma cena gerada por IA',
  },
  challenge: {
    tag: 'O desafio',
    h2Lead: 'Meses de negociação.',
    h2Highlight: 'Tudo em celulares pessoais.',
    subtitle: 'Todo cliente é uma grande operadora. Um negócio pode levar meses, e a maior parte da conversa acontece no WhatsApp.',
    cards: [
      { label: 'O risco', title: 'Quando alguém sai, as conversas saem junto', body: 'Uma pessoa da equipe saiu, e o histórico dos negócios estava no celular dela.' },
      { label: 'A lacuna', title: 'O HubSpot só via parte da história', body: 'Os e-mails eram salvos. As conversas do WhatsApp, não.' },
      { label: 'O que está em jogo', title: 'Cada negócio conta', body: 'O Brasil tem só 700–800 operadoras. Perder uma conversa pode significar perder um grande cliente.' },
    ],
  },
  rollout: {
    tag: 'A implantação',
    h2Lead: 'Da preocupação a',
    h2Highlight: 'cada conversa salva.',
    steps: [
      { date: 'Abr 2026', label: 'Entra na Eazybe, plano Starter', state: 'done' },
      { date: 'Passo 1', label: 'WhatsApp sincronizado com o HubSpot', state: 'done' },
      { date: 'Passo 2', label: 'Um bloco por dia', state: 'done' },
      { date: 'Nov 2026', label: 'Meta cumprida, call de revisão', state: 'done' },
      { date: 'Próximo', label: 'MCP, disparos, coexistência', state: 'next' },
    ],
    stats: [
      { label: 'Onde a equipe trabalha', value: 'WhatsApp Web', note: 'com a extensão da Eazybe, nada novo para aprender' },
      { label: 'Suporte', value: 'Em português', note: 'o Danilo destacou como um ponto forte' },
      { label: 'Meta principal', value: 'Cumprida ✓', note: 'cada conversa do WhatsApp agora no HubSpot', met: true },
    ],
  },
  flow: {
    tag: 'Como funciona',
    h2Lead: 'Da primeira conversa',
    h2Highlight: 'ao onboarding do cliente.',
    subtitle: 'A história completa agora acompanha o cliente, da primeira conversa ao onboarding.',
    nodes: [
      { name: 'WhatsApp', label: 'Cliente · 18:42', body: '“Vamos levar à diretoria.”' },
      { name: 'Eazybe', label: 'Sincronizado', body: 'Só conversa de negócios · 1 bloco hoje' },
      { name: 'HubSpot', label: 'Linha do tempo do negócio', body: 'E-mail + WhatsApp, lado a lado' },
      { name: 'Resumo de IA', label: 'Negócio ganho', body: 'Resumo escrito a partir das conversas salvas' },
      { name: 'ClickUp', label: 'Onboarding', body: 'Tarefa criada com o histórico completo' },
    ],
    note: 'Ilustrativo · mensagem de exemplo',
    won: { title: 'Negócio ganho', body: 'A IA escreve um resumo a partir das conversas salvas. Ele vai para a equipe de onboarding.' },
    lost: { title: 'Negócio perdido', body: 'A IA explica por que o negócio foi perdido, para a equipe aprender.' },
  },
  block: {
    tag: 'Um ajuste pequeno que fez diferença',
    h2Lead: 'Um dia de conversa.',
    h2Highlight: 'Um bloco limpo.',
    subtitle: 'No começo, cada mensagem virava uma nota separada no HubSpot. O Danilo pediu uma visão mais limpa, e agora a Eazybe salva cada dia como um bloco.',
    waTitle: 'WhatsApp · Cliente operadora',
    waBadge: 'Ao vivo',
    hsTitle: 'HubSpot · Linha do tempo',
    hsBadge: '1 bloco por dia',
    blockTitle: 'WhatsApp · Dia inteiro',
    blockBadge: 'Sincronizado pela Eazybe',
    footNote: 'Agora: um bloco limpo por dia',
    note: 'Ilustrativo · mensagens de exemplo',
  },
  privacy: {
    tag: 'Feito para dados sensíveis',
    h2Lead: 'Conversas de negócio entram.',
    h2Highlight: 'Conversas privadas ficam fora.',
    body: 'A BlendUs lida com dados de saúde, então tem regras rígidas. A Eazybe se encaixa nelas.',
    rows: [
      { label: 'Sincronizado', text: 'Só as conversas de negócio que a equipe escolhe', tone: 'green' },
      { label: 'Nunca sincronizado', text: 'Conversas pessoais e grupos privados', tone: 'red' },
      { label: 'IA, do jeito deles', text: 'O Eazybe MCP se conecta às ferramentas de IA que eles já pagam', tone: 'blue' },
    ],
    photoAlt: 'Celular mostrando a configuração de sincronização: conversas de clientes ligadas, conversas pessoais desligadas',
    photoChip: 'Você escolhe o que sincroniza',
    source: 'A foto é uma cena gerada por IA',
  },
  benefits: {
    tag: 'Benefícios',
    h2Lead: 'O que a BlendUs ganha',
    h2Highlight: 'com a Eazybe.',
    subtitle: 'Fatos reais sobre a BlendUs e o que a Eazybe muda.',
    factLabel: 'O fato',
    benefitLabel: 'O benefício',
    items: [
      { factPre: '3 vendedores, 140+ clientes: ', factBold: 'cerca de 47 clientes cada', factPost: '', title: 'O histórico de cada cliente em um só lugar', body: 'Nenhum vendedor precisa lembrar de 47 relacionamentos. O HubSpot lembra.' },
      { factPre: 'Os negócios levam ', factBold: 'meses', factPost: ' de conversa', title: 'O negócio inteiro, um bloco por dia', body: 'Fácil de ler antes de uma call.' },
      { factPre: 'Os clientes ficam por anos, como a ', factBold: 'SIM desde 2018', factPost: '', title: 'Renovações e upgrades mais inteligentes', body: 'Toda conversa de upgrade começa com o histórico completo.' },
      { factPre: 'Existem só ', factBold: '700–800', factPost: ' operadoras, e 140+ já são clientes', title: 'Nenhum prospect escapa', body: 'Cada conversa salva protege um negócio futuro.' },
      { factPre: 'Eles trabalham com ', factBold: 'dados sensíveis de saúde', factPost: '', title: 'Só conversas de negócio sincronizam', body: 'As conversas pessoais continuam privadas.' },
      { factPre: 'Uma pessoa da equipe ', factBold: 'saiu com o histórico dos negócios', factPost: '', title: 'O histórico fica quando as pessoas mudam', body: 'Cada conversa fica no HubSpot.' },
    ],
    source: 'Fontes: blendus.com.br e conversa com a Eazybe, 11 nov 2026',
  },
  results: {
    tag: 'Resultados até agora',
    h2Lead: 'A história do negócio,',
    h2Highlight: 'enfim completa.',
    stats: [
      { label: 'Meta principal', value: 'Cumprida', note: 'cada conversa do WhatsApp registrada no HubSpot' },
      { label: 'No ar há', value: '7 meses', note: 'de abril a novembro de 2026' },
      { label: 'Visão no HubSpot', value: '1 bloco', note: 'por dia, por conversa' },
      { label: 'Ferramentas conectadas', value: '4', note: 'WhatsApp, HubSpot, Pluga, ClickUp' },
    ],
    beforeLabel: 'Antes',
    afterLabel: 'Com a Eazybe',
    aspectLabel: 'Área',
    rows: [
      { aspect: 'Conversas do WhatsApp', before: 'No celular dos vendedores', after: 'Salvas no HubSpot' },
      { aspect: 'Quando um vendedor sai', before: 'Histórico em risco', after: 'O histórico fica' },
      { aspect: 'Revisão de negócios', before: 'De memória', after: 'Resumo de IA das conversas reais' },
      { aspect: 'Onboarding', before: 'Começa do zero', after: 'Histórico completo no ClickUp' },
    ],
    note: 'Todos os resultados vêm da call de revisão da BlendUs com a Eazybe em 11 de novembro de 2026.',
  },
  views: {
    tag: 'Duas visões, uma história',
    h2Lead: 'Os vendedores seguem conversando.',
    h2Highlight: 'Os gestores veem tudo.',
    subtitle: 'Ninguém muda o jeito de trabalhar. O CRM se preenche sozinho.',
    cards: [
      { chip: 'Para vendedores', title: 'Converse no WhatsApp como sempre', body: 'As conversas de negócio vão sozinhas para o HubSpot. Sem copiar e colar, sem notas extras.', alt: 'Vendedor conversando no WhatsApp pelo celular ao lado de um notebook' },
      { chip: 'Para gestores', title: 'Veja cada negócio com o histórico do WhatsApp', body: 'Um bloco limpo por dia fica ao lado dos e-mails em cada negócio.', alt: 'Gestora de vendas olhando um funil de negócios com um registro de dia inteiro do WhatsApp' },
    ],
    note: 'As fotos são cenas geradas por IA, os números nas telas não são dados da BlendUs',
  },
  words: {
    tag: 'Nas palavras deles',
    quoteApproved: false,
    quote: 'Nossa meta principal era manter cada conversa do WhatsApp no HubSpot. Isso está feito, e trouxe muita tranquilidade para a equipe.',
    quoteBy: 'Danilo Cândido · BlendUs',
    photoAlt: 'Duas pessoas apertando as mãos sobre uma mesa em um escritório',
    nextLabel: 'Próximos passos da BlendUs',
    next: [
      { badge: 'MCP', title: 'Perguntar à IA sobre o funil de vendas', body: 'Usar as ferramentas de IA que eles já pagam' },
      { badge: 'Disparos', title: 'Follow-up depois de eventos', body: 'Mensagens para listas do HubSpot, resposta um a um' },
      { badge: 'Coexistência', title: 'Um número, app e API', body: 'O mesmo número no celular e na API' },
    ],
  },
  why: {
    tag: 'Por que as equipes escolhem a Eazybe',
    partners: 'Meta Official Business Partner · HubSpot App Partner',
    stats: [
      { value: '30.000+', label: 'usuários no mundo' },
      { value: '40+', label: 'países' },
      { value: '4.3★', label: 'nota no HubSpot App Marketplace' },
      { value: 'SOC 2 Type II', label: 'GDPR · CCPA · PCI DSS' },
    ],
  },
  finalCta: {
    h2: 'Nunca mais perca um negócio do WhatsApp.',
    body: 'Salve cada conversa de negócio no HubSpot, Salesforce, Zoho, Pipedrive e outros, sem mudar o jeito que sua equipe vende.',
    primary: 'Teste grátis de 4 dias',
    secondary: 'Agendar demo',
    footnote: 'eazybe.com · sem cartão',
    backToHub: 'Todos os casos de sucesso',
  },
}

/* -------------------------------------------------------------------------- */
/* Spanish                                                                    */
/* -------------------------------------------------------------------------- */

const es: BlendusContent = {
  meta: {
    title: 'Caso BlendUs - Ventas de WhatsApp en HubSpot | Eazybe',
    description:
      'Cómo BlendUs, healthtech brasileña con 140+ aseguradoras de salud clientes, guarda cada negociación de WhatsApp en HubSpot con Eazybe, un bloque por día.',
    ogDescription:
      '3 vendedores. Grandes aseguradoras de salud. Ventas que tardan meses. Ahora cada chat de WhatsApp queda guardado en HubSpot.',
  },
  breadcrumb: { home: 'Inicio', hub: 'Casos de Éxito', current: 'BlendUs' },
  hero: {
    eyebrow: 'Caso de cliente · Gestión de conversaciones · Healthtech · Brasil',
    h1Pre: 'Cómo',
    h1Company: 'BlendUs',
    h1Highlight: 'Guarda Cada Venta de WhatsApp',
    h1Italic: 'en HubSpot,',
    h1With: 'con',
    h1Bold: 'Eazybe',
    subtitle: '3 vendedores. Grandes aseguradoras de salud. Ventas que tardan meses. Ahora cada chat de WhatsApp queda guardado en HubSpot.',
    stats: [
      { value: '140+', label: 'aseguradoras de salud clientes' },
      { value: '3', label: 'vendedores en el equipo' },
      { value: '1', label: 'bloque limpio por día en HubSpot' },
    ],
  },
  about: {
    tag: 'Sobre el cliente',
    h2Lead: 'Haciendo más confiables',
    h2Highlight: 'los datos de salud de Brasil.',
    body1Bold: 'Blendus Tecnologia em Saúde',
    body1: ' es una healthtech de Florianópolis, Brasil. Ayuda a las aseguradoras de salud a revisar sus datos antes de enviarlos a la ',
    body1Bold2: 'ANS',
    body1End: ', el regulador del gobierno, para obtener una buena nota de calidad.',
    body2Pre: 'Su fundador, ',
    body2Bold: 'Flavio Exterkoetter',
    body2Mid: ', es médico y científico de la computación. El equipo suma ',
    body2Bold2: 'más de 20 años',
    body2End: ' de experiencia.',
    missionLabel: 'Su misión',
    missionQuote: '“Tornar as informações em saúde mais confiáveis e qualificadas.”',
    missionEn: 'Hacer que la información de salud sea más confiable y calificada.',
    facts: [
      { label: 'Clientes', value: '140+', note: 'aseguradoras de salud' },
      { label: 'Alcance', value: '17', note: 'estados de Brasil' },
      { label: 'Monitoreo TISS', value: '2015', note: 'lo hacen desde' },
      { label: 'Equipo de ventas', value: '3', note: 'vendedores, venta por relación' },
    ],
    recognitionLabel: 'Reconocimientos y ecosistema',
    recognition: ['EXAME Negócios em Expansão 2025', 'Miembro de ACATE Saúde', 'Incubada en MIDITEC', 'Con apoyo de Sebrae', 'Floripa Mais Tec'],
    source: 'Fuente: blendus.com.br (Quem somos, Clientes) · llamada con Eazybe, 11 nov 2026',
  },
  numbers: {
    tag: 'BlendUs en números',
    h2Lead: 'Un equipo pequeño detrás de',
    h2Highlight: 'un gran motor de datos.',
    subPre: 'Su producto, ',
    subBold: 'Gestor IDSS',
    subPost: ', revisa los datos de las aseguradoras, encuentra errores y predice la nota de calidad.',
    stats: [
      { label: 'Guías validadas', value: '86M', note: 'registros de guías revisados por Gestor IDSS' },
      { label: 'Errores detectados', value: '55M', note: 'críticas detectadas antes de llegar al regulador' },
      { label: 'Resultados de clientes', value: '70%', note: 'de los clientes alcanzó la excelencia en el IDSS' },
    ],
    tiers: [
      { name: 'Simulador', body: 'Predice la nota de calidad' },
      { name: 'Qualifica', body: 'Suma revisiones de datos más profundas' },
      { name: 'Premium', body: 'Suma mentoría y reuniones con expertos' },
    ],
    fitBold: 'Dónde entra Eazybe:',
    fitBody: 'BlendUs vende Gestor IDSS en meses de conversaciones por WhatsApp.',
    fitHighlight: 'Eazybe guarda cada uno de esos chats en HubSpot.',
    note: 'Cifras publicadas por BlendUs',
    source: 'Fuente: blendus.com.br/gestor-idss',
  },
  history: {
    tag: 'Por qué importa el historial',
    h2Lead: 'Los clientes se quedan años.',
    h2Highlight: 'La historia también debe quedarse.',
    clientsPre: 'Los clientes de BlendUs son grandes aseguradoras como ',
    clients: ['SulAmérica', 'Unimed', 'Postal Saúde', 'Real Grandeza'],
    clientsPost: '. Algunos son clientes desde hace años.',
    clientsAnd: 'y',
    question: 'Por eso cada renovación empieza con una pregunta: ¿de qué hablamos la última vez?',
    eazybePre: 'Con ',
    eazybeBold: 'Eazybe',
    eazybePost: ', la respuesta está en HubSpot: cada conversación de WhatsApp, guardada.',
    photoAlt: 'Equipo de una aseguradora revisando datos de planes en una pantalla durante una reunión',
    quotes: [
      {
        quote: 'Desde 2018 mantemos parceria com a Blendus Tecnologia em Saúde.',
        en: 'Trabajamos con BlendUs desde 2018.',
        by: 'Leandro José João · Director Ejecutivo, SIM Caixa de Assistência à Saúde',
      },
      {
        quote: 'O sistema Gestor IDSS nos traz em tempo real o cenário de evolução da operadora no IDSS.',
        en: 'Gestor IDSS nos muestra en tiempo real cómo evoluciona nuestra nota IDSS.',
        by: 'Layane Barcelos · Evida Assistência à Saúde',
      },
    ],
    source: 'Fuente: blendus.com.br (Clientes, Gestor IDSS) · la foto es una escena generada con IA',
  },
  challenge: {
    tag: 'El desafío',
    h2Lead: 'Meses de negociación.',
    h2Highlight: 'Todo en teléfonos personales.',
    subtitle: 'Cada cliente es una gran aseguradora. Una venta puede tardar meses, y casi toda la conversación ocurre en WhatsApp.',
    cards: [
      { label: 'El riesgo', title: 'Cuando alguien se va, sus chats se van con él', body: 'Una persona del equipo se fue, y el historial de sus negociaciones estaba en su teléfono.' },
      { label: 'La brecha', title: 'HubSpot solo veía parte de la historia', body: 'Los correos se guardaban. Los chats de WhatsApp, no.' },
      { label: 'Lo que está en juego', title: 'Cada venta cuenta', body: 'Brasil tiene solo 700–800 aseguradoras de salud. Perder un chat puede significar perder un gran cliente.' },
    ],
  },
  rollout: {
    tag: 'La implementación',
    h2Lead: 'De la preocupación a',
    h2Highlight: 'cada chat guardado.',
    steps: [
      { date: 'Abr 2026', label: 'Se une a Eazybe, plan Starter', state: 'done' },
      { date: 'Paso 1', label: 'WhatsApp sincronizado con HubSpot', state: 'done' },
      { date: 'Paso 2', label: 'Un bloque por día', state: 'done' },
      { date: 'Nov 2026', label: 'Meta cumplida, llamada de revisión', state: 'done' },
      { date: 'Siguiente', label: 'MCP, difusiones, coexistencia', state: 'next' },
    ],
    stats: [
      { label: 'Dónde trabaja el equipo', value: 'WhatsApp Web', note: 'con la extensión de Eazybe, nada nuevo que aprender' },
      { label: 'Soporte', value: 'En portugués', note: 'Danilo lo destacó como un punto fuerte' },
      { label: 'Meta principal', value: 'Cumplida ✓', note: 'cada conversación de WhatsApp ya está en HubSpot', met: true },
    ],
  },
  flow: {
    tag: 'Cómo funciona',
    h2Lead: 'Del primer chat',
    h2Highlight: 'al onboarding del cliente.',
    subtitle: 'La historia completa ahora acompaña al cliente, desde el primer chat hasta el onboarding.',
    nodes: [
      { name: 'WhatsApp', label: 'Cliente · 18:42', body: '“Vamos levar à diretoria.”' },
      { name: 'Eazybe', label: 'Sincronizado', body: 'Solo chats de negocio · 1 bloque hoy' },
      { name: 'HubSpot', label: 'Línea de tiempo del negocio', body: 'Correo + WhatsApp, lado a lado' },
      { name: 'Resumen de IA', label: 'Venta ganada', body: 'Resumen escrito a partir de los chats guardados' },
      { name: 'ClickUp', label: 'Onboarding', body: 'Tarea creada con el historial completo' },
    ],
    note: 'Ilustrativo · mensaje de ejemplo',
    won: { title: 'Venta ganada', body: 'La IA escribe un resumen a partir de los chats guardados. Va al equipo de onboarding.' },
    lost: { title: 'Venta perdida', body: 'La IA explica por qué se perdió la venta, para que el equipo aprenda.' },
  },
  block: {
    tag: 'Un pequeño ajuste que importó',
    h2Lead: 'Un día de conversación.',
    h2Highlight: 'Un bloque limpio.',
    subtitle: 'Al principio, cada mensaje era una nota separada en HubSpot. Danilo pidió una vista más limpia, y ahora Eazybe guarda cada día como un solo bloque.',
    waTitle: 'WhatsApp · Cliente aseguradora',
    waBadge: 'En vivo',
    hsTitle: 'HubSpot · Línea de tiempo',
    hsBadge: '1 bloque por día',
    blockTitle: 'WhatsApp · Día completo',
    blockBadge: 'Sincronizado por Eazybe',
    footNote: 'Ahora: un bloque limpio por día',
    note: 'Ilustrativo · mensajes de ejemplo',
  },
  privacy: {
    tag: 'Hecho para datos sensibles',
    h2Lead: 'Los chats de negocio entran.',
    h2Highlight: 'Los chats privados se quedan fuera.',
    body: 'BlendUs maneja datos de salud, así que tiene reglas estrictas. Eazybe se adapta a ellas.',
    rows: [
      { label: 'Sincronizado', text: 'Solo los chats de negocio que el equipo elige', tone: 'green' },
      { label: 'Nunca sincronizado', text: 'Chats personales y grupos privados', tone: 'red' },
      { label: 'IA, a su manera', text: 'Eazybe MCP se conecta a las herramientas de IA que ya pagan', tone: 'blue' },
    ],
    photoAlt: 'Teléfono con la configuración de sincronización: chats de clientes activados, chats personales desactivados',
    photoChip: 'Tú eliges qué se sincroniza',
    source: 'La foto es una escena generada con IA',
  },
  benefits: {
    tag: 'Beneficios',
    h2Lead: 'Lo que BlendUs obtiene',
    h2Highlight: 'con Eazybe.',
    subtitle: 'Datos reales de BlendUs y lo que Eazybe cambia.',
    factLabel: 'El dato',
    benefitLabel: 'El beneficio',
    items: [
      { factPre: '3 vendedores, 140+ clientes: ', factBold: 'unos 47 clientes cada uno', factPost: '', title: 'El historial de cada cliente en un solo lugar', body: 'Ningún vendedor tiene que recordar 47 relaciones. HubSpot lo hace.' },
      { factPre: 'Las ventas tardan ', factBold: 'meses', factPost: ' de conversación', title: 'Toda la venta, un bloque por día', body: 'Fácil de leer antes de una llamada.' },
      { factPre: 'Los clientes se quedan años, como ', factBold: 'SIM desde 2018', factPost: '', title: 'Renovaciones y upgrades más inteligentes', body: 'Cada conversación de upgrade empieza con el historial completo.' },
      { factPre: 'Solo existen ', factBold: '700–800', factPost: ' aseguradoras, y 140+ ya son clientes', title: 'Ningún prospecto se escapa', body: 'Cada chat guardado protege una venta futura.' },
      { factPre: 'Trabajan con ', factBold: 'datos de salud sensibles', factPost: '', title: 'Solo se sincronizan los chats de negocio', body: 'Los chats personales siguen siendo privados.' },
      { factPre: 'Una persona del equipo ', factBold: 'se fue con el historial', factPost: '', title: 'El historial se queda cuando cambian las personas', body: 'Cada chat se queda en HubSpot.' },
    ],
    source: 'Fuentes: blendus.com.br y llamada con Eazybe, 11 nov 2026',
  },
  results: {
    tag: 'Resultados hasta ahora',
    h2Lead: 'La historia de la venta,',
    h2Highlight: 'por fin completa.',
    stats: [
      { label: 'Meta principal', value: 'Cumplida', note: 'cada conversación de WhatsApp registrada en HubSpot' },
      { label: 'En uso desde hace', value: '7 meses', note: 'de abril a noviembre de 2026' },
      { label: 'Vista en HubSpot', value: '1 bloque', note: 'por día, por conversación' },
      { label: 'Herramientas conectadas', value: '4', note: 'WhatsApp, HubSpot, Pluga, ClickUp' },
    ],
    beforeLabel: 'Antes',
    afterLabel: 'Con Eazybe',
    aspectLabel: 'Área',
    rows: [
      { aspect: 'Conversaciones de WhatsApp', before: 'En los teléfonos de los vendedores', after: 'Guardadas en HubSpot' },
      { aspect: 'Cuando un vendedor se va', before: 'Historial en riesgo', after: 'El historial se queda' },
      { aspect: 'Revisión de ventas', before: 'De memoria', after: 'Resumen de IA de los chats reales' },
      { aspect: 'Onboarding', before: 'Empieza de cero', after: 'Historial completo en ClickUp' },
    ],
    note: 'Todos los resultados son de la llamada de revisión de BlendUs con Eazybe del 11 de noviembre de 2026.',
  },
  views: {
    tag: 'Dos vistas, una historia',
    h2Lead: 'Los vendedores siguen chateando.',
    h2Highlight: 'Los gerentes lo ven todo.',
    subtitle: 'Nadie cambia su forma de trabajar. El CRM se llena solo.',
    cards: [
      { chip: 'Para vendedores', title: 'Chatea en WhatsApp como siempre', body: 'Los chats de negocio se guardan solos en HubSpot. Sin copiar y pegar, sin notas extra.', alt: 'Vendedor chateando por WhatsApp en su teléfono junto a una laptop' },
      { chip: 'Para gerentes', title: 'Ve cada venta con su historial de WhatsApp', body: 'Un bloque limpio por día aparece junto a los correos en cada negocio.', alt: 'Gerente de ventas mirando un pipeline con un registro de día completo de WhatsApp' },
    ],
    note: 'Las fotos son escenas generadas con IA, los números en pantalla no son datos de BlendUs',
  },
  words: {
    tag: 'En sus palabras',
    quoteApproved: false,
    quote: 'Nuestra meta principal era tener cada conversación de WhatsApp en HubSpot. Ya está hecho, y le dio al equipo verdadera tranquilidad.',
    quoteBy: 'Danilo Cândido · BlendUs',
    photoAlt: 'Dos personas dándose la mano sobre un escritorio en una oficina',
    nextLabel: 'Lo que sigue para BlendUs',
    next: [
      { badge: 'MCP', title: 'Preguntar a la IA por el pipeline de ventas', body: 'Usar las herramientas de IA que ya pagan' },
      { badge: 'Difusiones', title: 'Seguimiento después de eventos', body: 'Mensajes a listas de HubSpot, respuesta uno a uno' },
      { badge: 'Coexistencia', title: 'Un número, app y API', body: 'El mismo número en el teléfono y en la API' },
    ],
  },
  why: {
    tag: 'Por qué los equipos eligen Eazybe',
    partners: 'Meta Official Business Partner · HubSpot App Partner',
    stats: [
      { value: '30.000+', label: 'usuarios en el mundo' },
      { value: '40+', label: 'países' },
      { value: '4.3★', label: 'calificación en HubSpot App Marketplace' },
      { value: 'SOC 2 Type II', label: 'GDPR · CCPA · PCI DSS' },
    ],
  },
  finalCta: {
    h2: 'No vuelvas a perder una venta de WhatsApp.',
    body: 'Guarda cada chat de negocio en HubSpot, Salesforce, Zoho, Pipedrive y más, sin cambiar cómo vende tu equipo.',
    primary: 'Prueba gratis de 4 días',
    secondary: 'Reservar demo',
    footnote: 'eazybe.com · sin tarjeta',
    backToHub: 'Todos los casos de éxito',
  },
}

/* -------------------------------------------------------------------------- */
/* Turkish                                                                    */
/* -------------------------------------------------------------------------- */

const tr: BlendusContent = {
  meta: {
    title: "BlendUs: WhatsApp Satışları HubSpot'ta | Eazybe",
    description:
      "140+ sağlık sigortası müşterisi olan Brezilyalı BlendUs, Eazybe ile her WhatsApp satış görüşmesini HubSpot'a günde tek temiz blok olarak kaydediyor.",
    ogDescription:
      "3 satış temsilcisi. Büyük sağlık sigortası müşterileri. Aylar süren satışlar. Artık her WhatsApp sohbeti HubSpot'ta kayıtlı.",
  },
  breadcrumb: { home: 'Ana Sayfa', hub: 'Başarı Hikayeleri', current: 'BlendUs' },
  hero: {
    eyebrow: 'Müşteri hikayesi · Sohbet yönetimi · Sağlık teknolojisi · Brezilya',
    h1Pre: '',
    h1Company: 'BlendUs',
    h1Highlight: "Her WhatsApp Satışını Kaydediyor",
    h1Italic: "HubSpot'ta,",
    h1With: '',
    h1Bold: 'Eazybe ile',
    subtitle: "3 satış temsilcisi. Büyük sağlık sigortası müşterileri. Aylar süren satışlar. Artık her WhatsApp sohbeti HubSpot'ta kayıtlı.",
    stats: [
      { value: '140+', label: 'sağlık sigortası müşterisi' },
      { value: '3', label: 'kişilik satış ekibi' },
      { value: '1', label: "HubSpot'ta günde tek temiz blok" },
    ],
  },
  about: {
    tag: 'Müşteri hakkında',
    h2Lead: "Brezilya'nın sağlık verilerini",
    h2Highlight: 'daha güvenilir kılıyor.',
    body1Bold: 'Blendus Tecnologia em Saúde',
    body1: ", Brezilya'nın Florianópolis şehrinde bir sağlık teknolojisi şirketi. Sağlık sigortası şirketlerinin verilerini, devletin düzenleyici kurumu ",
    body1Bold2: 'ANS',
    body1End: "'ye gitmeden önce kontrol etmelerine yardım ediyor; böylece iyi bir kalite puanı alıyorlar.",
    body2Pre: 'Kurucu ',
    body2Bold: 'Flavio Exterkoetter',
    body2Mid: ' hem doktor hem bilgisayar bilimci. Ekibin ',
    body2Bold2: '20 yılı aşkın',
    body2End: ' deneyimi var.',
    missionLabel: 'Misyonları',
    missionQuote: '“Tornar as informações em saúde mais confiáveis e qualificadas.”',
    missionEn: 'Sağlık bilgilerini daha güvenilir ve nitelikli hale getirmek.',
    facts: [
      { label: 'Müşteriler', value: '140+', note: 'sağlık sigortası şirketi' },
      { label: 'Erişim', value: '17', note: 'Brezilya eyaleti' },
      { label: 'TISS izleme', value: '2015', note: "yılından beri" },
      { label: 'Satış ekibi', value: '3', note: 'temsilci, ilişki odaklı satış' },
    ],
    recognitionLabel: 'Ödüller ve ekosistem',
    recognition: ['EXAME Negócios em Expansão 2025', 'ACATE Saúde üyesi', 'MIDITEC kuluçka', 'Sebrae destekli', 'Floripa Mais Tec'],
    source: 'Kaynak: blendus.com.br (Quem somos, Clientes) · Eazybe görüşmesi, 11 Kas 2026',
  },
  numbers: {
    tag: 'Rakamlarla BlendUs',
    h2Lead: 'Küçük bir ekip,',
    h2Highlight: 'büyük bir veri motoru.',
    subPre: 'Ürünleri ',
    subBold: 'Gestor IDSS',
    subPost: ', sağlık sigortası verilerini kontrol ediyor, hataları buluyor ve kalite puanını tahmin ediyor.',
    stats: [
      { label: 'Doğrulanan kayıt', value: '86M', note: 'Gestor IDSS ile kontrol edilen kayıt' },
      { label: 'Yakalanan hata', value: '55M', note: 'düzenleyiciye ulaşmadan tespit edilen hata' },
      { label: 'Müşteri sonuçları', value: '%70', note: 'müşterinin IDSS mükemmellik puanına ulaşması' },
    ],
    tiers: [
      { name: 'Simulador', body: 'Kalite puanını tahmin eder' },
      { name: 'Qualifica', body: 'Daha derin veri kontrolleri ekler' },
      { name: 'Premium', body: 'Uzman mentorluğu ve toplantılar ekler' },
    ],
    fitBold: 'Eazybe nerede devreye giriyor:',
    fitBody: 'BlendUs, Gestor IDSS’i aylar süren WhatsApp görüşmeleriyle satıyor.',
    fitHighlight: "Eazybe bu sohbetlerin her birini HubSpot'a kaydediyor.",
    note: 'Rakamlar BlendUs tarafından yayımlandı',
    source: 'Kaynak: blendus.com.br/gestor-idss',
  },
  history: {
    tag: 'Geçmiş burada neden önemli',
    h2Lead: 'Müşteriler yıllarca kalıyor.',
    h2Highlight: 'Hikaye de kalmalı.',
    clientsPre: 'BlendUs’ın müşterileri ',
    clients: ['SulAmérica', 'Unimed', 'Postal Saúde', 'Real Grandeza'],
    clientsPost: ' gibi büyük sağlık sigortası şirketleri. Bazıları yıllardır müşteri.',
    clientsAnd: 've',
    question: 'Bu yüzden her yenileme tek bir soruyla başlıyor: geçen sefer ne konuşmuştuk?',
    eazybePre: '',
    eazybeBold: 'Eazybe',
    eazybePost: " ile cevap HubSpot'ta: her WhatsApp görüşmesi kayıtlı.",
    photoAlt: 'Bir toplantıda ekranda plan verilerini inceleyen sağlık sigortası ekibi',
    quotes: [
      {
        quote: 'Desde 2018 mantemos parceria com a Blendus Tecnologia em Saúde.',
        en: "2018'den beri BlendUs ile çalışıyoruz.",
        by: 'Leandro José João · İcra Direktörü, SIM Caixa de Assistência à Saúde',
      },
      {
        quote: 'O sistema Gestor IDSS nos traz em tempo real o cenário de evolução da operadora no IDSS.',
        en: 'Gestor IDSS, IDSS puanımızın nasıl değiştiğini bize gerçek zamanlı gösteriyor.',
        by: 'Layane Barcelos · Evida Assistência à Saúde',
      },
    ],
    source: 'Kaynak: blendus.com.br (Clientes, Gestor IDSS) · fotoğraf Yapay Zeka ile üretilmiş bir sahne',
  },
  challenge: {
    tag: 'Sorun',
    h2Lead: 'Aylar süren satış görüşmeleri.',
    h2Highlight: 'Hepsi kişisel telefonlarda.',
    subtitle: 'Her müşteri büyük bir sağlık sigortası şirketi. Bir satış aylar sürebiliyor ve görüşmelerin çoğu WhatsApp’ta oluyor.',
    cards: [
      { label: 'Risk', title: 'Biri ayrılınca sohbetleri de gidiyor', body: 'Bir ekip üyesi ayrıldı ve satış geçmişi onun telefonundaydı.' },
      { label: 'Boşluk', title: 'HubSpot hikayenin sadece bir kısmını görüyordu', body: 'E-postalar kaydediliyordu. WhatsApp sohbetleri kaydedilmiyordu.' },
      { label: 'Ne kadar önemli', title: 'Her satış önemli', body: "Brezilya'da sadece 700–800 sağlık sigortası şirketi var. Tek bir sohbeti kaybetmek büyük bir müşteriyi kaybetmek demek olabilir." },
    ],
  },
  rollout: {
    tag: 'Kurulum',
    h2Lead: 'Endişeden',
    h2Highlight: 'her sohbetin kaydına.',
    steps: [
      { date: 'Nis 2026', label: "Eazybe'ye katılıyor, Starter plan", state: 'done' },
      { date: 'Adım 1', label: "WhatsApp HubSpot'a senkron", state: 'done' },
      { date: 'Adım 2', label: 'Günde tek blok', state: 'done' },
      { date: 'Kas 2026', label: 'Hedefe ulaşıldı, değerlendirme görüşmesi', state: 'done' },
      { date: 'Sırada', label: 'MCP, yayınlar, coexistence', state: 'next' },
    ],
    stats: [
      { label: 'Ekibin çalıştığı yer', value: 'WhatsApp Web', note: 'Eazybe eklentisiyle, öğrenecek yeni bir şey yok' },
      { label: 'Destek', value: 'Portekizce', note: 'Danilo bunu öne çıkan bir nokta olarak belirtti' },
      { label: 'Ana hedef', value: 'Ulaşıldı ✓', note: "her WhatsApp görüşmesi artık HubSpot'ta", met: true },
    ],
  },
  flow: {
    tag: 'Nasıl çalışıyor',
    h2Lead: 'İlk sohbetten',
    h2Highlight: 'müşteri onboarding’ine.',
    subtitle: 'Tüm hikaye artık ilk sohbetten onboarding’e kadar müşteriyle birlikte gidiyor.',
    nodes: [
      { name: 'WhatsApp', label: 'Müşteri · 18:42', body: '“Vamos levar à diretoria.”' },
      { name: 'Eazybe', label: 'Senkronize', body: 'Sadece iş sohbeti · bugün 1 blok' },
      { name: 'HubSpot', label: 'Satış zaman çizelgesi', body: 'E-posta + WhatsApp yan yana' },
      { name: 'Yapay Zeka özeti', label: 'Kazanılan satış', body: 'Kayıtlı sohbetlerden yazılan özet' },
      { name: 'ClickUp', label: 'Onboarding', body: 'Tam geçmişle oluşturulan görev' },
    ],
    note: 'Temsili · örnek mesaj',
    won: { title: 'Kazanılan satış', body: 'Yapay Zeka kayıtlı sohbetlerden bir özet yazıyor. Özet onboarding ekibine gidiyor.' },
    lost: { title: 'Kaybedilen satış', body: 'Yapay Zeka satışın neden kaybedildiğini açıklıyor, ekip de buradan öğreniyor.' },
  },
  block: {
    tag: 'Fark yaratan küçük bir düzeltme',
    h2Lead: 'Bir günlük görüşme.',
    h2Highlight: 'Tek temiz blok.',
    subtitle: "Başta her mesaj HubSpot'ta ayrı bir not oluyordu. Danilo daha temiz bir görünüm istedi ve Eazybe artık her günü tek blok olarak kaydediyor.",
    waTitle: 'WhatsApp · Sağlık sigortası müşterisi',
    waBadge: 'Canlı',
    hsTitle: 'HubSpot · Satış zaman çizelgesi',
    hsBadge: 'Günde 1 blok',
    blockTitle: 'WhatsApp · Tüm gün',
    blockBadge: 'Eazybe ile senkron',
    footNote: 'Artık: günde tek temiz blok',
    note: 'Temsili · örnek mesajlar',
  },
  privacy: {
    tag: 'Hassas veriler için tasarlandı',
    h2Lead: 'İş sohbetleri içeride.',
    h2Highlight: 'Özel sohbetler dışarıda.',
    body: 'BlendUs sağlık verileriyle çalışıyor, bu yüzden kuralları katı. Eazybe bu kurallara uyuyor.',
    rows: [
      { label: 'Senkronize', text: 'Sadece ekibin seçtiği iş sohbetleri', tone: 'green' },
      { label: 'Asla senkronize edilmez', text: 'Kişisel sohbetler ve özel gruplar', tone: 'red' },
      { label: 'Kendi kurallarıyla Yapay Zeka', text: 'Eazybe MCP, zaten ödedikleri Yapay Zeka araçlarına bağlanıyor', tone: 'blue' },
    ],
    photoAlt: 'Sohbet senkron ayarlarını gösteren telefon: müşteri sohbetleri açık, kişisel sohbetler kapalı',
    photoChip: 'Neyin senkronlanacağını siz seçin',
    source: 'Fotoğraf Yapay Zeka ile üretilmiş bir sahne',
  },
  benefits: {
    tag: 'Faydalar',
    h2Lead: 'BlendUs’ın kazandıkları,',
    h2Highlight: 'Eazybe ile.',
    subtitle: 'BlendUs hakkında gerçek bilgiler ve Eazybe’nin değiştirdikleri.',
    factLabel: 'Gerçek',
    benefitLabel: 'Fayda',
    items: [
      { factPre: '3 temsilci, 140+ müşteri: ', factBold: 'kişi başı yaklaşık 47 müşteri', factPost: '', title: 'Her müşterinin geçmişi tek yerde', body: 'Hiçbir temsilci 47 ilişkiyi hatırlamak zorunda değil. HubSpot hatırlıyor.' },
      { factPre: 'Satışlar ', factBold: 'aylar', factPost: ' süren görüşmeler gerektiriyor', title: 'Tüm satış, günde tek blok', body: 'Bir görüşmeden önce okuması kolay.' },
      { factPre: 'Müşteriler yıllarca kalıyor, örneğin ', factBold: "2018'den beri SIM", factPost: '', title: 'Daha akıllı yenilemeler ve yükseltmeler', body: 'Her yükseltme görüşmesi tam geçmişle başlıyor.' },
      { factPre: 'Sadece ', factBold: '700–800', factPost: ' şirket var ve 140+ tanesi zaten müşteri', title: 'Hiçbir potansiyel müşteri kaçmıyor', body: 'Kayıtlı her sohbet gelecekteki bir satışı koruyor.' },
      { factPre: '', factBold: 'Hassas sağlık verileriyle', factPost: ' çalışıyorlar', title: 'Sadece iş sohbetleri senkronlanıyor', body: 'Kişisel sohbetler özel kalıyor.' },
      { factPre: 'Bir ekip üyesi ', factBold: 'satış geçmişiyle ayrıldı', factPost: '', title: 'İnsanlar değişse de geçmiş kalıyor', body: "Her sohbet HubSpot'ta kalıyor." },
    ],
    source: 'Kaynaklar: blendus.com.br ve Eazybe görüşmesi, 11 Kas 2026',
  },
  results: {
    tag: 'Şimdiye kadarki sonuçlar',
    h2Lead: 'Satışın hikayesi,',
    h2Highlight: 'sonunda eksiksiz.',
    stats: [
      { label: 'Ana hedef', value: 'Ulaşıldı', note: "her WhatsApp görüşmesi HubSpot'a kaydediliyor" },
      { label: 'Canlı kullanım', value: '7 ay', note: 'Nisan–Kasım 2026' },
      { label: 'HubSpot görünümü', value: '1 blok', note: 'günde, sohbet başına' },
      { label: 'Bağlı araçlar', value: '4', note: 'WhatsApp, HubSpot, Pluga, ClickUp' },
    ],
    beforeLabel: 'Önce',
    afterLabel: 'Eazybe ile',
    aspectLabel: 'Alan',
    rows: [
      { aspect: 'WhatsApp görüşmeleri', before: 'Temsilcilerin telefonlarında', after: "HubSpot'ta kayıtlı" },
      { aspect: 'Bir temsilci ayrılınca', before: 'Geçmiş risk altında', after: 'Geçmiş kalıyor' },
      { aspect: 'Satış değerlendirmeleri', before: 'Hafızadan', after: 'Gerçek sohbetlerin Yapay Zeka özeti' },
      { aspect: 'Onboarding', before: 'Sıfırdan başlıyor', after: "ClickUp'ta tam geçmiş" },
    ],
    note: "Tüm sonuçlar BlendUs'ın 11 Kasım 2026'da Eazybe ile yaptığı değerlendirme görüşmesinden.",
  },
  views: {
    tag: 'İki görünüm, tek hikaye',
    h2Lead: 'Temsilciler sohbet etmeye devam ediyor.',
    h2Highlight: 'Yöneticiler her şeyi görüyor.',
    subtitle: 'Kimse çalışma şeklini değiştirmiyor. CRM kendiliğinden doluyor.',
    cards: [
      { chip: 'Temsilciler için', title: "WhatsApp'ta her zamanki gibi yazın", body: "İş sohbetleri kendiliğinden HubSpot'a kaydediliyor. Kopyala-yapıştır yok, ekstra not yok.", alt: 'Dizüstü bilgisayarın yanında telefondan WhatsApp ile yazışan satış temsilcisi' },
      { chip: 'Yöneticiler için', title: 'Her satışı WhatsApp geçmişiyle görün', body: 'Günde tek temiz blok, her satışta e-postaların yanında duruyor.', alt: 'Tüm gün WhatsApp kaydı olan bir satış hunisine bakan satış yöneticisi' },
    ],
    note: 'Fotoğraflar Yapay Zeka ile üretilmiş sahneler, ekranlardaki rakamlar BlendUs verisi değil',
  },
  words: {
    tag: 'Kendi sözleriyle',
    quoteApproved: false,
    quote: "Ana hedefimiz her WhatsApp görüşmesini HubSpot'ta tutmaktı. Bu oldu ve ekibimize gerçek bir iç rahatlığı verdi.",
    quoteBy: 'Danilo Cândido · BlendUs',
    photoAlt: 'Bir ofiste masanın üzerinden el sıkışan iki kişi',
    nextLabel: 'BlendUs için sırada ne var',
    next: [
      { badge: 'MCP', title: 'Satış hunisi hakkında Yapay Zekaya sorun', body: 'Zaten ödedikleri Yapay Zeka araçlarını kullanın' },
      { badge: 'Yayınlar', title: 'Etkinliklerden sonra takip', body: 'HubSpot listelerine mesaj, birebir yanıt' },
      { badge: 'Coexistence', title: 'Tek numara, uygulama ve API', body: "Telefonda ve API'de aynı numara" },
    ],
  },
  why: {
    tag: 'Ekipler neden Eazybe’yi seçiyor',
    partners: 'Meta Official Business Partner · HubSpot App Partner',
    stats: [
      { value: '30.000+', label: 'dünya genelinde kullanıcı' },
      { value: '40+', label: 'ülke' },
      { value: '4.3★', label: 'HubSpot App Marketplace puanı' },
      { value: 'SOC 2 Type II', label: 'GDPR · CCPA · PCI DSS' },
    ],
  },
  finalCta: {
    h2: 'Bir daha hiçbir WhatsApp satışını kaybetmeyin.',
    body: "Ekibinizin satış şeklini değiştirmeden her iş sohbetini HubSpot, Salesforce, Zoho, Pipedrive ve diğerlerine kaydedin.",
    primary: '4 günlük ücretsiz deneme',
    secondary: 'Demo planla',
    footnote: 'eazybe.com · kart gerekmez',
    backToHub: 'Tüm başarı hikayeleri',
  },
}

export const BLENDUS_CONTENT_BY_LOCALE: Record<string, BlendusContent> = { en, br, es, tr }

export function getBlendusContent(locale: string): BlendusContent {
  return BLENDUS_CONTENT_BY_LOCALE[locale] ?? en
}

export function blendusHeadline(t: BlendusContent): string {
  const h = t.hero
  return [h.h1Pre, h.h1Company, h.h1Highlight, h.h1Italic, h.h1With, h.h1Bold].filter(Boolean).join(' ')
}
