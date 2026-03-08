import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
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
import { useComparisonPageSEO } from '../hooks/useComparisonPageSEO'
import { useComparisonPageSEOBr } from '../hooks/useComparisonPageSEOBr'
import { useComparisonPageSEOEs } from '../hooks/useComparisonPageSEOEs'
import { useComparisonPageSEOTr } from '../hooks/useComparisonPageSEOTr'

// Comparison data structure
interface Competitor {
  id: string
  name: string
  logo: string
  highlight: boolean
  cta: {
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
      text: 'Install for Free',
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
    category: 'Core Features',
    features: [
      {
        name: 'WhatsApp Web Integration',
        values: { eazybe: true, wati: true, interakt: true, quickreply: true, cooby: true, timelines: true, rasayel: true }
      },
      {
        name: 'Team Inbox',
        values: { eazybe: true, wati: true, interakt: true, quickreply: true, cooby: true, timelines: true, rasayel: true }
      },
      {
        name: 'WhatsApp Chat Backup',
        values: { eazybe: true, wati: false, interakt: false, quickreply: false, cooby: false, timelines: false, rasayel: false },
        highlight: 'eazybe'
      },
      {
        name: 'Unlimited Quick Replies',
        values: { eazybe: true, wati: 'Limited', interakt: 'Limited', quickreply: 'Limited', cooby: true, timelines: 'Limited', rasayel: 'Limited' },
        highlight: 'eazybe'
      },
      {
        name: 'Scheduled Messages',
        values: { eazybe: true, wati: true, interakt: true, quickreply: true, cooby: true, timelines: true, rasayel: true }
      },
      {
        name: 'Bulk Messaging',
        values: { eazybe: true, wati: true, interakt: true, quickreply: true, cooby: true, timelines: true, rasayel: true }
      }
    ]
  },
  {
    category: 'CRM Integrations',
    features: [
      {
        name: 'HubSpot Integration',
        values: { eazybe: true, wati: true, interakt: false, quickreply: false, cooby: true, timelines: true, rasayel: true }
      },
      {
        name: 'Salesforce Integration',
        values: { eazybe: true, wati: false, interakt: false, quickreply: false, cooby: false, timelines: false, rasayel: false },
        highlight: 'eazybe'
      },
      {
        name: 'Zoho CRM Integration',
        values: { eazybe: true, wati: true, interakt: true, quickreply: false, cooby: false, timelines: false, rasayel: true }
      },
      {
        name: 'Bitrix24 Integration',
        values: { eazybe: true, wati: false, interakt: false, quickreply: false, cooby: false, timelines: false, rasayel: false },
        highlight: 'eazybe'
      },
      {
        name: 'Webhook Integrations',
        values: { eazybe: true, wati: true, interakt: true, quickreply: true, cooby: true, timelines: true, rasayel: true }
      },
      {
        name: 'Custom Objects Support',
        values: { eazybe: true, wati: false, interakt: false, quickreply: false, cooby: false, timelines: false, rasayel: false },
        highlight: 'eazybe'
      }
    ]
  },
  {
    category: 'AI & Automation',
    features: [
      {
        name: 'AI Unreplied Chats Agent',
        values: { eazybe: true, wati: false, interakt: false, quickreply: true, cooby: false, timelines: false, rasayel: false },
        highlight: 'eazybe'
      },
      {
        name: 'WhatsApp Web Copilot',
        values: { eazybe: true, wati: false, interakt: false, quickreply: false, cooby: false, timelines: false, rasayel: false },
        highlight: 'eazybe'
      },
      {
        name: 'Revenue Inbox',
        values: { eazybe: true, wati: false, interakt: false, quickreply: false, cooby: false, timelines: false, rasayel: false },
        highlight: 'eazybe'
      },
      {
        name: 'RevOps Agent',
        values: { eazybe: true, wati: false, interakt: false, quickreply: false, cooby: false, timelines: false, rasayel: false },
        highlight: 'eazybe'
      },
      {
        name: 'Smart Labeling',
        values: { eazybe: true, wati: true, interakt: true, quickreply: true, cooby: true, timelines: true, rasayel: true }
      },
      {
        name: 'Message Analytics',
        values: { eazybe: true, wati: true, interakt: true, quickreply: true, cooby: true, timelines: true, rasayel: true }
      }
    ]
  },
  {
    category: 'Pricing & Value',
    features: [
      {
        name: 'Starting Price (Monthly)',
        values: { eazybe: '$13', wati: '$49', interakt: '$39', quickreply: '$29', cooby: '$19', timelines: '$25', rasayel: '$35' },
        highlight: 'eazybe'
      },
      {
        name: 'Free Trial',
        values: { eazybe: '7 Days', wati: '7 Days', interakt: '7 Days', quickreply: '7 Days', cooby: '7 Days', timelines: '7 Days', rasayel: '7 Days' }
      },
      {
        name: 'Free Plan Available',
        values: { eazybe: true, wati: false, interakt: false, quickreply: false, cooby: false, timelines: false, rasayel: false },
        highlight: 'eazybe'
      },
      {
        name: 'Annual Discount',
        values: { eazybe: '20%', wati: '15%', interakt: '15%', quickreply: '10%', cooby: '15%', timelines: '15%', rasayel: '10%' },
        highlight: 'eazybe'
      },
      {
        name: 'Per User Pricing',
        values: { eazybe: true, wati: true, interakt: true, quickreply: true, cooby: true, timelines: true, rasayel: true }
      }
    ]
  },
  {
    category: 'Support & Security',
    features: [
      {
        name: 'GDPR Compliant',
        values: { eazybe: true, wati: true, interakt: true, quickreply: true, cooby: true, timelines: true, rasayel: true }
      },
      {
        name: 'Meta Business Partner',
        values: { eazybe: true, wati: true, interakt: true, quickreply: true, cooby: true, timelines: true, rasayel: true }
      },
      {
        name: 'Priority Support',
        values: { eazybe: true, wati: true, interakt: false, quickreply: true, cooby: false, timelines: true, rasayel: false }
      },
      {
        name: 'Dedicated Account Manager',
        values: { eazybe: true, wati: false, interakt: false, quickreply: false, cooby: false, timelines: false, rasayel: false },
        highlight: 'eazybe'
      },
      {
        name: '24/7 Support',
        values: { eazybe: true, wati: false, interakt: false, quickreply: false, cooby: false, timelines: false, rasayel: false },
        highlight: 'eazybe'
      },
      {
        name: 'Implementation Support',
        values: { eazybe: true, wati: false, interakt: false, quickreply: false, cooby: false, timelines: true, rasayel: false }
      }
    ]
  }
]

// Value propositions
const valueProps = [
  {
    icon: <DollarSign className="w-7 h-7" />,
    title: 'Best Price Guarantee',
    description: 'Start at just $13/month - 70% cheaper than Wati, Interakt, and other competitors with more features included.'
  },
  {
    icon: <Puzzle className="w-7 h-7" />,
    title: 'Most Integrations',
    description: 'Connect with 10+ CRMs including Salesforce, HubSpot, Zoho, Bitrix24 - more than any other WhatsApp CRM.'
  },
  {
    icon: <Zap className="w-7 h-7" />,
    title: 'AI-Powered Features',
    description: 'Exclusive AI unreplied chats agent, WhatsApp Web Copilot, Revenue Inbox, and RevOps Agent not found elsewhere.'
  },
  {
    icon: <Shield className="w-7 h-7" />,
    title: 'Enterprise Security',
    description: 'GDPR compliant, Meta Business Partner verified, with bank-grade encryption and data protection.'
  },
  {
    icon: <Clock className="w-7 h-7" />,
    title: 'Fastest Setup',
    description: 'Get started in under 5 minutes. No setup fees or credit card required for trial.'
  },
  {
    icon: <Users className="w-7 h-7" />,
    title: 'Largest User Base',
    description: 'Trusted by 50,000+ businesses worldwide - more users than all other WhatsApp CRMs combined.'
  }
]

// FAQ items
const faqItems = [
  {
    question: 'How does Eazybe compare to other WhatsApp CRMs?',
    answer: 'Eazybe outperforms 20+ WhatsApp CRM platforms including Wati, Interakt, QuickReply, Cooby, Timelines, and Rasayel. We offer 70% cost savings, exclusive AI features like WhatsApp Web Copilot and Revenue Inbox, more CRM integrations including Salesforce, and features no one else has like WhatsApp Chat Backup.'
  },
  {
    question: 'Why is Eazybe more affordable than competitors?',
    answer: 'Eazybe starts at just $13/month while competitors charge $25-$49/month. We believe powerful WhatsApp CRM should be accessible to all businesses. Our efficient operations and larger user base (50,000+) allow us to offer premium features at a fraction of the cost.'
  },
  {
    question: 'What exclusive features does Eazybe offer?',
    answer: 'Eazybe offers exclusive features you won\'t find anywhere else: WhatsApp Chat Backup, Salesforce Integration, WhatsApp Web Copilot, Revenue Inbox, RevOps Agent, AI Unreplied Chats Agent, and Bitrix24 Integration. These features are not available on Wati, Interakt, QuickReply, Cooby, Timelines, or Rasayel.'
  },
  {
    question: 'Is Eazybe suitable for enterprise teams?',
    answer: 'Absolutely! Eazybe serves businesses of all sizes. Our Omnis plan includes dedicated APIs, unlimited message sync, Revenue Inbox, RevOps Agent, and a dedicated account manager for enterprise teams. We scale with your business needs.'
  },
  {
    question: 'Can I migrate from another platform?',
    answer: 'Yes! We make migration easy from any WhatsApp CRM platform. Import your existing contacts, messages, and workflows. Our team provides free migration support for annual plans to ensure a smooth transition from Wati, Interakt, QuickReply, Cooby, or any other platform.'
  },
  {
    question: 'What integrations does Eazybe support?',
    answer: 'Eazybe integrates with 10+ platforms including HubSpot, Salesforce, Zoho CRM, Bitrix24, Google Sheets, Pipedrive, Monday.com, LeadSquared, Freshdesk, Google Calendar, and custom webhooks for any other platform. More integrations than any other WhatsApp CRM.'
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes! We offer a 7-day free trial on all plans with no credit card required. You can explore all features, test integrations, and see how Eazybe fits your workflow before committing.'
  }
]

// Comparison articles for blog section
const comparisonArticles = [
  {
    id: 'eazybe-vs-wati',
    slug: 'eazybe-vs-wati',
    title: 'Eazybe vs Wati: Which WhatsApp CRM is Better?',
    excerpt: 'Compare Eazybe and Wati head-to-head. Discover why Eazybe offers 70% cost savings with exclusive features like WhatsApp Chat Backup and Salesforce integration.',
    category: 'Comparison',
    readTime: 10,
    publishedAt: '2025-03-01',
    featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop',
    competitors: ['Eazybe', 'Wati'],
    verdict: 'Eazybe Wins - Save 70%'
  },
  {
    id: 'eazybe-vs-interakt',
    slug: 'eazybe-vs-interakt',
    title: 'Eazybe vs Interakt: Complete Comparison Guide',
    excerpt: 'A detailed comparison between Eazybe and Interakt. Learn about AI features, CRM integrations, and why Eazybe offers better value for growing businesses.',
    category: 'Comparison',
    readTime: 9,
    publishedAt: '2025-03-05',
    featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop',
    competitors: ['Eazybe', 'Interakt'],
    verdict: 'Eazybe Wins - More AI Features'
  },
  {
    id: 'eazybe-vs-quickreply',
    slug: 'eazybe-vs-quickreply',
    title: 'Eazybe vs QuickReply: Which Platform Wins?',
    excerpt: 'Compare Eazybe and QuickReply side-by-side. Discover exclusive features like WhatsApp Web Copilot, Revenue Inbox, and superior CRM integrations.',
    category: 'Comparison',
    readTime: 8,
    publishedAt: '2025-03-08',
    featuredImage: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=450&fit=crop',
    competitors: ['Eazybe', 'QuickReply'],
    verdict: 'Eazybe Wins - Better Integrations'
  },
  {
    id: 'eazybe-vs-cooby',
    slug: 'eazybe-vs-cooby',
    title: 'Eazybe vs Cooby: Which WhatsApp CRM is Better?',
    excerpt: 'Compare Eazybe and Cooby head-to-head. Discover why Eazybe offers better pricing, exclusive AI features, and more CRM integrations than Cooby.',
    category: 'Comparison',
    readTime: 8,
    publishedAt: '2025-03-09',
    featuredImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=450&fit=crop',
    competitors: ['Eazybe', 'Cooby'],
    verdict: 'Eazybe Wins - Better Value'
  },
  {
    id: 'eazybe-vs-timelines',
    slug: 'eazybe-vs-timelines',
    title: 'Eazybe vs Timelines: Which WhatsApp CRM is Better?',
    excerpt: 'Compare Eazybe and Timelines head-to-head. Discover why Eazybe offers more features at nearly half the price with exclusive AI capabilities.',
    category: 'Comparison',
    readTime: 8,
    publishedAt: '2025-03-10',
    featuredImage: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=450&fit=crop',
    competitors: ['Eazybe', 'Timelines'],
    verdict: 'Eazybe Wins - More Features, Lower Price'
  },
  {
    id: 'eazybe-vs-rasayel',
    slug: 'eazybe-vs-rasayel',
    title: 'Eazybe vs Rasayel: Complete Comparison Guide',
    excerpt: 'A detailed comparison between Eazybe and Rasayel. Learn about features, pricing, integrations, and why Eazybe is the superior choice for WhatsApp CRM.',
    category: 'Comparison',
    readTime: 10,
    publishedAt: '2025-03-12',
    featuredImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=450&fit=crop',
    competitors: ['Eazybe', 'Rasayel'],
    verdict: 'Eazybe Wins - Best Value for Money'
  },
  {
    id: 'eazybe-vs-all',
    slug: 'eazybe-vs-all',
    title: 'Eazybe vs 20+ WhatsApp CRMs: Ultimate Comparison',
    excerpt: 'See how Eazybe compares to all major WhatsApp CRM platforms. Features, pricing, integrations, and why 50,000+ businesses choose Eazybe.',
    category: 'Comparison',
    readTime: 15,
    publishedAt: '2025-03-15',
    featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop',
    competitors: ['Eazybe', '20+ Platforms'],
    verdict: 'Eazybe Wins - #1 Choice'
  }
]

// Comparison Card Component
const ComparisonCard: React.FC<{ article: any }> = ({ article }) => {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/comparison/${article.slug}`)}
      className="group bg-brand-card border border-slate-700 rounded-2xl overflow-hidden hover:border-brand-blue/50 transition-all duration-300 cursor-pointer shadow-xl hover:shadow-2xl hover:shadow-brand-blue/10 h-full flex flex-col"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={article.featuredImage}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className="font-mono text-[10px] uppercase font-bold bg-brand-blue px-2 py-1 rounded text-white">
            {article.category}
          </span>
        </div>
        {article.verdict && (
          <div className="absolute bottom-3 right-3">
            <span className="font-mono text-[10px] uppercase font-bold bg-brand-green/90 px-2 py-1 rounded text-white">
              {article.verdict}
            </span>
          </div>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-4 h-4 text-brand-cyan" />
          <span className="font-mono text-xs text-brand-cyan uppercase">
            {article.competitors.join(' vs ')}
          </span>
        </div>

        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 leading-snug group-hover:text-brand-cyan transition-colors">
          {article.title}
        </h3>

        <p className="text-slate-400 mb-4 line-clamp-2 leading-relaxed text-sm flex-1">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-slate-800">
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase text-slate-500 font-bold">
            <span className="flex items-center gap-1">
              <Clock size={12} /> {article.readTime} min
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={12} /> {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          </div>
          <ArrowRight className="w-4 h-4 text-brand-blue group-hover:text-brand-cyan transition-colors" />
        </div>
      </div>
    </div>
  )
}

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

export const ComparisonPage: React.FC = () => {
  const { t } = useTranslation()
  const { openModal } = useTrialModal()
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  // SEO hooks for comparison page - ensures crawlability for all bots
  useComparisonPageSEO()      // English
  useComparisonPageSEOBr()    // Portuguese (Brazil)
  useComparisonPageSEOEs()    // Spanish
  useComparisonPageSEOTr()    // Turkish

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
              Platform Comparison
            </SectionBadge>

            <h1 className="text-4xl lg:text-6xl font-sans font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
              Why Eazybe Is the{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-green">
                #1 Choice
              </span>{' '}
              for Whatsapp CRM
            </h1>

            <p className="text-xl text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed">
              See how Eazybe compares to 20+ leading WhatsApp CRM platforms. More features, better integrations, and unbeatable pricing - all in one powerful platform.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
                onClick={() => openModal('trial')}
              >
                Start 7-Day Free Trial
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => document.getElementById('comparison-table')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Compare Features
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="mt-16 flex justify-center">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 max-w-3xl">
                {[
                  { value: '50K+', label: 'Active Users' },
                  { value: '4.8/5', label: 'Chrome Rating' },
                  { value: '70%', label: 'Cost Savings' },
                  { value: '20+', label: 'Platforms Compared' }
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
              Feature Comparison
            </SectionBadge>
            <h2 className="text-3xl lg:text-4xl font-sans font-bold text-white mb-4">
              Side-by-Side Feature Comparison
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Compare Eazybe with Wati, Interakt, QuickReply, Cooby, Timelines, Rasayel, and more. See why businesses choose Eazybe for superior features, more integrations, and better value.
            </p>
            <p className="text-sm text-slate-500 mt-2 md:hidden">
              ← Swipe left to see more →
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
                      Features
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
                            RECOMMENDED
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
              Why Eazybe
            </SectionBadge>
            <h2 className="text-3xl lg:text-4xl font-sans font-bold text-white mb-4">
              Why 50,000+ Businesses Choose Eazybe
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Discover why 50,000+ businesses choose Eazybe over Wati, Interakt, QuickReply, Cooby, Timelines, Rasayel, and 20+ other platforms.
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
            Ready to Transform Your WhatsApp Communication?
          </h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Join 50,000+ businesses already using Eazybe to close more deals, provide better support, and scale their operations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
              onClick={() => openModal('trial')}
            >
              Start Your Free Trial
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => openModal('demo')}
            >
              Book a Demo
            </Button>
          </div>
          <p className="mt-6 text-sm text-slate-500">
            No credit card required • 7-day free trial • Cancel anytime
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
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-slate-400">
              Everything you need to know about Eazybe and how it compares to other platforms.
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

      {/* Comparison Articles Blog Section */}
      <section className="py-16 lg:py-24 bg-brand-surface border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <SectionBadge variant="green" className="mb-6">
              <Star className="w-4 h-4" />
              Comparison Articles
            </SectionBadge>
            <h2 className="text-3xl lg:text-4xl font-sans font-bold text-white mb-4">
              Detailed Platform Comparisons
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Deep-dive articles comparing Eazybe with other WhatsApp CRM platforms. Make an informed decision with our comprehensive analysis.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {comparisonArticles.map((article) => (
              <ComparisonCard key={article.id} article={article} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              variant="outline"
              onClick={() => openModal('trial')}
            >
              Install for Free
            </Button>
          </div>
        </div>
      </section>

      <ChunkyFooter />
    </div>
  )
}

export default ComparisonPage
