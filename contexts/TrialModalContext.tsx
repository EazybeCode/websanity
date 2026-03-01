import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

export type ModalMode = 'trial' | 'demo';

interface TrialModalContextType {
  isOpen: boolean;
  mode: ModalMode;
  openModal: (mode?: ModalMode) => void;
  closeModal: () => void;
}

const TrialModalContext = createContext<TrialModalContextType | undefined>(undefined);

export const useTrialModal = () => {
  const context = useContext(TrialModalContext);
  if (!context) {
    throw new Error('useTrialModal must be used within a TrialModalProvider');
  }
  return context;
};

interface TrialModalProviderProps {
  children: ReactNode;
}

export const TrialModalProvider: React.FC<TrialModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<ModalMode>('trial');
  const { i18n } = useTranslation();

  const openModal = (modalMode: ModalMode = 'trial') => {
    const lang = i18n.language || 'en';
    (window as any).gtag?.('event', modalMode === 'demo' ? `book_demo_click_${lang}` : `install_free_click_${lang}`);
    setMode(modalMode);
    setIsOpen(true);
  };
  const closeModal = () => setIsOpen(false);

  return (
    <TrialModalContext.Provider value={{ isOpen, mode, openModal, closeModal }}>
      {children}
    </TrialModalContext.Provider>
  );
};
