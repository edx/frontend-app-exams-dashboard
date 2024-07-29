import PropTypes from 'prop-types';
import {
  Button,
  Collapsible,
  DataTable,
  Icon,
  IconButtonWithTooltip,
} from '@openedx/paragon';
import { Add, DeleteOutline, EditOutline } from '@openedx/paragon/icons';
import { useIntl } from '@edx/frontend-platform/i18n';

import messages from '../messages';
import { useAllowancesData } from '../hooks';

import './AllowanceList.scss';

const AllowanceListActions = ({ onEdit, onDelete }) => {
  const { formatMessage } = useIntl();

  return (
    <div className="allowances-actions text-right">
      <IconButtonWithTooltip
        tooltipPlacement="top"
        tooltipContent={formatMessage(messages.editAllowanceButton)}
        src={EditOutline}
        iconAs={Icon}
        alt={formatMessage(messages.editAllowanceButton)}
        onClick={onEdit}
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
        onClick={onDelete}
        variant="secondary"
        size="sm"
      />
    </div>
  );
};

AllowanceListActions.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const AllowanceList = () => {
  const { formatMessage } = useIntl();

  const {
    allowancesList,
  } = useAllowancesData();

  const allowancesByUser = allowancesList.reduce((acc, curr) => {
    const {
      id,
      exam_id: examId,
      user_id: userId,
      extra_time_mins: extraTimeMins,
      username,
      exam_name: examName,
      email,
    } = curr;

    const allowance = {
      id,
      examId,
      examName,
      allowanceType: formatMessage(messages.allowanceTypeMinutes),
      extraTimeMins,
    };

    const user = acc.find(u => u.userId === userId);

    if (user) {
      user.allowances.push(allowance);

      return acc;
    }

    acc.push({
      userId,
      username,
      email,
      allowances: [allowance],
    });

    return acc;
  }, []);

  const handleAdd = () => {
    console.log('Add'); // eslint-disable-line no-console
  };

  const handleEdit = (row) => {
    console.log('Edit', row); // eslint-disable-line no-console
  };

  const handleDelete = (row) => {
    console.log('Delete', row); // eslint-disable-line no-console
  };

  return (
    <>
      <div className="allowances-header">
        <h3 data-testid="allowances">{formatMessage(messages.allowanceDashboardTabTitle)}</h3>
        <Button variant="outline-primary" iconBefore={Add} size="sm" className="header-allowance-button" onClick={handleAdd}>
          {formatMessage(messages.addAllowanceButton)}
        </Button>
      </div>
      <div className="allowances-body">
        {!allowancesByUser.length
          ? (
            <div className="allowances-empty">
              <h4>{formatMessage(messages.noAllowancesHeader)}</h4>
              <p>{formatMessage(messages.noAllowancesBody)}</p>
              <Button variant="primary" iconBefore={Add} onClick={handleAdd}>
                {formatMessage(messages.addAllowanceButton)}
              </Button>
            </div>
          ) : (
            <div className="allowances-list">
              {allowancesByUser.map(({
                userId, username, email, allowances,
              }) => (
                <Collapsible
                  defaultOpen
                  key={userId}
                  styling="card-lg"
                  title={(
                    <p>
                      <strong>{username}</strong> (<a href={`mailto: ${email}`} target="_blank" onClick={e => e.stopPropagation()} rel="noreferrer">{email}</a>)
                    </p>
                  )}
                >
                  <span />
                  <DataTable
                    itemCount={allowances.length}
                    data={allowances}
                    columns={[
                      {
                        Header: formatMessage(messages.tableColumnExamName),
                        accessor: 'examName',

                      },
                      {
                        Header: formatMessage(messages.tableColumnAllowanceType),
                        accessor: 'allowanceType',
                      },
                      {
                        Header: formatMessage(messages.tableColumnAllowanceValue),
                        accessor: 'extraTimeMins',
                      },
                    ]}
                    additionalColumns={[
                      {
                        id: 'actions',
                        Cell: () => AllowanceListActions({ onEdit: handleEdit, onDelete: handleDelete }),
                      },
                    ]}
                  >
                    <DataTable.Table />
                  </DataTable>
                </Collapsible>
              ))}
            </div>
          )}
      </div>
    </>
  );
};

export default AllowanceList;
