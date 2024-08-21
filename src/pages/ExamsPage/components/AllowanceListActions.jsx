import { PropTypes } from 'prop-types';
import {
  ActionRow, Alert,
  Button,
  Form,
  Icon,
  IconButtonWithTooltip,
  ModalDialog,
  useToggle,
} from '@openedx/paragon';
import { DeleteOutline, EditOutline, Info } from '@openedx/paragon/icons';
import { useIntl } from '@edx/frontend-platform/i18n';

import React, { useState } from 'react';
import messages from '../messages';
import { useDeleteAllowance, useEditAllowance } from '../hooks';
import { useClearRequest, useRequestError } from '../../../data/redux/hooks';
import * as constants from '../../../data/constants';

const EditModal = (isOpen, close, allowance, formatMessage) => {
  const editAllowance = useEditAllowance();
  const [additionalTimeError, setAdditionalTimeError] = useState(false);
  const requestError = useRequestError(constants.RequestKeys.createAllowance);
  const resetRequestError = useClearRequest(constants.RequestKeys.createAllowance);

  const initialFormState = {
    username: allowance.username,
    'exam-id': allowance.examId,
    'exam-name': allowance.examName,
  };
  const [form, setForm] = useState(initialFormState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    resetRequestError();
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const onClose = () => {
    resetRequestError();
    setForm(initialFormState);
    close();
  };

  const onSubmit = () => {
    const extraTimeMins = +form['extra-time-mins'] || 0;
    // todo: We should maybe move the handling of this validation to the backend,
    //  as this should also be handled for the add allowance modal.
    const valid = (
      extraTimeMins
        && extraTimeMins > 0
    );
    setAdditionalTimeError(!valid);
    if (valid) {
      const payload = {
        username: form.username,
        exam_id: form['exam-id'],
        extra_time_mins: extraTimeMins,
      };
      editAllowance(allowance.id, payload, () => {
        setForm(initialFormState);
        onClose();
      });
    }
  };

  return (
    <ModalDialog
      title="edit allowance"
      isOpen={isOpen}
      onClose={onClose}
      variant="default"
      hasCloseButton
      isFullscreenOnMobile
    >
      <ModalDialog.Header>
        <ModalDialog.Title data-testid="edit-allowance-header">
          {formatMessage(messages.editAllowanceHeader)}
        </ModalDialog.Title>
      </ModalDialog.Header>
      <ModalDialog.Body>
        { requestError
          && (
          <Alert
            variant="danger"
            icon={Info}
          >
            <Alert.Heading>{ formatMessage(messages.addAllowanceFailedAlertHeader) }</Alert.Heading>
            <p>
              { requestError.detail }
            </p>
          </Alert>
          )}
        <Form id="edit-allowance-form" onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>{ formatMessage(messages.allowanceUsernameField) }</Form.Label>
            <Form.Control
              name="username"
              disabled
              value={form.username}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{ formatMessage(messages.editAllowanceExamField) }</Form.Label>
            <Form.Control
              name="exam"
              disabled
              value={form['exam-name']}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{ formatMessage(messages.allowanceTypeField) }</Form.Label>
            <Form.Text muted>
              {formatMessage(messages.allowanceAdditionalMinutesOption)}
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="form-allowance-value-minutes" isInvalid={additionalTimeError}>
            <Form.Label>{ formatMessage(messages.allowanceMinutesField) }</Form.Label>
            <Form.Control
              name="extra-time-mins"
              value={form['extra-time-mins'] || ''}
              onChange={handleChange}
              data-testid="extra-time-mins"
            />
            { additionalTimeError && <Form.Control.Feedback type="invalid">{ formatMessage(messages.allowanceMinutesErrorFeedback) }</Form.Control.Feedback> }
          </Form.Group>
        </Form>
      </ModalDialog.Body>
      <ModalDialog.Footer>
        <ActionRow>
          <ModalDialog.CloseButton variant="tertiary" onClick={onClose}>
            {formatMessage(messages.allowanceCancelButton)}
          </ModalDialog.CloseButton>
          <Button variant="primary" onClick={onSubmit}>
            {formatMessage(messages.editAllowanceSave)}
          </Button>
        </ActionRow>
      </ModalDialog.Footer>
    </ModalDialog>
  );
};

const DeleteModal = (isOpen, onCancel, onDelete, formatMessage) => (
  <ModalDialog
    title="delete allowance"
    isOpen={isOpen}
    onClose={onCancel}
    variant="default"
    hasCloseButton
    isFullscreenOnMobile
  >
    <ModalDialog.Header>
      <ModalDialog.Title>
        {formatMessage(messages.deleteAllowanceHeader)}
      </ModalDialog.Title>
    </ModalDialog.Header>
    <ModalDialog.Body>
      <p>{formatMessage(messages.deleteAllowanceBody)}</p>
    </ModalDialog.Body>
    <ModalDialog.Footer>
      <ActionRow>
        <ModalDialog.CloseButton variant="tertiary" onClick={onCancel}>
          {formatMessage(messages.allowanceCancelButton)}
        </ModalDialog.CloseButton>
        <Button variant="primary" onClick={onDelete}>
          {formatMessage(messages.deleteAllowanceDelete)}
        </Button>
      </ActionRow>
    </ModalDialog.Footer>
  </ModalDialog>
);

const AllowanceListActions = ({ allowance }) => {
  const { formatMessage } = useIntl();

  const [isEditModalOpen, setEditModalOpen, setEditModalClosed] = useToggle(false);

  const [isDeleteModalOpen, setDeleteModalOpen, setDeleteModalClosed] = useToggle(false);
  const deleteAllowance = useDeleteAllowance();

  const handleDelete = () => {
    deleteAllowance(allowance.id, setDeleteModalClosed);
  };

  return (
    <div className="allowances-actions text-right">
      <IconButtonWithTooltip
        tooltipPlacement="top"
        tooltipContent={formatMessage(messages.editAllowanceButton)}
        src={EditOutline}
        iconAs={Icon}
        alt={formatMessage(messages.editAllowanceButton)}
        onClick={setEditModalOpen}
        variant="primary"
        className="mr-2"
        size="sm"
        data-testid="edit-allowance-icon"
      />
      <IconButtonWithTooltip
        tooltipPlacement="top"
        tooltipContent={formatMessage(messages.deleteAllowanceButton)}
        alt={formatMessage(messages.deleteAllowanceButton)}
        src={DeleteOutline}
        iconAs={Icon}
        onClick={setDeleteModalOpen}
        variant="secondary"
        size="sm"
        data-testid="delete-allowance-icon"
      />
      {EditModal(isEditModalOpen, setEditModalClosed, allowance, formatMessage)}
      {DeleteModal(isDeleteModalOpen, setDeleteModalClosed, handleDelete, formatMessage)}
    </div>
  );
};

AllowanceListActions.propTypes = {
  allowance: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default AllowanceListActions;
