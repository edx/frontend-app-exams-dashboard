import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { DataTable } from '@edx/paragon';

import { useExamAttemptsData, useInitializeAttemptsList } from '../hooks';

const ExamAttemptDataTable = ({ exams }) => {
    const tableData = [];
    useInitializeAttemptsList(exams);
    const { attemptsList } = useExamAttemptsData();

    return (
        <div>
            <p>Attempts List</p>
            <ul>
                {attemptsList.map((attempt) => (<li key={attempt.started_at}>{attempt.started_at}</li>))}
            </ul>
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
                itemCount={tableData.length}
                data={tableData}
                columns={[
                    {
                        Header: 'Isaac',
                        accessor: 'name',

                    },
                    {
                        Header: 'Famous For',
                        accessor: 'famous_for',
                    },
                    {
                        Header: 'Coat Color',
                        accessor: 'color',
                        // Filter: CheckboxFilter,
                        // filter: 'includesValue',
                        // filterChoices: [{
                        //     name: 'russian white',
                        //     number: 1,
                        //     value: 'russian white',
                        // },
                        // {
                        //     name: 'orange tabby',
                        //     number: 2,
                        //     value: 'orange tabby',
                        // },
                        // {
                        //     name: 'brown tabby',
                        //     number: 3,
                        //     value: 'brown tabby',
                        // },
                        // {
                        //     name: 'siamese',
                        //     number: 1,
                        //     value: 'siamese',
                        // }]
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