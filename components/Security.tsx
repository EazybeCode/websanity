import React from 'react';
import { Badge } from './ui/Badge';
import { Lock, FileCheck, CheckCircle2 } from 'lucide-react';

export const Security: React.FC = () => {
  return (
    <section className="py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Badge variant="clean">Enterprise-Ready Security</Badge>
        
        <div className="mt-12 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            
            {/* Meta Partner */}
            <div className="flex flex-col items-center justify-center p-8 bg-slate-50 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all group">
                <div className="w-12 h-12 mb-4 flex items-center justify-center bg-white rounded-full shadow-sm border border-slate-100">
                    <img src="https://cdn.simpleicons.org/meta/0064e0" alt="Meta" className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-1">Meta Business Partner</h3>
                <p className="text-xs text-slate-500 font-medium">Verified Integration</p>
            </div>

            {/* GDPR - Enhanced */}
            <div className="relative flex flex-col items-center justify-center p-8 bg-white rounded-2xl border-2 border-blue-100 shadow-lg shadow-blue-50/50 hover:-translate-y-1 transition-all group">
                <div className="absolute top-0 right-0 p-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <div className="w-12 h-12 mb-4 flex items-center justify-center bg-blue-50 rounded-full text-blue-600">
                    <FileCheck size={28} strokeWidth={2} />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-1">GDPR Ready</h3>
                <p className="text-xs text-slate-500 font-medium">Fully Compliant Data Processing</p>
                <div className="mt-4 px-3 py-1 bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-wider rounded-full border border-green-100 flex items-center gap-1">
                    <CheckCircle2 size={10} /> Compliant
                </div>
            </div>

            {/* Encryption - Enhanced */}
             <div className="flex flex-col items-center justify-center p-8 bg-slate-50 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all group">
                <div className="w-12 h-12 mb-4 flex items-center justify-center bg-white rounded-full shadow-sm border border-slate-100 text-slate-600 group-hover:text-blue-600 transition-colors">
                    <Lock size={24} strokeWidth={2} />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-1">Bank-Grade Security</h3>
                <p className="text-xs text-slate-500 font-medium">SSL & 256-bit Encryption</p>
            </div>
        </div>
        
        <p className="mt-12 text-slate-500 max-w-2xl mx-auto font-medium text-sm">
            Trusted by regulated industries: financial services, healthcare, insurance
        </p>
      </div>
    </section>
  );
};