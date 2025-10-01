// frontend/src/pages/JobManagementPage.jsx (CORRECTED CODE)

import React, { useState, useEffect } from 'react';
import { fetchJobs, deleteJob } from "../../api/jobsApi";
import Sidebar from "../../components/Sidebar";
// import { useAuthContext } from "../../context/AuthContext"; // Use this if possible!

const JobManagementPage = () => {
    // const { authUser } = useAuthContext(); 
    const [jobs, setJobs] = useState([]);

    // 🟢 CORRECTED TOKEN RETRIEVAL FUNCTION
    const getAdminToken = () => {
        const userString = localStorage.getItem('ccps-user');

        if (userString) {
            try {
                const user = JSON.parse(userString);
                // 💡 ASSUMPTION: The token is stored directly as a 'token' property 
                // on the parsed user object. Adjust 'user.token' if your property is 'user.jwt', etc.
                return user.token;
            } catch (e) {
                console.error("Error parsing ccps-user data from localStorage:", e);
                return null;
            }
        }
        return null;
    };
    // ----------------------------------------

    useEffect(() => {
        const loadJobs = async () => {
            const token = getAdminToken();

            if (!token) {
                // This is the error message you are seeing, which is now correctly displayed
                setError('Authentication token is missing. Please log in as Admin.');
                setLoading(false);
                return;
            }

            try {
                // Token is now passed, resolving the 404/401 backend issue
                const data = await fetchJobs(token);
                setJobs(data.jobs || []);
            } catch (err) {
                setError('Failed to load jobs: ' + err.message);
            } finally {
                setLoading(false);
            }
        };
        loadJobs();
    }, []);

    // 1. Handle Delete Function
    const handleDelete = async (jobId, jobTitle) => {
        const token = getAdminToken();
        if (!token) {
            alert('Authentication required to delete job.');
            return;
        }

        const isConfirmed = window.confirm(
            `⚠️ Are you sure you want to delete the job: "${jobTitle}"? This action cannot be undone.`
        );

        if (isConfirmed) {
            try {
                await deleteJob(jobId, token);
                setJobs(jobs.filter(job => job._id !== jobId));
                alert(`Job "${jobTitle}" successfully deleted!`);
            } catch (err) {
                console.error('Deletion error:', err.message);
                alert(`Error deleting job: ${err.message}`);
            }
        }
    };


    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <main className="flex-1 p-6 pt-20 md:pt-8 w-full">
                <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
                    
                    {/* 🟢 STYLING FIX: Green Header */}
                    <div className="bg-[#0c4a42] p-6">
                        <h1 className="text-2xl font-bold text-white">Job Management Portal</h1>
                        <p className="text-green-300 mt-1">Review and manage all active job postings</p>
                    </div>
                    {/* --------------------------- */}
                    
                    <div className="p-6">
                        {/* The table content moves down here */}
                        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                            {jobs.length === 0 ? (
                                <p className="p-4 text-center text-gray-500">No jobs currently posted.</p>
                            ) : (
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {jobs.map((job) => (
                                            <tr key={job._id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{job.jobTitle}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.Company}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button
                                                        onClick={() => handleDelete(job._id, job.jobTitle)}
                                                        className="text-red-600 hover:text-red-900 bg-red-100 hover:bg-red-200 px-3 py-1 rounded-md transition duration-150"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default JobManagementPage;