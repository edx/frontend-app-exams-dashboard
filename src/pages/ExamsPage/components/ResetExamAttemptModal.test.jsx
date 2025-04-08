import userEvent from '@testing-library/user-event';
import { initializeMockApp } from '@edx/frontend-platform/testing';
import { screen, waitFor } from '@testing-library/react';

import ResetExamAttemptModal from './ResetExamAttemptModal';
import { deleteExamAttempt } from '../data/api';
import { render } from '../../../setupTest';

jest.mock('../data/api', () => ({
  deleteExamAttempt: jest.fn().mockResolvedValue({}),
}));

const resetModal = <ResetExamAttemptModal username="username" examName="examName" attemptId={0} />;

initializeMockApp();

describe('ResetExamAttemptModal', () => {
  let user;

  beforeEach(() => {
    jest.restoreAllMocks();

    user = userEvent.setup();
  });
  it('Test that the ResetExamAttemptModal matches snapshot', () => {
    expect(render(resetModal)).toMatchSnapshot();
  });
  it('Modal appears upon clicking button', async () => {
    render(resetModal);
    await user.click(screen.getByText('Reset'));

    await waitFor(() => {
      expect(screen.queryByText('Please confirm your choice.')).toBeInTheDocument();
    });
  });
  it('Clicking the No button closes the modal', async () => {
    render(resetModal);
    await user.click(screen.getByText('Reset'));
    await user.click(screen.getByText('Cancel'));

    await waitFor(() => {
      expect(screen.queryByText('Please confirm your choice.')).not.toBeInTheDocument();
    });
  });
  it('Clicking the Reset button displays the correct label based on the request state', async () => {
    // The pending state is a transient state between the inactive and completed request states, so in order
    // to simulate this pending state, we mock out the deleteExamAttempt API call to return a promise that we can
    // resolve later. This allows us to test the pending state of the button.
    let resolveDeleteExamAttempt;
    const mockApiCall = new Promise((resolve) => {
      resolveDeleteExamAttempt = resolve;
    });
    deleteExamAttempt.mockReturnValueOnce(mockApiCall);

    render(resetModal);

    // Click the reset button to open the confirmation modal.
    await user.click(screen.getByText('Reset'));

    // Click the reset button in the confirmation modal.
    await user.click(screen.getByTestId('reset-stateful-button'));

    await waitFor(() => {
      expect(screen.queryByText('Resetting...')).toBeInTheDocument();
    });

    resolveDeleteExamAttempt();

    await waitFor(() => {
      expect(screen.queryByText('Resetting...')).not.toBeInTheDocument(); // The button should not be in the pending state
    });
  });
  it('Clicking the Yes button calls the deletion hook', async () => {
    render(resetModal);
    await user.click(screen.getByText('Reset'));
    // Need to use a test id here b/c there are two button with label 'Reset',
    // One in the table, and one in the modal
    await user.click(screen.getByTestId('reset-stateful-button'));

    expect(deleteExamAttempt).toHaveBeenCalledWith(0);
  });
});
