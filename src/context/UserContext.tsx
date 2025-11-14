import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, FormData, Plan, UserType, UserContextType } from '@/types';

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [userType, setUserType] = useState<UserType | null>(null);

  return (
    <UserContext.Provider
      value={{
        user,
        formData,
        selectedPlan,
        userType,
        setUser,
        setFormData,
        setSelectedPlan,
        setUserType,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
