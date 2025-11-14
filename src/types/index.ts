export interface User {
  name: string;
  lastName: string;
  birthDay: string;
}

export interface Plan {
  name: string;
  price: number;
  description: string[];
  age: number;
  type?: 'house' | 'clinic';
}

export interface PlansResponse {
  list: Plan[];
}

export interface FormData {
  documentType: 'DNI' | 'CE';
  documentNumber: string;
  phoneNumber: string;
  privacyPolicy: boolean;
  commercialCommunications: boolean;
}

export type UserType = 'self' | 'other';

export interface UserContextType {
  user: User | null;
  formData: FormData | null;
  selectedPlan: Plan | null;
  userType: UserType | null;
  setUser: (user: User | null) => void;
  setFormData: (data: FormData | null) => void;
  setSelectedPlan: (plan: Plan | null) => void;
  setUserType: (type: UserType | null) => void;
}
