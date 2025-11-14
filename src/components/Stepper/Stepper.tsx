import React from 'react';
import './Stepper.scss';

interface Step {
  number: number;
  label: string;
}

interface StepperProps {
  currentStep: number;
  steps: Step[];
}

const Stepper: React.FC<StepperProps> = ({ currentStep, steps }) => {
  return (
    <div className="stepper">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div
            className={`stepper__step ${
              step.number === currentStep ? 'stepper__step--active' : ''
            } ${step.number < currentStep ? 'stepper__step--completed' : ''}`}
          >
            <div className="stepper__circle">
              {step.number < currentStep ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8L6.5 11.5L13 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <span>{step.number}</span>
              )}
            </div>
            <span className="stepper__label">{step.label}</span>
          </div>

          {index < steps.length - 1 && (
            <div
              className={`stepper__line ${
                step.number < currentStep ? 'stepper__line--completed' : ''
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Stepper;
