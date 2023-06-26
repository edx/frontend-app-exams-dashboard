import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

import * as api from './api';

jest.mock('@edx/frontend-platform/auth');
const axiosMock = new MockAdapter(axios);
getAuthenticatedHttpClient.mockReturnValue(axios);

jest.mock('@edx/frontend-platform', () => ({
  ensureConfig: jest.fn(),
  getConfig: jest.fn(() => ({
    EXAMS_BASE_URL: 'test-exams-url',
  })),
}));

const courseId = 'course-v1:edX+DemoX+Demo_Course';
const examId = 0;
describe('ExamsPage data api', () => {
  describe('getCourseExams', () => {
    it('calls get on exams url with course id', async () => {
      axiosMock.onGet().reply(200, []);
      const data = await api.getCourseExams(courseId);
      expect(axiosMock.history.get[0].url).toBe('test-exams-url/api/v1/exams/course_id/course-v1:edX+DemoX+Demo_Course/');
      expect(data).toEqual([]);
    });
  });
  describe('getExamAttempts', () => {
    it('calls get on exam attempts url with exam id', async () => {
      axiosMock.onGet().reply(200, []);
      const data = await api.getExamAttempts(examId);
      expect(axiosMock.history.get[1].url).toBe('test-exams-url/api/v1/instructor_view/attempts?exam_id=0');
      expect(data).toEqual([]);
    });
  });
});
