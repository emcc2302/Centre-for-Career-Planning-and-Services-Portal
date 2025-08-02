import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useAuthContext } from '../context/AuthContext';
import { useReferrals } from '../api/referrals/useReferrals';
import { useRequestReferral } from '../api/referrals/useRequestReferral';
import { useDeleteReferral } from '../api/referrals/useDeleteReferral';
import { useProvideReferral } from '../api/referrals/useProvideReferral';

function Referrals() {
  const { authUser } = useAuthContext();
  const { referrals } = useReferrals();
  const { requestReferral } = useRequestReferral();
  const { deleteReferral } = useDeleteReferral();
  const { provideReferral, isSubmitting: isProvidingReferral } = useProvideReferral();

  const [referralList, setReferralList] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [jobId, setJobId] = useState("");
  const [resumeLink, setResumeLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [activeReferralId, setActiveReferralId] = useState(null);
  const [referralLinkInput, setReferralLinkInput] = useState("");

  useEffect(() => {
    setReferralList(referrals);
  }, [referrals]);

  const handleRequestReferral = async (e) => {
    e.preventDefault();
    if (!companyName || !jobId || !resumeLink) {
      alert("Please fill all fields");
      return;
    }
    setIsSubmitting(true);
    try {
      await requestReferral({ companyName, jobId, resumeLink });
      // Ideally, you will refetch referrals, here we update local state for responsiveness
      const newReferral = {
        _id: Date.now().toString(),
        studentName: authUser.name,
        studentEmail: authUser.email,
        companyName,
        jobId,
        resumeLink,
        createdAt: new Date().toISOString(),
      };
      setReferralList([newReferral, ...referralList]);
      setCompanyName(""); setJobId(""); setResumeLink("");
    } catch (error) {
      alert("Failed to submit referral request");
    }
    setIsSubmitting(false);
  };

  const handleDeleteReferral = async (referralId) => {
    if (window.confirm("Are you sure you want to delete this referral request?")) {
      try {
        await deleteReferral(referralId);
        setReferralList(referralList.filter(ref => ref._id !== referralId));
      } catch (error) {
        alert("Failed to delete referral request");
      }
    }
  };

  const handleToggleProvideReferral = (referralId) => {
    if (activeReferralId === referralId) {
      setActiveReferralId(null); setReferralLinkInput("");
    } else {
      setActiveReferralId(referralId); setReferralLinkInput("");
    }
  };

  const handleProvideReferral = async (referralId) => {
    if (!referralLinkInput.trim()) {
      alert("Please enter a referral link");
      return;
    }
    try {
      await provideReferral(referralId, referralLinkInput);
      setReferralList(referralList.map(ref =>
        ref._id === referralId
          ? { ...ref, referralLink: referralLinkInput, alumniEmail: authUser.email }
          : ref
      ));
      setActiveReferralId(null); setReferralLinkInput("");
      alert("Referral link provided successfully");
    } catch (error) {
      alert("Failed to provide referral link");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatUrl = (url) => {
    if (!url) return "";
    return url.startsWith('http') ? url : `https://${url}`;
  };

  return (
    <div className="flex min-h-screen bg-[#f9fafb]">
      <Sidebar />
      <main className="flex-1 flex flex-col px-2 md:px-8 py-6">
        <h1 className="text-3xl font-bold text-[#0c4a42] mb-8 mt-14 md:mt-0">Referral Request</h1>
        <div className="flex-1 flex flex-col lg:flex-row gap-8">

          {/* Active Requests */}
          <section className="flex-1 bg-white rounded-2xl shadow-md p-6 flex flex-col max-h-[85vh] overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-5">Active Requests</h2>
            {referralList && referralList.length > 0 ? (
              <div className="flex flex-col gap-4">
                {referralList.map((ref) => (
                  <div key={ref._id} className="border border-gray-200 rounded-xl p-4 bg-white hover:shadow-sm transition relative flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1 text-[#036756]">{ref.companyName}</h3>
                      <p className="text-gray-700 text-base">Job ID: <span className="font-semibold">{ref.jobId}</span></p>
                      <p className="text-gray-500 text-sm mt-1">Requested by: {ref.studentName}</p>
                      {ref.createdAt && (
                        <p className="text-gray-400 text-xs">Posted on: {formatDate(ref.createdAt)}</p>
                      )}
                      {ref.referralLink && authUser.email === ref.studentEmail && (
                        <div className="mt-2 rounded bg-emerald-50 px-2 py-1">
                          <span className="text-emerald-700 font-semibold">Referral:</span>{" "}
                          <a
                            href={formatUrl(ref.referralLink)}
                            className="text-blue-600 underline break-all"
                            target="_blank" rel="noopener noreferrer"
                          >{ref.referralLink}</a>
                          <p className="text-gray-400 text-xs">Provided by: {ref.alumniEmail}</p>
                        </div>
                      )}
                      {ref.resumeLink && (
                        <div className="mt-2">
                          <a
                            href={formatUrl(ref.resumeLink)}
                            target="_blank" rel="noopener noreferrer"
                            className="text-blue-500 hover:text-blue-700 text-sm underline"
                          >View Resume</a>
                        </div>
                      )}

                      {/* Provide Referral Input */}
                      {activeReferralId === ref._id && (
                        <div className="mt-3 flex items-center gap-2">
                          <input
                            type="text"
                            value={referralLinkInput}
                            onChange={(e) => setReferralLinkInput(e.target.value)}
                            placeholder="Enter referral link"
                            className="flex-1 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-[1.5px] focus:ring-emerald-500 text-sm"
                          />
                          <button
                            onClick={() => handleProvideReferral(ref._id)}
                            disabled={isProvidingReferral}
                            className={`bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-4 py-1 rounded-md text-sm transition ${isProvidingReferral ? 'opacity-70 cursor-not-allowed' : ''}`}
                          >
                            {isProvidingReferral ? 'Sending...' : 'Send'}
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="md:self-start flex flex-row gap-2 mt-4 md:mt-0 md:flex-col ml-0 md:ml-4">
                      {authUser.role === "alumni" && !ref.referralLink && (
                        <button
                          onClick={() => handleToggleProvideReferral(ref._id)}
                          className="bg-emerald-100 hover:bg-emerald-200 text-emerald-700 font-semibold px-3 py-1 rounded-lg text-sm"
                        >
                          {activeReferralId === ref._id ? 'Cancel' : 'Provide Referral'}
                        </button>
                      )}
                      {authUser.email === ref.studentEmail && (
                        <button
                          onClick={() => handleDeleteReferral(ref._id)}
                          className="bg-red-100 hover:bg-red-200 text-red-700 font-semibold px-3 py-1 rounded-lg text-sm"
                        >Delete</button>
                      )}
                    </div>

                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center flex-1 py-16 text-gray-400">
                No referral requests found
              </div>
            )}
          </section>

          {/* Request a Referral / Info */}
          <aside className="w-full lg:w-[350px] bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-5 border-b text-gray-700 pb-2">
              {authUser.role === "student" ? "Request a Referral" : "Referral Information"}
            </h2>
            {authUser.role === "student" ? (
              <form onSubmit={handleRequestReferral} className="space-y-5">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Company Name</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Google, Amazon"
                    className="w-full px-3 py-2 border border-gray-200 bg-[#f9fafb] rounded-md text-base focus:outline-none focus:ring-[1.5px] focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Job ID / Position</label>
                  <input
                    type="text"
                    value={jobId}
                    onChange={(e) => setJobId(e.target.value)}
                    placeholder="e.g. SWE-123456 or Software Engineer"
                    className="w-full px-3 py-2 border border-gray-200 bg-[#f9fafb] rounded-md text-base focus:outline-none focus:ring-[1.5px] focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Resume Link</label>
                  <input
                    type="text"
                    value={resumeLink}
                    onChange={(e) => setResumeLink(e.target.value)}
                    placeholder="https://drive.google.com/..."
                    className="w-full px-3 py-2 border border-gray-200 bg-[#f9fafb] rounded-md text-base focus:outline-none focus:ring-[1.5px] focus:ring-emerald-500"
                    required
                  />
                  <p className="text-xs text-gray-400 mt-1">Provide a public link to your resume</p>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-2 px-4 rounded-lg text-white text-base font-semibold ${isSubmitting ? 'bg-emerald-300 cursor-not-allowed' : 'bg-emerald-500 hover:bg-emerald-700'} transition duration-200`}
                >
                  {isSubmitting ? 'Submitting...' : 'Request Referral'}
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-center text-gray-400 py-10">
                Only students can request referrals
              </div>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
}

export default Referrals;
