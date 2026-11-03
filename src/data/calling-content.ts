/**
 * English copy for the /calling section. Translations live in calling-translations/
 * and are served through calling-i18n.ts.
 *
 * Product facts come from public/llms-full.txt section 10 (call tracking, auto
 * dialer, voice numbers). Do not add claims beyond that without product sign-off.
 * Still unconfirmed, so worded carefully below: iPhone support, recording of SIM
 * calls, WhatsApp call tracking, dialer types, and which plans include calling.
 */

export interface CallingCard {
  title: string
  desc: string
}

export interface CallingTable {
  h2: string
  subtitle: string
  head: [string, string, string]
  rows: [string, string, string][]
  verdict?: { title: string; desc: string }[]
}

export interface CallingPageContent {
  /** '' is the /calling hub. */
  slug: string
  navLabel: string
  navDesc: string
  meta: {
    title: string
    description: string
    og: { title: string; description: string }
    twitter: { title: string; description: string }
  }
  hero: { tag: string; h1Lead: string; h1Em: string; subtitle: string; chips: string[] }
  mock: { title: string; rows: { name: string; detail: string; status: string }[] }
  answer: { h2: string; paragraphs: string[] }
  how: { h2: string; subtitle: string; steps: CallingCard[] }
  features: { h2: string; h2Em: string; subtitle: string; cards: CallingCard[] }
  table?: CallingTable
  useCases: { h2: string; subtitle: string; cards: CallingCard[] }
  record: { h2: string; body: string; points: string[] }
  pricing: { h2: string; body: string }
  screenshot?: { h2: string; src: string; width: number; height: number; alt: string; caption: string }
  faqIntro: string
  faq: { q: string; a: string }[]
  related: string[]
}

export const CALLING_UPDATED = '2026-11-03'

const RECORD_POINTS = [
  'WhatsApp chats and calls sit on the same customer record',
  'Call time, length and outcome are logged in your CRM',
  'A manager can read the whole conversation before stepping in',
]

const PRICING_BODY =
  'You pay for your Eazybe plan and add a voice number only if you want one. Calling needs differ by team size and country, so ask on a demo which plan fits yours.'

export const CALLING_PAGES: CallingPageContent[] = [
  {
    slug: '',
    navLabel: 'All Calling',
    navDesc: 'SIM and virtual calling in one place',
    meta: {
      title: 'Sales Calling Software: SIM, Virtual & WhatsApp | Eazybe',
      description: 'Sales calling software that logs SIM and virtual calls in your CRM beside WhatsApp chats. Add an auto dialer and call recording. Try it free for 4 days.',
      og: {
        title: 'Sales Calling Software For SIM And Virtual Calls | Eazybe',
        description: 'Sales calling software for SIM and virtual calls. Log every call in your CRM beside WhatsApp chats. Try Eazybe free for 4 days.',
      },
      twitter: {
        title: 'Sales Calling Software With WhatsApp And CRM | Eazybe',
        description: 'Log SIM and virtual calls in your CRM beside WhatsApp chats, with an auto dialer and recordings. Try Eazybe free for 4 days.',
      },
    },
    hero: {
      tag: 'Eazybe Calling',
      h1Lead: 'Sales Calling Software That Keeps',
      h1Em: 'Calls And WhatsApp Together',
      subtitle:
        'Your reps sell on the phone and on WhatsApp, but most tools only see one of them. Eazybe logs SIM and virtual calls beside the customer\'s chats, then sends the outcome to your CRM.',
      chips: ['SIM calls on Android', 'Virtual calls', 'Auto dialer', 'CRM logging'],
    },
    mock: {
      title: 'Customer timeline',
      rows: [
        { name: 'WhatsApp chat', detail: 'Asked for a quote', status: 'Replied' },
        { name: 'SIM call', detail: '4 min 12 sec', status: 'Interested' },
        { name: 'Virtual call', detail: '2 min 40 sec', status: 'Meeting booked' },
      ],
    },
    answer: {
      h2: 'What Is Sales Calling Software?',
      paragraphs: [
        'Sales calling software helps a team place calls, record what happened on each one and report on the results. Eazybe does this for two kinds of call: SIM calls made from a rep\'s Android phone, and virtual calls made over the internet on a business number.',
        'The part most calling tools leave out is WhatsApp. If a customer asks for a price on WhatsApp and agrees to it on a call, a call-only tool shows half the story. Eazybe saves each call beside that customer\'s WhatsApp chats, so the next person on the account can see both.',
      ],
    },
    how: {
      h2: 'How Eazybe Calling Works',
      subtitle: 'The setup depends on the kind of calling you choose, but the record at the end is the same.',
      steps: [
        { title: 'Pick how you call', desc: 'Track SIM calls from Android phones, use virtual calls, or run both across the team.' },
        { title: 'Connect your CRM', desc: 'Calls log to HubSpot, Salesforce, Zoho, Eazybe CRM or your Workspace.' },
        { title: 'Start calling', desc: 'Call one customer at a time or press start on a call list with the auto dialer.' },
        { title: 'Review the record', desc: 'Time, length and outcome sit next to the customer\'s WhatsApp chats.' },
      ],
    },
    features: {
      h2: 'Everything In',
      h2Em: 'Eazybe Calling',
      subtitle: 'Each page below goes deeper on one part of the product.',
      cards: [],
    },
    table: {
      h2: 'SIM Calling Or Virtual Calling?',
      subtitle: 'Many teams use both. This is the short version of how they differ.',
      head: ['', 'SIM calling', 'Virtual calling'],
      rows: [
        ['What it uses', 'The SIM in a rep\'s Android phone', 'A business number over the internet'],
        ['Customer sees','The rep\'s mobile number', 'Your business number'],
        ['If a rep leaves', 'Check who owns the SIM before they go', 'The number and history stay with the company'],
        ['Best for', 'Reps who already sell from a mobile', 'Teams that need a shared business line'],
      ],
    },
    useCases: {
      h2: 'Who Uses Eazybe For Calling',
      subtitle: 'Calling helps most when deals move between the phone and WhatsApp.',
      cards: [
        { title: 'Inside sales', desc: 'Work through a call list, log each outcome and send the quote on WhatsApp from the same record.' },
        { title: 'Field sales', desc: 'Reps call from their Android phones during the day, and managers still see the activity without asking for a report.' },
        { title: 'Sales managers', desc: 'See who was called, for how long and what happened, then read the chat before you join a deal.' },
      ],
    },
    record: {
      h2: 'One Record For Calls And Chats',
      body: 'Eazybe keeps calls on the same record as the customer\'s WhatsApp conversations. A standalone dialer has no view of those chats, and that is the main difference.',
      points: RECORD_POINTS,
    },
    pricing: { h2: 'How Much Does Eazybe Calling Cost?', body: PRICING_BODY },
    faqIntro: 'What teams usually ask when they compare calling tools. Each product page goes into more detail.',
    faq: [
      { q: 'What is the difference between SIM calling and virtual calling?', a: 'SIM calling uses the mobile SIM in a rep\'s phone, so the customer sees that mobile number. Virtual calling runs over the internet on a business number that belongs to the company. Eazybe tracks both.' },
      { q: 'Can I use SIM and virtual calling in the same team?', a: 'Yes. Eazybe call tracking works with SIM calls on Android and with virtual calls, and each call is saved beside the customer\'s WhatsApp chats.' },
      { q: 'Which CRMs does Eazybe log calls to?', a: 'Eazybe logs call time, length and outcome in your CRM. It works with HubSpot, Salesforce and Zoho, as well as Eazybe CRM.' },
      { q: 'Does Eazybe replace my phone system?', a: 'That depends on what you use today. Eazybe handles call tracking, dialing and voice numbers alongside WhatsApp and your CRM. If your team relies on call center routing, ask about it on a demo before you switch.' },
      { q: 'Which countries can I get a voice number in?', a: 'Voice numbers are available in the US, Canada and Puerto Rico. Eazybe handles number verification.' },
      { q: 'How does the auto dialer work?', a: 'Upload an Excel or CSV file with up to 1,000 contacts per sheet and check the list. Then pick the number to call from, set the gap between calls and press start. Eazybe calls one contact at a time, in list order, and you can pause, stop or skip whenever you need to.' },
      { q: 'Can reps call from a browser?', a: 'Yes. The Eazybe browser phone places calls from a browser window. Reps need to allow microphone access and keep the page open during a dialer session. We suggest a headset.' },
      { q: 'Can I listen to call recordings?', a: 'Yes. When a call has a recording, you can play it from call history. Very short or unanswered calls may not have one. Recording laws differ by country, so check the rules where you and your customers are.' },
      { q: 'What can managers see?', a: 'Call history lists incoming, outgoing and missed calls, and you can filter it by user, number or call type. Call analytics adds answer rate, talk time and average call length, broken down by number or by rep.' },
      { q: 'Is there a free trial?', a: 'Yes. Eazybe has a 4-day free trial. Setup takes about 2 minutes for the Chrome extension.' },
    ],
    related: ['auto-dialer', 'virtual-phone-number', 'call-tracking', 'sim-based-calling', 'call-recording', 'sim-vs-cloud-calling'],
  },
  {
    slug: 'auto-dialer',
    navLabel: 'Auto Dialer',
    navDesc: 'Call through a list without dialing by hand',
    meta: {
      title: 'Auto Dialer Software For Sales Teams: Upload & Call | Eazybe',
      description: 'Auto dialer software that works through your Excel or CSV list one contact at a time. Pick your number, set the gap and save each recording. Start free.',
      og: {
        title: 'Auto Dialer For Sales Teams: Upload A List, Press Start',
        description: 'Upload up to 1,000 contacts per sheet and call them in order. Each recording goes back to the contact. 4-day free trial.',
      },
      twitter: {
        title: 'Stop Dialing By Hand: Auto Dialer Software | Eazybe',
        description: 'Set the gap between calls, press start and work down your list. Eazybe saves each recording to the contact.',
      },
    },
    hero: {
      tag: 'Auto Dialer',
      h1Lead: 'Auto Dialer Software That',
      h1Em: 'Saves Every Call',
      subtitle:
        'Upload a contact list and press start. Eazybe calls one contact at a time, with the gap you set between calls, and saves the recording and outcome back to the contact.',
      chips: ['Excel and CSV upload', 'Up to 1,000 contacts', 'Set your call gap', 'Recordings saved'],
    },
    mock: {
      title: 'Auto dialer',
      rows: [
        { name: 'Ahmed Khan', detail: 'On call, 0:42', status: 'Calling' },
        { name: 'Carolina Mendes', detail: 'Quote sent on WhatsApp', status: 'Call saved' },
        { name: 'Priya Nair', detail: 'Call back at 5 pm', status: 'Next up' },
      ],
    },
    answer: {
      h2: 'What Is Auto Dialer Software?',
      paragraphs: [
        'An auto dialer works down a call list for you, so a rep stops typing numbers between conversations. The saved minutes help, but the bigger gain comes after the call, when nobody has to remember what to type into the CRM.',
        'In Eazybe, you upload the list as an Excel or CSV file, check it and choose which number to call from. Each recording and outcome goes back to the contact, and the next step is set there too.',
      ],
    },
    how: {
      h2: 'How The Eazybe Auto Dialer Works',
      subtitle: 'A rep can go from a list to the first call in four steps.',
      steps: [
        { title: 'Upload a list', desc: 'Add an Excel or CSV file with up to 1,000 contacts per sheet, then check the numbers.' },
        { title: 'Press start', desc: 'Pick the number to call from and the gap between calls. The first call starts right away.' },
        { title: 'Talk to the customer', desc: 'After the gap you set, the next number rings on its own.' },
        { title: 'Check what was saved', desc: 'The recording, outcome and next step are on the contact.' },
      ],
    },
    features: {
      h2: 'Built For',
      h2Em: 'Outbound Sales',
      subtitle: 'These are the parts of the dialer reps use every day.',
      cards: [
        { title: 'Upload a spreadsheet', desc: 'Use an Excel or CSV file with up to 1,000 contacts per sheet. Sample files show which columns you need.' },
        { title: 'Calls logged in your CRM', desc: 'Eazybe logs your calls in HubSpot, Salesforce, Zoho or Eazybe CRM.' },
        { title: 'Set the gap between calls', desc: 'Choose how long to wait before the next number rings, so a rep has time to finish up.' },
        { title: 'Choose your number', desc: 'Pick which of your Eazybe numbers the session calls from.' },
        { title: 'Recording and outcome saved', desc: 'Both go back to the contact, so a rep can move to the next call straight away.' },
        { title: 'Next step set', desc: 'The contact shows what happens next, such as a meeting or a call back.' },
      ],
    },
    useCases: {
      h2: 'When An Auto Dialer Helps',
      subtitle: 'A dialer pays off when reps have long lists and a limited number of calling hours.',
      cards: [
        { title: 'Following up new leads', desc: 'Upload your newest leads and call them the same day, while they still remember asking.' },
        { title: 'Reviving quiet leads', desc: 'Call people who stopped replying, then pick the conversation back up on WhatsApp.' },
        { title: 'Campaign follow-up', desc: 'Upload the list from an event or campaign and let the dialer work through it.' },
      ],
    },
    record: {
      h2: 'What Happens After The Call',
      body: 'Eazybe keeps the call on the same record as the customer\'s WhatsApp chats, so a rep can send the quote they promised without losing the thread.',
      points: ['Each recording goes back to the contact', 'The next step sits on the same record', 'A rep can send the promised quote on WhatsApp straight after the call'],
    },
    pricing: { h2: 'How Much Does The Auto Dialer Cost?', body: 'You pay for your Eazybe plan, plus a voice number to call from if you need one. Ask on a demo which plan suits the size of your lists.' },
    screenshot: {
      h2: 'The Auto Dialer Screen',
      src: '/calling/auto-dialer-software-screen.webp',
      width: 1346,
      height: 765,
      alt: 'Eazybe auto dialer screen with a contact list upload and calling session settings',
      caption: 'The auto dialer in the Eazybe app. Phone numbers and line names are samples.',
    },
    faqIntro: 'What sales teams usually ask before they load their first call list into the Eazybe dialer.',
    faq: [
      { q: 'What is an auto dialer?', a: 'An auto dialer is software that calls through a list of phone numbers for you. When one call ends, it moves on to the next number, so reps spend their time talking instead of dialing.' },
      { q: 'Where can my call list come from?', a: 'From a spreadsheet you upload, in Excel or CSV format. If your contacts live in a CRM or Google Sheets, export them to a file first.' },
      { q: 'Are calls recorded?', a: 'Yes. Each recording and outcome is saved back to the contact. Recording rules differ by country, so check what your local law requires before you start.' },
      { q: 'What number does the customer see?', a: 'The Eazybe number you choose under Call from, which you set before the session starts.' },
      { q: 'Is it legal to use an auto dialer?', a: 'It depends on where you and your customers are. In the US, for example, the TCPA limits automated calls to mobile phones without consent. Only call people you are allowed to contact, and check with a lawyer for your market.' },
      { q: 'How many contacts can I upload?', a: 'Up to 1,000 per sheet, as an Excel (.xlsx or .xls) or CSV file. Put the name, country code and phone number in separate columns, or keep the code inside the number. The app has sample files you can download and copy.' },
      { q: 'Can I set a gap between calls?', a: 'Yes. Set the time between calls before you start the session. The first call starts right away, and the gap applies after that.' },
      { q: 'Can I pause a calling session?', a: 'Yes. Pause lets the current call finish and then holds the session. Stop ends the current call and keeps the rest of the queue. Skip ends that one call and moves to the next contact.' },
      { q: 'What does a rep need to start?', a: 'A browser with microphone access and a voice number to call from. Keep the page open during the session. We suggest a headset, since reps may be on calls for a long stretch.' },
      { q: 'Is this a power dialer or a predictive dialer?', a: 'It calls one contact at a time, in list order, with a gap you set. That is closest to a power dialer. It does not ring several people at once, so a customer never picks up to find nobody there.' },
    ],
    related: ['call-tracking', 'call-recording', 'virtual-phone-number'],
  },
  {
    slug: 'virtual-phone-number',
    navLabel: 'Virtual Phone Numbers',
    navDesc: 'One business line for calls, SMS and WhatsApp',
    meta: {
      title: 'Virtual Phone Number For Business With WhatsApp | Eazybe',
      description: 'Get a virtual phone number for business in the US, Canada or Puerto Rico. Use it for calls, SMS and WhatsApp, and keep it when a rep leaves. See how.',
      og: {
        title: 'One Business Number For Calls, SMS And WhatsApp',
        description: 'A virtual number in the US, Canada or Puerto Rico. Eazybe handles verification, and the number stays with your company.',
      },
      twitter: {
        title: 'A Virtual Business Number That Stays When Reps Leave',
        description: 'Voice calls, SMS, the WhatsApp Business app and the API, all on one line. US, Canada and Puerto Rico.',
      },
    },
    hero: {
      tag: 'Virtual Calling',
      h1Lead: 'A Virtual Phone Number For Business',
      h1Em: 'Calls, SMS And WhatsApp',
      subtitle:
        'Buy a voice number from Eazybe and use one business line for voice calls, SMS, the WhatsApp Business app and the WhatsApp API. Eazybe handles the verification.',
      chips: ['US', 'Canada', 'Puerto Rico', 'Optional add-on'],
    },
    mock: {
      title: 'One business line',
      rows: [
        { name: 'Voice calls', detail: 'Same number', status: 'Active' },
        { name: 'SMS', detail: 'Same number', status: 'Active' },
        { name: 'WhatsApp', detail: 'Business app and API', status: 'Verified' },
      ],
    },
    answer: {
      h2: 'What Is A Virtual Phone Number?',
      paragraphs: [
        'A virtual phone number works like any other number, except the calls travel over the internet and the number belongs to an account, so no single phone owns it. A business can call and text customers on it without giving out a rep\'s personal mobile.',
        'An Eazybe voice number goes further than calling. The same number works for voice calls, SMS, the WhatsApp Business app and the WhatsApp API, so customers have one number to remember. It belongs to the company, and it stays with the company when a rep leaves, along with the customer history.',
      ],
    },
    how: {
      h2: 'How To Get A Virtual Number From Eazybe',
      subtitle: 'Voice numbers are set up with the Eazybe team, who also take care of number verification.',
      steps: [
        { title: 'Choose a country', desc: 'Numbers are available in the US, Canada and Puerto Rico.' },
        { title: 'Add it to your plan', desc: 'A voice number is an optional add-on on every Eazybe plan.' },
        { title: 'Let Eazybe verify it', desc: 'Eazybe handles number verification for you.' },
        { title: 'Use one line everywhere', desc: 'Call, text and use WhatsApp from the same business number.' },
      ],
    },
    features: {
      h2: 'One Number,',
      h2Em: 'Every Channel',
      subtitle: 'What you get when your business number comes from Eazybe.',
      cards: [
        { title: 'Voice calls', desc: 'Use the number for business calls, with each call saved beside the customer\'s chats.' },
        { title: 'SMS', desc: 'Text customers from the same number they already know.' },
        { title: 'WhatsApp Business app', desc: 'Use the number on the WhatsApp Business app.' },
        { title: 'WhatsApp API', desc: 'Use the same number on the WhatsApp API when your team needs it.' },
        { title: 'Verification handled', desc: 'Eazybe takes care of number verification.' },
        { title: 'Owned by the company', desc: 'The number and the customer history stay with you when a rep moves on.' },
      ],
    },
    useCases: {
      h2: 'Who Needs A Virtual Business Number',
      subtitle: 'A voice number is most useful for teams that want one line customers can trust.',
      cards: [
        { title: 'Teams selling into North America', desc: 'Use a US, Canada or Puerto Rico number for customers in those markets.' },
        { title: 'Teams with staff turnover', desc: 'Customers keep calling the same number, even after the rep who first spoke to them has left.' },
        { title: 'Teams moving off personal numbers', desc: 'Give the team a business line and keep sales conversations off personal mobiles.' },
      ],
    },
    record: {
      h2: 'The Number Connects To The Customer Record',
      body: 'A number on its own only gets the call connected. With Eazybe, the calls on that number are saved beside the customer\'s WhatsApp chats and logged in your CRM.',
      points: ['Calls on the number sit beside WhatsApp chats', 'A new rep can read the whole history', 'That history stays when someone leaves'],
    },
    pricing: {
      h2: 'How Much Does A Virtual Phone Number Cost?',
      body: 'A voice number is an optional add-on on every Eazybe plan, and the price varies by country. Add one from the pricing page or book a demo for a quote.',
    },
    screenshot: {
      h2: 'Your Numbers In One Place',
      src: '/calling/virtual-phone-numbers-screen.webp',
      width: 1330,
      height: 870,
      alt: 'Eazybe phone numbers screen listing business numbers by country with renewal dates',
      caption: 'The phone numbers screen in the Eazybe app. Phone numbers and line names are samples.',
    },
    faqIntro: 'Answers to the questions people ask most before buying a virtual number for their business.',
    faq: [
      { q: 'What is a virtual phone number?', a: 'Customers call and text it like any other number. The difference is on your side: it lives on your business account, and the calls run over the internet.' },
      { q: 'How is it different from a regular number?', a: 'A regular mobile number lives on one SIM in one phone. A virtual number belongs to the business account, so it does not leave with a rep or depend on one device.' },
      { q: 'Which countries are available?', a: 'Eazybe voice numbers are available in the US, Canada and Puerto Rico.' },
      { q: 'Can I use the number on WhatsApp?', a: 'Yes. One Eazybe voice number works for voice calls, SMS, the WhatsApp Business app and the WhatsApp API. Eazybe handles number verification.' },
      { q: 'What happens to the number when a rep leaves?', a: 'The number and the customer history stay with the company.' },
      { q: 'Can I call from a browser?', a: 'Yes. Turn on the Eazybe browser phone, allow microphone access and you can call from that window. A headset makes longer calls easier.' },
      { q: 'Where do I see texts sent to the number?', a: 'The SMS screen lists messages with the sender, the number that received them, the status and the time. You can filter it by number if you have more than one.' },
      { q: 'Is a free virtual number included?', a: 'No. The voice number is a paid add-on and the price varies by country. Eazybe plans have a 4-day free trial.' },
      { q: 'Can I keep my existing number?', a: 'Ask on a demo. The team can check your current number and tell you the options for your country.' },
      { q: 'Are virtual phone numbers legal for business?', a: 'Yes, in the countries where they are offered, though rules on calling and messaging vary. Follow the consent rules for the market you contact, and ask a lawyer if you are unsure.' },
    ],
    related: ['sim-based-calling', 'sim-vs-cloud-calling', 'auto-dialer'],
  },
  {
    slug: 'call-tracking',
    navLabel: 'Call Tracking',
    navDesc: 'See every rep call inside your CRM',
    meta: {
      title: 'Sales Call Tracking Software For Reps & Managers | Eazybe',
      description: 'See who your reps called, for how long and what happened. Sales call tracking for SIM and virtual calls, logged in your CRM. Try it free for 4 days.',
      og: {
        title: 'See Every Rep Call Without Asking For A Report',
        description: 'Call history and analytics by rep and number, with each call beside the customer\'s WhatsApp chats. Free for 4 days.',
      },
      twitter: {
        title: 'Sales Call Tracking Beside Your WhatsApp Chats | Eazybe',
        description: 'Track incoming, outgoing and missed calls, plus answer rate and talk time, for your whole sales team.',
      },
    },
    hero: {
      tag: 'Call Tracking',
      h1Lead: 'Sales Call Tracking Software',
      h1Em: 'For SIM And Virtual Calls',
      subtitle:
        'Eazybe logs every call\'s time, length and outcome in your CRM, and saves the call beside the customer\'s WhatsApp chats. Your reps skip the manual call notes.',
      chips: ['Call time', 'Call length', 'Call outcome', 'CRM logging'],
    },
    mock: {
      title: 'Rep call activity',
      rows: [
        { name: 'SIM call', detail: 'Today, 11:04, 6 min', status: 'Follow up' },
        { name: 'Virtual call', detail: 'Today, 11:32, 2 min', status: 'No answer' },
        { name: 'SIM call', detail: 'Today, 12:15, 9 min', status: 'Won' },
      ],
    },
    answer: {
      h2: 'What Is Sales Call Tracking?',
      paragraphs: [
        'Sales call tracking gives a manager a log of the calls reps make, with the time, the length and the result of each. Nobody has to fill in a spreadsheet to show what they did that day.',
        'This is different from marketing call tracking, which uses special numbers to show which ad produced a phone call. Eazybe is built for the sales side. It logs calls against the customer in your CRM and places them next to that customer\'s WhatsApp chats.',
      ],
    },
    how: {
      h2: 'How Eazybe Tracks Sales Calls',
      subtitle: 'Reps keep calling the way they do today. The logging happens in the background.',
      steps: [
        { title: 'Connect your team', desc: 'Set up reps who call from Android SIMs, virtual numbers or both.' },
        { title: 'Reps make calls', desc: 'Each call is picked up with its time and length.' },
        { title: 'Outcomes are recorded', desc: 'The result of the call is logged against the customer.' },
        { title: 'Managers review', desc: 'Check call activity in the CRM, next to the customer\'s chats.' },
      ],
    },
    features: {
      h2: 'What Gets',
      h2Em: 'Tracked',
      subtitle: 'The details a sales manager needs in order to coach and follow up.',
      cards: [
        { title: 'Time of every call', desc: 'See when each customer was contacted and how recently.' },
        { title: 'Call length', desc: 'A 20-second call and a 20-minute call are very different. The log shows which one you are looking at.' },
        { title: 'Call outcome', desc: 'Each call ends with a result on the customer record.' },
        { title: 'SIM and virtual calls', desc: 'Both call types go to the same place, including SIM calls on Android.' },
        { title: 'CRM logging', desc: 'Calls are logged in your CRM, so reps have less to update by hand.' },
        { title: 'WhatsApp context', desc: 'Calls sit beside the customer\'s WhatsApp chats for the full picture of the deal.' },
      ],
    },
    useCases: {
      h2: 'Who Uses Call Tracking',
      subtitle: 'It helps anyone who needs to know what happened on a call without being on it.',
      cards: [
        { title: 'Sales managers', desc: 'See who is calling, how long the conversations run and which customers have gone quiet.' },
        { title: 'Remote and field teams', desc: 'Keep sight of activity when reps work from different places on their own phones.' },
        { title: 'Reps taking over accounts', desc: 'Read the call history and chats before you phone a customer someone else was handling.' },
      ],
    },
    record: {
      h2: 'Call Tracking With The WhatsApp Side Included',
      body: 'A call log alone can make a quiet rep look idle when the deal is moving on WhatsApp. Eazybe shows the calls and the chats together, so you judge the deal on all of it.',
      points: ['A quiet call log does not always mean a quiet rep', 'Chats show what happened between calls', 'Managers can judge a deal with both sides in view'],
    },
    pricing: { h2: 'How Much Does Call Tracking Cost?', body: 'Your cost depends on the Eazybe plan your team needs. Voice numbers are extra, and only if you use them. A demo is the quickest way to confirm the right plan.' },
    screenshot: {
      h2: 'Every Call In One History',
      src: '/calling/call-history-recordings-screen.webp',
      width: 1330,
      height: 870,
      alt: 'Eazybe call history showing incoming, outgoing and missed calls with duration and filters',
      caption: 'Call history in the Eazybe app. Phone numbers and names are samples.',
    },
    faqIntro: 'Questions sales leaders usually ask about what is tracked, on which phones, and where the data ends up.',
    faq: [
      { q: 'What does Eazybe call tracking log?', a: 'Each call\'s time, length and outcome, in your CRM. The call is also saved beside the customer\'s WhatsApp chats.' },
      { q: 'Does it work with SIM calls?', a: 'Yes. Call tracking works with SIM calls on Android and with virtual calls.' },
      { q: 'Does it work on iPhone?', a: 'SIM call tracking works on Android. If your team uses iPhones, ask on a demo which setup fits. Virtual calling does not depend on the phone\'s SIM.' },
      { q: 'What does call history show for each call?', a: 'The contact, whether the call was incoming or outgoing, the number and user involved, the time and the length. Answered calls can also have a recording you can play.' },
      { q: 'Can I see the calls for one rep?', a: 'Yes. Filter call history by user, by number or by call type. Use Reset to go back to the whole team.' },
      { q: 'How do I find missed calls?', a: 'Call history has a separate count of missed calls at the top, and the call type filter narrows the list down to them, so you can see who still needs a call back.' },
      { q: 'What reports are included?', a: 'Call analytics shows total calls, answer rate, talk time and average call length for the period you pick. You can break the numbers down by phone number or by user.' },
      { q: 'Is this the same as marketing call tracking?', a: 'No. Marketing call tracking shows which ad or keyword drove a phone call. Eazybe tracks the calls your sales team makes and connects them to the customer record.' },
      { q: 'Which CRMs can I log calls to?', a: 'Eazybe works with CRMs including HubSpot, Salesforce and Zoho, along with Eazybe CRM.' },
      { q: 'Can managers see WhatsApp messages too?', a: 'Calls are saved beside the customer\'s WhatsApp chats. You can also choose which customer chats and groups connect to your CRM, so private conversations stay private.' },
    ],
    related: ['sim-based-calling', 'call-recording', 'auto-dialer'],
  },
  {
    slug: 'sim-based-calling',
    navLabel: 'SIM-Based Calling',
    navDesc: 'Track calls from reps\' own Android phones',
    meta: {
      title: 'SIM Based Calling Software For Sales Teams | Eazybe',
      description: 'Track SIM based calls from your reps\' Android phones. Each call lands in your CRM beside the customer\'s WhatsApp chats. Book a demo or start your trial.',
      og: {
        title: 'Keep Your SIMs And Get Every Call In Your CRM',
        description: 'SIM based calling for Android sales teams. Reps call as usual, and each call lands next to the customer\'s chats.',
      },
      twitter: {
        title: 'SIM Calling With CRM Logging For Android Teams | Eazybe',
        description: 'Reps keep their phones and numbers. Eazybe tracks the calls they already make and files them on the customer record.',
      },
    },
    hero: {
      tag: 'SIM-Based Calling',
      h1Lead: 'SIM Based Calling Software For',
      h1Em: 'Mobile Sales Teams',
      subtitle:
        'Your reps keep calling from their own Android phones. Eazybe logs each SIM call\'s time, length and outcome in your CRM, right beside the customer\'s WhatsApp chats.',
      chips: ['Android', 'Rep\'s own SIM', 'CRM logging', 'WhatsApp context'],
    },
    mock: {
      title: 'SIM call log',
      rows: [
        { name: 'Outgoing call', detail: 'Android SIM, 5 min', status: 'Logged' },
        { name: 'Outgoing call', detail: 'Android SIM, 3 min', status: 'Logged' },
        { name: 'CRM update', detail: 'Outcome saved', status: 'Synced' },
      ],
    },
    answer: {
      h2: 'What Is SIM Based Calling?',
      paragraphs: [
        'SIM based calling means reps call customers through the regular mobile network, using the SIM in their phone, while software records the activity. There is no internet phone line to set up, and customers see an ordinary mobile number.',
        'The usual problem with SIM calls is that they stay on the phone, where a manager or CRM never sees them. Eazybe fixes that for Android: each call\'s time, length and outcome goes into your CRM and sits beside the customer\'s WhatsApp chats.',
      ],
    },
    how: {
      h2: 'How SIM Based Calling Works In Eazybe',
      subtitle: 'Reps do not have to change how they call, which makes this an easy first step for many teams.',
      steps: [
        { title: 'Set up the phone', desc: 'Connect the rep\'s Android phone to Eazybe.' },
        { title: 'Call as usual', desc: 'The rep calls from the phone\'s SIM, the same way as before.' },
        { title: 'Eazybe logs the call', desc: 'Time, length and outcome are captured against the customer.' },
        { title: 'See it in the CRM', desc: 'The call appears in your CRM, next to the customer\'s chats.' },
      ],
    },
    features: {
      h2: 'Why Teams Choose',
      h2Em: 'SIM Calling',
      subtitle: 'SIM calling suits teams that already sell from mobile phones. Here is what you get with Eazybe.',
      cards: [
        { title: 'Keep the current phones', desc: 'Reps use their Android phones and their existing SIMs.' },
        { title: 'A familiar mobile number', desc: 'Customers see a normal mobile number, the one the rep may already use with them.' },
        { title: 'Calls logged in your CRM', desc: 'Time, length and outcome are logged without a rep typing them in.' },
        { title: 'WhatsApp in the same place', desc: 'SIM calls appear beside the customer\'s WhatsApp chats.' },
        { title: 'Works with your existing call plan', desc: 'Calls go over the mobile network, so your carrier plan still applies.' },
        { title: 'Add virtual calling later', desc: 'Eazybe tracks virtual calls too, so you can mix both across the team.' },
      ],
    },
    table: {
      h2: 'Before And After Eazybe',
      subtitle: 'What changes for a team that already sells over SIM calls.',
      head: ['', 'With Eazybe', 'Without call tracking'],
      rows: [
        ['Call activity', 'Logged with time, length and outcome', 'Only on each rep\'s phone'],
        ['CRM record', 'Updated with the call', 'Depends on the rep remembering'],
        ['WhatsApp context', 'Beside the call on the customer record', 'In a separate app'],
        ['Taking over an account', 'Call and chat history are on the record', 'Ask the last rep what happened'],
      ],
    },
    useCases: {
      h2: 'Who SIM Based Calling Suits',
      subtitle: 'It tends to work best where reps already do their selling from a mobile.',
      cards: [
        { title: 'Field sales teams', desc: 'Reps out meeting customers can call from the phone in their pocket and still have the activity logged.' },
        { title: 'Telecalling teams', desc: 'Teams that call all day from Android phones get activity into the CRM without a desk phone setup.' },
        { title: 'Small sales teams', desc: 'Start tracking the calls you already make before you decide whether you need business numbers.' },
      ],
    },
    record: {
      h2: 'SIM Calls And WhatsApp, Together',
      body: 'Many deals move between a phone call and a WhatsApp chat. Eazybe records both on one customer, so that history does not depend on one rep\'s phone.',
      points: ['SIM calls stop living on one phone', 'Android call details reach your CRM', 'Chats and calls sit on one customer'],
    },
    pricing: { h2: 'How Much Does SIM Based Calling Cost?', body: 'Calls go over your mobile network, so your carrier plan still covers the call itself. Book a demo to confirm the right Eazybe plan for your team.' },
    faqIntro: 'What teams usually want to know before they connect their reps\' phones to Eazybe.',
    faq: [
      { q: 'What is SIM based calling?', a: 'It means calling over the regular mobile network, using the SIM in a phone, while software records the call activity. Customers see a normal mobile number.' },
      { q: 'Which phones does it work on?', a: 'Eazybe SIM call tracking works on Android. If some of your reps use iPhones, ask on a demo which setup fits them.' },
      { q: 'Do I need a new phone number?', a: 'No. Reps can keep calling from the SIM in their Android phone. If you want a shared business line, Eazybe also offers voice numbers.' },
      { q: 'Does it record SIM calls?', a: 'Eazybe logs each SIM call\'s time, length and outcome. Ask on a demo about audio recording for SIM calls on your devices, and check your local recording laws first.' },
      { q: 'What about personal calls on the same phone?', a: 'If reps use one phone for work and personal calls, agree on a clear policy before you start. Ask on a demo which controls fit your setup.' },
      { q: 'What number will customers see?', a: 'The mobile number on the rep\'s SIM, the same one they see when that rep calls today.' },
      { q: 'Who pays for the calls?', a: 'Your mobile carrier charges for SIM calls in the usual way, so your existing plan applies. The Eazybe plan is a separate cost.' },
      { q: 'What happens when a rep leaves?', a: 'The number goes wherever the SIM goes, so settle who owns it before someone leaves. If you want a number that always stays with the company, use an Eazybe voice number.' },
      { q: 'Can I see WhatsApp chats next to SIM calls?', a: 'Yes. Eazybe saves each SIM call beside that customer\'s WhatsApp chats, so you can read the conversation and see the calls in one place.' },
      { q: 'Is SIM calling better than cloud calling?', a: 'That depends on the team. SIM calling is simple for reps who already sell from a mobile. Virtual calling suits teams that want a shared business line. Our SIM vs cloud calling guide goes through the differences.' },
    ],
    related: ['sim-vs-cloud-calling', 'call-tracking', 'virtual-phone-number'],
  },
  {
    slug: 'call-recording',
    navLabel: 'Call Recording',
    navDesc: 'Recordings saved back to the contact',
    meta: {
      title: 'Sales Call Recording Software For Coaching & Review | Eazybe',
      description: 'Sales call recording software that keeps each recording with the customer. Play calls from history, coach new reps and settle what was agreed. Try it free.',
      og: {
        title: 'Replay Any Sales Call From Your Call History',
        description: 'Find the call, press play and hear what was promised. Recordings sit next to the rest of the deal.',
      },
      twitter: {
        title: 'Call Recording Software For Sales Coaching | Eazybe',
        description: 'Coach new reps with real calls and go back to check what was agreed. Recording laws vary, so check yours first.',
      },
    },
    hero: {
      tag: 'Call Recording',
      h1Lead: 'Sales Call Recording Software',
      h1Em: 'Linked To The Customer',
      subtitle:
        'When a rep calls through the Eazybe auto dialer, the recording and outcome go back to the contact. Find any call from the customer\'s record, right beside their WhatsApp chats.',
      chips: ['Saved to the contact', 'Outcome included', 'For coaching', 'Next step set'],
    },
    mock: {
      title: 'Call recordings',
      rows: [
        { name: 'Carolina Mendes', detail: 'Recording, 7 min', status: 'Quote requested' },
        { name: 'Ahmed Khan', detail: 'Recording, 3 min', status: 'Call back' },
        { name: 'Priya Nair', detail: 'Recording, 11 min', status: 'Meeting booked' },
      ],
    },
    answer: {
      h2: 'What Is Sales Call Recording Software?',
      paragraphs: [
        'Sales call recording software saves the audio of a sales call so someone can listen back later. Teams use it to settle what was agreed, coach new reps and hand over accounts without losing detail.',
        'A recording only helps if someone can find it. In Eazybe, recordings from the auto dialer are saved back to the contact with the call outcome, so you start from the customer instead of searching a folder of audio files.',
      ],
    },
    how: {
      h2: 'How Call Recording Works In Eazybe',
      subtitle: 'Recording is part of the auto dialer workflow, so nobody has to file anything after the call.',
      steps: [
        { title: 'Start a call list', desc: 'Choose a list and press start in the auto dialer.' },
        { title: 'Have the conversation', desc: 'Tell customers about recording where your local law requires it.' },
        { title: 'Recording is saved', desc: 'The recording and outcome go back to the contact.' },
        { title: 'Review it later', desc: 'Open the customer record to find the call.' },
      ],
    },
    features: {
      h2: 'Why Keep',
      h2Em: 'Call Recordings',
      subtitle: 'A recording tied to the customer is useful long after the call has ended.',
      cards: [
        { title: 'Saved to the contact', desc: 'Recordings live on the customer record, so anyone with access can find them.' },
        { title: 'Outcome alongside', desc: 'Each recording comes with what happened on the call.' },
        { title: 'Next step set', desc: 'The contact shows what should happen next.' },
        { title: 'WhatsApp in view', desc: 'See the calls beside the chats, including anything sent after the call.' },
        { title: 'Useful for coaching', desc: 'Managers can pick out real calls to review with a rep.' },
        { title: 'Useful for handovers', desc: 'A new rep can listen to the last call before picking up an account.' },
      ],
    },
    useCases: {
      h2: 'How Teams Use Call Recordings',
      subtitle: 'The same recording can serve a rep, a manager and whoever takes over the account next.',
      cards: [
        { title: 'Coaching new reps', desc: 'Listen to real calls together. It beats role play, because the customer\'s objections are genuine.' },
        { title: 'Checking what was agreed', desc: 'Go back to the call when a customer and a rep remember the price differently.' },
        { title: 'Handing over accounts', desc: 'Give the next rep the actual conversation along with the notes.' },
      ],
    },
    record: {
      h2: 'Recordings With The Rest Of The Deal',
      body: 'A call recording tells you what was said on that call. Eazybe keeps the WhatsApp conversation next to it, so you can see what the rep promised and whether they followed through.',
      points: ['Recordings sit with the rest of the deal', 'You can check a promise against the WhatsApp chat', 'The next rep gets the real conversation'],
    },
    pricing: { h2: 'How Much Does Call Recording Cost?', body: 'Your cost depends on your Eazybe plan and on whether you add a voice number. If recording is the main reason you are buying, ask on a demo which plan to choose.' },
    screenshot: {
      h2: 'Play Recordings From Call History',
      src: '/calling/call-history-recordings-screen.webp',
      width: 1330,
      height: 870,
      alt: 'Eazybe call history with a Play recording button beside each answered call',
      caption: 'Recordings in Eazybe call history. Phone numbers and names are samples.',
    },
    faqIntro: 'Recording raises practical and legal questions, so here are straight answers to the common ones.',
    faq: [
      { q: 'Which calls does Eazybe record?', a: 'Calls on Eazybe voice numbers can have a recording, both incoming and outgoing, and you play them from call history. Auto dialer calls save the recording back to the contact. Ask on a demo about recording SIM calls.' },
      { q: 'Where do I find a recording?', a: 'Open call history and press Play recording on that call. If you have a lot of calls, filter by user or number first.' },
      { q: 'Why does a call have no recording?', a: 'Call history shows Not available when there is nothing to play, which is what you will usually see on calls that lasted 00:00 because nobody answered.' },
      { q: 'Can managers listen to their team\'s calls?', a: 'Yes. Call history covers calls across your organization, so a manager can filter by rep and play the recordings from there.' },
      { q: 'How should I use recordings for coaching?', a: 'Pick two or three real calls a week and go through them with the rep. One good call and one that went badly usually teach more than a long review of everything.' },
      { q: 'Does it record both sides of the call?', a: 'Ask on a demo for your setup and devices. Recording support can vary by phone and call type, so test it with your own team before you rely on it.' },
      { q: 'Is call recording legal?', a: 'It depends on the country and sometimes the state. Some places let one party consent, while others need everyone on the call to agree. In the EU, GDPR also applies to recordings. Check the rules for you and your customers. This is general information, not legal advice.' },
      { q: 'Should I tell customers a call is recorded?', a: 'Telling them is the safest habit, and in some places it is required. A short line at the start of the call is usually enough, but confirm what your market needs.' },
      { q: 'Can I find a recording later?', a: 'Yes. Recordings go back to the contact, so start from the customer\'s record.' },
      { q: 'Can I record WhatsApp calls?', a: 'We do not list WhatsApp call recording as a feature today. Ask on a demo if it matters to your team.' },
    ],
    related: ['auto-dialer', 'call-tracking', 'sim-based-calling'],
  },
  {
    slug: 'sim-vs-cloud-calling',
    navLabel: 'SIM vs Cloud Calling',
    navDesc: 'Which one fits your sales team',
    meta: {
      title: 'SIM vs Cloud Telephony: Which Fits Sales Teams? | Eazybe',
      description: 'SIM vs cloud telephony compared on cost, setup, number ownership and compliance. See which fits your sales team, with a clear verdict for each type.',
      og: {
        title: 'SIM Or Cloud Calling? A Straight Answer For Sales Teams',
        description: 'Compare cost, setup, number ownership and compliance, then see which option suits field reps and inside teams.',
      },
      twitter: {
        title: 'SIM vs Cloud Calling: Which Should Your Team Use?',
        description: 'We offer both, so here is a plain comparison of cost, setup and who keeps the number when a rep leaves.',
      },
    },
    hero: {
      tag: 'Buyer Guide',
      h1Lead: 'SIM vs Cloud Telephony:',
      h1Em: 'Which Fits Your Team?',
      subtitle:
        'SIM calling is simple to start, and cloud calling gives you a business line you control. Eazybe supports both, so this guide has no reason to push you toward one of them.',
      chips: ['Cost', 'Setup', 'Number ownership', 'Compliance'],
    },
    mock: {
      title: 'Quick comparison',
      rows: [
        { name: 'SIM calling', detail: 'Rep\'s mobile number', status: 'Fast start' },
        { name: 'Cloud calling', detail: 'Business number', status: 'Company owned' },
        { name: 'Both', detail: 'Same customer record', status: 'Eazybe' },
      ],
    },
    answer: {
      h2: 'What Is The Difference Between SIM And Cloud Calling?',
      paragraphs: [
        'SIM calling uses the mobile network and the SIM inside a phone. Cloud calling, also called cloud telephony or VoIP, runs over the internet on a virtual number. The main practical difference is who controls the number: with SIM calling it usually sits with the rep, and with cloud calling it sits with the company.',
        'Neither is better for every team. A field team calling from mobiles may lose time moving to a cloud line, while a team selling across borders may outgrow SIM calling quickly. Many teams end up using both, which is why tracking them in one place matters.',
      ],
    },
    how: {
      h2: 'How To Choose In Four Questions',
      subtitle: 'Work through these with your sales lead. The answers usually point to one option.',
      steps: [
        { title: 'Where do reps work?', desc: 'Out in the field points to SIM. At a desk with good internet, either one works.' },
        { title: 'Who should own the number?', desc: 'If the number must stay with the company, choose cloud calling.' },
        { title: 'Where are your customers?', desc: 'Selling into other countries usually favours local virtual numbers.' },
        { title: 'What is your calling volume?', desc: 'Compare your carrier plan with per-number and per-minute cloud pricing.' },
      ],
    },
    features: {
      h2: 'Where Each One',
      h2Em: 'Is Stronger',
      subtitle: 'Each option has real advantages, so match them to how your team sells.',
      cards: [
        { title: 'SIM: quick to start', desc: 'Reps already have the phones and SIMs, so there is no line to provision.' },
        { title: 'SIM: works on mobile network', desc: 'Calls do not depend on a good internet connection, which helps out in the field.' },
        { title: 'SIM: familiar number', desc: 'Customers see a normal mobile number, and existing contacts may already know it.' },
        { title: 'Cloud: company-owned number', desc: 'The number stays with the business when a rep leaves.' },
        { title: 'Cloud: shared line', desc: 'One business number can serve a team, and a virtual number is not tied to one phone.' },
        { title: 'Cloud: local presence', desc: 'Virtual numbers can give you a local number in a market where you have no office.' },
      ],
    },
    table: {
      h2: 'SIM vs Cloud Calling Compared',
      subtitle: 'The factors that usually decide it. Costs vary a lot by country and provider, so get real quotes.',
      head: ['Factor', 'SIM calling', 'Cloud calling'],
      rows: [
        ['Connection', 'Mobile network', 'Internet'],
        ['Setup', 'Use existing phones and SIMs', 'Buy a number and set up an account'],
        ['Cost model', 'Your mobile carrier plan', 'Usually per number, per user or per minute'],
        ['Number shown', 'Rep\'s mobile number', 'Business or local virtual number'],
        ['Number ownership', 'Usually tied to the SIM holder', 'Stays with the company'],
        ['Call quality depends on', 'Mobile signal', 'Internet connection'],
        ['Selling abroad', 'International carrier rates may apply', 'Local numbers may be available'],
        ['Compliance', 'Calling and recording laws apply', 'Calling and recording laws apply'],
        ['In Eazybe', 'Tracked on Android', 'Tracked, with voice numbers in the US, Canada and Puerto Rico'],
      ],
      verdict: [
        { title: 'Choose SIM calling if', desc: 'your reps already sell from Android phones, work in the field and mostly call customers in their own country.' },
        { title: 'Choose cloud calling if', desc: 'you need a company-owned number, a shared business line or a presence in another market.' },
        { title: 'Use both if', desc: 'you have field reps and an inside team. Track both in one place so the customer record stays complete.' },
      ],
    },
    useCases: {
      h2: 'Typical Choices By Team',
      subtitle: 'These are starting points. Your own market and carrier rates can change the answer.',
      cards: [
        { title: 'Field sales', desc: 'Usually SIM calling, because reps are on the move and already have phones with them.' },
        { title: 'Cross-border inside sales', desc: 'Usually cloud calling, because local numbers and a shared line matter more.' },
        { title: 'Mixed teams', desc: 'Often both, with one record per customer so managers are not checking two systems.' },
      ],
    },
    record: {
      h2: 'Whichever You Choose, Keep One Record',
      body: 'The choice of phone line matters less than whether you can see what happened afterwards. Eazybe logs SIM and virtual calls beside WhatsApp chats, so you can change your mix later and still keep the customer history.',
      points: ['You can mix or change phone lines later', 'SIM and virtual calls land on one record', 'The history stays with the customer'],
    },
    pricing: {
      h2: 'What Does Each Option Cost?',
      body: 'SIM calls run on your carrier plan. Cloud numbers usually have their own charge: in Eazybe, a voice number is an optional add-on with a price that varies by country.',
    },
    faqIntro: 'Quick answers for teams deciding between SIM calling and cloud telephony. Eazybe sells both options, so weigh this with your own quotes.',
    faq: [
      { q: 'Is SIM calling cheaper than cloud telephony?', a: 'It depends on your carrier plan, call volume and country. If reps already have unlimited local calling, SIM calling can cost little extra. Compare it with a real cloud quote that includes numbers, users and minutes.' },
      { q: 'Do customers answer SIM calls more often?', a: 'SIM vendors often say so, but we have not seen independent data that proves it across markets. Test it on your own lists by comparing answer rates over a few weeks.' },
      { q: 'What is cloud telephony?', a: 'Cloud telephony runs business calls over the internet instead of a physical phone line or a SIM. The numbers and call data are managed through an online account.' },
      { q: 'Can I use SIM and cloud calling together?', a: 'Yes. Eazybe tracks SIM calls on Android and virtual calls, and saves both beside the customer\'s WhatsApp chats.' },
      { q: 'Who keeps the number if a rep quits?', a: 'With a SIM, it depends on who owns the SIM. With an Eazybe voice number, the number and customer history stay with the company.' },
      { q: 'Which has better call quality?', a: 'It depends on the connection. SIM calls rely on mobile signal, and cloud calls rely on your internet. A rep with a weak office connection may do better on SIM, while a rep in a low signal area may do better on cloud.' },
      { q: 'Which is better for selling abroad?', a: 'Usually cloud calling, because a virtual number can give you a local presence in that market, while a SIM may charge international rates. Our voice numbers cover the US, Canada and Puerto Rico.' },
      { q: 'Do calling and recording laws differ between them?', a: 'No. The rules follow the country you call and how you contact people, not the type of line. Rules change, so take advice for your own market.' },
      { q: 'Can I start on SIM and add cloud calling later?', a: 'Yes. Eazybe tracks both, and a voice number is an optional add-on on every plan, so you can add one when your team needs a shared line.' },
      { q: 'Which is better for field sales?', a: 'Usually SIM calling, since it works over the mobile network and reps already carry the phone. Cloud calling needs a reliable internet connection.' },
    ],
    related: ['sim-based-calling', 'virtual-phone-number', 'call-tracking'],
  },
]

export const CALLING_SLUGS = CALLING_PAGES.filter((p) => p.slug).map((p) => p.slug)

export const callingPath = (slug: string) => (slug ? `/calling/${slug}` : '/calling')
