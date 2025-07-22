"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAlumniAdmin from "../../api/alumni/useAlumniAdmin";

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

const AdminAlumniPage = () => {
  const navigate = useNavigate();
  const { addAlumni, updateAlumni, deleteAlumni, alumni, refetch } = useAlumniAdmin();

  const [searchId, setSearchId] = useState("");
  const [form, setForm] = useState(initialForm);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("job-")) {
      const [_, field] = name.split("-");
      setForm((prev) => ({
        ...prev,
        jobs: [{ ...prev.jobs[0], [field]: value }],
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-8 space-y-8">
        <h2 className="text-4xl font-bold text-center text-gray-800">
          {isEditMode ? "Edit Alumni" : "Add New Alumni"}
        </h2>

        {/* Search Bar */}
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by Institute ID"
            className="input input-bordered w-full"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="btn bg-blue-600 hover:bg-blue-700 text-white w-full md:w-auto"
          >
            Search
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            name="name"
            placeholder="Full Name"
            className="input input-bordered"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            name="company"
            placeholder="Company"
            className="input input-bordered"
            value={form.company}
            onChange={handleChange}
            required
          />
          <input
            name="linkedin"
            placeholder="LinkedIn URL"
            className="input input-bordered"
            value={form.linkedin}
            onChange={handleChange}
            required
          />
          <input
            name="InstituteId"
            placeholder="Institute ID"
            className="input input-bordered"
            value={form.InstituteId}
            onChange={handleChange}
            required
            disabled={isEditMode}
          />
          <input
            name="MobileNumber"
            placeholder="Mobile Number"
            className="input input-bordered"
            value={form.MobileNumber}
            onChange={handleChange}
            required
          />
          <input
            name="Email"
            type="email"
            placeholder="Email"
            className="input input-bordered"
            value={form.Email}
            onChange={handleChange}
            required
          />
          <input
            name="batch"
            type="number"
            placeholder="Batch Year (e.g. 2021)"
            className="input input-bordered"
            value={form.batch}
            onChange={handleChange}
            required
          />

          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-2">Job Information</h3>
            <div className="flex flex-col md:flex-row gap-4">
              <input
                name="job-id"
                placeholder="Job ID"
                className="input input-bordered w-full"
                value={form.jobs[0]?.id || ""}
                onChange={handleChange}
                required
              />
              <input
                name="job-role"
                placeholder="Job Role"
                className="input input-bordered w-full"
                value={form.jobs[0]?.role || ""}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="md:col-span-2 flex flex-col md:flex-row gap-4 mt-2">
            <button
              type="submit"
              className="btn btn-primary w-full md:w-1/2"
            >
              {isEditMode ? "Update Alumni" : "Add Alumni"}
            </button>
            {isEditMode && (
              <button
                type="button"
                onClick={handleDelete}
                className="btn btn-error w-full md:w-1/2"
              >
                Delete
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAlumniPage;
