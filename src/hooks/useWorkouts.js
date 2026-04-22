import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, addDoc, doc, updateDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export const useWorkouts = (uid, dateRange) => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!uid) return;

    const q = query(
      collection(db, 'workouts'),
      where('uid', '==', uid),
      where('date', '>=', dateRange.start),
      where('date', '<=', dateRange.end)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setWorkouts(data);
      setLoading(false);
    }, (err) => {
      setError(err.message);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [uid, dateRange]);

  return { workouts, loading, error };
};

export const saveWorkout = async (uid, workout) => {
  try {
    const docRef = await addDoc(collection(db, 'workouts'), workout);
    console.log('Workout saved:', docRef.id);
    return docRef.id;
  } catch (err) {
    console.error('Error saving workout:', err);
    throw err;
  }
};

export const updateWorkout = async (workoutId, workout) => {
  try {
    const docRef = doc(db, 'workouts', workoutId);
    await updateDoc(docRef, workout);
    console.log('Workout updated');
  } catch (err) {
    console.error('Error updating workout:', err);
    throw err;
  }
};

export const loadWorkout = async (uid, date) => {
  try {
    const q = query(collection(db, 'workouts'), where('uid', '==', uid), where('date', '==', date));
    const snapshot = await getDocs(q);
    return snapshot.docs.length > 0 ? snapshot.docs[0].data() : null;
  } catch (err) {
    console.error('Error loading workout:', err);
    return null;
  }
};