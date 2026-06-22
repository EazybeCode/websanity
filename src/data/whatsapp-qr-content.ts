/**
 * All localized copy for /whatsapp-qr-code-generator. Kept in one file so the
 * page renderer stays readable and translators can edit one source. SVG icons
 * stay in the page itself — only strings live here.
 */

export interface QrPageContent {
  meta: {
    title: string
    description: string
    ogDescription: string
  }
  hero: {
    tag: string
    h1Lead: string
    h1Brand: string
    h1Rest: string
    h1Highlight: string
    subtitle: string
    cta: string
    footnote: string
  }
  preview: {
    title: string
    numberLabel: string
    messageLabel: string
    btnGenerate: string
    btnExport: string
    qrAlt: string
  }
  tryItNow: {
    h2: string
    subtitle: string
  }
  useCases: {
    h2: string
    subtitle: string
    websiteTitle: string
    websiteBody: string
    printTitle: string
    printBody: string
    socialTitle: string
    socialBody: string
  }
  seo: {
    h2: string
    p1: string
    p2Pre: string
    p2Post: string
    h3: string
    p3: string
    p4Pre: string
    p4LinkText: string
    p4Post: string
  }
  benefits: {
    h2Lead: string
    h2Em: string
    subtitle: string
    noInstallTitle: string
    noInstallBody: string
    prefilledTitle: string
    prefilledBody: string
    conversionTitle: string
    conversionBody: string
    freeTitle: string
    freeBody: string
  }
  benefitCards: {
    h2Lead: string
    h2Em: string
    scanTitle: string
    scanBody: string
    clickTitle: string
    clickBody: string
    leadsTitle: string
    leadsBody: string
  }
  faq: {
    h2: string
    items: Array<{ q: string; a: string }>
  }
  cta: {
    badge: string
    h2: string
    subtitle: string
    primary: string
    secondary: string
    footnote: string
  }
  generator: {
    formTitle: string
    numberLabel: string
    countryAria: string
    phonePlaceholder: string
    phoneAria: string
    messageLabel: string
    messageOptional: string
    messagePlaceholder: string
    messageCounter: string
    errorEmpty: string
    errorShort: string
    btnGenerate: string
    outputTitle: string
    emptyState: string
    qrAlt: string
    btnDownload: string
    btnCopy: string
    copied: string
  }
  breadcrumb: {
    home: string
    current: string
  }
}

const en: QrPageContent = {
  meta: {
    title: 'Free WhatsApp QR Code Generator with Pre-Filled Message | Eazybe',
    description:
      'Free WhatsApp QR code generator. Make a wa.me QR with a pre-filled message, download as PNG, and put it on your website, ads, or print materials. No signup, no watermark.',
    ogDescription: 'Make a WhatsApp QR with a pre-filled message. Free PNG download, no signup, no watermark.',
  },
  hero: {
    tag: 'FREE TOOL · NO SIGNUP',
    h1Lead: 'Generate Your',
    h1Brand: 'WhatsApp',
    h1Rest: 'QR Code',
    h1Highlight: 'For FREE Today!',
    subtitle:
      "Type your WhatsApp number and an opening message. The page renders a scannable QR. Customers scan it with any phone camera and WhatsApp opens with your line already filled in. Works on ads, packaging, posters, and anywhere customers can see you but can't tap a link.",
    cta: 'Create QR Code →',
    footnote: 'No signup · No watermark · Use it anywhere',
  },
  preview: {
    title: 'Generate your QR Code',
    numberLabel: 'WhatsApp Number (with country code)',
    messageLabel: 'Welcome Message (Optional)',
    btnGenerate: 'Generate QR Code',
    btnExport: 'Export QR Code',
    qrAlt: 'Sample WhatsApp QR code',
  },
  tryItNow: {
    h2: 'Create Free QR Code For WhatsApp Try It Now',
    subtitle: 'Enter your WhatsApp number, set the pre-filled message, and download the QR.',
  },
  useCases: {
    h2: 'Where To Use Your WhatsApp QR',
    subtitle: 'Anywhere a customer can hold up a phone, the QR puts a chat one scan away.',
    websiteTitle: 'On your website',
    websiteBody:
      'Add the QR to your contact page, blog footer, or pricing page. Desktop visitors pull out their phone, scan, and a WhatsApp chat opens with the message you set.',
    printTitle: 'In print',
    printBody:
      'Put the QR on business cards, flyers, receipts, packaging, and in-store signage. One scan opens WhatsApp with your number already filled in.',
    socialTitle: 'On social media',
    socialBody:
      'Drop it into Instagram bios, LinkedIn banners, story posts, or YouTube thumbnails so a follower can start a chat from where they already follow you.',
  },
  seo: {
    h2: 'What Is A WhatsApp QR Code?',
    p1:
      'A WhatsApp QR code is an image that hides a wa.me link inside its pixel pattern. When someone points a phone camera at it, the camera reads the pattern, decodes the URL, and offers to open WhatsApp at the right chat. No typing the number. No saving your contact first. No copying digits off a printout.',
    p2Pre: 'The link follows a fixed format: ',
    p2Post:
      '. The generator deals with the formatting for you. It strips the plus sign, URL-encodes the message, and validates the digits before turning the result into a scannable PNG. You type a number and a starter message. The page renders the QR.',
    h3: 'Where The Format Earns Its keep',
    p3:
      'A WhatsApp QR is most useful when typing is hard. A flyer someone is holding. A poster they walk past. A YouTube end card playing on their TV. A trade show booth. A sticker on packaging. In each case, the QR turns an offline glance into an open chat in about three seconds.',
    p4Pre:
      "For teams running Click-to-WhatsApp ads, the same QR doubles as a fallback when the ad itself isn't tappable. Livestream overlays, podcast cover art, printed inserts inside shipped products, anywhere the customer can see you but can't click through. If you're using ",
    p4LinkText: 'Eazybe',
    p4Post:
      ' to track which surfaces actually drive WhatsApp replies, the QR is what closes the loop between the offline piece and the chat record in your CRM.',
  },
  benefits: {
    h2Lead: 'Why A WhatsApp QR',
    h2Em: 'Converts',
    subtitle:
      'QR codes remove the steps where customers usually give up: typing a number, saving a contact, hunting for your link.',
    noInstallTitle: 'No app install',
    noInstallBody:
      'WhatsApp is already on roughly 2 billion phones. The scan opens WhatsApp directly. Nothing for the customer to download and no signup screen between them and you.',
    prefilledTitle: 'Pre-filled message',
    prefilledBody:
      'Set the opening message yourself. Customers see it pre-filled, so the conversation starts with the right context. Examples: "Hi, I saw your menu" or "Send me a demo link".',
    conversionTitle: 'Higher conversion',
    conversionBody:
      'A QR that opens a chat converts higher than a QR that opens a form. Customers reach a human or an AI agent in one step instead of three.',
    freeTitle: 'Free forever',
    freeBody: 'No watermark, no signup, no usage cap. Generate as many QRs as you want and use them commercially.',
  },
  benefitCards: {
    h2Lead: 'Get The WhatsApp QR Code Generator Free —',
    h2Em: "Benefits You Can't Ignore!",
    scanTitle: 'Scan Securely on WhatsApp!',
    scanBody:
      'Put the QR on your website, your ads, or your chat widget. Scans land directly in WhatsApp where the customer can see who they are talking to, so leads arrive with full context instead of an anonymous form fill.',
    clickTitle: 'Always just a click away',
    clickBody:
      'Customers already check WhatsApp every day. Support that lives there gets read faster than email and skips the back-and-forth of "who is this" messages.',
    leadsTitle: 'Get leads quickly with just a scan',
    leadsBody:
      'Print the QR on shipping inserts, drop it into Facebook ad creatives, or paste it into your Instagram bio. One scan puts a prospect into a real conversation with you instead of a form.',
  },
  faq: {
    h2: 'WhatsApp QR Code Questions, Answered',
    items: [
      { q: 'Is this WhatsApp QR Code Generator really free?', a: 'Yes. There is no signup, no watermark on the QR, and no rate limit on how many you can make. You can use the QR commercially anywhere you want.' },
      { q: 'Will the QR work on both Personal and WhatsApp Business numbers?', a: 'Yes. The QR encodes a wa.me link, which opens whichever WhatsApp account is registered to that phone number. Personal, Business App, and Business API all work.' },
      { q: 'Can I add a pre-filled message?', a: 'Yes. Type the message you want customers to see and it pre-fills the input box so they only need to tap Send. Useful for setting context (example: "Hi, I saw your QR at [location]").' },
      { q: 'Can I generate a QR for a WhatsApp group?', a: 'No. The wa.me link format only supports individual phone numbers. Group QR codes have to be exported from inside WhatsApp itself (Group info → QR code).' },
      { q: 'Does this work without the WhatsApp app installed?', a: 'On mobile, the device needs WhatsApp installed to open the chat. On desktop, the QR can also redirect to WhatsApp Web in the browser, so a desktop without the app still works.' },
      { q: 'How is this different from a wa.me link?', a: "A wa.me link is what the QR actually encodes. The QR is a scannable version of that link, useful in print, on screens customers can't click, or as a visual marker on a sticker or sign." },
      { q: 'Does the WhatsApp QR code expire?', a: 'No. The QR encodes a wa.me link tied to your phone number, so it stays valid for as long as that number is on WhatsApp. Print it once and reuse it for years. There is no renewal step and no token to expire.' },
      { q: 'Can I track how many people scanned my QR code?', a: "Not directly. wa.me links don't expose scan analytics. To track scans, route the QR through a short-link service like Bitly or Rebrandly that records every click before redirecting. Eazybe also captures the inbound WhatsApp chat and writes the source back to your CRM if you need attribution all the way to revenue." },
    ],
  },
  cta: {
    badge: 'Ready For More?',
    h2: 'Want More Than Just A QR?',
    subtitle:
      "Eazybe captures every inbound WhatsApp chat into your CRM. The lead gets scored before your reps see it, and our AI keeps the conversation going when nobody's online. Works with HubSpot, Salesforce, and Zoho.",
    primary: 'Try Eazybe Free →',
    secondary: 'Book a Demo',
    footnote: '7-day free trial · No credit card required · Cancel anytime',
  },
  generator: {
    formTitle: 'Generate your QR code',
    numberLabel: 'WhatsApp number',
    countryAria: 'Country code',
    phonePlaceholder: 'Phone number',
    phoneAria: 'Phone number',
    messageLabel: 'Pre-filled message',
    messageOptional: '(optional)',
    messagePlaceholder: "Hi — I'd like to know more about your product.",
    messageCounter: '{count}/400 — shown to the customer when they scan the QR.',
    errorEmpty: 'Enter a WhatsApp phone number first.',
    errorShort: 'That phone number looks too short.',
    btnGenerate: 'Generate QR Code',
    outputTitle: 'Your WhatsApp QR',
    emptyState: 'Enter a WhatsApp number on the left to generate a scannable QR.',
    qrAlt: 'WhatsApp QR code',
    btnDownload: 'Download PNG',
    btnCopy: 'Copy link',
    copied: '✓ Link copied',
  },
  breadcrumb: {
    home: 'Home',
    current: 'WhatsApp QR Code Generator',
  },
}

const br: QrPageContent = {
  meta: {
    title: 'Gerador Gratuito de QR Code para WhatsApp com Mensagem Pronta | Eazybe',
    description:
      'Gerador gratuito de QR code para WhatsApp. Crie um QR wa.me com uma mensagem pronta, baixe em PNG e use no seu site, anúncios ou materiais impressos. Sem cadastro, sem marca d\'água.',
    ogDescription: 'Crie um QR code do WhatsApp com mensagem pronta. Download grátis em PNG, sem cadastro, sem marca d\'água.',
  },
  hero: {
    tag: 'FERRAMENTA GRÁTIS · SEM CADASTRO',
    h1Lead: 'Gere Seu',
    h1Brand: 'WhatsApp',
    h1Rest: 'QR Code',
    h1Highlight: 'GRÁTIS hoje!',
    subtitle:
      'Digite seu número do WhatsApp e uma mensagem de abertura. A página gera um QR escaneável. Os clientes escaneiam com qualquer câmera de celular e o WhatsApp abre com sua mensagem já preenchida. Funciona em anúncios, embalagens, cartazes e em qualquer lugar onde o cliente possa ver você mas não tocar em um link.',
    cta: 'Criar QR Code →',
    footnote: 'Sem cadastro · Sem marca d\'água · Use em qualquer lugar',
  },
  preview: {
    title: 'Gere seu QR Code',
    numberLabel: 'Número do WhatsApp (com código do país)',
    messageLabel: 'Mensagem de Boas-vindas (Opcional)',
    btnGenerate: 'Gerar QR Code',
    btnExport: 'Exportar QR Code',
    qrAlt: 'QR code de exemplo do WhatsApp',
  },
  tryItNow: {
    h2: 'Crie Um QR Code Grátis Para WhatsApp Experimente Agora',
    subtitle: 'Digite seu número do WhatsApp, defina a mensagem pronta e baixe o QR.',
  },
  useCases: {
    h2: 'Onde Usar Seu QR do WhatsApp',
    subtitle: 'Em qualquer lugar onde o cliente possa pegar o celular, o QR coloca uma conversa a um escaneamento de distância.',
    websiteTitle: 'No seu site',
    websiteBody:
      'Adicione o QR à página de contato, ao rodapé do blog ou à página de preços. Visitantes no computador pegam o celular, escaneiam e uma conversa no WhatsApp abre com a mensagem que você definiu.',
    printTitle: 'No impresso',
    printBody:
      'Coloque o QR em cartões de visita, panfletos, recibos, embalagens e sinalização de loja. Um escaneamento abre o WhatsApp com seu número já preenchido.',
    socialTitle: 'Nas redes sociais',
    socialBody:
      'Coloque na bio do Instagram, em banners do LinkedIn, em stories ou em thumbnails do YouTube para que um seguidor inicie uma conversa de onde já segue você.',
  },
  seo: {
    h2: 'O Que É Um QR Code Do WhatsApp?',
    p1:
      'Um QR code do WhatsApp é uma imagem que esconde um link wa.me dentro do seu padrão de pixels. Quando alguém aponta a câmera do celular para ele, a câmera lê o padrão, decodifica a URL e oferece abrir o WhatsApp na conversa certa. Sem digitar o número. Sem precisar salvar seu contato antes. Sem copiar dígitos de um material impresso.',
    p2Pre: 'O link segue um formato fixo: ',
    p2Post:
      '. O gerador cuida da formatação para você. Ele remove o sinal de mais, codifica a mensagem na URL e valida os dígitos antes de transformar o resultado em um PNG escaneável. Você digita um número e uma mensagem inicial. A página gera o QR.',
    h3: 'Onde o formato vale a pena',
    p3:
      'Um QR do WhatsApp é mais útil quando digitar é difícil. Um panfleto que alguém está segurando. Um cartaz pelo qual a pessoa passa. Um end card do YouTube na TV. Um estande de feira. Um adesivo na embalagem. Em cada caso, o QR transforma um olhar offline em uma conversa aberta em cerca de três segundos.',
    p4Pre:
      'Para equipes rodando anúncios de Click-to-WhatsApp, o mesmo QR funciona como alternativa quando o anúncio em si não é tocável. Overlays de livestream, capas de podcast, encartes impressos dentro de produtos enviados — qualquer lugar onde o cliente vê você mas não consegue clicar. Se você está usando ',
    p4LinkText: 'Eazybe',
    p4Post:
      ' para rastrear quais superfícies realmente geram respostas no WhatsApp, o QR é o que fecha o ciclo entre a peça offline e o registro da conversa no seu CRM.',
  },
  benefits: {
    h2Lead: 'Por Que Um QR Do WhatsApp',
    h2Em: 'Converte',
    subtitle:
      'QR codes eliminam as etapas onde o cliente normalmente desiste: digitar o número, salvar um contato, procurar seu link.',
    noInstallTitle: 'Sem instalar aplicativo',
    noInstallBody:
      'O WhatsApp já está em aproximadamente 2 bilhões de celulares. O escaneamento abre o WhatsApp diretamente. Nada para o cliente baixar e nenhuma tela de cadastro entre ele e você.',
    prefilledTitle: 'Mensagem pronta',
    prefilledBody:
      'Defina a mensagem de abertura você mesmo. Os clientes a veem pré-preenchida, então a conversa começa com o contexto certo. Exemplos: "Olá, vi seu cardápio" ou "Me envie um link de demonstração".',
    conversionTitle: 'Maior conversão',
    conversionBody:
      'Um QR que abre uma conversa converte mais que um QR que abre um formulário. Os clientes chegam a um humano ou agente de IA em uma etapa em vez de três.',
    freeTitle: 'Grátis para sempre',
    freeBody: 'Sem marca d\'água, sem cadastro, sem limite de uso. Gere quantos QRs quiser e use comercialmente.',
  },
  benefitCards: {
    h2Lead: 'Use O Gerador De QR Code Do WhatsApp Grátis —',
    h2Em: 'Benefícios Que Você Não Pode Ignorar!',
    scanTitle: 'Escaneie com Segurança no WhatsApp!',
    scanBody:
      'Coloque o QR no seu site, nos seus anúncios ou no widget de chat. Os escaneamentos caem direto no WhatsApp onde o cliente vê com quem está falando, então os leads chegam com contexto completo em vez de um formulário anônimo.',
    clickTitle: 'Sempre a um clique de distância',
    clickBody:
      'Os clientes já abrem o WhatsApp todo dia. O suporte que vive lá é lido mais rápido que e-mail e elimina a troca de mensagens do tipo "quem é você".',
    leadsTitle: 'Capte leads rápido com apenas um escaneamento',
    leadsBody:
      'Imprima o QR em encartes de envio, coloque em criativos de anúncios do Facebook ou cole na sua bio do Instagram. Um escaneamento coloca o prospect em uma conversa real com você, não em um formulário.',
  },
  faq: {
    h2: 'Perguntas Sobre QR Code do WhatsApp, Respondidas',
    items: [
      { q: 'Este Gerador de QR Code do WhatsApp é realmente grátis?', a: 'Sim. Não há cadastro, nem marca d\'água no QR, e nem limite de quantos você pode criar. Você pode usar o QR comercialmente em qualquer lugar.' },
      { q: 'O QR funciona em números Pessoal e WhatsApp Business?', a: 'Sim. O QR codifica um link wa.me, que abre qualquer conta do WhatsApp registrada naquele número. Pessoal, Business App e Business API funcionam.' },
      { q: 'Posso adicionar uma mensagem pré-preenchida?', a: 'Sim. Digite a mensagem que você quer que os clientes vejam e ela preenche a caixa de entrada, então eles só precisam tocar em Enviar. Útil para definir contexto (exemplo: "Olá, vi seu QR em [local]").' },
      { q: 'Posso gerar um QR para um grupo do WhatsApp?', a: 'Não. O formato de link wa.me só suporta números individuais. QR codes de grupo precisam ser exportados de dentro do próprio WhatsApp (Info do grupo → código QR).' },
      { q: 'Isso funciona sem o aplicativo do WhatsApp instalado?', a: 'No celular, o aparelho precisa ter o WhatsApp instalado para abrir a conversa. No computador, o QR também pode redirecionar para o WhatsApp Web no navegador, então um desktop sem o app ainda funciona.' },
      { q: 'Qual a diferença disso para um link wa.me?', a: 'Um link wa.me é o que o QR codifica. O QR é uma versão escaneável desse link, útil no impresso, em telas onde o cliente não pode clicar, ou como marcador visual em um adesivo ou placa.' },
      { q: 'O QR code do WhatsApp expira?', a: 'Não. O QR codifica um link wa.me ligado ao seu número, então fica válido enquanto aquele número estiver no WhatsApp. Imprima uma vez e use por anos. Não há etapa de renovação nem token para expirar.' },
      { q: 'Posso rastrear quantas pessoas escanearam meu QR code?', a: 'Não diretamente. Links wa.me não expõem analytics de escaneamento. Para rastrear, passe o QR por um encurtador como Bitly ou Rebrandly que registra cada clique antes do redirecionamento. O Eazybe também captura a conversa de WhatsApp recebida e escreve a origem de volta no seu CRM se você precisa de atribuição até a receita.' },
    ],
  },
  cta: {
    badge: 'Quer Mais?',
    h2: 'Quer Mais Que Só Um QR?',
    subtitle:
      'O Eazybe captura cada conversa de WhatsApp recebida no seu CRM. O lead é qualificado antes dos seus vendedores verem, e nossa IA mantém a conversa quando ninguém está online. Funciona com HubSpot, Salesforce e Zoho.',
    primary: 'Teste o Eazybe Grátis →',
    secondary: 'Agendar Demo',
    footnote: '7 dias grátis · Sem cartão de crédito · Cancele quando quiser',
  },
  generator: {
    formTitle: 'Gere seu QR code',
    numberLabel: 'Número do WhatsApp',
    countryAria: 'Código do país',
    phonePlaceholder: 'Número de telefone',
    phoneAria: 'Número de telefone',
    messageLabel: 'Mensagem pronta',
    messageOptional: '(opcional)',
    messagePlaceholder: 'Olá — gostaria de saber mais sobre seu produto.',
    messageCounter: '{count}/400 — mostrada ao cliente quando ele escanear o QR.',
    errorEmpty: 'Digite um número de WhatsApp primeiro.',
    errorShort: 'Esse número parece curto demais.',
    btnGenerate: 'Gerar QR Code',
    outputTitle: 'Seu QR do WhatsApp',
    emptyState: 'Digite um número do WhatsApp à esquerda para gerar um QR escaneável.',
    qrAlt: 'QR code do WhatsApp',
    btnDownload: 'Baixar PNG',
    btnCopy: 'Copiar link',
    copied: '✓ Link copiado',
  },
  breadcrumb: {
    home: 'Início',
    current: 'Gerador de QR Code para WhatsApp',
  },
}

const es: QrPageContent = {
  meta: {
    title: 'Generador Gratuito de Código QR para WhatsApp con Mensaje Predefinido | Eazybe',
    description:
      'Generador gratuito de código QR para WhatsApp. Crea un QR wa.me con un mensaje predefinido, descárgalo en PNG y úsalo en tu sitio, anuncios o materiales impresos. Sin registro, sin marca de agua.',
    ogDescription: 'Crea un QR de WhatsApp con mensaje predefinido. Descarga gratis en PNG, sin registro, sin marca de agua.',
  },
  hero: {
    tag: 'HERRAMIENTA GRATIS · SIN REGISTRO',
    h1Lead: 'Genera Tu Código',
    h1Brand: 'WhatsApp',
    h1Rest: 'QR',
    h1Highlight: '¡GRATIS hoy!',
    subtitle:
      'Escribe tu número de WhatsApp y un mensaje de apertura. La página genera un QR escaneable. Los clientes lo escanean con cualquier cámara de teléfono y WhatsApp se abre con tu mensaje ya escrito. Funciona en anuncios, embalajes, carteles y donde sea que los clientes te vean pero no puedan tocar un enlace.',
    cta: 'Crear Código QR →',
    footnote: 'Sin registro · Sin marca de agua · Úsalo donde quieras',
  },
  preview: {
    title: 'Genera tu Código QR',
    numberLabel: 'Número de WhatsApp (con código de país)',
    messageLabel: 'Mensaje de Bienvenida (Opcional)',
    btnGenerate: 'Generar Código QR',
    btnExport: 'Exportar Código QR',
    qrAlt: 'Código QR de WhatsApp de muestra',
  },
  tryItNow: {
    h2: 'Crea Un Código QR Gratis Para WhatsApp Pruébalo Ahora',
    subtitle: 'Ingresa tu número de WhatsApp, define el mensaje predefinido y descarga el QR.',
  },
  useCases: {
    h2: 'Dónde Usar Tu QR De WhatsApp',
    subtitle: 'Donde sea que un cliente pueda levantar su teléfono, el QR pone una conversación a un escaneo de distancia.',
    websiteTitle: 'En tu sitio web',
    websiteBody:
      'Añade el QR a tu página de contacto, al pie del blog o a tu página de precios. Los visitantes desde el escritorio sacan su móvil, escanean y se abre una conversación de WhatsApp con el mensaje que definiste.',
    printTitle: 'En impresos',
    printBody:
      'Pon el QR en tarjetas de presentación, folletos, recibos, embalajes y señalización en tienda. Un escaneo abre WhatsApp con tu número ya escrito.',
    socialTitle: 'En redes sociales',
    socialBody:
      'Ponlo en la bio de Instagram, en banners de LinkedIn, en historias o en miniaturas de YouTube para que un seguidor inicie una conversación desde donde ya te sigue.',
  },
  seo: {
    h2: '¿Qué Es Un Código QR De WhatsApp?',
    p1:
      'Un código QR de WhatsApp es una imagen que oculta un enlace wa.me dentro de su patrón de píxeles. Cuando alguien apunta la cámara del teléfono hacia él, la cámara lee el patrón, decodifica la URL y ofrece abrir WhatsApp en el chat correcto. Sin escribir el número. Sin guardar tu contacto primero. Sin copiar dígitos de un impreso.',
    p2Pre: 'El enlace sigue un formato fijo: ',
    p2Post:
      '. El generador se encarga del formato por ti. Quita el signo de más, codifica el mensaje en la URL y valida los dígitos antes de convertir el resultado en un PNG escaneable. Escribes un número y un mensaje inicial. La página genera el QR.',
    h3: 'Cuándo el formato vale la pena',
    p3:
      'Un QR de WhatsApp es más útil cuando escribir es difícil. Un volante que alguien sostiene. Un cartel por el que pasan caminando. Una tarjeta final de YouTube en su televisor. Un stand en una feria. Una pegatina en un envoltorio. En cada caso, el QR convierte una mirada offline en un chat abierto en unos tres segundos.',
    p4Pre:
      'Para equipos que corren anuncios de Click-to-WhatsApp, el mismo QR funciona como respaldo cuando el anuncio en sí no es clickeable. Overlays de transmisiones en vivo, portadas de podcasts, encartes impresos dentro de productos enviados — donde sea que el cliente te vea pero no pueda hacer clic. Si estás usando ',
    p4LinkText: 'Eazybe',
    p4Post:
      ' para rastrear qué superficies realmente generan respuestas en WhatsApp, el QR es lo que cierra el ciclo entre la pieza offline y el registro del chat en tu CRM.',
  },
  benefits: {
    h2Lead: 'Por Qué Un QR De WhatsApp',
    h2Em: 'Convierte',
    subtitle:
      'Los códigos QR quitan los pasos donde los clientes suelen rendirse: escribir un número, guardar un contacto, buscar tu enlace.',
    noInstallTitle: 'Sin instalar app',
    noInstallBody:
      'WhatsApp ya está en unos 2 mil millones de teléfonos. El escaneo abre WhatsApp directamente. Nada que el cliente tenga que descargar y ninguna pantalla de registro entre él y tú.',
    prefilledTitle: 'Mensaje predefinido',
    prefilledBody:
      'Define el mensaje de apertura tú mismo. Los clientes lo ven precargado, así la conversación arranca con el contexto correcto. Ejemplos: "Hola, vi tu menú" o "Envíame un link de demo".',
    conversionTitle: 'Mayor conversión',
    conversionBody:
      'Un QR que abre un chat convierte más que un QR que abre un formulario. Los clientes llegan a un humano o a un agente de IA en un paso en lugar de tres.',
    freeTitle: 'Gratis para siempre',
    freeBody: 'Sin marca de agua, sin registro, sin límite de uso. Genera todos los QR que quieras y úsalos comercialmente.',
  },
  benefitCards: {
    h2Lead: 'Usa El Generador De Código QR De WhatsApp Gratis —',
    h2Em: '¡Beneficios Que No Puedes Ignorar!',
    scanTitle: '¡Escanea Seguro en WhatsApp!',
    scanBody:
      'Pon el QR en tu sitio, en tus anuncios o en tu widget de chat. Los escaneos caen directo en WhatsApp donde el cliente puede ver con quién habla, así los leads llegan con contexto completo en lugar de un formulario anónimo.',
    clickTitle: 'Siempre a un clic de distancia',
    clickBody:
      'Los clientes ya revisan WhatsApp todos los días. El soporte que vive ahí se lee más rápido que el correo y se salta el ida y vuelta de mensajes tipo "¿quién eres?".',
    leadsTitle: 'Captura leads rápido con solo un escaneo',
    leadsBody:
      'Imprime el QR en encartes de envío, ponlo en creativos de anuncios de Facebook o pégalo en tu bio de Instagram. Un escaneo pone al prospecto en una conversación real contigo, no en un formulario.',
  },
  faq: {
    h2: 'Preguntas Sobre Código QR de WhatsApp, Respondidas',
    items: [
      { q: '¿Este Generador de Código QR para WhatsApp es realmente gratis?', a: 'Sí. No hay registro, ni marca de agua en el QR, ni límite de cuántos puedes crear. Puedes usar el QR comercialmente donde quieras.' },
      { q: '¿El QR funciona en números Personal y WhatsApp Business?', a: 'Sí. El QR codifica un enlace wa.me, que abre la cuenta de WhatsApp registrada con ese número. Personal, Business App y Business API funcionan.' },
      { q: '¿Puedo añadir un mensaje predefinido?', a: 'Sí. Escribe el mensaje que quieres que los clientes vean y se precarga en su caja de entrada, así solo tienen que tocar Enviar. Útil para dar contexto (ejemplo: "Hola, vi tu QR en [lugar]").' },
      { q: '¿Puedo generar un QR para un grupo de WhatsApp?', a: 'No. El formato de enlace wa.me solo soporta números individuales. Los QR de grupo deben exportarse desde dentro del propio WhatsApp (Info del grupo → código QR).' },
      { q: '¿Esto funciona sin la app de WhatsApp instalada?', a: 'En móvil, el dispositivo necesita WhatsApp instalado para abrir el chat. En escritorio, el QR también puede redirigir a WhatsApp Web en el navegador, así un escritorio sin la app sigue funcionando.' },
      { q: '¿En qué se diferencia esto de un enlace wa.me?', a: 'Un enlace wa.me es lo que el QR realmente codifica. El QR es la versión escaneable de ese enlace, útil en impreso, en pantallas donde los clientes no pueden hacer clic, o como marcador visual en una pegatina o cartel.' },
      { q: '¿El código QR de WhatsApp expira?', a: 'No. El QR codifica un enlace wa.me ligado a tu número, así que es válido mientras ese número esté en WhatsApp. Imprime una vez y reutiliza por años. No hay paso de renovación ni token que expire.' },
      { q: '¿Puedo rastrear cuántas personas escanearon mi código QR?', a: 'No directamente. Los enlaces wa.me no exponen analíticas de escaneo. Para rastrear escaneos, pasa el QR por un acortador como Bitly o Rebrandly que registre cada clic antes de redirigir. Eazybe también captura el chat de WhatsApp entrante y escribe el origen de vuelta en tu CRM si necesitas atribución hasta el ingreso.' },
    ],
  },
  cta: {
    badge: '¿Quieres Más?',
    h2: '¿Quieres Más Que Solo Un QR?',
    subtitle:
      'Eazybe captura cada chat entrante de WhatsApp en tu CRM. El lead se califica antes de que tus reps lo vean y nuestra IA mantiene la conversación cuando nadie está en línea. Funciona con HubSpot, Salesforce y Zoho.',
    primary: 'Prueba Eazybe Gratis →',
    secondary: 'Agendar Demo',
    footnote: 'Prueba de 7 días · Sin tarjeta de crédito · Cancela cuando quieras',
  },
  generator: {
    formTitle: 'Genera tu código QR',
    numberLabel: 'Número de WhatsApp',
    countryAria: 'Código de país',
    phonePlaceholder: 'Número de teléfono',
    phoneAria: 'Número de teléfono',
    messageLabel: 'Mensaje predefinido',
    messageOptional: '(opcional)',
    messagePlaceholder: 'Hola — me gustaría saber más sobre tu producto.',
    messageCounter: '{count}/400 — se muestra al cliente cuando escanea el QR.',
    errorEmpty: 'Ingresa primero un número de WhatsApp.',
    errorShort: 'Ese número parece muy corto.',
    btnGenerate: 'Generar Código QR',
    outputTitle: 'Tu QR de WhatsApp',
    emptyState: 'Ingresa un número de WhatsApp a la izquierda para generar un QR escaneable.',
    qrAlt: 'Código QR de WhatsApp',
    btnDownload: 'Descargar PNG',
    btnCopy: 'Copiar enlace',
    copied: '✓ Enlace copiado',
  },
  breadcrumb: {
    home: 'Inicio',
    current: 'Generador de Código QR para WhatsApp',
  },
}

const tr: QrPageContent = {
  meta: {
    title: 'Ücretsiz WhatsApp QR Kod Oluşturucu Önceden Yazılmış Mesajla | Eazybe',
    description:
      'Ücretsiz WhatsApp QR kod oluşturucu. Önceden yazılmış mesajla wa.me QR yapın, PNG olarak indirin ve web sitenizde, reklamlarınızda veya basılı materyallerinizde kullanın. Kayıt yok, filigran yok.',
    ogDescription: 'Önceden yazılmış mesajla WhatsApp QR oluşturun. Ücretsiz PNG indirme, kayıt yok, filigran yok.',
  },
  hero: {
    tag: 'ÜCRETSİZ ARAÇ · KAYIT YOK',
    h1Lead: 'Kendi',
    h1Brand: 'WhatsApp',
    h1Rest: 'QR Kodunu Oluştur',
    h1Highlight: 'Bugün ÜCRETSİZ!',
    subtitle:
      'WhatsApp numaranızı ve bir açılış mesajı yazın. Sayfa taranabilir bir QR oluşturur. Müşteriler herhangi bir telefon kamerasıyla tarar ve WhatsApp, mesajınız hazır şekilde açılır. Reklamlarda, ambalajlarda, posterlerde ve müşterilerin sizi görüp link dokunamadığı her yerde çalışır.',
    cta: 'QR Kodu Oluştur →',
    footnote: 'Kayıt yok · Filigran yok · Her yerde kullanın',
  },
  preview: {
    title: 'QR Kodunuzu Oluşturun',
    numberLabel: 'WhatsApp Numarası (ülke koduyla)',
    messageLabel: 'Karşılama Mesajı (Opsiyonel)',
    btnGenerate: 'QR Kodu Oluştur',
    btnExport: 'QR Kodu Dışa Aktar',
    qrAlt: 'Örnek WhatsApp QR kodu',
  },
  tryItNow: {
    h2: 'WhatsApp İçin Ücretsiz QR Kod Oluştur Hemen Dene',
    subtitle: 'WhatsApp numaranızı girin, önceden yazılmış mesajı ayarlayın ve QR\'ı indirin.',
  },
  useCases: {
    h2: 'WhatsApp QR\'ını Nerede Kullanın',
    subtitle: 'Bir müşterinin telefonunu tutabildiği her yerde, QR bir sohbeti tek taramayla başlatır.',
    websiteTitle: 'Web sitenizde',
    websiteBody:
      'QR\'ı iletişim sayfanıza, blog altbilginize veya fiyatlandırma sayfanıza ekleyin. Masaüstü ziyaretçileri telefonlarını çıkarır, tarar ve belirlediğiniz mesajla bir WhatsApp sohbeti açılır.',
    printTitle: 'Basılı materyallerde',
    printBody:
      'QR\'ı kartvizitlere, broşürlere, makbuzlara, ambalajlara ve mağaza içi tabelalara koyun. Tek tarama, numaranız önceden doldurulmuş şekilde WhatsApp\'ı açar.',
    socialTitle: 'Sosyal medyada',
    socialBody:
      'Instagram biyografisine, LinkedIn afişlerine, hikaye gönderilerine veya YouTube küçük resimlerine koyun ki bir takipçi sizi takip ettiği yerden bir sohbet başlatabilsin.',
  },
  seo: {
    h2: 'WhatsApp QR Kodu Nedir?',
    p1:
      'WhatsApp QR kodu, piksel deseninin içine bir wa.me bağlantısı gizleyen bir görseldir. Birisi telefon kamerasını ona doğrulttuğunda, kamera deseni okur, URL\'yi çözer ve doğru sohbette WhatsApp\'ı açmayı önerir. Numara yazmak yok. Önce kişiyi kaydetmek yok. Bir basılı belgeden rakam kopyalamak yok.',
    p2Pre: 'Bağlantı sabit bir formatı takip eder: ',
    p2Post:
      '. Oluşturucu biçimlendirme işini sizin yerinize yapar. Artı işaretini çıkarır, mesajı URL kodlar ve sonucu taranabilir bir PNG\'ye dönüştürmeden önce rakamları doğrular. Bir numara ve başlangıç mesajı yazarsınız. Sayfa QR\'ı oluşturur.',
    h3: 'Formatın işe yaradığı yerler',
    p3:
      'Bir WhatsApp QR\'ı, yazmanın zor olduğu durumlarda en kullanışlıdır. Birinin elinde tuttuğu bir broşür. Yanından geçtikleri bir poster. Televizyonlarında oynayan bir YouTube son kartı. Bir fuar standı. Ambalajdaki bir etiket. Her durumda QR, çevrimdışı bir bakışı yaklaşık üç saniyede açık bir sohbete çevirir.',
    p4Pre:
      'Click-to-WhatsApp reklamları yürüten ekipler için aynı QR, reklamın kendisi dokunulamaz olduğunda bir yedek olarak iki kat çalışır. Canlı yayın yer paylaşımları, podcast kapak görselleri, gönderilen ürünlerin içine konan basılı broşürler, müşterinin sizi görebileceği ama tıklayamayacağı her yer. Hangi yüzeylerin gerçekten WhatsApp yanıtları getirdiğini izlemek için ',
    p4LinkText: 'Eazybe',
    p4Post:
      ' kullanıyorsanız, QR çevrimdışı parça ile CRM\'inizdeki sohbet kaydı arasındaki döngüyü kapatan şeydir.',
  },
  benefits: {
    h2Lead: 'Neden Bir WhatsApp QR\'ı',
    h2Em: 'Dönüştürür',
    subtitle:
      'QR kodlar, müşterilerin genellikle vazgeçtiği adımları kaldırır: numara yazma, kişi kaydetme, bağlantınızı arama.',
    noInstallTitle: 'Uygulama kurulumu yok',
    noInstallBody:
      'WhatsApp zaten yaklaşık 2 milyar telefonda kuruludur. Tarama doğrudan WhatsApp\'ı açar. Müşterinin indirmesi gereken bir şey yok ve aranızda kayıt ekranı yok.',
    prefilledTitle: 'Önceden yazılmış mesaj',
    prefilledBody:
      'Açılış mesajını kendiniz belirleyin. Müşteriler onu önceden doldurulmuş görür, böylece sohbet doğru bağlamla başlar. Örnekler: "Merhaba, menünüzü gördüm" veya "Demo bağlantısı gönderin".',
    conversionTitle: 'Daha yüksek dönüşüm',
    conversionBody:
      'Bir sohbet açan QR, bir form açan QR\'dan daha fazla dönüşür. Müşteriler üç adım yerine bir adımda bir insana veya bir AI agent\'a ulaşır.',
    freeTitle: 'Sonsuza kadar ücretsiz',
    freeBody: 'Filigran yok, kayıt yok, kullanım sınırı yok. İstediğiniz kadar QR oluşturun ve ticari olarak kullanın.',
  },
  benefitCards: {
    h2Lead: 'WhatsApp QR Kod Oluşturucuyu Ücretsiz Kullanın —',
    h2Em: 'Göz Ardı Edemeyeceğiniz Avantajlar!',
    scanTitle: 'WhatsApp\'ta Güvenli Tarayın!',
    scanBody:
      'QR\'ı web sitenize, reklamlarınıza veya sohbet widget\'ınıza koyun. Taramalar doğrudan WhatsApp\'a düşer ve müşteri kiminle konuştuğunu görür, böylece lead\'ler anonim bir form yerine tam bağlamla gelir.',
    clickTitle: 'Her zaman bir tık uzakta',
    clickBody:
      'Müşteriler zaten WhatsApp\'ı her gün kontrol eder. Orada yaşayan destek, e-postadan daha hızlı okunur ve "kimsin sen" mesajlarının ileri-geri gidip gelmesini atlar.',
    leadsTitle: 'Tek taramayla hızla lead toplayın',
    leadsBody:
      'QR\'ı kargo broşürlerine basın, Facebook reklam görsellerine ekleyin veya Instagram biyografinize yapıştırın. Tek tarama bir prospect\'i bir form yerine gerçek bir konuşmaya sokar.',
  },
  faq: {
    h2: 'WhatsApp QR Kodu Soruları, Cevaplandı',
    items: [
      { q: 'Bu WhatsApp QR Kod Oluşturucu gerçekten ücretsiz mi?', a: 'Evet. Kayıt yok, QR üzerinde filigran yok ve oluşturabileceğiniz sayıda sınır yok. QR\'ı istediğiniz yerde ticari olarak kullanabilirsiniz.' },
      { q: 'QR hem Kişisel hem WhatsApp Business numaralarında çalışır mı?', a: 'Evet. QR bir wa.me bağlantısı kodlar, bu da o telefon numarasına kayıtlı hangi WhatsApp hesabı varsa onu açar. Kişisel, Business App ve Business API hepsi çalışır.' },
      { q: 'Önceden yazılmış bir mesaj ekleyebilir miyim?', a: 'Evet. Müşterilerin görmesini istediğiniz mesajı yazın, giriş kutusuna önceden dolduracaktır, böylece sadece Gönder\'e dokunmaları yeterli. Bağlam belirlemek için kullanışlı (örnek: "Merhaba, QR\'ınızı [yer]\'de gördüm").' },
      { q: 'Bir WhatsApp grubu için QR oluşturabilir miyim?', a: 'Hayır. wa.me bağlantı formatı yalnızca bireysel telefon numaralarını destekler. Grup QR kodları, WhatsApp\'ın kendi içinden dışa aktarılmalıdır (Grup bilgisi → QR kodu).' },
      { q: 'WhatsApp uygulaması yüklü değilken çalışır mı?', a: 'Mobilde sohbeti açmak için cihazın WhatsApp\'a sahip olması gerekir. Masaüstünde QR, tarayıcıda WhatsApp Web\'e de yönlendirebilir, böylece uygulama olmayan bir masaüstü hala çalışır.' },
      { q: 'Bu bir wa.me bağlantısından nasıl farklı?', a: 'Bir wa.me bağlantısı QR\'ın aslında kodladığı şeydir. QR, o bağlantının taranabilir bir sürümüdür; basılı materyallerde, müşterilerin tıklayamadığı ekranlarda veya bir etiket ya da tabeladaki görsel bir işaretçi olarak kullanışlıdır.' },
      { q: 'WhatsApp QR kodu süresi dolar mı?', a: 'Hayır. QR, telefon numaranıza bağlı bir wa.me bağlantısı kodlar, böylece o numara WhatsApp\'ta olduğu sürece geçerlidir. Bir kez basın ve yıllarca yeniden kullanın. Yenileme adımı ve süresi dolacak bir token yok.' },
      { q: 'QR kodumu kaç kişinin taradığını izleyebilir miyim?', a: 'Doğrudan değil. wa.me bağlantıları tarama analitiği sunmaz. Taramaları izlemek için QR\'ı yönlendirmeden önce her tıklamayı kaydeden Bitly veya Rebrandly gibi bir kısaltma servisi üzerinden yönlendirin. Eazybe ayrıca gelen WhatsApp sohbetini yakalar ve kaynağı CRM\'inize geri yazar, eğer gelire kadar atıf gerekiyorsa.' },
    ],
  },
  cta: {
    badge: 'Dahasını mı?',
    h2: 'Sadece Bir QR\'dan Fazlasını mı İstiyorsunuz?',
    subtitle:
      'Eazybe, her gelen WhatsApp sohbetini CRM\'inize alır. Lead, temsilcileriniz görmeden önce puanlanır ve kimse çevrimiçi değilken AI\'mız sohbete devam eder. HubSpot, Salesforce ve Zoho ile çalışır.',
    primary: 'Eazybe\'yi Ücretsiz Deneyin →',
    secondary: 'Demo Planlayın',
    footnote: '7 gün ücretsiz · Kredi kartı gerekmez · İstediğiniz zaman iptal edin',
  },
  generator: {
    formTitle: 'QR kodunuzu oluşturun',
    numberLabel: 'WhatsApp numarası',
    countryAria: 'Ülke kodu',
    phonePlaceholder: 'Telefon numarası',
    phoneAria: 'Telefon numarası',
    messageLabel: 'Önceden yazılmış mesaj',
    messageOptional: '(opsiyonel)',
    messagePlaceholder: 'Merhaba — ürününüz hakkında daha fazla bilgi almak istiyorum.',
    messageCounter: '{count}/400 — müşteri QR\'ı taradığında gösterilir.',
    errorEmpty: 'Önce bir WhatsApp telefon numarası girin.',
    errorShort: 'Bu telefon numarası çok kısa görünüyor.',
    btnGenerate: 'QR Kodu Oluştur',
    outputTitle: 'WhatsApp QR\'ınız',
    emptyState: 'Taranabilir bir QR oluşturmak için soldaki WhatsApp numarasını girin.',
    qrAlt: 'WhatsApp QR kodu',
    btnDownload: 'PNG İndir',
    btnCopy: 'Bağlantıyı kopyala',
    copied: '✓ Bağlantı kopyalandı',
  },
  breadcrumb: {
    home: 'Ana Sayfa',
    current: 'WhatsApp QR Kod Oluşturucu',
  },
}

export const QR_CONTENT_BY_LOCALE: Record<string, QrPageContent> = { en, br, es, tr }

export function getQrPageContent(locale: string): QrPageContent {
  return QR_CONTENT_BY_LOCALE[locale] || QR_CONTENT_BY_LOCALE.en
}
