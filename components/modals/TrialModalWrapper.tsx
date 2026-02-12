import React from 'react';
import { TrialModal } from './TrialModal';
import { useTrialModal } from '../../contexts/TrialModalContext';

export const TrialModalWrapper: React.FC = () => {
  const { isOpen, closeModal } = useTrialModal();
  return <TrialModal isOpen={isOpen} onClose={closeModal} />;
};
