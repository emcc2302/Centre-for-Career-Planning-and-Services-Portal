import toast from 'react-hot-toast';
import { useAppContext } from '../../context/AppContext';
import { useState } from 'react';

const useForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    const { backendUrl } = useAppContext();

    const forgotPassword = async (email) => {
        const success = handleInputError({ email });
        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch(`${backendUrl}/api/auth/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            })
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            toast.success("Password Reset Link Sent!");
        }
        catch (error) {
            toast.error(error.message);
        }
        finally {
            setLoading(false);
        }
    };
    return { loading, forgotPassword };
}

export default useForgotPassword


function handleInputError({ email }) {
    if (!email) {
        toast.error('All fields are required');
        return false;
    }
    return true;
}