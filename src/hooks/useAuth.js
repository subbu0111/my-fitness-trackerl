import { useState, useEffect } from 'react';
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { auth } from '../firebase';

export const useAuth = () => {
  const [uid, setUid] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      } else {
        signInAnonymously(auth).catch((err) => {
          setError(err.message);
        });
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return { uid, loading, error };
};