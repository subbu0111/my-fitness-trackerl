import { useState, useEffect } from 'react';
import { saveWorkout } from '../hooks/useWorkouts';
import ActivityForm from './ActivityForm';
import { defaultActivities } from '../data/defaultActivities';

const DailyLog = ({ uid }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  useEffect(() => {
    if (!uid) {
      setLoading(false);
      return;
    }

    // TODO: Load today's workout from Firestore using uid/date
    // For now, init with defaults
    const initActivities = defaultActivities.map(name => ({
      name,
      sets: [],
      completed: false
    }));
    setActivities(initActivities);
    setLoading(false);
  }, [uid]);

  const updateSets = (activityName, newSets) => {
    setActivities(activities.map(act => 
      act.name === activityName ? { ...act, sets: newSets } : act
    ));
  };

  const toggleComplete = (activityName, completed) => {
    setActivities(activities.map(act => 
      act.name === activityName ? { ...act, completed } : act
    ));
  };

  const handleSaveWorkout = async () => {
    if (!uid) return;

    setSaving(true);
    try {
      const workoutData = {
        uid,
        date: today,
        activities
      };
      await saveWorkout(uid, workoutData);
      alert('Workout saved to Firestore!');
    } catch (err) {
      console.error('Save error:', err);
      alert('Save failed - check Firebase config');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 pb-20">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Daily Workout Log</h1>
        <p className="text-center text-gray-600 mb-8 text-lg">{today}</p>
        
        <div className="space-y-4 mb-8">
          {activities.map(activity => (
            <ActivityForm
              key={activity.name}
              activityName={activity.name}
              sets={activity.sets}
              completed={activity.completed}
              onUpdateSets={(newSets) => updateSets(activity.name, newSets)}
              onToggleComplete={(completed) => toggleComplete(activity.name, completed)}
            />
          ))}
        </div>

        <button 
          onClick={handleSaveWorkout}
          disabled={saving || !uid}
          className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-bold py-4 px-8 rounded-xl text-xl shadow-lg hover:shadow-xl transition-all duration-200"
        >
          {saving ? 'Saving...' : 'Save Today\'s Workout'}
        </button>
      </div>
    </div>
  );
};

export default DailyLog;
