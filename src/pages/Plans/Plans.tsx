import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '@/context/UserContext';
import { fetchPlans } from '@/services/api';
import { Plan } from '@/types';
import { calculateAge, formatPrice } from '@/utils/helpers';
import Stepper from '@/components/Stepper/Stepper';
import PlanCard from '@/components/PlanCard/PlanCard';
import './Plans.scss';

const STEPS = [
  { number: 1, label: 'Planes y coberturas' },
  { number: 2, label: 'Resumen' },
];

const Plans: React.FC = () => {
  const navigate = useNavigate();
  const { user, userType, setSelectedPlan } = useUserContext();

  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showSummary, setShowSummary] = useState(false);
  const [selectedPlan, setLocalSelectedPlan] = useState<Plan | null>(null);

  useEffect(() => {
    if (!user || !userType) {
      navigate('/');
      return;
    }

    loadPlans();
  }, [user, userType, navigate]);

  const loadPlans = async () => {
    try {
      setIsLoading(true);
      const data = await fetchPlans();
      
      // Filter plans based on user age
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
    // Apply 5% discount for "other" user type
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

  const handleSelectPlan = (plan: Plan) => {
    // Store plan with adjusted price
    const planWithAdjustedPrice = {
      ...plan,
      price: getPlanPrice(plan),
      type: getPlanType(plan),
    };
    setLocalSelectedPlan(planWithAdjustedPrice);
    setSelectedPlan(planWithAdjustedPrice);
    setShowSummary(true);
  };

  const handleProceedToSummary = () => {
    navigate('/summary');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="plans">
      <div className="plans__container container">
        <Stepper currentStep={1} steps={STEPS} />

        <div className="plans__content">
          <div className="plans__header">
            <button 
              className="plans__back" 
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

            <h1 className="plans__title">
              {user.name}, aquí tienes tus planes disponibles
            </h1>
            <p className="plans__subtitle">
              Selecciona el plan que mejor se adapte a tus necesidades
            </p>
          </div>

          {isLoading ? (
            <div className="plans__loading">
              <div className="plans__spinner"></div>
              <p>Cargando planes...</p>
            </div>
          ) : error ? (
            <div className="plans__error">
              <p>{error}</p>
              <button onClick={loadPlans} className="plans__retry">
                Reintentar
              </button>
            </div>
          ) : plans.length === 0 ? (
            <div className="plans__empty">
              <p>No hay planes disponibles para tu edad</p>
            </div>
          ) : (
            <>
              <div className="plans__grid">
                {plans.map((plan, index) => {
                  // Recommend "Plan en Casa y Clínica" for both user types
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

              {showSummary && (
                <div className="plans__summary">
                  <div className="plans__summary-card">
                    <h2 className="plans__summary-title">Resumen del seguro</h2>

                    <div className="plans__summary-section">
                      <h3 className="plans__summary-section-title">Precios calculados para:</h3>
                      <div className="plans__summary-user">
                        <span>{user.name} {user.lastName}</span>
                      </div>
                    </div>

                    <div className="plans__summary-divider"></div>

                    <div className="plans__summary-section">
                      <h3 className="plans__summary-section-title">Plan seleccionado</h3>
                      {selectedPlan && (
                        <div className="plans__summary-plan">
                          <div className="plans__summary-plan-header">
                            <div className="plans__summary-plan-icon">
                              <img
                                src={selectedPlan.name.toLowerCase().includes('clínica') ? '/img/clinic.png' : '/img/house.png'}
                                alt={selectedPlan.name}
                              />
                            </div>
                            <div className="plans__summary-plan-info">
                              <h4 className="plans__summary-plan-name">{selectedPlan.name}</h4>
                              <p className="plans__summary-plan-price">{formatPrice(selectedPlan.price)} / mes</p>
                            </div>
                          </div>

                          <ul className="plans__summary-plan-features">
                            {selectedPlan.description.map((feature, idx) => (
                              <li key={idx}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="plans__summary-divider"></div>

                    <div className="plans__summary-total">
                      <span>Total mensual:</span>
                      <span>{selectedPlan ? formatPrice(selectedPlan.price) : '$0'}</span>
                    </div>

                    <button
                      className="plans__summary-button"
                      onClick={handleProceedToSummary}
                    >
                      Continuar
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Plans;
