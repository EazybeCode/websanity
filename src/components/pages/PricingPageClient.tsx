'use client'

import React, { useState } from 'react'
import { useLocale } from 'next-intl'
import { Zap, Rocket, Building2, Shield, Clock, MessageSquare, X, Sparkles } from 'lucide-react'
import { useDynamicPricing } from '@/hooks/useDynamicPricing'
import { LeadGenerationForm } from '@/components/lead/LeadGenerationForm'
import { CHROME_STORE_WEBSITE_URL } from '@/utils/openChromeExtensionStore'

const WhatsAppGlyph = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.967-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488" />
  </svg>
)

// ─── Types ──────────────────────────────────────────────────────────────────

interface PricingFeature {
  text: string
  included: boolean
  highlight?: boolean
}

interface PricingPlan {
  name: string
  planKey: string
  description: string
  monthlyPrice: number
  annualPrice: number
  currency: string
  icon: 'starter' | 'growth' | 'enterprise' | 'sparkles'
  popular?: boolean
  enterprise?: boolean
  priceNote?: string
  features: PricingFeature[]
  cta: { label: string; url: string }
}

interface FAQItem { question: string; answer: string }

interface ComparisonFeatureRow {
  feature: string
  starter: boolean | string
  scaler: boolean | string
  basicAi: boolean | string
  proAi: boolean | string
  category?: string
}

interface PricingData {
  hero?: {
    badge?: string
    headline?: string
    headlineHighlight?: string
    subheadline?: string
    billingToggleMonthly?: string
    billingToggleAnnual?: string
    saveBadgeText?: string
  }
  plans?: Array<{
    name: string; description: string; icon: string
    monthlyPrice: number; annualPrice: number; currency: string
    isPopular?: boolean; isEnterprise?: boolean
    features: Array<{ text: string; included: boolean; highlight?: boolean }>
    cta: { label: string; url: string }
  }>
  comparisonSection?: {
    badge?: string; title?: string; subtitle?: string
    features?: Array<{ feature: string; category: string; starter: string; scaler: string; omnis: string }>
  }
  faqSection?: {
    badge?: string; title?: string; subtitle?: string; contactLinkText?: string
    faqs?: Array<{ question: string; answer: string }>
  }
}

// ─── Default fallback data ──────────────────────────────────────────────────

const defaultPricingPlans: PricingPlan[] = [
  {
    name: 'Starter', planKey: 'starter',
    description: 'Perfect for individuals and small teams getting started with WhatsApp CRM integration.',
    monthlyPrice: 13, annualPrice: 10, currency: '$', icon: 'starter',
    features: [
      { text: 'Team Inbox', included: true, highlight: true },
      { text: 'Unlimited labels & funnels', included: true },
      { text: 'Unlimited quick replies', included: true },
      { text: 'Unlimited scheduled messages', included: true },
      { text: 'WhatsApp chat backup', included: true },
      { text: 'HubSpot, Zoho, Bitrix, Google Sheets', included: true, highlight: true },
      { text: 'Send messages from CRM', included: true },
      { text: 'Salesforce integration', included: false },
      { text: 'Revenue Inbox', included: false },
    ],
    cta: { label: 'Install for Free', url: CHROME_STORE_WEBSITE_URL },
  },
  {
    name: 'Scaler', planKey: 'scaler',
    description: 'For growing teams that need advanced integrations and AI-powered automation.',
    monthlyPrice: 19, annualPrice: 15, currency: '$', icon: 'growth', popular: true,
    features: [
      { text: 'Everything in Starter', included: true },
      { text: 'Salesforce integration', included: true, highlight: true },
      { text: 'Webhook integrations', included: true, highlight: true },
      { text: 'Cloud connection', included: true, highlight: true },
      { text: 'WhatsApp API', included: true, highlight: true },
      { text: 'Custom objects in mini CRM view', included: true },
      { text: 'CRM property-to-WhatsApp labeling', included: true },
      { text: 'Dedicated APIs', included: true },
      { text: 'CRM workflow integration', included: true },
      { text: 'RevOps Agent', included: false },
    ],
    cta: { label: 'Install for Free', url: CHROME_STORE_WEBSITE_URL },
  },
  {
    name: 'Basic AI', planKey: 'basic-ai',
    description: 'Get started with AI agents on top of your full Scaler stack.',
    monthlyPrice: 79, annualPrice: 59, currency: '$', icon: 'sparkles',
    features: [
      { text: 'Everything in Scaler', included: true },
      { text: 'AI agents', included: true, highlight: true },
      { text: 'Intelligence-Led CRM Properties', included: true, highlight: true },
      { text: 'AI-driven Chat Organization', included: true, highlight: true },
      { text: 'BrainBe knowledge base included', included: true },
      { text: 'Voice AI calling', included: false },
      { text: '100+ integrations (Email, Teams, Slack...)', included: false },
    ],
    cta: { label: 'Talk to our AI Agent', url: '/contact?plan=basic-ai' },
  },
  {
    name: 'Pro AI', planKey: 'pro-ai',
    description: 'Advanced agents, voice, ads automation and 100+ integrations.',
    monthlyPrice: 199, annualPrice: 199, currency: '$', icon: 'growth', popular: true,
    features: [
      { text: 'Everything in Basic AI', included: true },
      { text: 'Click-to-WhatsApp Ads agent', included: true, highlight: true },
      { text: 'Voice AI calling', included: true, highlight: true },
      { text: "BrainBe — your company's brain", included: true },
      { text: '100+ integrations (Email, Teams, Slack...)', included: true },
      { text: 'Includes $90 monthly credits (rollover)', included: true },
    ],
    cta: { label: 'Talk to our AI Agent', url: '/contact?plan=pro-ai' },
  },
]

const defaultComparisonFeatures: ComparisonFeatureRow[] = [
  { feature: 'WhatsApp API number', starter: false, scaler: '1 · 3 users included', basicAi: '1 · 5 users included', proAi: '1 · 5 users included', category: 'Core Features' },
  { feature: 'Team Inbox', starter: true, scaler: true, basicAi: true, proAi: true, category: 'Core Features' },
  { feature: 'Unlimited labels & funnels', starter: true, scaler: true, basicAi: true, proAi: true, category: 'Core Features' },
  { feature: 'Unlimited quick replies', starter: true, scaler: true, basicAi: true, proAi: true, category: 'Core Features' },
  { feature: 'Unlimited scheduled messages', starter: true, scaler: true, basicAi: true, proAi: true, category: 'Core Features' },
  { feature: 'WhatsApp chat backup', starter: true, scaler: true, basicAi: true, proAi: true, category: 'Core Features' },
  { feature: 'HubSpot', starter: true, scaler: true, basicAi: true, proAi: true, category: 'CRM Integrations' },
  { feature: 'Zoho CRM', starter: true, scaler: true, basicAi: true, proAi: true, category: 'CRM Integrations' },
  { feature: 'Bitrix24', starter: true, scaler: true, basicAi: true, proAi: true, category: 'CRM Integrations' },
  { feature: 'Google Sheets', starter: true, scaler: true, basicAi: true, proAi: true, category: 'CRM Integrations' },
  { feature: 'Salesforce', starter: false, scaler: true, basicAi: false, proAi: true, category: 'CRM Integrations' },
  { feature: 'Webhook integrations', starter: false, scaler: true, basicAi: true, proAi: true, category: 'CRM Integrations' },
  { feature: 'Cloud connection', starter: false, scaler: true, basicAi: true, proAi: true, category: 'CRM Integrations' },
  { feature: 'WhatsApp API', starter: false, scaler: true, basicAi: true, proAi: true, category: 'CRM Integrations' },
  { feature: 'Dedicated APIs', starter: false, scaler: true, basicAi: true, proAi: true, category: 'CRM Integrations' },
  { feature: 'Send messages from CRM', starter: true, scaler: true, basicAi: true, proAi: true, category: 'Intelligence & AI' },
  { feature: 'CRM property-to-WhatsApp labeling', starter: false, scaler: true, basicAi: true, proAi: true, category: 'Intelligence & AI' },
  { feature: 'Custom objects in mini CRM view', starter: false, scaler: true, basicAi: true, proAi: true, category: 'Intelligence & AI' },
  { feature: 'AI unreplied chats agent', starter: false, scaler: true, basicAi: true, proAi: true, category: 'Intelligence & AI' },
  { feature: 'Intelligence-Led CRM Properties', starter: false, scaler: false, basicAi: true, proAi: true, category: 'AI Agents' },
  { feature: 'AI-driven Chat Organization', starter: false, scaler: false, basicAi: true, proAi: true, category: 'AI Agents' },
  { feature: 'Lead qualifying agent', starter: false, scaler: false, basicAi: true, proAi: true, category: 'AI Agents' },
  { feature: 'Sales agent', starter: false, scaler: false, basicAi: true, proAi: true, category: 'AI Agents' },
  { feature: 'Customer success agent', starter: false, scaler: false, basicAi: true, proAi: true, category: 'AI Agents' },
  { feature: 'Customer agent', starter: false, scaler: false, basicAi: true, proAi: true, category: 'AI Agents' },
  { feature: 'Click-to-WhatsApp Ads agent', starter: false, scaler: false, basicAi: false, proAi: true, category: 'AI Agents' },
  { feature: 'Voice AI calling', starter: false, scaler: false, basicAi: false, proAi: true, category: 'AI Agents' },
  { feature: "BrainBe - your company's brain", starter: false, scaler: false, basicAi: false, proAi: true, category: 'AI Agents' },
  { feature: '100+ integrations', starter: false, scaler: false, basicAi: false, proAi: true, category: 'AI Agents' },
  { feature: 'Monthly credits (rollover)', starter: false, scaler: false, basicAi: '$45 monthly credits (rollover)', proAi: '$90 monthly credits (rollover)', category: 'AI Agents' },
  { feature: 'CRM workflow integration', starter: false, scaler: true, basicAi: true, proAi: true, category: 'Automation' },
  { feature: 'Bulk messaging', starter: true, scaler: true, basicAi: true, proAi: true, category: 'Automation' },
  { feature: 'Auto-create contacts', starter: true, scaler: true, basicAi: true, proAi: true, category: 'Automation' },
  { feature: 'Email support', starter: true, scaler: true, basicAi: true, proAi: true, category: 'Support' },
  { feature: 'Priority support', starter: false, scaler: true, basicAi: true, proAi: true, category: 'Support' },
]

const defaultFaqItems: FAQItem[] = [
  { question: 'Can I try Eazybe for free?', answer: 'Yes! We offer a 4-day free trial on Starter and Scaler plans. No credit card required.' },
  { question: 'How does per-user pricing work?', answer: 'You pay for each team member who actively uses Eazybe. A user is anyone who syncs their WhatsApp conversations to your CRM.' },
  { question: 'Which CRMs do you integrate with?', answer: 'Starter integrates with HubSpot, Zoho CRM, Bitrix24, and Google Sheets. Scaler adds Salesforce and webhook integrations. AI plans add dedicated APIs.' },
  { question: 'Can I switch plans later?', answer: 'Absolutely! You can upgrade or downgrade at any time. Upgrades give immediate access; downgrades take effect at the next billing cycle.' },
  { question: 'Is my data secure?', answer: 'Yes. Bank-grade 256-bit encryption, GDPR compliant, Meta Business Partner verified, with regular security audits.' },
  { question: 'What is your refund policy?', answer: 'No refunds — once payment is made it is non-refundable. We encourage using the free trial to evaluate first.' },
]

// ─── Localized fallbacks ────────────────────────────────────────────────────
// When Sanity has no `pricingPage` doc for the active locale, the page renders
// from these in-code fallbacks so non-English visitors don't get English copy.
// Plan names + technical feature labels stay in English (brand/product nouns).

type LocaleFallback = {
  hero: { badge: string; headline: string; headlineHighlight: string; subheadline: string; billingToggleMonthly: string; billingToggleAnnual: string; saveBadgeText: string }
  planDescriptions: { starter: string; scaler: string; basicAi: string; proAi: string }
  ctas: { installFree: string; talkToAgent: string; bookDemo: string; readMore: string; noCreditCard: string }
  comparisonSection: { badge: string; title: string; subtitle: string }
  faqSection: { badge: string; title: string; subtitle: string; contactLinkText: string }
  faqItems: FAQItem[]
  finalCta: { headline: string; headlineEm: string; subtitle: string }
  agentModal: { title: string; titleEm: string; subtitle: string }
  featureLabels: Record<string, string>
  comparisonCategories: Record<string, string>
  trustSignals: string[]
  creditsIncludes: string
  creditsRollover: string
}

const FALLBACK_BY_LOCALE: Record<string, LocaleFallback> = {
  en: {
    hero: {
      badge: 'Pricing',
      headline: 'Simple, transparent',
      headlineHighlight: 'pricing.',
      subheadline: 'Start Free Scale As You Grow No hidden fees, no surprises.',
      billingToggleMonthly: 'Monthly',
      billingToggleAnnual: 'Annual',
      saveBadgeText: 'SAVE 20%',
    },
    planDescriptions: {
      starter: 'Perfect for individuals and small teams getting started with WhatsApp CRM integration.',
      scaler: 'For growing teams that need advanced integrations and AI-powered automation.',
      basicAi: 'Get started with AI agents on top of your full Scaler stack.',
      proAi: 'Advanced agents, voice, ads automation and 100+ integrations.',
    },
    ctas: {
      installFree: 'Install for Free',
      talkToAgent: 'Talk to our AI Agent',
      bookDemo: 'Book a Demo',
      readMore: 'Read more',
      noCreditCard: 'No credit card required',
    },
    comparisonSection: {
      badge: 'Compare Plans',
      title: 'Feature-by-feature comparison',
      subtitle: 'See exactly what you get with each plan.',
    },
    faqSection: {
      badge: 'FAQ',
      title: 'Frequently asked questions',
      subtitle: "Can't find what you're looking for?",
      contactLinkText: 'Contact our team',
    },
    faqItems: defaultFaqItems,
    finalCta: {
      headline: 'Ready to supercharge your',
      headlineEm: 'WhatsApp sales?',
      subtitle: 'Join thousands of teams using Eazybe to close more deals through WhatsApp.',
    },
    agentModal: {
      title: 'Talk to our',
      titleEm: 'AI Agent',
      subtitle: "See how many leads you're losing on WhatsApp — in 60 seconds, free.",
    },
    featureLabels: {},
    comparisonCategories: {},
    trustSignals: [
      'GDPR Compliant & Encrypted',
      '2-Minute Setup',
      '4-Day Free Trial',
      'No Credit Card Required',
    ],
    creditsIncludes: 'Includes',
    creditsRollover: 'monthly credits (rollover)',
  },
  es: {
    hero: {
      badge: 'Precios',
      headline: 'Precios simples,',
      headlineHighlight: 'transparentes.',
      subheadline: 'Empieza gratis. Escala a tu ritmo. Sin tarifas ocultas, sin sorpresas.',
      billingToggleMonthly: 'Mensual',
      billingToggleAnnual: 'Anual',
      saveBadgeText: 'AHORRA 20%',
    },
    planDescriptions: {
      starter: 'Perfecto para individuos y equipos pequeños que comienzan con la integración de WhatsApp CRM.',
      scaler: 'Para equipos en crecimiento que necesitan integraciones avanzadas y automatización con IA.',
      basicAi: 'Comienza con agentes de IA sobre tu paquete completo Scaler.',
      proAi: 'Agentes avanzados, voz, automatización de anuncios y más de 100 integraciones.',
    },
    ctas: {
      installFree: 'Instalar gratis',
      talkToAgent: 'Habla con nuestro Agente de IA',
      bookDemo: 'Reserva una demo',
      readMore: 'Leer más',
      noCreditCard: 'Sin tarjeta de crédito',
    },
    comparisonSection: {
      badge: 'Comparar planes',
      title: 'Comparación característica por característica',
      subtitle: 'Ve exactamente lo que obtienes con cada plan.',
    },
    faqSection: {
      badge: 'Preguntas frecuentes',
      title: 'Preguntas frecuentes',
      subtitle: '¿No encuentras lo que buscas?',
      contactLinkText: 'Contacta a nuestro equipo',
    },
    faqItems: [
      { question: '¿Puedo probar Eazybe gratis?', answer: '¡Sí! Ofrecemos una prueba gratis de 4 días en los planes Starter y Scaler. Sin tarjeta de crédito.' },
      { question: '¿Cómo funciona el precio por usuario?', answer: 'Pagas por cada miembro del equipo que use Eazybe activamente. Un usuario es cualquier persona que sincroniza sus conversaciones de WhatsApp con tu CRM.' },
      { question: '¿Con qué CRMs se integran?', answer: 'Starter se integra con HubSpot, Zoho CRM, Bitrix24 y Google Sheets. Scaler añade Salesforce e integraciones webhook. Los planes IA añaden APIs dedicadas.' },
      { question: '¿Puedo cambiar de plan más adelante?', answer: '¡Por supuesto! Puedes subir o bajar de plan en cualquier momento. Las mejoras dan acceso inmediato; las bajadas surten efecto en el siguiente ciclo de facturación.' },
      { question: '¿Mis datos están seguros?', answer: 'Sí. Cifrado de 256 bits de grado bancario, cumple GDPR, verificado como Meta Business Partner, con auditorías de seguridad regulares.' },
      { question: '¿Cuál es vuestra política de reembolso?', answer: 'Sin reembolsos — una vez realizado el pago, no es reembolsable. Te recomendamos usar la prueba gratis para evaluar primero.' },
    ],
    finalCta: {
      headline: '¿Listo para impulsar tus',
      headlineEm: 'ventas en WhatsApp?',
      subtitle: 'Únete a miles de equipos que usan Eazybe para cerrar más negocios en WhatsApp.',
    },
    agentModal: {
      title: 'Habla con nuestro',
      titleEm: 'Agente de IA',
      subtitle: 'Ve cuántos leads estás perdiendo en WhatsApp — en 60 segundos, gratis.',
    },
    featureLabels: {
      'Team Inbox': 'Bandeja de entrada del equipo',
      'Unlimited labels & funnels': 'Etiquetas y embudos ilimitados',
      'Unlimited quick replies': 'Respuestas rápidas ilimitadas',
      'Unlimited scheduled messages': 'Mensajes programados ilimitados',
      'WhatsApp chat backup': 'Copia de seguridad de chats de WhatsApp',
      'Send messages from CRM': 'Enviar mensajes desde el CRM',
      'Salesforce integration': 'Integración con Salesforce',
      'Revenue Inbox': 'Bandeja de ingresos',
      'Everything in Starter': 'Todo lo de Starter',
      'Webhook integrations': 'Integraciones por webhook',
      'Cloud connection': 'Conexión en la nube',
      'WhatsApp API': 'API de WhatsApp',
      'WhatsApp API number': 'Número de API de WhatsApp',
      '1 · 3 users included': '1 · 3 usuarios incluidos',
      '1 · 5 users included': '1 · 5 usuarios incluidos',
      'Custom objects in mini CRM view': 'Objetos personalizados en mini CRM',
      'CRM property-to-WhatsApp labeling': 'Etiquetado de propiedades del CRM en WhatsApp',
      'AI unreplied chats agent': 'Agente de IA para chats sin responder',
      'Dedicated APIs': 'APIs dedicadas',
      'CRM workflow integration': 'Integración de flujos de trabajo del CRM',
      'RevOps Agent': 'Agente RevOps',
      'Everything in Scaler': 'Todo lo de Scaler',
      'AI agents': 'Agentes de IA',
      'Users included': 'Usuarios incluidos',
      '3 users': '3 usuarios',
      '5 users': '5 usuarios',
      'AI agent cost': 'Coste del agente de IA',
      'reply': 'respuesta',
      'Intelligence-Led CRM Properties': 'Propiedades de CRM guiadas por inteligencia',
      'AI-driven Chat Organization': 'Organización de chats por IA',
      'BrainBe knowledge base included': 'Base de conocimientos BrainBe incluida',
      'Voice AI calling': 'Llamadas con IA de voz',
      '100+ integrations (Email, Teams, Slack...)': 'Más de 100 integraciones (Email, Teams, Slack...)',
      'Everything in Basic AI': 'Todo lo de Basic AI',
      'Click-to-WhatsApp Ads agent': 'Agente para anuncios Click-to-WhatsApp',
      "BrainBe — your company's brain": 'BrainBe — el cerebro de tu empresa',
    },
    comparisonCategories: {
      'Core Features': 'Funciones principales',
      'CRM Integrations': 'Integraciones CRM',
      'Intelligence & AI': 'Inteligencia e IA',
      'AI Agents': 'Agentes de IA',
      'Automation': 'Automatización',
      'Support': 'Soporte',
    },
    trustSignals: [
      'Compatible con GDPR y cifrado',
      'Configuración en 2 minutos',
      '4 días de prueba gratis',
      'Sin tarjeta de crédito',
    ],
    creditsIncludes: 'Incluye',
    creditsRollover: 'en créditos mensuales (acumulables)',
  },
  br: {
    hero: {
      badge: 'Preços',
      headline: 'Preços simples,',
      headlineHighlight: 'transparentes.',
      subheadline: 'Comece grátis. Escale no seu ritmo. Sem taxas escondidas, sem surpresas.',
      billingToggleMonthly: 'Mensal',
      billingToggleAnnual: 'Anual',
      saveBadgeText: 'ECONOMIZE 20%',
    },
    planDescriptions: {
      starter: 'Perfeito para indivíduos e times pequenos começando com a integração WhatsApp CRM.',
      scaler: 'Para times em crescimento que precisam de integrações avançadas e automação com IA.',
      basicAi: 'Comece com agentes de IA sobre seu stack completo Scaler.',
      proAi: 'Agentes avançados, voz, automação de anúncios e mais de 100 integrações.',
    },
    ctas: {
      installFree: 'Instalar grátis',
      talkToAgent: 'Fale com nosso Agente de IA',
      bookDemo: 'Agende uma demo',
      readMore: 'Ler mais',
      noCreditCard: 'Sem cartão de crédito',
    },
    comparisonSection: {
      badge: 'Compare planos',
      title: 'Comparação detalhada de recursos',
      subtitle: 'Veja exatamente o que você ganha com cada plano.',
    },
    faqSection: {
      badge: 'Perguntas frequentes',
      title: 'Perguntas frequentes',
      subtitle: 'Não encontrou o que procura?',
      contactLinkText: 'Fale com nossa equipe',
    },
    faqItems: [
      { question: 'Posso testar o Eazybe gratuitamente?', answer: 'Sim! Oferecemos um teste grátis de 4 dias nos planos Starter e Scaler. Sem cartão de crédito.' },
      { question: 'Como funciona o preço por usuário?', answer: 'Você paga por cada membro do time que usa o Eazybe ativamente. Um usuário é qualquer pessoa que sincroniza suas conversas do WhatsApp com seu CRM.' },
      { question: 'Com quais CRMs vocês integram?', answer: 'Starter integra com HubSpot, Zoho CRM, Bitrix24 e Google Sheets. Scaler adiciona Salesforce e integrações webhook. Os planos AI adicionam APIs dedicadas.' },
      { question: 'Posso trocar de plano depois?', answer: 'Claro! Você pode fazer upgrade ou downgrade a qualquer momento. Upgrades dão acesso imediato; downgrades entram em vigor no próximo ciclo de cobrança.' },
      { question: 'Meus dados estão seguros?', answer: 'Sim. Criptografia de 256 bits de nível bancário, compatível com GDPR, verificado como Meta Business Partner, com auditorias de segurança regulares.' },
      { question: 'Qual é a política de reembolso?', answer: 'Sem reembolsos — uma vez feito o pagamento, ele não é reembolsável. Recomendamos usar o teste grátis para avaliar primeiro.' },
    ],
    finalCta: {
      headline: 'Pronto para turbinar suas',
      headlineEm: 'vendas no WhatsApp?',
      subtitle: 'Junte-se a milhares de times que usam o Eazybe para fechar mais negócios pelo WhatsApp.',
    },
    agentModal: {
      title: 'Fale com nosso',
      titleEm: 'Agente de IA',
      subtitle: 'Veja quantos leads você está perdendo no WhatsApp — em 60 segundos, grátis.',
    },
    featureLabels: {
      'Team Inbox': 'Caixa de entrada da equipe',
      'Unlimited labels & funnels': 'Etiquetas e funis ilimitados',
      'Unlimited quick replies': 'Respostas rápidas ilimitadas',
      'Unlimited scheduled messages': 'Mensagens agendadas ilimitadas',
      'WhatsApp chat backup': 'Backup de conversas do WhatsApp',
      'Send messages from CRM': 'Enviar mensagens do CRM',
      'Salesforce integration': 'Integração com Salesforce',
      'Revenue Inbox': 'Caixa de entrada de receita',
      'Everything in Starter': 'Tudo do Starter',
      'Webhook integrations': 'Integrações via webhook',
      'Cloud connection': 'Conexão em nuvem',
      'WhatsApp API': 'API do WhatsApp',
      'WhatsApp API number': 'Número de API do WhatsApp',
      '1 · 3 users included': '1 · 3 usuários incluídos',
      '1 · 5 users included': '1 · 5 usuários incluídos',
      'Custom objects in mini CRM view': 'Objetos personalizados no mini CRM',
      'CRM property-to-WhatsApp labeling': 'Etiquetagem de propriedade do CRM para WhatsApp',
      'AI unreplied chats agent': 'Agente de IA para conversas sem resposta',
      'Dedicated APIs': 'APIs dedicadas',
      'CRM workflow integration': 'Integração de fluxo de trabalho do CRM',
      'RevOps Agent': 'Agente RevOps',
      'Everything in Scaler': 'Tudo do Scaler',
      'AI agents': 'Agentes de IA',
      'Users included': 'Usuários incluídos',
      '3 users': '3 usuários',
      '5 users': '5 usuários',
      'AI agent cost': 'Custo do agente de IA',
      'reply': 'resposta',
      'Intelligence-Led CRM Properties': 'Propriedades de CRM guiadas por inteligência',
      'AI-driven Chat Organization': 'Organização de conversas por IA',
      'BrainBe knowledge base included': 'Base de conhecimento BrainBe incluída',
      'Voice AI calling': 'Chamadas por IA de voz',
      '100+ integrations (Email, Teams, Slack...)': 'Mais de 100 integrações (E-mail, Teams, Slack...)',
      'Everything in Basic AI': 'Tudo do Basic AI',
      'Click-to-WhatsApp Ads agent': 'Agente para anúncios click-to-WhatsApp',
      "BrainBe — your company's brain": 'BrainBe — o cérebro da sua empresa',
    },
    comparisonCategories: {
      'Core Features': 'Recursos principais',
      'CRM Integrations': 'Integrações de CRM',
      'Intelligence & AI': 'Inteligência e IA',
      'AI Agents': 'Agentes de IA',
      'Automation': 'Automação',
      'Support': 'Suporte',
    },
    trustSignals: [
      'Conformidade LGPD e criptografado',
      'Configuração em 2 minutos',
      '4 dias de teste grátis',
      'Sem necessidade de cartão de crédito',
    ],
    creditsIncludes: 'Inclui',
    creditsRollover: 'em créditos mensais (com rollover)',
  },
  tr: {
    hero: {
      badge: 'Fiyatlandırma',
      headline: 'Basit, şeffaf',
      headlineHighlight: 'fiyatlandırma.',
      subheadline: 'Ücretsiz başlayın. Büyüdükçe ölçeklendirin. Gizli ücret yok, sürpriz yok.',
      billingToggleMonthly: 'Aylık',
      billingToggleAnnual: 'Yıllık',
      saveBadgeText: '%20 TASARRUF',
    },
    planDescriptions: {
      starter: 'WhatsApp CRM entegrasyonuna yeni başlayan bireyler ve küçük ekipler için mükemmel.',
      scaler: 'Gelişmiş entegrasyonlara ve yapay zeka destekli otomasyona ihtiyaç duyan büyüyen ekipler için.',
      basicAi: 'Tam Scaler paketinizin üzerinde AI ajanlarıyla başlayın.',
      proAi: 'Gelişmiş ajanlar, sesli arama, reklam otomasyonu ve 100+ entegrasyon.',
    },
    ctas: {
      installFree: 'Ücretsiz Yükle',
      talkToAgent: "AI Agent'ımızla konuşun",
      bookDemo: 'Demo Ayırt',
      readMore: 'Daha fazla',
      noCreditCard: 'Kredi kartı gerekmez',
    },
    comparisonSection: {
      badge: 'Planları Karşılaştır',
      title: 'Özellik bazında karşılaştırma',
      subtitle: 'Her planda tam olarak ne aldığınızı görün.',
    },
    faqSection: {
      badge: 'SSS',
      title: 'Sık sorulan sorular',
      subtitle: 'Aradığınızı bulamadınız mı?',
      contactLinkText: 'Ekibimizle iletişime geçin',
    },
    faqItems: [
      { question: "Eazybe'yi ücretsiz deneyebilir miyim?", answer: 'Evet! Starter ve Scaler planlarında 4 günlük ücretsiz deneme sunuyoruz. Kredi kartı gerekmez.' },
      { question: 'Kullanıcı başına fiyatlandırma nasıl işliyor?', answer: "Eazybe'yi aktif kullanan her ekip üyesi için ödeme yaparsınız. Kullanıcı, WhatsApp konuşmalarını CRM'inize senkronize eden herkesidir." },
      { question: 'Hangi CRM\'lerle entegre oluyorsunuz?', answer: 'Starter, HubSpot, Zoho CRM, Bitrix24 ve Google Sheets ile entegre olur. Scaler, Salesforce ve webhook entegrasyonları ekler. AI planlar özel API\'ler ekler.' },
      { question: 'Daha sonra plan değiştirebilir miyim?', answer: 'Kesinlikle! İstediğiniz zaman yükseltme veya düşürme yapabilirsiniz. Yükseltmeler anında erişim sağlar; düşürmeler bir sonraki fatura döneminde geçerli olur.' },
      { question: 'Verilerim güvende mi?', answer: 'Evet. Banka seviyesinde 256-bit şifreleme, GDPR uyumlu, Meta Business Partner onaylı, düzenli güvenlik denetimleri.' },
      { question: 'İade politikanız nedir?', answer: 'İade yok — ödeme yapıldıktan sonra iade edilemez. Önce ücretsiz denemeyi kullanmanızı öneririz.' },
    ],
    finalCta: {
      headline: 'WhatsApp satışlarınızı',
      headlineEm: 'hızlandırmaya hazır mısınız?',
      subtitle: "WhatsApp üzerinden daha fazla anlaşma kapatmak için Eazybe'yi kullanan binlerce ekibe katılın.",
    },
    agentModal: {
      title: 'AI',
      titleEm: "Agent'ımızla konuşun",
      subtitle: "WhatsApp'ta kaç lead kaybettiğinizi görün — 60 saniyede, ücretsiz.",
    },
    featureLabels: {
      'Team Inbox': 'Ekip Gelen Kutusu',
      'Unlimited labels & funnels': 'Sınırsız etiket ve huni',
      'Unlimited quick replies': 'Sınırsız hızlı yanıt',
      'Unlimited scheduled messages': 'Sınırsız planlanmış mesaj',
      'WhatsApp chat backup': 'WhatsApp sohbet yedeği',
      'Send messages from CRM': "CRM'den mesaj gönderme",
      'Salesforce integration': 'Salesforce entegrasyonu',
      'Revenue Inbox': 'Gelir Gelen Kutusu',
      'Everything in Starter': "Starter'daki her şey",
      'Webhook integrations': 'Webhook entegrasyonları',
      'Cloud connection': 'Bulut bağlantısı',
      'WhatsApp API': 'WhatsApp API',
      'WhatsApp API number': 'WhatsApp API numarası',
      '1 · 3 users included': '1 · 3 kullanıcı dahil',
      '1 · 5 users included': '1 · 5 kullanıcı dahil',
      'Custom objects in mini CRM view': 'Mini CRM görünümünde özel nesneler',
      'CRM property-to-WhatsApp labeling': "CRM özelliğinden WhatsApp'a etiketleme",
      'AI unreplied chats agent': 'Yanıtsız sohbetler için AI ajanı',
      'Dedicated APIs': "Özel API'ler",
      'CRM workflow integration': 'CRM iş akışı entegrasyonu',
      'RevOps Agent': 'RevOps Ajanı',
      'Everything in Scaler': "Scaler'daki her şey",
      'AI agents': 'AI ajanları',
      'Users included': 'Dahil kullanıcılar',
      '3 users': '3 kullanıcı',
      '5 users': '5 kullanıcı',
      'AI agent cost': 'AI ajan maliyeti',
      'reply': 'yanıt',
      'Intelligence-Led CRM Properties': 'Zeka odaklı CRM özellikleri',
      'AI-driven Chat Organization': 'AI destekli sohbet organizasyonu',
      'BrainBe knowledge base included': 'BrainBe bilgi tabanı dahil',
      'Voice AI calling': 'Sesli AI aramaları',
      '100+ integrations (Email, Teams, Slack...)': '100+ entegrasyon (E-posta, Teams, Slack...)',
      'Everything in Basic AI': "Basic AI'deki her şey",
      'Click-to-WhatsApp Ads agent': 'Click-to-WhatsApp Reklam ajanı',
      "BrainBe — your company's brain": 'BrainBe — şirketinizin beyni',
    },
    comparisonCategories: {
      'Core Features': 'Temel özellikler',
      'CRM Integrations': 'CRM Entegrasyonları',
      'Intelligence & AI': 'Zeka ve AI',
      'AI Agents': 'AI Ajanları',
      'Automation': 'Otomasyon',
      'Support': 'Destek',
    },
    trustSignals: [
      'GDPR uyumlu ve şifreli',
      '2 dakikada kurulum',
      '4 gün ücretsiz deneme',
      'Kredi kartı gerekmez',
    ],
    creditsIncludes: 'Dahil',
    creditsRollover: 'aylık kredi (devir)',
  },
}

const planIconMap = { starter: Zap, growth: Rocket, enterprise: Building2, sparkles: Sparkles }

const parseComparisonValue = (value: string): boolean | string => {
  if (value === 'true') return true
  if (value === 'false') return false
  return value
}
const iconToPlanKey = (icon: string): string => {
  if (icon === 'starter') return 'starter'
  if (icon === 'growth') return 'scaler'
  return 'omnis'
}

const aiPricingPlans: PricingPlan[] = defaultPricingPlans.filter((plan) =>
  plan.planKey === 'basic-ai' || plan.planKey === 'pro-ai'
)

const removedOmnisFeatureNames = new Set([
  'WhatsApp group chat backup',
  'Unlimited message sync',
  'Sync to deals/tickets',
  'Revenue Inbox',
  'RevOps Agent (AI)',
  'WhatsApp Web Copilot',
  'Dedicated account manager',
  'WhatsApp group assistance',
])

// ─── UI helpers ─────────────────────────────────────────────────────────────

const Check = (
  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
)
const XSym = (
  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" /></svg>
)

// ─── Toggle ─────────────────────────────────────────────────────────────────

function PricingToggle({
  isAnnual, onToggle, labels,
}: {
  isAnnual: boolean
  onToggle: (v: boolean) => void
  labels?: { monthly?: string; annual?: string; saveBadge?: string }
}) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, padding: 6, background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 100, marginTop: 20 }}>
      <button
        onClick={() => onToggle(false)}
        className="btn"
        style={{
          padding: '8px 18px',
          background: !isAnnual ? 'var(--ink)' : 'transparent',
          color: !isAnnual ? 'var(--paper)' : 'var(--ink-3)',
          borderRadius: 100,
        }}
      >
        {labels?.monthly || 'Monthly'}
      </button>
      <button
        onClick={() => onToggle(true)}
        className="btn"
        style={{
          padding: '8px 18px',
          background: isAnnual ? 'var(--ink)' : 'transparent',
          color: isAnnual ? 'var(--paper)' : 'var(--ink-3)',
          borderRadius: 100,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        {labels?.annual || 'Annual'}
        <span
          style={{
            background: 'color-mix(in oklab, var(--ok) 28%, var(--paper))',
            color: 'var(--ok)',
            fontFamily: 'var(--f-mono)',
            fontSize: 9,
            padding: '2px 6px',
            borderRadius: 100,
            fontWeight: 700,
            letterSpacing: '0.04em',
          }}
        >
          {labels?.saveBadge || 'SAVE 20%'}
        </span>
      </button>
    </div>
  )
}

// ─── Pricing card ───────────────────────────────────────────────────────────

function PricingCard({
  plan,
  isAnnual,
  dynamicCurrency,
  dynamicMonthlyPrice,
  dynamicAnnualPrice,
  dynamicMonthlyAddonPrice,
  dynamicAnnualAddonPrice,
  convertUsdAmount,
  transitionDelay,
  onTalkToAgent,
  featureLabels,
  creditsIncludes,
  creditsRollover,
  pricingLoading,
}: {
  plan: PricingPlan
  isAnnual: boolean
  dynamicCurrency?: string
  dynamicMonthlyPrice?: number
  dynamicAnnualPrice?: number
  dynamicMonthlyAddonPrice?: number | null
  dynamicAnnualAddonPrice?: number | null
  convertUsdAmount: (amount: number) => number
  transitionDelay?: string
  onTalkToAgent: () => void
  featureLabels: Record<string, string>
  creditsIncludes: string
  creditsRollover: string
  pricingLoading: boolean
}) {
  const Icon = planIconMap[plan.icon]
  const currency = dynamicCurrency || plan.currency
  const isCurrencyCode = /^[A-Z]{3}$/.test(currency)
  const currencyLabel = isCurrencyCode ? currency : ''
  const priceSymbol = isCurrencyCode ? (currency === 'USD' ? '$' : '') : currency
  const monthlyPrice = dynamicMonthlyPrice ?? plan.monthlyPrice
  const annualPrice = dynamicAnnualPrice ?? plan.annualPrice
  const price = isAnnual ? annualPrice : monthlyPrice
  const addonPrice = isAnnual ? dynamicAnnualAddonPrice : dynamicMonthlyAddonPrice
  // An explicit plan.priceNote wins over the auto-generated addon note.
  // Lets Scaler / Basic AI advertise their bundled user counts instead of
  // the default "+ $X/extra seat · 1 seat included" template.
  const addonNote = plan.priceNote
    ? plan.priceNote
    : addonPrice != null
    ? `+ ${currencyLabel ? `${currencyLabel} ` : ''}${priceSymbol}${addonPrice}/extra seat · 1 seat included`
    : undefined
  const isPopular = plan.planKey === 'basic-ai'
  const isEnterprise = plan.enterprise
  const showPrice = !isEnterprise && price > 0
  // AI plans (Basic AI / Pro AI) are now per-seat pricing, same unit as Starter/Scaler.
  const isAiPlan = plan.planKey === 'basic-ai' || plan.planKey === 'pro-ai'
  const priceUnit = '/seat/month'
  // Wallet credit: $45 (45% of Basic AI $99) and $90 (45% of Pro AI $199).
  const formatFeatureText = (text: string) => {
    // Credits line: translate "Includes ... monthly credits (rollover)" plus
    // convert USD amount to the visitor's currency when applicable.
    const isLocalCurrency = isCurrencyCode && currency !== 'USD'
    const creditsMatch = text.match(/^Includes \$(\d+) monthly credits \(rollover\)$/)
    if (creditsMatch) {
      const usd = parseInt(creditsMatch[1], 10)
      const amount = isLocalCurrency ? `${currency} ${convertUsdAmount(usd)}` : `$${usd}`
      return `${creditsIncludes} ${amount} ${creditsRollover}`
    }
    // All other feature bullets: look up the locale-specific label. Falls
    // back to English if the locale doesn't have a translation for it.
    return featureLabels[text] || text
  }

  return (
    <div
      className="card reveal"
      style={{
        transitionDelay,
        position: 'relative',
        padding: 28,
        display: 'flex',
        flexDirection: 'column',
        ...(isPopular
          ? {
              borderColor: 'color-mix(in oklab, var(--accent-a) 50%, var(--line))',
              boxShadow: '0 0 0 4px color-mix(in oklab, var(--accent-a) 12%, transparent), 0 12px 30px -18px rgba(15,17,21,0.15)',
              background: 'linear-gradient(180deg, color-mix(in oklab, var(--accent-a) 6%, var(--paper)), var(--paper) 60%)',
            }
          : {}),
      }}
    >
      {isPopular && (
        <div
          style={{
            position: 'absolute',
            top: -14,
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '5px 14px 5px 10px',
            background: 'var(--ink)',
            color: 'var(--paper)',
            borderRadius: 100,
            fontFamily: 'var(--f-mono)',
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            whiteSpace: 'nowrap',
          }}
        >
          <Zap size={11} fill="currentColor" /> Most Popular
        </div>
      )}

      <div className="card-icon" style={{ marginBottom: 18 }}>
        <Icon size={20} />
      </div>
      <h3 style={{ marginBottom: 4 }}>{plan.name}</h3>
      <p style={{ marginBottom: 22, fontSize: 13 }}>{plan.description}</p>

      <div style={{ marginBottom: 22 }}>
        {isEnterprise || !showPrice ? (
          <div
            style={{
              fontFamily: 'var(--f-display)',
              fontSize: 44,
              fontWeight: 400,
              color: 'var(--ink)',
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}
          >
            {isEnterprise ? 'Custom' : 'Contact us'}
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
            {!pricingLoading && currencyLabel && <span style={{ fontSize: 16, color: 'var(--ink-4)' }}>{currencyLabel}</span>}
            {!pricingLoading && priceSymbol && <span style={{ fontSize: 16, color: 'var(--ink-4)' }}>{priceSymbol}</span>}
            <span
              className={pricingLoading ? 'eazybe-price-skel' : undefined}
              style={{
                fontFamily: 'var(--f-display)',
                fontSize: 56,
                fontWeight: 400,
                color: pricingLoading ? 'transparent' : 'var(--ink)',
                letterSpacing: '-0.025em',
                lineHeight: 1,
                minWidth: pricingLoading ? 100 : undefined,
              }}
            >
              {pricingLoading ? '000' : price}
            </span>
            <span style={{ fontSize: 14, color: 'var(--ink-4)' }}>{priceUnit}</span>
          </div>
        )}
        {addonNote && (
          <p style={{ marginTop: 6, fontSize: 13, color: 'var(--ink-3)', fontWeight: 500, marginBottom: 0, whiteSpace: 'pre-line' }}>
            {featureLabels[addonNote] || addonNote}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={onTalkToAgent}
        className={`btn ${isPopular ? 'btn-primary' : 'btn-outline'}`}
        style={{ width: '100%', justifyContent: 'center', display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24 }}
      >
        <WhatsAppGlyph size={16} />
        Talk to our AI Agent
      </button>

      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: 9, flex: 1 }}>
        {plan.features.map((feature, i) => (
          <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 13 }}>
            <span
              style={{
                flexShrink: 0,
                marginTop: 2,
                width: 18,
                height: 18,
                borderRadius: '50%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: !feature.included
                  ? 'var(--bg-2)'
                  : feature.highlight
                  ? 'color-mix(in oklab, var(--accent-a) 22%, var(--paper))'
                  : 'color-mix(in oklab, var(--ok) 18%, var(--paper))',
                color: !feature.included
                  ? 'var(--ink-4)'
                  : feature.highlight
                  ? 'var(--accent-ink)'
                  : 'var(--ok)',
                border: '1px solid ' + (!feature.included
                  ? 'var(--line)'
                  : feature.highlight
                  ? 'color-mix(in oklab, var(--accent-a) 30%, var(--line))'
                  : 'color-mix(in oklab, var(--ok) 25%, var(--line))'),
              }}
            >
              {feature.included ? Check : XSym}
            </span>
            <span
              style={{
                color: !feature.included ? 'var(--ink-4)' : feature.highlight ? 'var(--ink)' : 'var(--ink-2)',
                textDecoration: !feature.included ? 'line-through' : 'none',
                fontWeight: feature.highlight ? 500 : 400,
              }}
            >
              {formatFeatureText(feature.text)}
            </span>
          </li>
        ))}
      </ul>

      {isAiPlan && (
        <div
          style={{
            marginTop: 'auto',
            padding: '12px 14px',
            borderRadius: 12,
            border: '1px solid color-mix(in oklab, var(--accent-ink) 22%, var(--line))',
            background:
              'linear-gradient(180deg, color-mix(in oklab, var(--accent-ink) 6%, var(--paper)) 0%, var(--paper) 100%)',
          }}
        >
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.09em',
              textTransform: 'uppercase',
              color: 'var(--accent-ink)',
              marginBottom: 8,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <Sparkles size={11} /> {featureLabels['AI agent cost'] || 'AI agent cost'}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
              <span style={{ fontSize: 12.5, color: 'var(--ink-2)', fontWeight: 500 }}>
                {featureLabels['Lite LLM'] || 'Lite LLM'}
              </span>
              <span style={{ fontSize: 13, color: 'var(--ink)', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
                $0.005<span style={{ color: 'var(--ink-4)', fontWeight: 500 }}>/{featureLabels['reply'] || 'reply'}</span>
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
              <span style={{ fontSize: 12.5, color: 'var(--ink-2)', fontWeight: 500 }}>
                {featureLabels['Heavy LLM'] || 'Heavy LLM'}
              </span>
              <span style={{ fontSize: 13, color: 'var(--ink)', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
                $0.01<span style={{ color: 'var(--ink-4)', fontWeight: 500 }}>/{featureLabels['reply'] || 'reply'}</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


// ─── Comparison table (grouped by category) ─────────────────────────────────

function FeatureComparisonTable({
  features,
  currency,
  convertUsdAmount,
  onTalkToAgent,
  categoryLabels,
  featureLabels,
  talkToAgentLabel,
}: {
  features: ComparisonFeatureRow[]
  currency: string
  convertUsdAmount: (amount: number) => number
  onTalkToAgent: () => void
  categoryLabels: Record<string, string>
  featureLabels: Record<string, string>
  talkToAgentLabel: string
}) {
  const headerAgentBtn = (popular?: boolean) => (
    <button
      type="button"
      onClick={onTalkToAgent}
      className={`btn ${popular ? 'btn-primary' : 'btn-outline'}`}
      style={{
        marginTop: 10,
        width: '100%',
        justifyContent: 'center',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '7px 10px',
        fontSize: 11.5,
        letterSpacing: 0,
        textTransform: 'none',
      }}
    >
      <WhatsAppGlyph size={13} />
      {talkToAgentLabel}
    </button>
  )
  const grouped = features.reduce((acc, row) => {
    const key = row.category || 'Features'
    if (!acc[key]) acc[key] = []
    acc[key].push(row)
    return acc
  }, {} as Record<string, ComparisonFeatureRow[]>)

  // Localize wallet-credit amounts for any non-USD currency code (INR, BRL, …).
  const isLocalCurrency = /^[A-Z]{3}$/.test(currency) && currency !== 'USD'
  const renderVal = (v: boolean | string) => {
    if (v === true) return <span style={{ display: 'inline-flex', width: 22, height: 22, borderRadius: '50%', background: 'color-mix(in oklab, var(--ok) 18%, var(--paper))', color: 'var(--ok)', alignItems: 'center', justifyContent: 'center' }}>{Check}</span>
    if (v === false) return <span style={{ display: 'inline-flex', width: 22, height: 22, borderRadius: '50%', background: 'var(--bg-2)', color: 'var(--ink-4)', alignItems: 'center', justifyContent: 'center' }}>{XSym}</span>
    if (isLocalCurrency && v === '$45 monthly credits (rollover)') return <span style={{ fontSize: 13, color: 'var(--ink-2)', fontWeight: 500 }}>{currency} {convertUsdAmount(45)} monthly credits (rollover)</span>
    if (isLocalCurrency && v === '$90 monthly credits (rollover)') return <span style={{ fontSize: 13, color: 'var(--ink-2)', fontWeight: 500 }}>{currency} {convertUsdAmount(90)} monthly credits (rollover)</span>
    return <span style={{ fontSize: 13, color: 'var(--ink-2)', fontWeight: 500 }}>{featureLabels[v] || v}</span>
  }

  return (
    <div
      style={{
        background: 'var(--paper)',
        border: '1px solid var(--line)',
        borderRadius: 18,
        overflow: 'hidden',
        maxWidth: 1240,
        margin: '0 auto',
        boxShadow: '0 1px 0 rgba(15,17,21,0.02), 0 8px 24px -16px rgba(15,17,21,0.08)',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr repeat(4, minmax(120px, 1fr))',
          padding: 18,
          background: 'var(--bg-2)',
          borderBottom: '1px solid var(--line)',
          fontFamily: 'var(--f-mono)',
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--ink-4)',
        }}
      >
        <div style={{ alignSelf: 'center' }}>Feature</div>
        <div style={{ textAlign: 'center' }}>Starter{headerAgentBtn(false)}</div>
        <div style={{ textAlign: 'center' }}>Scaler{headerAgentBtn(false)}</div>
        <div style={{ textAlign: 'center', color: 'var(--accent-ink)' }}>Basic AI{headerAgentBtn(true)}</div>
        <div style={{ textAlign: 'center' }}>Pro AI{headerAgentBtn(false)}</div>
      </div>
      {Object.entries(grouped).map(([category, rows]) => (
        <React.Fragment key={category}>
          <div
            style={{
              padding: '14px 18px',
              background: 'color-mix(in oklab, var(--accent-a) 6%, var(--paper))',
              borderBottom: '1px solid var(--line)',
              fontFamily: 'var(--f-mono)',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--accent-ink)',
            }}
          >
            {categoryLabels[category] || category}
          </div>
          {rows.map((row, i) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr repeat(4, minmax(120px, 1fr))',
                padding: '14px 18px',
                borderBottom: '1px solid var(--line)',
                alignItems: 'center',
                fontSize: 14,
              }}
            >
              <div style={{ color: 'var(--ink-2)' }}>{featureLabels[row.feature] || row.feature}</div>
              <div style={{ textAlign: 'center' }}>{renderVal(row.starter)}</div>
              <div style={{ textAlign: 'center' }}>{renderVal(row.scaler)}</div>
              <div style={{ textAlign: 'center' }}>{renderVal(row.basicAi)}</div>
              <div style={{ textAlign: 'center' }}>{renderVal(row.proAi)}</div>
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  )
}

// ─── Main ───────────────────────────────────────────────────────────────────

interface PricingPageClientProps { pricingData: PricingData | null }

export function PricingPageClient({ pricingData }: PricingPageClientProps) {
  const [isAnnual, setIsAnnual] = useState(true)
  const { getDynamicPrice, convertUsdAmount, userCurrency, loading: pricingLoading } = useDynamicPricing()

  // Pick the locale-aware fallback. Sanity data takes priority if present;
  // otherwise we use the in-code translations so non-English visitors don't
  // see English copy. Falls back to English if Sanity returns nothing AND
  // the active locale isn't in FALLBACK_BY_LOCALE.
  const locale = useLocale()
  const fallback = FALLBACK_BY_LOCALE[locale] || FALLBACK_BY_LOCALE.en

  const heroRaw = pricingData?.hero || fallback.hero
  // String-level overrides for the hero H1 across all locales. Sanity
  // stores the old phrasing per locale; this rewrites the headline on
  // render without touching the CMS. Each locale matches its own
  // current Sanity string so we don't have to coordinate translations
  // between code and content.
  const HEADLINE_OVERRIDES: Record<string, { headline: string; headlineHighlight: string }> = {
    'Start free. Scale as':
      { headline: 'Start Free Scale As', headlineHighlight: 'You Grow' },
    'Preços simples,':
      { headline: 'Comece Grátis Escale', headlineHighlight: 'Conforme Você Cresce' },
    'Precios simples,':
      { headline: 'Empieza Gratis Escala', headlineHighlight: 'A Tu Ritmo' },
    'Basit, şeffaf':
      { headline: 'Ücretsiz Başlayın', headlineHighlight: 'Büyüdükçe Ölçeklendirin' },
  }
  const override = heroRaw.headline ? HEADLINE_OVERRIDES[heroRaw.headline] : undefined
  const hero = {
    ...heroRaw,
    headline: override?.headline ?? heroRaw.headline,
    headlineHighlight: override?.headlineHighlight ?? heroRaw.headlineHighlight,
  }

  // Localized fallback plans — start from the English defaults (which carry
  // canonical plan structure, features, prices, icons), then overlay the
  // locale's description + CTA label so non-English visitors don't see
  // English fallback prose.
  const localizedDefaultPlans: PricingPlan[] = defaultPricingPlans.map((plan) => {
    const localDesc =
      plan.planKey === 'starter' ? fallback.planDescriptions.starter :
      plan.planKey === 'scaler' ? fallback.planDescriptions.scaler :
      plan.planKey === 'basic-ai' ? fallback.planDescriptions.basicAi :
      plan.planKey === 'pro-ai' ? fallback.planDescriptions.proAi :
      plan.description
    const localCta = plan.cta.label === 'Install for Free' ? fallback.ctas.installFree
      : plan.cta.label === 'Talk to our AI Agent' ? fallback.ctas.talkToAgent
      : plan.cta.label
    return { ...plan, description: localDesc, cta: { ...plan.cta, label: localCta } }
  })

  // Features that Sanity still ships but we want hidden from the plan
  // cards on the live site. Match by lowercase text so casing drift in
  // Sanity doesn't break the filter. Ship this list here instead of
  // waiting for a content editor to remove them in Studio.
  const HIDDEN_SANITY_FEATURES = new Set<string>([
    'ai unreplied chats agent',
  ])

  const basePricingPlans: PricingPlan[] = pricingData?.plans?.map((plan) => {
    const planKey = iconToPlanKey(plan.icon)
    const codePlan = localizedDefaultPlans.find((p) => p.planKey === planKey)
    const sanityFeatures = plan.features
      .map((f) => ({ text: f.text, included: f.included, highlight: f.highlight }))
      .filter((f) => !HIDDEN_SANITY_FEATURES.has(f.text.trim().toLowerCase()))
    // Merge in any code-side features Sanity doesn't have yet (matched by
    // text, case-insensitive), preserving Sanity's ordering for anything
    // it already knows about. Lets us ship new features without a Sanity
    // content update per environment.
    const codeDefaults = codePlan?.features || []
    const sanityTexts = new Set(sanityFeatures.map((f) => f.text.trim().toLowerCase()))
    const missingFromSanity = codeDefaults.filter(
      (f) => !sanityTexts.has(f.text.trim().toLowerCase())
    )
    return {
      name: plan.name,
      planKey,
      description: plan.description,
      monthlyPrice: plan.monthlyPrice,
      annualPrice: plan.annualPrice,
      currency: plan.currency,
      icon: plan.icon as PricingPlan['icon'],
      popular: plan.isPopular,
      enterprise: plan.isEnterprise,
      // Fall back to the code-side priceNote when Sanity has none. Lets
      // "1 number · N users included" show on Scaler / Basic AI even
      // though those plans are Sanity-managed.
      priceNote: codePlan?.priceNote,
      features: [...sanityFeatures, ...missingFromSanity],
      cta: plan.cta,
    }
  }) || localizedDefaultPlans

  // AI plans always come from localizedDefaultPlans (Sanity doesn't manage
  // the Basic AI / Pro AI rows yet). Filter from the locale-aware list so
  // their descriptions + CTAs are in the active language.
  const localizedAiPlans = localizedDefaultPlans.filter((plan) =>
    plan.planKey === 'basic-ai' || plan.planKey === 'pro-ai'
  )

  const pricingPlans: PricingPlan[] = [
    ...basePricingPlans.filter((plan) =>
      plan.planKey !== 'omnis' &&
      plan.planKey !== 'basic-ai' &&
      plan.planKey !== 'pro-ai' &&
      plan.name.toLowerCase() !== 'omnis'
    ),
    ...localizedAiPlans,
  ]

  const trustSignalIcons = [Shield, Zap, Clock, MessageSquare]
  const trustSignals = fallback.trustSignals.map((text, i) => ({
    Icon: trustSignalIcons[i] ?? Shield,
    text,
  }))

  const comparisonSection = pricingData?.comparisonSection || fallback.comparisonSection

  const aiComparisonFeatures: ComparisonFeatureRow[] = defaultComparisonFeatures.filter((row) => row.category === 'AI Agents')
  // Rows we always want at the top of "Core Features", regardless of what
  // Sanity has. Merged in below when Sanity is the source of truth.
  const injectedCoreRows: ComparisonFeatureRow[] = defaultComparisonFeatures.filter(
    (row) => row.category === 'Core Features' && row.feature === 'WhatsApp API number',
  )
  const comparisonFeatures: ComparisonFeatureRow[] = pricingData?.comparisonSection?.features
    ? (() => {
        const sanityRows = pricingData.comparisonSection.features
          .filter((f) => !removedOmnisFeatureNames.has(f.feature))
          .map((f) => {
            const scalerValue = parseComparisonValue(f.scaler)
            const isSalesforce = f.feature === 'Salesforce'
            return {
              feature: f.feature,
              category: f.category,
              starter: parseComparisonValue(f.starter),
              scaler: scalerValue,
              basicAi: isSalesforce ? false : scalerValue,
              proAi: scalerValue,
            } as ComparisonFeatureRow
          })
        const sanityFeatureNames = new Set(sanityRows.map((r) => r.feature))
        const missingInjected = injectedCoreRows.filter((r) => !sanityFeatureNames.has(r.feature))
        // Prepend injected Core rows so they show first in that category.
        return [...missingInjected, ...sanityRows, ...aiComparisonFeatures]
      })()
    : defaultComparisonFeatures

  const faqSection = pricingData?.faqSection || fallback.faqSection
  const faqItems: FAQItem[] = pricingData?.faqSection?.faqs?.map((f) => ({ question: f.question, answer: f.answer })) || fallback.faqItems

  const [openFaq, setOpenFaq] = useState<Set<number>>(new Set([0]))
  const [showMoreFaqMobile, setShowMoreFaqMobile] = useState(false)
  const toggleFaq = (i: number) => setOpenFaq((p) => {
    const n = new Set(p)
    if (n.has(i)) n.delete(i)
    else n.add(i)
    return n
  })

  const [showAgentForm, setShowAgentForm] = useState(false)
  const openAgentForm = () => setShowAgentForm(true)

  return (
    <>
      {showAgentForm && (
        <div className="bea-modal-overlay" onClick={() => setShowAgentForm(false)}>
          <div
            className="bea-corner-form bea-modal-form"
            role="dialog"
            aria-modal="true"
            aria-label="Talk to our AI Agent"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="bea-corner-close"
              onClick={() => setShowAgentForm(false)}
              aria-label="Close"
            >
              <X size={16} />
            </button>
            <div className="bea-form-head">
              <h3>{fallback.agentModal.title} <em>{fallback.agentModal.titleEm}</em></h3>
              <p>{fallback.agentModal.subtitle}</p>
            </div>
            <LeadGenerationForm />
          </div>
        </div>
      )}
      {/* Global shimmer keyframes for the price-number skeletons in
          PricingCard. Rendered once at the page root so multiple cards
          share the same animation cycle. */}
      <style>{`
        @keyframes eazybe-price-shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .eazybe-price-skel {
          display: inline-block;
          border-radius: 8px;
          background: linear-gradient(90deg, #ECEFF7 0%, #DDE2ED 40%, #ECEFF7 80%);
          background-size: 200% 100%;
          animation: eazybe-price-shimmer 1.2s ease-in-out infinite;
          color: transparent;
        }
      `}</style>
      {/* Hero */}
      <section className="page-hero" data-tone="dark">
        <div className="container">
          <span className="hero-tag reveal"><span className="pulse" /> {String(hero.badge).toUpperCase()}</span>
          <h1 className="reveal">
            {hero.headline} <em>{hero.headlineHighlight}</em>
          </h1>
          <p className="lede reveal">{hero.subheadline}</p>
          <div className="reveal" style={{ display: 'flex', justifyContent: 'center' }}>
            <PricingToggle
              isAnnual={isAnnual}
              onToggle={setIsAnnual}
              labels={{ monthly: hero.billingToggleMonthly, annual: hero.billingToggleAnnual, saveBadge: hero.saveBadgeText }}
            />
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="section" style={{ paddingTop: 30 }} id="pricing-plans">
        <div className="container">
          <div className="card-grid pricing-plan-grid">
            {pricingPlans.map((plan, idx) => {
              const dp = getDynamicPrice(plan.planKey, plan.monthlyPrice, plan.annualPrice)
              // AI plans are per-seat priced themselves — no "extra seat"
              // addon note. Starter/Scaler still show the addon note from
              // the billing-API's addon_price.
              const isAiPlan = plan.planKey === 'basic-ai' || plan.planKey === 'pro-ai'
              const monthlyAddon = isAiPlan ? null : dp.monthlyAddonPrice
              const annualAddon = isAiPlan ? null : dp.annualAddonPrice
              return (
                <PricingCard
                  key={plan.name}
                  plan={plan}
                  isAnnual={isAnnual}
                  dynamicCurrency={dp.currency}
                  dynamicMonthlyPrice={dp.monthlyPrice}
                  dynamicAnnualPrice={dp.annualPrice}
                  dynamicMonthlyAddonPrice={monthlyAddon}
                  dynamicAnnualAddonPrice={annualAddon}
                  convertUsdAmount={convertUsdAmount}
                  transitionDelay={`${idx * 0.06}s`}
                  onTalkToAgent={openAgentForm}
                  featureLabels={fallback.featureLabels}
                  creditsIncludes={fallback.creditsIncludes}
                  creditsRollover={fallback.creditsRollover}
                  pricingLoading={pricingLoading}
                />
              )
            })}
          </div>

          <div
            className="reveal"
            style={{
              marginTop: 56,
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 28,
              color: 'var(--ink-3)',
              fontSize: 13,
            }}
          >
            {trustSignals.map(({ Icon, text }, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Icon size={16} style={{ color: 'var(--accent-ink)' }} /> {text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="section" data-tone="dark">
        <div className="container">
          <div className="sec-head centered reveal">
            <span className="sec-tag">{comparisonSection.badge}</span>
            <h2>{comparisonSection.title}</h2>
            <p>{comparisonSection.subtitle}</p>
          </div>
          <div className="reveal">
            <FeatureComparisonTable
              features={comparisonFeatures}
              currency={userCurrency}
              convertUsdAmount={convertUsdAmount}
              onTalkToAgent={openAgentForm}
              categoryLabels={fallback.comparisonCategories}
              featureLabels={fallback.featureLabels}
              talkToAgentLabel={fallback.ctas.talkToAgent}
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container">
          <div className="sec-head centered reveal">
            <span className="sec-tag">{faqSection.badge}</span>
            <h2>{faqSection.title}</h2>
            <p>
              {faqSection.subtitle}{' '}
              <a href="/contact" style={{ color: 'var(--accent-ink)', borderBottom: '1px solid color-mix(in oklab, var(--accent-ink) 40%, transparent)' }}>
                {faqSection.contactLinkText}
              </a>
            </p>
          </div>
          {(() => {
            const half = Math.ceil(faqItems.length / 2)
            const columns = [faqItems.slice(0, half), faqItems.slice(half)]
            return (
              <div className={`faq-grid${showMoreFaqMobile ? ' faq-show-more' : ''}`}>
                {columns.map((column, colIdx) => (
                  <div key={colIdx} className={`faq-col${colIdx === 1 ? ' faq-col-rest' : ''}`}>
                    {column.map((faq, i) => {
                      const idx = colIdx === 0 ? i : i + half
                      const isOpen = openFaq.has(idx)
                      return (
                        <div key={idx} className={`faq-pill${isOpen ? ' open' : ''}`}>
                          <button
                            className="faq-pill-q"
                            onClick={() => toggleFaq(idx)}
                            aria-expanded={isOpen}
                          >
                            <span>{faq.question}</span>
                            <span className="faq-pill-chev" aria-hidden="true">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6 9 12 15 18 9" />
                              </svg>
                            </span>
                          </button>
                          <div className="faq-pill-a">
                            <div>{faq.answer}</div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            )
          })()}
          {!showMoreFaqMobile && (
            <button
              type="button"
              className="faq-mobile-more"
              onClick={() => setShowMoreFaqMobile(true)}
            >
              {fallback.ctas.readMore}
            </button>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="final-cta" data-tone="dark">
        <div className="container">
          <h2 className="reveal">
            {fallback.finalCta.headline}<br />
            <em>{fallback.finalCta.headlineEm}</em>
          </h2>
          <p className="sub reveal">{fallback.finalCta.subtitle}</p>
          <div className="ctas reveal">
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={openAgentForm}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.967-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488" />
              </svg>
              {fallback.ctas.talkToAgent}
            </button>
            <a href="https://eazybe.info/demono" className="btn btn-outline btn-lg">
              {fallback.ctas.bookDemo}
            </a>
          </div>
          <p
            className="reveal"
            style={{
              marginTop: 22,
              fontFamily: 'var(--f-mono)',
              fontSize: 11,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--ink-4)',
            }}
          >
            {fallback.ctas.noCreditCard}
          </p>
        </div>
      </section>
    </>
  )
}
