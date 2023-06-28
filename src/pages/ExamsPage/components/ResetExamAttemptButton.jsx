import { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Button, useToggle, ModalDialog, ActionRow,
} from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import { useDeleteExamAttempt } from '../hooks';

// TODO: Just pass in values from the row into this component instead of passing in the whole thing
const ResetExamAttemptButton = ({ username, examName, attemptId }) => {
  const [isOpen, open, close] = useToggle(false);
  const [modalSize, setModalSize] = useState('md'); // eslint-disable-line no-unused-vars
  const [modalVariant, setModalVariant] = useState('default'); // eslint-disable-line no-unused-vars
  const resetExamAttempt = useDeleteExamAttempt();
  const { formatMessage } = useIntl();

  return (
    <>
      <div className="d-flex">
        <Button variant="link" size="sm" onClick={open}>
          {formatMessage({
            id: 'ResetExamAttemptButton.exam_name',
            defaultMessage: 'Reset',
            description: 'Table header for the table column with buttons to reset exam attempts',
          })}
        </Button>
      </div>
      <ModalDialog
        title="my dialog"
        isOpen={isOpen}
        onClose={close}
        size={modalSize}
        variant={modalVariant}
        hasCloseButton
        isFullscreenOnMobile
      >
        <ModalDialog.Header>
          <ModalDialog.Title>
            {formatMessage({
              id: 'ResetExamAttemptButton.confirmation_modal_title',
              defaultMessage: 'Please confirm your choice.',
              description: 'Title header of the modal that appears to confirm the reset of an exam attempt',
            })}
          </ModalDialog.Title>
        </ModalDialog.Header>

        <ModalDialog.Body>
          {formatMessage(
            {
              id: 'ResetExamAttemptButton.confirmation_modal_body',
              defaultMessage: 'Are you sure you want to remove the exam attempt for learner with username "{username}" for the exam "{examName}"?.',
              description: 'Body text of the modal that appears to confirm the reset of an exam attempt',
            },
            { username, examName },
          )}
        </ModalDialog.Body>

        <ModalDialog.Footer>
          <ActionRow>
            <ModalDialog.CloseButton variant="tertiary">
              {formatMessage({
                id: 'ResetExamAttemptButton.cancel_button',
                defaultMessage: 'No (Cancel)',
                description: 'Text for the button to cancel resetting an exam attempt',
              })}
            </ModalDialog.CloseButton>
            <Button
              variant="primary"
              onClick={e => { // eslint-disable-line no-unused-vars
                resetExamAttempt(attemptId);
              }}
            >
              {formatMessage({
                id: 'ResetExamAttemptButton.confirm_button',
                defaultMessage: 'Yes, I\'m Sure',
                description: 'Text for the button to confirm the reset of an exam attempt',
              })}
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
