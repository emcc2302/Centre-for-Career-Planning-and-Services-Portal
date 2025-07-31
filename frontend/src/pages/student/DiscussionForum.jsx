import { useEffect } from "react";
import { useAppContext } from "../../context/AppContext";

import Sidebar from "../../components/Sidebar";
import Thread from "../../components/DiscussionForum/Thread";
import useThreadStore from "../../api/thread/useThreadStore";

const DiscussionForum = () => {
  const { setShowAddThread } = useAppContext();
  const { threads, getThreads } = useThreadStore();

  useEffect(() => {
    getThreads();
  }, []); // ✅ Don't include [threads] to avoid unnecessary loop

  return (
    <div className="flex flex-col md:flex-row bg-[#f9fafb] min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      
      <main className="flex-grow px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
            <h1 className="text-3xl font-bold text-[#0c4a42]">Discussion Forum</h1>
            <button
              className="bg-[#036756] hover:bg-[#025d4a] text-white font-medium px-6 py-2 rounded-lg shadow-md transition"
              onClick={() => setShowAddThread(true)}
            >
              + Add Thread
            </button>
          </div>

          <div className="bg-white rounded-xl shadow p-6 min-h-[300px]">
            {threads.length === 0 ? (
              <div className="text-center py-16">
                <h2 className="text-2xl font-bold text-[#036756] mb-4">
                  Welcome to the Discussion Forum
                </h2>
                <p className="text-gray-700 text-lg mb-6">
                  Be the first to start a conversation. Click the{" "}
                  <span className="font-semibold">+ Add Thread</span> button to get started!
                </p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
                {[...threads].reverse().map((thread) => (
                  <div
                    key={thread._id}
                    className="bg-gray-50 border border-gray-200 rounded-lg shadow-sm p-4"
                  >
                    <Thread thread={thread} refreshThreads={getThreads} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DiscussionForum;
