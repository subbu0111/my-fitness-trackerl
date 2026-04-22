import { useState } from 'react';

const ActivityForm = ({ 
  activityName, 
  sets = [], 
  completed = false, 
  onUpdateSets, 
  onToggleComplete 
}) => {
  const [newReps, setNewReps] = useState('');
  const [newWeight, setNewWeight] = useState('');

  const addSet = () => {
    if (newReps.trim() !== '') {
      const reps = parseInt(newReps);
      if (!isNaN(reps) && reps > 0) {
        onUpdateSets([...sets, { 
          reps, 
          weight: newWeight.trim() ? parseFloat(newWeight) : undefined 
        }]);
        setNewReps('');
        setNewWeight('');
      }
    }
  };

  const removeSet = (index) => {
    onUpdateSets(sets.filter((_, i) => i !== index));
  };

  return (
    <div className="border border-gray-200 p-4 rounded-lg mb-4 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-lg text-gray-800">{activityName}</h3>
        <label className="flex items-center space-x-2">
          <input 
            type="checkbox" 
            checked={completed} 
            onChange={(e) => onToggleComplete(e.target.checked)}
            className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-700">Done</span>
        </label>
      </div>
      <div className="space-y-3">
        {sets.length > 0 && (
          <div className="space-y-2 mb-3">
            {sets.map((set, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                <span className="font-mono text-sm">
                  Set {index + 1}: {set.reps} reps {set.weight && `(${set.weight.toFixed(1)}kg)`}
                </span>
                <button 
                  onClick={() => removeSet(index)}
                  className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded font-medium transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-gray-200">
          <input 
            type="number" 
            value={newReps} 
            onChange={(e) => setNewReps(e.target.value)} 
            placeholder="Reps" 
            min="1"
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input 
            type="number" 
            value={newWeight} 
            onChange={(e) => setNewWeight(e.target.value)} 
            placeholder="Weight (kg)" 
            min="0"
            step="0.5"
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button 
            onClick={addSet} 
            disabled={!newReps.trim()}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-all flex-shrink-0"
          >
            Add Set
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityForm;
