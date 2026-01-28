import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';

const CloudBackupSearchAnimation: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const mountedRef = useRef(true);

  const messages = [
    { id: 1, user: "Alex Chen", text: "Sent the updated pricing sheet for Q3.", date: "Jan 12" },
    { id: 2, user: "Sarah Smith", text: "Approved the quote #442 for the client.", date: "Feb 05" },
    { id: 3, user: "John Doe", text: "When can we expect the pricing revision?", date: "Mar 20" },
    { id: 4, user: "Sarah Smith", text: "Client confirmed the pricing looks good.", date: "Feb 08" },
  ];

  const filtered = searchTerm
    ? messages.filter(m => m.text.toLowerCase().includes(searchTerm.toLowerCase()))
    : messages;

  useEffect(() => {
    mountedRef.current = true;
    const sequence = ["", "p", "pr", "pri", "pric", "prici", "pricing", "pricing", "", ""];
    let i = 0;
    const interval = setInterval(() => {
      if (!mountedRef.current) return;
      setSearchTerm(sequence[i]);
      i = (i + 1) % sequence.length;
    }, 500);
    return () => {
      mountedRef.current = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative w-full aspect-[4/3] flex items-center justify-center">
      <div className="w-full h-full bg-[#0F172A] rounded-2xl border border-slate-200 flex flex-col overflow-hidden shadow-2xl">
        {/* Search Header */}
        <div className="p-4 border-b border-white/5 bg-[#0F172A]/50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <WhatsAppIcon size={14} />
              <h3 className="text-[10px] font-bold text-white">Company WhatsApp History</h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex-1 bg-[#1E293B] border border-white/10 rounded-lg flex items-center px-3 py-2">
              <Search className="w-3 h-3 text-blue-500 mr-2" />
              <div className="text-[10px] font-medium text-white flex items-center h-4">
                {searchTerm}<span className="w-[1px] h-3 bg-blue-500 ml-0.5 animate-pulse"></span>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-hidden p-3 space-y-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((m) => (
              <motion.div
                key={m.id}
                layout
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-2.5 bg-white/5 rounded-lg border border-white/5"
              >
                <div className="flex items-start justify-between">
                  <div className="flex gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-[8px] flex-shrink-0">
                      {m.user[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <h4 className="font-bold text-white text-[9px]">{m.user}</h4>
                        <span className="text-[6px] bg-emerald-500/20 text-emerald-400 px-1 py-0.5 rounded-full font-black uppercase">Synced</span>
                      </div>
                      <p className="text-slate-400 text-[8px] leading-relaxed">
                        {searchTerm
                          ? m.text.split(new RegExp(`(${searchTerm})`, 'gi')).map((part, i) =>
                              part.toLowerCase() === searchTerm.toLowerCase()
                                ? <span key={i} className="bg-blue-600/30 text-blue-400 font-bold px-0.5 rounded">{part}</span>
                                : part
                            )
                          : m.text
                        }
                      </p>
                    </div>
                  </div>
                  <span className="text-[6px] text-slate-500 font-bold uppercase tracking-widest flex-shrink-0">{m.date}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#0F172A] to-transparent pointer-events-none rounded-b-2xl"></div>
      </div>
    </div>
  );
};

export default CloudBackupSearchAnimation;
