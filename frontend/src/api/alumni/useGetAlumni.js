import { useState } from "react";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_BACKEND_URL + "/api/alumni" || 'http://localhost:3000/api/alumni';

const useGetAlumniByType = () => {
  const [loading, setLoading] = useState(false);

  const getAlumni = async (type, search) => {
    if (!search?.trim()) {
      toast.error("Please enter a value to search");
      return [];
    }

    setLoading(true);
    let url = "";

    switch (type) {
      case "jobId":
        url = `${BASE_URL}/search-by-id?jobId=${search}`;
        break;
      case "jobRole":
        url = `${BASE_URL}/search-by-role?jobRole=${search}`;
        break;
      case "company":
        url = `${BASE_URL}/search-by-company?company=${search}`;
        break;
      case "batch":
        url = `${BASE_URL}/search-by-batch?batch=${search}`;
        break;
      case "name":
        url = `${BASE_URL}/search-by-name?name=${search}`;
        break;
      default:
        toast.error("Invalid search type");
        return [];
    }

    try {
      const res = await fetch(url);
      const data = await res.json();
      if (!res.ok || data.message) throw new Error(data.message || "Something went wrong");
      return data;
    } catch (error) {
      toast.error(error.message || "Error fetching alumni");
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { loading, getAlumni };
};

export default useGetAlumniByType;
