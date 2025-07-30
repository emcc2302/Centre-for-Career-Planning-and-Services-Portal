import React from 'react';
import Sidebar from '../components/Sidebar';

const Home = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6 pt-16 md:pt-6">
        <div className="max-w-5xl mx-auto space-y-10">

          <header>
            <h1 className="text-3xl font-bold text-[#13665b] mb-2">
              Placement & Internship Highlights
            </h1>
            <p className="text-base-content">
              Here’s a glimpse of the recent placement and internship success at IIT Bhilai.
            </p>
          </header>

          {/* Placement Summary */}
          <div className="bg-base-100 rounded-lg shadow p-6 space-y-4">
            <h2 className="text-xl font-semibold text-[#0fa18e]">Placement Statistics</h2>
            <p className="text-base-content">
              So far, <strong>six successful placement sessions</strong> have been conducted, with <strong>650+ offers</strong> extended to students.
            </p>
            <p className="text-base-content">
              Leading recruiters include:
            </p>
            <CompanyTagGrid companies={[
              'Google', 'Amazon', 'HPCL', 'Warner Bros Discovery', 'MECON',
              'DE Shaw', 'Intuit', 'Applied Materials', 'Sprinklr', 'Commvault',
              'Paytm', 'Schneider Electric', 'Meesho', 'Atonarp', 'Dunzo',
              'AirAsia Technology Centre', 'Larsen & Toubro'
            ]} />
            <p className="text-base-content">
              The upcoming <strong>2025–2026 campus placement session</strong> is set to begin in <strong>September 2025</strong> and is expected to surpass previous milestones.
            </p>
          </div>

          {/* Internship Summary */}
          <div className="bg-base-100 rounded-lg shadow p-6 space-y-4">
            <h2 className="text-xl font-semibold text-[#0fa18e]">Internship Highlights (Summer 2025)</h2>
            <p className="text-base-content">
              Over <strong>80 internship offers</strong> were received from reputed organizations including:
            </p>
            <CompanyTagGrid companies={[
              'Google', 'NVIDIA', 'Warner Bros Discovery', 'ICICI Bank',
              'TCS Research', 'Publicis Sapient', 'Assurant',
              'Bhilai Steel Plant'
            ]} />
          </div>

          {/* 2023–2024 Placement Report Summary */}
          <div className="bg-base-100 rounded-lg shadow p-6 space-y-4">
            <h2 className="text-xl font-semibold text-[#0fa18e]">Highlights from Placement Report 2023–2024</h2>
            <ul className="list-disc pl-6 text-base-content space-y-1">
              <li><strong>Total Offers:</strong> 115</li>
              <li><strong>Highest Package:</strong> ₹47 LPA (CTC)</li>
              <li><strong>Average Package:</strong> ₹12.51 LPA (CTC)</li>
              <li><strong>Median Package:</strong> ₹11 LPA (CTC)</li>
              <li><strong>Total Recruiters:</strong> 109</li>
              <li>
                <strong>Top Recruiters:</strong> Accenture, Deloitte, TCS, Larsen & Toubro, NVIDIA, Infosys, Mahindra and Mahindra, HCLTech, and many more
              </li>
              <li><strong>Notable Sectors:</strong> Software, Core Engineering, Data Science, Consulting, Finance</li>
            </ul>
            <p className="text-base-content">
              For a detailed breakdown of department-wise placements, packages, and more, you can access the full report below:
            </p>
            <div className="text-right">
              <a
                href="https://www.iitbhilai.ac.in/index.php?pid=PlacementReport2023_2024"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline text-sm"
              >
                View Full Placement Report 2023–2024 →
              </a>
            </div>
          </div>

          {/* Official Link */}
          <div className="text-right">
            <a
              href="https://www.iitbhilai.ac.in/index.php?pid=placement"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline text-sm"
            >
              For more information, visit the official placement page →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const CompanyTagGrid = ({ companies }) => (
  <div className="flex flex-wrap gap-2">
    {companies.map((name, idx) => (
      <span
        key={idx}
        className="px-3 py-1 rounded-full text-sm font-medium"
        style={{ backgroundColor: '#13665b', color: '#ffffff' }}
      >
        {name}
      </span>
    ))}
  </div>
);

export default Home;
