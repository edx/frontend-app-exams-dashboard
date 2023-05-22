import React, {
  useEffect
} from 'react';
import PropTypes from 'prop-types';

import { useCourseExamsList, useFetchCourseExams } from './hooks';


function ExamsPage({ courseId }) {
  const fetchExams = useFetchCourseExams();
  const examsList = useCourseExamsList();

  useEffect(() => {
    fetchExams(courseId);
  }, [courseId]);

  return (
    <div>
      <ul>
        {examsList.map((exam) => (<li>{exam.exam_name}</li>))}
      </ul>
    </div>
  );
}

ExamsPage.propTypes = {
  courseId: PropTypes.string.isRequired,
};

export default ExamsPage;
