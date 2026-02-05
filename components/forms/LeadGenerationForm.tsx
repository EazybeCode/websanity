import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface FormData {
  email: string;
  phone: string;
  crm: string;
}

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
    phone: '',
    crm: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCalendlyLoading, setIsCalendlyLoading] = useState(true); // keeping for compatibility
  const [showForm, setShowForm] = useState(false);

  React.useEffect(() => {
    console.log('LeadGenerationForm rendered');
  }, []);

  React.useEffect(() => {
    // Change URL to /thank-you when form is successfully submitted
    if (isSuccess) {
      window.history.pushState({}, '', '/thank-you');
      onCalendlyShow?.(true);
    }
  }, [isSuccess, onCalendlyShow]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = t('leadForm.emailRequired');
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t('leadForm.emailInvalid');
    }

    // Phone validation (optional - only validate if provided)
    if (formData.phone.trim() && formData.phone.trim().length < 10) {
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
      const formId = "470166e7-1418-4bd9-9e1e-7252ad54070b";

      // Build fields array for HubSpot
      const fields: { name: string; value: string }[] = [
        { name: "email", value: formData.email },
        { name: "language", value: getLanguageName() },
        { name: "crm_used", value: formData.crm || "Website" },
        { name: "source_name", value: "website" },
      ];

      // Add phone if provided
      if (formData.phone.trim()) {
        const formattedPhone = formatPhoneNumber(formData.phone);
        fields.push({ name: "phone", value: formattedPhone });
      }

      const payload = {
        fields,
        context: {
          pageUri: window.location.href,
          pageName: document.title || "EazyBe Website",
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
              <p className="text-slate-300 mb-2">
                {t('leadForm.introDescription')}
              </p>
              <p className="text-slate-400 text-sm">
                {t('leadForm.introSubtext')}
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

            <Input
              label={t('leadForm.phoneLabel')}
              type="tel"
              name="phone"
              placeholder={t('leadForm.phonePlaceholder')}
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              disabled={isSubmitting}
            />

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
