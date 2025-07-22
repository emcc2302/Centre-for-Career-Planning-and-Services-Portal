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
  } , [threads]);

  return (
    <>
      <div className="flex h-screen">
        <Sidebar />

        <section className="relative pt-16 md:pt-0 min-h-screen bg-gray-100 flex-1 flex flex-col items-center overflow-y-auto ">
          {/* Threads List */}
          <div className="w-full max-w-5xl p-4 space-y-3 overflow-y-auto">
            {[...threads].reverse().map((thread) => (
              <div key={thread._id} className="p-4 bg-white rounded-lg shadow">
                <Thread thread={thread} />
              </div>
            ))}
          </div>

          {/* Fixed Add Thread Button */}
          <div className="fixed bottom-4">
            <button
              className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg"
              onClick={() => setShowAddThread(true)}
            >
              + Add Thread
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default DiscussionForum;
