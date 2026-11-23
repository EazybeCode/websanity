/**
 * Content for /case-studies/bmc-hyundai — BMC Hyundai (heavy machinery,
 * Brazil) AI-agent pilot story. Source: "BMC_Hyundai_Eazybe_Case_Study_v7"
 * deck. Figures marked as a pilot goal (`goal`) are targets until the 2-week
 * pilot ends; keep those labels when editing. Locales: en, br (pt-BR), es, tr.
 * The mock WhatsApp chats in the page stay in Portuguese on every locale: they
 * show real Brazilian customer conversations.
 */

export interface Stat {
  value: string
  label: string
  note?: string
  /** Shown in yellow after the note, e.g. "pilot goal". */
  goal?: string
}

export interface BmcContent {
  meta: { title: string; description: string; ogDescription: string }
  breadcrumb: { home: string; hub: string; current: string }
  hero: {
    eyebrow: string
    /** Line 1: light pre-word + bold company. */
    h1Pre: string
    h1Company: string
    /** Line 2: big blue phrase. */
    h1Highlight: string
    /** Line 3: light italic + light connector + bold. */
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
    bodyPre: string
    bodyBold: string
    bodyPost: string
    facts: Stat[]
    source: string
  }
  history: {
    tag: string
    h2Lead: string
    h2Highlight: string
    chip: string
    stats: Stat[]
    milestonesLabel: string
    milestones: { year: string; label: string }[]
    source: string
  }
  challenge: {
    tag: string
    h2Lead: string
    h2Highlight: string
    replyTime: Stat
    minutes: string
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
    phone: { seller: string; sameNumber: string; aiOn: string; aiAgent: string }
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
    flowLabel: string
    flow: string[]
    replied: string
    stats: Stat[]
  }
  crm: {
    tag: string
    h2Lead: string
    h2Highlight: string
    leadDetails: string
    contact: string
    rows: string[]
    saved: string
    cards: { title: string; body: string; metric: string; checklist?: string[] }[]
  }
  sla: {
    tag: string
    h2Lead: string
    h2Highlight: string
    alertText: string
    alertAction: string
    replyTime: string
    cards: { title: string; body: string }[]
    stats: Stat[]
  }
  handover: {
    tag: string
    h2Lead: string
    h2Highlight: string
    handed: string
    join: string
    steps: string[]
  }
  beforeAfter: {
    tag: string
    h2Lead: string
    h2Highlight: string
    barsTitle: string
    bars: { label: string; value: string; pct: number; tone: 'bad' | 'goal' | 'good' }[]
    barsNote: string
    aspectLabel: string
    beforeLabel: string
    afterLabel: string
    rows: { aspect: string; before: string; after: string }[]
  }
  results: { tag: string; bigLine1: string; bigLine2: string; h2: string; stats: Stat[]; note: string }
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
}

/* -------------------------------------------------------------------------- */
/* English                                                                    */
/* -------------------------------------------------------------------------- */

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
    h1Pre: 'How',
    h1Company: 'BMC Hyundai',
    h1Highlight: 'Replies 4x Faster',
    h1Italic: 'to WhatsApp leads',
    h1With: 'with',
    h1Bold: 'Eazybe AI Agents',
    subtitle: 'Top sellers were too busy to reply. Now AI answers on their own numbers, in seconds.',
    stats: [
      { value: '4x', label: 'faster replies', goal: 'pilot goal' },
      { value: '2 → 170+', label: 'sellers: pilot to rollout' },
      { value: '0', label: 'phone numbers changed' },
    ],
  },
  about: {
    tag: 'About the customer',
    h2Lead: 'Hyundai machines,',
    h2Highlight: 'built and served in Brazil.',
    bodyPre: 'BMC Hyundai brought the first Hyundai machine to Brazil in 2003. Today it sells',
    bodyBold: 'excavators, wheel loaders, forklifts and parts',
    bodyPost: 'to farms, mines, builders and rental fleets across the country.',
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
    h2Lead: 'From one forklift',
    h2Highlight: 'to 10,000 machines.',
    chip: 'Hyundai HX series · 2025',
    stats: [
      { value: 'US$175M', label: 'Factory · Itatiaia RJ', note: 'investment, opened 2013' },
      { value: '562,000 m²', label: 'Plant size', note: 'site area' },
      { value: '10,000', label: 'Built in Brazil', note: 'machines by 2024' },
    ],
    milestonesLabel: 'Milestones',
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
    minutes: 'Minutes',
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
    phone: { seller: 'Seller · BMC Hyundai', sameNumber: 'Same number', aiOn: 'AI on', aiAgent: 'AI agent' },
  },
  parts: {
    tag: 'How Eazybe works at BMC Hyundai',
    h2Lead: 'Four parts.',
    h2Highlight: 'One connected flow.',
    subtitle: 'From first message to closed deal. BMC Hyundai started with the part where deals leaked the most.',
    items: [
      {
        num: '01', status: 'live', statusLabel: 'Live', title: 'Conversation management',
        body: 'Sellers’ WhatsApp chats, files and voice notes sync to the right HubSpot contact. Duplicate contacts merged so every history sits on one record.',
        foot: 'WhatsApp → HubSpot',
      },
      {
        num: '02', status: 'offered', statusLabel: 'Offered', title: 'Outreach',
        body: 'Broadcasts through the official Meta number, sent to HubSpot lists, with every reply landing back on the contact.',
        foot: 'Broadcast · Auto dialer',
      },
      {
        num: '03', status: 'pilot', statusLabel: 'Pilot', title: 'Sales intelligence',
        body: 'AI reads each chat and fills HubSpot fields: tax ID, part, machine. SLA alerts flag a late reply. Next: lost-sale reasons by part.',
        foot: 'Fields · SLA · Insights',
      },
      {
        num: '04', status: 'pilot', statusLabel: 'Pilot', title: 'AI agents',
        body: 'A WhatsApp agent on the sellers’ own numbers replies in seconds, qualifies the lead and hands it to the seller. Next: automatic quotes.',
        foot: 'Reply · Qualify · Hand over',
      },
    ],
  },
  agent: {
    tag: 'Part 4 · AI agents',
    h2Lead: 'The AI answers',
    h2Highlight: 'while the seller is busy.',
    flowLabel: 'How a lead moves',
    flow: ['WhatsApp', 'AI agent', 'HubSpot'],
    replied: 'Replied in 8 sec',
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
    leadDetails: 'Lead details',
    contact: 'HubSpot contact',
    rows: ['WhatsApp message · “Preciso de um filtro para HX220”', 'AI fields · tax ID, part, machine', 'Handed to seller · full history'],
    saved: 'Saved to CRM',
    cards: [
      { title: 'The AI asks the right questions', body: 'Tax ID, part and machine, collected in the chat.', metric: '3/3', checklist: ['Tax ID', 'Part', 'Machine model'] },
      { title: 'Everything lands in HubSpot', body: 'Chats and details saved on the right contact.', metric: '0 typing' },
    ],
  },
  sla: {
    tag: 'Part 3 · Sales intelligence: SLA alerts and team view',
    h2Lead: 'The manager',
    h2Highlight: 'coaches instead of chasing.',
    alertText: 'Chat waiting 10 min',
    alertAction: 'AI took over',
    replyTime: 'Reply time',
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
    handed: 'Handed to you',
    join: 'Join chat',
    steps: ['The seller is told when a lead is ready', 'One click to join, with the full chat history', 'A human stays in charge of every sale'],
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
    aspectLabel: 'Aspect',
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
    bigLine1: 'faster',
    bigLine2: 'replies ↗',
    h2: '4x faster replies, on the numbers customers already trust.',
    stats: [
      { value: '4x', label: 'Reply speed', note: 'faster', goal: 'pilot goal' },
      { value: '100%', label: 'HubSpot', note: 'of new leads saved', goal: 'pilot goal' },
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
}

/* -------------------------------------------------------------------------- */
/* Português (Brasil)                                                         */
/* -------------------------------------------------------------------------- */

const br: BmcContent = {
  meta: {
    title: 'Case BMC Hyundai - Agentes de IA no WhatsApp | Eazybe',
    description:
      'Como a BMC Hyundai, parceira da Hyundai em máquinas pesadas no Brasil, colocou agentes de IA da Eazybe nos números de WhatsApp dos próprios vendedores para responder leads em segundos e sincronizar cada conversa com o HubSpot.',
    ogDescription:
      'Os melhores vendedores da BMC Hyundai estavam ocupados demais para responder. Agora a IA da Eazybe responde nos números deles, em segundos, e registra cada lead no HubSpot.',
  },
  breadcrumb: { home: 'Início', hub: 'Casos de Sucesso', current: 'BMC Hyundai' },
  hero: {
    eyebrow: 'Case de cliente · Agentes de IA · Máquinas pesadas · Brasil',
    h1Pre: 'Como a',
    h1Company: 'BMC Hyundai',
    h1Highlight: 'Responde 4x Mais Rápido',
    h1Italic: 'aos leads do WhatsApp',
    h1With: 'com os',
    h1Bold: 'Agentes de IA da Eazybe',
    subtitle: 'Os melhores vendedores estavam ocupados demais para responder. Agora a IA responde nos números deles, em segundos.',
    stats: [
      { value: '4x', label: 'respostas mais rápidas', goal: 'meta do piloto' },
      { value: '2 → 170+', label: 'vendedores: do piloto à expansão' },
      { value: '0', label: 'números de telefone trocados' },
    ],
  },
  about: {
    tag: 'Sobre o cliente',
    h2Lead: 'Máquinas Hyundai,',
    h2Highlight: 'fabricadas e atendidas no Brasil.',
    bodyPre: 'A BMC Hyundai trouxe a primeira máquina Hyundai para o Brasil em 2003. Hoje vende',
    bodyBold: 'escavadeiras, pás carregadeiras, empilhadeiras e peças',
    bodyPost: 'para fazendas, mineradoras, construtoras e locadoras em todo o país.',
    facts: [
      { value: '2003', label: 'Desde', note: 'primeira máquina Hyundai vendida no Brasil, uma empilhadeira' },
      { value: '13', label: 'Filiais', note: 'filiais em 13 estados, do Paraná ao Pará' },
      { value: '800+', label: 'Assistência técnica', note: 'técnicos ativos em todo o Brasil' },
      { value: '2.000+', label: 'Clientes', note: 'clientes atendidos pela rede de serviços a cada ano' },
      { value: '38', label: 'Catálogo', note: 'modelos de máquinas em 6 linhas de produtos' },
      { value: '7', label: 'Setores', note: 'agro, construção, florestal, governo, indústria, mineração, locação' },
    ],
    source: 'Fontes: bmchyundai.com.br (Nossa História, SAB)',
  },
  history: {
    tag: '23 anos no Brasil',
    h2Lead: 'De uma empilhadeira',
    h2Highlight: 'a 10.000 máquinas.',
    chip: 'Hyundai série HX · 2025',
    stats: [
      { value: 'US$175M', label: 'Fábrica · Itatiaia RJ', note: 'de investimento, inaugurada em 2013' },
      { value: '562.000 m²', label: 'Tamanho da planta', note: 'de área total' },
      { value: '10.000', label: 'Fabricadas no Brasil', note: 'máquinas até 2024' },
    ],
    milestonesLabel: 'Marcos',
    milestones: [
      { year: '2003', label: 'Primeira empilhadeira' },
      { year: '2007', label: 'Fundação da BMC' },
      { year: '2013', label: 'Fábrica de Itatiaia' },
      { year: '2014', label: 'Rede de serviços e peças' },
      { year: '2024', label: '10.000 máquinas' },
      { year: '2026', label: 'Piloto de IA da Eazybe' },
    ],
    source: 'Fontes: bmchyundai.com.br · hyundai-ce.com.br · KHL (2013)',
  },
  challenge: {
    tag: 'O desafio',
    h2Lead: 'Os clientes escreviam rápido.',
    h2Highlight: 'As respostas demoravam.',
    replyTime: { value: '~20', label: 'Tempo até a primeira resposta · top vendedores', note: 'estimativa da própria BMC Hyundai para seus vendedores de peças mais ocupados' },
    minutes: 'Minutos',
    questions: { value: '3', label: 'Cada novo lead', note: 'perguntas digitadas à mão: CNPJ, peça, máquina' },
    industry: { value: '7x', label: 'Dados do setor', note: 'mais chances de qualificar um lead respondendo em até 1 hora (HBR, 2011)' },
    loadTitle: 'Quem carrega o peso',
    load: [
      { label: 'Vendedores de peças', value: '20+', pct: 12 },
      { label: 'Vendedores de campo', value: '~150', pct: 88 },
    ],
    loadNote: 'Os dois vendem pelo próprio WhatsApp. O gerente comercial tirava prints das conversas lentas para cobrar agilidade.',
  },
  rule: {
    tag: 'A única regra',
    h2Lead: 'Manter o número.',
    h2Highlight: 'Adicionar a IA.',
    quote: 'Nossos clientes são apegados àquele número. Se eu colocar uma IA em outro número, eu perco eles.',
    quoteBy: 'Alexandre de Freitas · BMC Hyundai',
    notOption: { label: 'Fora de cogitação', body: 'Um número novo de bot que os clientes não conhecem' },
    built: { label: 'O que a Eazybe criou', body: 'IA dentro do WhatsApp de cada vendedor' },
    privacy: 'Só as conversas de negócio vão para o HubSpot. Conversas pessoais e grupos privados dos vendedores nunca são sincronizados.',
    phone: { seller: 'Vendedor · BMC Hyundai', sameNumber: 'Mesmo número', aiOn: 'IA ligada', aiAgent: 'Agente de IA' },
  },
  parts: {
    tag: 'Como a Eazybe funciona na BMC Hyundai',
    h2Lead: 'Quatro partes.',
    h2Highlight: 'Um fluxo conectado.',
    subtitle: 'Da primeira mensagem ao negócio fechado. A BMC Hyundai começou pela parte em que mais perdia negócios.',
    items: [
      {
        num: '01', status: 'live', statusLabel: 'Ativo', title: 'Gestão de conversas',
        body: 'Conversas, arquivos e áudios do WhatsApp dos vendedores sincronizam no contato certo do HubSpot. Contatos duplicados são mesclados para que todo o histórico fique em um só registro.',
        foot: 'WhatsApp → HubSpot',
      },
      {
        num: '02', status: 'offered', statusLabel: 'Oferecido', title: 'Prospecção',
        body: 'Disparos pelo número oficial da Meta, enviados para listas do HubSpot, com cada resposta voltando para o contato.',
        foot: 'Disparos · Discador automático',
      },
      {
        num: '03', status: 'pilot', statusLabel: 'Piloto', title: 'Inteligência de vendas',
        body: 'A IA lê cada conversa e preenche os campos do HubSpot: CNPJ, peça, máquina. Alertas de SLA sinalizam respostas atrasadas. Próximo passo: motivos de venda perdida por peça.',
        foot: 'Campos · SLA · Insights',
      },
      {
        num: '04', status: 'pilot', statusLabel: 'Piloto', title: 'Agentes de IA',
        body: 'Um agente no WhatsApp, nos números dos próprios vendedores, responde em segundos, qualifica o lead e passa para o vendedor. Próximo passo: orçamentos automáticos.',
        foot: 'Responde · Qualifica · Transfere',
      },
    ],
  },
  agent: {
    tag: 'Parte 4 · Agentes de IA',
    h2Lead: 'A IA responde',
    h2Highlight: 'enquanto o vendedor está ocupado.',
    flowLabel: 'Como um lead avança',
    flow: ['WhatsApp', 'Agente de IA', 'HubSpot'],
    replied: 'Respondeu em 8 s',
    stats: [
      { value: '8 s', label: 'Primeira resposta', note: 'exemplo da demonstração' },
      { value: 'PT-BR', label: 'Idioma', note: 'ajustado para português nos testes' },
      { value: '30 dias', label: 'Memória', note: 'de contexto das conversas por cliente' },
      { value: '24/7', label: 'Disponibilidade', note: 'noites, fins de semana, horário de almoço' },
    ],
  },
  crm: {
    tag: 'Partes 1 + 3 · Gestão de conversas e inteligência de vendas',
    h2Lead: 'Da conversa ao CRM,',
    h2Highlight: 'sem digitar nada.',
    leadDetails: 'Dados do lead',
    contact: 'Contato no HubSpot',
    rows: ['Mensagem no WhatsApp · “Preciso de um filtro para HX220”', 'Campos da IA · CNPJ, peça, máquina', 'Passado ao vendedor · histórico completo'],
    saved: 'Salvo no CRM',
    cards: [
      { title: 'A IA faz as perguntas certas', body: 'CNPJ, peça e máquina, coletados na conversa.', metric: '3/3', checklist: ['CNPJ', 'Peça', 'Modelo da máquina'] },
      { title: 'Tudo vai para o HubSpot', body: 'Conversas e dados salvos no contato certo.', metric: '0 digitação' },
    ],
  },
  sla: {
    tag: 'Parte 3 · Inteligência de vendas: alertas de SLA e visão do time',
    h2Lead: 'O gestor',
    h2Highlight: 'treina em vez de cobrar.',
    alertText: 'Conversa esperando há 10 min',
    alertAction: 'A IA assumiu',
    replyTime: 'Tempo de resposta',
    cards: [
      { title: 'Nenhuma conversa fica esperando.', body: 'A IA assume e o gestor é avisado.' },
      { title: 'Tempo de resposta de cada vendedor.', body: 'Vendedores com IA e os demais, lado a lado.' },
    ],
    stats: [
      { value: '10 min', label: 'A IA entra após', note: 'sem resposta, definido pelo time' },
      { value: '0', label: 'Prints necessários', note: 'tempo de resposta por vendedor em uma só tela' },
    ],
  },
  handover: {
    tag: 'Parte 4 · Agentes de IA: passagem para o vendedor',
    h2Lead: 'A IA começa.',
    h2Highlight: 'O vendedor fecha.',
    handed: 'Passado para você',
    join: 'Entrar na conversa',
    steps: ['O vendedor é avisado quando o lead está pronto', 'Um clique para entrar, com todo o histórico da conversa', 'Uma pessoa continua no comando de cada venda'],
  },
  beforeAfter: {
    tag: 'Antes vs depois',
    h2Lead: 'Mesmo time. Mesmos números.',
    h2Highlight: 'Um dia diferente.',
    barsTitle: 'Tempo até a primeira resposta',
    bars: [
      { label: 'Antes', value: '~20 min', pct: 100, tone: 'bad' },
      { label: 'Meta do piloto', value: '5 min', pct: 25, tone: 'goal' },
      { label: '1º contato da IA', value: 'segundos', pct: 3, tone: 'good' },
    ],
    barsNote: '“Antes” é uma estimativa da BMC Hyundai. Os números finais saem depois do piloto de 2 semanas.',
    aspectLabel: 'Aspecto',
    beforeLabel: 'Antes',
    afterLabel: 'Com a Eazybe',
    rows: [
      { aspect: 'Dados do lead', before: 'À mão', after: 'Coletados pela IA' },
      { aspect: 'HubSpot', before: 'Se der tempo', after: 'Sempre atualizado' },
      { aspect: 'Conversas lentas', before: 'Prints', after: 'Alertas' },
      { aspect: 'Fora do horário', before: 'Espera até de manhã', after: 'Respondido 24/7' },
      { aspect: 'Número do cliente', before: 'O do vendedor', after: 'Continua o do vendedor' },
    ],
  },
  results: {
    tag: 'Os resultados até agora',
    bigLine1: 'respostas',
    bigLine2: 'mais rápidas ↗',
    h2: 'Respostas 4x mais rápidas, nos números em que os clientes já confiam.',
    stats: [
      { value: '4x', label: 'Velocidade de resposta', note: 'mais rápida', goal: 'meta do piloto' },
      { value: '100%', label: 'HubSpot', note: 'dos novos leads salvos', goal: 'meta do piloto' },
      { value: '0', label: 'Números trocados', note: 'os clientes continuam com seu vendedor' },
      { value: '170+', label: 'Próxima expansão', note: 'vendedores de peças e de campo' },
    ],
    note: 'Metas do piloto até o fim do teste de 2 semanas.',
  },
  why: {
    tag: 'Por que os times escolhem a Eazybe',
    partners: 'Meta Official Business Partner · HubSpot App Partner',
    stats: [
      { value: '30.000+', label: 'usuários no mundo' },
      { value: '40+', label: 'países' },
      { value: '4,3★', label: 'nota no HubSpot App Marketplace' },
      { value: 'SOC 2 Type II', label: 'GDPR · CCPA · PCI DSS' },
    ],
    nextLabel: 'Próximos passos na BMC Hyundai',
    next: 'Orçamentos automáticos · Insights de vendas perdidas por peça · IA para 150 vendedores de campo',
  },
  finalCta: {
    h2: 'Todo lead respondido em segundos, no WhatsApp do seu próprio time.',
    body: 'Agentes de IA no WhatsApp para times que usam CRM. HubSpot, Salesforce, Zoho, Pipedrive, Odoo e mais.',
    primary: 'Começar teste grátis de 4 dias',
    secondary: 'Agendar demo',
    footnote: 'Teste grátis de 4 dias · sem cartão',
    backToHub: 'Todos os casos de sucesso',
  },
}

/* -------------------------------------------------------------------------- */
/* Español                                                                    */
/* -------------------------------------------------------------------------- */

const es: BmcContent = {
  meta: {
    title: 'Caso BMC Hyundai - Agentes de IA en WhatsApp | Eazybe',
    description:
      'Cómo BMC Hyundai, socio de Hyundai en maquinaria pesada en Brasil, puso agentes de IA de Eazybe en los números de WhatsApp de sus propios vendedores para responder a los leads en segundos y sincronizar cada chat con HubSpot.',
    ogDescription:
      'Los mejores vendedores de BMC Hyundai estaban demasiado ocupados para responder. Ahora la IA de Eazybe responde en sus propios números, en segundos, y registra cada lead en HubSpot.',
  },
  breadcrumb: { home: 'Inicio', hub: 'Casos de Éxito', current: 'BMC Hyundai' },
  hero: {
    eyebrow: 'Caso de cliente · Agentes de IA · Maquinaria pesada · Brasil',
    h1Pre: 'Cómo',
    h1Company: 'BMC Hyundai',
    h1Highlight: 'Responde 4x Más Rápido',
    h1Italic: 'a los leads de WhatsApp',
    h1With: 'con los',
    h1Bold: 'Agentes de IA de Eazybe',
    subtitle: 'Los mejores vendedores estaban demasiado ocupados para responder. Ahora la IA responde en sus propios números, en segundos.',
    stats: [
      { value: '4x', label: 'respuestas más rápidas', goal: 'meta del piloto' },
      { value: '2 → 170+', label: 'vendedores: del piloto al despliegue' },
      { value: '0', label: 'números de teléfono cambiados' },
    ],
  },
  about: {
    tag: 'Sobre el cliente',
    h2Lead: 'Máquinas Hyundai,',
    h2Highlight: 'fabricadas y atendidas en Brasil.',
    bodyPre: 'BMC Hyundai trajo la primera máquina Hyundai a Brasil en 2003. Hoy vende',
    bodyBold: 'excavadoras, cargadoras de ruedas, montacargas y repuestos',
    bodyPost: 'a haciendas, minas, constructoras y empresas de alquiler de todo el país.',
    facts: [
      { value: '2003', label: 'Desde', note: 'primera máquina Hyundai vendida en Brasil, un montacargas' },
      { value: '13', label: 'Sucursales', note: 'sucursales en 13 estados, de Paraná a Pará' },
      { value: '800+', label: 'Servicio técnico', note: 'técnicos activos en todo Brasil' },
      { value: '2.000+', label: 'Clientes', note: 'clientes atendidos por la red de servicio cada año' },
      { value: '38', label: 'Catálogo', note: 'modelos de máquinas en 6 líneas de producto' },
      { value: '7', label: 'Sectores', note: 'agro, construcción, forestal, gobierno, industria, minería, alquiler' },
    ],
    source: 'Fuentes: bmchyundai.com.br (Nossa História, SAB)',
  },
  history: {
    tag: '23 años en Brasil',
    h2Lead: 'De un montacargas',
    h2Highlight: 'a 10.000 máquinas.',
    chip: 'Hyundai serie HX · 2025',
    stats: [
      { value: 'US$175M', label: 'Fábrica · Itatiaia RJ', note: 'de inversión, inaugurada en 2013' },
      { value: '562.000 m²', label: 'Tamaño de la planta', note: 'de superficie total' },
      { value: '10.000', label: 'Fabricadas en Brasil', note: 'máquinas hasta 2024' },
    ],
    milestonesLabel: 'Hitos',
    milestones: [
      { year: '2003', label: 'Primer montacargas' },
      { year: '2007', label: 'Fundación de BMC' },
      { year: '2013', label: 'Fábrica de Itatiaia' },
      { year: '2014', label: 'Red de servicio y repuestos' },
      { year: '2024', label: '10.000 máquinas' },
      { year: '2026', label: 'Piloto de IA de Eazybe' },
    ],
    source: 'Fuentes: bmchyundai.com.br · hyundai-ce.com.br · KHL (2013)',
  },
  challenge: {
    tag: 'El desafío',
    h2Lead: 'Los clientes escribían rápido.',
    h2Highlight: 'Las respuestas tardaban.',
    replyTime: { value: '~20', label: 'Tiempo hasta la primera respuesta · mejores vendedores', note: 'estimación de la propia BMC Hyundai para sus vendedores de repuestos más ocupados' },
    minutes: 'Minutos',
    questions: { value: '3', label: 'Cada nuevo lead', note: 'preguntas escritas a mano: CNPJ, repuesto, máquina' },
    industry: { value: '7x', label: 'Datos del sector', note: 'más probabilidades de calificar un lead si se responde en menos de 1 hora (HBR, 2011)' },
    loadTitle: 'Quién lleva la carga',
    load: [
      { label: 'Vendedores de repuestos', value: '20+', pct: 12 },
      { label: 'Vendedores de campo', value: '~150', pct: 88 },
    ],
    loadNote: 'Ambos venden desde su propio WhatsApp. El jefe de ventas hacía capturas de los chats lentos para exigir rapidez.',
  },
  rule: {
    tag: 'La única regla',
    h2Lead: 'Mantener el número.',
    h2Highlight: 'Sumar la IA.',
    quote: 'Nuestros clientes están enganchados a ese número. Si pongo una IA en otro número, los pierdo.',
    quoteBy: 'Alexandre de Freitas · BMC Hyundai',
    notOption: { label: 'No era una opción', body: 'Un número de bot nuevo que los clientes no conocen' },
    built: { label: 'Lo que construyó Eazybe', body: 'IA dentro del WhatsApp de cada vendedor' },
    privacy: 'Solo los chats de negocio se sincronizan con HubSpot. Los chats personales y grupos privados de los vendedores nunca se sincronizan.',
    phone: { seller: 'Vendedor · BMC Hyundai', sameNumber: 'Mismo número', aiOn: 'IA activa', aiAgent: 'Agente de IA' },
  },
  parts: {
    tag: 'Cómo funciona Eazybe en BMC Hyundai',
    h2Lead: 'Cuatro partes.',
    h2Highlight: 'Un flujo conectado.',
    subtitle: 'Del primer mensaje a la venta cerrada. BMC Hyundai empezó por la parte donde más ventas se perdían.',
    items: [
      {
        num: '01', status: 'live', statusLabel: 'Activo', title: 'Gestión de conversaciones',
        body: 'Los chats, archivos y notas de voz de WhatsApp de los vendedores se sincronizan con el contacto correcto de HubSpot. Los contactos duplicados se fusionan para que todo el historial quede en un solo registro.',
        foot: 'WhatsApp → HubSpot',
      },
      {
        num: '02', status: 'offered', statusLabel: 'Ofrecido', title: 'Prospección',
        body: 'Envíos masivos desde el número oficial de Meta a listas de HubSpot, con cada respuesta volviendo al contacto.',
        foot: 'Difusión · Marcador automático',
      },
      {
        num: '03', status: 'pilot', statusLabel: 'Piloto', title: 'Inteligencia de ventas',
        body: 'La IA lee cada chat y completa los campos de HubSpot: CNPJ, repuesto, máquina. Las alertas de SLA señalan una respuesta tardía. Siguiente paso: motivos de venta perdida por repuesto.',
        foot: 'Campos · SLA · Insights',
      },
      {
        num: '04', status: 'pilot', statusLabel: 'Piloto', title: 'Agentes de IA',
        body: 'Un agente de WhatsApp en los números de los propios vendedores responde en segundos, califica el lead y se lo pasa al vendedor. Siguiente paso: cotizaciones automáticas.',
        foot: 'Responde · Califica · Transfiere',
      },
    ],
  },
  agent: {
    tag: 'Parte 4 · Agentes de IA',
    h2Lead: 'La IA responde',
    h2Highlight: 'mientras el vendedor está ocupado.',
    flowLabel: 'Cómo avanza un lead',
    flow: ['WhatsApp', 'Agente de IA', 'HubSpot'],
    replied: 'Respondió en 8 s',
    stats: [
      { value: '8 s', label: 'Primera respuesta', note: 'ejemplo de la demo' },
      { value: 'PT-BR', label: 'Idioma', note: 'ajustado al portugués en las pruebas' },
      { value: '30 días', label: 'Memoria', note: 'de contexto de chat por cliente' },
      { value: '24/7', label: 'Disponibilidad', note: 'noches, fines de semana, hora del almuerzo' },
    ],
  },
  crm: {
    tag: 'Partes 1 + 3 · Gestión de conversaciones e inteligencia de ventas',
    h2Lead: 'Del chat al CRM,',
    h2Highlight: 'sin escribir nada.',
    leadDetails: 'Datos del lead',
    contact: 'Contacto en HubSpot',
    rows: ['Mensaje de WhatsApp · “Preciso de um filtro para HX220”', 'Campos de la IA · CNPJ, repuesto, máquina', 'Pasado al vendedor · historial completo'],
    saved: 'Guardado en el CRM',
    cards: [
      { title: 'La IA hace las preguntas correctas', body: 'CNPJ, repuesto y máquina, recogidos en el chat.', metric: '3/3', checklist: ['CNPJ', 'Repuesto', 'Modelo de máquina'] },
      { title: 'Todo llega a HubSpot', body: 'Chats y datos guardados en el contacto correcto.', metric: '0 tecleo' },
    ],
  },
  sla: {
    tag: 'Parte 3 · Inteligencia de ventas: alertas de SLA y vista del equipo',
    h2Lead: 'El gerente',
    h2Highlight: 'entrena en lugar de perseguir.',
    alertText: 'Chat esperando 10 min',
    alertAction: 'La IA tomó el control',
    replyTime: 'Tiempo de respuesta',
    cards: [
      { title: 'Ningún chat se queda esperando.', body: 'La IA toma el control y se avisa al gerente.' },
      { title: 'Tiempo de respuesta de cada vendedor.', body: 'Vendedores con IA frente al resto, lado a lado.' },
    ],
    stats: [
      { value: '10 min', label: 'La IA entra tras', note: 'sin respuesta, definido por el equipo' },
      { value: '0', label: 'Capturas necesarias', note: 'tiempo de respuesta por vendedor en una sola vista' },
    ],
  },
  handover: {
    tag: 'Parte 4 · Agentes de IA: traspaso al vendedor',
    h2Lead: 'La IA empieza.',
    h2Highlight: 'El vendedor cierra.',
    handed: 'Asignado a ti',
    join: 'Unirse al chat',
    steps: ['Se avisa al vendedor cuando el lead está listo', 'Un clic para unirse, con todo el historial del chat', 'Una persona sigue a cargo de cada venta'],
  },
  beforeAfter: {
    tag: 'Antes vs después',
    h2Lead: 'El mismo equipo. Los mismos números.',
    h2Highlight: 'Un día distinto.',
    barsTitle: 'Tiempo hasta la primera respuesta',
    bars: [
      { label: 'Antes', value: '~20 min', pct: 100, tone: 'bad' },
      { label: 'Meta del piloto', value: '5 min', pct: 25, tone: 'goal' },
      { label: '1er contacto de la IA', value: 'segundos', pct: 3, tone: 'good' },
    ],
    barsNote: '“Antes” es una estimación de BMC Hyundai. Las cifras finales llegan tras el piloto de 2 semanas.',
    aspectLabel: 'Aspecto',
    beforeLabel: 'Antes',
    afterLabel: 'Con Eazybe',
    rows: [
      { aspect: 'Datos del lead', before: 'A mano', after: 'Recogidos por la IA' },
      { aspect: 'HubSpot', before: 'Si hay tiempo', after: 'Siempre actualizado' },
      { aspect: 'Chats lentos', before: 'Capturas', after: 'Alertas' },
      { aspect: 'Fuera de horario', before: 'Espera a la mañana', after: 'Respondido 24/7' },
      { aspect: 'Número del cliente', before: 'El del vendedor', after: 'Sigue siendo el del vendedor' },
    ],
  },
  results: {
    tag: 'Los resultados hasta ahora',
    bigLine1: 'respuestas',
    bigLine2: 'más rápidas ↗',
    h2: 'Respuestas 4x más rápidas, en los números en los que los clientes ya confían.',
    stats: [
      { value: '4x', label: 'Velocidad de respuesta', note: 'más rápida', goal: 'meta del piloto' },
      { value: '100%', label: 'HubSpot', note: 'de los nuevos leads guardados', goal: 'meta del piloto' },
      { value: '0', label: 'Números cambiados', note: 'los clientes siguen con su vendedor' },
      { value: '170+', label: 'Próximo despliegue', note: 'vendedores de repuestos y de campo' },
    ],
    note: 'Metas del piloto hasta que termine la prueba de 2 semanas.',
  },
  why: {
    tag: 'Por qué los equipos eligen Eazybe',
    partners: 'Meta Official Business Partner · HubSpot App Partner',
    stats: [
      { value: '30.000+', label: 'usuarios en el mundo' },
      { value: '40+', label: 'países' },
      { value: '4,3★', label: 'valoración en HubSpot App Marketplace' },
      { value: 'SOC 2 Type II', label: 'GDPR · CCPA · PCI DSS' },
    ],
    nextLabel: 'Lo siguiente para BMC Hyundai',
    next: 'Cotizaciones automáticas · Insights de ventas perdidas por repuesto · IA para 150 vendedores de campo',
  },
  finalCta: {
    h2: 'Cada lead respondido en segundos, en el propio WhatsApp de tu equipo.',
    body: 'Agentes de IA en WhatsApp para equipos que trabajan con CRM. HubSpot, Salesforce, Zoho, Pipedrive, Odoo y más.',
    primary: 'Empezar prueba gratis de 4 días',
    secondary: 'Reservar demo',
    footnote: 'Prueba gratis de 4 días · sin tarjeta',
    backToHub: 'Todos los casos de éxito',
  },
}

/* -------------------------------------------------------------------------- */
/* Türkçe                                                                     */
/* -------------------------------------------------------------------------- */

const tr: BmcContent = {
  meta: {
    title: 'BMC Hyundai Başarı Hikayesi - WhatsApp Yapay Zeka Ajanları | Eazybe',
    description:
      "Hyundai'nin Brezilya'daki iş makinesi ortağı BMC Hyundai, Eazybe Yapay Zeka ajanlarını satış temsilcilerinin kendi WhatsApp numaralarına yerleştirdi: lead'lere saniyeler içinde yanıt veriyor ve her sohbeti HubSpot'a senkronluyor.",
    ogDescription:
      "BMC Hyundai'nin en iyi satış temsilcileri yanıt veremeyecek kadar yoğundu. Artık Eazybe Yapay Zekası onların kendi numaralarından saniyeler içinde yanıt veriyor ve her lead'i HubSpot'a kaydediyor.",
  },
  breadcrumb: { home: 'Ana Sayfa', hub: 'Başarı Hikayeleri', current: 'BMC Hyundai' },
  hero: {
    eyebrow: 'Müşteri hikayesi · Yapay Zeka ajanları · İş makineleri · Brezilya',
    h1Pre: '',
    h1Company: 'BMC Hyundai',
    h1Highlight: '4 Kat Daha Hızlı Yanıt Veriyor',
    h1Italic: "WhatsApp lead'lerine",
    h1With: '',
    h1Bold: 'Eazybe Yapay Zeka Ajanlarıyla',
    subtitle: 'En iyi satış temsilcileri yanıt veremeyecek kadar yoğundu. Artık Yapay Zeka, onların kendi numaralarından saniyeler içinde yanıt veriyor.',
    stats: [
      { value: '4x', label: 'daha hızlı yanıt', goal: 'pilot hedefi' },
      { value: '2 → 170+', label: 'temsilci: pilottan yaygınlaştırmaya' },
      { value: '0', label: 'değiştirilen telefon numarası' },
    ],
  },
  about: {
    tag: 'Müşteri hakkında',
    h2Lead: 'Hyundai makineleri,',
    h2Highlight: "Brezilya'da üretiliyor ve servis ediliyor.",
    bodyPre: "BMC Hyundai, ilk Hyundai makinesini 2003'te Brezilya'ya getirdi. Bugün ülke genelinde çiftliklere, madenlere, inşaat firmalarına ve kiralama filolarına",
    bodyBold: 'ekskavatör, lastikli yükleyici, forklift ve yedek parça',
    bodyPost: 'satıyor.',
    facts: [
      { value: '2003', label: 'Kuruluş', note: "Brezilya'da satılan ilk Hyundai makinesi, bir forklift" },
      { value: '13', label: 'Şube', note: "Paraná'dan Pará'ya 13 eyalette şube" },
      { value: '800+', label: 'Saha servisi', note: "Brezilya genelinde aktif teknisyen" },
      { value: '2.000+', label: 'Müşteri', note: 'servis ağının her yıl hizmet verdiği müşteri' },
      { value: '38', label: 'Katalog', note: '6 ürün grubunda makine modeli' },
      { value: '7', label: 'Sektör', note: 'tarım, inşaat, ormancılık, kamu, sanayi, madencilik, kiralama' },
    ],
    source: 'Kaynaklar: bmchyundai.com.br (Nossa História, SAB)',
  },
  history: {
    tag: "Brezilya'da 23 yıl",
    h2Lead: 'Tek bir forkliftten',
    h2Highlight: '10.000 makineye.',
    chip: 'Hyundai HX serisi · 2025',
    stats: [
      { value: 'US$175M', label: 'Fabrika · Itatiaia RJ', note: "yatırım, 2013'te açıldı" },
      { value: '562.000 m²', label: 'Tesis büyüklüğü', note: 'toplam alan' },
      { value: '10.000', label: "Brezilya'da üretilen", note: "2024'e kadar makine" },
    ],
    milestonesLabel: 'Kilometre taşları',
    milestones: [
      { year: '2003', label: 'İlk forklift' },
      { year: '2007', label: "BMC'nin kuruluşu" },
      { year: '2013', label: 'Itatiaia fabrikası' },
      { year: '2014', label: 'Servis ve parça ağı' },
      { year: '2024', label: '10.000 makine' },
      { year: '2026', label: 'Eazybe Yapay Zeka pilotu' },
    ],
    source: 'Kaynaklar: bmchyundai.com.br · hyundai-ce.com.br · KHL (2013)',
  },
  challenge: {
    tag: 'Zorluk',
    h2Lead: 'Müşteriler hızlı yazıyordu.',
    h2Highlight: 'Yanıtlar geç geliyordu.',
    replyTime: { value: '~20', label: 'İlk yanıt süresi · en iyi temsilciler', note: "BMC Hyundai'nin en yoğun yedek parça temsilcileri için kendi tahmini" },
    minutes: 'Dakika',
    questions: { value: '3', label: "Her yeni lead'de", note: 'elle yazılan soru: vergi numarası, parça, makine' },
    industry: { value: '7x', label: 'Sektör verisi', note: '1 saat içinde yanıt verildiğinde lead’i nitelendirme olasılığı (HBR, 2011)' },
    loadTitle: 'Yükü kim taşıyor',
    load: [
      { label: 'Parça temsilcileri', value: '20+', pct: 12 },
      { label: 'Saha temsilcileri', value: '~150', pct: 88 },
    ],
    loadNote: 'İkisi de kendi WhatsApp numarasından satış yapıyor. Satış müdürü hız için yavaş sohbetlerin ekran görüntüsünü alıyordu.',
  },
  rule: {
    tag: 'Tek kural',
    h2Lead: 'Numara aynı kalsın.',
    h2Highlight: 'Yapay Zeka eklensin.',
    quote: 'Müşterilerimiz o numaraya bağlı. Yapay Zekayı başka bir numaraya koyarsam onları kaybederim.',
    quoteBy: 'Alexandre de Freitas · BMC Hyundai',
    notOption: { label: 'Seçenek değildi', body: 'Müşterilerin tanımadığı yeni bir bot numarası' },
    built: { label: "Eazybe'nin kurduğu", body: 'Her temsilcinin kendi WhatsApp’ı içinde Yapay Zeka' },
    privacy: "HubSpot'a yalnızca iş sohbetleri senkronlanır. Temsilcilerin kişisel sohbetleri ve özel grupları asla senkronlanmaz.",
    phone: { seller: 'Temsilci · BMC Hyundai', sameNumber: 'Aynı numara', aiOn: 'YZ açık', aiAgent: 'YZ ajanı' },
  },
  parts: {
    tag: "Eazybe BMC Hyundai'de nasıl çalışıyor",
    h2Lead: 'Dört parça.',
    h2Highlight: 'Tek bağlantılı akış.',
    subtitle: 'İlk mesajdan kapanan satışa. BMC Hyundai, satışların en çok kaçtığı yerden başladı.',
    items: [
      {
        num: '01', status: 'live', statusLabel: 'Canlı', title: 'Sohbet yönetimi',
        body: "Temsilcilerin WhatsApp sohbetleri, dosyaları ve sesli notları doğru HubSpot kişisine senkronlanır. Mükerrer kişiler birleştirilir, tüm geçmiş tek kayıtta durur.",
        foot: 'WhatsApp → HubSpot',
      },
      {
        num: '02', status: 'offered', statusLabel: 'Teklif edildi', title: 'Erişim',
        body: "Resmi Meta numarasından HubSpot listelerine toplu mesaj; her yanıt kişinin kaydına geri döner.",
        foot: 'Toplu mesaj · Otomatik arama',
      },
      {
        num: '03', status: 'pilot', statusLabel: 'Pilot', title: 'Satış zekası',
        body: "Yapay Zeka her sohbeti okur ve HubSpot alanlarını doldurur: vergi numarası, parça, makine. SLA uyarıları geciken yanıtı işaretler. Sırada: parça bazında kaybedilen satış nedenleri.",
        foot: 'Alanlar · SLA · İçgörüler',
      },
      {
        num: '04', status: 'pilot', statusLabel: 'Pilot', title: 'Yapay Zeka ajanları',
        body: "Temsilcilerin kendi numaralarındaki bir WhatsApp ajanı saniyeler içinde yanıt verir, lead'i nitelendirir ve temsilciye devreder. Sırada: otomatik teklifler.",
        foot: 'Yanıtla · Nitelendir · Devret',
      },
    ],
  },
  agent: {
    tag: 'Bölüm 4 · Yapay Zeka ajanları',
    h2Lead: 'Yapay Zeka yanıtlıyor,',
    h2Highlight: 'temsilci meşgulken.',
    flowLabel: 'Bir lead nasıl ilerler',
    flow: ['WhatsApp', 'YZ ajanı', 'HubSpot'],
    replied: '8 sn içinde yanıtladı',
    stats: [
      { value: '8 sn', label: 'İlk yanıt', note: 'demodan bir örnek' },
      { value: 'PT-BR', label: 'Dil', note: 'testlerde Portekizceye göre ayarlandı' },
      { value: '30 gün', label: 'Hafıza', note: 'müşteri başına sohbet bağlamı' },
      { value: '7/24', label: 'Erişilebilirlik', note: 'geceler, hafta sonları, öğle araları' },
    ],
  },
  crm: {
    tag: 'Bölüm 1 + 3 · Sohbet yönetimi ve satış zekası',
    h2Lead: "Sohbetten CRM'e,",
    h2Highlight: 'tek kelime yazmadan.',
    leadDetails: 'Lead bilgileri',
    contact: 'HubSpot kişisi',
    rows: ['WhatsApp mesajı · “Preciso de um filtro para HX220”', 'YZ alanları · vergi no, parça, makine', 'Temsilciye devredildi · tüm geçmiş'],
    saved: "CRM'e kaydedildi",
    cards: [
      { title: 'Yapay Zeka doğru soruları sorar', body: 'Vergi numarası, parça ve makine sohbette toplanır.', metric: '3/3', checklist: ['Vergi no', 'Parça', 'Makine modeli'] },
      { title: "Her şey HubSpot'a düşer", body: 'Sohbetler ve bilgiler doğru kişiye kaydedilir.', metric: '0 yazma' },
    ],
  },
  sla: {
    tag: 'Bölüm 3 · Satış zekası: SLA uyarıları ve ekip görünümü',
    h2Lead: 'Yönetici',
    h2Highlight: 'peşinden koşmak yerine koçluk yapar.',
    alertText: 'Sohbet 10 dk bekliyor',
    alertAction: 'YZ devraldı',
    replyTime: 'Yanıt süresi',
    cards: [
      { title: 'Hiçbir sohbet beklemede kalmaz.', body: 'Yapay Zeka devralır ve yöneticiye haber verilir.' },
      { title: 'Her temsilcinin yanıt süresi.', body: 'YZ kullanan temsilciler ile diğerleri yan yana.' },
    ],
    stats: [
      { value: '10 dk', label: 'YZ devreye girer', note: 'yanıt gelmezse, süreyi ekip belirler' },
      { value: '0', label: 'Gereken ekran görüntüsü', note: 'temsilci başına yanıt süresi tek ekranda' },
    ],
  },
  handover: {
    tag: 'Bölüm 4 · Yapay Zeka ajanları: temsilciye devir',
    h2Lead: 'Yapay Zeka başlatır.',
    h2Highlight: 'Temsilci kapatır.',
    handed: 'Size devredildi',
    join: 'Sohbete katıl',
    steps: ['Lead hazır olduğunda temsilciye haber verilir', 'Tüm sohbet geçmişiyle tek tıkla katılım', 'Her satışın kontrolü bir insanda kalır'],
  },
  beforeAfter: {
    tag: 'Öncesi ve sonrası',
    h2Lead: 'Aynı ekip. Aynı numaralar.',
    h2Highlight: 'Bambaşka bir gün.',
    barsTitle: 'İlk yanıt süresi',
    bars: [
      { label: 'Öncesi', value: '~20 dk', pct: 100, tone: 'bad' },
      { label: 'Pilot hedefi', value: '5 dk', pct: 25, tone: 'goal' },
      { label: 'YZ ilk temas', value: 'saniyeler', pct: 3, tone: 'good' },
    ],
    barsNote: '“Öncesi” BMC Hyundai’nin tahminidir. Kesin rakamlar 2 haftalık pilotun ardından gelecek.',
    aspectLabel: 'Konu',
    beforeLabel: 'Öncesi',
    afterLabel: 'Eazybe ile',
    rows: [
      { aspect: 'Lead bilgileri', before: 'Elle', after: 'YZ topluyor' },
      { aspect: 'HubSpot', before: 'Vakit olursa', after: 'Her zaman güncel' },
      { aspect: 'Yavaş sohbetler', before: 'Ekran görüntüsü', after: 'Uyarılar' },
      { aspect: 'Mesai dışı', before: 'Sabahı bekliyor', after: '7/24 yanıtlanıyor' },
      { aspect: 'Müşterinin numarası', before: 'Temsilcinin kendi', after: 'Hâlâ temsilcinin kendi' },
    ],
  },
  results: {
    tag: 'Şimdiye kadarki sonuçlar',
    bigLine1: 'daha hızlı',
    bigLine2: 'yanıt ↗',
    h2: 'Müşterilerin zaten güvendiği numaralarda 4 kat daha hızlı yanıt.',
    stats: [
      { value: '4x', label: 'Yanıt hızı', note: 'daha hızlı', goal: 'pilot hedefi' },
      { value: '100%', label: 'HubSpot', note: "yeni lead'lerin kaydı", goal: 'pilot hedefi' },
      { value: '0', label: 'Değişen numara', note: 'müşteriler temsilcileriyle kalıyor' },
      { value: '170+', label: 'Sonraki yaygınlaştırma', note: 'parça ve saha temsilcisi' },
    ],
    note: '2 haftalık test bitene kadar pilot hedefleridir.',
  },
  why: {
    tag: 'Ekipler neden Eazybe’yi seçiyor',
    partners: 'Meta Official Business Partner · HubSpot App Partner',
    stats: [
      { value: '30.000+', label: 'dünya genelinde kullanıcı' },
      { value: '40+', label: 'ülke' },
      { value: '4,3★', label: 'HubSpot App Marketplace puanı' },
      { value: 'SOC 2 Type II', label: 'GDPR · CCPA · PCI DSS' },
    ],
    nextLabel: "BMC Hyundai'de sırada",
    next: 'Otomatik teklifler · Parça bazında kayıp satış içgörüleri · 150 saha temsilcisi için Yapay Zeka',
  },
  finalCta: {
    h2: "Her lead'e saniyeler içinde, ekibinizin kendi WhatsApp'ından yanıt.",
    body: 'CRM ekipleri için WhatsApp Yapay Zeka ajanları. HubSpot, Salesforce, Zoho, Pipedrive, Odoo ve daha fazlası.',
    primary: '4 günlük ücretsiz denemeyi başlat',
    secondary: 'Demo planla',
    footnote: '4 günlük ücretsiz deneme · kart gerekmez',
    backToHub: 'Tüm başarı hikayeleri',
  },
}

export const BMC_CONTENT_BY_LOCALE: Record<string, BmcContent> = { en, br, es, tr }

export function getBmcContent(locale: string): BmcContent {
  return BMC_CONTENT_BY_LOCALE[locale] ?? en
}

/** Plain-text headline for schema / share text. */
export function bmcHeadline(t: BmcContent): string {
  const h = t.hero
  return [h.h1Pre, h.h1Company, h.h1Highlight, h.h1Italic, h.h1With, h.h1Bold].filter(Boolean).join(' ')
}
