import PropTypes from 'prop-types';

import {
  Button, useToggle, ModalDialog, ActionRow,
} from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import { useModifyExamAttempt } from '../hooks';
import { Warning } from '@edx/paragon/icons';

const ReviewExamAttemptButton = ({ username, examName, attemptId, attemptIndex, suspicionLevel }) => {
  const [isOpen, open, close] = useToggle(false);
  const modifyExamAttempt = useModifyExamAttempt();
  const { formatMessage } = useIntl();

  return (
    <>
      <div className="d-flex text-danger">
        <Button variant="link" size="sm" className="text-danger" onClick={open}>
          <Warning />
          {formatMessage({
            id: 'ReviewExamAttemptButton.exam_name',
            defaultMessage: 'Review',
            description: 'Table header for the table column with buttons to review exam attempts',
          })}
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
            {formatMessage({
              id: 'ReviewExamAttemptButton.confirmation_modal_title',
              defaultMessage: 'Please confirm your choice.',
              description: 'Title header of the modal that appears to confirm the review of an exam attempt',
            })}
          </ModalDialog.Title>
        </ModalDialog.Header>

        <ModalDialog.Body>
          {formatMessage(
            {
              id: 'ReviewExamAttemptButton.confirmation_modal_body',
              defaultMessage: `Are you sure you want to review the exam attempt for learner with username "${username}
              for the exam "${examName}"?. Suspicion Level: ${suspicionLevel}.`,
              description: 'Body text of the modal that appears to confirm the review of an exam attempt',
            },
            { username, examName },
          )}
        </ModalDialog.Body>

        <ModalDialog.Footer>
          <ActionRow>
            <ModalDialog.CloseButton variant="tertiary">
              {formatMessage({
                id: 'ReviewExamAttemptButton.cancel_button',
                defaultMessage: 'No (Cancel)',
                description: 'Text for the button to cancel reviewing an exam attempt',
              })}
            </ModalDialog.CloseButton>
            <Button
              variant="primary"
              onClick={e => { // eslint-disable-line no-unused-vars
                // TODO: Make this open the link to review the exam attempt
                modifyExamAttempt(attemptId, 'verify', attemptIndex);
                console.log("\n\n\nINDEX:", attemptIndex)
              }}
            >
              {formatMessage({
                id: 'ReviewExamAttemptButton.verify_button',
                defaultMessage: 'Verify',
                description: 'Text for the button to verify an exam attempt',
              })}
            </Button>
            <Button
              variant="primary"
              onClick={e => { // eslint-disable-line no-unused-vars
                // TODO: Make this open the link to review the exam attempt
                modifyExamAttempt(attemptId, 'reject', attemptIndex);
              }}
            >
              {formatMessage({
                id: 'ReviewExamAttemptButton.reject_button',
                defaultMessage: 'Reject',
                description: 'Text for the button to reject an exam attempt',
              })}
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
};

export default ReviewExamAttemptButton;
