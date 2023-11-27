import { render, screen } from '@testing-library/react';

import * as constants from 'data/constants';
import ReviewExamAttemptButton from './ReviewExamAttemptButton';
import * as testUtils from '../../../testUtils';

import * as hooks from '../hooks';

jest.mock('../hooks', () => ({
  useModifyExamAttempt: jest.fn(),
  useExamsData: jest.fn(),
}));

const mockMakeNetworkRequest = jest.fn();

// normally mocked for unit tests but required for rendering/snapshots
jest.unmock('react');

const reviewButton = (status = constants.ExamAttemptStatus.second_review_required) => (
  <ReviewExamAttemptButton
    username="username"
    examName="examName"
    attemptId={0}
    attemptStatus={status}
    severity={1.0}
    submissionReason="Submitted by user"
  />
);

describe('ReviewExamAttemptButton', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    hooks.useModifyExamAttempt.mockReturnValue(mockMakeNetworkRequest);
    hooks.useExamsData.mockReturnValue(testUtils.defaultExamsData);
  });
  it('Test that the ReviewExamAttemptButton matches snapshot', () => {
    expect(render(reviewButton())).toMatchSnapshot();
  });
  it('Modal appears upon clicking button', () => {
    render(reviewButton());
    screen.getByText('Review Required').click();
    expect(screen.getByText('Update review status')).toBeInTheDocument();
  });
  it('Clicking the Cancel button closes the modal', () => {
    render(reviewButton());
    screen.getByText('Review Required').click();
    screen.getByText('Cancel').click();
    // Using queryByText here allows the function to throw
    expect(screen.queryByText('Update review status')).not.toBeInTheDocument();
  });
  it('Clicking the Verify button calls the modify exam attempt hook', () => {
    const mockModifyExamAttempt = jest.fn();
    jest.spyOn(hooks, 'useModifyExamAttempt').mockImplementation(() => mockModifyExamAttempt);
    render(reviewButton());
    screen.getByText('Review Required').click();
    screen.getByText('Verify').click();
    expect(mockModifyExamAttempt).toHaveBeenCalledWith(0, constants.ExamAttemptActions.verify);
  });
  it('Clicking the Reject button calls the modify exam attempt hook', () => {
    const mockModifyExamAttempt = jest.fn();
    jest.spyOn(hooks, 'useModifyExamAttempt').mockImplementation(() => mockModifyExamAttempt);
    render(reviewButton());
    screen.getByText('Review Required').click();
    screen.getByText('Reject').click();
    expect(mockModifyExamAttempt).toHaveBeenCalledWith(0, constants.ExamAttemptActions.reject);
  });
  it('Does not show the modal if the attempt is not reviewable', () => {
    render(
      <ReviewExamAttemptButton
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
    test('review required', () => {
      render(reviewButton());
      screen.getByText('Review Required').click();
      expect(screen.getByText(/attempt requires manual review/i)).toBeInTheDocument();
    });
    test('existing review', () => {
      render(reviewButton(constants.ExamAttemptStatus.verified));
      screen.getByText('Manage Review').click();
      expect(screen.getByText(/attempt has a verified review/i)).toBeInTheDocument();
    });
    test('error status', () => {
      render(reviewButton(constants.ExamAttemptStatus.error));
      screen.getByText('Review Required').click();
      expect(screen.getByText(/attempt has been terminated due to an error/i)).toBeInTheDocument();
    });
  });
});
