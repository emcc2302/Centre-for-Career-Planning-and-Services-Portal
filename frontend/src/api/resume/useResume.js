import { useState } from 'react';
const BASE_URL = import.meta.env.VITE_BACKEND_URL+"/api" || 'http://localhost:3000/api';

export const useResume = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateResume = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/resume/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const blobData = await response.blob();
      
      const url = window.URL.createObjectURL(blobData);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${formData.personalInfo.name.replace(/\s+/g, '_')}_resume.pdf`);
      document.body.appendChild(link);
      link.click();
      
      window.URL.revokeObjectURL(url);
      link.remove();
      
      setLoading(false);
      return true;
    } catch (error) {
      console.error('Error generating resume:', error);
      setError(`Failed to generate resume: ${error.message}`);
      setLoading(false);
      return false;
    }
  };

  return {
    loading,
    error,
    generateResume
  };
};