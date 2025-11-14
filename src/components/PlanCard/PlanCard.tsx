import React from 'react';
import { Plan } from '@/types';
import { formatPrice } from '@/utils/helpers';
import Button from '@/components/Button/Button';
import './PlanCard.scss';

interface PlanCardProps {
  plan: Plan;
  onSelect: () => void;
  recommended?: boolean;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, onSelect, recommended = false }) => {
  // Determine plan type based on name
  const getPlanType = () => {
    if (plan.name.toLowerCase().includes('clínica')) {
      return 'clinic';
    }
    return 'house';
  };

  const planType = getPlanType();
  const iconPath = planType === 'clinic' ? '/img/clinic.png' : '/img/house.png';

  return (
    <div className={`plan-card ${recommended ? 'plan-card--recommended' : ''}`}>
      {recommended && <div className="plan-card__badge">Recomendado</div>}

      <div className="plan-card__header">
        <div className="plan-card__header-top">
          <h3 className="plan-card__name">{plan.name}</h3>
          <div className="plan-card__icon">
            <img
              src={iconPath}
              alt={`${plan.name}`}
              className="plan-card__icon-img"
            />
          </div>
        </div>

        <div className="plan-card__price-section">
          <div className="plan-card__price-label">Costo del plan</div>
          <div className="plan-card__price">{formatPrice(plan.price)} al mes</div>
        </div>
      </div>

      <div className="plan-card__divider"></div>

      <ul className="plan-card__features">
        {plan.description.map((feature, index) => (
          <li key={index} className="plan-card__feature">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="12" fill="#389E0D" opacity="0.15"/>
              <path d="M8 12L11 15L16 9" stroke="#389E0D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      <Button 
        variant="secondary" 
        fullWidth 
        onClick={onSelect}
        className="plan-card__button"
      >
        Seleccionar Plan
      </Button>
    </div>
  );
};

export default PlanCard;
