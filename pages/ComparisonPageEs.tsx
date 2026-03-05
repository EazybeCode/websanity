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
import { useComparisonPageSEOEs } from '../hooks/useComparisonPageSEOEs'

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
      text: 'Inicie Prueba Gratis',
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
    category: 'Funciones Principales',
    features: [
      {
        name: 'Integración con WhatsApp Web',
        values: { eazybe: true, wati: true, interakt: true, quickreply: true, cooby: true, timelines: true, rasayel: true }
      },
      {
        name: 'Bandeja de Entrada del Equipo',
        values: { eazybe: true, wati: true, interakt: true, quickreply: true, cooby: true, timelines: true, rasayel: true }
      },
      {
        name: 'Copia de Seguridad de Chat de WhatsApp',
        values: { eazybe: true, wati: false, interakt: false, quickreply: false, cooby: false, timelines: false, rasayel: false },
        highlight: 'eazybe'
      },
      {
        name: 'Respuestas Rápidas Ilimitadas',
        values: { eazybe: true, wati: 'Limitado', interakt: 'Limitado', quickreply: 'Limitado', cooby: true, timelines: 'Limitado', rasayel: 'Limitado' },
        highlight: 'eazybe'
      },
      {
        name: 'Mensajes Programados',
        values: { eazybe: true, wati: true, interakt: true, quickreply: true, cooby: true, timelines: true, rasayel: true }
      },
      {
        name: 'Mensajería Masiva',
        values: { eazybe: true, wati: true, interakt: true, quickreply: true, cooby: true, timelines: true, rasayel: true }
      }
    ]
  },
  {
    category: 'Integraciones CRM',
    features: [
      {
        name: 'Integración HubSpot',
        values: { eazybe: true, wati: true, interakt: false, quickreply: false, cooby: true, timelines: true, rasayel: true }
      },
      {
        name: 'Integración Salesforce',
        values: { eazybe: true, wati: false, interakt: false, quickreply: false, cooby: false, timelines: false, rasayel: false },
        highlight: 'eazybe'
      },
      {
        name: 'Integración Zoho CRM',
        values: { eazybe: true, wati: true, interakt: true, quickreply: false, cooby: false, timelines: false, rasayel: true }
      },
      {
        name: 'Integración Bitrix24',
        values: { eazybe: true, wati: false, interakt: false, quickreply: false, cooby: false, timelines: false, rasayel: false },
        highlight: 'eazybe'
      },
      {
        name: 'Integraciones Webhook',
        values: { eazybe: true, wati: true, interakt: true, quickreply: true, cooby: true, timelines: true, rasayel: true }
      },
      {
        name: 'Soporte de Objetos Personalizados',
        values: { eazybe: true, wati: false, interakt: false, quickreply: false, cooby: false, timelines: false, rasayel: false },
        highlight: 'eazybe'
      }
    ]
  },
  {
    category: 'IA y Automatización',
    features: [
      {
        name: 'Agente de IA para Chats Sin Respuesta',
        values: { eazybe: true, wati: false, interakt: false, quickreply: true, cooby: false, timelines: false, rasayel: false },
        highlight: 'eazybe'
      },
      {
        name: 'Copiloto de WhatsApp Web',
        values: { eazybe: true, wati: false, interakt: false, quickreply: false, cooby: false, timelines: false, rasayel: false },
        highlight: 'eazybe'
      },
      {
        name: 'Bandeja de Entrada de Ingresos',
        values: { eazybe: true, wati: false, interakt: false, quickreply: false, cooby: false, timelines: false, rasayel: false },
        highlight: 'eazybe'
      },
      {
        name: 'Agente RevOps',
        values: { eazybe: true, wati: false, interakt: false, quickreply: false, cooby: false, timelines: false, rasayel: false },
        highlight: 'eazybe'
      },
      {
        name: 'Etiquetado Inteligente',
        values: { eazybe: true, wati: true, interakt: true, quickreply: true, cooby: true, timelines: true, rasayel: true }
      },
      {
        name: 'Análisis de Mensajes',
        values: { eazybe: true, wati: true, interakt: true, quickreply: true, cooby: true, timelines: true, rasayel: true }
      }
    ]
  },
  {
    category: 'Precios y Valor',
    features: [
      {
        name: 'Precio Inicial (Mensual)',
        values: { eazybe: '$13', wati: '$49', interakt: '$39', quickreply: '$29', cooby: '$19', timelines: '$25', rasayel: '$35' },
        highlight: 'eazybe'
      },
      {
        name: 'Prueba Gratis',
        values: { eazybe: '7 Días', wati: '7 Días', interakt: '7 Días', quickreply: '7 Días', cooby: '7 Días', timelines: '7 Días', rasayel: '7 Días' }
      },
      {
        name: 'Plan Gratis Disponible',
        values: { eazybe: true, wati: false, interakt: false, quickreply: false, cooby: false, timelines: false, rasayel: false },
        highlight: 'eazybe'
      },
      {
        name: 'Descuento Anual',
        values: { eazybe: '20%', wati: '15%', interakt: '15%', quickreply: '10%', cooby: '15%', timelines: '15%', rasayel: '10%' },
        highlight: 'eazybe'
      },
      {
        name: 'Precio por Usuario',
        values: { eazybe: true, wati: true, interakt: true, quickreply: true, cooby: true, timelines: true, rasayel: true }
      }
    ]
  },
  {
    category: 'Soporte y Seguridad',
    features: [
      {
        name: 'Conforme GDPR',
        values: { eazybe: true, wati: true, interakt: true, quickreply: true, cooby: true, timelines: true, rasayel: true }
      },
      {
        name: 'Socio Meta Business',
        values: { eazybe: true, wati: true, interakt: true, quickreply: true, cooby: true, timelines: true, rasayel: true }
      },
      {
        name: 'Soporte Prioritario',
        values: { eazybe: true, wati: true, interakt: false, quickreply: true, cooby: false, timelines: true, rasayel: false }
      },
      {
        name: 'Gerente de Cuenta Dedicado',
        values: { eazybe: true, wati: false, interakt: false, quickreply: false, cooby: false, timelines: false, rasayel: false },
        highlight: 'eazybe'
      },
      {
        name: 'Soporte 24/7',
        values: { eazybe: true, wati: false, interakt: false, quickreply: false, cooby: false, timelines: false, rasayel: false },
        highlight: 'eazybe'
      },
      {
        name: 'Soporte de Implementación',
        values: { eazybe: true, wati: false, interakt: false, quickreply: false, cooby: false, timelines: true, rasayel: false }
      }
    ]
  }
]

// Value propositions
const valueProps = [
  {
    icon: <DollarSign className="w-7 h-7" />,
    title: 'Mejor Precio Garantizado',
    description: 'Comience con solo $13/mes - 70% más económico que Wati, Interakt y otros competidores con más funciones incluidas.'
  },
  {
    icon: <Puzzle className="w-7 h-7" />,
    title: 'Más Integraciones',
    description: 'Conéctese con más de 10 CRMs incluyendo Salesforce, HubSpot, Zoho, Bitrix24 - más que cualquier otro CRM de WhatsApp.'
  },
  {
    icon: <Zap className="w-7 h-7" />,
    title: 'Funciones con IA',
    description: 'Agente de IA exclusivo para chats sin respuesta, Copiloto de WhatsApp Web, Bandeja de Entrada de Ingresos y Agente RevOps que no encontrará en ningún otro lugar.'
  },
  {
    icon: <Shield className="w-7 h-7" />,
    title: 'Seguridad Empresarial',
    description: 'Conforme GDPR, verificado como Socio Meta Business, con encriptación de nivel bancario y protección de datos.'
  },
  {
    icon: <Clock className="w-7 h-7" />,
    title: 'Configuración Más Rápida',
    description: 'Comience en menos de 5 minutos. Sin tarifas de configuración ni tarjeta de crédito necesaria para la prueba.'
  },
  {
    icon: <Users className="w-7 h-7" />,
    title: 'Base de Usuarios Más Grande',
    description: 'Confiado por más de 50,000 empresas en todo el mundo - más usuarios que todos los otros CRMs de WhatsApp combinados.'
  }
]

// FAQ items
const faqItems = [
  {
    question: '¿Cómo se compara Eazybe con otros CRMs de WhatsApp?',
    answer: 'Eazybe supera a más de 20 plataformas de CRM de WhatsApp incluyendo Wati, Interakt, QuickReply, Cooby, Timelines y Rasayel. Ofrecemos 70% de ahorro de costos, funciones exclusivas de IA como Copiloto de WhatsApp Web y Bandeja de Entrada de Ingresos, más integraciones de CRM incluyendo Salesforce, y funciones que nadie más tiene como Copia de Seguridad de Chat de WhatsApp.'
  },
  {
    question: '¿Por qué Eazybe es más accesible que los competidores?',
    answer: 'Eazybe comienza con solo $13/mes mientras que los competidores cobran $25-$49/mes. Creemos que un CRM poderoso de WhatsApp debería ser accesible para todas las empresas. Nuestras operaciones eficientes y base de usuarios más grande (50,000+) nos permiten ofrecer funciones premium a una fracción del costo.'
  },
  {
    question: '¿Qué funciones exclusivas ofrece Eazybe?',
    answer: 'Eazybe ofrece funciones exclusivas que no encontrará en ningún otro lugar: Copia de Seguridad de Chat de WhatsApp, Integración Salesforce, Copiloto de WhatsApp Web, Bandeja de Entrada de Ingresos, Agente RevOps, Agente de IA para Chats Sin Respuesta e Integración Bitrix24. Estas funciones no están disponibles en Wati, Interakt, QuickReply, Cooby, Timelines o Rasayel.'
  },
  {
    question: '¿Es Eazybe adecuado para equipos empresariales?',
    answer: '¡Absolutamente! Eazybe sirve a empresas de todos los tamaños. Nuestro plan Omnis incluye APIs dedicadas, sincronización ilimitada de mensajes, Bandeja de Entrada de Ingresos, Agente RevOps y un gerente de cuenta dedicado para equipos empresariales. Escalamos con las necesidades de su negocio.'
  },
  {
    question: '¿Puedo migrar desde otra plataforma?',
    answer: '¡Sí! Facilitamos la migración desde cualquier plataforma de CRM de WhatsApp. Importe sus contactos, mensajes y flujos de trabajo existentes. Nuestro equipo proporciona soporte gratuito de migración para planes anuales para garantizar una transición fluida desde Wati, Interakt, QuickReply, Cooby o cualquier otra plataforma.'
  },
  {
    question: '¿Qué integraciones admite Eazybe?',
    answer: 'Eazybe se integra con más de 10 plataformas incluyendo HubSpot, Salesforce, Zoho CRM, Bitrix24, Google Sheets, Pipedrive, Monday.com, LeadSquared, Freshdesk, Google Calendar y webhooks personalizados para cualquier otra plataforma. Más integraciones que cualquier otro CRM de WhatsApp.'
  },
  {
    question: '¿Hay una prueba gratis?',
    answer: '¡Sí! Ofrecemos una prueba gratis de 7 días en todos los planes sin necesidad de tarjeta de crédito. Puede explorar todas las funciones, probar integraciones y ver cómo Eazybe se adapta a su flujo de trabajo antes de comprometerse.'
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

export const ComparisonPageEs: React.FC = () => {
  const { openModal } = useTrialModal()
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const navigate = useNavigate()

  // SEO hook for Spanish comparison page
  useComparisonPageSEOEs()

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
              Comparación de Plataformas
            </SectionBadge>

            <h1 className="text-4xl lg:text-6xl font-sans font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
              Por Qué Eazybe Es la{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-green">
                #1 Elección
              </span>{' '}
              para CRM de WhatsApp
            </h1>

            <p className="text-xl text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed">
              Vea cómo se compara Eazybe con más de 20 plataformas líderes de CRM de WhatsApp. Más funciones, mejores integraciones y precios imbatibles, todo en una plataforma poderosa.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
                onClick={() => openModal('trial')}
              >
                Inicie Prueba Gratis de 7 Días
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => document.getElementById('comparison-table')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Comparar Funciones
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="mt-16 flex justify-center">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 max-w-3xl">
                {[
                  { value: '50K+', label: 'Usuarios Activos' },
                  { value: '4.8/5', label: 'Calificación Chrome' },
                  { value: '70%', label: 'Ahorro de Costos' },
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
              Comparación de Funciones
            </SectionBadge>
            <h2 className="text-3xl lg:text-4xl font-sans font-bold text-white mb-4">
              Comparación Detallada de Funciones
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Compare Eazybe con Wati, Interakt, QuickReply, Cooby, Timelines, Rasayel y más. Vea por qué las empresas eligen Eazybe por funciones superiores, más integraciones y mejor valor.
            </p>
            <p className="text-sm text-slate-500 mt-2 md:hidden">
              ← Deslice a la izquierda para ver más →
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
                      Funciones
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
              Por Qué Eazybe
            </SectionBadge>
            <h2 className="text-3xl lg:text-4xl font-sans font-bold text-white mb-4">
              Por Qué Más de 50,000 Empresas Eligen Eazybe
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Descubra por qué más de 50,000 empresas eligen Eazybe en lugar de Wati, Interakt, QuickReply, Cooby, Timelines, Rasayel y más de 20 otras plataformas.
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
            ¿Listo para Transformar Su Comunicación de WhatsApp?
          </h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Únase a más de 50,000 empresas que ya usan Eazybe para cerrar más tratos, brindar mejor soporte y escalar sus operaciones.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
              onClick={() => openModal('trial')}
            >
              Inicie Su Prueba Gratis
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => openModal('demo')}
            >
              Reserve una Demo
            </Button>
          </div>
          <p className="mt-6 text-sm text-slate-500">
            No se requiere tarjeta de crédito • Prueba gratis de 7 días • Cancelar en cualquier momento
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-brand-black">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <SectionBadge variant="cyan" className="mb-6">
              <MessageSquare className="w-4 h-4" />
              Preguntas Frecuentes
            </SectionBadge>
            <h2 className="text-3xl lg:text-4xl font-sans font-bold text-white mb-4">
              Preguntas Frecuentes
            </h2>
            <p className="text-lg text-slate-400">
              Todo lo que necesita saber sobre Eazybe y cómo se compara con otras plataformas.
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

export default ComparisonPageEs
