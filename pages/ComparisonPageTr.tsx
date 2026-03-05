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
import { useComparisonPageSEOTr } from '../hooks/useComparisonPageSEOTr'

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
      text: 'Ücretsiz Deneyi Başlatın',
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
    category: 'Temel Özellikler',
    features: [
      {
        name: 'WhatsApp Web Entegrasyonu',
        values: { eazybe: true, wati: true, interakt: true, quickreply: true, cooby: true, timelines: true, rasayel: true }
      },
      {
        name: 'Takım Gelen Kutusu',
        values: { eazybe: true, wati: true, interakt: true, quickreply: true, cooby: true, timelines: true, rasayel: true }
      },
      {
        name: 'WhatsApp Sohbet Yedeği',
        values: { eazybe: true, wati: false, interakt: false, quickreply: false, cooby: false, timelines: false, rasayel: false },
        highlight: 'eazybe'
      },
      {
        name: 'Sınırsız Hızlı Yanıtlar',
        values: { eazybe: true, wati: 'Sınırlı', interakt: 'Sınırlı', quickreply: 'Sınırlı', cooby: true, timelines: 'Sınırlı', rasayel: 'Sınırlı' },
        highlight: 'eazybe'
      },
      {
        name: 'Planlanmış Mesajlar',
        values: { eazybe: true, wati: true, interakt: true, quickreply: true, cooby: true, timelines: true, rasayel: true }
      },
      {
        name: 'Toplu Mesajlaşma',
        values: { eazybe: true, wati: true, interakt: true, quickreply: true, cooby: true, timelines: true, rasayel: true }
      }
    ]
  },
  {
    category: 'CRM Entegrasyonları',
    features: [
      {
        name: 'HubSpot Entegrasyonu',
        values: { eazybe: true, wati: true, interakt: false, quickreply: false, cooby: true, timelines: true, rasayel: true }
      },
      {
        name: 'Salesforce Entegrasyonu',
        values: { eazybe: true, wati: false, interakt: false, quickreply: false, cooby: false, timelines: false, rasayel: false },
        highlight: 'eazybe'
      },
      {
        name: 'Zoho CRM Entegrasyonu',
        values: { eazybe: true, wati: true, interakt: true, quickreply: false, cooby: false, timelines: false, rasayel: true }
      },
      {
        name: 'Bitrix24 Entegrasyonu',
        values: { eazybe: true, wati: false, interakt: false, quickreply: false, cooby: false, timelines: false, rasayel: false },
        highlight: 'eazybe'
      },
      {
        name: 'Webhook Entegrasyonları',
        values: { eazybe: true, wati: true, interakt: true, quickreply: true, cooby: true, timelines: true, rasayel: true }
      },
      {
        name: 'Özel Nesne Desteği',
        values: { eazybe: true, wati: false, interakt: false, quickreply: false, cooby: false, timelines: false, rasayel: false },
        highlight: 'eazybe'
      }
    ]
  },
  {
    category: 'AI ve Otomasyon',
    features: [
      {
        name: 'Yanıtlanmamış Sohbetler AI Aracısı',
        values: { eazybe: true, wati: false, interakt: false, quickreply: true, cooby: false, timelines: false, rasayel: false },
        highlight: 'eazybe'
      },
      {
        name: 'WhatsApp Web Copilot',
        values: { eazybe: true, wati: false, interakt: false, quickreply: false, cooby: false, timelines: false, rasayel: false },
        highlight: 'eazybe'
      },
      {
        name: 'Gelir Gelen Kutusu',
        values: { eazybe: true, wati: false, interakt: false, quickreply: false, cooby: false, timelines: false, rasayel: false },
        highlight: 'eazybe'
      },
      {
        name: 'RevOps Aracısı',
        values: { eazybe: true, wati: false, interakt: false, quickreply: false, cooby: false, timelines: false, rasayel: false },
        highlight: 'eazybe'
      },
      {
        name: 'Akıllı Etiketleme',
        values: { eazybe: true, wati: true, interakt: true, quickreply: true, cooby: true, timelines: true, rasayel: true }
      },
      {
        name: 'Mesaj Analitiği',
        values: { eazybe: true, wati: true, interakt: true, quickreply: true, cooby: true, timelines: true, rasayel: true }
      }
    ]
  },
  {
    category: 'Fiyatlandırma ve Değer',
    features: [
      {
        name: 'Başlangıç Fiyatı (Aylık)',
        values: { eazybe: '$13', wati: '$49', interakt: '$39', quickreply: '$29', cooby: '$19', timelines: '$25', rasayel: '$35' },
        highlight: 'eazybe'
      },
      {
        name: 'Ücretsiz Deneme',
        values: { eazybe: '7 Gün', wati: '7 Gün', interakt: '7 Gün', quickreply: '7 Gün', cooby: '7 Gün', timelines: '7 Gün', rasayel: '7 Gün' }
      },
      {
        name: 'Ücretsiz Plan Mevcut',
        values: { eazybe: true, wati: false, interakt: false, quickreply: false, cooby: false, timelines: false, rasayel: false },
        highlight: 'eazybe'
      },
      {
        name: 'Yıllık İndirim',
        values: { eazybe: '%20', wati: '%15', interakt: '%15', quickreply: '%10', cooby: '%15', timelines: '%15', rasayel: '%10' },
        highlight: 'eazybe'
      },
      {
        name: 'Kullanıcı Başına Fiyatlandırma',
        values: { eazybe: true, wati: true, interakt: true, quickreply: true, cooby: true, timelines: true, rasayel: true }
      }
    ]
  },
  {
    category: 'Destek ve Güvenlik',
    features: [
      {
        name: 'GDPR Uyumlu',
        values: { eazybe: true, wati: true, interakt: true, quickreply: true, cooby: true, timelines: true, rasayel: true }
      },
      {
        name: 'Meta İş Ortağı',
        values: { eazybe: true, wati: true, interakt: true, quickreply: true, cooby: true, timelines: true, rasayel: true }
      },
      {
        name: 'Öncelikli Destek',
        values: { eazybe: true, wati: true, interakt: false, quickreply: true, cooby: false, timelines: true, rasayel: false }
      },
      {
        name: 'Adanmış Hesap Yöneticisi',
        values: { eazybe: true, wati: false, interakt: false, quickreply: false, cooby: false, timelines: false, rasayel: false },
        highlight: 'eazybe'
      },
      {
        name: '7/24 Destek',
        values: { eazybe: true, wati: false, interakt: false, quickreply: false, cooby: false, timelines: false, rasayel: false },
        highlight: 'eazybe'
      },
      {
        name: 'Uygulama Desteği',
        values: { eazybe: true, wati: false, interakt: false, quickreply: false, cooby: false, timelines: true, rasayel: false }
      }
    ]
  }
]

// Value propositions
const valueProps = [
  {
    icon: <DollarSign className="w-7 h-7" />,
    title: 'En İyi Fiyat Garantisi',
    description: 'Sadece $13/aydan başlayın - Wati, Interakt ve diğer rakiplerden %70 daha ucuz, daha fazla özellik dahil.'
  },
  {
    icon: <Puzzle className="w-7 h-7" />,
    title: 'En Fazla Entegrasyon',
    description: 'Salesforce, HubSpot, Zoho, Bitrix24 dahil 10+ CRM ile bağlanın - diğer tüm WhatsApp CRM\'lerinden daha fazla.'
  },
  {
    icon: <Zap className="w-7 h-7" />,
    title: 'AI Destekli Özellikler',
    description: 'Başka bir yerde bulunmayan Yanıtsız Sohbetler AI aracısı, WhatsApp Web Copilot, Gelir Gelen Kutusu ve RevOps aracısı.'
  },
  {
    icon: <Shield className="w-7 h-7" />,
    title: 'Kurumsal Güvenlik',
    description: 'GDPR uyumlu, Meta İş Ortağı doğrulanmış, banka seviyesinde şifreleme ve veri koruması.'
  },
  {
    icon: <Clock className="w-7 h-7" />,
    title: 'En Hızlı Kurulum',
    description: '5 dakikadan daha kısa sürede başlayın. Kurulum ücreti yok, deneme için kredi kartı gerekmez.'
  },
  {
    icon: <Users className="w-7 h-7" />,
    title: 'En Büyük Kullanıcı Tabanı',
    description: 'Dünya çapında 50.000+ işletme tarafından güveniliyor - diğer tüm WhatsApp CRM\'lerinin toplamından daha fazla kullanıcı.'
  }
]

// FAQ items
const faqItems = [
  {
    question: 'Eazybe diğer WhatsApp CRM\'leriyle nasıl karşılaştırılır?',
    answer: 'Eazybe, Wati, Interakt, QuickReply, Cooby, Timelines ve Rasayel dahil 20+ WhatsApp CRM platformunu geride bırakır. Salesforce dahil daha fazla CRM entegrasyonu, WhatsApp Web Copilot ve Gelir Gelen Kutusu gibi özel AI özellikleri ve hiç kimse tarafından sunulmayan WhatsApp Sohbet Yedeği gibi özellikler sunarak %70 maliyet tasarrufu sağlıyoruz.'
  },
  {
    question: 'Eazybe rakiplerden neden daha uygun fiyatlı?',
    answer: 'Eazybe sadece $13/aydan başlarken, rakipler $25-$49/ay ücret alıyor. Güçlü bir WhatsApp CRM\'nin tüm işletmeler için erişilebilir olması gerektiğine inanıyoruz. Verimli operasyonlarımız ve daha büyük kullanıcı tabanımız (50.000+) bize premium özellikleri bir fraksiyonuna sunmamızı sağlıyor.'
  },
  {
    question: 'Eazybe hangi özel özellikleri sunuyor?',
    answer: 'Eazybe, başka hiçbir yerde bulamayacağınız özel özellikler sunuyor: WhatsApp Sohbet Yedeği, Salesforce Entegrasyonu, WhatsApp Web Copilot, Gelir Gelen Kutusu, RevOps Aracısı, Yanıtsız Sohbetler AI Aracısı ve Bitrix24 Entegrasyonu. Bu özellikler Wati, Interakt, QuickReply, Cooby, Timelines veya Rasayel\'de mevcut değil.'
  },
  {
    question: 'Eazybe kurumsal ekipler için uygun mu?',
    answer: 'Kesinlikle! Eazybe her boyuttaki işletmeye hizmet veriyor. Omnis planımız, kurumsal ekipler için adanmış API\'ler, sınırsız mesaj senkronizasyonu, Gelir Gelen Kutusu, RevOps Aracısı ve adanmış bir hesap yöneticisi içeriyor. İş ihtiyaçlarınızla birlikte ölçekleniyoruz.'
  },
  {
    question: 'Başka bir platformdan geçiş yapabilir miyim?',
    answer: 'Evet! Herhangi bir WhatsApp CRM platformundan geçişi kolaylaştırıyoruz. Mevcut kişilerinizi, mesajlarınızı ve iş akışlarınızı içe aktarın. Ekibimiz, Wati, Interakt, QuickReply, Cooby veya başka bir platformdan sorunsuz bir geçiş sağlamak için yıllık planlar için ücretsiz geçiş desteği sağlıyor.'
  },
  {
    question: 'Eazybe hangi entegrasyonları destekliyor?',
    answer: 'Eazybe, HubSpot, Salesforce, Zoho CRM, Bitrix24, Google Sheets, Pipedrive, Monday.com, LeadSquared, Freshdesk, Google Calendar ve başka herhangi bir platform için özel webhook\'lar dahil 10+ platformla entegre olur. Diğer tüm WhatsApp CRM\'lerinden daha fazla entegrasyon.'
  },
  {
    question: 'Ücretsiz deneme var mı?',
    answer: 'Evet! Kredi kartı gerektirmeden tüm planlarda 7 günlük ücretsiz deneme sunuyoruz. Taahhütte bulunmadan önce tüm özellikleri keşfedebilir, entegrasyonları test edebilir ve Eazybe\'nin iş akışınıza nasıl uyduğunu görebilirsiniz.'
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

export const ComparisonPageTr: React.FC = () => {
  const { openModal } = useTrialModal()
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const navigate = useNavigate()

  // SEO hook for Turkish comparison page
  useComparisonPageSEOTr()

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
              Platform Karşılaştırması
            </SectionBadge>

            <h1 className="text-4xl lg:text-6xl font-sans font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
              Eazybe Neden WhatsApp CRM İçin{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-green">
                #1 Seçim
              </span>
            </h1>

            <p className="text-xl text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed">
              Eazybe\'nin 20+ önde gelen WhatsApp CRM platformuyla nasıl karşılaştırıldığını görün. Daha fazla özellik, daha iyi entegrasyonlar ve yenilmez fiyatlar - hepsi bir güçlü platformda.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
                onClick={() => openModal('trial')}
              >
                7 Günlük Ücretsiz Denemeyi Başlatın
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => document.getElementById('comparison-table')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Özellikleri Karşılaştırın
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="mt-16 flex justify-center">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 max-w-3xl">
                {[
                  { value: '50B+', label: 'Aktif Kullanıcı' },
                  { value: '4.8/5', label: 'Chrome Puanı' },
                  { value: '%70', label: 'Maliyet Tasarrufu' },
                  { value: '20+', label: 'Karşılaştırılan Platform' }
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
              Özellik Karşılaştırması
            </SectionBadge>
            <h2 className="text-3xl lg:text-4xl font-sans font-bold text-white mb-4">
              Ayrıntılı Özellik Karşılaştırması
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Eazybe\'yi Wati, Interakt, QuickReply, Cooby, Timelines, Rasayel ve daha fazlasıyla karşılaştırın. İşletmelerin neden üstün özellikler, daha fazla entegrasyon ve daha iyi değer için Eazybe\'yi seçtiğini görün.
            </p>
            <p className="text-sm text-slate-500 mt-2 md:hidden">
              ← Daha fazlasını görmek için sola kaydırın →
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
                      Özellikler
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
                            ÖNERİLEN
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
              Neden Eazybe
            </SectionBadge>
            <h2 className="text-3xl lg:text-4xl font-sans font-bold text-white mb-4">
              50.000+ İşletme Neden Eazybe'yi Seçiyor
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              50.000+ işletmenin neden Wati, Interakt, QuickReply, Cooby, Timelines, Rasayel ve 20+ başka platform yerine Eazybe'yi seçtiğini keşfedin.
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
            WhatsApp İletişiminizi Dönüştürmeye Hazır mısınız?
          </h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Eazybe kullanarak daha fazla anlaşma kapatmak, daha iyi destek sağlamak ve operasyonlarınızı ölçeklendirmek için zaten 50.000+ işletmeye katılın.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
              onClick={() => openModal('trial')}
            >
              Ücretsiz Denemenizi Başlatın
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => openModal('demo')}
            >
              Demo Randevusu Alın
            </Button>
          </div>
          <p className="mt-6 text-sm text-slate-500">
            Kredi kartı gerekmez • 7 günlük ücretsiz deneme • İstediğiniz zaman iptal edin
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-brand-black">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <SectionBadge variant="cyan" className="mb-6">
              <MessageSquare className="w-4 h-4" />
              SSS
            </SectionBadge>
            <h2 className="text-3xl lg:text-4xl font-sans font-bold text-white mb-4">
              Sıkça Sorulan Sorular
            </h2>
            <p className="text-lg text-slate-400">
              Eazybe ve diğer platformlarla nasıl karşılaştırıldığı hakkında bilmeniz gereken her şey.
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

export default ComparisonPageTr
