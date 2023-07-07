import React from 'react';
import {
  MenuItem, SearchField,
  SelectMenu,
} from '@edx/paragon';
import PropTypes from 'prop-types';
import { useUpdateCurrentExamIndex } from '../hooks';

// todo: implement substring search

const ExamSelection = ({ exams }) => {
  const { updateSelectedExam } = useUpdateCurrentExamIndex();

  return (
    <div data-testid="exam_selection">
      <SelectMenu defaultMessage="Select an exam...">
        <MenuItem as={SearchField} />
        {exams.map(exam => (
          // todo: update redux state
          // <MenuItem onClick={() => console.log(exam.id)}>{exam.name}</MenuItem>
          <MenuItem onClick={() => updateSelectedExam(exam.id)}>{exam.name}</MenuItem>
        ))}
      </SelectMenu>
    </div>
  );
};

ExamSelection.propTypes = {
  exams: PropTypes.arrayOf(PropTypes.object).isRequired, // eslint-disable-line react/forbid-prop-types
};

export default ExamSelection;
