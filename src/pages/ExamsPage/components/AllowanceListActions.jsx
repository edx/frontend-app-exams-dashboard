import { PropTypes } from 'prop-types';
import {
  ActionRow,
  Button,
  Icon,
  IconButtonWithTooltip,
  ModalDialog,
  useToggle,
} from '@openedx/paragon';
import { DeleteOutline, EditOutline } from '@openedx/paragon/icons';
import { useIntl } from '@edx/frontend-platform/i18n';

import messages from '../messages';
import { useDeleteAllowance, useEditAllowance } from '../hooks';

// todo: add onEdit
const EditModal = (isOpen, onCancel, onEdit, formatMessage) => (
  <ModalDialog
    title="edit allowance"
    isOpen={isOpen}
    onClose={onCancel}
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
      <p>{formatMessage(messages.editAllowanceBody)}</p>
    </ModalDialog.Body>
    <ModalDialog.Footer>
      <ActionRow>
        <ModalDialog.CloseButton variant="tertiary" onClick={onCancel}>
          {formatMessage(messages.editAllowanceCancel)}
        </ModalDialog.CloseButton>
        <Button variant="primary" onClick={onEdit}>
          {formatMessage(messages.editAllowanceSave)}
        </Button>
      </ActionRow>
    </ModalDialog.Footer>
  </ModalDialog>
);

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
  const editAllowance = useEditAllowance();

  const handleEdit = () => {
    editAllowance(allowance.id, setEditModalClosed);
  };

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
      {EditModal(isEditModalOpen, setEditModalClosed, handleEdit, formatMessage)}
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
