import { buildSlice } from '@/store/slices/functions';

import { CHECK_IN_SLICE_NAME } from './constants';
import * as sliceParts from './slices';

export const CheckInSlice = buildSlice({
  sliceName: CHECK_IN_SLICE_NAME,
  sliceParts,
});

