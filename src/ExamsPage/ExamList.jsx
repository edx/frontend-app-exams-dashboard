import React from 'react';
import PropTypes from 'prop-types';

export const ExamList = ({ exams }) => (
  <div>
    <ul>
      {exams.map((exam) => (<li>{exam.name}</li>))}g
    </ul>
  </div>
);

ExamList.propTypes = {
  exams: PropTypes.arrayOf(PropTypes.object).isRequired, // eslint-disable-line react/forbid-prop-types
};

export default ExamList;
