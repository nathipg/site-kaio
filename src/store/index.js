import { configureStore } from '@reduxjs/toolkit';

import { ExerciseSlice, UserSlice, WorkoutSlice } from './slices';

export const store = configureStore({
  reducer: {
    users: UserSlice.reducer,
    exercises: ExerciseSlice.reducer,
    workouts: WorkoutSlice.reducer,
  },
});
