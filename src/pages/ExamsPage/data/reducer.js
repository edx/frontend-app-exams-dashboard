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
    loadExamAttempts: (state, { payload }) => {
      payload?.results.forEach((attempt) => {
        const dataToAdd = {
          exam_name: attempt.exam_display_name,
          username: attempt.username,
          time_limit: attempt.allowed_time_limit_mins,
          exam_type: attempt.exam_type,
          started_at: attempt.start_time,
          completed_at: attempt.end_time,
          status: attempt.attempt_status,
        };
        state.attemptsList.push(dataToAdd);
      });
    },
  },
});

export const {
  loadExams,
  loadExamAttempts,
} = slice.actions;

export const {
  reducer,
} = slice;
