import { createSlice } from '@reduxjs/toolkit';

import { RequestStates, RequestKeys } from 'data/constants';

// NOTE: Anytime a new request is coded, or when a request has its RequestKey changed,
// It must be added to this variable in the following format:
// [RequestKeys.fetchCourseExams]: { status: RequestStates.inactive }
// This order to prevents an error form being thrown when we call for the status of these requests,
// as calling for the status of an undefined/yet-to-be called request will throw an error.
// See src/data/redux/requests/selectors.js for more info.
const initialState = {
  [RequestKeys.fetchCourseExams]: { status: RequestStates.inactive },
  [RequestKeys.fetchExamAttempts]: { status: RequestStates.inactive },
  [RequestKeys.deleteExamAttempt]: { status: RequestStates.inactive },
  [RequestKeys.modifyExamAttempt]: { status: RequestStates.inactive },
  [RequestKeys.createAllowance]: { status: RequestStates.inactive },
  [undefined]: { status: RequestStates.inactive },
};

// eslint-disable-next-line no-unused-vars
const requests = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    startRequest: (state, { payload }) => ({
      ...state,
      [payload.requestKey]: {
        status: RequestStates.pending,
      },
    }),
    completeRequest: (state, { payload }) => ({
      ...state,
      [payload.requestKey]: {
        status: RequestStates.completed,
        response: payload.response,
      },
    }),
    failRequest: (state, { payload }) => ({
      ...state,
      [payload.requestKey]: {
        status: RequestStates.failed,
        error: payload.error,
      },
    }),
    clearRequest: (state, { payload }) => ({
      ...state,
      [payload.requestKey]: {},
    }),
  },
});

const { actions, reducer } = requests;

export {
  actions,
  reducer,
  initialState,
};
