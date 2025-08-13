import { firebaseService } from './firebase';

export const addExercise = async (data) => {
  return await firebaseService.exercise.addExercise(data);
};

export const loadExercises = async () => {
  return await firebaseService.exercise.loadExercises();
};
