import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { DataTable } from '@edx/paragon';

import { useExamAttemptsData, useInitializeAttemptsList } from '../hooks';

// TODO: Evaluate feasability of 10,000+ entries for that one discovery...
// Test pagination and search with 10,000+ entries.
// Start local, maybe on Stage b/c different.
// If it works local, it works stage.
const ExamAttemptDataTable = ({ exams }) => {
    useInitializeAttemptsList(exams);
    const { attemptsList } = useExamAttemptsData();

    return (
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
                itemCount={attemptsList.length}
                data={attemptsList}
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
};

ExamAttemptDataTable.propTypes = {
    exams: PropTypes.arrayOf(PropTypes.object).isRequired, // eslint-disable-line react/forbid-prop-types
};

export default ExamAttemptDataTable;