import React from 'react';
import './Input.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  className = '',
  ...props
}) => {
  return (
    <div className={`input-wrapper ${className}`}>
      {label && <label className="input-wrapper__label">{label}</label>}
      
      <div className={`input-wrapper__field ${error ? 'input-wrapper__field--error' : ''}`}>
        {icon && <div className="input-wrapper__icon">{icon}</div>}
        <input className="input-wrapper__input" {...props} />
      </div>
      
      {error && <span className="input-wrapper__error">{error}</span>}
    </div>
  );
};

export default Input;
