import {useState} from 'react'
import toast from 'react-hot-toast'
const BASE_URL = import.meta.env.VITE_BACKEND_URL+"/api" || 'http://localhost:3000/api';

const useGetAnalytics = () => {
    const [loading, setLoading] = useState(false);
    const getAnalytics = async() => {
        setLoading(true)
        try {
            const res = await fetch(`${BASE_URL}/stats`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data = await res.json();
            if(!res.ok || !data){
                throw new Error(data.message)
            }
            return data[0];
        } catch (error) {
            toast.error(error.message);
        }
        finally{
            setLoading(false)
        }
    }
    return {loading, getAnalytics}
}

export default useGetAnalytics;