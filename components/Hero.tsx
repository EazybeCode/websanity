import React from 'react';
import { Button } from './ui/Button';
import { ArrowRight } from 'lucide-react';
import { useTrialModal } from '../contexts/TrialModalContext';

export const Hero: React.FC = () => {
  const { openModal } = useTrialModal();

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/20 dark:from-brand-black dark:to-brand-surface border-b border-slate-200 dark:border-brand-muted">
      {/* Gradient orbs for visual interest */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300/30 dark:bg-purple-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-300/30 dark:bg-indigo-500/10 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Authority Copy */}
          <div className="max-w-2xl">
             <div className="mb-8">
                <span className="inline-block font-mono text-xs font-bold uppercase tracking-[0.2em] bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-indigo-700 dark:text-indigo-300 px-3 py-2 rounded-btn border border-indigo-200 dark:border-indigo-700/50 whitespace-normal leading-relaxed max-w-full">
                  For HubSpot, Salesforce, Zoho, In-house CRMs and many more
                </span>
             </div>

             <h1 className="text-5xl lg:text-7xl font-sans font-semibold tracking-tight text-slate-900 dark:text-white mb-8 leading-[1.05]">
               The WhatsApp Sales Platform for <span className="text-gradient">CRM Teams</span>
             </h1>

             <p className="text-xl font-sans text-slate-600 dark:text-slate-400 font-light leading-relaxed mb-10 max-w-lg">
               Sync every WhatsApp conversation to your CRM. Automate follow-ups. See which deals need attention. Works with WhatsApp Business App and API—no migration required.
             </p>

             <div className="flex flex-col sm:flex-row gap-4 items-start mb-12">
               <Button variant="primary" size="lg" icon={<ArrowRight size={18} />} onClick={() => openModal('trial')}>
                 Install for Free
               </Button>
               <Button variant="outline" size="lg" onClick={() => openModal('demo')}>
                   Book a Demo
                 </Button>
             </div>

             <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                <span className="font-bold text-slate-700 dark:text-slate-300">Trusted by 2000+ Sales Teams Using</span>
                <div className="flex items-center gap-3 mt-3 flex-wrap">
                  {[
                    { name: 'HubSpot', logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.hubspot.com&size=256' },
                    { name: 'Salesforce', logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.salesforce.com&size=256' },
                    { name: 'Zoho', logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.zoho.com&size=256' },
                    { name: 'Bitrix24', logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.bitrix24.com&size=256' },
                    { name: 'LeadSquared', logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.leadsquared.com&size=256' },
                    { name: 'Freshworks', logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.freshworks.com&size=256' },
                    { name: 'Google Sheets', logo: 'https://cdn.simpleicons.org/googlesheets/34A853' },
                  ].map((crm) => (
                    <div
                      key={crm.name}
                      className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-1.5 hover:border-indigo-300 dark:hover:border-slate-500 transition-colors shadow-sm"
                      title={crm.name}
                    >
                      <img src={crm.logo} alt={crm.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
             </div>
          </div>

          {/* Right: Engineered Visual (The Bridge) */}
          <div className="relative h-[550px] bg-white/80 dark:bg-brand-muted/30 rounded-xl border border-slate-200 dark:border-brand-muted p-8 hidden lg:flex items-center justify-center shadow-saas-light dark:shadow-card backdrop-blur-sm">

             {/* The Connection Visual */}
             <div className="relative w-full max-w-md">

                {/* 1. WhatsApp Card (Bottom Left) */}
                <div className="absolute top-20 left-0 w-64 bg-white dark:bg-slate-800 rounded-card shadow-saas-light dark:shadow-overlay border border-slate-200 dark:border-slate-700 z-20">
                    <div className="h-10 bg-gradient-to-r from-[#075E54] to-[#128C7E] rounded-t-card flex items-center px-4 justify-between">
                        <span className="text-white font-bold text-xs">WhatsApp</span>
                        <div className="w-2 h-2 rounded-full bg-[#25D366]"></div>
                    </div>
                    <div className="p-4 space-y-3">
                        <div className="bg-slate-100 dark:bg-slate-700 p-2 rounded-btn rounded-tl-none text-xs text-slate-600 dark:text-slate-300 w-3/4">
                            Hi! Can you send the pricing for the Enterprise plan?
                        </div>
                        <div className="bg-gradient-to-r from-[#DCF8C6] to-[#c5e1a5] dark:from-green-900/30 dark:to-green-800/30 p-2 rounded-btn rounded-tr-none text-xs text-slate-800 dark:text-slate-200 ml-auto w-3/4 shadow-sm">
                            Absolutely. Sending it over now.
                        </div>
                    </div>
                </div>

                {/* 2. Sync Line with Gradient */}
                <div className="absolute top-32 left-60 w-24 h-[1px] bg-gradient-to-r from-[#075E54] via-purple-500 to-brand-blue z-10">
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-slate-900 border-2 border-brand-violet rounded-full flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-brand-violet rounded-full animate-pulse"></div>
                    </div>
                </div>

                {/* 3. CRM Card (Top Right) */}
                <div className="absolute top-0 right-0 w-64 bg-white dark:bg-slate-800 rounded-card shadow-saas-light dark:shadow-overlay border border-slate-200 dark:border-slate-700 z-10">
                    <div className="h-10 bg-gradient-to-r from-brand-blue to-brand-indigo rounded-t-card flex items-center px-4 justify-between">
                        <span className="text-white font-bold text-xs">CRM</span>
                        <div className="w-2 h-2 rounded-full bg-white/50"></div>
                    </div>
                    <div className="p-4">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-500 dark:to-purple-500"></div>
                            <div>
                                <div className="h-2 w-24 bg-slate-800 dark:bg-slate-200 rounded mb-1"></div>
                                <div className="h-2 w-16 bg-gradient-to-r from-brand-orange/20 to-orange-300/20 dark:from-brand-orange/30 dark:to-orange-500/30 rounded"></div>
                            </div>
                        </div>
                        <div className="space-y-2">
                             <div className="flex justify-between text-xs">
                                 <span className="text-slate-500 dark:text-slate-400">Deal Stage</span>
                                 <span className="font-bold text-gradient">Negotiation</span>
                             </div>
                             <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full">
                                 <div className="w-3/4 h-1.5 bg-gradient-to-r from-brand-blue to-brand-violet rounded-full"></div>
                             </div>
                             <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 flex gap-2">
                                 <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">SYNCED: JUST NOW</span>
                             </div>
                        </div>
                    </div>
                </div>

                {/* 4. Action Card (Bottom Right floating) */}
                 <div className="absolute top-64 right-4 w-56 bg-white dark:bg-slate-800 rounded-card shadow-saas-light dark:shadow-overlay border border-brand-orange/50 z-30">
                    <div className="p-3 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                         <span className="text-xs font-bold text-brand-orange uppercase tracking-wider flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse"></span> Action Required
                         </span>
                    </div>
                    <div className="p-3">
                         <p className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">Lead requested pricing. No reply for 2h.</p>
                         <button className="w-full py-1.5 bg-gradient-to-r from-brand-orange to-red-500 text-white text-xs font-bold rounded-btn hover:from-orange-600 hover:to-red-600 transition-all shadow-glow-orange">
                             Create Task
                         </button>
                    </div>
                </div>

             </div>
          </div>
        </div>
      </div>
    </section>
  );
};