import {
  render, screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ExamSelection from './ExamSelection';

// nomally mocked for unit tests but required for rendering/snapshots
jest.unmock('react');

const renderWithoutError = (component) => {
  // there is an error thrown inside the SelectMenu component by the
  // popover library. This is a workaround to avoid polluting our output
  // with that error message. Issue: https://github.com/floating-ui/react-popper/issues/350
  jest.spyOn(console, 'error').mockImplementation(() => {});
  const rendered = render(component);
  console.error.mockRestore(); // eslint-disable-line no-console
  return rendered;
};

describe('ExamSelection', () => {
  const defaultExams = [
    { id: 19, name: 'exam1' },
    { id: 27, name: 'exam2' },
    { id: 42, name: 'exam3' },
  ];
  const mockHandleSelectExam = jest.fn();
  test('component matches snapshot', () => {
    expect(renderWithoutError(
      <ExamSelection exams={defaultExams} onSelect={mockHandleSelectExam} />,
    )).toMatchSnapshot();
  });
  it('lists each exam in the dropdown', async () => {
    renderWithoutError(<ExamSelection exams={defaultExams} onSelect={mockHandleSelectExam} />);
    screen.getByText('Select an exam').click();
    defaultExams.forEach((exam) => {
      expect(screen.getByText(exam.name)).toBeInTheDocument();
    });
  });
  it('filters the dropdown by search text', async () => {
    const user = userEvent.setup();
    renderWithoutError(<ExamSelection exams={defaultExams} onSelect={mockHandleSelectExam} />);
    screen.getByText('Select an exam').click();
    const input = screen.getByPlaceholderText('Search for an exam...');
    await user.type(input, 'exam1');
    waitFor(() => {
      expect(screen.queryByRole('link', { name: 'exam1' })).not.toBeDisabled();
      expect(screen.queryByRole('link', { name: 'exam2' })).toBeDisabled();
      expect(screen.queryByRole('link', { name: 'exam3' })).toBeDisabled();
    });
  });
  it('calls onSelect when an exam is selected', () => {
    renderWithoutError(<ExamSelection exams={defaultExams} onSelect={mockHandleSelectExam} />);
    screen.getByText('Select an exam').click();
    screen.getByText('exam2').click();
    expect(mockHandleSelectExam).toHaveBeenCalledTimes(1);
    expect(mockHandleSelectExam).toHaveBeenCalledWith(27);
  });
});
