import axios from 'axios';

const BACKEND_ROOT = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
const BASE_URL = BACKEND_ROOT.endsWith('/api')
  ? BACKEND_ROOT
  : BACKEND_ROOT.replace(/\/$/, '') + '/api';

export const createJobPosting = async (jobData, token) => {
  const payload = {
    ...jobData,
    requiredSkills: jobData.requiredSkills
      .split(',')
      .map((skill) => skill.trim()),
    batch: parseInt(jobData.batch, 10),
    relevanceScore: jobData.relevanceScore
      ? parseFloat(jobData.relevanceScore)
      : undefined,
  };
  
  const res = await axios.post(`${BASE_URL}/jobs`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
};