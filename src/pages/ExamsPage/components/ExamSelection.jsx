import React, { useState } from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import {
  MenuItem, SearchField,
  SelectMenu,
} from '@edx/paragon';
import PropTypes from 'prop-types';

const ExamSelection = ({ exams, onSelect }) => {
  const { formatMessage } = useIntl();
  const [searchText, setSearchText] = useState('');

  const placeholderMessage = formatMessage({
    id: 'ExamSelection.select_exam_placeholder',
    defaultMessage: 'Search for an exam...',
    description: 'Placeholder message for the exam selection dropdown',
  });

  const getMenuItems = () => {
    const menuItems = [
      <MenuItem
        key={0}
        as={SearchField}
        onChange={setSearchText}
        placeholder={placeholderMessage}
        onSubmit={() => {}}
      />,
    ];
    return menuItems.concat(exams.filter(exam => (
      exam.name.toLowerCase().includes(searchText.toLowerCase())
    )).map(
      exam => <MenuItem key={exam.id} onClick={() => onSelect(exam.id)}>{exam.name}</MenuItem>,
    ));
  };

  return (
    <div data-testid="exam_selection">
      <SelectMenu
        defaultMessage={formatMessage({
          id: 'ExamSelection.select_exam',
          defaultMessage: 'Select an exam',
          description: 'Default message for the exam selection dropdown',
        })}
      >
        { getMenuItems() }
      </SelectMenu>
    </div>
  );
};

ExamSelection.propTypes = {
  exams: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default ExamSelection;
