import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { DataTable } from '@edx/paragon';

import { useExamAttemptsData, useFetchExamAttempts } from '../hooks';

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

    const getExamAttempts = async (examId) => {
        return await useFetchExamAttempts(exam.id);
    };
    // I'm realizing we don't have an endpoint to get all the exam attempts within a course, so we'll have to make a separate
    // call to edx-exams for each exam unless we decide to add such an endpoint later on.

    // IDEA 1: call attempt endpoint using each exam in exam list, pass the returned list of attempts to ExamAttemptDataTable
    // IDEA 2: pass exam list into ExamAttemptDataTable, call endpoint there

    // i WAS going with IDEA 1 for now in order to keep the API calls in the same place.
    // But it doesn't work so I'm going with IDEA 2.

    // let attemptsList = [];
    // when the examsList is loaded, get the id of each exam, and get the attemptsList
    let attemptsList;
    useEffect(() => {
        console.log("examsList", exams);
        Object.values(exams).forEach(exam => {
            console.log(exam);
            console.log(exam.id);
            getExamAttempts(exam.id);
        });
        attemptsList = useExamAttemptsData();
    }, []);
    useEffect(() => {
        console.log("ATTEMPTS:", attemptsList);
    }, [attemptsList]);

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