import React from 'react';
import './Footer.scss';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__container container">
        <div className="footer__logo">
          <img
            src="/img/logo-footer.png"
            alt="Logo RIMAC Footer"
            className="footer__logo-img"
          />
        </div>
        
        <div className="footer__separator"></div>
        
        <p className="footer__copyright">
          © 2023 RIMAC Seguros y Reaseguros.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
