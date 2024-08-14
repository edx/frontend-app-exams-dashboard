import { PropTypes } from 'prop-types';
import {
  ActionRow,
  Form,
  Button,
  Icon,
  IconButtonWithTooltip,
  ModalDialog,
  useToggle,
} from '@openedx/paragon';
import { DeleteOutline, EditOutline } from '@openedx/paragon/icons';
import { useIntl } from '@edx/frontend-platform/i18n';

import React, { useState } from 'react';
import messages from '../messages';
import { useCreateOrUpdateAllowance, useDeleteAllowance } from '../hooks';

const EditModal = (isOpen, onClose, allowance, formatMessage) => {
  const editAllowance = useCreateOrUpdateAllowance();
  const [additionalTimeError, setAdditionalTimeError] = useState(false);
  // const isEdit = useState(false);
  const initialFormState = {
    'allowance-id': allowance.id,
  };
  const [form, setForm] = useState(initialFormState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit = () => {
    setAdditionalTimeError(!form['additional-time-minutes']);
    const valid = (
      form['additional-time-minutes']
    );
    if (valid) {
      editAllowance(form, onClose);
      // createAllowance(form, close);
      setForm(initialFormState);
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
        <ModalDialog.Title>
          {formatMessage(messages.editAllowanceHeader)}
        </ModalDialog.Title>
      </ModalDialog.Header>
      <ModalDialog.Body>
        <Form id="edit-allowance-form" onSubmit={onSubmit}>
          <Form.Group controlId="form-allowance-value-minutes" isInvalid={additionalTimeError}>
            <Form.Label>{ formatMessage(messages.addAllowanceMinutesField) }</Form.Label>
            <Form.Control
              name="additional-time-minutes"
              value={form['additional-time-minutes'] || ''}
              onChange={handleChange}
              data-testid="additional-time-minutes"
            />
            {/* eslint-disable-next-line max-len */}
            {/* { additionalTimeError && <Form.Control.Feedback type="invalid">{ formatMessage(messages.addAllowanceMinutesErrorFeedback) }</Form.Control.Feedback> } */}
          </Form.Group>
        </Form>
      </ModalDialog.Body>
      <ModalDialog.Footer>
        <ActionRow>
          <ModalDialog.CloseButton variant="tertiary" onClick={onClose}>
            {formatMessage(messages.editAllowanceCancel)}
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
          {formatMessage(messages.deleteAllowanceCancel)}
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
