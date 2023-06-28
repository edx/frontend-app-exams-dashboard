import { render, screen } from '@testing-library/react';

import ResetExamAttemptButton from './ResetExamAttemptButton';

import * as hooks from '../hooks';

jest.mock('../hooks', () => ({
  useDeleteExamAttempt: jest.fn(),
}));

const mockMakeNetworkRequest = jest.fn();

// nomally mocked for unit tests but required for rendering/snapshots
jest.unmock('react');

describe('ResetExamAttemptButton', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    hooks.useDeleteExamAttempt.mockReturnValue(mockMakeNetworkRequest);
  });
  it('Test that the ResetExamAttemptButton matches snapshot', () => {
    expect(render(<ResetExamAttemptButton username="username" examName="examName" attemptId={0} />)).toMatchSnapshot();
  });
  it('Modal appears upon clicking button', () => {
    render(<ResetExamAttemptButton username="username" examName="examName" attemptId={0} />);
    screen.getByText('Reset').click();
    expect(screen.getByText('Please confirm your choice.')).toBeInTheDocument();
  });
  it('Clicking the No button closes the modal', () => {
    render(<ResetExamAttemptButton username="username" examName="examName" attemptId={0} />);
    screen.getByText('Reset').click();
    screen.getByText('No (Cancel)').click();
    // Using queryByText here allows the function to throw
    expect(screen.queryByText('Please confirm your choice.')).not.toBeInTheDocument();
  });
  it('Clicking the Yes button calls the deletion hook', () => {
    const mockDeleteExamAttempt = jest.fn();
    jest.spyOn(hooks, 'useDeleteExamAttempt').mockImplementation(() => mockDeleteExamAttempt);
    render(<ResetExamAttemptButton username="username" examName="examName" attemptId={0} />);
    screen.getByText('Reset').click();
    screen.getByText('Yes, I\'m Sure').click();
    expect(mockDeleteExamAttempt).toHaveBeenCalledWith(0);
  });
});
