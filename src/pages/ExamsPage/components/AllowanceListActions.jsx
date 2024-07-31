import {
  ActionRow,
  Icon,
  IconButtonWithTooltip,
  ModalDialog,
  StatefulButton,
  useToggle,
} from '@openedx/paragon';
import { DeleteOutline, EditOutline } from '@openedx/paragon/icons';
import { useIntl } from '@edx/frontend-platform/i18n';

import messages from '../messages';
import { useDeleteAllowance } from '../hooks';

const DeleteModal = (isOpen, onCancel, onDelete, formatMessage) => (
  <ModalDialog
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
        <StatefulButton
          variant="primary"
          state=""
          labels={{
            default: formatMessage(messages.deleteAllowanceDelete),
          }}
          onClick={onDelete}
        />
      </ActionRow>
    </ModalDialog.Footer>
  </ModalDialog>
);

const AllowanceListActions = (allowance) => {
  const { formatMessage } = useIntl();
  const [isDeleteModalOpen, setDeleteModalOpen, setDeleteModalClosed] = useToggle(false);

  const deleteAllowance = useDeleteAllowance();

  const handleDelete = () => {
    deleteAllowance(allowance.id);
    setDeleteModalClosed();
  };

  return (
    <div className="allowances-actions text-right">
      <IconButtonWithTooltip
        tooltipPlacement="top"
        tooltipContent={formatMessage(messages.editAllowanceButton)}
        src={EditOutline}
        iconAs={Icon}
        alt={formatMessage(messages.editAllowanceButton)}
        onClick={setDeleteModalOpen}
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
      />
      {DeleteModal(isDeleteModalOpen, setDeleteModalClosed, handleDelete, formatMessage)}
    </div>
  );
};

export default AllowanceListActions;
