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

        // Create SEO data
        const seoData = {
          title: route.title,
          description: `Eazybe helps sales teams connect WhatsApp with CRM platforms. ${routePath.charAt(0).toUpperCase() + routePath.slice(1)} page.`,
          keywords: `Eazybe, WhatsApp CRM, ${routePath}`
        }

        const html = createPrerenderedHTML(routePath, seoData, langConfig)
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

# Allow all major SEO tools
User-agent: Googlebot
Allow: /

User-agent: ScreamingFrog
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: LinkedInBot
Allow: /

User-agent: Twitterbot
Allow: /
`
  writeFileSync(robotsPath, robotsContent, 'utf-8')
  console.log(`✅ Created: robots.txt`)
  filesCreated.push(robotsPath)

  console.log(`\n✨ Pre-rendering complete! ${filesCreated.length} files created.`)
}

// Run the generation
generatePrerenderedFiles().catch(console.error)
