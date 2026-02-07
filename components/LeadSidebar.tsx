import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LeadGenerationForm } from './forms/LeadGenerationForm';

export const LeadSidebar: React.FC = () => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isCalendlyShowing, setIsCalendlyShowing] = useState(false);

  useEffect(() => {
    console.log('LeadSidebar mounted');
  }, []);

  useEffect(() => {
    console.log('isExpanded:', isExpanded);
  }, [isExpanded]);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCalendlyShow = (isShowing: boolean) => {
    setIsCalendlyShowing(isShowing);
  };

  return (
    <>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed left-8 w-[340px] z-40 bottom-8 hidden lg:block"
          >
            <div className="relative bg-brand-card/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl p-8">
              {/* Close Button */}
              <button
                onClick={handleToggle}
                className="absolute top-5 right-5 text-slate-500 hover:text-slate-300 transition-colors duration-200 p-1.5 hover:bg-slate-800/50 rounded-lg"
                aria-label="Minimize sidebar"
              >
                <X size={16} />
              </button>

              {/* Form */}
              <LeadGenerationForm onCalendlyShow={handleCalendlyShow} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimized Tab */}
      <AnimatePresence>
        {!isExpanded && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={handleToggle}
            className="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-2 bg-brand-blue hover:bg-blue-700 text-white p-4 rounded-r-xl shadow-glow-blue transition-all duration-200 hover:pl-5"
            aria-label="Open lead form"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-xs font-semibold whitespace-nowrap [writing-mode:vertical-lr]">
              {t('leadForm.downloadButton').replace(' →', '')}
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};
