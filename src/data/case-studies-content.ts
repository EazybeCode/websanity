/**
 * Localized copy for /case-studies. Same shape as the other static marketing
 * pages: strings only, icons/markup stay in the page component.
 *
 * Only real, approved customer stories belong here (the sample cards were
 * removed 2026-08-31). A card with no `href` renders without a "Read the
 * story" link, so a card can ship before its full write-up exists.
 */

export interface CaseStudyCard {
  /** Two-letter monogram for the avatar tile. */
  initials: string
  company: string
  industry: string
  headline: string
  summary: string
  /** Link to the full write-up. Omit while it doesn't exist yet. */
  href?: string
}

export interface CaseStudiesPageContent {
  meta: { title: string; description: string; ogDescription: string }
  breadcrumb: { home: string; current: string }
  hero: {
    tag: string
    h1Lead: string
    h1Highlight: string
    subtitle: string
    cta: string
    footnote: string
  }
  grid: { h2: string; subtitle: string; readStory: string }
  cards: CaseStudyCard[]
  finalCta: { h2: string; body: string; primary: string; secondary: string }
}

const en: CaseStudiesPageContent = {
  meta: {
    title: 'Customer Case Studies - WhatsApp Sales Results | Eazybe',
    description:
      'How sales teams use Eazybe to sync WhatsApp with their CRM, share team inboxes and put AI agents on their busiest conversations, so deals stop hiding in chats.',
    ogDescription:
      'How sales teams run WhatsApp with Eazybe: CRM sync, team inboxes and AI agents on the conversations that close deals.',
  },
  breadcrumb: { home: 'Home', current: 'Case Studies' },
  hero: {
    tag: 'Customer Stories',
    h1Lead: 'Teams That Made WhatsApp Their',
    h1Highlight: 'Best Sales Channel',
    subtitle:
      'Every story here starts the same way: deals happening in WhatsApp and a CRM that never heard about them. What changes is what each team did next.',
    cta: 'Read the stories',
    footnote: 'Eazybe works on the WhatsApp your reps already use, so there is nothing to migrate and no new number to adopt.',
  },
  grid: {
    h2: 'Pick A Story',
    subtitle: 'Different industries, same problem: revenue living in chats nobody could see.',
    readStory: 'Read the story',
  },
  cards: [
    // Real customer story (referred by Hook Digital) — keep first.
    {
      initials: 'LK',
      company: 'Lokmax',
      industry: 'Equipment rental',
      headline: 'From fragmented chats to a predictable revenue engine',
      summary:
        'Brazil’s compact machinery rental specialist unified WhatsApp and HubSpot: quotes went from 24–48 hours to under 3, and lease extensions stopped depending on rep memory.',
      href: '/case-studies/lokmaxltda',
    },
  ],
  finalCta: {
    h2: 'Your Team Could Be The Next Story',
    body:
      'Eazybe syncs WhatsApp conversations into HubSpot, Salesforce, Zoho, Pipedrive and more, so the deals your reps close in chat show up where the business can see them.',
    primary: 'Start free',
    secondary: 'Book a demo',
  },
}

const br: CaseStudiesPageContent = {
  meta: {
    title: 'Casos de Sucesso - Resultados de Vendas no WhatsApp | Eazybe',
    description:
      'Como times de vendas usam a Eazybe para sincronizar o WhatsApp com o CRM, compartilhar caixas de entrada e colocar agentes de IA nas conversas mais movimentadas.',
    ogDescription:
      'Como times de vendas rodam o WhatsApp com a Eazybe: sync com CRM, caixa de entrada de equipe e agentes de IA nas conversas que fecham negócios.',
  },
  breadcrumb: { home: 'Início', current: 'Casos de Sucesso' },
  hero: {
    tag: 'Histórias de Clientes',
    h1Lead: 'Times Que Fizeram do WhatsApp Seu',
    h1Highlight: 'Melhor Canal de Vendas',
    subtitle:
      'Toda história aqui começa igual: negócios acontecendo no WhatsApp e um CRM que nunca ficou sabendo. O que muda é o que cada time fez em seguida.',
    cta: 'Ler as histórias',
    footnote: 'A Eazybe funciona no WhatsApp que seus vendedores já usam, sem precisar migrar nada nem adotar um número novo.',
  },
  grid: {
    h2: 'Escolha uma história',
    subtitle: 'Setores diferentes, mesmo problema: receita vivendo em conversas que ninguém enxergava.',
    readStory: 'Ler a história',
  },
  cards: [
    {
      initials: 'LK',
      company: 'Lokmax',
      industry: 'Locação de equipamentos',
      headline: 'De conversas fragmentadas a um motor de receita previsível',
      summary:
        'A especialista brasileira em locação de máquinas compactas unificou WhatsApp e HubSpot: cotações caíram de 24–48 horas para menos de 3, e as extensões de contrato deixaram de depender da memória do vendedor.',
      href: '/case-studies/lokmaxltda',
    },
  ],
  finalCta: {
    h2: 'Seu time pode ser a próxima história',
    body:
      'A Eazybe sincroniza conversas do WhatsApp com HubSpot, Salesforce, Zoho, Pipedrive e outros, para os negócios fechados no chat aparecerem onde a empresa enxerga.',
    primary: 'Começar grátis',
    secondary: 'Agendar demo',
  },
}

const es: CaseStudiesPageContent = {
  meta: {
    title: 'Casos de Éxito - Resultados de Ventas en WhatsApp | Eazybe',
    description:
      'Cómo los equipos de ventas usan Eazybe para sincronizar WhatsApp con su CRM, compartir bandejas de equipo y poner agentes de IA en sus conversaciones más activas.',
    ogDescription:
      'Cómo los equipos de ventas gestionan WhatsApp con Eazybe: sync con CRM, bandejas de equipo y agentes de IA en las conversaciones que cierran ventas.',
  },
  breadcrumb: { home: 'Inicio', current: 'Casos de Éxito' },
  hero: {
    tag: 'Historias de Clientes',
    h1Lead: 'Equipos Que Hicieron de WhatsApp Su',
    h1Highlight: 'Mejor Canal de Ventas',
    subtitle:
      'Todas las historias aquí empiezan igual: ventas ocurriendo en WhatsApp y un CRM que nunca se enteró. Lo que cambia es lo que hizo cada equipo después.',
    cta: 'Leer las historias',
    footnote: 'Eazybe funciona en el WhatsApp que tus reps ya usan, sin tener que migrar nada ni estrenar número.',
  },
  grid: {
    h2: 'Elige una historia',
    subtitle: 'Sectores distintos, mismo problema: ingresos viviendo en chats que nadie podía ver.',
    readStory: 'Leer la historia',
  },
  cards: [
    {
      initials: 'LK',
      company: 'Lokmax',
      industry: 'Alquiler de equipos',
      headline: 'De chats fragmentados a un motor de ingresos predecible',
      summary:
        'El especialista brasileño en alquiler de maquinaria compacta unificó WhatsApp y HubSpot: las cotizaciones pasaron de 24–48 horas a menos de 3, y las extensiones de contrato dejaron de depender de la memoria del vendedor.',
      href: '/case-studies/lokmaxltda',
    },
  ],
  finalCta: {
    h2: 'Tu equipo puede ser la próxima historia',
    body:
      'Eazybe sincroniza las conversaciones de WhatsApp con HubSpot, Salesforce, Zoho, Pipedrive y más, para que las ventas cerradas en el chat aparezcan donde la empresa puede verlas.',
    primary: 'Empezar gratis',
    secondary: 'Reservar demo',
  },
}

const tr: CaseStudiesPageContent = {
  meta: {
    title: 'Başarı Hikayeleri - WhatsApp Satış Sonuçları | Eazybe',
    description:
      "Satış ekipleri Eazybe ile WhatsApp'ı CRM'e nasıl senkronluyor, ekip gelen kutularını nasıl paylaşıyor ve en yoğun konuşmalara Yapay Zeka ajanlarını nasıl koyuyor.",
    ogDescription:
      "Satış ekipleri WhatsApp'ı Eazybe ile yönetiyor: CRM senkronu, ekip gelen kutusu ve satışı kapatan konuşmalarda Yapay Zeka ajanları.",
  },
  breadcrumb: { home: 'Ana Sayfa', current: 'Başarı Hikayeleri' },
  hero: {
    tag: 'Müşteri Hikayeleri',
    h1Lead: "WhatsApp'ı En İyi Satış Kanalına",
    h1Highlight: 'Dönüştüren Ekipler',
    subtitle:
      "Buradaki her hikaye aynı şekilde başlıyor: satışlar WhatsApp'ta oluyor, CRM'in ise haberi olmuyor. Değişen şey, her ekibin sonrasında ne yaptığı.",
    cta: 'Hikayeleri okuyun',
    footnote: 'Eazybe, temsilcilerinizin zaten kullandığı WhatsApp üzerinde çalışır; herhangi bir taşıma da yeni bir numara da gerekmez.',
  },
  grid: {
    h2: 'Bir hikaye seçin',
    subtitle: 'Farklı sektörler, aynı sorun: kimsenin göremediği sohbetlerde yaşayan gelir.',
    readStory: 'Hikayeyi okuyun',
  },
  cards: [
    {
      initials: 'LK',
      company: 'Lokmax',
      industry: 'Ekipman kiralama',
      headline: 'Dağınık sohbetlerden öngörülebilir bir gelir motoruna',
      summary:
        "Brezilya'nın kompakt makine kiralama uzmanı WhatsApp ile HubSpot'u birleştirdi: teklif süresi 24–48 saatten 3 saatin altına indi, sözleşme uzatmaları temsilci hafızasına bağlı olmaktan çıktı.",
      href: '/case-studies/lokmaxltda',
    },
  ],
  finalCta: {
    h2: 'Bir sonraki hikaye sizin ekibiniz olabilir',
    body:
      "Eazybe, WhatsApp konuşmalarını HubSpot, Salesforce, Zoho, Pipedrive ve diğerlerine senkronlar; temsilcilerinizin sohbette kapattığı satışlar işletmenin görebildiği yerde görünür.",
    primary: 'Ücretsiz başla',
    secondary: 'Demo planla',
  },
}

export const CASE_STUDIES_CONTENT_BY_LOCALE: Record<string, CaseStudiesPageContent> = { en, br, es, tr }

export function getCaseStudiesPageContent(locale: string): CaseStudiesPageContent {
  return CASE_STUDIES_CONTENT_BY_LOCALE[locale] ?? en
}
