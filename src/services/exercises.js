import { firebaseService } from './firebase';

export const addExercise = async (data) => {
  return await firebaseService.exercise.addExercise(data);
};

export const loadExercises = async () => {
  return await firebaseService.exercise.loadExercises();
};

export const removeExercise = async (id) => {
  return await firebaseService.exercise.removeExercise(id);
};

export const saveExercise = async (data) => {
  return await firebaseService.exercise.saveExercise(data);
};
