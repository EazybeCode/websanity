import React, { useState, useEffect } from 'react';
import { WhatsAppMockup } from './WhatsAppMockup';
import { Cursor } from './Cursor';
import { Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FollowUpAnimation: React.FC = () => {
  const [phase, setPhase] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: '50%', y: '50%', clicking: false, visible: false });

  useEffect(() => {
    let mounted = true;

    const loop = async () => {
      if (!mounted) return;
      setPhase(0);
      setCursorPos({ x: '50%', y: '80%', clicking: false, visible: false });
      await new Promise(r => setTimeout(r, 1500));

      if (!mounted) return;
      setCursorPos(prev => ({ ...prev, visible: true }));
      await new Promise(r => setTimeout(r, 500));

      if (!mounted) return;
      setPhase(1);
      setCursorPos({ x: '65%', y: '55%', clicking: false, visible: true });
      await new Promise(r => setTimeout(r, 800));

      if (!mounted) return;
      setCursorPos(prev => ({ ...prev, clicking: true }));
      await new Promise(r => setTimeout(r, 200));

      if (!mounted) return;
      setCursorPos(prev => ({ ...prev, clicking: false }));
      setPhase(2);
      await new Promise(r => setTimeout(r, 4000));

      if (mounted) loop();
    };

    loop();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="relative w-full aspect-[4/3]">
      <WhatsAppMockup
        activeChatName="James Wilson"
        activeChatStatus="Lead"
      >
        <div className="flex flex-col h-full relative">
          <Cursor x={cursorPos.x} y={cursorPos.y} isClicking={cursorPos.clicking} visible={cursorPos.visible} />

          {/* Client's Incoming Message */}
          <div className="self-start bg-white p-3 rounded-lg rounded-tl-none shadow-sm text-sm text-slate-800 max-w-[80%] border border-slate-200/50">
            Let me check with the team and get back to you by end of day.
            <div className="text-[9px] text-slate-400 mt-1 text-right">09:12 AM</div>
          </div>

          <AnimatePresence mode="wait">
            {phase < 2 ? (
              <motion.div
                key="modal"
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                className="absolute inset-0 z-20 flex items-center justify-center p-4 bg-slate-900/5 backdrop-blur-[1px]"
              >
                <div className="bg-white border border-slate-200 rounded-xl shadow-2xl p-5 w-full max-w-[240px] relative overflow-hidden">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-brand-blue/10 rounded-lg">
                      <Clock size={14} className="text-brand-blue" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-800 uppercase tracking-tight">Schedule Follow-up</span>
                  </div>
                  <div className="space-y-3">
                    <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px] text-slate-500 font-medium">
                      "Just checking in to see if there's any update?"
                    </div>
                    <motion.button
                      animate={phase === 1 ? { scale: [1, 0.95, 1] } : {}}
                      className="w-full bg-brand-blue text-white font-bold py-2 rounded-lg text-[10px] flex items-center justify-center gap-2"
                    >
                      Schedule Now
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="sent-message"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="self-end mt-4 flex flex-col items-end gap-1 max-w-[85%]"
              >
                <div className="bg-[#d9fdd3] p-3 rounded-lg rounded-tr-none shadow-sm text-sm text-slate-800 border border-green-100 w-full">
                  <div className="flex items-center gap-1.5 mb-2 px-1 py-0.5 rounded bg-white/40 border border-white/50 w-fit">
                    <Clock size={10} className="text-brand-blue" />
                    <span className="text-[8px] font-bold text-brand-blue uppercase tracking-tighter">Scheduled for 3 hours later</span>
                  </div>
                  Just checking in to see if there's any update?
                  <div className="text-[9px] text-slate-400 mt-1 text-right flex items-center justify-end gap-1">
                    12:12 PM <Clock size={10} />
                  </div>
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-brand-cyan/10 border border-brand-cyan/20 px-2 py-1 rounded-full text-[8px] font-mono text-brand-cyan uppercase font-bold"
                >
                  ACTIVE SEQUENCE
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </WhatsAppMockup>
    </div>
  );
};

export default FollowUpAnimation;
