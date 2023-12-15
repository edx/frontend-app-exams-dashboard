import PropTypes from 'prop-types';

import { useEffect, useState } from 'react';
import {
  Button, useToggle, ModalDialog, ActionRow, StatefulButton,
} from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Info, Warning } from '@edx/paragon/icons';
import * as constants from 'data/constants';
import { useExamsData, useModifyExamAttempt } from '../hooks';
import messages from '../messages';
import { getLaunchUrlByExamId, getMessageLabelForStatus } from '../utils';
import * as reduxHooks from 'data/redux/hooks';

const ReviewableStatuses = [
  constants.ExamAttemptStatus.error,
  constants.ExamAttemptStatus.rejected,
  constants.ExamAttemptStatus.second_review_required,
  constants.ExamAttemptStatus.verified,
];

const ReviewRequiredStatuses = [
  constants.ExamAttemptStatus.error,
  constants.ExamAttemptStatus.second_review_required,
];

const ReviewExamAttemptModal = ({
  username, examName, attemptId, attemptStatus, severity, submissionReason,
}) => {
  const [isOpen, open, close] = useToggle(false);
  const modifyExamAttempt = useModifyExamAttempt();
  const { currentExam } = useExamsData();
  const [rejectButtonStatus, setRejectButtonStatus] = useState('');
  const [verifyButtonStatus, setVerifyButtonStatus] = useState('');
  const { formatMessage } = useIntl();
  const isPending = reduxHooks.useRequestIsPending(constants.RequestKeys.modifyExamAttempt);
  const isCompleted = reduxHooks.useRequestIsCompleted(constants.RequestKeys.modifyExamAttempt);
  const isError = reduxHooks.useRequestError(constants.RequestKeys.modifyExamAttempt);

  const getButton = (status) => {
    if (ReviewRequiredStatuses.includes(status)) {
      return (
        <Button variant="link" size="sm" className="text-danger" onClick={open}>
          <Warning />
          {formatMessage(messages.ReviewRequiredButtonTitle)}
        </Button>
      );
    }
    if (ReviewableStatuses.includes(status)) {
      return (
        <Button variant="link" size="sm" className="text-info" onClick={open}>
          <Info />
          {formatMessage(messages.ReviewableButtonTitle)}
        </Button>
      );
    }

    // attempt is not reviewable, don't render a button
    return null;
  };

  const getBodyText = (status) => {
    if (status === constants.ExamAttemptStatus.error) {
      return formatMessage(messages.ReviewExamAttemptModalBodyError);
    }
    if (ReviewRequiredStatuses.includes(status)) {
      return formatMessage(messages.ReviewExamAttemptModalBodyReviewRequried);
    }
    if (ReviewableStatuses.includes(status)) {
      return formatMessage(messages.ReviewExamAttemptModalBodyManageReview, {
        statusLabel: formatMessage(getMessageLabelForStatus(status)),
      });
    }
    return null; // we should not get here
  };

  const VerifyButtonProps = {
    labels: {
      default: formatMessage(messages.VerifyExamAttemptButtonDefaultLabel),
      pending: formatMessage(messages.VerifyExamAttemptButtonPendingLabel),
      complete: formatMessage(messages.VerifyExamAttemptButtonCompelteLabel),
      error: formatMessage(messages.ReviewExamAttemptButtonErrorLabel),
    },
    variant: 'primary',
  };

  const RejectButtonProps = {
    labels: {
      default: formatMessage(messages.RejectExamAttemptButtonDefaultLabel),
      pending: formatMessage(messages.RejectExamAttemptButtonPendingLabel),
      complete: formatMessage(messages.RejectExamAttemptButtonCompelteLabel),
      error: formatMessage(messages.ReviewExamAttemptButtonErrorLabel),
    },
    variant: 'primary',
  };

  const getRequestStatus = () => {
    if (isPending) {
      return 'pending';
    } else if (isCompleted) {
      return 'complete';
    } else if (isError) {
      return 'error';
    };
    return '';
  };

  useEffect(() => {
    const status = '';
    if (isPending) {
      status = 'pending';
    } else if (isCompleted) {
      status = 'complete';
    } else if (isError) {
      status = 'error';
    }
    console.log("STATUS: ", isPending, isCompleted, isError);
  }, [isPending, isCompleted, isError])

  // insert above code here later
  const updateAttemptStatusStuff = (action) => {
    // Set the status of the button
    const status = '';
    if (isPending) {
      status = 'pending';
    } else if (isCompleted) {
      status = 'complete';
    } else if (isError) {
      status = 'error';
    }

    if (action == 'verify') {
      setVerifyButtonStatus();
    } else if (action == 'reject') {
      setRejectButtonStatus();
    }
  }
  
  return (
    <>
      <div className="d-flex text-danger">
        {getButton(attemptStatus)}
      </div>
      <ModalDialog
        title="my dialog"
        isOpen={isOpen}
        onClose={close}
        size="lg"
        variant="default"
        hasCloseButton
        isFullscreenOnMobile
      >
        <ModalDialog.Header>
          <ModalDialog.Title>
            {formatMessage(messages.ReviewExamAttemptModalTitle)}
          </ModalDialog.Title>
        </ModalDialog.Header>

        <ModalDialog.Body>
          <p>{getBodyText(attemptStatus)}</p>
          <ul>
            <li>{formatMessage(messages.Username)}{username}</li>
            <li>{formatMessage(messages.ExamName)}{examName}</li>
            <li>{formatMessage(messages.SuspicionLevel)}{severity}</li>
            <li>{formatMessage(messages.SubmissionReason)}{submissionReason}</li>
          </ul>
          <p>{formatMessage(messages.ReviewExamAttemptModalBodySessionInfo)}</p>
          <ActionRow>
            <Button as="a" href={getLaunchUrlByExamId(currentExam.id)} target="_blank" variant="link">
              {formatMessage(messages.reviewDashboardTabTitle)}
            </Button>
          </ActionRow>
        </ModalDialog.Body>

        <ModalDialog.Footer>
          <ActionRow>
            <ModalDialog.CloseButton variant="tertiary">
              {formatMessage(messages.ReviewExamAttemptModalCancel)}
            </ModalDialog.CloseButton>
            {attemptStatus !== constants.ExamAttemptStatus.verified
              && (
                <StatefulButton
                  state={verifyButtonStatus}
                  {...VerifyButtonProps}
                  variant="success"
                  onClick={async e => { // eslint-disable-line no-unused-vars
                    // updateButtonStatus('reject');
                    modifyExamAttempt(attemptId, constants.ExamAttemptActions.verify);
                    updateAttemptStatusStuff(constants.ExamAttemptActions.verify);
                    // modifyExamAttempt(constants.ExamAttemptActions.verify);
                    // updateButtonStatus()
                  }}
                >
                  {formatMessage(messages.ReviewExamAttemptModalVerify)}
                </StatefulButton>
              )}
            {attemptStatus !== constants.ExamAttemptStatus.rejected
              && (
                <StatefulButton
                  state={rejectButtonStatus}
                  {...RejectButtonProps}
                  variant="danger"
                  onClick={async e => { // eslint-disable-line no-unused-vars
                    // setRejectButtonStatus('pending');
                    modifyExamAttempt(attemptId, constants.ExamAttemptActions.reject);
                    updateAttemptStatusStuff(constants.ExamAttemptActions.reject);
                    // modifyExamAttempt(constants.ExamAttemptActions.reject);
                    // setRejectButtonStatus('complete');
                  }}
                >
                  {formatMessage(messages.ReviewExamAttemptModalReject)}
                </StatefulButton>
              )}
          </ActionRow>
        </ModalDialog.Footer>
      </ModalDialog>
    </>
  );
};

ReviewExamAttemptModal.propTypes = {
  username: PropTypes.string.isRequired,
  examName: PropTypes.string.isRequired,
  attemptId: PropTypes.number.isRequired,
  attemptStatus: PropTypes.string.isRequired,
  severity: PropTypes.number,
  submissionReason: PropTypes.string,
};

ReviewExamAttemptModal.defaultProps = {
  severity: null,
  submissionReason: null,
};

export default ReviewExamAttemptModal;
