import PropTypes from 'prop-types';

import {
  Button, useToggle, ModalDialog, ActionRow, StatefulButton,
} from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Info, Warning } from '@edx/paragon/icons';
import * as constants from 'data/constants';
import { useExamsData, useModifyExamAttempt, useButtonStateFromRequestStatus } from '../hooks';
import messages from '../messages';
import { getLaunchUrlByExamId, getMessageLabelForStatus } from '../utils';

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
  const { formatMessage } = useIntl();
  const modifyExamAttemptRequestStatus = useButtonStateFromRequestStatus(constants.RequestKeys.modifyExamAttempt);

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
                  // The state of this button is updated based on the request status of the modifyExamAttempt
                  // api function. The change of the button's label is based on VerifyButtonProps.
                  state={modifyExamAttemptRequestStatus()}
                  {...VerifyButtonProps}
                  variant="success"
                  onClick={async e => { // eslint-disable-line no-unused-vars
                    modifyExamAttempt(attemptId, constants.ExamAttemptActions.verify);
                  }}
                />
              )}
            {attemptStatus !== constants.ExamAttemptStatus.rejected
              && (
                <StatefulButton
                  // See above comment in the other StatefulButton to understand how this works
                  state={modifyExamAttemptRequestStatus()}
                  {...RejectButtonProps}
                  variant="danger"
                  onClick={async e => { // eslint-disable-line no-unused-vars
                    modifyExamAttempt(attemptId, constants.ExamAttemptActions.reject);
                  }}
                />
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
