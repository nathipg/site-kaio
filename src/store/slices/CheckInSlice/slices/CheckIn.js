import { createAsyncThunk } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from '@/constants';
import i18n from '@/i18n';
import { checkInsService } from '@/services';

import { CHECK_IN_SLICE_NAME } from '../constants';

const { t } = i18n;

// Initial State
const initialState = {
  checkIns: [],
  loadCheckInsStatus: REQUEST_STATUS.IDLE,
  loadCheckInsError: null,

  saveCheckInStatus: REQUEST_STATUS.IDLE,
  saveCheckInError: null,
  saveCheckInMessage: null,
};

// Reducers
const reducers = {
  clearLoadCheckInsError: (state) => {
    state.loadCheckInsError = null;
  },
  clearSaveCheckInError: (state) => {
    state.saveCheckInError = null;
  },
  clearSaveCheckInMessage: (state) => {
    state.saveCheckInMessage = null;
  },
};

// Async Thunk
const asyncThunk = {
  loadCheckIns: createAsyncThunk(`${CHECK_IN_SLICE_NAME}/loadCheckIns`, async (date) => await checkInsService.loadCheckIns(date)),
  saveCheckIn: createAsyncThunk(`${CHECK_IN_SLICE_NAME}/saveCheckIn`, async (data) => await checkInsService.saveCheckIn(data)),
};

// Extra Reducers
const extraReducers = (builder) => {
  builder
    .addCase(asyncThunk.loadCheckIns.pending, (state) => {
      state.loadCheckInsStatus = REQUEST_STATUS.LOADING;
    })
    .addCase(asyncThunk.loadCheckIns.fulfilled, (state, action) => {
      state.loadCheckInsStatus = REQUEST_STATUS.SUCCEEDED;

      state.checkIns = action.payload;
    })
    .addCase(asyncThunk.loadCheckIns.rejected, (state, action) => {
      state.loadCheckInsStatus = REQUEST_STATUS.FAILED;
      state.loadCheckInsError = t(`error-message.load-check-ins.${action.error.code}`);
    });

  builder
    .addCase(asyncThunk.saveCheckIn.pending, (state) => {
      state.saveCheckInStatus = REQUEST_STATUS.LOADING;
    })
    .addCase(asyncThunk.saveCheckIn.fulfilled, (state) => {
      state.saveCheckInStatus = REQUEST_STATUS.SUCCEEDED;
      state.saveCheckInMessage = t('Check-in saved');
    })
    .addCase(asyncThunk.saveCheckIn.rejected, (state, action) => {
      state.saveCheckInStatus = REQUEST_STATUS.FAILED;
      state.saveCheckInError = t(`error-message.save-check-in.${action.error.code}`);
    });
};

// Selectors
const selectors = {
  selectAllCheckIns: (state) => {
    return state.checkIns.checkIns || [];
  },
  selectLoadCheckInsError: (state) => {
    return state.checkIns.loadCheckInsError;
  },
  selectSaveCheckInError: (state) => {
    return state.checkIns.saveCheckInError;
  },
  selectSaveCheckInMessage: (state) => {
    return state.checkIns.saveCheckInMessage;
  },
};

export const CheckIn = {
  initialState,
  reducers,
  asyncThunk,
  extraReducers,
  selectors,
};
