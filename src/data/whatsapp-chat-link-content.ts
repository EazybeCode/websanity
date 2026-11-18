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
      'Free WhatsApp chat link generator. Make a wa.me link with a pre-filled message and paste it into emails, bios, ads or your site. No signup, no watermark.',
    ogDescription: "Make a wa.me link that opens WhatsApp with your message already typed. Free, and you don't need an account.",
  },
  hero: {
    tag: 'FREE TOOL · NO SIGNUP',
    h1Lead: 'Create Your',
    h1Brand: 'WhatsApp',
    h1Rest: 'Chat Link',
    h1Highlight: 'For Free',
    subtitle:
      "Enter your WhatsApp number and, if you like, an opening message. You get a wa.me link to paste into an email signature, a social bio or an ad. When a customer taps it, WhatsApp opens a chat with you and your message is already typed in. They don't have to save your number first.",
    cta: 'Create Chat Link →',
    footnote: 'No signup · No watermark · Use it anywhere',
  },
  preview: {
    title: 'Generate your chat link',
    numberLabel: 'WhatsApp Number (with country code)',
    messageLabel: 'Opening Message (Optional)',
    btnGenerate: 'Generate Link',
    btnCopy: 'Copy Link',
    linkAlt: 'Sample WhatsApp chat link',
  },
  tryItNow: {
    h2: 'Try The Free WhatsApp Chat Link Generator',
    subtitle: 'Pick your country code, type your number and an optional message, then copy the link.',
  },
  useCases: {
    h2: 'Where To Use Your WhatsApp Chat Link',
    subtitle: 'The link works anywhere someone can tap it. These are the usual spots.',
    emailTitle: 'In Email Signatures',
    emailBody:
      'Put it in your email signature, your newsletter footer or your order confirmation emails. A line like "Message us on WhatsApp" is enough. Whoever taps it gets a chat with your opening message already filled in.',
    bioTitle: 'In Bios And Link-In-Bio Pages',
    bioBody:
      'Add it to your Instagram, TikTok, LinkedIn or X bio, or to a Linktree-style page. Followers can message you directly instead of hunting for a contact form.',
    adsTitle: 'In Ads And Landing Pages',
    adsBody:
      'Use it as the destination URL for an ad, as the link behind a "Chat with us" button, or in a popup on your landing page. A visitor who taps it goes straight into a chat with you.',
  },
  seo: {
    h2: 'What Is A WhatsApp Chat Link?',
    p1:
      'A WhatsApp chat link, also called a click-to-chat or wa.me link, is a URL that opens a WhatsApp chat with your number. Someone taps it on their phone and the conversation opens, with your starter message already typed if you set one. Nobody has to type or save your number.',
    p2Pre: 'The link follows a fixed format: ',
    p2Post:
      '. This page builds it for you. It drops the plus sign and any spaces or dashes, URL-encodes your message, and warns you if the number looks too short. You enter a number and a message, and you get back a link that is ready to share.',
    h3: 'Where Chat Links Work Best',
    p3:
      'Chat links make sense wherever the customer is already looking at a screen they can tap: an email signature, an Instagram bio, a Google ad, a "Talk to us" button on your pricing page. For things people can only look at, like print, packaging or posters, use a QR code that points to the same wa.me link.',
    p4Pre:
      "You can also use the wa.me link as an ad destination URL, on landing page buttons, in a floating chat button, in your app's help menu or in abandoned-cart emails. If your team uses ",
    p4LinkText: 'Eazybe',
    p4Post:
      ', each chat that starts from the link is logged on the contact in HubSpot, Salesforce or Zoho, so you can see who reached out and what they said.',
  },
  benefits: {
    h2Lead: 'Why Use A WhatsApp',
    h2Em: 'Chat Link',
    subtitle:
      'A lot of people give up when they have to type a number, save a contact or search for your profile. A chat link skips those steps.',
    noInstallTitle: 'One Tap To Start A Chat',
    noInstallBody:
      'The link opens WhatsApp, which your customers probably already use. There is nothing to download and no form to fill in before they can ask their first question.',
    prefilledTitle: 'Your Opening Message, Pre-Filled',
    prefilledBody:
      'You write the first message. The customer sees it in the text box and only has to tap Send, so the first line already tells you what they want. For example: "Hi, I saw your ad" or "Can you send me a demo link?"',
    conversionTitle: 'Fewer Steps Than A Form',
    conversionBody:
      "A form leaves the customer waiting for an email reply. A chat link puts them in a conversation with a person, or with an AI agent if you use one, and they can see who they're talking to.",
    freeTitle: 'Free, With No Limits',
    freeBody: 'No watermark, no signup and no cap on how many links you make. You can use them for business.',
  },
  benefitCards: {
    h2Lead: 'What You Can Do With',
    h2Em: 'One Link',
    clickTitle: 'Straight Into WhatsApp',
    clickBody:
      "Put the link on your website, in ads or in your email signature. Each click opens a WhatsApp chat with you. You see the person's name and number and can reply right there, instead of working from an anonymous form submission.",
    everywhereTitle: 'Works Anywhere A Link Works',
    everywhereBody:
      'Email, SMS, social bios, ad creatives, button URLs, app deep links. If a hyperlink works there, the chat link does too, and it opens in WhatsApp, where many of your customers already spend their day.',
    leadsTitle: 'Collect Leads In One Tap',
    leadsBody:
      'Add the link to your Facebook ads, your Instagram bio or a "Talk to sales" button. A prospect who taps it starts a real conversation with you right away.',
  },
  faq: {
    h2: 'Common Questions About WhatsApp Chat Links',
    items: [
      { q: 'Is this WhatsApp Chat Link Generator really free?', a: "Yes. You don't need to sign up, there's no watermark, and you can make as many links as you want. You can use them for commercial purposes too." },
      { q: 'Will the link work on both Personal and WhatsApp Business numbers?', a: 'Yes. A wa.me link opens a chat with whatever WhatsApp account is registered to that number, whether it runs on the regular WhatsApp app, WhatsApp Business or the WhatsApp Business API.' },
      { q: 'Can I add a pre-filled message?', a: "Yes. Type the message in the optional field and it appears in the customer's text box when they open the chat, so they only have to tap Send. It's a good way to set context, for example: \"Hi, I saw your ad, can you tell me more?\"" },
      { q: 'Can I generate a chat link for a WhatsApp group?', a: 'No. wa.me links only work with individual phone numbers. To share a group, create an invite link inside WhatsApp (Group info > Invite via link).' },
      { q: 'Does this work without the WhatsApp app installed?', a: "On a phone, WhatsApp has to be installed for the chat to open. On a computer, the link can open WhatsApp Web in the browser, so the desktop app isn't required." },
      { q: 'How is this different from a WhatsApp QR code?', a: 'Both point to the same place, a wa.me URL. Use the link where people can tap or click, like emails, ads and bios. Use a QR code where they have to scan with a camera, like print, packaging and posters.' },
      { q: 'Does the WhatsApp chat link expire?', a: 'No. The link is tied to your phone number, so it keeps working as long as that number is on WhatsApp. There is nothing to renew.' },
      { q: 'Can I track how many people clicked my chat link?', a: "Not with the link alone, because wa.me links don't report clicks. To count them, put the link behind a short-link service such as Bitly or Rebrandly, which records each click before redirecting. If you use Eazybe, the chats themselves are also logged in your CRM." },
      { q: 'Does the pre-filled message support emojis and line breaks?', a: 'Yes. Paste emojis straight into the message field. Line breaks you type in the field are encoded as %0A in the link, and most WhatsApp apps show them as new lines. Short openers still work best, since the customer can add detail in their reply.' },
      { q: 'Can I shorten the wa.me link with Bitly or my own domain?', a: "Yes. Bitly, Rebrandly, Short.io and similar services accept wa.me URLs and give you a shorter, branded version, plus the click counts the raw link doesn't have. On your own domain you can set up a 301 redirect from something like yourbrand.com/whatsapp to the wa.me URL." },
      { q: 'Will the customer see my phone number when they click the link?', a: "Yes. Once the chat opens, your number shows in the chat header, just as it would if they had messaged you any other way. If you'd rather not share your personal mobile, use a WhatsApp Business number for the link." },
      { q: 'Can I route the link to a team, or rotate between multiple numbers?', a: "Not with the link alone, because a wa.me link points to one number. To share chats across a team, connect the number to a shared team inbox such as Eazybe's, or use a third-party router that catches the click and sends it to whichever rep is next in rotation." },
    ],
  },
  cta: {
    badge: 'Beyond The Link',
    h2: 'Want Those Chats In Your CRM?',
    subtitle:
      'Eazybe syncs your WhatsApp chats with HubSpot, Salesforce, Zoho and Pipedrive, so a conversation that starts from this link ends up on the right contact record. Its AI agents can reply when nobody on your team is online.',
    primary: 'Try Eazybe Free →',
    secondary: 'Book a Demo',
    footnote: '4-day free trial · No credit card required · Cancel anytime',
  },
  generator: {
    formTitle: 'Generate your chat link',
    numberLabel: 'WhatsApp number',
    countryAria: 'Country code',
    phonePlaceholder: 'Phone number',
    phoneAria: 'Phone number',
    messageLabel: 'Pre-filled message',
    messageOptional: '(optional)',
    messagePlaceholder: "Hi, I'd like to know more about your product.",
    messageCounter: '{count}/400. The customer sees this when they open the link.',
    errorEmpty: 'Enter a WhatsApp phone number first.',
    errorShort: 'That phone number looks too short.',
    btnGenerate: 'Generate Chat Link',
    outputTitle: 'Your WhatsApp Chat Link',
    emptyState: 'Enter a WhatsApp number and your link will show up here.',
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
      'Gerador gratuito de link de conversa do WhatsApp. Crie um link wa.me com mensagem pronta e cole em e-mails, bios, anúncios ou no seu site. Sem cadastro.',
    ogDescription: 'Crie um link wa.me que abre o WhatsApp com sua mensagem já digitada. Grátis e sem cadastro.',
  },
  hero: {
    tag: 'FERRAMENTA GRÁTIS · SEM CADASTRO',
    h1Lead: 'Crie Seu Link de Conversa do',
    h1Brand: 'WhatsApp',
    h1Rest: '',
    h1Highlight: 'Grátis',
    subtitle:
      'Digite seu número do WhatsApp e, se quiser, uma mensagem de abertura. Você recebe um link wa.me para colar na assinatura de e-mail, na bio das redes ou em um anúncio. Quando o cliente toca no link, abre uma conversa com você e a mensagem já aparece digitada. Ele não precisa salvar seu número antes.',
    cta: 'Criar Link de Conversa →',
    footnote: 'Sem cadastro · Sem marca d\'água · Use em qualquer lugar',
  },
  preview: {
    title: 'Gere seu link de conversa',
    numberLabel: 'Número do WhatsApp (com código do país)',
    messageLabel: 'Mensagem de Abertura (Opcional)',
    btnGenerate: 'Gerar Link',
    btnCopy: 'Copiar Link',
    linkAlt: 'Exemplo de link de conversa do WhatsApp',
  },
  tryItNow: {
    h2: 'Experimente Grátis O Gerador De Link De Conversa Do WhatsApp',
    subtitle: 'Escolha o código do país, digite seu número e uma mensagem opcional e copie o link.',
  },
  useCases: {
    h2: 'Onde Usar Seu Link De Conversa Do WhatsApp',
    subtitle: 'O link funciona em qualquer lugar onde dá para tocar. Estes são alguns usos comuns.',
    emailTitle: 'Em assinaturas de e-mail',
    emailBody:
      'Coloque na sua assinatura de e-mail, no rodapé da newsletter ou nos e-mails de confirmação de pedido. Um texto como "Fale com a gente no WhatsApp" já basta. Quem tocar abre a conversa com sua mensagem já digitada.',
    bioTitle: 'Em bios e páginas link-in-bio',
    bioBody:
      'Adicione na bio do Instagram, TikTok, LinkedIn ou X, ou em uma página tipo Linktree. Seus seguidores falam com você direto, sem procurar formulário de contato.',
    adsTitle: 'Em anúncios e páginas de destino',
    adsBody:
      'Use como URL de destino dos seus anúncios, em um botão "Fale com a gente" ou em um pop-up da sua landing page. Quem toca entra direto numa conversa com você.',
  },
  seo: {
    h2: 'O Que É Um Link De Conversa Do WhatsApp?',
    p1:
      'Um link de conversa do WhatsApp, também chamado de link click-to-chat ou link wa.me, é uma URL que abre uma conversa no WhatsApp com o seu número. A pessoa toca no celular e a conversa abre, com sua mensagem inicial já digitada, se você tiver definido uma. Ninguém precisa digitar nem salvar seu número.',
    p2Pre: 'O link segue um formato fixo: ',
    p2Post:
      '. Esta página monta o link para você: tira o sinal de mais, os espaços e os traços, codifica a mensagem para a URL e avisa se o número parecer curto demais. Você digita o número e a mensagem e recebe um link pronto para compartilhar.',
    h3: 'Onde o link de conversa funciona melhor',
    p3:
      'O link de conversa faz sentido onde o cliente já está diante de uma tela em que pode tocar: uma assinatura de e-mail, uma bio do Instagram, um anúncio do Google, um botão "Fale com a gente" na página de preços. Para materiais que a pessoa só consegue olhar, como impressos, embalagens e cartazes, use um QR code que aponte para o mesmo link wa.me.',
    p4Pre:
      'Você também pode usar o link wa.me como URL de destino de anúncios, nos botões da landing page, em um botão flutuante de chat, no menu de ajuda do seu app ou em e-mails de carrinho abandonado. Se a sua equipe usa o ',
    p4LinkText: 'Eazybe',
    p4Post:
      ', cada conversa que começa pelo link fica registrada no contato dentro do HubSpot, Salesforce ou Zoho, e você vê quem chamou e o que disse.',
  },
  benefits: {
    h2Lead: 'Por Que Usar Um',
    h2Em: 'Link De Conversa',
    subtitle:
      'Muita gente desiste quando precisa digitar um número, salvar um contato ou procurar seu perfil. O link de conversa pula essas etapas.',
    noInstallTitle: 'Um toque para começar a conversa',
    noInstallBody:
      'O link abre o WhatsApp, que seus clientes provavelmente já usam. Não tem nada para baixar nem formulário para preencher antes da primeira pergunta.',
    prefilledTitle: 'Mensagem de abertura já pronta',
    prefilledBody:
      'Você escreve a primeira mensagem. O cliente vê o texto na caixa de mensagem e só precisa tocar em Enviar, e pela primeira linha você já sabe o que ele quer. Por exemplo: "Olá, vi seu anúncio" ou "Pode me mandar o link da demonstração?"',
    conversionTitle: 'Menos etapas que um formulário',
    conversionBody:
      'Um formulário deixa o cliente esperando resposta por e-mail. O link de conversa coloca o cliente numa conversa com uma pessoa, ou com um agente de IA se você usar um, e ele vê com quem está falando.',
    freeTitle: 'Grátis e sem limites',
    freeBody: 'Sem marca d\'água, sem cadastro e sem limite de links. Pode usar no seu negócio à vontade.',
  },
  benefitCards: {
    h2Lead: 'O Que Dá Para Fazer Com',
    h2Em: 'Um Só Link',
    clickTitle: 'Direto no WhatsApp',
    clickBody:
      'Coloque o link no seu site, nos anúncios ou na assinatura de e-mail. Cada clique abre uma conversa no WhatsApp com você: você vê o nome e o número da pessoa e responde ali mesmo, em vez de trabalhar com um formulário anônimo.',
    everywhereTitle: 'Funciona onde um link funciona',
    everywhereBody:
      'E-mail, SMS, bios, criativos de anúncios, URLs de botões, deep links de apps. Se um hyperlink funciona ali, o link de conversa também funciona, e ele abre no WhatsApp, onde muitos dos seus clientes já estão.',
    leadsTitle: 'Capte leads com um toque',
    leadsBody:
      'Adicione o link aos seus anúncios do Facebook, à bio do Instagram ou a um botão "Fale com vendas". O cliente em potencial que toca já começa a conversar com você na hora.',
  },
  faq: {
    h2: 'Perguntas Frequentes Sobre Link De Conversa Do WhatsApp',
    items: [
      { q: 'Este Gerador de Link de Conversa do WhatsApp é realmente grátis?', a: 'Sim. Não precisa de cadastro, não tem marca d\'água e você pode criar quantos links quiser. Também pode usar para fins comerciais.' },
      { q: 'O link funciona com números pessoais e do WhatsApp Business?', a: 'Sim. Um link wa.me abre uma conversa com a conta do WhatsApp registrada naquele número, seja no WhatsApp comum, no WhatsApp Business ou na API do WhatsApp Business.' },
      { q: 'Posso adicionar uma mensagem pronta?', a: 'Sim. Digite a mensagem no campo opcional e ela aparece na caixa de texto do cliente quando ele abre a conversa, então ele só precisa tocar em Enviar. É útil para dar contexto, por exemplo: "Olá, vi seu anúncio, pode me contar mais?"' },
      { q: 'Posso gerar um link de conversa para um grupo do WhatsApp?', a: 'Não. Links wa.me só funcionam com números individuais. Para compartilhar um grupo, crie um link de convite dentro do WhatsApp (Dados do grupo > Convidar via link).' },
      { q: 'Isso funciona sem o aplicativo do WhatsApp instalado?', a: 'No celular, o WhatsApp precisa estar instalado para a conversa abrir. No computador, o link pode abrir o WhatsApp Web no navegador, então o app de desktop não é obrigatório.' },
      { q: 'Qual a diferença para um QR code do WhatsApp?', a: 'Os dois levam ao mesmo lugar, uma URL wa.me. Use o link onde a pessoa pode tocar ou clicar, como e-mails, anúncios e bios. Use o QR code onde ela precisa escanear com a câmera, como impressos, embalagens e cartazes.' },
      { q: 'O link de conversa do WhatsApp expira?', a: 'Não. O link está ligado ao seu número, então continua funcionando enquanto esse número estiver no WhatsApp. Não tem nada para renovar.' },
      { q: 'Posso rastrear quantas pessoas clicaram no meu link?', a: 'Não só com o link, porque links wa.me não registram cliques. Para contar, passe o link por um encurtador como Bitly ou Rebrandly, que registra cada clique antes de redirecionar. Se você usa o Eazybe, as conversas também ficam registradas no seu CRM.' },
      { q: 'A mensagem pronta aceita emojis e quebras de linha?', a: 'Sim. Cole os emojis direto no campo da mensagem. As quebras de linha que você digitar viram %0A no link, e a maioria dos apps do WhatsApp mostra cada uma como uma nova linha. Mesmo assim, vale manter a abertura curta e deixar os detalhes para a resposta do cliente.' },
      { q: 'Posso encurtar o link wa.me com Bitly ou meu próprio domínio?', a: 'Sim. Bitly, Rebrandly, Short.io e serviços parecidos aceitam URLs wa.me e devolvem uma versão mais curta e com a sua marca, além da contagem de cliques que o link original não tem. Com seu próprio domínio, dá para configurar um redirecionamento 301 de algo como suamarca.com.br/whatsapp para a URL wa.me.' },
      { q: 'O cliente vê meu número de telefone quando clica no link?', a: 'Sim. Quando a conversa abre, seu número aparece no topo do chat, do mesmo jeito que apareceria se a pessoa te mandasse mensagem por qualquer outro caminho. Se preferir não expor seu celular pessoal, use um número do WhatsApp Business no link.' },
      { q: 'Posso direcionar o link para um time ou alternar entre vários números?', a: 'Não só com o link, porque um link wa.me aponta para um único número. Para distribuir as conversas entre a equipe, você pode conectar o número a uma caixa de entrada compartilhada, como a do Eazybe, ou usar um serviço externo que recebe o clique e manda para o próximo vendedor do rodízio.' },
    ],
  },
  cta: {
    badge: 'Além Do Link',
    h2: 'Quer Essas Conversas No Seu CRM?',
    subtitle:
      'O Eazybe sincroniza suas conversas do WhatsApp com HubSpot, Salesforce, Zoho e Pipedrive, e cada conversa que começa por este link vai para o registro do contato certo. Os agentes de IA do Eazybe respondem quando ninguém da equipe está online.',
    primary: 'Teste o Eazybe Grátis →',
    secondary: 'Agendar Demo',
    footnote: '4 dias grátis · Sem cartão de crédito · Cancele quando quiser',
  },
  generator: {
    formTitle: 'Gere seu link de conversa',
    numberLabel: 'Número do WhatsApp',
    countryAria: 'Código do país',
    phonePlaceholder: 'Número de telefone',
    phoneAria: 'Número de telefone',
    messageLabel: 'Mensagem pronta',
    messageOptional: '(opcional)',
    messagePlaceholder: 'Olá, gostaria de saber mais sobre o seu produto.',
    messageCounter: '{count}/400. O cliente vê esse texto ao abrir o link.',
    errorEmpty: 'Digite um número de WhatsApp primeiro.',
    errorShort: 'Esse número parece curto demais.',
    btnGenerate: 'Gerar Link De Conversa',
    outputTitle: 'Seu Link De Conversa Do WhatsApp',
    emptyState: 'Digite um número do WhatsApp e seu link aparece aqui.',
    linkLabel: 'Link compartilhável',
    htmlLabel: 'Código HTML',
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
      'Generador gratuito de enlace de chat de WhatsApp. Crea un enlace wa.me con mensaje predefinido y pégalo en correos, bios, anuncios o tu web. Sin registro.',
    ogDescription: 'Crea un enlace wa.me que abre WhatsApp con tu mensaje ya escrito. Gratis y sin registro.',
  },
  hero: {
    tag: 'HERRAMIENTA GRATIS · SIN REGISTRO',
    h1Lead: 'Crea Tu Enlace de Chat de',
    h1Brand: 'WhatsApp',
    h1Rest: '',
    h1Highlight: 'Gratis',
    subtitle:
      'Escribe tu número de WhatsApp y, si quieres, un mensaje de bienvenida. Obtienes un enlace wa.me para pegar en tu firma de correo, en la bio de tus redes o en un anuncio. Cuando un cliente lo toca, se abre un chat contigo con tu mensaje ya escrito, sin que tenga que guardar tu número.',
    cta: 'Crear Enlace de Chat →',
    footnote: 'Sin registro · Sin marca de agua · Úsalo donde quieras',
  },
  preview: {
    title: 'Genera tu enlace de chat',
    numberLabel: 'Número de WhatsApp (con código de país)',
    messageLabel: 'Mensaje Inicial (Opcional)',
    btnGenerate: 'Generar Enlace',
    btnCopy: 'Copiar Enlace',
    linkAlt: 'Ejemplo de enlace de chat de WhatsApp',
  },
  tryItNow: {
    h2: 'Prueba Gratis El Generador De Enlaces De Chat De WhatsApp',
    subtitle: 'Elige el código de país, escribe tu número y un mensaje opcional, y copia el enlace.',
  },
  useCases: {
    h2: 'Dónde Usar Tu Enlace De Chat De WhatsApp',
    subtitle: 'El enlace funciona en cualquier lugar donde se pueda tocar. Estos son algunos usos habituales.',
    emailTitle: 'En firmas de correo',
    emailBody:
      'Ponlo en tu firma de correo, en el pie de tu newsletter o en los correos de confirmación de pedido. Basta con un texto como "Escríbenos por WhatsApp". Quien lo toque abre el chat con tu mensaje ya escrito.',
    bioTitle: 'En bios y páginas link-in-bio',
    bioBody:
      'Agrégalo a tu bio de Instagram, TikTok, LinkedIn o X, o a una página tipo Linktree. Tus seguidores te escriben directo, sin tener que buscar un formulario de contacto.',
    adsTitle: 'En anuncios y páginas de destino',
    adsBody:
      'Úsalo como URL de destino de tus anuncios, en un botón de "Chatea con nosotros" o en un popup de tu landing page. Quien lo toca entra directo a una conversación contigo.',
  },
  seo: {
    h2: '¿Qué Es Un Enlace De Chat De WhatsApp?',
    p1:
      'Un enlace de chat de WhatsApp, también llamado enlace click-to-chat o enlace wa.me, es una URL que abre un chat de WhatsApp con tu número. La persona lo toca en su teléfono y se abre la conversación, con tu mensaje inicial ya escrito si configuraste uno. Nadie tiene que escribir ni guardar tu número.',
    p2Pre: 'El enlace sigue un formato fijo: ',
    p2Post:
      '. Esta página lo arma por ti: quita el signo de más, los espacios y los guiones, codifica tu mensaje para la URL y te avisa si el número parece demasiado corto. Escribes un número y un mensaje, y recibes un enlace listo para compartir.',
    h3: 'Dónde funcionan mejor los enlaces de chat',
    p3:
      'Un enlace de chat tiene sentido donde el cliente ya está frente a una pantalla que puede tocar: una firma de correo, una bio de Instagram, un anuncio de Google, un botón de "Habla con nosotros" en tu página de precios. Para lo que solo se puede mirar, como impresos, empaques o carteles, usa un código QR que apunte al mismo enlace wa.me.',
    p4Pre:
      'También puedes usar el enlace wa.me como URL de destino de anuncios, en los botones de tu landing page, en un botón flotante de chat, en el menú de ayuda de tu app o en correos de carrito abandonado. Si tu equipo usa ',
    p4LinkText: 'Eazybe',
    p4Post:
      ', cada chat que empieza desde el enlace queda registrado en el contacto dentro de HubSpot, Salesforce o Zoho, y así ves quién escribió y qué dijo.',
  },
  benefits: {
    h2Lead: 'Por Qué Usar Un',
    h2Em: 'Enlace De Chat',
    subtitle:
      'Mucha gente se rinde cuando tiene que escribir un número, guardar un contacto o buscar tu perfil. Un enlace de chat se salta esos pasos.',
    noInstallTitle: 'Un toque para empezar el chat',
    noInstallBody:
      'El enlace abre WhatsApp, que tus clientes probablemente ya usan. No hay nada que descargar ni formularios que llenar antes de hacer la primera pregunta.',
    prefilledTitle: 'Tu mensaje inicial, ya escrito',
    prefilledBody:
      'Tú escribes el primer mensaje. El cliente lo ve en la caja de texto y solo toca Enviar, así que desde la primera línea sabes qué busca. Por ejemplo: "Hola, vi tu anuncio" o "¿Me envías el enlace de la demo?"',
    conversionTitle: 'Menos pasos que un formulario',
    conversionBody:
      'Un formulario deja al cliente esperando una respuesta por correo. Un enlace de chat lo pone a conversar con una persona, o con un agente de IA si usas uno, y el cliente ve con quién está hablando.',
    freeTitle: 'Gratis y sin límites',
    freeBody: 'Sin marca de agua, sin registro y sin límite de enlaces. Puedes usarlos para tu negocio.',
  },
  benefitCards: {
    h2Lead: 'Lo Que Puedes Hacer Con',
    h2Em: 'Un Solo Enlace',
    clickTitle: 'Directo a WhatsApp',
    clickBody:
      'Pon el enlace en tu sitio, en tus anuncios o en tu firma de correo. Cada clic abre un chat de WhatsApp contigo: ves el nombre y el número de la persona y le respondes ahí mismo, en vez de trabajar con un formulario anónimo.',
    everywhereTitle: 'Funciona donde funcione un enlace',
    everywhereBody:
      'Correo, SMS, bios, creativos de anuncios, URLs de botones, deep links de apps. Si ahí funciona un hipervínculo, también funciona el enlace de chat, y se abre en WhatsApp, donde muchos de tus clientes ya están.',
    leadsTitle: 'Captura leads con un toque',
    leadsBody:
      'Agrega el enlace a tus anuncios de Facebook, a tu bio de Instagram o a un botón de "Habla con ventas". El prospecto que lo toca empieza a conversar contigo en ese momento.',
  },
  faq: {
    h2: 'Preguntas Frecuentes Sobre Enlaces De Chat De WhatsApp',
    items: [
      { q: '¿Este Generador de Enlace de Chat de WhatsApp es realmente gratis?', a: 'Sí. No necesitas registrarte, no hay marca de agua y puedes crear todos los enlaces que quieras. También puedes usarlos con fines comerciales.' },
      { q: '¿El enlace funciona con números personales y de WhatsApp Business?', a: 'Sí. Un enlace wa.me abre un chat con la cuenta de WhatsApp registrada en ese número, ya sea en la app normal de WhatsApp, en WhatsApp Business o en la API de WhatsApp Business.' },
      { q: '¿Puedo añadir un mensaje predefinido?', a: 'Sí. Escribe el mensaje en el campo opcional y aparecerá en la caja de texto del cliente cuando abra el chat, así solo tiene que tocar Enviar. Sirve para dar contexto, por ejemplo: "Hola, vi tu anuncio, ¿me cuentas más?"' },
      { q: '¿Puedo generar un enlace de chat para un grupo de WhatsApp?', a: 'No. Los enlaces wa.me solo funcionan con números individuales. Para compartir un grupo, crea un enlace de invitación desde WhatsApp (Info. del grupo > Invitar mediante enlace).' },
      { q: '¿Esto funciona sin la app de WhatsApp instalada?', a: 'En el teléfono, WhatsApp tiene que estar instalado para que se abra el chat. En la computadora, el enlace puede abrir WhatsApp Web en el navegador, así que no hace falta la app de escritorio.' },
      { q: '¿En qué se diferencia de un código QR de WhatsApp?', a: 'Los dos llevan al mismo lugar, una URL wa.me. Usa el enlace donde la gente puede tocar o hacer clic, como correos, anuncios y bios. Usa el código QR donde hay que escanear con la cámara, como impresos, empaques y carteles.' },
      { q: '¿El enlace de chat de WhatsApp expira?', a: 'No. El enlace está ligado a tu número, así que sigue funcionando mientras ese número esté en WhatsApp. No hay nada que renovar.' },
      { q: '¿Puedo rastrear cuántas personas hicieron clic en mi enlace?', a: 'No solo con el enlace, porque los enlaces wa.me no registran clics. Para contarlos, pasa el enlace por un acortador como Bitly o Rebrandly, que registra cada clic antes de redirigir. Si usas Eazybe, los chats también quedan registrados en tu CRM.' },
      { q: '¿El mensaje predefinido acepta emojis y saltos de línea?', a: 'Sí. Pega los emojis directamente en el campo del mensaje. Los saltos de línea que escribas se codifican como %0A en el enlace, y la mayoría de las apps de WhatsApp los muestran como líneas nuevas. Aun así, conviene un mensaje inicial corto: el cliente puede dar los detalles en su respuesta.' },
      { q: '¿Puedo acortar el enlace wa.me con Bitly o mi propio dominio?', a: 'Sí. Bitly, Rebrandly, Short.io y servicios parecidos aceptan URLs wa.me y te dan una versión más corta y con tu marca, además del conteo de clics que el enlace original no tiene. Con tu propio dominio puedes configurar una redirección 301 desde algo como tumarca.com/whatsapp hacia la URL wa.me.' },
      { q: '¿El cliente ve mi número de teléfono al hacer clic en el enlace?', a: 'Sí. Cuando se abre el chat, tu número aparece en la parte superior de la conversación, igual que si te hubiera escrito por cualquier otra vía. Si prefieres no compartir tu celular personal, usa un número de WhatsApp Business para el enlace.' },
      { q: '¿Puedo dirigir el enlace a un equipo o rotar entre varios números?', a: 'No solo con el enlace, porque un enlace wa.me apunta a un único número. Para repartir los chats en un equipo puedes conectar el número a una bandeja de entrada compartida, como la de Eazybe, o usar un servicio externo que recibe el clic y lo envía al vendedor que sigue en la rotación.' },
    ],
  },
  cta: {
    badge: 'Más Allá Del Enlace',
    h2: '¿Quieres Esos Chats En Tu CRM?',
    subtitle:
      'Eazybe sincroniza tus chats de WhatsApp con HubSpot, Salesforce, Zoho y Pipedrive, así cada conversación que empieza desde este enlace queda en el registro del contacto correcto. Sus agentes de IA pueden responder cuando nadie de tu equipo está en línea.',
    primary: 'Prueba Eazybe Gratis →',
    secondary: 'Agendar Demo',
    footnote: 'Prueba de 4 días · Sin tarjeta de crédito · Cancela cuando quieras',
  },
  generator: {
    formTitle: 'Genera tu enlace de chat',
    numberLabel: 'Número de WhatsApp',
    countryAria: 'Código de país',
    phonePlaceholder: 'Número de teléfono',
    phoneAria: 'Número de teléfono',
    messageLabel: 'Mensaje predefinido',
    messageOptional: '(opcional)',
    messagePlaceholder: 'Hola, me gustaría saber más sobre tu producto.',
    messageCounter: '{count}/400. El cliente lo ve al abrir el enlace.',
    errorEmpty: 'Primero escribe un número de WhatsApp.',
    errorShort: 'Ese número parece muy corto.',
    btnGenerate: 'Generar Enlace De Chat',
    outputTitle: 'Tu Enlace De Chat De WhatsApp',
    emptyState: 'Escribe un número de WhatsApp y aquí aparecerá tu enlace.',
    linkLabel: 'Enlace para compartir',
    htmlLabel: 'Código HTML',
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
      'Ücretsiz WhatsApp sohbet linki oluşturucu. Hazır mesajlı wa.me linki oluşturun; e-postalara, biyografilere, reklamlara veya sitenize ekleyin. Kayıt yok.',
    ogDescription: "WhatsApp'ı mesajınız yazılı halde açan bir wa.me linki oluşturun. Ücretsiz, kayıt gerekmez.",
  },
  hero: {
    tag: 'ÜCRETSİZ ARAÇ · KAYIT YOK',
    h1Lead: '',
    h1Brand: 'WhatsApp',
    h1Rest: 'Sohbet Linkinizi',
    h1Highlight: 'Ücretsiz Oluşturun',
    subtitle:
      'WhatsApp numaranızı ve isterseniz bir açılış mesajı yazın. E-posta imzanıza, sosyal medya biyografinize veya bir reklama ekleyebileceğiniz bir wa.me linki elde edersiniz. Müşteri linke dokunduğunda sizinle bir sohbet açılır ve mesajınız yazılı olarak gelir. Numaranızı önceden kaydetmesine gerek kalmaz.',
    cta: 'Sohbet Linki Oluştur →',
    footnote: 'Kayıt yok · Filigran yok · Her yerde kullanın',
  },
  preview: {
    title: 'Sohbet linkinizi oluşturun',
    numberLabel: 'WhatsApp Numarası (ülke koduyla)',
    messageLabel: 'Açılış Mesajı (Opsiyonel)',
    btnGenerate: 'Link Oluştur',
    btnCopy: 'Linki Kopyala',
    linkAlt: 'Örnek WhatsApp sohbet linki',
  },
  tryItNow: {
    h2: 'Ücretsiz WhatsApp Sohbet Linki Oluşturucuyu Deneyin',
    subtitle: 'Ülke kodunu seçin, numaranızı ve isterseniz bir mesaj yazın, ardından linki kopyalayın.',
  },
  useCases: {
    h2: 'WhatsApp Sohbet Linkini Nerelerde Kullanabilirsiniz?',
    subtitle: 'Link, dokunulabilen her yerde çalışır. En sık kullanıldığı yerlerden bazıları:',
    emailTitle: 'E-posta imzalarında',
    emailBody:
      "Linki e-posta imzanıza, bülteninizin alt kısmına veya sipariş onay e-postalarına ekleyin. \"WhatsApp'tan bize yazın\" gibi kısa bir metin yeterli. Dokunan kişi, mesajınız yazılı halde sohbeti açar.",
    bioTitle: 'Biyografilerde ve link-in-bio sayfalarında',
    bioBody:
      'Instagram, TikTok, LinkedIn veya X biyografinize ya da Linktree tarzı bir sayfaya ekleyin. Takipçileriniz iletişim formu aramadan size doğrudan yazar.',
    adsTitle: 'Reklamlarda ve açılış sayfalarında',
    adsBody:
      "Reklamlarınızda hedef URL olarak, \"Bize yazın\" butonunun arkasında veya açılış sayfanızdaki bir pop-up'ta kullanın. Dokunan ziyaretçi doğrudan sizinle konuşmaya başlar.",
  },
  seo: {
    h2: 'WhatsApp Sohbet Linki Nedir?',
    p1:
      "WhatsApp sohbet linki (click-to-chat veya wa.me linki olarak da bilinir), numaranızla WhatsApp'ta sohbet açan bir URL'dir. Kişi telefonunda linke dokunur ve sohbet açılır; bir başlangıç mesajı belirlediyseniz o da yazılı gelir. Kimsenin numaranızı yazması veya kaydetmesi gerekmez.",
    p2Pre: 'Link sabit bir formatı takip eder: ',
    p2Post:
      ". Bu sayfa linki sizin için hazırlar: artı işaretini, boşlukları ve tireleri kaldırır, mesajınızı URL'ye uygun şekilde kodlar ve numara çok kısa görünüyorsa uyarır. Siz numarayı ve mesajı yazarsınız, paylaşmaya hazır linki alırsınız.",
    h3: 'Sohbet linkleri en çok nerede işe yarar',
    p3:
      'Sohbet linki, müşterinin zaten dokunabileceği bir ekranın başında olduğu yerlerde mantıklıdır: e-posta imzası, Instagram biyografisi, Google reklamı, fiyatlandırma sayfanızdaki "Bize ulaşın" butonu. Broşür, ambalaj veya afiş gibi yalnızca bakılabilen yerler için aynı wa.me linkine giden bir QR kod kullanın.',
    p4Pre:
      'wa.me linkini reklamlarda hedef URL olarak, açılış sayfası butonlarında, sabit sohbet butonunda, uygulamanızın yardım menüsünde veya terk edilen sepet e-postalarında da kullanabilirsiniz. Ekibiniz ',
    p4LinkText: 'Eazybe',
    p4Post:
      " kullanıyorsa, linkten başlayan her sohbet HubSpot, Salesforce veya Zoho'da ilgili kişinin kaydına işlenir; kimin yazdığını ve ne dediğini görürsünüz.",
  },
  benefits: {
    h2Lead: 'WhatsApp Sohbet Linkinin',
    h2Em: 'Faydaları',
    subtitle:
      'Pek çok kişi numara yazmak, kişi kaydetmek veya profilinizi aramak zorunda kaldığında vazgeçer. Sohbet linki bu adımları ortadan kaldırır.',
    noInstallTitle: 'Tek dokunuşla sohbet',
    noInstallBody:
      "Link, müşterilerinizin büyük ihtimalle zaten kullandığı WhatsApp'ı açar. İndirilecek bir şey yok, ilk soruyu sormadan önce doldurulacak bir form da yok.",
    prefilledTitle: 'Açılış mesajı hazır',
    prefilledBody:
      "İlk mesajı siz yazarsınız. Müşteri onu mesaj kutusunda görür ve sadece Gönder'e dokunur; ne istediğini ilk satırdan anlarsınız. Örneğin: \"Merhaba, reklamınızı gördüm\" veya \"Demo linkini gönderebilir misiniz?\"",
    conversionTitle: 'Formdan daha az adım',
    conversionBody:
      'Form, müşteriyi e-posta yanıtı beklemeye bırakır. Sohbet linki ise onu bir insanla, kullanıyorsanız bir Yapay Zeka ajanıyla konuşturur ve müşteri kiminle konuştuğunu görür.',
    freeTitle: 'Ücretsiz ve sınırsız',
    freeBody: 'Filigran yok, kayıt yok, link sayısında sınır yok. Linkleri işletmeniz için de kullanabilirsiniz.',
  },
  benefitCards: {
    h2Lead: 'Tek Bir Linkle',
    h2Em: 'Neler Yapabilirsiniz',
    clickTitle: "Doğrudan WhatsApp'a",
    clickBody:
      'Linki web sitenize, reklamlarınıza veya e-posta imzanıza koyun. Her tıklama sizinle bir WhatsApp sohbeti açar: kişinin adını ve numarasını görür, anonim bir form yerine aynı sohbetten yanıt verirsiniz.',
    everywhereTitle: 'Linkin çalıştığı her yerde çalışır',
    everywhereBody:
      "E-posta, SMS, biyografiler, reklam görselleri, buton URL'leri, uygulama deep link'leri. Bir link nerede çalışıyorsa sohbet linki de orada çalışır ve müşterilerinizin birçoğunun zaten kullandığı WhatsApp'ta açılır.",
    leadsTitle: 'Tek dokunuşla lead toplayın',
    leadsBody:
      'Linki Facebook reklamlarınıza, Instagram biyografinize veya "Satış ekibiyle konuşun" butonuna ekleyin. Dokunan potansiyel müşteri sizinle hemen konuşmaya başlar.',
  },
  faq: {
    h2: 'WhatsApp Sohbet Linki Hakkında Sık Sorulan Sorular',
    items: [
      { q: 'Bu WhatsApp Sohbet Linki Oluşturucu gerçekten ücretsiz mi?', a: 'Evet. Kayıt gerekmez, filigran yoktur ve istediğiniz kadar link oluşturabilirsiniz. Linkleri ticari amaçla da kullanabilirsiniz.' },
      { q: 'Link hem kişisel hem de WhatsApp Business numaralarında çalışır mı?', a: "Evet. wa.me linki, o numaraya kayıtlı WhatsApp hesabıyla sohbet açar. Hesap normal WhatsApp uygulamasında, WhatsApp Business'ta veya WhatsApp Business API'de olabilir." },
      { q: 'Önceden yazılmış bir mesaj ekleyebilir miyim?', a: "Evet. Mesajı isteğe bağlı alana yazın; müşteri sohbeti açtığında mesaj kutusunda görünür ve sadece Gönder'e dokunması yeterli olur. Bağlam vermek için işe yarar, örneğin: \"Merhaba, reklamınızı gördüm, biraz bilgi alabilir miyim?\"" },
      { q: 'Bir WhatsApp grubu için sohbet linki oluşturabilir miyim?', a: 'Hayır. wa.me linkleri yalnızca bireysel numaralarla çalışır. Bir grubu paylaşmak için WhatsApp içinden davet bağlantısı oluşturun (Grup bilgisi > Bağlantı ile davet et).' },
      { q: 'WhatsApp uygulaması yüklü değilken çalışır mı?', a: "Telefonda sohbetin açılması için WhatsApp'ın yüklü olması gerekir. Bilgisayarda link, tarayıcıda WhatsApp Web'i açabilir; masaüstü uygulaması şart değildir." },
      { q: 'WhatsApp QR kodundan farkı ne?', a: "İkisi de aynı yere, bir wa.me URL'sine gider. Linki insanların dokunabildiği veya tıklayabildiği yerlerde kullanın: e-postalar, reklamlar, biyografiler. QR kodu ise kamerayla taranması gereken yerlerde kullanın: basılı materyaller, ambalajlar, afişler." },
      { q: 'WhatsApp sohbet linkinin süresi dolar mı?', a: "Hayır. Link telefon numaranıza bağlıdır, yani numara WhatsApp'ta olduğu sürece çalışır. Yenilemeniz gereken bir şey yoktur." },
      { q: 'Linkimi kaç kişinin tıkladığını izleyebilir miyim?', a: "Tek başına hayır, çünkü wa.me linkleri tıklama kaydetmez. Tıklamaları saymak için linki Bitly veya Rebrandly gibi, yönlendirmeden önce her tıklamayı kaydeden bir kısaltma servisinden geçirin. Eazybe kullanıyorsanız sohbetler de CRM'inize kaydedilir." },
      { q: 'Önceden yazılmış mesaj emoji ve satır sonu destekliyor mu?', a: 'Evet. Emojileri doğrudan mesaj alanına yapıştırabilirsiniz. Alana yazdığınız satır sonları linkte %0A olarak kodlanır ve çoğu WhatsApp uygulaması bunları yeni satır olarak gösterir. Yine de açılış mesajını kısa tutmak iyi olur; ayrıntıları müşteri yanıtında verebilir.' },
      { q: 'wa.me linkini Bitly veya kendi alan adımla kısaltabilir miyim?', a: "Evet. Bitly, Rebrandly, Short.io ve benzeri servisler wa.me URL'lerini kabul eder ve size daha kısa, markalı bir versiyon verir. Ham linkte olmayan tıklama sayısını da gösterirler. Kendi alan adınızla markaniz.com/whatsapp gibi bir adresten wa.me URL'sine 301 yönlendirmesi de kurabilirsiniz." },
      { q: 'Müşteri linke tıkladığında telefon numaramı görür mü?', a: 'Evet. Sohbet açıldığında numaranız sohbetin üst kısmında görünür, tıpkı size başka bir yoldan yazdıklarında olduğu gibi. Kişisel numaranızı paylaşmak istemiyorsanız link için bir WhatsApp Business numarası kullanın.' },
      { q: 'Linki bir ekibe yönlendirebilir veya birden fazla numara arasında rotasyon yapabilir miyim?', a: "Yalnızca linkle olmaz, çünkü bir wa.me linki tek bir numaraya gider. Sohbetleri ekibe dağıtmak için numarayı Eazybe'deki gibi ortak bir gelen kutusuna bağlayabilir ya da tıklamayı yakalayıp sıradaki temsilciye yönlendiren harici bir servis kullanabilirsiniz." },
    ],
  },
  cta: {
    badge: 'Linkin Ötesi',
    h2: "Bu Sohbetler CRM'inize Gelsin mi?",
    subtitle:
      "Eazybe, WhatsApp sohbetlerinizi HubSpot, Salesforce, Zoho ve Pipedrive ile senkronize eder; bu linkten başlayan her sohbet doğru kişinin kaydına düşer. Ekibinizden kimse çevrimiçi değilken Eazybe'nin Yapay Zeka ajanları yanıt verebilir.",
    primary: "Eazybe'yi Ücretsiz Deneyin →",
    secondary: 'Demo Planlayın',
    footnote: '4 gün ücretsiz · Kredi kartı gerekmez · İstediğiniz zaman iptal edin',
  },
  generator: {
    formTitle: 'Sohbet linkinizi oluşturun',
    numberLabel: 'WhatsApp numarası',
    countryAria: 'Ülke kodu',
    phonePlaceholder: 'Telefon numarası',
    phoneAria: 'Telefon numarası',
    messageLabel: 'Önceden yazılmış mesaj',
    messageOptional: '(opsiyonel)',
    messagePlaceholder: 'Merhaba, ürününüz hakkında daha fazla bilgi almak istiyorum.',
    messageCounter: '{count}/400. Müşteri linki açtığında bunu görür.',
    errorEmpty: 'Önce bir WhatsApp telefon numarası girin.',
    errorShort: 'Bu telefon numarası çok kısa görünüyor.',
    btnGenerate: 'Sohbet Linki Oluştur',
    outputTitle: 'WhatsApp Sohbet Linkiniz',
    emptyState: 'Bir WhatsApp numarası girin, linkiniz burada görünecek.',
    linkLabel: 'Paylaşılabilir link',
    htmlLabel: 'HTML kodu',
    btnCopyLink: 'Linki Kopyala',
    btnCopyHtml: "HTML'yi Kopyala",
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
