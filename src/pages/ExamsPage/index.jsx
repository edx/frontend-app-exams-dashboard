import React from 'react';
import PropTypes from 'prop-types';

import { useExamsData, useInitializeExamsPage } from './hooks';
import ExamList from './components/ExamList';

const ExamsPage = ({ courseId }) => {
  useInitializeExamsPage(courseId);
  const {
    examsList,
    isLoading,
    exampleValue,
    setExampleValue,
  } = useExamsData();

  return (
    <div>
      { isLoading && <div>Loading...</div>}
      <ExamList exams={examsList} />
      {/* count button just to demo attaching component state */}
      <button type="button" onClick={() => setExampleValue(exampleValue + 1)}>
        {exampleValue}
      </button>
    </div>
  );
};

ExamsPage.propTypes = {
  courseId: PropTypes.string.isRequired,
};

export default ExamsPage;
