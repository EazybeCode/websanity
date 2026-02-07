import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LeadGenerationForm } from './forms/LeadGenerationForm';

export const LeadMobileButton: React.FC = () => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Show popup after a short delay
    const timer = setTimeout(() => {
      setIsExpanded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {/* Expanded Bottom Sheet */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-4 left-4 right-4 z-40 block lg:hidden"
          >
            <div className="relative bg-brand-card border border-slate-700/50 rounded-2xl shadow-2xl p-5">
              {/* Close Button */}
              <button
                onClick={handleToggle}
                className="absolute top-3 right-3 text-slate-500 hover:text-slate-300 transition-colors duration-200 p-1.5 hover:bg-slate-800/50 rounded-lg"
                aria-label="Minimize"
              >
                <X size={16} />
              </button>

              {/* Form */}
              <LeadGenerationForm />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimized Button */}
      <AnimatePresence>
        {!isExpanded && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={handleToggle}
            className="fixed bottom-4 right-4 z-40 block lg:hidden bg-brand-blue hover:bg-blue-700 text-white px-4 py-3 rounded-full shadow-glow-blue transition-all duration-200"
            aria-label="Open lead form"
          >
            <span className="text-sm font-semibold">{t('leadForm.downloadButton').replace(' →', '')}</span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};
