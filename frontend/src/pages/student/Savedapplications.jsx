import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { fetchSavedApplications } from "../../api/useApply";

const SavedApplications = () => {
  const [savedApps, setSavedApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSavedApps = async () => {
      try {
        const token = localStorage.getItem("ccps-token");
        const res = await fetchSavedApplications(token);
        setSavedApps(res || []);
      } catch (err) {
        console.error("Failed to load saved applications", err);
      } finally {
        setLoading(false);
      }
    };

    getSavedApps();
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Sidebar />
      <main className="flex-1 p-6 pt-20 md:pt-8 w-full max-w-4xl mx-auto">
        <header className="flex flex-col mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-1 font-montserrat">
            <span className="text-[#0fa18e]">Saved</span> Applications
          </h1>
          <p className="text-gray-600 text-lg">
            All opportunities you short-listed for further action
          </p>
        </header>

        <section className="bg-white shadow-2xl rounded-2xl px-6 py-8 min-h-[300px]">
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <svg className="animate-spin text-[#0fa18e] w-10 h-10 mr-3" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-30" cx="12" cy="12" r="10" stroke="#0fa18e" strokeWidth="4"/>
                <path className="opacity-80"
                  fill="#0fa18e"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 10-8 8z"
                />
              </svg>
              <span className="text-gray-600 text-lg font-medium ml-2">Loading saved applications...</span>
            </div>
          ) : savedApps.length === 0 ? (
            <div className="text-center flex flex-col items-center py-12">
              <svg className="w-16 h-16 text-gray-200 mb-4"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2"
                  d="M15.232 15.232l1.768 1.768M6.343 6.343a8 8 0 1111.314 11.314A8 8 0 016.343 6.343z"/>
              </svg>
              <h3 className="text-xl font-semibold text-gray-700 mb-1">No Saved Applications</h3>
              <p className="text-gray-400 text-base">
                You haven’t saved any applications yet.<br/>
                Job postings you bookmark will appear here for quick access!
              </p>
            </div>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {savedApps.map((app) => (
                <li
                  key={app._id}
                  className="relative rounded-xl border border-gray-200 shadow-lg bg-gradient-to-br from-white via-[#f7fefc] to-[#edfcf8]/50 p-5 group transition"
                >
                  <div className="flex gap-3 items-center mb-2">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-emerald-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M16 7a4 4 0 01.88 7.903l1.122 3.372a2 2 0 01-1.903 2.725H7.901a2 2 0 01-1.903-2.725l1.121-3.372A4 4 0 118 7"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#0c4a42] leading-5">
                        {app.jobTitle}
                      </h3>
                      <div className="text-xs text-gray-500 font-medium mt-1">
                        {app.Company}
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <span className="inline-flex items-center text-xs bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1 rounded-full font-medium mr-2">
                      <svg className="w-4 h-4 mr-1 -ml-1 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M12 11v4h3m-3 0a4 4 0 01-4-4"/>
                      </svg>
                      Deadline:{" "}
                      <span className="font-medium ml-1">
                        {app.Deadline ? new Date(app.Deadline).toLocaleDateString() : "N/A"}
                      </span>
                    </span>
                  </div>
                  <a
                    href={app.ApplicationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-[#0fa18e] hover:bg-[#13665b] text-white font-semibold rounded-lg px-5 py-2 mt-2 text-sm shadow transition"
                  >
                    View Job Details
                  </a>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
};

export default SavedApplications;
