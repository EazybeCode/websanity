export interface AboutUsContent {
  breadcrumb: { home: string; aboutUs: string }
  hero: {
    badge: string
    headingStart: string
    headingHighlight: string
    paragraph: string
  }
  story: {
    badge: string
    headingStart: string
    headingHighlight: string
    paragraphs: string[]
  }
  founder: {
    badge: string
    headingStart: string
    headingHighlight: string
    quote: string
    quoteAttribution: string
    bio: string[]
    imageAlt: string
    founderName: string
    founderTitle: string
  }
  whyChoose: {
    badge: string
    headingStart: string
    headingHighlight: string
    cards: { title: string; description: string }[]
    mission: { title: string; description: string }
    vision: { title: string; description: string }
  }
}

const content: Record<string, AboutUsContent> = {
  en: {
    breadcrumb: { home: 'Home', aboutUs: 'About Us' },
    hero: {
      badge: 'About Eazybe',
      headingStart: 'Get To Know About',
      headingHighlight: 'EazyBe',
      paragraph: 'Eazybe is a CRM Integration Solution Provider and WhatsApp AI agents platform that helps businesses manage customer chats, automate follow-ups, sync data with CRMs, and manage their sales pipeline \u2014 all from one place.',
    },
    story: {
      badge: 'Our Story',
      headingStart: 'From A Simple Idea To The',
      headingHighlight: '#1 WhatsApp CRM',
      paragraphs: [
        'Eazybe started in 2022 with one clear idea \u2014 sales teams were spending too much time managing tools by using of talking to customers. Most conversations were happening on WhatsApp, but the data was scattered and teams were manually updating their CRM. We wanted to fix this problem.',
        'What started as a simple Chrome extension to connect WhatsApp with CRM systems gradually grew into a complete sales workspace. Today Eazybe is used by <strong class="text-white">25,000+ teams</strong> across 50+ countries to manage customer conversations, sales pipelines and team communication in one place.',
        'Today, teams use Eazybe to manage WhatsApp conversations, track leads, automate follow-ups, and keep their CRM updated automatically with tools like <a href="/hubspot-whatsapp-integration" style="color:#06B6D4;text-decoration:underline"><strong>HubSpot</strong></a>, <a href="/zoho-whatsapp-integration" style="color:#06B6D4;text-decoration:underline"><strong>Zoho</strong></a> and <a href="/salesforce-whatsapp-integration" style="color:#06B6D4;text-decoration:underline"><strong>Salesforce</strong></a> along with spreadsheets like <a href="/google-sheets-whatsapp-integration" style="color:#06B6D4;text-decoration:underline"><strong>Google Sheets</strong></a>.',
        'With <strong class="text-white">30,000+ reviews</strong> on the Chrome Web Store and a 4.9 rating, Eazybe has become one of the most trusted platforms for businesses that use WhatsApp for sales, support and customer communication.',
      ],
    },
    founder: {
      badge: 'Leadership',
      headingStart: 'Meet Our',
      headingHighlight: 'Founder',
      quote: '\u201cI believe every sales team deserves tools that are as fast and personal as the conversations they have. WhatsApp is where real selling happens \u2014 and Eazybe makes sure nothing falls through the cracks.\u201d',
      quoteAttribution: 'Sagar Dewan, Founder & CEO',
      bio: [
        '<strong class="text-white">Sagar Dewan</strong> is the Founder of <a href="/" style="color:#06B6D4;text-decoration:underline">Eazybe</a>, an entrepreneur and mentor who works on product strategy, CRM integrations, automation systems and WhatsApp AI Agents. He focuses on building technology that connects WhatsApp communication with CRM systems so businesses can manage sales, customer conversations, and data in one organized workspace.',
        'He founded <strong class="text-white">\u2018Eazybe Software Private Limited\u2019</strong>, the company that builds the Eazybe CRM integration and automation platform. This created manual work, lost leads, and no visibility for managers. This problem became the foundation for building Eazybe.',
        'As a founder he leads product direction, integrations, automation workflows and platform development. He also mentors the team on product and technology decisions and focuses on building systems that help businesses manage communication sales pipelines and customer data more efficiently through WhatsApp, CRM integrations, automation, and AI.',
        'Under his leadership Eazybe has grown into a platform that helps businesses manage WhatsApp conversations, sync data with CRMs, automate workflows and use AI agents to manage leads and customer communication.',
        'His belief is simple \u2014 technology and AI should assist human conversations, not replace them.',
      ],
      imageAlt: 'Sagar Dewan - Founder & CEO of Eazybe',
      founderName: 'Sagar Dewan',
      founderTitle: 'Founder & CEO',
    },
    whyChoose: {
      badge: 'Why Eazybe',
      headingStart: 'Why Teams Choose',
      headingHighlight: 'Eazybe',
      cards: [
        { title: 'WhatsApp-Native CRM', description: 'Built specifically for WhatsApp-first sales teams. Not a generic CRM with WhatsApp bolted on \u2014 a purpose-built platform.' },
        { title: 'Global Reach, Local Touch', description: 'Serving teams across 50+ countries with localized support in English, Portuguese, Spanish, and Turkish.' },
        { title: 'AI That Sells For You', description: 'Our WhatsApp AI agents qualify leads, detect cold deals, and suggest replies \u2014 so your team closes more, faster.' },
      ],
      mission: { title: 'Our Mission', description: 'Our mission is to eliminate the \u201cdark data\u201d gap between WhatsApp and the CRM by deploying AI agents that qualify, sync, and manage lead flows in real-time. We empower sales teams to turn every conversation into measurable revenue through intelligent CRM automation, ensuring that human expertise is always backed by a perfectly updated, AI-driven pipeline.' },
      vision: { title: 'Our Vision', description: 'Our vision is to define the global standard for AI-driven Conversational Commerce, creating a world where enterprise-grade CRM power lives wherever the customer is. We are building the unified workspace of the future \u2014 a platform where autonomous AI agents and human relationship-building converge to make business communication more personal, more efficient, and more profitable on a global scale.' },
    },
  },
  br: {
    breadcrumb: { home: 'In\u00edcio', aboutUs: 'Sobre N\u00f3s' },
    hero: {
      badge: 'Sobre a Eazybe',
      headingStart: 'Conhe\u00e7a a',
      headingHighlight: 'EazyBe',
      paragraph: 'A Eazybe \u00e9 uma provedora de solu\u00e7\u00f5es de integra\u00e7\u00e3o com CRM e plataforma de agentes de IA para WhatsApp que ajuda empresas a gerenciar conversas com clientes, automatizar follow-ups, sincronizar dados com CRMs e gerenciar seu pipeline de vendas \u2014 tudo em um s\u00f3 lugar.',
    },
    story: {
      badge: 'Nossa Hist\u00f3ria',
      headingStart: 'De Uma Ideia Simples Ao',
      headingHighlight: '#1 CRM para WhatsApp',
      paragraphs: [
        'A Eazybe come\u00e7ou em 2022 com uma ideia clara \u2014 equipes de vendas estavam gastando tempo demais gerenciando ferramentas ao inv\u00e9s de conversar com clientes. A maioria das conversas acontecia no WhatsApp, mas os dados estavam espalhados e as equipes atualizavam o CRM manualmente. Quer\u00edamos resolver esse problema.',
        'O que come\u00e7ou como uma simples extens\u00e3o do Chrome para conectar o WhatsApp com sistemas de CRM gradualmente se tornou um espa\u00e7o de trabalho completo para vendas. Hoje a Eazybe \u00e9 usada por <strong class="text-white">mais de 25.000 equipes</strong> em mais de 50 pa\u00edses para gerenciar conversas com clientes, pipelines de vendas e comunica\u00e7\u00e3o da equipe em um s\u00f3 lugar.',
        'Hoje, as equipes usam a Eazybe para gerenciar conversas no WhatsApp, rastrear leads, automatizar follow-ups e manter seu CRM atualizado automaticamente com ferramentas como <a href="/br/hubspot-whatsapp-integration" style="color:#06B6D4;text-decoration:underline"><strong>HubSpot</strong></a>, <a href="/br/zoho-whatsapp-integration" style="color:#06B6D4;text-decoration:underline"><strong>Zoho</strong></a> e <a href="/br/salesforce-whatsapp-integration" style="color:#06B6D4;text-decoration:underline"><strong>Salesforce</strong></a>, al\u00e9m de planilhas como <a href="/br/google-sheets-whatsapp-integration" style="color:#06B6D4;text-decoration:underline"><strong>Google Sheets</strong></a>.',
        'Com <strong class="text-white">mais de 30.000 avalia\u00e7\u00f5es</strong> na Chrome Web Store e uma classifica\u00e7\u00e3o de 4.9, a Eazybe se tornou uma das plataformas mais confi\u00e1veis para empresas que usam o WhatsApp para vendas, suporte e comunica\u00e7\u00e3o com clientes.',
      ],
    },
    founder: {
      badge: 'Lideran\u00e7a',
      headingStart: 'Conhe\u00e7a Nosso',
      headingHighlight: 'Fundador',
      quote: '\u201cAcredito que toda equipe de vendas merece ferramentas t\u00e3o r\u00e1pidas e pessoais quanto as conversas que eles t\u00eam. O WhatsApp \u00e9 onde as vendas reais acontecem \u2014 e a Eazybe garante que nada passe despercebido.\u201d',
      quoteAttribution: 'Sagar Dewan, Fundador e CEO',
      bio: [
        '<strong class="text-white">Sagar Dewan</strong> \u00e9 o Fundador da <a href="/br" style="color:#06B6D4;text-decoration:underline">Eazybe</a>, empreendedor e mentor que trabalha com estrat\u00e9gia de produto, integra\u00e7\u00f5es com CRM, sistemas de automa\u00e7\u00e3o e Agentes de IA para WhatsApp. Ele foca em construir tecnologia que conecta a comunica\u00e7\u00e3o do WhatsApp com sistemas de CRM para que as empresas possam gerenciar vendas, conversas com clientes e dados em um espa\u00e7o de trabalho organizado.',
        'Ele fundou a <strong class="text-white">\u2018Eazybe Software Private Limited\u2019</strong>, a empresa que desenvolve a plataforma de integra\u00e7\u00e3o com CRM e automa\u00e7\u00e3o da Eazybe. Isso gerava trabalho manual, leads perdidos e nenhuma visibilidade para os gestores. Esse problema se tornou a base para a constru\u00e7\u00e3o da Eazybe.',
        'Como fundador, ele lidera a dire\u00e7\u00e3o do produto, integra\u00e7\u00f5es, fluxos de trabalho de automa\u00e7\u00e3o e desenvolvimento da plataforma. Ele tamb\u00e9m orienta a equipe em decis\u00f5es de produto e tecnologia e foca em construir sistemas que ajudem as empresas a gerenciar pipelines de comunica\u00e7\u00e3o de vendas e dados de clientes de forma mais eficiente atrav\u00e9s do WhatsApp, integra\u00e7\u00f5es com CRM, automa\u00e7\u00e3o e IA.',
        'Sob sua lideran\u00e7a, a Eazybe cresceu e se tornou uma plataforma que ajuda empresas a gerenciar conversas no WhatsApp, sincronizar dados com CRMs, automatizar fluxos de trabalho e usar agentes de IA para gerenciar leads e comunica\u00e7\u00e3o com clientes.',
        'Sua cren\u00e7a \u00e9 simples \u2014 a tecnologia e a IA devem auxiliar as conversas humanas, n\u00e3o substitu\u00ed-las.',
      ],
      imageAlt: 'Sagar Dewan - Fundador e CEO da Eazybe',
      founderName: 'Sagar Dewan',
      founderTitle: 'Fundador e CEO',
    },
    whyChoose: {
      badge: 'Por Que a Eazybe',
      headingStart: 'Por Que as Equipes Escolhem a',
      headingHighlight: 'Eazybe',
      cards: [
        { title: 'CRM Nativo para WhatsApp', description: 'Constru\u00eddo especificamente para equipes de vendas que priorizam o WhatsApp. N\u00e3o \u00e9 um CRM gen\u00e9rico com WhatsApp adicionado \u2014 \u00e9 uma plataforma feita sob medida.' },
        { title: 'Alcance Global, Toque Local', description: 'Atendendo equipes em mais de 50 pa\u00edses com suporte localizado em ingl\u00eas, portugu\u00eas, espanhol e turco.' },
        { title: 'IA Que Vende Por Voc\u00ea', description: 'Nossos agentes de IA para WhatsApp qualificam leads, detectam neg\u00f3cios frios e sugerem respostas \u2014 para que sua equipe feche mais, mais r\u00e1pido.' },
      ],
      mission: { title: 'Nossa Miss\u00e3o', description: 'Nossa miss\u00e3o \u00e9 eliminar a lacuna de \u201cdados ocultos\u201d entre o WhatsApp e o CRM, implantando agentes de IA que qualificam, sincronizam e gerenciam fluxos de leads em tempo real. Capacitamos equipes de vendas a transformar cada conversa em receita mensur\u00e1vel atrav\u00e9s da automa\u00e7\u00e3o inteligente de CRM, garantindo que a expertise humana seja sempre apoiada por um pipeline atualizado e orientado por IA.' },
      vision: { title: 'Nossa Vis\u00e3o', description: 'Nossa vis\u00e3o \u00e9 definir o padr\u00e3o global para Com\u00e9rcio Conversacional orientado por IA, criando um mundo onde o poder de CRM de n\u00edvel empresarial est\u00e1 onde o cliente estiver. Estamos construindo o espa\u00e7o de trabalho unificado do futuro \u2014 uma plataforma onde agentes de IA aut\u00f4nomos e a constru\u00e7\u00e3o de relacionamentos humanos convergem para tornar a comunica\u00e7\u00e3o empresarial mais pessoal, mais eficiente e mais lucrativa em escala global.' },
    },
  },
  es: {
    breadcrumb: { home: 'Inicio', aboutUs: 'Sobre Nosotros' },
    hero: {
      badge: 'Sobre Eazybe',
      headingStart: 'Conoce a',
      headingHighlight: 'EazyBe',
      paragraph: 'Eazybe es un proveedor de soluciones de integraci\u00f3n con CRM y plataforma de agentes de IA para WhatsApp que ayuda a las empresas a gestionar conversaciones con clientes, automatizar seguimientos, sincronizar datos con CRMs y gestionar su pipeline de ventas \u2014 todo desde un solo lugar.',
    },
    story: {
      badge: 'Nuestra Historia',
      headingStart: 'De Una Idea Simple Al',
      headingHighlight: '#1 CRM para WhatsApp',
      paragraphs: [
        'Eazybe comenz\u00f3 en 2022 con una idea clara \u2014 los equipos de ventas pasaban demasiado tiempo gestionando herramientas en lugar de hablar con los clientes. La mayor\u00eda de las conversaciones ocurr\u00edan en WhatsApp, pero los datos estaban dispersos y los equipos actualizaban el CRM manualmente. Quer\u00edamos resolver este problema.',
        'Lo que comenz\u00f3 como una simple extensi\u00f3n de Chrome para conectar WhatsApp con sistemas de CRM gradualmente se convirti\u00f3 en un espacio de trabajo completo para ventas. Hoy Eazybe es utilizado por <strong class="text-white">m\u00e1s de 25.000 equipos</strong> en m\u00e1s de 50 pa\u00edses para gestionar conversaciones con clientes, pipelines de ventas y comunicaci\u00f3n del equipo en un solo lugar.',
        'Hoy, los equipos usan Eazybe para gestionar conversaciones de WhatsApp, rastrear leads, automatizar seguimientos y mantener su CRM actualizado autom\u00e1ticamente con herramientas como <a href="/es/hubspot-whatsapp-integration" style="color:#06B6D4;text-decoration:underline"><strong>HubSpot</strong></a>, <a href="/es/zoho-whatsapp-integration" style="color:#06B6D4;text-decoration:underline"><strong>Zoho</strong></a> y <a href="/es/salesforce-whatsapp-integration" style="color:#06B6D4;text-decoration:underline"><strong>Salesforce</strong></a>, junto con hojas de c\u00e1lculo como <a href="/es/google-sheets-whatsapp-integration" style="color:#06B6D4;text-decoration:underline"><strong>Google Sheets</strong></a>.',
        'Con <strong class="text-white">m\u00e1s de 30.000 rese\u00f1as</strong> en la Chrome Web Store y una calificaci\u00f3n de 4.9, Eazybe se ha convertido en una de las plataformas m\u00e1s confiables para empresas que usan WhatsApp para ventas, soporte y comunicaci\u00f3n con clientes.',
      ],
    },
    founder: {
      badge: 'Liderazgo',
      headingStart: 'Conoce a Nuestro',
      headingHighlight: 'Fundador',
      quote: '\u201cCreo que todo equipo de ventas merece herramientas tan r\u00e1pidas y personales como las conversaciones que tienen. WhatsApp es donde ocurren las ventas reales \u2014 y Eazybe se asegura de que nada se pierda.\u201d',
      quoteAttribution: 'Sagar Dewan, Fundador y CEO',
      bio: [
        '<strong class="text-white">Sagar Dewan</strong> es el Fundador de <a href="/es" style="color:#06B6D4;text-decoration:underline">Eazybe</a>, emprendedor y mentor que trabaja en estrategia de producto, integraciones con CRM, sistemas de automatizaci\u00f3n y Agentes de IA para WhatsApp. Se enfoca en construir tecnolog\u00eda que conecte la comunicaci\u00f3n de WhatsApp con sistemas de CRM para que las empresas puedan gestionar ventas, conversaciones con clientes y datos en un espacio de trabajo organizado.',
        'Fund\u00f3 <strong class="text-white">\u2018Eazybe Software Private Limited\u2019</strong>, la empresa que desarrolla la plataforma de integraci\u00f3n con CRM y automatizaci\u00f3n de Eazybe. Esto generaba trabajo manual, leads perdidos y ninguna visibilidad para los gerentes. Este problema se convirti\u00f3 en la base para construir Eazybe.',
        'Como fundador, lidera la direcci\u00f3n del producto, integraciones, flujos de trabajo de automatizaci\u00f3n y desarrollo de la plataforma. Tambi\u00e9n mentoriza al equipo en decisiones de producto y tecnolog\u00eda y se enfoca en construir sistemas que ayuden a las empresas a gestionar pipelines de comunicaci\u00f3n de ventas y datos de clientes de manera m\u00e1s eficiente a trav\u00e9s de WhatsApp, integraciones con CRM, automatizaci\u00f3n e IA.',
        'Bajo su liderazgo, Eazybe ha crecido hasta convertirse en una plataforma que ayuda a las empresas a gestionar conversaciones de WhatsApp, sincronizar datos con CRMs, automatizar flujos de trabajo y usar agentes de IA para gestionar leads y comunicaci\u00f3n con clientes.',
        'Su creencia es simple \u2014 la tecnolog\u00eda y la IA deben asistir las conversaciones humanas, no reemplazarlas.',
      ],
      imageAlt: 'Sagar Dewan - Fundador y CEO de Eazybe',
      founderName: 'Sagar Dewan',
      founderTitle: 'Fundador y CEO',
    },
    whyChoose: {
      badge: 'Por Qu\u00e9 Eazybe',
      headingStart: 'Por Qu\u00e9 los Equipos Eligen',
      headingHighlight: 'Eazybe',
      cards: [
        { title: 'CRM Nativo para WhatsApp', description: 'Construido espec\u00edficamente para equipos de ventas que priorizan WhatsApp. No es un CRM gen\u00e9rico con WhatsApp a\u00f1adido \u2014 es una plataforma dise\u00f1ada a medida.' },
        { title: 'Alcance Global, Toque Local', description: 'Sirviendo a equipos en m\u00e1s de 50 pa\u00edses con soporte localizado en ingl\u00e9s, portugu\u00e9s, espa\u00f1ol y turco.' },
        { title: 'IA Que Vende Por Ti', description: 'Nuestros agentes de IA para WhatsApp califican leads, detectan oportunidades fr\u00edas y sugieren respuestas \u2014 para que tu equipo cierre m\u00e1s, m\u00e1s r\u00e1pido.' },
      ],
      mission: { title: 'Nuestra Misi\u00f3n', description: 'Nuestra misi\u00f3n es eliminar la brecha de \u201cdatos ocultos\u201d entre WhatsApp y el CRM, desplegando agentes de IA que califican, sincronizan y gestionan flujos de leads en tiempo real. Empoderamos a los equipos de ventas para convertir cada conversaci\u00f3n en ingresos medibles a trav\u00e9s de la automatizaci\u00f3n inteligente de CRM, asegurando que la experiencia humana siempre est\u00e9 respaldada por un pipeline actualizado e impulsado por IA.' },
      vision: { title: 'Nuestra Visi\u00f3n', description: 'Nuestra visi\u00f3n es definir el est\u00e1ndar global para el Comercio Conversacional impulsado por IA, creando un mundo donde el poder de CRM empresarial est\u00e9 donde est\u00e9 el cliente. Estamos construyendo el espacio de trabajo unificado del futuro \u2014 una plataforma donde agentes de IA aut\u00f3nomos y la construcci\u00f3n de relaciones humanas convergen para hacer la comunicaci\u00f3n empresarial m\u00e1s personal, m\u00e1s eficiente y m\u00e1s rentable a escala global.' },
    },
  },
  tr: {
    breadcrumb: { home: 'Ana Sayfa', aboutUs: 'Hakk\u0131m\u0131zda' },
    hero: {
      badge: 'Eazybe Hakk\u0131nda',
      headingStart: 'EazyBe\u2019yi',
      headingHighlight: 'Tan\u0131y\u0131n',
      paragraph: 'Eazybe, i\u015fletmelerin m\u00fc\u015fteri sohbetlerini y\u00f6netmesine, takipleri otomatikle\u015ftirmesine, verileri CRM\u2019lerle senkronize etmesine ve sat\u0131\u015f hatt\u0131n\u0131 y\u00f6netmesine yard\u0131mc\u0131 olan bir CRM Entegrasyon \u00c7\u00f6z\u00fcm Sa\u011flay\u0131c\u0131s\u0131 ve WhatsApp Yapay Zeka ajanlar\u0131 platformudur \u2014 hepsi tek bir yerden.',
    },
    story: {
      badge: 'Hikayemiz',
      headingStart: 'Basit Bir Fikirden',
      headingHighlight: '#1 WhatsApp CRM\u2019e',
      paragraphs: [
        'Eazybe 2022\u2019de net bir fikirle ba\u015flad\u0131 \u2014 sat\u0131\u015f ekipleri m\u00fc\u015fterilerle konu\u015fmak yerine ara\u00e7lar\u0131 y\u00f6netmeye \u00e7ok fazla zaman harc\u0131yordu. Konu\u015fmalar\u0131n \u00e7o\u011fu WhatsApp\u2019ta yap\u0131l\u0131yordu, ancak veriler da\u011f\u0131n\u0131kt\u0131 ve ekipler CRM\u2019lerini manuel olarak g\u00fcncelliyordu. Bu sorunu \u00e7\u00f6zmek istedik.',
        'WhatsApp\u2019\u0131 CRM sistemleriyle ba\u011flamak i\u00e7in basit bir Chrome eklentisi olarak ba\u015flayan \u015fey, yava\u015f yava\u015f eksiksiz bir sat\u0131\u015f \u00e7al\u0131\u015fma alan\u0131na d\u00f6n\u00fc\u015ft\u00fc. Bug\u00fcn Eazybe, <strong class="text-white">25.000\u2019den fazla ekip</strong> taraf\u0131ndan 50\u2019den fazla \u00fclkede m\u00fc\u015fteri g\u00f6r\u00fc\u015fmelerini, sat\u0131\u015f hatlar\u0131n\u0131 ve ekip ileti\u015fimini tek bir yerde y\u00f6netmek i\u00e7in kullan\u0131l\u0131yor.',
        'Bug\u00fcn ekipler Eazybe\u2019yi WhatsApp g\u00f6r\u00fc\u015fmelerini y\u00f6netmek, m\u00fc\u015fteri adaylar\u0131n\u0131 takip etmek, takipleri otomatikle\u015ftirmek ve <a href="/tr/hubspot-whatsapp-integration" style="color:#06B6D4;text-decoration:underline"><strong>HubSpot</strong></a>, <a href="/tr/zoho-whatsapp-integration" style="color:#06B6D4;text-decoration:underline"><strong>Zoho</strong></a> ve <a href="/tr/salesforce-whatsapp-integration" style="color:#06B6D4;text-decoration:underline"><strong>Salesforce</strong></a> gibi ara\u00e7larla ve <a href="/tr/google-sheets-whatsapp-integration" style="color:#06B6D4;text-decoration:underline"><strong>Google Sheets</strong></a> gibi elektronik tablolarla CRM\u2019lerini otomatik olarak g\u00fcncel tutmak i\u00e7in kullan\u0131yor.',
        'Chrome Web Ma\u011fazas\u0131\u2019nda <strong class="text-white">30.000\u2019den fazla de\u011ferlendirme</strong> ve 4.9 puan ile Eazybe, sat\u0131\u015f, destek ve m\u00fc\u015fteri ileti\u015fimi i\u00e7in WhatsApp kullanan i\u015fletmeler i\u00e7in en g\u00fcvenilir platformlardan biri haline geldi.',
      ],
    },
    founder: {
      badge: 'Liderlik',
      headingStart: 'Kurucumuzu',
      headingHighlight: 'Tan\u0131y\u0131n',
      quote: '\u201cHer sat\u0131\u015f ekibinin, yapt\u0131klar\u0131 konu\u015fmalar kadar h\u0131zl\u0131 ve ki\u015fisel ara\u00e7lar\u0131 hak etti\u011fine inan\u0131yorum. WhatsApp ger\u00e7ek sat\u0131\u015f\u0131n yap\u0131ld\u0131\u011f\u0131 yerdir \u2014 ve Eazybe hi\u00e7bir \u015feyin gözden ka\u00e7mamas\u0131n\u0131 sa\u011flar.\u201d',
      quoteAttribution: 'Sagar Dewan, Kurucu ve CEO',
      bio: [
        '<strong class="text-white">Sagar Dewan</strong>, <a href="/tr" style="color:#06B6D4;text-decoration:underline">Eazybe</a>\u2019nin Kurucusu, \u00fcr\u00fcn stratejisi, CRM entegrasyonlar\u0131, otomasyon sistemleri ve WhatsApp Yapay Zeka Ajanlar\u0131 \u00fczerine \u00e7al\u0131\u015fan bir giri\u015fimci ve mentordur. WhatsApp ileti\u015fimini CRM sistemleriyle ba\u011flayan teknoloji in\u015fa etmeye odaklan\u0131r, b\u00f6ylece i\u015fletmeler sat\u0131\u015flar\u0131, m\u00fc\u015fteri g\u00f6r\u00fc\u015fmelerini ve verileri d\u00fczenli bir \u00e7al\u0131\u015fma alan\u0131nda y\u00f6netebilir.',
        '<strong class="text-white">\u2018Eazybe Software Private Limited\u2019</strong>\u0131 kurdu; Eazybe CRM entegrasyon ve otomasyon platformunu geli\u015ftiren \u015firket. Bu, manuel i\u015f, kaybedilen m\u00fc\u015fteri adaylar\u0131 ve y\u00f6neticiler i\u00e7in g\u00f6r\u00fcn\u00fcrl\u00fck eksikli\u011fi yaratt\u0131. Bu sorun Eazybe\u2019nin in\u015fa edilmesinin temeli oldu.',
        'Kurucu olarak \u00fcr\u00fcn y\u00f6n\u00fc, entegrasyonlar, otomasyon i\u015f ak\u0131\u015flar\u0131 ve platform geli\u015ftirmeye \u00f6nc\u00fcl\u00fck eder. Ayr\u0131ca ekibi \u00fcr\u00fcn ve teknoloji kararlar\u0131nda y\u00f6nlendirir ve i\u015fletmelerin ileti\u015fim sat\u0131\u015f hatlar\u0131n\u0131 ve m\u00fc\u015fteri verilerini WhatsApp, CRM entegrasyonlar\u0131, otomasyon ve yapay zeka arac\u0131l\u0131\u011f\u0131yla daha verimli y\u00f6netmelerine yard\u0131mc\u0131 olan sistemler in\u015fa etmeye odaklan\u0131r.',
        'Onun liderli\u011finde Eazybe, i\u015fletmelerin WhatsApp g\u00f6r\u00fc\u015fmelerini y\u00f6netmesine, verileri CRM\u2019lerle senkronize etmesine, i\u015f ak\u0131\u015flar\u0131n\u0131 otomatikle\u015ftirmesine ve m\u00fc\u015fteri adaylar\u0131n\u0131 ve m\u00fc\u015fteri ileti\u015fimini y\u00f6netmek i\u00e7in yapay zeka ajanlar\u0131 kullanmas\u0131na yard\u0131mc\u0131 olan bir platforma d\u00f6n\u00fc\u015ft\u00fc.',
        '\u0130nanc\u0131 basittir \u2014 teknoloji ve yapay zeka insan konu\u015fmalar\u0131na yard\u0131mc\u0131 olmal\u0131, onlar\u0131n yerini almamal\u0131d\u0131r.',
      ],
      imageAlt: 'Sagar Dewan - Eazybe Kurucusu ve CEO\u2019su',
      founderName: 'Sagar Dewan',
      founderTitle: 'Kurucu ve CEO',
    },
    whyChoose: {
      badge: 'Neden Eazybe',
      headingStart: 'Ekipler Neden',
      headingHighlight: 'Eazybe\u2019yi Se\u00e7iyor',
      cards: [
        { title: 'WhatsApp-Yerel CRM', description: '\u00d6nce WhatsApp kullanan sat\u0131\u015f ekipleri i\u00e7in \u00f6zel olarak in\u015fa edildi. WhatsApp eklenmi\u015f genel bir CRM de\u011fil \u2014 amaca y\u00f6nelik bir platform.' },
        { title: 'K\u00fcresel Eri\u015fim, Yerel Dokunuş', description: '\u0130ngilizce, Portekizce, \u0130spanyolca ve T\u00fcrk\u00e7e yerel destek ile 50\u2019den fazla \u00fclkede ekiplere hizmet veriyor.' },
        { title: 'Sizin \u0130\u00e7in Satan Yapay Zeka', description: 'WhatsApp yapay zeka ajanlar\u0131m\u0131z m\u00fc\u015fteri adaylar\u0131n\u0131 nitelendirir, so\u011fuk f\u0131rsatlar\u0131 tespit eder ve yan\u0131tlar \u00f6nerir \u2014 b\u00f6ylece ekibiniz daha fazla, daha h\u0131zl\u0131 kapatir.' },
      ],
      mission: { title: 'Misyonumuz', description: 'Misyonumuz, WhatsApp ile CRM aras\u0131ndaki \u201ckaranl\u0131k veri\u201d a\u00e7\u0131\u011f\u0131n\u0131 ortadan kald\u0131rmak, m\u00fc\u015fteri adaylar\u0131n\u0131 nitelendiren, senkronize eden ve ger\u00e7ek zamanl\u0131 lead ak\u0131\u015flar\u0131n\u0131 y\u00f6neten yapay zeka ajanlar\u0131 dağ\u0131tmakt\u0131r. Sat\u0131\u015f ekiplerini, her konu\u015fmay\u0131 ak\u0131ll\u0131 CRM otomasyonu arac\u0131l\u0131\u011f\u0131yla \u00f6l\u00e7\u00fclebilir gelire d\u00f6n\u00fc\u015ft\u00fcrmeleri i\u00e7in g\u00fc\u00e7lendiriyoruz.' },
      vision: { title: 'Vizyonumuz', description: 'Vizyonumuz, yapay zeka odakl\u0131 Konu\u015fmal\u0131 Ticaret i\u00e7in k\u00fcresel standard\u0131 belirlemek, kurumsal d\u00fczeyde CRM g\u00fcc\u00fcn\u00fcn m\u00fc\u015fterinin oldu\u011fu her yerde ya\u015fad\u0131\u011f\u0131 bir d\u00fcnya yaratmakt\u0131r. Gelece\u011fin birle\u015fik \u00e7al\u0131\u015fma alan\u0131n\u0131 in\u015fa ediyoruz \u2014 otonom yapay zeka ajanlar\u0131 ve insan ili\u015fkisi kurman\u0131n birle\u015fti\u011fi, i\u015f ileti\u015fimini daha ki\u015fisel, daha verimli ve k\u00fcresel \u00f6l\u00e7ekte daha karl\u0131 hale getiren bir platform.' },
    },
  },
}

export function getAboutUsContent(locale: string): AboutUsContent {
  return content[locale] || content.en
}
