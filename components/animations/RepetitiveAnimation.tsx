import React, { useState, useEffect } from 'react';
import { WhatsAppMockup } from './WhatsAppMockup';
import { EazybeExtensionPanel } from './EazybeExtensionPanel';
import { Save } from 'lucide-react';

const RepetitiveAnimation: React.FC = () => {
  const [step, setStep] = useState(0);
  const [typedText, setTypedText] = useState("");
  const fullMessage = "Our enterprise pricing starts at $49/user/month. Would you like a demo?";

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (step === 0) {
      if (typedText.length < fullMessage.length) {
        timer = setTimeout(() => {
          setTypedText(fullMessage.slice(0, typedText.length + 1));
        }, 30);
      } else {
        timer = setTimeout(() => setStep(1), 1000);
      }
    } else if (step === 1) {
      // Prompt phase
      timer = setTimeout(() => setStep(2), 2000);
    } else if (step === 2) {
      // Panel Open phase
      timer = setTimeout(() => {
        setTypedText("");
        setStep(3);
      }, 1500);
    } else if (step === 3) {
      // Selection phase
      timer = setTimeout(() => {
        setTypedText(fullMessage);
        setStep(4);
      }, 1000);
    } else if (step === 4) {
      // Cooldown phase
      timer = setTimeout(() => {
        setStep(0);
        setTypedText("");
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [step, typedText]);

  const showPanel = step === 2 || step === 3;

  return (
    <div className="relative w-full aspect-[4/3]">
      <WhatsAppMockup isEazybeActive={showPanel}>
        <div className="flex flex-col h-full relative">
          <div className="flex flex-col gap-4">
            {(typedText || step === 3) && (
              <div className={`self-end bg-[#005c4b] text-white p-3 rounded-lg rounded-tr-none text-sm max-w-[80%] shadow-md transition-all duration-300 ${step === 2 ? 'opacity-0' : 'opacity-100'}`}>
                {step >= 3 ? fullMessage : typedText}
                {step === 0 && <span className="border-r-2 border-white ml-1 animate-pulse" />}
              </div>
            )}

            {step === 1 && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] bg-[#1a1a2e] border border-white/10 rounded-xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[60]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-brand-cyan/20 rounded-lg flex items-center justify-center text-brand-cyan border border-brand-cyan/30">
                    <Save size={20} />
                  </div>
                  <div>
                    <span className="block font-bold text-white text-[10px] font-mono uppercase tracking-widest">Logic Detected</span>
                    <span className="text-[10px] text-slate-500">Save as Quick Reply?</span>
                  </div>
                </div>
                <button className="w-full bg-brand-cyan text-brand-black py-2 rounded font-mono text-[10px] font-bold uppercase tracking-widest">
                  Capture Template
                </button>
              </div>
            )}
          </div>

          {showPanel && (
            <EazybeExtensionPanel
              activeId={step === 3 ? "01" : undefined}
              replies={[
                { id: "01", title: "Enterprise Pricing v1", content: "Our enterprise pricing starts at $49/user/month..." },
                { id: "02", title: "Standard FAQ", content: "You can find all documentation at docs.eazybe.io..." }
              ]}
            />
          )}
        </div>
      </WhatsAppMockup>
    </div>
  );
};

export default RepetitiveAnimation;
