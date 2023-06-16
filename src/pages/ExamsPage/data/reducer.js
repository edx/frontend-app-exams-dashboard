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
      if (payload.results.length > 0) {
        // for each attempt in the data, push to attempts list custom object values
        payload.results.forEach((attempt) => {
          const dataToAdd = {
            // “Username”, “Time Limit”, “Type”, “Started At”, “Completed At”, “Status”, and “Action”.
            // username: attempt.user.username,
            time_limit: attempt.allowed_time_limit_mins,
            // type: attempt.exam.exam_type,
            started_at: attempt.start_time,
            completed_at: attempt.end_time,
            status: attempt.status,
          }
          state.attemptsList.push(dataToAdd);
        })
      }
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
