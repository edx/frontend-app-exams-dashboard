import React from 'react';
import PropTypes from 'prop-types';
import { Button, DataTable } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const ResetAction = (props) => (
  <Button onClick={() => console.log('Reset', props)}>
    Reset
  </Button>
);

const AttemptList = ({ attempts }) => {
  const { formatMessage, formatDate } = useIntl();

  return (
    <div>
      <p>Data Table</p>
      <DataTable
        isPaginated
        isSelectable
        initialState={{
          pageSize: 20,
        }}
        isSortable
        itemCount={attempts.length}
        bulkActions={[
          <ResetAction />,
        ]}
        additionalColumns={[
          {
            id: 'action',
            Header: formatMessage({
              id: 'AttemptsList.action',
              defaultMessage: 'Action',
              description: 'Action to reset the exam attempt',
            }),
            // TODO: For MST-1945, make this button actually "reset" (i.e. delete)
            // the exam attempt for the cell's respective row after confirmation.

            // NOTE: This line throws lots of errors. Docs for this are from:
            // https://paragon-openedx.netlify.app/components/datatable/#custom-cell-content
            Cell: ({ row }) => <Button variant="link" size="sm" onClick={() => console.log(`Resetting ${row.values.name}`)}>Reset</Button>,
          },
        ]}
        data={attempts}
        columns={[
          {
            Header: formatMessage({
              id: 'AttemptsList.exam_name',
              defaultMessage: 'Exam Name',
              description: 'The name of the exam attempted',
            }),
            accessor: 'exam_name',
          },
          {
            Header: formatMessage({
              id: 'AttemptsList.username',
              defaultMessage: 'Username',
              description: 'The user that attempted the exam',
            }),
            accessor: 'username',
          },
          {
            Header: formatMessage({
              id: 'AttemptsList.time_limit',
              defaultMessage: 'Time Limit',
              description: 'Time limit to complete the exam',
            }),
            Cell: ({ row }) => formatMessage({
              id: 'AttemptsList.time_limit',
              defaultMessage: `${row.original.time_limit} minutes`,
              description: 'Time limit to complete the exam',
            }),
          },
          {
            Header: formatMessage({
              id: 'AttemptsList.exam_type',
              defaultMessage: 'Exam Type',
              description: 'Type of the exam',
            }),
            Cell: ({ row }) => (capitalizeFirstLetter(row.original.exam_type)),
          },
          {
            Header: formatMessage({
              id: 'AttemptsList.started_at',
              defaultMessage: 'Started At',
              description: 'Time the exam attempt was started',
            }),
            Cell: ({ row }) => (formatDate(row.original.started_at, {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              second: 'numeric',
            })),
          },
          {
            Header: formatMessage({
              id: 'AttemptsList.completed_at',
              defaultMessage: 'Completed At',
              description: 'Time the exam attempt was started',
            }),
            Cell: ({ row }) => (formatDate(row.original.completed_at, {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              second: 'numeric',
            })),
          },
          {
            Header: formatMessage({
              id: 'AttemptsList.status',
              defaultMessage: 'Status',
              description: 'Current status of the exam attempt',
            }),
            Cell: ({ row }) => (capitalizeFirstLetter(row.original.status)),
          },
        ]}
      >
        <DataTable.TableControlBar />
        <DataTable.Table />
        <DataTable.EmptyTable content="No results found" />
        <DataTable.TableFooter />
      </DataTable>
    </div>
  );
};

AttemptList.propTypes = {
  attempts: PropTypes.arrayOf(PropTypes.object).isRequired, // eslint-disable-line react/forbid-prop-types
};

export default AttemptList;
