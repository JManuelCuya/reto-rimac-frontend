import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '@/context/UserContext';
import { fetchUser } from '@/services/api';
import { validateDNI, validateCE, validatePhone } from '@/utils/helpers';
import Input from '@/components/Input/Input';
import Checkbox from '@/components/Checkbox/Checkbox';
import Button from '@/components/Button/Button';
import './Home.scss';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { setUser, setFormData } = useUserContext();
  
  const [documentType, setDocumentType] = useState<'DNI' | 'CE'>('DNI');
  const [documentNumber, setDocumentNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [privacyPolicy, setPrivacyPolicy] = useState(false);
  const [commercialCommunications, setCommercialCommunications] = useState(false);
  
  const [errors, setErrors] = useState({
    documentNumber: '',
    phoneNumber: '',
    privacyPolicy: '',
    commercialCommunications: '',
  });
  
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors = {
      documentNumber: '',
      phoneNumber: '',
      privacyPolicy: '',
      commercialCommunications: '',
    };

    // Validate document
    if (!documentNumber) {
      newErrors.documentNumber = `El ${documentType} es requerido`;
    } else if (documentType === 'DNI' && !validateDNI(documentNumber)) {
      newErrors.documentNumber = 'DNI debe tener 8 dígitos';
    } else if (documentType === 'CE' && !validateCE(documentNumber)) {
      newErrors.documentNumber = 'CE debe tener 9 dígitos';
    }

    // Validate phone
    if (!phoneNumber) {
      newErrors.phoneNumber = 'El celular es requerido';
    } else if (!validatePhone(phoneNumber)) {
      newErrors.phoneNumber = 'Celular debe tener 9 dígitos';
    }

    // Validate privacy policy
    if (!privacyPolicy) {
      newErrors.privacyPolicy = 'Debes aceptar la Política de Privacidad';
    }

    // Validate commercial communications
    if (!commercialCommunications) {
      newErrors.commercialCommunications = 'Debes aceptar la Política de Comunicaciones Comerciales';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Fetch user data from API
      const userData = await fetchUser();
      
      // Save data to context
      setUser(userData);
      setFormData({
        documentType,
        documentNumber,
        phoneNumber,
        privacyPolicy,
        commercialCommunications,
      });

      // Navigate to select user page
      navigate('/select-user');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Ocurrió un error al procesar tu solicitud. Por favor, intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="home">
      <div className="home__hero">
        <img
          src="/img/index-logo.png"
          alt="Familia feliz"
          className="home__hero-image"
        />
      </div>

      <div className="home__content">
        <div className="home__container container">
          <div className="home__hero-info">
            <div className="home__hero-text">
              <div className="home__tag">Seguro salud flexible</div>
              <h1 className="home__title">
                Creado para ti y tu<br />familia
              </h1>
            </div>
            <img
              src="/img/index-logo.png"
              alt="Familia feliz"
              className="home__hero-image-mobile"
            />
          </div>

          <div className="home__form-wrapper">
            <p className="home__description">
              Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra asesoría. 100% online.
            </p>
            <form className="home__form" onSubmit={handleSubmit}>
              <div className="home__inputs-row">
                <div className="home__form-field">
                  <div className="home__document-group">
                    <div className="home__document-select-wrapper">
                      <select
                        value={documentType}
                        onChange={(e) => setDocumentType(e.target.value as 'DNI' | 'CE')}
                        className="home__document-select"
                      >
                        <option value="DNI">DNI</option>
                        <option value="CE">CE</option>
                      </select>
                      <svg className="home__document-select-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className={`home__document-input-wrapper ${documentNumber ? 'home__document-input-wrapper--filled' : ''}`}>
                      <Input
                        type="text"
                        placeholder=" "
                        value={documentNumber}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          const maxLength = documentType === 'DNI' ? 8 : 9;
                          if (value.length <= maxLength) {
                            setDocumentNumber(value);
                          }
                        }}
                        maxLength={9}
                        error={errors.documentNumber}
                        className="home__document-input"
                      />
                      <label className="home__document-input-label">Nro. de documento</label>
                    </div>
                  </div>
                </div>

                <div className={`home__phone-wrapper ${phoneNumber ? 'home__phone-wrapper--filled' : ''}`}>
                  <Input
                    type="tel"
                    placeholder=" "
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    maxLength={9}
                    error={errors.phoneNumber}
                    className="home__phone-input"
                    icon={
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M14.5 11.2V13.2C14.5 13.6418 14.1418 14 13.7 14H13.3C6.5 14 1 8.5 1 1.7V1.3C1 0.858172 1.35817 0.5 1.8 0.5H3.8C4.24183 0.5 4.6 0.858172 4.6 1.3V3.5C4.6 3.94183 4.24183 4.3 3.8 4.3H2.8C3.5 7.9 6.1 10.5 9.7 11.2V10.2C9.7 9.75817 10.0582 9.4 10.5 9.4H12.7C13.1418 9.4 13.5 9.75817 13.5 10.2V11.2C13.5 11.6418 13.8582 12 14.3 12H14.5Z"
                          fill="currentColor"
                        />
                      </svg>
                    }
                  />
                  <label className="home__phone-input-label">Celular</label>
                </div>
              </div>

              <div className="home__checkboxes">
                <Checkbox
                  id="privacy-policy"
                  checked={privacyPolicy}
                  onChange={setPrivacyPolicy}
                  error={errors.privacyPolicy}
                  label={
                    <>
                      Acepto la{' '}
                      <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
                        Política de Privacidad
                      </a>
                    </>
                  }
                />
                <Checkbox
                  id="commercial-communications"
                  checked={commercialCommunications}
                  onChange={setCommercialCommunications}
                  error={errors.commercialCommunications}
                  label={
                    <>
                      Acepto la{' '}
                      <a href="/commercial-policy" target="_blank" rel="noopener noreferrer">
                        Política de Comunicaciones Comerciales
                      </a>
                      <br />
                      <a href="/terms-conditions" target="_blank" rel="noopener noreferrer" className="home__underlined">
                        Aplican Términos y Condiciones
                      </a>
                    </>
                  }
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                disabled={isLoading}
                className="home__submit-button"
              >
                {isLoading ? 'Cargando...' : 'Cotiza aquí'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
