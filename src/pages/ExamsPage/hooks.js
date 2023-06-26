import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RequestKeys } from 'data/constants';

import * as reduxHooks from 'data/redux/hooks';

import * as api from './data/api';
import * as selectors from './data/selectors';
import * as reducer from './data/reducer';

import * as module from './hooks'; // eslint-disable-line import/no-self-import

export const state = {
  // example of component state that does not need to be in redux
  exampleValue: (val) => React.useState(val), // eslint-disable-line
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
  const dispatch = useDispatch();
  return (examId) => (
    makeNetworkRequest({
      requestKey: RequestKeys.fetchExamAttempts,
      promise: api.getExamAttempts(examId),
      onSuccess: (response) => dispatch(reducer.loadExamAttempts(response)),
    })
  );
};

export const useInitializeExamsPage = (courseId) => {
  const fetchCourseExams = module.useFetchCourseExams();
  React.useEffect(() => { fetchCourseExams(courseId); }, []); // eslint-disable-line react-hooks/exhaustive-deps
};

export const useExamsData = () => {
  const [exampleValue, setExampleValue] = state.exampleValue(0);
  const examsList = useSelector(selectors.courseExamsList);
  const currentExam = useSelector(selectors.currentExam);
  const isLoading = reduxHooks.useRequestIsPending(RequestKeys.fetchCourseExams);

  return {
    currentExam,
    examsList,
    isLoading,
    exampleValue,
    setExampleValue,
  };
};

export const useExamAttemptsData = () => {
  const attemptsList = useSelector(selectors.courseExamAttemptsList);
  return { attemptsList };
};
