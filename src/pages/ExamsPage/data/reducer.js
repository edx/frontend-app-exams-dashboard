import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  currentExamIndex: 0,
  examsList: [],
  attemptsList: [],
};

const slice = createSlice({
  name: 'exams',
  initialState,
  reducers: {
    loadExams: (state, { payload }) => ({
      ...state,
      examsList: payload.map((exam) => ({
        id: exam.id,
        name: exam.exam_name,
      })),
    }),
    loadExamAttempts: (state, { payload }) => ({
      ...state,
      attemptsList: payload.map((attempt) => ({
        // “Username”, “Time Limit”, “Type”, “Started At”, “Completed At”, “Status”, and “Action”.
        //Note: Should these fields match the field names in the backend, or should the be in camelCase?
        username: attempt.user.username,
        time_limit: attempt.allowed_time_limit_mins,
        type: attempt.exam.exam_type,
        started_at: attempt.start_time,
        completed_at: attempt.end_time,
        status: attempt.status,
        // action:, NOTE: This value will be a link in the table
      })),
    }),
  },
});

export const {
  loadExams,
  loadExamAttempts,
} = slice.actions;

export const {
  reducer,
} = slice;
