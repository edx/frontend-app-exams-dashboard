import * as reduxHooks from 'data/redux/hooks';
import messages from 'pages/ExamsPage/messages';


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

export const getMessageLabelForStatus = (status) => examAttemptStatusLabels[status];

export const getRequestStatusFromRedux = (requestKey) => {
  const isPending = reduxHooks.useRequestIsPending(requestKey);
  const isError = reduxHooks.useRequestError(requestKey);
  if (isPending) {
    return 'pending';
  } if (isError) {
    return 'error';
  }
  return '';
};