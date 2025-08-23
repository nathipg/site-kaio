import { addDoc, collection, getDocs, getFirestore, orderBy, query, where } from 'firebase/firestore';

import { DB_KEYS } from './db-keys';
import { app } from './firebase-app';

const db = getFirestore(app);

export const loadWorkouts = async (date) => {
  const start = date;
  const end = new Date((new Date(date)).getTime() + 24 * 60 * 60 * 1000).toISOString(); // add 24 hours to date

  const workoutsRef = collection(db, DB_KEYS.WORKOUTS);
  const q = query(
    workoutsRef,
    where('createdAt', '>=', start),
    where('createdAt', '<=', end),
    orderBy('createdAt', 'desc'),
  );
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
