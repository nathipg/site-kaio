import { configureStore } from '@reduxjs/toolkit';

import { UserSlice } from './slices';

export const store = configureStore({
  reducer: {
    users: UserSlice.reducer,
  },
});
