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
      'Generate a free WhatsApp chat widget for your website. Set the number, welcome message, color and position, then paste one HTML snippet. No signup needed.',
    ogDescription: "Add a floating WhatsApp button to any website with a free HTML snippet. You don't need an account.",
  },
  hero: {
    tag: 'FREE TOOL · NO SIGNUP',
    h1Lead: 'Add A',
    h1Brand: 'WhatsApp',
    h1Rest: 'Chat Widget To Your Site',
    h1Highlight: 'For Free',
    subtitle:
      "Pick the number, the welcome message and the color. Copy the HTML, paste it just before your site's closing body tag, and a WhatsApp button appears in the corner of every page. If you set a welcome message, it's already typed when the chat opens.",
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
    h2: 'Build Your WhatsApp Chat Widget',
    subtitle: 'Enter your number, write a welcome message and choose a color. The HTML snippet updates as you type.',
  },
  useCases: {
    h2: 'Where The WhatsApp Widget Pays Off',
    subtitle:
      'The button stays in the corner while people read, so they can message you without leaving the page.',
    contactTitle: 'On contact and pricing pages',
    contactBody:
      'People on these pages usually have a specific question. The widget lets them ask it in one click instead of hunting for your email address or filling in a form.',
    productTitle: 'On product and checkout pages',
    productBody:
      'In ecommerce and SaaS, one unanswered question at checkout can cost you the sale. The widget gives the buyer a quick way to ask before they give up.',
    supportTitle: 'On help and support pages',
    supportBody:
      "Someone reading your help docs already has a problem. When the article doesn't solve it, a WhatsApp button is a faster way out than opening a support ticket.",
  },
  seo: {
    h2: 'What Is A WhatsApp Chat Widget?',
    p1:
      'A WhatsApp chat widget is a small button fixed to the corner of your website. When a visitor clicks it, WhatsApp opens a chat with your number, and your welcome message is already in the text box. Think of it as a wa.me link turned into a button that never scrolls out of view.',
    p2Pre: 'The snippet is plain HTML: one fixed-position anchor tag, styled with inline CSS, that points to ',
    p2Post:
      ". It doesn't load any external script or tracker. Paste it once and it keeps working until you change your number.",
    h3: 'Where The Widget Actually Earns Its Keep',
    p3:
      "Put the widget on pages where people are close to a decision: contact, pricing, product detail and post-purchase support pages. For SaaS, the in-app help menu is another good spot. Anywhere a visitor might think 'I just want to talk to someone,' the button is already there.",
    p4Pre:
      "The widget starts a conversation, but on its own it won't tell you who the visitor is or which page they were on. For that, the chat needs to end up in your CRM. With ",
    p4LinkText: 'Eazybe',
    p4Post:
      " connected, those WhatsApp chats are logged in HubSpot, Salesforce, Zoho or Pipedrive. Mention the page in your welcome message and you'll also see where each chat started.",
  },
  benefits: {
    h2Lead: 'Why Add A Floating',
    h2Em: 'WhatsApp Button',
    subtitle:
      'The button stays on screen as visitors scroll, so nobody has to dig around for your contact details.',
    noSetupTitle: 'Paste once, done',
    noSetupBody:
      "The snippet is plain HTML with inline CSS. It works on WordPress, Webflow, Shopify, Wix, Squarespace or a site you coded yourself. There's no script to load and no plugin to keep updated.",
    prefilledTitle: 'Welcome message built in',
    prefilledBody:
      "Write the first message yourself so every chat opens with some context, like 'Hi, I'm looking at your pricing page' or 'Question about the Pro plan'. The customer sees it pre-filled and just taps Send.",
    conversionTitle: 'Easier than a contact form',
    conversionBody:
      'A form asks for a paragraph and then makes people wait for an email. The widget asks for one line, and your reply lands in a WhatsApp chat they already check all day.',
    mobileTitle: 'Built for phones',
    mobileBody:
      'On a phone, the button sits near the bottom of the screen, within easy reach of a thumb, and opens the WhatsApp app directly. Someone who arrived from Instagram or Google can start a chat without filling in a form.',
  },
  benefitCards: {
    h2Lead: 'Get The Free WhatsApp Chat Widget,',
    h2Em: 'Without The Subscription',
    alwaysTitle: 'Free to run',
    alwaysBody:
      "Live chat tools usually charge per agent, every month. This widget is a static HTML snippet. Nothing runs on a server, so there's nothing to pay for.",
    brandTitle: 'Match your brand',
    brandBody:
      'Pick the button color, the corner it sits in and the text on it. It stays small and out of the way until someone wants to talk.',
    crmTitle: 'Connect to your CRM',
    crmBody:
      'Add Eazybe and the WhatsApp chats your widget brings in are saved to HubSpot, Salesforce, Zoho or Pipedrive, next to the contact record.',
  },
  faq: {
    h2: 'WhatsApp Chat Widget Questions, Answered',
    items: [
      { q: 'Is this WhatsApp Chat Widget really free?', a: "Yes. You don't need an account, the button carries no watermark, and there's no monthly fee. Use it on as many sites as you like, client sites included." },
      { q: 'Will this work on WordPress, Shopify, Webflow, or Wix?', a: 'Yes. The snippet is plain HTML, so it works on any platform that lets you paste HTML or embed code. In WordPress, use a Custom HTML block or your theme footer; in Shopify, add it to theme.liquid or a custom Liquid block. Webflow and Wix both have a custom code or embed option in the site settings.' },
      { q: 'Does the widget slow down my site?', a: 'Not noticeably. The snippet is one anchor tag with inline CSS and an inline SVG icon, so the browser makes no extra requests. It adds about 2 KB to the page.' },
      { q: 'Can I customize the color, position, and label?', a: 'Yes. The form lets you set the button color, choose bottom right or bottom left, and write the button label and welcome message. The snippet uses inline styles, so you can also edit the colors and padding by hand.' },
      { q: 'Will it work on both Personal and WhatsApp Business numbers?', a: 'Yes. The widget uses a wa.me link, which opens whatever WhatsApp account is registered to that number. Personal accounts, the WhatsApp Business app and the Business API all work.' },
      { q: 'How is the widget different from a wa.me chat link?', a: 'A wa.me link is just a URL. The widget is the button on your site that opens that URL, styled and fixed to a corner of the screen.' },
      { q: 'Does it work on mobile?', a: 'Yes. On phones the button stays pinned to the bottom corner, and tapping it opens the WhatsApp app instead of WhatsApp Web. It works in iOS, Android and desktop browsers.' },
      { q: 'Can I track clicks on the widget?', a: "Not from this tool. To count clicks, send the link through a shortener like Bitly or Rebrandly, or add a Google Analytics event to the link's onclick attribute. If you use Eazybe, the chats themselves are logged in your CRM, which tells you more than a click count." },
      { q: 'Can I show the widget only on certain pages?', a: "Yes. Paste the snippet only on the pages where you want it. In WordPress, use a Custom HTML block on those pages or wrap it in a PHP conditional in the theme footer. In Shopify, use a Liquid {% if template == 'product' %} block. Any condition that controls HTML output controls the widget too." },
      { q: 'Will it conflict with Intercom, Drift, or another live chat tool?', a: 'Both sit in the bottom corner, so the two buttons overlap. Move one of them: switch the WhatsApp widget to bottom left, or change bottom:24px to bottom:96px so it sits above the other chat bubble. If WhatsApp is the only channel you need, removing the other tool is simpler.' },
      { q: 'Do I need a cookie banner or GDPR consent for it?', a: "The widget sets no cookies and loads no tracking script, so on its own it doesn't require a consent banner. Once someone opens a chat, that conversation is covered by your privacy policy and Meta's, like any other WhatsApp message. If you add Bitly or another shortener for tracking, it may set cookies, so check with your DPO first." },
      { q: 'How do I add it to a Next.js, React, or Vue app?', a: 'The snippet is plain HTML. In React or Vue, the quickest option is to paste it into public/index.html; Vue templates also accept it as is. In Next.js, add it to app/layout.tsx and convert the inline style string into a JSX style object. Nothing in it depends on a framework.' },
    ],
  },
  cta: {
    badge: 'Next Step',
    h2: 'Want More Than Just A Widget?',
    subtitle:
      'Eazybe saves every inbound WhatsApp chat to HubSpot, Salesforce, Zoho or Pipedrive. When nobody on your team is online, an AI agent can answer and qualify the lead before a rep picks it up.',
    primary: 'Try Eazybe Free →',
    secondary: 'Book a Demo',
    footnote: '4-day free trial · No credit card required · Cancel anytime',
  },
  generator: {
    formTitle: 'Configure your widget',
    numberLabel: 'WhatsApp number',
    countryAria: 'Country code',
    phonePlaceholder: 'Phone number',
    phoneAria: 'Phone number',
    messageLabel: 'Welcome message',
    messageOptional: '(optional)',
    messagePlaceholder: "Hi, I'd like to know more about your product.",
    messageCounter: '{count}/400 · pre-filled when the customer opens the chat',
    buttonLabelLabel: 'Button label',
    buttonLabelPlaceholder: 'Chat with us',
    positionLabel: 'Button position',
    positionBottomRight: 'Bottom right',
    positionBottomLeft: 'Bottom left',
    colorLabel: 'Brand color',
    errorEmpty: 'Enter a WhatsApp number first.',
    errorShort: 'That phone number looks too short.',
    btnGenerate: 'Generate Snippet',
    outputTitle: 'Your WhatsApp Chat Widget',
    emptyState: 'Enter your WhatsApp number on the left and your snippet will appear here.',
    previewTitle: 'Preview',
    snippetLabel: 'HTML snippet',
    btnCopySnippet: 'Copy HTML',
    btnOpen: 'Test in WhatsApp',
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
      'Crie grátis um widget de chat do WhatsApp para o seu site. Escolha número, mensagem, cor e posição e cole um único snippet HTML. Sem cadastro.',
    ogDescription: 'Adicione um botão flutuante do WhatsApp a qualquer site com um snippet HTML gratuito. Não precisa criar conta.',
  },
  hero: {
    tag: 'FERRAMENTA GRÁTIS · SEM CADASTRO',
    h1Lead: 'Adicione Um Widget De Chat Do',
    h1Brand: 'WhatsApp',
    h1Rest: 'Ao Seu Site',
    h1Highlight: 'Grátis',
    subtitle:
      'Escolha o número, a mensagem de boas-vindas e a cor. Copie o HTML, cole logo antes da tag de fechamento do body e um botão do WhatsApp aparece no canto do seu site. Se você definir uma mensagem de boas-vindas, a conversa já abre com ela digitada.',
    cta: 'Crie Seu Widget →',
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
    h2: 'Crie Seu Widget De Chat Do WhatsApp',
    subtitle: 'Digite seu número, escreva a mensagem de boas-vindas e escolha uma cor. O snippet HTML se atualiza enquanto você digita.',
  },
  useCases: {
    h2: 'Onde O Widget Do WhatsApp Faz Diferença',
    subtitle:
      'O botão fica no canto enquanto a pessoa lê, então ela fala com você sem sair da página.',
    contactTitle: 'Em páginas de contato e preços',
    contactBody:
      'Quem chega nessas páginas geralmente tem uma pergunta específica. Com o widget, basta um clique para perguntar, sem procurar seu e-mail nem preencher formulário.',
    productTitle: 'Em páginas de produto e checkout',
    productBody:
      'Em e-commerce e SaaS, uma dúvida sem resposta no checkout pode custar a venda. O widget dá ao comprador um jeito rápido de perguntar antes de desistir.',
    supportTitle: 'Em páginas de ajuda e suporte',
    supportBody:
      'Quem está lendo sua central de ajuda já tem um problema. Se o artigo não resolve, um botão do WhatsApp é uma saída mais rápida do que abrir um chamado.',
  },
  seo: {
    h2: 'O Que É Um Widget De Chat Do WhatsApp?',
    p1:
      'Um widget de chat do WhatsApp é um pequeno botão fixo no canto do seu site. Quando o visitante clica, o WhatsApp abre uma conversa com o seu número e a mensagem de boas-vindas já digitada. Na prática, é um link wa.me transformado num botão que fica sempre à vista.',
    p2Pre: 'O snippet é HTML puro: uma tag de link com posição fixa e CSS inline que aponta para ',
    p2Post:
      '. Ele não carrega script externo nem rastreador. Você cola uma vez e ele continua funcionando até você trocar de número.',
    h3: 'Onde O Widget Realmente Vale A Pena',
    p3:
      "Coloque o widget nas páginas em que a pessoa está perto de decidir: contato, preços, detalhe do produto e suporte pós-venda. Em SaaS, o menu de ajuda dentro do app também é um bom lugar. Onde quer que o visitante pense 'só quero falar com alguém', o botão já está lá.",
    p4Pre:
      'O widget inicia a conversa, mas sozinho não diz quem é o visitante nem de qual página ele veio. Para isso, a conversa precisa chegar ao seu CRM. Com o ',
    p4LinkText: 'Eazybe',
    p4Post:
      ' conectado, essas conversas de WhatsApp ficam registradas no HubSpot, Salesforce, Zoho ou Pipedrive. Se você citar a página na mensagem de boas-vindas, também vai saber onde cada conversa começou.',
  },
  benefits: {
    h2Lead: 'Por Que Adicionar Um',
    h2Em: 'Botão Do WhatsApp',
    subtitle:
      'O botão continua na tela enquanto o visitante rola a página, então ninguém precisa procurar seus contatos.',
    noSetupTitle: 'Cole uma vez e pronto',
    noSetupBody:
      'O snippet é HTML puro com CSS inline. Funciona em WordPress, Webflow, Shopify, Wix, Squarespace ou num site feito à mão. Não tem script para carregar nem plugin para atualizar.',
    prefilledTitle: 'Mensagem de boas-vindas embutida',
    prefilledBody:
      "Escreva você mesmo a primeira mensagem para que cada conversa já comece com contexto, como 'Oi, estou vendo a página de preços' ou 'Tenho uma dúvida sobre o plano Pro'. O cliente vê a mensagem pronta e só toca em Enviar.",
    conversionTitle: 'Mais fácil que um formulário',
    conversionBody:
      'Um formulário pede um parágrafo e depois uma espera pelo e-mail de resposta. O widget pede uma linha, e a sua resposta chega numa conversa de WhatsApp que a pessoa abre o dia inteiro.',
    mobileTitle: 'Feito para o celular',
    mobileBody:
      'No celular, o botão fica na parte de baixo da tela, ao alcance do polegar, e abre direto o app do WhatsApp. Quem chegou pelo Instagram ou pelo Google começa a conversa sem preencher formulário nenhum.',
  },
  benefitCards: {
    h2Lead: 'Tenha O Widget De Chat Do WhatsApp Grátis,',
    h2Em: 'Sem Assinatura',
    alwaysTitle: 'Não custa nada',
    alwaysBody:
      'Ferramentas de chat ao vivo costumam cobrar por atendente, todo mês. Este widget é um snippet HTML estático: não roda em nenhum servidor, então não há nada para pagar.',
    brandTitle: 'Com as cores da sua marca',
    brandBody:
      'Escolha a cor do botão, o canto em que ele aparece e o texto. Ele ocupa pouco espaço e não atrapalha até alguém querer conversar.',
    crmTitle: 'Conecte ao seu CRM',
    crmBody:
      'Adicione o Eazybe e as conversas de WhatsApp que chegam pelo widget ficam salvas no HubSpot, Salesforce, Zoho ou Pipedrive, junto do registro do contato.',
  },
  faq: {
    h2: 'Perguntas Frequentes Sobre O Widget De Chat Do WhatsApp',
    items: [
      { q: 'Este Widget de Chat do WhatsApp é mesmo gratuito?', a: "Sim. Não precisa criar conta, o botão não leva marca d'água e não há mensalidade. Você pode usar em quantos sites quiser, inclusive nos sites dos seus clientes." },
      { q: 'Funciona em WordPress, Shopify, Webflow ou Wix?', a: 'Sim. O snippet é HTML puro, então funciona em qualquer plataforma que permita colar HTML ou código embed. No WordPress, use um bloco HTML personalizado ou o rodapé do tema; no Shopify, o theme.liquid ou um bloco Liquid personalizado. Webflow e Wix têm a opção de código personalizado ou embed nas configurações do site.' },
      { q: 'O widget deixa meu site mais lento?', a: 'Não de forma perceptível. O snippet é uma única tag de link com CSS inline e um ícone SVG embutido, então o navegador não faz nenhuma requisição extra. Ele acrescenta cerca de 2 KB à página.' },
      { q: 'Posso personalizar a cor, a posição e o texto?', a: 'Sim. O formulário permite escolher a cor do botão, o canto (inferior direito ou esquerdo), o texto do botão e a mensagem de boas-vindas. O snippet usa estilos inline, então você também pode ajustar cores e espaçamento direto no código.' },
      { q: 'Funciona com números pessoais e do WhatsApp Business?', a: 'Sim. O widget usa um link wa.me, que abre a conta de WhatsApp registrada naquele número. Funciona com contas pessoais, com o app WhatsApp Business e com a API do WhatsApp Business.' },
      { q: 'Qual a diferença entre o widget e um link de chat wa.me?', a: 'Um link wa.me é só uma URL. O widget é o botão no seu site que abre essa URL, com visual próprio e fixo num canto da tela.' },
      { q: 'Funciona no celular?', a: 'Sim. No celular, o botão fica fixo no canto inferior e, ao tocar, abre o app do WhatsApp em vez do WhatsApp Web. Funciona em iOS, Android e navegadores de desktop.' },
      { q: 'Posso medir os cliques no widget?', a: 'Não por esta ferramenta. Para contar cliques, passe o link por um encurtador como Bitly ou Rebrandly, ou adicione um evento do Google Analytics no atributo onclick do link. Se você usa o Eazybe, as próprias conversas ficam registradas no seu CRM, o que diz mais do que uma contagem de cliques.' },
      { q: 'Posso mostrar o widget só em algumas páginas?', a: "Sim. Cole o snippet só nas páginas em que você quer o botão. No WordPress, use um bloco HTML personalizado nessas páginas ou coloque o código dentro de uma condicional PHP no rodapé do tema. No Shopify, use um bloco Liquid {% if template == 'product' %}. Qualquer condição que controle a saída de HTML também controla o widget." },
      { q: 'Ele conflita com Intercom, Drift ou outra ferramenta de chat ao vivo?', a: 'Os dois ficam no canto inferior, então os botões se sobrepõem. Mude um deles de lugar: passe o widget do WhatsApp para o canto inferior esquerdo ou troque bottom:24px por bottom:96px para ele ficar acima da outra bolha de chat. Se você só precisa do WhatsApp, remover a outra ferramenta é mais simples.' },
      { q: 'Preciso de aviso de cookies ou consentimento pela LGPD/GDPR?', a: 'O widget não grava cookies nem carrega script de rastreamento, então sozinho ele não exige aviso de consentimento. Quando alguém abre a conversa, ela fica coberta pela sua política de privacidade e pela da Meta, como qualquer outra mensagem de WhatsApp. Se você adicionar o Bitly ou outro encurtador para medir cliques, esse serviço pode gravar cookies, então confirme antes com o seu encarregado de dados (DPO).' },
      { q: 'Como adiciono o widget num app Next.js, React ou Vue?', a: 'O snippet é HTML puro. Em React ou Vue, o mais rápido é colar no public/index.html; os templates do Vue também aceitam o código como está. No Next.js, adicione em app/layout.tsx e converta o atributo style em um objeto de estilo JSX. Ele não depende de nenhum framework.' },
    ],
  },
  cta: {
    badge: 'Próximo Passo',
    h2: 'Quer Mais Que Só Um Widget?',
    subtitle:
      'O Eazybe salva cada conversa de WhatsApp recebida no HubSpot, Salesforce, Zoho ou Pipedrive. Quando ninguém da equipe está online, um agente de IA pode responder e qualificar o lead antes de um vendedor assumir.',
    primary: 'Teste o Eazybe Grátis →',
    secondary: 'Agendar Demo',
    footnote: '4 dias grátis · Sem cartão de crédito · Cancele quando quiser',
  },
  generator: {
    formTitle: 'Configure seu widget',
    numberLabel: 'Número do WhatsApp',
    countryAria: 'Código do país',
    phonePlaceholder: 'Número de telefone',
    phoneAria: 'Número de telefone',
    messageLabel: 'Mensagem de boas-vindas',
    messageOptional: '(opcional)',
    messagePlaceholder: 'Oi, gostaria de saber mais sobre o produto de vocês.',
    messageCounter: '{count}/400 · aparece digitada quando o cliente abre a conversa',
    buttonLabelLabel: 'Texto do botão',
    buttonLabelPlaceholder: 'Fale com a gente',
    positionLabel: 'Posição do botão',
    positionBottomRight: 'Inferior direito',
    positionBottomLeft: 'Inferior esquerdo',
    colorLabel: 'Cor da marca',
    errorEmpty: 'Digite primeiro um número de WhatsApp.',
    errorShort: 'Esse número parece curto demais.',
    btnGenerate: 'Gerar Snippet',
    outputTitle: 'Seu Widget De Chat Do WhatsApp',
    emptyState: 'Digite seu número de WhatsApp à esquerda e o snippet aparece aqui.',
    previewTitle: 'Pré-visualização',
    snippetLabel: 'Snippet HTML',
    btnCopySnippet: 'Copiar HTML',
    btnOpen: 'Testar no WhatsApp',
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
      'Crea gratis un widget de chat de WhatsApp para tu sitio web. Elige número, mensaje, color y posición, y pega un solo snippet HTML. Sin registro.',
    ogDescription: 'Agrega un botón flotante de WhatsApp a cualquier sitio con un snippet HTML gratis. No necesitas crear una cuenta.',
  },
  hero: {
    tag: 'HERRAMIENTA GRATIS · SIN REGISTRO',
    h1Lead: 'Agrega Un Widget De Chat De',
    h1Brand: 'WhatsApp',
    h1Rest: 'A Tu Sitio',
    h1Highlight: 'Gratis',
    subtitle:
      'Elige el número, el mensaje de bienvenida y el color. Copia el HTML, pégalo justo antes de la etiqueta de cierre del body y aparecerá un botón de WhatsApp en la esquina de tu sitio. Si escribiste un mensaje de bienvenida, el chat se abre con ese texto listo para enviar.',
    cta: 'Crea Tu Widget →',
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
    h2: 'Crea Tu Widget De Chat De WhatsApp',
    subtitle: 'Escribe tu número y el mensaje de bienvenida, y elige un color. El snippet HTML se actualiza mientras escribes.',
  },
  useCases: {
    h2: 'Dónde Le Sacas Provecho Al Widget De WhatsApp',
    subtitle:
      'El botón se queda en la esquina mientras la gente lee, así que pueden escribirte sin salir de la página.',
    contactTitle: 'En páginas de contacto y precios',
    contactBody:
      'Quien llega a estas páginas suele tener una pregunta concreta. Con el widget la hace en un clic, sin buscar tu correo ni llenar un formulario.',
    productTitle: 'En páginas de producto y pago',
    productBody:
      'En ecommerce y SaaS, una duda sin resolver en el checkout puede costarte la venta. El widget le da al comprador una forma rápida de preguntar antes de abandonar la compra.',
    supportTitle: 'En páginas de ayuda y soporte',
    supportBody:
      'Quien lee tu centro de ayuda ya tiene un problema. Si el artículo no lo resuelve, un botón de WhatsApp es una salida más rápida que abrir un ticket.',
  },
  seo: {
    h2: '¿Qué Es Un Widget De Chat De WhatsApp?',
    p1:
      'Un widget de chat de WhatsApp es un botón pequeño fijo en la esquina de tu sitio. Cuando un visitante hace clic, WhatsApp abre un chat con tu número y tu mensaje de bienvenida ya escrito. En pocas palabras, es un enlace wa.me convertido en un botón que siempre está a la vista.',
    p2Pre: 'El snippet es HTML simple: una etiqueta de enlace con posición fija y estilos CSS en línea que apunta a ',
    p2Post:
      '. No carga scripts externos ni rastreadores. Lo pegas una vez y sigue funcionando hasta que cambies de número.',
    h3: 'Dónde El Widget Realmente Vale La Pena',
    p3:
      "Ponlo en las páginas donde la gente está cerca de decidir: contacto, precios, detalle de producto y soporte posventa. En un SaaS, el menú de ayuda dentro de la app también funciona. Donde un visitante pueda pensar 'solo quiero hablar con alguien', el botón ya está ahí.",
    p4Pre:
      'El widget inicia la conversación, pero por sí solo no te dice quién es el visitante ni desde qué página escribió. Para eso, el chat tiene que llegar a tu CRM. Con ',
    p4LinkText: 'Eazybe',
    p4Post:
      ' conectado, esos chats de WhatsApp quedan registrados en HubSpot, Salesforce, Zoho o Pipedrive. Si mencionas la página en el mensaje de bienvenida, también verás dónde empezó cada chat.',
  },
  benefits: {
    h2Lead: 'Por Qué Agregar Un',
    h2Em: 'Botón De WhatsApp',
    subtitle:
      'El botón sigue en pantalla mientras el visitante se desplaza por la página, así que nadie tiene que buscar tus datos de contacto.',
    noSetupTitle: 'Pégalo una vez y listo',
    noSetupBody:
      'El snippet es HTML simple con CSS en línea. Funciona en WordPress, Webflow, Shopify, Wix, Squarespace o en un sitio programado a mano. No hay script que cargar ni plugin que actualizar.',
    prefilledTitle: 'Mensaje de bienvenida incluido',
    prefilledBody:
      "Escribe tú el primer mensaje para que cada chat empiece con contexto, por ejemplo 'Hola, estoy viendo su página de precios' o 'Tengo una duda sobre el plan Pro'. El cliente lo ve ya escrito y solo toca Enviar.",
    conversionTitle: 'Más fácil que un formulario',
    conversionBody:
      'Un formulario pide un párrafo y después obliga a esperar un correo. El widget pide una sola línea, y tu respuesta llega a un chat de WhatsApp que la persona revisa todo el día.',
    mobileTitle: 'Pensado para celular',
    mobileBody:
      'En el celular, el botón queda abajo, al alcance del pulgar, y abre directamente la app de WhatsApp. Quien llegó desde Instagram o Google puede iniciar un chat sin llenar ningún formulario.',
  },
  benefitCards: {
    h2Lead: 'Obtén El Widget De Chat De WhatsApp Gratis,',
    h2Em: 'Sin Suscripción',
    alwaysTitle: 'No cuesta nada',
    alwaysBody:
      'Las herramientas de chat en vivo suelen cobrar por agente cada mes. Este widget es un snippet HTML estático: no corre en ningún servidor, así que no hay nada que pagar.',
    brandTitle: 'Con los colores de tu marca',
    brandBody:
      'Elige el color del botón, la esquina donde aparece y el texto. Ocupa poco espacio y no estorba hasta que alguien quiere hablar.',
    crmTitle: 'Conéctalo a tu CRM',
    crmBody:
      'Agrega Eazybe y los chats de WhatsApp que llegan por el widget se guardan en HubSpot, Salesforce, Zoho o Pipedrive, junto al registro del contacto.',
  },
  faq: {
    h2: 'Preguntas Frecuentes Sobre El Widget De Chat De WhatsApp',
    items: [
      { q: '¿Este Widget de Chat de WhatsApp es realmente gratis?', a: 'Sí. No necesitas crear una cuenta, el botón no lleva marca de agua y no hay cuota mensual. Puedes usarlo en todos los sitios que quieras, incluidos los de tus clientes.' },
      { q: '¿Funciona en WordPress, Shopify, Webflow o Wix?', a: 'Sí. El snippet es HTML simple, así que funciona en cualquier plataforma que te deje pegar HTML o código embed. En WordPress, usa un bloque HTML personalizado o el pie de página del tema; en Shopify, theme.liquid o un bloque Liquid personalizado. Webflow y Wix tienen una opción de código personalizado o embed en la configuración del sitio.' },
      { q: '¿El widget ralentiza mi sitio?', a: 'No de forma notable. El snippet es una sola etiqueta de enlace con CSS en línea y un ícono SVG incluido, así que el navegador no hace peticiones extra. Agrega unos 2 KB a la página.' },
      { q: '¿Puedo personalizar el color, la posición y el texto?', a: 'Sí. El formulario te deja elegir el color del botón, la esquina (inferior derecha o izquierda), el texto del botón y el mensaje de bienvenida. El snippet usa estilos en línea, así que también puedes cambiar los colores y el espaciado a mano.' },
      { q: '¿Funciona con números personales y de WhatsApp Business?', a: 'Sí. El widget usa un enlace wa.me, que abre la cuenta de WhatsApp registrada con ese número. Funciona con cuentas personales, con la app WhatsApp Business y con la API de WhatsApp Business.' },
      { q: '¿En qué se diferencia el widget de un enlace de chat wa.me?', a: 'Un enlace wa.me es solo una URL. El widget es el botón de tu sitio que abre esa URL, con estilo propio y fijo en una esquina de la pantalla.' },
      { q: '¿Funciona en celulares?', a: 'Sí. En el celular, el botón queda fijo en la esquina inferior y al tocarlo abre la app de WhatsApp en lugar de WhatsApp Web. Funciona en iOS, Android y navegadores de escritorio.' },
      { q: '¿Puedo medir los clics en el widget?', a: 'No desde esta herramienta. Para contar clics, pasa el enlace por un acortador como Bitly o Rebrandly, o agrega un evento de Google Analytics en el atributo onclick del enlace. Si usas Eazybe, los chats quedan registrados en tu CRM, y eso dice más que un conteo de clics.' },
      { q: '¿Puedo mostrar el widget solo en ciertas páginas?', a: "Sí. Pega el snippet solo en las páginas donde lo quieras. En WordPress, usa un bloque HTML personalizado en esas páginas o envuélvelo en un condicional PHP en el pie del tema. En Shopify, usa un bloque Liquid {% if template == 'product' %}. Cualquier condición que controle la salida de HTML también controla el widget." },
      { q: '¿Choca con Intercom, Drift u otra herramienta de chat en vivo?', a: 'Los dos se ubican en la esquina inferior, así que los botones se superponen. Mueve uno: pasa el widget de WhatsApp a la esquina inferior izquierda, o cambia bottom:24px por bottom:96px para que quede arriba de la otra burbuja de chat. Si solo necesitas WhatsApp, es más sencillo quitar la otra herramienta.' },
      { q: '¿Necesito un aviso de cookies o consentimiento por GDPR?', a: 'El widget no instala cookies ni carga scripts de rastreo, así que por sí solo no exige un aviso de consentimiento. Cuando alguien abre el chat, esa conversación queda cubierta por tu política de privacidad y la de Meta, como cualquier otro mensaje de WhatsApp. Si agregas Bitly u otro acortador para medir clics, ese servicio puede instalar cookies, así que consúltalo antes con tu responsable de protección de datos.' },
      { q: '¿Cómo lo agrego a una app de Next.js, React o Vue?', a: 'El snippet es HTML simple. En React o Vue, lo más rápido es pegarlo en public/index.html; las plantillas de Vue también lo aceptan tal cual. En Next.js, agrégalo en app/layout.tsx y convierte el atributo style en un objeto de estilos JSX. No depende de ningún framework.' },
    ],
  },
  cta: {
    badge: 'Siguiente Paso',
    h2: '¿Quieres Más Que Solo Un Widget?',
    subtitle:
      'Eazybe guarda cada chat entrante de WhatsApp en HubSpot, Salesforce, Zoho o Pipedrive. Cuando nadie de tu equipo está en línea, un agente de IA puede responder y calificar el lead antes de que lo tome un vendedor.',
    primary: 'Prueba Eazybe Gratis →',
    secondary: 'Agendar Demo',
    footnote: 'Prueba de 4 días · Sin tarjeta de crédito · Cancela cuando quieras',
  },
  generator: {
    formTitle: 'Configura tu widget',
    numberLabel: 'Número de WhatsApp',
    countryAria: 'Código de país',
    phonePlaceholder: 'Número de teléfono',
    phoneAria: 'Número de teléfono',
    messageLabel: 'Mensaje de bienvenida',
    messageOptional: '(opcional)',
    messagePlaceholder: 'Hola, me gustaría saber más sobre su producto.',
    messageCounter: '{count}/400 · aparece escrito cuando el cliente abre el chat',
    buttonLabelLabel: 'Texto del botón',
    buttonLabelPlaceholder: 'Escríbenos',
    positionLabel: 'Posición del botón',
    positionBottomRight: 'Inferior derecha',
    positionBottomLeft: 'Inferior izquierda',
    colorLabel: 'Color de marca',
    errorEmpty: 'Primero ingresa un número de WhatsApp.',
    errorShort: 'Ese número parece muy corto.',
    btnGenerate: 'Generar Snippet',
    outputTitle: 'Tu Widget De Chat De WhatsApp',
    emptyState: 'Ingresa tu número de WhatsApp a la izquierda y el snippet aparecerá aquí.',
    previewTitle: 'Vista previa',
    snippetLabel: 'Snippet HTML',
    btnCopySnippet: 'Copiar HTML',
    btnOpen: 'Probar en WhatsApp',
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
      "Web siteniz için ücretsiz WhatsApp sohbet widget'ı oluşturun. Numarayı, mesajı, rengi ve konumu seçin, tek bir HTML kodu yapıştırın. Kayıt gerekmez.",
    ogDescription: 'Ücretsiz bir HTML koduyla her siteye yüzen bir WhatsApp butonu ekleyin. Hesap açmanız gerekmez.',
  },
  hero: {
    tag: 'ÜCRETSİZ ARAÇ · KAYIT YOK',
    h1Lead: 'Sitenize',
    h1Brand: 'WhatsApp',
    h1Rest: "Sohbet Widget'ı",
    h1Highlight: 'Ücretsiz Ekleyin',
    subtitle:
      'Numarayı, karşılama mesajını ve rengi seçin. HTML kodunu kopyalayıp sitenizdeki kapanış body etiketinin hemen önüne yapıştırın, köşede bir WhatsApp butonu belirsin. Karşılama mesajı yazdıysanız sohbet, bu mesaj yazılı halde açılır.',
    cta: "Widget'ınızı Oluşturun →",
    footnote: 'Kayıt yok · Filigran yok · Her sitede çalışır',
  },
  preview: {
    title: "Widget'ınızı yapılandırın",
    numberLabel: 'WhatsApp Numarası',
    messageLabel: 'Karşılama Mesajı',
    btnGenerate: 'Kod Oluştur',
    btnCopy: 'HTML Kopyala',
    linkAlt: "WhatsApp sohbet widget'ı önizlemesi",
  },
  tryItNow: {
    h2: "WhatsApp Sohbet Widget'ınızı Oluşturun",
    subtitle: 'Numaranızı girin, karşılama mesajını yazın ve bir renk seçin. HTML kodu siz yazdıkça güncellenir.',
  },
  useCases: {
    h2: "WhatsApp Widget'ı En Çok Nerede İşe Yarar",
    subtitle:
      'Ziyaretçi sayfayı okurken buton köşede durur, böylece sayfadan ayrılmadan size yazabilir.',
    contactTitle: 'İletişim ve fiyat sayfalarında',
    contactBody:
      'Bu sayfalara gelenlerin genelde net bir sorusu olur. Widget sayesinde e-posta adresinizi aramadan ya da form doldurmadan, tek tıkla sorabilirler.',
    productTitle: 'Ürün ve ödeme sayfalarında',
    productBody:
      "E-ticarette ve SaaS'ta ödeme adımında cevapsız kalan tek bir soru satışı kaçırmanıza yol açabilir. Widget, alıcıya vazgeçmeden önce soru sormanın hızlı bir yolunu sunar.",
    supportTitle: 'Yardım ve destek sayfalarında',
    supportBody:
      'Yardım makalelerinizi okuyan biri zaten bir sorun yaşıyordur. Makale sorunu çözmezse WhatsApp butonu, destek talebi açmaktan daha hızlı bir çıkış yolu olur.',
  },
  seo: {
    h2: "WhatsApp Sohbet Widget'ı Nedir?",
    p1:
      "WhatsApp sohbet widget'ı, sitenizin köşesine sabitlenen küçük bir butondur. Ziyaretçi tıkladığında WhatsApp sizin numaranızla bir sohbet açar ve karşılama mesajınız yazı kutusunda hazır bekler. Kısacası, ekranda hep görünen bir butona dönüştürülmüş bir wa.me linkidir.",
    p2Pre: 'Kodun kendisi düz HTML: inline CSS ile biçimlendirilmiş, sabit konumlu tek bir link etiketi. Gittiği adres: ',
    p2Post:
      '. Harici bir script ya da takip kodu yüklemez. Bir kez yapıştırırsınız, numaranızı değiştirene kadar çalışmaya devam eder.',
    h3: "Widget'ın Gerçekten İşe Yaradığı Yerler",
    p3:
      "Widget'ı ziyaretçinin karar vermeye yakın olduğu sayfalara koyun: iletişim, fiyatlandırma, ürün detayı ve satış sonrası destek sayfaları. SaaS ürünlerinde uygulama içi yardım menüsü de iyi bir yerdir. Ziyaretçinin 'Biriyle konuşsam yeter' diye düşündüğü her yerde buton zaten orada olur.",
    p4Pre:
      "Widget sohbeti başlatır ama tek başına ziyaretçinin kim olduğunu ya da hangi sayfadan geldiğini söylemez. Bunun için sohbetin CRM'inize düşmesi gerekir. ",
    p4LinkText: 'Eazybe',
    p4Post:
      " bağlıysa bu WhatsApp sohbetleri HubSpot, Salesforce, Zoho veya Pipedrive'a kaydedilir. Karşılama mesajında sayfanın adını geçirirseniz her sohbetin nereden başladığını da görürsünüz.",
  },
  benefits: {
    h2Lead: 'Yüzen WhatsApp Butonunun',
    h2Em: 'Faydaları',
    subtitle:
      'Ziyaretçi sayfayı kaydırırken buton ekranda kalır, kimse iletişim bilgilerinizi aramak zorunda kalmaz.',
    noSetupTitle: 'Bir kez yapıştırın, bitti',
    noSetupBody:
      "Kod, inline CSS içeren düz HTML'dir. WordPress, Webflow, Shopify, Wix, Squarespace ya da elle kodlanmış her sitede çalışır. Yüklenecek bir script veya güncellenecek bir eklenti yoktur.",
    prefilledTitle: 'Hazır karşılama mesajı',
    prefilledBody:
      "İlk mesajı kendiniz yazın, her sohbet bağlamıyla başlasın. Örneğin 'Merhaba, fiyat sayfanıza bakıyorum' ya da 'Pro plan hakkında bir sorum var'. Müşteri mesajı hazır görür, yalnızca Gönder'e dokunur.",
    conversionTitle: 'Formdan daha kolay',
    conversionBody:
      'Form, ziyaretçiden bir paragraf yazmasını ve ardından e-posta cevabını beklemesini ister. Widget tek satır ister; cevabınız da kişinin gün boyu baktığı WhatsApp sohbetine gelir.',
    mobileTitle: 'Telefona uygun',
    mobileBody:
      "Telefonda buton ekranın alt kısmında, başparmağın kolayca ulaşacağı yerde durur ve doğrudan WhatsApp uygulamasını açar. Instagram'dan ya da Google'dan gelen biri form doldurmadan sohbet başlatabilir.",
  },
  benefitCards: {
    h2Lead: "Ücretsiz WhatsApp Sohbet Widget'ını Kullanın,",
    h2Em: 'Abonelik Olmadan',
    alwaysTitle: 'Hiçbir ücreti yok',
    alwaysBody:
      'Canlı sohbet araçları genelde temsilci başına aylık ücret alır. Bu widget statik bir HTML kodudur. Herhangi bir sunucuda çalışmadığı için ödenecek bir şey de yoktur.',
    brandTitle: 'Markanızın renginde',
    brandBody:
      'Butonun rengini, hangi köşede duracağını ve üzerindeki metni seçin. Küçük kalır ve biri konuşmak isteyene kadar göze batmaz.',
    crmTitle: "CRM'inize bağlayın",
    crmBody:
      "Eazybe'yi eklediğinizde widget üzerinden gelen WhatsApp sohbetleri HubSpot, Salesforce, Zoho veya Pipedrive'da ilgili kişi kaydıyla birlikte saklanır.",
  },
  faq: {
    h2: "WhatsApp Sohbet Widget'ı Hakkında Sık Sorulan Sorular",
    items: [
      { q: "Bu WhatsApp Sohbet Widget'ı gerçekten ücretsiz mi?", a: 'Evet. Hesap açmanız gerekmez, butonda filigran yoktur ve aylık ücret alınmaz. Müşteri siteleri dahil istediğiniz kadar sitede kullanabilirsiniz.' },
      { q: 'WordPress, Shopify, Webflow veya Wix üzerinde çalışır mı?', a: "Evet. Kod düz HTML olduğu için HTML veya embed kodu yapıştırmaya izin veren her platformda çalışır. WordPress'te Özel HTML bloğunu ya da tema altbilgisini, Shopify'da theme.liquid dosyasını veya özel bir Liquid bloğunu kullanabilirsiniz. Webflow ve Wix'te site ayarlarında özel kod ya da embed seçeneği bulunur." },
      { q: 'Widget sitemi yavaşlatır mı?', a: 'Fark edilir bir şekilde yavaşlatmaz. Kod, inline CSS ve gömülü bir SVG simgesi içeren tek bir link etiketidir, tarayıcı ek bir istek yapmaz. Sayfaya yaklaşık 2 KB ekler.' },
      { q: 'Rengi, konumu ve metni özelleştirebilir miyim?', a: 'Evet. Formda buton rengini, sağ alt veya sol alt köşeyi, buton metnini ve karşılama mesajını belirleyebilirsiniz. Kod inline stiller kullandığı için renkleri ve iç boşlukları doğrudan kodda da değiştirebilirsiniz.' },
      { q: 'Kişisel ve WhatsApp Business numaralarıyla çalışır mı?', a: 'Evet. Widget bir wa.me linki kullanır ve bu link, o numaraya kayıtlı WhatsApp hesabını açar. Kişisel hesaplar, WhatsApp Business uygulaması ve WhatsApp Business API ile çalışır.' },
      { q: "Widget'ın wa.me sohbet linkinden farkı ne?", a: "wa.me linki yalnızca bir URL'dir. Widget ise sitenizde bu URL'yi açan, biçimlendirilmiş ve ekranın bir köşesine sabitlenmiş butondur." },
      { q: 'Mobilde çalışır mı?', a: 'Evet. Telefonda buton alt köşede sabit kalır ve dokunulduğunda WhatsApp Web yerine WhatsApp uygulaması açılır. iOS, Android ve masaüstü tarayıcılarda çalışır.' },
      { q: "Widget'a gelen tıklamaları takip edebilir miyim?", a: "Bu araçla doğrudan takip edemezsiniz. Tıklamaları saymak için linki Bitly veya Rebrandly gibi bir kısaltma servisinden geçirin ya da linkin onclick özelliğine bir Google Analytics olayı ekleyin. Eazybe kullanıyorsanız sohbetlerin kendisi CRM'inize kaydedilir ve bu, tıklama sayısından çok daha fazlasını söyler." },
      { q: "Widget'ı sadece belirli sayfalarda gösterebilir miyim?", a: "Evet. Kodu yalnızca butonun görünmesini istediğiniz sayfalara ekleyin. WordPress'te o sayfalarda Özel HTML bloğu kullanın ya da kodu tema altbilgisinde bir PHP koşulunun içine alın. Shopify'da {% if template == 'product' %} gibi bir Liquid bloğu kullanın. HTML çıktısını kontrol eden her koşul widget'ı da kontrol eder." },
      { q: 'Intercom, Drift veya başka bir canlı sohbet aracıyla çakışır mı?', a: "İkisi de alt köşede durduğu için butonlar üst üste biner. Birini taşıyın: WhatsApp widget'ını sol alt köşeye alın ya da bottom:24px değerini bottom:96px yaparak diğer sohbet balonunun üstüne çıkarın. Yalnızca WhatsApp kullanacaksanız diğer aracı kaldırmak daha kolaydır." },
      { q: 'GDPR/KVKK için çerez bildirimi veya onay gerekir mi?', a: "Widget çerez bırakmaz ve takip scripti yüklemez, bu yüzden tek başına onay bildirimi gerektirmez. Biri sohbeti açtığında bu konuşma, diğer WhatsApp mesajları gibi sizin ve Meta'nın gizlilik politikalarına tabidir. Tıklamaları ölçmek için Bitly veya başka bir kısaltıcı eklerseniz o servis çerez bırakabilir, bu yüzden eklemeden önce veri sorumlunuza danışın." },
      { q: 'Next.js, React veya Vue uygulamasına nasıl eklerim?', a: "Kod düz HTML'dir. React veya Vue'da en hızlı yol, kodu public/index.html dosyasına yapıştırmaktır; Vue şablonları da kodu olduğu gibi kabul eder. Next.js'te app/layout.tsx içine ekleyin ve style özelliğini bir JSX stil nesnesine çevirin. Kod herhangi bir framework'e bağlı değildir." },
    ],
  },
  cta: {
    badge: 'Sonraki Adım',
    h2: "Sadece Bir Widget'tan Fazlasını mı İstiyorsunuz?",
    subtitle:
      "Eazybe, gelen her WhatsApp sohbetini HubSpot, Salesforce, Zoho veya Pipedrive'a kaydeder. Ekipten kimse çevrimiçi değilken bir Yapay Zeka ajanı yanıt verebilir ve lead'i, bir satış temsilcisi devralmadan önce nitelendirebilir.",
    primary: "Eazybe'yi Ücretsiz Deneyin →",
    secondary: 'Demo Planlayın',
    footnote: '4 gün ücretsiz · Kredi kartı gerekmez · İstediğiniz zaman iptal edin',
  },
  generator: {
    formTitle: "Widget'ınızı yapılandırın",
    numberLabel: 'WhatsApp numarası',
    countryAria: 'Ülke kodu',
    phonePlaceholder: 'Telefon numarası',
    phoneAria: 'Telefon numarası',
    messageLabel: 'Karşılama mesajı',
    messageOptional: '(isteğe bağlı)',
    messagePlaceholder: 'Merhaba, ürününüz hakkında daha fazla bilgi almak istiyorum.',
    messageCounter: '{count}/400 · müşteri sohbeti açtığında hazır yazılı olur',
    buttonLabelLabel: 'Buton metni',
    buttonLabelPlaceholder: 'Bize yazın',
    positionLabel: 'Buton konumu',
    positionBottomRight: 'Sağ alt',
    positionBottomLeft: 'Sol alt',
    colorLabel: 'Marka rengi',
    errorEmpty: 'Önce bir WhatsApp numarası girin.',
    errorShort: 'Bu telefon numarası çok kısa görünüyor.',
    btnGenerate: 'Kod Oluştur',
    outputTitle: "WhatsApp Sohbet Widget'ınız",
    emptyState: 'WhatsApp numaranızı soldaki alana girin, kodunuz burada görünecek.',
    previewTitle: 'Önizleme',
    snippetLabel: 'HTML kodu',
    btnCopySnippet: 'HTML Kopyala',
    btnOpen: "WhatsApp'ta Dene",
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
