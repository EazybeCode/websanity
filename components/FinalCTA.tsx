import React from 'react';
import { Button } from './ui/Button';

export const FinalCTA: React.FC = () => {
  return (
    <section className="py-32 bg-white relative overflow-hidden border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-6xl font-sans font-bold tracking-tight text-brand-ink mb-6">
          Turn WhatsApp into your <br/>
          <span className="text-brand-blue">most visible sales channel</span>
        </h2>
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Join 2,000+ teams who finally see what's happening in chat.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <a href="https://chromewebstore.google.com/detail/eazybe-best-whatsapp-web/clgficggccelgifppbcaepjdkklfcefd" target="_blank" rel="noopener noreferrer">
            <Button variant="primary" size="lg" className="px-10">Start Free Trial</Button>
          </a>
          <a href="https://calendly.com/d/cw67-pt3-y2m" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="lg" className="px-10">Book a Demo</Button>
          </a>
        </div>
        <p className="text-xs font-mono text-slate-400 uppercase tracking-wide">
          Free 14-day trial. No credit card required.
        </p>
      </div>
    </section>
  );
};