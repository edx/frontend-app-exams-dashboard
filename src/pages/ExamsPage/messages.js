import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  attemptsViewTabTitle: {
    id: 'ExamsPage.attemptsViewTabTitle',
    defaultMessage: 'Attempts',
    description: 'Title for the attempts view tab',
  },
  reviewDashboardTabTitle: {
    id: 'ExamsPage.reviewDashboardTabTitle',
    defaultMessage: 'Review Dashboard',
    description: 'Title for the review dashboard tab',
  },
  examSelectPlaceholder: {
    id: 'ExamSelection.select_exam_placeholder',
    defaultMessage: 'Search for an exam...',
    description: 'Placeholder message for the exam selection dropdown',
  },
  examSelectDropdownLabel: {
    id: 'ExamSelection.select_exam',
    defaultMessage: 'Select an exam',
    description: 'Default message for the exam selection dropdown',
  },

  // Exam attempts data table headers
  examAttemptsTableHeaderAction: {
    id: 'AttemptsList.action',
    defaultMessage: 'Action',
    description: 'Table header for the table column listing action to reset the exam attempt',
  },
  examAttemptsTableHeaderReview: {
    id: 'AttemptsList.review',
    defaultMessage: 'Review',
    description: 'Table header for the table column listing review to reset the exam attempt',
  },
  examAttemptsTableHeaderExamName: {
    id: 'AttemptsList.exam_name',
    defaultMessage: 'Exam Name',
    description: 'Table header for the table column listing the exam name',
  },
  examAttemptsTableHeaderUsername: {
    id: 'AttemptsList.username',
    defaultMessage: 'Username',
    description: 'Table header for the table column listing the username',
  },
  examAttemptsTableHeaderTimeLimit: {
    id: 'AttemptsList.time_limit',
    defaultMessage: 'Time Limit',
    description: 'Table header for the table column listing the time limit to complete the exam',
  },
  examAttemptsTableHeaderExamType: {
    id: 'AttemptsList.exam_type',
    defaultMessage: 'Exam Type',
    description: 'Table header for the type of the exam',
  },
  examAttemptsTableHeaderStartedAt: {
    id: 'AttemptsList.started_at',
    defaultMessage: 'Started At',
    description: 'Table header for the time the exam attempt was started',
  },
  examAttemptsTableHeaderCompletedAt: {
    id: 'AttemptsList.completed_at',
    defaultMessage: 'Completed At',
    description: 'Table header for the time the exam attempt was completed',
  },
  examAttemptsTableHeaderStatus: {
    id: 'AttemptsList.status',
    defaultMessage: 'Status',
    description: 'Table header for the current status of the exam attempt',
  },
  examAttemptsTableHeaderEmptyTable: {
    id: 'AttemptsList.DataTable.EmptyTable',
    defaultMessage: 'No results found.',
    description: 'Message that appears in the table if no data is found',
  },

  // ResetExamAttemptButton
  ResetExamAttemptButtonTitle: {
    id: 'ResetExamAttemptButton.exam_name',
    defaultMessage: 'Reset',
    description: 'Title for the button to reset exam attempts',
  },
  ResetExamAttemptButtonModalTitle: {
    id: 'ResetExamAttemptButton.confirmation_modal_title',
    defaultMessage: 'Please confirm your choice.',
    description: 'Title header of the modal that appears to confirm the reset of an exam attempt',
  },
  ResetExamAttemptButtonModalBody: {
    id: 'ResetExamAttemptButton.confirmation_modal_body',
    defaultMessage: 'Are you sure you want to remove the exam attempt with the following data?:',
    description: 'Body text of the modal that appears to confirm the reset of an exam attempt',
  },
  ResetExamAttemptButtonCancel: {
    id: 'ResetExamAttemptButton.cancel_button',
    defaultMessage: 'No (Cancel)',
    description: 'Text for the button to cancel resetting an exam attempt',
  },
  ResetExamAttemptButtonConfirm: {
    id: 'ResetExamAttemptButton.confirm_button',
    defaultMessage: 'Yes, I\'m Sure',
    description: 'Text for the button to confirm the reset of an exam attempt',
  },

  // ReviewExamAttemptButton
  ReviewExamAttemptButtonTitle: {
    id: 'ReviewExamAttemptButton.exam_name',
    defaultMessage: 'Second Review Required',
    description: 'Title for the button to review exam attempts',
  },
  ReviewExamAttemptButtonModalTitle: {
    id: 'ReviewExamAttemptButton.confirmation_modal_title',
    defaultMessage: 'Please confirm your choice.',
    description: 'Title header of the modal that appears to confirm the review of an exam attempt',
  },
  ReviewExamAttemptButtonModalBody: {
    id: 'ReviewExamAttemptButton.confirmation_modal_body',
    defaultMessage: 'Please "Verify" or "Reject" the exam attempt with the following data:',
    description: 'Body text of the modal that appears to confirm the review of an exam attempt',
  },
  ReviewExamAttemptButtonCancel: {
    id: 'ReviewExamAttemptButton.cancel_button',
    defaultMessage: 'No (Cancel)',
    description: 'Text for the button to cancel reviewing an exam attempt',
  },
  ReviewExamAttemptButtonVerify: {
    id: 'ReviewExamAttemptButton.verify_button',
    defaultMessage: 'Verify',
    description: 'Text for the button to verify an exam attempt',
  },
  ReviewExamAttemptButtonReject: {
    id: 'ReviewExamAttemptButton.reject_button',
    defaultMessage: 'Reject',
    description: 'Text for the button to reject an exam attempt',
  },

  // NOTE: Wasn't sure how to title and id these since the first are used by both the Review & Reset buttons
  Username: {
    id: 'ExamAttemptButton.username',
    defaultMessage: 'Username: ',
    description: 'Username label for exam attempt data in the review/reset modal',
  },
  ExamName: {
    id: 'ExamAttemptButton.exam_name',
    defaultMessage: 'Exam Name: ',
    description: 'Exam name label for exam attempt data in the review/reset modal',
  },
  SuspicionLevel: {
    id: 'ExamAttemptButton.suspicion_level',
    defaultMessage: 'Suspicion Level: ',
    description: 'Suspicion level label for exam attempt data in the review/reset modal',
  },
  SubmissionReason: {
    id: 'ExamAttemptButton.submission_reason',
    defaultMessage: 'Submission Reason: ',
    description: 'Submission reason label for exam attempt data in the review/reset modal',
  },
});

export default messages;
