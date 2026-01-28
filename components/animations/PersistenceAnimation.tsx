import React, { useState, useEffect } from 'react';
import { WhatsAppMockup } from './WhatsAppMockup';
import { Clock, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const PersistenceAnimation: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    let mounted = true;

    const runAnimation = async () => {
      if (!mounted) return;
      setStep(0);
      await new Promise(r => setTimeout(r, 1500));

      if (!mounted) return;
      setStep(1);
      await new Promise(r => setTimeout(r, 1500));

      if (!mounted) return;
      setStep(2);
      await new Promise(r => setTimeout(r, 2000));

      if (!mounted) return;
      setStep(3);
      await new Promise(r => setTimeout(r, 2500));

      if (mounted) runAnimation();
    };

    runAnimation();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="relative w-full aspect-[4/3]">
      <WhatsAppMockup
        activeChatName="Alice (New Prospect)"
        activeChatStatus="Added via CRM"
      >
        <div className="flex flex-col h-full relative">
          {/* Sequence Status Bar */}
          <div className="absolute top-0 left-0 right-0 z-10 bg-white/90 backdrop-blur-sm border-b border-slate-200 p-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap size={12} className="text-brand-orange" />
              <span className="text-[9px] font-bold text-slate-800 uppercase tracking-tighter">Persistence: Active Sequence</span>
            </div>
            <div className="text-[8px] text-slate-400 font-mono">Stage 2 of 4</div>
          </div>

          <div className="mt-10 flex flex-col gap-3">
            {/* System notification */}
            {step >= 0 && (
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="self-start bg-white p-2 rounded-lg rounded-tl-none shadow-sm text-[10px] text-slate-600 border border-slate-200 italic"
              >
                New Prospect "Alice" added via CRM.
              </motion.div>
            )}

            {/* First automated message */}
            {step >= 1 && (
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="self-end bg-[#d9fdd3] p-2.5 rounded-lg rounded-tr-none shadow-sm text-[11px] text-slate-800 max-w-[80%] border border-green-100"
              >
                Hi Alice! Welcome to Eazybe. How can I help you today?
                <div className="text-[8px] text-slate-400 mt-1 text-right">09:00 AM</div>
              </motion.div>
            )}

            {/* Waiting indicator */}
            {step >= 2 && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="self-center bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200 text-[9px] text-slate-500 flex items-center gap-2"
              >
                <Clock size={10} /> Waiting for reply (48h)
              </motion.div>
            )}

            {/* Follow-up message */}
            {step >= 3 && (
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="self-end bg-[#d9fdd3] p-2.5 rounded-lg rounded-tr-none shadow-sm text-[11px] text-slate-800 max-w-[80%] border border-green-100 relative"
              >
                <div className="absolute -left-16 top-0 bg-brand-orange text-white text-[7px] px-1.5 py-0.5 rounded font-bold uppercase">Auto</div>
                Just checking back to see if you received my last message!
                <div className="text-[8px] text-slate-400 mt-1 text-right">Day 3, 09:00 AM</div>
              </motion.div>
            )}
          </div>
        </div>
      </WhatsAppMockup>
    </div>
  );
};

export default PersistenceAnimation;
