import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Check,
  X,
  Zap,
  Shield,
  Users,
  TrendingUp,
  Star,
  ArrowRight,
  MessageSquare,
  Puzzle,
  Clock,
  Calendar,
  DollarSign,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { ChunkyFooter } from '../components/footer/ChunkyFooter'
import { SectionBadge } from '../components/ui/SectionBadge'
import { Button } from '../components/ui/Button'
import { useTrialModal } from '../contexts/TrialModalContext'
import { useComparisonPageSEOBr } from '../hooks/useComparisonPageSEOBr'

// Comparison data structure
interface Competitor {
  id: string
  name: string
  logo: string
  highlight: boolean
  cta?: {
    text: string
    url: string
  }
}

interface FeatureComparison {
  category: string
  features: {
    name: string
    values: Record<string, boolean | string>
    highlight?: string
  }[]
}

// Comparison competitors
const competitors: Competitor[] = [
  {
    id: 'eazybe',
    name: 'Eazybe',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://eazybe.com&size=128',
    highlight: true,
    cta: {
      text: 'Inicie Teste Grátis',
      url: 'https://chromewebstore.google.com/detail/eazybe-best-whatsapp-web/clgficggccelgifppbcaepjdkklfcefd'
    }
  },
  {
    id: 'wati',
    name: 'Wati',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.wati.io&size=128',
    highlight: false
  },
  {
    id: 'interakt',
    name: 'Interakt',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://interakt.shop&size=128',
    highlight: false
  },
  {
    id: 'quickreply',
    name: 'QuickReply',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.quickreply.ai&size=128',
    highlight: false
  },
  {
    id: 'cooby',
    name: 'Cooby',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.cooby.co&size=128',
    highlight: false
  },
  {
    id: 'timelines',
    name: 'Timelines',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://timelines.ai&size=128',
    highlight: false
  },
  {
    id: 'rasayel',
    name: 'Rasayel',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.rasayel.io&size=128',
    highlight: false
  }
]

// Feature comparison data
const featureComparisons: FeatureComparison[] = [
  {
    category: 'Recursos Principais',
    features: [
      {
        name: 'Integração com WhatsApp Web',
        values: { eazybe: true, wati: true, interakt: true, quickreply: true, cooby: true, timelines: true, rasayel: true }
      },
      {
        name: 'Caixa de Entrada da Equipe',
        values: { eazybe: true, wati: true, interakt: true, quickreply: true, cooby: true, timelines: true, rasayel: true }
      },
      {
        name: 'Backup de Chat do WhatsApp',
        values: { eazybe: true, wati: false, interakt: false, quickreply: false, cooby: false, timelines: false, rasayel: false },
        highlight: 'eazybe'
      },
      {
        name: 'Respostas Rápidas Ilimitadas',
        values: { eazybe: true, wati: 'Limitado', interakt: 'Limitado', quickreply: 'Limitado', cooby: true, timelines: 'Limitado', rasayel: 'Limitado' },
        highlight: 'eazybe'
      },
      {
        name: 'Mensagens Agendadas',
        values: { eazybe: true, wati: true, interakt: true, quickreply: true, cooby: true, timelines: true, rasayel: true }
      },
      {
        name: 'Envio em Massa',
        values: { eazybe: true, wati: true, interakt: true, quickreply: true, cooby: true, timelines: true, rasayel: true }
      }
    ]
  },
  {
    category: 'Integrações de CRM',
    features: [
      {
        name: 'Integração HubSpot',
        values: { eazybe: true, wati: true, interakt: false, quickreply: false, cooby: true, timelines: true, rasayel: true }
      },
      {
        name: 'Integração Salesforce',
        values: { eazybe: true, wati: false, interakt: false, quickreply: false, cooby: false, timelines: false, rasayel: false },
        highlight: 'eazybe'
      },
      {
        name: 'Integração Zoho CRM',
        values: { eazybe: true, wati: true, interakt: true, quickreply: false, cooby: false, timelines: false, rasayel: true }
      },
      {
        name: 'Integração Bitrix24',
        values: { eazybe: true, wati: false, interakt: false, quickreply: false, cooby: false, timelines: false, rasayel: false },
        highlight: 'eazybe'
      },
      {
        name: 'Integrações via Webhook',
        values: { eazybe: true, wati: true, interakt: true, quickreply: true, cooby: true, timelines: true, rasayel: true }
      },
      {
        name: 'Suporte a Objetos Personalizados',
        values: { eazybe: true, wati: false, interakt: false, quickreply: false, cooby: false, timelines: false, rasayel: false },
        highlight: 'eazybe'
      }
    ]
  },
  {
    category: 'IA e Automação',
    features: [
      {
        name: 'Agente de IA para Chats Não Respondidos',
        values: { eazybe: true, wati: false, interakt: false, quickreply: true, cooby: false, timelines: false, rasayel: false },
        highlight: 'eazybe'
      },
      {
        name: 'Copiloto do WhatsApp Web',
        values: { eazybe: true, wati: false, interakt: false, quickreply: false, cooby: false, timelines: false, rasayel: false },
        highlight: 'eazybe'
      },
      {
        name: 'Caixa de Entrada de Receita',
        values: { eazybe: true, wati: false, interakt: false, quickreply: false, cooby: false, timelines: false, rasayel: false },
        highlight: 'eazybe'
      },
      {
        name: 'Agente RevOps',
        values: { eazybe: true, wati: false, interakt: false, quickreply: false, cooby: false, timelines: false, rasayel: false },
        highlight: 'eazybe'
      },
      {
        name: 'Etiquetagem Inteligente',
        values: { eazybe: true, wati: true, interakt: true, quickreply: true, cooby: true, timelines: true, rasayel: true }
      },
      {
        name: 'Análise de Mensagens',
        values: { eazybe: true, wati: true, interakt: true, quickreply: true, cooby: true, timelines: true, rasayel: true }
      }
    ]
  },
  {
    category: 'Preços e Valor',
    features: [
      {
        name: 'Preço Inicial (Mensal)',
        values: { eazybe: '$13', wati: '$49', interakt: '$39', quickreply: '$29', cooby: '$19', timelines: '$25', rasayel: '$35' },
        highlight: 'eazybe'
      },
      {
        name: 'Teste Grátis',
        values: { eazybe: '7 Dias', wati: '7 Dias', interakt: '7 Dias', quickreply: '7 Dias', cooby: '7 Dias', timelines: '7 Dias', rasayel: '7 Dias' }
      },
      {
        name: 'Plano Gratuito Disponível',
        values: { eazybe: true, wati: false, interakt: false, quickreply: false, cooby: false, timelines: false, rasayel: false },
        highlight: 'eazybe'
      },
      {
        name: 'Desconto Anual',
        values: { eazybe: '20%', wati: '15%', interakt: '15%', quickreply: '10%', cooby: '15%', timelines: '15%', rasayel: '10%' },
        highlight: 'eazybe'
      },
      {
        name: 'Preço por Usuário',
        values: { eazybe: true, wati: true, interakt: true, quickreply: true, cooby: true, timelines: true, rasayel: true }
      }
    ]
  },
  {
    category: 'Suporte e Segurança',
    features: [
      {
        name: 'Conforme GDPR',
        values: { eazybe: true, wati: true, interakt: true, quickreply: true, cooby: true, timelines: true, rasayel: true }
      },
      {
        name: 'Parceiro Meta Business',
        values: { eazybe: true, wati: true, interakt: true, quickreply: true, cooby: true, timelines: true, rasayel: true }
      },
      {
        name: 'Suporte Prioritário',
        values: { eazybe: true, wati: true, interakt: false, quickreply: true, cooby: false, timelines: true, rasayel: false }
      },
      {
        name: 'Gerente de Conta Dedicado',
        values: { eazybe: true, wati: false, interakt: false, quickreply: false, cooby: false, timelines: false, rasayel: false },
        highlight: 'eazybe'
      },
      {
        name: 'Suporte 24/7',
        values: { eazybe: true, wati: false, interakt: false, quickreply: false, cooby: false, timelines: false, rasayel: false },
        highlight: 'eazybe'
      },
      {
        name: 'Suporte de Implementação',
        values: { eazybe: true, wati: false, interakt: false, quickreply: false, cooby: false, timelines: true, rasayel: false }
      }
    ]
  }
]

// Value propositions
const valueProps = [
  {
    icon: <DollarSign className="w-7 h-7" />,
    title: 'Melhor Preço Garantido',
    description: 'Comece apenas com $13/mês - 70% mais barato que Wati, Interakt e outros concorrentes com mais recursos incluídos.'
  },
  {
    icon: <Puzzle className="w-7 h-7" />,
    title: 'Mais Integrações',
    description: 'Conecte-se com 10+ CRMs incluindo Salesforce, HubSpot, Zoho, Bitrix24 - mais do que qualquer outro CRM do WhatsApp.'
  },
  {
    icon: <Zap className="w-7 h-7" />,
    title: 'Recursos com IA',
    description: 'Agente de IA exclusivo para chats não respondidos, Copiloto do WhatsApp Web, Caixa de Entrada de Receita e Agente RevOps não encontrados em outros lugares.'
  },
  {
    icon: <Shield className="w-7 h-7" />,
    title: 'Segurança Empresarial',
    description: 'Conforme GDPR, verificado como Parceiro Meta Business, com criptografia de nível bancário e proteção de dados.'
  },
  {
    icon: <Clock className="w-7 h-7" />,
    title: 'Configuração Mais Rápida',
    description: 'Comece em menos de 5 minutos. Sem taxas de configuração ou cartão de crédito necessário para o teste.'
  },
  {
    icon: <Users className="w-7 h-7" />,
    title: 'Maior Base de Usuários',
    description: 'Confiado por mais de 50.000 empresas em todo o mundo - mais usuários do que todos os outros CRMs do WhatsApp combinados.'
  }
]

// FAQ items
const faqItems = [
  {
    question: 'Como o Eazybe se compara a outros CRMs do WhatsApp?',
    answer: 'O Eazybe supera 20+ plataformas de CRM do WhatsApp incluindo Wati, Interakt, QuickReply, Cooby, Timelines e Rasayel. Oferecemos 70% de economia de custos, recursos exclusivos de IA como Copiloto do WhatsApp Web e Caixa de Entrada de Receita, mais integrações de CRM incluindo Salesforce, e recursos que ninguém mais tem como Backup de Chat do WhatsApp.'
  },
  {
    question: 'Por que o Eazybe é mais acessível que os concorrentes?',
    answer: 'O Eazybe começa com apenas $13/mês enquanto os concorrentes cobram $25-$49/mês. Acreditamos que um CRM poderoso do WhatsApp deve ser acessível para todas as empresas. Nossas operações eficientes e base de usuários maior (50.000+) nos permitem oferecer recursos premium a uma fração do custo.'
  },
  {
    question: 'Quais recursos exclusivos o Eazybe oferece?',
    answer: 'O Eazybe oferece recursos exclusivos que você não encontrará em nenhum outro lugar: Backup de Chat do WhatsApp, Integração Salesforce, Copiloto do WhatsApp Web, Caixa de Entrada de Receita, Agente RevOps, Agente de IA para Chats Não Respondidos e Integração Bitrix24. Esses recursos não estão disponíveis no Wati, Interakt, QuickReply, Cooby, Timelines ou Rasayel.'
  },
  {
    question: 'O Eazybe é adequado para equipes empresariais?',
    answer: 'Absolutamente! O Eazybe atende empresas de todos os tamanhos. Nosso plano Omnis inclui APIs dedicadas, sincronização ilimitada de mensagens, Caixa de Entrada de Receita, Agente RevOps e um gerente de conta dedicado para equipes empresariais. Escalamos com as necessidades do seu negócio.'
  },
  {
    question: 'Posso migrar de outra plataforma?',
    answer: 'Sim! Facilitamos a migração de qualquer plataforma de CRM do WhatsApp. Importe seus contatos, mensagens e fluxos de trabalho existentes. Nossa equipe fornece suporte gratuito de migração para planos anuais para garantir uma transição suave do Wati, Interakt, QuickReply, Cooby ou qualquer outra plataforma.'
  },
  {
    question: 'Quais integrações o Eazybe suporta?',
    answer: 'O Eazybe se integra com 10+ plataformas incluindo HubSpot, Salesforce, Zoho CRM, Bitrix24, Google Sheets, Pipedrive, Monday.com, LeadSquared, Freshdesk, Google Calendar e webhooks personalizados para qualquer outra plataforma. Mais integrações do que qualquer outro CRM do WhatsApp.'
  },
  {
    question: 'Existe um teste grátis?',
    answer: 'Sim! Oferecemos um teste grátis de 7 dias em todos os planos sem necessidade de cartão de crédito. Você pode explorar todos os recursos, testar integrações e ver como o Eazybe se adapta ao seu fluxo de trabalho antes de se comprometer.'
  }
]

// Render cell value
const RenderValue: React.FC<{ value: boolean | string; highlight?: boolean }> = ({ value, highlight }) => {
  if (typeof value === 'boolean') {
    return value ? (
      <div className={`w-7 h-7 rounded-full ${highlight ? 'bg-brand-green/30 ring-2 ring-brand-green/50' : 'bg-brand-green/20'} flex items-center justify-center mx-auto`}>
        <Check size={16} className="text-brand-green" strokeWidth={3} />
      </div>
    ) : (
      <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center mx-auto">
        <X size={16} className="text-slate-600" strokeWidth={3} />
      </div>
    )
  }

  if (highlight) {
    return (
      <span className="inline-block px-3 py-1 bg-brand-green/20 text-brand-green text-sm font-bold rounded-full">
        {value}
      </span>
    )
  }

  return <span className="text-sm text-slate-300 font-medium">{value}</span>
}

export const ComparisonPageBr: React.FC = () => {
  const { openModal } = useTrialModal()
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const navigate = useNavigate()

  // SEO hook for Brazilian Portuguese comparison page
  useComparisonPageSEOBr()

  return (
    <div className="min-h-screen bg-brand-black font-sans text-slate-400 antialiased selection:bg-brand-blue selection:text-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden bg-brand-black">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-blue/10 rounded-full blur-[120px] -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <SectionBadge variant="cyan" className="mb-6">
              <Star className="w-4 h-4" />
              Comparação de Plataformas
            </SectionBadge>

            <h1 className="text-4xl lg:text-6xl font-sans font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
              Por Que o Eazybe É a{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-green">
                #1 Escolha
              </span>{' '}
              para CRM do WhatsApp
            </h1>

            <p className="text-xl text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed">
              Veja como o Eazybe se compara a 20+ plataformas líderes de CRM do WhatsApp. Mais recursos, melhores integrações e preços imbatíveis - tudo em uma plataforma poderosa.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
                onClick={() => openModal('trial')}
              >
                Inicie Teste Grátis de 7 Dias
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => document.getElementById('comparison-table')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Comparar Recursos
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="mt-16 flex justify-center">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 max-w-3xl">
                {[
                  { value: '50K+', label: 'Usuários Ativos' },
                  { value: '4.8/5', label: 'Avaliação Chrome' },
                  { value: '70%', label: 'Economia de Custos' },
                  { value: '20+', label: 'Plataformas Comparadas' }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-cyan mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-slate-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section id="comparison-table" className="py-16 lg:py-24 bg-brand-surface border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <SectionBadge variant="orange" className="mb-6">
              Comparação de Recursos
            </SectionBadge>
            <h2 className="text-3xl lg:text-4xl font-sans font-bold text-white mb-4">
              Comparação Detalhada de Recursos
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Compare o Eazybe com Wati, Interakt, QuickReply, Cooby, Timelines, Rasayel e mais. Veja por que as empresas escolhem o Eazybe por recursos superiores, mais integrações e melhor valor.
            </p>
            <p className="text-sm text-slate-500 mt-2 md:hidden">
              ← Deslize para a esquerda para ver mais →
            </p>
          </div>

          {/* Comparison Table */}
          <div className="relative rounded-2xl border border-slate-700 bg-brand-card overflow-hidden">
            {/* Mobile scroll wrapper */}
            <div className="overflow-x-auto -mx-4 px-4 lg:mx-0 lg:px-0">
              <div className="min-w-[1200px]">
                {/* Table Header */}
                <div className="grid grid-cols-8 border-b border-slate-700 bg-brand-surface">
                  <div className="p-4 lg:p-6">
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-slate-500">
                      Recursos
                    </span>
                  </div>
                  {competitors.map((competitor, index) => (
                    <div
                      key={competitor.id}
                      className={`p-4 lg:p-6 text-center ${index > 0 ? 'border-l border-slate-700' : ''} ${competitor.highlight ? 'bg-brand-blue/10' : ''}`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 flex items-center justify-center bg-white rounded-lg overflow-hidden">
                          <img
                            src={competitor.logo}
                            alt={competitor.name}
                            className="w-8 h-8 object-contain"
                          />
                        </div>
                        <span className={`text-base lg:text-lg font-bold ${competitor.highlight ? 'text-brand-blue' : 'text-white'}`}>
                          {competitor.name}
                        </span>
                        {competitor.highlight && (
                          <span className="inline-block px-3 py-1 bg-brand-green/20 text-brand-green text-xs font-bold rounded-full">
                            RECOMENDADO
                          </span>
                        )}
                        {competitor.cta && (
                          <Button
                            variant={competitor.highlight ? 'primary' : 'outline'}
                            size="sm"
                            className="mt-2 text-xs"
                            onClick={() => openModal('trial')}
                          >
                            {competitor.cta.text}
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Table Body */}
                {featureComparisons.map((category) => (
                  <div key={category.category}>
                    {/* Category Header */}
                    <div className="grid grid-cols-8 border-b border-slate-800 bg-slate-900/50">
                      <div className="p-3 lg:p-4 col-span-5">
                        <span className="font-mono text-xs font-bold uppercase tracking-widest text-brand-cyan">
                          {category.category}
                        </span>
                      </div>
                    </div>

                    {/* Category Features */}
                    {category.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="grid grid-cols-8 border-b border-slate-800 last:border-b-0 hover:bg-slate-800/30 transition-colors"
                      >
                        <div className="p-3 lg:p-4 flex items-center gap-2">
                          <span className="text-xs lg:text-sm text-slate-300 flex-1">{feature.name}</span>
                          {feature.highlight === 'eazybe' && (
                            <CheckCircle2 className="w-4 h-4 text-brand-green flex-shrink-0" />
                          )}
                        </div>
                        {competitors.map((competitor) => (
                          <div
                            key={`${competitor.id}-${featureIndex}`}
                            className={`p-3 lg:p-4 flex items-center justify-center border-l border-slate-800 ${competitor.highlight ? 'bg-brand-blue/5' : ''}`}
                          >
                            <RenderValue
                              value={feature.values[competitor.id]}
                              highlight={feature.highlight === competitor.id}
                            />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Eazybe Section */}
      <section className="py-16 lg:py-24 bg-brand-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <SectionBadge variant="green" className="mb-6">
              <CheckCircle2 className="w-4 h-4" />
              Por Que Eazybe
            </SectionBadge>
            <h2 className="text-3xl lg:text-4xl font-sans font-bold text-white mb-4">
              Por Que Mais de 50.000 Empresas Escolhem o Eazybe
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Descubra por que mais de 50.000 empresas escolhem o Eazybe em vez de Wati, Interakt, QuickReply, Cooby, Timelines, Rasayel e mais de 20 outras plataformas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {valueProps.map((prop, index) => (
              <div
                key={index}
                className="group relative bg-brand-card border border-slate-700 rounded-2xl p-8 hover:border-brand-blue/50 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-brand-cyan/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-blue/20 to-brand-cyan/20 flex items-center justify-center text-brand-blue mb-6">
                    {prop.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {prop.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {prop.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-brand-blue/10 via-brand-cyan/10 to-brand-green/10 border-y border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-sans font-bold text-white mb-6">
            Pronto para Transformar Sua Comunicação no WhatsApp?
          </h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Junte-se a mais de 50.000 empresas que já usam o Eazybe para fechar mais negócios, fornecer melhor suporte e escalar suas operações.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
              onClick={() => openModal('trial')}
            >
              Inicie Seu Teste Grátis
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => openModal('demo')}
            >
              Agende uma Demo
            </Button>
          </div>
          <p className="mt-6 text-sm text-slate-500">
            Sem cartão de crédito • Teste grátis de 7 dias • Cancele a qualquer momento
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-brand-black">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <SectionBadge variant="cyan" className="mb-6">
              <MessageSquare className="w-4 h-4" />
              FAQ
            </SectionBadge>
            <h2 className="text-3xl lg:text-4xl font-sans font-bold text-white mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-lg text-slate-400">
              Tudo o que você precisa saber sobre o Eazybe e como ele se compara a outras plataformas.
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((faq, index) => (
              <div
                key={index}
                className="bg-brand-card border border-slate-700 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-slate-800/50 transition-colors"
                >
                  <span className="font-semibold text-white pr-4">{faq.question}</span>
                  {expandedFaq === index ? (
                    <AlertCircle className="w-5 h-5 text-brand-blue flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-slate-500 flex-shrink-0" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-5 pt-2">
                    <p className="text-slate-400 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <ChunkyFooter />
    </div>
  )
}

export default ComparisonPageBr
