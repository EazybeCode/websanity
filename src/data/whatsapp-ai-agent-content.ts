/**
 * Localized copy for /whatsapp-ai-agent. Strings only — icons and markup
 * live in the page component.
 *
 * Facts of record (keep in sync with the rest of the site): 30,000+ users,
 * 40+ countries, 4.2★ Chrome Web Store (1.1K ratings), 4.3★ HubSpot
 * Marketplace, 2-minute setup, 4-day free trial. Basic AI = $59/number/month
 * billed yearly or $79 billed monthly, 5 users included (billing API).
 * The CTWA agent is part of Custom AI (see /pricing).
 *
 * Headlines with a `...Em` part render that part as the brand's one blue phrase.
 */

export interface AiAgentPageContent {
  meta: { title: string; description: string; ogTitle: string; ogDescription: string }
  breadcrumb: { home: string; current: string }
  hero: {
    tag: string
    h1Lead: string
    h1Highlight: string
    subtitle: string
    chips: string[]
    ctaPrimary: string
    ctaSecondary: string
    footnote: string
  }
  answer: { h2: string; p: string }
  facts: { value: string; label: string }[]
  agents: {
    h2: string
    h2Em: string
    subtitle: string
    cards: { id: string; name: string; desc: string }[]
  }
  memory: { h2: string; body: string; points: string[] }
  compare: {
    h2: string
    subtitle: string
    head: [string, string, string]
    rows: [string, string, string][]
  }
  how: { tag: string; h2: string; subtitle: string; steps: { title: string; desc: string }[] }
  fits: { h2: string; subtitle: string; cards: { title: string; desc: string }[] }
  logos: { label: string }
  demo: {
    tag: string
    h2: string
    h2Em: string
    subtitle: string
    radar: { title: string; desc: string; points: string[]; videoLabel: string }
    lead: {
      title: string
      desc: string
      points: string[]
      chat: { from: 'lead' | 'agent'; text: string }[]
      scoreLabel: string
      scoreValue: string
      signals: { label: string; ok: boolean }[]
      routed: string
    }
  }
  proof: {
    h2: string
    h2Em: string
    subtitle: string
    caseMeta: string
    metrics: { value: string; label: string }[]
    caseCta: string
    ratings: { value: string; label: string; source: string; href: string }[]
  }
  strip: string[]
  pricing: {
    h2: string
    body: string
    plan: string
    yearly: string
    monthly: string
    included: string
    custom: string
    note: string
    cta: string
  }
  related: { h2: string; subtitle: string }
  faqTitle: string
  faqIntro: string
  faq: { q: string; a: string }[]
  finalCta: { h2: string; h2Em: string; body: string; primary: string; secondary: string }
}

const en: AiAgentPageContent = {
  meta: {
    title: "WhatsApp AI Agent: Qualify Leads & Sync Your CRM | Eazybe",
    description:
      "5 WhatsApp AI agents that qualify leads, chase quiet deals and log every chat to HubSpot or Salesforce. Works on your current number. Try free for 4 days.",
    ogTitle: 'WhatsApp AI Agents For Sales And Support Teams',
    ogDescription:
      'Five AI agents that work in the WhatsApp your team already uses and remember every customer: CRM sync, lead scoring, follow-ups and support.',
  },
  breadcrumb: { home: 'Home', current: 'WhatsApp AI Agent' },
  hero: {
    tag: 'WhatsApp AI Agents',
    h1Lead: 'WhatsApp AI Agents For',
    h1Highlight: 'Sales And Support Teams',
    subtitle:
      "Your reps already sell on WhatsApp. Eazybe's agents work in those same chats: they score new leads, answer support questions after hours and write every conversation into your CRM. Nobody switches apps, and nobody types up notes.",
    chips: ['Personal WhatsApp', 'Business App', 'Cloud API', 'No migration'],
    ctaPrimary: 'Start 4-day free trial',
    ctaSecondary: 'Book a demo',
    footnote: "4-day free trial. Setup takes about 2 minutes and you don't need a developer.",
  },
  answer: {
    h2: 'What Is A WhatsApp AI Agent?',
    p: 'A WhatsApp AI agent is software that reads and replies to WhatsApp messages for a business. A chatbot follows a script and gets stuck when a customer goes off it. An AI agent uses a large language model to understand what the customer actually wrote, so it can qualify a lead, answer a support question or update a CRM deal, and pass the chat to a person when it should.',
  },
  facts: [
    { value: '30,000+', label: 'Users' },
    { value: '40+', label: 'Countries' },
    { value: '4.2★', label: 'Chrome Web Store (1.1K ratings)' },
    { value: '4.3★', label: 'HubSpot Marketplace' },
    { value: '2 min', label: 'Setup time' },
    { value: '4 days', label: 'Free trial' },
  ],
  agents: {
    h2: 'Five Ready-Made Agents,',
    h2Em: 'Plus Your Own',
    subtitle: "Each agent handles one job, and they all read the same customer history, so the support agent knows what the lead told sales last week. Start with CRM Sync and Lead Qualification, then add the others once those two are earning their keep.",
    cards: [
      { id: 'crm-sync', name: 'CRM Sync Agent', desc: 'Logs each WhatsApp chat against the right contact, deal and company in HubSpot, Salesforce, Zoho, Pipedrive and other CRMs. Your reps stop copying and pasting.' },
      { id: 'lead-qualification', name: 'Lead Qualification Agent', desc: 'Scores every inbound message with BANT, MEDDIC or your own criteria. Hot leads go straight to your best closer.' },
      { id: 'revenue', name: 'Revenue Agent', desc: "Spots deals that haven't moved in 48 hours and drafts a follow-up written the way that rep writes." },
      { id: 'customer-success', name: 'Customer Success Agent', desc: "Answers support questions from your knowledge base at any hour, in whatever language the customer writes in. When it can't help, a person takes over with the whole chat in front of them." },
      { id: 'ctwa', name: 'CTWA Agent', desc: 'Scores every conversation that starts from a click-to-WhatsApp ad, so you can stop retargeting people who were never going to buy. Part of the Custom AI plan.' },
      { id: 'agent-builder', name: 'Agent Builder', desc: "For anything the other five don't cover, like renewal reminders or pricing questions. You build it without code, and it learns from your own chat history." },
    ],
  },
  memory: {
    h2: 'Why One Memory Matters',
    body:
      "Picture a lead that a chatbot qualifies on Monday. On Friday they message support, and a different tool asks them to explain everything again. Your CRM never heard about either conversation. Eazybe's agents read and write the same customer record, so that doesn't happen.",
    points: [
      'The support agent already knows what the lead told sales',
      'Agent actions are saved in your CRM, where your team already looks',
      'When a person takes over, the full conversation comes with it',
    ],
  },
  compare: {
    h2: 'WhatsApp AI Agent vs Chatbot',
    subtitle: "A chatbot is a decision tree. It works until a customer asks something it wasn't built for. An AI agent reads the whole message, checks your CRM, then answers or updates the deal. The difference shows up in the messages nobody planned for.",
    head: ['', 'Eazybe WhatsApp AI agent', 'Rule-based chatbot'],
    rows: [
      ['How it replies', 'Understands free-form messages with a large language model', 'Follows fixed scripts and button menus'],
      ['Off-script questions', 'Answers from your knowledge base and chat history', 'Replies "Sorry, I didn\'t understand"'],
      ['Lead qualification', 'Scores intent with BANT, MEDDIC or your own rules', 'Asks the same fixed list of questions'],
      ['CRM updates', 'Logs chats and updates deals by itself', 'Usually needs a separate integration'],
      ['Handoff to a person', 'Passes on the whole conversation', 'The rep often starts from scratch'],
      ['WhatsApp accounts', 'Personal WhatsApp, Business App and Cloud API', 'Usually the Cloud API only'],
    ],
  },
  how: {
    tag: 'Setup',
    h2: "How Do You Set Up A WhatsApp AI Agent?",
    subtitle: "You don't migrate anything or buy a new number. The extension sits on top of WhatsApp Web, your CRM connects with one click, and the agents learn from chats you already have. Most of the 2 minutes goes on choosing which agents to switch on.",
    steps: [
      { title: 'Add the Chrome extension', desc: 'It runs on top of WhatsApp Web, the same tab your reps keep open all day.' },
      { title: 'Connect your CRM', desc: 'One click for HubSpot, Salesforce and Zoho. There are no API keys to copy.' },
      { title: 'Turn on the agents you want', desc: 'They learn from your chat history and knowledge base. You decide when a person steps in.' },
    ],
  },
  fits: {
    h2: 'Built For Teams That Sell On WhatsApp',
    subtitle: "If your deals start and close in WhatsApp chats while the CRM stays half empty, you're the team this was built for. Below are the three setups where an agent takes the most work off people's plates, with what changes in each.",
    cards: [
      { title: 'Sales teams with a CRM', desc: 'Deals get negotiated on WhatsApp while the CRM shows nothing, so managers end up chasing reps for updates. The CRM Sync Agent fills those records in as the chats happen.' },
      { title: 'Teams running click-to-WhatsApp ads', desc: 'You pay for every ad conversation, including the ones from people who were only curious. Intent scoring tells you which is which before you spend more on them.' },
      { title: 'Support after hours', desc: "Customers write at 11pm and on Sundays. The Customer Success Agent answers what it can, and the morning shift starts with a short list of the ones it couldn't." },
    ],
  },
  logos: {
    "label": "Used by sales and support teams at"
  },
  demo: {
    "tag": "See it working",
    "h2": "Watch The Agents",
    "h2Em": "At Work",
    "subtitle": "The first clip comes straight from the product: the Revenue Agent marking chats that need a rep. The card under it shows what a rep sees when a hot lead writes in, with the signals the agent picked up and where it sent the lead.",
    "radar": {
      "title": "Revenue Agent: quiet deals get flagged before they go cold",
      "desc": "The agent reads every open conversation and marks the ones that need someone. In the clip it catches three: pricing that was promised but never sent, a follow-up that slipped, and a buyer who hasn't heard back in two days.",
      "points": [
        "Flags deals stuck for 48 hours or more, with the rep who owns each one",
        "Drafts the follow-up in that rep's own style"
      ],
      "videoLabel": "Revenue Agent flagging WhatsApp chats with missed pricing, missed follow-ups and no reply in two days"
    },
    "lead": {
      "title": "Lead Qualification Agent: hot leads reach a closer first",
      "desc": "Every inbound message gets scored while the chat is still going. When a lead shows budget, need and timing, the agent hands it to your best closer with the conversation attached.",
      "points": [
        "Scores with BANT, MEDDIC or your own criteria",
        "Asks the next qualifying question for you",
        "Routes by score, region or product line"
      ],
      "chat": [
        {
          "from": "lead",
          "text": "Hi, we need WhatsApp in HubSpot for a 12-person sales team. Can we start this month?"
        },
        {
          "from": "agent",
          "text": "Yes, this month works. Who signs off on new tools on your side?"
        },
        {
          "from": "lead",
          "text": "That's me, I run sales. Budget is already approved."
        }
      ],
      "scoreLabel": "Lead score",
      "scoreValue": "Hot",
      "signals": [
        {
          "label": "Budget approved",
          "ok": true
        },
        {
          "label": "Decision maker",
          "ok": true
        },
        {
          "label": "Need: 12 seats",
          "ok": true
        },
        {
          "label": "Timing: this month",
          "ok": true
        }
      ],
      "routed": "Sent to your top closer, with the full chat"
    }
  },
  proof: {
    "h2": "Numbers From",
    "h2Em": "A Real Customer",
    "subtitle": "Lokmax rents compact machinery across Brazil and closes most of its deals on WhatsApp. HubSpot used to show empty activity logs while reps negotiated in their own chats. These are the numbers they reported after connecting the two with Eazybe.",
    "caseMeta": "Equipment rental · Brazil · 5,000+ clients",
    "metrics": [
      {
        "value": "24-48h → under 3h",
        "label": "Quote turnaround"
      },
      {
        "value": "70% faster",
        "label": "Availability confirmations"
      },
      {
        "value": "Full history",
        "label": "Carried into every handoff, so clients never repeat their project"
      }
    ],
    "caseCta": "Read the Lokmax story",
    "ratings": [
      {
        "value": "4.2★",
        "label": "from 1.1K ratings",
        "source": "Chrome Web Store",
        "href": "https://chromewebstore.google.com/detail/eazybe-crm-sync-ai-assist/clgficggccelgifppbcaepjdkklfcefd/reviews"
      },
      {
        "value": "4.3★",
        "label": "from 77 reviews",
        "source": "HubSpot Marketplace",
        "href": "https://ecosystem.hubspot.com/marketplace/listing/whatsapp-eazybe"
      },
      {
        "value": "30,000+",
        "label": "users in 40+ countries",
        "source": "Chrome Web Store",
        "href": "https://chromewebstore.google.com/detail/eazybe-crm-sync-ai-assist/clgficggccelgifppbcaepjdkklfcefd/reviews"
      }
    ]
  },
  strip: [
    "Works on personal WhatsApp",
    "2-minute setup",
    "4-day free trial",
    "Hands off to a person",
    "HubSpot, Salesforce, Zoho and more",
    "Replies at any hour",
    "No new number needed"
  ],
  pricing: {
    h2: 'How Much Does A WhatsApp AI Agent Cost?',
    body: 'AI agents come with the Basic AI plan and up. You can try any plan free for 4 days first.',
    plan: 'Basic AI',
    yearly: '$59 per WhatsApp number per month, billed yearly',
    monthly: '$79 per number per month if you pay monthly',
    included: '5 users included',
    custom: 'Custom AI adds the CTWA Agent, voice AI calling and 100+ integrations, priced for your team',
    note: 'Prices are in USD. The pricing page shows them in your local currency.',
    cta: 'See all plans',
  },
  related: {
    h2: 'More On AI Agents',
    subtitle: "The Eazybe blog goes deeper than this page can: AI agents for banking, insurance, real estate and support, plus how voice agents qualify leads before a rep calls. Start with the one closest to your industry, or the chatbot comparison if you're still deciding.",
  },
  faqTitle: 'WhatsApp AI Agent FAQs',
  faqIntro:
    "These are the questions sales and support leads ask us most before they switch an agent on: what it costs, whether their number is safe, which CRMs it talks to and how long setup really takes. The short version is $59 per number a month on yearly billing, about 2 minutes to set up, and a 4-day trial to check it on your own chats first.",
  faq: [
    { q: 'What is a WhatsApp AI agent?', a: "It's software that reads and replies to WhatsApp messages for a business. It uses a large language model to qualify leads, answer support questions and update your CRM, and it hands the chat to a person when it should." },
    { q: 'How is a WhatsApp AI agent different from a chatbot?', a: 'A chatbot runs on a script, so it stalls as soon as a customer asks something unexpected. An AI agent understands free-form messages, answers from your knowledge base and chat history, and acts on what it learns, for example by scoring a lead or updating a CRM deal.' },
    { q: "How is Eazybe different from Meta's own Business AI agent?", a: "Meta's agent answers customers inside WhatsApp. Eazybe is built around your sales pipeline. It runs on personal WhatsApp as well as the Business App and Cloud API, and it logs every chat to HubSpot, Salesforce or Zoho. On top of that, the agents score new leads and flag deals that have gone quiet, and all five share one memory of each customer, so sales and support see the same history." },
    { q: 'How much does a WhatsApp AI agent cost?', a: 'AI agents start with the Basic AI plan: $59 per WhatsApp number per month billed yearly, or $79 billed monthly, with 5 users included. Custom AI is priced per team. Every plan has a 4-day free trial.' },
    { q: "Who uses Eazybe, and what results have teams seen?", a: "More than 30,000 people use Eazybe in 40+ countries, including sales teams at Physics Wallah and University Living. It's rated 4.2 out of 5 from 1.1K ratings on the Chrome Web Store and 4.3 from 77 reviews on the HubSpot Marketplace. One published example: Lokmax, a machinery rental company in Brazil, cut its quote turnaround from 24-48 hours to under 3 after connecting WhatsApp to HubSpot." },
    { q: 'Do I need the WhatsApp Business API to use the agents?', a: 'No. Eazybe works with personal WhatsApp, the WhatsApp Business App and the Cloud API, so you keep your numbers and your chat history.' },
    { q: 'Will a Chrome extension get my number banned?', a: 'Numbers get banned for bulk sending through unofficial automation. The Eazybe extension sits on top of chats your reps are already having, and bulk messaging goes through the official Cloud API.' },
    { q: 'Which CRMs do the agents work with?', a: "HubSpot, Salesforce, Zoho, Pipedrive, Bitrix24, LeadSquared, Freshworks, monday.com and Google Sheets. For anything else there's a custom API with webhooks." },
    { q: 'What languages do the agents speak?', a: "Whatever language the customer writes in. A message in Spanish gets a Spanish reply, one in Portuguese gets Portuguese, and the same goes for Turkish, Hindi or Arabic. The agents check your CRM first, then answer in that language." },
    { q: 'Can I build my own WhatsApp AI agent?', a: 'Yes. With Agent Builder, someone on your ops team with no coding background can set up an agent for renewals, onboarding or pricing questions. It learns from your own chat history.' },
    { q: 'How long does setup take?', a: "About 2 minutes. You add the Chrome extension, connect your CRM and turn on the agents you want. You don't need a developer or a new number." },
    { q: 'Is there a free trial?', a: "Yes. Every plan starts with a 4-day free trial, including Basic AI with the agents. You install the Chrome extension, connect your CRM and let the agents work on your real chats, so you can judge them on your own conversations before you pay." },
  ],
  finalCta: {
    h2: 'Let An AI Agent Take',
    h2Em: 'Your Busiest Chats',
    body: "Start the 4-day free trial and your first chats will be syncing in a couple of minutes. If you'd rather see it on your own pipeline first, book a demo.",
    primary: 'Start 4-day free trial',
    secondary: 'Book a demo',
  },
}

const es: AiAgentPageContent = {
  meta: {
    title: "Agente de IA para WhatsApp que actualiza tu CRM | Eazybe",
    description:
      "Agentes de IA en WhatsApp que califican leads, reactivan ventas frías y guardan cada chat en HubSpot o Salesforce. Con tu mismo número. Prueba 4 días gratis.",
    ogTitle: 'Agentes de IA para WhatsApp para equipos de ventas y soporte',
    ogDescription:
      'Cinco agentes de IA que trabajan en el WhatsApp que tu equipo ya usa y recuerdan a cada cliente: sync con CRM, calificación de leads, seguimientos y soporte.',
  },
  breadcrumb: { home: 'Inicio', current: 'Agente de IA para WhatsApp' },
  hero: {
    tag: 'Agentes de IA para WhatsApp',
    h1Lead: 'Agentes de IA para WhatsApp que',
    h1Highlight: 'venden, registran y atienden',
    subtitle:
      'Tus vendedores ya venden por WhatsApp. Los agentes de Eazybe trabajan en esos mismos chats: califican los leads nuevos, responden dudas de soporte fuera de horario y guardan cada conversación en tu CRM. Nadie cambia de aplicación ni escribe notas.',
    chips: ['WhatsApp personal', 'Business App', 'Cloud API', 'Sin migración'],
    ctaPrimary: 'Prueba gratis 4 días',
    ctaSecondary: 'Reservar demo',
    footnote: 'Prueba gratis de 4 días. La configuración lleva unos 2 minutos y no necesitas un desarrollador.',
  },
  answer: {
    h2: '¿Qué es un agente de IA para WhatsApp?',
    p: 'Un agente de IA para WhatsApp es un software que lee y responde mensajes de WhatsApp en nombre de una empresa. Un chatbot sigue un guion y se atasca en cuanto el cliente se sale de él. Un agente de IA usa un modelo de lenguaje para entender lo que el cliente escribió de verdad, así que puede calificar un lead, resolver una duda de soporte o actualizar un negocio en el CRM, y pasar el chat a una persona cuando corresponde.',
  },
  facts: [
    { value: '30.000+', label: 'Usuarios' },
    { value: '40+', label: 'Países' },
    { value: '4,2★', label: 'Chrome Web Store (1.100 valoraciones)' },
    { value: '4,3★', label: 'HubSpot Marketplace' },
    { value: '2 min', label: 'De configuración' },
    { value: '4 días', label: 'De prueba gratis' },
  ],
  agents: {
    h2: 'Cinco agentes listos,',
    h2Em: 'más el tuyo',
    subtitle: "Cada agente se encarga de una tarea y todos leen el mismo historial del cliente, así que el agente de soporte sabe lo que el lead le contó a ventas. Empieza por CRM Sync y Lead Qualification y suma los demás cuando esos dos ya rindan.",
    cards: [
      { id: 'crm-sync', name: 'CRM Sync Agent', desc: 'Registra cada chat de WhatsApp en el contacto, negocio y empresa correctos de HubSpot, Salesforce, Zoho, Pipedrive y otros CRMs. Tus vendedores dejan de copiar y pegar.' },
      { id: 'lead-qualification', name: 'Lead Qualification Agent', desc: 'Puntúa cada mensaje entrante con BANT, MEDDIC o tus propios criterios. Los leads calientes van directo a tu mejor cerrador.' },
      { id: 'revenue', name: 'Revenue Agent', desc: 'Detecta las ventas que llevan 48 horas sin moverse y redacta un seguimiento como lo escribiría ese vendedor.' },
      { id: 'customer-success', name: 'Customer Success Agent', desc: 'Responde dudas de soporte desde tu base de conocimiento a cualquier hora, en el idioma en que escriba el cliente. Cuando no puede ayudar, una persona toma el chat con toda la conversación delante.' },
      { id: 'ctwa', name: 'CTWA Agent', desc: 'Puntúa cada conversación que empieza en un anuncio de clic a WhatsApp, para que dejes de hacer retargeting a quien nunca iba a comprar. Forma parte del plan Custom AI.' },
      { id: 'agent-builder', name: 'Agent Builder', desc: 'Para lo que los otros cinco no cubren, como recordatorios de renovación o preguntas de precios. Lo creas sin código y aprende de tu propio historial de chats.' },
    ],
  },
  memory: {
    h2: 'Por qué importa una sola memoria',
    body:
      'Imagina un lead que un chatbot califica el lunes. El viernes escribe a soporte y otra herramienta le pide que vuelva a explicarlo todo. Tu CRM no se enteró de ninguna de las dos conversaciones. Los agentes de Eazybe leen y escriben en el mismo registro del cliente, así que eso no pasa.',
    points: [
      'El agente de soporte ya sabe lo que el lead le contó a ventas',
      'Las acciones de los agentes quedan en tu CRM, donde tu equipo ya mira',
      'Cuando una persona toma el chat, recibe la conversación completa',
    ],
  },
  compare: {
    h2: 'Agente de IA para WhatsApp vs chatbot',
    subtitle: "Un chatbot es un árbol de decisiones. Funciona hasta que el cliente pregunta algo para lo que no fue diseñado. Un agente de IA lee el mensaje completo, revisa tu CRM y luego responde o actualiza el negocio. La diferencia se nota en los mensajes que nadie previó.",
    head: ['', 'Agente de IA de Eazybe', 'Chatbot con reglas'],
    rows: [
      ['Cómo responde', 'Entiende mensajes libres con un modelo de lenguaje', 'Sigue guiones fijos y menús de botones'],
      ['Preguntas fuera del guion', 'Responde con tu base de conocimiento y tu historial', 'Contesta "Lo siento, no te entendí"'],
      ['Calificación de leads', 'Puntúa la intención con BANT, MEDDIC o tus reglas', 'Hace siempre la misma lista de preguntas'],
      ['Actualización del CRM', 'Registra chats y actualiza negocios por sí solo', 'Suele necesitar otra integración'],
      ['Traspaso a una persona', 'Entrega la conversación completa', 'El vendedor suele empezar de cero'],
      ['Cuentas de WhatsApp', 'WhatsApp personal, Business App y Cloud API', 'Normalmente solo la Cloud API'],
    ],
  },
  how: {
    tag: 'Configuración',
    h2: "¿Cómo se configura un agente de IA para WhatsApp?",
    subtitle: "No migras nada ni compras un número nuevo. La extensión funciona sobre WhatsApp Web, tu CRM se conecta con un clic y los agentes aprenden de los chats que ya tienes. Casi todo el tiempo de configuración se va en elegir qué agentes activar.",
    steps: [
      { title: 'Agrega la extensión de Chrome', desc: 'Funciona sobre WhatsApp Web, la misma pestaña que tus vendedores tienen abierta todo el día.' },
      { title: 'Conecta tu CRM', desc: 'Un clic para HubSpot, Salesforce y Zoho. No hay claves de API que copiar.' },
      { title: 'Activa los agentes que quieras', desc: 'Aprenden de tu historial de chats y de tu base de conocimiento. Tú decides cuándo entra una persona.' },
    ],
  },
  fits: {
    h2: 'Hecho para equipos que venden por WhatsApp',
    subtitle: "Si tus ventas empiezan y se cierran en chats de WhatsApp mientras el CRM sigue medio vacío, esto está hecho para tu equipo. Estas son las tres situaciones donde un agente le quita más trabajo a la gente, y lo que cambia en cada una.",
    cards: [
      { title: 'Equipos de ventas con CRM', desc: 'Las ventas se negocian por WhatsApp mientras el CRM no muestra nada, y los gerentes terminan persiguiendo a los vendedores para pedirles novedades. El CRM Sync Agent completa esos registros mientras ocurren los chats.' },
      { title: 'Equipos con anuncios de clic a WhatsApp', desc: 'Pagas por cada conversación de anuncio, incluidas las de gente que solo tenía curiosidad. La puntuación de intención te dice quién es quién antes de que gastes más en ellos.' },
      { title: 'Soporte fuera de horario', desc: 'Los clientes escriben a las 11 de la noche y los domingos. El Customer Success Agent responde lo que puede, y el turno de la mañana empieza con una lista corta de lo que no pudo resolver.' },
    ],
  },
  logos: {
    "label": "Lo usan equipos de ventas y soporte en"
  },
  demo: {
    "tag": "Míralo en acción",
    "h2": "Mira a los agentes",
    "h2Em": "trabajando",
    "subtitle": "El primer clip sale directamente del producto: el Revenue Agent marcando los chats que necesitan a un vendedor. La tarjeta de abajo muestra lo que ve un vendedor cuando escribe un lead caliente, con las señales que detectó el agente y a quién lo envió.",
    "radar": {
      "title": "Revenue Agent: las ventas quietas se marcan antes de enfriarse",
      "desc": "El agente lee cada conversación abierta y marca las que necesitan a alguien. En el video detecta tres: un precio prometido que nunca se envió, un seguimiento que se pasó y un comprador que lleva dos días sin respuesta.",
      "points": [
        "Marca las ventas paradas 48 horas o más, con el vendedor dueño de cada una",
        "Redacta el seguimiento con el estilo de ese vendedor"
      ],
      "videoLabel": "Revenue Agent marcando chats de WhatsApp con precios no enviados, seguimientos perdidos y dos días sin respuesta"
    },
    "lead": {
      "title": "Lead Qualification Agent: los leads calientes llegan primero a un cerrador",
      "desc": "Cada mensaje entrante se puntúa mientras el chat sigue abierto. Cuando un lead muestra presupuesto, necesidad y plazo, el agente se lo pasa a tu mejor cerrador con la conversación incluida.",
      "points": [
        "Puntúa con BANT, MEDDIC o tus propios criterios",
        "Hace por ti la siguiente pregunta de calificación",
        "Asigna por puntuación, región o línea de producto"
      ],
      "chat": [
        {
          "from": "lead",
          "text": "Hola, necesitamos WhatsApp en HubSpot para un equipo de ventas de 12 personas. ¿Podemos empezar este mes?"
        },
        {
          "from": "agent",
          "text": "Sí, este mes es posible. ¿Quién aprueba las herramientas nuevas en tu empresa?"
        },
        {
          "from": "lead",
          "text": "Yo, dirijo ventas. El presupuesto ya está aprobado."
        }
      ],
      "scoreLabel": "Puntuación del lead",
      "scoreValue": "Caliente",
      "signals": [
        {
          "label": "Presupuesto aprobado",
          "ok": true
        },
        {
          "label": "Decide la compra",
          "ok": true
        },
        {
          "label": "Necesidad: 12 usuarios",
          "ok": true
        },
        {
          "label": "Plazo: este mes",
          "ok": true
        }
      ],
      "routed": "Enviado a tu mejor cerrador, con el chat completo"
    }
  },
  proof: {
    "h2": "Cifras de",
    "h2Em": "un cliente real",
    "subtitle": "Lokmax alquila maquinaria compacta en todo Brasil y cierra la mayoría de sus ventas por WhatsApp. HubSpot mostraba registros vacíos mientras los vendedores negociaban en sus propios chats. Estas son las cifras que reportaron después de conectar ambos con Eazybe.",
    "caseMeta": "Alquiler de equipos · Brasil · más de 5.000 clientes",
    "metrics": [
      {
        "value": "24-48 h → menos de 3 h",
        "label": "Tiempo de envío de cotizaciones"
      },
      {
        "value": "70% más rápido",
        "label": "Confirmación de disponibilidad"
      },
      {
        "value": "Historial completo",
        "label": "En cada traspaso, así el cliente nunca repite su proyecto"
      }
    ],
    "caseCta": "Leer la historia de Lokmax",
    "ratings": [
      {
        "value": "4,2★",
        "label": "de 1.100 valoraciones",
        "source": "Chrome Web Store",
        "href": "https://chromewebstore.google.com/detail/eazybe-crm-sync-ai-assist/clgficggccelgifppbcaepjdkklfcefd/reviews"
      },
      {
        "value": "4,3★",
        "label": "de 77 reseñas",
        "source": "HubSpot Marketplace",
        "href": "https://ecosystem.hubspot.com/marketplace/listing/whatsapp-eazybe"
      },
      {
        "value": "30.000+",
        "label": "usuarios en más de 40 países",
        "source": "Chrome Web Store",
        "href": "https://chromewebstore.google.com/detail/eazybe-crm-sync-ai-assist/clgficggccelgifppbcaepjdkklfcefd/reviews"
      }
    ]
  },
  strip: [
    "Funciona con WhatsApp personal",
    "Listo en 2 minutos",
    "Prueba gratis de 4 días",
    "Pasa el chat a una persona",
    "HubSpot, Salesforce, Zoho y más",
    "Responde a cualquier hora",
    "Sin número nuevo"
  ],
  pricing: {
    h2: '¿Cuánto cuesta un agente de IA para WhatsApp?',
    body: 'Los agentes de IA vienen con el plan Basic AI y los superiores. Puedes probar cualquier plan gratis durante 4 días.',
    plan: 'Basic AI',
    yearly: 'US$59 por número de WhatsApp al mes, con pago anual',
    monthly: 'US$79 por número al mes si pagas mensualmente',
    included: '5 usuarios incluidos',
    custom: 'Custom AI suma el CTWA Agent, llamadas con IA de voz y más de 100 integraciones, con precio a medida para tu equipo',
    note: 'Los precios están en dólares. La página de precios los muestra en tu moneda local.',
    cta: 'Ver todos los planes',
  },
  related: {
    h2: 'Más sobre agentes de IA',
    subtitle: "El blog de Eazybe profundiza más de lo que cabe en esta página: agentes de IA para banca, seguros, inmobiliarias y soporte, y cómo los agentes de voz califican leads antes de que llame un vendedor. Empieza por el de tu sector o por la comparativa con chatbots.",
  },
  faqTitle: 'Preguntas frecuentes sobre agentes de IA para WhatsApp',
  faqIntro:
    "Estas son las preguntas que más nos hacen los responsables de ventas y soporte antes de activar un agente: cuánto cuesta, si su número corre algún riesgo, con qué CRMs se conecta y cuánto tarda de verdad la configuración. En resumen: US$59 por número al mes con pago anual, unos 2 minutos de configuración y 4 días gratis para verlo funcionar con tus propios chats.",
  faq: [
    { q: '¿Qué es un agente de IA para WhatsApp?', a: 'Es un software que lee y responde mensajes de WhatsApp en nombre de una empresa. Usa un modelo de lenguaje para calificar leads, resolver dudas de soporte y actualizar tu CRM, y pasa el chat a una persona cuando corresponde.' },
    { q: '¿En qué se diferencia un agente de IA de un chatbot?', a: 'Un chatbot funciona con un guion, así que se traba en cuanto el cliente pregunta algo inesperado. Un agente de IA entiende mensajes libres, responde con tu base de conocimiento y tu historial de chats, y actúa según lo que aprende, por ejemplo puntuando un lead o actualizando un negocio en el CRM.' },
    { q: "¿En qué se diferencia Eazybe del agente de IA de Meta para WhatsApp Business?", a: "El agente de Meta responde a los clientes dentro de WhatsApp. Eazybe está pensado para tu pipeline de ventas. Funciona con WhatsApp personal además de Business App y Cloud API, y registra cada chat en HubSpot, Salesforce o Zoho. Además, los agentes puntúan los leads nuevos y marcan las ventas que se quedaron quietas, y los cinco comparten una sola memoria de cada cliente, así que ventas y soporte ven el mismo historial." },
    { q: '¿Cuánto cuesta un agente de IA para WhatsApp?', a: 'Los agentes de IA empiezan con el plan Basic AI: US$59 por número de WhatsApp al mes con pago anual, o US$79 con pago mensual, con 5 usuarios incluidos. Custom AI tiene precio a medida. Todos los planes tienen una prueba gratis de 4 días.' },
    { q: "¿Quién usa Eazybe y qué resultados han visto los equipos?", a: "Más de 30.000 personas usan Eazybe en más de 40 países, entre ellas equipos de ventas de Physics Wallah y University Living. Tiene 4,2 de 5 con 1.100 valoraciones en Chrome Web Store y 4,3 con 77 reseñas en HubSpot Marketplace. Un caso publicado: Lokmax, empresa de alquiler de maquinaria en Brasil, bajó su tiempo de envío de cotizaciones de 24-48 horas a menos de 3 tras conectar WhatsApp con HubSpot." },
    { q: '¿Necesito la WhatsApp Business API para usar los agentes?', a: 'No. Eazybe funciona con WhatsApp personal, WhatsApp Business App y la Cloud API, así que conservas tus números y tu historial.' },
    { q: '¿Una extensión de Chrome puede hacer que baneen mi número?', a: 'Los números se banean por envíos masivos con automatización no oficial. La extensión de Eazybe funciona sobre chats que tus vendedores ya están teniendo, y la mensajería masiva pasa por la Cloud API oficial.' },
    { q: '¿Con qué CRMs funcionan los agentes?', a: 'HubSpot, Salesforce, Zoho, Pipedrive, Bitrix24, LeadSquared, Freshworks, monday.com y Google Sheets. Para cualquier otro hay una API personalizada con webhooks.' },
    { q: '¿En qué idiomas hablan los agentes?', a: "En el idioma en que escriba el cliente. Un mensaje en español recibe respuesta en español, uno en portugués en portugués, y lo mismo con el turco, el hindi o el árabe. Los agentes revisan primero tu CRM y luego responden en ese idioma." },
    { q: '¿Puedo crear mi propio agente de IA para WhatsApp?', a: 'Sí. Con Agent Builder, alguien de tu equipo de operaciones sin conocimientos de programación puede crear un agente para renovaciones, onboarding o preguntas de precios. Aprende de tu propio historial de chats.' },
    { q: '¿Cuánto tarda la configuración?', a: 'Unos 2 minutos. Agregas la extensión de Chrome, conectas tu CRM y activas los agentes que quieras. No necesitas un desarrollador ni un número nuevo.' },
    { q: '¿Hay prueba gratis?', a: "Sí. Todos los planes empiezan con una prueba gratis de 4 días, incluido Basic AI con los agentes. Instalas la extensión de Chrome, conectas tu CRM y dejas que los agentes trabajen sobre tus chats reales, así los juzgas con tus propias conversaciones antes de pagar." },
  ],
  finalCta: {
    h2: 'Deja que un agente de IA atienda',
    h2Em: 'tus chats más activos',
    body: 'Empieza la prueba gratis de 4 días y tus primeros chats se sincronizarán en un par de minutos. Si prefieres verlo antes sobre tu propio pipeline, reserva una demo.',
    primary: 'Prueba gratis 4 días',
    secondary: 'Reservar demo',
  },
}

const br: AiAgentPageContent = {
  meta: {
    title: "Agente de IA para WhatsApp integrado ao seu CRM | Eazybe",
    description:
      "Agentes de IA no WhatsApp que qualificam leads, retomam negócios parados e salvam cada conversa no HubSpot ou Salesforce. Seu número atual. 4 dias grátis.",
    ogTitle: 'Agentes de IA para WhatsApp para times de vendas e suporte',
    ogDescription:
      'Cinco agentes de IA que trabalham no WhatsApp que seu time já usa e lembram de cada cliente: sync com CRM, qualificação de leads, follow-ups e suporte.',
  },
  breadcrumb: { home: 'Início', current: 'Agente de IA para WhatsApp' },
  hero: {
    tag: 'Agentes de IA para WhatsApp',
    h1Lead: 'Agentes de IA para WhatsApp que',
    h1Highlight: 'vendem, registram e atendem',
    subtitle:
      'Seus vendedores já vendem pelo WhatsApp. Os agentes da Eazybe trabalham nessas mesmas conversas: qualificam os leads novos, respondem dúvidas de suporte fora do horário e salvam cada conversa no seu CRM. Ninguém troca de aplicativo nem digita anotações.',
    chips: ['WhatsApp pessoal', 'Business App', 'Cloud API', 'Sem migração'],
    ctaPrimary: 'Teste grátis por 4 dias',
    ctaSecondary: 'Agendar demo',
    footnote: 'Teste grátis de 4 dias. A configuração leva uns 2 minutos e você não precisa de desenvolvedor.',
  },
  answer: {
    h2: 'O que é um agente de IA para WhatsApp?',
    p: 'Um agente de IA para WhatsApp é um software que lê e responde mensagens do WhatsApp em nome de uma empresa. Um chatbot segue um roteiro e trava quando o cliente sai dele. Um agente de IA usa um modelo de linguagem para entender o que o cliente realmente escreveu, então consegue qualificar um lead, responder uma dúvida de suporte ou atualizar um negócio no CRM, e passar a conversa para uma pessoa quando faz sentido.',
  },
  facts: [
    { value: '30.000+', label: 'Usuários' },
    { value: '40+', label: 'Países' },
    { value: '4,2★', label: 'Chrome Web Store (1.100 avaliações)' },
    { value: '4,3★', label: 'HubSpot Marketplace' },
    { value: '2 min', label: 'De configuração' },
    { value: '4 dias', label: 'De teste grátis' },
  ],
  agents: {
    h2: 'Cinco agentes prontos,',
    h2Em: 'mais o seu',
    subtitle: "Cada agente cuida de uma tarefa e todos leem o mesmo histórico do cliente, então o agente de suporte sabe o que o lead contou para vendas. Comece por CRM Sync e Lead Qualification e adicione os outros quando esses dois já estiverem rendendo.",
    cards: [
      { id: 'crm-sync', name: 'CRM Sync Agent', desc: 'Registra cada conversa do WhatsApp no contato, negócio e empresa certos do HubSpot, Salesforce, Zoho, Pipedrive e outros CRMs. Seus vendedores param de copiar e colar.' },
      { id: 'lead-qualification', name: 'Lead Qualification Agent', desc: 'Pontua cada mensagem recebida com BANT, MEDDIC ou seus próprios critérios. Os leads quentes vão direto para o seu melhor closer.' },
      { id: 'revenue', name: 'Revenue Agent', desc: 'Encontra os negócios parados há 48 horas e escreve um follow-up do jeito que aquele vendedor escreveria.' },
      { id: 'customer-success', name: 'Customer Success Agent', desc: 'Responde dúvidas de suporte a partir da sua base de conhecimento a qualquer hora, no idioma em que o cliente escrever. Quando não consegue ajudar, uma pessoa assume com a conversa inteira na tela.' },
      { id: 'ctwa', name: 'CTWA Agent', desc: 'Pontua cada conversa que começa num anúncio de clique para WhatsApp, para você parar de fazer retargeting de quem nunca ia comprar. Faz parte do plano Custom AI.' },
      { id: 'agent-builder', name: 'Agent Builder', desc: 'Para o que os outros cinco não cobrem, como lembretes de renovação ou dúvidas de preço. Você monta sem código, e ele aprende com o seu próprio histórico de conversas.' },
    ],
  },
  memory: {
    h2: 'Por que uma única memória importa',
    body:
      'Imagine um lead que um chatbot qualifica na segunda. Na sexta ele chama o suporte, e outra ferramenta pede que ele explique tudo de novo. O seu CRM não ficou sabendo de nenhuma das duas conversas. Os agentes da Eazybe leem e escrevem no mesmo registro do cliente, então isso não acontece.',
    points: [
      'O agente de suporte já sabe o que o lead contou para vendas',
      'As ações dos agentes ficam salvas no CRM, onde o seu time já olha',
      'Quando uma pessoa assume, a conversa inteira vai junto',
    ],
  },
  compare: {
    h2: 'Agente de IA para WhatsApp vs chatbot',
    subtitle: "Um chatbot é uma árvore de decisão. Funciona até o cliente perguntar algo para o qual ele não foi feito. Um agente de IA lê a mensagem inteira, consulta o seu CRM e depois responde ou atualiza o negócio. A diferença aparece nas mensagens que ninguém previu.",
    head: ['', 'Agente de IA da Eazybe', 'Chatbot com regras'],
    rows: [
      ['Como responde', 'Entende mensagens livres com um modelo de linguagem', 'Segue roteiros fixos e menus de botões'],
      ['Perguntas fora do roteiro', 'Responde com a sua base de conhecimento e o histórico', 'Responde "Desculpe, não entendi"'],
      ['Qualificação de leads', 'Pontua a intenção com BANT, MEDDIC ou suas regras', 'Faz sempre a mesma lista de perguntas'],
      ['Atualização do CRM', 'Registra conversas e atualiza negócios sozinho', 'Costuma precisar de outra integração'],
      ['Repasse para uma pessoa', 'Entrega a conversa inteira', 'O vendedor costuma começar do zero'],
      ['Contas de WhatsApp', 'WhatsApp pessoal, Business App e Cloud API', 'Normalmente só a Cloud API'],
    ],
  },
  how: {
    tag: 'Configuração',
    h2: "Como configurar um agente de IA para WhatsApp?",
    subtitle: "Você não migra nada nem compra número novo. A extensão roda sobre o WhatsApp Web, o CRM conecta com um clique e os agentes aprendem com as conversas que você já tem. Quase todo o tempo de configuração vai para escolher quais agentes ativar.",
    steps: [
      { title: 'Adicione a extensão do Chrome', desc: 'Ela roda sobre o WhatsApp Web, a mesma aba que seus vendedores deixam aberta o dia todo.' },
      { title: 'Conecte seu CRM', desc: 'Um clique para HubSpot, Salesforce e Zoho. Não tem chave de API para copiar.' },
      { title: 'Ative os agentes que quiser', desc: 'Eles aprendem com o seu histórico de conversas e a sua base de conhecimento. Você decide quando uma pessoa entra.' },
    ],
  },
  fits: {
    h2: 'Feito para times que vendem no WhatsApp',
    subtitle: "Se os seus negócios começam e fecham em conversas de WhatsApp enquanto o CRM continua meio vazio, isto foi feito para o seu time. Estas são as três situações em que um agente tira mais trabalho das pessoas, e o que muda em cada uma.",
    cards: [
      { title: 'Times de vendas com CRM', desc: 'Os negócios são negociados no WhatsApp enquanto o CRM não mostra nada, e os gestores acabam cobrando atualização dos vendedores. O CRM Sync Agent preenche esses registros enquanto as conversas acontecem.' },
      { title: 'Times com anúncios de clique para WhatsApp', desc: 'Você paga por cada conversa de anúncio, inclusive as de quem só estava curioso. A pontuação de intenção mostra quem é quem antes de você gastar mais com eles.' },
      { title: 'Suporte fora do horário', desc: 'Os clientes escrevem às 11 da noite e aos domingos. O Customer Success Agent responde o que consegue, e o turno da manhã começa com uma lista curta do que ficou pendente.' },
    ],
  },
  logos: {
    "label": "Usado por times de vendas e suporte da"
  },
  demo: {
    "tag": "Veja funcionando",
    "h2": "Veja os agentes",
    "h2Em": "trabalhando",
    "subtitle": "O primeiro vídeo vem direto do produto: o Revenue Agent marcando as conversas que precisam de um vendedor. O card abaixo mostra o que o vendedor vê quando um lead quente escreve, com os sinais que o agente identificou e para quem ele mandou o lead.",
    "radar": {
      "title": "Revenue Agent: negócios parados são sinalizados antes de esfriar",
      "desc": "O agente lê cada conversa aberta e marca as que precisam de alguém. No vídeo ele pega três: um preço prometido e nunca enviado, um follow-up que ficou para trás e um comprador há dois dias sem resposta.",
      "points": [
        "Sinaliza negócios parados há 48 horas ou mais, com o vendedor dono de cada um",
        "Escreve o follow-up no estilo daquele vendedor"
      ],
      "videoLabel": "Revenue Agent sinalizando conversas do WhatsApp com preço não enviado, follow-up perdido e dois dias sem resposta"
    },
    "lead": {
      "title": "Lead Qualification Agent: lead quente chega primeiro ao closer",
      "desc": "Cada mensagem recebida é pontuada enquanto a conversa acontece. Quando o lead mostra orçamento, necessidade e prazo, o agente passa para o seu melhor closer com a conversa junto.",
      "points": [
        "Pontua com BANT, MEDDIC ou seus próprios critérios",
        "Faz por você a próxima pergunta de qualificação",
        "Distribui por pontuação, região ou linha de produto"
      ],
      "chat": [
        {
          "from": "lead",
          "text": "Oi, precisamos do WhatsApp no HubSpot para um time de vendas de 12 pessoas. Dá para começar este mês?"
        },
        {
          "from": "agent",
          "text": "Dá sim. Quem aprova ferramentas novas aí na empresa?"
        },
        {
          "from": "lead",
          "text": "Sou eu, cuido de vendas. O orçamento já está aprovado."
        }
      ],
      "scoreLabel": "Pontuação do lead",
      "scoreValue": "Quente",
      "signals": [
        {
          "label": "Orçamento aprovado",
          "ok": true
        },
        {
          "label": "Decide a compra",
          "ok": true
        },
        {
          "label": "Necessidade: 12 usuários",
          "ok": true
        },
        {
          "label": "Prazo: este mês",
          "ok": true
        }
      ],
      "routed": "Enviado ao seu melhor closer, com a conversa inteira"
    }
  },
  proof: {
    "h2": "Números de",
    "h2Em": "um cliente real",
    "subtitle": "A Lokmax aluga máquinas compactas em todo o Brasil e fecha a maior parte dos negócios pelo WhatsApp. O HubSpot mostrava registros vazios enquanto os vendedores negociavam nas próprias conversas. Estes são os números que eles relataram depois de conectar os dois com a Eazybe.",
    "caseMeta": "Locação de equipamentos · Brasil · mais de 5.000 clientes",
    "metrics": [
      {
        "value": "24-48 h → menos de 3 h",
        "label": "Tempo para enviar orçamentos"
      },
      {
        "value": "70% mais rápido",
        "label": "Confirmação de disponibilidade"
      },
      {
        "value": "Histórico completo",
        "label": "Em cada repasse, então o cliente nunca repete o projeto"
      }
    ],
    "caseCta": "Ler a história da Lokmax",
    "ratings": [
      {
        "value": "4,2★",
        "label": "de 1.100 avaliações",
        "source": "Chrome Web Store",
        "href": "https://chromewebstore.google.com/detail/eazybe-crm-sync-ai-assist/clgficggccelgifppbcaepjdkklfcefd/reviews"
      },
      {
        "value": "4,3★",
        "label": "de 77 avaliações",
        "source": "HubSpot Marketplace",
        "href": "https://ecosystem.hubspot.com/marketplace/listing/whatsapp-eazybe"
      },
      {
        "value": "30.000+",
        "label": "usuários em mais de 40 países",
        "source": "Chrome Web Store",
        "href": "https://chromewebstore.google.com/detail/eazybe-crm-sync-ai-assist/clgficggccelgifppbcaepjdkklfcefd/reviews"
      }
    ]
  },
  strip: [
    "Funciona no WhatsApp pessoal",
    "Pronto em 2 minutos",
    "Teste grátis de 4 dias",
    "Passa a conversa para uma pessoa",
    "HubSpot, Salesforce, Zoho e outros",
    "Responde a qualquer hora",
    "Sem número novo"
  ],
  pricing: {
    h2: 'Quanto custa um agente de IA para WhatsApp?',
    body: 'Os agentes de IA vêm no plano Basic AI e nos superiores. Você pode testar qualquer plano de graça por 4 dias.',
    plan: 'Basic AI',
    yearly: 'US$ 59 por número de WhatsApp por mês, no plano anual',
    monthly: 'US$ 79 por número por mês se você pagar mensalmente',
    included: '5 usuários incluídos',
    custom: 'O Custom AI inclui o CTWA Agent, chamadas com IA de voz e mais de 100 integrações, com preço sob medida para o seu time',
    note: 'Os preços estão em dólar. A página de preços mostra os valores na sua moeda local.',
    cta: 'Ver todos os planos',
  },
  related: {
    h2: 'Mais sobre agentes de IA',
    subtitle: "O blog da Eazybe vai além do que cabe nesta página: agentes de IA para bancos, seguros, imóveis e suporte, e como agentes de voz qualificam leads antes de um vendedor ligar. Comece pelo guia do seu setor ou pela comparação com chatbots.",
  },
  faqTitle: 'Perguntas frequentes sobre agentes de IA para WhatsApp',
  faqIntro:
    "Estas são as perguntas que líderes de vendas e suporte mais fazem antes de ativar um agente: quanto custa, se o número corre algum risco, com quais CRMs ele se conecta e quanto tempo a configuração leva de verdade. Resumindo: US$ 59 por número por mês no plano anual, uns 2 minutos de configuração e 4 dias grátis para ver tudo funcionando nas suas próprias conversas.",
  faq: [
    { q: 'O que é um agente de IA para WhatsApp?', a: 'É um software que lê e responde mensagens do WhatsApp em nome de uma empresa. Ele usa um modelo de linguagem para qualificar leads, responder dúvidas de suporte e atualizar o seu CRM, e passa a conversa para uma pessoa quando faz sentido.' },
    { q: 'Qual a diferença entre um agente de IA e um chatbot?', a: 'Um chatbot funciona com roteiro, então trava assim que o cliente pergunta algo inesperado. Um agente de IA entende mensagens livres, responde com a sua base de conhecimento e o histórico de conversas, e age com base no que aprende, por exemplo pontuando um lead ou atualizando um negócio no CRM.' },
    { q: "Qual a diferença entre a Eazybe e o agente de IA da Meta no WhatsApp Business?", a: "O agente da Meta atende os clientes dentro do WhatsApp. A Eazybe foi feita para o seu funil de vendas. Funciona no WhatsApp pessoal, além do Business App e da Cloud API, e registra cada conversa no HubSpot, Salesforce ou Zoho. Além disso, os agentes pontuam os leads novos e sinalizam negócios parados, e os cinco compartilham uma única memória de cada cliente, então vendas e suporte veem o mesmo histórico." },
    { q: 'Quanto custa um agente de IA para WhatsApp?', a: 'Os agentes de IA começam no plano Basic AI: US$ 59 por número de WhatsApp por mês no plano anual, ou US$ 79 no mensal, com 5 usuários incluídos. O Custom AI tem preço sob medida. Todos os planos têm teste grátis de 4 dias.' },
    { q: "Quem usa a Eazybe e quais resultados os times tiveram?", a: "Mais de 30.000 pessoas usam a Eazybe em mais de 40 países, incluindo times de vendas da Physics Wallah e da University Living. A nota é 4,2 de 5 com 1.100 avaliações na Chrome Web Store e 4,3 com 77 avaliações no HubSpot Marketplace. Um caso publicado: a Lokmax, locadora de máquinas no Brasil, reduziu o tempo de envio de orçamentos de 24-48 horas para menos de 3 depois de conectar o WhatsApp ao HubSpot." },
    { q: 'Preciso da WhatsApp Business API para usar os agentes?', a: 'Não. A Eazybe funciona com WhatsApp pessoal, WhatsApp Business App e a Cloud API, então você mantém seus números e seu histórico.' },
    { q: 'Uma extensão do Chrome pode banir meu número?', a: 'Números são banidos por envio em massa com automação não oficial. A extensão da Eazybe funciona sobre conversas que seus vendedores já estão tendo, e as mensagens em massa passam pela Cloud API oficial.' },
    { q: 'Com quais CRMs os agentes funcionam?', a: 'HubSpot, Salesforce, Zoho, Pipedrive, Bitrix24, LeadSquared, Freshworks, monday.com e Google Sheets. Para qualquer outro existe uma API personalizada com webhooks.' },
    { q: 'Em quais idiomas os agentes falam?', a: "No idioma em que o cliente escrever. Uma mensagem em português recebe resposta em português, uma em espanhol em espanhol, e o mesmo vale para turco, hindi ou árabe. Os agentes consultam primeiro o seu CRM e depois respondem nesse idioma." },
    { q: 'Posso criar meu próprio agente de IA para WhatsApp?', a: 'Sim. Com o Agent Builder, alguém do seu time de operações, sem experiência em programação, monta um agente para renovações, onboarding ou dúvidas de preço. Ele aprende com o seu próprio histórico de conversas.' },
    { q: 'Quanto tempo leva a configuração?', a: 'Uns 2 minutos. Você adiciona a extensão do Chrome, conecta o CRM e ativa os agentes que quiser. Não precisa de desenvolvedor nem de número novo.' },
    { q: 'Existe teste grátis?', a: "Sim. Todos os planos começam com um teste grátis de 4 dias, incluindo o Basic AI com os agentes. Você instala a extensão do Chrome, conecta o CRM e deixa os agentes trabalharem nas suas conversas reais, para avaliar o resultado nas suas próprias conversas antes de pagar." },
  ],
  finalCta: {
    h2: 'Deixe um agente de IA cuidar',
    h2Em: 'das suas conversas mais movimentadas',
    body: 'Comece o teste grátis de 4 dias e suas primeiras conversas vão estar sincronizando em poucos minutos. Se preferir ver antes no seu próprio pipeline, agende uma demo.',
    primary: 'Teste grátis por 4 dias',
    secondary: 'Agendar demo',
  },
}

const tr: AiAgentPageContent = {
  meta: {
    title: "WhatsApp Yapay Zeka Asistanı: Satış ve CRM Ajanı | Eazybe",
    description:
      "Lead'leri 7/24 nitelendiren, bekleyen satışları takip eden ve her sohbeti HubSpot'a kaydeden Yapay Zeka ajanları. Mevcut numaranızla 4 gün ücretsiz.",
    ogTitle: 'Satış ve destek ekipleri için WhatsApp Yapay Zeka ajanları',
    ogDescription:
      "Ekibinizin zaten kullandığı WhatsApp'ta çalışan ve her müşteriyi hatırlayan beş Yapay Zeka ajanı: CRM senkronu, lead puanlama, takipler ve destek.",
  },
  breadcrumb: { home: 'Ana Sayfa', current: 'WhatsApp Yapay Zeka Ajanı' },
  hero: {
    tag: 'WhatsApp Yapay Zeka Ajanları',
    h1Lead: 'Satış ve destek ekipleri için',
    h1Highlight: 'WhatsApp Yapay Zeka ajanları',
    subtitle:
      "Temsilcileriniz zaten WhatsApp'ta satış yapıyor. Eazybe ajanları aynı sohbetlerde çalışır: yeni lead'leri puanlar, mesai dışında gelen destek sorularını yanıtlar ve her konuşmayı CRM'inize yazar. Kimse uygulama değiştirmez, kimse not tutmak zorunda kalmaz.",
    chips: ['Kişisel WhatsApp', 'Business App', 'Cloud API', 'Taşıma yok'],
    ctaPrimary: '4 gün ücretsiz dene',
    ctaSecondary: 'Demo planla',
    footnote: '4 günlük ücretsiz deneme. Kurulum yaklaşık 2 dakika sürer ve geliştiriciye ihtiyacınız olmaz.',
  },
  answer: {
    h2: 'WhatsApp Yapay Zeka ajanı nedir?',
    p: "WhatsApp Yapay Zeka ajanı, bir işletme adına WhatsApp mesajlarını okuyup yanıtlayan bir yazılımdır. Chatbot bir senaryoyu izler ve müşteri senaryonun dışına çıktığında takılır. Yapay Zeka ajanı ise müşterinin gerçekte ne yazdığını büyük bir dil modeliyle anlar; bu sayede bir lead'i nitelendirebilir, bir destek sorusunu yanıtlayabilir ya da CRM'deki bir fırsatı güncelleyebilir ve gerektiğinde sohbeti bir insana devreder.",
  },
  facts: [
    { value: '30.000+', label: 'Kullanıcı' },
    { value: '40+', label: 'Ülke' },
    { value: '4,2★', label: 'Chrome Web Store (1.100 değerlendirme)' },
    { value: '4,3★', label: 'HubSpot Marketplace' },
    { value: '2 dk', label: 'Kurulum süresi' },
    { value: '4 gün', label: 'Ücretsiz deneme' },
  ],
  agents: {
    h2: 'Beş hazır ajan,',
    h2Em: 'artı sizinki',
    subtitle: "Her ajan tek bir işi üstlenir ve hepsi aynı müşteri geçmişini okur; destek ajanı, lead'in geçen hafta satışa ne anlattığını bilir. Başlamak için iyi bir yer CRM Sync ve Lead Qualification'dır; bu ikisi işe yaramaya başladığında diğerlerini eklersiniz.",
    cards: [
      { id: 'crm-sync', name: 'CRM Sync Agent', desc: "Her WhatsApp sohbetini HubSpot, Salesforce, Zoho, Pipedrive ve diğer CRM'lerde doğru kişiye, fırsata ve şirkete kaydeder. Temsilcileriniz kopyala-yapıştır yapmayı bırakır." },
      { id: 'lead-qualification', name: 'Lead Qualification Agent', desc: "Gelen her mesajı BANT, MEDDIC ya da kendi kriterlerinizle puanlar. Sıcak lead'ler doğrudan en iyi satışçınıza gider." },
      { id: 'revenue', name: 'Revenue Agent', desc: '48 saattir ilerlemeyen fırsatları bulur ve o temsilcinin yazacağı gibi bir takip mesajı hazırlar.' },
      { id: 'customer-success', name: 'Customer Success Agent', desc: 'Destek sorularını bilgi tabanınızdan, günün her saatinde ve müşteri hangi dilde yazdıysa o dilde yanıtlar. Yardımcı olamadığında bir insan, sohbetin tamamı önündeyken devralır.' },
      { id: 'ctwa', name: 'CTWA Agent', desc: "WhatsApp'a tıklama reklamından başlayan her konuşmayı puanlar; böylece zaten satın almayacak kişilere retargeting yapmayı bırakabilirsiniz. Custom AI planının parçasıdır." },
      { id: 'agent-builder', name: 'Agent Builder', desc: 'Diğer beşinin kapsamadığı işler için, örneğin yenileme hatırlatmaları ya da fiyat soruları. Kod yazmadan kurarsınız ve kendi sohbet geçmişinizden öğrenir.' },
    ],
  },
  memory: {
    h2: 'Tek hafıza neden önemli',
    body:
      "Bir chatbot'un pazartesi nitelendirdiği bir lead düşünün. Cuma günü desteğe yazıyor ve başka bir araç ondan her şeyi baştan anlatmasını istiyor. CRM'inizin iki konuşmadan da haberi yok. Eazybe ajanları aynı müşteri kaydını okur ve aynı kayda yazar; bu yüzden böyle bir şey yaşanmaz.",
    points: [
      "Destek ajanı, lead'in satışa ne anlattığını zaten bilir",
      "Ajanların yaptığı her şey, ekibinizin zaten baktığı CRM'e kaydedilir",
      'Bir insan devraldığında konuşmanın tamamı da onunla gelir',
    ],
  },
  compare: {
    h2: 'WhatsApp Yapay Zeka ajanı ile chatbot karşılaştırması',
    subtitle: "Chatbot bir karar ağacıdır. Müşteri onun için tasarlanmadığı bir şey sorana kadar çalışır. Yapay Zeka ajanı ise mesajın tamamını okur, CRM'inize bakar, sonra yanıtlar ya da fırsatı günceller. Fark, kimsenin önceden düşünmediği mesajlarda ortaya çıkar.",
    head: ['', 'Eazybe Yapay Zeka ajanı', 'Kural tabanlı chatbot'],
    rows: [
      ['Nasıl yanıtlar', 'Serbest mesajları büyük bir dil modeliyle anlar', 'Sabit senaryoları ve buton menülerini izler'],
      ['Senaryo dışı sorular', 'Bilgi tabanınız ve sohbet geçmişinizle yanıtlar', '"Üzgünüm, anlayamadım" der'],
      ['Lead nitelendirme', 'Niyeti BANT, MEDDIC ya da kendi kurallarınızla puanlar', 'Hep aynı soru listesini sorar'],
      ['CRM güncellemeleri', 'Sohbetleri kaydeder ve fırsatları kendisi günceller', 'Genellikle ayrı bir entegrasyon gerekir'],
      ['İnsana devir', 'Konuşmanın tamamını aktarır', 'Temsilci çoğu zaman sıfırdan başlar'],
      ['WhatsApp hesapları', 'Kişisel WhatsApp, Business App ve Cloud API', 'Genellikle yalnızca Cloud API'],
    ],
  },
  how: {
    tag: 'Kurulum',
    h2: "WhatsApp Yapay Zeka ajanı nasıl kurulur?",
    subtitle: "Hiçbir şeyi taşımazsınız, yeni numara da almazsınız. Uzantı WhatsApp Web'in üzerinde çalışır, CRM'iniz tek tıkla bağlanır ve ajanlar zaten var olan sohbetlerinizden öğrenir. Kurulum süresinin çoğu hangi ajanları açacağınıza karar vermekle geçer.",
    steps: [
      { title: 'Chrome uzantısını ekleyin', desc: "Temsilcilerinizin gün boyu açık tuttuğu sekme olan WhatsApp Web'in üzerinde çalışır." },
      { title: "CRM'inizi bağlayın", desc: 'HubSpot, Salesforce ve Zoho için tek tık yeterli. Kopyalanacak API anahtarı yok.' },
      { title: 'İstediğiniz ajanları açın', desc: 'Sohbet geçmişinizden ve bilgi tabanınızdan öğrenirler. Bir insanın ne zaman devreye gireceğine siz karar verirsiniz.' },
    ],
  },
  fits: {
    h2: "WhatsApp'ta satış yapan ekipler için",
    subtitle: "Satışlarınız WhatsApp sohbetlerinde başlayıp kapanıyor ama CRM yarı boş kalıyorsa, bu ekibiniz için yapıldı. Aşağıda bir ajanın insanların üzerinden en çok iş aldığı üç durumu ve her birinde neyin değiştiğini bulabilirsiniz.",
    cards: [
      { title: "CRM'i olan satış ekipleri", desc: "Satışlar WhatsApp'ta konuşulurken CRM'de hiçbir şey görünmez ve yöneticiler temsilcilerin peşinde güncelleme ister. CRM Sync Agent bu kayıtları sohbetler sürerken doldurur." },
      { title: "WhatsApp'a tıklama reklamı verenler", desc: 'Sadece merak edenler dahil, reklamdan gelen her konuşma için ödeme yaparsınız. Niyet puanlama, onlara daha fazla harcamadan kimin kim olduğunu gösterir.' },
      { title: 'Mesai dışı destek', desc: "Müşteriler gece 11'de ve pazar günleri yazar. Customer Success Agent yanıtlayabildiklerini yanıtlar; sabah vardiyası, çözülemeyenlerin kısa bir listesiyle başlar." },
    ],
  },
  logos: {
    "label": "Şu şirketlerin satış ve destek ekipleri kullanıyor"
  },
  demo: {
    "tag": "Çalışırken görün",
    "h2": "Ajanları",
    "h2Em": "iş başında izleyin",
    "subtitle": "İlk klip doğrudan üründen: Revenue Agent, bir temsilciye ihtiyaç duyan sohbetleri işaretliyor. Altındaki kart ise sıcak bir lead yazdığında temsilcinin ne gördüğünü, ajanın yakaladığı sinyalleri ve lead'i kime gönderdiğini gösteriyor.",
    "radar": {
      "title": "Revenue Agent: sessizleşen satışlar soğumadan işaretlenir",
      "desc": "Ajan açık olan her konuşmayı okur ve birinin ilgilenmesi gerekenleri işaretler. Videoda üçünü yakalıyor: söz verilip gönderilmeyen bir fiyat, kaçırılan bir takip ve iki gündür yanıt alamayan bir alıcı.",
      "points": [
        "48 saat ve üzeri bekleyen satışları, sahibi olan temsilciyle birlikte işaretler",
        "Takip mesajını o temsilcinin üslubuyla hazırlar"
      ],
      "videoLabel": "Revenue Agent, fiyatı gönderilmemiş, takibi kaçırılmış ve iki gündür yanıtsız WhatsApp sohbetlerini işaretliyor"
    },
    "lead": {
      "title": "Lead Qualification Agent: sıcak lead'ler önce en iyi satışçıya gider",
      "desc": "Gelen her mesaj, sohbet sürerken puanlanır. Bir lead bütçe, ihtiyaç ve zamanlama gösterdiğinde ajan onu konuşmanın tamamıyla birlikte en iyi satışçınıza aktarır.",
      "points": [
        "BANT, MEDDIC ya da kendi kriterlerinizle puanlar",
        "Bir sonraki nitelendirme sorusunu sizin yerinize sorar",
        "Puana, bölgeye ya da ürün grubuna göre yönlendirir"
      ],
      "chat": [
        {
          "from": "lead",
          "text": "Merhaba, 12 kişilik satış ekibimiz için HubSpot'ta WhatsApp'a ihtiyacımız var. Bu ay başlayabilir miyiz?"
        },
        {
          "from": "agent",
          "text": "Evet, bu ay mümkün. Sizde yeni araçları kim onaylıyor?"
        },
        {
          "from": "lead",
          "text": "Ben, satıştan sorumluyum. Bütçe de onaylandı."
        }
      ],
      "scoreLabel": "Lead puanı",
      "scoreValue": "Sıcak",
      "signals": [
        {
          "label": "Bütçe onaylı",
          "ok": true
        },
        {
          "label": "Karar verici",
          "ok": true
        },
        {
          "label": "İhtiyaç: 12 kullanıcı",
          "ok": true
        },
        {
          "label": "Zamanlama: bu ay",
          "ok": true
        }
      ],
      "routed": "Sohbetin tamamıyla en iyi satışçınıza gönderildi"
    }
  },
  proof: {
    "h2": "Gerçek bir müşteriden",
    "h2Em": "gerçek rakamlar",
    "subtitle": "Lokmax, Brezilya genelinde kompakt iş makineleri kiralıyor ve satışlarının çoğunu WhatsApp'ta kapatıyor. Temsilciler kendi sohbetlerinde pazarlık ederken HubSpot boş aktivite kayıtları gösteriyordu. Eazybe ile ikisini bağladıktan sonra paylaştıkları rakamlar şunlar.",
    "caseMeta": "Ekipman kiralama · Brezilya · 5.000'den fazla müşteri",
    "metrics": [
      {
        "value": "24-48 sa → 3 sa altı",
        "label": "Teklif gönderme süresi"
      },
      {
        "value": "%70 daha hızlı",
        "label": "Müsaitlik onayları"
      },
      {
        "value": "Tüm geçmiş",
        "label": "Her devirde aktarılır, müşteri projesini tekrar anlatmaz"
      }
    ],
    "caseCta": "Lokmax hikâyesini okuyun",
    "ratings": [
      {
        "value": "4,2★",
        "label": "1.100 değerlendirmeden",
        "source": "Chrome Web Store",
        "href": "https://chromewebstore.google.com/detail/eazybe-crm-sync-ai-assist/clgficggccelgifppbcaepjdkklfcefd/reviews"
      },
      {
        "value": "4,3★",
        "label": "77 incelemeden",
        "source": "HubSpot Marketplace",
        "href": "https://ecosystem.hubspot.com/marketplace/listing/whatsapp-eazybe"
      },
      {
        "value": "30.000+",
        "label": "40'tan fazla ülkede kullanıcı",
        "source": "Chrome Web Store",
        "href": "https://chromewebstore.google.com/detail/eazybe-crm-sync-ai-assist/clgficggccelgifppbcaepjdkklfcefd/reviews"
      }
    ]
  },
  strip: [
    "Kişisel WhatsApp'ta çalışır",
    "2 dakikada kurulum",
    "4 günlük ücretsiz deneme",
    "Sohbeti bir insana devreder",
    "HubSpot, Salesforce, Zoho ve dahası",
    "Her saatte yanıt verir",
    "Yeni numara gerekmez"
  ],
  pricing: {
    h2: 'WhatsApp Yapay Zeka ajanı ne kadar?',
    body: "Yapay Zeka ajanları Basic AI planı ve üzerindeki planlarla gelir. Önce herhangi bir planı 4 gün ücretsiz deneyebilirsiniz.",
    plan: 'Basic AI',
    yearly: 'WhatsApp numarası başına aylık 59 $, yıllık faturalandırma',
    monthly: 'Aylık öderseniz numara başına aylık 79 $',
    included: '5 kullanıcı dahil',
    custom: "Custom AI; CTWA Agent, sesli Yapay Zeka aramaları ve 100'den fazla entegrasyon ekler, fiyatı ekibinize göre belirlenir",
    note: 'Fiyatlar ABD doları cinsindendir. Fiyatlandırma sayfası bunları yerel para biriminizde gösterir.',
    cta: 'Tüm planları gör',
  },
  related: {
    h2: 'Yapay Zeka ajanları hakkında daha fazlası',
    subtitle: "Eazybe blogu bu sayfaya sığmayan ayrıntılara iner: bankacılık, sigorta, gayrimenkul ve destek için Yapay Zeka ajanları, ayrıca sesli ajanların bir temsilci aramadan önce lead'leri nasıl nitelendirdiği. Sektörünüze en yakın rehberle ya da chatbot karşılaştırmasıyla başlayın.",
  },
  faqTitle: 'WhatsApp Yapay Zeka ajanı hakkında SSS',
  faqIntro:
    "Satış ve destek yöneticilerinin bir ajanı açmadan önce bize en çok sorduğu sorular bunlar: ne kadar tuttuğu, numaralarının risk altında olup olmadığı, hangi CRM'lerle çalıştığı ve kurulumun gerçekte ne kadar sürdüğü. Kısaca: yıllık faturalandırmada numara başına aylık 59 $, yaklaşık 2 dakikalık kurulum ve kendi sohbetlerinizde görmeniz için 4 günlük ücretsiz deneme.",
  faq: [
    { q: 'WhatsApp Yapay Zeka ajanı nedir?', a: "Bir işletme adına WhatsApp mesajlarını okuyup yanıtlayan bir yazılımdır. Büyük bir dil modeliyle lead'leri nitelendirir, destek sorularını yanıtlar ve CRM'inizi günceller; gerektiğinde sohbeti bir insana devreder." },
    { q: "Yapay Zeka ajanının chatbot'tan farkı nedir?", a: "Chatbot bir senaryoyla çalışır, bu yüzden müşteri beklenmedik bir şey sorduğunda takılır. Yapay Zeka ajanı serbest mesajları anlar, bilgi tabanınız ve sohbet geçmişinizle yanıtlar ve öğrendiklerine göre işlem yapar; örneğin bir lead'i puanlar ya da CRM'deki bir fırsatı günceller." },
    { q: "Eazybe, Meta'nın kendi WhatsApp Business Yapay Zeka ajanından nasıl ayrılır?", a: "Meta'nın ajanı müşterileri WhatsApp içinde yanıtlar. Eazybe ise satış hattınız etrafında kurulmuştur. Business App ve Cloud API'nin yanı sıra kişisel WhatsApp'ta da çalışır ve her sohbeti HubSpot, Salesforce ya da Zoho'ya kaydeder. Ayrıca ajanlar yeni lead'leri puanlar ve sessizleşen satışları işaretler; beşi de her müşterinin tek hafızasını paylaştığı için satış ve destek aynı geçmişi görür." },
    { q: 'WhatsApp Yapay Zeka ajanı ne kadar?', a: "Yapay Zeka ajanları Basic AI planıyla başlar: yıllık faturalandırmada WhatsApp numarası başına aylık 59 $, aylık faturalandırmada 79 $; 5 kullanıcı dahildir. Custom AI'ın fiyatı ekibinize göre belirlenir. Tüm planlarda 4 günlük ücretsiz deneme vardır." },
    { q: "Eazybe'yi kimler kullanıyor ve ekipler hangi sonuçları gördü?", a: "40'tan fazla ülkede 30.000'den fazla kişi Eazybe kullanıyor; aralarında Physics Wallah ve University Living'in satış ekipleri de var. Chrome Web Store'da 1.100 değerlendirmeyle 5 üzerinden 4,2, HubSpot Marketplace'te 77 incelemeyle 4,3 puana sahip. Yayınlanmış bir örnek: Brezilya'da iş makinesi kiralayan Lokmax, WhatsApp'ı HubSpot'a bağladıktan sonra teklif gönderme süresini 24-48 saatten 3 saatin altına indirdi." },
    { q: 'Ajanları kullanmak için WhatsApp Business API gerekli mi?', a: "Hayır. Eazybe kişisel WhatsApp, WhatsApp Business App ve Cloud API ile çalışır; numaralarınızı ve sohbet geçmişinizi korursunuz." },
    { q: 'Chrome uzantısı numaramın yasaklanmasına yol açar mı?', a: 'Numaralar, resmi olmayan otomasyonla yapılan toplu gönderimler yüzünden yasaklanır. Eazybe uzantısı, temsilcilerinizin zaten yürüttüğü sohbetlerin üzerinde çalışır; toplu mesajlar ise resmi Cloud API üzerinden gider.' },
    { q: "Ajanlar hangi CRM'lerle çalışıyor?", a: 'HubSpot, Salesforce, Zoho, Pipedrive, Bitrix24, LeadSquared, Freshworks, monday.com ve Google Sheets. Diğerleri için webhook destekli özel bir API var.' },
    { q: 'Ajanlar hangi dilleri konuşuyor?', a: "Müşteri hangi dilde yazarsa o dilde. Türkçe yazan Türkçe yanıt alır, İspanyolca yazan İspanyolca; Portekizce, Hintçe ya da Arapça için de aynısı geçerlidir. Ajanlar önce CRM'inize bakar, sonra o dilde yanıt verir." },
    { q: 'Kendi WhatsApp Yapay Zeka ajanımı kurabilir miyim?', a: 'Evet. Agent Builder ile operasyon ekibinizden kodlama bilmeyen biri bile yenilemeler, onboarding ya da fiyat soruları için bir ajan kurabilir. Ajan kendi sohbet geçmişinizden öğrenir.' },
    { q: 'Kurulum ne kadar sürer?', a: "Yaklaşık 2 dakika. Chrome uzantısını eklersiniz, CRM'inizi bağlarsınız ve istediğiniz ajanları açarsınız. Geliştiriciye ya da yeni bir numaraya ihtiyacınız olmaz." },
    { q: 'Ücretsiz deneme var mı?', a: "Evet. Ajanların bulunduğu Basic AI dahil tüm planlar 4 günlük ücretsiz denemeyle başlar. Chrome uzantısını kurar, CRM'inizi bağlar ve ajanları gerçek sohbetlerinizde çalıştırırsınız; böylece ödeme yapmadan önce onları kendi konuşmalarınızla değerlendirirsiniz." },
  ],
  finalCta: {
    h2: 'En yoğun sohbetlerinizi',
    h2Em: 'bir Yapay Zeka ajanına bırakın',
    body: '4 günlük ücretsiz denemeyi başlatın, ilk sohbetleriniz birkaç dakika içinde senkronize olmaya başlasın. Önce kendi satış hattınızda görmek isterseniz bir demo planlayın.',
    primary: '4 gün ücretsiz dene',
    secondary: 'Demo planla',
  },
}

export const AI_AGENT_CONTENT_BY_LOCALE: Record<string, AiAgentPageContent> = { en, br, es, tr }

export function getAiAgentPageContent(locale: string): AiAgentPageContent {
  return AI_AGENT_CONTENT_BY_LOCALE[locale] ?? en
}
