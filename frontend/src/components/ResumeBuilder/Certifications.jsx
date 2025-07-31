import React from 'react';

function Certifications({ formData, handleArrayFieldChange, addItem, removeItem }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mb-6 border border-slate-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-slate-800">Certifications</h2>
        <button
          type="button"
          onClick={() => addItem('certifications')}
          className="px-4 py-2 text-sm rounded-md bg-emerald-500 text-white hover:bg-emerald-700 transition-colors"
        >
          + Add Certification
        </button>
      </div>

      {formData.certifications.map((cert, index) => (
        <div
          key={index}
          className="mb-4 p-5 rounded-xl border border-slate-300 bg-slate-50 relative"
        >
          {formData.certifications.length > 1 && (
            <button
              type="button"
              onClick={() => removeItem('certifications', index)}
              className="absolute top-3 right-3 text-sm text-red-500 hover:text-red-700 focus:outline-none"
              aria-label="Remove Certification"
            >
              ×
            </button>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Certification Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={cert.name}
                onChange={(e) => handleArrayFieldChange('certifications', index, e)}
                required
                className="w-full p-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Issuing Organization<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="issuer"
                value={cert.issuer}
                onChange={(e) => handleArrayFieldChange('certifications', index, e)}
                required
                className="w-full p-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Date Issued<span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="date"
                value={cert.date}
                onChange={(e) => handleArrayFieldChange('certifications', index, e)}
                className="w-full p-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Certifications;
