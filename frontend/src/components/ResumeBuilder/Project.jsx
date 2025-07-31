import React from 'react';

function Project({ formData, handleArrayFieldChange, addItem, removeItem }) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-slate-700">Projects</h2>
                <button
                    type="button"
                    onClick={() => addItem('projects')}
                    className="px-4 py-2 text-sm rounded-md bg-emerald-500 text-white hover:bg-emerald-700 transition-colors"
                >
                   + Add Project
                </button>
            </div>

            {formData.projects.map((project, index) => (
                <div key={index} className="mb-6 p-4 border border-slate-200 rounded-2xl bg-slate-50 relative">
                    {formData.projects.length > 1 && (
                        <button
                            type="button"
                            onClick={() => removeItem('projects', index)}
                            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                        >
                            ✕
                        </button>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1">Project Title<span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                name="title"
                                value={project.title}
                                onChange={(e) => handleArrayFieldChange('projects', index, e)}
                                required
                                className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1">Technologies Used<span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                name="technologies"
                                value={project.technologies}
                                onChange={(e) => handleArrayFieldChange('projects', index, e)}
                                required
                                className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="e.g., React, Node.js, MongoDB"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-600 mb-1">Description<span className="text-red-500">*</span></label>
                            <textarea
                                name="description"
                                value={project.description}
                                onChange={(e) => handleArrayFieldChange('projects', index, e)}
                                required
                                rows="3"
                                className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Describe the project, your role, and achievements"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1">Project Link<span className="text-red-500">*</span></label>
                            <input
                                type="url"
                                name="link"
                                value={project.link}
                                onChange={(e) => handleArrayFieldChange('projects', index, e)}
                                className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="https://github.com/yourusername/project"
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Project;
