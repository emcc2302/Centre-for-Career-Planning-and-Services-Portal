import { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../../context/AuthContext';
import { useAppContext } from '../../context/AppContext';

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setTempUserId } = useAuthContext();
    const { backendUrl, setShowVerifyEmail } = useAppContext();

    const signup = async ({ name, email, password, confirmPassword, role }) => {
        const success = handleInputError({ name, email, password, confirmPassword, role });
        if (!success) return;
        setLoading(true);
        try {
            const res = await fetch(`${backendUrl}/api/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password, role })
            })
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            //   localStorage.setItem('ccps-user',JSON.stringify(data));
            //   setAuthUser(data);
            // not setting authUser here because user is not verified yet
            setTempUserId(data.userId);
            setShowVerifyEmail(true);
            toast.success("Verification email sent successfully!");
        }
        catch (error) {
            toast.error(error.message);
        }
        finally {
            setLoading(false);
        }
    };
    return { loading, signup };
}

function handleInputError({ name, email, password, confirmPassword, role }) {
    if (!name || !email || !password || !confirmPassword || !role) {
        toast.error('All fields are required');
        return false;
    }
    if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        return false;
    }
    return true;
}


export default useSignup