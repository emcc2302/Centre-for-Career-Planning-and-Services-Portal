// frontend/src/api/jobsApi.js

// 1. Define the Backend Root URL and the Base API URL
const BACKEND_ROOT = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

// This logic ensures BASE_URL is the root API path, e.g., 'http://localhost:3000/api'
const BASE_URL = BACKEND_ROOT.endsWith('/api')
    ? BACKEND_ROOT
    : BACKEND_ROOT.replace(/\/$/, '') + '/api';

// 🟢 CRITICAL FIX: Define the specific resource endpoint.
// Assuming your Express app uses: app.use('/api/jobs', jobRoutes)
const JOBS_ENDPOINT = `${BASE_URL}/jobs`; 

/**
 * Fetches the list of all job postings.
 * @param {string} token - The authorization token.
 * @returns {Promise<object>} The response data from the server.
 */
export const fetchJobs = async (token) => {
    // 🔑 Fix: Use the correct, full endpoint: /api/jobs
    const response = await fetch(JOBS_ENDPOINT, { 
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // Crucial: Pass the authentication token
            'Authorization': `Bearer ${token}`, 
        },
    });

    if (!response.ok) {
        // Attempt to parse the server's error message for better debugging
        const errorData = await response.json().catch(() => ({ message: 'Server did not return JSON.' }));
        // Throws a more informative error. Your `JobManagementPage.jsx` catches this.
        throw new Error(errorData.message || `Failed to fetch jobs (Status: ${response.status})`);
    }
    
    // Assuming your jobList controller returns an object like { message: ..., jobs: [...] }
    return response.json();
};

/**
 * Deletes a job posting by its ID.
 * @param {string} jobId - The ID of the job to delete.
 * @param {string} token - The authorization token.
 * @returns {Promise<object>} The response data from the server.
 */
export const deleteJob = async (jobId, token) => {
    // 🔑 Use the correct endpoint for deletion: /api/jobs/:id
    const response = await fetch(`${JOBS_ENDPOINT}/${jobId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            // Crucial: Pass the authentication token
            'Authorization': `Bearer ${token}`, 
        },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Server did not return JSON.' }));
        throw new Error(errorData.message || `Failed to delete job (Status: ${response.status})`);
    }

    return response.json();
};

// You should also have a create function for completeness and consistency
/**
 * Creates a new job posting.
 * @param {object} jobData - The job form data.
 * @param {string} token - The authorization token.
 * @returns {Promise<object>} The created job data.
 */
export const createJobPosting = async (jobData, token) => {
    const response = await fetch(JOBS_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(jobData),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Server did not return JSON.' }));
        throw new Error(errorData.message || `Failed to create job (Status: ${response.status})`);
    }

    return response.json();
};