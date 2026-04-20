'use client'

import React, { useState, useEffect, useRef } from 'react'
import {
  TrendingUp,
  Users,
  DollarSign,
  Award,
  Rocket,
  Shield,
  Zap,
  Globe,
  CheckCircle2,
  ArrowRight,
  Star,
  Mail,
  Phone,
  ChevronDown,
  Building2,
  Briefcase,
} from 'lucide-react'
import { LocalizedLink } from '@/components/LocalizedLink'

// Partner types data
const partnerTypes = [
  {
    id: 'affiliate',
    commission: 'Up to 30%',
    title: 'Refer. Relax. Reap Rewards.',
    name: 'Affiliate Partner',
    description: 'Connect us with potential clients and let our team handle the rest -- from demo to deal. Earn commissions for every successful conversion.',
    whatYouGet: [
      'No minimum commitment',
      'Unique tracking links',
      'Monthly payouts',
      'Marketing materials provided'
    ],
    idealFor: ['Bloggers', 'Influencers', 'Consultants']
  },
  {
    id: 'reseller',
    commission: 'Up to 40%',
    title: 'Your Clients. Our Technology.',
    name: 'Reseller Partner',
    description: 'You sell and manage client relationships; we power you with complete backend - technology, automation, support, and training.',
    whatYouGet: [
      'White-glove onboarding',
      'Partner portal access',
      'Co-branded materials',
      'Technical training'
    ],
    idealFor: ['Digital Agencies', 'IT Consultants']
  },
  {
    id: 'whitelabel',
    commission: 'Up to 50%',
    title: 'Co-Create & Conquer Markets.',
    name: 'White Label Partner',
    description: 'Build tailored omnichannel solutions for high-potential sectors. Shape go-to-market strategies and share in revenue.',
    whatYouGet: [
      'Full brand customization',
      'API access',
      'Custom integrations',
      'Dedicated support team'
    ],
    idealFor: ['SaaS Companies', 'Enterprise Partners']
  }
]

// Partner benefits data
const benefits = [
  {
    icon: DollarSign,
    title: 'Up to 50% Revenue Share',
    subtitle: 'Highest in Industry',
    description: 'Earn industry-leading commissions on every referral. Our transparent revenue model ensures fair rewards for every client you bring.',
    color: 'from-emerald-500 to-cyan-500'
  },
  {
    icon: Briefcase,
    title: 'Expanded Service Portfolio',
    subtitle: 'Add Value',
    description: 'Add WhatsApp CRM integration to your offerings. Help clients automate sales, support, and marketing through world\'s most popular messaging platform.',
    color: 'from-blue-500 to-indigo-500'
  },
  {
    icon: Rocket,
    title: 'Mutual Growth Engine',
    subtitle: 'Grow Together',
    description: 'Access exclusive partner resources, co-marketing opportunities, and dedicated account management to accelerate your business growth.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Shield,
    title: 'Priority Partner Support',
    subtitle: '24/7 Support',
    description: 'Get direct access to our product team, priority support queue, and dedicated partner success manager for faster resolutions.',
    color: 'from-amber-500 to-orange-500'
  },
  {
    icon: Award,
    title: 'Certified Partner Badge',
    subtitle: 'Build Trust',
    description: 'Stand out with official Eazybe certification. Use our partner badge to build credibility and attract more clients.',
    color: 'from-cyan-500 to-blue-500'
  },
  {
    icon: Zap,
    title: 'Early Access Features',
    subtitle: 'Stay Ahead',
    description: 'Be the first to access new features, beta programs, and product updates. Give your clients the competitive edge they need.',
    color: 'from-violet-500 to-purple-500'
  }
]

// Testimonials data
const testimonials = [
  {
    quote: 'Partnering with Eazybe was a game-changer. We\'ve added WhatsApp CRM to our service stack and increased our agency revenue by 40% in just 6 months.',
    author: 'Rahul Sharma',
    role: 'Founder, Digital Growth Agency',
    earnings: '$50K+',
    avatar: 'https://i.pravatar.cc/150?img=11'
  },
  {
    quote: 'The partner support is exceptional. Whenever my clients have questions, Eazybe team responds within hours. It makes me look great!',
    author: 'Priya Patel',
    role: 'CRM Consultant',
    earnings: '$25K+',
    avatar: 'https://i.pravatar.cc/150?img=5'
  },
  {
    quote: 'As an affiliate, I love the transparent tracking and monthly payouts. My audience trusts my recommendations, and Eazybe delivers every time.',
    author: 'Alex Johnson',
    role: 'Tech Blogger & Influencer',
    earnings: '$15K+',
    avatar: 'https://i.pravatar.cc/150?img=3'
  }
]

// Integration logos
const integrations = [
  { name: 'Zoho CRM', url: '/zoho-whatsapp-integration' },
  { name: 'HubSpot', url: '/hubspot-whatsapp-integration' },
  { name: 'Salesforce', url: '/salesforce-whatsapp-integration' },
  { name: 'Pipedrive', url: '/pipedrive-whatsapp-integration' },
  { name: 'Freshsales', url: '/freshsales-whatsapp-integration' },
  { name: 'Monday.com', url: '/monday-whatsapp-integration' }
]

// FAQ data
const faqs = [
  {
    question: 'How do I become a partner?',
    answer: 'Simply fill out our partner application form takes less than 2 minutes. Most applications are approved within 24-48 hours. Once approved, you\'ll get access to our partner portal with all the resources you need to start earning.'
  },
  {
    question: 'What is the commission structure?',
    answer: 'We offer three partner tiers: Affiliate (up to 30% commission), Reseller (up to 40% commission), and White Label (up to 50% commission). Commissions are paid monthly via your preferred payment method.'
  },
  {
    question: 'Is there a cost to join?',
    answer: 'No! Joining the Eazybe partner program is completely free. There are no upfront costs, no minimum commitments, and no hidden fees. You start earning from your first successful referral.'
  },
  {
    question: 'What marketing materials are provided?',
    answer: 'We provide a comprehensive partner toolkit including tracking links, co-branded marketing materials, email templates, social media content, case studies, and product demos. Everything you need to effectively promote Eazybe.'
  },
  {
    question: 'How are referrals tracked?',
    answer: 'Each partner receives unique tracking links and a dedicated partner portal to monitor clicks, sign-ups, and conversions in real-time. Our transparent tracking ensures you get credit for every referral.'
  },
  {
    question: 'What kind of support do partners get?',
    answer: 'Partners get priority support with dedicated account managers, faster response times, direct access to our product team, co-marketing opportunities, and exclusive training sessions to help you succeed.'
  }
]

// ScrollReveal component
const ScrollReveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{ transitionDelay: `${delay * 100}ms` }}
    >
      {children}
    </div>
  )
}

export function PartnerPageClient() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Glowing Orbs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-8">
              <span className="inline-flex items-center gap-2 font-mono text-xs font-bold text-cyan-400 uppercase tracking-wider bg-slate-900/80 backdrop-blur px-4 py-2 rounded-full border border-cyan-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Join 500+ Successful Partners Worldwide
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Partner With{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent">
                #1 WhatsApp CRM
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-3xl mx-auto">
              Help businesses transform their customer communication while you earn industry-leading commissions.
            </p>

            {/* Features Pills */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              {['Free to Join', '24-Hour Approval', 'Dedicated Support', 'Unlimited Earnings'].map((text) => (
                <span key={text} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 text-slate-300 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  {text}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#apply"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-full shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105"
              >
                Apply Now - It&apos;s 100% Free
                <ArrowRight size={20} />
              </a>
              <a
                href="https://calendly.com/d/cw67-pt3-y2m"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 text-white border border-slate-700 hover:bg-white/10 font-semibold rounded-full transition-all duration-300 hover:scale-105"
              >
                Schedule a Call
              </a>
            </div>

            {/* Trust Badges */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="flex items-start justify-center gap-3 text-slate-400">
                <Shield className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">Official WhatsApp Business Solution Provider</span>
              </div>
              <div className="flex items-start justify-center gap-3 text-slate-400">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">SOC 2 Type II Compliant</span>
              </div>
              <div className="flex items-start justify-center gap-3 text-slate-400">
                <Globe className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">Available in 100+ Countries</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-10 md:py-20 lg:py-28 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal delay={0} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 font-mono text-xs font-bold text-cyan-400 uppercase tracking-wider mb-4">
              Partner Benefits That Drive Your Success
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Why Partner With Us
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              We&apos;ve designed our WhatsApp CRM partner program to maximize your earnings and minimize your efforts
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <ScrollReveal key={index} delay={index + 1} className="group">
                <div className="relative p-8 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  <div className="relative">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${benefit.color} mb-6`}>
                      <benefit.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="pl-[10%]">
                      <span className="inline-block text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">
                        {benefit.subtitle}
                      </span>
                      <h3 className="text-xl font-bold text-white mb-3">
                        {benefit.title}
                      </h3>
                      <p className="text-slate-400 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Models Section */}
      <section className="py-10 md:py-20 lg:py-28 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal delay={0} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 font-mono text-xs font-bold text-cyan-400 uppercase tracking-wider mb-4">
              Choose Your Path to Success
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Partnership Models
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Three flexible WhatsApp CRM partner models designed to match your business goals
            </p>
          </ScrollReveal>

          <div className="grid lg:grid-cols-3 gap-8">
            {partnerTypes.map((partner, index) => (
              <ScrollReveal key={partner.id} delay={index + 1} className="relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-white font-bold text-sm shadow-lg">
                    <DollarSign className="w-4 h-4" />
                    {partner.commission}
                  </div>
                </div>

                <div className="relative pt-8 p-8 rounded-2xl bg-gradient-to-b from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {partner.name}
                    </h3>
                    <p className="text-cyan-400 font-medium mb-4">
                      {partner.title}
                    </p>
                    <p className="text-slate-400 text-sm">
                      {partner.description}
                    </p>
                  </div>

                  <div className="space-y-4 mb-6">
                    <p className="text-sm font-semibold text-white">What You Get:</p>
                    <ul className="space-y-2">
                      {partner.whatYouGet.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-slate-700/50">
                    <p className="text-xs font-semibold text-slate-500 uppercase mb-3">Ideal for:</p>
                    <div className="flex flex-wrap gap-2">
                      {partner.idealFor.map((item, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs font-medium text-cyan-400 bg-cyan-950/50 rounded-full border border-cyan-800/50"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a
                    href="#apply"
                    className="mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl transition-all duration-300"
                  >
                    Apply as {partner.name.split(' ')[0]}
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How to Apply Section */}
      <section className="py-10 md:py-20 lg:py-28 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal delay={0} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 font-mono text-xs font-bold text-cyan-400 uppercase tracking-wider mb-4">
              Simple 5-Step Process
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              How To Become An Eazybe Partner
            </h2>
            <p className="text-lg text-slate-400">
              From application to your first commission -- we&apos;ve made it seamless
            </p>
          </ScrollReveal>

          <div className="space-y-6">
            {[
              { step: '01', title: 'Submit Application', desc: 'Fill out our simple partner application form takes less than 2 minutes' },
              { step: '02', title: 'Quick Review', desc: 'Our team reviews your application within 24-48 hours' },
              { step: '03', title: 'Get Approved', desc: 'Receive welcome email with access to partner portal and resources' },
              { step: '04', title: 'Start Promoting', desc: 'Use your tracking links and marketing materials to refer clients' },
              { step: '05', title: 'Earn Commissions', desc: 'Track referrals and receive monthly payouts for successful conversions' }
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index}>
                <div className="flex items-start gap-6 p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
                  <span className="flex-shrink-0 w-12 h-12 flex items-center justify-center text-lg font-bold text-cyan-400 bg-cyan-950/50 rounded-xl border border-cyan-800/50">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-slate-400">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-10 md:py-20 lg:py-28 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal delay={0} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 font-mono text-xs font-bold text-cyan-400 uppercase tracking-wider mb-4">
              Partner Success Stories
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              What Our Partners Say
            </h2>
            <p className="text-lg text-slate-400">
              Join hundreds of partners who&apos;ve grown their business with Eazybe
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <ScrollReveal key={index} delay={index + 1}>
                <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>

                  <p className="text-slate-300 mb-6 leading-relaxed">
                    &quot;{testimonial.quote}&quot;
                  </p>

                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      className="w-12 h-12 rounded-full border-2 border-slate-700"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-white">{testimonial.author}</p>
                      <p className="text-sm text-slate-400">{testimonial.role}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-500">Earned</p>
                      <p className="text-lg font-bold text-emerald-400">{testimonial.earnings}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Logos Section */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal delay={0} className="text-center mb-10">
            <p className="text-slate-400 mb-8">
              Help your clients integrate with their favorite CRM platforms
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {integrations.map((integration, index) => (
                <LocalizedLink
                  key={index}
                  href={integration.url}
                  className="text-slate-500 hover:text-cyan-400 transition-colors font-semibold text-lg"
                >
                  {integration.name}
                </LocalizedLink>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="apply" className="py-10 md:py-20 lg:pt-28 lg:pb-14 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal delay={0} className="text-center mb-12">
            <span className="inline-flex items-center gap-2 font-mono text-xs font-bold text-cyan-400 uppercase tracking-wider mb-4">
              Apply Today
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Your Partnership Journey Starts Here
            </h2>
            <p className="text-lg text-slate-400 mb-8">
              Join our global ecosystem of innovators, agencies, and consultants who are transforming business communication and earning along the way.
            </p>

            {/* Key Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="text-center">
                <Zap className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <p className="text-white font-semibold">Fast Approval</p>
                <p className="text-sm text-slate-400">Most applications approved within 24-48 hours</p>
              </div>
              <div className="text-center">
                <Users className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <p className="text-white font-semibold">Dedicated Support</p>
                <p className="text-sm text-slate-400">Get a dedicated partner success manager</p>
              </div>
              <div className="text-center">
                <DollarSign className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <p className="text-white font-semibold">No Upfront Costs</p>
                <p className="text-sm text-slate-400">Completely free to join -- start earning immediately</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Contact Info */}
          <ScrollReveal delay={1} className="text-center mb-8 p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50">
            <p className="text-slate-400 mb-4">Have questions? Reach out directly:</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a
                href="mailto:hey@eazybe.com"
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <Mail className="w-5 h-5" />
                hey@eazybe.com
              </a>
              <a
                href="https://calendly.com/d/cw67-pt3-y2m"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <Phone className="w-5 h-5" />
                Schedule a Call
              </a>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-10 md:py-20 lg:pt-14 lg:pb-28 bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal delay={0} className="text-center mb-12">
            <span className="inline-flex items-center gap-2 font-mono text-xs font-bold text-cyan-400 uppercase tracking-wider mb-4">
              FAQs
            </span>
            <h2 className="text-[19px] md:text-3xl lg:text-4xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-slate-400">
              Everything you need to know about the Eazybe Partner Program
            </p>
          </ScrollReveal>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <ScrollReveal key={index} delay={index + 1}>
                <details className="group rounded-2xl bg-slate-800/30 border border-slate-700/50 overflow-hidden">
                  <summary className="w-full flex items-center justify-between p-6 text-left cursor-pointer hover:bg-slate-800/50 transition-colors list-none">
                    <span className="font-semibold text-white pr-8">
                      {faq.question}
                    </span>
                    <ChevronDown className="w-5 h-5 text-cyan-400 flex-shrink-0 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-slate-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </details>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={8} className="text-center mt-10 p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50">
            <p className="text-slate-400 mb-4">Still have questions?</p>
            <a
              href="mailto:hey@eazybe.com"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium"
            >
              <Mail className="w-5 h-5" />
              Email Our Team
            </a>
          </ScrollReveal>
        </div>
      </section>

    </div>
  )
}
