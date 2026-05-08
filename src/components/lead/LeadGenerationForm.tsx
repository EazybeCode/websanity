'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

interface FormData {
  email: string
  countryCode: string
  phone: string
  crm: string
}

const PERSONAL_EMAIL_DOMAINS = [
  'gmail.com', 'yahoo.com', 'yahoo.co.in', 'hotmail.com', 'outlook.com',
  'live.com', 'msn.com', 'aol.com', 'icloud.com', 'me.com', 'mac.com',
  'protonmail.com', 'proton.me', 'mail.com', 'zoho.com', 'yandex.com',
  'gmx.com', 'rediffmail.com',
]

const COUNTRY_CODES = [
  { code: '+1', country: 'US/CA', flag: '\u{1F1FA}\u{1F1F8}' },
  { code: '+52', country: 'MX', flag: '\u{1F1F2}\u{1F1FD}' },
  { code: '+44', country: 'UK', flag: '\u{1F1EC}\u{1F1E7}' },
  { code: '+49', country: 'DE', flag: '\u{1F1E9}\u{1F1EA}' },
  { code: '+33', country: 'FR', flag: '\u{1F1EB}\u{1F1F7}' },
  { code: '+34', country: 'ES', flag: '\u{1F1EA}\u{1F1F8}' },
  { code: '+39', country: 'IT', flag: '\u{1F1EE}\u{1F1F9}' },
  { code: '+31', country: 'NL', flag: '\u{1F1F3}\u{1F1F1}' },
  { code: '+32', country: 'BE', flag: '\u{1F1E7}\u{1F1EA}' },
  { code: '+41', country: 'CH', flag: '\u{1F1E8}\u{1F1ED}' },
  { code: '+43', country: 'AT', flag: '\u{1F1E6}\u{1F1F9}' },
  { code: '+55', country: 'BR', flag: '\u{1F1E7}\u{1F1F7}' },
  { code: '+54', country: 'AR', flag: '\u{1F1E6}\u{1F1F7}' },
  { code: '+91', country: 'IN', flag: '\u{1F1EE}\u{1F1F3}' },
  { code: '+86', country: 'CN', flag: '\u{1F1E8}\u{1F1F3}' },
  { code: '+81', country: 'JP', flag: '\u{1F1EF}\u{1F1F5}' },
  { code: '+82', country: 'KR', flag: '\u{1F1F0}\u{1F1F7}' },
  { code: '+65', country: 'SG', flag: '\u{1F1F8}\u{1F1EC}' },
  { code: '+60', country: 'MY', flag: '\u{1F1F2}\u{1F1FE}' },
  { code: '+62', country: 'ID', flag: '\u{1F1EE}\u{1F1E9}' },
  { code: '+63', country: 'PH', flag: '\u{1F1F5}\u{1F1ED}' },
  { code: '+66', country: 'TH', flag: '\u{1F1F9}\u{1F1ED}' },
  { code: '+84', country: 'VN', flag: '\u{1F1FB}\u{1F1F3}' },
  { code: '+971', country: 'UAE', flag: '\u{1F1E6}\u{1F1EA}' },
  { code: '+966', country: 'SA', flag: '\u{1F1F8}\u{1F1E6}' },
  { code: '+90', country: 'TR', flag: '\u{1F1F9}\u{1F1F7}' },
  { code: '+61', country: 'AU', flag: '\u{1F1E6}\u{1F1FA}' },
  { code: '+64', country: 'NZ', flag: '\u{1F1F3}\u{1F1FF}' },
  { code: '+27', country: 'ZA', flag: '\u{1F1FF}\u{1F1E6}' },
  { code: '+234', country: 'NG', flag: '\u{1F1F3}\u{1F1EC}' },
  { code: '+254', country: 'KE', flag: '\u{1F1F0}\u{1F1EA}' },
  { code: '+20', country: 'EG', flag: '\u{1F1EA}\u{1F1EC}' },
]

interface FormErrors {
  email?: string
  phone?: string
  crm?: string
}

interface LeadGenerationFormProps {
  onCalendlyShow?: (isShowing: boolean) => void
}

export const LeadGenerationForm: React.FC<LeadGenerationFormProps> = ({ onCalendlyShow }) => {
  const t = useTranslations()
  const locale = useLocale()
  const [formData, setFormData] = useState<FormData>({
    email: '',
    countryCode: '+91',
    phone: '',
    crm: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [showForm, setShowForm] = useState(true)

  React.useEffect(() => {
    if (isSuccess) {
      let thankYouPath = '/thank-you'
      if (locale === 'br' || locale === 'pt') {
        thankYouPath = '/br/thank-you'
      } else if (locale === 'es') {
        thankYouPath = '/es/thank-you'
      } else if (locale === 'tr') {
        thankYouPath = '/tr/thank-you'
      }
      window.history.pushState({}, '', thankYouPath)
      onCalendlyShow?.(true)
    }
  }, [isSuccess, onCalendlyShow, locale])

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const isPersonalEmail = (email: string): boolean => {
    const domain = email.split('@')[1]?.toLowerCase()
    return PERSONAL_EMAIL_DOMAINS.includes(domain)
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    if (!formData.email.trim()) {
      newErrors.email = t('leadForm.emailRequired')
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t('leadForm.emailInvalid')
    } else if (isPersonalEmail(formData.email)) {
      newErrors.email = t('leadForm.workEmailRequired')
    }
    if (!formData.phone.trim()) {
      newErrors.phone = t('leadForm.phoneRequired')
    } else if (formData.phone.trim().length < 7) {
      newErrors.phone = t('leadForm.phoneInvalid')
    }
    if (!formData.crm) {
      newErrors.crm = t('leadForm.crmRequired')
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const getLanguageName = (): string => {
    const langMap: Record<string, string> = {
      en: 'English',
      pt: 'Portuguese',
      br: 'Portuguese',
      es: 'Spanish',
      tr: 'Turkish',
    }
    return langMap[locale] || 'English'
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsSubmitting(true)

    try {
      const formatPhoneNumber = (phone: string): string => phone.replace(/\D/g, '')

      const portalId = "40009480"
      let formId = "470166e7-1418-4bd9-9e1e-7252ad54070b"
      if (locale === 'br' || locale === 'pt') {
        formId = "922fbde6-ba79-4c8e-b784-a7bf67ef3708"
      } else if (locale === 'es') {
        formId = "e6630d0e-f941-42e0-abd5-c3686e4ce16c"
      }

      const fields: { name: string; value: string }[] = [
        { name: "email", value: formData.email },
        { name: "language", value: getLanguageName() },
        { name: "crm_used", value: formData.crm || "Website" },
        { name: "source_name", value: "website" },
        { name: "entry_page", value: sessionStorage.getItem('entry_page') || window.location.pathname },
        { name: "exit_page", value: window.location.pathname },
      ]

      const utmSource = sessionStorage.getItem('utm_source')
      const utmMedium = sessionStorage.getItem('utm_medium')
      const utmCampaign = sessionStorage.getItem('utm_campaign')
      if (utmSource) fields.push({ name: "utm_source", value: utmSource })
      if (utmMedium) fields.push({ name: "utm_medium", value: utmMedium })
      if (utmCampaign) fields.push({ name: "utm_campaign", value: utmCampaign })

      const formattedPhone = formData.countryCode + formatPhoneNumber(formData.phone)
      fields.push({ name: "phone", value: formattedPhone })

      const hutk = document.cookie.split(';').find(c => c.trim().startsWith('hubspotutk='))?.split('=')[1]

      const payload = {
        fields,
        context: {
          pageUri: window.location.href,
          pageName: document.title || "EazyBe Website",
          ...(hutk ? { hutk } : {}),
        },
      }

      const response = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      )

      if (response.ok) {
        ;(window as any).gtag?.('event', `steal_roadmap_submit_${locale}`)
      }

      setIsSuccess(true)
      const waMessages: Record<string, string> = {
        en: 'Build AI Agent for my Business in 2 Mins',
        es: 'Crea un Agente de IA para mi Negocio en 2 Min',
        tr: 'İşletmem için 2 Dakikada AI Ajanı Oluştur',
        'pt-BR': 'Crie um Agente de IA para meu Negócio em 2 Min',
        pt: 'Crie um Agente de IA para meu Negócio em 2 Min',
        br: 'Crie um Agente de IA para meu Negócio em 2 Min',
      }
      const waMessage = encodeURIComponent(waMessages[locale] || waMessages.en)
      window.open(`https://wa.me/13023356201?text=${waMessage}`, '_blank')
    } catch (error) {
      console.error('Error submitting form:', error)
      setIsSuccess(true)
      const waMessages: Record<string, string> = {
        en: 'Build AI Agent for my Business in 2 Mins',
        es: 'Crea un Agente de IA para mi Negocio en 2 Min',
        tr: 'İşletmem için 2 Dakikada AI Ajanı Oluştur',
        br: 'Crie um Agente de IA para meu Negócio em 2 Min',
      }
      const waMessage = encodeURIComponent(waMessages[locale] || waMessages.en)
      window.open(`https://wa.me/13023356201?text=${waMessage}`, '_blank')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="thank-you"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full text-center"
          >
            <div>
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">
                {t('leadForm.thankYouTitle')}
              </h2>
              <p className="text-slate-300 mb-2">
                {t('leadForm.thankYouMessage')}
              </p>
              <p className="text-slate-400 text-sm">
                {t('leadForm.thankYouSubtext')}
              </p>
            </div>
          </motion.div>
        ) : !showForm ? (
          <div key="intro-container">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-white mb-3">
                {t('leadForm.introTitle')}
              </h2>
              <p className="text-slate-300 mb-4">
                {t('leadForm.introDescription')}
              </p>
            </div>
            <Button
              type="button"
              variant="primary"
              size="lg"
              onClick={() => setShowForm(true)}
              className="w-full"
            >
              {t('leadForm.downloadButton')}
            </Button>
          </div>
        ) : (
          <div key="form-container">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label={t('leadForm.emailLabel')}
                type="email"
                name="email"
                placeholder={t('leadForm.emailPlaceholder')}
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                required
                disabled={isSubmitting}
              />

              <div className="w-full">
                <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">
                  {t('leadForm.phoneLabel')}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className={`flex items-center gap-0 rounded-btn bg-brand-card h-11 transition-all duration-200 ${
                  errors.phone
                    ? 'border-2 border-red-500 focus-within:border-red-600 focus-within:ring-2 focus-within:ring-red-500/20'
                    : 'border border-slate-700 focus-within:border-brand-blue focus-within:ring-2 focus-within:ring-brand-blue/20'
                }`}>
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-[100px] shrink-0 font-sans text-sm h-full bg-brand-card text-white px-3 border-r border-slate-700 rounded-l-btn focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {COUNTRY_CODES.map((cc) => (
                      <option key={`${cc.code}-${cc.country}`} value={cc.code} className="bg-slate-900 text-white">
                        {cc.country} {cc.code}
                      </option>
                    ))}
                  </select>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    placeholder={t('leadForm.phonePlaceholder')}
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="flex-1 font-sans text-sm h-full bg-transparent text-white px-4 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.phone}
                  </p>
                )}
              </div>

              <div className="w-full">
                <label htmlFor="crm" className="block text-sm font-medium text-slate-300 mb-2">
                  {t('leadForm.crmLabel')}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <select
                  id="crm"
                  name="crm"
                  value={formData.crm}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full font-sans transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed rounded-btn px-4 py-2.5 text-sm h-11 ${
                    errors.crm
                      ? 'bg-brand-card text-white border-2 border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-500/20'
                      : 'bg-brand-card text-white border border-slate-700 hover:border-slate-600 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20'
                  }`}
                >
                  <option value="">{t('leadForm.crmPlaceholder')}</option>
                  <option value="HubSpot">{t('leadForm.crmHubspot')}</option>
                  <option value="Salesforce">{t('leadForm.crmSalesforce')}</option>
                  <option value="Zoho">{t('leadForm.crmZoho')}</option>
                  <option value="Other">{t('leadForm.crmOther')}</option>
                  <option value="None">{t('leadForm.crmNone')}</option>
                </select>
                {errors.crm && (
                  <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.crm}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? t('leadForm.submitting') : t('leadForm.submitButton')}
              </Button>
            </form>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
