import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Database, ShieldCheck } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';

const CloudBackupSyncAnimation: React.FC = () => {
  return (
    <div className="relative w-full aspect-[4/3] flex items-center justify-center rounded-2xl border border-slate-700 overflow-hidden bg-brand-card">
      <div className="relative flex flex-col items-center gap-8 w-full max-w-xs">

        {/* Phone (Source) */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="relative z-20 w-40 h-[70px] bg-slate-900 rounded-xl border-2 border-slate-600 shadow-2xl p-3 flex items-center gap-3"
        >
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-inner overflow-hidden flex-shrink-0">
            <WhatsAppIcon size={20} />
          </div>
          <div>
            <div className="h-1.5 w-16 bg-slate-700 rounded-full mb-1.5"></div>
            <div className="h-1 w-10 bg-slate-800 rounded-full"></div>
          </div>
          <div className="absolute -top-3 -right-3 bg-emerald-500 text-[7px] font-black px-1.5 py-0.5 rounded-full text-white shadow-lg animate-pulse">LIVE SYNC</div>
        </motion.div>

        {/* Encrypted Packets */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ y: -40, opacity: 0 }}
            animate={{
              y: [0, 140],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut"
            }}
            className="absolute top-20 z-30"
          >
            <div className="bg-blue-600 p-1.5 rounded-lg shadow-lg shadow-blue-600/20">
              <Lock className="w-3 h-3 text-white" />
            </div>
          </motion.div>
        ))}

        {/* Cloud Vault (Destination) */}
        <motion.div className="relative z-20 w-full h-[140px] bg-brand-surface rounded-xl border border-slate-600 shadow-2xl overflow-hidden">
          <div className="h-7 bg-brand-black border-b border-slate-700 flex items-center px-3 justify-between">
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-600"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-slate-600"></div>
            </div>
            <div className="text-[7px] text-slate-500 font-bold uppercase tracking-tighter">Enterprise Cloud Backup</div>
          </div>

          <div className="p-3">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-blue-500/10 flex items-center justify-center">
                  <Database className="w-3 h-3 text-blue-400" />
                </div>
                <span className="text-[8px] font-bold text-white">Encrypted Storage</span>
              </div>
              <div className="text-[10px] font-bold text-blue-400">Secure</div>
            </div>

            <div className="space-y-2">
              {[1, 2, 3].map(i => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  className="flex items-center py-1 border-b border-slate-700/50"
                >
                  <div className="flex gap-1.5 items-center">
                    <div className="w-1 h-1 rounded-full bg-blue-400"></div>
                    <div className="h-0.5 w-16 bg-slate-700 rounded-full"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0, 0.3, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-blue-400/5 rounded-full blur-3xl pointer-events-none"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default CloudBackupSyncAnimation;
