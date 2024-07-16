import * as constants from 'data/constants';
import {
  initialState,
  reducer,
} from './reducer';

describe('ExamsPage reducer', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  describe('actions', () => {
    describe('loadExams', () => {
      it('sets the examsList', () => {
        const action = {
          type: 'exams/loadExams',
          payload: [
            {
              id: 1,
              exam_name: 'Exam 1',
              exam_type: 'timed',
            },
            {
              id: 2,
              exam_name: 'Exam 2',
              exam_type: 'timed',
            },
          ],
        };
        expect(reducer(initialState, action)).toEqual({
          courseId: null,
          currentExamIndex: null,
          examsList: [
            {
              id: 1,
              name: 'Exam 1',
            },
            {
              id: 2,
              name: 'Exam 2',
            },
          ],
          attemptsList: [],
          allowancesList: [],
        });
      });
    });
    describe('loadExamAttempts', () => {
      it('sets the attemptsList', () => {
        const action = {
          type: 'exams/loadExamAttempts',
          payload: {
            results: [
              {
                exam_display_name: 'Exam 1',
                username: 'username',
                allowed_time_limit_mins: 60,
                exam_type: 'timed',
                start_time: '2023-04-05T19:27:16.000000Z',
                end_time: '2023-04-05T19:27:17.000000Z',
                attempt_status: 'submitted',
                attempt_id: 0,
              },
              {
                exam_display_name: 'Exam 2',
                username: 'username',
                allowed_time_limit_mins: 60,
                exam_type: 'proctored',
                start_time: '2023-04-05T19:37:16.000000Z',
                end_time: '2023-04-05T19:37:17.000000Z',
                attempt_status: 'submitted',
                attempt_id: 1,
              },
            ],
          },
        };
        expect(reducer(initialState, action)).toEqual({
          courseId: null,
          currentExamIndex: null,
          examsList: [],
          attemptsList: [
            {
              exam_name: 'Exam 1',
              username: 'username',
              time_limit: 60,
              exam_type: 'timed',
              started_at: '2023-04-05T19:27:16.000000Z',
              completed_at: '2023-04-05T19:27:17.000000Z',
              status: 'submitted',
              attempt_id: 0,
            },
            {
              exam_name: 'Exam 2',
              username: 'username',
              time_limit: 60,
              exam_type: 'proctored',
              started_at: '2023-04-05T19:37:16.000000Z',
              completed_at: '2023-04-05T19:37:17.000000Z',
              status: 'submitted',
              attempt_id: 1,
            },
          ],
          allowancesList: [],
        });
      });
    });
    describe('deleteExamAttempt', () => {
      it('deletes the expected attempt from attemptList', () => {
        const state = {
          currentExamIndex: null,
          examsList: [],
          attemptsList: [
            {
              exam_name: 'Exam 1',
              username: 'username',
              time_limit: 60,
              exam_type: 'timed',
              started_at: '2023-04-05T19:27:16.000000Z',
              completed_at: '2023-04-05T19:27:17.000000Z',
              status: 'submitted',
              attempt_id: 0,
            },
            {
              exam_name: 'Exam 2',
              username: 'username',
              time_limit: 60,
              exam_type: 'proctored',
              started_at: '2023-04-05T19:37:16.000000Z',
              completed_at: '2023-04-05T19:37:17.000000Z',
              status: 'submitted',
              attempt_id: 1,
            },
          ],
        };
        const action = {
          type: 'exams/deleteExamAttempt',
          payload: 0,
        };
        expect(reducer(state, action)).toEqual({
          currentExamIndex: null,
          examsList: [],
          attemptsList: [
            {
              exam_name: 'Exam 2',
              username: 'username',
              time_limit: 60,
              exam_type: 'proctored',
              started_at: '2023-04-05T19:37:16.000000Z',
              completed_at: '2023-04-05T19:37:17.000000Z',
              status: 'submitted',
              attempt_id: 1,
            },
          ],
        });
      });
    });
    describe('modifyExamAttemptStatus', () => {
      it('changes status of one attempt to verified when passed verify action', () => {
        const state = {
          currentExamIndex: null,
          examsList: [],
          attemptsList: [
            {
              exam_name: 'Exam 1',
              username: 'username',
              time_limit: 60,
              exam_type: 'timed',
              started_at: '2023-04-05T19:27:16.000000Z',
              completed_at: '2023-04-05T19:27:17.000000Z',
              status: 'submitted',
              attempt_id: 0,
            },
            {
              exam_name: 'Exam 2',
              username: 'username',
              time_limit: 60,
              exam_type: 'proctored',
              started_at: '2023-04-05T19:37:16.000000Z',
              completed_at: '2023-04-05T19:37:17.000000Z',
              status: 'submitted',
              attempt_id: 1,
            },
          ],
        };
        const action = {
          type: 'exams/modifyExamAttemptStatus',
          payload: {
            attemptId: 0,
            action: constants.ExamAttemptActions.verify,
          },
        };
        expect(reducer(state, action)).toEqual({
          currentExamIndex: null,
          examsList: [],
          attemptsList: [
            {
              exam_name: 'Exam 1',
              username: 'username',
              time_limit: 60,
              exam_type: 'timed',
              started_at: '2023-04-05T19:27:16.000000Z',
              completed_at: '2023-04-05T19:27:17.000000Z',
              status: constants.ExamAttemptStatus.verified,
              attempt_id: 0,
            },
            {
              exam_name: 'Exam 2',
              username: 'username',
              time_limit: 60,
              exam_type: 'proctored',
              started_at: '2023-04-05T19:37:16.000000Z',
              completed_at: '2023-04-05T19:37:17.000000Z',
              status: 'submitted',
              attempt_id: 1,
            },
          ],
        });
      });
      it('changes status of one attempt to rejected when passed reject action', () => {
        const state = {
          currentExamIndex: null,
          examsList: [],
          attemptsList: [
            {
              exam_name: 'Exam 1',
              username: 'username',
              time_limit: 60,
              exam_type: 'timed',
              started_at: '2023-04-05T19:27:16.000000Z',
              completed_at: '2023-04-05T19:27:17.000000Z',
              status: 'submitted',
              attempt_id: 0,
            },
            {
              exam_name: 'Exam 2',
              username: 'username',
              time_limit: 60,
              exam_type: 'proctored',
              started_at: '2023-04-05T19:37:16.000000Z',
              completed_at: '2023-04-05T19:37:17.000000Z',
              status: 'submitted',
              attempt_id: 1,
            },
          ],
        };
        const action = {
          type: 'exams/modifyExamAttemptStatus',
          payload: {
            attemptId: 0,
            action: constants.ExamAttemptActions.reject,
          },
        };
        expect(reducer(state, action)).toEqual({
          currentExamIndex: null,
          examsList: [],
          attemptsList: [
            {
              exam_name: 'Exam 1',
              username: 'username',
              time_limit: 60,
              exam_type: 'timed',
              started_at: '2023-04-05T19:27:16.000000Z',
              completed_at: '2023-04-05T19:27:17.000000Z',
              status: constants.ExamAttemptStatus.rejected,
              attempt_id: 0,
            },
            {
              exam_name: 'Exam 2',
              username: 'username',
              time_limit: 60,
              exam_type: 'proctored',
              started_at: '2023-04-05T19:37:16.000000Z',
              completed_at: '2023-04-05T19:37:17.000000Z',
              status: 'submitted',
              attempt_id: 1,
            },
          ],
        });
      });
    });
    describe('setCurrentExam', () => {
      const state = {
        currentExamIndex: 2,
        examsList: [
          {
            id: 55,
            name: 'Exam 1',
          },
          {
            id: 98,
            name: 'Exam 2',
          },
          {
            id: 107,
            name: 'Exam 3',
          },
        ],
        attemptsList: [],
      };
      it('sets currentExamIndex based on exam id', () => {
        const action = {
          type: 'exams/setCurrentExam',
          payload: 98,
        };
        expect(reducer(state, action)).toEqual({
          currentExamIndex: 1,
          examsList: state.examsList,
          attemptsList: state.attemptsList,
        });
      });
      it('sets currentExamIndex to null if exam id is not found', () => {
        const action = {
          type: 'exams/setCurrentExam',
          payload: 1,
        };
        expect(reducer(state, action)).toEqual({
          currentExamIndex: null,
          examsList: state.examsList,
          attemptsList: state.attemptsList,
        });
      });
    });
    describe('setCourseId', () => {
      it('sets the courseId', () => {
        const action = {
          type: 'exams/setCourseId',
          payload: 'course-v1:edX+Test+Test',
        };
        expect(reducer(initialState, action)).toEqual({
          currentExamIndex: null,
          examsList: [],
          attemptsList: [],
          allowancesList: [],
          courseId: 'course-v1:edX+Test+Test',
        });
      });
    });
  });
});
