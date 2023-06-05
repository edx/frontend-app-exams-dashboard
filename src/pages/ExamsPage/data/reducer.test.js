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
        });
      });
    });
  });
});
