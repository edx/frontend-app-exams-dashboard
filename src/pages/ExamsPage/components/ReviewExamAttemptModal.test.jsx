import userEvent from '@testing-library/user-event';
import { initializeMockApp } from '@edx/frontend-platform/testing';
import { screen, waitFor } from '@testing-library/react';

import * as constants from 'data/constants';
import ReviewExamAttemptModal from './ReviewExamAttemptModal';
import { initialStoreState } from '../../../testUtils';
import { initializeTestStore, render } from '../../../setupTest';
import { modifyExamAttempt } from '../data/api';

jest.mock('../data/api', () => ({
  ...jest.requireActual('../data/api'),
  modifyExamAttempt: jest.fn().mockImplementation((attemptId, action) => Promise.resolve({ attemptId, action })),
}));

const reviewModal = (status = constants.ExamAttemptStatus.second_review_required) => (
  <ReviewExamAttemptModal
    username="username"
    examName="examName"
    attemptId={0}
    attemptStatus={status}
    severity={1.0}
    submissionReason="Submitted by user"
  />
);

initializeTestStore(initialStoreState);
initializeMockApp();

describe('ReviewExamAttemptModal', () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });
  it('Test that the ReviewExamAttemptModal matches snapshot', () => {
    expect(render(reviewModal())).toMatchSnapshot();
  });
  it('Modal appears upon clicking button', async () => {
    render(reviewModal());
    await user.click(screen.getByText('Review Required'));

    expect(screen.getByText('Update review status')).toBeInTheDocument();
  });
  it('Clicking the Cancel button closes the modal', async () => {
    render(reviewModal());
    await user.click(screen.getByText('Review Required'));
    await user.click(screen.getByText('Cancel'));

    // Using queryByText here allows the function to throw
    expect(screen.queryByText('Update review status')).not.toBeInTheDocument();
  });
  it('Clicking the Verify button displays the correct label based on the request state', async () => {
    // The pending state is a transient state between the inactive and completed request states, so in order
    // to simulate this pending state, we mock out the modifyExamAttempt API call to return a promise that we can
    // resolve later. This allows us to test the pending state of the button.
    let resolveModifyExamAttempt;
    const mockApiCall = new Promise((resolve) => {
      resolveModifyExamAttempt = resolve;
    });
    modifyExamAttempt.mockReturnValueOnce(mockApiCall);

    render(reviewModal());
    await user.click(screen.getByText('Review Required'));
    await user.click(screen.getByText('Verify'));

    await waitFor(() => {
      expect(screen.queryByText('Verifying...')).toBeInTheDocument(); // The button should be in the pending state
    });

    resolveModifyExamAttempt();

    await waitFor(() => {
      expect(screen.queryByText('Verifying...')).not.toBeInTheDocument(); // The button should not be in the pending state
    });
  });
  it('Clicking the Verify button calls the modify exam attempt hook', async () => {
    render(reviewModal());
    await user.click(screen.getByText('Review Required'));
    await user.click(screen.getByText('Verify'));

    expect(modifyExamAttempt).toHaveBeenCalledWith(0, constants.ExamAttemptActions.verify);
  });
  it('Clicking the Reject button displays the correct label based on the request state', async () => {
    // The pending state is a transient state between the inactive and completed request states, so in order
    // to simulate this pending state, we mock out the modifyExamAttempt API call to return a promise that we can
    // resolve later. This allows us to test the pending state of the button.
    let resolveModifyExamAttempt;
    const mockApiCall = new Promise((resolve) => {
      resolveModifyExamAttempt = resolve;
    });
    modifyExamAttempt.mockReturnValueOnce(mockApiCall);

    render(reviewModal());
    await user.click(screen.getByText('Review Required'));
    await user.click(screen.getByText('Reject'));

    await waitFor(() => {
      expect(screen.queryByText('Rejecting...')).toBeInTheDocument(); // The button should be in the pending state
    });

    resolveModifyExamAttempt();

    await waitFor(() => {
      expect(screen.queryByText('Rejecting...')).not.toBeInTheDocument(); // The button should not be in the pending state
    });
  });
  it('Clicking the Reject button calls the modify exam attempt hook', async () => {
    render(reviewModal());
    await user.click(screen.getByText('Review Required'));
    await user.click(screen.getByText('Reject'));

    expect(modifyExamAttempt).toHaveBeenCalledWith(0, constants.ExamAttemptActions.reject);
  });
  it('Does not show the modal if the attempt is not reviewable', () => {
    render(
      <ReviewExamAttemptModal
        username="username"
        examName="examName"
        attemptId={0}
        attemptStatus={constants.ExamAttemptStatus.submitted}
        severity={1.0}
        submissionReason="Submitted by user"
      />,
    );
    expect(screen.queryByText('Review Required')).not.toBeInTheDocument();
    expect(screen.queryByText('Manage Review')).not.toBeInTheDocument();
  });
  describe('Shows the correct text based on the attempt status', () => {
    test('review required', async () => {
      render(reviewModal());
      await user.click(screen.getByText('Review Required'));
      expect(screen.getByText(/attempt requires manual review/i)).toBeInTheDocument();
    });
    test('existing review', async () => {
      render(reviewModal(constants.ExamAttemptStatus.verified));
      await user.click(screen.getByText('Manage Review'));
      expect(screen.getByText(/attempt has a verified review/i)).toBeInTheDocument();
    });
    test('error status', async () => {
      render(reviewModal(constants.ExamAttemptStatus.error));
      await user.click(screen.getByText('Review Required'));
      expect(screen.getByText(/attempt has been terminated due to an error/i)).toBeInTheDocument();
    });
  });
});
