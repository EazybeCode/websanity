import React from 'react';
import { Webhook } from 'lucide-react';

const integrations = [
    { name: "HubSpot", logo: "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.hubspot.com&size=256" },
    { name: "Salesforce", logo: "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.salesforce.com&size=256" },
    { name: "Zoho", logo: "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.zoho.com&size=256" },
    { name: "Bitrix24", logo: "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.bitrix24.com&size=256" },
    { name: "LeadSquared", logo: "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.leadsquared.com&size=256" },
    { name: "Freshworks", logo: "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.freshworks.com&size=256" },
    { name: "Google Sheets", logo: "https://cdn.simpleicons.org/googlesheets/34A853" },
];

export const IntegrationsSection: React.FC = () => {
    return (
        <section className="py-24 bg-white border-y border-slate-200" id="integrations">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                 <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold mb-12">
                    Connects to Your CRM Stack
                </p>
                
                <div className="flex flex-wrap justify-center gap-6">
                    {integrations.map((item, i) => (
                        <div key={i} className="flex flex-col items-center justify-center w-40 h-32 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group p-4">
                            <img 
                                src={item.logo} 
                                alt={`${item.name} logo`} 
                                className="w-12 h-12 object-contain mb-3 transition-transform duration-300 group-hover:scale-110"
                                referrerPolicy="no-referrer"
                            />
                            <span className="text-xs font-bold text-slate-700">{item.name}</span>
                        </div>
                    ))}
                    
                    {/* Webhooks Card */}
                    <div className="flex flex-col items-center justify-center w-40 h-32 rounded-xl border border-slate-200 bg-slate-50 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group p-4">
                        <div className="text-slate-400 group-hover:text-brand-blue transition-colors mb-3">
                            <Webhook size={40} strokeWidth={1.5} />
                        </div>
                        <span className="text-xs font-bold text-slate-600">Webhooks</span>
                    </div>
                </div>
                
                 <p className="text-xs text-slate-400 mt-12 font-medium max-w-lg mx-auto">
                    Don't see your CRM? Use our generic Webhooks or Google Sheets integration to connect any system.
                 </p>
            </div>
        </section>
    );
};