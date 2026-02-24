/**
 * Update Portuguese integrations page with Brazilian Portuguese translations
 */

import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: '5awzi0t4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'skkDdo4y11RjfAKjVBfE2lnIn3jlXIvzxxyDidInUrabhYFWJf4dDoUpF41nPCti3qNsXDLYO1fboYOOOVrYg9hdWnjW5nJArkiMC6HwwfTMzz08s7AayDbqS6PTS6h3wQzgxM5v6afWCGmSoKFhvlvH5dPH1tBvLZwYcgdEZuDNdiGSdmVW'
});

// Brazilian Portuguese translations
const ptContent = {
  title: 'Integrações de CRM',
  language: 'pt',
  slug: { _type: 'slug', current: 'integrations' },
  category: 'integration',

  hero: {
    badge: 'Integrações de CRM',
    headline: 'Conecte o WhatsApp ao',
    headlineHighlight: 'seu CRM',
    description: 'Seu CRM não vê as conversas do WhatsApp. O Eazybe conecta os pontos — sincronizando cada mensagem para HubSpot, Salesforce, Zoho e mais. Sem migração de API. Funciona com WhatsApp pessoal.',
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
    headline: 'Por que integrar WhatsApp ao seu CRM?',
    description: '80% das conversas com clientes acontecem no WhatsApp — mas seu CRM não mostra nada. Os representantes registram resumos manualmente (quando se lembram). Os gerentes tomam decisões com dados incompletos. Negócios escapam pelas brechas.\n\nO Eazybe captura cada mensagem do WhatsApp e a sincroniza automaticamente no seu CRM. Histórico completo de conversas. Anexos. Notas de voz. Tudo pesquisável, tudo vinculado aos contatos e negócios certos.'
  },

  benefits: {
    badge: 'Recursos Incluídos',
    headline: 'Cada integração de CRM inclui',
    items: [
      {
        _key: 'pt-sync-1',
        icon: 'sync',
        title: 'Sincronização em Tempo Real',
        description: 'As mensagens aparecem no seu CRM em minutos. Sem exportação manual. Sem espera por trabalhos em lote.'
      },
      {
        _key: 'pt-inbox-1',
        icon: 'inbox',
        title: 'Histórico Completo de Conversas',
        description: 'Cada mensagem, anexo e nota de voz sincronizados automaticamente. Pesquise conversas no seu CRM.'
      },
      {
        _key: 'pt-workflow-1',
        icon: 'workflow',
        title: 'Funciona Com Seu WhatsApp',
        description: 'WhatsApp pessoal, App Business ou API — funcionamos com todos. Sem migração cara.'
      },
      {
        _key: 'pt-team-1',
        icon: 'team',
        title: 'Visibilidade da Equipe',
        description: 'Os gerentes veem cada conversa em toda a equipe. Acompanhe tempos de resposta. Treine de forma eficaz.'
      },
      {
        _key: 'pt-security-1',
        icon: 'security',
        title: 'Segurança Empresarial',
        description: 'Certificado SOC 2 Type II. Compatível com LGPD. Meta Business Partner. Criptografia de nível bancário.'
      },
      {
        _key: 'pt-speed-1',
        icon: 'speed',
        title: 'Ativo em 30 Minutos',
        description: 'Extensão Chrome + OAuth. Sem configuração de API. Sem desenvolvedor necessário. Sua equipe começa hoje.'
      }
    ]
  },

  howItWorks: {
    badge: 'Como Funciona',
    headline: 'Conecte em 3 passos',
    steps: [
      {
        _key: 'pt-step-1',
        number: '01',
        title: 'Instale a Extensão Chrome',
        description: 'Adicione o Eazybe ao Chrome. Leva 60 segundos.'
      },
      {
        _key: 'pt-step-2',
        number: '02',
        title: 'Conecte Seu CRM',
        description: 'Login OAuth em HubSpot, Salesforce ou Zoho. Sem chaves de API necessárias.'
      },
      {
        _key: 'pt-step-3',
        number: '03',
        title: 'Abra o WhatsApp Web',
        description: 'A barra lateral do CRM aparece automaticamente. As conversas começam a sincronizar.'
      }
    ]
  },

  comparisonTable: {
    headline: 'Compare Integrações de CRM',
    description: 'Todas as integrações incluem sincronização em tempo real, histórico completo de conversas e visibilidade do gerente.',
    columns: ['Recurso', 'HubSpot', 'Salesforce', 'Zoho CRM'],
    rows: [
      {
        _key: 'pt-comp-1',
        feature: 'Sincronização em Tempo Real',
        values: [
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
          { type: 'check' }
        ]
      },
      {
        _key: 'pt-comp-3',
        feature: 'Anexos e Notas de Voz',
        values: [
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
          { type: 'check' }
        ]
      },
      {
        _key: 'pt-comp-5',
        feature: 'Configuração Sem API',
        values: [
          { type: 'check' },
          { type: 'check' },
          { type: 'check' }
        ]
      },
      {
        _key: 'pt-comp-6',
        feature: 'Funciona com WhatsApp Pessoal',
        values: [
          { type: 'check' },
          { type: 'check' },
          { type: 'check' }
        ]
      }
    ]
  },

  faq: {
    badge: 'Perguntas Frequentes',
    headline: 'Perguntas comuns sobre integrações de CRM',
    items: [
      {
        _key: 'pt-faq-1',
        question: 'Preciso do WhatsApp Business API?',
        answer: 'Não. O Eazybe funciona com WhatsApp pessoal, WhatsApp Business App E WhatsApp Business API. Ao contrário dos concorrentes que exigem migrações de API caras, funcionamos com qualquer WhatsApp que você já usa.'
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

  seo: {
    metaTitle: 'Integrações de CRM do WhatsApp | HubSpot, Salesforce, Zoho',
    metaDescription: 'Conecte o WhatsApp ao seu CRM em 30 minutos. Sem API. Funciona com WhatsApp pessoal. Integrações nativas para HubSpot, Salesforce, Zoho, Bitrix24 e mais.'
  }
};

async function updatePortugueseIntegrations() {
  console.log('🇧🇷 Atualizando página de integrações para Português Brasileiro...\n');

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
  console.log(`   Benefícios: ${ptContent.benefits.items.length} itens`);
  console.log(`   FAQ: ${ptContent.faq.items.length} perguntas`);
}

updatePortugueseIntegrations().catch(console.error);
