import React from 'react';

function PersonalInfo({ formData, setFormData }) {
  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      personalInfo: {
        ...formData.personalInfo,
        [name]: value,
      },
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold text-slate-700 mb-4">Personal Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Full Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.personalInfo.name}
            onChange={handlePersonalInfoChange}
            required
            className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your full name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Email<span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.personalInfo.email}
            onChange={handlePersonalInfoChange}
            required
            className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Phone Number<span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.personalInfo.phone}
            onChange={handlePersonalInfoChange}
            required
            className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your phone number"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Address<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="address"
            value={formData.personalInfo.address}
            onChange={handlePersonalInfoChange}
            className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your address"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            LinkedIn Profile<span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            name="linkedin"
            value={formData.personalInfo.linkedin}
            onChange={handlePersonalInfoChange}
            className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="https://linkedin.com/in/..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            GitHub Profile<span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            name="github"
            value={formData.personalInfo.github}
            onChange={handlePersonalInfoChange}
            className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="https://github.com/..."
          />
        </div>
      </div>
    </div>
  );
}

export default PersonalInfo;
