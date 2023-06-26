import * as selectors from './selectors';

const testExams = [{
  id: 1,
  name: 'Exam 1',
}, {
  id: 2,
  name: 'Exam 2',
}];

const testAttempts = [{
  exam_name: 'Exam 1',
  username: 'username',
  time_limit: 60,
  exam_type: 'Timed',
  started_at: '2023-04-05T19:27:16.000000Z',
  completed_at: '2023-04-05T19:27:17.000000Z',
  status: 'completed',
},
{
  exam_name: 'Exam 2',
  username: 'username',
  time_limit: 60,
  exam_type: 'Proctored',
  started_at: '2023-04-05T19:37:16.000000Z',
  completed_at: '2023-04-05T19:37:17.000000Z',
  status: 'completed',
}];

const testState = {
  exams: {
    examsList: testExams,
    currentExamIndex: 1,
    attemptsList: testAttempts,
  },
};

describe('ExamsPage data selectors', () => {
  describe('selectExamsList', () => {
    it('should return examsList from store', () => {
      expect(selectors.courseExamsList(testState)).toEqual(testExams);
    });
  });
  describe('selectCurrentExamIndex', () => {
    it('should return an exam based on the current index', () => {
      expect(selectors.currentExam(testState)).toEqual(testExams[1]);
    });
  });
  describe('selectExamAttemptsList', () => {
    it('should return attemptsList from store', () => {
      expect(selectors.courseExamAttemptsList(testState)).toEqual(testAttempts);
    });
  });
});
