export const RequestStates = {
  inactive: 'inactive',
  pending: 'pending',
  completed: 'completed',
  failed: 'failed',
};

export const RequestKeys = {
  fetchAllowances: 'fetchAllowances',
  fetchCourseExams: 'fetchCourseExams',
  fetchExamAttempts: 'fetchExamAttempts',
  deleteExamAttempt: 'deleteExamAttempt',
  modifyExamAttempt: 'modifyExamAttempt',
  createAllowance: 'createAllowance',
};

export const ExamAttemptActions = {
  // NOTE: These are the "staff-only" actions, which are meant to be performed from this dashboard.
  verify: 'verify',
  reject: 'reject',
};

export const ExamAttemptStatus = {
  created: 'created',
  download_software_clicked: 'download_software_clicked',
  ready_to_start: 'ready_to_start',
  started: 'started',
  ready_to_submit: 'ready_to_submit',
  timed_out: 'timed_out',
  submitted: 'submitted',
  verified: 'verified',
  rejected: 'rejected',
  expired: 'expired',
  second_review_required: 'second_review_required',
  error: 'error',
};

export const ErrorStatuses = {
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  conflict: 409,
  serverError: 500,
};
