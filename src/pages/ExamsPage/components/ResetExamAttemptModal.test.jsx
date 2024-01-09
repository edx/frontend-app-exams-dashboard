import { render, screen } from '@testing-library/react';

import ResetExamAttemptModal from './ResetExamAttemptModal';

import * as hooks from '../hooks';

jest.mock('../hooks', () => ({
  useDeleteExamAttempt: jest.fn(),
  useButtonStateFromRequestStatus: jest.fn(),
}));

const mockMakeNetworkRequest = jest.fn();

// nomally mocked for unit tests but required for rendering/snapshots
jest.unmock('react');

const resetModal = <ResetExamAttemptModal username="username" examName="examName" attemptId={0} />;

describe('ResetExamAttemptModal', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    hooks.useDeleteExamAttempt.mockReturnValue(mockMakeNetworkRequest);
    hooks.useButtonStateFromRequestStatus.mockReturnValue(mockMakeNetworkRequest);
  });
  it('Test that the ResetExamAttemptModal matches snapshot', () => {
    expect(render(resetModal)).toMatchSnapshot();
  });
  it('Modal appears upon clicking button', () => {
    render(resetModal);
    screen.getByText('Reset').click();
    expect(screen.getByText('Please confirm your choice.')).toBeInTheDocument();
  });
  it('Clicking the No button closes the modal', () => {
    render(resetModal);
    screen.getByText('Reset').click();
    screen.getByText('Cancel').click();
    // Using queryByText here allows the function to throw
    expect(screen.queryByText('Please confirm your choice.')).not.toBeInTheDocument();
  });
  it('Clicking the Reset button displays the correct label based on the request state', () => {
    render(resetModal);
    hooks.useButtonStateFromRequestStatus.mockReturnValue(() => 'pending'); // for testing button label state
    screen.getByText('Reset').click();
    expect(screen.queryByText('Resetting...')).toBeInTheDocument(); // The button should be in the pending state
  });
  it('Clicking the Yes button calls the deletion hook', () => {
    const mockDeleteExamAttempt = jest.fn();
    jest.spyOn(hooks, 'useDeleteExamAttempt').mockImplementation(() => mockDeleteExamAttempt);
    render(resetModal);
    screen.getByText('Reset').click();
    // Need to use a test id here b/c there are two button with label 'Reset',
    // One in the table, and one in the modal
    screen.getByTestId('reset-stateful-button').click();
    expect(mockDeleteExamAttempt).toHaveBeenCalledWith(0);
  });
});
