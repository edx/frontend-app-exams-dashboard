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
  exam_type: 'timed',
  started_at: '2023-04-05T19:27:16.000000Z',
  completed_at: '2023-04-05T19:27:17.000000Z',
  status: 'submitted',
},
{
  exam_name: 'Exam 2',
  username: 'username',
  time_limit: 60,
  exam_type: 'proctored',
  started_at: '2023-04-05T19:37:16.000000Z',
  completed_at: '2023-04-05T19:37:17.000000Z',
  status: 'submitted',
}];

const testAllowances = [
  {
    id: 3,
    exam_id: 1,
    user_id: 1,
    extra_time_mins: 15,
    username: 'edx',
    exam_name: 'This should go first',
    email: 'edx@example.com',
  },
  {
    id: 2,
    exam_id: 3,
    user_id: 1,
    extra_time_mins: 45,
    username: 'edx',
    exam_name: 'This should go second',
    email: 'edx@example.com',
  },
  {
    id: 1,
    exam_id: 4,
    user_id: 2,
    extra_time_mins: 35,
    username: 'edx',
    exam_name: 'This should go third',
    email: 'edx@example.com',
  },
];

const testState = {
  exams: {
    courseId: 'course-v1:edX+Test+Test',
    examsList: testExams,
    currentExamIndex: 1,
    attemptsList: testAttempts,
    allowancesList: testAllowances,
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
  describe('selectCourseId', () => {
    it('should return courseId from store', () => {
      expect(selectors.courseId(testState)).toEqual('course-v1:edX+Test+Test');
    });
  });
  describe('courseAllowancesList', () => {
    it('should return the exam allowances from store', () => {
      expect(selectors.courseAllowancesList(testState)).toEqual(testAllowances);
    });
  });
});
