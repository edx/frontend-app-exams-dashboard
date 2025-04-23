/* eslint-disable import/prefer-default-export */
import { RequestStates, RequestKeys } from './data/constants';

export const defaultExamsData = {
  examsList: [
    {
      id: 1,
      name: 'exam1',
      examType: 'proctored',
      timeLimitMins: 60,
    },
    {
      id: 2,
      name: 'exam2',
      examType: 'proctored',
      timeLimitMins: 60,
    },
    {
      id: 3,
      name: 'exam3',
      examType: 'proctored',
      timeLimitMins: 60,
    },
    {
      id: 4,
      name: 'exam4',
      examType: 'timed',
      timeLimitMins: 60,
    },
  ],
  currentExamIndex: 0,
  currentExam: { id: 1, name: 'exam1' },
};

export const defaultAttemptsData = {
  attemptsList:
    [{
      exam_name: 'Exam 1',
      username: 'username1',
      time_limit: 60,
      exam_type: 'timed',
      started_at: '2023-04-05T19:27:16.000000Z',
      completed_at: '2023-04-05T19:27:17.000000Z',
      status: 'second_review_required',
      attempt_id: 0,
      severity: 1.0,
      submission_reason: 'Submitted by user',
    },
    {
      exam_name: 'Exam 2',
      username: 'username2',
      time_limit: 60,
      exam_type: 'proctored',
      started_at: '2023-04-05T19:37:16.000000Z',
      completed_at: '2023-04-05T19:37:17.000000Z',
      status: 'submitted',
      attempt_id: 1,
    }],
};

export const initialStoreState = {
  exams: {
    courseId: 'test_course',
    ...defaultExamsData,
    ...defaultAttemptsData,
    allowancesList: [],
  },
  requests: {
    [RequestKeys.fetchCourseExams]: { status: RequestStates.inactive },
    [RequestKeys.fetchExamAttempts]: { status: RequestStates.inactive },
    [RequestKeys.deleteExamAttempt]: { status: RequestStates.inactive },
    [RequestKeys.modifyExamAttempt]: { status: RequestStates.inactive },
    [RequestKeys.createAllowance]: { status: RequestStates.inactive },
    [undefined]: { status: RequestStates.inactive },
  },
};
