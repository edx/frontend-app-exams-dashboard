import React from 'react';
import PropTypes from 'prop-types';

import { useExamsData, useInitializeExamsData } from './hooks';
import ExamList from './ExamList';

const ExamsPage = ({ courseId }) => {
  useInitializeExamsData(courseId);
  const {
    examsList,
    isLoading,
  } = useExamsData();

  return (
    <div>
      { isLoading && <div>Loading...</div>}
      <ExamList exams={examsList} />
    </div>
  );
};

ExamsPage.propTypes = {
  courseId: PropTypes.string.isRequired,
};

export default ExamsPage;
