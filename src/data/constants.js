export const RequestStates = {
  inactive: 'inactive',
  pending: 'pending',
  completed: 'completed',
  failed: 'failed',
};

export const RequestKeys = {
  fetchCourseExams: 'fetchCourseExams',
  fetchExamAttempts: 'fetchExamAttempts',
  deleteExamAttempt: 'deleteExamAttempt',
  modifyExamAttempt: 'modifyExamAttempt',
};

export const ExamAttemptActions = {
  // NOTE: These are the "staff-only" actions, which are meant to be performed from this dashboard.
  verify: 'verify',
  reject: 'reject',
};

export const ExamAttemptStatus = {
  created: 'Created',
  download_software_clicked: 'Download Software Clicked',
  ready_to_start: 'Ready To Start',
  started: 'Started',
  ready_to_submit: 'Ready To Submit',
  timed_out: 'Timed Out',
  submitted: 'Submitted',
  verified: 'Verified',
  rejected: 'Rejected',
  // NOTE: This is a temporary workaround since the reducer sets the status to "Verified", not "verified".
  Verified: 'Verified',
  Rejected: 'Rejected',
  expired: 'Expired',
  second_review_required: 'Second Review Required',
  error: 'Error',
};

export const ExamTypes = {
  proctored: 'Proctored',
  timed: 'Timed',
  practice: 'Practice',
  onboarding: 'Onboarding',
};

export const ErrorStatuses = {
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  conflict: 409,
  serverError: 500,
};
