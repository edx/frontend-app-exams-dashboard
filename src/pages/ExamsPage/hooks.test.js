import React from 'react';

import * as reduxHooks from 'data/redux/hooks';

import * as constants from 'data/constants';
import * as api from './data/api';
import * as hooks from './hooks';

const mockDispatch = jest.fn();
const mockUseSelector = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: () => mockUseSelector,
}));

jest.mock('data/redux/hooks', () => ({
  useMakeNetworkRequest: jest.fn(),
  useRequestIsPending: jest.fn(),
  useRequestError: jest.fn(),
}));

jest.mock('./data/api');

describe('ExamsPage hooks', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });
  describe('useInitializeExamsPage', () => {
    it('calls useFetchCourseExams and sets course id on component load', () => {
      const mockFetchCourseExams = jest.fn();
      const mockFetchAllowances = jest.fn();
      jest.spyOn(hooks, 'useFetchCourseExams').mockImplementation(() => mockFetchCourseExams);
      jest.spyOn(hooks, 'useFetchAllowances').mockImplementation(() => mockFetchAllowances);
      hooks.useInitializeExamsPage('course-1');
      const [cb, prereqs] = React.useEffect.mock.calls[0];
      expect(prereqs).toEqual([]);
      expect(mockFetchCourseExams).not.toHaveBeenCalled();
      expect(mockFetchAllowances).not.toHaveBeenCalled();
      cb();
      expect(mockFetchCourseExams).toHaveBeenCalledWith('course-1');
      expect(mockFetchAllowances).toHaveBeenCalledWith('course-1');
      expect(mockDispatch).toHaveBeenCalledWith({
        payload: 'course-1',
        type: 'exams/setCourseId',
      });
    });
  });
  describe('useFetchAllowances', () => {
    const mockMakeNetworkRequest = jest.fn();
    beforeEach(() => {
      mockMakeNetworkRequest.mockClear();
      reduxHooks.useMakeNetworkRequest.mockReturnValue(mockMakeNetworkRequest);
      api.getAllowances.mockReturnValue(Promise.resolve({ data: 'data' }));
    });

    it('calls makeNetworkRequest to fetch allowances', () => {
      hooks.useFetchAllowances()('course-1');
      expect(mockMakeNetworkRequest).toHaveBeenCalledWith({
        requestKey: 'fetchAllowances',
        promise: expect.any(Promise),
        onSuccess: expect.any(Function),
      });
    });
    it('dispatches exams/setAllowancesList on success', async () => {
      await hooks.useFetchAllowances()('course-1');
      const { onSuccess } = mockMakeNetworkRequest.mock.calls[0][0];
      onSuccess('response');
      expect(mockDispatch).toHaveBeenCalledWith({
        payload: 'response',
        type: 'exams/setAllowancesList',
      });
    });
  });
  describe('useDeleteAllowance', () => {
    const mockMakeNetworkRequest = jest.fn();
    const successCb = jest.fn();
    beforeEach(() => {
      mockMakeNetworkRequest.mockClear();
      reduxHooks.useMakeNetworkRequest.mockReturnValue(mockMakeNetworkRequest);
      api.deleteAllowance.mockReturnValue(Promise.resolve());
    });

    it('calls makeNetworkRequest to delete an allowance', () => {
      hooks.useDeleteAllowance()(0, successCb);
      expect(mockMakeNetworkRequest).toHaveBeenCalledWith({
        requestKey: 'deleteAllowance',
        promise: expect.any(Promise),
        onSuccess: expect.any(Function),
      });
    });
    it('dispatches exams/deleteAllowance on success', async () => {
      await hooks.useDeleteAllowance()(19, successCb);
      const { onSuccess } = mockMakeNetworkRequest.mock.calls[0][0];
      onSuccess();
      expect(mockDispatch).toHaveBeenCalledWith({
        payload: 19,
        type: 'exams/deleteAllowance',
      });
    });
    it('calls cb on success', async () => {
      successCb.mockClear();
      await hooks.useDeleteAllowance()(19, successCb);
      const { onSuccess } = mockMakeNetworkRequest.mock.calls[0][0];
      expect(successCb).not.toHaveBeenCalled();
      onSuccess();
      expect(successCb).toHaveBeenCalled();
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

  describe('useButtonStateFromRequestStatus', () => {
    it('returns empty string if no request made', () => {
      reduxHooks.useRequestIsPending.mockReturnValue(false);
      reduxHooks.useRequestError.mockReturnValue(false);
      expect(hooks.useButtonStateFromRequestStatus(constants.RequestKeys.modifyExamAttempt)()).toBe('');
    });
    it('returns pending if request is pending', () => {
      reduxHooks.useRequestIsPending.mockReturnValue(true);
      reduxHooks.useRequestError.mockReturnValue(false);
      expect(hooks.useButtonStateFromRequestStatus(constants.RequestKeys.modifyExamAttempt)()).toBe('pending');
    });
    it('returns error if request errors', () => {
      reduxHooks.useRequestIsPending.mockReturnValue(false);
      reduxHooks.useRequestError.mockReturnValue(true);
      expect(hooks.useButtonStateFromRequestStatus(constants.RequestKeys.modifyExamAttempt)()).toBe('error');
    });
  });

  describe('useCreateAllowance', () => {
    const mockMakeNetworkRequest = jest.fn();
    const formData = {
      users: 'edx, edx@example.com',
      'exam-type': 'proctored',
      exams: { 1: '60', 2: '30' },
      'additional-time-multiplier': '1.5',
      'allowance-type': 'time-multiplier',

    };
    beforeEach(() => {
      mockMakeNetworkRequest.mockClear();
      reduxHooks.useMakeNetworkRequest.mockReturnValue(mockMakeNetworkRequest);
      api.createAllowance.mockReturnValue(Promise.resolve({ data: 'data' }));
    });
    it('calls makeNetworkRequest to create an allowance', () => {
      hooks.useCreateAllowance()(formData);
      expect(mockMakeNetworkRequest).toHaveBeenCalledWith({
        requestKey: 'createAllowance',
        promise: expect.any(Promise),
        onSuccess: expect.any(Function),
      });
      expect(api.createAllowance).toHaveBeenCalledWith(
        mockUseSelector,
        [
          { username: 'edx', exam_id: 1, extra_time_mins: 30 },
          { username: 'edx', exam_id: 2, extra_time_mins: 15 },
          { email: 'edx@example.com', exam_id: 1, extra_time_mins: 30 },
          { email: 'edx@example.com', exam_id: 2, extra_time_mins: 15 },
        ],
      );
    });
  });
});
