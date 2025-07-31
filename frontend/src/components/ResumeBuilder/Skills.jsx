import React from 'react';

function Skills({ formData, setFormData, addItem, removeItem }) {
  const handleSkillChange = (index, value) => {
    const updatedSkills = [...formData.skills];
    updatedSkills[index] = value;

    setFormData({
      ...formData,
      skills: updatedSkills
    });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mb-6 border border-slate-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-slate-800">Skills</h2>
        <button
          type="button"
          onClick={() => addItem('skills')}
          className="px-4 py-2 text-sm rounded-md bg-emerald-500 text-white hover:bg-emerald-700 transition-colors"
        >
          + Add Skill
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {formData.skills.map((skill, index) => (
          <div key={index} className="relative p-5 rounded-xl border border-slate-300 bg-slate-50">
            {formData.skills.length > 1 && (
              <button
                type="button"
                onClick={() => removeItem('skills', index)}
                className="absolute top-3 right-3 text-sm text-red-500 hover:text-red-700 focus:outline-none"
                aria-label="Remove Skill"
              >
                ×
              </button>
            )}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Skill Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={skill}
                onChange={(e) => handleSkillChange(index, e.target.value)}
                className="w-full p-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="Enter a skill"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skills;
