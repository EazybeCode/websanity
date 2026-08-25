/**
 * Localized copy for the /tools hub. Same shape as the other tool pages:
 * strings only, icons stay in the page component.
 *
 * IMPORTANT: `href` values point at each tool's existing top-level route
 * (/whatsapp-qr-code-generator, ...). This page is a directory only — there are
 * deliberately no /tools/<slug> routes, so tool URLs never change.
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
  hero: { tag: string; h1Lead: string; h1Highlight: string; subtitle: string; cta: string; footnote: string }
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
} as const

const en: ToolsPageContent = {
  meta: {
    title: 'Free WhatsApp & Sales Tools | Eazybe',
    description:
      'Free tools for teams selling on WhatsApp. Generate QR codes, chat links and website chat widgets, and work out your marketing ROI. No signup required.',
    ogDescription:
      'Free WhatsApp QR codes, chat links, website chat widgets and a marketing ROI calculator. No signup, nothing to install.',
  },
  breadcrumb: { home: 'Home', current: 'Free Tools' },
  hero: {
    tag: 'Free Tools',
    h1Lead: 'Free Tools For Teams Selling On',
    h1Highlight: 'WhatsApp',
    subtitle:
      'Small tools that do one job properly. Each runs in your browser without an account, so you can use it and get on with your day.',
    cta: 'Browse the tools',
    footnote: 'No signup and nothing to install.',
  },
  grid: {
    h2: 'Pick A Tool',
    subtitle: 'Five tools, each one free and ready to use right now.',
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
  ],
  why: {
    h2: 'Why These Are Free',
    subtitle: 'They bring people to Eazybe. That is the whole business model, so the tools themselves have no catch.',
    freeTitle: 'Genuinely free',
    freeBody: 'No trial that expires and no feature held back until you pay. The tool you open is the whole tool.',
    noSignupTitle: 'No account needed',
    noSignupBody: 'Nothing asks for your email before it works. Open the page, use it, close the tab.',
    browserTitle: 'Runs in your browser',
    browserBody: 'The work happens on your machine, so whatever you type into these tools never reaches us.',
  },
  finalCta: {
    h2: 'When A Tool Is Not Enough',
    body:
      'These handle one task each. Eazybe syncs whole WhatsApp conversations into HubSpot, Salesforce, Zoho, Pipedrive and more, so the deals your team closes in chat land in the CRM on their own.',
    primary: 'Start free',
    secondary: 'See how it works',
  },
}

const br: ToolsPageContent = {
  meta: {
    title: 'Ferramentas Gratuitas de WhatsApp e Vendas | Eazybe',
    description:
      'Ferramentas gratuitas para times que vendem pelo WhatsApp. Gere QR codes, links de conversa e widgets de chat, e calcule o ROI do seu marketing. Sem cadastro.',
    ogDescription:
      'QR codes, links de conversa, widgets de chat para o site e uma calculadora de ROI. Tudo grátis, sem cadastro e sem instalar nada.',
  },
  breadcrumb: { home: 'Início', current: 'Ferramentas Gratuitas' },
  hero: {
    tag: 'Ferramentas Gratuitas',
    h1Lead: 'Ferramentas Gratuitas Para Quem Vende No',
    h1Highlight: 'WhatsApp',
    subtitle:
      'Ferramentas pequenas que fazem bem uma coisa só. Cada uma roda no seu navegador sem pedir conta, então é só usar e seguir o dia.',
    cta: 'Ver as ferramentas',
    footnote: 'Sem cadastro e nada para instalar.',
  },
  grid: {
    h2: 'Escolha Uma Ferramenta',
    subtitle: 'Cinco ferramentas, todas gratuitas e prontas para usar agora.',
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
  ],
  why: {
    h2: 'Por Que São Gratuitas',
    subtitle: 'Elas trazem gente para a Eazybe. Esse é o modelo de negócio inteiro, então as ferramentas em si não têm pegadinha.',
    freeTitle: 'Gratuitas de verdade',
    freeBody: 'Sem teste que expira e sem recurso guardado até você pagar. A ferramenta que você abre é a ferramenta inteira.',
    noSignupTitle: 'Sem precisar de conta',
    noSignupBody: 'Nada pede seu e-mail antes de funcionar. Abra a página, use e feche a aba.',
    browserTitle: 'Roda no seu navegador',
    browserBody: 'O trabalho acontece na sua máquina, então o que você digita nessas ferramentas nunca chega até nós.',
  },
  finalCta: {
    h2: 'Quando Uma Ferramenta Não Basta',
    body:
      'Cada uma resolve uma tarefa. A Eazybe sincroniza conversas inteiras do WhatsApp com HubSpot, Salesforce, Zoho, Pipedrive e outros, para os negócios fechados no chat caírem sozinhos no CRM.',
    primary: 'Começar grátis',
    secondary: 'Ver como funciona',
  },
}

const es: ToolsPageContent = {
  meta: {
    title: 'Herramientas Gratuitas de WhatsApp y Ventas | Eazybe',
    description:
      'Herramientas gratuitas para equipos que venden por WhatsApp. Genera códigos QR, enlaces de chat y widgets para tu web, y calcula el ROI de tu marketing. Sin registro.',
    ogDescription:
      'Códigos QR, enlaces de chat, widgets para tu web y una calculadora de ROI. Todo gratis, sin registro y sin instalar nada.',
  },
  breadcrumb: { home: 'Inicio', current: 'Herramientas Gratuitas' },
  hero: {
    tag: 'Herramientas Gratuitas',
    h1Lead: 'Herramientas Gratuitas Para Equipos Que Venden Por',
    h1Highlight: 'WhatsApp',
    subtitle:
      'Herramientas pequeñas que hacen bien una sola cosa. Cada una funciona en tu navegador sin pedir cuenta, así que la usas y sigues con tu día.',
    cta: 'Ver las herramientas',
    footnote: 'Sin registro y nada que instalar.',
  },
  grid: {
    h2: 'Elige Una Herramienta',
    subtitle: 'Cinco herramientas, todas gratuitas y listas para usar ahora.',
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
  ],
  why: {
    h2: 'Por Qué Son Gratuitas',
    subtitle: 'Traen gente a Eazybe. Ese es todo el modelo de negocio, así que las herramientas en sí no tienen trampa.',
    freeTitle: 'Gratuitas de verdad',
    freeBody: 'Sin prueba que caduca y sin funciones guardadas hasta que pagues. La herramienta que abres es la herramienta entera.',
    noSignupTitle: 'Sin necesidad de cuenta',
    noSignupBody: 'Nada te pide el correo antes de funcionar. Abre la página, úsala y cierra la pestaña.',
    browserTitle: 'Funciona en tu navegador',
    browserBody: 'El trabajo ocurre en tu equipo, así que lo que escribes en estas herramientas nunca llega hasta nosotros.',
  },
  finalCta: {
    h2: 'Cuando Una Herramienta No Basta',
    body:
      'Cada una resuelve una tarea. Eazybe sincroniza conversaciones enteras de WhatsApp con HubSpot, Salesforce, Zoho, Pipedrive y más, para que las ventas cerradas en el chat lleguen solas al CRM.',
    primary: 'Empezar gratis',
    secondary: 'Ver cómo funciona',
  },
}

const tr: ToolsPageContent = {
  meta: {
    title: 'Ücretsiz WhatsApp ve Satış Araçları | Eazybe',
    description:
      "WhatsApp üzerinden satış yapan ekipler için ücretsiz araçlar. QR kod, sohbet bağlantısı ve site sohbet widget'ı oluşturun, pazarlama ROI'nizi hesaplayın. Kayıt gerekmez.",
    ogDescription:
      "Ücretsiz WhatsApp QR kodları, sohbet bağlantıları, site widget'ları ve bir pazarlama ROI hesaplayıcı. Kayıt yok, kurulum yok.",
  },
  breadcrumb: { home: 'Ana Sayfa', current: 'Ücretsiz Araçlar' },
  hero: {
    tag: 'Ücretsiz Araçlar',
    h1Lead: 'Satışını Şurada Yapan Ekipler İçin Ücretsiz Araçlar:',
    h1Highlight: 'WhatsApp',
    subtitle:
      'Tek bir işi düzgün yapan küçük araçlar. Her biri tarayıcınızda, hesap istemeden çalışır; kullanın ve gününüze devam edin.',
    cta: 'Araçlara göz atın',
    footnote: 'Kayıt yok, kurulacak bir şey de yok.',
  },
  grid: {
    h2: 'Bir Araç Seçin',
    subtitle: 'Beş araç, hepsi ücretsiz ve şimdi kullanıma hazır.',
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
      name: 'WhatsApp Sohbet Widget’ı',
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
  ],
  why: {
    h2: 'Neden Ücretsiz',
    subtitle: "Bu araçlar insanları Eazybe'ye getiriyor. İş modelinin tamamı bu; araçların kendisinde bir bit yeniği yok.",
    freeTitle: 'Gerçekten ücretsiz',
    freeBody: 'Süresi dolan bir deneme ya da ödeyene kadar saklanan bir özellik yok. Açtığınız araç, aracın tamamı.',
    noSignupTitle: 'Hesap gerekmiyor',
    noSignupBody: 'Hiçbiri çalışmadan önce e-postanızı istemiyor. Sayfayı açın, kullanın, sekmeyi kapatın.',
    browserTitle: 'Tarayıcınızda çalışır',
    browserBody: 'İşlem sizin makinenizde olur; bu araçlara yazdıklarınız bize hiçbir zaman ulaşmaz.',
  },
  finalCta: {
    h2: 'Bir Araç Yetmediğinde',
    body:
      "Bunların her biri tek bir işi görür. Eazybe ise WhatsApp konuşmalarının tamamını HubSpot, Salesforce, Zoho, Pipedrive ve diğerlerine senkronlar; böylece sohbette kapanan satışlar CRM'e kendiliğinden düşer.",
    primary: 'Ücretsiz başla',
    secondary: 'Nasıl çalıştığını görün',
  },
}

export const TOOLS_CONTENT_BY_LOCALE: Record<string, ToolsPageContent> = { en, br, es, tr }

export function getToolsPageContent(locale: string): ToolsPageContent {
  return TOOLS_CONTENT_BY_LOCALE[locale] ?? en
}
