import React from 'react';

import * as reduxHooks from 'data/redux/hooks';

import * as api from './data/api';
import * as hooks from './hooks';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

jest.mock('data/redux/hooks', () => ({
  useMakeNetworkRequest: jest.fn(),
  useRequestIsPending: jest.fn(),
}));

jest.mock('./data/api');

describe('ExamsPage hooks', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });
  describe('useInitializeExamsPage', () => {
    it('calls useFetchCourseExams on component load', () => {
      const mockFetchCourseExams = jest.fn();
      jest.spyOn(hooks, 'useFetchCourseExams').mockImplementation(() => mockFetchCourseExams);
      hooks.useInitializeExamsPage('course-1');
      const [cb, prereqs] = React.useEffect.mock.calls[0];
      expect(prereqs).toEqual([]);
      expect(mockFetchCourseExams).not.toHaveBeenCalled();
      cb();
      expect(mockFetchCourseExams).toHaveBeenCalledWith('course-1');
    });
  });
  describe('useFetchCourseExams', () => {
    const mockMakeNetworkRequest = jest.fn();
    beforeEach(() => {
      reduxHooks.useMakeNetworkRequest.mockReturnValue(mockMakeNetworkRequest);
      api.getCourseExams.mockReturnValue(Promise.resolve({ data: 'data' }));
    });

    it('calls makeNetworkRequest to fetch exams', () => {
      hooks.useFetchCourseExams('course-1')();
      expect(mockMakeNetworkRequest).toHaveBeenCalledWith({
        requestKey: 'fetchCourseExams',
        promise: expect.any(Promise),
        onSuccess: expect.any(Function),
      });
    });
    it('dispatches loadExams on success', async () => {
      await hooks.useFetchCourseExams('course-1')();
      const { onSuccess } = mockMakeNetworkRequest.mock.calls[0][0];
      onSuccess('response');
      expect(mockDispatch).toHaveBeenCalledWith({
        payload: 'response',
        type: 'exams/loadExams',
      });
    });
  });
  describe('useFetchExamAttempts', () => {
    const mockMakeNetworkRequest = jest.fn();
    beforeEach(() => {
      reduxHooks.useMakeNetworkRequest.mockReturnValue(mockMakeNetworkRequest);
      api.getExamAttempts.mockReturnValue(Promise.resolve({ data: 'data' }));
    });

    it('calls makeNetworkRequest to fetch exam attempts', () => {
      hooks.useFetchExamAttempts(0)();
      expect(mockMakeNetworkRequest).toHaveBeenCalledWith({
        requestKey: 'fetchExamAttempts',
        promise: expect.any(Promise),
        onSuccess: expect.any(Function),
      });
    });
    it('dispatches loadExamAttempts on success', async () => {
      await hooks.useFetchExamAttempts(0)();
      const { onSuccess } = mockMakeNetworkRequest.mock.calls[0][0];
      onSuccess('response');
      expect(mockDispatch).toHaveBeenCalledWith({
        payload: 'response',
        type: 'exams/loadExamAttempts',
      });
    });
  });
});
