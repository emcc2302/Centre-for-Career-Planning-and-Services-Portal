import { toast } from "react-hot-toast";
import  { useEffect, useState } from "react";
import { fetchJobs, fetchMyApplications } from "../../api/useApply";

import Sidebar from "../../components/Sidebar";
import ApplyModal from "../../components/ApplyModel";

const Applications = () => {
  const [jobs, setJobs] = useState([]);
  const [myApps, setMyApps] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const loadAll = async () => {
    try {
      const [jobList, { onCampus, offCampus }] = await Promise.all([
        fetchJobs(),
        fetchMyApplications(),
      ]);
      setJobs(jobList);
      setMyApps([...onCampus, ...offCampus]);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load jobs/applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const openApplyModal = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };


  const handleApplied = async () => {
    try {
      const { onCampus, offCampus } = await fetchMyApplications();
      setMyApps([...onCampus, ...offCampus]);
    } catch (err) {
      console.error("Error refreshing applications:", err);
    }
  };

  if (loading) return <div className="p-6">Loading…</div>;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 max-w-4xl mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold">Job Board</h1>
        <ul className="grid gap-4 sm:grid-cols-2">
          {jobs.map((job) => {
            const applied = myApps.some(
              (a) => a.jobId._id === job._id
            );
            const status = applied
              ? myApps.find((a) => a.jobId._id === job._id).status
              : null;

            return (
              <li
                key={job._id}
                className="bg-white p-4 rounded-lg shadow flex flex-col"
              >
                <h2 className="text-xl font-semibold">{job.jobTitle}</h2>
                <p className="text-sm text-gray-600">
                  {job.Company} • <em>{job.Type}</em>
                </p>
                <p className="mt-2 text-gray-800 line-clamp-3">
                  {job.jobDescription}
                </p>
                <div className="mt-auto flex items-center justify-between pt-4">
                  {status ? (
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded">
                      {status}
                    </span>
                  ) : (
                    <button
                      onClick={() => openApplyModal(job)}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Apply
                    </button>
                  )}
                  <span className="text-xs text-gray-500">
                    Deadline: {new Date(job.Deadline).toLocaleDateString()}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {isModalOpen && selectedJob && (
        <ApplyModal
          jobId={selectedJob._id}
          applicationLink={selectedJob.ApplicationLink}
          onClose={() => setIsModalOpen(false)}
          onApplied={handleApplied}
        />
      )}
    </div>
  );
};

export default Applications;
