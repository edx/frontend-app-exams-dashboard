import React from 'react';
import PropTypes from 'prop-types';

import { useCourseExamsList, useInitializeExamsPage, useExamsLoading } from './hooks';
import ExamList from './ExamList';

const ExamsPage = ({ courseId }) => {
  useInitializeExamsPage(courseId);

  const examsList = useCourseExamsList();
  const isLoading = useExamsLoading();

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
