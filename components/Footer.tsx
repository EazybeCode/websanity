import React from 'react';
import { Linkedin, Twitter, Youtube } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/20 dark:from-brand-surface dark:to-brand-black pt-20 pb-10 text-sm border-t border-slate-200 dark:border-brand-muted text-slate-600 dark:text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2 md:col-span-1">
            <div className="font-display font-bold text-xl tracking-tight text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-br from-brand-blue to-brand-violet rounded flex items-center justify-center text-white text-xs shadow-glow-purple">E</div>
                Eazybe
            </div>
            <p className="text-slate-500 dark:text-slate-400 mb-6 leading-relaxed text-xs">
              The WhatsApp Sales Platform for CRM teams.
            </p>
            <div className="flex space-x-4 mb-6">
                <a href="https://linkedin.com/company/eazybe" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-brand-violet transition-colors"><Linkedin size={18}/></a>
                <a href="https://twitter.com/eazybe" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-brand-violet transition-colors"><Twitter size={18}/></a>
                <a href="https://youtube.com/@eazybe" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-brand-violet transition-colors"><Youtube size={18}/></a>
            </div>
             <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                   <img src="https://cdn.simpleicons.org/meta/0064e0" alt="Meta" className="w-4 h-4" />
                   <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Meta Business Partner</span>
                </div>
                <div className="flex gap-2">
                    <span className="px-2 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded text-[10px] font-bold text-slate-500 dark:text-slate-400">GDPR Ready</span>
                    <span className="px-2 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded text-[10px] font-bold text-slate-500 dark:text-slate-400">Encrypted</span>
                </div>
             </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6">Platform</h4>
            <ul className="space-y-3">
              <li><a href="/features" className="hover:text-brand-violet dark:hover:text-brand-blue transition-colors">Conversation Capture</a></li>
              <li><a href="/features" className="hover:text-brand-violet dark:hover:text-brand-blue transition-colors">Workflow Automations</a></li>
              <li><a href="/features" className="hover:text-brand-violet dark:hover:text-brand-blue transition-colors">Revenue Inbox</a></li>
              <li><a href="/features" className="hover:text-brand-violet dark:hover:text-brand-blue transition-colors">Rep Radar</a></li>
              <li><a href="/features" className="hover:text-brand-violet dark:hover:text-brand-blue transition-colors">Cloud Backup</a></li>
              <li><a href="/features" className="hover:text-brand-violet dark:hover:text-brand-blue transition-colors">Mini CRM View</a></li>
              <li><a href="/team-inbox" className="hover:text-brand-violet dark:hover:text-brand-blue transition-colors">Team Inbox</a></li>
              <li><a href="/features" className="hover:text-brand-violet dark:hover:text-brand-blue transition-colors">WhatsApp Copilot</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6">Integrations</h4>
            <ul className="space-y-3">
              <li><a href="/hubspot-whatsapp-integration" className="hover:text-brand-violet dark:hover:text-brand-blue transition-colors">HubSpot</a></li>
              <li><a href="/salesforce-whatsapp-integration" className="hover:text-brand-violet dark:hover:text-brand-blue transition-colors">Salesforce</a></li>
              <li><a href="/zoho-whatsapp-integration" className="hover:text-brand-violet dark:hover:text-brand-blue transition-colors">Zoho CRM</a></li>
              <li><a href="/bitrix24-whatsapp-integration" className="hover:text-brand-violet dark:hover:text-brand-blue transition-colors">Bitrix24</a></li>
              <li><a href="/leadsquared-whatsapp-integration" className="hover:text-brand-violet dark:hover:text-brand-blue transition-colors">LeadSquared</a></li>
              <li><a href="/freshdesk-whatsapp-integration" className="hover:text-brand-violet dark:hover:text-brand-blue transition-colors">Freshdesk</a></li>
              <li><a href="/pipedrive-whatsapp-integration" className="hover:text-brand-violet dark:hover:text-brand-blue transition-colors">Pipedrive</a></li>
              <li><a href="/google-sheets-whatsapp-integration" className="hover:text-brand-violet dark:hover:text-brand-blue transition-colors">Google Sheets</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6">Resources</h4>
            <ul className="space-y-3">
              <li><a href="https://help.eazybe.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-violet dark:hover:text-brand-blue transition-colors">Help Center</a></li>
              <li><a href="https://help.eazybe.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-violet dark:hover:text-brand-blue transition-colors">Documentation</a></li>
              <li><a href="https://help.eazybe.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-violet dark:hover:text-brand-blue transition-colors">API Reference</a></li>
              <li><a href="/blog" className="hover:text-brand-violet dark:hover:text-brand-blue transition-colors">Blog</a></li>
              <li><a href="/blog" className="hover:text-brand-violet dark:hover:text-brand-blue transition-colors">Case Studies</a></li>
              <li><a href="/blog" className="hover:text-brand-violet dark:hover:text-brand-blue transition-colors">Webinars</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6">Company</h4>
            <ul className="space-y-3">
              <li><a href="/about" className="hover:text-brand-violet dark:hover:text-brand-blue transition-colors">About Us</a></li>
              <li><a href="/careers" className="hover:text-brand-violet dark:hover:text-brand-blue transition-colors">Careers</a></li>
              <li><a href="/contact" className="hover:text-brand-violet dark:hover:text-brand-blue transition-colors">Contact</a></li>
              <li><a href="/partners" className="hover:text-brand-violet dark:hover:text-brand-blue transition-colors">Partners</a></li>
              <li><a href="/security" className="hover:text-brand-violet dark:hover:text-brand-blue transition-colors">Security</a></li>
              <li><a href="https://status.eazybe.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-violet dark:hover:text-brand-blue transition-colors">Status</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-700 flex flex-col md:flex-row justify-between items-center text-slate-400 dark:text-slate-500 text-xs">
          <div className="mb-4 md:mb-0">
             © 2025 Eazybe, Inc. All rights reserved. 8, The Green STE B, Dover Delaware - 19901 | support@eazybe.com
          </div>
          <div className="flex space-x-6">
            <a href="/privacy" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="/cookies" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">Cookie Policy</a>
            <a href="/dpa" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">DPA</a>
          </div>
        </div>
      </div>
    </footer>
  );
};