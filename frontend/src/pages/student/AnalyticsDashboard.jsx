import { useState, useEffect, useRef } from 'react';
import { useAuthContext } from '../../context/AuthContext';

import Sidebar from '../../components/Sidebar';
import Cards from '../../components/analytics/Cards';
import useGetAnalytics from '../../api/analytics/useGetAnalytics';
import AdminButtons from '../../components/analytics/AdminButtons'
import useUpdateAnalytics from '../../api/analytics/useUpdateAnalytics';
import CollegeInsights from '../../components/analytics/CollegeInsights';



const AnalyticsDashboard = () => {
  const { getAnalytics, loading } = useGetAnalytics();
  const { updateAnalytics, editLoading } = useUpdateAnalytics();
  const [data, setData] = useState({});
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { authUser } = useAuthContext();
  const messagesEndRef = useRef(null);

  // Form States
  const [companiesVisited, setCompaniesVisited] = useState(0);
  const [totalPlaced, setTotalPlaced] = useState(0);
  const [placementPercentage, setPlacementPercentage] = useState(0);
  const [internships, setInternships] = useState(0);
  const [sectors, setSectors] = useState({});
  const [bestCompanies, setBestCompanies] = useState({});
  const [collegePerformance, setCollegePerformance] = useState({});
  const [placementStats, setPlacementStats] = useState({});

  const cardInfo = [
    ['Companies visited', companiesVisited, setCompaniesVisited],
    ['Total Students Placed', totalPlaced, setTotalPlaced],
    ['Placement Percentage', placementPercentage, setPlacementPercentage],
    ['Internships', internships, setInternships],
  ]

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAnalytics();
      setData(result);

      setCompaniesVisited(result.companiesVisited || 0);
      setTotalPlaced(result.totalPlaced || 0);
      setPlacementPercentage(result.placementPercentage || 0);
      setInternships(result.interships || 0);
      setSectors(result.sectors || {});
      setBestCompanies(result.bestCompanies || {});
      setCollegePerformance(result.collegePerformance || {});
      setPlacementStats(result.placementStats || {})

    };
    fetchData();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [isEditOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const updatedData = {
    companiesVisited,
    totalPlaced,
    placementPercentage,
    interships: internships,
    sectors,
    bestCompanies,
    collegePerformance,
    placementStats,
  };

  const handleEdit = () => {
    setIsEditOpen(!isEditOpen);
    if (isEditOpen) {
      updateAnalytics(updatedData);
    }
  };
  const handleCancel = () => {
    setIsEditOpen(false);
  }

  const handleSectorChange = (sector, value) => {
    setSectors((prevSectors) => ({
      ...prevSectors,
      [sector]: value,
    }));
  };

  const handleBestCompaniesChange = (company, value) => {
    setBestCompanies((prevCompanies) => ({
      ...prevCompanies,
      [company]: value,
    }));
  };

  const handleCollegePerformanceChange = (year, value) => {
    setCollegePerformance((prevPerformance) => ({
      ...prevPerformance,
      [year]: value,
    }));
  };

  const handlePlacementStatsChange = (year, index, value) => {
    setPlacementStats((prevStats) => ({
      ...prevStats,
      [year]: prevStats[year].map((val, i) => (i === index ? Number(value) : val)),
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex bg-slate-200">
      <div><Sidebar /></div>
      <div>
        <Cards data={updatedData} />
        <CollegeInsights data={updatedData}/>
        <AdminButtons handleEdit={handleEdit} isEditOpen={isEditOpen} handleCancel={handleCancel} authUser={authUser} />
        
        {/* form */}
        {authUser.role === 'admin' && isEditOpen && (
          <form className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl mx-auto space-y-4">
            {cardInfo.map(([title, value, setValue]) => (
              <div key={title} className="flex flex-col">
                <label className="font-medium text-gray-700">{title}:</label>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(Number(e.target.value))}
                  className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                />
              </div>
            ))}

            <div>
              <label className="font-medium text-gray-700">Sectors:</label>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(sectors).map(([key, value]) => (
                  <div key={key} className="flex flex-col">
                    <label className="text-sm text-gray-600">{key}:</label>
                    <input
                      type="number"
                      value={value}
                      onChange={(e) => handleSectorChange(key, Number(e.target.value))}
                      className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="font-medium text-gray-700">Best Companies:</label>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(bestCompanies).map(([key, value]) => (
                  <div key={key} className="flex flex-col">
                    <label className="text-sm text-gray-600">{key}:</label>
                    <input
                      type="number"
                      value={value}
                      onChange={(e) => handleBestCompaniesChange(key, Number(e.target.value))}
                      className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="font-medium text-gray-700">College Performance:</label>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(collegePerformance).map(([key, value]) => (
                  <div key={key} className="flex flex-col">
                    <label className="text-sm text-gray-600">{key}:</label>
                    <input
                      type="number"
                      value={value}
                      onChange={(e) => handleCollegePerformanceChange(key, Number(e.target.value))}
                      className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="font-medium text-gray-700">Placement Statistics:</label>
              {Object.entries(placementStats).map(([year, values]) => (
                <div key={year} className="flex flex-col bg-gray-100 p-4 rounded-lg shadow-sm">
                  <label className="text-gray-700 font-semibold">{year}:</label>
                  <div className="grid grid-cols-3 gap-4 mt-2">
                    {values.map((value, index) => (
                      <input
                        key={index}
                        type="number"
                        value={value}
                        onChange={(e) => handlePlacementStatsChange(year, index, Number(e.target.value))}
                        className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div ref={messagesEndRef}></div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
