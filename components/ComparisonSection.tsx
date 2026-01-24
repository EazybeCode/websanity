import React from 'react';
import { Check, X, Cloud } from 'lucide-react';

export const ComparisonSection: React.FC = () => {
  const features = [
    { name: "WhatsApp Business App", other: false, eazybe: true },
    { name: "WhatsApp Business API", other: true, eazybe: true },
    { name: "Keep existing chat history", other: false, eazybe: true },
    { name: "Track personal WhatsApp numbers", other: false, eazybe: true },
    { name: "Live in 30 minutes", other: false, eazybe: true },
  ];

  return (
    <section className="py-24 bg-brand-muted border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
                <span className="font-mono text-xs font-bold text-brand-blue uppercase tracking-widest mb-4 block">
                   Why Teams Switch to Eazybe
                </span>
                <h2 className="text-4xl font-sans font-bold text-brand-ink mb-6">
                  Works with the WhatsApp you already use
                </h2>
                <p className="text-lg text-slate-600 font-light leading-relaxed mb-8">
                  Other tools force you to abandon WhatsApp Business App and migrate to API-only. Eazybe works with both—keep your existing setup, your chat history, and your workflow.
                </p>
            </div>

            <div className="lg:col-span-8">
                {/* Visual Header for the Three Types */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                   <div className="bg-white p-4 rounded-card border border-slate-200 shadow-sm flex flex-col items-center text-center">
                       <img 
                          src="https://cdn.simpleicons.org/whatsapp/25D366" 
                          alt="Personal WhatsApp" 
                          className="w-10 h-10 mb-3"
                          referrerPolicy="no-referrer"
                       />
                       <span className="text-xs font-bold text-slate-700">Personal WhatsApp</span>
                   </div>
                   <div className="bg-white p-4 rounded-card border border-slate-200 shadow-sm flex flex-col items-center text-center">
                       <div className="relative w-10 h-10 mb-3 flex items-center justify-center">
                            <img 
                                src="https://cdn.simpleicons.org/whatsapp/25D366" 
                                alt="WhatsApp Business" 
                                className="w-10 h-10"
                                referrerPolicy="no-referrer"
                            />
                            <div className="absolute -bottom-1 -right-1 bg-white rounded-full px-1 border border-slate-100 shadow-sm">
                                <span className="text-[8px] font-bold text-slate-600">B</span>
                            </div>
                       </div>
                       <span className="text-xs font-bold text-slate-700">Business App</span>
                   </div>
                   <div className="bg-white p-4 rounded-card border border-slate-200 shadow-sm flex flex-col items-center text-center">
                        <div className="relative w-10 h-10 mb-3 flex items-center justify-center">
                             <img 
                                src="https://cdn.simpleicons.org/whatsapp/25D366" 
                                alt="WhatsApp API" 
                                className="w-10 h-10 opacity-80"
                                referrerPolicy="no-referrer"
                            />
                            <div className="absolute -top-1 -right-1 bg-brand-blue rounded-full p-1 border-2 border-white shadow-sm">
                                <Cloud size={10} className="text-white" />
                            </div>
                        </div>
                       <span className="text-xs font-bold text-slate-700">Business API</span>
                   </div>
                </div>

                <div className="bg-white rounded-card shadow-engineering border border-slate-200 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="p-6 font-sans font-semibold text-slate-900 text-sm">Capability</th>
                                <th className="p-6 font-sans font-medium text-slate-500 text-sm text-center">Other Tools</th>
                                <th className="p-6 font-sans font-bold text-brand-blue text-sm text-center bg-blue-50/30">Eazybe</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {features.map((item, idx) => (
                                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                    <td className="p-4 pl-6 text-sm font-medium text-slate-700">{item.name}</td>
                                    <td className="p-4 text-center">
                                        <div className="flex justify-center">
                                            {item.other ? 
                                                <Check className="text-brand-green w-5 h-5" strokeWidth={2.5} /> : 
                                                <X className="text-slate-300 w-5 h-5" strokeWidth={2.5} />
                                            }
                                        </div>
                                    </td>
                                    <td className="p-4 text-center bg-blue-50/10 border-l border-blue-50">
                                        <div className="flex justify-center">
                                            {item.eazybe ? 
                                                <div className="w-6 h-6 rounded-full bg-brand-green flex items-center justify-center">
                                                    <Check className="text-white w-3.5 h-3.5" strokeWidth={3} />
                                                </div> : 
                                                <X className="text-red-300 w-5 h-5" strokeWidth={2.5} />
                                            }
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};