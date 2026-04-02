/**
 * JSON-LD structured data for Google Sheets WhatsApp Integration page (Portuguese/Brazil)
 * Includes: FAQPage, BreadcrumbList, WebPage, Product, HowTo
 */

export function GoogleSheetsStructuredDataBr() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': 'https://eazybe.com/br/google-sheets-whatsapp-integration/#faq',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Como conecto WhatsApp ao Google Sheets?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Instale o Eazybe e conecte sua conta do Google. O Eazybe sincroniza os chats do WhatsApp com o Google Sheets para que as conversas e os dados dos clientes sejam capturados automaticamente nas suas planilhas.'
        }
      },
      {
        '@type': 'Question',
        name: 'O Eazybe sincroniza mensagens do WhatsApp para o Google Sheets automaticamente?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sim. O Eazybe pode sincronizar conversas do WhatsApp com o Google Sheets automaticamente, reduzindo a entrada manual de dados e mantendo suas planilhas atualizadas.'
        }
      },
      {
        '@type': 'Question',
        name: 'Múltiplos colegas podem usar uma planilha compartilhada com Google Sheets + WhatsApp?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sim. O Eazybe suporta fluxos de trabalho com planilhas compartilhadas para que equipes possam colaborar em leads do WhatsApp enquanto mantêm os registros do Google Sheets sincronizados.'
        }
      },
      {
        '@type': 'Question',
        name: 'O que agentes de IA podem fazer por conversas do Google Sheets + WhatsApp?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A IA pode ajudar a elaborar respostas, resumir conversas e acelerar acompanhamentos—para que representantes respondam mais rápido mantendo uma mensagem consistente.'
        }
      },
      {
        '@type': 'Question',
        name: 'É seguro usar esta integração com WhatsApp e Google Sheets?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'O Eazybe foi projetado para casos de uso de negócios e foca em fluxos de trabalho seguros para sincronizar conversas do WhatsApp com o Google Sheets. Sempre reveja seus requisitos de segurança e conformidade antes da implementação.'
        }
      },
      {
        '@type': 'Question',
        name: 'Quais dados são sincronizados do WhatsApp para o Google Sheets?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'O Eazybe pode sincronizar informações de contato, conteúdo de mensagens, carimbos de data/hora e campos personalizados para o Google Sheets. O mapeamento exato de dados depende dos seus requisitos de fluxo de trabalho.'
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
        name: 'integração google sheets whatsapp',
        item: 'https://eazybe.com/br/google-sheets-whatsapp-integration'
      }
    ]
  }

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: 'https://eazybe.com/br/google-sheets-whatsapp-integration',
    name: 'Integração Google Sheets com WhatsApp | Conecte o WhatsApp',
    description: 'Conecte o Google Sheets ao WhatsApp com o Eazybe. Sincronize chats automaticamente, atualize negócios e gerencie conversas com clientes.',
    inLanguage: 'pt-BR',
    datePublished: '2026-02-03T08:00:00+00:00',
    dateModified: '2026-04-02T10:30:00+00:00'
  }

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Integração Google Sheets WhatsApp - Eazybe',
    url: 'https://eazybe.com/br/google-sheets-whatsapp-integration',
    image: ['https://eazybe.com/logo.png'],
    description: 'O Eazybe conecta WhatsApp com Google Sheets para sincronizar chats automaticamente, ajudar equipes de vendas a responder mais rápido com IA e gerenciar conversas de clientes com planilhas compartilhadas.',
    brand: {
      '@type': 'Brand',
      name: 'Eazybe'
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Eazybe',
      url: 'https://eazybe.com/'
    },
    category: 'Software de Integração CRM',
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'Equipes de vendas, usuários do Google Sheets, gestores de dados, empresas B2B'
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
    name: 'Como conectar WhatsApp ao Google Sheets usando Eazybe',
    description: 'Siga estas etapas para instalar o Eazybe e sincronizar conversas do WhatsApp com o Google Sheets para que sua equipe possa rastrear chats, acelerar acompanhamentos e manter registros atualizados nas planilhas.',
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
        url: 'https://eazybe.com/br/google-sheets-whatsapp-integration#step1',
        name: 'Instale a extensão Eazybe',
        text: 'Abra a Chrome Web Store e instale a extensão oficial Eazybe no seu navegador.',
        image: 'https://eazybe.com/logo.png'
      },
      {
        '@type': 'HowToStep',
        url: 'https://eazybe.com/br/google-sheets-whatsapp-integration#step2',
        name: 'Abra o WhatsApp Web',
        text: 'Vá para o WhatsApp Web no seu computador e faça login. O painel Eazybe aparecerá dentro do WhatsApp Web.',
        image: 'https://eazybe.com/logo.png'
      },
      {
        '@type': 'HowToStep',
        url: 'https://eazybe.com/br/google-sheets-whatsapp-integration#step3',
        name: 'Conecte sua conta do Google',
        text: 'No painel Eazybe, escolha Google Sheets e complete o fluxo de autorização para conectar sua conta com segurança.',
        image: 'https://eazybe.com/logo.png'
      },
      {
        '@type': 'HowToStep',
        url: 'https://eazybe.com/br/google-sheets-whatsapp-integration#step4',
        name: 'Ative a sincronização de chat com Google Sheets',
        text: 'Selecione um contato ou conversa e ative a sincronização. As mensagens do WhatsApp e os dados dos clientes começarão a sincronizar com o Google Sheets automaticamente.',
        image: 'https://eazybe.com/logo.png'
      },
      {
        '@type': 'HowToStep',
        url: 'https://eazybe.com/br/google-sheets-whatsapp-integration#step5',
        name: 'Use respostas de IA e planilhas compartilhadas',
        text: 'Use respostas assistidas por IA para responder mais rápido e fluxos de trabalho com planilhas compartilhadas para colaborar com sua equipe mantendo o Google Sheets atualizado.',
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
        data-schema="breadcrumb-google-sheets-br"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        data-schema="webpage-google-sheets-br"
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
