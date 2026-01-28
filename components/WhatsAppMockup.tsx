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

interface WhatsAppMockupProps {
  mode: 'problem' | 'solution' | 'summary';
}

const WhatsAppMockup: React.FC<WhatsAppMockupProps> = ({ mode }) => {
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
    let mounted = true;
    setMessages(baseMessages);
    setTyping('');
    setSuggestion('');
    setShowSummary(false);
    setIsScanning(false);
    setIsAiLoading(false);

    const runAnimation = async () => {
      if (mode === 'problem') {
        await runProblemAnimation(mounted);
      } else if (mode === 'solution') {
        await runSolutionAnimation(mounted);
      } else if (mode === 'summary') {
        await runSummaryAnimation(mounted);
      }
    };

    runAnimation();

    return () => {
      mounted = false;
    };
  }, [mode]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing, suggestion]);

  const runProblemAnimation = async (mounted: boolean) => {
    const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

    while (mounted) {
      setMessages(baseMessages);
      setTyping('');

      await sleep(800);
      if (!mounted) break;

      const phrase1 = "Hi, let me check our HubSpot docs...";
      let cur = "";
      for (const char of phrase1) {
        if (!mounted) break;
        cur += char;
        setTyping(cur);
        await sleep(40);
      }
      await sleep(1000);
      for (let i = cur.length; i >= 0; i--) {
        if (!mounted) break;
        setTyping(cur.substring(0, i));
        await sleep(20);
      }
      await sleep(500);

      const phrase2 = "HubSpot sync is... ummm... automatic I think? Checking with my manager about the setup fee.";
      cur = "";
      for (const char of phrase2) {
        if (!mounted) break;
        cur += char;
        setTyping(cur);
        await sleep(60);
      }
      await sleep(1200);

      if (!mounted) break;
      setTyping("");
      setMessages(prev => [...prev, { id: Date.now(), text: phrase2, sender: 'rep', time: '10:22 AM' }]);

      await sleep(2500);
    }
  };

  const runSolutionAnimation = async (mounted: boolean) => {
    const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

    while (mounted) {
      setMessages(baseMessages);
      setTyping('');
      setSuggestion('');
      setIsAiLoading(false);

      await sleep(1000);
      if (!mounted) break;

      setIsAiLoading(true);
      await sleep(1500);
      if (!mounted) break;

      setIsAiLoading(false);

      const suggestedText = "Hi! Our HubSpot sync is bi-directional: it tracks all WhatsApp messages as activities in HubSpot contacts instantly. For 20 users, we waive the setup fee entirely. Would you like a quick demo?";
      setSuggestion(suggestedText);

      await sleep(1800);
      if (!mounted) break;

      setTyping(suggestedText);
      setSuggestion("");
      await sleep(800);
      if (!mounted) break;

      setTyping("");
      setMessages(prev => [...prev, { id: Date.now(), text: suggestedText, sender: 'rep', time: '10:17 AM' }]);

      await sleep(4000);
    }
  };

  const runSummaryAnimation = async (mounted: boolean) => {
    const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
    const fullHistory = [
      ...baseMessages,
      { id: 3, text: "Okay, sounds good. Can we ensure my team gets training?", sender: 'customer', time: '10:18 AM' },
      { id: 4, text: "Yes, we include two 60-min sessions.", sender: 'rep', time: '10:20 AM' },
      { id: 5, text: "Perfect. Send me the contract for review.", sender: 'customer', time: '10:22 AM' },
    ];

    while (mounted) {
      setMessages(fullHistory);
      setShowSummary(false);
      setIsScanning(false);

      await sleep(1000);
      if (!mounted) break;

      setIsScanning(true);
      await sleep(1500);
      if (!mounted) break;

      setIsScanning(false);
      setShowSummary(true);

      await sleep(5000);
      if (!mounted) break;

      setShowSummary(false);
      await sleep(1000);
    }
  };

  return (
    <div className="w-full max-w-[600px] h-[540px] bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xl flex flex-col font-sans ring-1 ring-slate-900/5">
      {/* WhatsApp Header (Light Mode) */}
      <div className="bg-[#f0f2f5] px-4 py-3 flex items-center justify-between border-b border-slate-300/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center border border-slate-300">
            <img src={`https://api.dicebear.com/7.x/initials/svg?seed=EP&backgroundColor=2563EB`} alt="Avatar" className="w-full h-full rounded-full" />
          </div>
          <div>
            <div className="text-[#111b21] font-bold text-sm tracking-tight">Enterprise Client #042</div>
            <div className="text-brand-green text-[10px] font-mono uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse"></span>
              online
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 text-[#54656f]">
          <Search size={18} />
          <MoreVertical size={18} />
        </div>
      </div>

      {/* Chat Area */}
      <div
        ref={scrollRef}
        className="flex-1 bg-[#efeae2] p-4 overflow-y-auto space-y-4 relative scroll-smooth"
      >
        {isScanning && (
          <div className="absolute inset-0 z-10 bg-brand-blue/5 flex flex-col items-center justify-center backdrop-blur-[1px]">
             <div className="flex flex-col items-center gap-3 bg-white/80 p-6 rounded-2xl shadow-xl border border-brand-blue/20">
               <Bot size={32} className="text-brand-blue animate-bounce" />
               <div className="font-mono text-[10px] font-bold text-brand-blue uppercase tracking-[0.2em] animate-pulse">
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
            <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-[13px] shadow-sm relative leading-relaxed ${
              msg.sender === 'customer'
              ? 'bg-white text-[#111b21] rounded-tl-none border border-slate-200'
              : 'bg-[#d9fdd3] text-[#111b21] rounded-tr-none'
            }`}>
              {msg.text}
              <div className={`text-[10px] mt-1.5 flex justify-end items-center gap-1.5 text-[#667781]`}>
                {msg.time}
                {msg.sender === 'rep' && <CheckCheck size={14} className="text-[#53bdeb]" />}
              </div>
            </div>
          </div>
        ))}

        {/* Problem Indicator */}
        {mode === 'problem' && typing && (
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-2 mb-1">
              <AlertCircle size={10} className="text-brand-orange animate-pulse" />
              <span className="text-[10px] font-mono font-bold text-brand-orange uppercase">Manual Lookup...</span>
            </div>
            <div className="max-w-[85%] px-4 py-2.5 rounded-2xl text-[13px] bg-slate-100 text-slate-500 italic rounded-tr-none border border-brand-orange/20 animate-pulse">
              {typing}
            </div>
          </div>
        )}

        {/* AI Overlay Layer (Light) */}
        {mode === 'solution' && (isAiLoading || suggestion) && (
          <div className="sticky bottom-0 z-20 animate-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white border border-brand-cyan rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 bg-brand-cyan/10 rounded-full flex items-center justify-center">
                  <Bot size={16} className="text-brand-cyan" />
                </div>
                <span className="text-xs font-mono font-bold text-brand-cyan uppercase tracking-wider">Copilot Recommendation</span>
                {isAiLoading && <Loader2 size={14} className="animate-spin text-brand-cyan ml-auto" />}
              </div>

              {isAiLoading ? (
                <div className="space-y-2">
                  <div className="h-2 w-full bg-slate-100 rounded-full animate-pulse"></div>
                  <div className="h-2 w-3/4 bg-slate-100 rounded-full animate-pulse"></div>
                  <div className="h-2 w-1/2 bg-slate-100 rounded-full animate-pulse"></div>
                </div>
              ) : (
                <>
                  <p className="text-[13px] text-[#111b21] leading-relaxed font-medium">
                    {suggestion}
                  </p>
                  <div className="mt-4 flex gap-2">
                    <button className="flex-1 bg-brand-cyan text-white font-bold text-[11px] py-2.5 rounded-lg hover:bg-cyan-500 transition-colors uppercase tracking-tight flex items-center justify-center gap-2">
                      <Zap size={14} /> Send Now
                    </button>
                    <button className="px-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                      <FileText size={14} className="text-slate-400" />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Summary Overlay (Light) */}
        {mode === 'summary' && showSummary && (
          <div className="absolute inset-x-6 top-1/4 z-30 animate-in fade-in zoom-in-95 duration-500">
            <div className="bg-white border border-brand-green/30 rounded-2xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-brand-green/10 flex items-center justify-center">
                  <Zap size={20} className="text-brand-green" />
                </div>
                <div>
                  <h4 className="text-[#111b21] font-bold text-sm tracking-tight">AI Thread Summary</h4>
                  <div className="text-[10px] font-mono text-brand-green uppercase tracking-widest">Context Synchronized</div>
                </div>
              </div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <div className="text-[10px] font-mono font-bold text-[#667781] uppercase flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-blue"></span> DISCUSSED
                  </div>
                  <p className="text-[12px] text-[#111b21] leading-relaxed pl-3.5 border-l-2 border-brand-blue/30">
                    Pro plan HubSpot integration details for 20 users.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="text-[10px] font-mono font-bold text-[#667781] uppercase flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange"></span> PROMISED
                  </div>
                  <p className="text-[12px] text-[#111b21] leading-relaxed pl-3.5 border-l-2 border-brand-orange/30">
                    Onboarding sessions; Setup fee waived.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="text-[10px] font-mono font-bold text-[#667781] uppercase flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green"></span> PENDING
                  </div>
                  <p className="text-[12px] text-[#111b21] leading-relaxed pl-3.5 border-l-2 border-brand-green/30 font-bold">
                    Contract delivery.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* WhatsApp Input (Light) */}
      <div className="bg-[#f0f2f5] p-3 flex items-center gap-4 border-t border-slate-300/50">
        <div className="flex gap-4 text-[#54656f]">
          <Smile size={24} />
          <Paperclip size={24} className="rotate-45" />
        </div>
        <div className="flex-1 bg-white rounded-xl px-4 py-2.5 text-sm text-[#111b21] border border-transparent focus-within:border-slate-300 transition-all font-medium">
          {typing ? (
            <span>{typing}</span>
          ) : (
            <span className="text-[#667781]">Type a message</span>
          )}
        </div>
        <div className="w-11 h-11 rounded-full bg-brand-blue flex items-center justify-center text-white cursor-pointer hover:bg-blue-600 transition-colors shadow-lg">
          <Send size={20} fill="currentColor" />
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
  );
};

export default WhatsAppMockup;
