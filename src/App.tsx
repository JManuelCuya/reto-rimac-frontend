import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from '@/context/UserContext';
import Layout from '@/components/Layout/Layout';
import Home from '@/pages/Home/Home';
import PlanSelection from '@/pages/PlanSelection/PlanSelection';
import Summary from '@/pages/Summary/Summary';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="select-user" element={<PlanSelection />} />
            <Route path="summary" element={<Summary />} />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
