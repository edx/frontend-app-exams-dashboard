import { useState } from 'react';
import {
  Button, useToggle, ModalDialog, ActionRow,
} from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import { useDeleteExamAttempt } from '../hooks';

// TODO: Just pass in values from the row into this component instead of passing in the whole thing
const ResetExamAttemptButton = ({ row }) => {
  const [isOpen, open, close] = useToggle(false);
  const [modalSize, setModalSize] = useState('md');
  const [modalVariant, setModalVariant] = useState('default');
  const { formatMessage } = useIntl();
  const resetExamAttempt = useDeleteExamAttempt();

  return (
    <>
      <div className="d-flex">
        <Button variant="link" size="sm" onClick={open}>Reset</Button>
      </div>
      <ModalDialog
        title="My dialog"
        isOpen={isOpen}
        onClose={close}
        size={modalSize}
        variant={modalVariant}
        hasCloseButton
        isFullscreenOnMobile
      >
        <ModalDialog.Header>
          <ModalDialog.Title>
            Please confirm your choice.
          </ModalDialog.Title>
        </ModalDialog.Header>

        <ModalDialog.Body>
          <p>
            Are you sure you want to remove the exam attempt for learner with username "{row.original.username}" for the exam "{row.original.exam_name}"?
          </p>
        </ModalDialog.Body>

        <ModalDialog.Footer>
          <ActionRow>
            {/* TODO: Put all these dialogs into formatMessage Boxes */}
            <ModalDialog.CloseButton variant="tertiary">
              No (Cancel)
            </ModalDialog.CloseButton>
            {/* TODO: Error toast message if this fails, Ask Gabe W. */}
            <Button
              variant="primary"
              onClick={e => {
                resetExamAttempt(row.original.attempt_id);
              }}
            >
              Yes, I'm Sure
            </Button>
          </ActionRow>
        </ModalDialog.Footer>
      </ModalDialog>
    </>
  );
};

export default ResetExamAttemptButton;
