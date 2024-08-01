import {
  Button,
  Collapsible,
  DataTable,
  useToggle,
} from '@openedx/paragon';
import { Add } from '@openedx/paragon/icons';
import { useIntl } from '@edx/frontend-platform/i18n';

import messages from '../messages';
import { useAllowancesData } from '../hooks';
import AddAllowanceModal from './AddAllowanceModal';
import AllowanceListActions from './AllowanceListActions';

import './AllowanceList.scss';

const AllowanceList = () => {
  const { formatMessage } = useIntl();
  const [isOpen, open, close] = useToggle(false);

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

  return (
    <>
      <div className="allowances-header">
        <h3 data-testid="allowances">{formatMessage(messages.allowanceDashboardTabTitle)}</h3>
        <Button
          variant="outline-primary"
          iconBefore={Add}
          size="sm"
          className="header-allowance-button"
          onClick={open}
        >
          {formatMessage(messages.addAllowanceButton)}
        </Button>
      </div>
      <div className="allowances-body">
        {!allowancesByUser.length
          ? (
            <div className="allowances-empty">
              <h4>{formatMessage(messages.noAllowancesHeader)}</h4>
              <p>{formatMessage(messages.noAllowancesBody)}</p>
              <Button variant="primary" iconBefore={Add} onClick={open}>
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
                        Cell: ({ row }) => AllowanceListActions(row.original),
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
      <AddAllowanceModal isOpen={isOpen} close={close} />
    </>
  );
};

export default AllowanceList;
