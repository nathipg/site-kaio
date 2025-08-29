import { getFirestore, collection, getDocs, addDoc, getDoc, doc, setDoc, deleteDoc, orderBy, query, where } from 'firebase/firestore';

import { DB_KEYS } from './db-keys';
import { app } from './firebase-app';

const db = getFirestore(app);

export const addPublication = async (data) => {
  const publicationsRef = collection(db, DB_KEYS.PUBLICATIONS);
  const docRef = await addDoc(publicationsRef, data);
  const docSnap = await getDoc(docRef);

  return {
    id: docSnap.id,
    ...docSnap.data(),
  };
};

export const loadPublications = async () => {
  const publicationsRef = collection(db, DB_KEYS.PUBLICATIONS);
  const q = query(publicationsRef, orderBy('createdAt', 'desc'));
  const publicationsSnapshot = await getDocs(q);

  return publicationsSnapshot.docs.map(doc => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
};

export const loadPublishedPublications = async () => {
  const publicationsRef = collection(db, DB_KEYS.PUBLICATIONS);
  const q = query(
    publicationsRef,
    where('isPublished', '==', true),
    orderBy('createdAt', 'desc'),
  );
  const publicationsSnapshot = await getDocs(q);

  return publicationsSnapshot.docs.map(doc => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
};

export const removePublication = async (id) => {
  const publicationRef = doc(db, DB_KEYS.PUBLICATIONS, id);

  await deleteDoc(publicationRef);

  return { id };
};

export const savePublication = async (data) => {
  const { id, ...otherData } = data;

  const publicationRef = doc(db, DB_KEYS.PUBLICATIONS, id);

  await setDoc(publicationRef, otherData);

  return data;
};
