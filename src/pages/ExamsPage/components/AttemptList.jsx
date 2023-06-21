import React from 'react';
import PropTypes from 'prop-types';
import { DataTable } from '@edx/paragon';

const AttemptList = ({ attempts }) => (
  <div>
    <p>Data Table</p>
    <DataTable
      isPaginated
      isSelectable
      initialState={{
        pageSize: 20,
      }}
        // isFilterable
      isSortable
        // defaultColumnValues={{ Filter: TextFilter }}
      itemCount={attempts.length}
      data={attempts}
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
        {
          Header: 'Action',
          accessor: 'action',
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
