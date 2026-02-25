import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

// Configuration
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const DIST_DIR = join(__dirname, '../dist')

// Languages and their configurations
const LANGUAGES = {
  en: { prefix: '', locale: 'en_US' },
  br: { prefix: '/br', locale: 'pt_BR' },
  es: { prefix: '/es', locale: 'es_ES' },
  tr: { prefix: '/tr', locale: 'tr_TR' }
}

// All routes to pre-render
const ROUTES = [
  { path: 'pricing', title: 'Pricing | Eazybe' },
  { path: 'features', title: 'Features | Eazybe' },
  { path: 'integrations', title: 'Integrations | Eazybe' },
  { path: 'blog', title: 'Blog | Eazybe' }
]

// Integration routes
const INTEGRATIONS = [
  'hubspot-whatsapp-integration',
  'salesforce-whatsapp-integration',
  'zoho-whatsapp-integration',
  'bitrix24-whatsapp-integration',
  'leadsquared-whatsapp-integration',
  'freshdesk-whatsapp-integration',
  'pipedrive-whatsapp-integration',
  'monday-whatsapp-integration',
  'google-sheets-whatsapp-integration',
  'google-calendar-whatsapp-integration',
  'webhooks-whatsapp-integration'
]

// SEO data for integration pages - with language support
interface SEOData {
  title: string
  description: string
  keywords: string
}

const INTEGRATION_SEO: Record<string, Record<string, SEOData>> = {
  'hubspot-whatsapp-integration': {
    en: {
      title: 'HubSpot WhatsApp Integration With AI Agents | Sync WhatsApp CRM',
      description: 'Connect WhatsApp with HubSpot CRM. Sync chats automatically, use AI agents, track deals, and manage sales conversations directly inside HubSpot.',
      keywords: 'HubSpot WhatsApp integration, WhatsApp HubSpot CRM, sync WhatsApp with HubSpot'
    },
    br: {
      title: 'Integração HubSpot WhatsApp com Agentes de IA | Sincronize CRM',
      description: 'Conecte o WhatsApp ao CRM HubSpot. Sincronize conversas automaticamente, use agentes de IA, acompanhe deals e gerencie conversas de vendas diretamente no HubSpot.',
      keywords: 'Integração HubSpot WhatsApp, WhatsApp HubSpot CRM, sincronizar WhatsApp com HubSpot'
    },
    es: {
      title: 'Integración de HubSpot WhatsApp con Agentes IA | Sincronizar CRM',
      description: 'Conecta WhatsApp con el CRM HubSpot. Sincroniza chats automáticamente, usa agentes de IA, rastrea deals y gestiona conversas de ventas directamente en HubSpot.',
      keywords: 'Integración HubSpot WhatsApp, WhatsApp HubSpot CRM, sincronizar WhatsApp con HubSpot'
    },
    tr: {
      title: 'HubSpot WhatsApp Entegrasyonu | AI Aracıları ile CRM Senkronizasyonu',
      description: 'WhatsApp\'ı HubSpot CRM ile bağlayın. Sohbetleri otomatik olarak senkronize edin, AI aracıları kullanın, deal\'leri takip edin ve satış görüşmelerini doğrudan HubSpot içinde yönetin.',
      keywords: 'HubSpot WhatsApp entegrasyonu, WhatsApp HubSpot CRM, WhatsApp\'ı HubSpot ile senkronize et'
    }
  },
  'salesforce-whatsapp-integration': {
    en: {
      title: 'Salesforce WhatsApp Integration With AI | Eazybe',
      description: 'Connect WhatsApp with Salesforce CRM. Sync chats, use AI agents, and manage customer conversations directly in Salesforce.',
      keywords: 'Salesforce WhatsApp integration, WhatsApp Salesforce CRM, sync WhatsApp with Salesforce'
    },
    br: {
      title: 'Integração Salesforce WhatsApp com IA | Eazybe',
      description: 'Conecte o WhatsApp ao CRM Salesforce. Sincronize chats, use agentes de IA e gerencie conversas de clientes diretamente no Salesforce.',
      keywords: 'Integração Salesforce WhatsApp, WhatsApp Salesforce CRM, sincronizar WhatsApp com Salesforce'
    },
    es: {
      title: 'Integración de Salesforce WhatsApp con IA | Eazybe',
      description: 'Conecta WhatsApp con el CRM Salesforce. Sincroniza chats, usa agentes de IA y gestiona conversas de clientes directamente en Salesforce.',
      keywords: 'Integración Salesforce WhatsApp, WhatsApp Salesforce CRM, sincronizar WhatsApp con Salesforce'
    },
    tr: {
      title: 'Salesforce WhatsApp Entegrasyonu | Eazybe',
      description: 'WhatsApp\'ı Salesforce CRM ile bağlayın. Sohbetleri senkronize edin, AI aracıları kullanın ve müşteri konuşmalarını doğrudan Salesforce içinde yönetin.',
      keywords: 'Salesforce WhatsApp entegrasyonu, WhatsApp Salesforce CRM, WhatsApp\'ı Salesforce ile senkronize et'
    }
  },
  'zoho-whatsapp-integration': {
    en: {
      title: 'Zoho WhatsApp Integration | Connect WhatsApp to Zoho CRM',
      description: 'Sync WhatsApp conversations with Zoho CRM automatically. Use AI agents for faster responses and better customer engagement.',
      keywords: 'Zoho WhatsApp integration, WhatsApp Zoho CRM, sync WhatsApp with Zoho'
    },
    br: {
      title: 'Integração Zoho WhatsApp | Conecte WhatsApp ao CRM Zoho',
      description: 'Sincronize conversas do WhatsApp com o CRM Zoho automaticamente. Use agentes de IA para respostas mais rápidas e melhor engajamento do cliente.',
      keywords: 'Integração Zoho WhatsApp, WhatsApp Zoho CRM, sincronizar WhatsApp com Zoho'
    },
    es: {
      title: 'Integración Zoho WhatsApp | Conectar WhatsApp al CRM Zoho',
      description: 'Sincroniza conversaciones de WhatsApp con el CRM Zoho automáticamente. Usa agentes de IA para respuestas más rápidas y mejor compromiso del cliente.',
      keywords: 'Integración Zoho WhatsApp, WhatsApp Zoho CRM, sincronizar WhatsApp con Zoho'
    },
    tr: {
      title: 'Zoho WhatsApp Entegrasyonu | WhatsApp\'ı Zoho CRM\'e Bağlayın',
      description: 'WhatsApp konuşmalarını otomatik olarak Zoho CRM ile senkronize edin. Daha hızlı yanıtlar ve daha iyi müşteri etkileşimi için AI aracıları kullanın.',
      keywords: 'Zoho WhatsApp entegrasyonu, WhatsApp Zoho CRM, WhatsApp\'ı Zoho ile senkronize et'
    }
  },
  'bitrix24-whatsapp-integration': {
    en: {
      title: 'Bitrix24 WhatsApp Integration | Eazybe',
      description: 'Connect WhatsApp with Bitrix24. Sync chats, use AI agents, and manage customer conversations in Bitrix24.',
      keywords: 'Bitrix24 WhatsApp integration, WhatsApp Bitrix24 CRM, sync WhatsApp with Bitrix24'
    },
    br: {
      title: 'Integração Bitrix24 WhatsApp | Eazybe',
      description: 'Conecte o WhatsApp ao Bitrix24. Sincronize chats, use agentes de IA e gerencie conversas de clientes no Bitrix24.',
      keywords: 'Integração Bitrix24 WhatsApp, WhatsApp Bitrix24 CRM, sincronizar WhatsApp com Bitrix24'
    },
    es: {
      title: 'Integración Bitrix24 WhatsApp | Eazybe',
      description: 'Conecta WhatsApp con Bitrix24. Sincroniza chats, usa agentes de IA y gestiona conversas de clientes en Bitrix24.',
      keywords: 'Integración Bitrix24 WhatsApp, WhatsApp Bitrix24 CRM, sincronizar WhatsApp con Bitrix24'
    },
    tr: {
      title: 'Bitrix24 WhatsApp Entegrasyonu | Eazybe',
      description: 'WhatsApp\'ı Bitrix24 ile bağlayın. Sohbetleri senkronize edin, AI aracıları kullanın ve müşteri konuşmalarını Bitrix24 içinde yönetin.',
      keywords: 'Bitrix24 WhatsApp entegrasyonu, WhatsApp Bitrix24 CRM, WhatsApp\'ı Bitrix24 ile senkronize et'
    }
  },
  'leadsquared-whatsapp-integration': {
    en: {
      title: 'LeadSquared WhatsApp Integration | Eazybe',
      description: 'Connect WhatsApp with LeadSquared CRM. Sync chats automatically and manage leads from WhatsApp in LeadSquared.',
      keywords: 'LeadSquared WhatsApp integration, WhatsApp LeadSquared CRM, sync WhatsApp with LeadSquared'
    },
    br: {
      title: 'Integração LeadSquared WhatsApp | Eazybe',
      description: 'Conecte o WhatsApp ao CRM LeadSquared. Sincronize chats automaticamente e gerencie leads do WhatsApp no LeadSquared.',
      keywords: 'Integração LeadSquared WhatsApp, WhatsApp LeadSquared CRM, sincronizar WhatsApp com LeadSquared'
    },
    es: {
      title: 'Integración LeadSquared WhatsApp | Eazybe',
      description: 'Conecta WhatsApp con el CRM LeadSquared. Sincroniza chats automáticamente y gestiona leads de WhatsApp en LeadSquared.',
      keywords: 'Integración LeadSquared WhatsApp, WhatsApp LeadSquared CRM, sincronizar WhatsApp con LeadSquared'
    },
    tr: {
      title: 'LeadSquared WhatsApp Entegrasyonu | Eazybe',
      description: 'WhatsApp\'ı LeadSquared CRM ile bağlayın. Sohbetleri otomatik olarak senkronize edin ve WhatsApp leads\'lerini LeadSquared içinde yönetin.',
      keywords: 'LeadSquared WhatsApp entegrasyonu, WhatsApp LeadSquared CRM, WhatsApp\'ı LeadSquared ile senkronize et'
    }
  },
  'freshdesk-whatsapp-integration': {
    en: {
      title: 'Freshdesk WhatsApp Integration | Eazybe',
      description: 'Connect WhatsApp with Freshdesk. Sync conversations and manage customer support tickets from WhatsApp in Freshdesk.',
      keywords: 'Freshdesk WhatsApp integration, WhatsApp Freshdesk, sync WhatsApp with Freshdesk'
    },
    br: {
      title: 'Integração Freshdesk WhatsApp | Eazybe',
      description: 'Conecte o WhatsApp ao Freshdesk. Sincronize conversas e gerencie tickets de suporte ao cliente do WhatsApp no Freshdesk.',
      keywords: 'Integração Freshdesk WhatsApp, WhatsApp Freshdesk, sincronizar WhatsApp com Freshdesk'
    },
    es: {
      title: 'Integración Freshdesk WhatsApp | Eazybe',
      description: 'Conecta WhatsApp con Freshdesk. Sincroniza conversaciones y gestiona tickets de soporte al cliente de WhatsApp en Freshdesk.',
      keywords: 'Integración Freshdesk WhatsApp, WhatsApp Freshdesk, sincronizar WhatsApp con Freshdesk'
    },
    tr: {
      title: 'Freshdesk WhatsApp Entegrasyonu | Eazybe',
      description: 'WhatsApp\'ı Freshdesk ile bağlayın. Sohbetleri senkronize edin ve WhatsApp destek taleplerini Freshdesk içinde yönetin.',
      keywords: 'Freshdesk WhatsApp entegrasyonu, WhatsApp Freshdesk, WhatsApp\'ı Freshdesk ile senkronize et'
    }
  },
  'pipedrive-whatsapp-integration': {
    en: {
      title: 'Pipedrive WhatsApp Integration | Eazybe',
      description: 'Connect WhatsApp with Pipedrive CRM. Sync chats, track deals, and manage sales conversations directly in Pipedrive.',
      keywords: 'Pipedrive WhatsApp integration, WhatsApp Pipedrive CRM, sync WhatsApp with Pipedrive'
    },
    br: {
      title: 'Integração Pipedrive WhatsApp | Eazybe',
      description: 'Conecte o WhatsApp ao CRM Pipedrive. Sincronize chats, acompanhe deals e gerencie conversas de vendas diretamente no Pipedrive.',
      keywords: 'Integração Pipedrive WhatsApp, WhatsApp Pipedrive CRM, sincronizar WhatsApp com Pipedrive'
    },
    es: {
      title: 'Integración Pipedrive WhatsApp | Eazybe',
      description: 'Conecta WhatsApp con el CRM Pipedrive. Sincroniza chats, rastrea deals y gestiona conversas de ventas directamente en Pipedrive.',
      keywords: 'Integración Pipedrive WhatsApp, WhatsApp Pipedrive CRM, sincronizar WhatsApp con Pipedrive'
    },
    tr: {
      title: 'Pipedrive WhatsApp Entegrasyonu | Eazybe',
      description: 'WhatsApp\'ı Pipedrive CRM ile bağlayın. Sohbetleri senkronize edin, deal\'leri takip edin ve satış konuşmalarını doğrudan Pipedrive içinde yönetin.',
      keywords: 'Pipedrive WhatsApp entegrasyonu, WhatsApp Pipedrive CRM, WhatsApp\'ı Pipedrive ile senkronize et'
    }
  },
  'monday-whatsapp-integration': {
    en: {
      title: 'Monday WhatsApp Integration | Eazybe',
      description: 'Connect WhatsApp with Monday.com. Sync chats and manage project updates from WhatsApp directly in Monday.',
      keywords: 'Monday WhatsApp integration, WhatsApp Monday.com, sync WhatsApp with Monday'
    },
    br: {
      title: 'Integração Monday WhatsApp | Eazybe',
      description: 'Conecte o WhatsApp ao Monday.com. Sincronize chats e gerencie atualizações de projetos do WhatsApp diretamente no Monday.',
      keywords: 'Integração Monday WhatsApp, WhatsApp Monday.com, sincronizar WhatsApp com Monday'
    },
    es: {
      title: 'Integración Monday WhatsApp | Eazybe',
      description: 'Conecta WhatsApp con Monday.com. Sincroniza chats y gestiona actualizaciones de proyectos de WhatsApp directamente en Monday.',
      keywords: 'Integración Monday WhatsApp, WhatsApp Monday.com, sincronizar WhatsApp con Monday'
    },
    tr: {
      title: 'Monday WhatsApp Entegrasyonu | Eazybe',
      description: 'WhatsApp\'ı Monday.com ile bağlayın. Sohbetleri senkronize edin ve proje güncellemelerini doğrudan Monday içinde yönetin.',
      keywords: 'Monday WhatsApp entegrasyonu, WhatsApp Monday.com, WhatsApp\'ı Monday ile senkronize et'
    }
  },
  'google-sheets-whatsapp-integration': {
    en: {
      title: 'Google Sheets WhatsApp Integration | Eazybe',
      description: 'Connect WhatsApp with Google Sheets. Sync chats automatically, use AI agents, track deals, and manage sales conversations directly inside Google Sheets.',
      keywords: 'Google Sheets WhatsApp integration, WhatsApp Google Sheets, sync WhatsApp with Google Sheets'
    },
    br: {
      title: 'Integração Google Sheets WhatsApp | Eazybe',
      description: 'Conecte o WhatsApp ao Google Sheets. Sincronize chats automaticamente, use agentes de IA, acompanhe deals e gerencie conversas de vendas diretamente no Google Sheets.',
      keywords: 'Integração Google Sheets WhatsApp, WhatsApp Google Sheets, sincronizar WhatsApp com Google Sheets'
    },
    es: {
      title: 'Integración Google Sheets WhatsApp | Eazybe',
      description: 'Conecta WhatsApp con Google Sheets. Sincroniza chats automáticamente, usa agentes de IA, rastrea deals y gestiona conversas de ventas directamente en Google Sheets.',
      keywords: 'Integración Google Sheets WhatsApp, WhatsApp Google Sheets, sincronizar WhatsApp con Google Sheets'
    },
    tr: {
      title: 'Google Sheets WhatsApp Entegrasyonu | Eazybe',
      description: 'WhatsApp\'ı Google Sheets ile bağlayın. Sohbetleri otomatik olarak senkronize edin, AI aracıları kullanın, deal\'leri takip edin ve satış konuşmalarını doğrudan Google Sheets içinde yönetin.',
      keywords: 'Google Sheets WhatsApp entegrasyonu, WhatsApp Google Sheets, WhatsApp\'ı Google Sheets ile senkronize et'
    }
  },
  'google-calendar-whatsapp-integration': {
    en: {
      title: 'Google Calendar WhatsApp Integration | Eazybe',
      description: 'Connect WhatsApp with Google Calendar. Sync chats, schedule meetings, and manage appointments from WhatsApp directly in Google Calendar.',
      keywords: 'Google Calendar WhatsApp integration, WhatsApp Google Calendar, sync WhatsApp with Google Calendar'
    },
    br: {
      title: 'Integração Google Agenda WhatsApp | Eazybe',
      description: 'Conecte o WhatsApp ao Google Agenda. Sincronize chats, agende reuniões e gerencie compromissos do WhatsApp diretamente no Google Agenda.',
      keywords: 'Integração Google Agenda WhatsApp, WhatsApp Google Agenda, sincronizar WhatsApp com Google Agenda'
    },
    es: {
      title: 'Integración Google Calendar WhatsApp | Eazybe',
      description: 'Conecta WhatsApp con Google Calendar. Sincroniza chats, agenda reuniones y gestiona citas de WhatsApp directamente en Google Calendar.',
      keywords: 'Integración Google Calendar WhatsApp, WhatsApp Google Calendar, sincronizar WhatsApp con Google Calendar'
    },
    tr: {
      title: 'Google Takvim WhatsApp Entegrasyonu | Eazybe',
      description: 'WhatsApp\'ı Google Takvim ile bağlayın. Sohbetleri senkronize edin, toplantı planlayın ve WhatsApp randevularını doğrudan Google Takvim içinde yönetin.',
      keywords: 'Google Takvim WhatsApp entegrasyonu, WhatsApp Google Takvim, WhatsApp\'ı Google Takvim ile senkronize et'
    }
  },
  'webhooks-whatsapp-integration': {
    en: {
      title: 'WhatsApp Webhooks Integration | Eazybe',
      description: 'Set up WhatsApp webhooks and connect with your favorite tools. Automate workflows and sync WhatsApp messages with your applications.',
      keywords: 'WhatsApp webhooks, WhatsApp automation, WhatsApp API integration'
    },
    br: {
      title: 'Integração WhatsApp Webhooks | Eazybe',
      description: 'Configure webhooks do WhatsApp e conecte-se com suas ferramentas favoritas. Automatize fluxos de trabalho e sincronize mensagens do WhatsApp com seus aplicativos.',
      keywords: 'Webhooks WhatsApp, automação WhatsApp, integração API WhatsApp'
    },
    es: {
      title: 'Integración WhatsApp Webhooks | Eazybe',
      description: 'Configura webhooks de WhatsApp y conecta con tus herramientas favoritas. Automatiza flujos de trabajo y sincroniza mensajes de WhatsApp con tus aplicaciones.',
      keywords: 'Webhooks WhatsApp, automatización WhatsApp, integración API WhatsApp'
    },
    tr: {
      title: 'WhatsApp Webhooks Entegrasyonu | Eazybe',
      description: 'WhatsApp webhooks\'larını kurun ve favori araçlarınızla bağlantı kurun. İş akışlarını otomatikleştirin ve WhatsApp mesajlarını uygulamalarınızla senkronize edin.',
      keywords: 'WhatsApp webhooks, WhatsApp otomasyonu, WhatsApp API entegrasyonu'
    }
  }
}

// Blog SEO data for all languages
const BLOG_SEO: Record<string, SEOData & { ogTitle: string; twitterTitle: string; articleSection: string; articleTag: string; ogImageAlt: string; twitterImageAlt: string; twitterLabel1: string; twitterData1: string; twitterLabel2: string; twitterData2: string; answerType: string; conversationalQuery: string; aiReadability: string; contextWindow: string; userProblem: string; solutionSummary: string; primaryBenefit: string; useCase: string }> = {
  en: {
    title: 'Eazybe Blog - WhatsApp CRM Tips, Sales Automation & AI Insights',
    description: 'Explore expert insights on WhatsApp CRM integration, sales automation, team inbox workflows, and AI-powered customer engagement. Learn strategies to grow revenue with Eazybe.',
    keywords: 'WhatsApp CRM tips, sales automation blog, WhatsApp sales strategies, CRM workflow automation, customer engagement strategies, WhatsApp business growth tips',
    ogTitle: 'Eazybe Blog | WhatsApp CRM, Sales Automation & AI Strategies',
    twitterTitle: 'Eazybe Blog - WhatsApp CRM & Sales Automation Insights',
    articleSection: 'Technology',
    articleTag: 'WhatsApp CRM Blog',
    ogImageAlt: 'Eazybe Blog - WhatsApp CRM and sales automation insights',
    twitterImageAlt: 'Eazybe Blog - WhatsApp CRM strategies',
    twitterLabel1: 'Content Type',
    twitterData1: 'Blog & Guides',
    twitterLabel2: 'Focus',
    twitterData2: 'CRM, WhatsApp, Sales Automation',
    answerType: 'how-to, guides, best-practices, tutorials',
    conversationalQuery: 'WhatsApp CRM tips, how to automate WhatsApp sales, best CRM workflow practices, AI sales automation guides',
    aiReadability: 'educational, practical, professional',
    contextWindow: 'sales automation, WhatsApp workflows, CRM strategy, team collaboration, customer lifecycle management',
    userProblem: 'lack of structured WhatsApp sales workflow, manual follow-ups, inefficient CRM usage',
    solutionSummary: 'educational guides and best practices for improving WhatsApp-based sales workflows',
    primaryBenefit: 'learn how to improve sales productivity and customer engagement using WhatsApp and CRM automation',
    useCase: 'business teams researching WhatsApp CRM strategies and automation methods'
  },
  br: {
    title: 'Blog Eazybe - Dicas de CRM WhatsApp, Automação de Vendas & Insights de IA',
    description: 'Explore insights especializados sobre integração de WhatsApp CRM, automação de vendas, fluxos de trabalho de caixa de entrada da equipe e engajamento do cliente com IA. Aprenda estratégias para crescer receita com a Eazybe.',
    keywords: 'dicas de WhatsApp CRM, blog de automação de vendas, estratégias de vendas WhatsApp, automação de fluxo de trabalho CRM, estratégias de engajamento do cliente, dicas de crescimento de negócios WhatsApp',
    ogTitle: 'Blog Eazybe | WhatsApp CRM, Automação de Vendas e Estratégias de IA',
    twitterTitle: 'Blog Eazybe - Insights de CRM WhatsApp e Automação de Vendas',
    articleSection: 'Tecnologia',
    articleTag: 'Blog WhatsApp CRM',
    ogImageAlt: 'Blog Eazybe - insights de automação de vendas e CRM WhatsApp',
    twitterImageAlt: 'Blog Eazybe - estratégias de CRM WhatsApp',
    twitterLabel1: 'Tipo de Conteúdo',
    twitterData1: 'Blog & Guias',
    twitterLabel2: 'Foco',
    twitterData2: 'CRM, WhatsApp, Automação de Vendas',
    answerType: 'como fazer, guias, melhores práticas, tutoriais',
    conversationalQuery: 'dicas de WhatsApp CRM, como automatizar vendas WhatsApp, melhores práticas de fluxo de trabalho CRM, guias de automação de vendas com IA',
    aiReadability: 'educacional, prático, profissional',
    contextWindow: 'automação de vendas, fluxos de trabalho WhatsApp, estratégia CRM, colaboração em equipe, gerenciamento de ciclo de vida do cliente',
    userProblem: 'falta de fluxo de vendas WhatsApp estruturado, follow-ups manuais, uso ineficiente de CRM',
    solutionSummary: 'guias educacionais e melhores práticas para melhorar fluxos de trabalho de vendas baseados em WhatsApp',
    primaryBenefit: 'aprenda como melhorar a produtividade de vendas e o engajamento do cliente usando WhatsApp e automação de CRM',
    useCase: 'equipes de negócios pesquisando estratégias de WhatsApp CRM e métodos de automação'
  },
  es: {
    title: 'Blog Eazybe - Consejos CRM de WhatsApp, Automatización de Ventas e Insights de IA',
    description: 'Explora insights expertos sobre integración de WhatsApp CRM, automatización de ventas, flujos de trabajo de bandeja de entrada del equipo y participación del cliente con IA. Aprende estrategias para crecer ingresos con Eazybe.',
    keywords: 'consejos de WhatsApp CRM, blog de automatización de ventas, estrategias de ventas WhatsApp, automatización de flujo de trabajo CRM, estrategias de participación del cliente, consejos de crecimiento de negocios WhatsApp',
    ogTitle: 'Blog Eazybe | WhatsApp CRM, Automatización de Ventas y Estrategias de IA',
    twitterTitle: 'Blog Eazybe - Insights de CRM WhatsApp y Automatización de Ventas',
    articleSection: 'Tecnología',
    articleTag: 'Blog WhatsApp CRM',
    ogImageAlt: 'Blog Eazybe - insights de automatización de ventas y CRM WhatsApp',
    twitterImageAlt: 'Blog Eazybe - estrategias de CRM WhatsApp',
    twitterLabel1: 'Tipo de Contenido',
    twitterData1: 'Blog y Guías',
    twitterLabel2: 'Enfoque',
    twitterData2: 'CRM, WhatsApp, Automatización de Ventas',
    answerType: 'cómo hacer, guías, mejores prácticas, tutoriales',
    conversationalQuery: 'consejos de WhatsApp CRM, cómo automatizar ventas WhatsApp, mejores prácticas de flujo de trabajo CRM, guías de automatización de ventas con IA',
    aiReadability: 'educacional, práctico, profesional',
    contextWindow: 'automatización de ventas, flujos de trabajo WhatsApp, estrategia CRM, colaboración en equipo, gestión del ciclo de vida del cliente',
    userProblem: 'falta de flujo de ventas WhatsApp estructurado, seguimientos manuales, uso ineficiente de CRM',
    solutionSummary: 'guías educacionales y mejores prácticas para mejorar flujos de trabajo de ventas basados en WhatsApp',
    primaryBenefit: 'aprende cómo mejorar la productividad de ventas y la participación del cliente usando WhatsApp y automatización de CRM',
    useCase: 'equipos de negocios investigando estrategias de WhatsApp CRM y métodos de automatización'
  },
  tr: {
    title: 'Eazybe Blog - WhatsApp CRM İpuçları, Satış Otomasyonu ve Yapay Zeka Analizleri',
    description: 'WhatsApp CRM entegrasyonu, satış otomasyonu, takım gelen kutusu iş akışları ve yapay zeka destekli müşteri etkileşimi konusunda uzman görüşlerini keşfedin. Eazybe ile gelir büyütme stratejilerini öğrenin.',
    keywords: 'WhatsApp CRM ipuçları, satış otomasyonu blogu, WhatsApp satış stratejileri, CRM iş akışı otomasyonu, müşteri etkileşimi stratejileri, WhatsApp iş büyüme ipuçları',
    ogTitle: 'Eazybe Blog | WhatsApp CRM, Satış Otomasyonu ve Yapay Zeka Stratejileri',
    twitterTitle: 'Eazybe Blog - WhatsApp CRM ve Satış Otomasyonu Analizleri',
    articleSection: 'Teknoloji',
    articleTag: 'WhatsApp CRM Blogu',
    ogImageAlt: 'Eazybe Blog - WhatsApp CRM ve satış otomasyonu analizleri',
    twitterImageAlt: 'Eazybe Blog - WhatsApp CRM stratejileri',
    twitterLabel1: 'İçerik Türü',
    twitterData1: 'Blog ve Rehberler',
    twitterLabel2: 'Odak',
    twitterData2: 'CRM, WhatsApp, Satış Otomasyonu',
    answerType: 'nasıl yapılır, rehberler, en iyi uygulamalar, öğreticiler',
    conversationalQuery: 'WhatsApp CRM ipuçları, WhatsApp satışlarını nasıl otomatize edilir, en iyi CRM iş akışı uygulamaları, yapay zeka satış otomasyonu rehberleri',
    aiReadability: 'eğitimsel, pratik, profesyonel',
    contextWindow: 'satış otomasyonu, WhatsApp iş akışları, CRM stratejisi, takım işbirliği, müşteri yaşam döngüsü yönetimi',
    userProblem: 'yapılandırılmış WhatsApp satış iş akışı eksikliği, manuel takipler, verimsiz CRM kullanımı',
    solutionSummary: 'WhatsApp tabanlı satış iş akışlarını iyileştirmek için eğitim rehberleri ve en iyi uygulamalar',
    primaryBenefit: 'WhatsApp ve CRM otomasyonu kullanarak satış verimliliğini ve müşteri etkileşimini nasıl iyileştireceğinizi öğrenin',
    useCase: 'WhatsApp CRM stratejileri ve otomasyon yöntemlerini araştıran iş takımları'
  }
}

// Generate blog-specific meta tags HTML with all the custom tags
function generateBlogMetaTags(locale: string, canonicalUrl: string, blogSeo: typeof BLOG_SEO.en): string {
  return `
    <!-- Basic Meta Tags -->
    <meta name="description" content="${blogSeo.description}" />
    <meta name="keywords" content="${blogSeo.keywords}" />
    <meta name="author" content="Eazybe" />
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
    <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
    <meta name="bingbot" content="index, follow" />
    <meta name="thumbnail" content="https://eazybe.com/logo.png" />

    <!-- Article Meta Tags -->
    <meta property="article:section" content="${blogSeo.articleSection}" />
    <meta property="article:tag" content="${blogSeo.articleTag}" />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:title" content="${blogSeo.ogTitle}" />
    <meta property="og:description" content="${blogSeo.description}" />
    <meta property="og:image" content="https://eazybe.com/logo.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${blogSeo.ogImageAlt}" />
    <meta property="og:locale" content="${locale}" />
    <meta property="og:site_name" content="Eazybe" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@eazybe" />
    <meta name="twitter:creator" content="@eazybe" />
    <meta name="twitter:title" content="${blogSeo.twitterTitle}" />
    <meta name="twitter:description" content="${blogSeo.description}" />
    <meta name="twitter:image" content="https://eazybe.com/logo.png" />
    <meta name="twitter:image:alt" content="${blogSeo.twitterImageAlt}" />
    <meta name="twitter:label1" content="${blogSeo.twitterLabel1}" />
    <meta name="twitter:data1" content="${blogSeo.twitterData1}" />
    <meta name="twitter:label2" content="${blogSeo.twitterLabel2}" />
    <meta name="twitter:data2" content="${blogSeo.twitterData2}" />

    <!-- Mobile Web App -->
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="apple-mobile-web-app-title" content="Eazybe" />

    <!-- AI and SEO Specific Meta Tags -->
    <meta name="answer-type" content="${blogSeo.answerType}" />
    <meta name="target-audience" content="sales teams, CRM users, founders, marketing teams, support teams, B2B companies" />
    <meta name="content-intent" content="informational" />
    <meta name="conversational-query" content="${blogSeo.conversationalQuery}" />
    <meta name="ai-readability" content="${blogSeo.aiReadability}" />
    <meta name="context-window" content="${blogSeo.contextWindow}" />
    <meta name="user-problem" content="${blogSeo.userProblem}" />
    <meta name="solution-summary" content="${blogSeo.solutionSummary}" />
    <meta name="primary-benefit" content="${blogSeo.primaryBenefit}" />
    <meta name="use-case" content="${blogSeo.useCase}" />
    <meta name="implementation-difficulty" content="varies by guide" />
    <meta name="time-to-value" content="immediate insights from each article" />

    <!-- Link Tags -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="dns-prefetch" href="https://fonts.googleapis.com" />

    <!-- Canonical -->
    <link rel="canonical" href="${canonicalUrl}" />
  `.trim()
}

// Generate JSON-LD schemas for blog pages
function generateBlogSchemas(canonicalUrl: string, blogSeo: typeof BLOG_SEO.en, langKey: string): string {
  // Language-specific breadcrumb URLs
  const breadcrumbBaseUrl = langKey === 'en' ? 'https://eazybe.com/' :
                            langKey === 'br' ? 'https://eazybe.com/br' :
                            langKey === 'es' ? 'https://eazybe.com/es' :
                            'https://eazybe.com/tr'

  const breadcrumbs = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Eazybe",
      "item": breadcrumbBaseUrl
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": langKey === 'en' ? 'Blog' : langKey === 'br' ? 'Blog' : langKey === 'es' ? 'Blog' : 'Blog',
      "item": canonicalUrl
    }
  ]

  const faqData = {
    en: {
      questions: [
        {
          name: "What topics does the Eazybe blog cover?",
          answer: "The Eazybe blog covers WhatsApp CRM integration tips, sales automation strategies, team inbox workflows, AI-powered customer engagement, CRM workflow automation, and WhatsApp business growth tips."
        },
        {
          name: "How can I improve my WhatsApp sales workflow?",
          answer: "You can improve your WhatsApp sales workflow by implementing CRM automation, using AI agents for faster responses, setting up team inbox workflows, and following customer engagement best practices described in our articles."
        },
        {
          name: "What CRM platforms integrate with WhatsApp?",
          answer: "Popular CRM platforms that integrate with WhatsApp include HubSpot, Salesforce, Zoho, Bitrix24, LeadSquared, Freshdesk, Pipedrive, and Monday.com. Our blog provides detailed guides for each integration."
        }
      ]
    },
    br: {
      questions: [
        {
          name: "Quais tópicos o blog Eazybe cobre?",
          answer: "O blog Eazybe cobre dicas de integração CRM WhatsApp, estratégias de automação de vendas, fluxos de trabalho de equipe compartilhada, engajamento do cliente com suporte de IA, automação de fluxos de trabalho CRM e dicas de crescimento de negócios WhatsApp."
        },
        {
          name: "Como posso melhorar meu fluxo de vendas WhatsApp?",
          answer: "Você pode melhorar seu fluxo de vendas WhatsApp implementando automação CRM, usando agentes de IA para respostas mais rápidas, configurando fluxos de trabalho de equipe compartilhada e seguindo as melhores práticas para engajamento do cliente descritas em nossos artigos."
        },
        {
          name: "Quais plataformas de CRM integram com WhatsApp?",
          answer: "Plataformas de CRM populares que integram com WhatsApp incluem HubSpot, Salesforce, Zoho, Bitrix24, LeadSquared, Freshdesk, Pipedrive e Monday.com. Nosso blog fornece guias detalhados para cada integração."
        }
      ]
    },
    es: {
      questions: [
        {
          name: "¿Qué temas cubre el blog Eazybe?",
          answer: "El blog Eazybe cubre consejos de integración CRM WhatsApp, estrategias de automatización de ventas, flujos de trabajo de equipo compartido, participación del cliente con soporte de IA, automatización de flujos de trabajo CRM y consejos de crecimiento empresarial WhatsApp."
        },
        {
          name: "¿Cómo puedo mejorar mi flujo de ventas de WhatsApp?",
          answer: "Puedes mejorar tu flujo de ventas de WhatsApp implementando automatización CRM, usando agentes de IA para respuestas más rápidas, configurando flujos de trabajo de equipo compartido y siguiendo las mejores prácticas para la participación del cliente descritas en nuestros artículos."
        },
        {
          name: "¿Qué plataformas de CRM integran con WhatsApp?",
          answer: "Las plataformas de CRM populares que integran con WhatsApp incluyen HubSpot, Salesforce, Zoho, Bitrix24, LeadSquared, Freshdesk, Pipedrive y Monday.com. Nuestro blog proporciona guías detalladas para cada integración."
        }
      ]
    },
    tr: {
      questions: [
        {
          name: "Eazybe blog hangi konuları kapsıyor?",
          answer: "Eazybe blog, WhatsApp CRM entegrasyon ipuçları, satış otomasyonu stratejileri, ekibe işbirliği iş akışları, yapay zeka destekli müşteri katılımı, CRM iş akışı otomasyonu ve WhatsApp iş büyüme ipuçlarını kapsar."
        },
        {
          name: "WhatsApp satış iş akışımı nasıl geliştirebilirim?",
          answer: "CRM otomasyonu uygulayarak, daha hızlı yanıtlar için yapay zeka ajanları kullanarak, ekibe gelen kutusu iş akışları yapılandırarak ve blog makalelerimizde özetlenen müşteri katılımı en iyi uygulamalarını takarak WhatsApp satış iş akışınızı geliştirebilirsiniz."
        },
        {
          name: "Hangi CRM platformları WhatsApp ile entegre?",
          answer: "WhatsApp ile entegre olan popüler CRM platformları HubSpot, Salesforce, Zoho, Bitrix24, LeadSquared, Freshdesk, Pipedrive ve Monday.com'ı içerir. Blogumuz her entegrasyon için detaylı rehberler sağlar."
        }
      ]
    }
  }

  const orgDesc = {
    en: "Eazybe helps sales teams connect WhatsApp with CRM platforms to sync conversations, automate follow-ups, and improve customer engagement.",
    br: "Eazybe ajuda equipes de vendas a conectar WhatsApp com plataformas CRM para sincronizar conversas, automatizar follow-ups e melhorar engajamento do cliente.",
    es: "Eazybe ayuda a los equipos de ventas a conectar WhatsApp con plataformas CRM para sincronizar conversaciones, automatizar seguimientos y mejorar la participación del cliente.",
    tr: "Eazybe, satış ekiplerinin WhatsApp'ı CRM platformlarıyla bağlantı kurmasına, konuşmaları senkronize etmesine, takip otomatize etmesine ve müşteri konuşmalarını iyileştirmesine yardımcı olur."
  }

  const webDesc = {
    en: "WhatsApp CRM & Sales Automation Platform",
    br: "Plataforma CRM WhatsApp & Automação de Vendas",
    es: "Plataforma CRM WhatsApp y Automatización de Ventas",
    tr: "WhatsApp CRM ve Satış Otomasyonu Platformu"
  }

  const faq = faqData[langKey as keyof typeof faqData] || faqData.en

  const schemas = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs
      },
      {
        '@type': 'CollectionPage',
        url: canonicalUrl,
        name: blogSeo.title,
        description: blogSeo.description,
        inLanguage: langKey === 'en' ? 'en' : langKey === 'br' ? 'pt-BR' : langKey === 'es' ? 'es' : 'tr',
        about: [
          { '@type': 'Thing', name: 'WhatsApp CRM' },
          { '@type': 'Thing', name: langKey === 'en' ? 'Sales Automation' : langKey === 'br' ? 'Automação de Vendas' : langKey === 'es' ? 'Automatización de Ventas' : 'Satış Otomasyonu' },
          { '@type': 'Thing', name: langKey === 'en' ? 'Customer Engagement' : langKey === 'br' ? 'Engajamento do Cliente' : langKey === 'es' ? 'Participación del Cliente' : 'Müşteri Katılımı' }
        ]
      },
      {
        '@type': 'Organization',
        name: 'Eazybe',
        url: 'https://eazybe.com/',
        logo: {
          '@type': 'ImageObject',
          url: 'https://eazybe.com/logo.png',
          width: 600,
          height: 60
        },
        description: orgDesc[langKey as keyof typeof orgDesc] || orgDesc.en
      },
      {
        '@type': 'WebSite',
        url: 'https://eazybe.com/',
        name: 'Eazybe',
        description: webDesc[langKey as keyof typeof webDesc] || webDesc.en
      },
      {
        '@type': 'FAQPage',
        mainEntity: faq.questions.map(q => ({
          '@type': 'Question',
          name: q.name,
          acceptedAnswer: {
            '@type': 'Answer',
            text: q.answer
          }
        }))
      },
      {
        '@type': 'SoftwareApplication',
        name: langKey === 'en' ? 'WhatsApp CRM Integration - Eazybe' : langKey === 'br' ? 'Integração CRM WhatsApp - Eazybe' : langKey === 'es' ? 'Integración CRM WhatsApp - Eazybe' : 'WhatsApp CRM Entegrasyonu - Eazybe',
        applicationCategory: 'BusinessApplication',
        applicationSubCategory: langKey === 'en' ? 'CRM Integration, WhatsApp Automation, AI Agents for WhatsApp' : langKey === 'br' ? 'Integração CRM, Automação WhatsApp, Agentes de IA para WhatsApp' : langKey === 'es' ? 'Integración CRM, Automatización WhatsApp, Agentes de IA para WhatsApp' : 'CRM Entegrasyonu, WhatsApp Otomasyonu, WhatsApp için Yapay Zeka Ajanları',
        operatingSystem: 'Web, Chrome Extension',
        offers: {
          '@type': 'AggregateOffer',
          url: 'https://eazybe.com/pricing',
          priceCurrency: 'USD',
          lowPrice: 29,
          highPrice: 49,
          offerCount: 5,
          availability: 'https://schema.org/InStock'
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.7',
          bestRating: '5',
          worstRating: '1',
          ratingCount: 53766
        },
        featureList: langKey === 'en' ? [
          'Automatic WhatsApp to CRM sync',
          'AI-powered response suggestions',
          'Shared inbox for team collaboration',
          'Deal tracking from WhatsApp',
          'Contact sync',
          'Message scheduling',
          'AI Agents for CRM'
        ] : langKey === 'br' ? [
          'Sincronização automática WhatsApp para CRM',
          'Sugestões de resposta alimentadas por IA',
          'Caixa de entrada compartilhada para colaboração em equipe',
          'Acompanhamento de negócios do WhatsApp',
          'Sincronização de contatos',
          'Agendamento de mensagens',
          'Agentes de IA para CRM'
        ] : langKey === 'es' ? [
          'Sincronización automática de WhatsApp a CRM',
          'Sugerencias de respuesta impulsadas por IA',
          'Bandeja de entrada compartida para colaboración en equipo',
          'Seguimiento de acuerdos desde WhatsApp',
          'Sincronización de contactos',
          'Programación de mensajes',
          'Agentes de IA para CRM'
        ] : [
          'Otomatik WhatsApp\'dan CRM\'e senkronizasyon',
          'Yapay zeka destekli yanıt önerileri',
          'Ekibe işbirliği için paylaşılan gelen kutusu',
          'WhatsApp\'tan anlaşma takibi',
          'Kontakt senkronizasyonu',
          'Mesaj planlama',
          'CRM için Yapay Zeka Ajanları'
        ]
      }
    ]
  }

  return `
    <script type="application/ld+json">
    ${JSON.stringify(schemas)}
    </script>
  `.trim()
}

// Generate meta tags HTML
function generateMetaTags(title: string, description: string, keywords: string, locale: string, canonicalUrl: string): string {
  return `
    <meta name="description" content="${description}" />
    <meta name="keywords" content="${keywords}" />
    <meta name="author" content="Eazybe" />
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
    <meta name="googlebot" content="index, follow" />
    <meta name="bingbot" content="index, follow" />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="https://eazybe.com/logo.png" />
    <meta property="og:locale" content="${locale}" />
    <meta property="og:site_name" content="Eazybe" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@eazybe" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="https://eazybe.com/logo.png" />

    <!-- Canonical -->
    <link rel="canonical" href="${canonicalUrl}" />
  `.trim()
}

// Create pre-rendered HTML file
function createPrerenderedHTML(path: string, seoData: { title: string; description: string; keywords: string }, lang: { prefix: string; locale: string }): string {
  const fullPath = lang.prefix ? `${lang.prefix}/${path}` : path
  const canonicalUrl = fullPath ? `https://eazybe.com/${fullPath.replace(/^\//, '')}` : 'https://eazybe.com'

  // Read the original index.html
  const indexPath = join(DIST_DIR, 'index.html')
  let indexHTML = readFileSync(indexPath, 'utf-8')

  // Inject meta tags into head
  const metaTags = generateMetaTags(seoData.title, seoData.description, seoData.keywords, lang.locale, canonicalUrl)

  // Replace title - match either existing title format
  indexHTML = indexHTML.replace(/<title>.*?<\/title>/, `<title>${seoData.title}</title>`)

  // Add meta tags after existing meta tags or before closing head
  const headEndIndex = indexHTML.indexOf('</head>')
  if (headEndIndex !== -1) {
    indexHTML = indexHTML.slice(0, headEndIndex) + metaTags + indexHTML.slice(headEndIndex)
  }

  return indexHTML
}

// Create blog-specific pre-rendered HTML file with all custom meta tags
function createBlogPrerenderedHTML(canonicalUrl: string, lang: { prefix: string; locale: string }, langKey: string): string {
  // Read the original index.html
  const indexPath = join(DIST_DIR, 'index.html')
  let indexHTML = readFileSync(indexPath, 'utf-8')

  // Get language-specific blog SEO data, fallback to English if not available
  const blogSeo = BLOG_SEO[langKey as keyof typeof BLOG_SEO] || BLOG_SEO.en

  // Generate blog-specific meta tags with language-specific content
  const metaTags = generateBlogMetaTags(lang.locale, canonicalUrl, blogSeo)

  // Generate JSON-LD schemas for this language
  const schemas = generateBlogSchemas(canonicalUrl, blogSeo, langKey)

  // Replace title with language-specific title
  indexHTML = indexHTML.replace(/<title>.*?<\/title>/, `<title>${blogSeo.title}</title>`)

  // Add meta tags and schemas before closing head
  const headEndIndex = indexHTML.indexOf('</head>')
  if (headEndIndex !== -1) {
    indexHTML = indexHTML.slice(0, headEndIndex) + '\n' + metaTags + '\n\n' + schemas + '\n' + indexHTML.slice(headEndIndex)
  }

  return indexHTML
}

// Generate all pre-rendered files
async function generatePrerenderedFiles() {
  console.log('🚀 Starting SSR pre-rendering...')

  // Ensure dist directory exists
  if (!existsSync(DIST_DIR)) {
    console.error('❌ dist directory not found. Run npm run build first.')
    process.exit(1)
  }

  const filesCreated: string[] = []

  // Generate for each language and route combination
  for (const [langKey, langConfig] of Object.entries(LANGUAGES)) {
    const langPrefix = langConfig.prefix // Get the prefix value

    // Static routes
    for (const route of ROUTES) {
      const routePath = route.path // Extract path from route object
      const routePrefix = langPrefix ? `${langPrefix}/${routePath}` : routePath
      const outputPath = join(DIST_DIR, routePrefix, 'index.html')
      const outputDir = join(DIST_DIR, routePrefix)

      try {
        mkdirSync(outputDir, { recursive: true })

        let html: string

        // Special handling for blog page with custom meta tags
        if (routePath === 'blog') {
          const canonicalUrl = routePrefix ? `https://eazybe.com/${routePrefix}` : 'https://eazybe.com/blog'
          html = createBlogPrerenderedHTML(canonicalUrl, langConfig, langKey)
        } else {
          // Create SEO data for other routes
          const seoData = {
            title: route.title,
            description: `Eazybe helps sales teams connect WhatsApp with CRM platforms. ${routePath.charAt(0).toUpperCase() + routePath.slice(1)} page.`,
            keywords: `Eazybe, WhatsApp CRM, ${routePath}`
          }
          html = createPrerenderedHTML(routePath, seoData, langConfig)
        }

        writeFileSync(outputPath, html, 'utf-8')
        filesCreated.push(outputPath)
        console.log(`✅ Created: ${routePrefix}/index.html`)
      } catch (error) {
        console.error(`❌ Error creating ${outputPath}:`, error)
      }
    }

    // Integration routes
    for (const integration of INTEGRATIONS) {
      const integrationSeoData = INTEGRATION_SEO[integration]
      if (!integrationSeoData) continue

      // Get language-specific SEO data, fallback to English if not available
      const seoData = integrationSeoData[langKey] || integrationSeoData['en']
      if (!seoData) continue

      const routePrefix = langPrefix ? `${langPrefix}/${integration}` : integration
      const outputPath = join(DIST_DIR, routePrefix, 'index.html')
      const outputDir = join(DIST_DIR, routePrefix)

      try {
        mkdirSync(outputDir, { recursive: true })
        const html = createPrerenderedHTML(integration, seoData, langConfig)
        writeFileSync(outputPath, html, 'utf-8')
        filesCreated.push(outputPath)
        console.log(`✅ Created: ${routePrefix}/index.html`)
      } catch (error) {
        console.error(`❌ Error creating ${outputPath}:`, error)
      }
    }
  }

  // Create robots.txt
  const robotsPath = join(DIST_DIR, 'robots.txt')
  const robotsContent = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

Sitemap: https://eazybe.com/sitemap.xml

# Crawl delay
Crawl-delay: 1

# Allow all major SEO tools and crawlers
User-agent: Googlebot
Allow: /

User-agent: Googlebot-Image
Allow: /

User-agent: Googlebot-Video
Allow: /

User-agent: ScreamingFrog
Allow: /

User-agent: SEOcentrus
Allow: /

User-agent: SemrushBot
Allow: /

User-agent: AhrefsBot
Allow: /

User-agent: MJ12bot
Allow: /

User-agent: DotBot
Allow: /

User-agent: BLEXBot
Allow: /

# Social media crawlers
User-agent: facebookexternalhit
Allow: /

User-agent: LinkedInBot
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: Slackbot
Allow: /

# Other common crawlers
User-agent: Applebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: YandexBot
Allow: /

User-agent: ia_archiver
Allow: /
`
  writeFileSync(robotsPath, robotsContent, 'utf-8')
  console.log(`✅ Created: robots.txt`)
  filesCreated.push(robotsPath)

  console.log(`\n✨ Pre-rendering complete! ${filesCreated.length} files created.`)
}

// Run the generation
generatePrerenderedFiles().catch(console.error)
