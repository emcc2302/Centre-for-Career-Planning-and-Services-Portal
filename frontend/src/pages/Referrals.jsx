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
      await requestReferral({
        companyName,
        jobId,
        resumeLink
      });
      
      const newReferral = {
        _id: Date.now().toString(),
        studentName: authUser.name,
        studentEmail: authUser.email,
        companyName,
        jobId,
        resumeLink,
        createdAt: new Date().toISOString()
      };
      
      setReferralList([newReferral, ...referralList]);
      
      setCompanyName("");
      setJobId("");
      setResumeLink("");
    } catch (error) {
      console.error(error);
      alert("Failed to submit referral request");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteReferral = async (referralId) => {
    if (window.confirm("Are you sure you want to delete this referral request?")) {
      try {
        await deleteReferral(referralId);
        setReferralList(referralList.filter(ref => ref._id !== referralId));
      } catch (error) {
        console.error(error);
        alert("Failed to delete referral request");
      }
    }
  };

  const handleToggleProvideReferral = (referralId) => {
    if (activeReferralId === referralId) {
      setActiveReferralId(null);
      setReferralLinkInput("");
    } else {
      setActiveReferralId(referralId);
      setReferralLinkInput("");
    }
  };

  const handleProvideReferral = async (referralId) => {
    if (!referralLinkInput.trim()) {
      alert("Please enter a referral link");
      return;
    }
    
    try {
      const updatedReferral = await provideReferral(referralId, referralLinkInput);

      setReferralList(referralList.map(ref => 
        ref._id === referralId 
          ? { ...ref, referralLink: referralLinkInput, alumniEmail: authUser.email }
          : ref
      ));
      
      setActiveReferralId(null);
      setReferralLinkInput("");
      
      alert("Referral link provided successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to provide referral link");
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatUrl = (url) => {
    if (!url) return "";
    return url.startsWith('http') ? url : `https://${url}`;
  };

  return (
    <div className="flex h-screen bg-slate-100">
      <Sidebar />
      <div className="flex-1 p-12 overflow-auto">
        <h1 className="text-3xl font-bold text-[#0c4a42] mb-5 mt-8 md:mt-0" >Referral Request</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-4 overflow-auto max-h-[calc(100vh-150px)]">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">Active Requests</h2>
            
            {referralList && referralList.length > 0 ? (
              <div className="space-y-3">
                {referralList.map((ref) => (
                  <div key={ref._id} className="border border-gray-200 rounded-md p-4 bg-white hover:bg-gray-50 transition">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{ref.companyName}</h3>
                        <p className="text-gray-600">Job ID: {ref.jobId}</p>
                        <p className="text-gray-600 text-sm">Requested by: {ref.studentName}</p>
                        {ref.createdAt && (
                          <p className="text-gray-500 text-xs mt-1">Posted on: {formatDate(ref.createdAt)}</p>
                        )}
                        
                        {ref.referralLink && authUser.email === ref.studentEmail && (
                          <div className="mt-2 text-green-600">
                              Referral : {ref.referralLink}
                            <p className="text-gray-500 text-xs">
                              Provided by: {ref.alumniEmail}
                            </p>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col space-y-2">
                        {authUser.role === "alumni" && !ref.referralLink && (
                          <button 
                            onClick={() => handleToggleProvideReferral(ref._id)}
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm transition"
                          >
                            {activeReferralId === ref._id ? 'Cancel' : 'Provide Referral'}
                          </button>
                        )}
                        
                        {(authUser.email === ref.studentEmail)  && (
                          <button 
                            onClick={() => handleDeleteReferral(ref._id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                    
                    {activeReferralId === ref._id && (
                      <div className="mt-3 flex items-center space-x-2">
                        <input 
                          type="text" 
                          value={referralLinkInput}
                          onChange={(e) => setReferralLinkInput(e.target.value)}
                          placeholder="Enter referral link"
                          className="flex-grow px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button 
                          onClick={() => handleProvideReferral(ref._id)}
                          disabled={isProvidingReferral}
                          className={`bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm transition ${
                            isProvidingReferral ? 'opacity-70 cursor-not-allowed' : ''
                          }`}
                        >
                          {isProvidingReferral ? 'Sending...' : 'Send'}
                        </button>
                      </div>
                    )}
                    
                    {ref.resumeLink && (
                      <div className="mt-2">
                        <a 
                          href={formatUrl(ref.resumeLink)}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:text-blue-700 text-sm underline"
                        >
                          View Resume
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No referral requests found
              </div>
            )}
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
              {authUser.role === "student" ? "Request a Referral" : "Referral Information"}
            </h2>
            
            {authUser.role === "student" ? (
              <form onSubmit={handleRequestReferral} className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Company Name</label>
                  <input 
                    type="text" 
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="e.g. Google, Amazon" 
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Job ID / Position</label>
                  <input 
                    type="text" 
                    value={jobId}
                    onChange={(e) => setJobId(e.target.value)} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="e.g. SWE-123456 or Software Engineer" 
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Resume Link</label>
                  <input 
                    // type="url" 
                    type='text'
                    value={resumeLink}
                    onChange={(e) => setResumeLink(e.target.value)} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="https://drive.google.com/..." 
                    required
                  />
                  <p className="text-xs text-gray-500">Provide a public link to your resume</p>
                </div>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                    isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-emerald-500 hover:bg-emerald-700'
                  } transition duration-200`}
                >
                  {isSubmitting ? 'Submitting...' : 'Request Referral'}
                </button>
              </form>
            ) : (
              <div className="text-center py-8 text-gray-500">
                Only students can request referrals
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Referrals;