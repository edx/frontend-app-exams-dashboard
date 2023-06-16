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
            exam_name: attempt.exam_display_name,
            username: attempt.username,
            time_limit: attempt.allowed_time_limit_mins,
            exam_type: attempt.exam_type,
            started_at: attempt.start_time,
            completed_at: attempt.end_time,
            status: attempt.attempt_status,
            action: <a href="https://www.edx.org" target="_blank">Action</a>
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
