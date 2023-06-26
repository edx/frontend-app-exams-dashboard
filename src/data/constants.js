export const RequestStates = {
  inactive: 'inactive',
  pending: 'pending',
  completed: 'completed',
  failed: 'failed',
};

export const RequestKeys = {
  fetchCourseExams: 'fetchCourseExams',
  fetchExamAttempts: 'fetchExamAttempts',
};

export const ErrorStatuses = {
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  conflict: 409,
  serverError: 500,
};
