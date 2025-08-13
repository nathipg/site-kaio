import { buildSlice } from '@/store/slices/functions';

import { EXERCISE_SLICE_NAME } from './constants';
import * as sliceParts from './slices';

export const ExerciseSlice = buildSlice({
  sliceName: EXERCISE_SLICE_NAME,
  sliceParts,
});

