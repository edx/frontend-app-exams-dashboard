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
      attemptsList: payload?.results.map((attempt) => (
        {
          attempt_id: attempt.attempt_id,
          exam_name: attempt.exam_display_name,
          username: attempt.username,
          time_limit: attempt.allowed_time_limit_mins,
          exam_type: attempt.exam_type,
          started_at: attempt.start_time,
          completed_at: attempt.end_time,
          status: attempt.attempt_status,
        }
      )),
    }),
    deleteExamAttempt: (state, attemptId) => ({
      ...state,
      attemptsList: state.attemptsList.filter(attempt => attempt.attempt_id !== attemptId.payload),
    }),
    modifyExamAttempt: (state, { payload }) => ({
      ...state,
      attemptsList: state.attemptsList.map((attempt, index) => {
        // Set the status of the modified attempt to verified or rejected
        if (attempt.attempt_id === payload.attemptId) {
          return {
            ...attempt,
            status: payload.action === 'verify' ? 'Verified' : 'Rejected',
          };
        }
        // Keep all other attempts as is
        return attempt;
      }),
    }),
    setCurrentExam: (state, examId) => ({
      ...state,
      currentExamIndex: Math.max(0, state.examsList.findIndex(exam => exam.id === examId.payload)),
    }),
  },
});

export const {
  loadExams,
  loadExamAttempts,
  deleteExamAttempt,
  modifyExamAttempt,
  setCurrentExam,
} = slice.actions;

export const {
  reducer,
} = slice;
