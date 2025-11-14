import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '@/context/UserContext';
import { fetchPlans } from '@/services/api';
import { Plan, UserType } from '@/types';
import { calculateAge } from '@/utils/helpers';
import Stepper from '@/components/Stepper/Stepper';
import PlanCard from '@/components/PlanCard/PlanCard';
import './PlanSelection.scss';

const STEPS = [
  { number: 1, label: 'Planes y coberturas' },
  { number: 2, label: 'Resumen' },
];

const PlanSelection: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUserType, userType, setSelectedPlan } = useUserContext();

  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPlanIndex, setCurrentPlanIndex] = useState(0);

  if (!user) {
    navigate('/');
    return null;
  }

  useEffect(() => {
    if (userType) {
      loadPlans();
    }
  }, [userType]);

  const loadPlans = async () => {
    try {
      setIsLoading(true);
      const data = await fetchPlans();

      if (user) {
        const userAge = calculateAge(user.birthDay);
        const filteredPlans = data.list.filter(plan => plan.age >= userAge);
        setPlans(filteredPlans);
      }
    } catch (err) {
      console.error('Error loading plans:', err);
      setError('Error al cargar los planes. Por favor, intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const getPlanPrice = (plan: Plan): number => {
    if (userType === 'other') {
      return plan.price * 0.95;
    }
    return plan.price;
  };

  const getPlanType = (plan: Plan): 'house' | 'clinic' => {
    if (plan.name.toLowerCase().includes('clínica')) {
      return 'clinic';
    }
    return 'house';
  };

  const handleSelectUserType = (type: UserType) => {
    setUserType(type);
    setCurrentPlanIndex(0);
  };

  const handleSelectPlan = (plan: Plan) => {
    const planWithAdjustedPrice = {
      ...plan,
      price: getPlanPrice(plan),
      type: getPlanType(plan),
    };
    setSelectedPlan(planWithAdjustedPrice);
    navigate('/summary');
  };

  const handleNextPlan = () => {
    setCurrentPlanIndex((prev) => (prev + 1) % plans.length);
  };

  const handlePrevPlan = () => {
    setCurrentPlanIndex((prev) => (prev - 1 + plans.length) % plans.length);
  };

  return (
    <div className="plan-selection">
      <div className="plan-selection__container container">
        <Stepper currentStep={1} steps={STEPS} />

        <div className="plan-selection__content">
          {/* User Selection Section */}
          <div className="plan-selection__user-section">
            <button
              className="plan-selection__back"
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

            <h1 className="plan-selection__title">
              {user.name} ¿Para quién deseas cotizar?
            </h1>
            <p className="plan-selection__subtitle">
              Selecciona la opción que se ajuste más a tus necesidades.
            </p>

            <div className="plan-selection__options">
              <button
                className={`plan-selection__option ${userType === 'self' ? 'plan-selection__option--selected' : ''}`}
                onClick={() => handleSelectUserType('self')}
              >
                <div className="plan-selection__option-icon">
                  <img
                    src="/img/me-icon.png"
                    alt="Para mí"
                    className="plan-selection__option-img"
                  />
                </div>
                <div className="plan-selection__option-content">
                  <h3 className="plan-selection__option-title">Para mí</h3>
                  <p className="plan-selection__option-description">
                    Cotiza tu seguro de salud y agrega familiares si así lo deseas.
                  </p>
                </div>
                <div className="plan-selection__option-radio">
                  {userType === 'self' && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M13.5 4L6 11.5L2.5 8" stroke="#00C853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </button>

              <button
                className={`plan-selection__option ${userType === 'other' ? 'plan-selection__option--selected' : ''}`}
                onClick={() => handleSelectUserType('other')}
              >
                <div className="plan-selection__option-icon">
                  <img
                    src="/img/other-icon.png"
                    alt="Para alguien más"
                    className="plan-selection__option-img"
                  />
                </div>
                <div className="plan-selection__option-content">
                  <h3 className="plan-selection__option-title">Para alguien más</h3>
                  <p className="plan-selection__option-description">
                    Realiza una cotización para uno de tus familiares o cualquier persona.
                  </p>
                </div>
                <div className="plan-selection__option-radio">
                  {userType === 'other' && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M13.5 4L6 11.5L2.5 8" stroke="#00C853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* Plans Section - Only show if user type is selected */}
          {userType && (
            <div className="plan-selection__plans-section">
              <h2 className="plan-selection__plans-title">
                {user.name}, aquí tienes tus planes disponibles
              </h2>
              <p className="plan-selection__plans-subtitle">
                Selecciona el plan que mejor se adapte a tus necesidades
              </p>

              {isLoading ? (
                <div className="plan-selection__loading">
                  <div className="plan-selection__spinner"></div>
                  <p>Cargando planes...</p>
                </div>
              ) : error ? (
                <div className="plan-selection__error">
                  <p>{error}</p>
                  <button onClick={loadPlans} className="plan-selection__retry">
                    Reintentar
                  </button>
                </div>
              ) : plans.length === 0 ? (
                <div className="plan-selection__empty">
                  <p>No hay planes disponibles para tu edad</p>
                </div>
              ) : (
                <>
                  {/* Desktop Grid View */}
                  <div className="plan-selection__plans-desktop">
                    {plans.map((plan, index) => {
                      const isRecommended = plan.name.toLowerCase().includes('plan en casa y clínica');

                      return (
                        <PlanCard
                          key={index}
                          plan={{ ...plan, price: getPlanPrice(plan) }}
                          onSelect={() => handleSelectPlan(plan)}
                          recommended={isRecommended}
                        />
                      );
                    })}
                  </div>

                  {/* Mobile Carousel View */}
                  <div className="plan-selection__plans-mobile">
                    <div className="plan-selection__carousel">
                      <button
                        className="plan-selection__carousel-btn plan-selection__carousel-btn--prev"
                        onClick={handlePrevPlan}
                        aria-label="Plan anterior"
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
                      </button>

                      <div className="plan-selection__carousel-wrapper">
                        <div
                          className="plan-selection__carousel-track"
                          style={{
                            transform: `translateX(calc(-${currentPlanIndex} * (100% + 16px)))`,
                            transition: 'transform 300ms ease-in-out'
                          }}
                        >
                          {plans.map((plan, index) => (
                            <div
                              key={index}
                              className="plan-selection__carousel-item"
                            >
                              <PlanCard
                                plan={{ ...plan, price: getPlanPrice(plan) }}
                                onSelect={() => handleSelectPlan(plan)}
                                recommended={plan.name.toLowerCase().includes('plan en casa y clínica')}
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      <button
                        className="plan-selection__carousel-btn plan-selection__carousel-btn--next"
                        onClick={handleNextPlan}
                        aria-label="Próximo plan"
                      >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path
                            d="M7.5 5L12.5 10L7.5 15"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="plan-selection__carousel-dots">
                      {plans.map((_, index) => (
                        <button
                          key={index}
                          className={`plan-selection__dot ${index === currentPlanIndex ? 'plan-selection__dot--active' : ''}`}
                          onClick={() => setCurrentPlanIndex(index)}
                          aria-label={`Ir al plan ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanSelection;
