/**
 * Copy for /whatsapp-crm (paid search, CRM ↔ WhatsApp).
 *
 * Every visible string lives here so a pt-BR file can be dropped in later
 * without touching a component. Two segments are known to run long in
 * Portuguese — the ANALYTICS card (+12%) and "Into your CRM" in §5 (+16%) —
 * so both containers are built with flexible height.
 */

export const CRM_OPTIONS = [
  'HubSpot',
  'Pipedrive',
  'Zoho',
  'Bitrix24',
  'Salesforce',
  'Other / none yet',
] as const

/**
 * §1 logo strip — reordered per variant so the visitor's CRM leads.
 * Marks are the ones the integration pages already ship, under
 * /public/integrations/. Full colour: a buyer scanning for their own CRM
 * spots HubSpot orange or Salesforce blue faster than they read a word.
 */
export const CRM_LOGOS = [
  { name: 'HubSpot', src: '/integrations/hubspot.svg' },
  { name: 'Pipedrive', src: '/integrations/pipedrive.svg' },
  { name: 'Zoho', src: '/integrations/zoho.svg' },
  { name: 'Bitrix24', src: '/integrations/bitrix.svg' },
  { name: 'Salesforce', src: '/integrations/salesforce.svg' },
] as const

const en = {
  meta: {
    title: 'WhatsApp CRM Integration — sync every chat to HubSpot, Pipedrive, Zoho | Eazybe',
    description:
      "Every WhatsApp chat, file and voice note synced to your CRM automatically. Reps keep their own number and phone. Connect your CRM in minutes.",
  },

  nav: { cta: 'Connect my CRM' },

  /** Destination for the lead form. Same portal/form for every locale. */
  hubspot: {
    portalId: '40009480',
    formId: 'db0e26e2-b980-4881-956e-4cdcb452df65',
    region: 'na1',
  },

  hero: {
    // "your CRM" is swapped for the CRM name on a ?crm= variant.
    h1Lead: 'WhatsApp conversations, inside',
    h1Crm: 'your CRM',
    h1Tail: '— without changing your number',
    h2: 'Every chat, file and voice note synced automatically to HubSpot, Pipedrive, Zoho, Bitrix24 or Salesforce. Your reps keep using WhatsApp on their own phones — nothing changes in their day.',
    cta: 'Connect my CRM',
    microcopy: 'No credit card. Setup takes minutes, not an IT project.',
    // In-fold objections, answered before the form is touched.
    bullets: [
      'Same number, same phone — nothing for reps to adopt',
      'Live the same day, not an IT project',
      'Personal chats never sync. Labels decide what does.',
    ],
    stackTitle: 'All CRMs',
    stackNote: 'Connected natively',
  },

  form: {
    // Header inside the form card. States what happens next rather than
    // repeating the button label sitting right below it.
    /** Where a successful submit lands. Off-domain, so it is a full navigation. */
    thankYouUrl: 'https://eazybe.info/m2v',
    title: 'Connect your CRM',
    subtitle: "Tell us where your WhatsApp chats should land. We'll be in touch today.",
    email: 'Work email',
    phone: 'Phone number',
    crm: 'Your CRM',
    crmPlaceholder: 'Select',
    errors: {
      email: 'Please enter a valid email address.',
      // Same rule the site's other lead forms enforce (LeadGenerationForm,
      // TrialModal, DemoModal) — the field says "Work email", so it has to
      // mean it, and the message has to say which rule was broken.
      emailPersonal: 'Please use your work email, not a personal address.',
      phone: 'Please enter a valid phone number.',
      phoneShort: 'That number looks too short — include the area code.',
      crm: 'Please pick your CRM.',
    },
    country: 'Country',
    crmOptions: CRM_OPTIONS.map(String),
    // Empty disables the gate: "Other / none yet" submits like any other
    // option. Set this back to 'Other / none yet' to block the submit and
    // surface `noCrmNote` instead.
    noCrmValue: '',
    noCrmNote: 'Eazybe connects to a CRM you already run. Pick yours above, or talk to us and we will help you choose one.',
    sending: 'Connecting…',
    success: {
      title: "Got it — we'll be in touch today.",
      body: 'Check your inbox for the connection link. If you would rather talk first, reply to that email and we will call.',
      // The redirect goes to WhatsApp, so say so — an unannounced jump into
      // another app reads as a hijack, not a hand-off.
      redirecting: 'Opening WhatsApp…',
    },
    error: 'Something went wrong. Please try again.',
  },

  socialProof: {
    heading: 'Already running WhatsApp through their CRM',
    /**
     * The same cleared customer logos the homepage marquee uses
     * (src/components/landing/LogoBar.tsx) — real accounts, already
     * approved for public use, self-hosted under /public/clients/.
     * No Brazilian logo exists in this set yet; add one first when it does,
     * since the campaign targets BR.
     */
    logos: [
      { src: '/clients/university-living-logo.svg', alt: 'University Living' },
      { src: '/clients/pw-logo.svg', alt: 'Physics Wallah' },
      { src: '/clients/satrack-logo.svg', alt: 'Satrack' },
      { src: '/clients/orbidi-logo.svg', alt: 'Orbidi' },
      { src: '/clients/travclan-logo.svg', alt: 'TravClan' },
      { src: '/clients/wanderon-logo.svg', alt: 'WanderOn' },
      { src: '/clients/uniacco-logo.svg', alt: 'Uniacco' },
      { src: '/clients/kreedo-logo.svg', alt: 'Kreedo' },
    ],
  },

  value: {
    heading: 'Everything on WhatsApp — finally visible, measurable and yours',

    /**
     * Four sections, not four cards. Each one pairs its claim with a visual
     * that demonstrates that exact claim — `visual` selects which.
     * Every supporting point restates something already asserted elsewhere
     * on this page; nothing here is a new capability claim.
     */
    sections: [
      {
        id: 'visibility',
        visual: 'sync' as const,
        eyebrow: 'Visibility',
        title: "Nothing lives on a rep's phone anymore",
        lead: 'Every chat, voice note and file lands on the contact and the deal automatically, the moment it happens. Open any record and read the whole relationship — first message to last — without asking anyone to forward you a screenshot.',
        points: [
          'Messages, attachments and voice notes attach to the right record',
          'Labels decide what syncs. Unlabelled threads never leave the phone.',
          'Runs on the number the rep already uses',
        ],
      },
      {
        id: 'analytics',
        visual: 'activity' as const,
        eyebrow: 'Analytics',
        title: "Know who's actually working",
        lead: 'Messages sent, unreplied chats, average response time — per rep, per day. This is the activity layer your CRM never had, because the work was happening in an app it could not see.',
        points: [
          'Messages sent and average response time, broken down by rep',
          'Unreplied chats surfaced before the customer gives up waiting',
          'Compare a week to the week before it',
        ],
      },
      {
        id: 'control',
        visual: 'promise' as const,
        eyebrow: 'Control',
        title: "Catch the problem while it's still fixable",
        lead: 'The discount nobody approved. The deadline nobody can meet. The objection that never made it into the CRM. You can read what was actually promised while there is still time to do something about it.',
        points: [
          'Read the thread behind any deal, not a summary of it',
          'Spot the commitment before it reaches the invoice',
          'Step in before it becomes a lost deal, not after',
        ],
      },
      {
        id: 'ownership',
        visual: 'handover' as const,
        eyebrow: 'Ownership',
        title: 'Reps leave. Customers stay.',
        lead: 'When someone resigns, the relationship does not walk out with their phone. The history belongs to the company. Reassign the chat and whoever picks it up sees everything that came before.',
        points: [
          'Conversation history stays on the record, not the handset',
          'Reassign an account without losing context',
          'The new owner reads the full thread on day one',
        ],
      },
    ],

    cta: 'Put WhatsApp in my CRM',
  },

  differentiator: {
    heading: "Customers don't reply to businesses. They reply to people.",
    kicker: "Three lines. That's it.",
    lines: [
      { text: 'Move to a business platform → replies dry up.', resolved: false },
      { text: 'Stay on regular WhatsApp → no automation, no sync, no scale.', resolved: false },
      { text: 'Eazybe runs both on the same number, at the same time.', resolved: true },
    ],
    subline:
      "Reps chat from their own phone, exactly like today. You get broadcasts, workflows and full CRM sync on top — on an official connection that won't get the number banned.",
    table: {
      headLeft: "The trade-off you've been stuck with",
      headRight: 'With Eazybe',
      rows: [
        ['Business platform — replies dry up', 'Reps chat from their own phone'],
        ['Regular WhatsApp — no automation', 'Broadcasts, workflows, CRM sync'],
        ['Unofficial tools — number banned', 'Official, compliant connection'],
        ['New number — customers lost', 'The number you already have'],
      ] as const,
    },
    cta: 'I Want Both',
  },

  /**
   * Sits between the differentiator and speed-to-lead, framing the problem
   * that section then answers. Copy is written against what the animation
   * actually shows — unread chats stacking up — rather than around a feature
   * name, so it stays true whatever the clip's second half demonstrates.
   */
  /**
   * Sits between the differentiator and speed-to-lead, framing the problem
   * that section answers. Copy is written against exactly what the clip
   * shows — per-chat flags attributed to a named rep — so nothing here
   * claims more than the visual demonstrates.
   */
  radar: {
    eyebrow: 'Unanswered',
    heading: 'The deals you are losing are sitting in unread chats',
    lead: 'Nobody decided to ignore them. A rep was in a meeting, the message arrived at 19:40, and by morning it was buried under forty newer ones. The pipeline still says the deal is open.',
    points: [
      'No reply in two days, flagged on the conversation itself',
      'Pricing asked for and never sent. Follow-up promised and missed.',
      'Each one named to the rep who owns it, visible to their manager',
    ],
    media: {
      webm: '/whatsapp-crm/bea-radar.webm',
      mp4: '/whatsapp-crm/bea-radar.mp4',
      poster: '/whatsapp-crm/bea-radar-poster.jpg',
      alt: 'WhatsApp chat list with flags on unanswered conversations — no reply for two days, pricing not shared, missed follow-up — each named to the rep responsible',
      width: 760,
      height: 760,
    },
  },

  speed: {
    heading: 'Every lead answered in seconds. Even at 2am.',
    subline:
      'A deal marked "in progress" and a message unread since Friday are the same deal.',
    blocks: [
      { title: 'Instant reply', body: 'AI answers the second a lead messages. Nights, weekends, mid-meeting.' },
      { title: 'Pre-qualified', body: 'Budget, intent, timeline — captured before a rep opens it.' },
      { title: 'Into your CRM', body: 'Contact created. Fields filled. Deal staged.' },
      { title: 'Instant handover', body: 'A rep takes over mid-chat. The customer never notices.' },
    ],
    closing: 'The first reply wins the deal. Yours is always first.',
    cta: 'Reply While You Sleep',
  },


  /**
   * §4 — the four numbers that carry the decision. `tag` is the small mono
   * label above each one; naming the category beats numbering them "Reason 1"
   * because the label then tells you something.
   */
  why: {
    eyebrow: 'Why Eazybe',
    heading: 'The whole decision, in four numbers',
    subline:
      'No new number, no migration, no six-week rollout. This is what changes the day WhatsApp starts running through your CRM.',
  },

  stats: [
    { tag: 'Reach', value: '40+', label: 'countries running WhatsApp through their CRM', tbd: true },
    { tag: 'Integrations', value: 'All', label: 'CRMs connected natively, plus API and webhook', tbd: false },
    { tag: 'Setup', value: 'Same day', label: 'from install to first synced conversation', tbd: false },
    { tag: 'Migration', value: '0', label: 'numbers migrated — reps keep what they have', tbd: false },
  ],

  /**
   * §3 hero shot — real product footage, replacing the hand-built interface
   * mock. Native 1112x492, so it renders 1:1 in the content column.
   */
  productClip: {
    webm: '/whatsapp-crm/product.webm',
    mp4: '/whatsapp-crm/product.mp4',
    poster: '/whatsapp-crm/product-poster.jpg',
    alt: 'Eazybe inside WhatsApp: the conversation on the left, and an Eazybe AI Analysis panel on the right where the AI has filled in conversation state, urgency, stage and intent, then written a short summary of what the rep needs to do next',
    caption: 'Eazybe reading a live conversation, filling the CRM fields beside it and summarising what to do next.',
    width: 1112,
    height: 492,
  },

  /**
   * The routing picture. Every label below restates a claim already made
   * elsewhere on this page — nothing here asserts a capability the rest of
   * the page does not already stand behind.
   */
  sync: {
    heading: 'Every conversation routed into the system you already run',
    features: [
      'Real-time sync',
      'Labels decide what syncs',
      '5 CRMs natively, plus API',
    ],
  },

  /**
   * §10 — the three published quotes that answer THIS page's argument:
   * CRM sync, no copy-paste, same-day setup. Taken verbatim from
   * messages/en.json (landingV3.customerStories), already live on the
   * homepage — not rewritten, because evaluators cross-check these.
   *
   * `photo` currently points at the SAME portraits the homepage shows for
   * these three people (CustomerStories.tsx maps randomuser.me images to
   * the same quotes), downloaded and self-hosted so a paid page never
   * depends on a third-party API at render time.
   *
   * They are stock faces, not the actual customers. Swap them for cleared
   * headshots when you have them — the field takes any path, and an empty
   * string falls back to initials.
   */
  testimonials: {
    heading: 'Teams that stopped guessing',
    items: [
      {
        initials: 'PS',
        photo: '/avatars/priya.jpg' as string,
        quote:
          'Our HubSpot was a graveyard. Eazybe brought it back to life — every WhatsApp deal now flows in automatically.',
        name: 'Priya Sharma',
        role: 'Sales Ops Lead · SaaS · India',
      },
      {
        initials: 'DF',
        photo: '/avatars/diego.jpg' as string,
        quote:
          'My reps stopped copy-pasting chats into Salesforce. That alone paid for the year.',
        name: 'Diego Fernández',
        role: 'Sales Director · Real Estate · Spain',
      },
      {
        initials: 'CO',
        photo: '/avatars/camila.jpg' as string,
        quote:
          'Setup took 12 minutes. Twelve. Our CRM rollout took six months.',
        name: 'Camila Ortiz',
        role: 'Head of RevOps · Logistics · Mexico',
      },
    ],
  },

  /** Strings inside the four interface mocks. */
  visuals: {
    /**
     * Three metrics, four reps. Every total is the sum (or mean) of the rep
     * values beside it — 142+97+88+31 = 358, 1+2+3+6 = 12, and the four
     * response times average to 4m 12s — so a visitor who checks the maths
     * finds it holds. `value` drives bar length, `display` is what is read.
     * All illustrative, and the caption says so.
     */
    activity: {
      metrics: [
        {
          id: 'sent', label: 'Messages sent', total: '358', higherIsBetter: true,
          reps: [
            { name: 'Ana', value: 142, display: '142' },
            { name: 'Bruno', value: 97, display: '97' },
            { name: 'Camila', value: 88, display: '88' },
            { name: 'Diego', value: 31, display: '31' },
          ],
        },
        {
          id: 'unreplied', label: 'Unreplied chats', total: '12', higherIsBetter: false,
          reps: [
            { name: 'Ana', value: 1, display: '1' },
            { name: 'Bruno', value: 2, display: '2' },
            { name: 'Camila', value: 3, display: '3' },
            { name: 'Diego', value: 6, display: '6' },
          ],
        },
        {
          id: 'avg', label: 'Avg response', total: '4m 12s', higherIsBetter: false,
          reps: [
            { name: 'Ana', value: 65, display: '1m 05s' },
            { name: 'Bruno', value: 160, display: '2m 40s' },
            { name: 'Camila', value: 260, display: '4m 20s' },
            { name: 'Diego', value: 525, display: '8m 45s' },
          ],
        },
      ],
    },
    contact: 'Contact · Marina Alves',
    messages: '3 messages',
    voice: 'Voice note · 0:24',
    file: 'proposal-v2.pdf',
    today: 'Today',
    synced: 'Synced',
    team: 'Team activity · last 7 days',
    byRep: 'Messages sent · by rep',
    illustrative: 'Illustrative figures — the report renders your reps and your numbers.',
    deal: 'Deal · Enterprise plan · 12 seats',
    objection: 'Honestly the price is above what we budgeted for this quarter.',
    reply: 'No problem —',
    promise: 'I can do 25% off if you sign by Friday.',
    sentBy: 'Sent by Ana · 16:48',
    caught: 'You are reading this on Tuesday — not on the invoice next month.',
    account: 'Account · Marina Alves',
    owner: 'Owner',
    left: 'left the company',
    nowOwns: 'now owns it',
    history: 'Conversation history · unchanged',
    h1: '48 messages · Mar – Aug',
    h2: '6 files, 3 voice notes',
    h3: 'Every price discussed, still on the record',
  },

  trust: ['Same-day setup', 'Guided onboarding', 'LGPD & GDPR compliant', 'Personal chats never sync'],

  faq: {
    eyebrow: 'FAQ',
    heading: 'Questions we get before every connection',
    subline:
      'Setup, supported CRMs, security, and what actually changes for your reps day to day. Still stuck? Ask in the form and we will answer today.',
    footer: { text: "Didn't find your answer?", cta: 'Ask us directly' },
    items: [
      {
        q: 'Do my reps have to change their number, phone or routine?',
        a: 'No. Same number, same phone, same app. The only difference is everything now shows up in your CRM. Most WhatsApp projects die on adoption — there’s nothing here to adopt.',
      },
      {
        q: 'Regular WhatsApp, or only a business API number?',
        a: 'Both. Same number, same time. Every alternative forces you onto an API-only number — which is exactly when conversations start feeling automated and replies stop.',
      },
      {
        q: 'Can my number still get blocked?',
        a: 'Official connection, approved templates, plus guidance on sending volume. If you’ve already lost a number, this is the exact problem we’ll get you out of.',
      },
      {
        q: 'Do reps’ personal chats sync too?',
        a: 'No. Labels control what syncs. Anything unlabelled never reaches the CRM. Private stays private — which is the first thing your reps will ask.',
      },
      {
        q: 'Which CRMs?',
        a: 'HubSpot, Pipedrive, Zoho, Bitrix24, Salesforce natively. Anything else via API and webhook. You’re not locked in if you migrate.',
      },
      {
        // Price is a placeholder — see PRICE_ANCHOR below.
        q: 'What does it cost and how fast are we live?',
        a: 'From {price} per user/month, discounted annually. Browser extension plus one CRM authorisation — most teams are running the same day.',
      },
    ],
  },

  finalCta: {
    heading: 'Stop guessing what your team said on WhatsApp',
    subline: 'Same number. Same phones. Every conversation in your CRM by tonight.',
    cta: 'Get my CRM Connected',
  },

  stickyCta: 'Connect my CRM',

  footer: {
    links: ['Privacy Policy', 'LGPD', 'Terms'],
  },
} as const

/**
 * Unresolved figure from the brief. Renders as a visible marker until set —
 * a guessed price on a page buying traffic is worse than no page.
 */
export const PRICE_ANCHOR: string | null = process.env.NEXT_PUBLIC_WC_PRICE ?? null

/**
 * The shape every locale file must satisfy. Derived from the English copy
 * with all literal types widened — `as const` would otherwise force pt-BR to
 * match the exact English strings.
 */
type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends readonly (infer U)[]
        // readonly, so the `as const` English object satisfies it — a mutable
        // pt-BR literal is assignable to a readonly array, but not vice versa.
        ? readonly Widen<U>[]
        : { readonly [K in keyof T]: Widen<T[K]> }

export type PageContent = Widen<typeof en>

export const content: PageContent = en
