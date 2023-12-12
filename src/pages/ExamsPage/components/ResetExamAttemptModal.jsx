import PropTypes from 'prop-types';

import { useState } from 'react';
import {
  Button, useToggle, ModalDialog, ActionRow, StatefulButton,
} from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import { useDeleteExamAttempt } from '../hooks';
import messages from '../messages';

const ResetButtonProps = {
  labels: {
    default: 'Reset',
    pending: 'Resetting...',
    complete: 'Reset',
    error: 'Error'
  },
  variant: 'primary',
};

const ResetExamAttemptModal = ({ username, examName, attemptId }) => {
  const [isOpen, open, close] = useToggle(false);
  const resetExamAttempt = useDeleteExamAttempt();
  const { formatMessage } = useIntl();
  const [resetButtonStatus, setResetButtonStatus] = useState("");


  return (
    <>
      <div className="d-flex">
        <Button variant="link" size="sm" onClick={open}>
          {formatMessage(messages.ResetExamAttemptModalTitle)}
        </Button>
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
            {formatMessage(messages.ResetExamAttemptModalModalTitle)}
          </ModalDialog.Title>
        </ModalDialog.Header>

        <ModalDialog.Body>
          <p>{formatMessage(messages.ResetExamAttemptModalModalBody)}</p>
          <ul>
            <li>{formatMessage(messages.Username)}{username}</li>
            <li>{formatMessage(messages.ExamName)}{examName}</li>
          </ul>
        </ModalDialog.Body>

        <ModalDialog.Footer>
          <ActionRow>
            <ModalDialog.CloseButton variant="tertiary">
              {formatMessage(messages.ResetExamAttemptModalCancel)}
            </ModalDialog.CloseButton>
            <StatefulButton state={resetButtonStatus} {...ResetButtonProps}
              variant="primary"
              onClick={e => { // eslint-disable-line no-unused-vars
                setResetButtonStatus("pending");
                resetExamAttempt(attemptId);
              }}
            >
              {formatMessage(messages.ResetExamAttemptModalConfirm)}
            </StatefulButton>
          </ActionRow>
        </ModalDialog.Footer>
      </ModalDialog>
    </>
  );
};

ResetExamAttemptModal.propTypes = {
  username: PropTypes.string.isRequired,
  examName: PropTypes.string.isRequired,
  attemptId: PropTypes.number.isRequired,
};

export default ResetExamAttemptModal;
