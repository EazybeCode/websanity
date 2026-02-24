/**
 * Update Portuguese integrations page with Brazilian Portuguese translations
 * Based on content from https://eazybe.com/br/integrations
 */

import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: '5awzi0t4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'skkDdo4y11RjfAKjVBfE2lnIn3jlXIvzxxyDidInUrabhYFWJf4dDoUpF41nPCti3qNsXDLYO1fboYOOOVrYg9hdWnjW5nJArkiMC6HwwfTMzz08s7AayDbqS6PTS6h3wQzgxM5v6afWCGmSoKFhvlvH5dPH1tBvLZwYcgdEZuDNdiGSdmVW'
});

// Brazilian Portuguese translations based on eazybe.com/br/integrations
const ptContent = {
  title: 'Integrações',
  language: 'pt',
  slug: { _type: 'slug', current: 'integrations' },
  category: 'integration',

  hero: {
    badge: 'Integrações',
    headline: 'Reúna todas as suas',
    headlineHighlight: 'ferramentas em um só lugar',
    description: 'Colete todas as suas ferramentas exclusivas em um só lugar. Projetamos e desenvolvemos soluções web modernas com design profissional usando as mais recentes tecnologias e tendências.',
    primaryCta: {
      label: 'Instalar Grátis',
      url: 'https://chromewebstore.google.com/detail/eazybe-best-whatsapp-web/clgficggccelgifppbcaepjdkklfcefd'
    },
    secondaryCta: {
      label: 'Ver Todas as Integrações',
      url: '#featured'
    }
  },

  intro: {
    headline: 'Todas as suas ferramentas em uma única plataforma',
    description: 'Nós projetamos e desenvolvemos soluções web modernas com um design profissional usando as mais recentes tecnologias e tendências.'
  },

  featuredItems: [
    {
      name: 'HubSpot',
      slug: 'hubspot',
      description: 'Sincronize e integre perfeitamente o WhatsApp com o HubSpot usando o Eazybe. Melhore o engajamento do cliente e simplifique a comunicação para resultados ideais.',
      icon: 'hubspot',
      color: '#FF7A59',
      isFeatured: true,
      tags: ['CRM']
    },
    {
      name: 'Google Sheets',
      slug: 'google-sheets',
      description: 'Integre o WhatsApp Web com o Google Sheets',
      icon: 'sheet',
      color: '#34A853',
      isFeatured: true,
      tags: ['Produtividade']
    },
    {
      name: 'Webhooks',
      slug: 'webhooks',
      description: 'Integrações personalizadas com webhooks',
      icon: 'webflow',
      color: '#635BFF',
      isFeatured: true,
      tags: ['Desenvolvedor']
    },
    {
      name: 'Google Calendar',
      slug: 'google-calendar',
      description: 'Integre o WhatsApp Web com o Google Calendar',
      icon: 'calendar',
      color: '#4285F4',
      isFeatured: true,
      tags: ['Produtividade']
    },
    {
      name: 'Zoho',
      slug: 'zoho',
      description: 'Melhore o engajamento do cliente Zoho através da integração perfeita com o WhatsApp. Conecte o Zoho CRM com o WhatsApp para comunicação e engajamento eficazes.',
      icon: 'zoho',
      color: '#D84F26',
      isFeatured: true,
      tags: ['CRM']
    },
    {
      name: 'Bitrix',
      slug: 'bitrix',
      description: 'Integração do WhatsApp com Bitrix24',
      icon: 'bitrix',
      color: '#2FC6F6',
      isFeatured: true,
      tags: ['CRM']
    },
    {
      name: 'Freshdesk',
      slug: 'freshdesk',
      description: 'Crie e atualize tickets do Freshdesk dentro do WhatsApp Web',
      icon: 'freshsdek',
      color: '#FF3D00',
      isFeatured: true,
      tags: ['Suporte']
    },
    {
      name: 'Salesforce',
      slug: 'salesforce',
      description: 'Integração do WhatsApp com Salesforce CRM',
      icon: 'salesforce',
      color: '#00A1E0',
      isFeatured: true,
      tags: ['CRM']
    }
  ],

  benefits: {
    badge: 'Integrações de CRM',
    headline: 'Nossas Integrações',
    items: [
      {
        _key: 'pt-benefit-1',
        icon: 'hubspot',
        title: 'HubSpot',
        description: 'Sincronize e integre perfeitamente o WhatsApp com o HubSpot usando o Eazybe. Melhore o engajamento do cliente e simplifique a comunicação para resultados ideais.'
      },
      {
        _key: 'pt-benefit-2',
        icon: 'zoho',
        title: 'Zoho',
        description: 'Melhore o engajamento do cliente Zoho através da integração perfeita com o WhatsApp. Conecte o Zoho CRM com o WhatsApp para comunicação e engajamento eficazes.'
      },
      {
        _key: 'pt-benefit-3',
        icon: 'bitrix',
        title: 'Bitrix',
        description: 'Integração completa do WhatsApp com Bitrix24 CRM para equipes de vendas e suporte.'
      },
      {
        _key: 'pt-benefit-4',
        icon: 'salesforce',
        title: 'Salesforce',
        description: 'Conecte o WhatsApp ao Salesforce CRM para gestão completa de relacionamento com clientes.'
      }
    ]
  },

  // CRM Integrations Section
  crmIntegrations: {
    badge: 'Integrações de CRM',
    headline: 'Conecte-se com seus CRMs favoritos',
    items: [
      {
        _key: 'pt-crm-1',
        name: 'Google Sheets',
        description: 'Integre o WhatsApp Web com o Google Sheets',
        icon: 'sheet'
      },
      {
        _key: 'pt-crm-2',
        name: 'Google Calendar',
        description: 'Integre o WhatsApp Web com o Google Calendar',
        icon: 'calendar'
      },
      {
        _key: 'pt-crm-3',
        name: 'HubSpot',
        description: 'Sincronize e integre perfeitamente o WhatsApp com o HubSpot usando o Eazybe. Melhore o engajamento do cliente e simplifique a comunicação para resultados ideais.',
        icon: 'hubspot'
      },
      {
        _key: 'pt-crm-4',
        name: 'Zoho',
        description: 'Melhore o engajamento do cliente Zoho através da integração perfeita com o WhatsApp. Conecte o Zoho CRM com o WhatsApp para comunicação e engajamento eficazes.',
        icon: 'zoho'
      }
    ]
  },

  // Account Management Section
  accountManagement: {
    badge: 'Gerenciamento de Contas',
    headline: 'Gerencie tickets e suporte',
    items: [
      {
        _key: 'pt-acct-1',
        name: 'HubSpot Tickets',
        description: 'Crie tickets do HubSpot diretamente do WhatsApp Web',
        icon: 'hubspot'
      },
      {
        _key: 'pt-acct-2',
        name: 'Freshdesk',
        description: 'Crie e atualize tickets do Freshdesk dentro do WhatsApp Web',
        icon: 'freshsdek'
      }
    ]
  },

  // Productivity Section
  productivity: {
    badge: 'Produtividade',
    headline: 'Aumente sua produtividade',
    items: [
      {
        _key: 'pt-prod-1',
        name: 'Google Sheets',
        description: 'Integre o WhatsApp Web com o Google Sheets',
        icon: 'sheet'
      },
      {
        _key: 'pt-prod-2',
        name: 'Google Calendar',
        description: 'Integre o WhatsApp Web com o Google Calendar',
        icon: 'calendar'
      }
    ]
  },

  comparisonTable: {
    headline: 'Compare Integrações',
    description: 'Veja como nossas integrações se comparam',
    columns: ['Recurso', 'HubSpot', 'Zoho', 'Salesforce', 'Bitrix'],
    rows: [
      {
        _key: 'pt-comp-1',
        feature: 'Sincronização em Tempo Real',
        values: [
          { type: 'check' },
          { type: 'check' },
          { type: 'check' },
          { type: 'check' }
        ]
      },
      {
        _key: 'pt-comp-2',
        feature: 'Histórico de Conversas',
        values: [
          { type: 'check' },
          { type: 'check' },
          { type: 'check' },
          { type: 'check' }
        ]
      },
      {
        _key: 'pt-comp-3',
        feature: 'Anexos e Notas de Voz',
        values: [
          { type: 'check' },
          { type: 'check' },
          { type: 'check' },
          { type: 'check' }
        ]
      },
      {
        _key: 'pt-comp-4',
        feature: 'Visibilidade do Gerente',
        values: [
          { type: 'check' },
          { type: 'check' },
          { type: 'check' },
          { type: 'check' }
        ]
      }
    ]
  },

  faq: {
    badge: 'Perguntas Frequentes',
    headline: 'Perguntas comuns sobre integrações',
    items: [
      {
        _key: 'pt-faq-1',
        question: 'Preciso do WhatsApp Business API?',
        answer: 'Não. O Eazybe funciona com WhatsApp pessoal, WhatsApp Business App e WhatsApp Business API. Ao contrário dos concorrentes que exigem migrações de API caras, funcionamos com qualquer WhatsApp que você já usa.'
      },
      {
        _key: 'pt-faq-2',
        question: 'Quais CRMs vocês suportam?',
        answer: 'Temos integrações nativas para HubSpot, Salesforce, Zoho CRM, Bitrix24, LeadSquared e Freshdesk. Também suportamos Google Sheets e Webhooks personalizados para qualquer outro sistema.'
      },
      {
        _key: 'pt-faq-3',
        question: 'Quão rápido podemos estar ativos?',
        answer: 'A maioria das equipes está sincronizando em 30 minutos. Instale a extensão Chrome, conecte seu CRM com OAuth e abra o WhatsApp Web. Sem recursos de desenvolvedor necessários.'
      },
      {
        _key: 'pt-faq-4',
        question: 'O que acontece com as conversas quando os representantes saem?',
        answer: 'Todas as conversas ficam no seu CRM para sempre. O histórico do cliente pertence à sua empresa, não a telefones pessoais. O próximo representante retoma com contexto completo.'
      },
      {
        _key: 'pt-faq-5',
        question: 'É seguro?',
        answer: 'Sim. Certificado SOC 2 Type II, compatível com LGPD, Meta Business Partner oficial. Mensagens criptografadas em trânsito e em repouso. Usado por clientes de saúde, finanças e governo.'
      },
      {
        _key: 'pt-faq-6',
        question: 'Posso sincronizar o histórico de chat existente?',
        answer: 'Sim. Ao contrário dos concorrentes que começam do zero, o Eazybe pode sincronizar seu histórico existente de conversas do WhatsApp para o seu CRM.'
      }
    ]
  },

  cta: {
    badge: 'Começar',
    headline: 'Ainda não tem certeza sobre qual produto Eazybe é certo para você?',
    headlineHighlight: '',
    description: 'Deixe-nos ajudá-lo a encontrar o produto perfeito que seja mais adequado às suas necessidades e desejos.',
    primaryCta: {
      label: 'Instalar Agora',
      url: 'https://chromewebstore.google.com/detail/eazybe-best-whatsapp-web/clgficggccelgifppbcaepjdkklfcefd'
    },
    secondaryCta: {
      label: 'Agende uma demonstração',
      url: 'https://eazybe.com/demo'
    },
    footnote: ''
  },

  seo: {
    metaTitle: 'Integrações | Eazybe - Integre seu CRM com WhatsApp',
    metaDescription: 'Colete todas as suas ferramentas exclusivas em um só lugar. Integrações com HubSpot, Zoho, Salesforce, Google Sheets, Google Calendar, Freshdesk e mais.'
  }
};

async function updatePortugueseIntegrations() {
  console.log('🇧🇷 Atualizando página de integrações para Português Brasileiro...\n');
  console.log('📋 Baseado em: https://eazybe.com/br/integrations\n');

  // Check if document exists
  const existing = await sanityClient.fetch(
    `*[_type == "categoryIndexPage" && slug.current == "integrations" && language == "pt"][0]{_id}`
  );

  if (existing) {
    console.log(`✅ Documento encontrado: ${existing._id}`);
    console.log('📝 Atualizando conteúdo...');

    const updated = await sanityClient
      .patch(existing._id)
      .set(ptContent)
      .commit();

    console.log(`\n✅ Conteúdo atualizado com sucesso!`);
    console.log(`🌐 Ver em: https://eazybe.com/br/integrations\n`);
  } else {
    console.log('❌ Documento não encontrado. Criando novo...');

    const created = await sanityClient.create({
      _type: 'categoryIndexPage',
      ...ptContent
    });

    console.log(`\n✅ Conteúdo criado com sucesso!`);
    console.log(`🌐 Ver em: https://eazybe.com/br/integrations\n`);
  }

  console.log('📋 Conteúdo traduzido:');
  console.log(`   Título: ${ptContent.title}`);
  console.log(`   Hero: ${ptContent.hero.headline} ${ptContent.hero.headlineHighlight}`);
  console.log(`   Integrações em destaque: ${ptContent.featuredItems.length} itens`);
  console.log(`   Benefícios: ${ptContent.benefits.items.length} itens`);
  console.log(`   FAQ: ${ptContent.faq.items.length} perguntas`);
  console.log('\n🇧🇷 Tradução em Português Brasileiro concluída!');
}

updatePortugueseIntegrations().catch(console.error);
