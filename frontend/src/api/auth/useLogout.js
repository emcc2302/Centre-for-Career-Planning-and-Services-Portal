import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext.jsx';
import { useAppContext } from '../../context/AppContext.jsx';

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const { backendUrl } = useAppContext();
  const navigate = useNavigate();

  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${backendUrl}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include', 
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Logout failed');
      }

      localStorage.removeItem('ccps-user');
      localStorage.removeItem('ccps-token');
      setAuthUser(null);
      toast.success('Logged out successfully!');
      navigate('/login');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};

export default useLogout;
