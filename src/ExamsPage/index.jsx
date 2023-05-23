import React, {
  useEffect,
} from 'react';
import PropTypes from 'prop-types';

import { useCourseExamsList, useFetchCourseExams } from './hooks';
import ExamList from './ExamList';

const ExamsPage = ({ courseId }) => {
  const fetchExams = useFetchCourseExams();
  const examsList = useCourseExamsList();

  useEffect(() => {
    fetchExams(courseId);
  }, [courseId]);

  return (
    <div>
      <ExamList exams={examsList} />
    </div>
  );
};

ExamsPage.propTypes = {
  courseId: PropTypes.string.isRequired,
};

export default ExamsPage;
