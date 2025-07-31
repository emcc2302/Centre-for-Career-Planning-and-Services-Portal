import React from 'react';

function Education({ formData, handleArrayFieldChange, addItem, removeItem }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mb-6 border border-slate-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-slate-800">Education</h2>
        <button
          type="button"
          onClick={() => addItem('education')}
          className="px-4 py-2 text-sm rounded-md bg-emerald-500 text-white hover:bg-emerald-700 transition-colors"
        >
          + Add Education
        </button>
      </div>

      {formData.education.map((edu, index) => (
        <div
          key={index}
          className="mb-4 p-5 rounded-xl border border-slate-300 bg-slate-50 relative"
        >
          {formData.education.length > 1 && (
            <button
              type="button"
              onClick={() => removeItem('education', index)}
              className="absolute top-3 right-3 text-sm text-red-500 hover:text-red-700 focus:outline-none"
              aria-label="Remove Education"
            >
              ×
            </button>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Institution<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="institution"
                value={edu.institution}
                onChange={(e) => handleArrayFieldChange('education', index, e)}
                required
                className="w-full p-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Degree<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="degree"
                value={edu.degree}
                onChange={(e) => handleArrayFieldChange('education', index, e)}
                required
                className="w-full p-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Field of Study<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="field"
                value={edu.field}
                onChange={(e) => handleArrayFieldChange('education', index, e)}
                required
                className="w-full p-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                GPA
              </label>
              <input
                type="text"
                name="gpa"
                value={edu.gpa}
                onChange={(e) => handleArrayFieldChange('education', index, e)}
                className="w-full p-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Start Date<span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="startDate"
                value={edu.startDate}
                onChange={(e) => handleArrayFieldChange('education', index, e)}
                required
                className="w-full p-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                End Date<span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="endDate"
                value={edu.endDate}
                onChange={(e) => handleArrayFieldChange('education', index, e)}
                className="w-full p-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Education;
