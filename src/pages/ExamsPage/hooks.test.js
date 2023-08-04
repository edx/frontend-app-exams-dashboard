import React from 'react';

import * as reduxHooks from 'data/redux/hooks';

import * as constants from 'data/constants';
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
      mockMakeNetworkRequest.mockClear();
      reduxHooks.useMakeNetworkRequest.mockReturnValue(mockMakeNetworkRequest);
      api.getCourseExams.mockReturnValue(Promise.resolve({ data: 'data' }));
    });

    it('calls makeNetworkRequest to fetch exams', () => {
      hooks.useFetchCourseExams()('course-1');
      expect(mockMakeNetworkRequest).toHaveBeenCalledWith({
        requestKey: 'fetchCourseExams',
        promise: expect.any(Promise),
        onSuccess: expect.any(Function),
      });
    });
    it('dispatches loadExams on success', async () => {
      await hooks.useFetchCourseExams()('course-1');
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
      mockMakeNetworkRequest.mockClear();
      reduxHooks.useMakeNetworkRequest.mockReturnValue(mockMakeNetworkRequest);
      api.getExamAttempts.mockReturnValue(Promise.resolve({ data: 'data' }));
    });

    it('calls makeNetworkRequest to fetch exam attempts', () => {
      hooks.useFetchExamAttempts()(0);
      expect(mockMakeNetworkRequest).toHaveBeenCalledWith({
        requestKey: 'fetchExamAttempts',
        promise: expect.any(Promise),
        onSuccess: expect.any(Function),
      });
    });
    it('dispatches loadExamAttempts on success', async () => {
      await hooks.useFetchExamAttempts()(0);
      const { onSuccess } = mockMakeNetworkRequest.mock.calls[0][0];
      onSuccess('response');
      expect(mockDispatch).toHaveBeenCalledWith({
        payload: 'response',
        type: 'exams/loadExamAttempts',
      });
    });
  });
  describe('useDeleteExamAttempt', () => {
    const mockMakeNetworkRequest = jest.fn();
    beforeEach(() => {
      mockMakeNetworkRequest.mockClear();
      reduxHooks.useMakeNetworkRequest.mockReturnValue(mockMakeNetworkRequest);
      // return status 204
      api.deleteExamAttempt.mockReturnValue(Promise.resolve({ data: 'data' }));
    });

    it('calls makeNetworkRequest to delete an attempt', () => {
      hooks.useDeleteExamAttempt()(0);
      expect(mockMakeNetworkRequest).toHaveBeenCalledWith({
        requestKey: 'deleteExamAttempt',
        promise: expect.any(Promise),
        onSuccess: expect.any(Function),
      });
    });
    it('dispatches deleteExamAttempt on success', async () => {
      await hooks.useDeleteExamAttempt()(0);
      const { onSuccess } = mockMakeNetworkRequest.mock.calls[0][0];
      onSuccess();
      expect(mockDispatch).toHaveBeenCalledWith({
        payload: 0,
        type: 'exams/deleteExamAttempt',
      });
    });
  });

  describe('useModifyExamAttempt', () => {
    const mockMakeNetworkRequest = jest.fn();
    beforeEach(() => {
      mockMakeNetworkRequest.mockClear();
      reduxHooks.useMakeNetworkRequest.mockReturnValue(mockMakeNetworkRequest);
      api.modifyExamAttempt.mockReturnValue(Promise.resolve({ data: 'data' }));
    });
    it('calls makeNetworkRequest to modify an exam attempt status', () => {
      hooks.useModifyExamAttempt()(0, constants.ExamAttemptActions.verify);
      expect(mockMakeNetworkRequest).toHaveBeenCalledWith({
        requestKey: 'modifyExamAttempt',
        promise: expect.any(Promise),
        onSuccess: expect.any(Function),
      });
    });
    it('dispatches modifyExamAttemptStatus on success', async () => {
      const attemptId = 0;
      const action = constants.ExamAttemptActions.verify;
      await hooks.useModifyExamAttempt()(attemptId, action);
      const { onSuccess } = mockMakeNetworkRequest.mock.calls[0][0];
      onSuccess({
        attemptId,
        action,
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        payload: {
          attemptId,
          action,
        },
        type: 'exams/modifyExamAttemptStatus',
      });
    });
  });

  describe('useSetCurrentExam', () => {
    it('dispatches setCurrentExam with the new exam id', () => {
      hooks.useSetCurrentExam()(1);
      expect(mockDispatch).toHaveBeenCalledWith({
        payload: 1,
        type: 'exams/setCurrentExam',
      });
    });
    it('calls fetchExamAttempts', () => {
      const mockFetchExamAttempts = jest.fn();
      jest.spyOn(hooks, 'useFetchExamAttempts').mockImplementation(() => mockFetchExamAttempts);
      hooks.useSetCurrentExam()(1);
      expect(mockFetchExamAttempts).toHaveBeenCalledWith(1);
    });
  });
});
