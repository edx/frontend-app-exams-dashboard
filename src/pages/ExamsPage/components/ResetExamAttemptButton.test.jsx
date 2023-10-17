import { render, screen } from '@testing-library/react';

import ResetExamAttemptButton from './ResetExamAttemptButton';

import * as hooks from '../hooks';

jest.mock('../hooks', () => ({
  useDeleteExamAttempt: jest.fn(),
}));

const mockMakeNetworkRequest = jest.fn();

// nomally mocked for unit tests but required for rendering/snapshots
jest.unmock('react');

const resetButton = <ResetExamAttemptButton username="username" examName="examName" attemptId={0} />;

describe('ResetExamAttemptButton', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    hooks.useDeleteExamAttempt.mockReturnValue(mockMakeNetworkRequest);
  });
  it('Test that the ResetExamAttemptButton matches snapshot', () => {
    expect(render(resetButton)).toMatchSnapshot();
  });
  it('Modal appears upon clicking button', () => {
    render(resetButton);
    screen.getByText('Reset').click();
    expect(screen.getByText('Please confirm your choice.')).toBeInTheDocument();
  });
  it('Clicking the No button closes the modal', () => {
    render(resetButton);
    screen.getByText('Reset').click();
    screen.getByText('Cancel').click();
    // Using queryByText here allows the function to throw
    expect(screen.queryByText('Please confirm your choice.')).not.toBeInTheDocument();
  });
  it('Clicking the Yes button calls the deletion hook', () => {
    const mockDeleteExamAttempt = jest.fn();
    jest.spyOn(hooks, 'useDeleteExamAttempt').mockImplementation(() => mockDeleteExamAttempt);
    render(resetButton);
    screen.getByText('Reset').click();
    screen.getByText('Yes, I\'m Sure').click();
    expect(mockDeleteExamAttempt).toHaveBeenCalledWith(0);
  });
});
