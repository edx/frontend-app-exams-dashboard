import React from 'react';
import PropTypes from 'prop-types';

const ExamList = ({ exams }) => (
  <div>
    <ul>
      {exams.map((exam) => (<li>{exam.name}</li>))}
    </ul>
  </div>
);

ExamList.propTypes = {
  exams: PropTypes.arrayOf(PropTypes.object).isRequired, // eslint-disable-line react/forbid-prop-types
};

export default ExamList;
