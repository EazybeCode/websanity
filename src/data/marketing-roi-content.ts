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
      'Free marketing ROI calculator. Enter spend and revenue for ROI, ROAS, cost per lead, CAC and conversion rate. No signup, and nothing leaves your browser.',
    ogDescription:
      'Work out marketing ROI, ROAS, cost per lead and CAC in a few seconds. Free, no signup, and it runs in your browser.',
  },
  breadcrumb: { home: 'Home', current: 'Marketing ROI Calculator' },
  hero: {
    tag: 'Free Tool',
    h1Lead: 'Marketing ROI',
    h1Highlight: 'Calculator',
    subtitle:
      'Enter what you spent and what it brought in, and you get ROI and ROAS straight away. Add leads and conversions to see cost per lead, CAC and conversion rate too. Every formula is on the page, so you can check the maths yourself.',
    cta: 'Calculate my ROI',
    footnote: 'Free, no signup. The maths runs in your browser and nothing you type is sent to us.',
  },
  calculator: {
    h2: 'Calculate Your Marketing ROI',
    subtitle: 'Spend and revenue are required. Add leads and conversions to see CPL, CAC and conversion rate.',
    inputsTitle: 'Your numbers',
    currencyLabel: 'Currency',
    spendLabel: 'Total marketing spend',
    spendHint: 'Ads, tools, agency fees and salaries for the period you are measuring.',
    revenueLabel: 'Revenue attributed to marketing',
    revenueHint: 'Only revenue you can trace back to this spend.',
    leadsLabel: 'Leads generated',
    leadsHint: 'Enquiries, signups or MQLs that came from this spend.',
    conversionsLabel: 'Conversions',
    conversionsHint: 'Leads that became paying customers.',
    optional: 'optional',
    btnReset: 'Reset',
    resultsTitle: 'Your results',
    emptyState: 'Enter your spend and attributed revenue to see your ROI.',
    errorSpendZero: 'Enter a marketing spend above zero.',
    errorConversionsExceedLeads: 'Conversions cannot be higher than leads.',
    roiLabel: 'Marketing ROI',
    roiHelp: 'Net return as a percentage of spend.',
    roasLabel: 'ROAS',
    roasHelp: 'Revenue divided by spend, shown as a multiple.',
    revenuePerLabel: 'Revenue per 1 spent',
    revenuePerHelp: 'How much each unit of spend brought back.',
    profitLabel: 'Net return',
    profitHelp: 'Attributed revenue minus spend.',
    cplLabel: 'Cost per lead',
    cplHelp: 'Spend divided by leads generated.',
    cacLabel: 'Customer acquisition cost',
    cacHelp: 'Spend divided by conversions.',
    convRateLabel: 'Lead conversion rate',
    convRateHelp: 'Share of leads that became customers.',
    breakevenLabel: 'Breakeven revenue',
    breakevenHelp: 'The revenue you need just to cover the spend.',
    verdictProfit: 'This spend is bringing back more than it costs.',
    verdictBreakeven: 'This spend is roughly breaking even.',
    verdictLoss: 'This spend costs more than it brings back.',
    notEnoughData: 'Add leads and conversions to see this.',
  },
  howTo: {
    h2: 'How To Calculate Marketing ROI',
    subtitle: 'The formula is the easy part. The answer depends on three numbers, and on getting them right.',
    step1Title: 'Add up everything you spent',
    step1Body:
      'Ad budget, software, agency retainers and the salary cost of the people running the work. Leave out salaries and your ROI will look better than it really is.',
    step2Title: 'Attribute revenue honestly',
    step2Body:
      'Count only revenue you can trace back to that spend. If a deal closed over a channel you do not track, it will not show up here, and your real ROI will be higher than the number you see.',
    step3Title: 'Divide, then sanity check',
    step3Body:
      'ROI is (revenue − spend) ÷ spend. If the result looks too good or too bad to be true, check the attribution first. The arithmetic is rarely the problem.',
  },
  formulas: {
    h2: 'The Formulas Behind Each Number',
    subtitle: 'Each result above comes from one of these. Try them on your own figures.',
    items: [
      {
        name: 'Marketing ROI',
        formula: '(Revenue − Spend) ÷ Spend × 100',
        note: 'A percentage. 100% means you doubled your money.',
      },
      {
        name: 'ROAS',
        formula: 'Revenue ÷ Spend',
        note: 'Return on ad spend, as a multiple. 3x means 3 back for every 1 you put in.',
      },
      {
        name: 'Cost per lead',
        formula: 'Spend ÷ Leads',
        note: 'What it cost to generate each enquiry.',
      },
      {
        name: 'Customer acquisition cost',
        formula: 'Spend ÷ Conversions',
        note: 'What it cost to win each paying customer.',
      },
      {
        name: 'Lead conversion rate',
        formula: 'Conversions ÷ Leads × 100',
        note: 'The share of enquiries that turned into customers.',
      },
      {
        name: 'Breakeven revenue',
        formula: 'Equal to spend',
        note: 'Where marketing has paid for itself and made nothing on top.',
      },
    ],
  },
  whyUse: {
    h2: 'Why Use This Calculator',
    subtitle: 'It is quick, and you can type in real numbers without worrying about where they go.',
    freeTitle: 'Free, no signup',
    freeBody: 'We do not ask for an email and you do not need an account. Open the page and use it.',
    privateTitle: 'Your numbers stay yours',
    privateBody:
      'The calculation happens in your browser. We never see what you type, and nothing gets saved.',
    completeTitle: 'More than one metric',
    completeBody: 'ROI on its own hides a lot, so you also get ROAS, CPL, CAC and your conversion rate.',
    instantTitle: 'Updates as you type',
    instantBody: 'Change one field and the rest recalculate, so you can try a what-if without starting over.',
  },
  attribution: {
    h2: 'Most ROI Calculations Are Wrong In The Same Place',
    body:
      'The formula is simple. The revenue number is where it goes wrong. When deals happen in channels your CRM never sees, that revenue drops out of the calculation, and the channel that earned it looks worse than it is.',
    point1: 'Sales conversations on WhatsApp often never make it into the CRM.',
    point2: 'Revenue with no recorded source gets credited to nothing, or to the wrong channel.',
    point3: 'Budget then follows the channels your reports can see, even when another one is doing the selling.',
    cta: 'See how Eazybe syncs WhatsApp to your CRM',
  },
  faq: {
    h2: 'Frequently Asked Questions',
    subtitle: 'Questions people ask about marketing ROI and about how this tool works.',
    items: [
      {
        q: 'What is marketing ROI?',
        a: 'Marketing ROI is the return on the money you put into marketing, written as a percentage. Subtract the spend from the revenue it produced, divide by the spend, and multiply by 100. An ROI of 0% means you got your money back and nothing more.',
      },
      {
        q: 'How do you calculate marketing ROI?',
        a: 'Take the revenue attributed to your marketing, subtract the total spend, divide the result by the spend, then multiply by 100. If you spent 10,000 and it brought in 40,000, your ROI is (40,000 − 10,000) ÷ 10,000 × 100, which is 300%.',
      },
      {
        q: 'What is ROAS and how is it different from ROI?',
        a: 'ROAS is revenue divided by spend, shown as a multiple instead of a percentage. It does not subtract the cost, so a ROAS of 1x means you only broke even, which is an ROI of 0%. Spending 10,000 to make 40,000 gives a ROAS of 4x and an ROI of 300%, two ways of describing the same result.',
      },
      {
        q: 'What counts as marketing spend?',
        a: 'Everything it took to run the activity: ad budget, software, agency or freelancer fees, and the salary cost of the people doing the work. If you count only the ad budget, your ROI will look higher than it really is.',
      },
      {
        q: 'What is breakeven revenue?',
        a: 'Breakeven revenue is the amount you need to bring in to cover what you spent, with nothing left over. It equals your total marketing spend. Below it the activity lost money, and above it the activity made money.',
      },
      {
        q: 'How is cost per lead calculated?',
        a: 'Divide total marketing spend by the number of leads generated. If you spent 5,000 and got 250 leads, your cost per lead is 20.',
      },
      {
        q: 'What is CAC, and how is it different from cost per lead?',
        a: 'Cost per lead is what you paid for each enquiry. CAC is what you paid for each person who actually bought, so it divides the same spend by conversions instead of leads. CAC is never lower than cost per lead, and the gap between them shows how many enquiries your sales process loses before the sale.',
      },
      {
        q: 'How is lead conversion rate calculated?',
        a: 'Divide conversions by leads and multiply by 100. If 250 leads produced 25 customers, your conversion rate is 10%.',
      },
      {
        q: 'What is a good marketing ROI?',
        a: 'There is no single number that fits every business, because it depends on your margins and how long your sales cycle is. It is more useful to track your own ROI over time and to compare channels using the same definition of spend and attributed revenue.',
      },
      {
        q: 'Is this calculator free, and is my data stored?',
        a: 'It is free and needs no signup. The calculation runs in your browser, so the numbers you enter are never sent to us and nothing is stored.',
      },
    ],
  },
  finalCta: {
    h2: 'Know Which Conversations Actually Produced The Revenue',
    body:
      'Eazybe syncs WhatsApp conversations into HubSpot, Salesforce, Zoho, Pipedrive and other CRMs. Deals closed in chat then show up against the right source in your reports, where before they were missing.',
    primary: 'Start free',
    secondary: 'Book a demo',
  },
}

const br: RoiPageContent = {
  meta: {
    title: 'Calculadora de ROI de Marketing — ROI, ROAS e CPL | Eazybe',
    description:
      'Calculadora de ROI de marketing grátis. Informe investimento e receita e veja ROI, ROAS, custo por lead, CAC e taxa de conversão na hora. Sem cadastro.',
    ogDescription:
      'Calcule ROI de marketing, ROAS, custo por lead e CAC em poucos segundos. Grátis, sem cadastro e direto no seu navegador.',
  },
  breadcrumb: { home: 'Início', current: 'Calculadora de ROI de Marketing' },
  hero: {
    tag: 'Ferramenta Gratuita',
    h1Lead: 'Calculadora de',
    h1Highlight: 'ROI de Marketing',
    subtitle:
      'Informe quanto você investiu e quanto isso trouxe de volta. O ROI e o ROAS aparecem na hora. Com leads e conversões, você também vê custo por lead, CAC e taxa de conversão. Todas as fórmulas estão na página, para você conferir a conta.',
    cta: 'Calcular meu ROI',
    footnote: 'Grátis e sem cadastro. A conta é feita no seu navegador e nada do que você digita chega até nós.',
  },
  calculator: {
    h2: 'Calcule o ROI do seu marketing',
    subtitle: 'Investimento e receita são obrigatórios. Com leads e conversões, aparecem as outras métricas.',
    inputsTitle: 'Seus números',
    currencyLabel: 'Moeda',
    spendLabel: 'Investimento total em marketing',
    spendHint: 'Mídia, ferramentas, agência e salários do período que você está medindo.',
    revenueLabel: 'Receita atribuída ao marketing',
    revenueHint: 'Só a receita que você consegue ligar a esse investimento.',
    leadsLabel: 'Leads gerados',
    leadsHint: 'Contatos, cadastros ou MQLs que vieram desse investimento.',
    conversionsLabel: 'Conversões',
    conversionsHint: 'Leads que viraram clientes pagantes.',
    optional: 'opcional',
    btnReset: 'Limpar',
    resultsTitle: 'Seus resultados',
    emptyState: 'Informe o investimento e a receita atribuída para ver seu ROI.',
    errorSpendZero: 'Informe um investimento maior que zero.',
    errorConversionsExceedLeads: 'As conversões não podem passar do número de leads.',
    roiLabel: 'ROI de marketing',
    roiHelp: 'Retorno líquido em porcentagem do investimento.',
    roasLabel: 'ROAS',
    roasHelp: 'Receita dividida pelo investimento, em múltiplo.',
    revenuePerLabel: 'Receita por 1 investido',
    revenuePerHelp: 'Quanto cada unidade investida trouxe de volta.',
    profitLabel: 'Retorno líquido',
    profitHelp: 'Receita atribuída menos o investimento.',
    cplLabel: 'Custo por lead',
    cplHelp: 'Investimento dividido pelos leads gerados.',
    cacLabel: 'Custo de aquisição de cliente',
    cacHelp: 'Investimento dividido pelas conversões.',
    convRateLabel: 'Taxa de conversão de leads',
    convRateHelp: 'Quantos leads, em porcentagem, viraram clientes.',
    breakevenLabel: 'Receita de equilíbrio',
    breakevenHelp: 'O mínimo que você precisa faturar para cobrir o investimento.',
    verdictProfit: 'Esse investimento está trazendo mais do que custa.',
    verdictBreakeven: 'Esse investimento está mais ou menos empatado.',
    verdictLoss: 'Esse investimento está custando mais do que traz.',
    notEnoughData: 'Adicione leads e conversões para ver este dado.',
  },
  howTo: {
    h2: 'Como calcular o ROI de marketing',
    subtitle: 'A fórmula é a parte fácil. O resultado depende de três números, e de acertar cada um deles.',
    step1Title: 'Some tudo o que você investiu',
    step1Body:
      'Verba de mídia, software, contrato com agência e o custo salarial de quem toca a operação. Se deixar os salários de fora, o ROI vai parecer melhor do que é.',
    step2Title: 'Atribua a receita com honestidade',
    step2Body:
      'Conte só a receita que você consegue ligar àquele investimento. Se um negócio fechou por um canal que você não acompanha, ele não aparece aqui, e o seu ROI real fica maior que o número na tela.',
    step3Title: 'Divida e depois confira',
    step3Body:
      'ROI é (receita − investimento) ÷ investimento. Se o resultado parecer bom ou ruim demais, revise a atribuição primeiro. Raramente o erro está na conta.',
  },
  formulas: {
    h2: 'As fórmulas por trás de cada número',
    subtitle: 'Cada resultado acima vem de uma destas fórmulas. Teste com os seus números.',
    items: [
      {
        name: 'ROI de marketing',
        formula: '(Receita − Investimento) ÷ Investimento × 100',
        note: 'Em porcentagem. 100% quer dizer que você dobrou o dinheiro.',
      },
      {
        name: 'ROAS',
        formula: 'Receita ÷ Investimento',
        note: 'Retorno sobre o investimento em mídia, em múltiplo. 3x quer dizer 3 de volta para cada 1 investido.',
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
        note: 'A fatia dos contatos que virou cliente.',
      },
      {
        name: 'Receita de equilíbrio',
        formula: 'Igual ao investimento',
        note: 'O ponto em que o marketing se pagou, sem sobrar lucro.',
      },
    ],
  },
  whyUse: {
    h2: 'Por que usar esta calculadora',
    subtitle: 'É rápida, e você pode usar números reais sem se preocupar com o destino deles.',
    freeTitle: 'Grátis, sem cadastro',
    freeBody: 'Não pedimos e-mail e você não precisa criar conta. É só abrir e usar.',
    privateTitle: 'Seus números continuam seus',
    privateBody:
      'A conta toda é feita no seu navegador. Não recebemos nada do que você digita e nada fica salvo.',
    completeTitle: 'Mais de uma métrica',
    completeBody: 'O ROI sozinho esconde muita coisa, por isso você também vê ROAS, CPL, CAC e taxa de conversão.',
    instantTitle: 'Atualiza enquanto você digita',
    instantBody: 'Mude um campo e o resto se recalcula, então dá para simular cenários sem começar do zero.',
  },
  attribution: {
    h2: 'A maioria dos cálculos de ROI erra no mesmo ponto',
    body:
      'A fórmula é simples. O problema está no número da receita. Quando os negócios acontecem em canais que o seu CRM não enxerga, essa receita some da conta, e o canal que a gerou parece pior do que é.',
    point1: 'Conversas de venda no WhatsApp muitas vezes nem chegam ao CRM.',
    point2: 'Receita sem origem registrada fica sem dono ou cai no canal errado.',
    point3: 'Aí o orçamento vai para os canais que aparecem nos relatórios, mesmo quando é outro que está vendendo.',
    cta: 'Veja como a Eazybe sincroniza o WhatsApp com seu CRM',
  },
  faq: {
    h2: 'Perguntas frequentes',
    subtitle: 'O que as pessoas mais perguntam sobre ROI de marketing e sobre esta ferramenta.',
    items: [
      {
        q: 'O que é ROI de marketing?',
        a: 'ROI de marketing é o retorno sobre o dinheiro que você colocou em marketing, em porcentagem. Você subtrai o investimento da receita gerada, divide pelo investimento e multiplica por 100. Um ROI de 0% quer dizer que você recuperou o dinheiro e nada além disso.',
      },
      {
        q: 'Como se calcula o ROI de marketing?',
        a: 'Pegue a receita atribuída ao marketing, subtraia o investimento total, divida o resultado pelo investimento e multiplique por 100. Se você investiu 10.000 e isso gerou 40.000, o ROI é (40.000 − 10.000) ÷ 10.000 × 100, ou seja, 300%.',
      },
      {
        q: 'O que é ROAS e qual a diferença para o ROI?',
        a: 'ROAS é a receita dividida pelo investimento, mostrada como múltiplo e não como porcentagem. Ele não desconta o custo, então um ROAS de 1x significa que você só empatou, o que equivale a um ROI de 0%. Investir 10.000 para faturar 40.000 dá um ROAS de 4x e um ROI de 300%, duas formas de descrever o mesmo resultado.',
      },
      {
        q: 'O que conta como investimento em marketing?',
        a: 'Tudo o que foi preciso para rodar a ação: verba de mídia, software, agência ou freelancers e o custo salarial de quem fez o trabalho. Se você contar só a verba de mídia, o ROI vai parecer maior do que realmente é.',
      },
      {
        q: 'O que é receita de equilíbrio?',
        a: 'É a receita necessária para cobrir o que você investiu, sem sobrar nada. Ela é igual ao seu investimento total em marketing. Abaixo dela a ação deu prejuízo; acima, deu lucro.',
      },
      {
        q: 'Como se calcula o custo por lead?',
        a: 'Divida o investimento total em marketing pelo número de leads gerados. Se você investiu 5.000 e gerou 250 leads, o custo por lead é 20.',
      },
      {
        q: 'O que é CAC e qual a diferença para o custo por lead?',
        a: 'O custo por lead é quanto você pagou por cada contato. O CAC é quanto você pagou por cada pessoa que de fato comprou, então ele divide o mesmo investimento pelas conversões, e não pelos leads. O CAC nunca é menor que o custo por lead, e a diferença entre os dois mostra quantos contatos o seu processo comercial perde antes da venda.',
      },
      {
        q: 'Como se calcula a taxa de conversão de leads?',
        a: 'Divida as conversões pelos leads e multiplique por 100. Se 250 leads geraram 25 clientes, sua taxa de conversão é de 10%.',
      },
      {
        q: 'O que é um bom ROI de marketing?',
        a: 'Não existe um número que sirva para todo negócio, porque depende das suas margens e do tamanho do seu ciclo de vendas. Vale mais acompanhar o seu próprio ROI ao longo do tempo e comparar canais usando a mesma definição de investimento e de receita atribuída.',
      },
      {
        q: 'A calculadora é gratuita e meus dados ficam salvos?',
        a: 'É gratuita e não pede cadastro. O cálculo roda no seu navegador, então os números que você digita nunca são enviados para nós e nada fica salvo.',
      },
    ],
  },
  finalCta: {
    h2: 'Saiba quais conversas realmente geraram a receita',
    body:
      'A Eazybe sincroniza as conversas do WhatsApp com HubSpot, Salesforce, Zoho, Pipedrive e outros CRMs. Assim, os negócios fechados no chat entram nos relatórios com a origem certa, em vez de ficarem de fora.',
    primary: 'Começar grátis',
    secondary: 'Agendar demo',
  },
}

const es: RoiPageContent = {
  meta: {
    title: 'Calculadora de ROI de Marketing — ROI, ROAS y CPL | Eazybe',
    description:
      'Calculadora de ROI de marketing gratis. Indica inversión e ingresos y obtén ROI, ROAS, costo por lead, CAC y tasa de conversión al instante. Sin registro.',
    ogDescription:
      'Calcula el ROI de marketing, el ROAS, el costo por lead y el CAC en pocos segundos. Gratis, sin registro y desde tu navegador.',
  },
  breadcrumb: { home: 'Inicio', current: 'Calculadora de ROI de Marketing' },
  hero: {
    tag: 'Herramienta Gratuita',
    h1Lead: 'Calculadora de',
    h1Highlight: 'ROI de Marketing',
    subtitle:
      'Indica cuánto invertiste y cuánto te devolvió. El ROI y el ROAS aparecen al momento. Si agregas leads y conversiones, también ves el costo por lead, el CAC y la tasa de conversión. Todas las fórmulas están en la página para que revises el cálculo.',
    cta: 'Calcular mi ROI',
    footnote: 'Gratis y sin registro. El cálculo se hace en tu navegador y no nos llega nada de lo que escribes.',
  },
  calculator: {
    h2: 'Calcula el ROI de tu marketing',
    subtitle: 'La inversión y los ingresos son obligatorios. Con leads y conversiones aparecen las demás métricas.',
    inputsTitle: 'Tus cifras',
    currencyLabel: 'Moneda',
    spendLabel: 'Inversión total en marketing',
    spendHint: 'Medios, herramientas, agencia y sueldos del periodo que estás midiendo.',
    revenueLabel: 'Ingresos atribuidos al marketing',
    revenueHint: 'Solo los ingresos que puedes vincular a esa inversión.',
    leadsLabel: 'Leads generados',
    leadsHint: 'Consultas, registros o MQLs que salieron de esa inversión.',
    conversionsLabel: 'Conversiones',
    conversionsHint: 'Leads que terminaron siendo clientes de pago.',
    optional: 'opcional',
    btnReset: 'Reiniciar',
    resultsTitle: 'Tus resultados',
    emptyState: 'Indica la inversión y los ingresos atribuidos para ver tu ROI.',
    errorSpendZero: 'Indica una inversión mayor que cero.',
    errorConversionsExceedLeads: 'Las conversiones no pueden superar a los leads.',
    roiLabel: 'ROI de marketing',
    roiHelp: 'Retorno neto como porcentaje de la inversión.',
    roasLabel: 'ROAS',
    roasHelp: 'Ingresos divididos entre la inversión, como múltiplo.',
    revenuePerLabel: 'Ingresos por 1 invertido',
    revenuePerHelp: 'Cuánto devolvió cada unidad invertida.',
    profitLabel: 'Retorno neto',
    profitHelp: 'Ingresos atribuidos menos la inversión.',
    cplLabel: 'Costo por lead',
    cplHelp: 'Inversión dividida entre los leads generados.',
    cacLabel: 'Costo de adquisición de cliente',
    cacHelp: 'Inversión dividida entre las conversiones.',
    convRateLabel: 'Tasa de conversión de leads',
    convRateHelp: 'Porcentaje de leads que se volvieron clientes.',
    breakevenLabel: 'Ingresos de equilibrio',
    breakevenHelp: 'Lo mínimo que necesitas ingresar para cubrir la inversión.',
    verdictProfit: 'Esta inversión te devuelve más de lo que cuesta.',
    verdictBreakeven: 'Esta inversión está más o menos en tablas.',
    verdictLoss: 'Esta inversión cuesta más de lo que devuelve.',
    notEnoughData: 'Agrega leads y conversiones para ver este dato.',
  },
  howTo: {
    h2: 'Cómo calcular el ROI de marketing',
    subtitle: 'La fórmula es lo fácil. El resultado depende de tres cifras y de que cada una sea correcta.',
    step1Title: 'Suma todo lo que invertiste',
    step1Body:
      'Presupuesto de medios, software, honorarios de agencia y el costo en sueldos de quienes llevan la operación. Si dejas fuera los sueldos, el ROI se verá mejor de lo que es.',
    step2Title: 'Atribuye los ingresos con honestidad',
    step2Body:
      'Cuenta solo los ingresos que puedas vincular a esa inversión. Si una venta se cerró por un canal que no mides, no aparecerá aquí, y tu ROI real será mayor que la cifra que ves.',
    step3Title: 'Divide y luego revisa',
    step3Body:
      'El ROI es (ingresos − inversión) ÷ inversión. Si el resultado parece demasiado bueno o demasiado malo, revisa primero la atribución. Rara vez el error está en la cuenta.',
  },
  formulas: {
    h2: 'Las fórmulas detrás de cada cifra',
    subtitle: 'Cada resultado de arriba sale de una de estas fórmulas. Pruébalas con tus cifras.',
    items: [
      {
        name: 'ROI de marketing',
        formula: '(Ingresos − Inversión) ÷ Inversión × 100',
        note: 'En porcentaje. Un 100% quiere decir que duplicaste el dinero.',
      },
      {
        name: 'ROAS',
        formula: 'Ingresos ÷ Inversión',
        note: 'Retorno de la inversión publicitaria, como múltiplo. 3x quiere decir 3 de vuelta por cada 1 invertido.',
      },
      {
        name: 'Costo por lead',
        formula: 'Inversión ÷ Leads',
        note: 'Cuánto costó generar cada consulta.',
      },
      {
        name: 'Costo de adquisición de cliente',
        formula: 'Inversión ÷ Conversiones',
        note: 'Cuánto costó conseguir cada cliente de pago.',
      },
      {
        name: 'Tasa de conversión de leads',
        formula: 'Conversiones ÷ Leads × 100',
        note: 'La parte de las consultas que terminó en cliente.',
      },
      {
        name: 'Ingresos de equilibrio',
        formula: 'Igual a la inversión',
        note: 'El punto en el que el marketing se pagó solo, sin dejar ganancia.',
      },
    ],
  },
  whyUse: {
    h2: 'Por qué usar esta calculadora',
    subtitle: 'Es rápida y puedes poner cifras reales sin preocuparte por adónde van.',
    freeTitle: 'Gratis, sin registro',
    freeBody: 'No te pedimos correo ni tienes que crear una cuenta. Abre la página y úsala.',
    privateTitle: 'Tus cifras siguen siendo tuyas',
    privateBody:
      'Todo el cálculo se hace en tu navegador. No recibimos nada de lo que escribes y no se guarda nada.',
    completeTitle: 'Más de una métrica',
    completeBody: 'El ROI solo esconde mucho, así que también ves el ROAS, el CPL, el CAC y la tasa de conversión.',
    instantTitle: 'Se actualiza mientras escribes',
    instantBody: 'Cambia un campo y lo demás se recalcula, así puedes probar escenarios sin empezar de cero.',
  },
  attribution: {
    h2: 'La mayoría de los cálculos de ROI fallan en el mismo punto',
    body:
      'La fórmula es sencilla. El problema está en la cifra de ingresos. Cuando las ventas pasan por canales que tu CRM no ve, esos ingresos quedan fuera del cálculo y el canal que los generó parece peor de lo que es.',
    point1: 'Las conversaciones de venta por WhatsApp muchas veces ni llegan al CRM.',
    point2: 'Los ingresos sin origen registrado no se asignan a nadie, o se asignan al canal equivocado.',
    point3: 'Luego el presupuesto se va a los canales que salen en los informes, aunque sea otro el que vende.',
    cta: 'Mira cómo Eazybe sincroniza WhatsApp con tu CRM',
  },
  faq: {
    h2: 'Preguntas frecuentes',
    subtitle: 'Lo que más se pregunta sobre el ROI de marketing y sobre esta herramienta.',
    items: [
      {
        q: '¿Qué es el ROI de marketing?',
        a: 'El ROI de marketing es el retorno del dinero que inviertes en marketing, expresado en porcentaje. A los ingresos que generó le restas la inversión, divides entre la inversión y multiplicas por 100. Un ROI del 0% quiere decir que recuperaste el dinero y nada más.',
      },
      {
        q: '¿Cómo se calcula el ROI de marketing?',
        a: 'Toma los ingresos atribuidos a tu marketing, resta la inversión total, divide el resultado entre la inversión y multiplica por 100. Si invertiste 10.000 y eso generó 40.000, tu ROI es (40.000 − 10.000) ÷ 10.000 × 100, es decir, un 300%.',
      },
      {
        q: '¿Qué es el ROAS y en qué se diferencia del ROI?',
        a: 'El ROAS son los ingresos divididos entre la inversión, expresados como múltiplo y no como porcentaje. No descuenta el costo, así que un ROAS de 1x significa que solo recuperaste lo invertido, lo que equivale a un ROI del 0%. Invertir 10.000 para generar 40.000 da un ROAS de 4x y un ROI del 300%: dos formas de describir el mismo resultado.',
      },
      {
        q: '¿Qué cuenta como inversión en marketing?',
        a: 'Todo lo que hizo falta para llevar a cabo la actividad: presupuesto de medios, software, agencia o freelancers y el costo en sueldos de quienes hicieron el trabajo. Si solo cuentas el presupuesto de medios, el ROI se verá más alto de lo que es en realidad.',
      },
      {
        q: '¿Qué son los ingresos de equilibrio?',
        a: 'Son los ingresos que necesitas para cubrir lo que invertiste, sin que sobre nada. Equivalen a tu inversión total en marketing. Por debajo de esa cifra la actividad perdió dinero; por encima, lo ganó.',
      },
      {
        q: '¿Cómo se calcula el costo por lead?',
        a: 'Divide la inversión total en marketing entre el número de leads generados. Si invertiste 5.000 y conseguiste 250 leads, tu costo por lead es 20.',
      },
      {
        q: '¿Qué es el CAC y en qué se diferencia del costo por lead?',
        a: 'El costo por lead es lo que pagaste por cada consulta. El CAC es lo que pagaste por cada persona que de verdad compró, así que divide la misma inversión entre las conversiones y no entre los leads. El CAC nunca es menor que el costo por lead, y la diferencia entre ambos muestra cuántas consultas pierde tu proceso comercial antes de la venta.',
      },
      {
        q: '¿Cómo se calcula la tasa de conversión de leads?',
        a: 'Divide las conversiones entre los leads y multiplica por 100. Si 250 leads se convirtieron en 25 clientes, tu tasa de conversión es del 10%.',
      },
      {
        q: '¿Qué es un buen ROI de marketing?',
        a: 'No hay una cifra que sirva para todos los negocios, porque depende de tus márgenes y de lo largo que sea tu ciclo de venta. Es más útil seguir tu propio ROI a lo largo del tiempo y comparar canales con la misma definición de inversión e ingresos atribuidos.',
      },
      {
        q: '¿La calculadora es gratuita y se guardan mis datos?',
        a: 'Es gratuita y no pide registro. El cálculo se hace en tu navegador, así que las cifras que escribes nunca nos llegan y no se guarda nada.',
      },
    ],
  },
  finalCta: {
    h2: 'Descubre qué conversaciones generaron realmente los ingresos',
    body:
      'Eazybe sincroniza las conversaciones de WhatsApp con HubSpot, Salesforce, Zoho, Pipedrive y otros CRM. Así, las ventas cerradas por chat aparecen en tus informes con su origen correcto, en lugar de quedarse fuera.',
    primary: 'Empezar gratis',
    secondary: 'Reservar demo',
  },
}

const tr: RoiPageContent = {
  meta: {
    title: 'Pazarlama ROI Hesaplayıcı — ROI, ROAS ve CPL Aracı | Eazybe',
    description:
      'Ücretsiz pazarlama ROI hesaplayıcı. Harcama ve geliri girin; ROI, ROAS, lead başına maliyet, CAC ve dönüşüm oranını hemen görün. Kayıt gerekmez.',
    ogDescription:
      'Pazarlama ROI, ROAS, lead başına maliyet ve CAC değerlerini birkaç saniyede hesaplayın. Ücretsiz, kayıtsız ve tarayıcınızda çalışır.',
  },
  breadcrumb: { home: 'Ana Sayfa', current: 'Pazarlama ROI Hesaplayıcı' },
  hero: {
    tag: 'Ücretsiz Araç',
    h1Lead: 'Pazarlama ROI',
    h1Highlight: 'Hesaplayıcı',
    subtitle:
      'Ne kadar harcadığınızı ve bunun ne kadar geri getirdiğini girin, ROI ve ROAS hemen çıksın. Lead ve dönüşüm sayılarını da eklerseniz lead başına maliyet, CAC ve dönüşüm oranı da hesaplanır. Tüm formüller sayfada, hesabı kendiniz kontrol edebilirsiniz.',
    cta: "ROI'mi hesapla",
    footnote: 'Ücretsiz, kayıt yok. Hesaplama tarayıcınızda yapılır ve yazdıklarınız bize gönderilmez.',
  },
  calculator: {
    h2: "Pazarlama ROI'nizi hesaplayın",
    subtitle: 'Harcama ve gelir zorunlu. Lead ve dönüşüm eklerseniz diğer metrikler de görünür.',
    inputsTitle: 'Rakamlarınız',
    currencyLabel: 'Para birimi',
    spendLabel: 'Toplam pazarlama harcaması',
    spendHint: 'Ölçtüğünüz dönemdeki reklam, araç, ajans ve maaş giderleri.',
    revenueLabel: 'Pazarlamaya atfedilen gelir',
    revenueHint: 'Yalnızca bu harcamaya bağlayabildiğiniz gelir.',
    leadsLabel: 'Oluşan lead sayısı',
    leadsHint: "Bu harcamadan gelen talepler, kayıtlar veya MQL'ler.",
    conversionsLabel: 'Dönüşümler',
    conversionsHint: 'Ödeme yapan müşteriye dönüşen leadler.',
    optional: 'isteğe bağlı',
    btnReset: 'Sıfırla',
    resultsTitle: 'Sonuçlarınız',
    emptyState: "ROI'nizi görmek için harcamayı ve atfedilen geliri girin.",
    errorSpendZero: 'Sıfırdan büyük bir pazarlama harcaması girin.',
    errorConversionsExceedLeads: 'Dönüşüm sayısı lead sayısından fazla olamaz.',
    roiLabel: 'Pazarlama ROI',
    roiHelp: 'Net getirinin harcamaya oranı, yüzde olarak.',
    roasLabel: 'ROAS',
    roasHelp: 'Gelirin harcamaya bölümü, kat olarak.',
    revenuePerLabel: 'Harcanan 1 birim başına gelir',
    revenuePerHelp: 'Harcanan her birimin geri getirdiği tutar.',
    profitLabel: 'Net getiri',
    profitHelp: 'Atfedilen gelirden harcama düşülünce kalan.',
    cplLabel: 'Lead başına maliyet',
    cplHelp: 'Harcamanın oluşan lead sayısına bölümü.',
    cacLabel: 'Müşteri edinme maliyeti',
    cacHelp: 'Harcamanın dönüşüm sayısına bölümü.',
    convRateLabel: 'Lead dönüşüm oranı',
    convRateHelp: 'Leadlerin yüzde kaçının müşteriye dönüştüğü.',
    breakevenLabel: 'Başabaş geliri',
    breakevenHelp: 'Harcamayı karşılamak için en az elde etmeniz gereken gelir.',
    verdictProfit: 'Bu harcama, maliyetinden fazlasını geri getiriyor.',
    verdictBreakeven: 'Bu harcama aşağı yukarı kendini çıkarıyor.',
    verdictLoss: 'Bu harcama, getirdiğinden fazlasına mal oluyor.',
    notEnoughData: 'Bunu görmek için lead ve dönüşüm ekleyin.',
  },
  howTo: {
    h2: 'Pazarlama ROI nasıl hesaplanır',
    subtitle: 'Formül işin kolay kısmı. Sonucu üç rakam belirler ve her birini doğru girmek gerekir.',
    step1Title: 'Harcadığınız her şeyi toplayın',
    step1Body:
      "Reklam bütçesi, yazılım, ajans ücretleri ve işi yürüten ekibin maaş maliyeti. Maaşları dışarıda bırakırsanız ROI'niz olduğundan iyi görünür.",
    step2Title: 'Geliri dürüstçe atfedin',
    step2Body:
      "Yalnızca o harcamaya bağlayabildiğiniz geliri sayın. Takip etmediğiniz bir kanaldan kapanan satış burada görünmez ve gerçek ROI'niz ekrandaki rakamdan yüksek olur.",
    step3Title: 'Bölün, sonra kontrol edin',
    step3Body:
      'ROI = (gelir − harcama) ÷ harcama. Sonuç gerçek olamayacak kadar iyi ya da kötü görünüyorsa önce atfı kontrol edin. Hata nadiren hesaptadır.',
  },
  formulas: {
    h2: 'Her rakamın arkasındaki formüller',
    subtitle: 'Yukarıdaki her sonuç bunlardan birinden çıkıyor. Kendi rakamlarınızla deneyin.',
    items: [
      {
        name: 'Pazarlama ROI',
        formula: '(Gelir − Harcama) ÷ Harcama × 100',
        note: 'Yüzde olarak. %100, paranızı ikiye katladınız demektir.',
      },
      {
        name: 'ROAS',
        formula: 'Gelir ÷ Harcama',
        note: 'Reklam harcamasının getirisi, kat olarak. 3x, harcanan her 1 birime karşılık 3 birim geri gelmesi demektir.',
      },
      {
        name: 'Lead başına maliyet',
        formula: 'Harcama ÷ Lead',
        note: 'Her bir talebi oluşturmanın maliyeti.',
      },
      {
        name: 'Müşteri edinme maliyeti',
        formula: 'Harcama ÷ Dönüşüm',
        note: 'Ödeme yapan her müşteriyi kazanmanın maliyeti.',
      },
      {
        name: 'Lead dönüşüm oranı',
        formula: 'Dönüşüm ÷ Lead × 100',
        note: 'Taleplerin ne kadarının müşteriye dönüştüğü.',
      },
      {
        name: 'Başabaş geliri',
        formula: 'Harcamaya eşittir',
        note: 'Pazarlamanın masrafını çıkardığı ama üstüne kâr bırakmadığı nokta.',
      },
    ],
  },
  whyUse: {
    h2: 'Neden bu hesaplayıcı',
    subtitle: 'Hızlıdır ve gerçek rakamlarınızı nereye gideceğini düşünmeden girebilirsiniz.',
    freeTitle: 'Ücretsiz, kayıt yok',
    freeBody: 'E-posta istemiyoruz, hesap açmanız da gerekmiyor. Sayfayı açıp kullanın.',
    privateTitle: 'Rakamlarınız sizde kalır',
    privateBody:
      'Hesaplamanın tamamı tarayıcınızda yapılır. Yazdıklarınız bize ulaşmaz ve hiçbir yerde saklanmaz.',
    completeTitle: 'Tek bir metrikten fazlası',
    completeBody: 'ROI tek başına çok şeyi gizler. Bu yüzden ROAS, CPL, CAC ve dönüşüm oranınızı da görürsünüz.',
    instantTitle: 'Siz yazdıkça güncellenir',
    instantBody: 'Bir alanı değiştirdiğinizde gerisi yeniden hesaplanır, farklı senaryoları baştan başlamadan deneyebilirsiniz.',
  },
  attribution: {
    h2: 'ROI hesaplarının çoğu aynı yerde yanılıyor',
    body:
      "Formül basit. Sorun gelir rakamında. Satışlar CRM'inizin görmediği kanallarda gerçekleşiyorsa o gelir hesaba girmez ve onu getiren kanal olduğundan kötü görünür.",
    point1: "WhatsApp'taki satış konuşmaları çoğu zaman CRM'e hiç ulaşmaz.",
    point2: 'Kaynağı kayıtlı olmayan gelir hiçbir kanala yazılmaz ya da yanlış kanala yazılır.',
    point3: 'Sonra bütçe, satışı başka bir kanal getirse bile raporlarda görünen kanallara kayar.',
    cta: "Eazybe'nin WhatsApp'ı CRM'inize nasıl senkronize ettiğini görün",
  },
  faq: {
    h2: 'Sıkça sorulan sorular',
    subtitle: 'Pazarlama ROI ve bu aracın nasıl çalıştığı hakkında en çok sorulanlar.',
    items: [
      {
        q: 'Pazarlama ROI nedir?',
        a: 'Pazarlama ROI, pazarlamaya harcadığınız paranın getirisidir ve yüzde olarak ifade edilir. Elde edilen gelirden harcamayı çıkarır, sonucu harcamaya böler ve 100 ile çarparsınız. %0 ROI, paranızı geri aldığınızı ama üstüne bir şey kazanmadığınızı gösterir.',
      },
      {
        q: 'Pazarlama ROI nasıl hesaplanır?',
        a: "Pazarlamaya atfedilen geliri alın, toplam harcamayı çıkarın, sonucu harcamaya bölün ve 100 ile çarpın. 10.000 harcayıp 40.000 gelir elde ettiyseniz ROI'niz (40.000 − 10.000) ÷ 10.000 × 100, yani %300 olur.",
      },
      {
        q: "ROAS nedir ve ROI'den farkı nedir?",
        a: "ROAS, gelirin harcamaya bölümüdür ve yüzde yerine kat olarak gösterilir. Maliyeti düşmediği için 1x ROAS yalnızca başabaş demektir, bu da %0 ROI'ye karşılık gelir. 40.000 kazanmak için 10.000 harcamak 4x ROAS ve %300 ROI eder; ikisi aynı sonucun iki farklı ifadesidir.",
      },
      {
        q: 'Pazarlama harcamasına neler dahildir?',
        a: 'Faaliyeti yürütmek için gereken her şey: reklam bütçesi, yazılım, ajans veya serbest çalışan ücretleri ve işi yapan kişilerin maaş maliyeti. Yalnızca reklam bütçesini sayarsanız ROI olduğundan yüksek görünür.',
      },
      {
        q: 'Başabaş geliri nedir?',
        a: 'Harcadığınızı karşılayan ama geriye bir şey bırakmayan gelir tutarıdır. Toplam pazarlama harcamanıza eşittir. Bunun altında kalırsanız faaliyet zarar etmiş, üstüne çıkarsanız kâr etmiştir.',
      },
      {
        q: 'Lead başına maliyet nasıl hesaplanır?',
        a: 'Toplam pazarlama harcamasını oluşan lead sayısına bölün. 5.000 harcayıp 250 lead elde ettiyseniz lead başına maliyetiniz 20 olur.',
      },
      {
        q: 'CAC nedir, lead başına maliyetten farkı nedir?',
        a: "Lead başına maliyet, her bir talep için ödediğiniz tutardır. CAC ise gerçekten satın alan her kişi için ödediğiniz tutardır; aynı harcamayı lead sayısına değil, dönüşüm sayısına böler. CAC hiçbir zaman lead başına maliyetten düşük olmaz ve aradaki fark, satış sürecinizin satışa kadar kaç talebi kaybettiğini gösterir.",
      },
      {
        q: 'Lead dönüşüm oranı nasıl hesaplanır?',
        a: "Dönüşüm sayısını lead sayısına bölüp 100 ile çarpın. 250 lead'den 25 müşteri çıktıysa dönüşüm oranınız %10'dur.",
      },
      {
        q: 'İyi bir pazarlama ROI nedir?',
        a: "Her işletmeye uyan tek bir rakam yoktur, çünkü bu kâr marjınıza ve satış döngünüzün uzunluğuna bağlıdır. Kendi ROI'nizin zaman içinde nasıl değiştiğini izlemek ve kanalları aynı harcama ve gelir tanımıyla karşılaştırmak daha faydalıdır.",
      },
      {
        q: 'Bu hesaplayıcı ücretsiz mi, verilerim saklanıyor mu?',
        a: 'Ücretsizdir ve kayıt gerektirmez. Hesaplama tarayıcınızda yapılır, bu yüzden girdiğiniz rakamlar bize gönderilmez ve hiçbir şey saklanmaz.',
      },
    ],
  },
  finalCta: {
    h2: 'Geliri gerçekte hangi konuşmaların getirdiğini bilin',
    body:
      'Eazybe, WhatsApp konuşmalarını HubSpot, Salesforce, Zoho, Pipedrive ve diğer CRM sistemlerine senkronize eder. Böylece sohbette kapanan satışlar raporlarınızın dışında kalmaz, doğru kaynağa yazılır.',
    primary: 'Ücretsiz başla',
    secondary: 'Demo planla',
  },
}

export const ROI_CONTENT_BY_LOCALE: Record<string, RoiPageContent> = { en, br, es, tr }

export function getRoiPageContent(locale: string): RoiPageContent {
  return ROI_CONTENT_BY_LOCALE[locale] ?? en
}
