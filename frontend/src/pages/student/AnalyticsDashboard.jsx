import { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis,
  Tooltip, Legend, ResponsiveContainer, LineChart, Line,
} from 'recharts';

const COLORS = ['#10B981', '#34D399', '#6EE7B7', '#A7F3D0', '#D1FAE5', '#ECFDF5'];

const dummyData = {
  companiesVisited: 12,
  totalPlaced: 150,
  placementPercentage: 85,
  internships: 30,
  sectors: {
    IT: 50,
    Finance: 40,
    Marketing: 20,
    HR: 10,
  },
  bestCompanies: {
    Google: 25,
    Amazon: 20,
    Microsoft: 15,
  },
  collegePerformance: {
    2021: 80,
    2022: 85,
    2023: 90,
  },
  placementStats: {
    2021: [20, 25, 15],
    2022: [25, 30, 20],
    2023: [30, 35, 25],
  },
};

// Custom counter animation hook
const useCounter = (end, speed = 50) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(end / 20); // Smooth step
    const interval = setInterval(() => {
      start += step;
      if (start >= end) {
        clearInterval(interval);
        setCount(end);
      } else {
        setCount(start);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [end, speed]);
  return count;
};

const AnalyticsDashboard = () => {
  const [data] = useState(dummyData);

  const statCards = [
    { label: 'Companies Visited', value: useCounter(data.companiesVisited) },
    { label: 'Students Placed', value: useCounter(data.totalPlaced) },
    { label: 'Placement %', value: `${useCounter(data.placementPercentage)}%` },
    { label: 'Internships', value: useCounter(data.internships) },
  ];

  const sectorData = Object.entries(data.sectors).map(([name, value]) => ({ name, value }));
  const bestCompanyData = Object.entries(data.bestCompanies).map(([name, value]) => ({ name, value }));
  const collegePerformanceData = Object.entries(data.collegePerformance).map(([year, value]) => ({ year, value }));
  const placementStatsData = Object.entries(data.placementStats).map(([year, arr]) => ({
    year,
    Stat1: arr[0],
    Stat2: arr[1],
    Stat3: arr[2],
  }));

  return (
    <div className="md:pl-14 md:pr-14 flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <header className="p-4 md:p-6">
          <h1 className="text-3xl font-bold text-emerald-900 mt-14 md:mt-2">Analytics</h1>
        </header>

        <main className="flex-1 p-4 md:p-8 space-y-10">
          {/* Top Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {statCards.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white border-2 border-emerald-600 hover:shadow-md hover:bg-emerald-50 hover:scale-105 transition-transform duration-200 p-4 rounded-lg shadow flex flex-col items-center"
              >
                <span className="text-emerald-700 text-lg font-bold">{stat.label}</span>
                <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
              </div>
            ))}
          </div>

          {/* Line & Pie Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="font-semibold mb-2 text-emerald-700">College Performance (%)</h2>
              <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={collegePerformanceData}>
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow overflow-x-auto">
              <h2 className="font-semibold mb-2 text-emerald-700">Sectors (Students Placed)</h2>
              <div className="min-w-[300px] w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sectorData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      labelLine={false}
                      label={({ name, percent }) =>
                        window.innerWidth > 400 ? `${name}: ${(percent * 100).toFixed(0)}%` : ''
                      }
                      dataKey="value"
                    >
                      {sectorData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* Bar Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="font-semibold mb-2 text-emerald-700">Best Companies</h2>
              <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={bestCompanyData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="font-semibold mb-2 text-emerald-700">Placement Statistics by Year</h2>
              <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={placementStatsData}>
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Stat1" fill="#10B981" />
                    <Bar dataKey="Stat2" fill="#6EE7B7" />
                    <Bar dataKey="Stat3" fill="#34D399" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;



// TODO: Currently showing the placement data hardcoded as the other parts are yet to be constructed. Use the AuthContext and validation when the other pages are completed.



// import { useState, useEffect, useRef } from 'react';
// import { useAuthContext } from '../../context/AuthContext';

// import Cards from '../../components/analytics/Cards';
// import useGetAnalytics from '../../api/analytics/useGetAnalytics';
// import AdminButtons from '../../components/analytics/AdminButtons'
// import useUpdateAnalytics from '../../api/analytics/useUpdateAnalytics';
// import CollegeInsights from '../../components/analytics/CollegeInsights';



// const AnalyticsDashboard = () => {
//   const { getAnalytics, loading } = useGetAnalytics();
//   const { updateAnalytics, editLoading } = useUpdateAnalytics();
//   const [data, setData] = useState({});
//   const [isEditOpen, setIsEditOpen] = useState(false);
//   const { authUser } = useAuthContext();
//   const messagesEndRef = useRef(null);

//   // Form States
//   const [companiesVisited, setCompaniesVisited] = useState(0);
//   const [totalPlaced, setTotalPlaced] = useState(0);
//   const [placementPercentage, setPlacementPercentage] = useState(0);
//   const [internships, setInternships] = useState(0);
//   const [sectors, setSectors] = useState({});
//   const [bestCompanies, setBestCompanies] = useState({});
//   const [collegePerformance, setCollegePerformance] = useState({});
//   const [placementStats, setPlacementStats] = useState({});

//   const cardInfo = [
//     ['Companies visited', companiesVisited, setCompaniesVisited],
//     ['Total Students Placed', totalPlaced, setTotalPlaced],
//     ['Placement Percentage', placementPercentage, setPlacementPercentage],
//     ['Internships', internships, setInternships],
//   ]

//   useEffect(() => {
//     const fetchData = async () => {
//       const result = await getAnalytics();
//       setData(result);

//       setCompaniesVisited(result.companiesVisited || 0);
//       setTotalPlaced(result.totalPlaced || 0);
//       setPlacementPercentage(result.placementPercentage || 0);
//       setInternships(result.interships || 0);
//       setSectors(result.sectors || {});
//       setBestCompanies(result.bestCompanies || {});
//       setCollegePerformance(result.collegePerformance || {});
//       setPlacementStats(result.placementStats || {})

//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     scrollToBottom();
//   }, [isEditOpen]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };
//   const updatedData = {
//     companiesVisited,
//     totalPlaced,
//     placementPercentage,
//     interships: internships,
//     sectors,
//     bestCompanies,
//     collegePerformance,
//     placementStats,
//   };

//   const handleEdit = () => {
//     setIsEditOpen(!isEditOpen);
//     if (isEditOpen) {
//       updateAnalytics(updatedData);
//     }
//   };
//   const handleCancel = () => {
//     setIsEditOpen(false);
//   }

//   const handleSectorChange = (sector, value) => {
//     setSectors((prevSectors) => ({
//       ...prevSectors,
//       [sector]: value,
//     }));
//   };

//   const handleBestCompaniesChange = (company, value) => {
//     setBestCompanies((prevCompanies) => ({
//       ...prevCompanies,
//       [company]: value,
//     }));
//   };

//   const handleCollegePerformanceChange = (year, value) => {
//     setCollegePerformance((prevPerformance) => ({
//       ...prevPerformance,
//       [year]: value,
//     }));
//   };

//   const handlePlacementStatsChange = (year, index, value) => {
//     setPlacementStats((prevStats) => ({
//       ...prevStats,
//       [year]: prevStats[year].map((val, i) => (i === index ? Number(value) : val)),
//     }));
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="flex bg-slate-200">
//       <div><Sidebar /></div>
//       <div>
//         <Cards data={updatedData} />
//         <CollegeInsights data={updatedData}/>
//         <AdminButtons handleEdit={handleEdit} isEditOpen={isEditOpen} handleCancel={handleCancel} authUser={authUser} />
        
//         {/* form */}
//         {authUser.role === 'admin' && isEditOpen && (
//           <form className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl mx-auto space-y-4">
//             {cardInfo.map(([title, value, setValue]) => (
//               <div key={title} className="flex flex-col">
//                 <label className="font-medium text-gray-700">{title}:</label>
//                 <input
//                   type="number"
//                   value={value}
//                   onChange={(e) => setValue(Number(e.target.value))}
//                   className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
//                 />
//               </div>
//             ))}

//             <div>
//               <label className="font-medium text-gray-700">Sectors:</label>
//               <div className="grid grid-cols-2 gap-4">
//                 {Object.entries(sectors).map(([key, value]) => (
//                   <div key={key} className="flex flex-col">
//                     <label className="text-sm text-gray-600">{key}:</label>
//                     <input
//                       type="number"
//                       value={value}
//                       onChange={(e) => handleSectorChange(key, Number(e.target.value))}
//                       className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <label className="font-medium text-gray-700">Best Companies:</label>
//               <div className="grid grid-cols-2 gap-4">
//                 {Object.entries(bestCompanies).map(([key, value]) => (
//                   <div key={key} className="flex flex-col">
//                     <label className="text-sm text-gray-600">{key}:</label>
//                     <input
//                       type="number"
//                       value={value}
//                       onChange={(e) => handleBestCompaniesChange(key, Number(e.target.value))}
//                       className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <label className="font-medium text-gray-700">College Performance:</label>
//               <div className="grid grid-cols-2 gap-4">
//                 {Object.entries(collegePerformance).map(([key, value]) => (
//                   <div key={key} className="flex flex-col">
//                     <label className="text-sm text-gray-600">{key}:</label>
//                     <input
//                       type="number"
//                       value={value}
//                       onChange={(e) => handleCollegePerformanceChange(key, Number(e.target.value))}
//                       className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <label className="font-medium text-gray-700">Placement Statistics:</label>
//               {Object.entries(placementStats).map(([year, values]) => (
//                 <div key={year} className="flex flex-col bg-gray-100 p-4 rounded-lg shadow-sm">
//                   <label className="text-gray-700 font-semibold">{year}:</label>
//                   <div className="grid grid-cols-3 gap-4 mt-2">
//                     {values.map((value, index) => (
//                       <input
//                         key={index}
//                         type="number"
//                         value={value}
//                         onChange={(e) => handlePlacementStatsChange(year, index, Number(e.target.value))}
//                         className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
//                       />
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div ref={messagesEndRef}></div>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AnalyticsDashboard; 