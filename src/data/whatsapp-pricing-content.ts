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
      'Free WhatsApp API pricing calculator. Enter monthly marketing, utility and authentication volumes to estimate your Meta bill by country. No signup.',
    ogDescription:
      'Estimate your monthly and yearly WhatsApp Business API cost by market and message category. Free to use, every rate is editable, and it runs in your browser.',
  },
  breadcrumb: { home: 'Home', current: 'WhatsApp Pricing Calculator' },
  hero: {
    tag: 'Free Tool',
    h1Lead: 'WhatsApp Pricing',
    h1Highlight: 'Calculator',
    subtitle:
      'Pick your market, enter how many template messages you send each month, and see what Meta would bill you. Marketing, utility and authentication are priced separately, and messages that are free are already left out. You can edit every rate, so the numbers stay right when Meta changes its rate card.',
    cta: 'Estimate my cost',
    footnote: 'Free and no signup. The math runs in your browser, so nothing you type is sent to us.',
  },
  calculator: {
    h2: 'Estimate Your WhatsApp API Cost',
    subtitle: 'Enter monthly volumes. Rates are in USD per delivered message, and you can change any of them.',
    inputsTitle: 'Your monthly volumes',
    btnReset: 'Reset',
    marketLabel: 'Market',
    marketHint: "WhatsApp prices by the recipient's country. Pick the one where most of your customers are.",
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
    marketingHint: 'Promotions, offers and re-engagement templates. This is the expensive category.',
    utilityLabel: 'Utility messages',
    utilityHint: 'Order updates, delivery notices and payment reminders.',
    authLabel: 'Authentication messages',
    authHint: 'One-time passcodes and login verification.',
    windowLabel: 'Utility messages sent inside the 24h service window (%)',
    windowHint: 'Utility templates delivered while a customer conversation is open are free. A rough share is fine.',
    optional: 'optional',
    ratesTitle: 'Rates (USD per delivered message)',
    ratesHint:
      "Prefilled from Meta's published rate card. Change them if your numbers differ. Rates do change, so check the current card before you set a budget:",
    ratesLinkText: "Meta's WhatsApp pricing page",
    marketingRateLabel: 'Marketing rate',
    utilityRateLabel: 'Utility rate',
    authRateLabel: 'Authentication rate',
    errorWindowRange: 'Enter a share between 0 and 100.',
    errorMissingRate: 'This category has a volume, so it needs a rate too.',
    resultsTitle: 'Your estimate',
    emptyState: 'Enter at least one monthly volume to see your estimate.',
    monthlyLabel: 'Monthly cost',
    monthlyHelp: 'What Meta would bill for these volumes. BSP fees are not included.',
    annualLabel: 'Annual cost',
    annualHelp: 'The monthly figure times twelve, at the same volumes.',
    marketingCostLabel: 'Marketing',
    marketingCostHelp: 'Marketing messages at your marketing rate.',
    utilityCostLabel: 'Utility',
    utilityCostHelp: 'Only the utility messages sent outside a service window.',
    authCostLabel: 'Authentication',
    authCostHelp: 'Authentication messages at your authentication rate.',
    freeUtilLabel: 'Free utility messages',
    freeUtilHelp: 'Delivered inside the 24h window, so you pay nothing for them.',
    perMsgLabel: 'Cost per paid message',
    perMsgHelp: 'Your average rate across all paid messages.',
    serviceNote:
      'Service conversations are left out of this total because they are free. When a customer messages you first, your replies within 24 hours cost nothing.',
  },
  howTo: {
    h2: 'How WhatsApp API Pricing Works',
    subtitle: 'The whole bill comes down to three rules. Once you know them, the estimate is simple multiplication.',
    step1Title: 'Every Template Has A Category',
    step1Body:
      'When you submit a template, Meta files it as marketing, utility or authentication. The category sets the price of every send. Marketing usually costs several times more than the other two.',
    step2Title: 'You Pay Per Delivered Message',
    step2Body:
      "Since July 2025, Meta charges for each template message it delivers, priced by the recipient's country. Billing used to be per 24-hour conversation, so cost guides written before the change won't match your invoice.",
    step3Title: 'Some Messages Are Free',
    step3Body:
      'When a customer writes to you first, your replies are free for 24 hours. Utility templates delivered while that window is open are free too, which is why many teams send order updates during an open chat.',
  },
  formulas: {
    h2: 'The Maths Behind The Estimate',
    subtitle: 'Each number in the results panel comes from one of these lines.',
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
        note: 'Delivered inside the window, so they cost nothing.',
      },
      {
        name: 'Monthly total',
        formula: 'Marketing + utility + authentication',
        note: 'What Meta bills for the month. Your BSP may charge its own fees on top.',
      },
      {
        name: 'Cost per paid message',
        formula: 'Monthly total ÷ paid messages',
        note: 'An average rate you can compare across markets.',
      },
    ],
  },
  whyUse: {
    h2: 'Why Use This Calculator',
    subtitle: 'It answers the budget question in a minute and shows where every number comes from.',
    freeTitle: 'Free, No Signup',
    freeBody: "We don't ask for an email or an account. Open the page and start typing.",
    privateTitle: 'Your Numbers Stay Private',
    privateBody:
      'The calculation runs in your browser. We never see what you type, and nothing gets saved.',
    ratesTitle: 'Rates You Can Change',
    ratesBody:
      'Meta revises its rate card, so any preset goes stale eventually. Every rate here is an editable field, which means the tool still works after the card changes.',
    instantTitle: 'Updates As You Type',
    instantBody: 'Change a volume or a rate and the totals update right away. Comparing two scenarios takes seconds.',
  },
  attribution: {
    h2: 'The Meter Only Runs On Template Messages',
    body:
      'API pricing applies to the templates you send out, which are mostly broadcasts and notifications. The 1:1 selling your reps do all day happens in the WhatsApp apps, where sending a message is free. The problem is that those chats never reach your CRM on their own.',
    point1: 'Send broadcasts and notifications through the API. This calculator prices them.',
    point2: 'Keep deal conversations in the chat apps, where there is no per-message fee.',
    point3: 'Eazybe syncs those chats into HubSpot, Salesforce, Zoho or Pipedrive, so they show up in your reports too.',
    cta: 'See how Eazybe syncs WhatsApp to your CRM',
  },
  faq: {
    h2: 'Frequently Asked Questions',
    subtitle: 'Common questions about WhatsApp API pricing and how this tool works.',
    items: [
      {
        q: 'How does WhatsApp Business API pricing work?',
        a: "Meta charges per delivered template message. The price depends on the template's category (marketing, utility or authentication) and the recipient's country. Replies you send inside an open 24-hour customer service window don't need a template and are free.",
      },
      {
        q: 'What changed in WhatsApp pricing in July 2025?',
        a: 'Meta stopped charging per 24-hour conversation and started charging per delivered template message. Under the old model, one conversation covered any number of messages inside the window. Now each marketing, utility or authentication template is billed on its own, so businesses that send often felt the change most.',
      },
      {
        q: 'What are the WhatsApp message categories?',
        a: 'Marketing covers promotions, offers and re-engagement. Utility covers transactional updates like order confirmations and payment reminders. Authentication covers one-time passcodes. Meta assigns the category when it approves your template, and the category sets the price.',
      },
      {
        q: 'Which WhatsApp messages are free?',
        a: 'There are two kinds. When a customer messages you first, everything you reply within 24 hours is free. Utility templates delivered while that window is open are also free. Marketing and authentication templates are always paid.',
      },
      {
        q: 'What is the 24-hour customer service window?',
        a: 'It opens when a customer sends you a message and stays open for 24 hours after their latest message. While it is open, you can reply in free-form text at no charge. After it closes, you need a paid, pre-approved template to reach that customer again.',
      },
      {
        q: 'Why are marketing messages so much more expensive?',
        a: 'Meta prices categories by how much businesses want to send them and how much users want to receive them. Promotional volume is what Meta monetises, so in most countries the marketing rate is several times the utility rate. That gap is also where you can save the most: if a template qualifies as utility, file it as utility.',
      },
      {
        q: 'Are the rates in this calculator exact?',
        a: "No. They are editable estimates based on Meta's published rate card, which Meta revises. Your invoice also depends on each recipient's country rather than one market, and business solution providers often add their own fees. Use the estimate to budget, then check it against Meta's current rate card.",
      },
      {
        q: 'Does the WhatsApp Business app cost anything?',
        a: 'The WhatsApp Business app is free, and normal 1:1 chats in it have no per-message fee. The API and its message pricing are for automation and volume, such as broadcasts, chatbots and system notifications sent through a provider.',
      },
      {
        q: 'Do I need the API to sell on WhatsApp?',
        a: 'Not for conversations your reps handle themselves. The API is worth paying for when you need bulk sends or automation. Many teams use both: the API for broadcasts, and the apps for day-to-day selling, with a tool like Eazybe logging those chats to the CRM.',
      },
      {
        q: 'Is this calculator free, and is my data stored?',
        a: 'It is free and needs no signup. The calculation runs in your browser, so the volumes and rates you enter are never sent to us and nothing is stored.',
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
      "Eazybe connects the regular WhatsApp apps to HubSpot, Salesforce, Zoho, Pipedrive and other CRMs. Your team's 1:1 chats get logged and followed up, and nobody pays per message.",
    primary: 'Start free',
    secondary: 'Book a demo',
  },
}

const br: WaPricingPageContent = {
  meta: {
    title: 'Calculadora de Preços do WhatsApp — Custo da API | Eazybe',
    description:
      'Calculadora grátis de preços da API do WhatsApp. Informe o volume mensal de marketing, utilidade e autenticação e estime a fatura da Meta por país.',
    ogDescription:
      'Descubra quanto a API do WhatsApp Business vai custar por mês e por ano, por mercado e categoria de mensagem. É grátis, as taxas são editáveis e tudo roda no navegador.',
  },
  breadcrumb: { home: 'Início', current: 'Calculadora de Preços do WhatsApp' },
  hero: {
    tag: 'Ferramenta Gratuita',
    h1Lead: 'Calculadora de Preços do',
    h1Highlight: 'WhatsApp',
    subtitle:
      'Escolha o mercado, informe quantas mensagens de template você envia por mês e veja quanto a Meta cobraria. Marketing, utilidade e autenticação têm preços diferentes, e as mensagens gratuitas já ficam fora da conta. Você pode editar todas as taxas, então os números continuam certos quando a Meta mudar a tabela.',
    cta: 'Estimar meu custo',
    footnote: 'Grátis e sem cadastro. O cálculo roda no seu navegador, e nada do que você digita chega até nós.',
  },
  calculator: {
    h2: 'Estime o custo da sua API do WhatsApp',
    subtitle: 'Informe volumes mensais. As taxas estão em USD por mensagem entregue, e você pode alterar qualquer uma.',
    inputsTitle: 'Seus volumes mensais',
    btnReset: 'Limpar',
    marketLabel: 'Mercado',
    marketHint: 'O WhatsApp cobra conforme o país de quem recebe. Escolha onde está a maioria dos seus clientes.',
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
    marketingHint: 'Promoções, ofertas e templates de reengajamento. É a categoria mais cara.',
    utilityLabel: 'Mensagens de utilidade',
    utilityHint: 'Atualizações de pedido, avisos de entrega e lembretes de pagamento.',
    authLabel: 'Mensagens de autenticação',
    authHint: 'Códigos de uso único e verificação de login.',
    windowLabel: 'Mensagens de utilidade enviadas dentro da janela de 24h (%)',
    windowHint: 'Templates de utilidade entregues enquanto há uma conversa de atendimento aberta são gratuitos. Um valor aproximado já serve.',
    optional: 'opcional',
    ratesTitle: 'Taxas (USD por mensagem entregue)',
    ratesHint:
      'Já vêm preenchidas com a tabela publicada pela Meta, e você pode alterá-las. As taxas mudam de tempos em tempos, então confira a tabela atual antes de fechar o orçamento:',
    ratesLinkText: 'página de preços do WhatsApp da Meta',
    marketingRateLabel: 'Taxa de marketing',
    utilityRateLabel: 'Taxa de utilidade',
    authRateLabel: 'Taxa de autenticação',
    errorWindowRange: 'Informe um percentual entre 0 e 100.',
    errorMissingRate: 'Esta categoria tem volume, então precisa de uma taxa.',
    resultsTitle: 'Sua estimativa',
    emptyState: 'Informe pelo menos um volume mensal para ver a estimativa.',
    monthlyLabel: 'Custo mensal',
    monthlyHelp: 'O que a Meta cobraria por esses volumes, sem contar taxas do BSP.',
    annualLabel: 'Custo anual',
    annualHelp: 'O valor mensal vezes doze, com os mesmos volumes.',
    marketingCostLabel: 'Marketing',
    marketingCostHelp: 'Mensagens de marketing na sua taxa de marketing.',
    utilityCostLabel: 'Utilidade',
    utilityCostHelp: 'Só as mensagens de utilidade enviadas fora da janela de atendimento.',
    authCostLabel: 'Autenticação',
    authCostHelp: 'Mensagens de autenticação na sua taxa de autenticação.',
    freeUtilLabel: 'Mensagens de utilidade gratuitas',
    freeUtilHelp: 'Entregues dentro da janela de 24h, por isso não são cobradas.',
    perMsgLabel: 'Custo por mensagem paga',
    perMsgHelp: 'Quanto você paga, em média, por mensagem cobrada.',
    serviceNote:
      'Conversas de atendimento não entram neste total porque são gratuitas. Quando o cliente escreve primeiro, suas respostas dentro de 24 horas não custam nada.',
  },
  howTo: {
    h2: 'Como funciona o preço da API do WhatsApp',
    subtitle: 'A fatura inteira depende de três regras. Sabendo quais são, a estimativa vira uma multiplicação simples.',
    step1Title: 'Todo template tem uma categoria',
    step1Body:
      'Quando você envia um template para aprovação, a Meta o classifica como marketing, utilidade ou autenticação. É a categoria que define o preço de cada envio. Marketing costuma custar várias vezes mais que as outras duas.',
    step2Title: 'Você paga por mensagem entregue',
    step2Body:
      'Desde julho de 2025, a Meta cobra por cada mensagem de template entregue, com preço definido pelo país do destinatário. Antes a cobrança era por conversa de 24 horas, por isso guias de custo escritos antes da mudança não batem mais com a fatura.',
    step3Title: 'Algumas mensagens são gratuitas',
    step3Body:
      'Quando o cliente escreve primeiro, suas respostas são gratuitas por 24 horas. Templates de utilidade entregues com essa janela aberta também não são cobrados. Por isso muitos times mandam as atualizações de pedido enquanto a conversa está aberta.',
  },
  formulas: {
    h2: 'A matemática por trás da estimativa',
    subtitle: 'Cada número do painel de resultados vem de uma destas linhas.',
    items: [
      {
        name: 'Custo de marketing',
        formula: 'Mensagens de marketing × taxa de marketing',
        note: 'Costuma ser a maior linha da fatura.',
      },
      {
        name: 'Custo de utilidade',
        formula: 'Mensagens de utilidade pagas × taxa de utilidade',
        note: 'Paga é a mensagem enviada fora de uma janela de atendimento aberta.',
      },
      {
        name: 'Custo de autenticação',
        formula: 'Mensagens de autenticação × taxa de autenticação',
        note: 'Códigos de acesso e verificação de login.',
      },
      {
        name: 'Mensagens de utilidade gratuitas',
        formula: 'Mensagens de utilidade × percentual na janela',
        note: 'Entregues dentro da janela, então não são cobradas.',
      },
      {
        name: 'Total mensal',
        formula: 'Marketing + utilidade + autenticação',
        note: 'O que a Meta cobra no mês. O BSP pode cobrar taxas próprias por cima.',
      },
      {
        name: 'Custo por mensagem paga',
        formula: 'Total mensal ÷ mensagens pagas',
        note: 'Um valor médio para comparar mercados.',
      },
    ],
  },
  whyUse: {
    h2: 'Por que usar esta calculadora',
    subtitle: 'Ela responde à pergunta do orçamento em um minuto e mostra de onde vem cada número.',
    freeTitle: 'Grátis, sem cadastro',
    freeBody: 'Não pedimos e-mail nem conta. É só abrir a página e começar.',
    privateTitle: 'Seus dados ficam com você',
    privateBody:
      'O cálculo roda no seu navegador. Não vemos o que você digita, e nada fica salvo.',
    ratesTitle: 'Taxas que você pode alterar',
    ratesBody:
      'A Meta revisa a tabela, e qualquer valor pré-preenchido acaba ficando desatualizado. Aqui cada taxa é um campo editável, então a ferramenta continua valendo depois que a tabela muda.',
    instantTitle: 'Atualiza enquanto você digita',
    instantBody: 'Mude um volume ou uma taxa e os totais mudam na hora. Comparar dois cenários leva segundos.',
  },
  attribution: {
    h2: 'O taxímetro só roda nas mensagens de template',
    body:
      'O preço da API vale para os templates que você dispara, que são principalmente broadcasts e notificações. A venda 1:1 que seus vendedores fazem o dia todo acontece nos aplicativos do WhatsApp, onde mandar mensagem é de graça. O problema é que essas conversas não chegam ao seu CRM sozinhas.',
    point1: 'Broadcasts e notificações vão pela API. É esse custo que a calculadora mostra.',
    point2: 'Conversas de venda ficam nos aplicativos, onde não há cobrança por mensagem.',
    point3: 'A Eazybe sincroniza essas conversas com HubSpot, Salesforce, Zoho ou Pipedrive, e elas passam a aparecer nos seus relatórios.',
    cta: 'Veja como a Eazybe sincroniza o WhatsApp com seu CRM',
  },
  faq: {
    h2: 'Perguntas frequentes',
    subtitle: 'Dúvidas comuns sobre o preço da API do WhatsApp e sobre como esta ferramenta funciona.',
    items: [
      {
        q: 'Como funciona a cobrança da API do WhatsApp Business?',
        a: 'A Meta cobra por mensagem de template entregue. O preço depende da categoria do template (marketing, utilidade ou autenticação) e do país do destinatário. Respostas enviadas dentro de uma janela de atendimento de 24 horas aberta não precisam de template e não são cobradas.',
      },
      {
        q: 'O que mudou no preço do WhatsApp em julho de 2025?',
        a: 'A Meta deixou de cobrar por conversa de 24 horas e passou a cobrar por mensagem de template entregue. No modelo antigo, uma conversa cobria quantas mensagens fossem enviadas dentro da janela. Agora cada template de marketing, utilidade ou autenticação entregue é cobrado separadamente, e quem envia com frequência foi quem mais sentiu a mudança.',
      },
      {
        q: 'Quais são as categorias de mensagem do WhatsApp?',
        a: 'Marketing inclui promoções, ofertas e reengajamento. Utilidade inclui atualizações transacionais, como confirmação de pedido e lembrete de pagamento. Autenticação inclui códigos de uso único. A Meta define a categoria ao aprovar o template, e a categoria define o preço.',
      },
      {
        q: 'Quais mensagens do WhatsApp são gratuitas?',
        a: 'São dois casos. Quando o cliente escreve primeiro, tudo o que você responde em até 24 horas é gratuito. Templates de utilidade entregues com essa janela aberta também são gratuitos. Templates de marketing e autenticação são sempre pagos.',
      },
      {
        q: 'O que é a janela de atendimento de 24 horas?',
        a: 'Ela abre quando um cliente manda uma mensagem e fica aberta por 24 horas a partir da última mensagem dele. Enquanto está aberta, você responde com texto livre, sem template e sem custo. Depois que fecha, só dá para falar com esse cliente de novo usando um template pago e pré-aprovado.',
      },
      {
        q: 'Por que as mensagens de marketing são tão mais caras?',
        a: 'A Meta precifica as categorias pelo interesse das empresas em enviá-las e dos usuários em recebê-las. O volume promocional é o que a Meta monetiza, então na maioria dos países a taxa de marketing é várias vezes a de utilidade. É também nessa diferença que dá para economizar mais: se um template se qualifica como utilidade, classifique-o como utilidade.',
      },
      {
        q: 'As taxas desta calculadora são exatas?',
        a: 'Não. São estimativas editáveis baseadas na tabela pública da Meta, que é revisada de tempos em tempos. Sua fatura também depende do país de cada destinatário, e não de um único mercado, e os provedores de solução (BSPs) costumam cobrar taxas próprias. Use a estimativa para orçar e confira na tabela atual da Meta.',
      },
      {
        q: 'O aplicativo WhatsApp Business custa alguma coisa?',
        a: 'O aplicativo WhatsApp Business é gratuito, e as conversas 1:1 normais nele não têm cobrança por mensagem. A API e o preço por mensagem são para automação e volume, como broadcasts, chatbots e notificações de sistema enviados por um provedor.',
      },
      {
        q: 'Preciso da API para vender no WhatsApp?',
        a: 'Não para as conversas que seus vendedores conduzem pessoalmente. A API vale o custo quando você precisa de envios em massa ou automação. Muitos times usam os dois: a API para broadcasts e os aplicativos para a venda do dia a dia, com uma ferramenta como a Eazybe registrando essas conversas no CRM.',
      },
      {
        q: 'A calculadora é gratuita e meus dados ficam salvos?',
        a: 'É gratuita e não pede cadastro. O cálculo roda no seu navegador, então os volumes e as taxas que você digita nunca chegam até nós e nada fica salvo.',
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
      'A Eazybe conecta os aplicativos comuns do WhatsApp ao HubSpot, Salesforce, Zoho, Pipedrive e outros CRMs. As conversas 1:1 do seu time ficam registradas e recebem follow-up, sem pagar nada por mensagem.',
    primary: 'Começar grátis',
    secondary: 'Agendar demo',
  },
}

const es: WaPricingPageContent = {
  meta: {
    title: 'Calculadora de Precios de WhatsApp — Coste de la API | Eazybe',
    description:
      'Calculadora gratuita de precios de la API de WhatsApp. Introduce tu volumen mensual de marketing, utilidad y autenticación y estima la factura de Meta.',
    ogDescription:
      'Calcula cuánto te costará la API de WhatsApp Business al mes y al año, por mercado y categoría de mensaje. Es gratis, las tarifas son editables y funciona en tu navegador.',
  },
  breadcrumb: { home: 'Inicio', current: 'Calculadora de Precios de WhatsApp' },
  hero: {
    tag: 'Herramienta Gratuita',
    h1Lead: 'Calculadora de Precios de',
    h1Highlight: 'WhatsApp',
    subtitle:
      'Elige tu mercado, introduce cuántos mensajes de plantilla envías al mes y verás cuánto te facturaría Meta. Marketing, utilidad y autenticación tienen precios distintos, y los mensajes gratuitos ya quedan fuera de la cuenta. Puedes editar todas las tarifas, así que los números siguen valiendo cuando Meta cambie su tarifario.',
    cta: 'Estimar mi coste',
    footnote: 'Gratis y sin registro. El cálculo se hace en tu navegador, así que nada de lo que escribes nos llega.',
  },
  calculator: {
    h2: 'Estima el coste de tu API de WhatsApp',
    subtitle: 'Introduce volúmenes mensuales. Las tarifas están en USD por mensaje entregado y puedes cambiar cualquiera.',
    inputsTitle: 'Tus volúmenes mensuales',
    btnReset: 'Reiniciar',
    marketLabel: 'Mercado',
    marketHint: 'WhatsApp cobra según el país de quien recibe el mensaje. Elige dónde está la mayoría de tus clientes.',
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
    marketingHint: 'Promociones, ofertas y plantillas de reactivación. Es la categoría más cara.',
    utilityLabel: 'Mensajes de utilidad',
    utilityHint: 'Actualizaciones de pedido, avisos de entrega y recordatorios de pago.',
    authLabel: 'Mensajes de autenticación',
    authHint: 'Códigos de un solo uso y verificación de inicio de sesión.',
    windowLabel: 'Mensajes de utilidad enviados dentro de la ventana de 24h (%)',
    windowHint: 'Las plantillas de utilidad que se entregan con una conversación de atención abierta son gratuitas. Con una cifra aproximada basta.',
    optional: 'opcional',
    ratesTitle: 'Tarifas (USD por mensaje entregado)',
    ratesHint:
      'Vienen precargadas con el tarifario publicado por Meta y puedes cambiarlas. Las tarifas se actualizan, así que consulta el tarifario vigente antes de cerrar el presupuesto:',
    ratesLinkText: 'página de precios de WhatsApp de Meta',
    marketingRateLabel: 'Tarifa de marketing',
    utilityRateLabel: 'Tarifa de utilidad',
    authRateLabel: 'Tarifa de autenticación',
    errorWindowRange: 'Introduce un porcentaje entre 0 y 100.',
    errorMissingRate: 'Esta categoría tiene volumen, así que necesita una tarifa.',
    resultsTitle: 'Tu estimación',
    emptyState: 'Introduce al menos un volumen mensual para ver la estimación.',
    monthlyLabel: 'Coste mensual',
    monthlyHelp: 'Lo que Meta facturaría por estos volúmenes, sin contar las tarifas del BSP.',
    annualLabel: 'Coste anual',
    annualHelp: 'La cifra mensual multiplicada por doce, con los mismos volúmenes.',
    marketingCostLabel: 'Marketing',
    marketingCostHelp: 'Mensajes de marketing a tu tarifa de marketing.',
    utilityCostLabel: 'Utilidad',
    utilityCostHelp: 'Solo los mensajes de utilidad enviados fuera de una ventana de atención.',
    authCostLabel: 'Autenticación',
    authCostHelp: 'Mensajes de autenticación a tu tarifa de autenticación.',
    freeUtilLabel: 'Mensajes de utilidad gratuitos',
    freeUtilHelp: 'Entregados dentro de la ventana de 24h, así que no se cobran.',
    perMsgLabel: 'Coste por mensaje pagado',
    perMsgHelp: 'Lo que pagas de media por cada mensaje cobrado.',
    serviceNote:
      'Las conversaciones de atención no entran en este total porque son gratuitas. Cuando el cliente te escribe primero, tus respuestas durante las 24 horas siguientes no cuestan nada.',
  },
  howTo: {
    h2: 'Cómo funciona el precio de la API de WhatsApp',
    subtitle: 'Toda la factura depende de tres reglas. Cuando las conoces, la estimación es una simple multiplicación.',
    step1Title: 'Cada plantilla tiene una categoría',
    step1Body:
      'Cuando envías una plantilla a aprobación, Meta la clasifica como marketing, utilidad o autenticación. La categoría fija el precio de cada envío. Marketing suele costar varias veces más que las otras dos.',
    step2Title: 'Pagas por mensaje entregado',
    step2Body:
      'Desde julio de 2025, Meta cobra por cada mensaje de plantilla que entrega, según el país del destinatario. Antes se facturaba por conversación de 24 horas, por eso las guías de costes anteriores al cambio ya no cuadran con la factura.',
    step3Title: 'Algunos mensajes son gratis',
    step3Body:
      'Cuando un cliente te escribe primero, tus respuestas son gratuitas durante 24 horas. Las plantillas de utilidad que se entregan con esa ventana abierta tampoco se cobran. Por eso muchos equipos envían los avisos de pedido mientras la conversación sigue abierta.',
  },
  formulas: {
    h2: 'Las cuentas detrás de la estimación',
    subtitle: 'Cada cifra del panel de resultados sale de una de estas líneas.',
    items: [
      {
        name: 'Coste de marketing',
        formula: 'Mensajes de marketing × tarifa de marketing',
        note: 'Suele ser la partida más grande de la factura.',
      },
      {
        name: 'Coste de utilidad',
        formula: 'Mensajes de utilidad pagados × tarifa de utilidad',
        note: 'Pagado quiere decir enviado fuera de una ventana de atención abierta.',
      },
      {
        name: 'Coste de autenticación',
        formula: 'Mensajes de autenticación × tarifa de autenticación',
        note: 'Códigos y verificación de inicio de sesión.',
      },
      {
        name: 'Mensajes de utilidad gratuitos',
        formula: 'Mensajes de utilidad × porcentaje en ventana',
        note: 'Se entregan dentro de la ventana, así que no se cobran.',
      },
      {
        name: 'Total mensual',
        formula: 'Marketing + utilidad + autenticación',
        note: 'Lo que Meta factura al mes. Tu BSP puede sumar sus propias tarifas.',
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
    subtitle: 'Resuelve la duda del presupuesto en un minuto y muestra de dónde sale cada cifra.',
    freeTitle: 'Gratis, sin registro',
    freeBody: 'No te pedimos correo ni que crees una cuenta. Abre la página y empieza.',
    privateTitle: 'Tus datos se quedan contigo',
    privateBody:
      'El cálculo se hace en tu navegador. No vemos lo que escribes y no se guarda nada.',
    ratesTitle: 'Tarifas que puedes cambiar',
    ratesBody:
      'Meta revisa su tarifario y cualquier valor precargado acaba desfasado. Aquí cada tarifa es un campo editable, así que la herramienta sigue sirviendo cuando cambia el tarifario.',
    instantTitle: 'Se actualiza mientras escribes',
    instantBody: 'Cambia un volumen o una tarifa y los totales se actualizan al momento. Comparar dos escenarios lleva segundos.',
  },
  attribution: {
    h2: 'El contador solo corre con las plantillas',
    body:
      'El precio de la API se aplica a las plantillas que envías, que son sobre todo difusiones y notificaciones. La venta 1:1 que tus comerciales hacen a diario ocurre en las apps de WhatsApp, donde enviar mensajes es gratis. El problema es que esas conversaciones no llegan solas a tu CRM.',
    point1: 'Las difusiones y notificaciones van por la API. Esta calculadora calcula ese coste.',
    point2: 'Las conversaciones de venta se quedan en las apps, donde no se paga por mensaje.',
    point3: 'Eazybe sincroniza esos chats con HubSpot, Salesforce, Zoho o Pipedrive, y así también aparecen en tus informes.',
    cta: 'Mira cómo Eazybe sincroniza WhatsApp con tu CRM',
  },
  faq: {
    h2: 'Preguntas frecuentes',
    subtitle: 'Dudas habituales sobre el precio de la API de WhatsApp y sobre cómo funciona esta herramienta.',
    items: [
      {
        q: '¿Cómo funciona el cobro de la API de WhatsApp Business?',
        a: 'Meta cobra por mensaje de plantilla entregado. El precio depende de la categoría de la plantilla (marketing, utilidad o autenticación) y del país del destinatario. Las respuestas que envías dentro de una ventana de atención de 24 horas abierta no necesitan plantilla y son gratuitas.',
      },
      {
        q: '¿Qué cambió en el precio de WhatsApp en julio de 2025?',
        a: 'Meta dejó de cobrar por conversación de 24 horas y pasó a cobrar por mensaje de plantilla entregado. Con el modelo antiguo, una conversación cubría todos los mensajes que se enviaran dentro de la ventana. Ahora cada plantilla de marketing, utilidad o autenticación entregada se factura por separado, y quienes envían con mucha frecuencia son los que más han notado el cambio.',
      },
      {
        q: '¿Cuáles son las categorías de mensaje de WhatsApp?',
        a: 'Marketing incluye promociones, ofertas y reactivación. Utilidad incluye avisos transaccionales, como confirmaciones de pedido y recordatorios de pago. Autenticación incluye códigos de un solo uso. Meta asigna la categoría al aprobar la plantilla, y la categoría fija el precio.',
      },
      {
        q: '¿Qué mensajes de WhatsApp son gratuitos?',
        a: 'Hay dos casos. Cuando un cliente te escribe primero, todo lo que respondas en las 24 horas siguientes es gratis. Las plantillas de utilidad entregadas con esa ventana abierta también son gratuitas. Las plantillas de marketing y autenticación siempre se pagan.',
      },
      {
        q: '¿Qué es la ventana de atención de 24 horas?',
        a: 'Se abre cuando un cliente te envía un mensaje y dura 24 horas desde su último mensaje. Mientras está abierta, puedes responder con texto libre, sin plantillas y sin coste. Cuando se cierra, necesitas una plantilla pagada y preaprobada para volver a contactar a ese cliente.',
      },
      {
        q: '¿Por qué los mensajes de marketing cuestan tanto más?',
        a: 'Meta pone precio a las categorías según cuánto quieren enviarlas las empresas y cuánto quieren recibirlas los usuarios. El volumen promocional es lo que Meta monetiza, así que en la mayoría de países la tarifa de marketing multiplica varias veces la de utilidad. Esa diferencia es también donde más puedes ahorrar: si una plantilla cumple los requisitos de utilidad, clasifícala como utilidad.',
      },
      {
        q: '¿Las tarifas de esta calculadora son exactas?',
        a: 'No. Son estimaciones editables basadas en el tarifario público de Meta, que Meta revisa periódicamente. Tu factura también depende del país de cada destinatario, no de un único mercado, y los proveedores de soluciones (BSP) suelen añadir sus propias tarifas. Usa la estimación para presupuestar y compruébala con el tarifario vigente de Meta.',
      },
      {
        q: '¿La app de WhatsApp Business cuesta algo?',
        a: 'La app de WhatsApp Business es gratuita, y los chats 1:1 normales en ella no se cobran por mensaje. La API y su precio por mensaje están pensados para automatizar y enviar en volumen, por ejemplo difusiones, chatbots y notificaciones de sistema a través de un proveedor.',
      },
      {
        q: '¿Necesito la API para vender por WhatsApp?',
        a: 'No para las conversaciones que llevan tus comerciales en persona. La API compensa cuando necesitas envíos masivos o automatización. Muchos equipos usan ambas cosas: la API para las difusiones y las apps para la venta diaria, con una herramienta como Eazybe que registra esos chats en el CRM.',
      },
      {
        q: '¿La calculadora es gratuita y se guardan mis datos?',
        a: 'Es gratuita y no pide registro. El cálculo se hace en tu navegador, así que los volúmenes y tarifas que introduces nunca nos llegan y no se guarda nada.',
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
      'Eazybe conecta las apps normales de WhatsApp con HubSpot, Salesforce, Zoho, Pipedrive y otros CRM. Las conversaciones 1:1 de tu equipo quedan registradas y con seguimiento, sin pagar por mensaje.',
    primary: 'Empezar gratis',
    secondary: 'Reservar demo',
  },
}

const tr: WaPricingPageContent = {
  meta: {
    title: 'WhatsApp Fiyat Hesaplayıcı — API Maliyet Aracı | Eazybe',
    description:
      'Ücretsiz WhatsApp API fiyat hesaplayıcı. Aylık pazarlama, hizmet ve doğrulama mesajı hacminizi girin, Meta faturanızı ülkeye göre tahmin edin.',
    ogDescription:
      "WhatsApp Business API'nin aylık ve yıllık maliyetini pazara ve mesaj kategorisine göre hesaplayın. Ücretsizdir, tarifeleri değiştirebilirsiniz ve tarayıcınızda çalışır.",
  },
  breadcrumb: { home: 'Ana Sayfa', current: 'WhatsApp Fiyat Hesaplayıcı' },
  hero: {
    tag: 'Ücretsiz Araç',
    h1Lead: 'WhatsApp Fiyat',
    h1Highlight: 'Hesaplayıcı',
    subtitle:
      "Pazarınızı seçin, ayda kaç şablon mesajı gönderdiğinizi girin ve Meta'nın size ne kadar fatura keseceğini görün. Pazarlama, hizmet ve doğrulama mesajları ayrı fiyatlanır; ücretsiz mesajlar hesaba hiç katılmaz. Tüm tarifeleri değiştirebilirsiniz, böylece Meta tarife kartını güncellediğinde rakamlarınız da güncel kalır.",
    cta: 'Maliyetimi hesapla',
    footnote: 'Ücretsiz, kayıt gerekmez. Hesaplama tarayıcınızda yapılır; yazdıklarınız bize ulaşmaz.',
  },
  calculator: {
    h2: 'WhatsApp API maliyetinizi hesaplayın',
    subtitle: 'Aylık hacimleri girin. Tarifeler, teslim edilen mesaj başına USD cinsindendir ve hepsini değiştirebilirsiniz.',
    inputsTitle: 'Aylık hacimleriniz',
    btnReset: 'Sıfırla',
    marketLabel: 'Pazar',
    marketHint: 'WhatsApp, mesajı alan kişinin ülkesine göre ücret alır. Müşterilerinizin çoğunun bulunduğu ülkeyi seçin.',
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
    marketingHint: 'Kampanyalar, teklifler ve müşteriyi geri kazanma şablonları. En pahalı kategori budur.',
    utilityLabel: 'Hizmet mesajları',
    utilityHint: 'Sipariş güncellemeleri, teslimat bildirimleri ve ödeme hatırlatmaları.',
    authLabel: 'Doğrulama mesajları',
    authHint: 'Tek kullanımlık şifreler ve giriş doğrulaması.',
    windowLabel: '24 saatlik pencere içinde gönderilen hizmet mesajları (%)',
    windowHint: 'Müşteriyle açık bir konuşma varken teslim edilen hizmet şablonları ücretsizdir. Yaklaşık bir oran yeterli.',
    optional: 'isteğe bağlı',
    ratesTitle: 'Tarifeler (teslim edilen mesaj başına USD)',
    ratesHint:
      "Meta'nın yayımladığı tarife kartıyla önceden dolduruldu, dilediğiniz gibi değiştirebilirsiniz. Tarifeler zaman zaman değişir; bütçe yapmadan önce güncel kartı kontrol edin:",
    ratesLinkText: "Meta'nın WhatsApp fiyatlandırma sayfası",
    marketingRateLabel: 'Pazarlama tarifesi',
    utilityRateLabel: 'Hizmet tarifesi',
    authRateLabel: 'Doğrulama tarifesi',
    errorWindowRange: '0 ile 100 arasında bir oran girin.',
    errorMissingRate: 'Bu kategoriye hacim girdiniz, tarife de girmeniz gerekiyor.',
    resultsTitle: 'Tahmininiz',
    emptyState: 'Tahmini görmek için en az bir aylık hacim girin.',
    monthlyLabel: 'Aylık maliyet',
    monthlyHelp: "Bu hacimler için Meta'nın keseceği fatura. BSP ücretleri dahil değildir.",
    annualLabel: 'Yıllık maliyet',
    annualHelp: 'Aynı hacimlerle aylık tutarın on iki katı.',
    marketingCostLabel: 'Pazarlama',
    marketingCostHelp: 'Pazarlama mesajları çarpı pazarlama tarifeniz.',
    utilityCostLabel: 'Hizmet',
    utilityCostHelp: 'Yalnızca hizmet penceresi dışında gönderilen hizmet mesajları.',
    authCostLabel: 'Doğrulama',
    authCostHelp: 'Doğrulama mesajları çarpı doğrulama tarifeniz.',
    freeUtilLabel: 'Ücretsiz hizmet mesajları',
    freeUtilHelp: '24 saatlik pencere içinde teslim edildiği için ücret alınmayan mesajlar.',
    perMsgLabel: 'Ücretli mesaj başına maliyet',
    perMsgHelp: 'Ücretli mesaj başına ödediğiniz ortalama tutar.',
    serviceNote:
      'Müşteri hizmetleri konuşmaları ücretsiz olduğu için bu toplama dahil değildir. Müşteri size önce yazdığında, sonraki 24 saat içinde verdiğiniz yanıtlar için ücret ödemezsiniz.',
  },
  howTo: {
    h2: 'WhatsApp API fiyatlandırması nasıl işler',
    subtitle: 'Faturanın tamamı üç kurala dayanır. Bu kuralları bildiğinizde tahmin basit bir çarpma işlemine dönüşür.',
    step1Title: 'Her şablonun bir kategorisi var',
    step1Body:
      'Bir şablonu onaya gönderdiğinizde Meta onu pazarlama, hizmet veya doğrulama olarak sınıflandırır. Her gönderimin fiyatını bu kategori belirler. Pazarlama genellikle diğer ikisinden birkaç kat pahalıdır.',
    step2Title: 'Teslim edilen mesaj başına ödersiniz',
    step2Body:
      "Temmuz 2025'ten beri Meta, teslim ettiği her şablon mesajı için alıcının ülkesine göre ücret alıyor. Eskiden ücret 24 saatlik konuşma başına hesaplanıyordu. Bu yüzden değişiklikten önce yazılmış maliyet rehberleri bugünkü faturanızla uyuşmaz.",
    step3Title: 'Bazı mesajlar ücretsizdir',
    step3Body:
      'Müşteri size önce yazdığında yanıtlarınız 24 saat boyunca ücretsizdir. Bu pencere açıkken teslim edilen hizmet şablonları da ücretsizdir. Birçok ekibin sipariş güncellemelerini konuşma açıkken göndermesinin nedeni de bu.',
  },
  formulas: {
    h2: 'Tahminin arkasındaki hesap',
    subtitle: 'Sonuç panelindeki her rakam bu satırlardan birinden gelir.',
    items: [
      {
        name: 'Pazarlama maliyeti',
        formula: 'Pazarlama mesajları × pazarlama tarifesi',
        note: 'Genellikle faturanın en büyük kalemidir.',
      },
      {
        name: 'Hizmet maliyeti',
        formula: 'Ücretli hizmet mesajları × hizmet tarifesi',
        note: 'Ücretli mesaj, açık bir hizmet penceresinin dışında gönderilen mesajdır.',
      },
      {
        name: 'Doğrulama maliyeti',
        formula: 'Doğrulama mesajları × doğrulama tarifesi',
        note: 'Şifreler ve giriş doğrulaması.',
      },
      {
        name: 'Ücretsiz hizmet mesajları',
        formula: 'Hizmet mesajları × pencere oranı',
        note: 'Pencere içinde teslim edildikleri için ücret alınmaz.',
      },
      {
        name: 'Aylık toplam',
        formula: 'Pazarlama + hizmet + doğrulama',
        note: "Meta'nın aylık faturası. BSP'niz bunun üzerine kendi ücretini ekleyebilir.",
      },
      {
        name: 'Ücretli mesaj başına maliyet',
        formula: 'Aylık toplam ÷ ücretli mesajlar',
        note: 'Pazarları karşılaştırmak için ortalama bir birim fiyat.',
      },
    ],
  },
  whyUse: {
    h2: 'Neden bu hesaplayıcıyı kullanmalısınız',
    subtitle: 'Bütçe sorusunu bir dakikada yanıtlar ve her rakamın nereden geldiğini gösterir.',
    freeTitle: 'Ücretsiz, kayıt yok',
    freeBody: 'E-posta adresi ya da hesap istemiyoruz. Sayfayı açın ve başlayın.',
    privateTitle: 'Verileriniz sizde kalır',
    privateBody:
      'Hesaplama tarayıcınızda yapılır. Yazdıklarınızı görmeyiz ve hiçbir şey kaydedilmez.',
    ratesTitle: 'Değiştirebileceğiniz tarifeler',
    ratesBody:
      'Meta tarife kartını günceller ve önceden doldurulmuş değerler zamanla eskir. Burada her tarife düzenlenebilir bir alan; kart değiştiğinde de aracı kullanmaya devam edebilirsiniz.',
    instantTitle: 'Siz yazdıkça güncellenir',
    instantBody: 'Bir hacmi veya tarifeyi değiştirdiğinizde toplamlar anında güncellenir. İki senaryoyu saniyeler içinde karşılaştırabilirsiniz.',
  },
  attribution: {
    h2: 'Sayaç yalnızca şablon mesajlarında işler',
    body:
      'API fiyatlandırması gönderdiğiniz şablonlara uygulanır; bunlar çoğunlukla toplu gönderimler ve bildirimlerdir. Satış ekibinizin gün boyu yürüttüğü birebir satış ise WhatsApp uygulamalarında olur ve orada mesaj göndermek ücretsizdir. Sorun şu: bu konuşmalar CRM\'inize kendiliğinden ulaşmaz.',
    point1: "Toplu gönderimler ve bildirimler API'den gider. Bu hesaplayıcı onların maliyetini çıkarır.",
    point2: 'Satış konuşmaları uygulamalarda kalır; orada mesaj başına ücret yoktur.',
    point3: "Eazybe bu sohbetleri HubSpot, Salesforce, Zoho veya Pipedrive'a senkronize eder, böylece raporlarınızda da görünürler.",
    cta: "Eazybe'nin WhatsApp'ı CRM'inize nasıl senkronize ettiğini görün",
  },
  faq: {
    h2: 'Sıkça sorulan sorular',
    subtitle: 'WhatsApp API fiyatlandırması ve bu aracın nasıl çalıştığı hakkında sık sorulan sorular.',
    items: [
      {
        q: 'WhatsApp Business API fiyatlandırması nasıl işler?',
        a: 'Meta, teslim edilen her şablon mesajı için ücret alır. Fiyat, şablonun kategorisine (pazarlama, hizmet veya doğrulama) ve alıcının ülkesine bağlıdır. Açık bir 24 saatlik müşteri hizmetleri penceresi içinde gönderdiğiniz yanıtlar şablon gerektirmez ve ücretsizdir.',
      },
      {
        q: "Temmuz 2025'te WhatsApp fiyatlandırmasında ne değişti?",
        a: 'Meta, 24 saatlik konuşma başına ücretlendirmeyi bırakıp teslim edilen şablon mesajı başına ücretlendirmeye geçti. Eski modelde tek bir konuşma, pencere içinde gönderilen tüm mesajları kapsıyordu. Artık her pazarlama, hizmet veya doğrulama şablonu ayrı faturalanıyor; değişikliği en çok sık mesaj gönderen işletmeler hissetti.',
      },
      {
        q: 'WhatsApp mesaj kategorileri nelerdir?',
        a: 'Pazarlama; kampanyaları, teklifleri ve müşteriyi geri kazanma mesajlarını kapsar. Hizmet; sipariş onayı ve ödeme hatırlatması gibi işlem bildirimlerini kapsar. Doğrulama ise tek kullanımlık şifreleri kapsar. Kategoriyi Meta, şablonu onaylarken belirler ve fiyatı da kategori belirler.',
      },
      {
        q: 'Hangi WhatsApp mesajları ücretsizdir?',
        a: 'İki durum var. Müşteri size önce yazarsa, 24 saat içinde verdiğiniz tüm yanıtlar ücretsizdir. O pencere açıkken teslim edilen hizmet şablonları da ücretsizdir. Pazarlama ve doğrulama şablonları ise her zaman ücretlidir.',
      },
      {
        q: '24 saatlik müşteri hizmetleri penceresi nedir?',
        a: 'Müşteri size mesaj gönderdiğinde açılır ve son mesajından itibaren 24 saat açık kalır. Pencere açıkken şablon kullanmadan, ücretsiz olarak serbest metinle yanıt verebilirsiniz. Pencere kapandıktan sonra o müşteriye yeniden ulaşmak için ücretli ve önceden onaylanmış bir şablon gerekir.',
      },
      {
        q: 'Pazarlama mesajları neden bu kadar pahalı?',
        a: "Meta kategorileri, işletmelerin bu mesajları gönderme isteğine ve kullanıcıların onları alma isteğine göre fiyatlar. Meta'nın asıl gelir elde ettiği alan promosyon hacmidir; bu yüzden çoğu ülkede pazarlama tarifesi hizmet tarifesinin birkaç katıdır. En çok tasarruf edebileceğiniz yer de bu farktır: hizmet kategorisine uyan bir şablonu hizmet olarak sınıflandırın.",
      },
      {
        q: 'Bu hesaplayıcıdaki tarifeler kesin mi?',
        a: "Hayır. Meta'nın yayımladığı tarife kartına dayanan, düzenlenebilir tahminlerdir ve Meta bu kartı zaman zaman günceller. Faturanız tek bir pazara değil, her alıcının ülkesine bağlıdır; çözüm sağlayıcılar (BSP) da genellikle kendi ücretlerini ekler. Tahmini bütçe için kullanın, ardından Meta'nın güncel kartıyla karşılaştırın.",
      },
      {
        q: 'WhatsApp Business uygulaması ücretli mi?',
        a: 'WhatsApp Business uygulaması ücretsizdir ve içindeki normal birebir sohbetlerde mesaj başına ücret yoktur. API ve mesaj başına fiyatlandırma, otomasyon ve yüksek hacim içindir: bir sağlayıcı üzerinden gönderilen toplu mesajlar, sohbet botları ve sistem bildirimleri gibi.',
      },
      {
        q: "WhatsApp'ta satış için API'ye ihtiyacım var mı?",
        a: "Temsilcilerinizin kendisinin yürüttüğü konuşmalar için hayır. API, toplu gönderim veya otomasyon gerektiğinde maliyetine değer. Birçok ekip ikisini birlikte kullanır: toplu gönderimler için API'yi, günlük satış için uygulamaları. Eazybe gibi bir araç da bu sohbetleri CRM'e kaydeder.",
      },
      {
        q: 'Bu hesaplayıcı ücretsiz mi, verilerim saklanıyor mu?',
        a: 'Ücretsizdir ve kayıt gerektirmez. Hesaplama tamamen tarayıcınızda yapılır; girdiğiniz hacimler ve tarifeler bize hiçbir zaman gönderilmez ve hiçbir şey saklanmaz.',
      },
    ],
  },
  moreTools: {
    h2: 'Daha fazla ücretsiz araç',
    allTools: 'Tüm araçlar →',
  },
  finalCta: {
    h2: 'Mesajın ücretsiz olduğu kanalda satış yapın',
    body:
      "Eazybe, normal WhatsApp uygulamalarını HubSpot, Salesforce, Zoho, Pipedrive ve diğer CRM'lere bağlar. Ekibinizin birebir konuşmaları CRM'e kaydedilir ve takip edilir; mesaj başına ücret ödemezsiniz.",
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
