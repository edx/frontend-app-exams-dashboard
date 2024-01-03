import { render, screen } from '@testing-library/react';

import ResetExamAttemptModal from './ResetExamAttemptModal';

import * as hooks from '../hooks';

jest.mock('../hooks', () => ({
  useDeleteExamAttempt: jest.fn(),
  useRequestStatusFromRedux: jest.fn(),
}));

const mockMakeNetworkRequest = jest.fn();

// nomally mocked for unit tests but required for rendering/snapshots
jest.unmock('react');

const resetModal = <ResetExamAttemptModal username="username" examName="examName" attemptId={0} />;

describe('ResetExamAttemptModal', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    hooks.useDeleteExamAttempt.mockReturnValue(mockMakeNetworkRequest);
    hooks.useRequestStatusFromRedux.mockReturnValue(mockMakeNetworkRequest);
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
  it('Clicking the Yes button calls the deletion hook', () => {
    const mockDeleteExamAttempt = jest.fn();
    jest.spyOn(hooks, 'useDeleteExamAttempt').mockImplementation(() => mockDeleteExamAttempt);
    render(resetModal);
    screen.getByText('Reset').click();
    screen.getByTestId('reset-stateful-button').click();
    expect(mockDeleteExamAttempt).toHaveBeenCalledWith(0);
  });
});
