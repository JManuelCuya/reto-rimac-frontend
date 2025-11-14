import { User, PlansResponse } from '@/types';

const API_BASE_URL = 'https://rimac-front-end-challenge.netlify.app/api';

export const fetchUser = async (): Promise<User> => {
  try {
    const response = await fetch(`${API_BASE_URL}/user.json`);
    if (!response.ok) {
      throw new Error('Error fetching user data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const fetchPlans = async (): Promise<PlansResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/plans.json`);
    if (!response.ok) {
      throw new Error('Error fetching plans data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching plans:', error);
    throw error;
  }
};
