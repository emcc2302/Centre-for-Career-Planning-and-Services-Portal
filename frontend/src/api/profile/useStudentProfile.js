console.log("VITE_BACKEND_URL is:", import.meta.env.VITE_BACKEND_URL);

const BASE_URL = import.meta.env.VITE_BACKEND_URL+"/api/profile" || "http://localhost:3000/api/profile";

  export const createStudentProfile = async (userId, data) => {
    const res = await fetch(`${BASE_URL}/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Failed to create profile");
    }

    return await res.json();
  };


  export const getStudentProfile = async (userId) => {
    const res = await fetch(`${BASE_URL}/${userId}`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch profile");
    }

    return await res.json();
  };  

  export const updateStudentProfile = async (userId,data) => {
    const res = await fetch(`${BASE_URL}/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Failed to update profile");
    }

    return await res.json();
  };
