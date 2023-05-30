import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RequestKeys } from 'data/constants';

import * as reduxHooks from 'data/redux/hooks';

import * as api from './data/api';
import * as selectors from './data/selectors';
import * as reducer from './data/reducer';

import * as module from './hooks';

export const state = {
  // example of component state that does not need to be in redux
  exampleValue: (val) => React.useState(val),
}

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

export const useInitializeExamsData = (courseId) => {
  const fetchCourseExams = module.useFetchCourseExams();
  React.useEffect(() => { fetchCourseExams(courseId); }, []); // eslint-disable-line react-hooks/exhaustive-deps
};

export const useExamsData = () => {
  const [exampleValue, setExampleValue] = state.exampleValue(null);
  const examsList = useSelector(selectors.courseExamsList);
  const currentExam = useSelector(selectors.currentExam);
  const isLoading = reduxHooks.useRequestIsPending(RequestKeys.fetchCourseExams);

  return {
    currentExam,
    examsList,
    isLoading,
    exampleValue,
  };
};
