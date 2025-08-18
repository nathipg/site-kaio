import { firebaseService } from './firebase';

export const loadWorkouts = async () => {
  return await firebaseService.workout.loadWorkouts();
};

export const saveWorkout = async (data) => {
  return await firebaseService.workout.saveWorkout(data);
};
