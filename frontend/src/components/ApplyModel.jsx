import React, { useState } from "react";
import { applyToJob } from "../api/useApply";
import { toast } from "react-hot-toast";

const ApplyModal = ({ jobId, applicationLink, onClose, onApplied }) => {
  const [formData, setFormData] = useState({
    resume: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await applyToJob({
        jobId,
        resume: formData.resume || "",
        phone: formData.phone || "",
        address: formData.address || "",
      });
      toast.success("Applied successfully");
      onApplied();   
      onClose();    
    } catch (err) {
      toast.error(err.response?.data?.message || "Application failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4">Apply to this Job</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Resume URL (optional)</label>
            <input
              type="url"
              name="resume"
              value={formData.resume}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone (optional)</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              placeholder="+91-XXXXXXXXXX"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Address (optional)</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              placeholder="Your address"
            />
          </div>

          {applicationLink && (
            <div className="text-sm text-right">
              <a
                href={applicationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Click here to apply externally →
              </a>
            </div>
          )}

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>  
    </div>
  );
};

export default ApplyModal;
