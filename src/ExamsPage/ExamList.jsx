import React from 'react';
import PropTypes from 'prop-types';


function ExamList({ exams }) {
  return (
    <div>
      <ul>
        {exams.map((exam) => (<li>{exam.name}</li>))}g
      </ul>
    </div>
  );
}

ExamsPage.propTypes = {
  exams: PropTypes.array.isRequired,
};

export default ExamList;
