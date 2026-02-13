import React, { useState } from 'react';
import { X, Send, Loader2, CheckCircle2, Zap, Target, Bot, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CRMType, TrialFormData } from '../../types';

interface TrialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const COUNTRY_CODES = [
  // North America
  { code: '+1', label: 'US/CA', icon: '🇺🇸' },
  { code: '+52', label: 'MX', icon: '🇲🇽' },
  // Europe
  { code: '+44', label: 'UK', icon: '🇬🇧' },
  { code: '+49', label: 'DE', icon: '🇩🇪' },
  { code: '+33', label: 'FR', icon: '🇫🇷' },
  { code: '+34', label: 'ES', icon: '🇪🇸' },
  { code: '+39', label: 'IT', icon: '🇮🇹' },
  { code: '+31', label: 'NL', icon: '🇳🇱' },
  { code: '+32', label: 'BE', icon: '🇧🇪' },
  { code: '+41', label: 'CH', icon: '🇨🇭' },
  { code: '+43', label: 'AT', icon: '🇦🇹' },
  { code: '+45', label: 'DK', icon: '🇩🇰' },
  { code: '+46', label: 'SE', icon: '🇸🇪' },
  { code: '+47', label: 'NO', icon: '🇳🇴' },
  { code: '+48', label: 'PL', icon: '🇵🇱' },
  { code: '+351', label: 'PT', icon: '🇵🇹' },
  { code: '+353', label: 'IE', icon: '🇮🇪' },
  { code: '+354', label: 'IS', icon: '🇮🇸' },
  { code: '+358', label: 'FI', icon: '🇫🇮' },
  { code: '+30', label: 'GR', icon: '🇬🇷' },
  { code: '+420', label: 'CZ', icon: '🇨🇿' },
  { code: '+36', label: 'HU', icon: '🇭🇺' },
  { code: '+40', label: 'RO', icon: '🇷🇴' },
  { code: '+380', label: 'UA', icon: '🇺🇦' },
  { code: '+7', label: 'RU', icon: '🇷🇺' },
  { code: '+90', label: 'TR', icon: '🇹🇷' },
  // South America
  { code: '+55', label: 'BR', icon: '🇧🇷' },
  { code: '+54', label: 'AR', icon: '🇦🇷' },
  { code: '+56', label: 'CL', icon: '🇨🇱' },
  { code: '+57', label: 'CO', icon: '🇨🇴' },
  { code: '+51', label: 'PE', icon: '🇵🇪' },
  { code: '+58', label: 'VE', icon: '🇻🇪' },
  { code: '+593', label: 'EC', icon: '🇪🇨' },
  // Asia
  { code: '+91', label: 'IN', icon: '🇮🇳' },
  { code: '+86', label: 'CN', icon: '🇨🇳' },
  { code: '+81', label: 'JP', icon: '🇯🇵' },
  { code: '+82', label: 'KR', icon: '🇰🇷' },
  { code: '+852', label: 'HK', icon: '🇭🇰' },
  { code: '+886', label: 'TW', icon: '🇹🇼' },
  { code: '+65', label: 'SG', icon: '🇸🇬' },
  { code: '+60', label: 'MY', icon: '🇲🇾' },
  { code: '+62', label: 'ID', icon: '🇮🇩' },
  { code: '+63', label: 'PH', icon: '🇵🇭' },
  { code: '+66', label: 'TH', icon: '🇹🇭' },
  { code: '+84', label: 'VN', icon: '🇻🇳' },
  { code: '+880', label: 'BD', icon: '🇧🇩' },
  { code: '+92', label: 'PK', icon: '🇵🇰' },
  { code: '+94', label: 'LK', icon: '🇱🇰' },
  { code: '+977', label: 'NP', icon: '🇳🇵' },
  // Middle East
  { code: '+971', label: 'UAE', icon: '🇦🇪' },
  { code: '+966', label: 'SA', icon: '🇸🇦' },
  { code: '+974', label: 'QA', icon: '🇶🇦' },
  { code: '+973', label: 'BH', icon: '🇧🇭' },
  { code: '+968', label: 'OM', icon: '🇴🇲' },
  { code: '+965', label: 'KW', icon: '🇰🇼' },
  { code: '+972', label: 'IL', icon: '🇮🇱' },
  { code: '+962', label: 'JO', icon: '🇯🇴' },
  { code: '+961', label: 'LB', icon: '🇱🇧' },
  { code: '+98', label: 'IR', icon: '🇮🇷' },
  { code: '+964', label: 'IQ', icon: '🇮🇶' },
  // Oceania
  { code: '+61', label: 'AU', icon: '🇦🇺' },
  { code: '+64', label: 'NZ', icon: '🇳🇿' },
  // Africa
  { code: '+27', label: 'ZA', icon: '🇿🇦' },
  { code: '+234', label: 'NG', icon: '🇳🇬' },
  { code: '+254', label: 'KE', icon: '🇰🇪' },
  { code: '+20', label: 'EG', icon: '🇪🇬' },
  { code: '+212', label: 'MA', icon: '🇲🇦' },
  { code: '+213', label: 'DZ', icon: '🇩🇿' },
  { code: '+216', label: 'TN', icon: '🇹🇳' },
  { code: '+233', label: 'GH', icon: '🇬🇭' },
  { code: '+256', label: 'UG', icon: '🇺🇬' },
  { code: '+255', label: 'TZ', icon: '🇹🇿' },
  { code: '+251', label: 'ET', icon: '🇪🇹' },
];

// Blocked personal email domains
const PERSONAL_EMAIL_DOMAINS = [
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'live.com',
  'icloud.com',
  'aol.com',
  'mail.com',
  'protonmail.com',
  'zoho.com',
  'yandex.com',
  'gmx.com',
];

export const TrialModal: React.FC<TrialModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0].code);
  const [phoneValue, setPhoneValue] = useState('');
  const [formData, setFormData] = useState<TrialFormData>({
    workEmail: '',
    phoneNumber: '',
    crmProvider: CRMType.HUBSPOT,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [emailError, setEmailError] = useState('');

  if (!isOpen) return null;

  const isPersonalEmail = (email: string): boolean => {
    const domain = email.split('@')[1]?.toLowerCase();
    return PERSONAL_EMAIL_DOMAINS.includes(domain);
  };

  const handleEmailChange = (email: string) => {
    setFormData({ ...formData, workEmail: email });

    if (email && email.includes('@')) {
      if (isPersonalEmail(email)) {
        setEmailError(t('trialModal.workEmailError'));
      } else {
        setEmailError('');
      }
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email before submission
    if (isPersonalEmail(formData.workEmail)) {
      setEmailError('Please use your work email, not a personal email address');
      return;
    }

    setIsSubmitting(true);

    // Combine country code and number for the final payload
    const finalPhone = `${selectedCountry}${phoneValue.replace(/\s+/g, '')}`;

    try {
      // Submit to HubSpot Forms API
      const hubspotPayload = {
        portalId: '40009480',
        formGuid: '9aedb83c-2475-483a-87cc-30712345cc77',
        fields: [
          {
            name: 'email',
            value: formData.workEmail,
          },
          {
            name: 'phone',
            value: finalPhone,
          },
          {
            name: 'crm_used',
            value: formData.crmProvider,
          },
        ],
      };

      const response = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/40009480/9aedb83c-2475-483a-87cc-30712345cc77`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(hubspotPayload),
        }
      );

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      setIsSubmitting(false);
      setIsSuccess(true);

      // Redirect to Chrome Web Store after 2 seconds
      setTimeout(() => {
        window.location.href = 'https://chromewebstore.google.com/detail/eazybe-best-whatsapp-web/clgficggccelgifppbcaepjdkklfcefd';
      }, 2000);

    } catch (error) {
      console.error('Form submission error:', error);
      setIsSubmitting(false);
      // Show error state or notification
      alert('There was an error submitting the form. Please try again.');
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-lg transition-all duration-500"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-2xl bg-brand-surface border border-brand-border rounded-xl shadow-[0_0_80px_-20px_rgba(37,99,235,0.3)] overflow-hidden flex flex-col lg:flex-row min-h-[380px]">

        {/* Left Side */}
        <div className="lg:w-[45%] relative bg-brand-black p-6 lg:p-8 flex flex-col justify-between overflow-hidden border-r border-slate-800/50">
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none"></div>

          <div className="relative z-10 pt-2">
            <h2 className="text-2xl lg:text-3xl font-sans font-extrabold text-white leading-[1.2] mb-6 tracking-tighter">
              {t('trialModal.heading')}<br />
              <span className="text-brand-blue">{t('trialModal.headingHighlight')}</span>
            </h2>

            <div className="space-y-3">
              {[
                { icon: <Zap size={12} />, title: t('trialModal.feature1'), color: "text-brand-blue" },
                { icon: <Target size={12} />, title: t('trialModal.feature2'), color: "text-brand-cyan" },
                { icon: <Bot size={12} />, title: t('trialModal.feature3'), color: "text-brand-orange" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center ${item.color}`}>
                    {item.icon}
                  </div>
                  <h4 className="text-white font-bold text-[11px] tracking-tight">{item.title}</h4>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 mt-8 pt-6 border-t border-slate-800/40">
            <div className="p-3 bg-slate-900/60 border border-slate-800/50 rounded-xl backdrop-blur-md">
              <div className="flex gap-0.5 text-brand-orange mb-2">
                {[1,2,3,4,5].map(i => <Star key={i} size={8} fill="currentColor" />)}
              </div>
              <p className="text-slate-100 italic text-[10px] leading-snug mb-2">
                "{t('trialModal.testimonialQuote')}"
              </p>
              <div className="flex items-center gap-2">
                <img
                  src="https://i.pravatar.cc/100?u=cx"
                  className="w-6 h-6 rounded-full border border-slate-700"
                  alt="User"
                />
                <div>
                  <h5 className="text-white font-bold text-[9px]">{t('trialModal.testimonialName')}</h5>
                  <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest">{t('trialModal.testimonialRole')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-[-10%] right-[-10%] w-full h-[30%] bg-brand-blue/10 blur-[100px] rounded-full"></div>
        </div>

        {/* Right Side */}
        <div className="lg:w-[55%] p-6 lg:p-8 relative flex flex-col justify-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 text-slate-500 hover:text-white transition-all hover:rotate-90 duration-300 z-10"
          >
            <X size={18} />
          </button>

          {!isSuccess ? (
            <div className="max-w-sm mx-auto w-full">
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="space-y-2.5">
                  <div className="space-y-1 group">
                    <label className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-100 group-focus-within:text-brand-blue transition-colors">
                      {t('trialModal.workEmailLabel')}
                    </label>
                    <input
                      required
                      type="email"
                      placeholder={t('trialModal.workEmailPlaceholder')}
                      value={formData.workEmail}
                      onChange={(e) => handleEmailChange(e.target.value)}
                      className={`w-full bg-brand-black/40 border ${emailError ? 'border-red-500' : 'border-slate-800'} rounded-lg px-3 py-2 text-white placeholder:text-slate-700 focus:outline-none focus:border-brand-blue transition-all font-sans text-xs`}
                    />
                    {emailError && (
                      <p className="text-red-400 text-[9px] mt-1">{emailError}</p>
                    )}
                  </div>

                  <div className="space-y-1 group">
                    <label className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-100 group-focus-within:text-brand-blue transition-colors">
                      {t('trialModal.phoneLabel')}
                    </label>
                    <div className="flex gap-1.5">
                      <div className="relative flex-[0.35]">
                        <select
                          value={selectedCountry}
                          onChange={(e) => setSelectedCountry(e.target.value)}
                          className="w-full bg-brand-black/40 border border-slate-800 rounded-lg px-2 py-2 text-white focus:outline-none focus:border-brand-blue transition-all font-sans appearance-none cursor-pointer text-[10px]"
                        >
                          {COUNTRY_CODES.map((c) => (
                            <option key={c.code} value={c.code} className="bg-brand-surface">
                              {c.icon} {c.code}
                            </option>
                          ))}
                        </select>
                      </div>
                      <input
                        required
                        type="tel"
                        placeholder={t('trialModal.phonePlaceholder')}
                        value={phoneValue}
                        onChange={(e) => setPhoneValue(e.target.value)}
                        className="flex-[0.65] bg-brand-black/40 border border-slate-800 rounded-lg px-3 py-2 text-white placeholder:text-slate-700 focus:outline-none focus:border-brand-blue transition-all font-sans text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1 group">
                    <label className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-100 group-focus-within:text-brand-blue transition-colors">
                      {t('trialModal.crmLabel')}
                    </label>
                    <div className="relative">
                      <select
                        value={formData.crmProvider}
                        onChange={(e) => setFormData({ ...formData, crmProvider: e.target.value as CRMType })}
                        className="w-full bg-brand-black/40 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-brand-blue transition-all font-sans appearance-none cursor-pointer text-xs"
                      >
                        {Object.values(CRMType).map((crm) => (
                          <option key={crm} value={crm} className="bg-brand-surface">{crm}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-blue text-white font-bold shadow-glow-blue hover:bg-blue-600 disabled:opacity-50 rounded-lg px-4 py-2.5 text-xs flex items-center justify-center gap-2 transition-all active:scale-[0.98] group"
                  >
                    {isSubmitting ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                    {isSubmitting ? t('trialModal.submitting') : t('trialModal.submitButton')}
                  </button>
                  <p className="mt-2 text-[10px] text-center text-slate-600 font-mono uppercase tracking-widest">
                    {t('trialModal.disclaimer')}
                  </p>
                </div>
              </form>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-8">
              <div className="relative w-24 h-24 bg-brand-green/10 border-2 border-brand-green/30 rounded-full flex items-center justify-center text-brand-green">
                <CheckCircle2 size={48} />
              </div>
              <div>
                <h3 className="text-3xl font-sans font-extrabold text-white tracking-tight mb-2">{t('trialModal.successTitle')}</h3>
                <p className="text-slate-400 text-sm">{t('trialModal.successMessage')} <span className="text-brand-cyan">{formData.workEmail}</span>.</p>
              </div>
              <div className="font-mono text-[9px] text-slate-700 uppercase tracking-widest animate-pulse">
                {t('trialModal.redirecting')}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
