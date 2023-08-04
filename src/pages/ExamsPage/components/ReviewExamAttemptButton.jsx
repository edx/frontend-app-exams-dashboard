import PropTypes from 'prop-types';

import {
  Button, useToggle, ModalDialog, ActionRow,
} from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Warning } from '@edx/paragon/icons';
import * as constants from 'data/constants';
import { useModifyExamAttempt } from '../hooks';
import messages from '../messages';

const ReviewExamAttemptButton = ({
  username, examName, attemptId, severity, submissionReason,
}) => {
  const [isOpen, open, close] = useToggle(false);
  const modifyExamAttempt = useModifyExamAttempt();
  const { formatMessage } = useIntl();

  return (
    <>
      <div className="d-flex text-danger">
        <Button variant="link" size="sm" className="text-danger" onClick={open}>
          <Warning />
          {formatMessage(messages.ReviewExamAttemptButtonTitle)}
        </Button>
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
          <p>{formatMessage(messages.ReviewExamAttemptButtonModalBody)}</p>
          <ul>
            <li>{formatMessage(messages.Username)}{username}</li>
            <li>{formatMessage(messages.ExamName)}{examName}</li>
            <li>{formatMessage(messages.SuspicionLevel)}{severity}</li>
            <li>{formatMessage(messages.SubmissionReason)}{submissionReason}</li>
          </ul>
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
  severity: PropTypes.number.isRequired,
  submissionReason: PropTypes.string.isRequired,
};

export default ReviewExamAttemptButton;
