import { createAsyncThunk } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from '@/constants';
import i18n from '@/i18n';
import { exercisesService } from '@/services';

import { EXERCISE_SLICE_NAME } from '../constants';

const { t } = i18n;

// Initial State
const initialState = {
  exercises: [],
  loadExercisesStatus: REQUEST_STATUS.IDLE,
  loadExercisesError: null,

  addExerciseStatus: REQUEST_STATUS.IDLE,
  addExerciseError: null,
};

// Reducers
const reducers = {
  clearLoadExercisesError: (state) => {
    state.loadExercisesError = null;
  },
  clearAddExerciseError: (state) => {
    state.addExerciseError = null;
  },
};

// Async Thunk
const asyncThunk = {
  loadExercises: createAsyncThunk(`${EXERCISE_SLICE_NAME}/loadExercises`, async () => await exercisesService.loadExercises()),
  addExercise: createAsyncThunk(`${EXERCISE_SLICE_NAME}/addExercise`, async (data) => await exercisesService.addExercise(data)),
};

// Extra Reducers
const extraReducers = (builder) => {
  builder
    .addCase(asyncThunk.loadExercises.pending, (state) => {
      state.loadExercisesStatus = REQUEST_STATUS.LOADING;
    })
    .addCase(asyncThunk.loadExercises.fulfilled, (state, action) => {
      state.loadExercisesStatus = REQUEST_STATUS.SUCCEEDED;
      state.exercises = action.payload;
    })
    .addCase(asyncThunk.loadExercises.rejected, (state, action) => {
      state.loadExercisesStatus = REQUEST_STATUS.FAILED;
      state.loadExercisesError = t(`error-message.load-exercises.${action.error.code}`);
    });

  builder
    .addCase(asyncThunk.addExercise.pending, (state) => {
      state.addExercisetatus = REQUEST_STATUS.LOADING;
    })
    .addCase(asyncThunk.addExercise.fulfilled, (state, action) => {
      state.addExercisetatus = REQUEST_STATUS.SUCCEEDED;
      state.exercises.push(action.payload);
    })
    .addCase(asyncThunk.addExercise.rejected, (state, action) => {
      state.addExercisetatus = REQUEST_STATUS.FAILED;
      state.addExerciseError = t(`error-message.add-exercise.${action.error.code}`);
    });
};

// Selectors
const selectors = {
  selectAllExercises: (state) => {
    return state.exercises.exercises;
  },
  selectExerciseById: (exerciseId) => (state) => {
    return state.exercises.exercises.find(exercise => exercise.id === exerciseId);
  },
  selectLoadExercisesError: (state) => {
    return state.exercises.loadExercisesError;
  },
  selectLoadExercisesStatus: (state) => {
    return state.exercises.loadExercisesStatus;
  },

  selectAddExerciseError: (state) => {
    return state.exercises.addExerciseError;
  },
  selectAddExerciseStatus: (state) => {
    return state.exercises.addExerciseStatus;
  },
};

export const LoadSongs = {
  initialState,
  reducers,
  asyncThunk,
  extraReducers,
  selectors,
};
