import { buildSlice } from '@/store/slices/functions';

import { WORKOUT_SLICE_NAME } from './constants';
import * as sliceParts from './slices';

export const WorkoutSlice = buildSlice({
  sliceName: WORKOUT_SLICE_NAME,
  sliceParts,
});

