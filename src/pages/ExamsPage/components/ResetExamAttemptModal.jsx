import PropTypes from 'prop-types';

import {
  Button, useToggle, ModalDialog, ActionRow, StatefulButton,
} from '@openedx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import * as constants from 'data/constants';
import { useDeleteExamAttempt, useButtonStateFromRequestStatus } from '../hooks';
import messages from '../messages';

const ResetExamAttemptModal = ({ username, examName, attemptId }) => {
  const [isOpen, open, close] = useToggle(false);
  const resetExamAttempt = useDeleteExamAttempt();
  const { formatMessage } = useIntl();
  const deleteExamAttemptRequestStatus = useButtonStateFromRequestStatus(constants.RequestKeys.deleteExamAttempt);

  const ResetButtonProps = {
    labels: {
      default: formatMessage(messages.ResetExamAttemptButtonDefaultLabel),
      pending: formatMessage(messages.ResetExamAttemptButtonPendingLabel),
      complete: formatMessage(messages.ResetExamAttemptButtonCompelteLabel),
      error: formatMessage(messages.ResetExamAttemptButtonErrorLabel),
    },
    variant: 'primary',
  };

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
        isOverflowVisible={false}
        hasCloseButton
        isFullscreenOnMobile
        isFullscreenScroll
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
            <StatefulButton
              data-testid="reset-stateful-button"
              // The state of this button is updated based on the request status of the deleteExamAttempt
              // api function. The change of the button's label is based on VerifyButtonProps
              state={deleteExamAttemptRequestStatus()}
              {...ResetButtonProps}
              variant="primary"
              onClick={e => { // eslint-disable-line no-unused-vars
                resetExamAttempt(attemptId);
              }}
            />
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
