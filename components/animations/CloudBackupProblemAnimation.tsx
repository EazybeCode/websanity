import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Building2, SearchX, FileWarning } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';

const CloudBackupProblemAnimation: React.FC = () => {
  return (
    <div className="relative w-full aspect-[4/3] flex items-center justify-center bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-lg">
      {/* Company Boundary Box */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 w-[55%] h-[65%] border-2 border-dashed border-blue-500/20 rounded-2xl bg-white flex flex-col p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-4 opacity-40">
          <Building2 className="w-3 h-3 text-blue-600" />
          <span className="text-[8px] font-black uppercase tracking-widest text-blue-600">Company Archive</span>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center space-y-3">
          <motion.div
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-full space-y-1.5"
          >
            <div className="h-1.5 w-full bg-slate-100 rounded-full"></div>
            <div className="h-1.5 w-[80%] bg-slate-100 rounded-full"></div>
            <div className="h-1.5 w-[90%] bg-slate-100 rounded-full"></div>
          </motion.div>
          <SearchX className="w-8 h-8 text-slate-200" />
          <div className="text-center">
            <p className="text-[8px] font-black text-slate-300 uppercase tracking-tighter">History Disconnected</p>
            <p className="text-[6px] text-slate-400">Rep phone is no longer synced</p>
          </div>
        </div>
      </div>

      {/* The Phone moving out */}
      <div className="relative w-full h-full flex items-center">
        <motion.div
          animate={{
            x: [30, 220, 220, 30],
            rotate: [0, 2, 2, 0]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            times: [0, 0.4, 0.9, 1],
            ease: "easeInOut"
          }}
          className="relative z-20"
        >
          {/* Phone Mockup */}
          <div className="w-36 h-[220px] bg-slate-900 rounded-[1.5rem] border-[4px] border-slate-800 shadow-2xl relative overflow-hidden">
            <div className="p-3 space-y-2">
              <div className="flex items-center gap-1.5 mb-3">
                <WhatsAppIcon size={10} />
                <div className="h-1 w-10 bg-slate-700 rounded-full"></div>
              </div>

              {[1, 2, 3].map(i => (
                <div key={i} className={`p-1.5 rounded-md max-w-[85%] ${i % 2 === 0 ? 'bg-emerald-500/20 ml-auto' : 'bg-slate-800'}`}>
                  <div className="h-0.5 w-full bg-white/10 rounded-full mb-0.5"></div>
                  <div className="h-0.5 w-[60%] bg-white/10 rounded-full"></div>
                </div>
              ))}

              <div className="mt-2 p-1.5 bg-amber-500/10 border border-amber-500/20 rounded-md">
                <div className="flex items-center gap-1 mb-0.5">
                  <FileWarning className="w-2 h-2 text-amber-500" />
                  <span className="text-[5px] font-bold text-amber-500">QUOTATION_V4.PDF</span>
                </div>
                <div className="h-0.5 w-full bg-amber-500/20 rounded-full"></div>
              </div>
            </div>

            <div className="absolute bottom-2 left-0 right-0 text-center">
              <span className="text-[6px] font-black uppercase text-slate-500 tracking-widest bg-white/5 px-1.5 py-0.5 rounded-full border border-white/5">Personal Device</span>
            </div>
          </div>

          {/* Status Label */}
          <motion.div
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 7, times: [0.35, 0.45, 0.85, 1], repeat: Infinity }}
            className="absolute -top-8 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[8px] font-black px-3 py-1 rounded-lg shadow-xl whitespace-nowrap"
          >
            REP HAS RESIGNED
          </motion.div>
        </motion.div>
      </div>

      {/* Warning indicator */}
      <motion.div
        animate={{ opacity: [0, 0.5, 0.5, 0] }}
        transition={{ duration: 7, times: [0.4, 0.5, 0.9, 1], repeat: Infinity }}
        className="absolute right-6 bottom-10 text-right"
      >
        <ShieldAlert className="w-6 h-6 text-orange-600 mb-1 ml-auto" />
        <p className="text-[7px] font-bold text-slate-400">DATA BEYOND REACH</p>
      </motion.div>
    </div>
  );
};

export default CloudBackupProblemAnimation;
