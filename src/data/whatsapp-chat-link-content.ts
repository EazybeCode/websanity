/**
 * All localized copy for /whatsapp-chat-link-generator. Same shape as
 * whatsapp-qr-content but the tool builds a wa.me CLICK-link (no QR rendering
 * required); the QR thumbnail in the hero is decorative only.
 */

export interface ChatLinkPageContent {
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
    btnCopy: string
    linkAlt: string
  }
  tryItNow: {
    h2: string
    subtitle: string
  }
  useCases: {
    h2: string
    subtitle: string
    emailTitle: string
    emailBody: string
    bioTitle: string
    bioBody: string
    adsTitle: string
    adsBody: string
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
    clickTitle: string
    clickBody: string
    everywhereTitle: string
    everywhereBody: string
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
    linkLabel: string
    htmlLabel: string
    btnCopyLink: string
    btnCopyHtml: string
    btnOpen: string
    copied: string
  }
  breadcrumb: {
    home: string
    current: string
  }
}

const en: ChatLinkPageContent = {
  meta: {
    title: 'Free WhatsApp Chat Link Generator with Pre-Filled Message | Eazybe',
    description:
      'Free WhatsApp chat link generator. Create a wa.me click-to-chat link with a pre-filled message, copy it, and paste it into emails, bios, ads, or websites. No signup, no watermark.',
    ogDescription: 'Make a WhatsApp click-to-chat link with a pre-filled message. Free, no signup, no watermark.',
  },
  hero: {
    tag: 'FREE TOOL · NO SIGNUP',
    h1Lead: 'Generate Your',
    h1Brand: 'WhatsApp',
    h1Rest: 'Chat Link',
    h1Highlight: 'For FREE Today!',
    subtitle:
      "Type your WhatsApp number and an opening message. The page builds a wa.me link. Paste it into an email signature, a bio, an ad — anywhere customers tap. WhatsApp opens with your message already typed, so they don't have to save your contact or copy a number off the screen.",
    cta: 'Create Chat Link →',
    footnote: 'No signup · No watermark · Use it anywhere',
  },
  preview: {
    title: 'Generate your chat link',
    numberLabel: 'WhatsApp Number (with country code)',
    messageLabel: 'Welcome Message (Optional)',
    btnGenerate: 'Generate Link',
    btnCopy: 'Copy Link',
    linkAlt: 'Sample WhatsApp chat link',
  },
  tryItNow: {
    h2: 'Create A Free WhatsApp Chat Link Try It Now',
    subtitle: 'Enter your WhatsApp number, set the pre-filled message, and copy the link.',
  },
  useCases: {
    h2: 'Where To Use Your WhatsApp Chat Link',
    subtitle: 'Anywhere a customer can tap, the wa.me link puts a chat one click away.',
    emailTitle: 'In email signatures',
    emailBody:
      'Add the link to your email signature, transactional emails, or newsletter footer. Recipients tap "Message us on WhatsApp" and the chat opens with your line already filled in.',
    bioTitle: 'In bios and link-in-bio pages',
    bioBody:
      'Drop it into Instagram, TikTok, LinkedIn, or X bios, and into Linktree-style pages. Followers reach you in WhatsApp instead of through a contact form they\'ll abandon.',
    adsTitle: 'In ads and landing pages',
    adsBody:
      'Use the link as the destination URL for Click-to-WhatsApp ads, Google Ads, button CTAs, popups, and live chat fallbacks. One tap moves the visitor straight into a real conversation.',
  },
  seo: {
    h2: 'What Is A WhatsApp Chat Link?',
    p1:
      'A WhatsApp chat link (also called a click-to-chat link, or a wa.me link) is a URL that opens WhatsApp directly at your number. Someone taps it on their phone and lands in the right conversation, with your starter message already filled in if you set one. They never type the number.',
    p2Pre: 'The link follows a fixed format: ',
    p2Post:
      '. The generator handles the formatting for you. It strips the plus sign, URL-encodes the message, and validates the digits before returning a clean, shareable URL. You type a number and a starter message. The page gives you back a link.',
    h3: 'Where The Format Earns Its Keep',
    p3:
      'Chat links work best where the customer is already on a tappable screen. An email signature. An Instagram bio. A Google ad. A "Talk to us" button on a pricing page. The link turns those into one-tap chats. QR codes do the same job for places customers can only see, not click — print, packaging, posters.',
    p4Pre:
      "For Click-to-WhatsApp ads, the wa.me link is the destination URL — Meta and Google's ad managers accept it directly. The same link works on landing-page CTAs, sticky chat buttons, in-app help menus, and abandoned-cart emails. If ",
    p4LinkText: 'Eazybe',
    p4Post:
      ' is sitting behind that, the click becomes a tracked conversation in HubSpot, Salesforce, or Zoho instead of an anonymous open.',
  },
  benefits: {
    h2Lead: 'Why A WhatsApp Chat Link',
    h2Em: 'Converts',
    subtitle:
      "Click-to-chat links cut the friction that usually kills inbound. The customer doesn't have to type a number, save you as a contact, or search for your handle.",
    noInstallTitle: 'One tap, zero friction',
    noInstallBody:
      'WhatsApp is on around 2 billion phones. The link opens straight into the app — no download, no signup, no form to fill before the first question.',
    prefilledTitle: 'Pre-filled message',
    prefilledBody:
      'Set the opening message yourself. Customers see it pre-filled, so the conversation starts with the right context. Examples: "Hi, I saw your ad" or "Send me a demo link".',
    conversionTitle: 'Higher conversion than forms',
    conversionBody:
      "A link that opens a chat tends to convert better than a button that opens a form. You're putting the customer in front of a person (or an AI agent) in one tap, instead of in an inbox where they wait for an email reply.",
    freeTitle: 'Free forever',
    freeBody: 'No watermark, no signup, no usage cap. Generate as many chat links as you want and use them commercially.',
  },
  benefitCards: {
    h2Lead: 'Get The WhatsApp Chat Link Generator Free —',
    h2Em: "Benefits You Can't Ignore!",
    clickTitle: 'One click straight into WhatsApp',
    clickBody:
      'Put the link on your website, in ads, or in your email signature. Clicks land directly in WhatsApp where the customer can see who they are talking to — so leads arrive with full context instead of an anonymous form fill.',
    everywhereTitle: 'Works everywhere a link works',
    everywhereBody:
      'Email, SMS, social bios, ad creatives, button URLs, app deep-links. Anywhere a hyperlink works, the chat link works. And since most customers open WhatsApp daily anyway, the click lands somewhere they actually check.',
    leadsTitle: 'Capture leads with one tap',
    leadsBody:
      'Drop the link into Facebook ad creatives, paste it into your Instagram bio, or wire it to a "Talk to sales" button. One tap puts a prospect into a real conversation with you instead of a form.',
  },
  faq: {
    h2: 'WhatsApp Chat Link Questions, Answered',
    items: [
      { q: 'Is this WhatsApp Chat Link Generator really free?', a: 'Yes. There is no signup, no watermark, and no rate limit on how many links you can make. You can use the chat link commercially anywhere you want.' },
      { q: 'Will the link work on both Personal and WhatsApp Business numbers?', a: 'Yes. The wa.me link opens whichever WhatsApp account is registered to that phone number. Personal, Business App, and Business API all work.' },
      { q: 'Can I add a pre-filled message?', a: 'Yes. Type the message you want customers to see and it pre-fills their input box so they only need to tap Send. Useful for setting context (example: "Hi, I saw your ad — tell me more").' },
      { q: 'Can I generate a chat link for a WhatsApp group?', a: 'No. The wa.me format only supports individual phone numbers. Group invite links have to be exported from inside WhatsApp itself (Group info → Invite via link).' },
      { q: 'Does this work without the WhatsApp app installed?', a: 'On mobile, the device needs WhatsApp installed to open the chat. On desktop, the link redirects to WhatsApp Web in the browser, so a desktop without the app still works.' },
      { q: 'How is this different from a WhatsApp QR code?', a: 'Same destination — both point at a wa.me URL. The link is for digital surfaces customers can tap (email, ads, bios). The QR is for offline surfaces where customers have to use a camera (print, packaging, posters).' },
      { q: 'Does the WhatsApp chat link expire?', a: 'No. The wa.me link is tied to your phone number, so it stays valid for as long as that number is on WhatsApp. Create it once and reuse it for years. There is no renewal step and no token to expire.' },
      { q: 'Can I track how many people clicked my chat link?', a: "Not directly — wa.me links don't expose click analytics. To track clicks, route the link through a short-link service like Bitly or Rebrandly that records every click before redirecting. Eazybe also captures the inbound WhatsApp chat and writes the source back to your CRM if you need attribution all the way to revenue." },
      { q: 'Does the pre-filled message support emojis and line breaks?', a: "Emojis work — paste them straight into the message field and they end up in the WhatsApp input box. Line breaks are harder. wa.me strips raw newlines, but putting %0A in the URL forces a break in most WhatsApp clients. The simplest fix is to keep the opener short and let the customer reply with detail." },
      { q: 'Can I shorten the wa.me link with Bitly or my own domain?', a: "Yes. Bitly, Rebrandly, Short.io, and other shorteners accept the wa.me URL and give you a shorter, brandable version. That also gives you click tracking, which the raw link doesn't have. With your own domain you can also set up a 301 from yourbrand.com/whatsapp to the wa.me URL." },
      { q: 'Will the customer see my phone number when they click the link?', a: "Yes. Once they open the chat, your number sits in the conversation header exactly as it would if they messaged you any other way. If you don't want your personal mobile out there, set the link up with a WhatsApp Business number instead." },
      { q: 'Can I route the link to a team, or rotate between multiple numbers?', a: "Not directly — a wa.me link points at one number. To route across a team you have two practical options. The first is WhatsApp Business API with a shared inbox (which is what Eazybe runs on). The second is a third-party router that catches the click and redirects to whichever rep is on rotation." },
    ],
  },
  cta: {
    badge: 'Ready For More?',
    h2: 'Want More Than Just A Link?',
    subtitle:
      "Eazybe captures every inbound WhatsApp chat into your CRM. The lead gets scored before your reps see it, and our AI keeps the conversation going when nobody's online. Works with HubSpot, Salesforce, and Zoho.",
    primary: 'Try Eazybe Free →',
    secondary: 'Book a Demo',
    footnote: '7-day free trial · No credit card required · Cancel anytime',
  },
  generator: {
    formTitle: 'Generate your chat link',
    numberLabel: 'WhatsApp number',
    countryAria: 'Country code',
    phonePlaceholder: 'Phone number',
    phoneAria: 'Phone number',
    messageLabel: 'Pre-filled message',
    messageOptional: '(optional)',
    messagePlaceholder: "Hi — I'd like to know more about your product.",
    messageCounter: '{count}/400 — shown to the customer when they tap the link.',
    errorEmpty: 'Enter a WhatsApp phone number first.',
    errorShort: 'That phone number looks too short.',
    btnGenerate: 'Generate Chat Link',
    outputTitle: 'Your WhatsApp Chat Link',
    emptyState: 'Enter a WhatsApp number on the left to generate a shareable chat link.',
    linkLabel: 'Shareable link',
    htmlLabel: 'HTML snippet',
    btnCopyLink: 'Copy Link',
    btnCopyHtml: 'Copy HTML',
    btnOpen: 'Open In WhatsApp',
    copied: '✓ Copied',
  },
  breadcrumb: {
    home: 'Home',
    current: 'WhatsApp Chat Link Generator',
  },
}

const br: ChatLinkPageContent = {
  meta: {
    title: 'Gerador Gratuito de Link de Conversa do WhatsApp com Mensagem Pronta | Eazybe',
    description:
      'Gerador gratuito de link de conversa do WhatsApp. Crie um link wa.me click-to-chat com mensagem pronta, copie e cole em e-mails, bios, anúncios ou sites. Sem cadastro, sem marca d\'água.',
    ogDescription: 'Crie um link click-to-chat do WhatsApp com mensagem pronta. Grátis, sem cadastro, sem marca d\'água.',
  },
  hero: {
    tag: 'FERRAMENTA GRÁTIS · SEM CADASTRO',
    h1Lead: 'Gere Seu',
    h1Brand: 'WhatsApp',
    h1Rest: 'Link de Conversa',
    h1Highlight: 'GRÁTIS hoje!',
    subtitle:
      'Digite seu número do WhatsApp e uma mensagem de abertura. A página gera um link wa.me que você pode colar em e-mails, anúncios, bios sociais, sites e SMS. Os clientes tocam uma vez e o WhatsApp abre com sua mensagem já preenchida — sem digitar número, sem salvar contato.',
    cta: 'Criar Link de Conversa →',
    footnote: 'Sem cadastro · Sem marca d\'água · Use em qualquer lugar',
  },
  preview: {
    title: 'Gere seu link de conversa',
    numberLabel: 'Número do WhatsApp (com código do país)',
    messageLabel: 'Mensagem de Boas-vindas (Opcional)',
    btnGenerate: 'Gerar Link',
    btnCopy: 'Copiar Link',
    linkAlt: 'Link de conversa de exemplo do WhatsApp',
  },
  tryItNow: {
    h2: 'Crie Um Link De Conversa Grátis Para WhatsApp Experimente Agora',
    subtitle: 'Digite seu número do WhatsApp, defina a mensagem pronta e copie o link.',
  },
  useCases: {
    h2: 'Onde Usar Seu Link De Conversa Do WhatsApp',
    subtitle: 'Em qualquer lugar onde o cliente possa tocar, o link wa.me coloca uma conversa a um clique de distância.',
    emailTitle: 'Em assinaturas de e-mail',
    emailBody:
      'Adicione o link à sua assinatura de e-mail, e-mails transacionais ou rodapé da newsletter. Destinatários tocam em "Fale conosco no WhatsApp" e a conversa abre com sua mensagem já preenchida.',
    bioTitle: 'Em bios e páginas link-in-bio',
    bioBody:
      'Coloque na bio do Instagram, TikTok, LinkedIn ou X, e em páginas estilo Linktree. Seguidores te encontram no WhatsApp em vez de um formulário de contato que vão abandonar.',
    adsTitle: 'Em anúncios e páginas de destino',
    adsBody:
      'Use o link como URL de destino para anúncios de Click-to-WhatsApp, Google Ads, CTAs em botões, popups e fallbacks de chat ao vivo. Um toque leva o visitante direto para uma conversa real.',
  },
  seo: {
    h2: 'O Que É Um Link De Conversa Do WhatsApp?',
    p1:
      'Um link de conversa do WhatsApp — também chamado de link click-to-chat ou link wa.me — é uma URL que abre o WhatsApp diretamente no seu número. Quando alguém clica no celular, o WhatsApp inicia e cai na conversa certa, com sua mensagem inicial preenchida se você definir uma. Sem digitar o número. Sem precisar salvar seu contato antes. Sem copiar e colar dígitos.',
    p2Pre: 'O link segue um formato fixo: ',
    p2Post:
      '. O gerador cuida da formatação para você. Ele remove o sinal de mais, codifica a mensagem na URL e valida os dígitos antes de devolver uma URL limpa e compartilhável. Você digita um número e uma mensagem inicial. A página te dá um link.',
    h3: 'Onde o formato vale a pena',
    p3:
      'Um link de conversa do WhatsApp é mais útil quando o cliente já está em uma tela que pode tocar. Uma assinatura de e-mail. Uma bio do Instagram. Um anúncio do Google. Um botão "Fale conosco" na sua página de preços. Um link de conversa transforma um ponto de contato existente em um chat de 1 clique, enquanto um QR code é para superfícies offline como impresso, embalagens e cartazes.',
    p4Pre:
      'Para equipes rodando anúncios de Click-to-WhatsApp, o link wa.me É a URL de destino — gerenciadores de anúncios do Meta e do Google o aceitam nativamente. Use em CTAs de hero de landing page, botões de chat fixos, menus de ajuda no app e e-mails de carrinho abandonado. Se você está usando ',
    p4LinkText: 'Eazybe',
    p4Post:
      ' para capturar cada conversa de WhatsApp recebida no seu CRM, o link de conversa é o que fecha o ciclo entre o clique e uma conversa rastreada no HubSpot, Salesforce ou Zoho.',
  },
  benefits: {
    h2Lead: 'Por Que Um Link De Conversa Do WhatsApp',
    h2Em: 'Converte',
    subtitle:
      'Links click-to-chat eliminam as etapas onde o cliente normalmente desiste: digitar o número, salvar um contato, procurar seu handle.',
    noInstallTitle: 'Um toque, atrito zero',
    noInstallBody:
      'O WhatsApp já está em aproximadamente 2 bilhões de celulares. O link abre o WhatsApp diretamente. Nada para o cliente baixar, nenhuma tela de cadastro e nenhum formulário a preencher antes de fazer a primeira pergunta.',
    prefilledTitle: 'Mensagem pronta',
    prefilledBody:
      'Defina a mensagem de abertura você mesmo. Os clientes a veem pré-preenchida, então a conversa começa com o contexto certo. Exemplos: "Olá, vi seu anúncio" ou "Me envie um link de demonstração".',
    conversionTitle: 'Maior conversão que formulários',
    conversionBody:
      'Um link wa.me que abre uma conversa converte mais que um botão que abre um formulário. Os clientes chegam a um humano ou agente de IA em um toque em vez de esperar uma resposta por e-mail.',
    freeTitle: 'Grátis para sempre',
    freeBody: 'Sem marca d\'água, sem cadastro, sem limite de uso. Gere quantos links de conversa quiser e use comercialmente.',
  },
  benefitCards: {
    h2Lead: 'Use O Gerador De Link De Conversa Do WhatsApp Grátis —',
    h2Em: 'Benefícios Que Você Não Pode Ignorar!',
    clickTitle: 'Um clique direto no WhatsApp',
    clickBody:
      'Coloque o link no seu site, em anúncios ou na sua assinatura de e-mail. Os cliques caem direto no WhatsApp onde o cliente vê com quem está falando — então os leads chegam com contexto completo em vez de um formulário anônimo.',
    everywhereTitle: 'Funciona onde um link funciona',
    everywhereBody:
      'E-mail, SMS, bios sociais, criativos de anúncios, URLs de botão, deep-links de app, QR codes que resolvem para o mesmo link. Onde um hyperlink funciona, o link de conversa funciona — e os clientes já abrem o WhatsApp todo dia.',
    leadsTitle: 'Capte leads com um toque',
    leadsBody:
      'Coloque o link em criativos de anúncios do Facebook, cole na sua bio do Instagram ou ligue a um botão "Fale com vendas". Um toque coloca o prospect em uma conversa real com você em vez de em um formulário.',
  },
  faq: {
    h2: 'Perguntas Sobre Link De Conversa Do WhatsApp, Respondidas',
    items: [
      { q: 'Este Gerador de Link de Conversa do WhatsApp é realmente grátis?', a: 'Sim. Não há cadastro, nem marca d\'água, e nem limite de quantos links você pode criar. Você pode usar o link comercialmente em qualquer lugar.' },
      { q: 'O link funciona em números Pessoal e WhatsApp Business?', a: 'Sim. O link wa.me abre qualquer conta do WhatsApp registrada naquele número. Pessoal, Business App e Business API funcionam.' },
      { q: 'Posso adicionar uma mensagem pré-preenchida?', a: 'Sim. Digite a mensagem que você quer que os clientes vejam e ela preenche a caixa de entrada deles, então só precisam tocar em Enviar. Útil para definir contexto (exemplo: "Olá, vi seu anúncio — me conta mais").' },
      { q: 'Posso gerar um link de conversa para um grupo do WhatsApp?', a: 'Não. O formato wa.me só suporta números individuais. Links de convite de grupo precisam ser exportados de dentro do próprio WhatsApp (Info do grupo → Convidar por link).' },
      { q: 'Isso funciona sem o aplicativo do WhatsApp instalado?', a: 'No celular, o aparelho precisa ter o WhatsApp instalado para abrir a conversa. No computador, o link redireciona para o WhatsApp Web no navegador, então um desktop sem o app ainda funciona.' },
      { q: 'Qual a diferença disso para um QR code do WhatsApp?', a: 'Mesmo destino — ambos apontam para uma URL wa.me. O link é para superfícies digitais que o cliente pode tocar (e-mail, anúncios, bios). O QR é para superfícies offline onde o cliente precisa usar uma câmera (impresso, embalagens, cartazes).' },
      { q: 'O link de conversa do WhatsApp expira?', a: 'Não. O link wa.me é ligado ao seu número, então fica válido enquanto aquele número estiver no WhatsApp. Crie uma vez e reuse por anos. Não há etapa de renovação nem token para expirar.' },
      { q: 'Posso rastrear quantas pessoas clicaram no meu link?', a: 'Não diretamente — links wa.me não expõem analytics de clique. Para rastrear cliques, passe o link por um encurtador como Bitly ou Rebrandly que registra cada clique antes do redirecionamento. O Eazybe também captura a conversa de WhatsApp recebida e escreve a origem de volta no seu CRM se você precisa de atribuição até a receita.' },
      { q: 'A mensagem pré-preenchida aceita emojis e quebras de linha?', a: 'Emojis funcionam — basta colar direto no campo de mensagem que eles aparecem na caixa de entrada do WhatsApp. Quebras de linha são mais complicadas. O wa.me remove quebras brutas, mas colocar %0A na URL força uma quebra na maioria dos clientes WhatsApp. O mais simples é manter a abertura curta e deixar o cliente responder com detalhe.' },
      { q: 'Posso encurtar o link wa.me com Bitly ou meu próprio domínio?', a: 'Sim. Bitly, Rebrandly, Short.io e outros encurtadores aceitam a URL wa.me e devolvem uma versão mais curta e com a sua marca. Eles também dão rastreamento de cliques, que o link puro não tem. Com seu próprio domínio dá para configurar um 301 de seudominio.com/whatsapp para a URL wa.me.' },
      { q: 'O cliente vê meu número de telefone quando clica no link?', a: 'Sim. Depois que ele abre a conversa, seu número aparece no cabeçalho do chat, igualzinho a se ele tivesse te mandado mensagem por qualquer outro caminho. Se você não quer expor seu celular pessoal, configure o link com um número do WhatsApp Business.' },
      { q: 'Posso direcionar o link para um time ou alternar entre vários números?', a: 'Não diretamente — um link wa.me aponta para um único número. Para distribuir entre um time você tem duas opções práticas. A primeira é WhatsApp Business API com uma caixa de entrada compartilhada (que é o que o Eazybe roda). A segunda é um serviço de roteamento que intercepta o clique e redireciona para o vendedor da vez.' },
    ],
  },
  cta: {
    badge: 'Quer Mais?',
    h2: 'Quer Mais Que Só Um Link?',
    subtitle:
      'O Eazybe captura cada conversa de WhatsApp recebida no seu CRM. O lead é qualificado antes dos seus vendedores verem, e nossa IA mantém a conversa quando ninguém está online. Funciona com HubSpot, Salesforce e Zoho.',
    primary: 'Teste o Eazybe Grátis →',
    secondary: 'Agendar Demo',
    footnote: '7 dias grátis · Sem cartão de crédito · Cancele quando quiser',
  },
  generator: {
    formTitle: 'Gere seu link de conversa',
    numberLabel: 'Número do WhatsApp',
    countryAria: 'Código do país',
    phonePlaceholder: 'Número de telefone',
    phoneAria: 'Número de telefone',
    messageLabel: 'Mensagem pronta',
    messageOptional: '(opcional)',
    messagePlaceholder: 'Olá — gostaria de saber mais sobre seu produto.',
    messageCounter: '{count}/400 — mostrada ao cliente quando ele tocar no link.',
    errorEmpty: 'Digite um número de WhatsApp primeiro.',
    errorShort: 'Esse número parece curto demais.',
    btnGenerate: 'Gerar Link De Conversa',
    outputTitle: 'Seu Link De Conversa Do WhatsApp',
    emptyState: 'Digite um número do WhatsApp à esquerda para gerar um link de conversa.',
    linkLabel: 'Link compartilhável',
    htmlLabel: 'Snippet HTML',
    btnCopyLink: 'Copiar Link',
    btnCopyHtml: 'Copiar HTML',
    btnOpen: 'Abrir No WhatsApp',
    copied: '✓ Copiado',
  },
  breadcrumb: {
    home: 'Início',
    current: 'Gerador de Link de Conversa do WhatsApp',
  },
}

const es: ChatLinkPageContent = {
  meta: {
    title: 'Generador Gratuito de Enlace de Chat de WhatsApp con Mensaje Predefinido | Eazybe',
    description:
      'Generador gratuito de enlace de chat de WhatsApp. Crea un enlace wa.me click-to-chat con mensaje predefinido, cópialo y pégalo en correos, bios, anuncios o sitios web. Sin registro, sin marca de agua.',
    ogDescription: 'Crea un enlace click-to-chat de WhatsApp con mensaje predefinido. Gratis, sin registro, sin marca de agua.',
  },
  hero: {
    tag: 'HERRAMIENTA GRATIS · SIN REGISTRO',
    h1Lead: 'Genera Tu',
    h1Brand: 'WhatsApp',
    h1Rest: 'Enlace de Chat',
    h1Highlight: '¡GRATIS hoy!',
    subtitle:
      'Escribe tu número de WhatsApp y un mensaje de apertura. La página genera un enlace wa.me que puedes pegar en correos, anuncios, bios sociales, sitios web y SMS. Los clientes lo tocan una vez y WhatsApp se abre con tu mensaje ya escrito — sin escribir el número, sin guardar el contacto.',
    cta: 'Crear Enlace de Chat →',
    footnote: 'Sin registro · Sin marca de agua · Úsalo donde quieras',
  },
  preview: {
    title: 'Genera tu enlace de chat',
    numberLabel: 'Número de WhatsApp (con código de país)',
    messageLabel: 'Mensaje de Bienvenida (Opcional)',
    btnGenerate: 'Generar Enlace',
    btnCopy: 'Copiar Enlace',
    linkAlt: 'Enlace de chat de WhatsApp de muestra',
  },
  tryItNow: {
    h2: 'Crea Un Enlace De Chat Gratis Para WhatsApp Pruébalo Ahora',
    subtitle: 'Ingresa tu número de WhatsApp, define el mensaje predefinido y copia el enlace.',
  },
  useCases: {
    h2: 'Dónde Usar Tu Enlace De Chat De WhatsApp',
    subtitle: 'Donde sea que un cliente pueda tocar, el enlace wa.me pone una conversación a un clic de distancia.',
    emailTitle: 'En firmas de correo',
    emailBody:
      'Añade el enlace a tu firma de correo, correos transaccionales o pie de newsletter. Los destinatarios tocan "Escríbenos por WhatsApp" y la conversación abre con tu mensaje ya escrito.',
    bioTitle: 'En bios y páginas link-in-bio',
    bioBody:
      'Ponlo en la bio de Instagram, TikTok, LinkedIn o X, y en páginas tipo Linktree. Los seguidores te llegan en WhatsApp en lugar de a un formulario de contacto que van a abandonar.',
    adsTitle: 'En anuncios y páginas de destino',
    adsBody:
      'Usa el enlace como URL de destino para anuncios Click-to-WhatsApp, Google Ads, CTAs en botones, popups y respaldos de chat en vivo. Un toque lleva al visitante directo a una conversación real.',
  },
  seo: {
    h2: '¿Qué Es Un Enlace De Chat De WhatsApp?',
    p1:
      'Un enlace de chat de WhatsApp — también llamado enlace click-to-chat o enlace wa.me — es una URL que abre WhatsApp directamente en tu número. Cuando alguien lo toca desde un teléfono, WhatsApp se lanza y cae en la conversación correcta, con tu mensaje inicial precargado si lo configuraste. Sin escribir el número. Sin guardar tu contacto primero. Sin copiar y pegar dígitos.',
    p2Pre: 'El enlace sigue un formato fijo: ',
    p2Post:
      '. El generador se encarga del formato por ti. Quita el signo de más, codifica el mensaje en la URL y valida los dígitos antes de devolverte una URL limpia y compartible. Escribes un número y un mensaje inicial. La página te devuelve un enlace.',
    h3: 'Cuándo el formato vale la pena',
    p3:
      'Un enlace de chat de WhatsApp es más útil cuando el cliente ya está en una pantalla que puede tocar. Una firma de correo. Una bio de Instagram. Un anuncio de Google. Un botón "Habla con nosotros" en tu página de precios. Un enlace de chat convierte un punto de contacto existente en una conversación de 1 clic, mientras que un código QR es para superficies offline como impreso, embalajes y carteles.',
    p4Pre:
      'Para equipos que corren anuncios Click-to-WhatsApp, el enlace wa.me ES la URL de destino — los administradores de anuncios de Meta y Google lo aceptan de forma nativa. Úsalo en CTAs hero de landing pages, botones de chat fijos, menús de ayuda en la app y correos de carrito abandonado. Si estás usando ',
    p4LinkText: 'Eazybe',
    p4Post:
      ' para capturar cada chat de WhatsApp entrante en tu CRM, el enlace de chat es lo que cierra el ciclo entre el clic y una conversación rastreada en HubSpot, Salesforce o Zoho.',
  },
  benefits: {
    h2Lead: 'Por Qué Un Enlace De Chat De WhatsApp',
    h2Em: 'Convierte',
    subtitle:
      'Los enlaces click-to-chat quitan los pasos donde los clientes suelen rendirse: escribir un número, guardar un contacto, buscar tu handle.',
    noInstallTitle: 'Un toque, cero fricción',
    noInstallBody:
      'WhatsApp ya está en unos 2 mil millones de teléfonos. El enlace abre WhatsApp directamente. Nada que descargar, ninguna pantalla de registro y ningún formulario que llenar antes de hacer la primera pregunta.',
    prefilledTitle: 'Mensaje predefinido',
    prefilledBody:
      'Define el mensaje de apertura tú mismo. Los clientes lo ven precargado, así la conversación arranca con el contexto correcto. Ejemplos: "Hola, vi tu anuncio" o "Envíame un link de demo".',
    conversionTitle: 'Mayor conversión que los formularios',
    conversionBody:
      'Un enlace wa.me que abre un chat convierte más que un botón que abre un formulario. Los clientes llegan a un humano o a un agente de IA en un toque en lugar de esperar una respuesta por correo.',
    freeTitle: 'Gratis para siempre',
    freeBody: 'Sin marca de agua, sin registro, sin límite de uso. Genera todos los enlaces de chat que quieras y úsalos comercialmente.',
  },
  benefitCards: {
    h2Lead: 'Usa El Generador De Enlace De Chat De WhatsApp Gratis —',
    h2Em: '¡Beneficios Que No Puedes Ignorar!',
    clickTitle: 'Un clic directo en WhatsApp',
    clickBody:
      'Pon el enlace en tu sitio, en tus anuncios o en tu firma de correo. Los clics caen directo en WhatsApp donde el cliente puede ver con quién habla — así los leads llegan con contexto completo en lugar de un formulario anónimo.',
    everywhereTitle: 'Funciona donde funcione un enlace',
    everywhereBody:
      'Correo, SMS, bios sociales, creativos de anuncios, URLs de botón, deep-links de app, códigos QR que resuelven al mismo enlace. Donde un hyperlink funciona, el enlace de chat funciona — y los clientes ya revisan WhatsApp todos los días.',
    leadsTitle: 'Captura leads con un toque',
    leadsBody:
      'Pon el enlace en creativos de anuncios de Facebook, pégalo en tu bio de Instagram, o conéctalo a un botón "Habla con ventas". Un toque pone al prospecto en una conversación real contigo en lugar de en un formulario.',
  },
  faq: {
    h2: 'Preguntas Sobre Enlace De Chat De WhatsApp, Respondidas',
    items: [
      { q: '¿Este Generador de Enlace de Chat de WhatsApp es realmente gratis?', a: 'Sí. No hay registro, ni marca de agua, ni límite de cuántos enlaces puedes crear. Puedes usar el enlace comercialmente donde quieras.' },
      { q: '¿El enlace funciona en números Personal y WhatsApp Business?', a: 'Sí. El enlace wa.me abre la cuenta de WhatsApp registrada con ese número. Personal, Business App y Business API funcionan.' },
      { q: '¿Puedo añadir un mensaje predefinido?', a: 'Sí. Escribe el mensaje que quieres que los clientes vean y se precarga en su caja de entrada, así solo tienen que tocar Enviar. Útil para dar contexto (ejemplo: "Hola, vi tu anuncio — cuéntame más").' },
      { q: '¿Puedo generar un enlace de chat para un grupo de WhatsApp?', a: 'No. El formato wa.me solo soporta números individuales. Los enlaces de invitación a grupo deben exportarse desde dentro del propio WhatsApp (Info del grupo → Invitar por enlace).' },
      { q: '¿Esto funciona sin la app de WhatsApp instalada?', a: 'En móvil, el dispositivo necesita WhatsApp instalado para abrir el chat. En escritorio, el enlace redirige a WhatsApp Web en el navegador, así un escritorio sin la app sigue funcionando.' },
      { q: '¿En qué se diferencia esto de un código QR de WhatsApp?', a: 'Mismo destino — ambos apuntan a una URL wa.me. El enlace es para superficies digitales que el cliente puede tocar (correo, anuncios, bios). El QR es para superficies offline donde el cliente tiene que usar una cámara (impreso, embalajes, carteles).' },
      { q: '¿El enlace de chat de WhatsApp expira?', a: 'No. El enlace wa.me está ligado a tu número, así que es válido mientras ese número esté en WhatsApp. Créalo una vez y reúsalo por años. No hay paso de renovación ni token que expire.' },
      { q: '¿Puedo rastrear cuántas personas hicieron clic en mi enlace?', a: 'No directamente — los enlaces wa.me no exponen analíticas de clic. Para rastrear, pasa el enlace por un acortador como Bitly o Rebrandly que registre cada clic antes de redirigir. Eazybe también captura el chat de WhatsApp entrante y escribe el origen de vuelta en tu CRM si necesitas atribución hasta el ingreso.' },
      { q: '¿El mensaje predefinido acepta emojis y saltos de línea?', a: 'Los emojis funcionan — pégalos directo en el campo del mensaje y aparecen en la caja de entrada de WhatsApp. Los saltos de línea son más quisquillosos. wa.me elimina los saltos crudos, pero poner %0A en la URL fuerza un salto en la mayoría de clientes de WhatsApp. Lo más sencillo es dejar la apertura corta y que el cliente responda con detalle.' },
      { q: '¿Puedo acortar el enlace wa.me con Bitly o mi propio dominio?', a: 'Sí. Bitly, Rebrandly, Short.io y otros acortadores aceptan la URL wa.me y te devuelven una versión más corta y con tu marca. También dan tracking de clics, que el enlace puro no tiene. Con tu propio dominio puedes montar un 301 desde tudominio.com/whatsapp a la URL wa.me.' },
      { q: '¿El cliente ve mi número de teléfono al hacer clic en el enlace?', a: 'Sí. Una vez que abre el chat, tu número aparece en la cabecera de la conversación, igual que si te hubiera escrito por cualquier otra vía. Si no quieres exponer tu móvil personal, monta el enlace con un número de WhatsApp Business.' },
      { q: '¿Puedo dirigir el enlace a un equipo o rotar entre varios números?', a: 'No directamente — un enlace wa.me apunta a un único número. Para repartir entre un equipo tienes dos opciones prácticas. La primera es WhatsApp Business API con una bandeja compartida (que es sobre lo que corre Eazybe). La segunda es un servicio de routing que intercepta el clic y redirige al rep que toque por rotación.' },
    ],
  },
  cta: {
    badge: '¿Quieres Más?',
    h2: '¿Quieres Más Que Solo Un Enlace?',
    subtitle:
      'Eazybe captura cada chat entrante de WhatsApp en tu CRM. El lead se califica antes de que tus reps lo vean y nuestra IA mantiene la conversación cuando nadie está en línea. Funciona con HubSpot, Salesforce y Zoho.',
    primary: 'Prueba Eazybe Gratis →',
    secondary: 'Agendar Demo',
    footnote: 'Prueba de 7 días · Sin tarjeta de crédito · Cancela cuando quieras',
  },
  generator: {
    formTitle: 'Genera tu enlace de chat',
    numberLabel: 'Número de WhatsApp',
    countryAria: 'Código de país',
    phonePlaceholder: 'Número de teléfono',
    phoneAria: 'Número de teléfono',
    messageLabel: 'Mensaje predefinido',
    messageOptional: '(opcional)',
    messagePlaceholder: 'Hola — me gustaría saber más sobre tu producto.',
    messageCounter: '{count}/400 — se muestra al cliente cuando toca el enlace.',
    errorEmpty: 'Ingresa primero un número de WhatsApp.',
    errorShort: 'Ese número parece muy corto.',
    btnGenerate: 'Generar Enlace De Chat',
    outputTitle: 'Tu Enlace De Chat De WhatsApp',
    emptyState: 'Ingresa un número de WhatsApp a la izquierda para generar un enlace de chat.',
    linkLabel: 'Enlace compartible',
    htmlLabel: 'Fragmento HTML',
    btnCopyLink: 'Copiar Enlace',
    btnCopyHtml: 'Copiar HTML',
    btnOpen: 'Abrir En WhatsApp',
    copied: '✓ Copiado',
  },
  breadcrumb: {
    home: 'Inicio',
    current: 'Generador de Enlace de Chat de WhatsApp',
  },
}

const tr: ChatLinkPageContent = {
  meta: {
    title: 'Ücretsiz WhatsApp Sohbet Linki Oluşturucu Önceden Yazılmış Mesajla | Eazybe',
    description:
      'Ücretsiz WhatsApp sohbet linki oluşturucu. Önceden yazılmış mesajla wa.me click-to-chat linki yapın, kopyalayın ve e-postalara, biyografilere, reklamlara veya web sitelerine yapıştırın. Kayıt yok, filigran yok.',
    ogDescription: 'Önceden yazılmış mesajla WhatsApp click-to-chat linki oluşturun. Ücretsiz, kayıt yok, filigran yok.',
  },
  hero: {
    tag: 'ÜCRETSİZ ARAÇ · KAYIT YOK',
    h1Lead: 'Kendi',
    h1Brand: 'WhatsApp',
    h1Rest: 'Sohbet Linkini Oluştur',
    h1Highlight: 'Bugün ÜCRETSİZ!',
    subtitle:
      "WhatsApp numaranızı ve bir açılış mesajı yazın. Sayfa, e-postalara, reklamlara, sosyal biyografilere, web sitelerine ve SMS'lere yapıştırabileceğiniz bir wa.me linki oluşturur. Müşteriler bir kez dokunur ve WhatsApp, mesajınız hazır şekilde açılır — numara yazmaya, kişi kaydetmeye gerek yok.",
    cta: 'Sohbet Linki Oluştur →',
    footnote: 'Kayıt yok · Filigran yok · Her yerde kullanın',
  },
  preview: {
    title: 'Sohbet linkinizi oluşturun',
    numberLabel: 'WhatsApp Numarası (ülke koduyla)',
    messageLabel: 'Karşılama Mesajı (Opsiyonel)',
    btnGenerate: 'Link Oluştur',
    btnCopy: 'Linki Kopyala',
    linkAlt: 'Örnek WhatsApp sohbet linki',
  },
  tryItNow: {
    h2: 'WhatsApp İçin Ücretsiz Sohbet Linki Oluştur Hemen Dene',
    subtitle: 'WhatsApp numaranızı girin, önceden yazılmış mesajı ayarlayın ve linki kopyalayın.',
  },
  useCases: {
    h2: 'WhatsApp Sohbet Linkinizi Nerede Kullanın',
    subtitle: 'Bir müşterinin dokunabileceği her yerde, wa.me linki bir sohbeti tek tıklama uzağına getirir.',
    emailTitle: 'E-posta imzalarında',
    emailBody:
      "Linki e-posta imzanıza, işlemsel e-postalarınıza veya bülten altbilginize ekleyin. Alıcılar 'WhatsApp'ta bize yazın'a dokunur ve sohbet, mesajınız hazır şekilde açılır.",
    bioTitle: 'Biyografilerde ve link-in-bio sayfalarında',
    bioBody:
      'Instagram, TikTok, LinkedIn veya X biyografisine ve Linktree tarzı sayfalara koyun. Takipçiler size, terk edecekleri bir iletişim formu yerine WhatsApp üzerinden ulaşır.',
    adsTitle: 'Reklamlarda ve açılış sayfalarında',
    adsBody:
      'Linki Click-to-WhatsApp reklamları, Google Ads, buton CTAları, popuplar ve canlı sohbet yedekleri için hedef URL olarak kullanın. Tek dokunuş ziyaretçiyi doğrudan gerçek bir konuşmaya götürür.',
  },
  seo: {
    h2: 'WhatsApp Sohbet Linki Nedir?',
    p1:
      "WhatsApp sohbet linki — click-to-chat linki veya wa.me linki olarak da bilinir — WhatsApp'ı doğrudan numaranızda açan bir URL'dir. Birisi bir telefondan tıkladığında, WhatsApp başlatılır ve doğru sohbete iner; bir tane ayarladıysanız başlangıç mesajınız önceden doldurulmuş şekilde. Numara yazmak yok. Önce kişiyi kaydetmek yok. Rakamları kopyalayıp yapıştırmak yok.",
    p2Pre: 'Link sabit bir formatı takip eder: ',
    p2Post:
      ". Oluşturucu biçimlendirme işini sizin yerinize yapar. Artı işaretini çıkarır, mesajı URL kodlar ve sonucu temiz, paylaşılabilir bir URL olarak geri vermeden önce rakamları doğrular. Bir numara ve başlangıç mesajı yazarsınız. Sayfa size bir link döndürür.",
    h3: 'Formatın işe yaradığı yerler',
    p3:
      "Bir WhatsApp sohbet linki, müşterinin zaten dokunabileceği bir ekranda olduğu durumlarda en kullanışlıdır. Bir e-posta imzası. Bir Instagram biyografisi. Bir Google reklamı. Fiyatlandırma sayfanızdaki bir 'Bizimle konuş' butonu. Sohbet linki mevcut bir temas noktasını 1 tıklamalık bir sohbete dönüştürürken, QR kodu basılı materyal, ambalaj ve tabela gibi çevrimdışı yüzeyler içindir.",
    p4Pre:
      "Click-to-WhatsApp reklamları yürüten ekipler için wa.me linki HEDEF URL'dir — Meta ve Google reklam yöneticileri onu doğal olarak kabul eder. Açılış sayfası hero CTAlarında, yapışkan sohbet butonlarında, uygulama içi yardım menülerinde ve terk edilmiş sepet e-postalarında kullanın. Hangi yüzeylerin gerçekten WhatsApp yanıtları getirdiğini izlemek için ",
    p4LinkText: 'Eazybe',
    p4Post:
      " kullanıyorsanız, sohbet linki tıklama ile HubSpot, Salesforce veya Zoho'daki izlenen bir konuşma arasındaki döngüyü kapatan şeydir.",
  },
  benefits: {
    h2Lead: "Neden Bir WhatsApp Sohbet Linki",
    h2Em: 'Dönüştürür',
    subtitle:
      'Click-to-chat linkleri, müşterilerin genellikle vazgeçtiği adımları kaldırır: numara yazma, kişi kaydetme, handle\'ınızı arama.',
    noInstallTitle: 'Tek dokunuş, sıfır sürtünme',
    noInstallBody:
      "WhatsApp zaten yaklaşık 2 milyar telefonda kuruludur. Link doğrudan WhatsApp'ı açar. Müşterinin indirmesi gereken bir şey yok, kayıt ekranı yok ve ilk sorularını sormadan önce doldurmaları gereken bir form yok.",
    prefilledTitle: 'Önceden yazılmış mesaj',
    prefilledBody:
      "Açılış mesajını kendiniz belirleyin. Müşteriler onu önceden doldurulmuş görür, böylece sohbet doğru bağlamla başlar. Örnekler: 'Merhaba, reklamınızı gördüm' veya 'Demo linki gönderin'.",
    conversionTitle: 'Formlardan daha yüksek dönüşüm',
    conversionBody:
      "Bir sohbet açan wa.me linki, bir form açan butondan daha fazla dönüşür. Müşteriler bir e-posta yanıtı beklemek yerine tek dokunuşla bir insana veya bir AI agent'a ulaşır.",
    freeTitle: 'Sonsuza kadar ücretsiz',
    freeBody: 'Filigran yok, kayıt yok, kullanım sınırı yok. İstediğiniz kadar sohbet linki oluşturun ve ticari olarak kullanın.',
  },
  benefitCards: {
    h2Lead: 'WhatsApp Sohbet Linki Oluşturucuyu Ücretsiz Kullanın —',
    h2Em: 'Göz Ardı Edemeyeceğiniz Avantajlar!',
    clickTitle: "Doğrudan WhatsApp'a tek tık",
    clickBody:
      "Linki web sitenize, reklamlarınıza veya e-posta imzanıza koyun. Tıklamalar doğrudan WhatsApp'a düşer ve müşteri kiminle konuştuğunu görür — böylece lead'ler anonim bir form yerine tam bağlamla gelir.",
    everywhereTitle: 'Linkin çalıştığı her yerde çalışır',
    everywhereBody:
      "E-posta, SMS, sosyal biyografi, reklam görselleri, buton URLleri, uygulama deep-linkleri, aynı linke çözülen QR kodları. Bir hyperlink'in çalıştığı yerde sohbet linki çalışır — ve müşteriler zaten WhatsApp'ı her gün kontrol eder.",
    leadsTitle: 'Tek dokunuşla lead toplayın',
    leadsBody:
      "Linki Facebook reklam görsellerine ekleyin, Instagram biyografinize yapıştırın veya 'Satışla konuş' butonuna bağlayın. Tek dokunuş bir prospect'i bir form yerine sizinle gerçek bir konuşmaya sokar.",
  },
  faq: {
    h2: 'WhatsApp Sohbet Linki Soruları, Cevaplandı',
    items: [
      { q: 'Bu WhatsApp Sohbet Linki Oluşturucu gerçekten ücretsiz mi?', a: "Evet. Kayıt yok, filigran yok ve oluşturabileceğiniz link sayısında sınır yok. Linki istediğiniz yerde ticari olarak kullanabilirsiniz." },
      { q: 'Link hem Kişisel hem WhatsApp Business numaralarında çalışır mı?', a: 'Evet. wa.me linki o telefon numarasına kayıtlı hangi WhatsApp hesabı varsa onu açar. Kişisel, Business App ve Business API hepsi çalışır.' },
      { q: 'Önceden yazılmış bir mesaj ekleyebilir miyim?', a: "Evet. Müşterilerin görmesini istediğiniz mesajı yazın, giriş kutusuna önceden dolduracaktır, böylece sadece Gönder'e dokunmaları yeterli. Bağlam belirlemek için kullanışlı (örnek: 'Merhaba, reklamınızı gördüm — daha fazla anlatın')." },
      { q: 'Bir WhatsApp grubu için sohbet linki oluşturabilir miyim?', a: "Hayır. wa.me formatı yalnızca bireysel telefon numaralarını destekler. Grup davet linkleri, WhatsApp'ın kendi içinden dışa aktarılmalıdır (Grup bilgisi → Bağlantı ile davet et)." },
      { q: 'WhatsApp uygulaması yüklü değilken çalışır mı?', a: "Mobilde sohbeti açmak için cihazın WhatsApp'a sahip olması gerekir. Masaüstünde link, tarayıcıda WhatsApp Web'e yönlendirir, böylece uygulama olmayan bir masaüstü hala çalışır." },
      { q: 'Bu bir WhatsApp QR kodundan nasıl farklı?', a: 'Aynı hedef — her ikisi de bir wa.me URLsine işaret eder. Link, müşterinin dokunabileceği dijital yüzeyler içindir (e-posta, reklamlar, biyografiler). QR ise müşterinin bir kamera kullanması gereken çevrimdışı yüzeyler içindir (basılı materyal, ambalaj, posterler).' },
      { q: 'WhatsApp sohbet linki süresi dolar mı?', a: "Hayır. wa.me linki telefon numaranıza bağlıdır, böylece o numara WhatsApp'ta olduğu sürece geçerlidir. Bir kez oluşturun ve yıllarca yeniden kullanın. Yenileme adımı ve süresi dolacak bir token yok." },
      { q: 'Linkimi kaç kişinin tıkladığını izleyebilir miyim?', a: "Doğrudan değil — wa.me linkleri tıklama analitiği sunmaz. Tıklamaları izlemek için linki yönlendirmeden önce her tıklamayı kaydeden Bitly veya Rebrandly gibi bir kısaltma servisi üzerinden yönlendirin. Eazybe ayrıca gelen WhatsApp sohbetini yakalar ve kaynağı CRM'inize geri yazar, eğer gelire kadar atıf gerekiyorsa." },
      { q: 'Önceden yazılmış mesaj emoji ve satır sonu destekliyor mu?', a: "Emojiler çalışır — mesaj alanına direkt yapıştırın, WhatsApp giriş kutusunda görünür. Satır sonları daha zor. wa.me ham satır sonlarını kaldırır ama URL'ye %0A koyarsanız çoğu WhatsApp istemcisinde satır sonu zorlanır. En basit yol, açılışı kısa tutup detayları müşteriden gelecek yanıta bırakmak." },
      { q: 'wa.me linkini Bitly veya kendi alan adımla kısaltabilir miyim?', a: "Evet. Bitly, Rebrandly, Short.io ve diğer kısaltıcılar wa.me URL'sini kabul eder ve markalı, daha kısa bir versiyon verir. Ayrıca ham linkte olmayan tıklama takibi de sağlar. Kendi alan adınızla, markaniz.com/whatsapp adresinden wa.me URL'sine bir 301 yönlendirmesi de kurabilirsiniz." },
      { q: 'Müşteri linke tıkladığında telefon numaramı görür mü?', a: 'Evet. Sohbeti açtıktan sonra numaranız konuşma başlığında görünür, başka herhangi bir yoldan size yazsa nasıl görünecekse aynısı. Kişisel numaranızı paylaşmak istemiyorsanız, linki bir WhatsApp Business numarasıyla kurun.' },
      { q: 'Linki bir ekibe yönlendirebilir veya birden fazla numara arasında rotasyon yapabilir miyim?', a: "Doğrudan değil — bir wa.me linki tek bir numaraya işaret eder. Bir ekip arasında dağıtmak için iki pratik yol var. Birincisi, paylaşılan gelen kutulu WhatsApp Business API (Eazybe bunun üzerinde çalışıyor). İkincisi, tıklamayı yakalayıp sırada hangi temsilci varsa ona yönlendiren bir routing servisi." },
    ],
  },
  cta: {
    badge: 'Dahasını mı?',
    h2: "Sadece Bir Linkten Fazlasını mı İstiyorsunuz?",
    subtitle:
      "Eazybe, her gelen WhatsApp sohbetini CRM'inize alır. Lead, temsilcileriniz görmeden önce puanlanır ve kimse çevrimiçi değilken AI'mız sohbete devam eder. HubSpot, Salesforce ve Zoho ile çalışır.",
    primary: "Eazybe'yi Ücretsiz Deneyin →",
    secondary: 'Demo Planlayın',
    footnote: '7 gün ücretsiz · Kredi kartı gerekmez · İstediğiniz zaman iptal edin',
  },
  generator: {
    formTitle: 'Sohbet linkinizi oluşturun',
    numberLabel: 'WhatsApp numarası',
    countryAria: 'Ülke kodu',
    phonePlaceholder: 'Telefon numarası',
    phoneAria: 'Telefon numarası',
    messageLabel: 'Önceden yazılmış mesaj',
    messageOptional: '(opsiyonel)',
    messagePlaceholder: 'Merhaba — ürününüz hakkında daha fazla bilgi almak istiyorum.',
    messageCounter: '{count}/400 — müşteri linke dokunduğunda gösterilir.',
    errorEmpty: 'Önce bir WhatsApp telefon numarası girin.',
    errorShort: 'Bu telefon numarası çok kısa görünüyor.',
    btnGenerate: 'Sohbet Linki Oluştur',
    outputTitle: 'WhatsApp Sohbet Linkiniz',
    emptyState: 'Paylaşılabilir bir sohbet linki oluşturmak için soldaki WhatsApp numarasını girin.',
    linkLabel: 'Paylaşılabilir link',
    htmlLabel: 'HTML parçası',
    btnCopyLink: 'Linki Kopyala',
    btnCopyHtml: 'HTMLyi Kopyala',
    btnOpen: "WhatsApp'ta Aç",
    copied: '✓ Kopyalandı',
  },
  breadcrumb: {
    home: 'Ana Sayfa',
    current: 'WhatsApp Sohbet Linki Oluşturucu',
  },
}

export const CHAT_LINK_CONTENT_BY_LOCALE: Record<string, ChatLinkPageContent> = { en, br, es, tr }

export function getChatLinkPageContent(locale: string): ChatLinkPageContent {
  return CHAT_LINK_CONTENT_BY_LOCALE[locale] || CHAT_LINK_CONTENT_BY_LOCALE.en
}
