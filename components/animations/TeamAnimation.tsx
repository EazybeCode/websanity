import React, { useState, useEffect } from 'react';
import { WhatsAppMockup } from './WhatsAppMockup';
import { EazybeExtensionPanel } from './EazybeExtensionPanel';

const TeamAnimation: React.FC = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);

  useEffect(() => {
    let mounted = true;

    const cycle = async () => {
      if (!mounted) return;
      await new Promise(r => setTimeout(r, 2000));
      if (!mounted) return;
      // 1. Admin Push
      setShowNotification(true);
      await new Promise(r => setTimeout(r, 2000));
      if (!mounted) return;
      // 2. Open Panel to review
      setShowNotification(false);
      setPanelOpen(true);
      await new Promise(r => setTimeout(r, 3000));
      if (!mounted) return;
      // 3. Close Panel
      setPanelOpen(false);
      if (mounted) cycle();
    };

    cycle();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="relative w-full aspect-[4/3]">
      {showNotification && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[100] bg-[#1a1a2e] border border-brand-green/30 text-white px-4 py-2 rounded-lg shadow-[0_10px_40px_rgba(0,0,0,0.8)] flex items-center gap-3 text-[10px] font-bold font-mono uppercase tracking-[0.15em]">
          <div className="w-2 h-2 rounded-full bg-brand-green animate-ping"></div>
          Admins pushed 3 verified protocols
        </div>
      )}

      <WhatsAppMockup
        activeChatName="Enterprise Prospect"
        activeChatStatus="Verified Organization"
        isEazybeActive={panelOpen}
      >
        <div className="flex flex-col h-full">
          {panelOpen && (
            <EazybeExtensionPanel
              titleOverride="Verified Protocols"
              replies={[
                { id: "p1", title: "Enterprise Intro 2.4", content: "Official Eazybe introduction for high-value accounts...", isApproved: true },
                { id: "p2", title: "Legal: Refund Logic", content: "Standard compliance text for processing refunds...", isApproved: true },
                { id: "p3", title: "SLA: Support Flow", content: "Response time estimates and priority escalation path...", isApproved: true }
              ]}
            />
          )}
        </div>
      </WhatsAppMockup>
    </div>
  );
};

export default TeamAnimation;
