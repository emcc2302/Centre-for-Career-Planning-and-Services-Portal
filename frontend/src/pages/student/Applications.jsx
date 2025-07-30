import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { fetchJobs, fetchMyApplications } from "../../api/useApply";
import Sidebar from "../../components/Sidebar";
import ApplyModal from "../../components/ApplyModel";

const Applications = () => {
  const [jobs, setJobs] = useState([]);
  const [myApps, setMyApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [search, setSearch] = useState("");

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

  const filteredJobs = jobs.filter((job) =>
    job.jobTitle.toLowerCase().includes(search.toLowerCase())
  );

  const grouped = {
    onCampus: filteredJobs.filter((job) => job.Type === "On-Campus"),
    offCampus: filteredJobs.filter((job) => job.Type === "Off-Campus"),
  };

  const renderJobs = (jobsList) =>
    jobsList.length === 0 ? (
      <div className="text-gray-500 text-sm">No jobs available.</div>
    ) : (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobsList.map((job) => {
          const application = myApps.find((a) => a.jobId._id === job._id);
          const applied = !!application;
          const status = application?.status;

          return (
            <div
              key={job._id}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold text-[#0c4a42]">
                {job.jobTitle}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {job.Company} &nbsp;•&nbsp; <em>{job.Type}</em>
              </p>
              <p className="text-sm text-gray-700 mt-3 line-clamp-3">
                {job.jobDescription}
              </p>

              <div className="flex items-center justify-between mt-5">
                {applied ? (
                  <span className="px-3 py-1 text-green-800 bg-green-100 rounded-full text-xs font-medium">
                    {status}
                  </span>
                ) : (
                  <button
                    onClick={() => openApplyModal(job)}
                    className="text-sm px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Apply
                  </button>
                )}
                <span className="text-xs text-gray-500">
                  Deadline:{" "}
                  {job.Deadline
                    ? new Date(job.Deadline).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    );

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Sidebar />
        <span className="text-sm text-gray-600">Loading job listings...</span>
      </div>
    );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="text-3xl font-semibold text-[#0c4a42]">Job Board</h1>
          <input
            type="text"
            placeholder="Search job title..."
            className="px-4 py-2 w-full sm:w-64 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring focus:border-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <section className="space-y-10">
          <div>
            <h2 className="text-2xl font-medium text-[#0c4a42] mb-4">
              On-Campus Jobs
            </h2>
            {renderJobs(grouped.onCampus)}
          </div>

          <div>
            <h2 className="text-2xl font-medium text-[#0c4a42] mb-4">
              Off-Campus Jobs
            </h2>
            {renderJobs(grouped.offCampus)}
          </div>
        </section>
      </main>

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
