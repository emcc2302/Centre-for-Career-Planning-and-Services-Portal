import React, { useState } from "react";
import { createJobPosting } from "../../api/useCreate";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Sidebar from "../../components/Sidebar";

const CreateJob = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    jobTitle: "",
    jobDescription: "",
    Company: "",
    requiredSkills: "",
    Type: "on-campus",
    batch: "",
    Deadline: "",
    ApplicationLink: "",
    Expiry: "",
    author: "",
    relevanceScore: ""
  });

  const handleChange = (e) => {
      const { name, value } = e.target;
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("ccps-token");
      await createJobPosting(form, token);
      toast.success("Job created successfully!");
      navigate("/admin/jobs");
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Failed to create job");
    }
  };

  return (
     <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="p-6 max-w-3xl mx-auto bg-base-100 rounded shadow mt-6">
        <h2 className="text-2xl font-bold mb-6">Create New Job Posting</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input name="jobTitle" placeholder="Job Title" className="input input-bordered w-full" onChange={handleChange} required />
          <input name="Company" placeholder="Company Name" className="input input-bordered w-full" onChange={handleChange} required />
          
          <textarea
            name="jobDescription"
            placeholder="Job Description"
            className="textarea textarea-bordered w-full"
            rows="4"
            onChange={handleChange}
            required
          />

          <input
            name="requiredSkills"
            placeholder="Required Skills (comma-separated)"
            className="input input-bordered w-full"
            onChange={handleChange}
          />

          <select name="Type" className="select select-bordered w-full" onChange={handleChange} value={form.Type} required>
            <option value="on-campus">On-Campus</option>
            <option value="off-campus">Off-Campus</option>
          </select>

          <input
            name="batch"
            type="number"
            placeholder="Eligible Batch (e.g., 2025)"
            className="input input-bordered w-full"
            onChange={handleChange}
            required
          />

          <label className="block">
            <span className="text-sm font-medium text-gray-700">Application Deadline</span>
            <input
              name="Deadline"
              type="date"
              className="input input-bordered w-full mt-1"
              onChange={handleChange}
            />
          </label>


          <input
            name="ApplicationLink"
            placeholder="Application Link"
            className="input input-bordered w-full"
            onChange={handleChange}
          />

          <label className="block">
            <span className="text-sm font-medium text-gray-700">Post Expiry Date</span>
            <input
              name="Expiry"
              type="date"
              className="input input-bordered w-full mt-1"
              onChange={handleChange}
            />
          </label>

          <input
            name="author"
            placeholder="Author (Optional)"
            className="input input-bordered w-full"
            onChange={handleChange}
          />

          <input
            name="relevanceScore"
            type="number"
            step="0.1"
            placeholder="Relevance Score (Optional)"
            className="input input-bordered w-full"
            onChange={handleChange}
          />

          <button type="submit" className="btn btn-primary w-full">
            Create Job
          </button>
        </form>
      </div>
    </div>  
  );
};

export default CreateJob;
