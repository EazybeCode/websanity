import React from 'react';
import { Phone, Video, MoreVertical, Search, Paperclip, Mic, Send, Smile } from 'lucide-react';

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
    <div className="relative w-full aspect-[4/3] bg-[#111b21] rounded-2xl border border-slate-700 overflow-hidden shadow-2xl">
      {/* WhatsApp Header */}
      <div className="h-14 bg-[#202c33] flex items-center px-4 gap-3 border-b border-slate-700/50">
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-slate-600">
          <img src={activeChatAvatar} alt={activeChatName} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <div className="text-white font-medium text-sm">{activeChatName}</div>
          <div className="text-[10px] text-slate-400">{activeChatStatus}</div>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <Video className="w-5 h-5" />
          <Phone className="w-5 h-5" />
          <MoreVertical className="w-5 h-5" />
        </div>
      </div>

      {/* Chat Area */}
      <div className="relative h-[calc(100%-112px)] bg-[#0b141a] overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>

        <div className="relative h-full p-4">
          {children}
        </div>

        {/* Eazybe Active Indicator */}
        {isEazybeActive && (
          <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-brand-blue/20 border border-brand-blue/30 px-2 py-1 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse"></div>
            <span className="text-[8px] font-mono text-brand-blue uppercase font-bold">Eazybe</span>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="h-14 bg-[#202c33] flex items-center px-3 gap-2 border-t border-slate-700/50">
        <Smile className="w-6 h-6 text-slate-400" />
        <Paperclip className="w-6 h-6 text-slate-400" />
        <div className="flex-1 bg-[#2a3942] rounded-full px-4 py-2">
          <span className="text-slate-500 text-sm">Type a message</span>
        </div>
        <Mic className="w-6 h-6 text-slate-400" />
      </div>
    </div>
  );
};

export default WhatsAppMockup;
