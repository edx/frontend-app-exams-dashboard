import PropTypes from 'prop-types';

import {
  Button, useToggle, ModalDialog, ActionRow,
} from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import { useDeleteExamAttempt } from '../hooks';
import messages from '../messages';

const ResetExamAttemptButton = ({ username, examName, attemptId }) => {
  const [isOpen, open, close] = useToggle(false);
  const resetExamAttempt = useDeleteExamAttempt();
  const { formatMessage } = useIntl();

  return (
    <>
      <div className="d-flex">
        <Button variant="link" size="sm" onClick={open}>
          {/* TODO: Figure out why this has an extra semicolon on it by default */}
          {formatMessage(messages.ResetExamAttemptButtonTitle)};
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
            {formatMessage(messages.ResetExamAttemptButtonModalTitle)}
          </ModalDialog.Title>
        </ModalDialog.Header>

        <ModalDialog.Body>
          {/* TODO: Figure out how to move this while keeping the vars passed in */}
          <p>{formatMessage(messages.ResetExamAttemptButtonModalBody)}</p>
          <ul>
            <li>{formatMessage(messages.Username)}{username}</li>
            <li>{formatMessage(messages.ExamName)}{examName}</li>
          </ul>
        </ModalDialog.Body>

        <ModalDialog.Footer>
          <ActionRow>
            <ModalDialog.CloseButton variant="tertiary">
              {formatMessage(messages.ResetExamAttemptButtonCancel)}
            </ModalDialog.CloseButton>
            <Button
              variant="primary"
              onClick={e => { // eslint-disable-line no-unused-vars
                resetExamAttempt(attemptId);
              }}
            >
              {formatMessage(messages.ResetExamAttemptButtonConfirm)}
            </Button>
          </ActionRow>
        </ModalDialog.Footer>
      </ModalDialog>
    </>
  );
};

ResetExamAttemptButton.propTypes = {
  username: PropTypes.string.isRequired,
  examName: PropTypes.string.isRequired,
  attemptId: PropTypes.number.isRequired,
};

export default ResetExamAttemptButton;
