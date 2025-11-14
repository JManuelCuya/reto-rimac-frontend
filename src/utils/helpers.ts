export const validateDNI = (dni: string): boolean => {
  return /^\d{8}$/.test(dni);
};

export const validateCE = (ce: string): boolean => {
  return /^\d{9}$/.test(ce);
};

export const validatePhone = (phone: string): boolean => {
  return /^\d{9}$/.test(phone);
};

export const calculateAge = (birthDate: string): number => {
  // birthDate format: DD-MM-YYYY
  const [day, month, year] = birthDate.split('-').map(Number);
  const birth = new Date(year, month - 1, day);
  const today = new Date();
  
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
};

export const formatPrice = (price: number): string => {
  return `S/ ${price.toFixed(2)}`;
};
