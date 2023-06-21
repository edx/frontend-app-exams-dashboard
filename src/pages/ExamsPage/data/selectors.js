import { createSelector } from 'reselect';

export const courseExamsList = state => state.exams.examsList;

// derived from currentExamIndex rather than duplicating in state
export const currentExam = state => state.exams.examsList[state.exams.currentExamIndex];

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Approach one, with selector.
export const courseExamAttemptsList = createSelector(
  (state) => state.exams.attemptsList,
  (attemptsList) => (
    attemptsList.map((attempt) => (
      {
        ...attempt,
        exam_name: attempt.exam_name,
        username: attempt.username,
        time_limit: attempt.time_limit + " minutes",
        exam_type: capitalizeFirstLetter(attempt.exam_type),
        started_at: attempt.started_at,
        completed_at: attempt.completed_at,
        status: capitalizeFirstLetter(attempt.status),
      }
    ))
  )
);

