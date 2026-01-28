import React, { useState, useEffect } from 'react';
import { WhatsAppMockup } from './WhatsAppMockup';
import { EazybeExtensionPanel } from './EazybeExtensionPanel';

const PersonalizationAnimation: React.FC = () => {
  const [chatIdx, setChatIdx] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);

  const chats = [
    { name: "John Wick", avatar: "https://picsum.photos/id/1/100/100" },
    { name: "Alice Wonderland", avatar: "https://picsum.photos/id/10/100/100" },
    { name: "Bob Builder", avatar: "https://picsum.photos/id/20/100/100" }
  ];

  useEffect(() => {
    let mounted = true;

    const cycle = async () => {
      if (!mounted) return;
      // 1. Wait
      await new Promise(r => setTimeout(r, 1000));
      if (!mounted) return;
      // 2. Open Panel
      setPanelOpen(true);
      await new Promise(r => setTimeout(r, 1500));
      if (!mounted) return;
      // 3. Select & Send
      setIsSending(true);
      setPanelOpen(false);
      await new Promise(r => setTimeout(r, 1500));
      if (!mounted) return;
      // 4. Reset & Switch Chat
      setIsSending(false);
      setChatIdx(prev => (prev + 1) % chats.length);
      if (mounted) cycle();
    };

    cycle();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="relative w-full aspect-[4/3]">
      <WhatsAppMockup
        activeChatName={chats[chatIdx].name}
        activeChatAvatar={chats[chatIdx].avatar}
        isEazybeActive={panelOpen}
      >
        <div className="flex flex-col h-full">
          <div className="flex flex-col gap-4">
            {isSending && (
              <div className="self-end bg-[#005c4b] text-white p-3 rounded-lg rounded-tr-none text-sm max-w-[80%] shadow-md animate-fade-in">
                Hi <span className="text-brand-cyan font-bold bg-white/10 px-1 rounded">{chats[chatIdx].name}</span>, I've attached the brochure you requested!
              </div>
            )}
          </div>
          {panelOpen && (
            <EazybeExtensionPanel
              titleOverride="Smart Logic"
              activeId="v1"
              replies={[
                { id: "v1", title: "Automated Outreach", content: "Hi {{name}}, I've attached the brochure you requested!" },
                { id: "v2", title: "Follow Up Logic", content: "Great speaking with you, {{name}}. Let's reconnect..." }
              ]}
            />
          )}
        </div>
      </WhatsAppMockup>
    </div>
  );
};

export default PersonalizationAnimation;
