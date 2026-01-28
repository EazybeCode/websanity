import React, { useState, useEffect } from 'react';
import { WhatsAppMockup } from './WhatsAppMockup';
import { Cursor } from './Cursor';
import { Clock, CheckCircle2, X } from 'lucide-react';
import { motion } from 'framer-motion';

const ScheduleAnimation: React.FC = () => {
  const [option, setOption] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: '50%', y: '50%', clicking: false, visible: false });
  const options = ["Tomorrow, 9:00 AM", "In 3 Days", "Custom Date"];

  useEffect(() => {
    let mounted = true;

    const runAnimation = async () => {
      if (!mounted) return;
      setCursorPos({ x: '50%', y: '80%', clicking: false, visible: false });
      await new Promise(r => setTimeout(r, 1000));

      if (!mounted) return;
      setCursorPos(prev => ({ ...prev, visible: true }));
      await new Promise(r => setTimeout(r, 500));

      // Cycle through options with cursor
      for (let i = 0; i < options.length; i++) {
        if (!mounted) return;
        const yPositions = ['32%', '42%', '52%'];
        setCursorPos({ x: '75%', y: yPositions[i], clicking: false, visible: true });
        await new Promise(r => setTimeout(r, 800));

        if (!mounted) return;
        setCursorPos(prev => ({ ...prev, clicking: true }));
        setOption(i);
        await new Promise(r => setTimeout(r, 200));

        if (!mounted) return;
        setCursorPos(prev => ({ ...prev, clicking: false }));
        await new Promise(r => setTimeout(r, 1500));
      }

      if (mounted) runAnimation();
    };

    runAnimation();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="relative w-full aspect-[4/3]">
      <WhatsAppMockup>
        <div className="flex flex-col h-full justify-end gap-4 relative">
          <Cursor x={cursorPos.x} y={cursorPos.y} isClicking={cursorPos.clicking} visible={cursorPos.visible} />

          {/* Schedule Picker Modal */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden max-w-[220px] ml-auto">
            <div className="bg-brand-blue px-4 py-2 flex items-center justify-between">
              <span className="text-[9px] font-bold text-white uppercase tracking-wider">Send later</span>
              <X size={10} className="text-white/70" />
            </div>
            <div className="p-2 space-y-1">
              {options.map((opt, i) => (
                <motion.div
                  key={opt}
                  animate={{
                    backgroundColor: option === i ? '#f0f9ff' : '#ffffff',
                    borderColor: option === i ? '#bae6fd' : '#f1f5f9'
                  }}
                  className="px-2.5 py-1.5 border rounded-lg flex items-center justify-between cursor-pointer"
                >
                  <span className={`text-[10px] ${option === i ? 'text-brand-blue font-bold' : 'text-slate-500'}`}>{opt}</span>
                  {option === i && <CheckCircle2 size={10} className="text-brand-blue" />}
                </motion.div>
              ))}
            </div>
            <div className="p-2 border-t border-slate-100">
              <button className="w-full bg-slate-900 text-white font-bold py-1.5 rounded-lg text-[9px] uppercase tracking-widest">
                Confirm Schedule
              </button>
            </div>
          </div>

          {/* Scheduled Message Preview */}
          <div className="self-end bg-[#d9fdd3] p-3 rounded-lg rounded-tr-none shadow-sm text-sm text-slate-800 max-w-[85%] border border-green-100">
            <div className="flex items-center gap-2 mb-1">
              <Clock size={10} className="text-slate-500" />
              <span className="text-[9px] font-mono text-slate-500 uppercase">Queued for delivery</span>
            </div>
            <span className="text-[11px]">"Checking in to see if you had a chance to review the contract. Talk soon!"</span>
          </div>
        </div>
      </WhatsAppMockup>
    </div>
  );
};

export default ScheduleAnimation;
