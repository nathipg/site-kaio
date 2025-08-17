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
};

// Reducers
const reducers = {};

// Async Thunk
const asyncThunk = {
  loadUsers: createAsyncThunk(`${USER_SLICE_NAME}/loadUsers`, async () => await usersService.loadUsers()),
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
};

// Selectors
const selectors = {
  selectUsers: state => {
    return state.users.users;
  },
  selectLoadUsersError: (state) => {
    return state.users.loadUsersError;
  },
};

export const Users = {
  initialState,
  reducers,
  asyncThunk,
  extraReducers,
  selectors,
};
