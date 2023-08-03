import PropTypes from 'prop-types';
import { DataTable } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import * as constants from 'data/constants';
import ResetExamAttemptButton from './ResetExamAttemptButton';
import ReviewExamAttemptButton from './ReviewExamAttemptButton';
import messages from '../messages';

// The button components must be compartmentalized here otherwise npm lint throws an unstable-nested-component error.
const ResetButton = (row) => (
  <ResetExamAttemptButton
    username={row.original.username}
    examName={row.original.exam_name}
    attemptId={row.original.attempt_id}
  />
);

const ReviewButton = (row) => (
  <ReviewExamAttemptButton
    username={row.original.username}
    examName={row.original.exam_name}
    attemptId={row.original.attempt_id}
    severity={row.original.severity}
    submissionReason={row.original.submission_reason}
  />
);

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
            Header: formatMessage(messages.examAttemptsTableHeaderAction),
            Cell: ({ row }) => ResetButton(row),
          },
          {
            id: 'review',
            Header: formatMessage(messages.examAttemptsTableHeaderReview),
            Cell: ({ row }) => (row.original.status === 'second_review_required' ? ReviewButton(row) : null),
          },
        ]}
        data={attempts}
        columns={[
          {
            Header: formatMessage(messages.examAttemptsTableHeaderExamName),
            accessor: 'exam_name',
          },
          {
            Header: formatMessage(messages.examAttemptsTableHeaderUsername),
            accessor: 'username',
          },
          {
            Header: formatMessage(messages.examAttemptsTableHeaderTimeLimit),
            Cell: ({ row }) => (row.original.time_limit),
          },
          {
            Header: formatMessage(messages.examAttemptsTableHeaderExamType),
            Cell: ({ row }) => constants.ExamTypes[row.original.exam_type],
          },
          {
            Header: formatMessage(messages.examAttemptsTableHeaderStartedAt),
            Cell: ({ row }) => (formatDate(row.original.started_at, {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            })),
          },
          {
            Header: formatMessage(messages.examAttemptsTableHeaderCompletedAt),
            Cell: ({ row }) => (formatDate(row.original.completed_at, {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            })),
          },
          {
            Header: formatMessage(messages.examAttemptsTableHeaderStatus),
            Cell: ({ row }) => constants.ExamAttemptStatus[row.original.status],
          },
        ]}
      >
        <DataTable.TableControlBar />
        <DataTable.Table />
        <DataTable.EmptyTable content={formatMessage(messages.examAttemptsTableHeaderEmptyTable)} />
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
