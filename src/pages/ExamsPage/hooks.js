import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RequestKeys } from 'data/constants';

import * as reduxHooks from 'data/redux/hooks/requests';

import * as api from './data/api';
import * as selectors from './data/selectors';
import * as reducer from './data/reducer';

import * as module from './hooks'; // eslint-disable-line import/no-self-import

export const state = {
  // example of component state that does not need to be in redux
  exampleValue: (val) => React.useState(val), // eslint-disable-line
};

export const useFetchAllowances = () => {
  const makeNetworkRequest = reduxHooks.useMakeNetworkRequest();
  const dispatch = useDispatch();
  return (courseId) => (
    makeNetworkRequest({
      requestKey: RequestKeys.fetchAllowances,
      promise: api.getAllowances(courseId),
      onSuccess: (response) => dispatch(reducer.setAllowancesList(response)),
    })
  );
};

export const useFetchCourseExams = () => {
  const makeNetworkRequest = reduxHooks.useMakeNetworkRequest();
  const dispatch = useDispatch();
  return (courseId) => (
    makeNetworkRequest({
      requestKey: RequestKeys.fetchCourseExams,
      promise: api.getCourseExams(courseId),
      onSuccess: (response) => dispatch(reducer.loadExams(response)),
    })
  );
};

export const useFetchExamAttempts = () => {
  const makeNetworkRequest = reduxHooks.useMakeNetworkRequest();
  const courseId = useSelector(selectors.courseId);
  const dispatch = useDispatch();
  return (examId) => (
    makeNetworkRequest({
      requestKey: RequestKeys.fetchExamAttempts,
      promise: api.getExamAttempts(courseId, examId),
      onSuccess: (response) => dispatch(reducer.loadExamAttempts(response)),
    })
  );
};

export const useDeleteExamAttempt = () => {
  const makeNetworkRequest = reduxHooks.useMakeNetworkRequest();
  const dispatch = useDispatch();
  return (attemptId) => (
    makeNetworkRequest({
      requestKey: RequestKeys.deleteExamAttempt,
      promise: api.deleteExamAttempt(attemptId),
      onSuccess: () => dispatch(reducer.deleteExamAttempt(attemptId)),
    })
  );
};

export const useModifyExamAttempt = () => {
  const makeNetworkRequest = reduxHooks.useMakeNetworkRequest();
  const dispatch = useDispatch();
  return (attemptId, action) => (
    makeNetworkRequest({
      requestKey: RequestKeys.modifyExamAttempt,
      promise: api.modifyExamAttempt(attemptId, action),
      onSuccess: () => dispatch(reducer.modifyExamAttemptStatus({ attemptId, action })),
    })
  );
};

export const useInitializeExamsPage = (courseId) => {
  const fetchCourseExams = module.useFetchCourseExams();
  const fetchAllowances = module.useFetchAllowances();
  const dispatch = useDispatch();

  React.useEffect(() => {
    fetchCourseExams(courseId);
    fetchAllowances(courseId);
    dispatch(reducer.setCourseId(courseId));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};

export const useSetCurrentExam = () => {
  const dispatch = useDispatch();
  const fetchExamAttempts = module.useFetchExamAttempts();
  return (examId) => {
    dispatch(reducer.setCurrentExam(examId));
    fetchExamAttempts(examId);
  };
};

export const useExamsData = () => {
  const [exampleValue, setExampleValue] = state.exampleValue(0);
  const examsList = useSelector(selectors.courseExamsList);
  const currentExam = useSelector(selectors.currentExam);
  const setCurrentExam = module.useSetCurrentExam();
  const isLoading = reduxHooks.useRequestIsPending(RequestKeys.fetchCourseExams);

  return {
    currentExam,
    examsList,
    isLoading,
    exampleValue,
    setCurrentExam,
    setExampleValue,
  };
};

export const useExamAttemptsData = () => {
  const attemptsList = useSelector(selectors.courseExamAttemptsList);
  return { attemptsList };
};

export const useButtonStateFromRequestStatus = (requestKey) => {
  const isPending = reduxHooks.useRequestIsPending(requestKey);
  const isError = reduxHooks.useRequestError(requestKey);
  return () => {
    if (isPending) {
      return 'pending';
    } if (isError) {
      return 'error';
    }
    return '';
  };
};

export const useAllowancesData = () => {
  const allowancesList = useSelector(selectors.courseAllowancesList);
  return { allowancesList };
};
