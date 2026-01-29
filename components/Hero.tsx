import React from 'react';
import { Button } from './ui/Button';
import { ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden bg-brand-paper border-b border-brand-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Authority Copy */}
          <div className="max-w-2xl">
             <div className="mb-8">
                <span className="inline-block font-mono text-xs font-bold text-brand-blue uppercase tracking-[0.2em] bg-blue-50 px-3 py-2 rounded-btn border border-blue-100 whitespace-normal leading-relaxed max-w-full">
                  For HubSpot, Salesforce, Zoho, In-house CRMs and many more
                </span>
             </div>
             
             <h1 className="text-5xl lg:text-7xl font-sans font-semibold tracking-tight text-brand-ink mb-8 leading-[1.05]">
               The WhatsApp Sales Platform for <span className="text-brand-blue">CRM Teams</span>
             </h1>
             
             <p className="text-xl font-sans text-slate-600 font-light leading-relaxed mb-10 max-w-lg">
               Sync every WhatsApp conversation to your CRM. Automate follow-ups. See which deals need attention. Works with WhatsApp Business App and API—no migration required.
             </p>

             <div className="flex flex-col sm:flex-row gap-4 items-start mb-12">
               <a href="https://chromewebstore.google.com/detail/eazybe-best-whatsapp-web/clgficggccelgifppbcaepjdkklfcefd" target="_blank" rel="noopener noreferrer">
                 <Button variant="primary" size="lg" icon={<ArrowRight size={18} />}>
                   Start Free Trial
                 </Button>
               </a>
               <a href="https://calendly.com/d/cw67-pt3-y2m" target="_blank" rel="noopener noreferrer">
                 <Button variant="outline" size="lg">
                   Book a Demo
                 </Button>
               </a>
             </div>

             <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                <div className="flex -space-x-2">
                    {[1,2,3,4].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200"></div>
                    ))}
                </div>
                <span className="ml-2">Trusted by 2,000+ sales teams at Apollo Hospitals, Avendus, University Living and more</span>
             </div>
          </div>

          {/* Right: Engineered Visual (The Bridge) */}
          <div className="relative h-[550px] bg-brand-muted/30 rounded-xl border border-brand-muted p-8 hidden lg:flex items-center justify-center grid-bg">
             
             {/* The Connection Visual */}
             <div className="relative w-full max-w-md">
                
                {/* 1. WhatsApp Card (Bottom Left) */}
                <div className="absolute top-20 left-0 w-64 bg-white rounded-card shadow-overlay border border-slate-200 z-20">
                    <div className="h-10 bg-[#075E54] rounded-t-card flex items-center px-4 justify-between">
                        <span className="text-white font-bold text-xs">WhatsApp</span>
                        <div className="w-2 h-2 rounded-full bg-[#25D366]"></div>
                    </div>
                    <div className="p-4 space-y-3">
                        <div className="bg-slate-100 p-2 rounded-btn rounded-tl-none text-xs text-slate-600 w-3/4">
                            Hi! Can you send the pricing for the Enterprise plan?
                        </div>
                        <div className="bg-[#DCF8C6] p-2 rounded-btn rounded-tr-none text-xs text-slate-800 ml-auto w-3/4 shadow-sm">
                            Absolutely. Sending it over now.
                        </div>
                    </div>
                </div>

                {/* 2. Sync Line */}
                <div className="absolute top-32 left-60 w-24 h-[1px] bg-brand-blue z-10">
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-2 border-brand-blue rounded-full flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-pulse"></div>
                    </div>
                </div>

                {/* 3. CRM Card (Top Right) */}
                <div className="absolute top-0 right-0 w-64 bg-white rounded-card shadow-overlay border border-slate-200 z-10">
                    <div className="h-10 bg-brand-blue rounded-t-card flex items-center px-4 justify-between">
                        <span className="text-white font-bold text-xs">CRM</span>
                        <div className="w-2 h-2 rounded-full bg-white/50"></div>
                    </div>
                    <div className="p-4">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-full bg-slate-100"></div>
                            <div>
                                <div className="h-2 w-24 bg-slate-800 rounded mb-1"></div>
                                <div className="h-2 w-16 bg-brand-orange/20 rounded"></div>
                            </div>
                        </div>
                        <div className="space-y-2">
                             <div className="flex justify-between text-xs">
                                 <span className="text-slate-500">Deal Stage</span>
                                 <span className="font-bold text-brand-blue">Negotiation</span>
                             </div>
                             <div className="w-full h-1.5 bg-slate-100 rounded-full">
                                 <div className="w-3/4 h-1.5 bg-brand-blue rounded-full"></div>
                             </div>
                             <div className="mt-4 pt-3 border-t border-slate-100 flex gap-2">
                                 <span className="text-[10px] font-mono text-slate-400">SYNCED: JUST NOW</span>
                             </div>
                        </div>
                    </div>
                </div>

                {/* 4. Action Card (Bottom Right floating) */}
                 <div className="absolute top-64 right-4 w-56 bg-white rounded-card shadow-overlay border border-brand-orange z-30">
                    <div className="p-3 border-b border-slate-100 flex items-center justify-between">
                         <span className="text-xs font-bold text-brand-orange uppercase tracking-wider flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange"></span> Action Required
                         </span>
                    </div>
                    <div className="p-3">
                         <p className="text-xs font-medium text-slate-700 mb-2">Lead requested pricing. No reply for 2h.</p>
                         <button className="w-full py-1.5 bg-brand-orange text-white text-xs font-bold rounded-btn hover:bg-orange-600 transition-colors">
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