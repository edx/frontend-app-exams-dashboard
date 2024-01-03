import PropTypes from 'prop-types';

import {
  Button, useToggle, ModalDialog, ActionRow, StatefulButton,
} from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import * as constants from 'data/constants';
import { useDeleteExamAttempt, useRequestStatusFromRedux } from '../hooks';
import messages from '../messages';

const ResetExamAttemptModal = ({ username, examName, attemptId }) => {
  const [isOpen, open, close] = useToggle(false);
  const resetExamAttempt = useDeleteExamAttempt();
  const getRequestStatus = useRequestStatusFromRedux();
  const { formatMessage } = useIntl();

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
            <StatefulButton
              state={getRequestStatus(constants.RequestKeys.deleteExamAttempt)}
              {...ResetButtonProps}
              variant="primary"
              onClick={e => { // eslint-disable-line no-unused-vars
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
