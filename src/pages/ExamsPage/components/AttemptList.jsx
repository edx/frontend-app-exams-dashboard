import React from 'react';
import PropTypes from 'prop-types';
import { Button, DataTable } from '@edx/paragon';
const ResetAction = (props) => (
  <Button onClick={() => console.log('Reset', props)}>
    Reset
  </Button>
);

const AttemptList = ({ attempts }) => (
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
          Header: 'Action',
          // TODO: For MST-1945, make this button actually "reset" (i.e. delete)
          // the exam attempt for the cell's respective row after confirmation.
          Cell: ({ row }) => <Button variant="link" size="sm" onClick={() => console.log(`Resetting ${row.values.name}`)}>Reset</Button>,
        }
      ]}
      data={attempts}
              // TODO after laundry: use i18n package's "formatMessage", "formattedDate" and all that

      columns={[
        {
          Header: 'Exam Name',
          accessor: 'exam_name',
        },
        {
          Header: 'Username',
          accessor: 'username',
        },
        {
          Header: 'Time Limit',
          accessor: 'time_limit',
        },
        {
          Header: 'Exam Type',
          accessor: 'exam_type',
        },
        {
          Header: 'Started At',
          accessor: 'started_at',
        },
        {
          Header: 'Completed At',
          accessor: 'completed_at',
        },
        {
          Header: 'Status',
          accessor: 'status',
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

AttemptList.propTypes = {
  attempts: PropTypes.arrayOf(PropTypes.object).isRequired, // eslint-disable-line react/forbid-prop-types
};

export default AttemptList;
