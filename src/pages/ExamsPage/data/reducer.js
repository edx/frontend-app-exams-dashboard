import { createSlice } from '@reduxjs/toolkit';
import * as constants from 'data/constants';

export const initialState = {
  courseId: null,
  currentExamIndex: null,
  examsList: [],
  attemptsList: [],
  allowancesList: [],
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

const getCurrentExamIndex = (examsList, examId) => {
  const index = examsList.findIndex(exam => exam.id === examId.payload);
  if (index > -1) {
    return index;
  }
  return null;
};

const slice = createSlice({
  name: 'exams',
  initialState,
  reducers: {
    setCourseId: (state, courseId) => ({
      ...state,
      courseId: courseId.payload,
    }),
    loadExams: (state, { payload }) => ({
      ...state,
      examsList: payload.map((exam) => ({
        id: exam.id,
        name: exam.exam_name,
        examType: exam.exam_type,
        timeLimitMins: exam.time_limit_mins,
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
    editAllowance: (state, { payload }) => ({
      ...state,
      allowancesList: state.allowancesList.map((allowance) => {
        // Update the minutes for the allowance
        if (allowance.id === payload.allowanceId) {
          return {
            ...allowance,
            extra_time_mins: payload.extraTimeMins,
          };
        }
        // Keep all other allowances as is
        return allowance;
      }),
    }),
    deleteAllowance: (state, allowanceId) => ({
      ...state,
      allowancesList: state.allowancesList.filter(allowance => allowance.id !== allowanceId.payload),
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
      currentExamIndex: getCurrentExamIndex(state.examsList, examId),
    }),
    setAllowancesList: (state, { payload }) => {
      const allowancesList = [...payload];

      // Sorting the list by username first and then by exam name.
      // Makes it easier to list alphabetically.
      allowancesList.sort((a, b) => {
        const compare = `${a.username}`.localeCompare(`${b.username}`);

        if (compare !== 0) { return compare; }

        return `${a.exam_name}`.localeCompare(`${b.exam_name}`);
      });

      return {
        ...state,
        allowancesList,
      };
    },
  },
});

export const {
  loadExams,
  loadExamAttempts,
  deleteExamAttempt,
  deleteAllowance,
  editAllowance,
  modifyExamAttemptStatus,
  setCurrentExam,
  setCourseId,
  setAllowancesList,
} = slice.actions;

export const {
  reducer,
} = slice;
