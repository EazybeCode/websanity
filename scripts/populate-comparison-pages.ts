/**
 * Populate Comparison Pages in Sanity CMS
 * Creates comparison page documents for all languages (en, pt-BR, es, tr)
 */

import { createClient } from '@sanity/client'

const sanityClient = createClient({
  projectId: '5awzi0t4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'skSZVkNDe8k5TuJi2Tld6H34XcnMqKi7lilBvkqb3yPyKf3oHEhohk2SnEqBLAYdYvCvfQxtcmjXuBEJcYE4MvfiIfl8ypfuAxnYp3aL2R12HWxewdfKkH3rywCejLzWdY8lxT4ggzXlqFTQZSdMzYEiG59ImYozOfuNBw5PuANtxQp28tSA'
})

// English content
const englishContent = {
  _type: 'comparisonPage',
  language: 'en',
  translationGroupId: 'comparison-page-main',
  heroBadge: 'Platform Comparison',
  heroTitle: 'Why Eazybe Is the #1 Choice for Whatsapp CRM',
  heroSubtitle: 'See how Eazybe compares to 20+ leading WhatsApp CRM platforms. More features, better integrations, and unbeatable pricing - all in one powerful platform.',
  heroStats: [
    { value: '50K+', label: 'Active Users' },
    { value: '4.8/5', label: 'Chrome Rating' },
    { value: '70%', label: 'Cost Savings' },
    { value: '20+', label: 'Platforms Compared' }
  ],
  tableBadge: 'Feature Comparison',
  tableTitle: 'Side-by-Side Feature Comparison',
  tableSubtitle: 'Compare Eazybe with Wati, Interakt, QuickReply, Cooby, Timelines, Rasayel, and more. See why businesses choose Eazybe for superior features, more integrations, and better value.',
  competitors: [
    {
      _type: 'competitor',
      id: 'eazybe',
      name: 'Eazybe',
      highlight: true,
      cta: {
        text: 'Start Free Trial',
        url: 'https://chromewebstore.google.com/detail/eazybe-best-whatsapp-web/clgficggccelgifppbcaepjdkklfcefd'
      }
    },
    {
      _type: 'competitor',
      id: 'wati',
      name: 'Wati',
      highlight: false
    },
    {
      _type: 'competitor',
      id: 'interakt',
      name: 'Interakt',
      highlight: false
    },
    {
      _type: 'competitor',
      id: 'quickreply',
      name: 'QuickReply',
      highlight: false
    },
    {
      _type: 'competitor',
      id: 'cooby',
      name: 'Cooby',
      highlight: false
    },
    {
      _type: 'competitor',
      id: 'timelines',
      name: 'Timelines',
      highlight: false
    },
    {
      _type: 'competitor',
      id: 'rasayel',
      name: 'Rasayel',
      highlight: false
    }
  ],
  featureComparisons: [
    {
      _type: 'featureComparison',
      category: 'Core Features',
      features: [
        {
          _type: 'feature',
          name: 'WhatsApp Web Integration',
          values: '{"eazybe": true, "wati": true, "interakt": true, "quickreply": true, "cooby": true, "timelines": true, "rasayel": true}'
        },
        {
          _type: 'feature',
          name: 'Team Inbox',
          values: '{"eazybe": true, "wati": true, "interakt": true, "quickreply": true, "cooby": true, "timelines": true, "rasayel": true}'
        },
        {
          _type: 'feature',
          name: 'WhatsApp Chat Backup',
          values: '{"eazybe": true, "wati": false, "interakt": false, "quickreply": false, "cooby": false, "timelines": false, "rasayel": false}',
          highlight: 'eazybe'
        },
        {
          _type: 'feature',
          name: 'Unlimited Quick Replies',
          values: '{"eazybe": true, "wati": "Limited", "interakt": "Limited", "quickreply": "Limited", "cooby": true, "timelines": "Limited", "rasayel": "Limited"}',
          highlight: 'eazybe'
        },
        {
          _type: 'feature',
          name: 'Scheduled Messages',
          values: '{"eazybe": true, "wati": true, "interakt": true, "quickreply": true, "cooby": true, "timelines": true, "rasayel": true}'
        },
        {
          _type: 'feature',
          name: 'Bulk Messaging',
          values: '{"eazybe": true, "wati": true, "interakt": true, "quickreply": true, "cooby": true, "timelines": true, "rasayel": true}'
        }
      ]
    },
    {
      _type: 'featureComparison',
      category: 'CRM Integrations',
      features: [
        {
          _type: 'feature',
          name: 'HubSpot Integration',
          values: '{"eazybe": true, "wati": true, "interakt": false, "quickreply": false, "cooby": true, "timelines": true, "rasayel": true}'
        },
        {
          _type: 'feature',
          name: 'Salesforce Integration',
          values: '{"eazybe": true, "wati": false, "interakt": false, "quickreply": false, "cooby": false, "timelines": false, "rasayel": false}',
          highlight: 'eazybe'
        },
        {
          _type: 'feature',
          name: 'Zoho CRM Integration',
          values: '{"eazybe": true, "wati": true, "interakt": true, "quickreply": false, "cooby": false, "timelines": false, "rasayel": true}'
        },
        {
          _type: 'feature',
          name: 'Bitrix24 Integration',
          values: '{"eazybe": true, "wati": false, "interakt": false, "quickreply": false, "cooby": false, "timelines": false, "rasayel": false}',
          highlight: 'eazybe'
        },
        {
          _type: 'feature',
          name: 'Webhook Integrations',
          values: '{"eazybe": true, "wati": true, "interakt": true, "quickreply": true, "cooby": true, "timelines": true, "rasayel": true}'
        },
        {
          _type: 'feature',
          name: 'Custom Objects Support',
          values: '{"eazybe": true, "wati": false, "interakt": false, "quickreply": false, "cooby": false, "timelines": false, "rasayel": false}',
          highlight: 'eazybe'
        }
      ]
    },
    {
      _type: 'featureComparison',
      category: 'AI & Automation',
      features: [
        {
          _type: 'feature',
          name: 'AI Unreplied Chats Agent',
          values: '{"eazybe": true, "wati": false, "interakt": false, "quickreply": true, "cooby": false, "timelines": false, "rasayel": false}',
          highlight: 'eazybe'
        },
        {
          _type: 'feature',
          name: 'WhatsApp Web Copilot',
          values: '{"eazybe": true, "wati": false, "interakt": false, "quickreply": false, "cooby": false, "timelines": false, "rasayel": false}',
          highlight: 'eazybe'
        },
        {
          _type: 'feature',
          name: 'Revenue Inbox',
          values: '{"eazybe": true, "wati": false, "interakt": false, "quickreply": false, "cooby": false, "timelines": false, "rasayel": false}',
          highlight: 'eazybe'
        },
        {
          _type: 'feature',
          name: 'RevOps Agent',
          values: '{"eazybe": true, "wati": false, "interakt": false, "quickreply": false, "cooby": false, "timelines": false, "rasayel": false}',
          highlight: 'eazybe'
        },
        {
          _type: 'feature',
          name: 'Smart Labeling',
          values: '{"eazybe": true, "wati": true, "interakt": true, "quickreply": true, "cooby": true, "timelines": true, "rasayel": true}'
        },
        {
          _type: 'feature',
          name: 'Message Analytics',
          values: '{"eazybe": true, "wati": true, "interakt": true, "quickreply": true, "cooby": true, "timelines": true, "rasayel": true}'
        }
      ]
    },
    {
      _type: 'featureComparison',
      category: 'Pricing & Value',
      features: [
        {
          _type: 'feature',
          name: 'Starting Price (Monthly)',
          values: '{"eazybe": "$13", "wati": "$49", "interakt": "$39", "quickreply": "$29", "cooby": "$19", "timelines": "$25", "rasayel": "$35"}',
          highlight: 'eazybe'
        },
        {
          _type: 'feature',
          name: 'Free Trial',
          values: '{"eazybe": "7 Days", "wati": "7 Days", "interakt": "7 Days", "quickreply": "7 Days", "cooby": "7 Days", "timelines": "7 Days", "rasayel": "7 Days"}'
        },
        {
          _type: 'feature',
          name: 'Free Plan Available',
          values: '{"eazybe": true, "wati": false, "interakt": false, "quickreply": false, "cooby": false, "timelines": false, "rasayel": false}',
          highlight: 'eazybe'
        },
        {
          _type: 'feature',
          name: 'Annual Discount',
          values: '{"eazybe": "20%", "wati": "15%", "interakt": "15%", "quickreply": "10%", "cooby": "15%", "timelines": "15%", "rasayel": "10%"}',
          highlight: 'eazybe'
        },
        {
          _type: 'feature',
          name: 'Per User Pricing',
          values: '{"eazybe": true, "wati": true, "interakt": true, "quickreply": true, "cooby": true, "timelines": true, "rasayel": true}'
        }
      ]
    },
    {
      _type: 'featureComparison',
      category: 'Support & Security',
      features: [
        {
          _type: 'feature',
          name: 'GDPR Compliant',
          values: '{"eazybe": true, "wati": true, "interakt": true, "quickreply": true, "cooby": true, "timelines": true, "rasayel": true}'
        },
        {
          _type: 'feature',
          name: 'Meta Business Partner',
          values: '{"eazybe": true, "wati": true, "interakt": true, "quickreply": true, "cooby": true, "timelines": true, "rasayel": true}'
        },
        {
          _type: 'feature',
          name: 'Priority Support',
          values: '{"eazybe": true, "wati": true, "interakt": false, "quickreply": true, "cooby": false, "timelines": true, "rasayel": false}'
        },
        {
          _type: 'feature',
          name: 'Dedicated Account Manager',
          values: '{"eazybe": true, "wati": false, "interakt": false, "quickreply": false, "cooby": false, "timelines": false, "rasayel": false}',
          highlight: 'eazybe'
        },
        {
          _type: 'feature',
          name: '24/7 Support',
          values: '{"eazybe": true, "wati": false, "interakt": false, "quickreply": false, "cooby": false, "timelines": false, "rasayel": false}',
          highlight: 'eazybe'
        },
        {
          _type: 'feature',
          name: 'Implementation Support',
          values: '{"eazybe": true, "wati": false, "interakt": false, "quickreply": false, "cooby": false, "timelines": true, "rasayel": false}'
        }
      ]
    }
  ],
  valuePropsBadge: 'Why Eazybe',
  valuePropsTitle: 'Why 50,000+ Businesses Choose Eazybe',
  valuePropsSubtitle: 'Discover why 50,000+ businesses choose Eazybe over Wati, Interakt, QuickReply, Cooby, Timelines, Rasayel, and 20+ other platforms.',
  valueProps: [
    {
      _type: 'valueProp',
      icon: 'DollarSign',
      title: 'Best Price Guarantee',
      description: 'Start at just $13/month - 70% cheaper than Wati, Interakt, and other competitors with more features included.'
    },
    {
      _type: 'valueProp',
      icon: 'Puzzle',
      title: 'Most Integrations',
      description: 'Connect with 10+ CRMs including Salesforce, HubSpot, Zoho, Bitrix24 - more than any other WhatsApp CRM.'
    },
    {
      _type: 'valueProp',
      icon: 'Zap',
      title: 'AI-Powered Features',
      description: 'Exclusive AI unreplied chats agent, WhatsApp Web Copilot, Revenue Inbox, and RevOps Agent not found elsewhere.'
    },
    {
      _type: 'valueProp',
      icon: 'Shield',
      title: 'Enterprise Security',
      description: 'GDPR compliant, Meta Business Partner verified, with bank-grade encryption and data protection.'
    },
    {
      _type: 'valueProp',
      icon: 'Clock',
      title: 'Fastest Setup',
      description: 'Get started in under 5 minutes. No setup fees or credit card required for trial.'
    },
    {
      _type: 'valueProp',
      icon: 'Users',
      title: 'Largest User Base',
      description: 'Trusted by 50,000+ businesses worldwide - more users than all other WhatsApp CRMs combined.'
    }
  ],
  ctaTitle: 'Ready to Transform Your WhatsApp Communication?',
  ctaSubtitle: 'Join 50,000+ businesses already using Eazybe to close more deals, provide better support, and scale their operations.',
  ctaPrimaryButtonText: 'Start Your Free Trial',
  ctaSecondaryButtonText: 'Book a Demo',
  ctaFootnote: 'No credit card required • 7-day free trial • Cancel anytime',
  faqBadge: 'FAQ',
  faqTitle: 'Frequently Asked Questions',
  faqSubtitle: 'Everything you need to know about Eazybe and how it compares to other platforms.',
  faqs: [
    {
      _type: 'faq',
      question: 'How does Eazybe compare to other WhatsApp CRMs?',
      answer: 'Eazybe outperforms 20+ WhatsApp CRM platforms including Wati, Interakt, QuickReply, Cooby, Timelines, and Rasayel. We offer 70% cost savings, exclusive AI features like WhatsApp Web Copilot and Revenue Inbox, more CRM integrations including Salesforce, and features no one else has like WhatsApp Chat Backup.'
    },
    {
      _type: 'faq',
      question: 'Why is Eazybe more affordable than competitors?',
      answer: 'Eazybe starts at just $13/month while competitors charge $25-$49/month. We believe powerful WhatsApp CRM should be accessible to all businesses. Our efficient operations and larger user base (50,000+) allow us to offer premium features at a fraction of the cost.'
    },
    {
      _type: 'faq',
      question: 'What exclusive features does Eazybe offer?',
      answer: 'Eazybe offers exclusive features you won\'t find anywhere else: WhatsApp Chat Backup, Salesforce Integration, WhatsApp Web Copilot, Revenue Inbox, RevOps Agent, AI Unreplied Chats Agent, and Bitrix24 Integration. These features are not available on Wati, Interakt, QuickReply, Cooby, Timelines, or Rasayel.'
    },
    {
      _type: 'faq',
      question: 'Is Eazybe suitable for enterprise teams?',
      answer: 'Absolutely! Eazybe serves businesses of all sizes. Our Omnis plan includes dedicated APIs, unlimited message sync, Revenue Inbox, RevOps Agent, and a dedicated account manager for enterprise teams. We scale with your business needs.'
    },
    {
      _type: 'faq',
      question: 'Can I migrate from another platform?',
      answer: 'Yes! We make migration easy from any WhatsApp CRM platform. Import your existing contacts, messages, and workflows. Our team provides free migration support for annual plans to ensure a smooth transition from Wati, Interakt, QuickReply, Cooby, or any other platform.'
    },
    {
      _type: 'faq',
      question: 'What integrations does Eazybe support?',
      answer: 'Eazybe integrates with 10+ platforms including HubSpot, Salesforce, Zoho CRM, Bitrix24, Google Sheets, Pipedrive, Monday.com, LeadSquared, Freshdesk, Google Calendar, and custom webhooks for any other platform. More integrations than any other WhatsApp CRM.'
    },
    {
      _type: 'faq',
      question: 'Is there a free trial?',
      answer: 'Yes! We offer a 7-day free trial on all plans with no credit card required. You can explore all features, test integrations, and see how Eazybe fits your workflow before committing.'
    }
  ],
  articlesBadge: 'Comparison Articles',
  articlesTitle: 'Detailed Platform Comparisons',
  articlesSubtitle: 'Deep-dive articles comparing Eazybe with other WhatsApp CRM platforms. Make an informed decision with our comprehensive analysis.',
  articles: [
    {
      _type: 'article',
      id: 'eazybe-vs-wati',
      slug: { _type: 'slug', current: 'eazybe-vs-wati' },
      title: 'Eazybe vs Wati: Which WhatsApp CRM is Better?',
      excerpt: 'Compare Eazybe and Wati head-to-head. Discover why Eazybe offers 70% cost savings with exclusive features like WhatsApp Chat Backup and Salesforce integration.',
      category: 'Comparison',
      readTime: 10,
      publishedAt: '2025-03-01T00:00:00Z',
      competitors: ['Eazybe', 'Wati'],
      verdict: 'Eazybe Wins - Save 70%'
    },
    {
      _type: 'article',
      id: 'eazybe-vs-interakt',
      slug: { _type: 'slug', current: 'eazybe-vs-interakt' },
      title: 'Eazybe vs Interakt: Complete Comparison Guide',
      excerpt: 'A detailed comparison between Eazybe and Interakt. Learn about AI features, CRM integrations, and why Eazybe offers better value for growing businesses.',
      category: 'Comparison',
      readTime: 9,
      publishedAt: '2025-03-05T00:00:00Z',
      competitors: ['Eazybe', 'Interakt'],
      verdict: 'Eazybe Wins - More AI Features'
    },
    {
      _type: 'article',
      id: 'eazybe-vs-quickreply',
      slug: { _type: 'slug', current: 'eazybe-vs-quickreply' },
      title: 'Eazybe vs QuickReply: Which Platform Wins?',
      excerpt: 'Compare Eazybe and QuickReply side-by-side. Discover exclusive features like WhatsApp Web Copilot, Revenue Inbox, and superior CRM integrations.',
      category: 'Comparison',
      readTime: 8,
      publishedAt: '2025-03-08T00:00:00Z',
      competitors: ['Eazybe', 'QuickReply'],
      verdict: 'Eazybe Wins - Better Integrations'
    },
    {
      _type: 'article',
      id: 'eazybe-vs-cooby',
      slug: { _type: 'slug', current: 'eazybe-vs-cooby' },
      title: 'Eazybe vs Cooby: Which WhatsApp CRM is Better?',
      excerpt: 'Compare Eazybe and Cooby head-to-head. Discover why Eazybe offers better pricing, exclusive AI features, and more CRM integrations than Cooby.',
      category: 'Comparison',
      readTime: 8,
      publishedAt: '2025-03-09T00:00:00Z',
      competitors: ['Eazybe', 'Cooby'],
      verdict: 'Eazybe Wins - Better Value'
    },
    {
      _type: 'article',
      id: 'eazybe-vs-timelines',
      slug: { _type: 'slug', current: 'eazybe-vs-timelines' },
      title: 'Eazybe vs Timelines: Which WhatsApp CRM is Better?',
      excerpt: 'Compare Eazybe and Timelines head-to-head. Discover why Eazybe offers more features at nearly half the price with exclusive AI capabilities.',
      category: 'Comparison',
      readTime: 8,
      publishedAt: '2025-03-10T00:00:00Z',
      competitors: ['Eazybe', 'Timelines'],
      verdict: 'Eazybe Wins - More Features, Lower Price'
    },
    {
      _type: 'article',
      id: 'eazybe-vs-rasayel',
      slug: { _type: 'slug', current: 'eazybe-vs-rasayel' },
      title: 'Eazybe vs Rasayel: Complete Comparison Guide',
      excerpt: 'A detailed comparison between Eazybe and Rasayel. Learn about features, pricing, integrations, and why Eazybe is the superior choice for WhatsApp CRM.',
      category: 'Comparison',
      readTime: 10,
      publishedAt: '2025-03-12T00:00:00Z',
      competitors: ['Eazybe', 'Rasayel'],
      verdict: 'Eazybe Wins - Best Value for Money'
    },
    {
      _type: 'article',
      id: 'eazybe-vs-all',
      slug: { _type: 'slug', current: 'eazybe-vs-all' },
      title: 'Eazybe vs 20+ WhatsApp CRMs: Ultimate Comparison',
      excerpt: 'See how Eazybe compares to all major WhatsApp CRM platforms. Features, pricing, integrations, and why 50,000+ businesses choose Eazybe.',
      category: 'Comparison',
      readTime: 15,
      publishedAt: '2025-03-15T00:00:00Z',
      competitors: ['Eazybe', '20+ Platforms'],
      verdict: 'Eazybe Wins - #1 Choice'
    }
  ],
  seo: {
    metaTitle: 'Comparison - Eazybe vs 20+ WhatsApp CRMs',
    metaDescription: 'Compare Eazybe with 20+ WhatsApp CRM platforms. More features, better integrations, 70% cost savings. See why 50,000+ businesses choose Eazybe.'
  }
}

// Portuguese (Brazilian) content
const portugueseContent = {
  ...englishContent,
  language: 'pt-BR',
  heroBadge: 'Comparação de Plataformas',
  heroTitle: 'Por Que o Eazybe É a Escolha #1 para CRM do WhatsApp',
  heroSubtitle: 'Veja como o Eazybe se compara a 20+ plataformas líderes de CRM do WhatsApp. Mais recursos, melhores integrações e preços imbatíveis - tudo em uma plataforma poderosa.',
  tableBadge: 'Comparação de Recursos',
  tableTitle: 'Comparação Detalhada de Recursos',
  tableSubtitle: 'Compare o Eazybe com Wati, Interakt, QuickReply, Cooby, Timelines, Rasayel e mais. Veja por que as empresas escolhem o Eazybe por recursos superiores, mais integrações e melhor valor.',
  valuePropsBadge: 'Por Que Eazybe',
  valuePropsTitle: 'Por Que Mais de 50.000 Empresas Escolhem o Eazybe',
  valuePropsSubtitle: 'Descubra por que mais de 50.000 empresas escolhem o Eazybe em vez de Wati, Interakt, QuickReply, Cooby, Timelines, Rasayel e mais de 20 outras plataformas.',
  ctaTitle: 'Pronto para Transformar Sua Comunicação no WhatsApp?',
  ctaSubtitle: 'Junte-se a mais de 50.000 empresas que já usam o Eazybe para fechar mais negócios, fornecer melhor suporte e escalar suas operações.',
  ctaPrimaryButtonText: 'Inicie Seu Teste Grátis',
  ctaSecondaryButtonText: 'Agende uma Demo',
  ctaFootnote: 'Sem cartão de crédito • Teste grátis de 7 dias • Cancele a qualquer momento',
  faqBadge: 'FAQ',
  faqTitle: 'Perguntas Frequentes',
  faqSubtitle: 'Tudo o que você precisa saber sobre o Eazybe e como ele se compara a outras plataformas.',
  articlesBadge: 'Artigos de Comparação',
  articlesTitle: 'Comparações Detalhadas de Plataformas',
  articlesSubtitle: 'Artigos aprofundados comparando o Eazybe com outras plataformas de CRM do WhatsApp. Tome uma decisão informada com nossa análise abrangente.',
  seo: {
    metaTitle: 'Comparação - Eazybe vs 20+ CRMs do WhatsApp',
    metaDescription: 'Compare o Eazybe com 20+ plataformas de CRM do WhatsApp. Mais recursos, melhores integrações, 70% de economia. Veja por que mais de 50.000 empresas escolhem o Eazybe.'
  }
}

// Spanish content
const spanishContent = {
  ...englishContent,
  language: 'es',
  heroBadge: 'Comparación de Plataformas',
  heroTitle: 'Por Qué Eazybe Es la Elección #1 para CRM de WhatsApp',
  heroSubtitle: 'Vea cómo se compara Eazybe con más de 20 plataformas líderes de CRM de WhatsApp. Más funciones, mejores integraciones y precios imbatibles, todo en una plataforma poderosa.',
  tableBadge: 'Comparación de Funciones',
  tableTitle: 'Comparación Detallada de Funciones',
  tableSubtitle: 'Compare Eazybe con Wati, Interakt, QuickReply, Cooby, Timelines, Rasayel y más. Vea por qué las empresas eligen Eazybe por funciones superiores, más integraciones y mejor valor.',
  valuePropsBadge: 'Por Qué Eazybe',
  valuePropsTitle: 'Por Qué Más de 50,000 Empresas Eligen Eazybe',
  valuePropsSubtitle: 'Descubra por qué más de 50,000 empresas eligen Eazybe en lugar de Wati, Interakt, QuickReply, Cooby, Timelines, Rasayel y más de 20 otras plataformas.',
  ctaTitle: '¿Listo para Transformar Su Comunicación de WhatsApp?',
  ctaSubtitle: 'Únase a más de 50,000 empresas que ya usan Eazybe para cerrar más tratos, brindar mejor soporte y escalar sus operaciones.',
  ctaPrimaryButtonText: 'Inicie Su Prueba Gratis',
  ctaSecondaryButtonText: 'Reserve una Demo',
  ctaFootnote: 'No se requiere tarjeta de crédito • Prueba gratis de 7 días • Cancelar en cualquier momento',
  faqBadge: 'Preguntas Frecuentes',
  faqTitle: 'Preguntas Frecuentes',
  faqSubtitle: 'Todo lo que necesita saber sobre Eazybe y cómo se compara con otras plataformas.',
  articlesBadge: 'Artículos de Comparación',
  articlesTitle: 'Comparaciones Detalladas de Plataformas',
  articlesSubtitle: 'Artículos profundos que comparan Eazybe con otras plataformas de CRM de WhatsApp. Tome una decisión informada con nuestro análisis integral.',
  seo: {
    metaTitle: 'Comparación - Eazybe vs 20+ CRMs de WhatsApp',
    metaDescription: 'Compare Eazybe con más de 20 plataformas de CRM de WhatsApp. Más funciones, mejores integraciones, 70% de ahorro. Vea por qué más de 50,000 empresas eligen Eazybe.'
  }
}

// Turkish content
const turkishContent = {
  ...englishContent,
  language: 'tr',
  heroBadge: 'Platform Karşılaştırması',
  heroTitle: 'Eazybe Neden WhatsApp CRM İçin #1 Seçim',
  heroSubtitle: "Eazybe'nin 20+ önde gelen WhatsApp CRM platformuyla nasıl karşılaştırıldığını görün. Daha fazla özellik, daha iyi entegrasyonlar ve yenilmez fiyatlar - hepsi bir güçlü platformda.",
  tableBadge: 'Özellik Karşılaştırması',
  tableTitle: 'Yan Yana Özellik Karşılaştırması',
  tableSubtitle: "Eazybe'yi Wati, Interakt, QuickReply, Cooby, Timelines, Rasayel ve daha fazlasıyla karşılaştırın. İşletmelerin neden üstün özellikler, daha fazla entegrasyon ve daha iyi değer için Eazybe'yi seçtiğini görün.",
  valuePropsBadge: 'Neden Eazybe',
  valuePropsTitle: '50.000+ İşletme Neden Eazybe\'yi Seçiyor',
  valuePropsSubtitle: '50.000+ işletmenin neden Wati, Interakt, QuickReply, Cooby, Timelines, Rasayel ve 20+ başka platform yerine Eazybe\'yi seçtiğini keşfedin.',
  ctaTitle: 'WhatsApp İletişiminizi Dönüştürmeye Hazır mısınız?',
  ctaSubtitle: 'Eazybe kullanarak daha fazla anlaşma kapatmak, daha iyi destek sağlamak ve operasyonlarınızı ölçeklendirmek için zaten 50.000+ işletmeye katılın.',
  ctaPrimaryButtonText: 'Ücretsiz Denemenizi Başlatın',
  ctaSecondaryButtonText: 'Demo Randevusu Alın',
  ctaFootnote: 'Kredi kartı gerekmez • 7 günlük ücretsiz deneme • İstediğiniz zaman iptal edin',
  faqBadge: 'SSS',
  faqTitle: 'Sıkça Sorulan Sorular',
  faqSubtitle: 'Eazybe ve diğer platformlarla nasıl karşılaştırıldığı hakkında bilmeniz gereken her şey.',
  articlesBadge: 'Karşılaştırma Makaleleri',
  articlesTitle: 'Detaylı Platform Karşılaştırmaları',
  articlesSubtitle: 'Eazybe\'yi diğer WhatsApp CRM platformlarıyla karşılaştıran derinlemesine makaleler. Kapsamlı analizimizle bilgilendirilmiş bir karar verin.',
  seo: {
    metaTitle: 'Karşılaştırma - Eazybe vs 20+ WhatsApp CRM',
    metaDescription: "Eazybe'yi 20+ WhatsApp CRM platformuyla karşılaştırın. Daha fazla özellik, daha iyi entegrasyonlar, %70 tasarruf. 50.000+ işletmenin neden Eazybe'yi seçtiğini görün."
  }
}

async function createComparisonPageDocument(content: any, language: string) {
  try {
    // Check if document already exists
    const existing = await sanityClient.fetch(
      `*[_type == "comparisonPage" && language == $language][0]{_id}`,
      { language }
    )

    if (existing) {
      console.log(`⚠️  ${language.toUpperCase()}: Document already exists, updating...`)
      await sanityClient.createOrReplace({
        ...content,
        _id: existing._id
      })
      console.log(`✅ ${language.toUpperCase()}: Document updated successfully`)
    } else {
      console.log(`📝 ${language.toUpperCase()}: Creating new document...`)
      await sanityClient.create(content)
      console.log(`✅ ${language.toUpperCase()}: Document created successfully`)
    }
  } catch (error) {
    console.error(`❌ ${language.toUpperCase()}: Error creating document:`, error)
  }
}

async function main() {
  console.log('🚀 Populating Comparison Pages in Sanity CMS\n')
  console.log('═'.repeat(60))

  const contents = [
    { content: englishContent, language: 'en' },
    { content: portugueseContent, language: 'pt-BR' },
    { content: spanishContent, language: 'es' },
    { content: turkishContent, language: 'tr' }
  ]

  for (const { content, language } of contents) {
    await createComparisonPageDocument(content, language)
  }

  console.log('\n' + '═'.repeat(60))
  console.log('\n✅ All comparison pages have been populated successfully!\n')
  console.log('🌐 Sanity Manage Dashboard:')
  console.log('   https://www.sanity.io/manage/project/5awzi0t4')
  console.log('   Project: Eazybe (5awzi0t4)')
  console.log('   Dataset: production\n')
}

main()
