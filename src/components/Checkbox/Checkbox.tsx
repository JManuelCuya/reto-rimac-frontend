import React from 'react';
import './Checkbox.scss';

interface CheckboxProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: React.ReactNode;
  error?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  checked,
  onChange,
  label,
  error,
}) => {
  return (
    <div className="checkbox-wrapper">
      <div className={`checkbox ${error ? 'checkbox--error' : ''}`}>
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="checkbox__input"
        />
        <label htmlFor={id} className="checkbox__label">
          <span className="checkbox__box">
            {checked && (
              <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                <path
                  d="M1 5L4.5 8.5L11 1"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </span>
          <span className="checkbox__text">{label}</span>
        </label>
      </div>
      {error && <span className="checkbox-wrapper__error">{error}</span>}
    </div>
  );
};

export default Checkbox;
