import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TrialModalContextType {
  isOpen: boolean;
  openModal: () => void;
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

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <TrialModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </TrialModalContext.Provider>
  );
};
