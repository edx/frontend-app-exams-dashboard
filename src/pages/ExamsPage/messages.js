import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  statusLabelVerified: {
    id: 'ExamsPage.status_label.verified',
    defaultMessage: 'Verified',
    description: 'Label for the status of an exam attempt that has been verified',
  },
  statusLabelRejected: {
    id: 'ExamsPage.status_label.rejected',
    defaultMessage: 'Rejected',
    description: 'Label for the status of an exam attempt that has been rejected',
  },
  statusLabelError: {
    id: 'ExamsPage.status_label.error',
    defaultMessage: 'Error',
    description: 'Label for the status of an exam attempt that ended in error',
  },
  statusLabelSecondReviewRequired: {
    id: 'ExamsPage.status_label.second_review_required',
    defaultMessage: 'Second Review Required',
    description: 'Label for the status of an exam attempt that requires a second review',
  },
  statusLabelCreated: {
    id: 'ExamsPage.status_label.created',
    defaultMessage: 'Created',
    description: 'Label for the status of an exam attempt that has been created',
  },
  statusLabelDownloadSoftwareClicked: {
    id: 'ExamsPage.status_label.download_software_clicked',
    defaultMessage: 'Download Software Clicked',
    description: 'Label for the status of an exam attempt in which a learner has started to download the proctoring software',
  },
  statusLabelReadyToStart: {
    id: 'ExamsPage.status_label.ready_to_start',
    defaultMessage: 'Ready To Start',
    description: 'Label for the status of an exam attempt that is ready to start',
  },
  statusLabelStarted: {
    id: 'ExamsPage.status_label.started',
    defaultMessage: 'Started',
    description: 'Label for the status of an exam attempt that has started',
  },
  statusLabelReadyToSubmit: {
    id: 'ExamsPage.status_label.ready_to_submit',
    defaultMessage: 'Ready To Submit',
    description: 'Label for the status of an exam attempt that is ready to submit',
  },
  statusLabelSubmitted: {
    id: 'ExamsPage.status_label.submitted',
    defaultMessage: 'Submitted',
    description: 'Label for the status of an exam attempt that has been submitted',
  },
  statusLabelExpired: {
    id: 'ExamsPage.status_label.expired',
    defaultMessage: 'Expired',
    description: 'Label for the status of an exam attempt that is past due',
  },

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
    id: 'ResetExamAttemptButton.title',
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
    defaultMessage: 'Cancel',
    description: 'Text for the button to cancel resetting an exam attempt',
  },
  ResetExamAttemptButtonConfirm: {
    id: 'ResetExamAttemptButton.confirm_button',
    defaultMessage: 'Yes, I\'m Sure',
    description: 'Text for the button to confirm the reset of an exam attempt',
  },

  // ReviewExamAttemptButton
  ReviewableButtonTitle: {
    id: 'ReviewExamAttemptButton.required.title',
    defaultMessage: 'Manage Review',
    description: 'Title for the button to review exam attempts',
  },
  ReviewRequiredButtonTitle: {
    id: 'ReviewExamAttemptButton.title',
    defaultMessage: 'Review Required',
    description: 'Title for the button to review exam attempts',
  },
  ReviewExamAttemptButtonModalTitle: {
    id: 'ReviewExamAttemptButton.confirmation_modal_title',
    defaultMessage: 'Update review status',
    description: 'Title header of the modal that appears to confirm the review of an exam attempt',
  },
  ReviewExamAttemptModalBodyReviewRequried: {
    id: 'ReviewExamAttemptButton.confirmation_modal_body.review_required',
    defaultMessage: 'Due to suspicious activity, this exam attempt requires manual review.',
    description: 'Body text of the review modal that appears when an exam attempt requires review',
  },
  ReviewExamAttemptModalBodyManageReview: {
    id: 'ReviewExamAttemptButton.confirmation_modal_body.review_manage',
    defaultMessage: 'This exam attempt has a {statusLabel} review. You may manually override the review status for this session.',
    description: 'Body text of the review modal that appears when an exam attempt has an existing review',
  },
  ReviewExamAttemptModalBodyError: {
    id: 'ReviewExamAttemptButton.confirmation_modal_body.error_status',
    defaultMessage: 'This exam attempt has been terminated due to an error; student progress may be incomplete. You may manually complete this session with a review.',
    description: 'Body text of the review modal that appears when an exam attempt has an error status',
  },
  ReviewExamAttemptModalBodySessionInfo: {
    id: 'ReviewExamAttemptButton.confirmation_modal_body.session_info',
    defaultMessage: 'A session recording and details of suspicious behavior can be found on the review dashboard for the proctoring tool.',
    description: 'Body text of the modal directing the user to an external dashboard to view session details',
  },
  ReviewExamAttemptButtonCancel: {
    id: 'ReviewExamAttemptButton.cancel_button',
    defaultMessage: 'Cancel',
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

  // Labels for exam attempt info for review/reset modals
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

  ReviewDashboardOpenLTITool: {
    id: 'ExternalReviewDashboard.open_lti_tool',
    defaultMessage: 'Open the Review Dashboard for {exam_name}',
    description: 'Text for button to open instructor LTI tool in a new window',
  },

  ReviewDashboardPleaseSelectExam: {
    id: 'ExternalReviewDashboard.please_select_exam',
    defaultMessage: 'Please select an exam from the dropdown above.',
    description: 'A prompt to select an exam before being able to open the external review dashboard.',
  },
});

export default messages;
