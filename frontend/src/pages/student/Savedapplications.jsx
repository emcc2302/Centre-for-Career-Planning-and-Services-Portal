import { useEffect } from "react";
import { useAppContext } from "../../context/AppContext";

import Thread from "../../components/DiscussionForum/Thread";
import Sidebar from "../../components/Sidebar";
import useThreadStore from "../../api/thread/useThreadStore";

const DiscussionForum = () => {
  const { setShowAddThread } = useAppContext();
  const { threads, getThreads } = useThreadStore();

  useEffect(() => {
    getThreads();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-grow p-8">
        <h1 className="text-2xl font-montserrat mb-6 text-gray-800">Discussion Forum</h1>

        <div className="bg-white shadow-lg rounded-lg p-6">
          {threads.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold text-[#0367A6] mb-4">
                Welcome to the Discussion Forum
              </h2>
              <p className="text-gray-600 text-lg font-roboto mb-6">
                No threads have been started yet. Be the first to start a meaningful conversation!
              </p>
              <button
                className="bg-[#05F2DB] hover:bg-[#05F2C7] text-white px-6 py-3 rounded font-semibold"
                onClick={() => setShowAddThread(true)}
              >
                + Add Thread
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {[...threads].reverse().map((thread) => (
                <div key={thread._id} className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
                  <Thread thread={thread} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiscussionForum;
