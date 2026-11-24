/**
 * Copy for /case-studies/itecsur, from the ITECSUR_Eazybe_Case_Study_v8 deck
 * (15 slides). Strings only; layout and markup live in the page component.
 *
 * English only for now: every locale falls back to `en` until br/es/tr are
 * translated. Chat mock-ups stay in Spanish (the applicants' language).
 */

export interface Stat {
  value: string
  label: string
  note?: string
  /** Marks a target, not a measured result (shown as a yellow "pilot goal"). */
  goal?: string
}

export interface ItecsurContent {
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
    bodyBold1: string
    bodyMid: string
    bodyBold2: string
    bodyEnd: string
    facts: Stat[]
    campusesLabel: string
    campuses: string[]
    campusesNote: string
    photoAlt: string
    photoChip: string
    source: string
  }
  applicants: {
    tag: string
    h2Lead: string
    h2Highlight: string
    body: string
    groups: { name: string; count: string; programs: string }[]
    modes: string
    photoAlt: string
    photoChip: string
    source: string
  }
  challenge: {
    tag: string
    h2Lead: string
    h2Highlight: string
    inboxTitle: string
    inboxBadge: string
    inboxNote: string
    cards: { label: string; title: string; body: string }[]
  }
  rollout: {
    tag: string
    h2Lead: string
    h2Highlight: string
    steps: { date: string; label: string; state: 'done' | 'next' | 'goal' }[]
    stats: Stat[]
  }
  parts: {
    tag: string
    h2Lead: string
    h2Highlight: string
    items: { num: string; status: 'live' | 'next' | 'phase'; statusLabel: string; title: string; body: string; foot: string }[]
  }
  core: {
    tag: string
    h2Lead: string
    h2Highlight: string
    funnelLabel: string
    funnel: { badge: string; title: string; note: string; action: string; tone: 'green' | 'yellow' | 'red' }[]
    funnelNote: string
    chatName: string
    chatBadge: string
    propsNote: string
  }
  day: {
    tag: string
    h2Lead: string
    h2Highlight: string
    scenes: { label: string; caption?: string; alt: string }[]
    note: string
  }
  winback: {
    tag: string
    h2Lead: string
    h2Highlight: string
    bodyPre: string
    bodyBold: string
    bodyPost: string
    flow: string[]
    imageAlt: string
    imageNote: string
    templateNote: string
  }
  inbox: {
    tag: string
    h2Lead: string
    h2Highlight: string
    photoAlt: string
    photoChip: string
    panelTitle: string
    panelCount: string
    filters: string[]
    replyLabel: string
    advisors: { name: string; pct: number; speed: string; tone: 'fast' | 'mid' | 'slow' }[]
    summaryTitle: string
    summaryBody: string
    sample: string
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
  benefits: {
    tag: string
    h2Lead: string
    h2Highlight: string
    subtitle: string
    columns: { label: string; title: string; items: { title: string; body: string }[] }[]
    poweredLabel: string
    powered: string[]
  }
  agent: {
    tag: string
    h2Lead: string
    h2Highlight: string
    subtitle: string
    chatTitle: string
    chatBadge: string
    chips: string[]
    cards: { label: string; title: string; body: string }[]
    foot: string
  }
  words: {
    tag: string
    /** The customer has not approved this quote yet; it only renders once true. */
    quoteApproved: boolean
    quote: string
    quoteBy: string
    nextLabel: string
    next: { badge: string; text: string }[]
    photoAlt: string
  }
  why: {
    tag: string
    partners: string
    stats: Stat[]
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

/** Sample applicant chat on the "core idea" slide (kept in Spanish). */
export const ITECSUR_CORE_CHAT = {
  inText: 'Ya envié la cédula y el título de bachiller. ¿Qué me falta para matricularme?',
  inTime: '10:41',
  outText: '¡Hola Kevin! Solo falta el pago de matrícula. Te envío los datos.',
  outTime: '10:44',
  props: [
    { k: 'Etapa de matrícula', v: 'LISTO PARA MATRICULARSE', tone: 'green' },
    { k: 'Intención', v: 'ALTA', tone: 'green' },
    { k: 'Urgencia', v: 'MEDIA', tone: 'yellow' },
    { k: 'Humor', v: 'POSITIVO', tone: 'blue' },
    { k: 'Idioma', v: 'ESPAÑOL', tone: 'blue' },
  ],
} as const

/** Sample inbox on the challenge slide. */
export const ITECSUR_INBOX = [
  { initials: 'MJ', name: 'María José P.', msg: '¿Cuándo empiezan las clases?', ago: '3 d' },
  { initials: 'KA', name: 'Kevin A.', msg: 'Ya envié la cédula, ¿qué falta?', ago: '5 d' },
  { initials: 'DS', name: 'Daniela S.', msg: 'Gracias, lo voy a pensar', ago: '2 sem' },
  { initials: 'LM', name: 'Luis M.', msg: 'audio · 0:48', ago: '1 mes' },
  { initials: 'AR', name: 'Andrea R.', msg: 'Malla_curricular.pdf', ago: '2 mes' },
] as const

/** After-hours AI agent chat (kept in Spanish). */
export const ITECSUR_AGENT_CHAT = [
  { dir: 'in', text: 'Hola, ¿qué requisitos necesito para Enfermería?', time: '22:47' },
  { dir: 'out', text: '¡Hola! Para Enfermería necesitas tu cédula y el título de bachiller. Puedes estudiar en Quito Sur. ¿En qué jornada te gustaría estudiar?', time: '22:47' },
  { dir: 'in', text: 'En la mañana. ¿Cuándo empiezan?', time: '22:49' },
  { dir: 'out', text: 'Te comparto la malla curricular. Mañana a las 8:00 una asesora te ayuda con tu matrícula.', time: '22:49' },
] as const

/* -------------------------------------------------------------------------- */
/* English                                                                    */
/* -------------------------------------------------------------------------- */

const en: ItecsurContent = {
  meta: {
    title: 'ITECSUR Case Study - WhatsApp AI for Admissions | Eazybe',
    description:
      'How ITECSUR, an accredited institute in Ecuador, uses Eazybe AI to tag every WhatsApp applicant by enrolment stage, share one inbox across 5 advisors and keep HubSpot current.',
    ogDescription:
      'Applicants message ITECSUR on WhatsApp all day. Now Eazybe AI reads every chat and tells advisors who to call first.',
  },
  breadcrumb: { home: 'Home', hub: 'Case Studies', current: 'ITECSUR' },
  hero: {
    eyebrow: 'Customer story · Sales intelligence · Education · Ecuador',
    h1Pre: 'How',
    h1Company: 'ITECSUR',
    h1Highlight: 'Enrols 4x More Students',
    h1Italic: 'from WhatsApp chats',
    h1With: 'with',
    h1Bold: 'Eazybe AI',
    subtitle: 'Applicants message ITECSUR on WhatsApp all day. Now Eazybe’s AI reads every chat and tells advisors who to call first.',
    stats: [
      { value: '4x', label: 'more enrolments', goal: 'pilot goal' },
      { value: '5', label: 'advisors, one shared view' },
      { value: '6', label: 'AI tags on every chat' },
    ],
  },
  about: {
    tag: 'About the customer',
    h2Lead: 'Training Ecuador’s professionals',
    h2Highlight: 'since 1994.',
    bodyBold1: 'ITECSUR, Instituto Superior Universitario Compu Sur',
    bodyMid: ', is an accredited institute in Ecuador. It offers technical and technology degrees in health, safety, law, education and tech, registered with',
    bodyBold2: 'Senescyt',
    bodyEnd: '.',
    facts: [
      { label: 'Since', value: '1994', note: '32 years training students' },
      { label: 'Campuses', value: '5', note: 'in Quito, Guayaquil and Cayambe' },
      { label: 'Programs', value: '15', note: 'in 5 faculties' },
      { label: 'Study modes', value: '3', note: 'in person, online, hybrid' },
    ],
    campusesLabel: 'Campuses',
    campuses: ['Quito Sur · Main', 'Quito Norte', 'Valle de los Chillos', 'Guayaquil', 'Cayambe'],
    campusesNote: 'Most applicants start on WhatsApp. They ask questions, send documents and book their place in the chat.',
    photoAlt: 'ITECSUR main campus building in Quito Sur',
    photoChip: 'Sede Matriz · Quito Sur',
    source: 'Source: itecsur.edu.ec',
  },
  applicants: {
    tag: 'Who applies',
    h2Lead: 'Future nurses, rescuers',
    h2Highlight: 'and developers.',
    body: 'A future nurse asks about practice hours. A future developer asks about online classes. Advisors need to see who wants what, and who is ready to enrol.',
    groups: [
      { name: 'Health', count: '5 programs', programs: 'Nursing, Physical Rehabilitation, Medical Emergencies, Integral Aesthetics, Sports Training' },
      { name: 'Public safety', count: '3 programs', programs: 'Traffic Planning, Public Safety, Fire Control and Rescue' },
      { name: 'Education', count: '3 programs', programs: 'Teaching Assistance, Child Development, Basic Education' },
      { name: 'Technology', count: '2 programs', programs: 'Software Development, Cybersecurity' },
      { name: 'Law and business', count: '2 programs', programs: 'Legal Assistance, Administration' },
    ],
    modes: 'In person · Online · Hybrid',
    photoAlt: 'ITECSUR graduates in nursing and rescue uniforms',
    photoChip: '#YoSoyITECSUR · Graduados',
    source: 'Source: itecsur.edu.ec',
  },
  challenge: {
    tag: 'The challenge',
    h2Lead: 'Applicants said hola.',
    h2Highlight: 'Then the trail went cold.',
    inboxTitle: 'WhatsApp · Admisiones',
    inboxBadge: '0 tagged',
    inboxNote: 'Example chats · sample data',
    cards: [
      { label: 'No funnel view', title: 'Who is ready? Who stopped?', body: 'All chats looked the same. Advisors couldn’t see who was ready.' },
      { label: 'Abandoned contacts', title: 'A silent list that kept growing', body: 'Applicants who asked once and went quiet never heard back.' },
      { label: 'Scattered files', title: 'Documents lost in phones', body: 'ID cards, PDFs and voice notes sat on different phones.' },
      { label: 'Stale CRM', title: 'HubSpot fell out of date', body: 'After a team change, chats stopped reaching HubSpot.' },
    ],
  },
  rollout: {
    tag: 'The rollout',
    h2Lead: 'From restart to',
    h2Highlight: 'AI in two weeks.',
    steps: [
      { date: '29 Oct', label: 'Restart call', state: 'done' },
      { date: '5 Nov', label: 'Basic AI on, 5 seats', state: 'done' },
      { date: '9 Nov', label: 'Free trial starts', state: 'done' },
      { date: '12 Nov', label: 'Training + HubSpot sync', state: 'done' },
      { date: 'Dec', label: 'Win-back broadcast', state: 'next' },
      { date: 'Jan', label: 'Enrolment results', state: 'goal' },
    ],
    stats: [
      { label: 'Training', value: '2 hours', note: 'hands-on session with the admissions team' },
      { label: 'Template approval', value: '≤ 24 h', note: 'for Meta-approved broadcast messages' },
      { label: 'Support', value: 'Shared group', note: 'a WhatsApp group with the Eazybe team' },
    ],
  },
  parts: {
    tag: 'How Eazybe works at ITECSUR',
    h2Lead: 'Four parts.',
    h2Highlight: 'One admissions flow.',
    items: [
      { num: '01', status: 'live', statusLabel: 'Live', title: 'Conversation management', body: 'One inbox for all 5 advisors. Every chat and file saved in HubSpot.', foot: 'Inbox · HubSpot sync' },
      { num: '02', status: 'next', statusLabel: 'Next', title: 'Outreach', body: 'One message to every applicant who went quiet. Replies go back to their advisor.', foot: 'Broadcast · Templates' },
      { num: '03', status: 'live', statusLabel: 'Live', title: 'Sales intelligence', body: 'AI reads every chat and tags the enrolment stage. It also writes a short summary of each applicant.', foot: 'AI properties · Summaries' },
      { num: '04', status: 'phase', statusLabel: 'Next phase', title: 'AI agents', body: 'An AI agent that answers applicants at night, using ITECSUR’s course PDFs.', foot: 'After-hours answers' },
    ],
  },
  core: {
    tag: 'The core idea · Sales intelligence',
    h2Lead: 'AI sorts every applicant',
    h2Highlight: 'by enrolment stage.',
    funnelLabel: 'Enrolment funnel · AI property “Etapa de matrícula”',
    funnel: [
      { badge: 'Listo', title: 'Ready to enrol', note: 'documents in progress', action: 'call today', tone: 'green' },
      { badge: 'A medias', title: 'Started but stopped', note: 'interested, didn’t finish', action: 'follow-up', tone: 'yellow' },
      { badge: 'Sin respuesta', title: 'No reply', note: '', action: 'win-back', tone: 'red' },
    ],
    funnelNote: 'ITECSUR’s team chose these 3 stages. The AI updates them with every new message.',
    chatName: 'Kevin A. · Applicant',
    chatBadge: 'AI updated',
    propsNote: 'Example · sample data',
  },
  day: {
    tag: 'See it at work',
    h2Lead: 'A day in ITECSUR admissions,',
    h2Highlight: 'with Eazybe.',
    scenes: [
      { label: '01 · Capture', caption: 'Cédula, program and enrolment stage, taken from the chat', alt: 'Advisor laptop with WhatsApp and an Eazybe card listing cédula, program and enrolment stage' },
      { label: '02 · Stage updates live', alt: 'Advisor at a laptop while Kevin A.’s enrolment stage changes to Ready to enrol' },
      { label: '03 · No applicant waits', alt: 'Phone on a desk with an “Advisor assigned” notification' },
    ],
    note: 'AI-generated scenes',
  },
  winback: {
    tag: 'Outreach · Win-back broadcast',
    h2Lead: 'Quiet applicants,',
    h2Highlight: 'back in the chat.',
    bodyPre: 'Applicants tagged',
    bodyBold: '“Sin respuesta”',
    bodyPost: 'get one friendly message from their advisor’s own number. When they reply, the chat goes back to that advisor, and HubSpot updates on its own.',
    flow: ['Sin respuesta', 'Broadcast', 'Advisor chat'],
    imageAlt: 'From Hola to Matriculado: a quiet applicant gets a win-back message, replies, and HubSpot updates the stage to Matriculado',
    imageNote: 'Illustrative example · sample applicant',
    templateNote: 'Meta approves templates in up to 24 h',
  },
  inbox: {
    tag: 'Conversation management · Team inbox and analytics',
    h2Lead: 'One view of the whole',
    h2Highlight: 'admissions team.',
    photoAlt: 'Admissions lead with a tablet showing “Applicant waiting 10 min · Assign advisor”',
    photoChip: 'Alert · Assign advisor',
    panelTitle: 'Team Inbox · Admisiones',
    panelCount: '5 advisors',
    filters: ['Listo', 'A medias', 'Sin respuesta', 'Urgente'],
    replyLabel: 'Reply time by advisor',
    advisors: [
      { name: 'Advisor 1', pct: 20, speed: 'fast', tone: 'fast' },
      { name: 'Advisor 2', pct: 32, speed: 'fast', tone: 'fast' },
      { name: 'Advisor 3', pct: 55, speed: 'mid', tone: 'mid' },
      { name: 'Advisor 4', pct: 40, speed: 'fast', tone: 'fast' },
      { name: 'Advisor 5', pct: 78, speed: 'slow', tone: 'slow' },
    ],
    summaryTitle: 'Summary in one line',
    summaryBody: 'AI summaries show what each applicant wants and what to do next, so any advisor can take over.',
    sample: 'Example · sample data',
  },
  results: {
    tag: 'Results so far',
    h2Lead: 'From a busy inbox',
    h2Highlight: 'to a clear funnel.',
    stats: [
      { label: 'Time to go live', value: '2 weeks', note: 'from restart call (29 Oct) to training (12 Nov)' },
      { label: 'AI tags per chat', value: '6', note: 'stage, intent, urgency, mood, language, status' },
      { label: 'Shared inbox', value: '5 → 1', note: '5 advisors working from 1 inbox' },
      { label: 'Training', value: '2 hours', note: 'for the team to start using it' },
    ],
    beforeLabel: 'Before',
    afterLabel: 'With Eazybe',
    aspectLabel: 'Area',
    rows: [
      { aspect: 'Applicant stage', before: 'Unknown', after: 'Tagged by AI on every message' },
      { aspect: 'Quiet applicants', before: 'Forgotten', after: 'Win-back broadcast' },
      { aspect: 'PDFs and audios', before: 'On separate phones', after: 'In one Team Inbox' },
      { aspect: 'HubSpot', before: 'Not updated', after: 'Synced automatically' },
    ],
    note: 'All numbers are from ITECSUR’s setup in Oct–Nov 2026. Enrolment results will be added after the January 2027 enrolment period.',
  },
  benefits: {
    tag: 'Benefits',
    h2Lead: 'What ITECSUR gets',
    h2Highlight: 'with Eazybe.',
    subtitle: 'Good for applicants, advisors, the admissions lead and the whole institute.',
    columns: [
      {
        label: 'For applicants',
        title: 'Answers, not silence',
        items: [
          { title: 'Faster replies', body: 'Every chat is visible, so no one waits for days' },
          { title: 'A personal follow-up', body: 'From the advisor they already know' },
          { title: 'Same WhatsApp number', body: 'No new app, no new contact' },
        ],
      },
      {
        label: 'For advisors',
        title: 'Know who to call first',
        items: [
          { title: 'AI tags each stage', body: 'Ready, almost or silent, without reading every chat' },
          { title: 'One-line summaries', body: 'Pick up any chat in seconds' },
          { title: 'Files in one place', body: 'Cédulas, PDFs and audios on the right contact' },
        ],
      },
      {
        label: 'For the admissions lead',
        title: 'Lead, don’t chase',
        items: [
          { title: 'Reply time per advisor', body: 'One view for all 5 advisors' },
          { title: 'Waiting-chat alerts', body: 'Assign an advisor before the applicant leaves' },
          { title: 'A live funnel', body: 'How many applicants are in each stage today' },
        ],
      },
      {
        label: 'For the institute',
        title: 'More seats filled',
        items: [
          { title: 'Win back lost demand', body: 'Quiet applicants become enrolments' },
          { title: 'HubSpot always current', body: 'No manual copy and paste' },
          { title: 'Ready to grow', body: 'Add advisors and campuses on the same system' },
        ],
      },
    ],
    poweredLabel: 'Powered by',
    powered: ['Team Inbox', 'AI properties', 'AI summaries', 'Broadcasts', 'SLA alerts', 'HubSpot sync'],
  },
  agent: {
    tag: 'Next phase · AI agents',
    h2Lead: 'An admissions agent',
    h2Highlight: 'that never sleeps.',
    subtitle: 'Many applicants write at night. The AI agent will answer them, using ITECSUR’s own course PDFs, and pass them to an advisor in the morning.',
    chatTitle: 'WhatsApp · Admisiones ITECSUR',
    chatBadge: 'AI agent · 22:47',
    chips: ['Ready to enrol', 'Enfermería · Mañana', 'Handover 08:00'],
    cards: [
      { label: 'Knows', title: 'ITECSUR’s own content', body: 'Course PDFs, fees and the website' },
      { label: 'Does', title: 'Answers and qualifies', body: 'Replies in Spanish, asks the right questions, tags the stage' },
      { label: 'Hands over', title: 'To the right advisor', body: 'With a short summary, so nothing is asked twice' },
      { label: 'Controls', title: 'Light or Heavy agents', body: 'Pick a quick agent or a smarter one. Advisors can step in any time.' },
    ],
    foot: 'AI agents were introduced in training on 12 Nov · Example · sample data',
  },
  words: {
    tag: 'In their words',
    quoteApproved: false,
    quote: 'We want to manage every chat properly with the applicants we hope to turn into enrolled students, with documents and audios in order.',
    quoteBy: 'William · Admissions, ITECSUR',
    nextLabel: 'What’s next',
    next: [
      { badge: 'Expand', text: 'More admission centres beyond Quito, Guayaquil and Cayambe' },
      { badge: 'AI agent', text: 'After-hours answers from course PDFs' },
      { badge: 'Scale', text: 'More advisors on the same system' },
    ],
    photoAlt: 'Advisor at a standing desk as a WhatsApp chat is saved to HubSpot',
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
    h2: 'Turn WhatsApp enquiries into enrolments.',
    body: 'AI that tags every applicant, a shared inbox for your admissions team, and sync to HubSpot, Salesforce, Zoho and more.',
    primary: 'Start 4-day free trial',
    secondary: 'Book a demo',
    footnote: 'eazybe.com · no card needed',
    backToHub: 'All case studies',
  },
}

export const ITECSUR_CONTENT_BY_LOCALE: Record<string, ItecsurContent> = { en }

export function getItecsurContent(locale: string): ItecsurContent {
  return ITECSUR_CONTENT_BY_LOCALE[locale] ?? en
}

export function itecsurHeadline(t: ItecsurContent): string {
  const h = t.hero
  return [h.h1Pre, h.h1Company, h.h1Highlight, h.h1Italic, h.h1With, h.h1Bold].filter(Boolean).join(' ')
}
