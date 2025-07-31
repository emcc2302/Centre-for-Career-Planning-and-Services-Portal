import { useState } from 'react';
import { useResume } from '../../api/resume/useResume';

import toast from 'react-hot-toast';
import Sidebar from '../../components/Sidebar';
import Skills from '../../components/ResumeBuilder/Skills';
import Project from '../../components/ResumeBuilder/Project';
import Education from '../../components/ResumeBuilder/Education';
import Experience from '../../components/ResumeBuilder/Experience';
import PersonalInfo from '../../components/ResumeBuilder/PersonalInfo';
import Certifications from '../../components/ResumeBuilder/Certifications';

function ResumeBuilder() {
    const { generateResume, loading } = useResume();
    const [formData, setFormData] = useState({
        personalInfo: { name: '', email: '', phone: '', address: '', linkedin: '', github: '' },
        education: [{ institution: '', degree: '', field: '', startDate: '', endDate: '', gpa: '' }],
        experience: [{ company: '', position: '', startDate: '', endDate: '', description: '', location: '' }],
        skills: [''],
        projects: [{ title: '', description: '', technologies: '', link: '' }],
        certifications: [{ name: '', issuer: '', date: '' }]
    });

    const requiredFields = {
        personalInfo: ['name', 'email', 'phone', 'address', 'linkedin', 'github'],
        education: ['institution', 'degree', 'field', 'startDate', 'endDate'],
        experience: ['company', 'position', 'startDate', 'endDate', 'description'],
        skills: ['*'],
        projects: ['title', 'description'],
        certifications: ['name', 'issuer', 'date']
    };

    const handleArrayFieldChange = (category, index, e) => {
        const { name, value } = e.target;
        const updatedItems = [...formData[category]];
        updatedItems[index] = {
            ...updatedItems[index],
            [name]: value
        };
        setFormData({ ...formData, [category]: updatedItems });
    };

    const addItem = (category) => {
        let newItem;
        switch (category) {
            case 'education':
                newItem = { institution: '', degree: '', field: '', startDate: '', endDate: '', gpa: '' };
                break;
            case 'experience':
                newItem = { company: '', position: '', startDate: '', endDate: '', description: '', location: '' };
                break;
            case 'skills':
                newItem = '';
                break;
            case 'projects':
                newItem = { title: '', description: '', technologies: '', link: '' };
                break;
            case 'certifications':
                newItem = { name: '', issuer: '', date: '' };
                break;
            default:
                return;
        }
        setFormData({ ...formData, [category]: [...formData[category], newItem] });
    };

    const removeItem = (category, index) => {
        if (formData[category].length <= 1) return;
        const updatedItems = [...formData[category]];
        updatedItems.splice(index, 1);
        setFormData({ ...formData, [category]: updatedItems });
    };

    const isValidForm = () => {
        const { personalInfo, education, experience, skills, projects, certifications } = formData;
        const required = (val) => val && val.trim() !== '';

        if (
            !required(personalInfo.name) ||
            !required(personalInfo.email) ||
            !required(personalInfo.phone) ||
            !required(personalInfo.address) ||
            !required(personalInfo.linkedin) ||
            !required(personalInfo.github)
        ) {
            toast.error('All personal info fields are required.');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(personalInfo.email)) {
            toast.error('Invalid email format.');
            return false;
        }

        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(personalInfo.phone)) {
            toast.error('Phone number should be 10 digits.');
            return false;
        }

        for (let edu of education) {
            if (!required(edu.institution) || !required(edu.degree) || !required(edu.field) || !required(edu.startDate) || !required(edu.endDate)) {
                toast.error('All education fields are required.');
                return false;
            }
        }

        for (let exp of experience) {
            if (!required(exp.company) || !required(exp.position) || !required(exp.description) || !required(exp.startDate) || !required(exp.endDate)) {
                toast.error('All experience fields are required.');
                return false;
            }
        }

        if (skills.length === 0 || skills.some(skill => !required(skill))) {
            toast.error('Please enter at least one skill.');
            return false;
        }

        for (let proj of projects) {
            if (!required(proj.title) || !required(proj.description)) {
                toast.error('All project fields are required.');
                return false;
            }
        }

        for (let cert of certifications) {
            if (!required(cert.name) || !required(cert.issuer) || !required(cert.date)) {
                toast.error('All certification fields are required.');
                return false;
            }
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isValidForm()) return;
        await generateResume(formData);
    };

    return (
        <div className="flex h-screen bg-slate-50">
            <Sidebar />
            <div className="flex-1 p-8 overflow-auto">
                <div className="flex justify-between items-center mb-8 mt-16 md:mt-0">
                    <h1 className="text-3xl font-bold text-[#0c4a42]">Resume Builder</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="p-6 bg-white rounded-2xl shadow-md">
                        <PersonalInfo formData={formData} setFormData={setFormData} requiredFields={requiredFields.personalInfo} />
                    </div>
                    <div className="p-6 bg-white rounded-2xl shadow-md">
                        <Education formData={formData} handleArrayFieldChange={handleArrayFieldChange} addItem={addItem} removeItem={removeItem} requiredFields={requiredFields.education} />
                    </div>
                    <div className="p-6 bg-white rounded-2xl shadow-md">
                        <Experience formData={formData} handleArrayFieldChange={handleArrayFieldChange} addItem={addItem} removeItem={removeItem} requiredFields={requiredFields.experience} />
                    </div>
                    <div className="p-6 bg-white rounded-2xl shadow-md">
                        <Skills formData={formData} setFormData={setFormData} addItem={addItem} removeItem={removeItem} requiredFields={requiredFields.skills} />
                    </div>
                    <div className="p-6 bg-white rounded-2xl shadow-md">
                        <Project formData={formData} handleArrayFieldChange={handleArrayFieldChange} addItem={addItem} removeItem={removeItem} requiredFields={requiredFields.projects} />
                    </div>
                    <div className="p-6 bg-white rounded-2xl shadow-md">
                        <Certifications formData={formData} handleArrayFieldChange={handleArrayFieldChange} addItem={addItem} removeItem={removeItem} requiredFields={requiredFields.certifications} />
                    </div>

                    <div className="mt-8 flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`px-6 py-3 rounded-xl font-semibold text-white text-lg transition-colors duration-200 ${
                                loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-emerald-800 hover:bg-emerald-500'
                            }`}
                        >
                            {loading ? 'Generating Resume...' : 'Generate Resume PDF'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ResumeBuilder;
