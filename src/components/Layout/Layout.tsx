import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import './Layout.scss';

const Layout: React.FC = () => {
  const location = useLocation();
  const showFooter = location.pathname === '/';

  return (
    <>
      <Header />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Outlet />
      </main>
      {showFooter && <Footer />}
    </>
  );
};

export default Layout;
