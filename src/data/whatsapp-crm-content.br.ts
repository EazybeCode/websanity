import type { PageContent } from './whatsapp-crm-content'

/**
 * pt-BR copy for /br/lp/whatsapp-crm.
 *
 * The supplied translation covers the hero, value cards, differentiator,
 * speed and FAQ verbatim. Everything the brief did not cover — form labels,
 * error states, the Why band, the radar and sync sections, the interface
 * mocks — is translated to match, in the same register: direct, second
 * person, no marketing throat-clearing.
 *
 * Testimonial quotes are translated rather than left in English: a Brazilian
 * buyer reading Portuguese should not hit three English sentences. They are
 * the same three quotes the homepage publishes, so if you later show the
 * originals anywhere, keep the pairing consistent.
 */
export const content: PageContent = {
  meta: {
    title: 'WhatsApp no CRM — sincronize cada conversa com HubSpot, Pipedrive, Zoho | Eazybe',
    description:
      'Cada conversa, arquivo e áudio do WhatsApp sincronizado automaticamente no seu CRM. Sua equipe mantém o próprio número e celular. Conecte seu CRM em minutos.',
  },

  nav: { cta: 'Conectar meu CRM' },

  hero: {
    h1Lead: 'Conversas do WhatsApp dentro do',
    h1Crm: 'seu CRM',
    h1Tail: '— sem trocar de número',
    h2: 'Cada conversa, arquivo e áudio sincronizado automaticamente no HubSpot, Pipedrive, Zoho, Bitrix24 ou Salesforce. Sua equipe segue usando o WhatsApp do próprio celular — nada muda na rotina.',
    cta: 'Conectar meu CRM',
    microcopy: 'Sem cartão de crédito. A configuração leva minutos, não é um projeto de TI.',
    bullets: [
      'Mesmo número, mesmo celular — nada para a equipe adotar',
      'No ar no mesmo dia, não é projeto de TI',
      'Conversas pessoais nunca sincronizam. Etiquetas decidem o que sincroniza.',
    ],
    stackTitle: 'Todos os CRMs',
    stackNote: 'Conectados nativamente',
  },

  form: {
    thankYouUrl: 'https://eazybe.info/m2v',
    title: 'Conecte seu CRM',
    subtitle: 'Conte para onde suas conversas do WhatsApp devem ir. Falamos com você hoje.',
    email: 'E-mail corporativo',
    phone: 'Telefone',
    crm: 'Seu CRM',
    crmPlaceholder: 'Selecione',
    country: 'País',
    crmOptions: ['HubSpot', 'Pipedrive', 'Zoho', 'Bitrix24', 'Salesforce', 'Outro / ainda não tenho'],
    // Empty on purpose: picking "Outro / ainda não tenho" does NOT disable
    // submit here. A team still choosing a CRM is a lead worth having —
    // Eazybe connects to five of them and they are about to pick one.
    noCrmValue: '',
    noCrmNote:
      'A Eazybe conecta a um CRM que você já usa. Escolha o seu acima, ou fale com a gente que ajudamos a escolher.',
    errors: {
      email: 'Digite um e-mail válido.',
      emailPersonal: 'Use seu e-mail corporativo, não um e-mail pessoal.',
      phone: 'Digite um telefone válido.',
      phoneShort: 'Esse número parece curto — inclua o DDD.',
      crm: 'Escolha seu CRM.',
    },
    sending: 'Conectando…',
    success: {
      title: 'Recebemos — falamos com você hoje.',
      body: 'Confira seu e-mail: enviamos o link de conexão. Se preferir conversar antes, responda esse e-mail que ligamos.',
      redirecting: 'Abrindo o WhatsApp…',
    },
    error: 'Algo deu errado. Tente de novo.',
  },

  socialProof: {
    heading: 'Já usam o WhatsApp dentro do CRM',
    logos: [
      { src: '/clients/university-living-logo.svg', alt: 'University Living' },
      { src: '/clients/pw-logo.svg', alt: 'Physics Wallah' },
      { src: '/clients/satrack-logo.svg', alt: 'Satrack' },
      { src: '/clients/orbidi-logo.svg', alt: 'Orbidi' },
      { src: '/clients/travclan-logo.svg', alt: 'TravClan' },
      { src: '/clients/wanderon-logo.svg', alt: 'WanderOn' },
      { src: '/clients/uniacco-logo.svg', alt: 'Uniacco' },
      { src: '/clients/kreedo-logo.svg', alt: 'Kreedo' },
    ],
  },

  why: {
    eyebrow: 'Por que Eazybe',
    heading: 'A decisão inteira, em quatro números',
    subline:
      'Sem número novo, sem migração, sem implantação de seis semanas. É isso que muda no dia em que o WhatsApp começa a rodar dentro do seu CRM.',
  },

  stats: [
    { tag: 'Alcance', value: '40+', label: 'países usando o WhatsApp dentro do CRM', tbd: true },
    { tag: 'Integrações', value: 'Todos', label: 'CRMs conectados nativamente, mais API e webhook', tbd: false },
    { tag: 'Implantação', value: 'No mesmo dia', label: 'da instalação à primeira conversa sincronizada', tbd: false },
    { tag: 'Migração', value: '0', label: 'números migrados — a equipe mantém o que já usa', tbd: false },
  ],

  value: {
    heading: 'Tudo que acontece no WhatsApp — enfim visível, mensurável e seu',
    sections: [
      {
        id: 'visibility',
        visual: 'sync',
        eyebrow: 'Visibilidade',
        title: 'Nada mais fica só no celular do vendedor',
        lead:
          'Cada conversa, áudio e arquivo vai para o contato e o negócio automaticamente, no momento em que acontece. Abra qualquer registro e leia a relação inteira — da primeira à última mensagem — sem pedir print para ninguém.',
        points: [
          'Mensagens, arquivos e áudios anexados ao registro certo',
          'Etiquetas decidem o que sincroniza. Sem etiqueta, nada sai do celular.',
          'Roda no número que o vendedor já usa',
        ],
      },
      {
        id: 'analytics',
        visual: 'activity',
        eyebrow: 'Análises',
        title: 'Saiba quem realmente trabalha',
        lead:
          'Mensagens enviadas, conversas sem resposta, tempo médio de resposta — por vendedor, por dia. É a camada de atividade que seu CRM nunca teve, porque o trabalho acontecia em um app que ele não enxergava.',
        points: [
          'Mensagens enviadas e tempo médio de resposta, por vendedor',
          'Conversas sem resposta aparecem antes de o cliente desistir',
          'Compare uma semana com a anterior',
        ],
      },
      {
        id: 'control',
        visual: 'promise',
        eyebrow: 'Controle',
        title: 'Pegue o problema enquanto ainda dá tempo',
        lead:
          'O desconto que ninguém aprovou. O prazo que ninguém cumpre. A objeção que nunca chegou ao CRM. Você lê o que foi realmente prometido enquanto ainda dá para fazer algo a respeito.',
        points: [
          'Leia a conversa por trás do negócio, não um resumo dela',
          'Veja o compromisso antes de ele virar nota fiscal',
          'Entre antes de virar negócio perdido, não depois',
        ],
      },
      {
        id: 'ownership',
        visual: 'handover',
        eyebrow: 'Propriedade',
        title: 'Vendedor sai. Cliente fica.',
        lead:
          'Quando alguém pede demissão, a relação não vai embora junto com o celular. O histórico é da empresa. Transfira a conversa e quem assumir vê tudo que veio antes.',
        points: [
          'O histórico fica no registro, não no aparelho',
          'Transfira uma conta sem perder o contexto',
          'Quem assume lê a conversa inteira no primeiro dia',
        ],
      },
    ],
    cta: 'Colocar WhatsApp no meu CRM',
  },

  differentiator: {
    heading: 'O cliente não responde a empresas. Responde a pessoas.',
    kicker: 'Três linhas. É isso.',
    lines: [
      { text: 'Migre para uma plataforma → as respostas somem.', resolved: false },
      { text: 'Fique no WhatsApp normal → sem automação, sem sync, sem escala.', resolved: false },
      { text: 'A Eazybe roda os dois no mesmo número, ao mesmo tempo.', resolved: true },
    ],
    subline:
      'Sua equipe conversa do próprio celular, como hoje. Você ganha disparos, fluxos e sync total com o CRM — em uma conexão oficial que não bloqueia o número.',
    table: {
      headLeft: 'O dilema em que você está preso',
      headRight: 'Com a Eazybe',
      rows: [
        ['Plataforma — respostas somem', 'Equipe conversa do próprio celular'],
        ['WhatsApp normal — sem automação', 'Disparos, fluxos, sync com CRM'],
        ['Ferramentas não oficiais — bloqueio', 'Conexão oficial e em conformidade'],
        ['Número novo — clientes perdidos', 'O número que você já usa'],
      ],
    },
    cta: 'Quero os Dois',
  },

  radar: {
    eyebrow: 'Sem resposta',
    heading: 'Os negócios que você está perdendo estão em conversas não lidas',
    lead:
      'Ninguém decidiu ignorar. O vendedor estava em reunião, a mensagem chegou 19h40 e de manhã já estava enterrada sob outras quarenta. O funil continua dizendo que o negócio está aberto.',
    points: [
      'Sem resposta há dois dias, sinalizado na própria conversa',
      'Preço pedido e nunca enviado. Follow-up prometido e esquecido.',
      'Cada alerta com o nome do responsável, visível para o gestor',
    ],
    media: {
      // Portuguese cut of the clip — the flags inside it read
      // "Preços não enviados", "Follow-up esquecido", "Sem resposta · 2 dias",
      // which is what the three bullets beside it describe.
      webm: '/whatsapp-crm/bea-radar-pt.webm',
      mp4: '/whatsapp-crm/bea-radar-pt.mp4',
      poster: '/whatsapp-crm/bea-radar-pt-poster.jpg',
      alt:
        'Lista de conversas do WhatsApp com alertas nas que estão sem resposta — sem resposta há dois dias, preço não enviado, follow-up esquecido — cada uma com o vendedor responsável',
      width: 760,
      height: 760,
    },
  },

  productClip: {
    webm: '/whatsapp-crm/product.webm',
    mp4: '/whatsapp-crm/product.mp4',
    poster: '/whatsapp-crm/product-poster.jpg',
    alt:
      'Eazybe dentro do WhatsApp: a conversa à esquerda e, à direita, um painel Eazybe AI Analysis onde a IA preencheu estado da conversa, urgência, etapa e intenção e escreveu um resumo curto do que o vendedor precisa fazer em seguida',
    caption: 'A Eazybe lendo uma conversa real, preenchendo os campos do CRM ao lado e resumindo o próximo passo.',
    width: 1112,
    height: 492,
  },

  sync: {
    heading: 'Cada conversa direcionada para o sistema que você já usa',
    features: ['Sync em tempo real', 'Etiquetas decidem o que sincroniza', '5 CRMs nativos, mais API'],
  },

  speed: {
    heading: 'Todo lead respondido em segundos. Até às 2h.',
    subline: 'Negócio "em andamento" e mensagem sem resposta desde sexta são a mesma coisa.',
    blocks: [
      { title: 'Resposta na hora', body: 'A IA responde assim que o lead escreve. Noite, fim de semana, reunião.' },
      { title: 'Pré-qualificado', body: 'Orçamento, intenção, prazo — captados antes do vendedor abrir.' },
      { title: 'Direto no CRM', body: 'Contato criado. Campos preenchidos. Negócio criado.' },
      { title: 'Assume na hora', body: 'O vendedor assume no meio da conversa. Ninguém percebe.' },
    ],
    closing: 'Quem responde primeiro ganha. A sua é sempre a primeira.',
    cta: 'Responda Enquanto Dorme',
  },

  testimonials: {
    heading: 'Times que pararam de adivinhar',
    items: [
      {
        initials: 'PS',
        photo: '/avatars/priya.jpg',
        quote:
          'Nosso HubSpot era um cemitério. A Eazybe trouxe ele de volta à vida — todo negócio do WhatsApp entra automaticamente.',
        name: 'Priya Sharma',
        role: 'Head de Sales Ops · SaaS · Índia',
      },
      {
        initials: 'DF',
        photo: '/avatars/diego.jpg',
        quote:
          'Meus vendedores pararam de copiar e colar conversa no Salesforce. Só isso já pagou o ano.',
        name: 'Diego Fernández',
        role: 'Diretor comercial · Imobiliário · Espanha',
      },
      {
        initials: 'CO',
        photo: '/avatars/camila.jpg',
        quote: 'A configuração levou 12 minutos. Doze. Nossa implantação de CRM levou seis meses.',
        name: 'Camila Ortiz',
        role: 'Head de RevOps · Logística · México',
      },
    ],
  },

  /** Strings inside the four interface mocks. */
  visuals: {
    /**
     * Three metrics, four reps. Every total is the sum (or mean) of the rep
     * values beside it — 142+97+88+31 = 358, 1+2+3+6 = 12, and the four
     * response times average to 4m 12s — so a visitor who checks the maths
     * finds it holds. `value` drives bar length, `display` is what is read.
     * All illustrative, and the caption says so.
     */
    activity: {
      metrics: [
        {
          id: 'sent', label: 'Mensagens enviadas', total: '358', higherIsBetter: true,
          reps: [
            { name: 'Ana', value: 142, display: '142' },
            { name: 'Bruno', value: 97, display: '97' },
            { name: 'Camila', value: 88, display: '88' },
            { name: 'Diego', value: 31, display: '31' },
          ],
        },
        {
          id: 'unreplied', label: 'Sem resposta', total: '12', higherIsBetter: false,
          reps: [
            { name: 'Ana', value: 1, display: '1' },
            { name: 'Bruno', value: 2, display: '2' },
            { name: 'Camila', value: 3, display: '3' },
            { name: 'Diego', value: 6, display: '6' },
          ],
        },
        {
          id: 'avg', label: 'Tempo médio', total: '4m 12s', higherIsBetter: false,
          reps: [
            { name: 'Ana', value: 65, display: '1m 05s' },
            { name: 'Bruno', value: 160, display: '2m 40s' },
            { name: 'Camila', value: 260, display: '4m 20s' },
            { name: 'Diego', value: 525, display: '8m 45s' },
          ],
        },
      ],
    },
    contact: 'Contato · Marina Alves',
    messages: '3 mensagens',
    voice: 'Áudio · 0:24',
    file: 'proposta-v2.pdf',
    today: 'Hoje',
    synced: 'Sincronizado',
    team: 'Atividade do time · últimos 7 dias',
    byRep: 'Mensagens enviadas · por vendedor',
    illustrative: 'Números ilustrativos — o relatório mostra seus vendedores e seus números.',
    deal: 'Negócio · Plano Enterprise · 12 licenças',
    objection: 'Sinceramente, o preço está acima do que orçamos para este trimestre.',
    reply: 'Sem problema —',
    promise: 'Consigo 25% de desconto se fechar até sexta.',
    sentBy: 'Enviado por Ana · 16:48',
    caught: 'Você está lendo isso na terça — não na nota fiscal do mês que vem.',
    account: 'Conta · Marina Alves',
    owner: 'Responsável',
    left: 'saiu da empresa',
    nowOwns: 'assumiu',
    history: 'Histórico da conversa · inalterado',
    h1: '48 mensagens · mar – ago',
    h2: '6 arquivos, 3 áudios',
    h3: 'Cada preço discutido, ainda no registro',
  },

  trust: [
    'Configuração no mesmo dia',
    'Onboarding acompanhado',
    'Conformidade com LGPD e GDPR',
    'Conversas pessoais nunca sincronizam',
  ],

  faq: {
    eyebrow: 'Dúvidas',
    heading: 'As perguntas que recebemos antes de cada conexão',
    subline:
      'Configuração, CRMs suportados, segurança e o que muda de fato na rotina da sua equipe. Ficou com dúvida? Pergunte no formulário que respondemos hoje.',
    footer: { text: 'Não encontrou sua resposta?', cta: 'Fale com a gente' },
    items: [
      {
        q: 'Minha equipe precisa trocar de número, celular ou rotina?',
        a: 'Não. Mesmo número, mesmo celular, mesmo app. A única diferença é que tudo agora aparece no seu CRM. Projetos de WhatsApp morrem na adoção — aqui não há o que adotar.',
      },
      {
        q: 'WhatsApp normal ou só número de API oficial?',
        a: 'Os dois, no mesmo número e ao mesmo tempo. Toda alternativa obriga a migrar só para API — e é aí que a conversa fica robótica e as respostas param.',
      },
      {
        q: 'Meu número ainda pode ser bloqueado?',
        a: 'Conexão oficial, templates aprovados e orientação sobre volume de envio. Se você já perdeu um número, é exatamente esse problema que resolvemos.',
      },
      {
        q: 'Conversas pessoais também sincronizam?',
        a: 'Não. Etiquetas controlam o que sincroniza. Sem etiqueta, nada chega ao CRM. O pessoal segue pessoal — a primeira dúvida da sua equipe.',
      },
      {
        q: 'Quais CRMs?',
        a: 'HubSpot, Pipedrive, Zoho, Bitrix24 e Salesforce nativamente. Outros via API e webhook. Você não fica preso se migrar.',
      },
      {
        q: 'Quanto custa e em quanto tempo estamos no ar?',
        a: 'A partir de {price} por usuário/mês, com desconto no anual. Extensão de navegador e uma autorização no CRM — a maioria roda no mesmo dia.',
      },
    ],
  },

  finalCta: {
    heading: 'Pare de adivinhar o que sua equipe fala no WhatsApp',
    subline: 'Mesmo número. Mesmos celulares. Toda conversa no CRM hoje à noite.',
    cta: 'Quero meu CRM Conectado',
  },

  stickyCta: 'Conectar meu CRM',

  footer: { links: ['Política de Privacidade', 'LGPD', 'Termos'] },

  hubspot: {
    portalId: '40009480',
    formId: 'db0e26e2-b980-4881-956e-4cdcb452df65',
    region: 'na1',
  },
}
