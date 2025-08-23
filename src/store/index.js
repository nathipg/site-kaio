import { configureStore } from '@reduxjs/toolkit';

import { ExerciseSlice, UserSlice, CheckInSlice } from './slices';

export const store = configureStore({
  reducer: {
    users: UserSlice.reducer,
    exercises: ExerciseSlice.reducer,
    checkIns: CheckInSlice.reducer,
  },
});
