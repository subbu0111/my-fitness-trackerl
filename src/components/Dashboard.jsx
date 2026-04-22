import { useState } from 'react';

const Dashboard = () => {
  const [selectedWeek, setSelectedWeek] = useState('current');

  const weeks = ['current', 'prev', 'week-2', 'week-3'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4 pb-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Fitness Dashboard</h1>
        
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Week:</label>
          <select 
            value={selectedWeek} 
            onChange={(e) => setSelectedWeek(e.target.value)}
            className="w-full max-w-xs p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {weeks.map(week => (
              <option key={week} value={week}>{week}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Placeholder charts and logs */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="font-bold text-xl mb-4">Curls Progress</h2>
            <div className="h-48 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              Chart Placeholder (Week: {selectedWeek})
            </div>
            <p className="text-sm text-gray-500 mt-3">+15% WoW</p>
          </div>
          {/* More activity cards */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="font-bold text-xl mb-4">Squats Progress</h2>
            <div className="h-48 bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex items-center justify-center text-white font-bold">
              Chart Placeholder
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="font-bold text-xl mb-4">Past Logs</h2>
          <p className="text-gray-500">Logs for {selectedWeek} week loading... (Firestore next)</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
