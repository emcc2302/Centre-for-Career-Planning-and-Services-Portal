import { useState, useEffect } from "react";
const BASE_URL = import.meta.env.VITE_BACKEND_URL+"/api" || 'http://localhost:3000/api';

export const useReferrals = () => {
    const [referrals, setReferrals] = useState([]);

    useEffect(() => {
        fetch(`${BASE_URL}/referrals`)
            .then((res) => res.json())
            .then(setReferrals)
            .catch((err) => console.error(err));
    }, []);

    return { referrals };
};