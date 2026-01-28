import React, { useState, useEffect } from 'react';
import { WhatsAppMockup } from './WhatsAppMockup';
import { EazybeExtensionPanel } from './EazybeExtensionPanel';
import { Cursor } from './Cursor';

const PersonalizationAnimation: React.FC = () => {
  const [chatIdx, setChatIdx] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: '89%', y: '93%', clicking: false, visible: false });

  const chats = [
    { name: "John Wick", avatar: "https://picsum.photos/id/1/100/100" },
    { name: "Alice Wonderland", avatar: "https://picsum.photos/id/10/100/100" },
    { name: "Bob Builder", avatar: "https://picsum.photos/id/20/100/100" }
  ];

  useEffect(() => {
    let mounted = true;

    const runCycle = async () => {
      if (!mounted) return;
      setIsSending(false);
      setPanelOpen(false);
      setCursorPos({ x: '89%', y: '93%', clicking: false, visible: false });
      await new Promise(r => setTimeout(r, 1000));

      if (!mounted) return;
      setCursorPos(prev => ({ ...prev, visible: true }));
      await new Promise(r => setTimeout(r, 800));
      if (!mounted) return;
      setCursorPos(prev => ({ ...prev, clicking: true }));
      setPanelOpen(true);
      await new Promise(r => setTimeout(r, 200));
      if (!mounted) return;
      setCursorPos(prev => ({ ...prev, clicking: false }));
      await new Promise(r => setTimeout(r, 800));

      if (!mounted) return;
      setCursorPos({ x: '85%', y: '40%', clicking: false, visible: true });
      await new Promise(r => setTimeout(r, 800));
      if (!mounted) return;
      setCursorPos(prev => ({ ...prev, clicking: true }));
      setIsSending(true);
      setPanelOpen(false);
      await new Promise(r => setTimeout(r, 200));
      if (!mounted) return;
      setCursorPos(prev => ({ ...prev, clicking: false }));
      await new Promise(r => setTimeout(r, 600));

      if (!mounted) return;
      setCursorPos({ x: '95%', y: '93%', clicking: false, visible: false });
      await new Promise(r => setTimeout(r, 2000));

      if (!mounted) return;
      setChatIdx(prev => (prev + 1) % chats.length);
      if (mounted) runCycle();
    };

    runCycle();

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
        <div className="flex flex-col h-full relative">
          <Cursor x={cursorPos.x} y={cursorPos.y} isClicking={cursorPos.clicking} visible={cursorPos.visible} />

          <div className="flex flex-col gap-4">
            {isSending && (
              <div className="self-end bg-[#d9fdd3] text-[#111b21] p-3 rounded-lg rounded-tr-none text-sm max-w-[80%] shadow-sm animate-fade-in border border-slate-200">
                Hi <span className="inline-block px-1.5 py-0.5 mx-0.5 rounded-md bg-white border border-brand-blue/30 text-brand-blue font-bold font-mono text-[11px] shadow-sm animate-pulse">
                  {chats[chatIdx].name}
                </span>, I've attached the brochure you requested!
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
