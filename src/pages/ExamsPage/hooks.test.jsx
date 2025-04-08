import React from 'react';
import { Provider } from 'react-redux';
import { renderHook, waitFor } from '@testing-library/react';

import * as reduxHooks from 'data/redux/hooks';
import * as constants from 'data/constants';
import * as hooks from './hooks';

import { initialStoreState } from '../../testUtils';
import { initializeTestStore } from '../../setupTest';
import {
  createAllowance, deleteAllowance, deleteExamAttempt, getAllowances, getExamAttempts, getCourseExams,
} from './data/api';
import {
  currentExam, courseAllowancesList, courseExamAttemptsList, courseId,
} from './data/selectors';

const store = initializeTestStore(initialStoreState);

jest.mock('data/redux/hooks', () => ({
  ...jest.requireActual('data/redux/hooks'),
  useRequestIsPending: jest.fn(),
  useRequestError: jest.fn(),
}));

jest.mock('./data/api', () => (
  {
    ...jest.requireActual('./data/api'),
    createAllowance: jest.fn().mockResolvedValue({}),
    deleteAllowance: jest.fn().mockResolvedValue({}),
    deleteExamAttempt: jest.fn().mockResolvedValue({}),
    getAllowances: jest.fn().mockResolvedValue({}),
    getCourseExams: jest.fn().mockResolvedValue({}),
    getExamAttempts: jest.fn().mockResolvedValue({}),
    modifyExamAttempt: jest.fn().mockResolvedValue({}),
  }
));

describe('ExamsPage hooks', () => {
  describe('useInitializeExamsPage', () => {
    it('calls getCourseExams and getAllowances and sets course id on component load', () => {
      getCourseExams.mockImplementation((courseIdParam) => Promise.resolve({ data: courseIdParam }));
      getAllowances.mockImplementation(() => Promise.resolve({ data: [] }));

      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      renderHook(() => hooks.useInitializeExamsPage('test_course'), { wrapper });

      expect(getAllowances).toHaveBeenCalledWith('test_course');
      expect(getCourseExams).toHaveBeenCalledWith('test_course');

      const state = store.getState();
      expect(courseId(state)).toEqual('test_course');
    });
  });
  describe('useFetchAllowances', () => {
    it('calls getAllowances and sets allowance list', async () => {
      const allowancesList = [
        { id: 1, username: 'username1', exam_name: 'Exam 1' },
        { id: 2, username: 'username1', exam_name: 'Exam 2' },
        { id: 3, username: 'username2', exam_name: 'Exam 1' },
        { id: 4, username: 'username2', exam_name: 'Exam 2' },
      ];
      getAllowances.mockImplementation(() => Promise.resolve(allowancesList));

      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      renderHook(() => hooks.useFetchAllowances()('test_course'), { wrapper });

      expect(getAllowances).toHaveBeenCalledWith('test_course');

      await waitFor(() => {
        const state = store.getState();
        expect(courseAllowancesList(state)).toEqual(allowancesList);
      });
    });
  });
  describe('useDeleteAllowance', () => {
    it('calls deleteAllowance to delete an allowance and sets allowance list', async () => {
      const allowancesList = [
        { id: 1, username: 'username1', exam_name: 'Exam 1' },
        { id: 2, username: 'username1', exam_name: 'Exam 2' },
        { id: 3, username: 'username2', exam_name: 'Exam 1' },
        { id: 4, username: 'username2', exam_name: 'Exam 2' },
      ];
      const initialStoreStateWithAllowances = {
        ...initialStoreState,
        exams: {
          ...initialStoreState.exams,
          courseId: 'test_course',
          allowancesList,
        },
      };
      const testStore = initializeTestStore(initialStoreStateWithAllowances);

      const expectedResponse = allowancesList.filter(allowance => allowance.id !== 3);
      deleteAllowance.mockImplementation(() => Promise.resolve(expectedResponse));

      const wrapper = ({ children }) => <Provider store={testStore}>{children}</Provider>;
      renderHook(() => hooks.useDeleteAllowance()(3), { wrapper });

      expect(deleteAllowance).toHaveBeenCalledWith('test_course', 3);

      await waitFor(() => {
        const state = testStore.getState();
        expect(courseAllowancesList(state)).toEqual(expectedResponse);
      });
    });
    it('calls cb on success', async () => {
      const cbMock = jest.fn();
      deleteAllowance.mockImplementation(() => Promise.resolve());

      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      renderHook(() => hooks.useDeleteAllowance()(3, cbMock), { wrapper });

      await waitFor(() => {
        expect(cbMock).toHaveBeenCalled();
      });
    });
  });
  describe('useFetchCourseExams', () => {
    it('calls getCourseExams to fetch exams and sets exams', async () => {
      const initialStoreStateWithExams = {
        ...initialStoreState,
        exams: {
          ...initialStoreState.exams,
          examsList: [],
        },
      };
      const testStore = initializeTestStore(initialStoreStateWithExams);

      const examsList = [
        {
          id: 1, exam_name: 'Exam 1', exam_type: 'proctored', time_limit_mins: 60,
        },
        {
          id: 2, exam_name: 'Exam 2', exam_type: 'proctored', time_limit_mins: 30,
        },
        {
          id: 3, exam_name: 'Exam 1', exam_type: 'proctored', time_limit_mins: 60,
        },
      ];
      getCourseExams.mockImplementation(() => Promise.resolve(examsList));

      const wrapper = ({ children }) => <Provider store={testStore}>{children}</Provider>;
      renderHook(() => hooks.useFetchCourseExams()('test_course'), { wrapper });

      expect(getCourseExams).toHaveBeenCalledWith('test_course');

      const expectedExamsList = [
        {
          id: 1, name: 'Exam 1', examType: 'proctored', timeLimitMins: 60,
        },
        {
          id: 2, name: 'Exam 2', examType: 'proctored', timeLimitMins: 30,
        },
        {
          id: 3, name: 'Exam 1', examType: 'proctored', timeLimitMins: 60,
        },
      ];
      await waitFor(() => {
        const state = testStore.getState();
        expect(state.exams.examsList).toEqual(expectedExamsList);
      });
    });
  });
  describe('useFetchExamAttempts', () => {
    it('calls getExamAttempts to fetch exam attempts and sets exam attempts list', async () => {
      const initialStoreStateWithExamAttempts = {
        ...initialStoreState,
        exams: {
          ...initialStoreState.exams,
          attemptsList: [],
        },
      };
      const testStore = initializeTestStore(initialStoreStateWithExamAttempts);

      const attemptsList = [{
        exam_display_name: 'Exam 1',
        username: 'username1',
        allowed_time_limit_mins: 60,
        exam_type: 'timed',
        start_time: '2023-04-05T19:27:16.000000Z',
        end_time: '2023-04-05T19:27:17.000000Z',
        attempt_status: 'second_review_required',
        attempt_id: 0,
        proctored_review: {
          severity: 1.0,
          submission_reason: 'Submitted by user',
        },
      },
      {
        exam_display_name: 'Exam 2',
        username: 'username2',
        allowed_time_limit_mins: 60,
        exam_type: 'proctored',
        start_time: '2023-04-05T19:37:16.000000Z',
        end_time: '2023-04-05T19:37:17.000000Z',
        attempt_status: 'submitted',
        attempt_id: 1,
      }];

      getExamAttempts.mockImplementation(() => Promise.resolve({ results: attemptsList }));

      const wrapper = ({ children }) => <Provider store={testStore}>{children}</Provider>;
      renderHook(() => hooks.useFetchExamAttempts()(1), { wrapper });

      expect(getExamAttempts).toHaveBeenCalledWith('test_course', 1);

      const expectedAttemptsList = [
        {
          exam_name: 'Exam 1',
          username: 'username1',
          time_limit: 60,
          exam_type: 'timed',
          started_at: '2023-04-05T19:27:16.000000Z',
          completed_at: '2023-04-05T19:27:17.000000Z',
          status: 'second_review_required',
          attempt_id: 0,
          severity: 1.0,
          submission_reason: 'Submitted by user',
        },
        {
          exam_name: 'Exam 2',
          username: 'username2',
          time_limit: 60,
          exam_type: 'proctored',
          started_at: '2023-04-05T19:37:16.000000Z',
          completed_at: '2023-04-05T19:37:17.000000Z',
          status: 'submitted',
          attempt_id: 1,
        },
      ];
      await waitFor(() => {
        const state = testStore.getState();
        expect(courseExamAttemptsList(state)).toEqual(expectedAttemptsList);
      });
    });
  });
  describe('useDeleteExamAttempt', () => {
    it('calls deleteExamAttempt to delete attempt and deletes exam attempt', async () => {
      deleteExamAttempt.mockImplementation(() => Promise.resolve({ payload: 1 }));

      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      renderHook(() => hooks.useDeleteExamAttempt()(1), { wrapper });

      expect(deleteExamAttempt).toHaveBeenCalledWith(1);

      const expectedAttemptsList = initialStoreState.exams.attemptsList.filter(attempt => attempt.attempt_id !== 1);

      await waitFor(() => {
        const state = store.getState();
        expect(courseExamAttemptsList(state)).toEqual(expectedAttemptsList);
      });
    });
  });

  describe('useModifyExamAttempt', () => {
    it('calls modifyExamAttempt to modify an exam attempt status and sets attempt list', async () => {
      const attemptsList = [{
        exam_display_name: 'Exam 1',
        username: 'username1',
        allowed_time_limit_mins: 60,
        exam_type: 'timed',
        start_time: '2023-04-05T19:27:16.000000Z',
        end_time: '2023-04-05T19:27:17.000000Z',
        attempt_status: 'second_review_required',
        attempt_id: 0,
        proctored_review: {
          severity: 1.0,
          submission_reason: 'Submitted by user',
        },
      },
      {
        exam_display_name: 'Exam 2',
        username: 'username2',
        allowed_time_limit_mins: 60,
        exam_type: 'proctored',
        start_time: '2023-04-05T19:37:16.000000Z',
        end_time: '2023-04-05T19:37:17.000000Z',
        attempt_status: 'submitted',
        attempt_id: 1,
      }];

      getExamAttempts.mockImplementation(() => Promise.resolve({ results: attemptsList }));

      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      renderHook(() => hooks.useFetchExamAttempts()(1), { wrapper });

      expect(getExamAttempts).toHaveBeenCalledWith('test_course', 1);

      const expectedAttemptsList = [{
        exam_name: 'Exam 1',
        username: 'username1',
        time_limit: 60,
        exam_type: 'timed',
        started_at: '2023-04-05T19:27:16.000000Z',
        completed_at: '2023-04-05T19:27:17.000000Z',
        status: 'second_review_required',
        attempt_id: 0,
        severity: 1.0,
        submission_reason: 'Submitted by user',
      },
      {
        exam_name: 'Exam 2',
        username: 'username2',
        time_limit: 60,
        exam_type: 'proctored',
        started_at: '2023-04-05T19:37:16.000000Z',
        completed_at: '2023-04-05T19:37:17.000000Z',
        status: 'submitted',
        attempt_id: 1,
      }];
      await waitFor(() => {
        const state = store.getState();
        expect(courseExamAttemptsList(state)).toEqual(expectedAttemptsList);
      });
    });
  });

  describe('useSetCurrentExam', () => {
    it('calls sets current exam, calls getCourseExams, and sets exams lists', async () => {
      const initialStoreStateWithExamAttempts = {
        ...initialStoreState,
        exams: {
          ...initialStoreState.exams,
          attemptsList: [],
        },
      };
      const testStore = initializeTestStore(initialStoreStateWithExamAttempts);

      const attemptsList = [{
        exam_display_name: 'Exam 1',
        username: 'username1',
        allowed_time_limit_mins: 60,
        exam_type: 'timed',
        start_time: '2023-04-05T19:27:16.000000Z',
        end_time: '2023-04-05T19:27:17.000000Z',
        attempt_status: 'second_review_required',
        attempt_id: 0,
        proctored_review: {
          severity: 1.0,
          submission_reason: 'Submitted by user',
        },
      },
      {
        exam_display_name: 'Exam 2',
        username: 'username2',
        allowed_time_limit_mins: 60,
        exam_type: 'proctored',
        start_time: '2023-04-05T19:37:16.000000Z',
        end_time: '2023-04-05T19:37:17.000000Z',
        attempt_status: 'submitted',
        attempt_id: 1,
      }];

      getExamAttempts.mockImplementation(() => Promise.resolve({ results: attemptsList }));

      const wrapper = ({ children }) => <Provider store={testStore}>{children}</Provider>;
      renderHook(() => hooks.useSetCurrentExam()(2), { wrapper });

      expect(getExamAttempts).toHaveBeenCalledWith('test_course', 2);

      const expectedAttemptsList = [
        {
          exam_name: 'Exam 1',
          username: 'username1',
          time_limit: 60,
          exam_type: 'timed',
          started_at: '2023-04-05T19:27:16.000000Z',
          completed_at: '2023-04-05T19:27:17.000000Z',
          status: 'second_review_required',
          attempt_id: 0,
          severity: 1.0,
          submission_reason: 'Submitted by user',
        },
        {
          exam_name: 'Exam 2',
          username: 'username2',
          time_limit: 60,
          exam_type: 'proctored',
          started_at: '2023-04-05T19:37:16.000000Z',
          completed_at: '2023-04-05T19:37:17.000000Z',
          status: 'submitted',
          attempt_id: 1,
        },
      ];

      await waitFor(() => {
        const state = testStore.getState();
        expect(state.exams.currentExamIndex).toEqual(1);
        expect(currentExam(state)).toEqual({
          id: 2, name: 'exam2', examType: 'proctored', timeLimitMins: 60,
        });
        expect(courseExamAttemptsList(state)).toEqual(expectedAttemptsList);
      });
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
    it('calls createAllowance, gets allowances, and sets allowances list', async () => {
      const allowancesList = [
        { id: 1, username: 'username1', exam_name: 'Exam 1' },
        { id: 2, username: 'username1', exam_name: 'Exam 2' },
        { id: 3, username: 'username2', exam_name: 'Exam 1' },
        { id: 4, username: 'username2', exam_name: 'Exam 2' },
      ];
      getAllowances.mockImplementation(() => Promise.resolve(allowancesList));

      const formData = {
        users: 'edx, edx@example.com',
        'exam-type': 'proctored',
        exams: { 1: '60', 2: '30' },
        'additional-time-multiplier': '1.5',
        'allowance-type': 'time-multiplier',
      };
      const closeModalMock = jest.fn();

      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      renderHook(() => hooks.useCreateAllowance()(formData, closeModalMock), { wrapper });

      const expectedFormData = [
        { username: 'edx', exam_id: 1, extra_time_mins: 30 },
        { username: 'edx', exam_id: 2, extra_time_mins: 15 },
        { email: 'edx@example.com', exam_id: 1, extra_time_mins: 30 },
        { email: 'edx@example.com', exam_id: 2, extra_time_mins: 15 },
      ];

      expect(createAllowance).toHaveBeenCalledWith('test_course', expectedFormData);

      await waitFor(() => {
        expect(getAllowances).toHaveBeenCalledWith('test_course');
        const state = store.getState();
        expect(courseAllowancesList(state)).toEqual(allowancesList);
      });
    });
  });

  describe('useEditAllowance', () => {
    it('calls createAllowance to edit an allowance and updates allowance list', async () => {
      const formData = { username: 'edx', exam_id: 1, extra_time_mins: 60 };
      const closeModalMock = jest.fn();

      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      renderHook(() => hooks.useEditAllowance()(1, formData, closeModalMock), { wrapper });

      const expectedFormData = [
        { username: 'edx', exam_id: 1, extra_time_mins: 60 },
      ];

      expect(createAllowance).toHaveBeenCalledWith('test_course', expectedFormData);

      const allowancesList = [
        { id: 1, username: 'username1', exam_name: 'Exam 1' },
        { id: 2, username: 'username1', exam_name: 'Exam 2' },
        { id: 3, username: 'username2', exam_name: 'Exam 1' },
        { id: 4, username: 'username2', exam_name: 'Exam 2' },
      ];
      await waitFor(() => {
        const state = store.getState();
        expect(courseAllowancesList(state)).toEqual(allowancesList);
      });
    });
  });
});
