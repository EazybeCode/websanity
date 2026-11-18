/**
 * Localized copy for the /tools hub. Same shape as the other tool pages:
 * strings only, icons stay in the page component.
 *
 * IMPORTANT: `href` values point at each tool's existing top-level route
 * (/whatsapp-qr-code-generator, ...). This page is a directory only — there are
 * deliberately no /tools/<slug> routes, so tool URLs never change.
 *
 * Headings (hero.h1, grid.h2, why.h2, finalCta.h2) mark their one brand-blue
 * phrase with *asterisks*; the page renders it as <em>.
 */

export interface ToolCard {
  href: string
  name: string
  tagline: string
  category: string
  icon: 'qr' | 'link' | 'widget' | 'calculator'
}

export interface ToolsPageContent {
  meta: { title: string; description: string; ogDescription: string }
  breadcrumb: { home: string; current: string }
  hero: { tag: string; h1: string; subtitle: string; cta: string; footnote: string }
  grid: { h2: string; subtitle: string; tryIt: string; freeBadge: string }
  filter: { title: string; category: string }
  tools: ToolCard[]
  why: {
    h2: string
    subtitle: string
    freeTitle: string; freeBody: string
    noSignupTitle: string; noSignupBody: string
    browserTitle: string; browserBody: string
  }
  finalCta: { h2: string; body: string; primary: string; secondary: string }
}

const HREFS = {
  qr: '/whatsapp-qr-code-generator',
  link: '/whatsapp-chat-link-generator',
  widget: '/whatsapp-chat-widget',
  roi: '/marketing-roi-calculator',
  waPricing: '/whatsapp-pricing-calculator',
  ccRoi: '/call-center-roi-calculator',
} as const

const en: ToolsPageContent = {
  meta: {
    title: 'Free WhatsApp & Sales Tools | Eazybe',
    description:
      'Free tools for teams that sell on WhatsApp: QR codes, chat links, a website chat widget, and calculators for WhatsApp API pricing and ROI. No signup.',
    ogDescription:
      'WhatsApp QR codes, chat links, a website chat widget and three calculators. All free, no signup, nothing to install.',
  },
  breadcrumb: { home: 'Home', current: 'Free Tools' },
  hero: {
    tag: 'Free Tools',
    h1: 'Free Tools For Teams Selling On *WhatsApp*',
    subtitle:
      'Six small tools, each built for one job. They run in your browser, and none of them asks you to sign up.',
    cta: 'Browse the tools',
    footnote: 'Free to use. Nothing to install.',
  },
  grid: {
    h2: 'Pick A *Tool*',
    subtitle: 'Three for WhatsApp and your website, and three calculators for budgets and ROI.',
    tryIt: 'Try it free',
    freeBadge: 'Free',
  },
  filter: { title: 'Filter by', category: 'Category' },
  tools: [
    {
      href: HREFS.qr,
      name: 'WhatsApp QR Code Generator',
      tagline: 'Create a scannable QR code that opens a WhatsApp chat with your number and a message already typed in.',
      category: 'WhatsApp',
      icon: 'qr',
    },
    {
      href: HREFS.link,
      name: 'WhatsApp Chat Link Generator',
      tagline: 'Build a wa.me link that starts a chat with your number, so customers never have to save it first.',
      category: 'WhatsApp',
      icon: 'link',
    },
    {
      href: HREFS.widget,
      name: 'WhatsApp Chat Widget',
      tagline: 'Generate a chat button for your website that opens WhatsApp instead of a form nobody fills in.',
      category: 'Website',
      icon: 'widget',
    },
    {
      href: HREFS.roi,
      name: 'Marketing ROI Calculator',
      tagline: 'Work out ROI, ROAS, cost per lead and customer acquisition cost from your spend and attributed revenue.',
      category: 'Measurement',
      icon: 'calculator',
    },
    {
      href: HREFS.waPricing,
      name: 'WhatsApp Pricing Calculator',
      tagline: 'Estimate your monthly WhatsApp API bill from your message volumes, with editable per-country rates.',
      category: 'Measurement',
      icon: 'calculator',
    },
    {
      href: HREFS.ccRoi,
      name: 'Call Center ROI Calculator',
      tagline: 'See if new call center software pays for itself, with first-year ROI, payback and cost per call.',
      category: 'Measurement',
      icon: 'calculator',
    },
  ],
  why: {
    h2: 'Why These Are *Free*',
    subtitle:
      "Honest answer: some people who use them go on to try Eazybe. That's the only reason they exist, so there's no catch hidden in the tools.",
    freeTitle: 'Nothing locked',
    freeBody: "There's no trial that runs out and no feature held back until you pay. What you open is the full tool.",
    noSignupTitle: 'No account',
    noSignupBody: 'None of them asks for your email first. Open the page, use it, close the tab.',
    browserTitle: 'Runs in your browser',
    browserBody: "The numbers and messages you enter stay on your device. We don't send them to our servers.",
  },
  finalCta: {
    h2: 'When A Tool Is *Not Enough*',
    body:
      "Each tool here handles one task. Eazybe itself syncs your team's WhatsApp chats into HubSpot, Salesforce, Zoho, Pipedrive and other CRMs, so deals closed in chat show up in the CRM without anyone copying them over.",
    primary: 'Start free',
    secondary: 'See how it works',
  },
}

const br: ToolsPageContent = {
  meta: {
    title: 'Ferramentas Gratuitas de WhatsApp e Vendas | Eazybe',
    description:
      'Ferramentas gratuitas para times que vendem pelo WhatsApp: QR codes, links de conversa, um widget para o site e calculadoras de preço da API e de ROI. Sem cadastro.',
    ogDescription:
      'QR codes, links de conversa, um widget de WhatsApp para o site e três calculadoras. Grátis, sem cadastro e sem instalar nada.',
  },
  breadcrumb: { home: 'Início', current: 'Ferramentas Gratuitas' },
  hero: {
    tag: 'Ferramentas Gratuitas',
    h1: 'Ferramentas Gratuitas Para Quem Vende No *WhatsApp*',
    subtitle:
      'Seis ferramentas pequenas, cada uma feita para uma tarefa só. Elas rodam no seu navegador e nenhuma pede cadastro.',
    cta: 'Ver as ferramentas',
    footnote: 'Grátis. Nada para instalar.',
  },
  grid: {
    h2: 'Escolha Uma *Ferramenta*',
    subtitle: 'Três para o WhatsApp e o seu site, e três calculadoras para orçamento e ROI.',
    tryIt: 'Usar grátis',
    freeBadge: 'Grátis',
  },
  filter: { title: 'Filtrar por', category: 'Categoria' },
  tools: [
    {
      href: HREFS.qr,
      name: 'Gerador de QR Code do WhatsApp',
      tagline: 'Crie um QR code que abre uma conversa no WhatsApp com o seu número e uma mensagem já digitada.',
      category: 'WhatsApp',
      icon: 'qr',
    },
    {
      href: HREFS.link,
      name: 'Gerador de Link de Conversa do WhatsApp',
      tagline: 'Monte um link wa.me que inicia a conversa com o seu número, sem o cliente precisar salvá-lo antes.',
      category: 'WhatsApp',
      icon: 'link',
    },
    {
      href: HREFS.widget,
      name: 'Widget de Chat do WhatsApp',
      tagline: 'Gere um botão de chat para o seu site que abre o WhatsApp no lugar de um formulário que ninguém preenche.',
      category: 'Site',
      icon: 'widget',
    },
    {
      href: HREFS.roi,
      name: 'Calculadora de ROI de Marketing',
      tagline: 'Calcule ROI, ROAS, custo por lead e custo de aquisição a partir do seu investimento e da receita atribuída.',
      category: 'Medição',
      icon: 'calculator',
    },
    {
      // Localized slug: the grid prefixes '/br' itself.
      href: '/calculadora-de-precos-do-whatsapp',
      name: 'Calculadora de Preços do WhatsApp',
      tagline: 'Estime sua fatura mensal da API do WhatsApp a partir dos volumes de mensagens, com taxas editáveis por país.',
      category: 'Medição',
      icon: 'calculator',
    },
    {
      href: HREFS.ccRoi,
      name: 'Calculadora de ROI para Call Center',
      tagline: 'Veja se um novo software de call center se paga, com ROI do primeiro ano, payback e custo por chamada.',
      category: 'Medição',
      icon: 'calculator',
    },
  ],
  why: {
    h2: 'Por Que São *Gratuitas*',
    subtitle:
      'Sendo bem sinceros: algumas pessoas que usam acabam testando a Eazybe. Elas só existem por isso, então não tem pegadinha escondida.',
    freeTitle: 'Nada bloqueado',
    freeBody: 'Não tem teste que expira nem recurso travado até você pagar. O que você abre é a ferramenta completa.',
    noSignupTitle: 'Sem conta',
    noSignupBody: 'Nenhuma pede seu e-mail antes de funcionar. Abra a página, use e feche a aba.',
    browserTitle: 'Roda no seu navegador',
    browserBody: 'Os números e as mensagens que você digita ficam no seu dispositivo. Não enviamos nada para os nossos servidores.',
  },
  finalCta: {
    h2: 'Quando Uma Ferramenta *Não Basta*',
    body:
      'Cada ferramenta resolve uma tarefa. Já a Eazybe sincroniza as conversas de WhatsApp do seu time com HubSpot, Salesforce, Zoho, Pipedrive e outros CRMs, e os negócios fechados no chat aparecem no CRM sem ninguém copiar à mão.',
    primary: 'Começar grátis',
    secondary: 'Ver como funciona',
  },
}

const es: ToolsPageContent = {
  meta: {
    title: 'Herramientas Gratuitas de WhatsApp y Ventas | Eazybe',
    description:
      'Herramientas gratuitas para equipos que venden por WhatsApp: códigos QR, enlaces de chat, un widget para tu web y calculadoras de precios de la API y de ROI. Sin registro.',
    ogDescription:
      'Códigos QR, enlaces de chat, un widget de WhatsApp para tu web y tres calculadoras. Gratis, sin registro y sin instalar nada.',
  },
  breadcrumb: { home: 'Inicio', current: 'Herramientas Gratuitas' },
  hero: {
    tag: 'Herramientas Gratuitas',
    h1: 'Herramientas Gratuitas Para Equipos Que Venden Por *WhatsApp*',
    subtitle:
      'Seis herramientas pequeñas, cada una hecha para una sola tarea. Funcionan en tu navegador y ninguna te pide registrarte.',
    cta: 'Ver las herramientas',
    footnote: 'Gratis. Nada que instalar.',
  },
  grid: {
    h2: 'Elige Una *Herramienta*',
    subtitle: 'Tres para WhatsApp y tu web, y tres calculadoras para presupuestos y ROI.',
    tryIt: 'Usar gratis',
    freeBadge: 'Gratis',
  },
  filter: { title: 'Filtrar por', category: 'Categoría' },
  tools: [
    {
      href: HREFS.qr,
      name: 'Generador de Código QR de WhatsApp',
      tagline: 'Crea un código QR que abre un chat de WhatsApp con tu número y un mensaje ya escrito.',
      category: 'WhatsApp',
      icon: 'qr',
    },
    {
      href: HREFS.link,
      name: 'Generador de Enlaces de Chat de WhatsApp',
      tagline: 'Crea un enlace wa.me que inicia el chat con tu número, sin que el cliente tenga que guardarlo antes.',
      category: 'WhatsApp',
      icon: 'link',
    },
    {
      href: HREFS.widget,
      name: 'Widget de Chat de WhatsApp',
      tagline: 'Genera un botón de chat para tu web que abre WhatsApp en lugar de un formulario que nadie rellena.',
      category: 'Web',
      icon: 'widget',
    },
    {
      href: HREFS.roi,
      name: 'Calculadora de ROI de Marketing',
      tagline: 'Calcula ROI, ROAS, coste por lead y coste de adquisición a partir de tu inversión y los ingresos atribuidos.',
      category: 'Medición',
      icon: 'calculator',
    },
    {
      // Localized slug: the grid prefixes '/es' itself.
      href: '/calculadora-de-precios-de-whatsapp',
      name: 'Calculadora de Precios de WhatsApp',
      tagline: 'Estima tu factura mensual de la API de WhatsApp a partir de tus volúmenes de mensajes, con tarifas editables por país.',
      category: 'Medición',
      icon: 'calculator',
    },
    {
      href: HREFS.ccRoi,
      name: 'Calculadora de ROI para Call Center',
      tagline: 'Comprueba si un nuevo software de call center se paga solo, con ROI del primer año, amortización y coste por llamada.',
      category: 'Medición',
      icon: 'calculator',
    },
  ],
  why: {
    h2: 'Por Qué Son *Gratuitas*',
    subtitle:
      'Siendo sinceros: algunas personas que las usan acaban probando Eazybe. Solo existen por eso, así que no esconden ninguna trampa.',
    freeTitle: 'Nada bloqueado',
    freeBody: 'No hay prueba que caduque ni funciones bloqueadas hasta que pagues. Lo que abres es la herramienta completa.',
    noSignupTitle: 'Sin cuenta',
    noSignupBody: 'Ninguna te pide el correo antes de funcionar. Abre la página, úsala y cierra la pestaña.',
    browserTitle: 'Funciona en tu navegador',
    browserBody: 'Los números y mensajes que escribes se quedan en tu dispositivo. No los enviamos a nuestros servidores.',
  },
  finalCta: {
    h2: 'Cuando Una Herramienta *No Basta*',
    body:
      'Cada herramienta resuelve una tarea. Eazybe, en cambio, sincroniza los chats de WhatsApp de tu equipo con HubSpot, Salesforce, Zoho, Pipedrive y otros CRM, así las ventas cerradas en el chat aparecen en el CRM sin que nadie las copie a mano.',
    primary: 'Empezar gratis',
    secondary: 'Ver cómo funciona',
  },
}

const tr: ToolsPageContent = {
  meta: {
    title: 'Ücretsiz WhatsApp ve Satış Araçları | Eazybe',
    description:
      "WhatsApp'ta satış yapan ekipler için ücretsiz araçlar: QR kod, sohbet bağlantısı, site sohbet widget'ı, WhatsApp API fiyat ve ROI hesaplayıcıları. Kayıt gerekmez.",
    ogDescription:
      "WhatsApp QR kodları, sohbet bağlantıları, site sohbet widget'ı ve üç hesaplayıcı. Ücretsiz, kayıt yok, kurulum yok.",
  },
  breadcrumb: { home: 'Ana Sayfa', current: 'Ücretsiz Araçlar' },
  hero: {
    tag: 'Ücretsiz Araçlar',
    h1: "*WhatsApp'ta* Satış Yapan Ekipler İçin Ücretsiz Araçlar",
    subtitle:
      'Her biri tek bir iş için yapılmış altı küçük araç. Tarayıcınızda çalışırlar ve hiçbiri kayıt istemez.',
    cta: 'Araçlara göz atın',
    footnote: 'Ücretsiz. Kurulacak bir şey yok.',
  },
  grid: {
    h2: 'Bir *Araç* Seçin',
    subtitle: 'Üçü WhatsApp ve siteniz için, üçü bütçe ve ROI hesabı için.',
    tryIt: 'Ücretsiz dene',
    freeBadge: 'Ücretsiz',
  },
  filter: { title: 'Filtrele', category: 'Kategori' },
  tools: [
    {
      href: HREFS.qr,
      name: 'WhatsApp QR Kod Oluşturucu',
      tagline: 'Numaranızla ve önceden yazılmış bir mesajla WhatsApp sohbeti açan, taranabilir bir QR kod oluşturun.',
      category: 'WhatsApp',
      icon: 'qr',
    },
    {
      href: HREFS.link,
      name: 'WhatsApp Sohbet Bağlantısı Oluşturucu',
      tagline: 'Numaranızla sohbeti başlatan bir wa.me bağlantısı oluşturun; müşteriniz numarayı önce kaydetmek zorunda kalmasın.',
      category: 'WhatsApp',
      icon: 'link',
    },
    {
      href: HREFS.widget,
      name: "WhatsApp Sohbet Widget'ı",
      tagline: "Siteniz için, kimsenin doldurmadığı bir form yerine WhatsApp'ı açan bir sohbet butonu oluşturun.",
      category: 'Web sitesi',
      icon: 'widget',
    },
    {
      href: HREFS.roi,
      name: 'Pazarlama ROI Hesaplayıcı',
      tagline: 'Harcamanız ve atfedilen gelirinizden ROI, ROAS, lead başına maliyet ve müşteri edinme maliyetini hesaplayın.',
      category: 'Ölçüm',
      icon: 'calculator',
    },
    {
      // Localized slug: the grid prefixes '/tr' itself.
      href: '/whatsapp-fiyat-hesaplayici',
      name: 'WhatsApp Fiyat Hesaplayıcı',
      tagline: 'Aylık WhatsApp API faturanızı mesaj hacimlerinizden tahmin edin; ülke bazlı tarifeler düzenlenebilir.',
      category: 'Ölçüm',
      icon: 'calculator',
    },
    {
      href: HREFS.ccRoi,
      name: 'Çağrı Merkezi ROI Hesaplayıcı',
      tagline: 'Yeni çağrı merkezi yazılımının kendini amorti edip etmediğini ilk yıl ROI, geri ödeme ve çağrı başına maliyetle görün.',
      category: 'Ölçüm',
      icon: 'calculator',
    },
  ],
  why: {
    h2: 'Neden *Ücretsiz*',
    subtitle:
      "Açık konuşalım: bu araçları kullananların bir kısmı sonradan Eazybe'yi deniyor. Araçların var olma sebebi bu, yani içlerinde bir bit yeniği yok.",
    freeTitle: 'Kilitli bir şey yok',
    freeBody: 'Süresi dolan bir deneme ya da ödeyene kadar kilitli bir özellik yok. Açtığınız araç, aracın tamamı.',
    noSignupTitle: 'Hesap gerekmez',
    noSignupBody: 'Hiçbiri çalışmadan önce e-postanızı istemez. Sayfayı açın, kullanın, sekmeyi kapatın.',
    browserTitle: 'Tarayıcınızda çalışır',
    browserBody: 'Girdiğiniz rakamlar ve mesajlar cihazınızda kalır. Bunları sunucularımıza göndermiyoruz.',
  },
  finalCta: {
    h2: 'Bir Araç *Yetmediğinde*',
    body:
      "Buradaki her araç tek bir işi görür. Eazybe ise ekibinizin WhatsApp sohbetlerini HubSpot, Salesforce, Zoho, Pipedrive ve diğer CRM'lere senkronlar; sohbette kapanan satışlar kimse elle kopyalamadan CRM'de görünür.",
    primary: 'Ücretsiz başla',
    secondary: 'Nasıl çalıştığını görün',
  },
}

export const TOOLS_CONTENT_BY_LOCALE: Record<string, ToolsPageContent> = { en, br, es, tr }

export function getToolsPageContent(locale: string): ToolsPageContent {
  return TOOLS_CONTENT_BY_LOCALE[locale] ?? en
}
