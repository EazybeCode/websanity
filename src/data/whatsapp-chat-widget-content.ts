/**
 * All localized copy for /whatsapp-chat-widget. The tool generates a small
 * HTML snippet that adds a floating WhatsApp button to any website. The
 * generator output is a static <a> tag with inline styles (no JS, no
 * external script).
 */

export interface ChatWidgetPageContent {
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
    contactTitle: string
    contactBody: string
    productTitle: string
    productBody: string
    supportTitle: string
    supportBody: string
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
    noSetupTitle: string
    noSetupBody: string
    prefilledTitle: string
    prefilledBody: string
    conversionTitle: string
    conversionBody: string
    mobileTitle: string
    mobileBody: string
  }
  benefitCards: {
    h2Lead: string
    h2Em: string
    alwaysTitle: string
    alwaysBody: string
    brandTitle: string
    brandBody: string
    crmTitle: string
    crmBody: string
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
    buttonLabelLabel: string
    buttonLabelPlaceholder: string
    positionLabel: string
    positionBottomRight: string
    positionBottomLeft: string
    colorLabel: string
    errorEmpty: string
    errorShort: string
    btnGenerate: string
    outputTitle: string
    emptyState: string
    previewTitle: string
    snippetLabel: string
    btnCopySnippet: string
    btnOpen: string
    copied: string
  }
  breadcrumb: {
    home: string
    current: string
  }
}

const en: ChatWidgetPageContent = {
  meta: {
    title: 'Free WhatsApp Chat Widget for Websites | Eazybe',
    description:
      'Generate a free WhatsApp chat widget for your website. Configure the number, welcome message, button color, and position, then paste one HTML snippet. No signup, no monthly fee.',
    ogDescription: 'Add a floating WhatsApp button to any website. Free HTML snippet, no signup, no watermark.',
  },
  hero: {
    tag: 'FREE TOOL · NO SIGNUP',
    h1Lead: 'Add A',
    h1Brand: 'WhatsApp',
    h1Rest: 'Chat Widget',
    h1Highlight: 'For FREE Today!',
    subtitle:
      "Configure the number, the welcome message, and the colors. Copy the HTML snippet, paste it before your site's closing body tag, and a WhatsApp button shows up in the corner. Every click opens WhatsApp with your message already typed.",
    cta: 'Build Your Widget →',
    footnote: 'No signup · No watermark · Works on any site',
  },
  preview: {
    title: 'Configure your widget',
    numberLabel: 'WhatsApp Number',
    messageLabel: 'Welcome Message',
    btnGenerate: 'Generate Snippet',
    btnCopy: 'Copy HTML',
    linkAlt: 'WhatsApp chat widget preview',
  },
  tryItNow: {
    h2: 'Build A WhatsApp Chat Widget Try It Now',
    subtitle: 'Set the number, the message, and the look. Copy the HTML and paste it into your site.',
  },
  useCases: {
    h2: 'Where The WhatsApp Widget Pays Off',
    subtitle:
      'A floating button sits where the visitor is already looking, so they reach you without leaving the page.',
    contactTitle: 'On contact and pricing pages',
    contactBody:
      'These pages are where visitors are most likely to want a real answer. The widget puts a chat one click away, instead of asking them to find your email or fill in a form.',
    productTitle: 'On product and checkout pages',
    productBody:
      'For ecommerce and SaaS, a question at checkout is often the last thing between a visitor and a sale. The widget catches that question without making the customer write you an email.',
    supportTitle: 'On help and support pages',
    supportBody:
      "Customers searching your help docs already have a problem. A floating WhatsApp button gives them a fast escape hatch when the article doesn't actually answer the question.",
  },
  seo: {
    h2: 'What Is A WhatsApp Chat Widget?',
    p1:
      'A WhatsApp chat widget is a small floating button that sits in the corner of your website. When a visitor clicks it, WhatsApp opens at your number with your welcome message already in the input box. It is the on-site version of a wa.me link, dressed up as a button and pinned where customers can always see it.',
    p2Pre: 'The snippet itself is plain HTML. It sets a fixed-position anchor tag, styles it with inline CSS, and points it at ',
    p2Post:
      ". There is no external script, no tracker, and nothing to subscribe to. You paste it in once and it keeps working until you change your number.",
    h3: 'Where The Widget Actually Earns Its Keep',
    p3:
      "A widget is worth installing on pages where the customer is close to a decision. Contact pages, pricing pages, product detail pages, and post-purchase support pages are the obvious ones. For SaaS, the in-app help menu works too. Anywhere a visitor might think 'I just want to talk to a human,' the button is sitting there waiting.",
    p4Pre:
      "On its own, the widget gets you to 'they reached out.' For 'we know which page they reached out from, and what they were looking at,' you need the chat going into a CRM. If ",
    p4LinkText: 'Eazybe',
    p4Post:
      ' is sitting behind the widget, every click becomes a tracked conversation in HubSpot, Salesforce, or Zoho, with the source page recorded automatically.',
  },
  benefits: {
    h2Lead: 'Why A Floating WhatsApp Button',
    h2Em: 'Converts',
    subtitle:
      'A widget is always visible, so visitors do not have to hunt for a way to reach you. That alone tends to lift inbound chats on most sites.',
    noSetupTitle: 'Paste once, done',
    noSetupBody:
      'The snippet is plain HTML with inline CSS. It works on WordPress, Webflow, Shopify, Wix, Squarespace, and any hand-rolled site. There is no script to load and no plugin to maintain.',
    prefilledTitle: 'Welcome message built in',
    prefilledBody:
      "Set the opening message yourself, so the chat starts with the right context. For example: 'Hi, I'm browsing your pricing page' or 'Question about the Pro plan'. Customers see it pre-filled and only need to tap Send.",
    conversionTitle: 'Higher than a contact form',
    conversionBody:
      'Forms ask visitors to write a paragraph and trust an email reply. A widget asks them to send one line and gets them a real person in seconds. Most teams that try both find the widget wins on reply speed and reply rate.',
    mobileTitle: 'Mobile-friendly by default',
    mobileBody:
      'On phones, the button sits at thumb height and opens the WhatsApp app directly. Visitors who came in from Instagram or a Google search can start a chat without typing anything other than their question.',
  },
  benefitCards: {
    h2Lead: 'Get The Free WhatsApp Chat Widget,',
    h2Em: 'Without The Subscription',
    alwaysTitle: 'Always one click away',
    alwaysBody:
      'Most chat tools cost $50 to $200 a month per agent. This widget is a static HTML snippet. It costs nothing to run, and it does not add anything to your page weight or your monthly bill.',
    brandTitle: 'Match your brand',
    brandBody:
      "Change the button color, the position, and the label. The widget inherits your site's background and stays out of the way until someone wants to talk.",
    crmTitle: 'Connect to your CRM',
    crmBody:
      'Add Eazybe behind it and every click becomes a tracked WhatsApp conversation in HubSpot, Salesforce, or Zoho, with the page the visitor was on captured automatically.',
  },
  faq: {
    h2: 'WhatsApp Chat Widget Questions, Answered',
    items: [
      { q: 'Is this WhatsApp Chat Widget really free?', a: 'Yes. There is no signup, no watermark on the widget, and no monthly fee. You can use it on as many sites as you want, including client sites.' },
      { q: 'Will this work on WordPress, Shopify, Webflow, or Wix?', a: "Yes. The snippet is plain HTML, so it works on any platform that lets you paste HTML or embed code. On WordPress you can drop it into a Custom HTML block or into your theme footer. Shopify accepts it in theme.liquid or inside a custom Liquid block. Webflow and Wix both have a 'custom code' or 'embed' option in their site settings." },
      { q: 'Does the widget slow down my site?', a: 'No, not in any meaningful way. The snippet is a single anchor tag with inline CSS, so there is no external script to fetch and no extra request. It adds maybe a few hundred bytes to the page.' },
      { q: 'Can I customize the color, position, and label?', a: 'Yes. The form lets you set the button color, choose bottom-right or bottom-left, and write the button label and welcome message. The generated snippet uses inline styles, so you can also edit the colors and padding directly if you want a more custom look.' },
      { q: 'Will it work on both Personal and WhatsApp Business numbers?', a: 'Yes. The widget points at a wa.me link, which opens whichever WhatsApp account is registered to that phone number. Personal, Business App, and Business API all work.' },
      { q: 'How is the widget different from a wa.me chat link?', a: 'The widget is the floating button on your site. It is built on top of a wa.me chat link: the link is the URL, and the widget is the visible button that fires it.' },
      { q: 'Does it work on mobile?', a: 'Yes. On phones, the button stays pinned to the bottom corner so it is at thumb height, and clicking it opens the WhatsApp app directly instead of WhatsApp Web. iOS, Android, and desktop browsers all work.' },
      { q: 'Can I track clicks on the widget?', a: 'Not directly from this tool. To track clicks, route the link through a short-link service like Bitly or Rebrandly, or trigger a Google Analytics event in the onclick handler. Eazybe captures the inbound WhatsApp chat itself and writes the page it came from back to your CRM, which is usually what you actually want to know.' },
      { q: 'Can I show the widget only on certain pages?', a: "Yes. Drop the snippet only on the pages where you want it. On WordPress, put it inside a per-page Custom HTML block or wrap it in a PHP conditional in the theme footer. On Shopify, use a Liquid {% if template == 'product' %} block. The snippet is plain HTML, so any conditional that gates HTML output also gates the widget." },
      { q: 'Will it conflict with Intercom, Drift, or another live chat tool?', a: 'They share the same corner of the screen, so two widgets fight for the same spot. The fix is to move one of them. Either switch the WhatsApp widget to bottom-left, or bump bottom:24px to bottom:96px so it sits above the existing chat bubble. If you only need WhatsApp inbound, removing the other tool is usually simpler.' },
      { q: 'Do I need a cookie banner or GDPR consent for it?', a: "The widget itself sets no cookies and calls no tracking script, so it does not by itself trigger a consent banner. Once the customer clicks and opens WhatsApp, that conversation falls under your privacy policy and Meta's, same as any other inbound message. If you route through Bitly or another shortener for tracking, that shortener may set cookies — check with your DPO before adding it." },
      { q: 'How do I add it to a Next.js, React, or Vue app?', a: "The snippet is plain HTML, so it goes wherever your framework lets you output raw HTML. In Next.js, drop it into app/layout.tsx or _document.tsx. In React or Vue, paste the JSX or template equivalent, or just put the raw HTML in public/index.html. Nothing about it is framework-specific." },
    ],
  },
  cta: {
    badge: 'Ready For More?',
    h2: 'Want More Than Just A Widget?',
    subtitle:
      'Eazybe captures every inbound WhatsApp chat into your CRM. The lead gets scored before your reps see it, and our AI keeps the conversation going when nobody is online. Works with HubSpot, Salesforce, and Zoho.',
    primary: 'Try Eazybe Free →',
    secondary: 'Book a Demo',
    footnote: '7-day free trial · No credit card required · Cancel anytime',
  },
  generator: {
    formTitle: 'Configure your widget',
    numberLabel: 'WhatsApp number',
    countryAria: 'Country code',
    phonePlaceholder: 'Phone number',
    phoneAria: 'Phone number',
    messageLabel: 'Welcome message',
    messageOptional: '(optional)',
    messagePlaceholder: "Hi — I'd like to know more about your product.",
    messageCounter: '{count}/400 — shown when the customer taps the button.',
    buttonLabelLabel: 'Button label',
    buttonLabelPlaceholder: 'Chat with us',
    positionLabel: 'Button position',
    positionBottomRight: 'Bottom right',
    positionBottomLeft: 'Bottom left',
    colorLabel: 'Brand color',
    errorEmpty: 'Enter a WhatsApp phone number first.',
    errorShort: 'That phone number looks too short.',
    btnGenerate: 'Generate Snippet',
    outputTitle: 'Your WhatsApp Chat Widget',
    emptyState: 'Enter a WhatsApp number on the left to generate a snippet you can paste into your site.',
    previewTitle: 'Preview',
    snippetLabel: 'HTML snippet',
    btnCopySnippet: 'Copy HTML',
    btnOpen: 'Open Live Preview',
    copied: '✓ Copied',
  },
  breadcrumb: {
    home: 'Home',
    current: 'WhatsApp Chat Widget',
  },
}

const br: ChatWidgetPageContent = {
  meta: {
    title: 'Widget de Chat do WhatsApp Gratuito Para Sites | Eazybe',
    description:
      'Gere um widget de chat do WhatsApp gratuito para o seu site. Configure o número, a mensagem de boas-vindas, a cor e a posição do botão, depois cole um único snippet HTML. Sem cadastro, sem mensalidade.',
    ogDescription: 'Adicione um botão flutuante do WhatsApp em qualquer site. Snippet HTML gratuito, sem cadastro, sem marca d\'água.',
  },
  hero: {
    tag: 'FERRAMENTA GRÁTIS · SEM CADASTRO',
    h1Lead: 'Adicione Um',
    h1Brand: 'WhatsApp',
    h1Rest: 'Chat Widget',
    h1Highlight: 'GRÁTIS hoje!',
    subtitle:
      'Configure o número, a mensagem de boas-vindas e as cores. Copie o snippet HTML, cole antes da tag de fechamento do body do seu site, e um botão do WhatsApp aparece no canto da tela. Cada clique abre o WhatsApp com sua mensagem já preenchida.',
    cta: 'Criar Seu Widget →',
    footnote: 'Sem cadastro · Sem marca d\'água · Funciona em qualquer site',
  },
  preview: {
    title: 'Configure seu widget',
    numberLabel: 'Número do WhatsApp',
    messageLabel: 'Mensagem de Boas-vindas',
    btnGenerate: 'Gerar Snippet',
    btnCopy: 'Copiar HTML',
    linkAlt: 'Pré-visualização do widget de chat do WhatsApp',
  },
  tryItNow: {
    h2: 'Crie Um Widget De Chat Do WhatsApp Experimente Agora',
    subtitle: 'Defina o número, a mensagem e a aparência. Copie o HTML e cole no seu site.',
  },
  useCases: {
    h2: 'Onde O Widget Do WhatsApp Compensa',
    subtitle:
      'Um botão flutuante fica onde o visitante já está olhando, então ele fala com você sem sair da página.',
    contactTitle: 'Em páginas de contato e preços',
    contactBody:
      'Essas são as páginas onde o visitante mais quer uma resposta de verdade. O widget coloca uma conversa a um clique de distância, em vez de pedir que ele procure seu e-mail ou preencha um formulário.',
    productTitle: 'Em páginas de produto e checkout',
    productBody:
      'Para ecommerce e SaaS, uma dúvida no checkout costuma ser a última coisa entre o visitante e a compra. O widget captura essa dúvida sem obrigar o cliente a escrever um e-mail.',
    supportTitle: 'Em páginas de ajuda e suporte',
    supportBody:
      'Clientes pesquisando no seu help center já têm um problema. Um botão flutuante de WhatsApp dá a eles uma saída rápida quando o artigo não responde de verdade a pergunta.',
  },
  seo: {
    h2: 'O Que É Um Widget De Chat Do WhatsApp?',
    p1:
      'Um widget de chat do WhatsApp é um pequeno botão flutuante que fica no canto do seu site. Quando um visitante clica, o WhatsApp abre no seu número com sua mensagem de boas-vindas já preenchida na caixa de entrada. É a versão dentro do site de um link wa.me, vestida como botão e fixada onde os clientes podem sempre vê-la.',
    p2Pre: 'O snippet em si é HTML puro. Ele define uma tag âncora com posição fixa, estiliza com CSS inline e aponta para ',
    p2Post:
      '. Sem scripts externos. Sem rastreador. Sem assinatura. Cole uma vez e esqueça.',
    h3: 'Onde O Widget De Fato Vale A Pena',
    p3:
      "Vale a pena instalar o widget em páginas onde o cliente está perto de uma decisão. Páginas de contato, páginas de preços, páginas de detalhe de produto e páginas de suporte pós-compra são as óbvias. Para SaaS, o menu de ajuda dentro do app também funciona. Em qualquer lugar onde um visitante possa pensar 'só quero falar com uma pessoa', o botão está ali esperando.",
    p4Pre:
      "Por si só, o widget te leva até 'eles entraram em contato'. Para chegar em 'sabemos de qual página vieram, e o que estavam olhando', a conversa precisa entrar num CRM. Se ",
    p4LinkText: 'Eazybe',
    p4Post:
      ' estiver por trás do widget, cada clique vira uma conversa rastreada no HubSpot, Salesforce ou Zoho, com a página de origem registrada automaticamente.',
  },
  benefits: {
    h2Lead: 'Por Que Um Botão Flutuante Do WhatsApp',
    h2Em: 'Converte',
    subtitle:
      'O widget está sempre visível, então o visitante não precisa caçar uma forma de falar com você. Só isso já costuma aumentar o número de conversas em quase todo site.',
    noSetupTitle: 'Cole uma vez, pronto',
    noSetupBody:
      'O snippet é HTML puro com CSS inline. Funciona em WordPress, Webflow, Shopify, Wix, Squarespace e em qualquer site feito na mão. Não há script para carregar nem plugin para manter.',
    prefilledTitle: 'Mensagem de boas-vindas embutida',
    prefilledBody:
      "Defina a mensagem de abertura você mesmo, para que a conversa comece com o contexto certo. Por exemplo: 'Olá, estou vendo sua página de preços' ou 'Dúvida sobre o plano Pro'. Os clientes veem pré-preenchida e só precisam tocar em Enviar.",
    conversionTitle: 'Converte mais que um formulário',
    conversionBody:
      'Formulários pedem que o visitante escreva um parágrafo e confie numa resposta por e-mail. O widget pede uma linha e coloca a pessoa em contato com um humano em segundos. A maioria dos times que testa os dois descobre que o widget ganha em velocidade e em taxa de resposta.',
    mobileTitle: 'Pronto para celular',
    mobileBody:
      'No celular, o botão fica na altura do dedão e abre o app do WhatsApp diretamente. Visitantes que chegaram pelo Instagram ou por uma busca no Google conseguem começar uma conversa sem digitar nada além da própria pergunta.',
  },
  benefitCards: {
    h2Lead: 'Tenha O Widget De Chat Do WhatsApp Grátis,',
    h2Em: 'Sem Assinatura',
    alwaysTitle: 'Sempre a um clique de distância',
    alwaysBody:
      'A maioria das ferramentas de chat custa de R$200 a R$1.000 por mês por agente. Este widget é um snippet HTML estático. Não custa nada para rodar e não adiciona nada ao peso da página nem à sua conta mensal.',
    brandTitle: 'Combine com sua marca',
    brandBody:
      'Altere a cor do botão, a posição e o texto. O widget herda o fundo do seu site e fica fora do caminho até que alguém queira conversar.',
    crmTitle: 'Conecte ao seu CRM',
    crmBody:
      'Coloque o Eazybe por trás dele e cada clique vira uma conversa de WhatsApp rastreada no HubSpot, Salesforce ou Zoho, com a página em que o visitante estava registrada automaticamente.',
  },
  faq: {
    h2: 'Perguntas Sobre Widget De Chat Do WhatsApp, Respondidas',
    items: [
      { q: 'Este Widget de Chat do WhatsApp é mesmo gratuito?', a: 'Sim. Não há cadastro, nem marca d\'água no widget, nem mensalidade. Você pode usar em quantos sites quiser, incluindo sites de clientes.' },
      { q: 'Funciona em WordPress, Shopify, Webflow ou Wix?', a: "Sim. O snippet é HTML puro, então funciona em qualquer plataforma que permita colar HTML ou código embed. No WordPress dá para colocar num bloco HTML Customizado ou no rodapé do tema. No Shopify cabe no theme.liquid ou num bloco Liquid customizado. Webflow e Wix têm a opção de 'código personalizado' ou 'embed' nas configurações do site." },
      { q: 'O widget deixa meu site mais lento?', a: 'Não, nada relevante. O snippet é uma única tag âncora com CSS inline, então não tem script externo para buscar nem requisição extra. Adiciona talvez algumas centenas de bytes à página.' },
      { q: 'Posso personalizar a cor, a posição e o texto?', a: 'Sim. O formulário deixa você definir a cor do botão, escolher canto inferior direito ou esquerdo, e escrever o texto do botão e a mensagem de boas-vindas. O snippet gerado usa estilos inline, então também dá para editar diretamente as cores e o espaçamento se quiser algo mais customizado.' },
      { q: 'Funciona em números Pessoal e WhatsApp Business?', a: 'Sim. O widget aponta para um link wa.me, que abre qualquer conta do WhatsApp registrada naquele número. Pessoal, Business App e Business API funcionam.' },
      { q: 'Qual a diferença entre o widget e um link de chat wa.me?', a: 'O widget é o botão flutuante no seu site. Ele é montado em cima de um link de chat wa.me: o link é a URL, e o widget é o botão visível que dispara essa URL.' },
      { q: 'Funciona no celular?', a: 'Sim. No celular, o botão fica fixo no canto inferior na altura do dedão, e clicar abre o app do WhatsApp diretamente em vez do WhatsApp Web. iOS, Android e navegadores desktop funcionam.' },
      { q: 'Posso rastrear cliques no widget?', a: 'Não diretamente por esta ferramenta. Para rastrear cliques, passe o link por um encurtador como Bitly ou Rebrandly, ou dispare um evento do Google Analytics no onclick. O Eazybe captura a própria conversa de WhatsApp que entrou e escreve a página de origem no seu CRM, que normalmente é a informação que você realmente quer.' },
      { q: 'Posso mostrar o widget só em algumas páginas?', a: "Sim. Coloque o snippet só nas páginas onde você quer que apareça. No WordPress, use um bloco HTML Customizado por página ou envolva num condicional PHP no rodapé do tema. No Shopify, use um bloco Liquid {% if template == 'product' %}. Como o snippet é HTML puro, qualquer condicional que controla a saída de HTML também controla o widget." },
      { q: 'Vai conflitar com Intercom, Drift ou outra ferramenta de chat ao vivo?', a: 'As duas vivem no mesmo canto da tela, então dois widgets brigam pelo mesmo espaço. A solução é mover um deles. Mude o widget do WhatsApp para canto inferior esquerdo, ou aumente bottom:24px para bottom:96px para ele ficar acima do botão de chat existente. Se você só precisa de WhatsApp entrante, normalmente é mais simples remover a outra ferramenta.' },
      { q: 'Preciso de banner de cookies ou consentimento LGPD/GDPR para usar o widget?', a: 'O widget em si não define cookies e não chama nenhum script de rastreamento, então ele sozinho não dispara um banner de consentimento. Quando o cliente clica e abre o WhatsApp, aquela conversa fica sob sua política de privacidade e a da Meta, igual a qualquer outra mensagem recebida. Se você rotear pelo Bitly ou outro encurtador para rastrear, esse encurtador pode setar cookies — confirme com seu DPO antes.' },
      { q: 'Como adiciono o widget num app Next.js, React ou Vue?', a: 'O snippet é HTML puro, então ele vai em qualquer lugar onde seu framework deixe você emitir HTML cru. No Next.js, jogue dentro de app/layout.tsx ou _document.tsx. Em React ou Vue, cole o equivalente em JSX ou template, ou coloque o HTML cru no public/index.html. Nada nele é específico de framework.' },
    ],
  },
  cta: {
    badge: 'Quer Mais?',
    h2: 'Quer Mais Que Só Um Widget?',
    subtitle:
      'O Eazybe captura cada conversa de WhatsApp recebida no seu CRM. O lead é qualificado antes dos seus vendedores verem, e nossa IA mantém a conversa quando ninguém está online. Funciona com HubSpot, Salesforce e Zoho.',
    primary: 'Teste o Eazybe Grátis →',
    secondary: 'Agendar Demo',
    footnote: '7 dias grátis · Sem cartão de crédito · Cancele quando quiser',
  },
  generator: {
    formTitle: 'Configure seu widget',
    numberLabel: 'Número do WhatsApp',
    countryAria: 'Código do país',
    phonePlaceholder: 'Número de telefone',
    phoneAria: 'Número de telefone',
    messageLabel: 'Mensagem de boas-vindas',
    messageOptional: '(opcional)',
    messagePlaceholder: 'Olá — gostaria de saber mais sobre seu produto.',
    messageCounter: '{count}/400 — mostrada quando o cliente toca no botão.',
    buttonLabelLabel: 'Texto do botão',
    buttonLabelPlaceholder: 'Fale com a gente',
    positionLabel: 'Posição do botão',
    positionBottomRight: 'Inferior direito',
    positionBottomLeft: 'Inferior esquerdo',
    colorLabel: 'Cor da marca',
    errorEmpty: 'Digite um número de WhatsApp primeiro.',
    errorShort: 'Esse número parece curto demais.',
    btnGenerate: 'Gerar Snippet',
    outputTitle: 'Seu Widget De Chat Do WhatsApp',
    emptyState: 'Digite um número do WhatsApp à esquerda para gerar um snippet que você cola no seu site.',
    previewTitle: 'Pré-visualização',
    snippetLabel: 'Snippet HTML',
    btnCopySnippet: 'Copiar HTML',
    btnOpen: 'Abrir Pré-visualização',
    copied: '✓ Copiado',
  },
  breadcrumb: {
    home: 'Início',
    current: 'Widget de Chat do WhatsApp',
  },
}

const es: ChatWidgetPageContent = {
  meta: {
    title: 'Widget de Chat de WhatsApp Gratis para Sitios Web | Eazybe',
    description:
      'Genera un widget de chat de WhatsApp gratis para tu sitio web. Configura el número, el mensaje de bienvenida, el color y la posición del botón, y luego pega un único snippet HTML. Sin registro, sin cuota mensual.',
    ogDescription: 'Añade un botón flotante de WhatsApp a cualquier sitio. Snippet HTML gratis, sin registro, sin marca de agua.',
  },
  hero: {
    tag: 'HERRAMIENTA GRATIS · SIN REGISTRO',
    h1Lead: 'Añade Un',
    h1Brand: 'WhatsApp',
    h1Rest: 'Chat Widget',
    h1Highlight: '¡GRATIS hoy!',
    subtitle:
      'Configura el número, el mensaje de bienvenida y los colores. Copia el snippet HTML, pégalo antes de la etiqueta de cierre del body de tu sitio, y un botón de WhatsApp aparece en la esquina. Cada clic abre WhatsApp con tu mensaje ya escrito.',
    cta: 'Crear Tu Widget →',
    footnote: 'Sin registro · Sin marca de agua · Funciona en cualquier sitio',
  },
  preview: {
    title: 'Configura tu widget',
    numberLabel: 'Número de WhatsApp',
    messageLabel: 'Mensaje de Bienvenida',
    btnGenerate: 'Generar Snippet',
    btnCopy: 'Copiar HTML',
    linkAlt: 'Vista previa del widget de chat de WhatsApp',
  },
  tryItNow: {
    h2: 'Crea Un Widget De Chat De WhatsApp Pruébalo Ahora',
    subtitle: 'Define el número, el mensaje y el aspecto. Copia el HTML y pégalo en tu sitio.',
  },
  useCases: {
    h2: 'Dónde El Widget De WhatsApp Rinde',
    subtitle:
      'Un botón flotante se queda donde el visitante ya está mirando, así te escribe sin tener que salir de la página.',
    contactTitle: 'En páginas de contacto y precios',
    contactBody:
      'Estas páginas son donde el visitante más quiere una respuesta de verdad. El widget pone una conversación a un clic, en lugar de pedirle que busque tu correo o rellene un formulario.',
    productTitle: 'En páginas de producto y checkout',
    productBody:
      'En ecommerce y SaaS, una duda en el checkout suele ser lo último entre el visitante y la compra. El widget captura esa duda sin obligar al cliente a escribirte un correo.',
    supportTitle: 'En páginas de ayuda y soporte',
    supportBody:
      'Los clientes que buscan en tu centro de ayuda ya tienen un problema. Un botón flotante de WhatsApp les da una salida rápida cuando el artículo no responde realmente la pregunta.',
  },
  seo: {
    h2: '¿Qué Es Un Widget De Chat De WhatsApp?',
    p1:
      'Un widget de chat de WhatsApp es un pequeño botón flotante que se queda en la esquina de tu sitio. Cuando un visitante hace clic, WhatsApp se abre en tu número con tu mensaje de bienvenida ya en la caja de entrada. Es la versión dentro del sitio de un enlace wa.me, vestida como botón y fijada donde los clientes siempre pueden verla.',
    p2Pre: 'El snippet en sí es HTML plano. Define una etiqueta ancla con posición fija, la estiliza con CSS en línea y apunta a ',
    p2Post:
      '. Sin scripts externos. Sin tracker. Sin suscripción. Pégalo una vez y olvídate.',
    h3: 'Dónde El Widget Vale Realmente La Pena',
    p3:
      "Vale la pena instalarlo en páginas donde el cliente está cerca de una decisión. Páginas de contacto, páginas de precios, páginas de detalle de producto y páginas de soporte post-venta son las obvias. Para SaaS, el menú de ayuda dentro de la app también funciona. Donde sea que un visitante pueda pensar 'solo quiero hablar con una persona', el botón está ahí esperando.",
    p4Pre:
      "Por sí solo, el widget te lleva hasta 'nos escribieron'. Para llegar a 'sabemos desde qué página nos escribieron y qué estaban viendo', la conversación tiene que ir a un CRM. Si ",
    p4LinkText: 'Eazybe',
    p4Post:
      ' está detrás del widget, cada clic se convierte en una conversación rastreada en HubSpot, Salesforce o Zoho, con la página de origen registrada automáticamente.',
  },
  benefits: {
    h2Lead: 'Por Qué Un Botón Flotante De WhatsApp',
    h2Em: 'Convierte',
    subtitle:
      'El widget está siempre visible, así que los visitantes no tienen que buscar la forma de contactarte. Eso por sí solo suele aumentar las conversaciones entrantes en la mayoría de sitios.',
    noSetupTitle: 'Pega una vez y listo',
    noSetupBody:
      'El snippet es HTML plano con CSS en línea. Funciona en WordPress, Webflow, Shopify, Wix, Squarespace y en cualquier sitio hecho a mano. No hay script que cargar ni plugin que mantener.',
    prefilledTitle: 'Mensaje de bienvenida incluido',
    prefilledBody:
      "Define el mensaje de apertura tú mismo para que la conversación arranque con el contexto correcto. Por ejemplo: 'Hola, estoy viendo tu página de precios' o 'Duda sobre el plan Pro'. Los clientes lo ven precargado y solo tienen que tocar Enviar.",
    conversionTitle: 'Convierte más que un formulario',
    conversionBody:
      'Los formularios piden al visitante que escriba un párrafo y confíe en una respuesta por correo. El widget le pide una línea y lo pone delante de una persona en segundos. La mayoría de equipos que prueba los dos descubre que el widget gana en velocidad y en tasa de respuesta.',
    mobileTitle: 'Listo para móvil',
    mobileBody:
      'En móvil, el botón se queda a la altura del pulgar y abre la app de WhatsApp directamente. Visitantes que llegaron desde Instagram o desde una búsqueda en Google pueden iniciar una conversación sin escribir nada más que su pregunta.',
  },
  benefitCards: {
    h2Lead: 'Obtén El Widget De Chat De WhatsApp Gratis,',
    h2Em: 'Sin Suscripción',
    alwaysTitle: 'Siempre a un clic',
    alwaysBody:
      'La mayoría de herramientas de chat cuestan entre 50 y 200 € al mes por agente. Este widget es un snippet HTML estático. No cuesta nada hacerlo funcionar y no añade nada al peso de la página ni a tu factura mensual.',
    brandTitle: 'A juego con tu marca',
    brandBody:
      'Cambia el color del botón, la posición y el texto. El widget hereda el fondo de tu sitio y se queda fuera del camino hasta que alguien quiere hablar.',
    crmTitle: 'Conéctalo a tu CRM',
    crmBody:
      'Pon Eazybe detrás y cada clic se convierte en una conversación de WhatsApp rastreada en HubSpot, Salesforce o Zoho, con la página en la que estaba el visitante guardada automáticamente.',
  },
  faq: {
    h2: 'Preguntas Sobre Widget De Chat De WhatsApp, Respondidas',
    items: [
      { q: '¿Este Widget de Chat de WhatsApp es realmente gratis?', a: 'Sí. No hay registro, ni marca de agua en el widget, ni cuota mensual. Puedes usarlo en tantos sitios como quieras, incluidos sitios de clientes.' },
      { q: '¿Funciona en WordPress, Shopify, Webflow o Wix?', a: "Sí. El snippet es HTML plano, así que funciona en cualquier plataforma que te deje pegar HTML o código embed. En WordPress lo metes en un bloque HTML personalizado o en el pie del tema. Shopify lo acepta en theme.liquid o en un bloque Liquid personalizado. Webflow y Wix tienen la opción de 'código personalizado' o 'embed' en los ajustes del sitio." },
      { q: '¿El widget ralentiza mi sitio?', a: 'No, nada significativo. El snippet es una sola etiqueta ancla con CSS en línea, así que no hay script externo que cargar ni petición extra. Añade quizás unos cientos de bytes a la página.' },
      { q: '¿Puedo personalizar el color, la posición y el texto?', a: 'Sí. El formulario te deja definir el color del botón, elegir esquina inferior derecha o izquierda, y escribir el texto del botón y el mensaje de bienvenida. El snippet generado usa estilos en línea, así que también puedes editar los colores y el padding directamente si quieres algo más a medida.' },
      { q: '¿Funciona en números Personal y WhatsApp Business?', a: 'Sí. El widget apunta a un enlace wa.me, que abre la cuenta de WhatsApp registrada con ese número. Personal, Business App y Business API funcionan.' },
      { q: '¿En qué se diferencia el widget de un enlace de chat wa.me?', a: 'El widget es el botón flotante en tu sitio. Está montado encima de un enlace de chat wa.me: el enlace es la URL, y el widget es el botón visible que dispara esa URL.' },
      { q: '¿Funciona en móvil?', a: 'Sí. En móvil, el botón se queda fijo en la esquina inferior a la altura del pulgar, y al pulsarlo abre la app de WhatsApp directamente en lugar de WhatsApp Web. iOS, Android y navegadores de escritorio funcionan.' },
      { q: '¿Puedo rastrear clics en el widget?', a: 'No directamente desde esta herramienta. Para rastrear clics, pasa el enlace por un acortador como Bitly o Rebrandly, o dispara un evento de Google Analytics en el onclick. Eazybe captura la propia conversación de WhatsApp que entra y escribe la página de origen en tu CRM, que normalmente es la información que realmente quieres.' },
      { q: '¿Puedo mostrar el widget solo en ciertas páginas?', a: "Sí. Mete el snippet solo en las páginas donde lo quieras. En WordPress, dentro de un bloque HTML personalizado por página, o envuelto en un condicional PHP en el pie del tema. En Shopify, en un bloque Liquid {% if template == 'product' %}. Como el snippet es HTML plano, cualquier condicional que controle la salida de HTML también controla el widget." },
      { q: '¿Va a chocar con Intercom, Drift u otra herramienta de chat en vivo?', a: 'Viven en la misma esquina de la pantalla, así que dos widgets se pelean el mismo sitio. La solución es mover uno. Cambia el widget de WhatsApp a esquina inferior izquierda, o sube bottom:24px a bottom:96px para que quede encima del botón de chat existente. Si solo necesitas WhatsApp entrante, normalmente es más sencillo quitar la otra herramienta.' },
      { q: '¿Necesito banner de cookies o consentimiento RGPD para usarlo?', a: 'El widget en sí no pone cookies y no llama a ningún script de tracking, así que por sí solo no dispara un banner de consentimiento. Cuando el cliente hace clic y abre WhatsApp, esa conversación cae bajo tu política de privacidad y la de Meta, igual que cualquier otro mensaje entrante. Si pasas el enlace por Bitly u otro acortador para tracking, ese acortador sí puede poner cookies — confírmalo con tu DPO antes.' },
      { q: '¿Cómo lo añado a una app de Next.js, React o Vue?', a: 'El snippet es HTML plano, así que va donde tu framework te deje emitir HTML crudo. En Next.js, dentro de app/layout.tsx o _document.tsx. En React o Vue, pega el equivalente en JSX o template, o suelta el HTML crudo en public/index.html. Nada en él es específico de un framework.' },
    ],
  },
  cta: {
    badge: '¿Quieres Más?',
    h2: '¿Quieres Más Que Solo Un Widget?',
    subtitle:
      'Eazybe captura cada chat entrante de WhatsApp en tu CRM. El lead se califica antes de que tus reps lo vean y nuestra IA mantiene la conversación cuando nadie está en línea. Funciona con HubSpot, Salesforce y Zoho.',
    primary: 'Prueba Eazybe Gratis →',
    secondary: 'Agendar Demo',
    footnote: 'Prueba de 7 días · Sin tarjeta de crédito · Cancela cuando quieras',
  },
  generator: {
    formTitle: 'Configura tu widget',
    numberLabel: 'Número de WhatsApp',
    countryAria: 'Código de país',
    phonePlaceholder: 'Número de teléfono',
    phoneAria: 'Número de teléfono',
    messageLabel: 'Mensaje de bienvenida',
    messageOptional: '(opcional)',
    messagePlaceholder: 'Hola — me gustaría saber más sobre tu producto.',
    messageCounter: '{count}/400 — se muestra cuando el cliente toca el botón.',
    buttonLabelLabel: 'Texto del botón',
    buttonLabelPlaceholder: 'Habla con nosotros',
    positionLabel: 'Posición del botón',
    positionBottomRight: 'Inferior derecha',
    positionBottomLeft: 'Inferior izquierda',
    colorLabel: 'Color de marca',
    errorEmpty: 'Ingresa primero un número de WhatsApp.',
    errorShort: 'Ese número parece muy corto.',
    btnGenerate: 'Generar Snippet',
    outputTitle: 'Tu Widget De Chat De WhatsApp',
    emptyState: 'Ingresa un número de WhatsApp a la izquierda para generar un snippet que pegues en tu sitio.',
    previewTitle: 'Vista previa',
    snippetLabel: 'Snippet HTML',
    btnCopySnippet: 'Copiar HTML',
    btnOpen: 'Abrir Vista Previa',
    copied: '✓ Copiado',
  },
  breadcrumb: {
    home: 'Inicio',
    current: 'Widget de Chat de WhatsApp',
  },
}

const tr: ChatWidgetPageContent = {
  meta: {
    title: "Web Siteleri İçin Ücretsiz WhatsApp Sohbet Widget'ı | Eazybe",
    description:
      "Web siteniz için ücretsiz WhatsApp sohbet widget'ı oluşturun. Numarayı, karşılama mesajını, buton rengini ve konumunu ayarlayın, sonra tek bir HTML parçasını yapıştırın. Kayıt yok, aylık ücret yok.",
    ogDescription: "Herhangi bir siteye yüzen bir WhatsApp butonu ekleyin. Ücretsiz HTML parçası, kayıt yok, filigran yok.",
  },
  hero: {
    tag: 'ÜCRETSİZ ARAÇ · KAYIT YOK',
    h1Lead: 'Sitenize Bir',
    h1Brand: 'WhatsApp',
    h1Rest: 'Sohbet Widget Ekle',
    h1Highlight: 'Bugün ÜCRETSİZ!',
    subtitle:
      "Numarayı, karşılama mesajını ve renkleri ayarlayın. HTML parçasını kopyalayın, sitenizin kapanış body etiketinden önce yapıştırın ve köşede bir WhatsApp butonu görünür. Her tıklama mesajınız hazır şekilde WhatsApp'ı açar.",
    cta: "Widget'ı Oluştur →",
    footnote: 'Kayıt yok · Filigran yok · Her sitede çalışır',
  },
  preview: {
    title: "Widget'ınızı yapılandırın",
    numberLabel: 'WhatsApp Numarası',
    messageLabel: 'Karşılama Mesajı',
    btnGenerate: 'Parça Oluştur',
    btnCopy: 'HTML Kopyala',
    linkAlt: "WhatsApp sohbet widget'ı önizlemesi",
  },
  tryItNow: {
    h2: "WhatsApp Sohbet Widget'ı Oluştur Hemen Dene",
    subtitle: "Numarayı, mesajı ve görünümü ayarlayın. HTML'i kopyalayıp sitenize yapıştırın.",
  },
  useCases: {
    h2: "WhatsApp Widget'ı Nerede Karşılığını Verir",
    subtitle:
      'Yüzen bir buton, ziyaretçi zaten baktığı yerde durur, böylece sayfadan ayrılmadan size ulaşır.',
    contactTitle: 'İletişim ve fiyat sayfalarında',
    contactBody:
      "Bu sayfalar, ziyaretçinin gerçek bir cevap istediği yerlerdir. Widget, bir sohbeti tek tık uzakta tutar; ziyaretçinin e-postanızı aramasına veya bir formu doldurmasına gerek kalmaz.",
    productTitle: 'Ürün ve ödeme sayfalarında',
    productBody:
      "Ecommerce ve SaaS için, ödeme aşamasındaki bir soru çoğu zaman ziyaretçi ile satış arasındaki son şeydir. Widget, müşteriyi bir e-posta yazmaya zorlamadan o soruyu yakalar.",
    supportTitle: 'Yardım ve destek sayfalarında',
    supportBody:
      "Yardım dokümanlarınızda arama yapan müşterilerin zaten bir sorunu var. Yüzen bir WhatsApp butonu, makale soruyu gerçekten cevaplamadığında onlara hızlı bir kaçış yolu sunar.",
  },
  seo: {
    h2: "WhatsApp Sohbet Widget'ı Nedir?",
    p1:
      "WhatsApp sohbet widget'ı, sitenizin köşesinde duran küçük bir yüzen butondur. Bir ziyaretçi tıkladığında, WhatsApp numaranızda açılır ve karşılama mesajınız giriş kutusuna hazır şekilde yerleşir. wa.me linkinin site içi versiyonudur; bir buton kılığına sokulmuş ve müşterilerin sürekli görebileceği bir yere sabitlenmiştir.",
    p2Pre: 'Parçanın kendisi düz HTML. Sabit konumlu bir ankraj etiketi tanımlar, inline CSS ile şekillendirir ve şuraya işaret eder: ',
    p2Post:
      ". Harici script yok. Tracker yok. Abonelik yok. Bir kez yapıştırın ve unutun.",
    h3: "Widget'ın Gerçekten İşe Yaradığı Yerler",
    p3:
      "Müşterinin karara yakın olduğu sayfalarda widget kurmaya değer. İletişim sayfaları, fiyat sayfaları, ürün detay sayfaları ve satış sonrası destek sayfaları en bariz olanlar. SaaS için uygulama içi yardım menüsü de işe yarar. Bir ziyaretçinin 'şu an bir insanla konuşmak istiyorum' diye düşünebileceği her yerde, buton orada bekliyor.",
    p4Pre:
      "Tek başına widget sizi 'bize ulaştılar' noktasına götürür. 'Hangi sayfadan ulaştıklarını ve neye baktıklarını biliyoruz' noktasına ulaşmak için sohbetin bir CRM'e girmesi gerekir. Widget'ın arkasında ",
    p4LinkText: 'Eazybe',
    p4Post:
      " varsa, her tıklama HubSpot, Salesforce veya Zoho'da takip edilen bir konuşmaya dönüşür; kaynak sayfa otomatik olarak kaydedilir.",
  },
  benefits: {
    h2Lead: 'Yüzen Bir WhatsApp Butonu Neden',
    h2Em: 'Dönüştürür',
    subtitle:
      "Widget her zaman görünür, böylece ziyaretçiler size ulaşmanın bir yolunu aramak zorunda kalmaz. Sadece bu bile çoğu sitede gelen sohbet sayısını artırır.",
    noSetupTitle: 'Bir kez yapıştır, bitti',
    noSetupBody:
      "Parça, inline CSS'li düz HTML. WordPress, Webflow, Shopify, Wix, Squarespace ve elle yazılmış her sitede çalışır. Yüklenecek bir script ve sürdürülecek bir eklenti yoktur.",
    prefilledTitle: 'Karşılama mesajı yerleşik',
    prefilledBody:
      "Açılış mesajını kendiniz belirleyin, böylece sohbet doğru bağlamla başlar. Örneğin: 'Merhaba, fiyat sayfanıza bakıyorum' veya 'Pro plan hakkında soru'. Müşteriler bunu önceden doldurulmuş görür ve sadece Gönder'e dokunmaları yeterli.",
    conversionTitle: 'Formdan daha çok dönüştürür',
    conversionBody:
      "Formlar, ziyaretçiden bir paragraf yazmasını ve bir e-posta yanıtına güvenmesini ister. Widget tek satır ister ve saniyeler içinde gerçek bir kişiyle buluşturur. İkisini de deneyen çoğu ekip, widget'ın yanıt hızında ve yanıt oranında kazandığını görür.",
    mobileTitle: 'Mobile uygun',
    mobileBody:
      "Telefonda buton baş parmak yüksekliğinde durur ve doğrudan WhatsApp uygulamasını açar. Instagram veya Google aramasından gelen ziyaretçiler, kendi sorularından başka hiçbir şey yazmadan sohbet başlatabilir.",
  },
  benefitCards: {
    h2Lead: "Ücretsiz WhatsApp Sohbet Widget'ını Kullanın,",
    h2Em: 'Abonelik Olmadan',
    alwaysTitle: 'Her zaman tek tık uzakta',
    alwaysBody:
      "Çoğu sohbet aracı agent başına ayda 1.500 ila 6.000 TL tutar. Bu widget statik bir HTML parçası. Çalışması hiçbir şeye mal olmaz, sayfa ağırlığına veya aylık faturanıza bir şey eklemez.",
    brandTitle: 'Markanızla uyumlu',
    brandBody:
      "Buton rengini, konumunu ve metnini değiştirin. Widget, sitenizin arka planını miras alır ve biri konuşmak isteyene kadar yolun dışında kalır.",
    crmTitle: "CRM'inize bağlayın",
    crmBody:
      "Arkasına Eazybe'yi koyun ve her tıklama HubSpot, Salesforce veya Zoho'da takip edilen bir WhatsApp konuşmasına dönüşür; ziyaretçinin bulunduğu sayfa otomatik olarak kaydedilir.",
  },
  faq: {
    h2: "WhatsApp Sohbet Widget'ı Soruları, Cevaplandı",
    items: [
      { q: "Bu WhatsApp Sohbet Widget'ı gerçekten ücretsiz mi?", a: "Evet. Kayıt yok, widget'ta filigran yok ve aylık ücret yok. İstediğiniz kadar sitede kullanabilirsiniz, müşteri siteleri dahil." },
      { q: 'WordPress, Shopify, Webflow veya Wix üzerinde çalışır mı?', a: "Evet. Parça düz HTML, bu yüzden HTML veya embed kodu yapıştırmaya izin veren her platformda çalışır. WordPress'te Custom HTML bloğuna veya tema altbilgisine koyabilirsiniz. Shopify theme.liquid içine veya özel bir Liquid bloğuna kabul eder. Webflow ve Wix'in site ayarlarında 'özel kod' veya 'embed' seçeneği vardır." },
      { q: 'Widget sitemi yavaşlatır mı?', a: "Hayır, anlamlı bir şekilde değil. Parça inline CSS'li tek bir ankraj etiketi, yani harici script çekilmez ve ekstra istek yapılmaz. Sayfaya belki birkaç yüz bayt ekler." },
      { q: 'Rengi, konumu ve metni özelleştirebilir miyim?', a: 'Evet. Form, buton rengini ayarlamanıza, sağ alt veya sol alt köşeyi seçmenize, buton metnini ve karşılama mesajını yazmanıza izin verir. Oluşturulan parça inline stiller kullanır, bu yüzden daha özel bir görünüm isterseniz renkleri ve dolguyu doğrudan da düzenleyebilirsiniz.' },
      { q: 'Hem Kişisel hem WhatsApp Business numaralarında çalışır mı?', a: 'Evet. Widget bir wa.me bağlantısına işaret eder, o telefon numarasına kayıtlı hangi WhatsApp hesabı varsa onu açar. Kişisel, Business App ve Business API hepsi çalışır.' },
      { q: "Widget'ın bir wa.me sohbet bağlantısından farkı ne?", a: "Widget, sitenizdeki yüzen butondur. Bir wa.me sohbet bağlantısının üzerine inşa edilmiştir: bağlantı URL'dir, widget ise o URL'yi tetikleyen görünür butondur." },
      { q: 'Mobilde çalışır mı?', a: "Evet. Telefonda buton alt köşede baş parmak yüksekliğinde sabit kalır ve tıklamak doğrudan WhatsApp uygulamasını açar, WhatsApp Web'i değil. iOS, Android ve masaüstü tarayıcılar çalışır." },
      { q: "Widget'taki tıklamaları takip edebilir miyim?", a: "Bu araçtan doğrudan değil. Tıklamaları takip etmek için bağlantıyı Bitly veya Rebrandly gibi bir kısaltma servisi üzerinden yönlendirin veya onclick'te bir Google Analytics olayı tetikleyin. Eazybe gelen WhatsApp sohbetinin kendisini yakalar ve geldiği sayfayı CRM'inize yazar; genellikle gerçekten bilmek istediğiniz şey budur." },
      { q: "Widget'ı sadece belirli sayfalarda gösterebilir miyim?", a: "Evet. Parçayı yalnızca göstermek istediğiniz sayfalara koyun. WordPress'te sayfa başına bir Custom HTML bloğuna yerleştirin veya tema altbilgisinde bir PHP koşulunun içine sarın. Shopify'da {% if template == 'product' %} gibi bir Liquid bloğu kullanın. Parça düz HTML olduğu için, HTML çıktısını koşullandıran her yapı widget'ı da koşullandırır." },
      { q: 'Intercom, Drift veya başka bir canlı sohbet aracıyla çakışır mı?', a: "İkisi de ekranın aynı köşesinde durur, yani iki widget aynı yer için yarışır. Çözüm birini taşımak. WhatsApp widget'ını sol alt köşeye alın veya bottom:24px'i bottom:96px yapın, böylece mevcut sohbet butonunun üzerine oturur. Sadece WhatsApp girişi istiyorsanız diğer aracı kaldırmak genellikle daha basit." },
      { q: "GDPR/KVKK için çerez bildirimi veya onay gerekir mi?", a: "Widget'ın kendisi çerez koymaz ve hiçbir izleme scriptini çağırmaz, dolayısıyla tek başına bir onay banner'ı tetiklemez. Müşteri tıklayıp WhatsApp'ı açtığında, o konuşma sizin gizlilik politikanız ve Meta'nın politikası kapsamına girer; tıpkı diğer gelen mesajlar gibi. Takip için Bitly veya başka bir kısaltıcıdan yönlendirme yapıyorsanız, o servis çerez koyabilir — eklemeden önce veri sorumlunuza danışın." },
      { q: "Next.js, React veya Vue uygulamasına nasıl eklerim?", a: "Parça düz HTML, bu yüzden framework'ünüzün ham HTML çıktısı vermesine izin verdiği her yere gider. Next.js'te app/layout.tsx veya _document.tsx içine bırakın. React veya Vue'da JSX ya da template karşılığını yapıştırın, ya da ham HTML'i public/index.html içine koyun. Hiçbir yanı framework'e özel değil." },
    ],
  },
  cta: {
    badge: 'Dahasını mı?',
    h2: "Sadece Bir Widget'tan Fazlasını mı İstiyorsunuz?",
    subtitle:
      "Eazybe, her gelen WhatsApp sohbetini CRM'inize alır. Lead, temsilcileriniz görmeden önce puanlanır ve kimse çevrimiçi değilken AI'mız sohbete devam eder. HubSpot, Salesforce ve Zoho ile çalışır.",
    primary: "Eazybe'yi Ücretsiz Deneyin →",
    secondary: 'Demo Planlayın',
    footnote: '7 gün ücretsiz · Kredi kartı gerekmez · İstediğiniz zaman iptal edin',
  },
  generator: {
    formTitle: "Widget'ınızı yapılandırın",
    numberLabel: 'WhatsApp numarası',
    countryAria: 'Ülke kodu',
    phonePlaceholder: 'Telefon numarası',
    phoneAria: 'Telefon numarası',
    messageLabel: 'Karşılama mesajı',
    messageOptional: '(opsiyonel)',
    messagePlaceholder: 'Merhaba — ürününüz hakkında daha fazla bilgi almak istiyorum.',
    messageCounter: '{count}/400 — müşteri butona dokunduğunda gösterilir.',
    buttonLabelLabel: 'Buton metni',
    buttonLabelPlaceholder: 'Bizimle konuşun',
    positionLabel: 'Buton konumu',
    positionBottomRight: 'Sağ alt',
    positionBottomLeft: 'Sol alt',
    colorLabel: 'Marka rengi',
    errorEmpty: 'Önce bir WhatsApp telefon numarası girin.',
    errorShort: 'Bu telefon numarası çok kısa görünüyor.',
    btnGenerate: 'Parça Oluştur',
    outputTitle: "WhatsApp Sohbet Widget'ınız",
    emptyState: 'Sitenize yapıştırabileceğiniz bir parça oluşturmak için soldaki WhatsApp numarasını girin.',
    previewTitle: 'Önizleme',
    snippetLabel: 'HTML parçası',
    btnCopySnippet: 'HTML Kopyala',
    btnOpen: 'Canlı Önizleme',
    copied: '✓ Kopyalandı',
  },
  breadcrumb: {
    home: 'Ana Sayfa',
    current: "WhatsApp Sohbet Widget'ı",
  },
}

export const CHAT_WIDGET_CONTENT_BY_LOCALE: Record<string, ChatWidgetPageContent> = { en, br, es, tr }

export function getChatWidgetPageContent(locale: string): ChatWidgetPageContent {
  return CHAT_WIDGET_CONTENT_BY_LOCALE[locale] || CHAT_WIDGET_CONTENT_BY_LOCALE.en
}
