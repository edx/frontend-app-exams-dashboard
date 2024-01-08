export const courseExamsList = state => state.exams.examsList;

// derived from currentExamIndex rather than duplicating in state
export const currentExam = state => {
  return state.exams.examsList[state.exams.currentExamIndex]
};

export const courseExamAttemptsList = state => state.exams.attemptsList;

export const courseId = state => state.exams.courseId;
