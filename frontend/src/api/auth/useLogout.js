import {useState} from 'react'
import { useAuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { useAppContext } from '../../context/AppContext';

const useLogout = () => {
   const [loading, setLoading] = useState(false);
   const {setAuthUser} = useAuthContext();
   const { backendUrl } = useAppContext();

   const logout = async()=>{
    setLoading(true);
    try{
        const res = await fetch(`${backendUrl}/api/auth/logout`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json();
        if(data.error) {throw new Error(data.error);}
        localStorage.removeItem('ccps-user');
        localStorage.removeItem('ccps-token');
        setAuthUser(null);
    }
    catch(error){
        toast.error(error.message);
    }
    finally{
        setLoading(false);
    }
   }
    return {loading, logout};
}

export default useLogout