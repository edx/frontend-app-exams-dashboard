import {
  ActionRow,
  Icon,
  IconButtonWithTooltip,
  ModalDialog,
  StatefulButton,
  useToggle,
} from '@openedx/paragon';
import { Add, DeleteOutline, EditOutline } from '@openedx/paragon/icons';
import { useIntl } from '@edx/frontend-platform/i18n';

import messages from '../messages';

const DeleteModal = (isDeleteModalOpen, setDeleteModalClosed) => (
  <ModalDialog
    isOpen={isDeleteModalOpen}
    onClose={setDeleteModalClosed}
    variant="default"
    hasCloseButton
    isFullscreenOnMobile
  >
    <ModalDialog.Header>
      <ModalDialog.Title>
          Delete Allowance?
      </ModalDialog.Title>
    </ModalDialog.Header>
    <ModalDialog.Body>
      <p>Are you sure you want to delete this allowance?</p>
    </ModalDialog.Body>
    <ModalDialog.Footer>
      <ActionRow>
        <ModalDialog.CloseButton variant="tertiary" onClick={setDeleteModalClosed}>
          Cancel
        </ModalDialog.CloseButton>
        <StatefulButton
          variant="primary"
          state=""
          labels={{
            default: 'Delete',
          }}
          onClick={e => {
            console.log('Delete', e); // eslint-disable-line no-console
            setDeleteModalClosed();
          }}
        />
      </ActionRow>
    </ModalDialog.Footer>
  </ModalDialog>
)

const AllowanceListActions = () => {
  const { formatMessage } = useIntl();
  const [isDeleteModalOpen, setDeleteModalOpen, setDeleteModalClosed] = useToggle(false);

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
      {DeleteModal(isDeleteModalOpen, setDeleteModalClosed)}
    </div>
  );
};

export default AllowanceListActions;