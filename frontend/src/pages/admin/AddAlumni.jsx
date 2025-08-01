import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAlumniAdmin from "../../api/alumni/useAlumniAdmin";
import Sidebar from "../../components/Sidebar";

const initialForm = {
  name: "",
  company: "",
  linkedin: "",
  InstituteId: "",
  MobileNumber: "",
  Email: "",
  batch: "",
  jobs: [{ id: "", role: "" }],
};

const AddAlumni = () => {
  const { addAlumni, updateAlumni, deleteAlumni, alumni, refetch } = useAlumniAdmin();

  const [searchId, setSearchId] = useState("");
  const [form, setForm] = useState(initialForm);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // For navigation after add/update/delete if needed
  // const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // For job fields
    if (name === "job-id" || name === "job-role") {
      setForm((prev) => ({
        ...prev,
        jobs: [{
          ...prev.jobs[0],
          [name === "job-id" ? "id" : "role"]: value,
        }],
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSearch = () => {
    const found = alumni.find((a) => a.InstituteId === searchId);
    if (found) {
      const { _id, __v, ...cleaned } = found;
      setForm({
        ...initialForm,
        ...cleaned,
        jobs: found.jobs?.length ? found.jobs : [{ id: "", role: "" }],
      });
      setIsEditMode(true);
      setEditingId(found._id);
      toast.success("Alumni found. You can now update or delete.");
    } else {
      toast.error("No alumni found with that Institute ID");
      setIsEditMode(false);
      setEditingId(null);
      setForm(initialForm);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("ccps-token");
    try {
      if (isEditMode && editingId) {
        await updateAlumni(editingId, form, token);
        toast.success("Alumni updated successfully");
      } else {
        await addAlumni(form, token);
        toast.success("Alumni added successfully");
      }
      refetch();
      resetForm();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("ccps-token");
    if (!editingId) return;
    if (window.confirm("Are you sure you want to delete this alumni?")) {
      try {
        await deleteAlumni(editingId, token);
        toast.success("Alumni deleted");
        resetForm();
        refetch();
      } catch (error) {
        toast.error("Failed to delete alumni");
      }
    }
  };

  const resetForm = () => {
    setForm(initialForm);
    setIsEditMode(false);
    setEditingId(null);
    setSearchId("");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6 pt-20 md:pt-8 w-full">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-[#0c4a42] p-6">
            <h2 className="text-2xl font-bold text-white">
              {isEditMode ? "Edit Alumni" : "Add New Alumni"}
            </h2>
            <p className="text-green-200 mt-1">
              {isEditMode
                ? "Update the alumni details below."
                : "Fill in details to add a new alumni"}
            </p>
          </div>

          {/* Search Bar */}
          <div className="p-6 pt-6 pb-0">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Search by Institute ID"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
              />
              <button
                onClick={handleSearch}
                type="button"
                className="bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold px-6 py-2 rounded-lg hover:from-green-700 hover:to-green-800 focus:outline-none transition w-full md:w-auto"
              >
                Search
              </button>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="p-6 pt-6 grid grid-cols-1 md:grid-cols-2 gap-6"
            autoComplete="off"
          >
            {/* Inputs */}
            <div className="flex flex-col">
              <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                placeholder="Full Name"
                className="border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition"
                value={form.name}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="company" className="text-sm font-medium text-gray-700 mb-1">
                Company
              </label>
              <input
                id="company"
                name="company"
                placeholder="Company"
                className="border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition"
                value={form.company}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="linkedin" className="text-sm font-medium text-gray-700 mb-1">
                LinkedIn URL
              </label>
              <input
                id="linkedin"
                name="linkedin"
                placeholder="LinkedIn URL"
                className="border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition"
                value={form.linkedin}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="InstituteId" className="text-sm font-medium text-gray-700 mb-1">
                Institute ID
              </label>
              <input
                id="InstituteId"
                name="InstituteId"
                placeholder="Institute ID"
                className="border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition"
                value={form.InstituteId}
                onChange={handleChange}
                required
                disabled={isEditMode}
                autoComplete="off"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="MobileNumber" className="text-sm font-medium text-gray-700 mb-1">
                Mobile Number
              </label>
              <input
                id="MobileNumber"
                name="MobileNumber"
                placeholder="Mobile Number"
                className="border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition"
                value={form.MobileNumber}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="Email" className="text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="Email"
                name="Email"
                type="email"
                placeholder="Email"
                className="border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition"
                value={form.Email}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="batch" className="text-sm font-medium text-gray-700 mb-1">
                Batch Year
              </label>
              <input
                id="batch"
                name="batch"
                type="number"
                placeholder="Batch Year (e.g. 2021)"
                className="border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition"
                value={form.batch}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>

            {/* Jobs Block */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold mb-2 text-[#0c4a42]">Job Information</h3>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-col flex-1">
                  <label htmlFor="job-id" className="text-sm font-medium text-gray-700 mb-1">
                    Job ID
                  </label>
                  <input
                    id="job-id"
                    name="job-id"
                    placeholder="Job ID"
                    className="border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition"
                    value={form.jobs[0]?.id || ""}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <label htmlFor="job-role" className="text-sm font-medium text-gray-700 mb-1">
                    Job Role
                  </label>
                  <input
                    id="job-role"
                    name="job-role"
                    placeholder="Job Role"
                    className="border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition"
                    value={form.jobs[0]?.role || ""}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="md:col-span-2 flex flex-col md:flex-row gap-4 mt-2">
              <button
                type="submit"
                className="bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold px-6 py-2 rounded-lg hover:from-green-700 hover:to-green-800 focus:outline-none transition w-full md:w-1/2"
              >
                {isEditMode ? "Update Alumni" : "Add Alumni"}
              </button>
              {isEditMode && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold px-6 py-2 rounded-lg hover:from-red-700 hover:to-red-800 focus:outline-none transition w-full md:w-1/2"
                >
                  Delete
                </button>
              )}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddAlumni;
