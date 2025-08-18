import { addDoc, collection, getDocs, getFirestore, orderBy, query } from 'firebase/firestore';

import { DB_KEYS } from './db-keys';
import { app } from './firebase-app';

const db = getFirestore(app);

export const loadWorkouts = async () => {
  const workoutsRef = collection(db, DB_KEYS.WORKOUTS);
  const q = query(workoutsRef, orderBy('createdAt', 'desc'));
  const querySnapshots = await getDocs(q);

  return querySnapshots.docs.map(doc => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
};

export const saveWorkout = async (data) => {
  const workoutsRef = collection(db, DB_KEYS.WORKOUTS);

  await addDoc(workoutsRef, data);
};
