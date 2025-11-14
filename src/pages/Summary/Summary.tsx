import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '@/context/UserContext';
import { formatPrice } from '@/utils/helpers';
import Stepper from '@/components/Stepper/Stepper';
import Button from '@/components/Button/Button';
import SuccessModal from '@/components/SuccessModal/SuccessModal';
import './Summary.scss';

const STEPS = [
  { number: 1, label: 'Planes y coberturas' },
  { number: 2, label: 'Resumen' },
];

const Summary: React.FC = () => {
  const navigate = useNavigate();
  const { user, selectedPlan, formData, userType } = useUserContext();
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!user || !selectedPlan) {
      navigate('/');
    }
  }, [user, selectedPlan, navigate]);

  if (!user || !selectedPlan || !formData) {
    return null;
  }

  return (
    <div className="summary">
      <div className="summary__container container">
        <Stepper currentStep={2} steps={STEPS} />

        <div className="summary__content">
          <div className="summary__header">
            <button
              className="summary__back"
              onClick={() => navigate('/select-user')}
              aria-label="Volver"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path 
                  d="M12.5 5L7.5 10L12.5 15" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              <span>Volver</span>
            </button>

            <h1 className="summary__title">Resumen del seguro</h1>
          </div>

          <div className="summary__card">
            <div className="summary__section">
              <h2 className="summary__section-title">Precios calculados para:</h2>
              <div className="summary__user-info">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
                  <path d="M4 20C4 16.6863 6.68629 14 10 14H14C17.3137 14 20 16.6863 20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span className="summary__user-name">
                  {user.name} {user.lastName}
                </span>
              </div>
              <div className="summary__user-details">
                <div className="summary__detail summary__detail--label-only">
                  <span className="summary__detail-label">Responsable de pago</span>
                </div>
                <div className="summary__detail">
                  <span className="summary__detail-label">{formData.documentType}:</span>
                  <span className="summary__detail-value">{formData.documentNumber}</span>
                </div>
                <div className="summary__detail">
                  <span className="summary__detail-label">Celular:</span>
                  <span className="summary__detail-value">{formData.phoneNumber}</span>
                </div>
                <div className="summary__detail">
                  <span className="summary__detail-label">Fecha de nacimiento:</span>
                  <span className="summary__detail-value">{user.birthDay}</span>
                </div>
                <div className="summary__detail">
                  <span className="summary__detail-label">Tipo de cotización:</span>
                  <span className="summary__detail-value">
                    {userType === 'self' ? 'Para mí' : 'Para alguien más'}
                  </span>
                </div>
              </div>
            </div>

            <div className="summary__divider"></div>

            <div className="summary__section">
              <h2 className="summary__section-title">Plan seleccionado</h2>
              
              <div className="summary__plan">
                <div className="summary__plan-header">
                  <div className="summary__plan-icon">
                    {selectedPlan.type === 'house' && (
                      <img src="/img/house.png" alt="Plan en Casa" className="summary__plan-img" />
                    )}
                    {selectedPlan.type === 'clinic' && (
                      <img src="/img/clinic.png" alt="Plan en Clínica" className="summary__plan-img" />
                    )}
                    {!selectedPlan.type && (
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <circle cx="24" cy="24" r="24" fill="#F7F8FC"/>
                        <path d="M24 32C28.4183 32 32 28.4183 32 24C32 19.5817 28.4183 16 24 16C19.5817 16 16 19.5817 16 24C16 28.4183 19.5817 32 24 32Z" fill="#FF1D50"/>
                      </svg>
                    )}
                  </div>
                  <div className="summary__plan-info">
                    <h3 className="summary__plan-name">{selectedPlan.name}</h3>
                    <p className="summary__plan-price">{formatPrice(selectedPlan.price)} / mes</p>
                  </div>
                </div>

                <ul className="summary__plan-features">
                  {selectedPlan.description.map((feature, index) => (
                    <li key={index} className="summary__plan-feature">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <circle cx="10" cy="10" r="10" fill="#389E0D" opacity="0.15"/>
                        <path d="M6 10L9 13L14 7" stroke="#389E0D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="summary__divider"></div>

            <div className="summary__total">
              <span className="summary__total-label">Total mensual:</span>
              <span className="summary__total-amount">{formatPrice(selectedPlan.price)}</span>
            </div>

            <Button
              variant="secondary"
              fullWidth
              onClick={() => setShowSuccess(true)}
            >
              Comprar seguro
            </Button>
          </div>
        </div>
      </div>

      <SuccessModal isOpen={showSuccess} onClose={() => setShowSuccess(false)} />
    </div>
  );
};

export default Summary;
