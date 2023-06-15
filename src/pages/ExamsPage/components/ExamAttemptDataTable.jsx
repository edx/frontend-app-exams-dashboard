import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { DataTable } from '@edx/paragon';

import { useExamAttemptsData, useInitializeAttemptsList } from '../hooks';

const ExamAttemptDataTable = ({ exams }) => {
    // TODO: Evaluate feasability of 10,000+ entries for that one discovery...
    // Test pagination and search with 10,000+ entries.
    // Start local, maybe on Stage b/c different.
    // If it works local, it works stage.
    const tableData = [];

    const makeid = (length) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    };

    let tableRow = {};
    for (let i = 0; i <= 15000; i++) {
        tableRow = {
            name: makeid(5),
            color: makeid(10),
            famous_for: makeid(20),
        }
        tableData.push(tableRow);
    }

    // const fetchExamAttempts = async (examId) => {
    //     await ;
    // };

    const getAttemptsForAllExams = async () => {
        await Object.values(exams).forEach((exam) => {
            // console.log(exam);
            console.log("Fetching attempts for exam with id:", exam.id);
            useInitializeAttemptsList(exam.id);
        });
    }

    // console.log("examsList", exams);
    getAttemptsForAllExams();
    // const attemptsList = useExamAttemptsData();
    // console.log("ATTEMPTS:", attemptsList);

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