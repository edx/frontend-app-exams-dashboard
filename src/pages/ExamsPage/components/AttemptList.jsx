import PropTypes from 'prop-types';
import { DataTable } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import ResetExamAttemptButton from './ResetExamAttemptButton';
import ReviewExamAttemptButton from './ReviewExamAttemptButton';

const cleanString = (string) => {
  // Remove underscores, capitalize the first letter of each word, and return as a single string.
  return string.split("_").map(string => string.charAt(0).toUpperCase() + string.slice(1)).join(" ");
};

// (string.charAt(0).toUpperCase() + string.slice(1)).replace(/_/g, " ");

// The button components must be compartmentalized here otherwise npm lint throws an unstable-nested-component error.
const ResetButton = (row) => (
  <ResetExamAttemptButton
    username={row.original.username}
    examName={row.original.exam_name}
    attemptId={row.original.attempt_id}
  />
);

const ReviewButton = (row, attempts) => (
  <ReviewExamAttemptButton
    username={row.original.username}
    examName={row.original.exam_name}
    attemptId={row.original.attempt_id}
  />
);

const getAndReadAttempts = (attempts) => {
  if (attempts !== undefined) {
    return attempts;
  }
  return [];
};

const AttemptList = ({ attempts }) => {
  const { formatMessage, formatDate } = useIntl();

  return (
    <div data-testid="attempt_list">
      <DataTable
        isLoading={attempts == null}
        isPaginated
        initialState={{
          pageSize: 20,
        }}
        isSortable
        itemCount={attempts.length}
        additionalColumns={[
          {
            id: 'action',
            Header: formatMessage({
              id: 'AttemptsList.action',
              defaultMessage: 'Action',
              description: 'Table header for the table column listing action to reset the exam attempt',
            }),
            Cell: ({ row }) => ResetButton(row),
          },
          {
            id: 'review',
            Header: formatMessage({
              id: 'AttemptsList.review',
              defaultMessage: 'Review',
              description: 'Table header for the table column listing review to reset the exam attempt',
            }),
            Cell: ({ row }) => (row.original.status === "second_review_required" ? ReviewButton(row, attempts) : null),
          },
        ]}
        data={getAndReadAttempts(attempts)}
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
            Cell: ({ row }) => (cleanString(row.original.exam_type)),
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
            Cell: ({ row }) => cleanString(row.original.status),
          },
        ]}
      >
        <DataTable.TableControlBar />
        <DataTable.Table />
        <DataTable.EmptyTable content={formatMessage({
          id: 'AttemptsList.DataTable.EmptyTable',
          defaultMessage: 'No results found.',
          description: 'Message that appears in the table if no data is found',
        })}
        />
        <DataTable.TableFooter />
      </DataTable>
    </div>
  );
};

AttemptList.propTypes = {
  attempts: PropTypes.arrayOf(PropTypes.shape({
    exam_name: PropTypes.string,
    username: PropTypes.string,
    time_limit: PropTypes.number,
    exam_type: PropTypes.string,
    started_at: PropTypes.string,
    completed_at: PropTypes.string,
    status: PropTypes.string,
  })).isRequired,
};

export default AttemptList;
