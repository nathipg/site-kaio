import { configureStore } from '@reduxjs/toolkit';

import { ExerciseSlice, UserSlice } from './slices';

export const store = configureStore({
  reducer: {
    users: UserSlice.reducer,
    exercises: ExerciseSlice.reducer,
  },
});
