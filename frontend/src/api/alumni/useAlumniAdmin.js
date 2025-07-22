import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const BASE_URL =
  import.meta.env.VITE_BACKEND_URL + "/api/alumni" ||
  "http://localhost:3000/api/alumni";

const useAlumniAdmin = () => {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all alumni
  const fetchAllAlumni = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}`);
      const data = await res.json();
      if (!res.ok || data.message) {
        throw new Error(data.message || "Failed to fetch alumni");
      }
      setAlumni(data);
    } catch (error) {
      toast.error(error.message || "Error loading alumni");
    } finally {
      setLoading(false);
    }
  };

  // Add alumni
  const addAlumni = async (formData, token) => {
    try {
      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add alumni");

      toast.success("Alumni added successfully!");
      await fetchAllAlumni();
    } catch (error) {
      toast.error(error.message || "Error adding alumni");
    }
  };

  // Delete alumni
  const deleteAlumni = async (id, token) => {
    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete alumni");

      toast.success("Alumni deleted successfully!");
      await fetchAllAlumni();
    } catch (error) {
      toast.error(error.message || "Error deleting alumni");
    }
  };

  // Update alumni
  const updateAlumni = async (id, updatedData, token) => {
    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update alumni");

      toast.success("Alumni updated successfully!");
      await fetchAllAlumni();
    } catch (error) {
      toast.error(error.message || "Error updating alumni");
    }
  };

  useEffect(() => {
    fetchAllAlumni();
  }, []);

  return {
    alumni,
    loading,
    addAlumni,
    deleteAlumni,
    updateAlumni,
    refetch: fetchAllAlumni,
  };
};

export default useAlumniAdmin;
