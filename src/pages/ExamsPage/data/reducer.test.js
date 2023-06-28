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
          currentExamIndex: 0,
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
                exam_type: 'Timed',
                start_time: '2023-04-05T19:27:16.000000Z',
                end_time: '2023-04-05T19:27:17.000000Z',
                attempt_status: 'completed',
                attempt_id: 0,
              },
              {
                exam_display_name: 'Exam 2',
                username: 'username',
                allowed_time_limit_mins: 60,
                exam_type: 'Proctored',
                start_time: '2023-04-05T19:37:16.000000Z',
                end_time: '2023-04-05T19:37:17.000000Z',
                attempt_status: 'completed',
                attempt_id: 1,
              },
            ],
          },
        };
        expect(reducer(initialState, action)).toEqual({
          currentExamIndex: 0,
          examsList: [],
          attemptsList: [
            {
              exam_name: 'Exam 1',
              username: 'username',
              time_limit: 60,
              exam_type: 'Timed',
              started_at: '2023-04-05T19:27:16.000000Z',
              completed_at: '2023-04-05T19:27:17.000000Z',
              status: 'completed',
              attempt_id: 0,
            },
            {
              exam_name: 'Exam 2',
              username: 'username',
              time_limit: 60,
              exam_type: 'Proctored',
              started_at: '2023-04-05T19:37:16.000000Z',
              completed_at: '2023-04-05T19:37:17.000000Z',
              status: 'completed',
              attempt_id: 1,
            },
          ],
        });
      });
    });
    describe('deleteExamAttempt', () => {
      it('deletes the expected attempt from attemptList', () => {
        const state = {
          currentExamIndex: 0,
          examsList: [],
          attemptsList: [
            {
              exam_name: 'Exam 1',
              username: 'username',
              time_limit: 60,
              exam_type: 'Timed',
              started_at: '2023-04-05T19:27:16.000000Z',
              completed_at: '2023-04-05T19:27:17.000000Z',
              status: 'completed',
              attempt_id: 0,
            },
            {
              exam_name: 'Exam 2',
              username: 'username',
              time_limit: 60,
              exam_type: 'Proctored',
              started_at: '2023-04-05T19:37:16.000000Z',
              completed_at: '2023-04-05T19:37:17.000000Z',
              status: 'completed',
              attempt_id: 1,
            },
          ],
        };
        const action = {
          type: 'exams/deleteExamAttempt',
          payload: 0,
        };
        expect(reducer(state, action)).toEqual({
          currentExamIndex: 0,
          examsList: [],
          attemptsList: [
            {
              exam_name: 'Exam 2',
              username: 'username',
              time_limit: 60,
              exam_type: 'Proctored',
              started_at: '2023-04-05T19:37:16.000000Z',
              completed_at: '2023-04-05T19:37:17.000000Z',
              status: 'completed',
              attempt_id: 1,
            },
          ],
        });
      });
    });
  });
});
