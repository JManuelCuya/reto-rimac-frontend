import React from 'react';
import './Header.scss';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__container container">
        <div className="header__logo">
          <img
            src="/img/logo-rimac.png"
            alt="Logo RIMAC"
            className="header__logo-img"
          />
        </div>

        <div className="header__contact">
          <span className="header__contact-text">¡Compra por este medio!</span>
          <a href="tel:+5114116001" className="header__contact-phone">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path 
                d="M14.5 11.2V13.2C14.5 13.6418 14.1418 14 13.7 14H13.3C6.5 14 1 8.5 1 1.7V1.3C1 0.858172 1.35817 0.5 1.8 0.5H3.8C4.24183 0.5 4.6 0.858172 4.6 1.3V3.5C4.6 3.94183 4.24183 4.3 3.8 4.3H2.8C3.5 7.9 6.1 10.5 9.7 11.2V10.2C9.7 9.75817 10.0582 9.4 10.5 9.4H12.7C13.1418 9.4 13.5 9.75817 13.5 10.2V11.2C13.5 11.6418 13.8582 12 14.3 12H14.5Z" 
                fill="currentColor"
              />
            </svg>
            (01) 411 6001
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
