import { createAsyncThunk } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from '@/constants';
import i18n from '@/i18n';
import { workoutsService } from '@/services';

import { WORKOUT_SLICE_NAME } from '../constants';

const { t } = i18n;

// Initial State
const initialState = {
  workouts: [],
  loadWorkoutsStatus: REQUEST_STATUS.IDLE,
  loadWorkoutsError: null,

  saveWorkoutStatus: REQUEST_STATUS.IDLE,
  saveWorkoutError: null,
  saveWorkoutMessage: null,
};

// Reducers
const reducers = {
  clearLoadWorkoutsError: (state) => {
    state.loadWorkoutsError = null;
  },
  clearSaveWorkoutError: (state) => {
    state.saveWorkoutError = null;
  },
  clearSaveWorkoutMessage: (state) => {
    state.saveWorkoutMessage = null;
  },
};

// Async Thunk
const asyncThunk = {
  loadWorkouts: createAsyncThunk(`${WORKOUT_SLICE_NAME}/loadWorkouts`, async (date) => await workoutsService.loadWorkouts(date)),
  saveWorkout: createAsyncThunk(`${WORKOUT_SLICE_NAME}/saveWorkout`, async (data) => await workoutsService.saveWorkout(data)),
};

// Extra Reducers
const extraReducers = (builder) => {
  builder
    .addCase(asyncThunk.loadWorkouts.pending, (state) => {
      state.loadWorkoutsStatus = REQUEST_STATUS.LOADING;
    })
    .addCase(asyncThunk.loadWorkouts.fulfilled, (state, action) => {
      state.loadWorkoutsStatus = REQUEST_STATUS.SUCCEEDED;

      state.workouts = action.payload;
    })
    .addCase(asyncThunk.loadWorkouts.rejected, (state, action) => {
      state.loadWorkoutsStatus = REQUEST_STATUS.FAILED;
      state.loadWorkoutsError = t(`error-message.load-workouts.${action.error.code}`);
    });

  builder
    .addCase(asyncThunk.saveWorkout.pending, (state) => {
      state.saveWorkoutStatus = REQUEST_STATUS.LOADING;
    })
    .addCase(asyncThunk.saveWorkout.fulfilled, (state, action) => {
      state.saveWorkoutStatus = REQUEST_STATUS.SUCCEEDED;
      state.saveWorkoutMessage = t('Workout saved');

      state.workouts.unshift(action.payload);
    })
    .addCase(asyncThunk.saveWorkout.rejected, (state, action) => {
      state.saveWorkoutStatus = REQUEST_STATUS.FAILED;
      state.saveWorkoutError = t(`error-message.save-workout.${action.error.code}`);
    });
};

// Selectors
const selectors = {
  selectAllWorkouts: (state) => {
    return state.workouts.workouts;
  },
  selectLoadWorkoutsError: (state) => {
    return state.workouts.loadWorkoutsError;
  },
  selectSaveWorkoutMessage: (state) => {
    return state.workouts.saveWorkoutMessage;
  },
};

export const Workout = {
  initialState,
  reducers,
  asyncThunk,
  extraReducers,
  selectors,
};
