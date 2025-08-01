import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import ApplyModal from "../../components/ApplyModel";
import { fetchSavedApplications } from "../../api/useSavedJobs";
import { fetchMyApplications } from "../../api/useApply";
import { toast } from "react-hot-toast";

const SavedApplicationsPage = () => {
  const [savedApps, setSavedApps] = useState([]);
  const [myApps, setMyApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const loadAll = async () => {
      try {
        const [saved, apps] = await Promise.all([fetchSavedApplications(), fetchMyApplications()]);
        setSavedApps(saved);
        setMyApps([...(apps.onCampus || []), ...(apps.offCampus || [])]);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load saved/applications data");
      } finally {
        setLoading(false);
      }
    };
    loadAll();
  }, []);

  const openApplyModal = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleApplied = async () => {
    try {
      const apps = await fetchMyApplications();
      setMyApps([...(apps.onCampus || []), ...(apps.offCampus || [])]);
    } catch {
      toast.error("Failed to refresh applications");
    }
  };

  const formatDate = (d) =>
    d ? new Date(d).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : "N/A";

  if (loading)
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-4 border-green-600"></div>
        </main>
      </div>
    );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Sidebar />
      <main className="flex-1 pt-20 md:pt-10 px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 font-montserrat">
          <span className="text-[#13665b]">Saved</span> Applications
        </h1>

        {savedApps.length === 0 ? (
          <p className="text-gray-600 text-lg">No saved applications yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {savedApps.map((saved) => {
              const job = saved.jobId;
              if (!job) return null;

              // Check if applied
              const application = myApps.find((a) => a.jobId._id === job._id);
              const applied = !!application;
              const status = application?.status;

              const isOnCampus = job.Type === "on-campus" || job.Type === "On-Campus";
              const typePill = isOnCampus
                ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                : "bg-purple-100 text-purple-700 border border-purple-200";
              const typeDot = isOnCampus ? "bg-emerald-500" : "bg-purple-500";

              return (
                <div
                  key={saved._id}
                  className="group relative bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:bg-blue-50 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-transparent to-indigo-50/0 group-hover:from-blue-50/30 group-hover:to-indigo-50/30 transition-all duration-300 rounded-2xl pointer-events-none"></div>

                  {/* Job Type Badge */}
                  <div className="flex justify-between mb-4 relative z-10">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${typePill}`}
                    >
                      <span className={`w-2 h-2 rounded-full mr-2 ${typeDot}`}></span>
                      {job.Type}
                    </span>
                  </div>

                  {/* Job Title */}
                  <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#0c4a42] transition-colors duration-200 relative z-10 line-clamp-2">
                    {job.jobTitle}
                  </h2>

                  {/* Company Info */}
                  <div className="flex items-center mb-4 relative z-10">
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center mr-3 group-hover:from-blue-100 group-hover:to-indigo-100 transition-all duration-300">
                      <svg
                        className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{job.Company}</p>
                      <p className="text-xs text-gray-500">Company</p>
                    </div>
                  </div>

                  {/* Description truncated */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3 relative z-10">
                    {job.jobDescription}
                  </p>

                  {/* Footer: Apply button / Applied status and Details link */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 relative z-10">
                    <div className="flex flex-col">
                      {applied ? (
                        <span
                          className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold ${
                            status === "Accepted"
                              ? "bg-green-100 text-green-800 border border-green-200"
                              : status === "Rejected"
                              ? "bg-red-100 text-red-800 border border-red-200"
                              : "bg-yellow-100 text-yellow-800 border border-yellow-200"
                          }`}
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full mr-2 ${
                              status === "Accepted"
                                ? "bg-green-500"
                                : status === "Rejected"
                                ? "bg-red-500"
                                : "bg-yellow-500"
                            }`}
                          ></div>
                          {status || "Applied"}
                        </span>
                      ) : (
                        <button
                          onClick={() => openApplyModal(job)}
                          className="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                        >
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                          Apply Now
                        </button>
                      )}
                    </div>
                    <a
                      href={job.ApplicationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline text-sm font-medium"
                    >
                      Details
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {/* Apply Modal */}
        {isModalOpen && selectedJob && (
          <ApplyModal
            jobId={selectedJob._id}
            applicationLink={selectedJob.ApplicationLink}
            onClose={() => setIsModalOpen(false)}
            onApplied={handleApplied}
          />
        )}
      </main>
    </div>
  );
};

export default SavedApplicationsPage;
