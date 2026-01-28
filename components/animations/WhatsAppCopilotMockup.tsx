import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  MoreVertical,
  Smile,
  Paperclip,
  CheckCheck,
  Zap,
  Bot,
  Send,
  Loader2,
  FileText,
  AlertCircle
} from 'lucide-react';

interface WhatsAppCopilotMockupProps {
  mode: 'problem' | 'solution' | 'summary';
}

const WhatsAppCopilotMockup: React.FC<WhatsAppCopilotMockupProps> = ({ mode }) => {
  const [typing, setTyping] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [suggestion, setSuggestion] = useState('');
  const [showSummary, setShowSummary] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initial messages common to all
  const baseMessages = [
    { id: 1, text: "Hi, we are looking at the Pro plan. Can you explain how the CRM sync works for HubSpot specifically?", sender: 'customer', time: '10:15 AM' },
    { id: 2, text: "Also, is there a setup fee for 20 users?", sender: 'customer', time: '10:16 AM' },
  ];

  useEffect(() => {
    setMessages(baseMessages);
    setTyping('');
    setSuggestion('');
    setShowSummary(false);
    setIsScanning(false);
    setIsAiLoading(false);

    if (mode === 'problem') {
      runProblemAnimation();
    } else if (mode === 'solution') {
      runSolutionAnimation();
    } else if (mode === 'summary') {
      runSummaryAnimation();
    }
  }, [mode]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing, suggestion]);

  const runProblemAnimation = async () => {
    const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

    await sleep(800);
    const phrase1 = "Hi, let me check our HubSpot docs...";
    let cur = "";
    for (const char of phrase1) { cur += char; setTyping(cur); await sleep(40); }
    await sleep(1000);
    for (let i = cur.length; i >= 0; i--) { setTyping(cur.substring(0, i)); await sleep(20); }
    await sleep(500);

    const phrase2 = "HubSpot sync is... ummm... automatic I think? Checking with my manager about the setup fee.";
    cur = "";
    for (const char of phrase2) { cur += char; setTyping(cur); await sleep(60); }
    await sleep(1200);

    setTyping("");
    setMessages(prev => [...prev, { id: Date.now(), text: phrase2, sender: 'rep', time: '10:22 AM' }]);

    await sleep(2500);
    setMessages(baseMessages);
    runProblemAnimation();
  };

  const runSolutionAnimation = async () => {
    const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

    await sleep(1000);
    setIsAiLoading(true);
    await sleep(1500);
    setIsAiLoading(false);

    const suggestedText = "Hi! Our HubSpot sync is bi-directional: it tracks all WhatsApp messages as activities in HubSpot contacts instantly. For 20 users, we waive the setup fee entirely. Would you like a quick demo?";
    setSuggestion(suggestedText);

    await sleep(1800);
    setTyping(suggestedText);
    setSuggestion("");
    await sleep(800);
    setTyping("");
    setMessages(prev => [...prev, { id: Date.now(), text: suggestedText, sender: 'rep', time: '10:17 AM' }]);

    await sleep(4000);
    setMessages(baseMessages);
    runSolutionAnimation();
  };

  const runSummaryAnimation = async () => {
    const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
    const fullHistory = [
      ...baseMessages,
      { id: 3, text: "Okay, sounds good. Can we ensure my team gets training?", sender: 'customer', time: '10:18 AM' },
      { id: 4, text: "Yes, we include two 60-min sessions.", sender: 'rep', time: '10:20 AM' },
      { id: 5, text: "Perfect. Send me the contract for review.", sender: 'customer', time: '10:22 AM' },
    ];
    setMessages(fullHistory);

    await sleep(1000);
    setIsScanning(true);
    await sleep(1500);
    setIsScanning(false);
    setShowSummary(true);

    await sleep(5000);
    setShowSummary(false);
    await sleep(1000);
    runSummaryAnimation();
  };

  return (
    <div className="relative w-full aspect-[4/3] flex items-center justify-center p-4">
      <div className="w-full max-w-[420px] h-full bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xl flex flex-col font-sans ring-1 ring-slate-900/5">
        {/* WhatsApp Header (Light Mode) */}
        <div className="bg-[#f0f2f5] px-3 py-2 flex items-center justify-between border-b border-slate-300/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center border border-slate-300 overflow-hidden">
              <img src={`https://api.dicebear.com/7.x/initials/svg?seed=EP&backgroundColor=2563EB`} alt="Avatar" className="w-full h-full rounded-full" />
            </div>
            <div>
              <div className="text-[#111b21] font-bold text-[11px] tracking-tight">Enterprise Client #042</div>
              <div className="text-brand-green text-[8px] font-mono uppercase tracking-widest flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-brand-green animate-pulse"></span>
                online
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 text-[#54656f]">
            <Search size={14} />
            <MoreVertical size={14} />
          </div>
        </div>

        {/* Chat Area */}
        <div
          ref={scrollRef}
          className="flex-1 bg-[#efeae2] p-3 overflow-y-auto space-y-2 relative scroll-smooth"
        >
          {isScanning && (
            <div className="absolute inset-0 z-10 bg-brand-blue/5 flex flex-col items-center justify-center backdrop-blur-[1px]">
               <div className="flex flex-col items-center gap-2 bg-white/80 p-4 rounded-xl shadow-xl border border-brand-blue/20">
                 <Bot size={24} className="text-brand-blue animate-bounce" />
                 <div className="font-mono text-[8px] font-bold text-brand-blue uppercase tracking-[0.2em] animate-pulse">
                   Synthesizing Context...
                 </div>
               </div>
               <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-brand-blue to-transparent animate-scan"></div>
            </div>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'customer' ? 'justify-start' : 'justify-end'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
            >
              <div className={`max-w-[85%] px-3 py-2 rounded-xl text-[10px] shadow-sm relative leading-relaxed ${
                msg.sender === 'customer'
                ? 'bg-white text-[#111b21] rounded-tl-none border border-slate-200'
                : 'bg-[#d9fdd3] text-[#111b21] rounded-tr-none'
              }`}>
                {msg.text}
                <div className={`text-[8px] mt-1 flex justify-end items-center gap-1 text-[#667781]`}>
                  {msg.time}
                  {msg.sender === 'rep' && <CheckCheck size={10} className="text-[#53bdeb]" />}
                </div>
              </div>
            </div>
          ))}

          {/* Problem Indicator */}
          {mode === 'problem' && typing && (
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-1.5 mb-0.5">
                <AlertCircle size={8} className="text-brand-orange animate-pulse" />
                <span className="text-[8px] font-mono font-bold text-brand-orange uppercase">Manual Lookup...</span>
              </div>
              <div className="max-w-[85%] px-3 py-2 rounded-xl text-[10px] bg-slate-100 text-slate-500 italic rounded-tr-none border border-brand-orange/20 animate-pulse">
                {typing}
              </div>
            </div>
          )}

          {/* AI Overlay Layer (Light) */}
          {mode === 'solution' && (isAiLoading || suggestion) && (
            <div className="sticky bottom-0 z-20 animate-in slide-in-from-bottom-4 duration-500">
              <div className="bg-white border border-brand-cyan rounded-xl p-3 shadow-[0_10px_30px_rgba(0,0,0,0.1)]">
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="w-5 h-5 bg-brand-cyan/10 rounded-full flex items-center justify-center">
                    <Bot size={12} className="text-brand-cyan" />
                  </div>
                  <span className="text-[8px] font-mono font-bold text-brand-cyan uppercase tracking-wider">Copilot Recommendation</span>
                  {isAiLoading && <Loader2 size={10} className="animate-spin text-brand-cyan ml-auto" />}
                </div>

                {isAiLoading ? (
                  <div className="space-y-1.5">
                    <div className="h-1.5 w-full bg-slate-100 rounded-full animate-pulse"></div>
                    <div className="h-1.5 w-3/4 bg-slate-100 rounded-full animate-pulse"></div>
                    <div className="h-1.5 w-1/2 bg-slate-100 rounded-full animate-pulse"></div>
                  </div>
                ) : (
                  <>
                    <p className="text-[10px] text-[#111b21] leading-relaxed font-medium">
                      {suggestion}
                    </p>
                    <div className="mt-2 flex gap-1.5">
                      <button className="flex-1 bg-brand-cyan text-white font-bold text-[9px] py-1.5 rounded-lg hover:bg-cyan-500 transition-colors uppercase tracking-tight flex items-center justify-center gap-1">
                        <Zap size={10} /> Send Now
                      </button>
                      <button className="px-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                        <FileText size={10} className="text-slate-400" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Summary Overlay (Light) */}
          {mode === 'summary' && showSummary && (
            <div className="absolute inset-x-4 top-1/4 z-30 animate-in fade-in zoom-in-95 duration-500">
              <div className="bg-white border border-brand-green/30 rounded-xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-lg bg-brand-green/10 flex items-center justify-center">
                    <Zap size={14} className="text-brand-green" />
                  </div>
                  <div>
                    <h4 className="text-[#111b21] font-bold text-[11px] tracking-tight">AI Thread Summary</h4>
                    <div className="text-[8px] font-mono text-brand-green uppercase tracking-widest">Context Synchronized</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="text-[8px] font-mono font-bold text-[#667781] uppercase flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-brand-blue"></span> DISCUSSED
                    </div>
                    <p className="text-[9px] text-[#111b21] leading-relaxed pl-2.5 border-l-2 border-brand-blue/30">
                      Pro plan HubSpot integration details for 20 users.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="text-[8px] font-mono font-bold text-[#667781] uppercase flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-brand-orange"></span> PROMISED
                    </div>
                    <p className="text-[9px] text-[#111b21] leading-relaxed pl-2.5 border-l-2 border-brand-orange/30">
                      Onboarding sessions; Setup fee waived.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="text-[8px] font-mono font-bold text-[#667781] uppercase flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-brand-green"></span> PENDING
                    </div>
                    <p className="text-[9px] text-[#111b21] leading-relaxed pl-2.5 border-l-2 border-brand-green/30 font-bold">
                      Contract delivery.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* WhatsApp Input (Light) */}
        <div className="bg-[#f0f2f5] p-2 flex items-center gap-2 border-t border-slate-300/50">
          <div className="flex gap-2 text-[#54656f]">
            <Smile size={16} />
            <Paperclip size={16} className="rotate-45" />
          </div>
          <div className="flex-1 bg-white rounded-lg px-3 py-1.5 text-[10px] text-[#111b21] border border-transparent focus-within:border-slate-300 transition-all font-medium">
            {typing ? (
              <span>{typing}</span>
            ) : (
              <span className="text-[#667781]">Type a message</span>
            )}
          </div>
          <div className="w-7 h-7 rounded-full bg-brand-blue flex items-center justify-center text-white cursor-pointer hover:bg-blue-600 transition-colors shadow-lg">
            <Send size={12} fill="currentColor" />
          </div>
        </div>

        <style>{`
          @keyframes scan {
            from { top: 0; }
            to { top: 100%; }
          }
          .animate-scan {
            animation: scan 2s linear infinite;
          }
        `}</style>
      </div>
    </div>
  );
};

export default WhatsAppCopilotMockup;

// Wrapper components for each mode
export const CopilotProblemAnimation: React.FC = () => <WhatsAppCopilotMockup mode="problem" />;
export const CopilotSolutionAnimation: React.FC = () => <WhatsAppCopilotMockup mode="solution" />;
export const CopilotSummaryAnimation: React.FC = () => <WhatsAppCopilotMockup mode="summary" />;
