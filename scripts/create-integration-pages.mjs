import { createClient } from '@sanity/client'
import crypto from 'crypto'
import fs from 'fs'
import path from 'path'

// Read auth token from Sanity CLI config
const sanityConfigPath = path.join(process.env.HOME, '.config/sanity/config.json')
const sanityConfig = JSON.parse(fs.readFileSync(sanityConfigPath, 'utf-8'))

const client = createClient({
  projectId: '5awzi0t4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: sanityConfig.authToken
})

function generateKey() {
  return crypto.randomBytes(8).toString('hex')
}

// ============================================================
// Integration Page Definitions
// ============================================================

const integrations = [
  // --- Bitrix24 ---
  {
    _id: 'productPage-bitrix24-whatsapp-integration-en',
    title: 'Bitrix24 WhatsApp Integration',
    crmName: 'Bitrix24',
    crmSlug: 'bitrix24',
    crmColor: '#2FC6F6',
    slug: { _type: 'slug', current: 'bitrix24-whatsapp-integration' },
    language: 'en',
    category: 'crm-integration',
    _type: 'productPage',
    seo: {
      metaTitle: 'Bitrix24 WhatsApp Integration | Eazybe',
      metaDescription: 'Sync every WhatsApp conversation to Bitrix24 automatically. Contact sync, chat backup, and mini-CRM sidebar—no API migration needed.'
    },
    hero: {
      badge: 'Bitrix24 + WhatsApp',
      headline: 'Your Bitrix24 CRM is missing',
      headlineHighlight: 'WhatsApp conversations',
      description: 'Sales teams close deals on WhatsApp but Bitrix24 sees nothing. Conversations vanish into personal phones, follow-ups get lost, and managers have zero visibility. Eazybe syncs every WhatsApp message to Bitrix24 automatically—contacts, chats, and deal context in one place.',
      primaryCta: { label: 'Start Free Trial', url: '/signup?crm=bitrix24' },
      secondaryCta: { label: 'See How It Works', url: '/demo?crm=bitrix24' },
      stats: [
        { value: '30,000+', label: 'Companies trust us' },
        { value: '87%', label: 'Less manual data entry' },
        { value: '100%', label: 'Conversation visibility' }
      ]
    },
    benefits: {
      badge: 'Complete Picture',
      headline: 'Bitrix24 tracks activities. We show you the conversations behind them.',
      items: [
        {
          icon: 'sync',
          title: 'Automatic Contact Sync',
          description: 'WhatsApp contacts sync directly into Bitrix24. New contacts are created automatically, existing ones are matched. No more manual entry, no more duplicate records cluttering your CRM.'
        },
        {
          icon: 'crm-view',
          title: 'CRM Sidebar in WhatsApp',
          description: 'See Bitrix24 contact details, deal stages, and activity history while chatting on WhatsApp. Update records without switching tabs. Your reps stay in the conversation.'
        },
        {
          icon: 'cloud',
          title: 'Complete Chat Backup',
          description: 'Every WhatsApp message—text, images, voice notes, documents—backed up and linked to the right Bitrix24 contact. Conversations are preserved even when reps leave the company.'
        },
        {
          icon: 'team',
          title: 'Team-Wide Visibility',
          description: 'Managers can see all WhatsApp conversations across the team. Know which reps are following up, which deals are active, and which customers need attention—without asking anyone.'
        },
        {
          icon: 'workflow',
          title: 'Works With Your WhatsApp',
          description: 'Personal WhatsApp, WhatsApp Business App, or WhatsApp API—Eazybe works with all of them. No expensive API migration required. Start syncing in minutes.'
        },
        {
          icon: 'security',
          title: 'Enterprise-Grade Security',
          description: 'SOC 2 certified, GDPR compliant, Meta Business Partner. Your customer conversations are encrypted in transit and at rest. Built for teams that take data security seriously.'
        }
      ]
    },
    features: [
      {
        badge: 'Contact Sync',
        headline: 'WhatsApp contacts flow into Bitrix24 automatically.',
        description: 'Every new WhatsApp conversation triggers an automatic contact lookup in Bitrix24. Existing contacts are matched instantly. New ones are created with phone number, name, and chat history. No manual data entry.',
        points: [
          'Auto-match WhatsApp contacts to Bitrix24 records',
          'New contacts created automatically with full details',
          'Phone numbers normalized and deduplicated',
          'Two-way sync keeps records current'
        ],
        alignRight: false,
        image: 'sync-visual',
        cta: { label: 'See it work', url: '#demo' }
      },
      {
        badge: 'Mini-CRM Sidebar',
        headline: 'Your entire Bitrix24 database, inside WhatsApp.',
        description: 'Why switch between tabs when you can see everything in one place? The Eazybe sidebar shows Bitrix24 contact details, deal information, and activity history right inside WhatsApp Web. Update records mid-conversation.',
        points: [
          'View contact details and deal stages instantly',
          'Update CRM fields without leaving WhatsApp',
          'Create tasks and notes in one click',
          'Full activity timeline at your fingertips'
        ],
        alignRight: true,
        image: 'mini-crm-visual',
        cta: { label: 'Explore', url: '#demo' }
      },
      {
        badge: 'Chat Backup',
        headline: 'Every conversation preserved. Forever.',
        description: 'WhatsApp chats disappear when phones change or reps leave. Eazybe backs up every message—text, images, voice notes, PDFs—to your Bitrix24 account. Customer history belongs to your company, not personal devices.',
        points: [
          'Full message history synced to Bitrix24',
          'Images, voice notes, and documents included',
          'Searchable conversation archive',
          'Preserved through team changes and transitions'
        ],
        alignRight: false,
        image: 'workflow-visual',
        cta: { label: 'Install free', url: '#install' }
      }
    ],
    howItWorks: {
      badge: 'Live in 5 Minutes',
      headline: 'No developers. No IT tickets. No waiting.',
      description: 'Connect Bitrix24 to WhatsApp in minutes. Your team will be syncing conversations before your next meeting.',
      steps: [
        { number: '01', title: 'Install Extension', description: 'Add Eazybe to Chrome. One click, 60 seconds.' },
        { number: '02', title: 'Connect Bitrix24', description: 'Authorize your Bitrix24 account—no API keys needed.' },
        { number: '03', title: 'Open WhatsApp Web', description: 'The Bitrix24 sidebar appears automatically.' },
        { number: '04', title: 'Start Syncing', description: 'Every message flows to Bitrix24. You\'re live.' }
      ]
    },
    useCases: {
      badge: 'Who It\'s For',
      headline: 'Built for Bitrix24 teams where deals happen on WhatsApp',
      items: [
        {
          icon: 'sales',
          title: 'Sales Teams',
          description: 'Reps close deals on WhatsApp but Bitrix24 shows nothing. Get full chat history linked to every contact and deal. No more manual logging—conversations sync automatically.',
          benefits: ['Automatic contact matching', 'Chat history on every deal', 'Zero manual data entry']
        },
        {
          icon: 'support',
          title: 'Sales Managers',
          description: 'See every WhatsApp conversation across your team without asking. Know which deals are active, which customers are waiting, and which reps need coaching.',
          benefits: ['Team-wide conversation visibility', 'Performance insights', 'Pipeline reality check']
        },
        {
          icon: 'marketing',
          title: 'Customer Support',
          description: 'When customers message on WhatsApp, their full history is right there in Bitrix24. No more asking customers to repeat themselves. Complete context for every interaction.',
          benefits: ['Full conversation history', 'Seamless team handoffs', 'Faster resolution times']
        }
      ]
    },
    testimonial: {
      quote: 'We were losing track of customer conversations across 20+ sales reps. Now every WhatsApp chat syncs to Bitrix24 automatically. Our managers finally have the visibility they needed.',
      author: 'Priya Mehta',
      title: 'Sales Director',
      company: 'TechServe Solutions'
    },
    faq: {
      badge: 'Common Questions',
      headline: 'What you need to know',
      items: [
        {
          question: 'Does this work with personal WhatsApp or do we need Business API?',
          answer: 'Eazybe works with ALL versions: personal WhatsApp, WhatsApp Business App, and WhatsApp Business API. No expensive API migration needed. Your team can start today with whatever WhatsApp they already use.'
        },
        {
          question: 'How does contact sync work with Bitrix24?',
          answer: 'When a WhatsApp conversation starts, Eazybe automatically searches Bitrix24 for a matching contact by phone number. If found, chats are linked to that record. If not found, a new contact is created automatically with the phone number and name.'
        },
        {
          question: 'Can managers see all team conversations?',
          answer: 'Yes. Team admins have full visibility into all WhatsApp conversations synced by team members. Track response times, see conversation history, and monitor engagement across your entire sales organization.'
        },
        {
          question: 'What happens to conversations when a rep leaves?',
          answer: 'All synced conversations remain in Bitrix24 permanently. Chat history stays attached to contacts and deals. Your customer relationships belong to your company, not personal phones.'
        },
        {
          question: 'Is our data secure?',
          answer: 'SOC 2 Type II certified, GDPR compliant, and an official Meta Business Partner. Messages are encrypted in transit and at rest. Enterprise-grade security for your customer conversations.'
        },
        {
          question: 'How quickly can we be up and running?',
          answer: 'Most teams are live within 5 minutes. Install the Chrome extension, connect Bitrix24, open WhatsApp Web—done. No developer resources or IT tickets required.'
        }
      ]
    },
    cta: {
      headline: 'Stop losing WhatsApp conversations in',
      headlineHighlight: 'Bitrix24',
      description: 'Your team is having critical customer conversations on WhatsApp. Make sure Bitrix24 sees every one of them.',
      primaryCta: { label: 'Start Free Trial', url: '/signup?crm=bitrix24' },
      secondaryCta: { label: 'See a Demo', url: '/demo?crm=bitrix24' },
      footnote: '14-day free trial • No credit card • Live in 5 minutes'
    }
  },

  // --- LeadSquared ---
  {
    _id: 'productPage-leadsquared-whatsapp-integration-en',
    title: 'LeadSquared WhatsApp Integration',
    crmName: 'LeadSquared',
    crmSlug: 'leadsquared',
    crmColor: '#0066CC',
    slug: { _type: 'slug', current: 'leadsquared-whatsapp-integration' },
    language: 'en',
    category: 'crm-integration',
    _type: 'productPage',
    seo: {
      metaTitle: 'LeadSquared WhatsApp Integration | Eazybe',
      metaDescription: 'Sync WhatsApp conversations to LeadSquared automatically. Contact sync, chat backup, CRM sidebar, and workflow automation—no API migration needed.'
    },
    hero: {
      badge: 'LeadSquared + WhatsApp',
      headline: 'Your leads are talking on WhatsApp.',
      headlineHighlight: 'LeadSquared doesn\'t know.',
      description: 'Sales reps nurture leads on WhatsApp but LeadSquared sees none of it. Lead scores don\'t reflect real engagement. Follow-ups fall through cracks. Eazybe syncs every WhatsApp message to LeadSquared—contacts, conversations, and deal signals automatically.',
      primaryCta: { label: 'Start Free Trial', url: '/signup?crm=leadsquared' },
      secondaryCta: { label: 'See How It Works', url: '/demo?crm=leadsquared' },
      stats: [
        { value: '30,000+', label: 'Companies trust us' },
        { value: '87%', label: 'Less manual data entry' },
        { value: '100%', label: 'Conversation visibility' }
      ]
    },
    benefits: {
      badge: 'Complete Lead Intelligence',
      headline: 'LeadSquared scores leads. We show you the conversations that matter.',
      items: [
        {
          icon: 'sync',
          title: 'Automatic Contact Sync',
          description: 'WhatsApp contacts sync into LeadSquared leads automatically. New leads are captured, existing ones are matched by phone number. Every conversation is attributed to the right lead record.'
        },
        {
          icon: 'crm-view',
          title: 'CRM Sidebar in WhatsApp',
          description: 'See LeadSquared lead details, scores, activities, and pipeline stage while chatting. Update lead status, add notes, and create tasks without leaving WhatsApp.'
        },
        {
          icon: 'cloud',
          title: 'Complete Chat Backup',
          description: 'Every WhatsApp message backed up to LeadSquared—text, images, voice notes, documents. Full conversation history linked to lead records, preserved forever.'
        },
        {
          icon: 'workflow',
          title: 'Workflow Automation',
          description: 'Trigger LeadSquared workflows based on WhatsApp activity. Auto-assign leads when conversations start, update stages when deals progress, notify managers on key events.'
        },
        {
          icon: 'team',
          title: 'Team-Wide Visibility',
          description: 'Managers see all WhatsApp conversations across the sales team. Track which leads are engaged, which reps are responsive, and which opportunities need attention.'
        },
        {
          icon: 'security',
          title: 'Enterprise Security',
          description: 'SOC 2 certified, GDPR compliant, Meta Business Partner. Your lead conversations are encrypted and secure. Built for teams that handle sensitive customer data.'
        }
      ]
    },
    features: [
      {
        badge: 'Lead Sync',
        headline: 'WhatsApp leads flow into LeadSquared automatically.',
        description: 'Every new WhatsApp conversation triggers a lead lookup in LeadSquared. Existing leads are matched instantly. New ones are created with phone, name, and conversation history. Your lead database stays complete without manual effort.',
        points: [
          'Auto-match WhatsApp contacts to LeadSquared leads',
          'New leads captured automatically from conversations',
          'Phone numbers normalized and deduplicated',
          'Conversation history linked to lead records'
        ],
        alignRight: false,
        image: 'sync-visual',
        cta: { label: 'See it work', url: '#demo' }
      },
      {
        badge: 'Mini-CRM Sidebar',
        headline: 'LeadSquared lead intelligence, inside WhatsApp.',
        description: 'View lead scores, activity history, and pipeline stage without switching tabs. Update lead status mid-conversation. Create follow-up tasks instantly. Everything you need from LeadSquared, right where conversations happen.',
        points: [
          'View lead score and activity timeline',
          'Update lead status without leaving WhatsApp',
          'Create tasks and notes in one click',
          'See full lead history at a glance'
        ],
        alignRight: true,
        image: 'mini-crm-visual',
        cta: { label: 'Explore', url: '#demo' }
      },
      {
        badge: 'Workflow Triggers',
        headline: 'WhatsApp activity powers LeadSquared automation.',
        description: 'Connect WhatsApp conversations to LeadSquared workflows. When a new conversation starts, trigger lead assignment. When a deal moves forward, update the pipeline. Your automation runs on real conversation data.',
        points: [
          'Trigger workflows from WhatsApp events',
          'Auto-assign leads based on conversations',
          'Update pipeline stages automatically',
          'Notify managers on important conversations'
        ],
        alignRight: false,
        image: 'workflow-visual',
        cta: { label: 'Install free', url: '#install' }
      }
    ],
    howItWorks: {
      badge: 'Live in 5 Minutes',
      headline: 'No developers. No IT tickets. No waiting.',
      description: 'Connect LeadSquared to WhatsApp in minutes. Start capturing lead conversations automatically.',
      steps: [
        { number: '01', title: 'Install Extension', description: 'Add Eazybe to Chrome. One click, 60 seconds.' },
        { number: '02', title: 'Connect LeadSquared', description: 'Authorize your LeadSquared account—simple setup.' },
        { number: '03', title: 'Open WhatsApp Web', description: 'The LeadSquared sidebar appears automatically.' },
        { number: '04', title: 'Capture Every Lead', description: 'Every conversation flows to LeadSquared. You\'re live.' }
      ]
    },
    useCases: {
      badge: 'Who It\'s For',
      headline: 'Built for LeadSquared teams where leads live on WhatsApp',
      items: [
        {
          icon: 'sales',
          title: 'Inside Sales Teams',
          description: 'Your reps nurture leads on WhatsApp all day. Now every conversation is captured in LeadSquared automatically. Lead scores reflect actual engagement, not just email opens.',
          benefits: ['Automatic lead capture', 'Conversation-based lead scoring', 'Zero manual logging']
        },
        {
          icon: 'support',
          title: 'Sales Managers',
          description: 'See which leads are being actively worked, which reps are responsive, and which conversations need attention. Real pipeline visibility based on actual WhatsApp activity.',
          benefits: ['Team-wide visibility', 'Response time tracking', 'Pipeline reality check']
        },
        {
          icon: 'marketing',
          title: 'Marketing Teams',
          description: 'Know what happens after leads are handed off to sales. Track WhatsApp engagement alongside other channels. Understand which campaigns generate the most conversations.',
          benefits: ['Lead journey visibility', 'Channel attribution', 'Engagement tracking']
        }
      ]
    },
    testimonial: {
      quote: 'Our inside sales team handles 200+ WhatsApp conversations daily. Before Eazybe, none of that showed up in LeadSquared. Now every lead interaction is captured automatically. Our lead scoring finally reflects reality.',
      author: 'Ankit Jain',
      title: 'Head of Sales',
      company: 'EduTech India'
    },
    faq: {
      badge: 'Common Questions',
      headline: 'What you need to know',
      items: [
        {
          question: 'Does this work with personal WhatsApp or do we need Business API?',
          answer: 'Eazybe works with ALL versions: personal WhatsApp, WhatsApp Business App, and WhatsApp Business API. No expensive migration needed. Use whatever WhatsApp your team already has.'
        },
        {
          question: 'How does lead matching work with LeadSquared?',
          answer: 'When a WhatsApp conversation starts, Eazybe searches LeadSquared for a matching lead by phone number. Existing leads get the conversation linked. New contacts become new leads automatically with full details.'
        },
        {
          question: 'Can we trigger LeadSquared workflows from WhatsApp?',
          answer: 'Yes. WhatsApp events like new conversations, specific messages, or contact updates can trigger LeadSquared workflows. Auto-assign leads, update stages, and send notifications based on real conversation activity.'
        },
        {
          question: 'Can managers see all team conversations?',
          answer: 'Yes. Team admins have full visibility into all WhatsApp conversations across the team. Track response times, conversation volume, and engagement patterns.'
        },
        {
          question: 'Is our data secure?',
          answer: 'SOC 2 Type II certified, GDPR compliant, Meta Business Partner. All data encrypted in transit and at rest. Enterprise-grade security for your lead conversations.'
        },
        {
          question: 'How quickly can we be up and running?',
          answer: 'Most teams are live within 5 minutes. Install the Chrome extension, connect LeadSquared, open WhatsApp Web—done. No developer resources required.'
        }
      ]
    },
    cta: {
      headline: 'Stop losing lead conversations in',
      headlineHighlight: 'LeadSquared',
      description: 'Your leads are talking on WhatsApp. Make sure LeadSquared captures every conversation.',
      primaryCta: { label: 'Start Free Trial', url: '/signup?crm=leadsquared' },
      secondaryCta: { label: 'See a Demo', url: '/demo?crm=leadsquared' },
      footnote: '14-day free trial • No credit card • Live in 5 minutes'
    }
  },

  // --- Freshdesk ---
  {
    _id: 'productPage-freshdesk-whatsapp-integration-en',
    title: 'Freshdesk WhatsApp Integration',
    crmName: 'Freshdesk',
    crmSlug: 'freshdesk',
    crmColor: '#25C16F',
    slug: { _type: 'slug', current: 'freshdesk-whatsapp-integration' },
    language: 'en',
    category: 'crm-integration',
    _type: 'productPage',
    seo: {
      metaTitle: 'Freshdesk WhatsApp Integration | Eazybe',
      metaDescription: 'Sync WhatsApp conversations to Freshdesk automatically. Contact sync and full chat backup—no API migration needed. Support teams love it.'
    },
    hero: {
      badge: 'Freshdesk + WhatsApp',
      headline: 'Your support tickets are missing',
      headlineHighlight: 'WhatsApp context',
      description: 'Customers reach out on WhatsApp but Freshdesk tickets have zero conversation history. Agents ask customers to repeat themselves. Resolution times suffer. Eazybe syncs every WhatsApp conversation to Freshdesk—full context for every ticket.',
      primaryCta: { label: 'Start Free Trial', url: '/signup?crm=freshdesk' },
      secondaryCta: { label: 'See How It Works', url: '/demo?crm=freshdesk' },
      stats: [
        { value: '30,000+', label: 'Companies trust us' },
        { value: '100%', label: 'Conversation visibility' },
        { value: '60%', label: 'Faster resolutions' }
      ]
    },
    benefits: {
      badge: 'Full Context Support',
      headline: 'Freshdesk tracks tickets. We bring in the WhatsApp conversations behind them.',
      items: [
        {
          icon: 'sync',
          title: 'Automatic Contact Sync',
          description: 'WhatsApp contacts sync into Freshdesk automatically. Match conversations to existing contacts, create new ones on the fly. Every customer interaction is attributed correctly.'
        },
        {
          icon: 'cloud',
          title: 'Complete Chat Backup',
          description: 'Every WhatsApp message—text, images, voice notes, screenshots—backed up and linked to Freshdesk contacts. Full conversation history available for every ticket.'
        },
        {
          icon: 'team',
          title: 'Team Visibility',
          description: 'See all WhatsApp conversations across your support team. Know which agents are handling what, track response times, and ensure no customer is left waiting.'
        },
        {
          icon: 'workflow',
          title: 'Works With Your WhatsApp',
          description: 'Personal WhatsApp, WhatsApp Business App, or WhatsApp API—Eazybe works with all versions. No expensive API migration. Start syncing in minutes.'
        },
        {
          icon: 'analytics',
          title: 'Conversation Context',
          description: 'When a customer opens a ticket, agents can see the full WhatsApp conversation history. No more "can you explain the issue again?" moments. Faster resolutions, happier customers.'
        },
        {
          icon: 'security',
          title: 'Enterprise Security',
          description: 'SOC 2 certified, GDPR compliant, Meta Business Partner. Customer support conversations are encrypted and handled with enterprise-grade security.'
        }
      ]
    },
    features: [
      {
        badge: 'Contact Sync',
        headline: 'WhatsApp contacts mapped to Freshdesk automatically.',
        description: 'Every WhatsApp conversation is automatically linked to the right Freshdesk contact. New contacts are created with full details. Your support team always has the right context for every customer.',
        points: [
          'Auto-match WhatsApp contacts to Freshdesk records',
          'New contacts created automatically',
          'Phone numbers normalized across systems',
          'Complete customer profile in Freshdesk'
        ],
        alignRight: false,
        image: 'sync-visual',
        cta: { label: 'See it work', url: '#demo' }
      },
      {
        badge: 'Chat Backup',
        headline: 'Every support conversation backed up. Forever.',
        description: 'WhatsApp conversations are the most common support channel for many teams—but they vanish when phones change. Eazybe preserves every message, image, and file in Freshdesk. Complete support history, always available.',
        points: [
          'Full message history synced to Freshdesk',
          'Images, screenshots, and files included',
          'Searchable conversation archive',
          'Available for any agent handling the ticket'
        ],
        alignRight: true,
        image: 'mini-crm-visual',
        cta: { label: 'Explore', url: '#demo' }
      },
      {
        badge: 'No Migration Needed',
        headline: 'Works with the WhatsApp you already use.',
        description: 'Other solutions force you into WhatsApp Business API—expensive, complex, and restrictive. Eazybe is a Chrome extension that works with personal WhatsApp, Business App, and API. Install and start syncing in minutes.',
        points: [
          'Chrome extension installs in 60 seconds',
          'Works with personal WhatsApp accounts',
          'No API migration or technical setup',
          'One tool for all WhatsApp versions'
        ],
        alignRight: false,
        image: 'workflow-visual',
        cta: { label: 'Install free', url: '#install' }
      }
    ],
    howItWorks: {
      badge: 'Live in 5 Minutes',
      headline: 'No developers. No IT tickets. No waiting.',
      description: 'Connect Freshdesk to WhatsApp and give your support team full conversation context.',
      steps: [
        { number: '01', title: 'Install Extension', description: 'Add Eazybe to Chrome. One click, 60 seconds.' },
        { number: '02', title: 'Connect Freshdesk', description: 'Authorize your Freshdesk account—quick and simple.' },
        { number: '03', title: 'Open WhatsApp Web', description: 'Start handling support conversations.' },
        { number: '04', title: 'Full Context Support', description: 'Every message syncs to Freshdesk automatically.' }
      ]
    },
    useCases: {
      badge: 'Who It\'s For',
      headline: 'Built for Freshdesk teams handling WhatsApp support',
      items: [
        {
          icon: 'support',
          title: 'Support Agents',
          description: 'Customers message on WhatsApp expecting fast help. With full conversation history in Freshdesk, agents have complete context for every ticket. No more asking customers to repeat themselves.',
          benefits: ['Full conversation context', 'Faster ticket resolution', 'Customer history at a glance']
        },
        {
          icon: 'sales',
          title: 'Support Managers',
          description: 'See all WhatsApp conversations across your support team. Track response times, identify bottlenecks, and ensure SLAs are met on WhatsApp-originated tickets.',
          benefits: ['Team-wide visibility', 'Response time tracking', 'SLA monitoring']
        },
        {
          icon: 'marketing',
          title: 'Customer Success',
          description: 'When customers escalate, the full conversation trail is in Freshdesk. Understand what happened, who said what, and resolve issues faster with complete context.',
          benefits: ['Escalation context', 'Conversation audit trail', 'Customer satisfaction']
        }
      ]
    },
    testimonial: {
      quote: 'Our support team handles hundreds of WhatsApp conversations daily. Before Eazybe, agents had no context when tickets came in. Now every conversation is right there in Freshdesk. Resolution times dropped significantly.',
      author: 'Neha Kapoor',
      title: 'Support Operations Lead',
      company: 'FinServ Technologies'
    },
    faq: {
      badge: 'Common Questions',
      headline: 'What you need to know',
      items: [
        {
          question: 'Does this work with personal WhatsApp or do we need Business API?',
          answer: 'Eazybe works with ALL versions: personal WhatsApp, WhatsApp Business App, and WhatsApp Business API. Your support team can start syncing today without any migration.'
        },
        {
          question: 'How does contact matching work with Freshdesk?',
          answer: 'Eazybe matches WhatsApp contacts to Freshdesk by phone number. Existing contacts are linked automatically. New contacts are created with phone number, name, and conversation history.'
        },
        {
          question: 'Can we see WhatsApp conversations on Freshdesk tickets?',
          answer: 'Yes. All WhatsApp conversations are synced to the contact record in Freshdesk. When agents handle tickets, they can see the full WhatsApp history for complete context.'
        },
        {
          question: 'Can managers see all team conversations?',
          answer: 'Yes. Team admins have full visibility into all WhatsApp conversations across the support team. Track who is handling what and monitor response patterns.'
        },
        {
          question: 'Is our data secure?',
          answer: 'SOC 2 Type II certified, GDPR compliant, Meta Business Partner. All customer conversations are encrypted in transit and at rest.'
        },
        {
          question: 'How quickly can we be up and running?',
          answer: 'Most teams are live within 5 minutes. Install the Chrome extension, connect Freshdesk, open WhatsApp Web—done. No technical setup required.'
        }
      ]
    },
    cta: {
      headline: 'Give your support team full',
      headlineHighlight: 'WhatsApp context',
      description: 'Customers expect fast support on WhatsApp. Make sure your Freshdesk agents have the full picture.',
      primaryCta: { label: 'Start Free Trial', url: '/signup?crm=freshdesk' },
      secondaryCta: { label: 'See a Demo', url: '/demo?crm=freshdesk' },
      footnote: '14-day free trial • No credit card • Live in 5 minutes'
    }
  },

  // --- Google Sheets ---
  {
    _id: 'productPage-google-sheets-whatsapp-integration-en',
    title: 'Google Sheets WhatsApp Integration',
    crmName: 'Google Sheets',
    crmSlug: 'google-sheets',
    crmColor: '#0F9D58',
    slug: { _type: 'slug', current: 'google-sheets-whatsapp-integration' },
    language: 'en',
    category: 'crm-integration',
    _type: 'productPage',
    seo: {
      metaTitle: 'Google Sheets WhatsApp Integration | Eazybe',
      metaDescription: 'Export WhatsApp contacts and conversations to Google Sheets automatically. Perfect for teams using spreadsheets to track leads and customer interactions.'
    },
    hero: {
      badge: 'Google Sheets + WhatsApp',
      headline: 'Your spreadsheet is missing',
      headlineHighlight: 'WhatsApp data',
      description: 'You track leads and customers in Google Sheets—but WhatsApp conversations live on personal phones. Contact details get copy-pasted (or forgotten). Eazybe syncs WhatsApp contacts and chat data to Google Sheets automatically.',
      primaryCta: { label: 'Start Free Trial', url: '/signup?crm=google-sheets' },
      secondaryCta: { label: 'See How It Works', url: '/demo?crm=google-sheets' },
      stats: [
        { value: '30,000+', label: 'Companies trust us' },
        { value: '87%', label: 'Less manual data entry' },
        { value: '100%', label: 'Contact capture' }
      ]
    },
    benefits: {
      badge: 'Spreadsheet + WhatsApp',
      headline: 'Google Sheets tracks your data. We fill in the WhatsApp conversations.',
      items: [
        {
          icon: 'sync',
          title: 'Automatic Contact Export',
          description: 'WhatsApp contacts flow into Google Sheets automatically. Names, phone numbers, and conversation metadata—all captured without manual data entry.'
        },
        {
          icon: 'cloud',
          title: 'Chat Data Backup',
          description: 'Conversation data from WhatsApp synced to your spreadsheets. Track message counts, last contact dates, and conversation summaries in organized rows and columns.'
        },
        {
          icon: 'team',
          title: 'Team Data Collection',
          description: 'Multiple team members can sync their WhatsApp data to the same Google Sheet. Centralized view of all customer interactions across the team.'
        },
        {
          icon: 'workflow',
          title: 'No CRM Required',
          description: 'Not every team needs a full CRM. If Google Sheets is your system of record, Eazybe makes sure WhatsApp data gets there. Perfect for startups and small teams.'
        },
        {
          icon: 'analytics',
          title: 'Custom Reporting',
          description: 'Use Google Sheets formulas, pivot tables, and charts on your WhatsApp data. Build custom reports and dashboards that reflect real conversation activity.'
        },
        {
          icon: 'security',
          title: 'Secure Data Flow',
          description: 'SOC 2 certified, GDPR compliant, Meta Business Partner. Your WhatsApp data flows securely to Google Sheets with enterprise-grade encryption.'
        }
      ]
    },
    features: [
      {
        badge: 'Contact Export',
        headline: 'WhatsApp contacts in your spreadsheet automatically.',
        description: 'Every WhatsApp contact syncs to Google Sheets with name, phone number, and conversation metadata. No more copying numbers from phones or asking reps to update spreadsheets manually.',
        points: [
          'Automatic contact capture from WhatsApp',
          'Names, phone numbers, and metadata synced',
          'New contacts added to sheets automatically',
          'Existing contacts updated with latest info'
        ],
        alignRight: false,
        image: 'sync-visual',
        cta: { label: 'See it work', url: '#demo' }
      },
      {
        badge: 'Conversation Backup',
        headline: 'WhatsApp chat data in spreadsheet format.',
        description: 'Track conversation activity in organized rows and columns. Message counts, timestamps, contact details—all the data you need to understand WhatsApp engagement, in the format your team already knows.',
        points: [
          'Message counts and timestamps captured',
          'Last contact dates tracked automatically',
          'Conversation metadata in clean columns',
          'Full backup of WhatsApp activity'
        ],
        alignRight: true,
        image: 'mini-crm-visual',
        cta: { label: 'Explore', url: '#demo' }
      },
      {
        badge: 'Easy Setup',
        headline: 'Connect WhatsApp to Google Sheets in minutes.',
        description: 'No formulas to write, no APIs to configure. Eazybe handles the connection between WhatsApp and Google Sheets. Just install, connect, and your data starts flowing.',
        points: [
          'Chrome extension installs in 60 seconds',
          'Google Sheets connected with one click',
          'No formulas or scripts needed',
          'Data flows automatically'
        ],
        alignRight: false,
        image: 'workflow-visual',
        cta: { label: 'Install free', url: '#install' }
      }
    ],
    howItWorks: {
      badge: 'Live in 5 Minutes',
      headline: 'No formulas. No scripts. No waiting.',
      description: 'Connect Google Sheets to WhatsApp and start capturing conversation data automatically.',
      steps: [
        { number: '01', title: 'Install Extension', description: 'Add Eazybe to Chrome. One click, 60 seconds.' },
        { number: '02', title: 'Connect Google Sheets', description: 'Select or create a spreadsheet—one click.' },
        { number: '03', title: 'Open WhatsApp Web', description: 'Start having conversations as normal.' },
        { number: '04', title: 'Data Flows Automatically', description: 'Contacts and chat data appear in your sheet.' }
      ]
    },
    useCases: {
      badge: 'Who It\'s For',
      headline: 'Built for teams tracking WhatsApp data in spreadsheets',
      items: [
        {
          icon: 'sales',
          title: 'Small Sales Teams',
          description: 'Not ready for a full CRM? Google Sheets works great for tracking leads. Now WhatsApp contacts and conversations sync automatically—no more manual data entry.',
          benefits: ['Automatic contact capture', 'Conversation tracking', 'No CRM needed']
        },
        {
          icon: 'support',
          title: 'Operations Teams',
          description: 'Track customer interactions, vendor communications, and team WhatsApp activity in organized spreadsheets. Build custom reports with the data you care about.',
          benefits: ['Custom data tracking', 'Team activity logs', 'Operational reporting']
        },
        {
          icon: 'marketing',
          title: 'Startups & SMBs',
          description: 'When your team of 5 uses WhatsApp for everything—sales, support, partnerships—Google Sheets is the perfect lightweight system. Eazybe fills it with data automatically.',
          benefits: ['Lightweight setup', 'No monthly CRM fees', 'Scales with your team']
        }
      ]
    },
    testimonial: {
      quote: 'We\'re a 15-person team tracking everything in Google Sheets. Before Eazybe, reps were supposed to log WhatsApp contacts manually—they never did. Now everything syncs automatically. Simple, effective, and our data is finally complete.',
      author: 'Vikram Patel',
      title: 'Co-founder',
      company: 'GrowthSync'
    },
    faq: {
      badge: 'Common Questions',
      headline: 'What you need to know',
      items: [
        {
          question: 'Does this work with personal WhatsApp?',
          answer: 'Yes. Eazybe works with personal WhatsApp, WhatsApp Business App, and WhatsApp Business API. No migration needed.'
        },
        {
          question: 'What data gets synced to Google Sheets?',
          answer: 'Contact names, phone numbers, conversation metadata (message counts, timestamps, last contact date), and conversation summaries. The exact columns are configurable.'
        },
        {
          question: 'Can multiple team members sync to the same sheet?',
          answer: 'Yes. Multiple team members can sync their WhatsApp data to the same Google Sheet, giving you a centralized view of all customer interactions.'
        },
        {
          question: 'Will this slow down Google Sheets?',
          answer: 'No. Eazybe syncs data efficiently in the background. Your spreadsheet remains fast and responsive even with thousands of contacts.'
        },
        {
          question: 'Is our data secure?',
          answer: 'SOC 2 certified, GDPR compliant, Meta Business Partner. Data transfers are encrypted. Your WhatsApp data is handled with enterprise-grade security.'
        },
        {
          question: 'How quickly can we start?',
          answer: 'Most teams are syncing data within 5 minutes. Install the extension, connect Google Sheets, open WhatsApp Web—done.'
        }
      ]
    },
    cta: {
      headline: 'Stop manually entering WhatsApp data into',
      headlineHighlight: 'Google Sheets',
      description: 'Your team uses WhatsApp all day. Make sure your spreadsheet captures every contact and conversation automatically.',
      primaryCta: { label: 'Start Free Trial', url: '/signup?crm=google-sheets' },
      secondaryCta: { label: 'See a Demo', url: '/demo?crm=google-sheets' },
      footnote: '14-day free trial • No credit card • Live in 5 minutes'
    }
  },

  // --- Webhooks ---
  {
    _id: 'productPage-webhooks-whatsapp-integration-en',
    title: 'Webhooks WhatsApp Integration',
    crmName: 'Webhooks',
    crmSlug: 'webhooks',
    crmColor: '#6B7280',
    slug: { _type: 'slug', current: 'webhooks-whatsapp-integration' },
    language: 'en',
    category: 'crm-integration',
    _type: 'productPage',
    seo: {
      metaTitle: 'WhatsApp Webhooks Integration | Eazybe',
      metaDescription: 'Send WhatsApp conversation events to any system via webhooks. Build custom integrations with real-time WhatsApp data—contacts, messages, and events.'
    },
    hero: {
      badge: 'Webhooks + WhatsApp',
      headline: 'Send WhatsApp data to',
      headlineHighlight: 'any system you build',
      description: 'Your CRM isn\'t on our pre-built list? No problem. Eazybe webhooks send real-time WhatsApp events—new contacts, messages, conversation updates—to any HTTP endpoint. Build custom integrations with your internal tools, databases, or automation platforms.',
      primaryCta: { label: 'Start Free Trial', url: '/signup?crm=webhooks' },
      secondaryCta: { label: 'See How It Works', url: '/demo?crm=webhooks' },
      stats: [
        { value: '30,000+', label: 'Companies trust us' },
        { value: 'Real-time', label: 'Event delivery' },
        { value: 'Any system', label: 'HTTP endpoint' }
      ]
    },
    benefits: {
      badge: 'Custom Integrations',
      headline: 'Your system, your rules. We deliver the WhatsApp data.',
      items: [
        {
          icon: 'sync',
          title: 'Real-Time Events',
          description: 'New message, new contact, conversation update—events fire in real-time via HTTP POST to your endpoint. Build reactive systems that respond to WhatsApp activity as it happens.'
        },
        {
          icon: 'workflow',
          title: 'Any System Integration',
          description: 'Send WhatsApp data to your internal CRM, custom database, Zapier, Make, n8n, or any platform that accepts webhooks. If it has an HTTP endpoint, it works.'
        },
        {
          icon: 'cloud',
          title: 'Structured Data Payloads',
          description: 'Clean JSON payloads with contact details, message content, timestamps, and metadata. Easy to parse, easy to integrate, well-documented schemas.'
        },
        {
          icon: 'team',
          title: 'Team Event Stream',
          description: 'Receive events from all team members in a single webhook stream. Centralized data collection for WhatsApp activity across your entire organization.'
        },
        {
          icon: 'analytics',
          title: 'Build Custom Dashboards',
          description: 'Feed WhatsApp conversation data into your analytics stack. Build dashboards, reports, and alerts based on real-time WhatsApp activity.'
        },
        {
          icon: 'security',
          title: 'Secure Delivery',
          description: 'SOC 2 certified, GDPR compliant. Webhook payloads are signed for verification. Retry logic ensures no events are lost. Enterprise-grade reliability.'
        }
      ]
    },
    features: [
      {
        badge: 'Event Stream',
        headline: 'Real-time WhatsApp events to your endpoint.',
        description: 'Every WhatsApp action triggers a webhook event. New contacts, incoming messages, sent messages, conversation updates—all delivered as structured JSON to your HTTP endpoint within seconds.',
        points: [
          'New contact and message events in real-time',
          'Structured JSON payloads with full metadata',
          'Event types for contacts, messages, and conversations',
          'Millisecond delivery to your endpoint'
        ],
        alignRight: false,
        image: 'sync-visual',
        cta: { label: 'See payloads', url: '#demo' }
      },
      {
        badge: 'Any Platform',
        headline: 'Connect WhatsApp to anything with an HTTP endpoint.',
        description: 'Internal CRMs, custom databases, automation platforms like Zapier or Make, data warehouses, Slack bots—if it accepts HTTP requests, you can feed it WhatsApp data. No platform limitations.',
        points: [
          'Works with Zapier, Make, n8n, and more',
          'Connect to custom internal tools',
          'Feed data warehouses and analytics',
          'Trigger any HTTP-based automation'
        ],
        alignRight: true,
        image: 'mini-crm-visual',
        cta: { label: 'Explore', url: '#demo' }
      },
      {
        badge: 'Developer Friendly',
        headline: 'Clean APIs. Great docs. Easy to build on.',
        description: 'Well-documented webhook schemas, code examples in multiple languages, and a testing dashboard to verify your integration. Build with confidence.',
        points: [
          'Comprehensive webhook documentation',
          'Code examples in Python, Node.js, PHP',
          'Testing dashboard for debugging',
          'Signed payloads for security'
        ],
        alignRight: false,
        image: 'workflow-visual',
        cta: { label: 'Read docs', url: '#docs' }
      }
    ],
    howItWorks: {
      badge: 'Quick Setup',
      headline: 'Configure your webhook in minutes.',
      description: 'Point Eazybe at your endpoint and start receiving WhatsApp events.',
      steps: [
        { number: '01', title: 'Install Extension', description: 'Add Eazybe to Chrome. One click, 60 seconds.' },
        { number: '02', title: 'Configure Webhook URL', description: 'Enter your HTTP endpoint in the settings.' },
        { number: '03', title: 'Select Events', description: 'Choose which WhatsApp events to send.' },
        { number: '04', title: 'Start Receiving Data', description: 'Events flow to your system in real-time.' }
      ]
    },
    useCases: {
      badge: 'Who It\'s For',
      headline: 'Built for teams with custom integration needs',
      items: [
        {
          icon: 'sales',
          title: 'Engineering Teams',
          description: 'Build custom WhatsApp integrations for your internal tools. Feed conversation data into your own databases, trigger internal workflows, and create bespoke automation.',
          benefits: ['Custom integration freedom', 'Structured event data', 'Developer-friendly docs']
        },
        {
          icon: 'support',
          title: 'Automation Builders',
          description: 'Use Zapier, Make, or n8n to connect WhatsApp events to hundreds of apps. Create complex automation flows triggered by real WhatsApp activity.',
          benefits: ['Zapier/Make compatible', 'Multi-app workflows', 'No-code automation']
        },
        {
          icon: 'marketing',
          title: 'Data Teams',
          description: 'Feed WhatsApp conversation data into your data warehouse. Build analytics dashboards, track engagement metrics, and generate insights from real conversation data.',
          benefits: ['Data warehouse integration', 'Custom analytics', 'Real-time data pipeline']
        }
      ]
    },
    testimonial: {
      quote: 'We needed WhatsApp data in our internal CRM that no one else integrates with. Eazybe webhooks let us build exactly what we needed. Clean JSON, reliable delivery, and we were up and running in a day.',
      author: 'David Chen',
      title: 'CTO',
      company: 'CustomFlow Systems'
    },
    faq: {
      badge: 'Common Questions',
      headline: 'What you need to know',
      items: [
        {
          question: 'What events can I receive via webhook?',
          answer: 'New contacts, incoming messages, sent messages, conversation updates, and contact updates. Each event includes full metadata—timestamps, contact details, message content, and conversation context.'
        },
        {
          question: 'What does the webhook payload look like?',
          answer: 'Clean JSON with event type, timestamp, contact details, message content, and metadata. Well-documented schemas make parsing straightforward in any language.'
        },
        {
          question: 'Is there retry logic for failed deliveries?',
          answer: 'Yes. If your endpoint returns a non-200 status, Eazybe retries with exponential backoff. Events are queued and delivered reliably even if your system has temporary downtime.'
        },
        {
          question: 'Can I use this with Zapier or Make?',
          answer: 'Absolutely. Set up a Zapier webhook trigger or Make HTTP module as your endpoint. Eazybe sends events there, and you can route data to hundreds of connected apps.'
        },
        {
          question: 'Is the data secure?',
          answer: 'SOC 2 certified, GDPR compliant. Webhook payloads can be signed with HMAC for verification. All data is encrypted in transit.'
        },
        {
          question: 'How quickly can I be set up?',
          answer: 'If you have an HTTP endpoint ready, you can be receiving WhatsApp events within minutes. Install the extension, enter your webhook URL, and events start flowing.'
        }
      ]
    },
    cta: {
      headline: 'Build custom integrations with',
      headlineHighlight: 'WhatsApp data',
      description: 'Send real-time WhatsApp events to any system. Your data, your way.',
      primaryCta: { label: 'Start Free Trial', url: '/signup?crm=webhooks' },
      secondaryCta: { label: 'Read API Docs', url: '/docs/webhooks' },
      footnote: '14-day free trial • No credit card • Developer-friendly'
    }
  },

  // --- Pipedrive ---
  {
    _id: 'productPage-pipedrive-whatsapp-integration-en',
    title: 'Pipedrive WhatsApp Integration',
    crmName: 'Pipedrive',
    crmSlug: 'pipedrive',
    crmColor: '#017737',
    slug: { _type: 'slug', current: 'pipedrive-whatsapp-integration' },
    language: 'en',
    category: 'crm-integration',
    _type: 'productPage',
    seo: {
      metaTitle: 'Pipedrive WhatsApp Integration | Eazybe',
      metaDescription: 'Sync WhatsApp conversations to Pipedrive automatically. Contact sync, chat backup, CRM sidebar, and workflow automation—no API migration needed.'
    },
    hero: {
      badge: 'Pipedrive + WhatsApp',
      headline: 'Your pipeline is blind to',
      headlineHighlight: 'WhatsApp deals',
      description: 'Reps move deals forward on WhatsApp but Pipedrive shows stale activities. Deal stages don\'t reflect real conversations. Follow-ups slip through cracks. Eazybe syncs every WhatsApp message to Pipedrive—contacts, conversations, and deal signals automatically.',
      primaryCta: { label: 'Start Free Trial', url: '/signup?crm=pipedrive' },
      secondaryCta: { label: 'See How It Works', url: '/demo?crm=pipedrive' },
      stats: [
        { value: '30,000+', label: 'Companies trust us' },
        { value: '87%', label: 'Less manual data entry' },
        { value: '100%', label: 'Conversation visibility' }
      ]
    },
    benefits: {
      badge: 'Pipeline Truth',
      headline: 'Pipedrive tracks deals. We show you the conversations driving them.',
      items: [
        {
          icon: 'sync',
          title: 'Automatic Contact Sync',
          description: 'WhatsApp contacts sync into Pipedrive people and organizations automatically. New contacts are created, existing ones matched. Every conversation links to the right deal.'
        },
        {
          icon: 'crm-view',
          title: 'CRM Sidebar in WhatsApp',
          description: 'See Pipedrive deal values, pipeline stages, and contact history while chatting on WhatsApp. Update deal stages, add notes, and create activities without switching tabs.'
        },
        {
          icon: 'cloud',
          title: 'Complete Chat Backup',
          description: 'Every WhatsApp message—text, images, voice notes, proposals—backed up and linked to Pipedrive contacts and deals. Full conversation history preserved forever.'
        },
        {
          icon: 'workflow',
          title: 'Workflow Automation',
          description: 'Trigger Pipedrive automations from WhatsApp activity. Move deals when conversations progress, create activities from messages, and keep your pipeline in sync with reality.'
        },
        {
          icon: 'team',
          title: 'Team Pipeline Visibility',
          description: 'Managers see all WhatsApp deal conversations across the team. Know which deals are really active versus stuck. Stop relying on rep self-reporting.'
        },
        {
          icon: 'security',
          title: 'Enterprise Security',
          description: 'SOC 2 certified, GDPR compliant, Meta Business Partner. Deal conversations are encrypted and secure. Built for sales teams handling sensitive negotiations.'
        }
      ]
    },
    features: [
      {
        badge: 'Deal Sync',
        headline: 'WhatsApp conversations linked to Pipedrive deals.',
        description: 'Every WhatsApp conversation is automatically connected to the right Pipedrive person, organization, and deal. Contact matching is instant. New contacts flow in automatically. Your pipeline data stays complete.',
        points: [
          'Auto-match contacts to Pipedrive people',
          'Conversations linked to deals automatically',
          'New contacts created with full details',
          'Organization matching and creation'
        ],
        alignRight: false,
        image: 'sync-visual',
        cta: { label: 'See it work', url: '#demo' }
      },
      {
        badge: 'Mini-CRM Sidebar',
        headline: 'Your entire Pipedrive pipeline, inside WhatsApp.',
        description: 'View deal values, pipeline stages, and contact history without leaving WhatsApp. Update deals mid-conversation. Move stages when you close. Create follow-up activities instantly.',
        points: [
          'View deal value, stage, and owner instantly',
          'Update pipeline without leaving WhatsApp',
          'Create activities and notes in one click',
          'Full contact and deal history at your fingertips'
        ],
        alignRight: true,
        image: 'mini-crm-visual',
        cta: { label: 'Explore', url: '#demo' }
      },
      {
        badge: 'Smart Automation',
        headline: 'WhatsApp activity keeps your Pipedrive pipeline real.',
        description: 'When conversations happen on WhatsApp, your Pipedrive pipeline should reflect it. Auto-create activities, update deal stages, and trigger workflows based on actual conversation data—not manual logging.',
        points: [
          'Auto-create activities from WhatsApp messages',
          'Update deal stages based on conversations',
          'Trigger Pipedrive automations from chat events',
          'Keep pipeline data fresh automatically'
        ],
        alignRight: false,
        image: 'workflow-visual',
        cta: { label: 'Install free', url: '#install' }
      }
    ],
    howItWorks: {
      badge: 'Live in 5 Minutes',
      headline: 'No developers. No IT tickets. No waiting.',
      description: 'Connect Pipedrive to WhatsApp and see your real pipeline in minutes.',
      steps: [
        { number: '01', title: 'Install Extension', description: 'Add Eazybe to Chrome. One click, 60 seconds.' },
        { number: '02', title: 'Connect Pipedrive', description: 'OAuth login—no API keys, no developer needed.' },
        { number: '03', title: 'Open WhatsApp Web', description: 'The Pipedrive sidebar appears automatically.' },
        { number: '04', title: 'Close More Deals', description: 'Every conversation flows to Pipedrive. You\'re live.' }
      ]
    },
    useCases: {
      badge: 'Who It\'s For',
      headline: 'Built for Pipedrive teams where deals close on WhatsApp',
      items: [
        {
          icon: 'sales',
          title: 'Sales Reps',
          description: 'Stop switching between WhatsApp and Pipedrive. See deal details while chatting, update stages mid-conversation, and let every message sync to your pipeline automatically.',
          benefits: ['Deal context in WhatsApp', 'Automatic activity logging', 'Zero manual data entry']
        },
        {
          icon: 'support',
          title: 'Sales Managers',
          description: 'See which deals have active WhatsApp conversations and which are going cold. Real pipeline visibility based on actual conversations, not last-updated timestamps.',
          benefits: ['Real pipeline visibility', 'Conversation-based deal health', 'Team activity tracking']
        },
        {
          icon: 'marketing',
          title: 'Revenue Operations',
          description: 'Get accurate pipeline data that reflects real customer engagement. Forecast with confidence when your CRM shows actual WhatsApp conversation activity.',
          benefits: ['Accurate pipeline data', 'Better forecasting', 'Engagement-based reporting']
        }
      ]
    },
    testimonial: {
      quote: 'Our sales team lives in Pipedrive and WhatsApp. Before Eazybe, those two worlds were completely disconnected. Now every WhatsApp conversation shows up on the deal timeline. Our pipeline finally tells the real story.',
      author: 'Marcus Rodriguez',
      title: 'VP Sales',
      company: 'CloudBridge Solutions'
    },
    faq: {
      badge: 'Common Questions',
      headline: 'What you need to know',
      items: [
        {
          question: 'Does this work with personal WhatsApp or do we need Business API?',
          answer: 'Eazybe works with ALL versions: personal WhatsApp, WhatsApp Business App, and WhatsApp Business API. No migration needed. Start syncing with the WhatsApp your team already uses.'
        },
        {
          question: 'How does deal linking work with Pipedrive?',
          answer: 'Eazybe matches WhatsApp contacts to Pipedrive people by phone number and automatically links conversations to associated deals. New contacts create new people in Pipedrive with full details.'
        },
        {
          question: 'Can we trigger Pipedrive automations from WhatsApp?',
          answer: 'Yes. WhatsApp events can trigger Pipedrive workflow automations. Create activities, move deal stages, and update fields based on real conversation activity.'
        },
        {
          question: 'Can managers see all team conversations?',
          answer: 'Yes. Team admins have full visibility into all WhatsApp conversations linked to deals. Track which deals are active, which reps are engaging, and identify pipeline risks.'
        },
        {
          question: 'Is our data secure?',
          answer: 'SOC 2 Type II certified, GDPR compliant, Meta Business Partner. All deal conversations are encrypted in transit and at rest.'
        },
        {
          question: 'How quickly can we be up and running?',
          answer: 'Most teams are live within 5 minutes. Install Chrome extension, OAuth into Pipedrive, open WhatsApp Web—done. No developer resources needed.'
        }
      ]
    },
    cta: {
      headline: 'Stop flying blind on',
      headlineHighlight: 'WhatsApp deals',
      description: 'Your deals close on WhatsApp. Make sure Pipedrive sees every conversation.',
      primaryCta: { label: 'Start Free Trial', url: '/signup?crm=pipedrive' },
      secondaryCta: { label: 'See a Demo', url: '/demo?crm=pipedrive' },
      footnote: '14-day free trial • No credit card • Live in 5 minutes'
    }
  },

  // --- Monday.com ---
  {
    _id: 'productPage-monday-whatsapp-integration-en',
    title: 'Monday.com WhatsApp Integration',
    crmName: 'Monday.com',
    crmSlug: 'monday',
    crmColor: '#FF3D57',
    slug: { _type: 'slug', current: 'monday-whatsapp-integration' },
    language: 'en',
    category: 'crm-integration',
    _type: 'productPage',
    seo: {
      metaTitle: 'Monday.com WhatsApp Integration | Eazybe',
      metaDescription: 'Sync WhatsApp conversations to Monday.com CRM automatically. Contact sync, chat backup, and conversation visibility for your sales boards.'
    },
    hero: {
      badge: 'Monday.com + WhatsApp',
      headline: 'Your Monday boards are missing',
      headlineHighlight: 'WhatsApp conversations',
      description: 'Your team tracks deals on Monday.com but the real conversations happen on WhatsApp. Board items show status updates but not the customer interactions driving them. Eazybe syncs WhatsApp contacts and conversations to Monday.com automatically.',
      primaryCta: { label: 'Start Free Trial', url: '/signup?crm=monday' },
      secondaryCta: { label: 'See How It Works', url: '/demo?crm=monday' },
      stats: [
        { value: '30,000+', label: 'Companies trust us' },
        { value: '87%', label: 'Less manual data entry' },
        { value: '100%', label: 'Conversation visibility' }
      ]
    },
    benefits: {
      badge: 'Complete Board View',
      headline: 'Monday.com tracks workflows. We add the WhatsApp conversations.',
      items: [
        {
          icon: 'sync',
          title: 'Automatic Contact Sync',
          description: 'WhatsApp contacts flow into Monday.com CRM boards automatically. Match conversations to existing items, create new contacts on the fly. Your boards stay up to date without manual work.'
        },
        {
          icon: 'cloud',
          title: 'Complete Chat Backup',
          description: 'Every WhatsApp message backed up and linked to Monday.com records. Text, images, voice notes, documents—full conversation history preserved and searchable.'
        },
        {
          icon: 'team',
          title: 'Team-Wide Visibility',
          description: 'See all WhatsApp conversations across your team from Monday.com. Know which team members are engaging customers, track response patterns, and ensure nothing falls through cracks.'
        },
        {
          icon: 'workflow',
          title: 'Works With Your WhatsApp',
          description: 'Personal WhatsApp, WhatsApp Business App, or WhatsApp API—Eazybe works with all versions. No expensive API migration. Your team starts syncing in minutes.'
        },
        {
          icon: 'analytics',
          title: 'Board-Level Insights',
          description: 'Add WhatsApp conversation data to your Monday.com boards. Track message counts, last contact dates, and engagement levels alongside your existing workflow columns.'
        },
        {
          icon: 'security',
          title: 'Enterprise Security',
          description: 'SOC 2 certified, GDPR compliant, Meta Business Partner. Your customer conversations are encrypted and handled with enterprise-grade security.'
        }
      ]
    },
    features: [
      {
        badge: 'Contact Sync',
        headline: 'WhatsApp contacts on your Monday.com boards.',
        description: 'Every WhatsApp contact syncs to your Monday.com CRM board automatically. Names, phone numbers, conversation data—all captured and linked to the right board items without manual entry.',
        points: [
          'Auto-match contacts to Monday.com items',
          'New contacts added to boards automatically',
          'Phone numbers and details synced',
          'Conversation history linked to items'
        ],
        alignRight: false,
        image: 'sync-visual',
        cta: { label: 'See it work', url: '#demo' }
      },
      {
        badge: 'Chat Backup',
        headline: 'Every conversation preserved in Monday.com.',
        description: 'WhatsApp conversations disappear when phones change. Eazybe backs up every message to Monday.com—text, images, voice notes, files. Customer history is always available on your boards.',
        points: [
          'Full message history on Monday.com items',
          'Images, voice notes, and files included',
          'Searchable conversation archive',
          'Preserved through team changes'
        ],
        alignRight: true,
        image: 'mini-crm-visual',
        cta: { label: 'Explore', url: '#demo' }
      },
      {
        badge: 'Easy Integration',
        headline: 'No code. No API. Just connect and go.',
        description: 'Eazybe is a Chrome extension that connects to Monday.com in clicks. No API configuration, no code, no IT involvement. Install, authorize, and WhatsApp data starts flowing to your boards.',
        points: [
          'Chrome extension installs in 60 seconds',
          'Monday.com connected with OAuth',
          'No developer resources needed',
          'Data flows automatically'
        ],
        alignRight: false,
        image: 'workflow-visual',
        cta: { label: 'Install free', url: '#install' }
      }
    ],
    howItWorks: {
      badge: 'Live in 5 Minutes',
      headline: 'No developers. No IT tickets. No waiting.',
      description: 'Connect Monday.com to WhatsApp and see conversations on your boards.',
      steps: [
        { number: '01', title: 'Install Extension', description: 'Add Eazybe to Chrome. One click, 60 seconds.' },
        { number: '02', title: 'Connect Monday.com', description: 'OAuth into your Monday.com workspace.' },
        { number: '03', title: 'Open WhatsApp Web', description: 'Start chatting as normal.' },
        { number: '04', title: 'See It on Your Board', description: 'Conversations sync to Monday.com automatically.' }
      ]
    },
    useCases: {
      badge: 'Who It\'s For',
      headline: 'Built for Monday.com teams where customers talk on WhatsApp',
      items: [
        {
          icon: 'sales',
          title: 'Sales Teams',
          description: 'Track deal conversations on Monday.com boards. Every WhatsApp chat links to the right deal item. No more switching between apps or manual logging.',
          benefits: ['Conversations on deal boards', 'Automatic contact matching', 'Zero manual entry']
        },
        {
          icon: 'support',
          title: 'Team Leads',
          description: 'See all WhatsApp activity across your team from Monday.com. Track who\'s engaging customers, response times, and conversation volume.',
          benefits: ['Team visibility', 'Response tracking', 'Workload insights']
        },
        {
          icon: 'marketing',
          title: 'Customer Success',
          description: 'When customers reach out on WhatsApp, the conversation history is on their Monday.com item. Full context for every interaction.',
          benefits: ['Full conversation history', 'Customer context', 'Seamless handoffs']
        }
      ]
    },
    testimonial: {
      quote: 'We manage everything in Monday.com boards, but WhatsApp conversations were invisible. Eazybe bridges that gap perfectly. Now our boards show the complete picture—tasks, deals, AND the conversations behind them.',
      author: 'Sarah Kim',
      title: 'Operations Manager',
      company: 'BrightPath Digital'
    },
    faq: {
      badge: 'Common Questions',
      headline: 'What you need to know',
      items: [
        {
          question: 'Does this work with personal WhatsApp?',
          answer: 'Yes. Eazybe works with personal WhatsApp, WhatsApp Business App, and WhatsApp Business API. No migration or special setup needed.'
        },
        {
          question: 'Which Monday.com boards does it sync to?',
          answer: 'Eazybe syncs WhatsApp data to your Monday.com CRM boards. Contacts, conversations, and activity data link to the appropriate board items.'
        },
        {
          question: 'Can multiple team members sync to the same board?',
          answer: 'Yes. All team members can sync their WhatsApp conversations to the same Monday.com workspace, giving you a centralized view of all customer interactions.'
        },
        {
          question: 'Can managers see all team conversations?',
          answer: 'Yes. Team admins have visibility into all WhatsApp conversations synced by team members. Track activity, response patterns, and engagement from Monday.com.'
        },
        {
          question: 'Is our data secure?',
          answer: 'SOC 2 certified, GDPR compliant, Meta Business Partner. All data is encrypted in transit and at rest. Enterprise-grade security for your customer conversations.'
        },
        {
          question: 'How quickly can we start?',
          answer: 'Most teams are syncing within 5 minutes. Install the Chrome extension, connect Monday.com, open WhatsApp Web—done.'
        }
      ]
    },
    cta: {
      headline: 'Add WhatsApp conversations to your',
      headlineHighlight: 'Monday.com boards',
      description: 'Your team works in Monday.com. Your customers talk on WhatsApp. Connect them.',
      primaryCta: { label: 'Start Free Trial', url: '/signup?crm=monday' },
      secondaryCta: { label: 'See a Demo', url: '/demo?crm=monday' },
      footnote: '14-day free trial • No credit card • Live in 5 minutes'
    }
  },

  // --- Google Calendar ---
  {
    _id: 'productPage-google-calendar-whatsapp-integration-en',
    title: 'Google Calendar WhatsApp Integration',
    crmName: 'Google Calendar',
    crmSlug: 'google-calendar',
    crmColor: '#4285F4',
    slug: { _type: 'slug', current: 'google-calendar-whatsapp-integration' },
    language: 'en',
    category: 'crm-integration',
    _type: 'productPage',
    seo: {
      metaTitle: 'Google Calendar WhatsApp Integration | Eazybe',
      metaDescription: 'Schedule meetings and reminders from WhatsApp conversations directly in Google Calendar. Never miss a follow-up again.'
    },
    hero: {
      badge: 'Google Calendar + WhatsApp',
      headline: 'Never miss a follow-up from',
      headlineHighlight: 'WhatsApp conversations',
      description: 'Customers say "let\'s schedule a call" on WhatsApp. That message gets buried in chat history. The follow-up never happens. Eazybe connects WhatsApp to Google Calendar so you can create events, set reminders, and schedule meetings without leaving the conversation.',
      primaryCta: { label: 'Start Free Trial', url: '/signup?crm=google-calendar' },
      secondaryCta: { label: 'See How It Works', url: '/demo?crm=google-calendar' },
      stats: [
        { value: '30,000+', label: 'Companies trust us' },
        { value: 'Zero', label: 'Missed follow-ups' },
        { value: '1-click', label: 'Meeting scheduling' }
      ]
    },
    benefits: {
      badge: 'Never Forget a Follow-Up',
      headline: 'WhatsApp conversations lead to meetings. Google Calendar makes sure they happen.',
      items: [
        {
          icon: 'sync',
          title: 'Quick Meeting Scheduling',
          description: 'Create Google Calendar events directly from WhatsApp conversations. One click to schedule a follow-up call, demo, or meeting—without leaving the chat window.'
        },
        {
          icon: 'workflow',
          title: 'Conversation-Based Reminders',
          description: 'Set reminders tied to specific WhatsApp conversations. Get notified when it\'s time to follow up with a customer. Context from the original chat is always attached.'
        },
        {
          icon: 'cloud',
          title: 'Chat Context in Events',
          description: 'Calendar events include context from the WhatsApp conversation. When the meeting arrives, you remember exactly what was discussed and what the customer needs.'
        },
        {
          icon: 'team',
          title: 'Team Scheduling',
          description: 'Schedule meetings for team members directly from WhatsApp. Assign follow-ups, book demos, and coordinate customer calls from within the conversation.'
        },
        {
          icon: 'analytics',
          title: 'Activity Tracking',
          description: 'Track meeting activity generated from WhatsApp conversations. Know how many follow-ups are scheduled, completed, and which conversations lead to meetings.'
        },
        {
          icon: 'security',
          title: 'Secure Integration',
          description: 'SOC 2 certified, GDPR compliant, Meta Business Partner. Your calendar and conversation data are handled with enterprise-grade security.'
        }
      ]
    },
    features: [
      {
        badge: 'One-Click Scheduling',
        headline: 'Create calendar events from any WhatsApp chat.',
        description: 'See a message that needs a follow-up? Click once to create a Google Calendar event. The contact details, conversation context, and suggested time are pre-filled. Just confirm and it\'s scheduled.',
        points: [
          'Create events without leaving WhatsApp',
          'Contact details auto-populated',
          'Conversation context attached to events',
          'Set custom reminders for follow-ups'
        ],
        alignRight: false,
        image: 'sync-visual',
        cta: { label: 'See it work', url: '#demo' }
      },
      {
        badge: 'Smart Reminders',
        headline: 'Follow-up reminders tied to conversations.',
        description: 'Set a reminder right from the WhatsApp chat. When it fires, you see the original conversation context. No more "what was I supposed to follow up about?" moments.',
        points: [
          'Set reminders from any WhatsApp conversation',
          'Original chat context included in reminder',
          'Google Calendar notifications keep you on track',
          'Snooze and reschedule with one click'
        ],
        alignRight: true,
        image: 'mini-crm-visual',
        cta: { label: 'Explore', url: '#demo' }
      },
      {
        badge: 'Team Coordination',
        headline: 'Schedule meetings for your entire team from WhatsApp.',
        description: 'Book a demo with a customer and assign it to the right rep. Create team meetings based on customer conversations. Coordinate follow-ups without switching between apps.',
        points: [
          'Assign meetings to team members',
          'Book customer demos from WhatsApp',
          'Team calendar visibility',
          'Coordinate follow-ups across the team'
        ],
        alignRight: false,
        image: 'workflow-visual',
        cta: { label: 'Install free', url: '#install' }
      }
    ],
    howItWorks: {
      badge: 'Live in 5 Minutes',
      headline: 'No complicated setup. Just connect and schedule.',
      description: 'Link Google Calendar to WhatsApp and never miss a follow-up again.',
      steps: [
        { number: '01', title: 'Install Extension', description: 'Add Eazybe to Chrome. One click, 60 seconds.' },
        { number: '02', title: 'Connect Google Calendar', description: 'Authorize with your Google account—instant.' },
        { number: '03', title: 'Open WhatsApp Web', description: 'Calendar integration appears in your sidebar.' },
        { number: '04', title: 'Schedule from Chat', description: 'Create events and reminders from any conversation.' }
      ]
    },
    useCases: {
      badge: 'Who It\'s For',
      headline: 'Built for teams who schedule from WhatsApp conversations',
      items: [
        {
          icon: 'sales',
          title: 'Sales Reps',
          description: 'Customer says "let\'s talk next week"? Create a calendar event instantly. Never forget a follow-up. Show up to every meeting with the full conversation context.',
          benefits: ['One-click meeting scheduling', 'Follow-up reminders', 'Conversation context in events']
        },
        {
          icon: 'support',
          title: 'Account Managers',
          description: 'Schedule check-ins, QBRs, and support calls directly from WhatsApp conversations. Track all customer meetings and ensure regular touchpoints.',
          benefits: ['Customer meeting tracking', 'Regular touchpoint scheduling', 'Context-rich calendar events']
        },
        {
          icon: 'marketing',
          title: 'Team Leads',
          description: 'Assign customer meetings to the right team member from WhatsApp. Ensure follow-ups are distributed properly and no customer is left waiting.',
          benefits: ['Team meeting assignment', 'Follow-up distribution', 'Calendar coordination']
        }
      ]
    },
    testimonial: {
      quote: 'Our sales team was losing follow-ups constantly. Customers would say "call me Tuesday" on WhatsApp and it would just get buried. With Eazybe, one click creates a calendar event with the full conversation. Follow-up rate improved dramatically.',
      author: 'Lisa Tan',
      title: 'Sales Operations',
      company: 'Elevate Commerce'
    },
    faq: {
      badge: 'Common Questions',
      headline: 'What you need to know',
      items: [
        {
          question: 'Does this work with personal WhatsApp?',
          answer: 'Yes. Eazybe works with personal WhatsApp, WhatsApp Business App, and WhatsApp Business API. No migration needed.'
        },
        {
          question: 'Can I create events for other team members?',
          answer: 'Yes. You can schedule meetings and assign them to team members with shared Google Calendar access. Perfect for booking demos with the right sales rep.'
        },
        {
          question: 'Does the WhatsApp conversation context appear in the calendar event?',
          answer: 'Yes. When you create an event from a WhatsApp conversation, relevant context from the chat is included in the event description. You always know what was discussed.'
        },
        {
          question: 'Can I set reminders without creating a full event?',
          answer: 'Yes. You can set quick reminders tied to WhatsApp conversations. When the reminder fires, you see the original chat context and can take action immediately.'
        },
        {
          question: 'Is my data secure?',
          answer: 'SOC 2 certified, GDPR compliant, Meta Business Partner. Calendar and conversation data is encrypted in transit and at rest.'
        },
        {
          question: 'How quickly can I start?',
          answer: 'Most users are scheduling from WhatsApp within 5 minutes. Install the extension, connect Google Calendar, open WhatsApp Web—done.'
        }
      ]
    },
    cta: {
      headline: 'Never miss a WhatsApp follow-up on',
      headlineHighlight: 'Google Calendar',
      description: 'Turn WhatsApp conversations into calendar events. One click. Full context. Zero missed follow-ups.',
      primaryCta: { label: 'Start Free Trial', url: '/signup?crm=google-calendar' },
      secondaryCta: { label: 'See a Demo', url: '/demo?crm=google-calendar' },
      footnote: '14-day free trial • No credit card • Live in 5 minutes'
    }
  }
]

// ============================================================
// Main function
// ============================================================

async function main() {
  console.log(`Creating ${integrations.length} integration pages...\n`)

  for (const page of integrations) {
    console.log(`Creating: ${page.title} (${page._id})`)

    try {
      // Check if already exists
      const existing = await client.getDocument(page._id)
      if (existing) {
        console.log(`  Already exists, skipping.`)
        continue
      }
    } catch (err) {
      // Document doesn't exist, proceed with creation
    }

    try {
      await client.createOrReplace(page)
      console.log(`  Created successfully!`)
    } catch (err) {
      console.error(`  ERROR: ${err.message}`)
    }
  }

  console.log('\n--- Verification ---')
  const allIntegrations = await client.fetch('*[_type == "productPage" && category == "crm-integration"]{ _id, title, "slug": slug.current, crmName, crmColor }')
  console.log(`Total integration pages: ${allIntegrations.length}`)
  for (const p of allIntegrations) {
    console.log(`  ${p.crmName}: ${p.slug} (${p.crmColor})`)
  }
}

main().catch(console.error)
