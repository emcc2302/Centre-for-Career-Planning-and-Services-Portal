import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const fetchApplicants = async (jobId) => {
  const token = localStorage.getItem("ccps-token");
  try {
    const res = await axiosInstance.get(`/api/applications/job/${jobId}/applicants`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Raw applicants API response:", res.data);
    return res.data.applicants || [];
  } catch (err) {
    console.error("Applicants API error:", err.response?.data || err.message);
    return [];
  }
};

export const updateApplicationStatus = async (id, status) => {
  const token = localStorage.getItem("ccps-token");
  await axiosInstance.put(`/api/applications/status/${id}`, { status }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });``
};

export const saveJob = async (jobId) => {
  const res = await api.post("/api/applications/save", { jobId });
  return res.data;
};

export const fetchSavedApplications = () =>
  api
    .get("/api/applications/saved")
    .then((res) => res.data.savedApplications);
