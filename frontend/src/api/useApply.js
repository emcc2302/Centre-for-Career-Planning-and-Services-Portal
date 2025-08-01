import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("ccps-token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const fetchJobs = () =>
  api.get("/api/jobs").then((res) => res.data.jobs);

export const fetchMyApplications = () =>
  api
    .get("/api/applications/student-applications")
    .then((res) => ({
      onCampus: res.data.onCampusApplications,
      offCampus: res.data.offCampusApplications,
    }));

export const applyToJob = (data) =>
  api.post("/api/applications/apply", data).then((res) => res.data);
