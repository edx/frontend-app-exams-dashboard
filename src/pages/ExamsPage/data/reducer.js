import { createSlice } from '@reduxjs/toolkit';
import * as constants from 'data/constants';

export const initialState = {
  currentExamIndex: 0,
  examsList: [],
  attemptsList: [],
};

const getStatusFromAction = (action, status) => {
  switch (action) {
    case constants.ExamAttemptActions.verify:
      return constants.ExamAttemptStatus.verified;
    case constants.ExamAttemptActions.reject:
      return constants.ExamAttemptStatus.rejected;
    default:
      // If invalid action, return the same status as before.
      return status;
  }
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
      attemptsList: payload?.results.map((attempt) => {
        const data = {
          attempt_id: attempt.attempt_id,
          exam_name: attempt.exam_display_name,
          username: attempt.username,
          time_limit: attempt.allowed_time_limit_mins,
          exam_type: attempt.exam_type,
          started_at: attempt.start_time,
          completed_at: attempt.end_time,
          status: attempt.attempt_status,
        };
        // Only add ACS review values if they exist
        if (attempt.proctored_review) {
          Object.assign(
            data,
            { severity: attempt.proctored_review.severity },
            { submission_reason: attempt.proctored_review.submission_reason },
          );
        }
        return data;
      }),
    }),
    deleteExamAttempt: (state, attemptId) => ({
      ...state,
      attemptsList: state.attemptsList.filter(attempt => attempt.attempt_id !== attemptId.payload),
    }),
    modifyExamAttemptStatus: (state, { payload }) => ({
      ...state,
      attemptsList: state.attemptsList.map((attempt) => {
        // Set the status of the modified attempt to verified or rejected
        if (attempt.attempt_id === payload.attemptId) {
          return {
            ...attempt,
            status: getStatusFromAction(payload.action, attempt.status),
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
  modifyExamAttemptStatus,
  setCurrentExam,
} = slice.actions;

export const {
  reducer,
} = slice;
