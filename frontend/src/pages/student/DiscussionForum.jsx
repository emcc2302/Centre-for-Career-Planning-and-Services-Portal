import { useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import Sidebar from "../../components/Sidebar";
import Thread from "../../components/DiscussionForum/Thread";
import useThreadStore from "../../api/thread/useThreadStore";

const DiscussionForum = () => {
  const { setShowAddThread, threadAdded } = useAppContext();
  const { threads, getThreads } = useThreadStore();

  useEffect(() => {
    getThreads();
    window.scrollTo(0, 0);
  }, [threadAdded]); // reload when a thread is added

  return (
    <div className="flex min-h-screen bg-[#f9fafb]">
      <Sidebar />
      <main className="flex-1 px-2 sm:px-4 md:px-8 py-4 flex flex-col">
        <div className="flex flex-col flex-1 h-full">
          <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
            <h1 className="text-3xl font-bold text-[#0c4a42] mt-14 md:mt-0">Discussion Forum</h1>
            <button
              className="bg-[#036756] hover:bg-[#025d4a] text-white font-medium px-6 py-2 rounded-lg shadow-md transition"
              onClick={() => setShowAddThread(true)}
            >
              + Add Thread
            </button>
          </div>
          <div className="flex-1 flex flex-col bg-white rounded-xl shadow p-4 sm:p-6 min-h-[300px]">
            {threads.length === 0 ? (
              <div className="flex flex-col items-center justify-center flex-1 py-16">
                <h2 className="text-2xl font-bold text-[#036756] mb-2">
                  Welcome to the Discussion Forum
                </h2>
                <p className="text-gray-700 text-lg mb-6">
                  Be the first to start a conversation. Click the{" "}
                  <span className="font-semibold">+ Add Thread</span> button to get started!
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-6 flex-1">
                {[...threads].reverse().map((thread) => (
                  <Thread key={thread._id} thread={thread} refreshThreads={getThreads} />
                ))}
              </div>
            )}
            <div className="mt-8 flex justify-center">
              <p className="text-gray-400 text-sm italic">No more messages</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DiscussionForum;
