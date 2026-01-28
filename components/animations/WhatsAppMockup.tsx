import React from 'react';
import { Phone, Video, MoreVertical, Search, Paperclip, Mic, Send, Smile, Globe } from 'lucide-react';

interface WhatsAppMockupProps {
  children?: React.ReactNode;
  activeChatName?: string;
  activeChatAvatar?: string;
  activeChatStatus?: string;
  isEazybeActive?: boolean;
}

export const WhatsAppMockup: React.FC<WhatsAppMockupProps> = ({
  children,
  activeChatName = "John Doe",
  activeChatAvatar = "https://picsum.photos/id/1/100/100",
  activeChatStatus = "Online",
  isEazybeActive = false
}) => {
  return (
    <div className="relative w-full aspect-[4/3] bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xl">
      {/* Browser Chrome */}
      <div className="bg-slate-100 border-b border-slate-200 px-3 py-2 flex items-center gap-3">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
        </div>
        <div className="flex-1 bg-white rounded-md py-1 px-3 border border-slate-200 flex items-center gap-2">
          <Globe size={10} className="text-slate-400" />
          <span className="text-[9px] font-sans text-slate-500">web.whatsapp.com</span>
        </div>
      </div>

      {/* WhatsApp Header */}
      <div className="h-12 bg-[#f0f2f5] flex items-center px-3 gap-3 border-b border-slate-200">
        <div className="w-9 h-9 rounded-full overflow-hidden border border-slate-300">
          <img src={activeChatAvatar} alt={activeChatName} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <div className="text-slate-800 font-semibold text-sm">{activeChatName}</div>
          <div className="text-[10px] text-green-600 font-medium">{activeChatStatus}</div>
        </div>
        <div className="flex items-center gap-4 text-slate-500">
          <MoreVertical className="w-4 h-4" />
        </div>
      </div>

      {/* Chat Area */}
      <div className="relative h-[calc(100%-96px)] bg-[#efeae2] overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
          backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")'
        }}></div>

        <div className="relative h-full p-4">
          {children}
        </div>

        {/* Eazybe Active Indicator */}
        {isEazybeActive && (
          <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-brand-blue/10 border border-brand-blue/20 px-2 py-1 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse"></div>
            <span className="text-[8px] font-mono text-brand-blue uppercase font-bold">Eazybe</span>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="h-12 bg-[#f0f2f5] flex items-center px-3 gap-2 border-t border-slate-200">
        <Smile className="w-5 h-5 text-slate-500" />
        <Paperclip className="w-5 h-5 text-slate-500" />
        <div className="flex-1 bg-white rounded-lg px-3 py-1.5 border border-slate-200">
          <span className="text-slate-400 text-sm">Type a message</span>
        </div>
        <Mic className="w-5 h-5 text-slate-500" />
      </div>
    </div>
  );
};

export default WhatsAppMockup;
