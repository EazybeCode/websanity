import React from 'react';
import { EyeOff, Clock, UserX, LogOut } from 'lucide-react';

const cards = [
  {
    icon: EyeOff,
    title: "Zero Visibility",
    text: "Deals move in WhatsApp. Your CRM shows stale data. You can't see response times, unreplied chats, or which deals are going cold."
  },
  {
    icon: Clock,
    title: "Hot Deals Slip Away",
    text: "A lead asks for pricing. No one replies for 6 hours. By the time you notice, they've signed with your competitor. You had no way to know."
  },
  {
    icon: UserX,
    title: "Ghosted Clients Stay Hidden",
    text: "Stalled deals. Escalation requests. Clients who stopped responding. It's all buried in chat threads you can't see or filter."
  },
  {
    icon: LogOut,
    title: "Employee Exit = Data Walkout",
    text: "When a rep leaves, years of customer conversations leave too. No backup. No handover. The next rep starts from zero. "
  }
];

export const ProblemSection: React.FC = () => {
  return (
    <section className="py-24 bg-brand-ink text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-16">
          <span className="font-mono text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 block">
            The Problem
          </span>
          <h2 className="text-4xl md:text-5xl font-sans font-semibold text-white mb-6">
            Your CRM is blind to WhatsApp
          </h2>
          <p className="text-xl text-slate-400 font-light leading-relaxed">
            90% of customer conversations happen in chat. Your CRM sees none of it.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 p-8 rounded-card hover:bg-white/10 transition-colors duration-300 group">
              <div className="w-10 h-10 bg-white/10 rounded-md flex items-center justify-center text-white mb-6 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                  <card.icon size={20} strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-sans font-semibold text-white mb-4">{card.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                  {card.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};