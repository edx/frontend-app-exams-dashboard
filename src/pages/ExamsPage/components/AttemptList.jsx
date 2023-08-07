import PropTypes from 'prop-types';
import { DataTable, TextFilter, CheckboxFilter } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import * as constants from 'data/constants';
import ResetExamAttemptButton from './ResetExamAttemptButton';
import ReviewExamAttemptButton from './ReviewExamAttemptButton';
import messages from '../messages';
// import ExamAttemptStatus from 'data/constants'

const ExamTypes = {
  proctored: 'Proctored',
  timed: 'Timed',
  practice: 'Practice',
  onboarding: 'Onboarding',
};

const ExamAttemptStatusUILabels = {
  created: 'Created',
  download_software_clicked: 'Download Software Clicked',
  ready_to_start: 'Ready To Start',
  started: 'Started',
  ready_to_submit: 'Ready To Submit',
  timed_out: 'Timed Out',
  submitted: 'Submitted',
  verified: 'Verified',
  rejected: 'Rejected',
  expired: 'Expired',
  second_review_required: 'Second Review Required',
  error: 'Error',
};

const StatusFilterChoices = [
  {
    name: ExamAttemptStatusUILabels.created,
    value: constants.ExamAttemptStatus.created,
  },
  {
    name: ExamAttemptStatusUILabels.download_software_clicked,
    value: constants.ExamAttemptStatus.download_software_clicked,
  },
  {
    name: ExamAttemptStatusUILabels.ready_to_start,
    value: constants.ExamAttemptStatus.ready_to_start,
  },
  {
    name: ExamAttemptStatusUILabels.started,
    value: constants.ExamAttemptStatus.started,
  },
  {
    name: ExamAttemptStatusUILabels.ready_to_submit,
    value: constants.ExamAttemptStatus.ready_to_submit,
  },
  {
    name: ExamAttemptStatusUILabels.timed_out,
    value: constants.ExamAttemptStatus.timed_out,
  },
  {
    name: ExamAttemptStatusUILabels.submitted,
    value: constants.ExamAttemptStatus.submitted,
  },
  {
    name: ExamAttemptStatusUILabels.verified,
    value: constants.ExamAttemptStatus.verified,
  },
  {
    name: ExamAttemptStatusUILabels.rejected,
    value: constants.ExamAttemptStatus.rejected,
  },
  {
    name: ExamAttemptStatusUILabels.expired,
    value: constants.ExamAttemptStatus.expired,
  },
  {
    name: ExamAttemptStatusUILabels.second_review_required,
    value: constants.ExamAttemptStatus.second_review_required,
  },
  {
    name: ExamAttemptStatusUILabels.error,
    value: constants.ExamAttemptStatus.error,
  },
];

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
        isFilterable
        defaultColumnValues={{ Filter: TextFilter }}
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
            Header: formatMessage(messages.examAttemptsTableHeaderUsername),
            accessor: 'username',
          },
          {
            Header: formatMessage(messages.examAttemptsTableHeaderTimeLimit),
            accessor: 'time_limit',
            disableFilters: true,
          },
          {
            Header: formatMessage(messages.examAttemptsTableHeaderExamType),
            Cell: ({ row }) => ExamTypes[row.original.exam_type],
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
            accessor: 'status',
            Cell: ({ row }) => ExamAttemptStatusUILabels[row.original.status],
            Filter: CheckboxFilter,
            filter: 'includesValue',
            filterChoices: StatusFilterChoices,
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
