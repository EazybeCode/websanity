/**
 * JSON-LD structured data for Google Calendar WhatsApp Integration page (Portuguese/Brazil)
 * Includes: FAQPage, BreadcrumbList, WebPage, Product, HowTo
 */

export function GoogleCalendarStructuredDataBr() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': 'https://eazybe.com/br/google-calendar-whatsapp-integration/#faq',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Como conecto WhatsApp ao Google Calendar?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Instale o Eazybe e conecte sua conta do Google. O Eazybe sincroniza os chats do WhatsApp com o Google Calendar para que compromissos e lembretes sejam gerenciados automaticamente na sua agenda.'
        }
      },
      {
        '@type': 'Question',
        name: 'O Eazybe sincroniza mensagens do WhatsApp para o Google Calendar automaticamente?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sim. O Eazybe pode sincronizar conversas do WhatsApp com o Google Calendar automaticamente, criando eventos e enviando lembretes para que você nunca perca um compromisso.'
        }
      },
      {
        '@type': 'Question',
        name: 'Posso enviar lembretes automáticos do WhatsApp para o Google Calendar?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sim. O Eazybe pode enviar lembretes automáticos via WhatsApp para eventos do Google Calendar, garantindo que você e seus clientes sejam notificados sobre compromissos agendados.'
        }
      },
      {
        '@type': 'Question',
        name: 'O que agentes de IA podem fazer por conversas do Google Calendar + WhatsApp?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A IA pode ajudar a agendar reuniões, enviar lembretes automáticos e resumir conversas—para que você possa gerenciar melhor seu tempo e nunca perder uma oportunidade.'
        }
      },
      {
        '@type': 'Question',
        name: 'É seguro usar esta integração com WhatsApp e Google Calendar?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'O Eazybe foi projetado para casos de uso de negócios e foca em fluxos de trabalho seguros para sincronizar conversas do WhatsApp com o Google Calendar. Sempre reveja seus requisitos de segurança e conformidade antes da implementação.'
        }
      },
      {
        '@type': 'Question',
        name: 'Quais dados são sincronizados do WhatsApp para o Google Calendar?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'O Eazybe pode criar eventos no Google Calendar a partir de conversas do WhatsApp, sincronizar informações de contato e enviar lembretes automáticos para garantir que ninguém esqueça um compromisso.'
        }
      }
    ]
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'integração', item: 'https://eazybe.com/br/integrations' },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'integração google calendar whatsapp',
        item: 'https://eazybe.com/br/google-calendar-whatsapp-integration'
      }
    ]
  }

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: 'https://eazybe.com/br/google-calendar-whatsapp-integration',
    name: 'Integração Google Calendar com WhatsApp: Conecte WhatsApp',
    description: 'Conecte o Google Calendar ao WhatsApp com o Eazybe. Sincronize chats automaticamente, atualize compromissos e gerencie conversas com clientes.',
    inLanguage: 'pt-BR',
    datePublished: '2026-02-03T08:00:00+00:00',
    dateModified: '2026-04-02T10:30:00+00:00'
  }

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Integração Google Calendar WhatsApp - Eazybe',
    url: 'https://eazybe.com/br/google-calendar-whatsapp-integration',
    image: ['https://eazybe.com/logo.png'],
    description: 'O Eazybe conecta WhatsApp com Google Calendar para sincronizar chats automaticamente, enviar lembretes com IA e gerenciar compromissos com clientes de forma eficiente.',
    brand: {
      '@type': 'Brand',
      name: 'Eazybe'
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Eazybe',
      url: 'https://eazybe.com/'
    },
    category: 'Software de Integração de Agenda',
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'Equipes de vendas, usuários do Google Calendar, equipes de suporte, empresas B2B'
    },
    offers: {
      '@type': 'AggregateOffer',
      url: 'https://eazybe.com/br/precos',
      priceCurrency: 'BRL',
      lowPrice: 96,
      highPrice: 162,
      offerCount: 5,
      availability: 'https://schema.org/InStock'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: 4.9,
      bestRating: 5,
      worstRating: 1,
      ratingCount: 30597
    }
  }

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Como conectar WhatsApp ao Google Calendar usando Eazybe',
    description: 'Siga estas etapas para instalar o Eazybe e sincronizar conversas do WhatsApp com o Google Calendar para que sua equipe possa gerenciar compromissos e enviar lembretes automaticamente.',
    totalTime: 'PT5M',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'BRL',
      value: '0'
    },
    supply: [
      {
        '@type': 'HowToSupply',
        name: 'Conta Google ativa'
      },
      {
        '@type': 'HowToSupply',
        name: 'Conta WhatsApp com acesso ao WhatsApp Web'
      }
    ],
    tool: [
      {
        '@type': 'HowToTool',
        name: 'Google Chrome (ou navegador baseado em Chromium)'
      },
      {
        '@type': 'HowToTool',
        name: 'Extensão Eazybe para Chrome'
      }
    ],
    step: [
      {
        '@type': 'HowToStep',
        url: 'https://eazybe.com/br/google-calendar-whatsapp-integration#step1',
        name: 'Instale a extensão Eazybe',
        text: 'Abra a Chrome Web Store e instale a extensão oficial Eazybe no seu navegador.',
        image: 'https://eazybe.com/logo.png'
      },
      {
        '@type': 'HowToStep',
        url: 'https://eazybe.com/br/google-calendar-whatsapp-integration#step2',
        name: 'Abra o WhatsApp Web',
        text: 'Vá para o WhatsApp Web no seu computador e faça login. O painel Eazybe aparecerá dentro do WhatsApp Web.',
        image: 'https://eazybe.com/logo.png'
      },
      {
        '@type': 'HowToStep',
        url: 'https://eazybe.com/br/google-calendar-whatsapp-integration#step3',
        name: 'Conecte sua conta do Google',
        text: 'No painel Eazybe, escolha Google Calendar e complete o fluxo de autorização para conectar sua conta com segurança.',
        image: 'https://eazybe.com/logo.png'
      },
      {
        '@type': 'HowToStep',
        url: 'https://eazybe.com/br/google-calendar-whatsapp-integration#step4',
        name: 'Ative a sincronização de chat com Google Calendar',
        text: 'Selecione um contato ou conversa e ative a sincronização. Eventos serão criados automaticamente no Google Calendar com base nas conversas do WhatsApp.',
        image: 'https://eazybe.com/logo.png'
      },
      {
        '@type': 'HowToStep',
        url: 'https://eazybe.com/br/google-calendar-whatsapp-integration#step5',
        name: 'Use lembretes automáticos e IA',
        text: 'Configure lembretes automáticos para serem enviados via WhatsApp antes dos eventos do Google Calendar e use respostas assistidas por IA para agendar reuniões rapidamente.',
        image: 'https://eazybe.com/logo.png'
      }
    ],
    inLanguage: 'pt-BR'
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        data-schema="breadcrumb-google-calendar-br"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        data-schema="webpage-google-calendar-br"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        data-schema="product"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        data-schema="howto"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
    </>
  )
}
