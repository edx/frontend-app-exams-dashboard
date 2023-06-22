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
              description: 'Table header for the table column listing action to reset the exam attempt',
            }),
            // TODO: For MST-1945, make this button actually "reset" (i.e. delete)
            // the exam attempt for the cell's respective row after confirmation.
            /* eslint-disable react/prop-types, react/no-unstable-nested-components */
            Cell: ({ row }) => <Button variant="link" size="sm" onClick={() => console.log(`Resetting ${row.values.name}`)}>Reset</Button>,
            /* eslint-disable react/prop-types, react/no-unstable-nested-components */
          },
        ]}
        data={attempts}
        columns={[
          {
            Header: formatMessage({
              id: 'AttemptsList.exam_name',
              defaultMessage: 'Exam Name',
              description: 'Table header for the table column listing the exam name',
            }),
            accessor: 'exam_name',
          },
          {
            Header: formatMessage({
              id: 'AttemptsList.username',
              defaultMessage: 'Username',
              description: 'Table header for the table column listing the username',
            }),
            accessor: 'username',
          },
          {
            Header: formatMessage({
              id: 'AttemptsList.time_limit',
              defaultMessage: 'Time Limit',
              description: 'Table header for the table column listing the time limit to complete the exam',
            }),
            Cell: ({ row }) => formatMessage({
              id: 'AttemptsList.time_limit',
              defaultMessage: `${row.original.time_limit} minutes`,
              description: 'Data cell for the time limit to complete the exam',
            }),
          },
          {
            Header: formatMessage({
              id: 'AttemptsList.exam_type',
              defaultMessage: 'Exam Type',
              description: 'Table header for the type of the exam',
            }),
            Cell: ({ row }) => (capitalizeFirstLetter(row.original.exam_type)),
          },
          { 
            Header: formatMessage({
              id: 'AttemptsList.started_at',
              defaultMessage: 'Started At',
              description: 'Table header for the time the exam attempt was started',
            }),
            Cell: ({ row }) => (formatDate(row.original.started_at, {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            })),
          },
          {
            Header: formatMessage({
              id: 'AttemptsList.completed_at',
              defaultMessage: 'Completed At',
              description: 'Table header for the time the exam attempt was completed',
            }),
            Cell: ({ row }) => (formatDate(row.original.completed_at, {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            })),
          },
          {
            Header: formatMessage({
              id: 'AttemptsList.status',
              defaultMessage: 'Status',
              description: 'Table header for the current status of the exam attempt',
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
  attempts: PropTypes.arrayOf(PropTypes.shapes).isRequired, // eslint-disable-line react/forbid-prop-types
};

export default AttemptList;
