import React, { useState, useEffect } from 'react';
import { WhatsAppMockup } from './WhatsAppMockup';
import { EazybeExtensionPanel } from './EazybeExtensionPanel';
import { Cursor } from './Cursor';

const RepetitiveAnimation: React.FC = () => {
  const [typedText, setTypedText] = useState("");
  const [cursorPos, setCursorPos] = useState({ x: '50%', y: '50%', clicking: false, visible: false });
  const [panelOpen, setPanelOpen] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const fullMessage = "Our enterprise pricing starts at $49/user/month. Would you like a demo?";

  useEffect(() => {
    let mounted = true;

    const runAnimation = async () => {
      if (!mounted) return;
      // Step 0: Initial state - Reset everything
      setTypedText("");
      setPanelOpen(false);
      setIsSent(false);
      setCursorPos({ x: '50%', y: '80%', clicking: false, visible: false });
      await new Promise(r => setTimeout(r, 1500));

      if (!mounted) return;
      // Step 1: Cursor appears and moves to the Eazybe Quick Reply button
      setCursorPos(prev => ({ ...prev, visible: true }));
      await new Promise(r => setTimeout(r, 500));
      if (!mounted) return;
      setCursorPos({ x: '88%', y: '93%', clicking: false, visible: true }); // Target: Eazybe Button
      await new Promise(r => setTimeout(r, 1000));

      if (!mounted) return;
      // Step 2: Click the button to open the popup
      setCursorPos(prev => ({ ...prev, clicking: true }));
      setPanelOpen(true);
      await new Promise(r => setTimeout(r, 200));
      if (!mounted) return;
      setCursorPos(prev => ({ ...prev, clicking: false }));
      await new Promise(r => setTimeout(r, 800));

      if (!mounted) return;
      // Step 3: Move cursor to select a specific quick reply in the panel
      setCursorPos({ x: '82%', y: '35%', clicking: false, visible: true }); // Target: First item in Sidebar
      await new Promise(r => setTimeout(r, 1000));

      if (!mounted) return;
      // Step 4: Click the quick reply item
      setCursorPos(prev => ({ ...prev, clicking: true }));
      await new Promise(r => setTimeout(r, 200));
      if (!mounted) return;
      setCursorPos(prev => ({ ...prev, clicking: false }));

      // Step 5: Send the message (Show as chat bubble) and close panel
      setTypedText(fullMessage);
      setIsSent(true);
      setPanelOpen(false);

      // Wait at the end before looping
      await new Promise(r => setTimeout(r, 4000));
      if (mounted) runAnimation();
    };

    runAnimation();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="relative w-full aspect-[4/3]">
      <WhatsAppMockup isEazybeActive={panelOpen}>
        <div className="flex flex-col h-full relative">
          {/* Cursor Overlay */}
          <Cursor x={cursorPos.x} y={cursorPos.y} isClicking={cursorPos.clicking} visible={cursorPos.visible} />

          <div className="flex flex-col gap-4">
            {isSent && (
              <div className="self-end bg-[#d9fdd3] text-[#111b21] p-3 rounded-lg rounded-tr-none text-sm max-w-[80%] shadow-sm animate-fade-in border border-slate-200">
                {typedText}
              </div>
            )}
          </div>

          {panelOpen && (
            <EazybeExtensionPanel
              titleOverride="Quick Replies"
              activeId={isSent ? "01" : undefined}
              replies={[
                { id: "01", title: "Enterprise Pricing v1", content: "Our enterprise pricing starts at $49/user/month. Would you like a demo?" },
                { id: "02", title: "Standard FAQ", content: "You can find all documentation at docs.eazybe.io..." },
                { id: "03", title: "Meeting Link", content: "Let's hop on a 15-min discovery call. Here is my link..." }
              ]}
            />
          )}
        </div>
      </WhatsAppMockup>
    </div>
  );
};

export default RepetitiveAnimation;
