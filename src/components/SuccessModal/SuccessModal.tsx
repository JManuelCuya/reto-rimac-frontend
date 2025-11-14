import React, { useEffect } from 'react';
import './SuccessModal.scss';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
  duration?: number;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  message = '¡Compra exitosa!',
  duration = 3000,
}) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose, duration]);

  if (!isOpen) return null;

  return (
    <div className="success-modal">
      <div className="success-modal__content">
        <div className="success-modal__icon">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="32" fill="#00C853" />
            <path
              d="M26 32L30 36L40 26"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 className="success-modal__title">{message}</h2>
        <p className="success-modal__subtitle">
          En un escenario real, aquí se procesaría el pago.
        </p>
      </div>
    </div>
  );
};

export default SuccessModal;
