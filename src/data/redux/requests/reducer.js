import { createSlice } from '@reduxjs/toolkit';

import { RequestStates, RequestKeys } from 'data/constants';

const initialState = {
  [RequestKeys.fetchCourseExams]: { status: RequestStates.inactive },
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

// const actions = StrictDict(requests.actions);
const { actions, reducer } = requests;

export {
  actions,
  reducer,
  initialState,
};
