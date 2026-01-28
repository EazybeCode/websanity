import React from 'react';
import { Zap, Check, Shield } from 'lucide-react';

interface Reply {
  id: string;
  title: string;
  content: string;
  isApproved?: boolean;
}

interface EazybeExtensionPanelProps {
  titleOverride?: string;
  activeId?: string;
  replies: Reply[];
}

export const EazybeExtensionPanel: React.FC<EazybeExtensionPanelProps> = ({
  titleOverride = "Quick Replies",
  activeId,
  replies
}) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-[#1a1a2e] border-t border-brand-blue/30 rounded-t-xl overflow-hidden animate-slide-up z-50">
      {/* Panel Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-brand-blue/10 border-b border-brand-blue/20">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-brand-blue" />
          <span className="text-[10px] font-mono font-bold text-brand-blue uppercase tracking-widest">{titleOverride}</span>
        </div>
        <div className="text-[8px] font-mono text-slate-500 uppercase">Eazybe</div>
      </div>

      {/* Replies List */}
      <div className="p-2 space-y-1.5 max-h-40 overflow-y-auto">
        {replies.map((reply) => (
          <div
            key={reply.id}
            className={`p-2.5 rounded-lg border cursor-pointer transition-all duration-200 ${
              activeId === reply.id
                ? 'bg-brand-blue/20 border-brand-blue/50 scale-[1.02]'
                : 'bg-slate-800/50 border-slate-700/50 hover:border-slate-600'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className={`text-[9px] font-mono font-bold uppercase tracking-wider ${
                activeId === reply.id ? 'text-brand-blue' : 'text-slate-400'
              }`}>
                {reply.title}
              </span>
              {reply.isApproved && (
                <div className="flex items-center gap-1 text-brand-green">
                  <Shield className="w-3 h-3" />
                  <span className="text-[7px] font-mono uppercase">Verified</span>
                </div>
              )}
              {activeId === reply.id && !reply.isApproved && (
                <Check className="w-3 h-3 text-brand-blue" />
              )}
            </div>
            <p className={`text-[9px] truncate ${
              activeId === reply.id ? 'text-slate-300' : 'text-slate-500'
            }`}>
              {reply.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EazybeExtensionPanel;
