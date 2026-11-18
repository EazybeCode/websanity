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
      'Free WhatsApp QR code generator. Add a pre-filled message, download the QR as a PNG, and use it on print, ads, or your website. No signup needed.',
    ogDescription: 'Make a WhatsApp QR code that opens a chat with your message already typed. Free PNG download, no signup.',
  },
  hero: {
    tag: 'FREE TOOL · NO SIGNUP',
    h1Lead: 'Create Your',
    h1Brand: 'WhatsApp',
    h1Rest: 'QR Code',
    h1Highlight: 'For Free',
    subtitle:
      "Enter your WhatsApp number and, if you like, an opening message. When a customer scans the QR with their phone camera, WhatsApp opens a chat with you and your message is already typed in. It's built for places where people can see you but can't tap a link: flyers, packaging, posters, a screen across the room.",
    cta: 'Create QR Code →',
    footnote: 'No signup · No watermark · Use it anywhere',
  },
  preview: {
    title: 'Generate Your QR Code',
    numberLabel: 'WhatsApp Number (with country code)',
    messageLabel: 'Pre-Filled Message (Optional)',
    btnGenerate: 'Generate QR Code',
    btnExport: 'Download QR Code',
    qrAlt: 'Sample WhatsApp QR code',
  },
  tryItNow: {
    h2: 'Try It: Create A Free QR Code For WhatsApp',
    subtitle: 'Pick your country code, type the number, add a message if you want one, and download the QR as a PNG.',
  },
  useCases: {
    h2: 'Where To Use Your WhatsApp QR',
    subtitle: "Put it wherever people see your business but can't click a link.",
    websiteTitle: 'On Your Website',
    websiteBody:
      'Add it to your contact page, footer, or pricing page. Someone browsing on a laptop can scan it with their phone and start the chat on WhatsApp instead of filling out a form.',
    printTitle: 'In Print',
    printBody:
      "Business cards, flyers, receipts, packaging, in-store signs. Anyone who scans it lands in a WhatsApp chat with your number already filled in, so they don't have to type it off the paper.",
    socialTitle: 'On Social Media',
    socialBody:
      "Add it to an Instagram story, a LinkedIn banner, or the end screen of a YouTube video. It helps when the viewer is on a desktop or a TV and the link isn't clickable.",
  },
  seo: {
    h2: 'What Is A WhatsApp QR Code?',
    p1:
      "A WhatsApp QR code is a wa.me link stored as an image. Point a phone camera at it and the camera reads the link and offers to open WhatsApp, straight into a chat with your number. The person scanning doesn't have to type your number or save you as a contact first.",
    p2Pre: 'The link follows a fixed format: ',
    p2Post:
      ". You don't have to build it by hand. The generator removes spaces and symbols from the number, adds the country code, URL-encodes your message, and turns the link into a PNG you can download. You can also copy the plain link for a button or an email signature.",
    h3: 'When A QR Beats A Link',
    p3:
      "A QR makes sense when the person can't tap anything. They're holding a flyer, walking past a poster, watching a YouTube video on the TV, or standing at your trade show booth. Typing a phone number in any of those moments is a chore, and plenty of people won't bother. Scanning takes a few seconds.",
    p4Pre:
      "If you run Click-to-WhatsApp ads, the QR covers the places the ad can't reach: livestream overlays, podcast cover art, inserts in shipped orders. If you use ",
    p4LinkText: 'Eazybe',
    p4Post:
      ' to sync WhatsApp chats to your CRM, the chats that start from a scan get logged on the contact record like any other conversation, so your team sees them in the same place.',
  },
  benefits: {
    h2Lead: 'Why A WhatsApp QR',
    h2Em: 'Works',
    subtitle:
      'People drop off at the small steps: typing a number, saving a contact, looking for your link. A QR skips all of them.',
    noInstallTitle: 'Nothing To Install',
    noInstallBody:
      "Most of your customers already use WhatsApp. The scan opens it directly, and there's no app to download or account to create.",
    prefilledTitle: 'Pre-Filled Message',
    prefilledBody:
      'You write the first line, and customers find it in the text box ready to send. A message like "Hi, I saw your menu" or "Send me a demo link" tells you where they came from and what they want.',
    conversionTitle: 'Fewer Steps',
    conversionBody:
      'A QR that opens a chat asks for one tap on Send. A QR that opens a form asks for a name, email, and phone number first. If an AI agent answers your WhatsApp, the customer gets a reply right away.',
    freeTitle: 'Free Forever',
    freeBody: "The QR has no watermark and you don't need an account. Make as many as you like and use them commercially.",
  },
  benefitCards: {
    h2Lead: 'What One Scan',
    h2Em: 'Gets You',
    scanTitle: "You Know Who You're Talking To",
    scanBody:
      "A scan opens a real WhatsApp chat, so you see the person's name and number from the first message. That beats an anonymous form submission you then have to chase by email.",
    clickTitle: 'Where Customers Already Are',
    clickBody:
      'Your customers check WhatsApp throughout the day. Talking to them there means your replies land in an app they actually open, and nobody has to ask "who is this?" because the customer started the chat.',
    leadsTitle: 'Leads From Print And Ads',
    leadsBody:
      'Print the QR on shipping inserts, add it to a Facebook ad image, or put it in your Instagram bio. Each scan starts a conversation with a real person you can reply to.',
  },
  faq: {
    h2: 'Common Questions About WhatsApp QR Codes',
    items: [
      { q: 'Is this WhatsApp QR Code Generator really free?', a: "Yes. You don't need an account, the QR has no watermark, and there's no limit on how many you make. You can use the codes commercially." },
      { q: 'Will the QR work on both Personal and WhatsApp Business numbers?', a: 'Yes. The QR holds a wa.me link, and wa.me opens whichever WhatsApp account is registered to that number. That covers personal WhatsApp, the WhatsApp Business app, and numbers on the WhatsApp Business API.' },
      { q: 'Can I add a pre-filled message?', a: 'Yes. Type it in the message box (up to 400 characters). When someone scans the QR, the message appears in their WhatsApp text field and they only need to tap Send. Mentioning the location helps, for example "Hi, I saw your QR at [location]".' },
      { q: 'Can I generate a QR for a WhatsApp group?', a: "No. wa.me links only work with individual phone numbers. To get a group's QR code, open the group in WhatsApp, go to Group info → Invite via link, and use the QR code option there." },
      { q: 'Does this work without the WhatsApp app installed?', a: 'The phone that scans the QR needs WhatsApp installed to open the chat. If someone opens the wa.me link itself on a computer, the page offers to continue in WhatsApp Web or the desktop app.' },
      { q: 'How is this different from a wa.me link?', a: "A wa.me link is exactly what the QR contains. The QR is a scannable version of that link for places where people can't click, like print, TV screens, stickers, and signs. This page gives you both: copy the link for your website and download the QR for print." },
      { q: 'Does the WhatsApp QR code expire?', a: "No. The QR holds a wa.me link tied to your phone number, so it keeps working as long as that number is active on WhatsApp. There's nothing to renew. If you change numbers, you'll need a new QR." },
      { q: 'Can I track how many people scanned my QR code?', a: "Not with this tool. wa.me links don't record scans. To count them, you'd need a short link from a service like Bitly or Rebrandly that logs each click and redirects to your wa.me link, plus a QR made from that short link. If you use Eazybe, incoming chats are also saved to the contact in your CRM." },
    ],
  },
  cta: {
    badge: 'Beyond The QR',
    h2: 'Need More Than A QR Code?',
    subtitle:
      "Eazybe saves every WhatsApp chat to your CRM, so a conversation that started from a scan sits on the contact record where your team can see it. When nobody's online, an AI agent can reply and ask the first qualifying questions. Works with HubSpot, Salesforce, Zoho, and Pipedrive.",
    primary: 'Try Eazybe Free →',
    secondary: 'Book a Demo',
    footnote: '4-day free trial · No credit card required · Cancel anytime',
  },
  generator: {
    formTitle: 'Generate your QR code',
    numberLabel: 'WhatsApp number',
    countryAria: 'Country code',
    phonePlaceholder: 'Phone number',
    phoneAria: 'Phone number',
    messageLabel: 'Pre-filled message',
    messageOptional: '(optional)',
    messagePlaceholder: "Hi, I'd like to know more about your product.",
    messageCounter: '{count}/400. Customers see this message when they scan the QR.',
    errorEmpty: 'Enter a WhatsApp phone number first.',
    errorShort: 'That phone number looks too short.',
    btnGenerate: 'Generate QR Code',
    outputTitle: 'Your WhatsApp QR',
    emptyState: 'Enter a WhatsApp number on the left and your QR code shows up here.',
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
      'Gerador gratuito de QR code para WhatsApp. Adicione uma mensagem pronta, baixe em PNG e use em impressos, anúncios ou no seu site. Sem cadastro.',
    ogDescription: 'Crie um QR code do WhatsApp que abre a conversa com sua mensagem já digitada. Download grátis em PNG, sem cadastro.',
  },
  hero: {
    tag: 'FERRAMENTA GRÁTIS · SEM CADASTRO',
    h1Lead: 'Crie Seu QR Code do',
    h1Brand: 'WhatsApp',
    h1Rest: '',
    h1Highlight: 'Grátis',
    subtitle:
      'Informe seu número de WhatsApp e, se quiser, uma mensagem de abertura. Quando o cliente escaneia o QR com a câmera do celular, o WhatsApp abre uma conversa com você e a mensagem já aparece digitada. Serve para os lugares onde a pessoa vê sua marca mas não tem um link para tocar: panfletos, embalagens, cartazes, uma tela do outro lado da sala.',
    cta: 'Criar QR Code →',
    footnote: 'Sem cadastro · Sem marca d\'água · Use em qualquer lugar',
  },
  preview: {
    title: 'Gere Seu QR Code',
    numberLabel: 'Número do WhatsApp (com código do país)',
    messageLabel: 'Mensagem Pronta (Opcional)',
    btnGenerate: 'Gerar QR Code',
    btnExport: 'Baixar QR Code',
    qrAlt: 'QR code de exemplo do WhatsApp',
  },
  tryItNow: {
    h2: 'Experimente: Crie Um QR Code Grátis Para WhatsApp',
    subtitle: 'Escolha o código do país, digite o número, escreva uma mensagem se quiser e baixe o QR em PNG.',
  },
  useCases: {
    h2: 'Onde Usar Seu QR do WhatsApp',
    subtitle: 'Use onde as pessoas veem seu negócio mas não conseguem clicar em um link.',
    websiteTitle: 'No seu site',
    websiteBody:
      'Coloque na página de contato, no rodapé ou na página de preços. Quem está navegando no computador escaneia com o celular e já começa a conversa no WhatsApp, em vez de preencher um formulário.',
    printTitle: 'Em impressos',
    printBody:
      'Cartões de visita, panfletos, comprovantes, embalagens, placas na loja. Quem escaneia cai direto numa conversa com o seu número e não precisa digitar nada do papel.',
    socialTitle: 'Nas redes sociais',
    socialBody:
      'Use nos stories do Instagram, no banner do LinkedIn ou na tela final de um vídeo do YouTube. Ajuda bastante quando a pessoa está no computador ou na TV e o link não é clicável.',
  },
  seo: {
    h2: 'O Que É Um QR Code Do WhatsApp?',
    p1:
      'Um QR code do WhatsApp é um link wa.me guardado em forma de imagem. A pessoa aponta a câmera do celular, a câmera lê o link e oferece abrir o WhatsApp direto na conversa com o seu número. Ela não precisa digitar o número nem salvar você nos contatos antes.',
    p2Pre: 'O link segue um formato fixo: ',
    p2Post:
      '. Você não precisa montar isso na mão. O gerador tira espaços e símbolos do número, junta o código do país, codifica a mensagem para a URL e transforma o link em um PNG para baixar. Se preferir, dá para copiar só o link e usar num botão ou na assinatura de e-mail.',
    h3: 'Quando o QR funciona melhor que um link',
    p3:
      'O QR faz sentido quando a pessoa não tem onde tocar. Ela está segurando um panfleto, passando por um cartaz, vendo um vídeo do YouTube na TV ou parada no seu estande numa feira. Digitar um número de telefone nessas horas dá trabalho, e muita gente desiste. Escanear leva poucos segundos.',
    p4Pre:
      'Se você roda anúncios de Click-to-WhatsApp, o QR cobre os lugares onde o anúncio não chega: overlays de live, capas de podcast, encartes dentro dos pedidos enviados. Se você usa o ',
    p4LinkText: 'Eazybe',
    p4Post:
      ' para sincronizar as conversas do WhatsApp com o CRM, as que começam por um escaneamento ficam registradas no contato como qualquer outra, e o time vê tudo no mesmo lugar.',
  },
  benefits: {
    h2Lead: 'Por Que Um QR Do WhatsApp',
    h2Em: 'Funciona',
    subtitle:
      'O cliente desiste nos pequenos passos: digitar um número, salvar um contato, procurar seu link. O QR pula todos eles.',
    noInstallTitle: 'Nada para instalar',
    noInstallBody:
      'A maioria dos seus clientes já usa WhatsApp. O escaneamento abre o app direto, sem nada para baixar e sem conta para criar.',
    prefilledTitle: 'Mensagem pronta',
    prefilledBody:
      'Você escreve a primeira frase e o cliente já a encontra no campo de texto, pronta para enviar. Algo como "Oi, vi seu cardápio" ou "Quero um link de demonstração" já diz de onde a pessoa veio e o que ela quer.',
    conversionTitle: 'Menos etapas',
    conversionBody:
      'Um QR que abre uma conversa pede só um toque em Enviar. Um QR que abre um formulário pede nome, e-mail e telefone antes. E se um agente de IA atende seu WhatsApp, o cliente recebe resposta na hora.',
    freeTitle: 'Grátis para sempre',
    freeBody: 'O QR não tem marca d\'água e você não precisa criar conta. Gere quantos quiser e use comercialmente.',
  },
  benefitCards: {
    h2Lead: 'O Que Você Ganha',
    h2Em: 'Com Um Escaneamento',
    scanTitle: 'Você sabe com quem está falando',
    scanBody:
      'O escaneamento abre uma conversa de verdade no WhatsApp, então você vê o nome e o número da pessoa desde a primeira mensagem. Bem melhor que um formulário anônimo que você ainda precisa correr atrás por e-mail.',
    clickTitle: 'Onde o cliente já está',
    clickBody:
      'Seus clientes abrem o WhatsApp várias vezes por dia. Falando com eles ali, sua resposta chega num app que eles realmente usam, e ninguém precisa perguntar "quem é?", porque foi o cliente que começou a conversa.',
    leadsTitle: 'Leads vindos de impressos e anúncios',
    leadsBody:
      'Imprima o QR nos encartes dos pedidos, coloque na imagem de um anúncio do Facebook ou na bio do Instagram. Cada escaneamento começa uma conversa com uma pessoa real, que você pode responder.',
  },
  faq: {
    h2: 'Dúvidas Sobre QR Code do WhatsApp',
    items: [
      { q: 'Este Gerador de QR Code do WhatsApp é realmente grátis?', a: 'Sim. Você não precisa de cadastro, o QR não tem marca d\'água e não há limite de quantos você pode criar. Pode usar comercialmente.' },
      { q: 'O QR funciona com número pessoal e com WhatsApp Business?', a: 'Sim. O QR guarda um link wa.me, e o wa.me abre a conta de WhatsApp registrada naquele número. Isso vale para o WhatsApp pessoal, o app WhatsApp Business e números na API do WhatsApp Business.' },
      { q: 'Posso adicionar uma mensagem pronta?', a: 'Sim. Escreva no campo de mensagem (até 400 caracteres). Quando alguém escaneia o QR, o texto aparece no campo do WhatsApp e a pessoa só precisa tocar em Enviar. Vale citar o local, por exemplo "Oi, vi seu QR em [local]".' },
      { q: 'Posso gerar um QR para um grupo do WhatsApp?', a: 'Não. Links wa.me só funcionam com números individuais. Para ter o QR de um grupo, abra o grupo no WhatsApp, vá em Dados do grupo → Convidar via link e use a opção de QR code.' },
      { q: 'Funciona sem o WhatsApp instalado?', a: 'O celular que escaneia o QR precisa ter o WhatsApp para abrir a conversa. Se alguém abrir o link wa.me no computador, a página oferece continuar no WhatsApp Web ou no app para desktop.' },
      { q: 'Qual a diferença entre o QR e um link wa.me?', a: 'O link wa.me é exatamente o que está dentro do QR. O QR é a versão escaneável desse link, para lugares onde não dá para clicar: impressos, telas de TV, adesivos, placas. Esta página gera os dois, então você pode copiar o link para o site e baixar o QR para imprimir.' },
      { q: 'O QR code do WhatsApp expira?', a: 'Não. O QR guarda um link wa.me ligado ao seu número, então continua funcionando enquanto esse número estiver ativo no WhatsApp. Não há nada para renovar. Se você trocar de número, vai precisar de um QR novo.' },
      { q: 'Posso rastrear quantas pessoas escanearam meu QR code?', a: 'Não com esta ferramenta. Links wa.me não registram escaneamentos. Para contar, você precisa de um link curto de um serviço como Bitly ou Rebrandly, que registra cada clique e redireciona para o seu link wa.me, e de um QR feito a partir desse link curto. Se você usa o Eazybe, as conversas que chegam também ficam salvas no contato dentro do seu CRM.' },
    ],
  },
  cta: {
    badge: 'Além do QR',
    h2: 'Precisa De Mais Que Um QR Code?',
    subtitle:
      'O Eazybe salva cada conversa do WhatsApp no seu CRM, então a conversa que começou num escaneamento fica no registro do contato, à vista do time. Quando ninguém está online, um agente de IA pode responder e fazer as primeiras perguntas de qualificação. Funciona com HubSpot, Salesforce, Zoho e Pipedrive.',
    primary: 'Teste o Eazybe Grátis →',
    secondary: 'Agendar Demo',
    footnote: '4 dias grátis · Sem cartão de crédito · Cancele quando quiser',
  },
  generator: {
    formTitle: 'Gere seu QR code',
    numberLabel: 'Número do WhatsApp',
    countryAria: 'Código do país',
    phonePlaceholder: 'Número de telefone',
    phoneAria: 'Número de telefone',
    messageLabel: 'Mensagem pronta',
    messageOptional: '(opcional)',
    messagePlaceholder: 'Olá, gostaria de saber mais sobre seu produto.',
    messageCounter: '{count}/400. O cliente vê esta mensagem quando escaneia o QR.',
    errorEmpty: 'Digite um número de WhatsApp primeiro.',
    errorShort: 'Esse número parece curto demais.',
    btnGenerate: 'Gerar QR Code',
    outputTitle: 'Seu QR do WhatsApp',
    emptyState: 'Digite um número de WhatsApp à esquerda e o seu QR aparece aqui.',
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
      'Generador gratuito de código QR para WhatsApp. Agrega un mensaje predefinido, descarga el QR en PNG y úsalo en impresos, anuncios o tu sitio. Sin registro.',
    ogDescription: 'Crea un código QR de WhatsApp que abre el chat con tu mensaje ya escrito. Descarga gratis en PNG, sin registro.',
  },
  hero: {
    tag: 'HERRAMIENTA GRATIS · SIN REGISTRO',
    h1Lead: 'Crea Tu Código QR De',
    h1Brand: 'WhatsApp',
    h1Rest: '',
    h1Highlight: 'Gratis',
    subtitle:
      'Escribe tu número de WhatsApp y, si quieres, un mensaje de apertura. Cuando un cliente escanea el QR con la cámara del celular, WhatsApp abre un chat contigo y el mensaje ya aparece escrito. Sirve para los lugares donde la gente ve tu marca pero no tiene un enlace para tocar: volantes, empaques, carteles, una pantalla al otro lado del salón.',
    cta: 'Crear Código QR →',
    footnote: 'Sin registro · Sin marca de agua · Úsalo donde quieras',
  },
  preview: {
    title: 'Genera Tu Código QR',
    numberLabel: 'Número de WhatsApp (con código de país)',
    messageLabel: 'Mensaje Predefinido (Opcional)',
    btnGenerate: 'Generar Código QR',
    btnExport: 'Descargar Código QR',
    qrAlt: 'Código QR de WhatsApp de muestra',
  },
  tryItNow: {
    h2: 'Pruébalo: Crea Un Código QR Gratis Para WhatsApp',
    subtitle: 'Elige el código de país, escribe el número, agrega un mensaje si quieres y descarga el QR en PNG.',
  },
  useCases: {
    h2: 'Dónde Usar Tu QR De WhatsApp',
    subtitle: 'Úsalo donde la gente ve tu negocio pero no puede hacer clic en un enlace.',
    websiteTitle: 'En tu sitio web',
    websiteBody:
      'Agrégalo a tu página de contacto, al pie de página o a la página de precios. Quien navega desde la computadora lo escanea con el celular y empieza el chat en WhatsApp en lugar de llenar un formulario.',
    printTitle: 'En impresos',
    printBody:
      'Tarjetas de presentación, volantes, recibos, empaques, letreros en la tienda. Quien lo escanea llega directo a un chat con tu número y no tiene que copiarlo del papel.',
    socialTitle: 'En redes sociales',
    socialBody:
      'Úsalo en historias de Instagram, en el banner de LinkedIn o en la pantalla final de un video de YouTube. Es útil cuando la persona está en la computadora o frente a la tele y el enlace no se puede tocar.',
  },
  seo: {
    h2: '¿Qué Es Un Código QR De WhatsApp?',
    p1:
      'Un código QR de WhatsApp es un enlace wa.me guardado como imagen. La persona apunta la cámara del celular, la cámara lee el enlace y ofrece abrir WhatsApp directo en un chat con tu número. No tiene que escribir el número ni guardarte como contacto antes.',
    p2Pre: 'El enlace sigue un formato fijo: ',
    p2Post:
      '. No tienes que armarlo a mano. El generador quita los espacios y símbolos del número, agrega el código de país, codifica el mensaje para la URL y convierte el enlace en un PNG que puedes descargar. Si lo prefieres, también puedes copiar solo el enlace para usarlo en un botón o en tu firma de correo.',
    h3: 'Cuándo conviene más un QR que un enlace',
    p3:
      'Un QR tiene sentido cuando la persona no tiene dónde tocar. Tiene un volante en la mano, pasa frente a un cartel, ve un video de YouTube en la tele o está parada en tu stand de una feria. Escribir un número de teléfono en esos momentos es una molestia, y mucha gente no lo hace. Escanear toma unos segundos.',
    p4Pre:
      'Si haces anuncios de Click-to-WhatsApp, el QR cubre los lugares a los que el anuncio no llega: overlays de transmisiones en vivo, portadas de podcast, folletos dentro de los pedidos que envías. Si usas ',
    p4LinkText: 'Eazybe',
    p4Post:
      ' para sincronizar los chats de WhatsApp con tu CRM, los que empiezan con un escaneo quedan registrados en el contacto como cualquier otro, y tu equipo los ve en el mismo lugar.',
  },
  benefits: {
    h2Lead: 'Por Qué Un QR De WhatsApp',
    h2Em: 'Funciona',
    subtitle:
      'Los clientes se pierden en los pasos pequeños: escribir un número, guardar un contacto, buscar tu enlace. El QR se salta todos.',
    noInstallTitle: 'Nada que instalar',
    noInstallBody:
      'La mayoría de tus clientes ya usa WhatsApp. El escaneo abre la app directamente, sin nada que descargar ni cuenta que crear.',
    prefilledTitle: 'Mensaje predefinido',
    prefilledBody:
      'Tú escribes la primera frase y el cliente la encuentra en el campo de texto, lista para enviar. Algo como "Hola, vi tu menú" o "Quiero un enlace para la demo" te dice de dónde viene y qué busca.',
    conversionTitle: 'Menos pasos',
    conversionBody:
      'Un QR que abre un chat solo pide tocar Enviar. Uno que abre un formulario pide nombre, correo y teléfono antes. Y si un agente de IA atiende tu WhatsApp, el cliente recibe respuesta al momento.',
    freeTitle: 'Gratis para siempre',
    freeBody: 'El QR no lleva marca de agua y no necesitas crear una cuenta. Genera todos los que quieras y úsalos comercialmente.',
  },
  benefitCards: {
    h2Lead: 'Lo Que Te Da',
    h2Em: 'Un Escaneo',
    scanTitle: 'Sabes con quién hablas',
    scanBody:
      'El escaneo abre un chat real de WhatsApp, así que ves el nombre y el número de la persona desde el primer mensaje. Es mucho mejor que un formulario anónimo al que luego tienes que darle seguimiento por correo.',
    clickTitle: 'Donde tus clientes ya están',
    clickBody:
      'Tus clientes abren WhatsApp varias veces al día. Si les escribes ahí, tu respuesta llega a una app que de verdad usan, y nadie tiene que preguntar "¿quién eres?", porque el chat lo empezó el cliente.',
    leadsTitle: 'Leads desde impresos y anuncios',
    leadsBody:
      'Imprime el QR en los folletos de tus pedidos, ponlo en la imagen de un anuncio de Facebook o en tu bio de Instagram. Cada escaneo abre una conversación con una persona real a la que puedes responder.',
  },
  faq: {
    h2: 'Preguntas Frecuentes Sobre Códigos QR De WhatsApp',
    items: [
      { q: '¿Este Generador de Código QR para WhatsApp es realmente gratis?', a: 'Sí. No necesitas registrarte, el QR no lleva marca de agua y no hay límite de cuántos puedes crear. Puedes usarlos comercialmente.' },
      { q: '¿El QR funciona con números personales y de WhatsApp Business?', a: 'Sí. El QR guarda un enlace wa.me, y wa.me abre la cuenta de WhatsApp registrada con ese número. Funciona con WhatsApp personal, con la app WhatsApp Business y con números en la API de WhatsApp Business.' },
      { q: '¿Puedo añadir un mensaje predefinido?', a: 'Sí. Escríbelo en el campo de mensaje (hasta 400 caracteres). Cuando alguien escanea el QR, el texto aparece en el campo de WhatsApp y solo tiene que tocar Enviar. Conviene mencionar el lugar, por ejemplo "Hola, vi tu QR en [lugar]".' },
      { q: '¿Puedo generar un QR para un grupo de WhatsApp?', a: 'No. Los enlaces wa.me solo funcionan con números individuales. Para obtener el QR de un grupo, ábrelo en WhatsApp, entra a la información del grupo, elige la opción de invitar mediante enlace y usa el código QR que aparece ahí.' },
      { q: '¿Funciona sin la app de WhatsApp instalada?', a: 'El celular que escanea el QR necesita tener WhatsApp para abrir el chat. Si alguien abre el enlace wa.me en una computadora, la página le ofrece seguir en WhatsApp Web o en la app de escritorio.' },
      { q: '¿En qué se diferencia el QR de un enlace wa.me?', a: 'El enlace wa.me es justo lo que contiene el QR. El QR es la versión escaneable de ese enlace, para lugares donde no se puede hacer clic: impresos, pantallas de TV, stickers, letreros. Esta página te da los dos: copia el enlace para tu sitio y descarga el QR para imprimir.' },
      { q: '¿El código QR de WhatsApp expira?', a: 'No. El QR guarda un enlace wa.me ligado a tu número, así que sigue funcionando mientras ese número esté activo en WhatsApp. No hay nada que renovar. Si cambias de número, necesitarás un QR nuevo.' },
      { q: '¿Puedo rastrear cuántas personas escanearon mi código QR?', a: 'No con esta herramienta. Los enlaces wa.me no registran escaneos. Para contarlos, necesitas un enlace corto de un servicio como Bitly o Rebrandly que cuente cada clic y redirija a tu enlace wa.me, y un QR hecho con ese enlace corto. Si usas Eazybe, los chats que llegan también quedan guardados en el contacto dentro de tu CRM.' },
    ],
  },
  cta: {
    badge: 'Más Allá Del QR',
    h2: '¿Necesitas Más Que Un Código QR?',
    subtitle:
      'Eazybe guarda cada chat de WhatsApp en tu CRM, así que la conversación que empezó con un escaneo queda en el registro del contacto, a la vista de tu equipo. Cuando nadie está en línea, un agente de IA puede responder y hacer las primeras preguntas de calificación. Funciona con HubSpot, Salesforce, Zoho y Pipedrive.',
    primary: 'Prueba Eazybe Gratis →',
    secondary: 'Agendar Demo',
    footnote: 'Prueba de 4 días · Sin tarjeta de crédito · Cancela cuando quieras',
  },
  generator: {
    formTitle: 'Genera tu código QR',
    numberLabel: 'Número de WhatsApp',
    countryAria: 'Código de país',
    phonePlaceholder: 'Número de teléfono',
    phoneAria: 'Número de teléfono',
    messageLabel: 'Mensaje predefinido',
    messageOptional: '(opcional)',
    messagePlaceholder: 'Hola, me gustaría saber más sobre tu producto.',
    messageCounter: '{count}/400. El cliente ve este mensaje cuando escanea el QR.',
    errorEmpty: 'Primero ingresa un número de WhatsApp.',
    errorShort: 'Ese número parece muy corto.',
    btnGenerate: 'Generar Código QR',
    outputTitle: 'Tu QR de WhatsApp',
    emptyState: 'Escribe un número de WhatsApp a la izquierda y tu QR aparecerá aquí.',
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
      'Ücretsiz WhatsApp QR kod oluşturucu. Hazır mesaj ekleyin, kodu PNG olarak indirin; baskıda, reklamlarda veya sitenizde kullanın. Kayıt gerekmez.',
    ogDescription: 'Sohbeti mesajınız yazılı halde açan bir WhatsApp QR kodu oluşturun. Ücretsiz PNG indirme, kayıt gerekmez.',
  },
  hero: {
    tag: 'ÜCRETSİZ ARAÇ · KAYIT YOK',
    h1Lead: '',
    h1Brand: 'WhatsApp',
    h1Rest: 'QR Kodunuzu',
    h1Highlight: 'Ücretsiz Oluşturun',
    subtitle:
      'WhatsApp numaranızı ve isterseniz bir açılış mesajı yazın. Müşteri QR kodu telefon kamerasıyla taradığında WhatsApp sizinle bir sohbet açar ve mesaj yazılı halde gelir. İnsanların sizi görüp bir bağlantıya dokunamadığı yerlerde işe yarar: broşürler, ambalajlar, afişler, salonun öbür ucundaki bir ekran.',
    cta: 'QR Kodu Oluştur →',
    footnote: 'Kayıt yok · Filigran yok · Her yerde kullanın',
  },
  preview: {
    title: 'QR Kodunuzu Oluşturun',
    numberLabel: 'WhatsApp Numarası (ülke koduyla)',
    messageLabel: 'Hazır Mesaj (Opsiyonel)',
    btnGenerate: 'QR Kodu Oluştur',
    btnExport: 'QR Kodu İndir',
    qrAlt: 'Örnek WhatsApp QR kodu',
  },
  tryItNow: {
    h2: 'Hemen Deneyin: WhatsApp İçin Ücretsiz QR Kod Oluşturun',
    subtitle: 'Ülke kodunu seçin, numarayı yazın, isterseniz bir mesaj ekleyin ve QR kodu PNG olarak indirin.',
  },
  useCases: {
    h2: 'WhatsApp QR Kodunuzu Nerede Kullanabilirsiniz?',
    subtitle: 'İnsanların işletmenizi gördüğü ama bir bağlantıya tıklayamadığı her yerde.',
    websiteTitle: 'Web sitenizde',
    websiteBody:
      'İletişim sayfanıza, alt bilgiye veya fiyat sayfanıza ekleyin. Bilgisayardan gezinen biri kodu telefonuyla tarar ve form doldurmak yerine WhatsApp üzerinden sohbete başlar.',
    printTitle: 'Basılı materyallerde',
    printBody:
      'Kartvizitler, broşürler, fişler, ambalajlar, mağaza tabelaları. Tarayan kişi doğrudan numaranızla açılmış bir sohbete düşer ve numarayı kağıttan yazmak zorunda kalmaz.',
    socialTitle: 'Sosyal medyada',
    socialBody:
      'Instagram hikayesinde, LinkedIn kapak görselinde veya bir YouTube videosunun bitiş ekranında kullanın. İzleyici bilgisayar ya da televizyon başındayken ve bağlantı tıklanamazken çok işe yarar.',
  },
  seo: {
    h2: 'WhatsApp QR Kodu Nedir?',
    p1:
      'WhatsApp QR kodu, görsele dönüştürülmüş bir wa.me bağlantısıdır. Kişi telefon kamerasını koda tutar, kamera bağlantıyı okur ve WhatsApp\'ı doğrudan sizin numaranızla bir sohbette açmayı önerir. Numaranızı yazması ya da önce sizi rehbere kaydetmesi gerekmez.',
    p2Pre: 'Bağlantı sabit bir formatı takip eder: ',
    p2Post:
      '. Bunu elle hazırlamanız gerekmez. Oluşturucu numaradaki boşlukları ve sembolleri siler, ülke kodunu ekler, mesajı URL için kodlar ve bağlantıyı indirebileceğiniz bir PNG\'ye çevirir. İsterseniz yalnızca bağlantıyı kopyalayıp bir butonda veya e-posta imzanızda kullanabilirsiniz.',
    h3: 'QR kod ne zaman bağlantıdan daha kullanışlı?',
    p3:
      'QR kod, kişinin dokunacak bir yeri olmadığında anlam kazanır. Elinde bir broşür vardır, bir afişin önünden geçer, YouTube videosunu televizyonda izler ya da fuardaki standınızın önünde durur. Bu anlarda telefon numarası yazmak zahmetlidir ve birçok kişi hiç uğraşmaz. Taramak ise birkaç saniye sürer.',
    p4Pre:
      'Click-to-WhatsApp reklamları veriyorsanız, QR kod reklamın ulaşamadığı yerleri kapatır: canlı yayın ekranları, podcast kapakları, gönderdiğiniz siparişlerin içindeki broşürler. WhatsApp sohbetlerini CRM\'inizle senkronize etmek için ',
    p4LinkText: 'Eazybe',
    p4Post:
      ' kullanıyorsanız, taramayla başlayan sohbetler de diğerleri gibi kişi kaydına işlenir ve ekibiniz hepsini aynı yerde görür.',
  },
  benefits: {
    h2Lead: 'Bir WhatsApp QR Kodu Neden',
    h2Em: 'İşe Yarar',
    subtitle:
      'Müşteriler küçük adımlarda vazgeçer: numara yazmak, kişi kaydetmek, bağlantınızı aramak. QR kod bu adımların hepsini atlar.',
    noInstallTitle: 'Kurulacak bir şey yok',
    noInstallBody:
      'Müşterilerinizin çoğu zaten WhatsApp kullanıyor. Tarama uygulamayı doğrudan açar; indirilecek bir şey ya da açılacak bir hesap yoktur.',
    prefilledTitle: 'Hazır mesaj',
    prefilledBody:
      'İlk cümleyi siz yazarsınız, müşteri onu metin kutusunda gönderilmeye hazır halde bulur. "Merhaba, menünüzü gördüm" veya "Demo bağlantısı rica ediyorum" gibi bir mesaj, kişinin nereden geldiğini ve ne istediğini baştan söyler.',
    conversionTitle: 'Daha az adım',
    conversionBody:
      'Sohbet açan bir QR kod yalnızca Gönder\'e bir dokunuş ister. Form açan bir QR kod ise önce ad, e-posta ve telefon ister. WhatsApp\'ınızı bir Yapay Zeka ajanı yanıtlıyorsa müşteri cevabı hemen alır.',
    freeTitle: 'Sonsuza kadar ücretsiz',
    freeBody: 'QR kodda filigran yok ve hesap açmanız gerekmiyor. İstediğiniz kadar oluşturun, ticari olarak da kullanın.',
  },
  benefitCards: {
    h2Lead: 'Tek Bir Taramanın',
    h2Em: 'Kazandırdıkları',
    scanTitle: 'Kiminle konuştuğunuzu bilirsiniz',
    scanBody:
      'Tarama gerçek bir WhatsApp sohbeti açar, böylece kişinin adını ve numarasını ilk mesajdan görürsünüz. Anonim bir form kaydının peşinden e-postayla koşmaktan çok daha kolaydır.',
    clickTitle: 'Müşterilerin zaten olduğu yer',
    clickBody:
      'Müşterileriniz WhatsApp\'ı gün içinde defalarca açıyor. Onlarla orada konuşunca yanıtınız gerçekten kullandıkları bir uygulamaya düşer. Sohbeti müşteri başlattığı için kimse "Kimsiniz?" diye sormak zorunda kalmaz.',
    leadsTitle: 'Basılı materyallerden ve reklamlardan lead',
    leadsBody:
      'QR kodu sipariş broşürlerine basın, bir Facebook reklam görseline ekleyin ya da Instagram biyografinize koyun. Her tarama, yanıt verebileceğiniz gerçek bir kişiyle sohbet başlatır.',
  },
  faq: {
    h2: 'WhatsApp QR Kodu Hakkında Sık Sorulan Sorular',
    items: [
      { q: 'Bu WhatsApp QR Kod Oluşturucu gerçekten ücretsiz mi?', a: 'Evet. Kayıt olmanız gerekmez, QR kodda filigran olmaz ve kaç tane oluşturacağınızın sınırı yoktur. Kodları ticari olarak kullanabilirsiniz.' },
      { q: 'QR kod hem kişisel hem WhatsApp Business numaralarında çalışır mı?', a: 'Evet. QR kod bir wa.me bağlantısı taşır ve wa.me, o numaraya kayıtlı WhatsApp hesabını açar. Kişisel WhatsApp, WhatsApp Business uygulaması ve WhatsApp Business API\'deki numaralar için geçerlidir.' },
      { q: 'Hazır bir mesaj ekleyebilir miyim?', a: 'Evet. Mesaj alanına yazın (en fazla 400 karakter). Biri QR kodu taradığında metin WhatsApp\'taki yazı alanında görünür ve yalnızca Gönder\'e dokunması yeterlidir. Mesajda yeri belirtmek işe yarar, örneğin "Merhaba, QR kodunuzu fuarda gördüm".' },
      { q: 'Bir WhatsApp grubu için QR oluşturabilir miyim?', a: 'Hayır. wa.me bağlantıları yalnızca tek tek telefon numaralarıyla çalışır. Bir grubun QR kodunu almak için WhatsApp\'ta grubu açın, grup bilgilerinden bağlantıyla davet etme seçeneğine girin ve oradaki QR kodu kullanın.' },
      { q: 'WhatsApp uygulaması yüklü değilse çalışır mı?', a: 'Sohbetin açılması için QR kodu tarayan telefonda WhatsApp yüklü olmalıdır. Biri wa.me bağlantısını bilgisayarda açarsa, sayfa WhatsApp Web veya masaüstü uygulamasıyla devam etmeyi önerir.' },
      { q: 'QR kodun wa.me bağlantısından farkı nedir?', a: 'wa.me bağlantısı, QR kodun içindeki şeyin ta kendisidir. QR kod bu bağlantının taranabilir halidir ve tıklanamayan yerler içindir: basılı materyaller, TV ekranları, etiketler, tabelalar. Bu sayfa ikisini de verir: bağlantıyı siteniz için kopyalayın, QR kodu baskı için indirin.' },
      { q: 'WhatsApp QR kodunun süresi dolar mı?', a: 'Hayır. QR kod numaranıza bağlı bir wa.me bağlantısı taşır, bu yüzden o numara WhatsApp\'ta aktif olduğu sürece çalışır. Yenilemeniz gereken bir şey yoktur. Numaranızı değiştirirseniz yeni bir QR kod gerekir.' },
      { q: 'QR kodumu kaç kişinin taradığını izleyebilir miyim?', a: 'Bu araçla hayır. wa.me bağlantıları taramaları kaydetmez. Saymak istiyorsanız Bitly veya Rebrandly gibi bir servisten, her tıklamayı kaydedip wa.me bağlantınıza yönlendiren kısa bir bağlantı almanız ve QR kodu bu kısa bağlantıdan oluşturmanız gerekir. Eazybe kullanıyorsanız gelen sohbetler CRM\'inizdeki kişi kaydına da kaydedilir.' },
    ],
  },
  cta: {
    badge: 'Daha Fazlası',
    h2: 'QR Koddan Fazlasına mı İhtiyacınız Var?',
    subtitle:
      'Eazybe her WhatsApp sohbetini CRM\'inize kaydeder; taramayla başlayan konuşma da kişi kaydında, ekibinizin görebileceği yerde durur. Kimse çevrimiçi değilken bir Yapay Zeka ajanı yanıt verebilir ve ilk niteleme sorularını sorabilir. HubSpot, Salesforce, Zoho ve Pipedrive ile çalışır.',
    primary: 'Eazybe\'yi Ücretsiz Deneyin →',
    secondary: 'Demo Planlayın',
    footnote: '4 gün ücretsiz · Kredi kartı gerekmez · İstediğiniz zaman iptal edin',
  },
  generator: {
    formTitle: 'QR kodunuzu oluşturun',
    numberLabel: 'WhatsApp numarası',
    countryAria: 'Ülke kodu',
    phonePlaceholder: 'Telefon numarası',
    phoneAria: 'Telefon numarası',
    messageLabel: 'Hazır mesaj',
    messageOptional: '(opsiyonel)',
    messagePlaceholder: 'Merhaba, ürününüz hakkında daha fazla bilgi almak istiyorum.',
    messageCounter: '{count}/400. Müşteri QR kodu taradığında bu mesajı görür.',
    errorEmpty: 'Önce bir WhatsApp telefon numarası girin.',
    errorShort: 'Bu telefon numarası çok kısa görünüyor.',
    btnGenerate: 'QR Kodu Oluştur',
    outputTitle: 'WhatsApp QR Kodunuz',
    emptyState: 'Soldaki alana bir WhatsApp numarası girin, QR kodunuz burada görünsün.',
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
