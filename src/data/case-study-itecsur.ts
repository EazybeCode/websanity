/**
 * Copy for /case-studies/itecsur, from the ITECSUR_Eazybe_Case_Study_v8 deck
 * (15 slides). Strings only; layout and markup live in the page component.
 *
 * en, es, br (pt-BR) and tr. Chat mock-ups, the "Etapa de matrícula" values
 * (Listo / A medias / Sin respuesta) and inbox filters stay in Spanish on every
 * locale: they are ITECSUR's real Spanish labels.
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
    /** Label under the agent's chat bubbles. */
    aiLabel: string
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
      'How ITECSUR, an institute in Ecuador, uses Eazybe AI to tag every WhatsApp applicant by enrolment stage, with one inbox for 5 advisors and HubSpot in sync.',
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
    h2Lead: 'Training Ecuador’s Professionals',
    h2Highlight: 'Since 1994',
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
    h2Lead: 'Future Nurses, Rescuers',
    h2Highlight: 'And Developers',
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
    h2Lead: 'Applicants Said Hola.',
    h2Highlight: 'Then The Trail Went Cold',
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
    h2Lead: 'From Restart To',
    h2Highlight: 'AI In Two Weeks',
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
    h2Lead: 'Four Parts.',
    h2Highlight: 'One Admissions Flow',
    items: [
      { num: '01', status: 'live', statusLabel: 'Live', title: 'Conversation management', body: 'One inbox for all 5 advisors. Every chat and file saved in HubSpot.', foot: 'Inbox · HubSpot sync' },
      { num: '02', status: 'next', statusLabel: 'Next', title: 'Outreach', body: 'One message to every applicant who went quiet. Replies go back to their advisor.', foot: 'Broadcast · Templates' },
      { num: '03', status: 'live', statusLabel: 'Live', title: 'Sales intelligence', body: 'AI reads every chat and tags the enrolment stage. It also writes a short summary of each applicant.', foot: 'AI properties · Summaries' },
      { num: '04', status: 'phase', statusLabel: 'Next phase', title: 'AI agents', body: 'An AI agent that answers applicants at night, using ITECSUR’s course PDFs.', foot: 'After-hours answers' },
    ],
  },
  core: {
    tag: 'The core idea · Sales intelligence',
    h2Lead: 'AI Sorts Every Applicant',
    h2Highlight: 'By Enrolment Stage',
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
    h2Lead: 'A Day In ITECSUR Admissions,',
    h2Highlight: 'With Eazybe',
    scenes: [
      { label: '01 · Capture', caption: 'Cédula, program and enrolment stage, taken from the chat', alt: 'Advisor laptop with WhatsApp and an Eazybe card listing cédula, program and enrolment stage' },
      { label: '02 · Stage updates live', alt: 'Advisor at a laptop while Kevin A.’s enrolment stage changes to Ready to enrol' },
      { label: '03 · No applicant waits', alt: 'Phone on a desk with an “Advisor assigned” notification' },
    ],
    note: 'AI-generated scenes',
  },
  winback: {
    tag: 'Outreach · Win-back broadcast',
    h2Lead: 'Quiet Applicants,',
    h2Highlight: 'Back In The Chat',
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
    h2Lead: 'One View Of The Whole',
    h2Highlight: 'Admissions Team',
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
    h2Lead: 'From A Busy Inbox',
    h2Highlight: 'To A Clear Funnel',
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
    h2Lead: 'What ITECSUR Gets',
    h2Highlight: 'With Eazybe',
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
    h2Lead: 'An Admissions Agent',
    h2Highlight: 'That Never Sleeps',
    subtitle: 'Many applicants write at night. The AI agent will answer them, using ITECSUR’s own course PDFs, and pass them to an advisor in the morning.',
    chatTitle: 'WhatsApp · Admisiones ITECSUR',
    chatBadge: 'AI agent · 22:47',
    aiLabel: 'AI agent',
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
    h2: 'Turn WhatsApp Enquiries Into Enrolments',
    body: 'AI that tags every applicant, a shared inbox for your admissions team, and sync to HubSpot, Salesforce, Zoho and more.',
    primary: 'Start 4-day free trial',
    secondary: 'Book a demo',
    footnote: 'eazybe.com · no card needed',
    backToHub: 'All case studies',
  },
}

/* -------------------------------------------------------------------------- */
/* Spanish                                                                    */
/* -------------------------------------------------------------------------- */

const es: ItecsurContent = {
  meta: {
    title: 'Caso ITECSUR - IA de WhatsApp para Admisiones | Eazybe',
    description:
      'Cómo ITECSUR, instituto de Ecuador, usa la IA de Eazybe para clasificar a cada aspirante de WhatsApp por etapa de matrícula, con una bandeja y HubSpot al día.',
    ogDescription:
      'Los aspirantes escriben a ITECSUR por WhatsApp todo el día. Ahora la IA de Eazybe lee cada chat y dice a los asesores a quién llamar primero.',
  },
  breadcrumb: { home: 'Inicio', hub: 'Casos de Éxito', current: 'ITECSUR' },
  hero: {
    eyebrow: 'Caso de cliente · Inteligencia de ventas · Educación · Ecuador',
    h1Pre: 'Cómo',
    h1Company: 'ITECSUR',
    h1Highlight: 'Matricula 4x Más Estudiantes',
    h1Italic: 'desde chats de WhatsApp',
    h1With: 'con',
    h1Bold: 'la IA de Eazybe',
    subtitle: 'Los aspirantes escriben a ITECSUR por WhatsApp todo el día. Ahora la IA de Eazybe lee cada chat y dice a los asesores a quién llamar primero.',
    stats: [
      { value: '4x', label: 'más matrículas', goal: 'meta del piloto' },
      { value: '5', label: 'asesores, una vista compartida' },
      { value: '6', label: 'etiquetas de IA en cada chat' },
    ],
  },
  about: {
    tag: 'Sobre el cliente',
    h2Lead: 'Formando a los profesionales de Ecuador',
    h2Highlight: 'desde 1994.',
    bodyBold1: 'ITECSUR, Instituto Superior Universitario Compu Sur',
    bodyMid: ', es un instituto acreditado de Ecuador. Ofrece carreras técnicas y tecnológicas en salud, seguridad, derecho, educación y tecnología, registradas en la',
    bodyBold2: 'Senescyt',
    bodyEnd: '.',
    facts: [
      { label: 'Desde', value: '1994', note: '32 años formando estudiantes' },
      { label: 'Sedes', value: '5', note: 'en Quito, Guayaquil y Cayambe' },
      { label: 'Carreras', value: '15', note: 'en 5 facultades' },
      { label: 'Modalidades', value: '3', note: 'presencial, en línea, híbrida' },
    ],
    campusesLabel: 'Sedes',
    campuses: ['Quito Sur · Matriz', 'Quito Norte', 'Valle de los Chillos', 'Guayaquil', 'Cayambe'],
    campusesNote: 'La mayoría de los aspirantes empieza por WhatsApp. Hacen preguntas, envían documentos y reservan su cupo en el chat.',
    photoAlt: 'Edificio de la sede matriz de ITECSUR en Quito Sur',
    photoChip: 'Sede Matriz · Quito Sur',
    source: 'Fuente: itecsur.edu.ec',
  },
  applicants: {
    tag: 'Quién postula',
    h2Lead: 'Futuros enfermeros, rescatistas',
    h2Highlight: 'y desarrolladores.',
    body: 'Una futura enfermera pregunta por las horas de prácticas. Un futuro desarrollador pregunta por las clases en línea. Los asesores necesitan ver quién quiere qué y quién está listo para matricularse.',
    groups: [
      { name: 'Salud', count: '5 carreras', programs: 'Enfermería, Rehabilitación Física, Emergencias Médicas, Estética Integral, Entrenamiento Deportivo' },
      { name: 'Seguridad pública', count: '3 carreras', programs: 'Planificación del Tránsito, Seguridad Ciudadana, Control de Incendios y Rescate' },
      { name: 'Educación', count: '3 carreras', programs: 'Asistencia Docente, Desarrollo Infantil, Educación Básica' },
      { name: 'Tecnología', count: '2 carreras', programs: 'Desarrollo de Software, Ciberseguridad' },
      { name: 'Derecho y negocios', count: '2 carreras', programs: 'Asistencia Legal, Administración' },
    ],
    modes: 'Presencial · En línea · Híbrida',
    photoAlt: 'Graduados de ITECSUR con uniformes de enfermería y rescate',
    photoChip: '#YoSoyITECSUR · Graduados',
    source: 'Fuente: itecsur.edu.ec',
  },
  challenge: {
    tag: 'El desafío',
    h2Lead: 'Los aspirantes decían hola.',
    h2Highlight: 'Luego se perdía el rastro.',
    inboxTitle: 'WhatsApp · Admisiones',
    inboxBadge: '0 etiquetados',
    inboxNote: 'Chats de ejemplo · datos de muestra',
    cards: [
      { label: 'Sin vista de embudo', title: '¿Quién está listo? ¿Quién se detuvo?', body: 'Todos los chats se veían iguales. Los asesores no podían ver quién estaba listo.' },
      { label: 'Contactos abandonados', title: 'Una lista silenciosa que no paraba de crecer', body: 'Los aspirantes que preguntaron una vez y se quedaron callados nunca recibieron respuesta.' },
      { label: 'Archivos dispersos', title: 'Documentos perdidos en los teléfonos', body: 'Cédulas, PDFs y notas de voz quedaban en teléfonos distintos.' },
      { label: 'CRM desactualizado', title: 'HubSpot quedó desactualizado', body: 'Tras un cambio de equipo, los chats dejaron de llegar a HubSpot.' },
    ],
  },
  rollout: {
    tag: 'La implementación',
    h2Lead: 'Del reinicio a',
    h2Highlight: 'la IA en dos semanas.',
    steps: [
      { date: '29 oct', label: 'Llamada de reinicio', state: 'done' },
      { date: '5 nov', label: 'IA básica activa, 5 licencias', state: 'done' },
      { date: '9 nov', label: 'Inicia la prueba gratis', state: 'done' },
      { date: '12 nov', label: 'Capacitación + sync con HubSpot', state: 'done' },
      { date: 'Dic', label: 'Difusión de reactivación', state: 'next' },
      { date: 'Ene', label: 'Resultados de matrícula', state: 'goal' },
    ],
    stats: [
      { label: 'Capacitación', value: '2 horas', note: 'sesión práctica con el equipo de admisiones' },
      { label: 'Aprobación de plantillas', value: '≤ 24 h', note: 'para mensajes de difusión aprobados por Meta' },
      { label: 'Soporte', value: 'Grupo compartido', note: 'un grupo de WhatsApp con el equipo de Eazybe' },
    ],
  },
  parts: {
    tag: 'Cómo funciona Eazybe en ITECSUR',
    h2Lead: 'Cuatro partes.',
    h2Highlight: 'Un solo flujo de admisiones.',
    items: [
      { num: '01', status: 'live', statusLabel: 'Activo', title: 'Gestión de conversaciones', body: 'Una bandeja para los 5 asesores. Cada chat y archivo se guarda en HubSpot.', foot: 'Bandeja · Sync con HubSpot' },
      { num: '02', status: 'next', statusLabel: 'Siguiente', title: 'Alcance', body: 'Un mensaje a cada aspirante que se quedó callado. Las respuestas vuelven a su asesor.', foot: 'Difusión · Plantillas' },
      { num: '03', status: 'live', statusLabel: 'Activo', title: 'Inteligencia de ventas', body: 'La IA lee cada chat y etiqueta la etapa de matrícula. También escribe un resumen corto de cada aspirante.', foot: 'Propiedades de IA · Resúmenes' },
      { num: '04', status: 'phase', statusLabel: 'Próxima fase', title: 'Agentes de IA', body: 'Un agente de IA que responde a los aspirantes por la noche, con los PDFs de las carreras de ITECSUR.', foot: 'Respuestas fuera de horario' },
    ],
  },
  core: {
    tag: 'La idea central · Inteligencia de ventas',
    h2Lead: 'La IA ordena a cada aspirante',
    h2Highlight: 'por etapa de matrícula.',
    funnelLabel: 'Embudo de matrícula · Propiedad de IA “Etapa de matrícula”',
    funnel: [
      { badge: 'Listo', title: 'Listo para matricularse', note: 'documentos en proceso', action: 'llamar hoy', tone: 'green' },
      { badge: 'A medias', title: 'Empezó pero se detuvo', note: 'interesado, no terminó', action: 'seguimiento', tone: 'yellow' },
      { badge: 'Sin respuesta', title: 'No respondió', note: '', action: 'reactivación', tone: 'red' },
    ],
    funnelNote: 'El equipo de ITECSUR eligió estas 3 etapas. La IA las actualiza con cada mensaje nuevo.',
    chatName: 'Kevin A. · Aspirante',
    chatBadge: 'IA actualizó',
    propsNote: 'Ejemplo · datos de muestra',
  },
  day: {
    tag: 'Míralo en acción',
    h2Lead: 'Un día en admisiones de ITECSUR,',
    h2Highlight: 'con Eazybe.',
    scenes: [
      { label: '01 · Captura', caption: 'Cédula, carrera y etapa de matrícula, tomadas del chat', alt: 'Laptop de un asesor con WhatsApp y una tarjeta de Eazybe con cédula, carrera y etapa de matrícula' },
      { label: '02 · Etapas en vivo', alt: 'Asesor en su laptop mientras la etapa de Kevin A. cambia a Listo para matricularse' },
      { label: '03 · Ningún aspirante espera', alt: 'Teléfono en un escritorio con la notificación “Asesor asignado”' },
    ],
    note: 'Escenas generadas con IA',
  },
  winback: {
    tag: 'Alcance · Difusión de reactivación',
    h2Lead: 'Aspirantes callados,',
    h2Highlight: 'de vuelta en el chat.',
    bodyPre: 'Los aspirantes etiquetados',
    bodyBold: '“Sin respuesta”',
    bodyPost: 'reciben un mensaje amable desde el número de su propio asesor. Cuando responden, el chat vuelve a ese asesor y HubSpot se actualiza solo.',
    flow: ['Sin respuesta', 'Difusión', 'Chat con asesor'],
    imageAlt: 'De Hola a Matriculado: una aspirante callada recibe un mensaje de reactivación, responde y HubSpot cambia la etapa a Matriculado',
    imageNote: 'Ejemplo ilustrativo · aspirante de muestra',
    templateNote: 'Meta aprueba las plantillas en hasta 24 h',
  },
  inbox: {
    tag: 'Gestión de conversaciones · Bandeja de equipo y analítica',
    h2Lead: 'Una vista de todo el',
    h2Highlight: 'equipo de admisiones.',
    photoAlt: 'Jefa de admisiones con una tablet que muestra “Aspirante esperando 10 min · Asignar asesor”',
    photoChip: 'Alerta · Asignar asesor',
    panelTitle: 'Bandeja de equipo · Admisiones',
    panelCount: '5 asesores',
    filters: ['Listo', 'A medias', 'Sin respuesta', 'Urgente'],
    replyLabel: 'Tiempo de respuesta por asesor',
    advisors: [
      { name: 'Asesor 1', pct: 20, speed: 'rápido', tone: 'fast' },
      { name: 'Asesor 2', pct: 32, speed: 'rápido', tone: 'fast' },
      { name: 'Asesor 3', pct: 55, speed: 'medio', tone: 'mid' },
      { name: 'Asesor 4', pct: 40, speed: 'rápido', tone: 'fast' },
      { name: 'Asesor 5', pct: 78, speed: 'lento', tone: 'slow' },
    ],
    summaryTitle: 'Resumen en una línea',
    summaryBody: 'Los resúmenes de IA muestran qué quiere cada aspirante y qué hacer después, para que cualquier asesor pueda continuar.',
    sample: 'Ejemplo · datos de muestra',
  },
  results: {
    tag: 'Resultados hasta ahora',
    h2Lead: 'De una bandeja saturada',
    h2Highlight: 'a un embudo claro.',
    stats: [
      { label: 'Tiempo para salir en vivo', value: '2 semanas', note: 'de la llamada de reinicio (29 oct) a la capacitación (12 nov)' },
      { label: 'Etiquetas de IA por chat', value: '6', note: 'etapa, intención, urgencia, humor, idioma, estado' },
      { label: 'Bandeja compartida', value: '5 → 1', note: '5 asesores trabajando desde 1 bandeja' },
      { label: 'Capacitación', value: '2 horas', note: 'para que el equipo empiece a usarlo' },
    ],
    beforeLabel: 'Antes',
    afterLabel: 'Con Eazybe',
    aspectLabel: 'Área',
    rows: [
      { aspect: 'Etapa del aspirante', before: 'Desconocida', after: 'Etiquetada por IA en cada mensaje' },
      { aspect: 'Aspirantes callados', before: 'Olvidados', after: 'Difusión de reactivación' },
      { aspect: 'PDFs y audios', before: 'En teléfonos separados', after: 'En una sola bandeja de equipo' },
      { aspect: 'HubSpot', before: 'Sin actualizar', after: 'Sincronizado automáticamente' },
    ],
    note: 'Todas las cifras son de la implementación de ITECSUR en oct–nov 2026. Los resultados de matrícula se añadirán tras el periodo de matrícula de enero de 2027.',
  },
  benefits: {
    tag: 'Beneficios',
    h2Lead: 'Lo que ITECSUR obtiene',
    h2Highlight: 'con Eazybe.',
    subtitle: 'Bueno para los aspirantes, los asesores, la jefatura de admisiones y todo el instituto.',
    columns: [
      {
        label: 'Para los aspirantes',
        title: 'Respuestas, no silencio',
        items: [
          { title: 'Respuestas más rápidas', body: 'Cada chat está a la vista, así que nadie espera días' },
          { title: 'Un seguimiento personal', body: 'Del asesor que ya conocen' },
          { title: 'El mismo número de WhatsApp', body: 'Sin app nueva ni contacto nuevo' },
        ],
      },
      {
        label: 'Para los asesores',
        title: 'Saber a quién llamar primero',
        items: [
          { title: 'La IA etiqueta cada etapa', body: 'Listo, a medias o callado, sin leer cada chat' },
          { title: 'Resúmenes de una línea', body: 'Retoma cualquier chat en segundos' },
          { title: 'Archivos en un solo lugar', body: 'Cédulas, PDFs y audios en el contacto correcto' },
        ],
      },
      {
        label: 'Para la jefatura de admisiones',
        title: 'Liderar, no perseguir',
        items: [
          { title: 'Tiempo de respuesta por asesor', body: 'Una vista para los 5 asesores' },
          { title: 'Alertas de chats en espera', body: 'Asigna un asesor antes de que el aspirante se vaya' },
          { title: 'Un embudo en vivo', body: 'Cuántos aspirantes hay hoy en cada etapa' },
        ],
      },
      {
        label: 'Para el instituto',
        title: 'Más cupos llenos',
        items: [
          { title: 'Recupera la demanda perdida', body: 'Los aspirantes callados se convierten en matrículas' },
          { title: 'HubSpot siempre al día', body: 'Sin copiar y pegar a mano' },
          { title: 'Listo para crecer', body: 'Suma asesores y sedes en el mismo sistema' },
        ],
      },
    ],
    poweredLabel: 'Con la tecnología de',
    powered: ['Bandeja de equipo', 'Propiedades de IA', 'Resúmenes de IA', 'Difusiones', 'Alertas de SLA', 'Sync con HubSpot'],
  },
  agent: {
    tag: 'Próxima fase · Agentes de IA',
    h2Lead: 'Un agente de admisiones',
    h2Highlight: 'que nunca duerme.',
    subtitle: 'Muchos aspirantes escriben de noche. El agente de IA les responderá con los PDFs de las carreras de ITECSUR y los pasará a un asesor por la mañana.',
    chatTitle: 'WhatsApp · Admisiones ITECSUR',
    chatBadge: 'Agente de IA · 22:47',
    aiLabel: 'Agente de IA',
    chips: ['Listo para matricularse', 'Enfermería · Mañana', 'Traspaso 08:00'],
    cards: [
      { label: 'Conoce', title: 'El contenido propio de ITECSUR', body: 'PDFs de las carreras, aranceles y el sitio web' },
      { label: 'Hace', title: 'Responde y califica', body: 'Responde en español, hace las preguntas correctas y etiqueta la etapa' },
      { label: 'Traspasa', title: 'Al asesor correcto', body: 'Con un resumen corto, para no preguntar nada dos veces' },
      { label: 'Control', title: 'Agentes Light o Heavy', body: 'Elige un agente rápido o uno más inteligente. Los asesores pueden intervenir en cualquier momento.' },
    ],
    foot: 'Los agentes de IA se presentaron en la capacitación del 12 nov · Ejemplo · datos de muestra',
  },
  words: {
    tag: 'En sus palabras',
    quoteApproved: false,
    quote: 'Queremos gestionar bien cada chat con los aspirantes que esperamos convertir en estudiantes matriculados, con los documentos y audios en orden.',
    quoteBy: 'William · Admisiones, ITECSUR',
    nextLabel: 'Lo que sigue',
    next: [
      { badge: 'Expandir', text: 'Más centros de admisión además de Quito, Guayaquil y Cayambe' },
      { badge: 'Agente de IA', text: 'Respuestas fuera de horario con los PDFs de las carreras' },
      { badge: 'Escalar', text: 'Más asesores en el mismo sistema' },
    ],
    photoAlt: 'Asesor en un escritorio de pie mientras un chat de WhatsApp se guarda en HubSpot',
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
    h2: 'Convierte las consultas de WhatsApp en matrículas.',
    body: 'IA que etiqueta a cada aspirante, una bandeja compartida para tu equipo de admisiones y sincronización con HubSpot, Salesforce, Zoho y más.',
    primary: 'Prueba gratis de 4 días',
    secondary: 'Reservar demo',
    footnote: 'eazybe.com · sin tarjeta',
    backToHub: 'Todos los casos de éxito',
  },
}

/* -------------------------------------------------------------------------- */
/* Brazilian Portuguese                                                       */
/* -------------------------------------------------------------------------- */

const br: ItecsurContent = {
  meta: {
    title: 'Case ITECSUR - IA no WhatsApp para Admissões | Eazybe',
    description:
      'Como o ITECSUR, instituto no Equador, usa a IA da Eazybe para classificar cada candidato do WhatsApp por etapa de matrícula, com uma caixa e o HubSpot em dia.',
    ogDescription:
      'Candidatos falam com o ITECSUR pelo WhatsApp o dia todo. Agora a IA da Eazybe lê cada conversa e diz aos consultores quem chamar primeiro.',
  },
  breadcrumb: { home: 'Início', hub: 'Casos de Sucesso', current: 'ITECSUR' },
  hero: {
    eyebrow: 'Case de cliente · Inteligência de vendas · Educação · Equador',
    h1Pre: 'Como o',
    h1Company: 'ITECSUR',
    h1Highlight: 'Matricula 4x Mais Alunos',
    h1Italic: 'a partir de conversas no WhatsApp',
    h1With: 'com',
    h1Bold: 'a IA da Eazybe',
    subtitle: 'Candidatos falam com o ITECSUR pelo WhatsApp o dia todo. Agora a IA da Eazybe lê cada conversa e diz aos consultores quem chamar primeiro.',
    stats: [
      { value: '4x', label: 'mais matrículas', goal: 'meta do piloto' },
      { value: '5', label: 'consultores, uma visão compartilhada' },
      { value: '6', label: 'tags de IA em cada conversa' },
    ],
  },
  about: {
    tag: 'Sobre o cliente',
    h2Lead: 'Formando os profissionais do Equador',
    h2Highlight: 'desde 1994.',
    bodyBold1: 'ITECSUR, Instituto Superior Universitario Compu Sur',
    bodyMid: ', é um instituto credenciado no Equador. Oferece cursos técnicos e tecnológicos em saúde, segurança, direito, educação e tecnologia, registrados na',
    bodyBold2: 'Senescyt',
    bodyEnd: '.',
    facts: [
      { label: 'Desde', value: '1994', note: '32 anos formando alunos' },
      { label: 'Campi', value: '5', note: 'em Quito, Guayaquil e Cayambe' },
      { label: 'Cursos', value: '15', note: 'em 5 faculdades' },
      { label: 'Modalidades', value: '3', note: 'presencial, online, híbrida' },
    ],
    campusesLabel: 'Campi',
    campuses: ['Quito Sur · Sede', 'Quito Norte', 'Valle de los Chillos', 'Guayaquil', 'Cayambe'],
    campusesNote: 'A maioria dos candidatos começa pelo WhatsApp. Eles tiram dúvidas, enviam documentos e reservam a vaga na conversa.',
    photoAlt: 'Prédio da sede do ITECSUR em Quito Sur',
    photoChip: 'Sede Matriz · Quito Sur',
    source: 'Fonte: itecsur.edu.ec',
  },
  applicants: {
    tag: 'Quem se candidata',
    h2Lead: 'Futuros enfermeiros, socorristas',
    h2Highlight: 'e desenvolvedores.',
    body: 'Uma futura enfermeira pergunta sobre as horas de estágio. Um futuro desenvolvedor pergunta sobre as aulas online. Os consultores precisam ver quem quer o quê, e quem está pronto para se matricular.',
    groups: [
      { name: 'Saúde', count: '5 cursos', programs: 'Enfermagem, Reabilitação Física, Emergências Médicas, Estética Integral, Treinamento Esportivo' },
      { name: 'Segurança pública', count: '3 cursos', programs: 'Planejamento de Trânsito, Segurança Pública, Combate a Incêndios e Resgate' },
      { name: 'Educação', count: '3 cursos', programs: 'Assistência Docente, Desenvolvimento Infantil, Educação Básica' },
      { name: 'Tecnologia', count: '2 cursos', programs: 'Desenvolvimento de Software, Cibersegurança' },
      { name: 'Direito e negócios', count: '2 cursos', programs: 'Assistência Jurídica, Administração' },
    ],
    modes: 'Presencial · Online · Híbrido',
    photoAlt: 'Formandos do ITECSUR com uniformes de enfermagem e resgate',
    photoChip: '#YoSoyITECSUR · Formandos',
    source: 'Fonte: itecsur.edu.ec',
  },
  challenge: {
    tag: 'O desafio',
    h2Lead: 'Os candidatos diziam hola.',
    h2Highlight: 'Depois o rastro sumia.',
    inboxTitle: 'WhatsApp · Admisiones',
    inboxBadge: '0 com tag',
    inboxNote: 'Conversas de exemplo · dados fictícios',
    cards: [
      { label: 'Sem visão de funil', title: 'Quem está pronto? Quem parou?', body: 'Todas as conversas pareciam iguais. Os consultores não viam quem estava pronto.' },
      { label: 'Contatos abandonados', title: 'Uma lista silenciosa que só crescia', body: 'Candidatos que perguntaram uma vez e sumiram nunca tiveram retorno.' },
      { label: 'Arquivos espalhados', title: 'Documentos perdidos nos celulares', body: 'Documentos de identidade, PDFs e áudios ficavam em celulares diferentes.' },
      { label: 'CRM desatualizado', title: 'O HubSpot ficou desatualizado', body: 'Depois de uma troca na equipe, as conversas pararam de chegar ao HubSpot.' },
    ],
  },
  rollout: {
    tag: 'A implantação',
    h2Lead: 'Do recomeço à',
    h2Highlight: 'IA em duas semanas.',
    steps: [
      { date: '29 out', label: 'Call de recomeço', state: 'done' },
      { date: '5 nov', label: 'IA básica ativa, 5 licenças', state: 'done' },
      { date: '9 nov', label: 'Começa o teste grátis', state: 'done' },
      { date: '12 nov', label: 'Treinamento + sync com HubSpot', state: 'done' },
      { date: 'Dez', label: 'Disparo de reativação', state: 'next' },
      { date: 'Jan', label: 'Resultados de matrícula', state: 'goal' },
    ],
    stats: [
      { label: 'Treinamento', value: '2 horas', note: 'sessão prática com a equipe de admissões' },
      { label: 'Aprovação de templates', value: '≤ 24 h', note: 'para mensagens de disparo aprovadas pela Meta' },
      { label: 'Suporte', value: 'Grupo compartilhado', note: 'um grupo de WhatsApp com a equipe da Eazybe' },
    ],
  },
  parts: {
    tag: 'Como a Eazybe funciona no ITECSUR',
    h2Lead: 'Quatro partes.',
    h2Highlight: 'Um só fluxo de admissões.',
    items: [
      { num: '01', status: 'live', statusLabel: 'Ativo', title: 'Gestão de conversas', body: 'Uma caixa de entrada para os 5 consultores. Cada conversa e arquivo salvos no HubSpot.', foot: 'Caixa de entrada · Sync com HubSpot' },
      { num: '02', status: 'next', statusLabel: 'Próximo', title: 'Disparos', body: 'Uma mensagem para cada candidato que sumiu. As respostas voltam para o consultor dele.', foot: 'Disparo · Templates' },
      { num: '03', status: 'live', statusLabel: 'Ativo', title: 'Inteligência de vendas', body: 'A IA lê cada conversa e marca a etapa de matrícula. Também escreve um resumo curto de cada candidato.', foot: 'Propriedades de IA · Resumos' },
      { num: '04', status: 'phase', statusLabel: 'Próxima fase', title: 'Agentes de IA', body: 'Um agente de IA que responde candidatos à noite, usando os PDFs dos cursos do ITECSUR.', foot: 'Respostas fora do horário' },
    ],
  },
  core: {
    tag: 'A ideia central · Inteligência de vendas',
    h2Lead: 'A IA organiza cada candidato',
    h2Highlight: 'por etapa de matrícula.',
    funnelLabel: 'Funil de matrícula · Propriedade de IA “Etapa de matrícula”',
    funnel: [
      { badge: 'Listo', title: 'Pronto para matricular', note: 'documentos em andamento', action: 'ligar hoje', tone: 'green' },
      { badge: 'A medias', title: 'Começou mas parou', note: 'interessado, não concluiu', action: 'follow-up', tone: 'yellow' },
      { badge: 'Sin respuesta', title: 'Sem resposta', note: '', action: 'reativação', tone: 'red' },
    ],
    funnelNote: 'A equipe do ITECSUR escolheu essas 3 etapas. A IA as atualiza a cada nova mensagem.',
    chatName: 'Kevin A. · Candidato',
    chatBadge: 'IA atualizou',
    propsNote: 'Exemplo · dados fictícios',
  },
  day: {
    tag: 'Veja na prática',
    h2Lead: 'Um dia nas admissões do ITECSUR,',
    h2Highlight: 'com a Eazybe.',
    scenes: [
      { label: '01 · Captura', caption: 'Documento, curso e etapa de matrícula, tirados da conversa', alt: 'Notebook de um consultor com o WhatsApp e um card da Eazybe com documento, curso e etapa de matrícula' },
      { label: '02 · Etapas em tempo real', alt: 'Consultor no notebook enquanto a etapa de Kevin A. muda para Pronto para matricular' },
      { label: '03 · Nenhum candidato espera', alt: 'Celular sobre a mesa com a notificação “Consultor atribuído”' },
    ],
    note: 'Cenas geradas com IA',
  },
  winback: {
    tag: 'Disparos · Reativação',
    h2Lead: 'Candidatos que sumiram,',
    h2Highlight: 'de volta à conversa.',
    bodyPre: 'Os candidatos marcados como',
    bodyBold: '“Sin respuesta”',
    bodyPost: 'recebem uma mensagem amigável do número do próprio consultor. Quando respondem, a conversa volta para esse consultor e o HubSpot se atualiza sozinho.',
    flow: ['Sin respuesta', 'Disparo', 'Conversa com consultor'],
    imageAlt: 'De Hola a Matriculado: uma candidata que sumiu recebe uma mensagem de reativação, responde e o HubSpot muda a etapa para Matriculado',
    imageNote: 'Exemplo ilustrativo · candidata fictícia',
    templateNote: 'A Meta aprova templates em até 24 h',
  },
  inbox: {
    tag: 'Gestão de conversas · Caixa de entrada da equipe e análises',
    h2Lead: 'Uma visão de toda a',
    h2Highlight: 'equipe de admissões.',
    photoAlt: 'Coordenadora de admissões com um tablet mostrando “Candidato esperando 10 min · Atribuir consultor”',
    photoChip: 'Alerta · Atribuir consultor',
    panelTitle: 'Caixa da equipe · Admisiones',
    panelCount: '5 consultores',
    filters: ['Listo', 'A medias', 'Sin respuesta', 'Urgente'],
    replyLabel: 'Tempo de resposta por consultor',
    advisors: [
      { name: 'Consultor 1', pct: 20, speed: 'rápido', tone: 'fast' },
      { name: 'Consultor 2', pct: 32, speed: 'rápido', tone: 'fast' },
      { name: 'Consultor 3', pct: 55, speed: 'médio', tone: 'mid' },
      { name: 'Consultor 4', pct: 40, speed: 'rápido', tone: 'fast' },
      { name: 'Consultor 5', pct: 78, speed: 'lento', tone: 'slow' },
    ],
    summaryTitle: 'Resumo em uma linha',
    summaryBody: 'Os resumos de IA mostram o que cada candidato quer e o próximo passo, para que qualquer consultor possa assumir.',
    sample: 'Exemplo · dados fictícios',
  },
  results: {
    tag: 'Resultados até agora',
    h2Lead: 'De uma caixa lotada',
    h2Highlight: 'a um funil claro.',
    stats: [
      { label: 'Tempo para entrar no ar', value: '2 semanas', note: 'da call de recomeço (29 out) ao treinamento (12 nov)' },
      { label: 'Tags de IA por conversa', value: '6', note: 'etapa, intenção, urgência, humor, idioma, status' },
      { label: 'Caixa compartilhada', value: '5 → 1', note: '5 consultores trabalhando em 1 caixa' },
      { label: 'Treinamento', value: '2 horas', note: 'para a equipe começar a usar' },
    ],
    beforeLabel: 'Antes',
    afterLabel: 'Com a Eazybe',
    aspectLabel: 'Área',
    rows: [
      { aspect: 'Etapa do candidato', before: 'Desconhecida', after: 'Marcada pela IA a cada mensagem' },
      { aspect: 'Candidatos que sumiram', before: 'Esquecidos', after: 'Disparo de reativação' },
      { aspect: 'PDFs e áudios', before: 'Em celulares separados', after: 'Em uma só caixa da equipe' },
      { aspect: 'HubSpot', before: 'Desatualizado', after: 'Sincronizado automaticamente' },
    ],
    note: 'Todos os números são da implantação do ITECSUR em out–nov de 2026. Os resultados de matrícula serão adicionados após o período de matrícula de janeiro de 2027.',
  },
  benefits: {
    tag: 'Benefícios',
    h2Lead: 'O que o ITECSUR ganha',
    h2Highlight: 'com a Eazybe.',
    subtitle: 'Bom para candidatos, consultores, a coordenação de admissões e todo o instituto.',
    columns: [
      {
        label: 'Para os candidatos',
        title: 'Respostas, não silêncio',
        items: [
          { title: 'Respostas mais rápidas', body: 'Toda conversa está visível, então ninguém espera dias' },
          { title: 'Um follow-up pessoal', body: 'Do consultor que eles já conhecem' },
          { title: 'O mesmo número de WhatsApp', body: 'Sem app novo, sem contato novo' },
        ],
      },
      {
        label: 'Para os consultores',
        title: 'Saber quem chamar primeiro',
        items: [
          { title: 'A IA marca cada etapa', body: 'Pronto, quase ou em silêncio, sem ler cada conversa' },
          { title: 'Resumos de uma linha', body: 'Retome qualquer conversa em segundos' },
          { title: 'Arquivos em um só lugar', body: 'Documentos, PDFs e áudios no contato certo' },
        ],
      },
      {
        label: 'Para a coordenação de admissões',
        title: 'Liderar, não correr atrás',
        items: [
          { title: 'Tempo de resposta por consultor', body: 'Uma visão para os 5 consultores' },
          { title: 'Alertas de conversas esperando', body: 'Atribua um consultor antes que o candidato desista' },
          { title: 'Um funil ao vivo', body: 'Quantos candidatos estão em cada etapa hoje' },
        ],
      },
      {
        label: 'Para o instituto',
        title: 'Mais vagas preenchidas',
        items: [
          { title: 'Recupere a demanda perdida', body: 'Candidatos que sumiram viram matrículas' },
          { title: 'HubSpot sempre em dia', body: 'Sem copiar e colar à mão' },
          { title: 'Pronto para crescer', body: 'Adicione consultores e campi no mesmo sistema' },
        ],
      },
    ],
    poweredLabel: 'Com tecnologia',
    powered: ['Caixa da equipe', 'Propriedades de IA', 'Resumos de IA', 'Disparos', 'Alertas de SLA', 'Sync com HubSpot'],
  },
  agent: {
    tag: 'Próxima fase · Agentes de IA',
    h2Lead: 'Um agente de admissões',
    h2Highlight: 'que nunca dorme.',
    subtitle: 'Muitos candidatos escrevem à noite. O agente de IA vai respondê-los com os PDFs dos cursos do ITECSUR e passá-los a um consultor pela manhã.',
    chatTitle: 'WhatsApp · Admisiones ITECSUR',
    chatBadge: 'Agente de IA · 22:47',
    aiLabel: 'Agente de IA',
    chips: ['Pronto para matricular', 'Enfermería · Mañana', 'Transferência 08:00'],
    cards: [
      { label: 'Conhece', title: 'O conteúdo do próprio ITECSUR', body: 'PDFs dos cursos, mensalidades e o site' },
      { label: 'Faz', title: 'Responde e qualifica', body: 'Responde em espanhol, faz as perguntas certas e marca a etapa' },
      { label: 'Transfere', title: 'Para o consultor certo', body: 'Com um resumo curto, para nada ser perguntado duas vezes' },
      { label: 'Controle', title: 'Agentes Light ou Heavy', body: 'Escolha um agente rápido ou um mais inteligente. Os consultores podem assumir a qualquer momento.' },
    ],
    foot: 'Os agentes de IA foram apresentados no treinamento de 12 nov · Exemplo · dados fictícios',
  },
  words: {
    tag: 'Nas palavras deles',
    quoteApproved: false,
    quote: 'Queremos gerenciar bem cada conversa com os candidatos que esperamos transformar em alunos matriculados, com documentos e áudios em ordem.',
    quoteBy: 'William · Admissões, ITECSUR',
    nextLabel: 'Próximos passos',
    next: [
      { badge: 'Expandir', text: 'Mais centros de admissão além de Quito, Guayaquil e Cayambe' },
      { badge: 'Agente de IA', text: 'Respostas fora do horário com os PDFs dos cursos' },
      { badge: 'Escalar', text: 'Mais consultores no mesmo sistema' },
    ],
    photoAlt: 'Consultor em uma mesa alta enquanto uma conversa do WhatsApp é salva no HubSpot',
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
    h2: 'Transforme contatos do WhatsApp em matrículas.',
    body: 'IA que marca cada candidato, uma caixa compartilhada para sua equipe de admissões e sincronização com HubSpot, Salesforce, Zoho e mais.',
    primary: 'Teste grátis de 4 dias',
    secondary: 'Agendar demo',
    footnote: 'eazybe.com · sem cartão',
    backToHub: 'Todos os casos de sucesso',
  },
}

/* -------------------------------------------------------------------------- */
/* Turkish                                                                    */
/* -------------------------------------------------------------------------- */

const tr: ItecsurContent = {
  meta: {
    title: 'ITECSUR: Kayıt Ekibi için WhatsApp Yapay Zekası | Eazybe',
    description:
      "Ekvador'daki ITECSUR, Eazybe Yapay Zeka'sıyla her WhatsApp adayını kayıt aşamasına göre etiketliyor; 5 danışman tek gelen kutusunda, HubSpot hep güncel.",
    ogDescription:
      "Adaylar ITECSUR'a gün boyu WhatsApp'tan yazıyor. Artık Eazybe Yapay Zeka'sı her sohbeti okuyor ve danışmanlara önce kimi arayacaklarını söylüyor.",
  },
  breadcrumb: { home: 'Ana Sayfa', hub: 'Başarı Hikayeleri', current: 'ITECSUR' },
  hero: {
    eyebrow: 'Müşteri hikayesi · Satış zekası · Eğitim · Ekvador',
    h1Pre: '',
    h1Company: 'ITECSUR',
    h1Highlight: '4 Kat Daha Fazla Öğrenci Kaydediyor',
    h1Italic: 'WhatsApp sohbetlerinden',
    h1With: '',
    h1Bold: 'Eazybe Yapay Zeka ile',
    subtitle: "Adaylar ITECSUR'a gün boyu WhatsApp'tan yazıyor. Artık Eazybe Yapay Zeka'sı her sohbeti okuyor ve danışmanlara önce kimi arayacaklarını söylüyor.",
    stats: [
      { value: '4x', label: 'daha fazla kayıt', goal: 'pilot hedefi' },
      { value: '5', label: 'danışman, tek ortak görünüm' },
      { value: '6', label: 'her sohbette Yapay Zeka etiketi' },
    ],
  },
  about: {
    tag: 'Müşteri hakkında',
    h2Lead: "Ekvador'un profesyonellerini yetiştiriyor,",
    h2Highlight: "1994'ten beri.",
    bodyBold1: 'ITECSUR, Instituto Superior Universitario Compu Sur',
    bodyMid: ", Ekvador'da akredite bir enstitüdür. Sağlık, güvenlik, hukuk, eğitim ve teknoloji alanlarında teknik ve teknoloji programları sunar; programları",
    bodyBold2: 'Senescyt',
    bodyEnd: "'te kayıtlıdır.",
    facts: [
      { label: 'Kuruluş', value: '1994', note: '32 yıldır öğrenci yetiştiriyor' },
      { label: 'Kampüs', value: '5', note: 'Quito, Guayaquil ve Cayambe’de' },
      { label: 'Program', value: '15', note: '5 fakültede' },
      { label: 'Öğrenim şekli', value: '3', note: 'yüz yüze, çevrimiçi, hibrit' },
    ],
    campusesLabel: 'Kampüsler',
    campuses: ['Quito Sur · Merkez', 'Quito Norte', 'Valle de los Chillos', 'Guayaquil', 'Cayambe'],
    campusesNote: "Adayların çoğu WhatsApp'tan başlıyor. Soru soruyor, belge gönderiyor ve yerlerini sohbette ayırtıyorlar.",
    photoAlt: "ITECSUR'un Quito Sur'daki merkez kampüs binası",
    photoChip: 'Sede Matriz · Quito Sur',
    source: 'Kaynak: itecsur.edu.ec',
  },
  applicants: {
    tag: 'Kimler başvuruyor',
    h2Lead: 'Geleceğin hemşireleri, kurtarma görevlileri',
    h2Highlight: 've yazılımcıları.',
    body: 'Geleceğin bir hemşiresi staj saatlerini soruyor. Geleceğin bir yazılımcısı çevrimiçi dersleri soruyor. Danışmanların kimin ne istediğini ve kimin kayda hazır olduğunu görmesi gerekiyor.',
    groups: [
      { name: 'Sağlık', count: '5 program', programs: 'Hemşirelik, Fizik Tedavi, Acil Tıp, Bütünsel Estetik, Spor Antrenörlüğü' },
      { name: 'Kamu güvenliği', count: '3 program', programs: 'Trafik Planlama, Kamu Güvenliği, Yangın Kontrolü ve Kurtarma' },
      { name: 'Eğitim', count: '3 program', programs: 'Öğretmen Asistanlığı, Çocuk Gelişimi, Temel Eğitim' },
      { name: 'Teknoloji', count: '2 program', programs: 'Yazılım Geliştirme, Siber Güvenlik' },
      { name: 'Hukuk ve işletme', count: '2 program', programs: 'Hukuk Asistanlığı, İşletme' },
    ],
    modes: 'Yüz yüze · Çevrimiçi · Hibrit',
    photoAlt: 'Hemşirelik ve kurtarma üniformalı ITECSUR mezunları',
    photoChip: '#YoSoyITECSUR · Mezunlar',
    source: 'Kaynak: itecsur.edu.ec',
  },
  challenge: {
    tag: 'Sorun',
    h2Lead: 'Adaylar hola dedi.',
    h2Highlight: 'Sonra iz kayboldu.',
    inboxTitle: 'WhatsApp · Admisiones',
    inboxBadge: '0 etiketli',
    inboxNote: 'Örnek sohbetler · örnek veri',
    cards: [
      { label: 'Huni görünümü yok', title: 'Kim hazır? Kim durdu?', body: 'Bütün sohbetler aynı görünüyordu. Danışmanlar kimin hazır olduğunu göremiyordu.' },
      { label: 'Terk edilen kişiler', title: 'Sürekli büyüyen sessiz bir liste', body: 'Bir kez soru sorup sessizleşen adaylar hiç yanıt almadı.' },
      { label: 'Dağınık dosyalar', title: 'Telefonlarda kaybolan belgeler', body: 'Kimlik kartları, PDF’ler ve sesli mesajlar farklı telefonlardaydı.' },
      { label: 'Eskimiş CRM', title: 'HubSpot güncelliğini yitirdi', body: "Ekip değişikliğinden sonra sohbetler HubSpot'a ulaşmaz oldu." },
    ],
  },
  rollout: {
    tag: 'Kurulum',
    h2Lead: 'Yeniden başlangıçtan',
    h2Highlight: 'iki haftada Yapay Zekaya.',
    steps: [
      { date: '29 Eki', label: 'Yeniden başlangıç görüşmesi', state: 'done' },
      { date: '5 Kas', label: 'Temel Yapay Zeka açık, 5 lisans', state: 'done' },
      { date: '9 Kas', label: 'Ücretsiz deneme başlıyor', state: 'done' },
      { date: '12 Kas', label: 'Eğitim + HubSpot senkronu', state: 'done' },
      { date: 'Ara', label: 'Geri kazanım yayını', state: 'next' },
      { date: 'Oca', label: 'Kayıt sonuçları', state: 'goal' },
    ],
    stats: [
      { label: 'Eğitim', value: '2 saat', note: 'kayıt ekibiyle uygulamalı oturum' },
      { label: 'Şablon onayı', value: '≤ 24 sa', note: 'Meta onaylı yayın mesajları için' },
      { label: 'Destek', value: 'Ortak grup', note: 'Eazybe ekibiyle bir WhatsApp grubu' },
    ],
  },
  parts: {
    tag: "Eazybe ITECSUR'da nasıl çalışıyor",
    h2Lead: 'Dört parça.',
    h2Highlight: 'Tek bir kayıt akışı.',
    items: [
      { num: '01', status: 'live', statusLabel: 'Canlı', title: 'Sohbet yönetimi', body: "5 danışmanın hepsi için tek gelen kutusu. Her sohbet ve dosya HubSpot'a kaydediliyor.", foot: 'Gelen kutusu · HubSpot senkronu' },
      { num: '02', status: 'next', statusLabel: 'Sırada', title: 'Erişim', body: 'Sessizleşen her adaya tek bir mesaj. Yanıtlar adayın kendi danışmanına dönüyor.', foot: 'Yayın · Şablonlar' },
      { num: '03', status: 'live', statusLabel: 'Canlı', title: 'Satış zekası', body: 'Yapay Zeka her sohbeti okuyup kayıt aşamasını etiketliyor. Her aday için kısa bir özet de yazıyor.', foot: 'Yapay Zeka özellikleri · Özetler' },
      { num: '04', status: 'phase', statusLabel: 'Sonraki aşama', title: 'Yapay Zeka ajanları', body: "ITECSUR'un program PDF'lerini kullanarak adaylara gece yanıt veren bir Yapay Zeka ajanı.", foot: 'Mesai dışı yanıtlar' },
    ],
  },
  core: {
    tag: 'Temel fikir · Satış zekası',
    h2Lead: 'Yapay Zeka her adayı',
    h2Highlight: 'kayıt aşamasına göre sıralıyor.',
    funnelLabel: 'Kayıt hunisi · Yapay Zeka özelliği “Etapa de matrícula”',
    funnel: [
      { badge: 'Listo', title: 'Kayda hazır', note: 'belgeler hazırlanıyor', action: 'bugün ara', tone: 'green' },
      { badge: 'A medias', title: 'Başladı ama durdu', note: 'ilgili, tamamlamadı', action: 'takip', tone: 'yellow' },
      { badge: 'Sin respuesta', title: 'Yanıt yok', note: '', action: 'geri kazanım', tone: 'red' },
    ],
    funnelNote: 'Bu 3 aşamayı ITECSUR ekibi seçti. Yapay Zeka her yeni mesajda bunları güncelliyor.',
    chatName: 'Kevin A. · Aday',
    chatBadge: 'Yapay Zeka güncelledi',
    propsNote: 'Örnek · örnek veri',
  },
  day: {
    tag: 'İş başında görün',
    h2Lead: "ITECSUR kayıt ofisinde bir gün,",
    h2Highlight: 'Eazybe ile.',
    scenes: [
      { label: '01 · Yakalama', caption: 'Kimlik, program ve kayıt aşaması, sohbetten alınıyor', alt: 'WhatsApp açık bir danışman dizüstü bilgisayarı ve kimlik, program, kayıt aşamasını gösteren bir Eazybe kartı' },
      { label: '02 · Aşamalar canlı güncelleniyor', alt: "Kevin A.'nın kayıt aşaması Kayda hazır olurken dizüstü bilgisayarında çalışan danışman" },
      { label: '03 · Hiçbir aday beklemiyor', alt: 'Masadaki telefonda “Danışman atandı” bildirimi' },
    ],
    note: 'Yapay Zeka ile üretilmiş sahneler',
  },
  winback: {
    tag: 'Erişim · Geri kazanım yayını',
    h2Lead: 'Sessiz adaylar,',
    h2Highlight: 'yeniden sohbette.',
    bodyPre: '',
    bodyBold: '“Sin respuesta”',
    bodyPost: "olarak etiketlenen adaylar, kendi danışmanlarının numarasından dostça tek bir mesaj alıyor. Yanıt verdiklerinde sohbet o danışmana dönüyor ve HubSpot kendiliğinden güncelleniyor.",
    flow: ['Sin respuesta', 'Yayın', 'Danışman sohbeti'],
    imageAlt: "Hola'dan Matriculado'ya: sessiz bir aday geri kazanım mesajı alıyor, yanıtlıyor ve HubSpot aşamayı Matriculado yapıyor",
    imageNote: 'Temsili örnek · örnek aday',
    templateNote: 'Meta şablonları 24 saate kadar onaylıyor',
  },
  inbox: {
    tag: 'Sohbet yönetimi · Ekip gelen kutusu ve analizler',
    h2Lead: 'Tüm kayıt ekibine',
    h2Highlight: 'tek bir görünüm.',
    photoAlt: 'Tablette “Aday 10 dk bekliyor · Danışman ata” uyarısını gören kayıt sorumlusu',
    photoChip: 'Uyarı · Danışman ata',
    panelTitle: 'Ekip Gelen Kutusu · Admisiones',
    panelCount: '5 danışman',
    filters: ['Listo', 'A medias', 'Sin respuesta', 'Urgente'],
    replyLabel: 'Danışmana göre yanıt süresi',
    advisors: [
      { name: 'Danışman 1', pct: 20, speed: 'hızlı', tone: 'fast' },
      { name: 'Danışman 2', pct: 32, speed: 'hızlı', tone: 'fast' },
      { name: 'Danışman 3', pct: 55, speed: 'orta', tone: 'mid' },
      { name: 'Danışman 4', pct: 40, speed: 'hızlı', tone: 'fast' },
      { name: 'Danışman 5', pct: 78, speed: 'yavaş', tone: 'slow' },
    ],
    summaryTitle: 'Tek satırda özet',
    summaryBody: 'Yapay Zeka özetleri her adayın ne istediğini ve sıradaki adımı gösteriyor; böylece herhangi bir danışman devralabiliyor.',
    sample: 'Örnek · örnek veri',
  },
  results: {
    tag: 'Şimdiye kadarki sonuçlar',
    h2Lead: 'Yoğun bir gelen kutusundan',
    h2Highlight: 'net bir huniye.',
    stats: [
      { label: 'Canlıya geçiş süresi', value: '2 hafta', note: 'yeniden başlangıç görüşmesinden (29 Eki) eğitime (12 Kas)' },
      { label: 'Sohbet başına Yapay Zeka etiketi', value: '6', note: 'aşama, niyet, aciliyet, ruh hali, dil, durum' },
      { label: 'Ortak gelen kutusu', value: '5 → 1', note: '5 danışman 1 gelen kutusundan çalışıyor' },
      { label: 'Eğitim', value: '2 saat', note: 'ekibin kullanmaya başlaması için' },
    ],
    beforeLabel: 'Önce',
    afterLabel: 'Eazybe ile',
    aspectLabel: 'Alan',
    rows: [
      { aspect: 'Aday aşaması', before: 'Bilinmiyor', after: 'Her mesajda Yapay Zeka etiketliyor' },
      { aspect: 'Sessiz adaylar', before: 'Unutuluyordu', after: 'Geri kazanım yayını' },
      { aspect: "PDF'ler ve sesli mesajlar", before: 'Ayrı telefonlarda', after: 'Tek bir ekip gelen kutusunda' },
      { aspect: 'HubSpot', before: 'Güncellenmiyordu', after: 'Otomatik senkronize' },
    ],
    note: "Tüm rakamlar ITECSUR'un Ekim–Kasım 2026 kurulumundan. Kayıt sonuçları Ocak 2027 kayıt döneminden sonra eklenecek.",
  },
  benefits: {
    tag: 'Faydalar',
    h2Lead: 'ITECSUR’un kazandıkları,',
    h2Highlight: 'Eazybe ile.',
    subtitle: 'Adaylar, danışmanlar, kayıt sorumlusu ve tüm enstitü için iyi.',
    columns: [
      {
        label: 'Adaylar için',
        title: 'Sessizlik değil, yanıt',
        items: [
          { title: 'Daha hızlı yanıtlar', body: 'Her sohbet görünür, kimse günlerce beklemiyor' },
          { title: 'Kişisel takip', body: 'Zaten tanıdıkları danışmandan' },
          { title: 'Aynı WhatsApp numarası', body: 'Yeni uygulama yok, yeni kişi yok' },
        ],
      },
      {
        label: 'Danışmanlar için',
        title: 'Önce kimi arayacağını bil',
        items: [
          { title: 'Yapay Zeka her aşamayı etiketliyor', body: 'Hazır, yarım ya da sessiz; her sohbeti okumadan' },
          { title: 'Tek satırlık özetler', body: 'Her sohbeti saniyeler içinde devral' },
          { title: 'Dosyalar tek yerde', body: "Kimlikler, PDF'ler ve sesli mesajlar doğru kişide" },
        ],
      },
      {
        label: 'Kayıt sorumlusu için',
        title: 'Peşinden koşma, yönet',
        items: [
          { title: 'Danışmana göre yanıt süresi', body: '5 danışmanın hepsi için tek görünüm' },
          { title: 'Bekleyen sohbet uyarıları', body: 'Aday gitmeden bir danışman ata' },
          { title: 'Canlı bir huni', body: 'Bugün her aşamada kaç aday var' },
        ],
      },
      {
        label: 'Enstitü için',
        title: 'Daha fazla dolu kontenjan',
        items: [
          { title: 'Kaybedilen talebi geri kazan', body: 'Sessiz adaylar kayda dönüşüyor' },
          { title: 'HubSpot hep güncel', body: 'Elle kopyala-yapıştır yok' },
          { title: 'Büyümeye hazır', body: 'Aynı sistemde danışman ve kampüs ekle' },
        ],
      },
    ],
    poweredLabel: 'Altyapı',
    powered: ['Ekip Gelen Kutusu', 'Yapay Zeka özellikleri', 'Yapay Zeka özetleri', 'Yayınlar', 'SLA uyarıları', 'HubSpot senkronu'],
  },
  agent: {
    tag: 'Sonraki aşama · Yapay Zeka ajanları',
    h2Lead: 'Hiç uyumayan',
    h2Highlight: 'bir kayıt ajanı.',
    subtitle: "Birçok aday gece yazıyor. Yapay Zeka ajanı onlara ITECSUR'un kendi program PDF'leriyle yanıt verecek ve sabah bir danışmana devredecek.",
    chatTitle: 'WhatsApp · Admisiones ITECSUR',
    chatBadge: 'Yapay Zeka ajanı · 22:47',
    aiLabel: 'Yapay Zeka ajanı',
    chips: ['Kayda hazır', 'Enfermería · Mañana', 'Devir 08:00'],
    cards: [
      { label: 'Bilir', title: "ITECSUR'un kendi içeriği", body: "Program PDF'leri, ücretler ve web sitesi" },
      { label: 'Yapar', title: 'Yanıtlar ve nitelendirir', body: 'İspanyolca yanıt verir, doğru soruları sorar, aşamayı etiketler' },
      { label: 'Devreder', title: 'Doğru danışmana', body: 'Kısa bir özetle; hiçbir şey iki kez sorulmaz' },
      { label: 'Kontrol', title: 'Light veya Heavy ajanlar', body: 'Hızlı bir ajan ya da daha akıllı bir ajan seçin. Danışmanlar istediği an devreye girebilir.' },
    ],
    foot: 'Yapay Zeka ajanları 12 Kas eğitiminde tanıtıldı · Örnek · örnek veri',
  },
  words: {
    tag: 'Kendi sözleriyle',
    quoteApproved: false,
    quote: 'Kayıtlı öğrenciye dönüştürmeyi umduğumuz adaylarla her sohbeti, belgeler ve sesli mesajlar düzenli olacak şekilde doğru yönetmek istiyoruz.',
    quoteBy: 'William · Kayıt, ITECSUR',
    nextLabel: 'Sırada ne var',
    next: [
      { badge: 'Genişleme', text: 'Quito, Guayaquil ve Cayambe dışında daha fazla kayıt merkezi' },
      { badge: 'Yapay Zeka ajanı', text: "Program PDF'lerinden mesai dışı yanıtlar" },
      { badge: 'Ölçek', text: 'Aynı sistemde daha fazla danışman' },
    ],
    photoAlt: "Bir WhatsApp sohbeti HubSpot'a kaydedilirken ayakta çalışma masasındaki danışman",
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
    h2: 'WhatsApp sorularını kayda dönüştürün.',
    body: "Her adayı etiketleyen Yapay Zeka, kayıt ekibiniz için ortak bir gelen kutusu ve HubSpot, Salesforce, Zoho ve diğerleriyle senkron.",
    primary: '4 günlük ücretsiz deneme',
    secondary: 'Demo planla',
    footnote: 'eazybe.com · kart gerekmez',
    backToHub: 'Tüm başarı hikayeleri',
  },
}

export const ITECSUR_CONTENT_BY_LOCALE: Record<string, ItecsurContent> = { en, br, es, tr }

export function getItecsurContent(locale: string): ItecsurContent {
  return ITECSUR_CONTENT_BY_LOCALE[locale] ?? en
}

export function itecsurHeadline(t: ItecsurContent): string {
  const h = t.hero
  return [h.h1Pre, h.h1Company, h.h1Highlight, h.h1Italic, h.h1With, h.h1Bold].filter(Boolean).join(' ')
}
