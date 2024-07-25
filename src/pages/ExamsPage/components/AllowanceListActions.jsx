import PropTypes from 'prop-types';
import {
  Icon,
  IconButtonWithTooltip,
} from '@openedx/paragon';
import { EditOutline, DeleteOutline } from '@openedx/paragon/icons';

import './AllowanceList.scss';

const AllowanceListActions = ({ onEdit, onDelete }) => (
  <div className="allowances-actions text-right">
    <IconButtonWithTooltip
      tooltipPlacement="top"
      tooltipContent={<div>Edit allowance</div>}
      src={EditOutline}
      iconAs={Icon}
      alt="Edit"
      onClick={onEdit}
      variant="primary"
      className="mr-2"
      size="sm"
    />
    <IconButtonWithTooltip
      tooltipPlacement="top"
      tooltipContent={<div>Delete allowance</div>}
      src={DeleteOutline}
      iconAs={Icon}
      alt="Delete"
      onClick={onDelete}
      variant="secondary"
      size="sm"
    />
  </div>
);

AllowanceListActions.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default AllowanceListActions;
