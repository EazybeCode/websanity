import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface FormData {
  email: string;
  countryCode: string;
  phone: string;
  crm: string;
}

// List of personal email domains to block
const PERSONAL_EMAIL_DOMAINS = [
  'gmail.com',
  'yahoo.com',
  'yahoo.co.in',
  'hotmail.com',
  'outlook.com',
  'live.com',
  'msn.com',
  'aol.com',
  'icloud.com',
  'me.com',
  'mac.com',
  'protonmail.com',
  'proton.me',
  'mail.com',
  'zoho.com',
  'yandex.com',
  'gmx.com',
  'rediffmail.com',
];

// Comprehensive country codes list
const COUNTRY_CODES = [
  // North America
  { code: '+1', country: 'US/CA', flag: '🇺🇸' },
  { code: '+52', country: 'MX', flag: '🇲🇽' },
  // Europe
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+49', country: 'DE', flag: '🇩🇪' },
  { code: '+33', country: 'FR', flag: '🇫🇷' },
  { code: '+34', country: 'ES', flag: '🇪🇸' },
  { code: '+39', country: 'IT', flag: '🇮🇹' },
  { code: '+31', country: 'NL', flag: '🇳🇱' },
  { code: '+32', country: 'BE', flag: '🇧🇪' },
  { code: '+41', country: 'CH', flag: '🇨🇭' },
  { code: '+43', country: 'AT', flag: '🇦🇹' },
  { code: '+45', country: 'DK', flag: '🇩🇰' },
  { code: '+46', country: 'SE', flag: '🇸🇪' },
  { code: '+47', country: 'NO', flag: '🇳🇴' },
  { code: '+48', country: 'PL', flag: '🇵🇱' },
  { code: '+351', country: 'PT', flag: '🇵🇹' },
  { code: '+353', country: 'IE', flag: '🇮🇪' },
  { code: '+354', country: 'IS', flag: '🇮🇸' },
  { code: '+358', country: 'FI', flag: '🇫🇮' },
  { code: '+30', country: 'GR', flag: '🇬🇷' },
  { code: '+420', country: 'CZ', flag: '🇨🇿' },
  { code: '+36', country: 'HU', flag: '🇭🇺' },
  { code: '+40', country: 'RO', flag: '🇷🇴' },
  { code: '+380', country: 'UA', flag: '🇺🇦' },
  { code: '+7', country: 'RU', flag: '🇷🇺' },
  { code: '+90', country: 'TR', flag: '🇹🇷' },
  // South America
  { code: '+55', country: 'BR', flag: '🇧🇷' },
  { code: '+54', country: 'AR', flag: '🇦🇷' },
  { code: '+56', country: 'CL', flag: '🇨🇱' },
  { code: '+57', country: 'CO', flag: '🇨🇴' },
  { code: '+51', country: 'PE', flag: '🇵🇪' },
  { code: '+58', country: 'VE', flag: '🇻🇪' },
  { code: '+593', country: 'EC', flag: '🇪🇨' },
  // Asia
  { code: '+91', country: 'IN', flag: '🇮🇳' },
  { code: '+86', country: 'CN', flag: '🇨🇳' },
  { code: '+81', country: 'JP', flag: '🇯🇵' },
  { code: '+82', country: 'KR', flag: '🇰🇷' },
  { code: '+852', country: 'HK', flag: '🇭🇰' },
  { code: '+886', country: 'TW', flag: '🇹🇼' },
  { code: '+65', country: 'SG', flag: '🇸🇬' },
  { code: '+60', country: 'MY', flag: '🇲🇾' },
  { code: '+62', country: 'ID', flag: '🇮🇩' },
  { code: '+63', country: 'PH', flag: '🇵🇭' },
  { code: '+66', country: 'TH', flag: '🇹🇭' },
  { code: '+84', country: 'VN', flag: '🇻🇳' },
  { code: '+880', country: 'BD', flag: '🇧🇩' },
  { code: '+92', country: 'PK', flag: '🇵🇰' },
  { code: '+94', country: 'LK', flag: '🇱🇰' },
  { code: '+977', country: 'NP', flag: '🇳🇵' },
  // Middle East
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
  { code: '+966', country: 'SA', flag: '🇸🇦' },
  { code: '+974', country: 'QA', flag: '🇶🇦' },
  { code: '+973', country: 'BH', flag: '🇧🇭' },
  { code: '+968', country: 'OM', flag: '🇴🇲' },
  { code: '+965', country: 'KW', flag: '🇰🇼' },
  { code: '+972', country: 'IL', flag: '🇮🇱' },
  { code: '+962', country: 'JO', flag: '🇯🇴' },
  { code: '+961', country: 'LB', flag: '🇱🇧' },
  { code: '+98', country: 'IR', flag: '🇮🇷' },
  { code: '+964', country: 'IQ', flag: '🇮🇶' },
  // Oceania
  { code: '+61', country: 'AU', flag: '🇦🇺' },
  { code: '+64', country: 'NZ', flag: '🇳🇿' },
  // Africa
  { code: '+27', country: 'ZA', flag: '🇿🇦' },
  { code: '+234', country: 'NG', flag: '🇳🇬' },
  { code: '+254', country: 'KE', flag: '🇰🇪' },
  { code: '+20', country: 'EG', flag: '🇪🇬' },
  { code: '+212', country: 'MA', flag: '🇲🇦' },
  { code: '+213', country: 'DZ', flag: '🇩🇿' },
  { code: '+216', country: 'TN', flag: '🇹🇳' },
  { code: '+233', country: 'GH', flag: '🇬🇭' },
  { code: '+256', country: 'UG', flag: '🇺🇬' },
  { code: '+255', country: 'TZ', flag: '🇹🇿' },
  { code: '+251', country: 'ET', flag: '🇪🇹' },
];

interface FormErrors {
  email?: string;
  phone?: string;
  crm?: string;
}

interface LeadGenerationFormProps {
  onCalendlyShow?: (isShowing: boolean) => void;
}

export const LeadGenerationForm: React.FC<LeadGenerationFormProps> = ({ onCalendlyShow }) => {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    countryCode: '+91',
    phone: '',
    crm: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCalendlyLoading, setIsCalendlyLoading] = useState(true); // keeping for compatibility
  const [showForm, setShowForm] = useState(true);

  React.useEffect(() => {
    console.log('LeadGenerationForm rendered');
  }, []);

  React.useEffect(() => {
    // Change URL to language-specific thank-you page when form is successfully submitted
    if (isSuccess) {
      // Determine the thank-you page path based on current language
      const lang = i18n.language;
      let thankYouPath = '/thank-you'; // Default: English

      if (lang === 'br' || lang === 'pt') {
        thankYouPath = '/br/thank-you';
      } else if (lang === 'es') {
        thankYouPath = '/es/thank-you';
      } else if (lang === 'tr') {
        thankYouPath = '/tr/thank-you';
      }

      window.history.pushState({}, '', thankYouPath);
      onCalendlyShow?.(true);
    }
  }, [isSuccess, onCalendlyShow, i18n.language]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isPersonalEmail = (email: string): boolean => {
    const domain = email.split('@')[1]?.toLowerCase();
    return PERSONAL_EMAIL_DOMAINS.includes(domain);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = t('leadForm.emailRequired');
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t('leadForm.emailInvalid');
    } else if (isPersonalEmail(formData.email)) {
      newErrors.email = t('leadForm.workEmailRequired');
    }

    // Phone validation (required)
    if (!formData.phone.trim()) {
      newErrors.phone = t('leadForm.phoneRequired');
    } else if (formData.phone.trim().length < 7) {
      newErrors.phone = t('leadForm.phoneInvalid');
    }

    // CRM validation
    if (!formData.crm) {
      newErrors.crm = t('leadForm.crmRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Get language name for HubSpot based on current i18n language
  const getLanguageName = (): string => {
    const langMap: Record<string, string> = {
      en: 'English',
      pt: 'Portuguese',
      br: 'Portuguese',
      es: 'Spanish',
      tr: 'Turkish',
    };
    return langMap[i18n.language] || 'English';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Format phone number - keep only digits
      const formatPhoneNumber = (phone: string): string => {
        return phone.replace(/\D/g, '');
      };

      // HubSpot Form API config
      const portalId = "40009480";
      // Use different form IDs based on language
      let formId = "470166e7-1418-4bd9-9e1e-7252ad54070b"; // Default: English form
      if (i18n.language === 'br' || i18n.language === 'pt') {
        formId = "922fbde6-ba79-4c8e-b784-a7bf67ef3708"; // Brazilian Portuguese form
      } else if (i18n.language === 'es') {
        formId = "e6630d0e-f941-42e0-abd5-c3686e4ce16c"; // Spanish form
      }

      // Build fields array for HubSpot
      const fields: { name: string; value: string }[] = [
        { name: "email", value: formData.email },
        { name: "language", value: getLanguageName() },
        { name: "crm_used", value: formData.crm || "Website" },
        { name: "source_name", value: "website" },
        { name: "entry_page", value: sessionStorage.getItem('entry_page') || window.location.pathname },
        { name: "exit_page", value: window.location.pathname },
      ];

      // Add UTMs if present
      const utmSource = sessionStorage.getItem('utm_source');
      const utmMedium = sessionStorage.getItem('utm_medium');
      const utmCampaign = sessionStorage.getItem('utm_campaign');
      if (utmSource) fields.push({ name: "utm_source", value: utmSource });
      if (utmMedium) fields.push({ name: "utm_medium", value: utmMedium });
      if (utmCampaign) fields.push({ name: "utm_campaign", value: utmCampaign });

      // Add phone with country code
      const formattedPhone = formData.countryCode.replace('+', '') + formatPhoneNumber(formData.phone);
      fields.push({ name: "phone", value: formattedPhone });

      // Get HubSpot tracking cookie for linking page views to contact
      const hutk = document.cookie.split(';').find(c => c.trim().startsWith('hubspotutk='))?.split('=')[1];

      const payload = {
        fields,
        context: {
          pageUri: window.location.href,
          pageName: document.title || "EazyBe Website",
          ...(hutk ? { hutk } : {}),
        },
      };

      // Debug: Log the payload being sent
      console.log('Sending to HubSpot:', JSON.stringify(payload, null, 2));

      // Send data directly to HubSpot Forms API
      const response = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      // Debug: Log the full response
      console.log('HubSpot Response status:', response.status);
      console.log('HubSpot Response data:', JSON.stringify(data, null, 2));

      if (response.ok) {
        // Fire GA4 event
        const lang = i18n.language || 'en';
        (window as any).gtag?.('event', `steal_roadmap_submit_${lang}`);
        setIsSuccess(true);
      } else {
        console.error('HubSpot error:', data);
        // Still show success to user
        setIsSuccess(true);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Still show success for now (you can add error handling UI later)
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

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
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
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
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                {t('leadForm.phoneLabel')}
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="flex gap-2">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-24 font-sans transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed rounded-btn px-2 py-2.5 text-sm h-11 bg-brand-card text-white border border-slate-700 hover:border-slate-600 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
                >
                  {COUNTRY_CODES.map((cc) => (
                    <option key={cc.code} value={cc.code}>
                      {cc.flag} {cc.code}
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
                  className={`flex-1 font-sans transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed rounded-btn px-4 py-2.5 text-sm h-11 ${
                    errors.phone
                      ? 'bg-brand-card text-white border-2 border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-500/20'
                      : 'bg-brand-card text-white border border-slate-700 hover:border-slate-600 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20'
                  }`}
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
              <label
                htmlFor="crm"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
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
  );
};
