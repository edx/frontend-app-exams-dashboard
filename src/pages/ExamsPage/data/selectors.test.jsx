import * as selectors from './selectors';

const testExams = [{
  id: 1,
  name: 'Exam 1',
}, {
  id: 2,
  name: 'Exam 2',
}];

const testState = {
  exams: {
    examsList: testExams,
    currentExamIndex: 1,
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
});
