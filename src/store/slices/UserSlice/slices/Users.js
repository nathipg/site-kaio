import { createAsyncThunk } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from '@/constants';
import i18n from '@/i18n';
import { usersService } from '@/services';

import { USER_SLICE_NAME } from '../constants';

const { t } = i18n;

// Initial State
const initialState = {
  users: [],
  loadUsersStatus: REQUEST_STATUS.IDLE,
  loadUsersError: null,

  saveUserWorkoutsStatus: REQUEST_STATUS.IDLE,
  saveUserWorkoutsError: null,
  saveUserWorkoutsMessage: null,
};

// Reducers
const reducers = {
  clearLoadUsersError: (state) => {
    state.loadUsersError = null;
  },
  clearSaveUserWorkoutsError: (state) => {
    state.saveUserWorkoutsError = null;
  },
  clearSaveUserWorkoutsMessage: (state) => {
    state.saveUserWorkoutsMessage = null;
  },
};

// Async Thunk
const asyncThunk = {
  loadUsers: createAsyncThunk(`${USER_SLICE_NAME}/loadUsers`, async () => await usersService.loadUsers()),
  saveUserWorkouts: createAsyncThunk(`${USER_SLICE_NAME}/saveUserWorkouts`, async (data) => await usersService.saveUserWorkouts(data)),
};

// Extra Reducers
const extraReducers = (builder) => {
  builder
    .addCase(asyncThunk.loadUsers.pending, (state) => {
      state.loadUsersStatus = REQUEST_STATUS.LOADING;
    })
    .addCase(asyncThunk.loadUsers.fulfilled, (state, action) => {
      state.loadUsersStatus = REQUEST_STATUS.SUCCEEDED;
      state.users = action.payload;
    })
    .addCase(asyncThunk.loadUsers.rejected, (state, action) => {
      state.loadUsersStatus = REQUEST_STATUS.FAILED;
      state.loadUsersError = t(`error-message.load-users.${action.error.code}`);
    })
  ;

  builder
    .addCase(asyncThunk.saveUserWorkouts.pending, (state) => {
      state.saveUserWorkoutsStatus = REQUEST_STATUS.LOADING;
    })
    .addCase(asyncThunk.saveUserWorkouts.fulfilled, (state) => {
      state.saveUserWorkoutsStatus = REQUEST_STATUS.SUCCEEDED;
      state.saveUserWorkoutsMessage = t('Workout saved');
    })
    .addCase(asyncThunk.saveUserWorkouts.rejected, (state, action) => {
      state.saveUserWorkoutsStatus = REQUEST_STATUS.FAILED;
      state.saveUserWorkoutsError = t(`error-message.save-user-workouts.${action.error.code}`);
    })
  ;
};

// Selectors
const selectors = {
  selectUsers: state => {
    return state.users.users;
  },
  selectUserByUid: (userUid) => (state) => {
    return state.users.users.find(user => user.uid === userUid);
  },
  selectLoadUsersError: (state) => {
    return state.users.loadUsersError;
  },
  selectSaveUserWorkoutsError: (state) => {
    return state.users.saveUserWorkoutsError;
  },
  selectSaveUserWorkoutsMessage: (state) => {
    return state.users.saveUserWorkoutsMessage;
  },
};

export const Users = {
  initialState,
  reducers,
  asyncThunk,
  extraReducers,
  selectors,
};
