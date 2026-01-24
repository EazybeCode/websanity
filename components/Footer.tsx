import React from 'react';
import { Linkedin, Twitter, Youtube } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 pt-20 pb-10 text-sm border-t border-slate-200 text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2 md:col-span-1">
            <div className="font-display font-bold text-xl tracking-tight text-slate-900 mb-6 flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs">E</div>
                Eazybe
            </div>
            <p className="text-slate-500 mb-6 leading-relaxed text-xs">
              The WhatsApp Sales Platform for CRM teams.
            </p>
            <div className="flex space-x-4 mb-6">
                <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors"><Linkedin size={18}/></a>
                <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors"><Twitter size={18}/></a>
                <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors"><Youtube size={18}/></a>
            </div>
             <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                   <img src="https://cdn.simpleicons.org/meta/0064e0" alt="Meta" className="w-4 h-4" />
                   <span className="text-xs font-bold text-slate-700">Meta Business Partner</span>
                </div>
                <div className="flex gap-2">
                    <span className="px-2 py-1 bg-white border border-slate-200 rounded text-[10px] font-bold text-slate-500">GDPR Ready</span>
                    <span className="px-2 py-1 bg-white border border-slate-200 rounded text-[10px] font-bold text-slate-500">Encrypted</span>
                </div>
             </div>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 mb-6">Platform</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Conversation Capture</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Workflow Automations</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Revenue Inbox</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Rep Radar</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Cloud Backup</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Mini CRM View</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Team Inbox</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">WhatsApp Copilot</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6">Integrations</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-blue-600 transition-colors">HubSpot</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Salesforce</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Zoho CRM</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Bitrix24</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">LeadSquared</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Freshsales</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Pipedrive</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Google Sheets</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6">Resources</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Case Studies</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Webinars</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6">Company</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-blue-600 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Partners</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Status</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center text-slate-400 text-xs">
          <div className="mb-4 md:mb-0">
             © 2025 Eazybe, Inc. All rights reserved. 8, The Green STE B, Dover Delaware - 19901 | support@eazybe.com
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Cookie Policy</a>
            <a href="#" className="hover:text-slate-600 transition-colors">DPA</a>
          </div>
        </div>
      </div>
    </footer>
  );
};