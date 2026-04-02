/**
 * JSON-LD structured data for Webhooks WhatsApp Integration page (Portuguese/Brazil)
 * Includes: FAQPage, BreadcrumbList, WebPage, Product, HowTo
 */

export function WebhooksStructuredDataBr() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': 'https://eazybe.com/br/webhooks-whatsapp-integration/#faq',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Como conecto WhatsApp com Webhooks?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Instale o Eazybe e configure os webhooks. O Eazybe permite enviar eventos do WhatsApp via webhooks para sincronizar conversas e dados com seus sistemas personalizados.'
        }
      },
      {
        '@type': 'Question',
        name: 'O Eazybe envia eventos do WhatsApp via webhooks automaticamente?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sim. O Eazybe pode enviar eventos do WhatsApp via webhooks automaticamente, permitindo integração em tempo real com seus sistemas.'
        }
      },
      {
        '@type': 'Question',
        name: 'Quais eventos do WhatsApp podem ser enviados via webhooks?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'O Eazybe pode enviar eventos como mensagens recebidas/enviadas, status de mensagem, atualizações de contato e muito mais via webhooks.'
        }
      },
      {
        '@type': 'Question',
        name: 'O que agentes de IA podem fazer com webhooks do WhatsApp?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A IA pode ajudar a processar eventos, gerar respostas automáticas e enriquecer dados antes de enviá-los para seus sistemas via webhooks.'
        }
      },
      {
        '@type': 'Question',
        name: 'É seguro usar webhooks para integrar WhatsApp?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'O Eazybe foi projetado com segurança em mente para integrações via webhooks. Sempre use HTTPS e implemente autenticação adequada em seus endpoints.'
        }
      },
      {
        '@type': 'Question',
        name: 'Como configuro webhooks para integração do WhatsApp?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Configure seu endpoint URL no painel Eazybe, especifique quais eventos deseja receber e implemente o processamento no seu servidor para receber os payloads dos webhooks.'
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
        name: 'integração webhooks whatsapp',
        item: 'https://eazybe.com/br/webhooks-whatsapp-integration'
      }
    ]
  }

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: 'https://eazybe.com/br/webhooks-whatsapp-integration',
    name: 'Integração Webhooks WhatsApp: Conecte WhatsApp com Webhooks',
    description: 'Conecte o WhatsApp com Webhooks. Sincronize conversas, use agentes de IA, acompanhe eventos e automatize fluxos sem sair do seu sistema.',
    inLanguage: 'pt-BR',
    datePublished: '2026-02-03T08:00:00+00:00',
    dateModified: '2026-04-02T10:30:00+00:00'
  }

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Integração Webhooks WhatsApp - Eazybe',
    url: 'https://eazybe.com/br/webhooks-whatsapp-integration',
    image: ['https://eazybe.com/logo.png'],
    description: 'O Eazybe conecta WhatsApp com Webhooks para sincronizar eventos automaticamente, automatizar fluxos com IA e integrar com qualquer sistema personalizado.',
    brand: {
      '@type': 'Brand',
      name: 'Eazybe'
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Eazybe',
      url: 'https://eazybe.com/'
    },
    category: 'Software de Integração API',
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'Desenvolvedores, equipes técnicas, equipes de automação, empresas SaaS, gestores de produto'
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
    name: 'Como conectar WhatsApp com Webhooks usando Eazybe',
    description: 'Siga estas etapas para configurar webhooks do WhatsApp com o Eazybe e automatizar a sincronização de eventos com seus sistemas.',
    totalTime: 'PT10M',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'BRL',
      value: '0'
    },
    supply: [
      {
        '@type': 'HowToSupply',
        name: 'Endpoint URL configurado para receber webhooks'
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
        url: 'https://eazybe.com/br/webhooks-whatsapp-integration#step1',
        name: 'Instale a extensão Eazybe',
        text: 'Abra a Chrome Web Store e instale a extensão oficial Eazybe no seu navegador.',
        image: 'https://eazybe.com/logo.png'
      },
      {
        '@type': 'HowToStep',
        url: 'https://eazybe.com/br/webhooks-whatsapp-integration#step2',
        name: 'Abra o WhatsApp Web',
        text: 'Vá para o WhatsApp Web no seu computador e faça login. O painel Eazybe aparecerá dentro do WhatsApp Web.',
        image: 'https://eazybe.com/logo.png'
      },
      {
        '@type': 'HowToStep',
        url: 'https://eazybe.com/br/webhooks-whatsapp-integration#step3',
        name: 'Configure seu endpoint de webhook',
        text: 'No painel Eazybe, acesse as configurações de webhooks e insira seu endpoint URL. Certifique-se de que seu servidor está pronto para receber requisições POST.',
        image: 'https://eazybe.com/logo.png'
      },
      {
        '@type': 'HowToStep',
        url: 'https://eazybe.com/br/webhooks-whatsapp-integration#step4',
        name: 'Selecione os eventos a enviar',
        text: 'Escolha quais eventos do WhatsApp deseja receber via webhooks, como mensagens recebidas, status de mensagem e atualizações de contato.',
        image: 'https://eazybe.com/logo.png'
      },
      {
        '@type': 'HowToStep',
        url: 'https://eazybe.com/br/webhooks-whatsapp-integration#step5',
        name: 'Teste e ative a integração',
        text: 'Envie uma mensagem de teste para verificar se os webhooks estão funcionando corretamente, depois ative a integração para começar a receber eventos em tempo real.',
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
        data-schema="breadcrumb-webhooks-br"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        data-schema="webpage-webhooks-br"
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
