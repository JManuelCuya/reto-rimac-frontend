import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '@/context/UserContext';
import { UserType } from '@/types';
import Stepper from '@/components/Stepper/Stepper';
import './SelectUser.scss';

const STEPS = [
  { number: 1, label: 'Planes y coberturas' },
  { number: 2, label: 'Resumen' },
];

const SelectUser: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUserType, userType } = useUserContext();

  if (!user) {
    navigate('/');
    return null;
  }

  const handleSelectUserType = (type: UserType) => {
    setUserType(type);
    navigate('/plans');
  };

  return (
    <div className="select-user">
      <div className="select-user__container container">
        <Stepper currentStep={1} steps={STEPS} />

        <div className="select-user__content">
          <button 
            className="select-user__back" 
            onClick={() => navigate('/')}
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

          <h1 className="select-user__title">
            {user.name} ¿Para quién deseas cotizar?
          </h1>
          <p className="select-user__subtitle">
            Selecciona la opción que se ajuste más a tus necesidades.
          </p>

          <div className="select-user__options">
            <button
              className={`select-user__option ${userType === 'self' ? 'select-user__option--selected' : ''}`}
              onClick={() => handleSelectUserType('self')}
            >
              <div className="select-user__option-icon">
                <img
                  src="/img/me-icon.png"
                  alt="Para mí"
                  className="select-user__option-img"
                />
              </div>
              <div className="select-user__option-content">
                <h3 className="select-user__option-title">Para mí</h3>
                <p className="select-user__option-description">
                  Cotiza tu seguro de salud y agrega familiares si así lo deseas.
                </p>
              </div>
              <div className="select-user__option-radio">
                {userType === 'self' && (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M13.5 4L6 11.5L2.5 8" stroke="#00C853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            </button>

            <button
              className={`select-user__option ${userType === 'other' ? 'select-user__option--selected' : ''}`}
              onClick={() => handleSelectUserType('other')}
            >
              <div className="select-user__option-icon">
                <img
                  src="/img/other-icon.png"
                  alt="Para alguien más"
                  className="select-user__option-img"
                />
              </div>
              <div className="select-user__option-content">
                <h3 className="select-user__option-title">Para alguien más</h3>
                <p className="select-user__option-description">
                  Realiza una cotización para uno de tus familiares o cualquier persona.
                </p>
              </div>
              <div className="select-user__option-radio">
                {userType === 'other' && (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M13.5 4L6 11.5L2.5 8" stroke="#00C853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectUser;