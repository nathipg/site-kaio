import { firebaseService } from './firebase';

export const loadWorkouts = async (date) => {
  return await firebaseService.workout.loadWorkouts(date);
};

export const saveWorkout = async (data) => {
  return await firebaseService.workout.saveWorkout(data);
};
