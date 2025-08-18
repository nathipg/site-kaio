import { doc, setDoc, getFirestore, getDoc, collection, getDocs, writeBatch } from 'firebase/firestore';

import { firebaseService } from '@/services';

import { DB_KEYS } from './db-keys';
import { app } from './firebase-app';

const db = getFirestore(app);

export const addUser = async (data) => {
  const { email, password, ...otherUserData } = data;

  const { uid } = await firebaseService.auth.signUp(email, password);

  await setDoc(
    doc(db, DB_KEYS.USERS, uid),
    {
      uid,
      email,
      ...otherUserData,
    },
  );
};

export const loadUser = async (uid) => {
  const docRef = doc(db, DB_KEYS.USERS, uid);
  const docSnap = await getDoc(docRef);

  if(docSnap.exists()) {
    const userData = docSnap.data();

    return {
      ...userData,
    };
  }

  return null;
};

export const loadUsers = async () => {
  const collectionRef = collection(db, DB_KEYS.USERS);
  const docsSnap = await getDocs(collectionRef);

  const users = docsSnap.docs.map(doc => doc.data());

  return users;
};


export const saveUserWorkouts = async (data) => {
  const { uid, workouts } = data;

  const workoutsRef = collection(db, DB_KEYS.USERS, uid, DB_KEYS.WORKOUTS);
  const workoutsSnapshot = await getDocs(workoutsRef);

  const batch = writeBatch(db);

  workoutsSnapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });

  const userRef = doc(db, DB_KEYS.USERS, uid);

  batch.update(userRef, {
    workouts,
  });

  await batch.commit();
};

export const signInUser = async (userData) => {
  const { email, password } = userData;

  const loginInfo = await firebaseService.auth.signIn(email, password);

  return await loadUser(loginInfo.uid);
};
