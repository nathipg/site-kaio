import { getFirestore, collection, getDocs, addDoc, getDoc } from 'firebase/firestore';

import { DB_KEYS } from './db-keys';
import { app } from './firebase-app';

const db = getFirestore(app);

export const addExercise = async (data) => {
  const exercisesRef = collection(db, DB_KEYS.EXERCISES);
  const docRef = await addDoc(exercisesRef, data);
  const docSnap = await getDoc(docRef);

  return {
    id: docSnap.id,
    ...docSnap.data(),
  };
};

export const loadExercises = async () => {
  const exercisesRef = collection(db, DB_KEYS.EXERCISES);
  const exercisesSnapshot = await getDocs(exercisesRef);

  return exercisesSnapshot.docs.map(doc => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
};
