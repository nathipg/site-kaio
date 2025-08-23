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

  saveExerciseStatus: REQUEST_STATUS.IDLE,
  saveExerciseError: null,

  removeExerciseStatus: REQUEST_STATUS.IDLE,
  removeExerciseError: null,
};

// Reducers
const reducers = {
  clearLoadExercisesError: (state) => {
    state.loadExercisesError = null;
  },
  clearAddExerciseError: (state) => {
    state.addExerciseError = null;
  },
  clearSaveExerciseError: (state) => {
    state.saveExerciseError = null;
  },
  setSaveExerciseError: (state, action) => {
    state.saveExerciseError = action.payload;
  },
};

// Async Thunk
const asyncThunk = {
  loadExercises: createAsyncThunk(`${EXERCISE_SLICE_NAME}/loadExercises`, async () => await exercisesService.loadExercises()),
  addExercise: createAsyncThunk(`${EXERCISE_SLICE_NAME}/addExercise`, async (data) => await exercisesService.addExercise(data)),
  saveExercise: createAsyncThunk(`${EXERCISE_SLICE_NAME}/saveExercise`, async (data) => await exercisesService.saveExercise(data)),
  removeExercise: createAsyncThunk(`${EXERCISE_SLICE_NAME}/removeExercise`, async (id) => await exercisesService.removeExercise(id)),
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
      state.addExerciseStatus = REQUEST_STATUS.LOADING;
    })
    .addCase(asyncThunk.addExercise.fulfilled, (state, action) => {
      state.addExerciseStatus = REQUEST_STATUS.SUCCEEDED;
      state.exercises.unshift(action.payload);
    })
    .addCase(asyncThunk.addExercise.rejected, (state, action) => {
      state.addExerciseStatus = REQUEST_STATUS.FAILED;
      state.addExerciseError = t(`error-message.add-exercise.${action.error.code}`);
    });

  builder
    .addCase(asyncThunk.saveExercise.pending, (state) => {
      state.saveExerciseStatus = REQUEST_STATUS.LOADING;
    })
    .addCase(asyncThunk.saveExercise.fulfilled, (state, action) => {
      state.saveExerciseStatus = REQUEST_STATUS.SUCCEEDED;

      const updatedExercise = action.payload;
      const existingExerciseIndex = state.exercises.findIndex(exercise => exercise.id == updatedExercise.id);

      state.exercises[existingExerciseIndex] = { ...updatedExercise };
    })
    .addCase(asyncThunk.saveExercise.rejected, (state, action) => {
      state.saveExerciseStatus = REQUEST_STATUS.FAILED;
      state.saveExerciseError = t(`error-message.save-exercise.${action.error.code}`);
    });

  builder
    .addCase(asyncThunk.removeExercise.pending, (state) => {
      state.removeExerciseStatus = REQUEST_STATUS.LOADING;
    })
    .addCase(asyncThunk.removeExercise.fulfilled, (state, action) => {
      state.removeExerciseStatus = REQUEST_STATUS.SUCCEEDED;

      const exerciseIndex = state.exercises.findIndex(exercise => exercise.id == action.payload.id);
      state.exercises.splice(exerciseIndex, 1);
    })
    .addCase(asyncThunk.removeExercise.rejected, (state, action) => {
      state.removeExerciseStatus = REQUEST_STATUS.FAILED;
      state.removeExerciseError = t(`error-message.remove-exercise.${action.error.code}`);
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
  selectSaveExerciseError: (state) => {
    return state.exercises.saveExerciseError;
  },
  selectRemoveExerciseError: (state) => {
    return state.exercises.removeExerciseError;
  },
};

export const Exercise = {
  initialState,
  reducers,
  asyncThunk,
  extraReducers,
  selectors,
};
