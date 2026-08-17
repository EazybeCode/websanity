/**
 * All localized copy for /marketing-roi-calculator. Same shape as
 * whatsapp-qr-content.ts: one file per tool page, strings only. SVG icons stay
 * in the page component so translators never touch markup.
 */

export interface RoiFaqItem {
  q: string
  a: string
}

export interface RoiPageContent {
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
    currencyLabel: string
    spendLabel: string
    spendHint: string
    revenueLabel: string
    revenueHint: string
    leadsLabel: string
    leadsHint: string
    conversionsLabel: string
    conversionsHint: string
    optional: string
    btnReset: string
    resultsTitle: string
    emptyState: string
    errorSpendZero: string
    errorConversionsExceedLeads: string
    roiLabel: string
    roiHelp: string
    roasLabel: string
    roasHelp: string
    revenuePerLabel: string
    revenuePerHelp: string
    profitLabel: string
    profitHelp: string
    cplLabel: string
    cplHelp: string
    cacLabel: string
    cacHelp: string
    convRateLabel: string
    convRateHelp: string
    breakevenLabel: string
    breakevenHelp: string
    verdictProfit: string
    verdictBreakeven: string
    verdictLoss: string
    notEnoughData: string
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
    completeTitle: string
    completeBody: string
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
    items: RoiFaqItem[]
  }
  finalCta: {
    h2: string
    body: string
    primary: string
    secondary: string
  }
}

const en: RoiPageContent = {
  meta: {
    title: 'Marketing ROI Calculator - Free ROI, ROAS & CPL Tool | Eazybe',
    description:
      'Free marketing ROI calculator. Enter spend and revenue to get ROI, ROAS, cost per lead, CAC and conversion rate instantly. No signup, nothing leaves your browser.',
    ogDescription:
      'Work out marketing ROI, ROAS, cost per lead and CAC in seconds. Free, no signup, runs entirely in your browser.',
  },
  breadcrumb: { home: 'Home', current: 'Marketing ROI Calculator' },
  hero: {
    tag: 'Free Tool',
    h1Lead: 'Marketing ROI',
    h1Highlight: 'Calculator',
    subtitle:
      'Enter what you spent and what came back. You get ROI and ROAS straight away, plus cost per lead and CAC once you add lead numbers. Every formula is on the page, so you can check the maths.',
    cta: 'Calculate my ROI',
    footnote: 'Free, no signup. Everything is calculated in your browser and nothing is sent to us.',
  },
  calculator: {
    h2: 'Calculate Your Marketing ROI',
    subtitle: 'Spend and revenue are required. Add leads and conversions for the full picture.',
    inputsTitle: 'Your numbers',
    currencyLabel: 'Currency',
    spendLabel: 'Total marketing spend',
    spendHint: 'Ads, tools, agency fees and salaries for the period you are measuring.',
    revenueLabel: 'Revenue attributed to marketing',
    revenueHint: 'Only revenue you can trace back to this spend.',
    leadsLabel: 'Leads generated',
    leadsHint: 'Enquiries, signups or MQLs from this spend.',
    conversionsLabel: 'Conversions',
    conversionsHint: 'Leads that became paying customers.',
    optional: 'optional',
    btnReset: 'Reset',
    resultsTitle: 'Your results',
    emptyState: 'Enter your spend and attributed revenue to see your ROI.',
    errorSpendZero: 'Enter a marketing spend above zero.',
    errorConversionsExceedLeads: 'Conversions cannot be higher than leads.',
    roiLabel: 'Marketing ROI',
    roiHelp: 'Return on every unit spent, as a percentage.',
    roasLabel: 'ROAS',
    roasHelp: 'Revenue divided by spend, shown as a multiple.',
    revenuePerLabel: 'Revenue per 1 spent',
    revenuePerHelp: 'What each unit of spend brought back.',
    profitLabel: 'Net return',
    profitHelp: 'Attributed revenue minus spend.',
    cplLabel: 'Cost per lead',
    cplHelp: 'Spend divided by leads generated.',
    cacLabel: 'Customer acquisition cost',
    cacHelp: 'Spend divided by conversions.',
    convRateLabel: 'Lead conversion rate',
    convRateHelp: 'Share of leads that became customers.',
    breakevenLabel: 'Breakeven revenue',
    breakevenHelp: 'What you need to earn back to cover the spend.',
    verdictProfit: 'This spend is returning more than it costs.',
    verdictBreakeven: 'This spend is roughly breaking even.',
    verdictLoss: 'This spend is costing more than it returns.',
    notEnoughData: 'Add leads and conversions to see this.',
  },
  howTo: {
    h2: 'How To Calculate Marketing ROI',
    subtitle: 'Three numbers decide the answer. Getting them right matters more than the formula.',
    step1Title: 'Add up everything you spent',
    step1Body:
      'Ad budget, software, agency retainers and the salary cost of the people running it. Leaving out salaries is the most common way to overstate ROI.',
    step2Title: 'Attribute revenue honestly',
    step2Body:
      'Count only revenue you can trace back to that spend. If a deal closed over a channel you do not track, it will not appear here, and your real ROI will be higher than the number you see.',
    step3Title: 'Divide, then sanity check',
    step3Body:
      'ROI is (revenue − spend) ÷ spend. If the result looks implausible, the attribution is usually wrong before the arithmetic is.',
  },
  formulas: {
    h2: 'The Formulas Behind Each Number',
    subtitle: 'Every result above comes from one of these. Check them against your own figures.',
    items: [
      {
        name: 'Marketing ROI',
        formula: '(Revenue − Spend) ÷ Spend × 100',
        note: 'Expressed as a percentage. 100% means you doubled your money.',
      },
      {
        name: 'ROAS',
        formula: 'Revenue ÷ Spend',
        note: 'Return on ad spend, shown as a multiple. 3x means 3 back for every 1 in.',
      },
      {
        name: 'Cost per lead',
        formula: 'Spend ÷ Leads',
        note: 'What each enquiry cost you to generate.',
      },
      {
        name: 'Customer acquisition cost',
        formula: 'Spend ÷ Conversions',
        note: 'What each paying customer cost you to win.',
      },
      {
        name: 'Lead conversion rate',
        formula: 'Conversions ÷ Leads × 100',
        note: 'The share of enquiries that turned into customers.',
      },
      {
        name: 'Breakeven revenue',
        formula: 'Equal to spend',
        note: 'The point where marketing has paid for itself and nothing more.',
      },
    ],
  },
  whyUse: {
    h2: 'Why Use This Calculator',
    subtitle: 'Fast to use, and safe to put real numbers into.',
    freeTitle: 'Free, no signup',
    freeBody: 'No email wall and no account. Open it and use it.',
    privateTitle: 'Your numbers stay yours',
    privateBody:
      'The whole calculation happens in your browser. We never receive what you type, and nothing is stored anywhere.',
    completeTitle: 'More than one metric',
    completeBody: 'ROI on its own hides a lot. You also get ROAS, CPL, CAC and your conversion rate.',
    instantTitle: 'Updates as you type',
    instantBody: 'Change one field and everything recalculates, so you can test a scenario without starting over.',
  },
  attribution: {
    h2: 'Most ROI Calculations Are Wrong In The Same Place',
    body:
      'The formula is trivial. The hard part is the revenue number. If deals move through channels your CRM never sees, that revenue is missing from the calculation and the channel that produced it looks worse than it is.',
    point1: 'Conversations that happen on WhatsApp often never reach the CRM.',
    point2: 'Revenue with no recorded source gets attributed to nothing, or to the wrong channel.',
    point3: 'Budget then moves toward whatever happens to be measured, not whatever works.',
    cta: 'See how Eazybe syncs WhatsApp to your CRM',
  },
  faq: {
    h2: 'Frequently Asked Questions',
    subtitle: 'Common questions about marketing ROI and how this tool works.',
    items: [
      {
        q: 'What is marketing ROI?',
        a: 'Marketing ROI is the return you get for the money you put into marketing, written as a percentage. You subtract the spend from the revenue it produced, divide by the spend, and multiply by 100. A result of 0% means you got your money back and nothing more.',
      },
      {
        q: 'How do you calculate marketing ROI?',
        a: 'Take the revenue attributed to your marketing, subtract the total spend, divide the result by the spend, then multiply by 100. If you spent 10,000 and it produced 40,000, your ROI is (40,000 − 10,000) ÷ 10,000 × 100, which is 300%.',
      },
      {
        q: 'What is ROAS and how is it different from ROI?',
        a: 'ROAS is revenue divided by spend, shown as a multiple rather than a percentage. It does not subtract the cost first, so it always looks larger than ROI. Spending 10,000 to make 40,000 is a ROAS of 4x and an ROI of 300%. Both describe the same result.',
      },
      {
        q: 'What counts as marketing spend?',
        a: 'Everything it took to run the activity: ad budget, software and tooling, agency or freelancer fees, and the salary cost of the people doing the work. Most inflated ROI figures come from counting only the ad budget.',
      },
      {
        q: 'What is breakeven revenue?',
        a: 'The amount of revenue you need to cover what you spent, with nothing left over. It is equal to your total marketing spend. Earn less and the activity lost money; earn more and it made money.',
      },
      {
        q: 'How is cost per lead calculated?',
        a: 'Divide total marketing spend by the number of leads generated. If you spent 5,000 and generated 250 leads, your cost per lead is 20.',
      },
      {
        q: 'What is CAC, and how is it different from cost per lead?',
        a: 'Cost per lead is what you paid for each enquiry. CAC is what you paid for each person who actually bought, so it divides the same spend by conversions rather than by leads. CAC is always the larger number, and the gap between the two shows how much your sales process loses between the enquiry and the sale.',
      },
      {
        q: 'How is lead conversion rate calculated?',
        a: 'Divide conversions by leads and multiply by 100. If 250 leads produced 25 customers, your conversion rate is 10%.',
      },
      {
        q: 'What is a good marketing ROI?',
        a: 'It depends on your margins and sales cycle, so no single number applies everywhere. What matters more is the trend over time and how channels compare against each other using the same definition of spend and attributed revenue.',
      },
      {
        q: 'Is this calculator free, and is my data stored?',
        a: 'It is free with no signup. The calculation runs entirely in your browser, so the numbers you enter are never sent to us and nothing is stored.',
      },
    ],
  },
  finalCta: {
    h2: 'Know Which Conversations Actually Produced The Revenue',
    body:
      'Eazybe syncs WhatsApp conversations into HubSpot, Salesforce, Zoho, Pipedrive and more, so deals closed in chat show up against the right source instead of disappearing from your reporting.',
    primary: 'Start free',
    secondary: 'Book a demo',
  },
}

const br: RoiPageContent = {
  meta: {
    title: 'Calculadora de ROI de Marketing — ROI, ROAS e CPL | Eazybe',
    description:
      'Calculadora de ROI de marketing gratuita. Informe investimento e receita e veja ROI, ROAS, custo por lead, CAC e taxa de conversão na hora. Sem cadastro.',
    ogDescription:
      'Calcule ROI de marketing, ROAS, custo por lead e CAC em segundos. Grátis, sem cadastro, tudo roda no seu navegador.',
  },
  breadcrumb: { home: 'Início', current: 'Calculadora de ROI de Marketing' },
  hero: {
    tag: 'Ferramenta Gratuita',
    h1Lead: 'Calculadora de',
    h1Highlight: 'ROI de Marketing',
    subtitle:
      'Informe quanto você investiu e quanto voltou. Você vê ROI e ROAS na hora, mais custo por lead e CAC assim que adicionar os números de leads. Todas as fórmulas estão na página, então dá para conferir a conta.',
    cta: 'Calcular meu ROI',
    footnote: 'Grátis, sem cadastro. Tudo é calculado no seu navegador e nada é enviado para nós.',
  },
  calculator: {
    h2: 'Calcule o ROI do seu marketing',
    subtitle: 'Investimento e receita são obrigatórios. Adicione leads e conversões para ver o quadro completo.',
    inputsTitle: 'Seus números',
    currencyLabel: 'Moeda',
    spendLabel: 'Investimento total em marketing',
    spendHint: 'Mídia, ferramentas, agência e salários do período que você está medindo.',
    revenueLabel: 'Receita atribuída ao marketing',
    revenueHint: 'Somente a receita que você consegue rastrear até esse investimento.',
    leadsLabel: 'Leads gerados',
    leadsHint: 'Contatos, cadastros ou MQLs vindos desse investimento.',
    conversionsLabel: 'Conversões',
    conversionsHint: 'Leads que viraram clientes pagantes.',
    optional: 'opcional',
    btnReset: 'Limpar',
    resultsTitle: 'Seus resultados',
    emptyState: 'Informe o investimento e a receita atribuída para ver seu ROI.',
    errorSpendZero: 'Informe um investimento maior que zero.',
    errorConversionsExceedLeads: 'As conversões não podem ser maiores que os leads.',
    roiLabel: 'ROI de marketing',
    roiHelp: 'Retorno sobre cada unidade investida, em porcentagem.',
    roasLabel: 'ROAS',
    roasHelp: 'Receita dividida pelo investimento, exibida como múltiplo.',
    revenuePerLabel: 'Receita por 1 investido',
    revenuePerHelp: 'Quanto cada unidade investida trouxe de volta.',
    profitLabel: 'Retorno líquido',
    profitHelp: 'Receita atribuída menos investimento.',
    cplLabel: 'Custo por lead',
    cplHelp: 'Investimento dividido pelos leads gerados.',
    cacLabel: 'Custo de aquisição de cliente',
    cacHelp: 'Investimento dividido pelas conversões.',
    convRateLabel: 'Taxa de conversão de leads',
    convRateHelp: 'Parcela dos leads que virou cliente.',
    breakevenLabel: 'Receita de equilíbrio',
    breakevenHelp: 'Quanto você precisa faturar para cobrir o investimento.',
    verdictProfit: 'Esse investimento está trazendo mais do que custa.',
    verdictBreakeven: 'Esse investimento está praticamente no ponto de equilíbrio.',
    verdictLoss: 'Esse investimento está custando mais do que retorna.',
    notEnoughData: 'Adicione leads e conversões para ver este dado.',
  },
  howTo: {
    h2: 'Como calcular o ROI de marketing',
    subtitle: 'Três números decidem a resposta. Acertá-los importa mais do que a fórmula.',
    step1Title: 'Some tudo o que você investiu',
    step1Body:
      'Verba de mídia, software, contratos de agência e o custo salarial de quem toca a operação. Deixar os salários de fora é a forma mais comum de inflar o ROI.',
    step2Title: 'Atribua a receita com honestidade',
    step2Body:
      'Conte apenas a receita que você consegue rastrear até aquele investimento. Se um negócio fechou por um canal que você não acompanha, ele não vai aparecer aqui e seu ROI real será maior que o número exibido.',
    step3Title: 'Divida e depois confira',
    step3Body:
      'ROI é (receita − investimento) ÷ investimento. Se o resultado parecer improvável, normalmente o problema está na atribuição, não na conta.',
  },
  formulas: {
    h2: 'As fórmulas por trás de cada número',
    subtitle: 'Todo resultado acima sai de uma destas. Confira com os seus próprios números.',
    items: [
      {
        name: 'ROI de marketing',
        formula: '(Receita − Investimento) ÷ Investimento × 100',
        note: 'Expresso em porcentagem. 100% significa que você dobrou o dinheiro.',
      },
      {
        name: 'ROAS',
        formula: 'Receita ÷ Investimento',
        note: 'Retorno sobre o investimento em mídia, como múltiplo. 3x significa 3 de volta para cada 1 investido.',
      },
      {
        name: 'Custo por lead',
        formula: 'Investimento ÷ Leads',
        note: 'Quanto custou gerar cada contato.',
      },
      {
        name: 'Custo de aquisição de cliente',
        formula: 'Investimento ÷ Conversões',
        note: 'Quanto custou conquistar cada cliente pagante.',
      },
      {
        name: 'Taxa de conversão de leads',
        formula: 'Conversões ÷ Leads × 100',
        note: 'A parcela dos contatos que virou cliente.',
      },
      {
        name: 'Receita de equilíbrio',
        formula: 'Igual ao investimento',
        note: 'O ponto em que o marketing se pagou e nada além disso.',
      },
    ],
  },
  whyUse: {
    h2: 'Por que usar esta calculadora',
    subtitle: 'Rápida de usar e segura para colocar números reais.',
    freeTitle: 'Grátis, sem cadastro',
    freeBody: 'Sem pedir e-mail e sem criar conta. Abra e use.',
    privateTitle: 'Seus números continuam seus',
    privateBody:
      'O cálculo inteiro acontece no seu navegador. Nunca recebemos o que você digita e nada fica armazenado em lugar nenhum.',
    completeTitle: 'Mais de uma métrica',
    completeBody: 'O ROI sozinho esconde muita coisa. Você também vê ROAS, CPL, CAC e sua taxa de conversão.',
    instantTitle: 'Atualiza enquanto você digita',
    instantBody: 'Mude um campo e tudo é recalculado, para testar um cenário sem começar do zero.',
  },
  attribution: {
    h2: 'A maioria dos cálculos de ROI erra no mesmo ponto',
    body:
      'A fórmula é trivial. O difícil é o número da receita. Se os negócios passam por canais que seu CRM nunca enxerga, essa receita fica de fora da conta e o canal que a gerou parece pior do que é.',
    point1: 'Conversas que acontecem no WhatsApp muitas vezes nunca chegam ao CRM.',
    point2: 'Receita sem origem registrada acaba atribuída a nada ou ao canal errado.',
    point3: 'O orçamento então migra para o que é medido, não para o que funciona.',
    cta: 'Veja como a Eazybe sincroniza o WhatsApp com seu CRM',
  },
  faq: {
    h2: 'Perguntas frequentes',
    subtitle: 'Dúvidas comuns sobre ROI de marketing e sobre como esta ferramenta funciona.',
    items: [
      {
        q: 'O que é ROI de marketing?',
        a: 'ROI de marketing é o retorno que você obtém sobre o dinheiro investido em marketing, expresso em porcentagem. Você subtrai o investimento da receita gerada, divide pelo investimento e multiplica por 100. Um resultado de 0% significa que você recuperou o dinheiro e nada mais.',
      },
      {
        q: 'Como se calcula o ROI de marketing?',
        a: 'Pegue a receita atribuída ao seu marketing, subtraia o investimento total, divida o resultado pelo investimento e multiplique por 100. Se você investiu 10.000 e isso gerou 40.000, o ROI é (40.000 − 10.000) ÷ 10.000 × 100, ou seja, 300%.',
      },
      {
        q: 'O que é ROAS e qual a diferença para o ROI?',
        a: 'ROAS é a receita dividida pelo investimento, exibida como múltiplo em vez de porcentagem. Ele não subtrai o custo antes, então sempre parece maior que o ROI. Investir 10.000 para faturar 40.000 é um ROAS de 4x e um ROI de 300%. Os dois descrevem o mesmo resultado.',
      },
      {
        q: 'O que conta como investimento em marketing?',
        a: 'Tudo o que foi necessário para rodar a ação: verba de mídia, software e ferramentas, agência ou freelancers e o custo salarial de quem executou. A maioria dos ROIs inflados vem de contar apenas a verba de mídia.',
      },
      {
        q: 'O que é receita de equilíbrio?',
        a: 'É a receita necessária para cobrir o que você investiu, sem sobrar nada. Ela é igual ao seu investimento total em marketing. Faturar menos significa que a ação deu prejuízo; faturar mais significa que deu lucro.',
      },
      {
        q: 'Como se calcula o custo por lead?',
        a: 'Divida o investimento total em marketing pelo número de leads gerados. Se você investiu 5.000 e gerou 250 leads, seu custo por lead é 20.',
      },
      {
        q: 'O que é CAC e qual a diferença para o custo por lead?',
        a: 'O custo por lead é o que você pagou por cada contato. O CAC é o que você pagou por cada pessoa que realmente comprou, então divide o mesmo investimento pelas conversões em vez de pelos leads. O CAC é sempre o número maior, e a distância entre os dois mostra quanto o seu processo comercial perde entre o contato e a venda.',
      },
      {
        q: 'Como se calcula a taxa de conversão de leads?',
        a: 'Divida as conversões pelos leads e multiplique por 100. Se 250 leads geraram 25 clientes, sua taxa de conversão é 10%.',
      },
      {
        q: 'O que é um bom ROI de marketing?',
        a: 'Depende das suas margens e do seu ciclo de vendas, então não existe um número único que sirva para todos. O que importa mais é a tendência ao longo do tempo e a comparação entre canais usando a mesma definição de investimento e de receita atribuída.',
      },
      {
        q: 'A calculadora é gratuita e meus dados ficam salvos?',
        a: 'É gratuita e sem cadastro. O cálculo roda inteiramente no seu navegador, então os números que você digita nunca são enviados para nós e nada fica armazenado.',
      },
    ],
  },
  finalCta: {
    h2: 'Saiba quais conversas realmente geraram a receita',
    body:
      'A Eazybe sincroniza conversas do WhatsApp com HubSpot, Salesforce, Zoho, Pipedrive e outros, para que negócios fechados no chat apareçam na origem certa em vez de sumirem dos seus relatórios.',
    primary: 'Começar grátis',
    secondary: 'Agendar demo',
  },
}

const es: RoiPageContent = {
  meta: {
    title: 'Calculadora de ROI de Marketing — ROI, ROAS y CPL | Eazybe',
    description:
      'Calculadora de ROI de marketing gratuita. Introduce inversión e ingresos y obtén ROI, ROAS, coste por lead, CAC y tasa de conversión al instante. Sin registro.',
    ogDescription:
      'Calcula el ROI de marketing, el ROAS, el coste por lead y el CAC en segundos. Gratis, sin registro, todo se ejecuta en tu navegador.',
  },
  breadcrumb: { home: 'Inicio', current: 'Calculadora de ROI de Marketing' },
  hero: {
    tag: 'Herramienta Gratuita',
    h1Lead: 'Calculadora de',
    h1Highlight: 'ROI de Marketing',
    subtitle:
      'Introduce cuánto invertiste y cuánto volvió. Obtienes ROI y ROAS al instante, más coste por lead y CAC en cuanto añadas los datos de leads. Todas las fórmulas están en la página, así que puedes comprobar el cálculo.',
    cta: 'Calcular mi ROI',
    footnote: 'Gratis, sin registro. Todo se calcula en tu navegador y no se nos envía nada.',
  },
  calculator: {
    h2: 'Calcula el ROI de tu marketing',
    subtitle: 'La inversión y los ingresos son obligatorios. Añade leads y conversiones para ver el panorama completo.',
    inputsTitle: 'Tus cifras',
    currencyLabel: 'Moneda',
    spendLabel: 'Inversión total en marketing',
    spendHint: 'Medios, herramientas, agencia y salarios del periodo que estás midiendo.',
    revenueLabel: 'Ingresos atribuidos al marketing',
    revenueHint: 'Solo los ingresos que puedes rastrear hasta esa inversión.',
    leadsLabel: 'Leads generados',
    leadsHint: 'Consultas, registros o MQLs procedentes de esa inversión.',
    conversionsLabel: 'Conversiones',
    conversionsHint: 'Leads que se convirtieron en clientes de pago.',
    optional: 'opcional',
    btnReset: 'Reiniciar',
    resultsTitle: 'Tus resultados',
    emptyState: 'Introduce la inversión y los ingresos atribuidos para ver tu ROI.',
    errorSpendZero: 'Introduce una inversión mayor que cero.',
    errorConversionsExceedLeads: 'Las conversiones no pueden superar a los leads.',
    roiLabel: 'ROI de marketing',
    roiHelp: 'Retorno por cada unidad invertida, en porcentaje.',
    roasLabel: 'ROAS',
    roasHelp: 'Ingresos divididos entre la inversión, como múltiplo.',
    revenuePerLabel: 'Ingresos por 1 invertido',
    revenuePerHelp: 'Lo que devolvió cada unidad de inversión.',
    profitLabel: 'Retorno neto',
    profitHelp: 'Ingresos atribuidos menos inversión.',
    cplLabel: 'Coste por lead',
    cplHelp: 'Inversión dividida entre los leads generados.',
    cacLabel: 'Coste de adquisición de cliente',
    cacHelp: 'Inversión dividida entre las conversiones.',
    convRateLabel: 'Tasa de conversión de leads',
    convRateHelp: 'Proporción de leads que se convirtió en cliente.',
    breakevenLabel: 'Ingresos de equilibrio',
    breakevenHelp: 'Lo que necesitas ingresar para cubrir la inversión.',
    verdictProfit: 'Esta inversión devuelve más de lo que cuesta.',
    verdictBreakeven: 'Esta inversión está prácticamente en el punto de equilibrio.',
    verdictLoss: 'Esta inversión cuesta más de lo que devuelve.',
    notEnoughData: 'Añade leads y conversiones para ver este dato.',
  },
  howTo: {
    h2: 'Cómo calcular el ROI de marketing',
    subtitle: 'Tres cifras deciden la respuesta. Acertarlas importa más que la fórmula.',
    step1Title: 'Suma todo lo que invertiste',
    step1Body:
      'Presupuesto de medios, software, honorarios de agencia y el coste salarial de quien lo ejecuta. Dejar fuera los salarios es la forma más común de inflar el ROI.',
    step2Title: 'Atribuye los ingresos con honestidad',
    step2Body:
      'Cuenta solo los ingresos que puedas rastrear hasta esa inversión. Si una venta se cerró por un canal que no mides, no aparecerá aquí y tu ROI real será mayor que la cifra que ves.',
    step3Title: 'Divide y luego contrasta',
    step3Body:
      'El ROI es (ingresos − inversión) ÷ inversión. Si el resultado parece inverosímil, el problema suele estar en la atribución antes que en la aritmética.',
  },
  formulas: {
    h2: 'Las fórmulas detrás de cada cifra',
    subtitle: 'Cada resultado de arriba sale de una de estas. Compruébalas con tus propias cifras.',
    items: [
      {
        name: 'ROI de marketing',
        formula: '(Ingresos − Inversión) ÷ Inversión × 100',
        note: 'Expresado en porcentaje. Un 100% significa que duplicaste el dinero.',
      },
      {
        name: 'ROAS',
        formula: 'Ingresos ÷ Inversión',
        note: 'Retorno de la inversión publicitaria, como múltiplo. 3x significa 3 de vuelta por cada 1 invertido.',
      },
      {
        name: 'Coste por lead',
        formula: 'Inversión ÷ Leads',
        note: 'Lo que costó generar cada consulta.',
      },
      {
        name: 'Coste de adquisición de cliente',
        formula: 'Inversión ÷ Conversiones',
        note: 'Lo que costó ganar cada cliente de pago.',
      },
      {
        name: 'Tasa de conversión de leads',
        formula: 'Conversiones ÷ Leads × 100',
        note: 'La proporción de consultas que se convirtió en cliente.',
      },
      {
        name: 'Ingresos de equilibrio',
        formula: 'Igual a la inversión',
        note: 'El punto en el que el marketing se ha pagado a sí mismo y nada más.',
      },
    ],
  },
  whyUse: {
    h2: 'Por qué usar esta calculadora',
    subtitle: 'Rápida de usar y segura para meter cifras reales.',
    freeTitle: 'Gratis, sin registro',
    freeBody: 'Sin muro de correo y sin crear cuenta. Ábrela y úsala.',
    privateTitle: 'Tus cifras siguen siendo tuyas',
    privateBody:
      'El cálculo entero ocurre en tu navegador. Nunca recibimos lo que escribes y no se guarda nada en ningún sitio.',
    completeTitle: 'Más de una métrica',
    completeBody: 'El ROI por sí solo esconde mucho. También obtienes ROAS, CPL, CAC y tu tasa de conversión.',
    instantTitle: 'Se actualiza mientras escribes',
    instantBody: 'Cambia un campo y todo se recalcula, para probar un escenario sin empezar de cero.',
  },
  attribution: {
    h2: 'La mayoría de los cálculos de ROI fallan en el mismo punto',
    body:
      'La fórmula es trivial. Lo difícil es la cifra de ingresos. Si las ventas pasan por canales que tu CRM nunca ve, esos ingresos faltan en el cálculo y el canal que los generó parece peor de lo que es.',
    point1: 'Las conversaciones que ocurren en WhatsApp a menudo nunca llegan al CRM.',
    point2: 'Los ingresos sin origen registrado se atribuyen a nada o al canal equivocado.',
    point3: 'El presupuesto se desplaza entonces hacia lo que se mide, no hacia lo que funciona.',
    cta: 'Mira cómo Eazybe sincroniza WhatsApp con tu CRM',
  },
  faq: {
    h2: 'Preguntas frecuentes',
    subtitle: 'Dudas habituales sobre el ROI de marketing y sobre cómo funciona esta herramienta.',
    items: [
      {
        q: '¿Qué es el ROI de marketing?',
        a: 'El ROI de marketing es el retorno que obtienes por el dinero que inviertes en marketing, expresado en porcentaje. Restas la inversión a los ingresos que generó, divides entre la inversión y multiplicas por 100. Un resultado del 0% significa que recuperaste el dinero y nada más.',
      },
      {
        q: '¿Cómo se calcula el ROI de marketing?',
        a: 'Toma los ingresos atribuidos a tu marketing, resta la inversión total, divide el resultado entre la inversión y multiplica por 100. Si invertiste 10.000 y generó 40.000, tu ROI es (40.000 − 10.000) ÷ 10.000 × 100, es decir, un 300%.',
      },
      {
        q: '¿Qué es el ROAS y en qué se diferencia del ROI?',
        a: 'El ROAS son los ingresos divididos entre la inversión, expresados como múltiplo en lugar de porcentaje. No resta el coste antes, así que siempre parece mayor que el ROI. Invertir 10.000 para generar 40.000 es un ROAS de 4x y un ROI del 300%. Ambos describen el mismo resultado.',
      },
      {
        q: '¿Qué cuenta como inversión en marketing?',
        a: 'Todo lo necesario para ejecutar la actividad: presupuesto de medios, software y herramientas, agencia o freelancers y el coste salarial de quien hace el trabajo. La mayoría de las cifras infladas de ROI vienen de contar solo el presupuesto de medios.',
      },
      {
        q: '¿Qué son los ingresos de equilibrio?',
        a: 'La cantidad de ingresos que necesitas para cubrir lo que invertiste, sin que sobre nada. Equivale a tu inversión total en marketing. Ingresar menos significa que la actividad perdió dinero; ingresar más, que lo ganó.',
      },
      {
        q: '¿Cómo se calcula el coste por lead?',
        a: 'Divide la inversión total en marketing entre el número de leads generados. Si invertiste 5.000 y generaste 250 leads, tu coste por lead es 20.',
      },
      {
        q: '¿Qué es el CAC y en qué se diferencia del coste por lead?',
        a: 'El coste por lead es lo que pagaste por cada consulta. El CAC es lo que pagaste por cada persona que compró de verdad, así que divide la misma inversión entre las conversiones y no entre los leads. El CAC siempre es la cifra más alta, y la distancia entre ambos indica cuánto pierde tu proceso comercial entre la consulta y la venta.',
      },
      {
        q: '¿Cómo se calcula la tasa de conversión de leads?',
        a: 'Divide las conversiones entre los leads y multiplica por 100. Si 250 leads produjeron 25 clientes, tu tasa de conversión es del 10%.',
      },
      {
        q: '¿Qué es un buen ROI de marketing?',
        a: 'Depende de tus márgenes y de tu ciclo de venta, así que no hay una cifra única que valga para todos. Importa más la tendencia a lo largo del tiempo y la comparación entre canales usando la misma definición de inversión e ingresos atribuidos.',
      },
      {
        q: '¿La calculadora es gratuita y se guardan mis datos?',
        a: 'Es gratuita y sin registro. El cálculo se ejecuta enteramente en tu navegador, así que las cifras que introduces nunca se nos envían y no se guarda nada.',
      },
    ],
  },
  finalCta: {
    h2: 'Descubre qué conversaciones generaron realmente los ingresos',
    body:
      'Eazybe sincroniza las conversaciones de WhatsApp con HubSpot, Salesforce, Zoho, Pipedrive y más, para que las ventas cerradas en el chat aparezcan con el origen correcto en vez de desaparecer de tus informes.',
    primary: 'Empezar gratis',
    secondary: 'Reservar demo',
  },
}

const tr: RoiPageContent = {
  meta: {
    title: 'Pazarlama ROI Hesaplayıcı — ROI, ROAS ve CPL Aracı | Eazybe',
    description:
      'Ücretsiz pazarlama ROI hesaplayıcı. Harcama ve geliri girin; ROI, ROAS, lead başına maliyet, CAC ve dönüşüm oranını anında görün. Kayıt gerekmez.',
    ogDescription:
      'Pazarlama ROI, ROAS, lead başına maliyet ve CAC değerlerini saniyeler içinde hesaplayın. Ücretsiz, kayıtsız, tamamen tarayıcınızda çalışır.',
  },
  breadcrumb: { home: 'Ana Sayfa', current: 'Pazarlama ROI Hesaplayıcı' },
  hero: {
    tag: 'Ücretsiz Araç',
    h1Lead: 'Pazarlama ROI',
    h1Highlight: 'Hesaplayıcı',
    subtitle:
      'Ne harcadığınızı ve ne geri geldiğini girin. ROI ve ROAS anında çıkar; lead sayılarını eklediğinizde lead başına maliyet ve CAC de gelir. Tüm formüller sayfada, hesabı kendiniz kontrol edebilirsiniz.',
    cta: 'ROI’mi hesapla',
    footnote: 'Ücretsiz, kayıt yok. Her şey tarayıcınızda hesaplanır ve bize hiçbir veri gönderilmez.',
  },
  calculator: {
    h2: 'Pazarlama ROI’nizi hesaplayın',
    subtitle: 'Harcama ve gelir zorunludur. Tam tabloyu görmek için lead ve dönüşüm ekleyin.',
    inputsTitle: 'Rakamlarınız',
    currencyLabel: 'Para birimi',
    spendLabel: 'Toplam pazarlama harcaması',
    spendHint: 'Ölçtüğünüz dönemdeki reklam, araç, ajans ve maaş giderleri.',
    revenueLabel: 'Pazarlamaya atfedilen gelir',
    revenueHint: 'Yalnızca bu harcamaya kadar izleyebildiğiniz gelir.',
    leadsLabel: 'Oluşan lead sayısı',
    leadsHint: 'Bu harcamadan gelen talepler, kayıtlar veya MQL’ler.',
    conversionsLabel: 'Dönüşümler',
    conversionsHint: 'Ödeme yapan müşteriye dönüşen leadler.',
    optional: 'isteğe bağlı',
    btnReset: 'Sıfırla',
    resultsTitle: 'Sonuçlarınız',
    emptyState: 'ROI’nizi görmek için harcama ve atfedilen geliri girin.',
    errorSpendZero: 'Sıfırdan büyük bir pazarlama harcaması girin.',
    errorConversionsExceedLeads: 'Dönüşümler lead sayısından fazla olamaz.',
    roiLabel: 'Pazarlama ROI',
    roiHelp: 'Harcanan her birim başına getiri, yüzde olarak.',
    roasLabel: 'ROAS',
    roasHelp: 'Gelirin harcamaya bölümü, katsayı olarak.',
    revenuePerLabel: 'Harcanan 1 birim başına gelir',
    revenuePerHelp: 'Her bir harcama biriminin geri getirdiği tutar.',
    profitLabel: 'Net getiri',
    profitHelp: 'Atfedilen gelir eksi harcama.',
    cplLabel: 'Lead başına maliyet',
    cplHelp: 'Harcamanın oluşan lead sayısına bölümü.',
    cacLabel: 'Müşteri edinme maliyeti',
    cacHelp: 'Harcamanın dönüşüm sayısına bölümü.',
    convRateLabel: 'Lead dönüşüm oranı',
    convRateHelp: 'Müşteriye dönüşen lead oranı.',
    breakevenLabel: 'Başabaş geliri',
    breakevenHelp: 'Harcamayı karşılamak için elde etmeniz gereken gelir.',
    verdictProfit: 'Bu harcama maliyetinden fazlasını geri getiriyor.',
    verdictBreakeven: 'Bu harcama yaklaşık olarak başabaş noktasında.',
    verdictLoss: 'Bu harcama getirdiğinden fazlasına mal oluyor.',
    notEnoughData: 'Bunu görmek için lead ve dönüşüm ekleyin.',
  },
  howTo: {
    h2: 'Pazarlama ROI nasıl hesaplanır',
    subtitle: 'Cevabı üç rakam belirler. Bunları doğru almak formülden daha önemlidir.',
    step1Title: 'Harcadığınız her şeyi toplayın',
    step1Body:
      'Reklam bütçesi, yazılım, ajans ücretleri ve işi yürüten ekibin maaş maliyeti. Maaşları dışarıda bırakmak, ROI’yi olduğundan yüksek göstermenin en yaygın yoludur.',
    step2Title: 'Geliri dürüstçe atfedin',
    step2Body:
      'Yalnızca o harcamaya kadar izleyebildiğiniz geliri sayın. Bir satış, takip etmediğiniz bir kanaldan kapandıysa burada görünmez ve gerçek ROI’niz gördüğünüz rakamdan yüksek olur.',
    step3Title: 'Bölün, sonra mantık kontrolü yapın',
    step3Body:
      'ROI = (gelir − harcama) ÷ harcama. Sonuç inandırıcı görünmüyorsa, sorun genellikle aritmetikte değil atıfta olur.',
  },
  formulas: {
    h2: 'Her rakamın arkasındaki formüller',
    subtitle: 'Yukarıdaki her sonuç bunlardan birinden çıkıyor. Kendi rakamlarınızla doğrulayın.',
    items: [
      {
        name: 'Pazarlama ROI',
        formula: '(Gelir − Harcama) ÷ Harcama × 100',
        note: 'Yüzde olarak ifade edilir. %100, paranızı ikiye katladığınız anlamına gelir.',
      },
      {
        name: 'ROAS',
        formula: 'Gelir ÷ Harcama',
        note: 'Reklam harcaması getirisi, katsayı olarak. 3x, harcanan her 1 birim için 3 birim geri demektir.',
      },
      {
        name: 'Lead başına maliyet',
        formula: 'Harcama ÷ Lead',
        note: 'Her bir talebi oluşturmanın size maliyeti.',
      },
      {
        name: 'Müşteri edinme maliyeti',
        formula: 'Harcama ÷ Dönüşüm',
        note: 'Ödeme yapan her müşteriyi kazanmanın size maliyeti.',
      },
      {
        name: 'Lead dönüşüm oranı',
        formula: 'Dönüşüm ÷ Lead × 100',
        note: 'Müşteriye dönüşen talep oranı.',
      },
      {
        name: 'Başabaş geliri',
        formula: 'Harcamaya eşittir',
        note: 'Pazarlamanın kendi masrafını çıkardığı, fazlasını getirmediği nokta.',
      },
    ],
  },
  whyUse: {
    h2: 'Neden bu hesaplayıcıyı kullanmalısınız',
    subtitle: 'Hızlı kullanılır ve gerçek rakamları girmek için güvenlidir.',
    freeTitle: 'Ücretsiz, kayıt yok',
    freeBody: 'E-posta duvarı yok, hesap açmak da gerekmiyor. Açın ve kullanın.',
    privateTitle: 'Rakamlarınız sizde kalır',
    privateBody:
      'Hesaplamanın tamamı tarayıcınızda olur. Yazdıklarınız bize hiç ulaşmaz ve hiçbir yerde saklanmaz.',
    completeTitle: 'Tek bir metrikten fazlası',
    completeBody: 'ROI tek başına çok şeyi gizler. ROAS, CPL, CAC ve dönüşüm oranınızı da görürsünüz.',
    instantTitle: 'Siz yazdıkça güncellenir',
    instantBody: 'Bir alanı değiştirin, her şey yeniden hesaplanır; senaryoyu baştan kurmanız gerekmez.',
  },
  attribution: {
    h2: 'ROI hesaplarının çoğu aynı noktada hatalı',
    body:
      'Formül basit. Zor olan gelir rakamı. Satışlar CRM’inizin hiç görmediği kanallardan ilerliyorsa, o gelir hesaba girmez ve onu üreten kanal olduğundan kötü görünür.',
    point1: 'WhatsApp’ta geçen konuşmalar çoğu zaman CRM’e hiç ulaşmaz.',
    point2: 'Kaynağı kayıtlı olmayan gelir ya hiçbir kanala ya da yanlış kanala atfedilir.',
    point3: 'Bütçe de işe yarayana değil, ölçülebilene doğru kayar.',
    cta: 'Eazybe’nin WhatsApp’ı CRM’inize nasıl senkronladığını görün',
  },
  faq: {
    h2: 'Sıkça sorulan sorular',
    subtitle: 'Pazarlama ROI ve bu aracın çalışma şekli hakkında sık sorulanlar.',
    items: [
      {
        q: 'Pazarlama ROI nedir?',
        a: 'Pazarlama ROI, pazarlamaya koyduğunuz paranın size sağladığı getiridir ve yüzde olarak ifade edilir. Elde edilen gelirden harcamayı çıkarır, harcamaya böler ve 100 ile çarparsınız. %0 sonucu, paranızı geri aldığınız ve fazlasını kazanmadığınız anlamına gelir.',
      },
      {
        q: 'Pazarlama ROI nasıl hesaplanır?',
        a: 'Pazarlamaya atfedilen geliri alın, toplam harcamayı çıkarın, sonucu harcamaya bölün ve 100 ile çarpın. 10.000 harcayıp 40.000 gelir elde ettiyseniz ROI’niz (40.000 − 10.000) ÷ 10.000 × 100, yani %300 olur.',
      },
      {
        q: 'ROAS nedir ve ROI’den farkı nedir?',
        a: 'ROAS, gelirin harcamaya bölümüdür ve yüzde yerine katsayı olarak gösterilir. Maliyeti önceden düşmediği için her zaman ROI’den büyük görünür. 40.000 kazanmak için 10.000 harcamak 4x ROAS ve %300 ROI demektir. İkisi de aynı sonucu tarif eder.',
      },
      {
        q: 'Pazarlama harcamasına neler dahildir?',
        a: 'Faaliyeti yürütmek için gereken her şey: reklam bütçesi, yazılım ve araçlar, ajans veya serbest çalışan ücretleri ve işi yapan kişilerin maaş maliyeti. Şişirilmiş ROI rakamlarının çoğu yalnızca reklam bütçesinin sayılmasından kaynaklanır.',
      },
      {
        q: 'Başabaş geliri nedir?',
        a: 'Harcadığınızı karşılamaya yeten, geriye hiçbir şey bırakmayan gelir tutarıdır. Toplam pazarlama harcamanıza eşittir. Daha azını kazanırsanız faaliyet zarar etmiş, daha fazlasını kazanırsanız kâr etmiştir.',
      },
      {
        q: 'Lead başına maliyet nasıl hesaplanır?',
        a: 'Toplam pazarlama harcamasını oluşan lead sayısına bölün. 5.000 harcayıp 250 lead elde ettiyseniz lead başına maliyetiniz 20 olur.',
      },
      {
        q: 'CAC nedir, lead başına maliyetten farkı nedir?',
        a: 'Lead başına maliyet, her bir talep için ödediğiniz tutardır. CAC ise gerçekten satın alan her kişi için ödediğiniz tutardır; aynı harcamayı lead sayısına değil, dönüşüm sayısına böler. CAC her zaman daha büyük çıkar ve aradaki fark, satış sürecinizin talep ile satış arasında ne kadar kaybettiğini gösterir.',
      },
      {
        q: 'Lead dönüşüm oranı nasıl hesaplanır?',
        a: 'Dönüşümleri lead sayısına bölüp 100 ile çarpın. 250 lead 25 müşteri getirdiyse dönüşüm oranınız %10’dur.',
      },
      {
        q: 'İyi bir pazarlama ROI nedir?',
        a: 'Kâr marjınıza ve satış döngünüze bağlı olduğu için her yere uyan tek bir rakam yoktur. Daha önemlisi, zaman içindeki eğilim ve kanalların aynı harcama ve atfedilen gelir tanımıyla birbirine göre karşılaştırılmasıdır.',
      },
      {
        q: 'Bu hesaplayıcı ücretsiz mi, verilerim saklanıyor mu?',
        a: 'Ücretsiz ve kayıt gerektirmiyor. Hesaplama tamamen tarayıcınızda çalışır, dolayısıyla girdiğiniz rakamlar bize hiçbir zaman gönderilmez ve hiçbir şey saklanmaz.',
      },
    ],
  },
  finalCta: {
    h2: 'Geliri gerçekte hangi konuşmaların getirdiğini bilin',
    body:
      'Eazybe, WhatsApp konuşmalarını HubSpot, Salesforce, Zoho, Pipedrive ve diğerlerine senkronlar; böylece sohbette kapanan satışlar raporlarınızdan kaybolmak yerine doğru kaynağa işlenir.',
    primary: 'Ücretsiz başla',
    secondary: 'Demo planla',
  },
}

export const ROI_CONTENT_BY_LOCALE: Record<string, RoiPageContent> = { en, br, es, tr }

export function getRoiPageContent(locale: string): RoiPageContent {
  return ROI_CONTENT_BY_LOCALE[locale] ?? en
}
