import toast from 'react-hot-toast';
import { useAppContext } from '../../context/AppContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useResetPassword = () => {
    const [loading, setLoading] = useState(false);
    const { backendUrl } = useAppContext();

    const navigate = useNavigate();

    const resetPassword = async (password, confirmPassword, resetToken) => {
        const success = handleInputError({ password, confirmPassword });
        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch(`${backendUrl}/api/auth/reset-password/${resetToken}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ password })
            })
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            toast.success("Password Reset Successful!");
            toast.success('Redirecting to login page...');
        }
        catch (error) {
            toast.error(error.message);
        }
        finally {
            setLoading(false);
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        }
    };
    return { loading, resetPassword };
}

export default useResetPassword


function handleInputError({ password, confirmPassword }) {
    
    if (!password || !confirmPassword) {
        toast.error('All fields are required');
        return false;
    }

    if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        return false;
    }
    return true;
}