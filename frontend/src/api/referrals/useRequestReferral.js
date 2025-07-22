import { useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
const BASE_URL = import.meta.env.VITE_BACKEND_URL+"/api" || 'http://localhost:3000/api';

export const useRequestReferral = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const { authUser } = useAuthContext();

  const requestReferral = async (referralData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/referrals/request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include', // Include if using session cookies
        body: JSON.stringify({
          studentName: authUser.name,
          studentEmail: authUser.email,
          ...referralData
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to request referral');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      setError(error.message || 'Error requesting referral');
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { requestReferral, isSubmitting, error };
};