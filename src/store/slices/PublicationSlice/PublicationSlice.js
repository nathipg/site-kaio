import { buildSlice } from '@/store/slices/functions';

import { PUBLICATION_SLICE_NAME } from './constants';
import * as sliceParts from './slices';

export const PublicationSlice = buildSlice({
  sliceName: PUBLICATION_SLICE_NAME,
  sliceParts,
});

