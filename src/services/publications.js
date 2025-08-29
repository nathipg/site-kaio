import { firebaseService } from './firebase';

export const addPublication = async (data) => {
  return await firebaseService.publication.addPublication(data);
};

export const loadPublications = async () => {
  return await firebaseService.publication.loadPublications();
};

export const loadPublishedPublications = async () => {
  return await firebaseService.publication.loadPublishedPublications();
};

export const removePublication = async (id) => {
  return await firebaseService.publication.removePublication(id);
};

export const savePublication = async (data) => {
  return await firebaseService.publication.savePublication(data);
};
