import { initializeMockApp } from '@edx/frontend-platform/testing';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ExamSelection from './ExamSelection';
import { initialStoreState } from '../../../testUtils';
import { initializeTestStore, render } from '../../../setupTest';

initializeTestStore(initialStoreState);
initializeMockApp();

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

  let user;
  beforeEach(() => {
    user = userEvent.setup();
  });
  it('component matches snapshot', () => {
    expect(renderWithoutError(
      <ExamSelection exams={defaultExams} onSelect={mockHandleSelectExam} />,
    )).toMatchSnapshot();
  });
  it('lists each exam in the dropdown', async () => {
    renderWithoutError(<ExamSelection exams={defaultExams} onSelect={mockHandleSelectExam} />);
    await user.click(screen.getByText('Select an exam'));
    defaultExams.forEach((exam) => {
      expect(screen.getByText(exam.name)).toBeInTheDocument();
    });
  });
  it('filters the dropdown by search text', async () => {
    renderWithoutError(<ExamSelection exams={defaultExams} onSelect={mockHandleSelectExam} />);
    screen.debug();
    await user.click(screen.getByText('Select an exam'));
    screen.debug();
    const input = screen.getByPlaceholderText('Search for an exam...');

    // user.type does not appear to work properly, potentially because it is not triggering an onChange event.
    fireEvent.change(input, {
      target: { value: 'exam1' },
    });

    await waitFor(() => {
      expect(screen.queryByRole('link', { name: 'exam1' })).not.toBeDisabled();
      expect(screen.queryByRole('link', { name: 'exam2' })).toBeDisabled();
      expect(screen.queryByRole('link', { name: 'exam3' })).toBeDisabled();
    });
  });
  it('calls onSelect when an exam is selected', async () => {
    renderWithoutError(<ExamSelection exams={defaultExams} onSelect={mockHandleSelectExam} />);
    await user.click(screen.getByText('Select an exam'));
    await user.click(screen.getByText('exam2'));
    expect(mockHandleSelectExam).toHaveBeenCalledTimes(1);
    expect(mockHandleSelectExam).toHaveBeenCalledWith(27);
  });
  it('button disabled when isDisabled is true', () => {
    renderWithoutError(<ExamSelection exams={defaultExams} onSelect={mockHandleSelectExam} isDisabled />);
    expect(screen.getByText('Select an exam')).toBeDisabled();
  });
});
