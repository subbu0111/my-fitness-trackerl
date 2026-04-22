import { useState } from 'react';
import DailyLog from './components/DailyLog';
import Dashboard from './components/Dashboard';

function App() {
  const [view, setView] = useState('log');

  return (
    <div className="App">
      <nav className="bg-white shadow-lg border-b fixed w-full z-50 top-0">
        <div className="max-w-4xl mx-auto px-4 py-3 flex justify-center space-x-8">
          <button 
            onClick={() => setView('log')}
            className={`font-semibold py-2 px-4 rounded-lg transition-all ${
              view === 'log' 
                ? 'bg-blue-500 text-white shadow-md' 
                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
            }`}
          >
            Daily Log
          </button>
          <button 
            onClick={() => setView('dashboard')}
            className={`font-semibold py-2 px-4 rounded-lg transition-all ${
              view === 'dashboard' 
                ? 'bg-purple-500 text-white shadow-md' 
                : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
            }`}
          >
            Dashboard
          </button>
        </div>
      </nav>
      <div className="pt-20">
        {view === 'log' ? <DailyLog /> : <Dashboard />}
      </div>
    </div>
  );
}

export default App;
