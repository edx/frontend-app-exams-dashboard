import PropTypes from 'prop-types';

import {
  Button, useToggle, ModalDialog, ActionRow,
} from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Info, Warning } from '@edx/paragon/icons';
import * as constants from 'data/constants';
import { useModifyExamAttempt } from '../hooks';
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

const ReviewExamAttemptButton = ({
  username, examName, attemptId, attemptStatus, severity, submissionReason,
}) => {
  const [isOpen, open, close] = useToggle(false);
  const modifyExamAttempt = useModifyExamAttempt();
  const { formatMessage } = useIntl();

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

  return (
    <>
      <div className="d-flex text-danger">
        { getButton(attemptStatus) }
      </div>
      <ModalDialog
        title="my dialog"
        isOpen={isOpen}
        onClose={close}
        size="md"
        variant="default"
        hasCloseButton
        isFullscreenOnMobile
      >
        <ModalDialog.Header>
          <ModalDialog.Title>
            {formatMessage(messages.ReviewExamAttemptButtonModalTitle)}
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
            <Button as="a" href={getLaunchUrlByExamId(attemptId)} variant="secondary">
              {formatMessage(messages.reviewDashboardTabTitle)}
            </Button>
          </ActionRow>
        </ModalDialog.Body>

        <ModalDialog.Footer>
          <ActionRow>
            <ModalDialog.CloseButton variant="tertiary">
              {formatMessage(messages.ReviewExamAttemptButtonCancel)}
            </ModalDialog.CloseButton>
            <Button
              variant="primary"
              onClick={e => { // eslint-disable-line no-unused-vars
                modifyExamAttempt(attemptId, constants.ExamAttemptActions.verify);
              }}
            >
              {formatMessage(messages.ReviewExamAttemptButtonVerify)}
            </Button>
            <Button
              variant="primary"
              onClick={e => { // eslint-disable-line no-unused-vars
                modifyExamAttempt(attemptId, constants.ExamAttemptActions.reject);
              }}
            >
              {formatMessage(messages.ReviewExamAttemptButtonReject)}
            </Button>
          </ActionRow>
        </ModalDialog.Footer>
      </ModalDialog>
    </>
  );
};

ReviewExamAttemptButton.propTypes = {
  username: PropTypes.string.isRequired,
  examName: PropTypes.string.isRequired,
  attemptId: PropTypes.number.isRequired,
  attemptStatus: PropTypes.string.isRequired,
  severity: PropTypes.number,
  submissionReason: PropTypes.string,
};

ReviewExamAttemptButton.defaultProps = {
  severity: null,
  submissionReason: null,
};

export default ReviewExamAttemptButton;
