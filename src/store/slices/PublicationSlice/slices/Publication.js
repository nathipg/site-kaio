import { createAsyncThunk } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from '@/constants';
import i18n from '@/i18n';
import { publicationsService } from '@/services';

import { PUBLICATION_SLICE_NAME } from '../constants';

const { t } = i18n;

// Initial State
const initialState = {
  publications: [],
  loadPublicationsStatus: REQUEST_STATUS.IDLE,
  loadPublicationsError: null,

  addPublicationStatus: REQUEST_STATUS.IDLE,
  addPublicationError: null,

  savePublicationStatus: REQUEST_STATUS.IDLE,
  savePublicationError: null,
  savePublicationMessage: null,

  removePublicationStatus: REQUEST_STATUS.IDLE,
  removePublicationError: null,
};

// Reducers
const reducers = {
  clearLoadPublicationsError: (state) => {
    state.loadPublicationsError = null;
  },
  clearAddPublicationError: (state) => {
    state.addPublicationError = null;
  },
  clearSavePublicationError: (state) => {
    state.savePublicationError = null;
  },
  setSavePublicationError: (state, action) => {
    state.savePublicationError = action.payload;
  },
  clearSavePublicationMessage: (state) => {
    state.savePublicationMessage = null;
  },
};

// Async Thunk
const asyncThunk = {
  loadPublications: createAsyncThunk(`${PUBLICATION_SLICE_NAME}/loadPublications`, async () => await publicationsService.loadPublications()),
  loadPublishedPublications: createAsyncThunk(`${PUBLICATION_SLICE_NAME}/loadPublishedPublications`, async () => await publicationsService.loadPublishedPublications()),
  addPublication: createAsyncThunk(`${PUBLICATION_SLICE_NAME}/addPublication`, async (data) => await publicationsService.addPublication(data)),
  savePublication: createAsyncThunk(`${PUBLICATION_SLICE_NAME}/savePublication`, async (data) => await publicationsService.savePublication(data)),
  removePublication: createAsyncThunk(`${PUBLICATION_SLICE_NAME}/removePublication`, async (id) => await publicationsService.removePublication(id)),
};

// Extra Reducers
const extraReducers = (builder) => {
  builder
    .addCase(asyncThunk.loadPublications.pending, (state) => {
      state.loadPublicationsStatus = REQUEST_STATUS.LOADING;
    })
    .addCase(asyncThunk.loadPublications.fulfilled, (state, action) => {
      state.loadPublicationsStatus = REQUEST_STATUS.SUCCEEDED;
      state.publications = action.payload;
    })
    .addCase(asyncThunk.loadPublications.rejected, (state, action) => {
      state.loadPublicationsStatus = REQUEST_STATUS.FAILED;
      state.loadPublicationsError = t(`error-message.load-publications.${action.error.code}`);
    });

  builder
    .addCase(asyncThunk.loadPublishedPublications.pending, (state) => {
      state.loadPublicationsStatus = REQUEST_STATUS.LOADING;
    })
    .addCase(asyncThunk.loadPublishedPublications.fulfilled, (state, action) => {
      state.loadPublicationsStatus = REQUEST_STATUS.SUCCEEDED;
      state.publications = action.payload;
    })
    .addCase(asyncThunk.loadPublishedPublications.rejected, (state, action) => {
      state.loadPublicationsStatus = REQUEST_STATUS.FAILED;
      state.loadPublicationsError = t(`error-message.load-publications.${action.error.code}`);
      console.error(action.error);
    });

  builder
    .addCase(asyncThunk.addPublication.pending, (state) => {
      state.addPublicationStatus = REQUEST_STATUS.LOADING;
    })
    .addCase(asyncThunk.addPublication.fulfilled, (state, action) => {
      state.addPublicationStatus = REQUEST_STATUS.SUCCEEDED;
      state.publications.unshift(action.payload);
    })
    .addCase(asyncThunk.addPublication.rejected, (state, action) => {
      state.addPublicationStatus = REQUEST_STATUS.FAILED;
      state.addPublicationError = t(`error-message.add-publication.${action.error.code}`);
    });

  builder
    .addCase(asyncThunk.savePublication.pending, (state) => {
      state.savePublicationStatus = REQUEST_STATUS.LOADING;
    })
    .addCase(asyncThunk.savePublication.fulfilled, (state, action) => {
      state.savePublicationStatus = REQUEST_STATUS.SUCCEEDED;

      const updatedPublication = action.payload;
      const existingPublicationIndex = state.publications.findIndex(publication => publication.id == updatedPublication.id);

      state.publications[existingPublicationIndex] = { ...updatedPublication };

      state.savePublicationMessage = t('Saved');
    })
    .addCase(asyncThunk.savePublication.rejected, (state, action) => {
      state.savePublicationStatus = REQUEST_STATUS.FAILED;
      state.savePublicationError = t(`error-message.save-publication.${action.error.code}`);
    });

  builder
    .addCase(asyncThunk.removePublication.pending, (state) => {
      state.removePublicationStatus = REQUEST_STATUS.LOADING;
    })
    .addCase(asyncThunk.removePublication.fulfilled, (state, action) => {
      state.removePublicationStatus = REQUEST_STATUS.SUCCEEDED;

      const publicationIndex = state.publications.findIndex(publication => publication.id == action.payload.id);
      state.publications.splice(publicationIndex, 1);
    })
    .addCase(asyncThunk.removePublication.rejected, (state, action) => {
      state.removePublicationStatus = REQUEST_STATUS.FAILED;
      state.removePublicationError = t(`error-message.remove-publication.${action.error.code}`);
    });
};

// Selectors
const selectors = {
  selectAllPublications: (state) => {
    return state.publications.publications;
  },
  selectPublicationById: (publicationId) => (state) => {
    return state.publications.publications.find(publication => publication.id === publicationId);
  },
  selectLoadPublicationsError: (state) => {
    return state.publications.loadPublicationsError;
  },
  selectLoadPublicationsStatus: (state) => {
    return state.publications.loadPublicationsStatus;
  },
  selectAddPublicationError: (state) => {
    return state.publications.addPublicationError;
  },
  selectSavePublicationError: (state) => {
    return state.publications.savePublicationError;
  },
  selectRemovePublicationError: (state) => {
    return state.publications.removePublicationError;
  },
  selectSavePublicationMessage: (state) => {
    return state.publications.savePublicationMessage;
  },
};

export const Publication = {
  initialState,
  reducers,
  asyncThunk,
  extraReducers,
  selectors,
};
