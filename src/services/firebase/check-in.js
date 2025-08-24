import { addDoc, collection, getDocs, getFirestore, orderBy, query, where } from 'firebase/firestore';

import { DB_KEYS } from './db-keys';
import { app } from './firebase-app';

const db = getFirestore(app);

const internalLoadCheckIns = async (date, userUid = null) => {
  const start = date;
  const end = new Date((new Date(date)).getTime() + 24 * 60 * 60 * 1000).toISOString(); // add 24 hours to date

  const checkInsRef = collection(db, DB_KEYS.CHECK_INS);
  const q = query(
    checkInsRef,
    userUid ? where('userUid', '==', userUid) : null,
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

export const loadCheckIns = async (date) => {
  return internalLoadCheckIns(date);
};

export const loadUserCheckIns = async (date, userUid) => {
  return internalLoadCheckIns(date, userUid);
};

export const saveCheckIn = async (data) => {
  const checkInsRef = collection(db, DB_KEYS.CHECK_INS);

  await addDoc(checkInsRef, data);
};
