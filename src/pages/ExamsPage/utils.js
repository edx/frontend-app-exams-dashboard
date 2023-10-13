import messages from './messages';
import { getExamsBaseUrl } from './data/api';

const examAttemptStatusLabels = {
  created: messages.statusLabelCreated,
  download_software_clicked: messages.statusLabelDownloadSoftwareClicked,
  ready_to_start: messages.statusLabelReadyToStart,
  started: messages.statusLabelStarted,
  ready_to_submit: messages.statusLabelReadyToSubmit,
  submitted: messages.statusLabelSubmitted,
  verified: messages.statusLabelVerified,
  rejected: messages.statusLabelRejected,
  expired: messages.statusLabelExpired,
  second_review_required: messages.statusLabelSecondReviewRequired,
  error: messages.statusLabelError,
};

export const getLaunchUrlByExamId = (id) => `${getExamsBaseUrl()}/lti/exam/${id}/instructor_tool`;

export const getMessageLabelForStatus = (status) => examAttemptStatusLabels[status];
