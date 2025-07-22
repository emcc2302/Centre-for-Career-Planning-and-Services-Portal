import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";

import {
  getStudentProfile,
  updateStudentProfile,
  createStudentProfile,
} from "../../api/profile/useStudentProfile";

import toast from "react-hot-toast";
import Sidebar from "../../components/Sidebar";

const initialData = {
  name: "",
  email: "",
  studentID: "",
  discipline: "",
  program: "",
  cgpa: "",
};

export default function Profile() {
  const { authUser } = useAuthContext();
  const [profile, setProfile] = useState(initialData);
  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const isIncomplete =
    !profile.studentID || !profile.discipline || !profile.program || !profile.cgpa;

  useEffect(() => {
    if (!authUser?._id) return;
    setLoading(true);
    getStudentProfile(authUser._id)
      .then(data => {
        setProfile({ ...initialData, ...data });
        setFormData({ ...initialData, ...data });
      })
      .catch(() => {
        setProfile(prev => ({ ...prev, name: authUser.name, email: authUser.email }));
        setFormData(prev => ({ ...prev, name: authUser.name, email: authUser.email }));
      })
      .finally(() => setLoading(false));
  }, [authUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  // TODO: same id no cannot be added so add toast for that. 
  const payload = { ...formData, batch: 2025, status: "active" };
  try {
    if (!profile.studentID) {
      await createStudentProfile(authUser._id, payload);
      toast.success("Profile created successfully!");
    } else {
      await updateStudentProfile(authUser._id, payload);
      toast.success("Profile updated successfully!");
    }

    const updated = await getStudentProfile(authUser._id);
    setProfile({ ...initialData, ...updated });
    setFormData({ ...initialData, ...updated });
    setShowForm(false);
  } catch (err) {
    if (err.response?.data?.message?.includes("already exists")) {
      toast.error("A profile with this Student ID already exists.");
    } else {
      toast.error("An error occurred. Please try again.");
    }
    console.error(err);
  }
};


  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-xl font-medium text-gray-600">Loading Profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100 pt-20">
      <Sidebar />
      <main className="flex-1 p-6 flex justify-center items-start">
        <div className="w-full max-w-3xl bg-white  shadow-md overflow-hidden">
          <div className="bg-teal-600 p-6">
            <h1 className="text-3xl font-bold text-white">Student Profile</h1>
          </div>
          <div className="p-6">
            {!showForm ? (
              <>
                {isIncomplete && (
                  <div className="mb-4 px-4 py-2 bg-red-100 text-red-700 rounded">
                    Your profile is incomplete. Please update the missing fields.
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                  <div>
                    <p className="font-semibold">Name</p>
                    <p>{profile.name || "N/A"}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Email</p>
                    <p>{profile.email || "N/A"}</p>
                  </div>
                  {!isIncomplete && (
                    <>
                      <div>
                        <p className="font-semibold">Student ID</p>
                        <p>{profile.studentID}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Discipline</p>
                        <p>{profile.discipline}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Program</p>
                        <p>{profile.program}</p>
                      </div>
                      <div>
                        <p className="font-semibold">CGPA</p>
                        <p>{profile.cgpa}</p>
                      </div>
                    </>
                  )}
                </div>
                <div className="mt-6 text-center">
                  <button
                    onClick={() => setShowForm(true)}
                    className="inline-block bg-teal-600 hover:bg-teal-700 text-white py-2 px-5 rounded-lg font-medium transition"
                  >
                    {isIncomplete ? "Complete Profile" : "Edit Profile"}
                  </button>
                </div>
              </>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: 'name', label: 'Full Name', type: 'text' },
                    { name: 'email', label: 'Email Address', type: 'email' },
                    { name: 'studentID', label: 'Student ID', type: 'text' },
                    { name: 'discipline', label: 'Discipline', type: 'text' },
                    { name: 'program', label: 'Program', type: 'text' },
                    { name: 'cgpa', label: 'CGPA', type: 'number', step: '0.01', min: '0', max: '10' },
                  ].map(field => (
                    <div key={field.name} className="flex flex-col">
                      <label className="mb-1 font-semibold text-gray-600">{field.label}</label>
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        step={field.step}
                        min={field.min}
                        max={field.max}
                        className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        required
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-center space-x-4 mt-4">
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 font-medium transition"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-6  font-medium transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
