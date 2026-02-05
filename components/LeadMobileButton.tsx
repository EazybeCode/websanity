import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { LeadGenerationForm } from './forms/LeadGenerationForm';

const STORAGE_KEY = 'eazybe_mobile_banner_dismissed';

export const LeadMobileButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if user has previously dismissed the banner
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (dismissed === 'true') {
      setIsDismissed(true);
      return;
    }

    // Show banner after a short delay
    const timer = setTimeout(() => {
      setIsBannerVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Prevent body scroll when modal is open
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDismissBanner = () => {
    setIsBannerVisible(false);
    setIsDismissed(true);
    localStorage.setItem(STORAGE_KEY, 'true');
  };

  // Don't render if dismissed
  if (isDismissed && !isModalOpen) {
    return null;
  }

  return (
    <>
      {/* Sticky Bottom Banner */}
      <AnimatePresence>
        {isBannerVisible && !isModalOpen && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed bottom-0 left-0 right-0 z-40 block lg:hidden"
          >
            <div className="bg-brand-card border-t border-slate-700 p-4 shadow-lg">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white mb-0.5">
                    Ready to get started?
                  </p>
                  <p className="text-xs text-slate-400">
                    Start your free 14-day trial today
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleOpenModal}
                    className="bg-brand-blue text-white px-4 py-2 rounded-btn text-sm font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center gap-1.5 shadow-glow-blue"
                  >
                    Get Started
                    <ArrowRight size={16} />
                  </button>

                  <button
                    onClick={handleDismissBanner}
                    className="text-slate-400 hover:text-white transition-colors duration-200 p-2"
                    aria-label="Dismiss banner"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />

            {/* Modal Content */}
            <div className="fixed inset-0 z-50 overflow-y-auto">
              <div className="flex min-h-full items-start justify-center p-4 sm:p-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ duration: 0.2 }}
                  className="relative w-full max-w-md bg-brand-card/95 backdrop-blur-xl border border-slate-700/30 rounded-2xl shadow-2xl p-8 mt-20"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close Button */}
                  <button
                    onClick={handleCloseModal}
                    className="absolute top-5 right-5 text-slate-500 hover:text-slate-300 transition-colors duration-200 p-1.5 hover:bg-slate-800/50 rounded-lg"
                    aria-label="Close modal"
                  >
                    <X size={16} />
                  </button>

                  {/* Header */}
                  <div className="mb-8 pr-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-blue/10 border border-brand-blue/20 rounded-full mb-4">
                      <div className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-pulse"></div>
                      <span className="text-xs font-medium text-brand-blue">Free Trial</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                      Start Your Free Trial
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      No credit card required • 14 days free
                    </p>
                  </div>

                  {/* Form */}
                  <LeadGenerationForm />
                </motion.div>
              </div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
