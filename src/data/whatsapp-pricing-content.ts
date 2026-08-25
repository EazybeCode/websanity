/**
 * All localized copy for /whatsapp-pricing-calculator. Same shape
 * as marketing-roi-content.ts: one file per tool page, strings only. SVG icons
 * stay in the page component so translators never touch markup.
 *
 * The default per-message rates live in the client component, not here —
 * they are numbers, not copy, and they are the same in every locale.
 */

export interface WaPricingFaqItem {
  q: string
  a: string
}

export interface WaPricingPageContent {
  meta: {
    title: string
    description: string
    ogDescription: string
  }
  breadcrumb: {
    home: string
    current: string
  }
  hero: {
    tag: string
    h1Lead: string
    h1Highlight: string
    subtitle: string
    cta: string
    footnote: string
  }
  calculator: {
    h2: string
    subtitle: string
    inputsTitle: string
    btnReset: string
    marketLabel: string
    marketHint: string
    markets: {
      in: string
      br: string
      mx: string
      id: string
      us: string
      gb: string
      other: string
    }
    marketingLabel: string
    marketingHint: string
    utilityLabel: string
    utilityHint: string
    authLabel: string
    authHint: string
    windowLabel: string
    windowHint: string
    optional: string
    ratesTitle: string
    ratesHint: string
    ratesLinkText: string
    marketingRateLabel: string
    utilityRateLabel: string
    authRateLabel: string
    errorWindowRange: string
    errorMissingRate: string
    resultsTitle: string
    emptyState: string
    monthlyLabel: string
    monthlyHelp: string
    annualLabel: string
    annualHelp: string
    marketingCostLabel: string
    marketingCostHelp: string
    utilityCostLabel: string
    utilityCostHelp: string
    authCostLabel: string
    authCostHelp: string
    freeUtilLabel: string
    freeUtilHelp: string
    perMsgLabel: string
    perMsgHelp: string
    serviceNote: string
  }
  howTo: {
    h2: string
    subtitle: string
    step1Title: string
    step1Body: string
    step2Title: string
    step2Body: string
    step3Title: string
    step3Body: string
  }
  formulas: {
    h2: string
    subtitle: string
    items: { name: string; formula: string; note: string }[]
  }
  whyUse: {
    h2: string
    subtitle: string
    freeTitle: string
    freeBody: string
    privateTitle: string
    privateBody: string
    ratesTitle: string
    ratesBody: string
    instantTitle: string
    instantBody: string
  }
  attribution: {
    h2: string
    body: string
    point1: string
    point2: string
    point3: string
    cta: string
  }
  faq: {
    h2: string
    subtitle: string
    items: WaPricingFaqItem[]
  }
  moreTools: {
    h2: string
    allTools: string
  }
  finalCta: {
    h2: string
    body: string
    primary: string
    secondary: string
  }
}

const en: WaPricingPageContent = {
  meta: {
    title: 'WhatsApp Pricing Calculator - Free API Cost Tool | Eazybe',
    description:
      'Free WhatsApp API pricing calculator. Enter your monthly marketing, utility and authentication message volumes and estimate your Meta bill by country. Editable rates, no signup.',
    ogDescription:
      'Estimate what the WhatsApp Business API will cost you per month and per year, by market and message category. Free, editable rates, runs in your browser.',
  },
  breadcrumb: { home: 'Home', current: 'WhatsApp Pricing Calculator' },
  hero: {
    tag: 'Free Tool',
    h1Lead: 'WhatsApp Pricing',
    h1Highlight: 'Calculator',
    subtitle:
      'Pick your market, enter how many template messages you send in a month, and see what Meta would bill you. Marketing, utility and authentication are priced separately, and the free cases are already taken out. Every rate is editable, so when Meta updates its rate card you can update the numbers too.',
    cta: 'Estimate my cost',
    footnote: 'Free, no signup. Everything runs in your browser and nothing you type is sent to us.',
  },
  calculator: {
    h2: 'Estimate Your WhatsApp API Cost',
    subtitle: 'Volumes are monthly. Rates are in USD per delivered message and you can overwrite any of them.',
    inputsTitle: 'Your monthly volumes',
    btnReset: 'Reset',
    marketLabel: 'Market',
    marketHint: 'WhatsApp prices by the recipient’s country. Pick where most of your customers are.',
    markets: {
      in: 'India',
      br: 'Brazil',
      mx: 'Mexico',
      id: 'Indonesia',
      us: 'North America (US & Canada)',
      gb: 'United Kingdom',
      other: 'Other market (enter your own rates)',
    },
    marketingLabel: 'Marketing messages',
    marketingHint: 'Promotions, offers and re-engagement templates. The expensive category.',
    utilityLabel: 'Utility messages',
    utilityHint: 'Order updates, delivery notices, payment reminders.',
    authLabel: 'Authentication messages',
    authHint: 'One-time passcodes and login verification.',
    windowLabel: 'Utility messages sent inside the 24h service window (%)',
    windowHint: 'Utility templates delivered while a customer conversation is open are free. Rough share is fine.',
    optional: 'optional',
    ratesTitle: 'Rates (USD per delivered message)',
    ratesHint:
      'Prefilled from Meta’s published rate card and safe to overwrite. Rates change, so check the current card before you budget:',
    ratesLinkText: 'Meta’s WhatsApp pricing page',
    marketingRateLabel: 'Marketing rate',
    utilityRateLabel: 'Utility rate',
    authRateLabel: 'Authentication rate',
    errorWindowRange: 'Enter a share between 0 and 100.',
    errorMissingRate: 'You entered a volume for this category, so it needs a rate.',
    resultsTitle: 'Your estimate',
    emptyState: 'Enter at least one monthly volume to see your estimate.',
    monthlyLabel: 'Monthly cost',
    monthlyHelp: 'What Meta would bill for these volumes, before any BSP fees.',
    annualLabel: 'Annual cost',
    annualHelp: 'The monthly figure over twelve months, at the same volumes.',
    marketingCostLabel: 'Marketing',
    marketingCostHelp: 'Marketing messages at your marketing rate.',
    utilityCostLabel: 'Utility',
    utilityCostHelp: 'Only the utility messages sent outside a service window.',
    authCostLabel: 'Authentication',
    authCostHelp: 'Authentication messages at your authentication rate.',
    freeUtilLabel: 'Free utility messages',
    freeUtilHelp: 'Delivered inside the 24h window, billed at zero.',
    perMsgLabel: 'Cost per paid message',
    perMsgHelp: 'The blended rate across everything you pay for.',
    serviceNote:
      'Service conversations are not in this total because they are free: when a customer messages you first, replies inside the 24-hour window cost nothing.',
  },
  howTo: {
    h2: 'How WhatsApp API Pricing Works',
    subtitle: 'Three rules produce the whole bill. Once you know them, the estimate is just multiplication.',
    step1Title: 'Every template has a category',
    step1Body:
      'When you submit a template, Meta files it as marketing, utility or authentication. That category decides the price of every send, and marketing usually costs several times more than the other two.',
    step2Title: 'You pay per delivered message',
    step2Body:
      'Since July 2025, Meta charges for each template message it delivers, priced by the recipient’s country. Billing used to be per 24-hour conversation, so cost guides written before the change no longer match the invoice.',
    step3Title: 'Some messages cost nothing',
    step3Body:
      'When a customer writes to you first, your replies are free for 24 hours. Utility templates delivered inside that open window are free as well, which is why teams move order updates into it.',
  },
  formulas: {
    h2: 'The Maths Behind The Estimate',
    subtitle: 'Every number in the results panel comes from one of these lines.',
    items: [
      {
        name: 'Marketing cost',
        formula: 'Marketing messages × marketing rate',
        note: 'Usually the biggest line on the bill.',
      },
      {
        name: 'Utility cost',
        formula: 'Paid utility messages × utility rate',
        note: 'Paid means sent outside an open 24-hour service window.',
      },
      {
        name: 'Authentication cost',
        formula: 'Authentication messages × authentication rate',
        note: 'Passcodes and login verification.',
      },
      {
        name: 'Free utility messages',
        formula: 'Utility messages × window share',
        note: 'Delivered inside the window, so billed at zero.',
      },
      {
        name: 'Monthly total',
        formula: 'Marketing + utility + authentication',
        note: 'What Meta bills for the month. BSPs may add their own fees on top.',
      },
      {
        name: 'Cost per paid message',
        formula: 'Monthly total ÷ paid messages',
        note: 'A blended rate you can compare across markets.',
      },
    ],
  },
  whyUse: {
    h2: 'Why Use This Calculator',
    subtitle: 'Quick to answer the budget question, and honest about where the numbers come from.',
    freeTitle: 'Free, no signup',
    freeBody: 'No email wall and no account. Open it and use it.',
    privateTitle: 'Your volumes stay yours',
    privateBody:
      'The whole calculation happens in your browser. We never receive what you type, and nothing is stored anywhere.',
    ratesTitle: 'Rates you can overwrite',
    ratesBody:
      'Meta updates its rate card and any preset will drift. Every rate here is an input, so the tool still works the day the card changes.',
    instantTitle: 'Updates as you type',
    instantBody: 'Change a volume or a rate and everything recalculates, so you can compare scenarios in seconds.',
  },
  attribution: {
    h2: 'The Meter Only Runs On Template Messages',
    body:
      'API pricing applies to the templates you push out, which is mostly broadcasts and notifications. The 1:1 selling your reps do all day happens in the WhatsApp apps, where sending costs nothing. The catch is that those conversations never reach your CRM on their own.',
    point1: 'Broadcasts and notifications belong on the API. This calculator prices them.',
    point2: 'Deal conversations belong in the chat apps, where there is no per-message fee.',
    point3: 'Eazybe syncs those chats into HubSpot, Salesforce, Zoho or Pipedrive, so the free channel still shows up in your reporting.',
    cta: 'See how Eazybe syncs WhatsApp to your CRM',
  },
  faq: {
    h2: 'Frequently Asked Questions',
    subtitle: 'Common questions about WhatsApp API pricing and how this tool works.',
    items: [
      {
        q: 'How does WhatsApp Business API pricing work?',
        a: 'Meta charges per delivered template message. The price depends on two things: the template’s category (marketing, utility or authentication) and the recipient’s country. Replies you send inside an open 24-hour customer service window are free-form and free of charge.',
      },
      {
        q: 'What changed in WhatsApp pricing in July 2025?',
        a: 'Meta switched from charging per 24-hour conversation to charging per delivered template message. Under the old model, one conversation covered any number of messages inside the window. Now each marketing, utility or authentication template delivery is billed on its own, so high-frequency senders saw the bigger change.',
      },
      {
        q: 'What are the WhatsApp message categories?',
        a: 'Marketing covers promotions, offers and re-engagement. Utility covers transactional updates like order confirmations and payment reminders. Authentication covers one-time passcodes. Meta assigns the category when it approves your template, and the category sets the price.',
      },
      {
        q: 'Which WhatsApp messages are free?',
        a: 'Two kinds. Service conversations: when a customer messages you first, everything you reply within 24 hours is free. And utility templates delivered while that window is open are free too. Marketing and authentication templates are always paid.',
      },
      {
        q: 'What is the 24-hour customer service window?',
        a: 'It opens each time a customer sends you a message and lasts 24 hours from their last message. Inside it you can reply freely without templates and without charge. Once it closes, reaching that customer again requires a paid, pre-approved template.',
      },
      {
        q: 'Why are marketing messages so much more expensive?',
        a: 'Meta prices categories by how much businesses want to send them and how much users want to receive them. Promotional volume is what Meta monetises, so marketing rates in most countries are several times the utility rate. That gap is also the main cost lever: templates that qualify as utility should be filed as utility.',
      },
      {
        q: 'Are the rates in this calculator exact?',
        a: 'They are editable estimates based on Meta’s published rate card, and Meta revises that card. Your invoice also depends on each recipient’s country, not one flat market, and business solution providers often add their own fees. Use the estimate for budgeting, then confirm against Meta’s current rate card.',
      },
      {
        q: 'Does the WhatsApp Business app cost anything?',
        a: 'The WhatsApp Business app is free, and normal 1:1 chats in it have no per-message fee. The API and its message pricing exist for automation and volume: broadcasts, chatbots and system notifications sent through a provider.',
      },
      {
        q: 'Do I need the API to sell on WhatsApp?',
        a: 'Not for conversations your reps handle personally. The API earns its cost when you need bulk sends or automation. Many teams run both: broadcasts on the API, and day-to-day selling in the apps with a tool like Eazybe logging those chats to the CRM.',
      },
      {
        q: 'Is this calculator free, and is my data stored?',
        a: 'It is free with no signup. The calculation runs entirely in your browser, so the volumes and rates you enter are never sent to us and nothing is stored.',
      },
    ],
  },
  moreTools: {
    h2: 'More Free Tools',
    allTools: 'All tools →',
  },
  finalCta: {
    h2: 'Sell On The Channel Where Messages Cost Nothing',
    body:
      'Eazybe connects the regular WhatsApp apps to HubSpot, Salesforce, Zoho, Pipedrive and more, so your team’s 1:1 conversations get logged, measured and followed up without a per-message bill attached.',
    primary: 'Start free',
    secondary: 'Book a demo',
  },
}

const br: WaPricingPageContent = {
  meta: {
    title: 'Calculadora de Preços do WhatsApp — Custo da API | Eazybe',
    description:
      'Calculadora gratuita de preços da API do WhatsApp. Informe seus volumes mensais de mensagens de marketing, utilidade e autenticação e estime a fatura da Meta por país. Taxas editáveis, sem cadastro.',
    ogDescription:
      'Estime quanto a API do WhatsApp Business vai custar por mês e por ano, por mercado e categoria de mensagem. Grátis, taxas editáveis, roda no seu navegador.',
  },
  breadcrumb: { home: 'Início', current: 'Calculadora de Preços do WhatsApp' },
  hero: {
    tag: 'Ferramenta Gratuita',
    h1Lead: 'Calculadora de Preços do',
    h1Highlight: 'WhatsApp',
    subtitle:
      'Escolha o mercado, informe quantas mensagens de template você envia por mês e veja quanto a Meta cobraria. Marketing, utilidade e autenticação têm preços separados, e os casos gratuitos já ficam de fora da conta. Todas as taxas são editáveis: quando a Meta atualizar a tabela, você atualiza os números.',
    cta: 'Estimar meu custo',
    footnote: 'Grátis, sem cadastro. Tudo roda no seu navegador e nada do que você digita é enviado para nós.',
  },
  calculator: {
    h2: 'Estime o custo da sua API do WhatsApp',
    subtitle: 'Os volumes são mensais. As taxas estão em USD por mensagem entregue e você pode sobrescrever qualquer uma.',
    inputsTitle: 'Seus volumes mensais',
    btnReset: 'Limpar',
    marketLabel: 'Mercado',
    marketHint: 'O WhatsApp precifica pelo país do destinatário. Escolha onde está a maior parte dos seus clientes.',
    markets: {
      in: 'Índia',
      br: 'Brasil',
      mx: 'México',
      id: 'Indonésia',
      us: 'América do Norte (EUA e Canadá)',
      gb: 'Reino Unido',
      other: 'Outro mercado (informe suas taxas)',
    },
    marketingLabel: 'Mensagens de marketing',
    marketingHint: 'Promoções, ofertas e templates de reengajamento. A categoria cara.',
    utilityLabel: 'Mensagens de utilidade',
    utilityHint: 'Atualizações de pedido, avisos de entrega, lembretes de pagamento.',
    authLabel: 'Mensagens de autenticação',
    authHint: 'Senhas de uso único e verificação de login.',
    windowLabel: 'Mensagens de utilidade enviadas dentro da janela de 24h (%)',
    windowHint: 'Templates de utilidade entregues com uma conversa de atendimento aberta são gratuitos. Uma estimativa aproximada basta.',
    optional: 'opcional',
    ratesTitle: 'Taxas (USD por mensagem entregue)',
    ratesHint:
      'Preenchidas com base na tabela publicada pela Meta e feitas para serem sobrescritas. As taxas mudam, então confira a tabela atual antes de fechar o orçamento:',
    ratesLinkText: 'página de preços do WhatsApp da Meta',
    marketingRateLabel: 'Taxa de marketing',
    utilityRateLabel: 'Taxa de utilidade',
    authRateLabel: 'Taxa de autenticação',
    errorWindowRange: 'Informe um percentual entre 0 e 100.',
    errorMissingRate: 'Você informou um volume para esta categoria, então ela precisa de uma taxa.',
    resultsTitle: 'Sua estimativa',
    emptyState: 'Informe pelo menos um volume mensal para ver a estimativa.',
    monthlyLabel: 'Custo mensal',
    monthlyHelp: 'O que a Meta cobraria por esses volumes, antes de qualquer taxa de BSP.',
    annualLabel: 'Custo anual',
    annualHelp: 'O valor mensal ao longo de doze meses, nos mesmos volumes.',
    marketingCostLabel: 'Marketing',
    marketingCostHelp: 'Mensagens de marketing na sua taxa de marketing.',
    utilityCostLabel: 'Utilidade',
    utilityCostHelp: 'Somente as mensagens de utilidade enviadas fora da janela de atendimento.',
    authCostLabel: 'Autenticação',
    authCostHelp: 'Mensagens de autenticação na sua taxa de autenticação.',
    freeUtilLabel: 'Mensagens de utilidade gratuitas',
    freeUtilHelp: 'Entregues dentro da janela de 24h, cobradas a zero.',
    perMsgLabel: 'Custo por mensagem paga',
    perMsgHelp: 'A taxa média de tudo o que você paga.',
    serviceNote:
      'Conversas de atendimento não entram neste total porque são gratuitas: quando o cliente escreve primeiro, as respostas dentro da janela de 24 horas não custam nada.',
  },
  howTo: {
    h2: 'Como funciona o preço da API do WhatsApp',
    subtitle: 'Três regras produzem a fatura inteira. Conhecendo as três, a estimativa vira só multiplicação.',
    step1Title: 'Todo template tem uma categoria',
    step1Body:
      'Quando você envia um template para aprovação, a Meta o classifica como marketing, utilidade ou autenticação. Essa categoria define o preço de cada envio, e marketing normalmente custa várias vezes mais que as outras duas.',
    step2Title: 'Você paga por mensagem entregue',
    step2Body:
      'Desde julho de 2025 a Meta cobra por cada mensagem de template entregue, com preço definido pelo país do destinatário. Antes a cobrança era por conversa de 24 horas, então guias de custo escritos antes da mudança não batem mais com a fatura.',
    step3Title: 'Algumas mensagens não custam nada',
    step3Body:
      'Quando o cliente escreve primeiro, suas respostas são gratuitas por 24 horas. Templates de utilidade entregues dentro dessa janela aberta também são gratuitos, e é por isso que os times movem as atualizações de pedido para dentro dela.',
  },
  formulas: {
    h2: 'A matemática por trás da estimativa',
    subtitle: 'Cada número do painel de resultados sai de uma destas linhas.',
    items: [
      {
        name: 'Custo de marketing',
        formula: 'Mensagens de marketing × taxa de marketing',
        note: 'Normalmente a maior linha da fatura.',
      },
      {
        name: 'Custo de utilidade',
        formula: 'Mensagens de utilidade pagas × taxa de utilidade',
        note: 'Pagas significa enviadas fora de uma janela de atendimento aberta.',
      },
      {
        name: 'Custo de autenticação',
        formula: 'Mensagens de autenticação × taxa de autenticação',
        note: 'Senhas e verificação de login.',
      },
      {
        name: 'Mensagens de utilidade gratuitas',
        formula: 'Mensagens de utilidade × percentual na janela',
        note: 'Entregues dentro da janela, cobradas a zero.',
      },
      {
        name: 'Total mensal',
        formula: 'Marketing + utilidade + autenticação',
        note: 'O que a Meta cobra no mês. BSPs podem somar as próprias taxas.',
      },
      {
        name: 'Custo por mensagem paga',
        formula: 'Total mensal ÷ mensagens pagas',
        note: 'Uma taxa média para comparar mercados.',
      },
    ],
  },
  whyUse: {
    h2: 'Por que usar esta calculadora',
    subtitle: 'Responde rápido à pergunta do orçamento e é honesta sobre a origem dos números.',
    freeTitle: 'Grátis, sem cadastro',
    freeBody: 'Sem pedir e-mail e sem criar conta. Abra e use.',
    privateTitle: 'Seus volumes continuam seus',
    privateBody:
      'O cálculo inteiro acontece no seu navegador. Nunca recebemos o que você digita e nada fica armazenado em lugar nenhum.',
    ratesTitle: 'Taxas que você pode sobrescrever',
    ratesBody:
      'A Meta atualiza a tabela e qualquer valor pré-carregado envelhece. Aqui toda taxa é um campo, então a ferramenta continua útil no dia em que a tabela mudar.',
    instantTitle: 'Atualiza enquanto você digita',
    instantBody: 'Mude um volume ou uma taxa e tudo é recalculado, para comparar cenários em segundos.',
  },
  attribution: {
    h2: 'O medidor só roda nas mensagens de template',
    body:
      'O preço da API vale para os templates que você dispara, ou seja, broadcasts e notificações. A venda 1:1 que seus vendedores fazem o dia todo acontece nos aplicativos do WhatsApp, onde enviar não custa nada. O problema é que essas conversas nunca chegam sozinhas ao seu CRM.',
    point1: 'Broadcasts e notificações pertencem à API. Esta calculadora precifica exatamente isso.',
    point2: 'Conversas de venda pertencem aos aplicativos, onde não existe cobrança por mensagem.',
    point3: 'A Eazybe sincroniza essas conversas com HubSpot, Salesforce, Zoho ou Pipedrive, para o canal gratuito aparecer nos seus relatórios.',
    cta: 'Veja como a Eazybe sincroniza o WhatsApp com seu CRM',
  },
  faq: {
    h2: 'Perguntas frequentes',
    subtitle: 'Dúvidas comuns sobre o preço da API do WhatsApp e sobre como esta ferramenta funciona.',
    items: [
      {
        q: 'Como funciona a cobrança da API do WhatsApp Business?',
        a: 'A Meta cobra por mensagem de template entregue. O preço depende de duas coisas: a categoria do template (marketing, utilidade ou autenticação) e o país do destinatário. As respostas enviadas dentro de uma janela de atendimento de 24 horas aberta são livres de template e de cobrança.',
      },
      {
        q: 'O que mudou no preço do WhatsApp em julho de 2025?',
        a: 'A Meta trocou a cobrança por conversa de 24 horas pela cobrança por mensagem de template entregue. No modelo antigo, uma conversa cobria qualquer quantidade de mensagens dentro da janela. Agora cada entrega de template de marketing, utilidade ou autenticação é faturada por si, então quem envia com alta frequência sentiu mais a mudança.',
      },
      {
        q: 'Quais são as categorias de mensagem do WhatsApp?',
        a: 'Marketing cobre promoções, ofertas e reengajamento. Utilidade cobre atualizações transacionais, como confirmações de pedido e lembretes de pagamento. Autenticação cobre senhas de uso único. A Meta atribui a categoria ao aprovar o template, e a categoria define o preço.',
      },
      {
        q: 'Quais mensagens do WhatsApp são gratuitas?',
        a: 'Dois tipos. Conversas de atendimento: quando o cliente escreve primeiro, tudo o que você responde em 24 horas é gratuito. E templates de utilidade entregues com essa janela aberta também são gratuitos. Templates de marketing e autenticação são sempre pagos.',
      },
      {
        q: 'O que é a janela de atendimento de 24 horas?',
        a: 'Ela abre toda vez que um cliente envia uma mensagem e dura 24 horas a partir da última mensagem dele. Dentro dela você responde livremente, sem template e sem cobrança. Quando fecha, alcançar esse cliente de novo exige um template pago e pré-aprovado.',
      },
      {
        q: 'Por que mensagens de marketing custam tão mais caro?',
        a: 'A Meta precifica as categorias pelo interesse das empresas em enviá-las e dos usuários em recebê-las. O volume promocional é o que a Meta monetiza, então a taxa de marketing na maioria dos países é várias vezes a de utilidade. Essa diferença também é a principal alavanca de custo: template que se qualifica como utilidade deve ser classificado como utilidade.',
      },
      {
        q: 'As taxas desta calculadora são exatas?',
        a: 'São estimativas editáveis baseadas na tabela pública da Meta, e a Meta revisa essa tabela. Sua fatura também depende do país de cada destinatário, não de um único mercado, e provedores de solução (BSPs) costumam somar as próprias taxas. Use a estimativa para orçar e confirme na tabela atual da Meta.',
      },
      {
        q: 'O aplicativo WhatsApp Business custa alguma coisa?',
        a: 'O aplicativo WhatsApp Business é gratuito, e as conversas 1:1 normais nele não têm cobrança por mensagem. A API e seu preço por mensagem existem para automação e volume: broadcasts, chatbots e notificações de sistema enviados por um provedor.',
      },
      {
        q: 'Preciso da API para vender no WhatsApp?',
        a: 'Para as conversas que seus vendedores conduzem pessoalmente, não. A API compensa quando você precisa de envios em massa ou automação. Muitos times usam os dois: broadcasts na API e a venda do dia a dia nos aplicativos, com uma ferramenta como a Eazybe registrando essas conversas no CRM.',
      },
      {
        q: 'A calculadora é gratuita e meus dados ficam salvos?',
        a: 'É gratuita e sem cadastro. O cálculo roda inteiramente no seu navegador, então os volumes e taxas que você digita nunca são enviados para nós e nada fica armazenado.',
      },
    ],
  },
  moreTools: {
    h2: 'Mais ferramentas gratuitas',
    allTools: 'Todas as ferramentas →',
  },
  finalCta: {
    h2: 'Venda no canal em que a mensagem não custa nada',
    body:
      'A Eazybe conecta os aplicativos comuns do WhatsApp ao HubSpot, Salesforce, Zoho, Pipedrive e outros, para as conversas 1:1 do seu time serem registradas, medidas e acompanhadas sem uma fatura por mensagem junto.',
    primary: 'Começar grátis',
    secondary: 'Agendar demo',
  },
}

const es: WaPricingPageContent = {
  meta: {
    title: 'Calculadora de Precios de WhatsApp — Coste de la API | Eazybe',
    description:
      'Calculadora gratuita de precios de la API de WhatsApp. Introduce tus volúmenes mensuales de mensajes de marketing, utilidad y autenticación y estima la factura de Meta por país. Tarifas editables, sin registro.',
    ogDescription:
      'Estima cuánto costará la API de WhatsApp Business al mes y al año, por mercado y categoría de mensaje. Gratis, tarifas editables, funciona en tu navegador.',
  },
  breadcrumb: { home: 'Inicio', current: 'Calculadora de Precios de WhatsApp' },
  hero: {
    tag: 'Herramienta Gratuita',
    h1Lead: 'Calculadora de Precios de',
    h1Highlight: 'WhatsApp',
    subtitle:
      'Elige tu mercado, introduce cuántos mensajes de plantilla envías al mes y mira cuánto te facturaría Meta. Marketing, utilidad y autenticación se cobran por separado, y los casos gratuitos ya quedan fuera de la cuenta. Todas las tarifas son editables: cuando Meta actualice su tarifario, tú actualizas los números.',
    cta: 'Estimar mi coste',
    footnote: 'Gratis, sin registro. Todo funciona en tu navegador y nada de lo que escribes se nos envía.',
  },
  calculator: {
    h2: 'Estima el coste de tu API de WhatsApp',
    subtitle: 'Los volúmenes son mensuales. Las tarifas están en USD por mensaje entregado y puedes sobrescribir cualquiera.',
    inputsTitle: 'Tus volúmenes mensuales',
    btnReset: 'Reiniciar',
    marketLabel: 'Mercado',
    marketHint: 'WhatsApp cobra según el país del destinatario. Elige dónde está la mayoría de tus clientes.',
    markets: {
      in: 'India',
      br: 'Brasil',
      mx: 'México',
      id: 'Indonesia',
      us: 'Norteamérica (EE. UU. y Canadá)',
      gb: 'Reino Unido',
      other: 'Otro mercado (introduce tus tarifas)',
    },
    marketingLabel: 'Mensajes de marketing',
    marketingHint: 'Promociones, ofertas y plantillas de reenganche. La categoría cara.',
    utilityLabel: 'Mensajes de utilidad',
    utilityHint: 'Actualizaciones de pedido, avisos de entrega, recordatorios de pago.',
    authLabel: 'Mensajes de autenticación',
    authHint: 'Códigos de un solo uso y verificación de inicio de sesión.',
    windowLabel: 'Mensajes de utilidad enviados dentro de la ventana de 24h (%)',
    windowHint: 'Las plantillas de utilidad entregadas con una conversación de atención abierta son gratuitas. Basta una estimación aproximada.',
    optional: 'opcional',
    ratesTitle: 'Tarifas (USD por mensaje entregado)',
    ratesHint:
      'Precargadas a partir del tarifario publicado por Meta y pensadas para sobrescribirse. Las tarifas cambian, así que consulta el tarifario vigente antes de presupuestar:',
    ratesLinkText: 'página de precios de WhatsApp de Meta',
    marketingRateLabel: 'Tarifa de marketing',
    utilityRateLabel: 'Tarifa de utilidad',
    authRateLabel: 'Tarifa de autenticación',
    errorWindowRange: 'Introduce un porcentaje entre 0 y 100.',
    errorMissingRate: 'Has introducido un volumen para esta categoría, así que necesita una tarifa.',
    resultsTitle: 'Tu estimación',
    emptyState: 'Introduce al menos un volumen mensual para ver la estimación.',
    monthlyLabel: 'Coste mensual',
    monthlyHelp: 'Lo que Meta facturaría por estos volúmenes, antes de cualquier tarifa de BSP.',
    annualLabel: 'Coste anual',
    annualHelp: 'La cifra mensual a lo largo de doce meses, con los mismos volúmenes.',
    marketingCostLabel: 'Marketing',
    marketingCostHelp: 'Mensajes de marketing a tu tarifa de marketing.',
    utilityCostLabel: 'Utilidad',
    utilityCostHelp: 'Solo los mensajes de utilidad enviados fuera de una ventana de atención.',
    authCostLabel: 'Autenticación',
    authCostHelp: 'Mensajes de autenticación a tu tarifa de autenticación.',
    freeUtilLabel: 'Mensajes de utilidad gratuitos',
    freeUtilHelp: 'Entregados dentro de la ventana de 24h, facturados a cero.',
    perMsgLabel: 'Coste por mensaje pagado',
    perMsgHelp: 'La tarifa media de todo lo que pagas.',
    serviceNote:
      'Las conversaciones de atención no entran en este total porque son gratuitas: cuando el cliente te escribe primero, las respuestas dentro de la ventana de 24 horas no cuestan nada.',
  },
  howTo: {
    h2: 'Cómo funciona el precio de la API de WhatsApp',
    subtitle: 'Tres reglas producen toda la factura. Conociéndolas, la estimación es pura multiplicación.',
    step1Title: 'Cada plantilla tiene una categoría',
    step1Body:
      'Cuando envías una plantilla a aprobación, Meta la clasifica como marketing, utilidad o autenticación. Esa categoría decide el precio de cada envío, y marketing suele costar varias veces más que las otras dos.',
    step2Title: 'Pagas por mensaje entregado',
    step2Body:
      'Desde julio de 2025, Meta cobra por cada mensaje de plantilla que entrega, con el precio del país del destinatario. Antes se facturaba por conversación de 24 horas, así que las guías de costes escritas antes del cambio ya no cuadran con la factura.',
    step3Title: 'Algunos mensajes no cuestan nada',
    step3Body:
      'Cuando un cliente te escribe primero, tus respuestas son gratuitas durante 24 horas. Las plantillas de utilidad entregadas dentro de esa ventana abierta también son gratuitas, y por eso los equipos mueven las actualizaciones de pedido dentro de ella.',
  },
  formulas: {
    h2: 'Las cuentas detrás de la estimación',
    subtitle: 'Cada cifra del panel de resultados sale de una de estas líneas.',
    items: [
      {
        name: 'Coste de marketing',
        formula: 'Mensajes de marketing × tarifa de marketing',
        note: 'Normalmente la línea más grande de la factura.',
      },
      {
        name: 'Coste de utilidad',
        formula: 'Mensajes de utilidad pagados × tarifa de utilidad',
        note: 'Pagados significa enviados fuera de una ventana de atención abierta.',
      },
      {
        name: 'Coste de autenticación',
        formula: 'Mensajes de autenticación × tarifa de autenticación',
        note: 'Códigos y verificación de inicio de sesión.',
      },
      {
        name: 'Mensajes de utilidad gratuitos',
        formula: 'Mensajes de utilidad × porcentaje en ventana',
        note: 'Entregados dentro de la ventana, facturados a cero.',
      },
      {
        name: 'Total mensual',
        formula: 'Marketing + utilidad + autenticación',
        note: 'Lo que Meta factura al mes. Los BSP pueden añadir sus propias tarifas.',
      },
      {
        name: 'Coste por mensaje pagado',
        formula: 'Total mensual ÷ mensajes pagados',
        note: 'Una tarifa media para comparar mercados.',
      },
    ],
  },
  whyUse: {
    h2: 'Por qué usar esta calculadora',
    subtitle: 'Responde rápido a la pregunta del presupuesto y es honesta sobre el origen de las cifras.',
    freeTitle: 'Gratis, sin registro',
    freeBody: 'Sin muro de correo y sin crear cuenta. Ábrela y úsala.',
    privateTitle: 'Tus volúmenes siguen siendo tuyos',
    privateBody:
      'El cálculo entero ocurre en tu navegador. Nunca recibimos lo que escribes y no se guarda nada en ningún sitio.',
    ratesTitle: 'Tarifas que puedes sobrescribir',
    ratesBody:
      'Meta actualiza su tarifario y cualquier valor precargado envejece. Aquí cada tarifa es un campo, así que la herramienta sigue sirviendo el día que cambie el tarifario.',
    instantTitle: 'Se actualiza mientras escribes',
    instantBody: 'Cambia un volumen o una tarifa y todo se recalcula, para comparar escenarios en segundos.',
  },
  attribution: {
    h2: 'El contador solo corre con las plantillas',
    body:
      'El precio de la API se aplica a las plantillas que envías, es decir, difusiones y notificaciones. La venta 1:1 que tus comerciales hacen todo el día ocurre en las apps de WhatsApp, donde enviar no cuesta nada. El problema es que esas conversaciones nunca llegan solas a tu CRM.',
    point1: 'Las difusiones y notificaciones pertenecen a la API. Esta calculadora les pone precio.',
    point2: 'Las conversaciones de venta pertenecen a las apps, donde no hay cobro por mensaje.',
    point3: 'Eazybe sincroniza esos chats con HubSpot, Salesforce, Zoho o Pipedrive, para que el canal gratuito aparezca en tus informes.',
    cta: 'Mira cómo Eazybe sincroniza WhatsApp con tu CRM',
  },
  faq: {
    h2: 'Preguntas frecuentes',
    subtitle: 'Dudas habituales sobre el precio de la API de WhatsApp y sobre cómo funciona esta herramienta.',
    items: [
      {
        q: '¿Cómo funciona el cobro de la API de WhatsApp Business?',
        a: 'Meta cobra por mensaje de plantilla entregado. El precio depende de dos cosas: la categoría de la plantilla (marketing, utilidad o autenticación) y el país del destinatario. Las respuestas que envías dentro de una ventana de atención de 24 horas abierta son de formato libre y sin coste.',
      },
      {
        q: '¿Qué cambió en el precio de WhatsApp en julio de 2025?',
        a: 'Meta pasó de cobrar por conversación de 24 horas a cobrar por mensaje de plantilla entregado. Con el modelo antiguo, una conversación cubría cualquier número de mensajes dentro de la ventana. Ahora cada entrega de plantilla de marketing, utilidad o autenticación se factura por separado, así que quien envía con alta frecuencia notó más el cambio.',
      },
      {
        q: '¿Cuáles son las categorías de mensaje de WhatsApp?',
        a: 'Marketing cubre promociones, ofertas y reenganche. Utilidad cubre actualizaciones transaccionales, como confirmaciones de pedido y recordatorios de pago. Autenticación cubre códigos de un solo uso. Meta asigna la categoría al aprobar la plantilla, y la categoría fija el precio.',
      },
      {
        q: '¿Qué mensajes de WhatsApp son gratuitos?',
        a: 'Dos tipos. Las conversaciones de atención: cuando un cliente te escribe primero, todo lo que respondas en 24 horas es gratis. Y las plantillas de utilidad entregadas con esa ventana abierta también son gratuitas. Las plantillas de marketing y autenticación siempre se pagan.',
      },
      {
        q: '¿Qué es la ventana de atención de 24 horas?',
        a: 'Se abre cada vez que un cliente te envía un mensaje y dura 24 horas desde su último mensaje. Dentro de ella puedes responder libremente, sin plantillas y sin coste. Cuando se cierra, volver a contactar a ese cliente exige una plantilla pagada y preaprobada.',
      },
      {
        q: '¿Por qué los mensajes de marketing cuestan tanto más?',
        a: 'Meta pone precio a las categorías según cuánto quieren enviarlas las empresas y cuánto quieren recibirlas los usuarios. El volumen promocional es lo que Meta monetiza, así que la tarifa de marketing en la mayoría de países es varias veces la de utilidad. Esa brecha es además la principal palanca de coste: una plantilla que califica como utilidad debe clasificarse como utilidad.',
      },
      {
        q: '¿Las tarifas de esta calculadora son exactas?',
        a: 'Son estimaciones editables basadas en el tarifario público de Meta, y Meta revisa ese tarifario. Tu factura también depende del país de cada destinatario, no de un único mercado, y los proveedores de soluciones (BSP) suelen añadir sus propias tarifas. Usa la estimación para presupuestar y confírmala con el tarifario vigente de Meta.',
      },
      {
        q: '¿La app de WhatsApp Business cuesta algo?',
        a: 'La app de WhatsApp Business es gratuita, y los chats 1:1 normales en ella no tienen cobro por mensaje. La API y su precio por mensaje existen para la automatización y el volumen: difusiones, chatbots y notificaciones de sistema enviadas a través de un proveedor.',
      },
      {
        q: '¿Necesito la API para vender por WhatsApp?',
        a: 'Para las conversaciones que tus comerciales llevan personalmente, no. La API compensa cuando necesitas envíos masivos o automatización. Muchos equipos usan ambas: difusiones en la API y la venta del día a día en las apps, con una herramienta como Eazybe registrando esos chats en el CRM.',
      },
      {
        q: '¿La calculadora es gratuita y se guardan mis datos?',
        a: 'Es gratuita y sin registro. El cálculo se ejecuta enteramente en tu navegador, así que los volúmenes y tarifas que introduces nunca se nos envían y no se guarda nada.',
      },
    ],
  },
  moreTools: {
    h2: 'Más herramientas gratuitas',
    allTools: 'Todas las herramientas →',
  },
  finalCta: {
    h2: 'Vende en el canal donde el mensaje no cuesta nada',
    body:
      'Eazybe conecta las apps normales de WhatsApp con HubSpot, Salesforce, Zoho, Pipedrive y más, para que las conversaciones 1:1 de tu equipo queden registradas, medidas y con seguimiento, sin una factura por mensaje detrás.',
    primary: 'Empezar gratis',
    secondary: 'Reservar demo',
  },
}

const tr: WaPricingPageContent = {
  meta: {
    title: 'WhatsApp Fiyat Hesaplayıcı — API Maliyet Aracı | Eazybe',
    description:
      'Ücretsiz WhatsApp API fiyat hesaplayıcı. Aylık pazarlama, hizmet ve doğrulama mesajı hacimlerinizi girin, Meta faturanızı ülkeye göre tahmin edin. Düzenlenebilir tarifeler, kayıt yok.',
    ogDescription:
      'WhatsApp Business API’nin aylık ve yıllık maliyetini pazara ve mesaj kategorisine göre tahmin edin. Ücretsiz, düzenlenebilir tarifeler, tarayıcınızda çalışır.',
  },
  breadcrumb: { home: 'Ana Sayfa', current: 'WhatsApp Fiyat Hesaplayıcı' },
  hero: {
    tag: 'Ücretsiz Araç',
    h1Lead: 'WhatsApp Fiyat',
    h1Highlight: 'Hesaplayıcı',
    subtitle:
      'Pazarınızı seçin, ayda kaç şablon mesajı gönderdiğinizi girin ve Meta’nın ne fatura edeceğini görün. Pazarlama, hizmet ve doğrulama ayrı ayrı fiyatlanır; ücretsiz durumlar hesaptan zaten çıkarılır. Tüm tarifeler düzenlenebilir: Meta tarife kartını güncellediğinde siz de rakamları güncellersiniz.',
    cta: 'Maliyetimi tahmin et',
    footnote: 'Ücretsiz, kayıt yok. Her şey tarayıcınızda çalışır ve yazdıklarınız bize gönderilmez.',
  },
  calculator: {
    h2: 'WhatsApp API maliyetinizi tahmin edin',
    subtitle: 'Hacimler aylıktır. Tarifeler, teslim edilen mesaj başına USD cinsindendir ve hepsinin üzerine yazabilirsiniz.',
    inputsTitle: 'Aylık hacimleriniz',
    btnReset: 'Sıfırla',
    marketLabel: 'Pazar',
    marketHint: 'WhatsApp, alıcının ülkesine göre fiyatlandırır. Müşterilerinizin çoğunun olduğu yeri seçin.',
    markets: {
      in: 'Hindistan',
      br: 'Brezilya',
      mx: 'Meksika',
      id: 'Endonezya',
      us: 'Kuzey Amerika (ABD ve Kanada)',
      gb: 'Birleşik Krallık',
      other: 'Başka pazar (tarifeleri kendiniz girin)',
    },
    marketingLabel: 'Pazarlama mesajları',
    marketingHint: 'Promosyonlar, teklifler ve yeniden etkileşim şablonları. Pahalı kategori.',
    utilityLabel: 'Hizmet mesajları',
    utilityHint: 'Sipariş güncellemeleri, teslimat bildirimleri, ödeme hatırlatmaları.',
    authLabel: 'Doğrulama mesajları',
    authHint: 'Tek kullanımlık şifreler ve giriş doğrulaması.',
    windowLabel: '24 saatlik pencere içinde gönderilen hizmet mesajları (%)',
    windowHint: 'Açık bir müşteri konuşması sırasında teslim edilen hizmet şablonları ücretsizdir. Kabaca bir oran yeterli.',
    optional: 'isteğe bağlı',
    ratesTitle: 'Tarifeler (teslim edilen mesaj başına USD)',
    ratesHint:
      'Meta’nın yayımladığı tarife kartından önceden dolduruldu ve üzerine yazılabilir. Tarifeler değişir; bütçe yapmadan önce güncel kartı kontrol edin:',
    ratesLinkText: 'Meta’nın WhatsApp fiyatlandırma sayfası',
    marketingRateLabel: 'Pazarlama tarifesi',
    utilityRateLabel: 'Hizmet tarifesi',
    authRateLabel: 'Doğrulama tarifesi',
    errorWindowRange: '0 ile 100 arasında bir oran girin.',
    errorMissingRate: 'Bu kategori için hacim girdiniz; bir tarife de gerekiyor.',
    resultsTitle: 'Tahmininiz',
    emptyState: 'Tahmini görmek için en az bir aylık hacim girin.',
    monthlyLabel: 'Aylık maliyet',
    monthlyHelp: 'Bu hacimler için Meta’nın keseceği fatura, BSP ücretleri hariç.',
    annualLabel: 'Yıllık maliyet',
    annualHelp: 'Aynı hacimlerle aylık tutarın on iki aylık toplamı.',
    marketingCostLabel: 'Pazarlama',
    marketingCostHelp: 'Pazarlama mesajları çarpı pazarlama tarifeniz.',
    utilityCostLabel: 'Hizmet',
    utilityCostHelp: 'Yalnızca hizmet penceresi dışında gönderilen hizmet mesajları.',
    authCostLabel: 'Doğrulama',
    authCostHelp: 'Doğrulama mesajları çarpı doğrulama tarifeniz.',
    freeUtilLabel: 'Ücretsiz hizmet mesajları',
    freeUtilHelp: '24 saatlik pencere içinde teslim edilen, sıfırdan faturalanan mesajlar.',
    perMsgLabel: 'Ücretli mesaj başına maliyet',
    perMsgHelp: 'Ödediğiniz her şeyin harmanlanmış ortalaması.',
    serviceNote:
      'Müşteri hizmetleri konuşmaları bu toplama girmez çünkü ücretsizdir: müşteri size önce yazdığında, 24 saatlik pencere içindeki yanıtlarınızın maliyeti yoktur.',
  },
  howTo: {
    h2: 'WhatsApp API fiyatlandırması nasıl işler',
    subtitle: 'Faturanın tamamını üç kural üretir. Üçünü bilince tahmin, çarpma işleminden ibaret kalır.',
    step1Title: 'Her şablonun bir kategorisi var',
    step1Body:
      'Bir şablonu onaya gönderdiğinizde Meta onu pazarlama, hizmet veya doğrulama olarak sınıflar. Her gönderimin fiyatını bu kategori belirler ve pazarlama genellikle diğer ikisinden birkaç kat pahalıdır.',
    step2Title: 'Teslim edilen mesaj başına ödersiniz',
    step2Body:
      'Temmuz 2025’ten beri Meta, teslim ettiği her şablon mesajı için alıcının ülkesine göre ücret alıyor. Eskiden faturalama 24 saatlik konuşma başınaydı; bu yüzden değişiklikten önce yazılmış maliyet rehberleri artık faturayla uyuşmuyor.',
    step3Title: 'Bazı mesajlar hiç ücretlendirilmez',
    step3Body:
      'Müşteri size önce yazdığında yanıtlarınız 24 saat boyunca ücretsizdir. O açık pencere içinde teslim edilen hizmet şablonları da ücretsizdir; ekiplerin sipariş güncellemelerini pencerenin içine taşımasının nedeni bu.',
  },
  formulas: {
    h2: 'Tahminin arkasındaki hesap',
    subtitle: 'Sonuç panelindeki her rakam bu satırlardan birinden çıkıyor.',
    items: [
      {
        name: 'Pazarlama maliyeti',
        formula: 'Pazarlama mesajları × pazarlama tarifesi',
        note: 'Genellikle faturanın en büyük kalemi.',
      },
      {
        name: 'Hizmet maliyeti',
        formula: 'Ücretli hizmet mesajları × hizmet tarifesi',
        note: 'Ücretli, açık bir hizmet penceresinin dışında gönderilen demek.',
      },
      {
        name: 'Doğrulama maliyeti',
        formula: 'Doğrulama mesajları × doğrulama tarifesi',
        note: 'Şifreler ve giriş doğrulaması.',
      },
      {
        name: 'Ücretsiz hizmet mesajları',
        formula: 'Hizmet mesajları × pencere oranı',
        note: 'Pencere içinde teslim edildiği için sıfırdan faturalanır.',
      },
      {
        name: 'Aylık toplam',
        formula: 'Pazarlama + hizmet + doğrulama',
        note: 'Meta’nın aylık faturası. BSP’ler üzerine kendi ücretlerini ekleyebilir.',
      },
      {
        name: 'Ücretli mesaj başına maliyet',
        formula: 'Aylık toplam ÷ ücretli mesajlar',
        note: 'Pazarları karşılaştırmak için harmanlanmış bir tarife.',
      },
    ],
  },
  whyUse: {
    h2: 'Neden bu hesaplayıcıyı kullanmalısınız',
    subtitle: 'Bütçe sorusunu hızlı yanıtlar ve rakamların kaynağı konusunda dürüsttür.',
    freeTitle: 'Ücretsiz, kayıt yok',
    freeBody: 'E-posta duvarı yok, hesap açmak da gerekmiyor. Açın ve kullanın.',
    privateTitle: 'Hacimleriniz sizde kalır',
    privateBody:
      'Hesaplamanın tamamı tarayıcınızda olur. Yazdıklarınız bize hiç ulaşmaz ve hiçbir yerde saklanmaz.',
    ratesTitle: 'Üzerine yazabileceğiniz tarifeler',
    ratesBody:
      'Meta tarife kartını günceller ve önceden doldurulmuş her değer eskir. Burada her tarife bir giriş alanı; kart değiştiği gün araç yine işe yarar.',
    instantTitle: 'Siz yazdıkça güncellenir',
    instantBody: 'Bir hacmi veya tarifeyi değiştirin, her şey yeniden hesaplanır; senaryoları saniyeler içinde karşılaştırırsınız.',
  },
  attribution: {
    h2: 'Sayaç yalnızca şablon mesajlarında işler',
    body:
      'API fiyatlandırması gönderdiğiniz şablonlara, yani çoğunlukla toplu gönderimlere ve bildirimlere uygulanır. Satış ekibinizin gün boyu yaptığı birebir satış, gönderimin hiçbir şeye mal olmadığı WhatsApp uygulamalarında geçer. Sorun şu ki o konuşmalar CRM’inize kendiliğinden hiç ulaşmaz.',
    point1: 'Toplu gönderimler ve bildirimler API’nin işidir. Bu hesaplayıcı tam olarak onları fiyatlar.',
    point2: 'Satış konuşmaları uygulamaların işidir; orada mesaj başına ücret yoktur.',
    point3: 'Eazybe bu sohbetleri HubSpot, Salesforce, Zoho veya Pipedrive’a senkronlar; ücretsiz kanal raporlarınızda görünür.',
    cta: 'Eazybe’nin WhatsApp’ı CRM’inize nasıl senkronladığını görün',
  },
  faq: {
    h2: 'Sıkça sorulan sorular',
    subtitle: 'WhatsApp API fiyatlandırması ve bu aracın çalışma şekli hakkında sık sorulanlar.',
    items: [
      {
        q: 'WhatsApp Business API fiyatlandırması nasıl işler?',
        a: 'Meta, teslim edilen şablon mesajı başına ücret alır. Fiyat iki şeye bağlıdır: şablonun kategorisi (pazarlama, hizmet veya doğrulama) ve alıcının ülkesi. Açık bir 24 saatlik müşteri hizmetleri penceresi içinde gönderdiğiniz yanıtlar serbest biçimlidir ve ücretsizdir.',
      },
      {
        q: 'Temmuz 2025’te WhatsApp fiyatlandırmasında ne değişti?',
        a: 'Meta, 24 saatlik konuşma başına ücretlendirmeden teslim edilen şablon mesajı başına ücretlendirmeye geçti. Eski modelde bir konuşma, pencere içindeki istediğiniz kadar mesajı kapsıyordu. Artık her pazarlama, hizmet veya doğrulama şablonu teslimi ayrı faturalanıyor; bu yüzden değişikliği en çok yüksek frekanslı gönderenler hissetti.',
      },
      {
        q: 'WhatsApp mesaj kategorileri nelerdir?',
        a: 'Pazarlama; promosyonları, teklifleri ve yeniden etkileşimi kapsar. Hizmet; sipariş onayı ve ödeme hatırlatması gibi işlemsel güncellemeleri kapsar. Doğrulama; tek kullanımlık şifreleri kapsar. Kategoriyi şablonu onaylarken Meta atar ve fiyatı kategori belirler.',
      },
      {
        q: 'Hangi WhatsApp mesajları ücretsizdir?',
        a: 'İki tür. Müşteri hizmetleri konuşmaları: müşteri size önce yazarsa, 24 saat içinde verdiğiniz tüm yanıtlar ücretsizdir. Ayrıca o pencere açıkken teslim edilen hizmet şablonları da ücretsizdir. Pazarlama ve doğrulama şablonları her zaman ücretlidir.',
      },
      {
        q: '24 saatlik müşteri hizmetleri penceresi nedir?',
        a: 'Müşteri size her mesaj gönderdiğinde açılır ve son mesajından itibaren 24 saat sürer. İçindeyken şablonsuz ve ücretsiz, serbestçe yanıt verebilirsiniz. Kapandığında o müşteriye yeniden ulaşmak, ücretli ve önceden onaylı bir şablon gerektirir.',
      },
      {
        q: 'Pazarlama mesajları neden bu kadar pahalı?',
        a: 'Meta kategorileri, işletmelerin gönderme isteğine ve kullanıcıların alma isteğine göre fiyatlar. Meta’nın para kazandığı şey promosyon hacmi; bu yüzden çoğu ülkede pazarlama tarifesi hizmet tarifesinin birkaç katıdır. Bu fark aynı zamanda ana maliyet kolu: hizmet sayılabilecek şablonlar hizmet olarak sınıflandırılmalı.',
      },
      {
        q: 'Bu hesaplayıcıdaki tarifeler kesin mi?',
        a: 'Meta’nın kamuya açık tarife kartına dayanan, düzenlenebilir tahminlerdir ve Meta o kartı günceller. Faturanız ayrıca tek bir pazara değil, her alıcının ülkesine bağlıdır; çözüm sağlayıcılar (BSP) da üzerine kendi ücretlerini ekleyebilir. Tahmini bütçe için kullanın, sonra Meta’nın güncel kartıyla doğrulayın.',
      },
      {
        q: 'WhatsApp Business uygulaması ücretli mi?',
        a: 'WhatsApp Business uygulaması ücretsizdir ve içindeki normal birebir sohbetlerde mesaj başına ücret yoktur. API ve mesaj fiyatlandırması, otomasyon ve hacim içindir: bir sağlayıcı üzerinden gönderilen toplu mesajlar, sohbet botları ve sistem bildirimleri.',
      },
      {
        q: 'WhatsApp’ta satış için API’ye ihtiyacım var mı?',
        a: 'Temsilcilerinizin bizzat yürüttüğü konuşmalar için hayır. API, toplu gönderim veya otomasyon gerektiğinde değer kazanır. Birçok ekip ikisini birden kullanır: toplu gönderimler API’de, günlük satış uygulamalarda; Eazybe gibi bir araç da o sohbetleri CRM’e işler.',
      },
      {
        q: 'Bu hesaplayıcı ücretsiz mi, verilerim saklanıyor mu?',
        a: 'Ücretsiz ve kayıt gerektirmiyor. Hesaplama tamamen tarayıcınızda çalışır; girdiğiniz hacimler ve tarifeler bize hiçbir zaman gönderilmez ve hiçbir şey saklanmaz.',
      },
    ],
  },
  moreTools: {
    h2: 'Daha fazla ücretsiz araç',
    allTools: 'Tüm araçlar →',
  },
  finalCta: {
    h2: 'Mesajın hiçbir şeye mal olmadığı kanalda satın',
    body:
      'Eazybe, normal WhatsApp uygulamalarını HubSpot, Salesforce, Zoho, Pipedrive ve diğerlerine bağlar; ekibinizin birebir konuşmaları mesaj başına fatura olmadan kaydedilir, ölçülür ve takip edilir.',
    primary: 'Ücretsiz başla',
    secondary: 'Demo planla',
  },
}

/**
 * Locale-specific URLs for this tool. The slug is translated per locale, so
 * each locale's route folder guards its own slug and every other combination
 * redirects here. Keep accent-free slugs (ç→c, ı→i) for clean URLs.
 */
export const WA_PRICING_PATH_BY_LOCALE: Record<string, string> = {
  en: '/whatsapp-pricing-calculator',
  br: '/br/calculadora-de-precos-do-whatsapp',
  es: '/es/calculadora-de-precios-de-whatsapp',
  tr: '/tr/whatsapp-fiyat-hesaplayici',
}

export const WA_PRICING_CONTENT_BY_LOCALE: Record<string, WaPricingPageContent> = { en, br, es, tr }

export function getWaPricingPageContent(locale: string): WaPricingPageContent {
  return WA_PRICING_CONTENT_BY_LOCALE[locale] ?? en
}
