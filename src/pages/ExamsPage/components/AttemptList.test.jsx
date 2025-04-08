import userEvent from '@testing-library/user-event';
import { fireEvent, screen } from '@testing-library/react';
import { initializeMockApp } from '@edx/frontend-platform/testing';

import AttemptList from './AttemptList';
import * as testUtils from '../../../testUtils';

import { initialStoreState } from '../../../testUtils';
import { initializeTestStore, render } from '../../../setupTest';

initializeTestStore(initialStoreState);
initializeMockApp();

describe('AttemptList', () => {
  it('Test that the AttemptList matches snapshot', () => {
    expect(render(<AttemptList attempts={testUtils.defaultAttemptsData.attemptsList} />)).toMatchSnapshot();
  });
  it('Data appears in data table as expected', () => {
    render(<AttemptList attempts={testUtils.defaultAttemptsData.attemptsList} />);
    testUtils.defaultAttemptsData.attemptsList.forEach((attempt, index) => {
      // Expect a row to be in the table for each attempt in the data (with respect to key/values present)
      if (attempt.severity && attempt.submission_reason) {
        expect(screen.getAllByRole('row', {
          attempt_id: attempt.attempt_id,
          exam_name: attempt.exam_name,
          username: attempt.username,
          time_limit: attempt.time_limit,
          exam_type: attempt.exam_type,
          started_at: attempt.started_at,
          completed_at: attempt.completed_at,
          status: attempt.status,
          severity: attempt.severity,
          submission_reason: attempt.submission_reason,
        })[index]).toBeInTheDocument();
      } else {
        expect(screen.getAllByRole('row', {
          attempt_id: attempt.attempt_id,
          exam_name: attempt.exam_name,
          username: attempt.username,
          time_limit: attempt.time_limit,
          exam_type: attempt.exam_type,
          started_at: attempt.started_at,
          completed_at: attempt.completed_at,
          status: attempt.status,
        })[index]).toBeInTheDocument();
      }
    });
  });
  it('attempt null start and end time makes "-" appear in UI', () => {
    render(<AttemptList attempts={[{
      exam_name: 'Exam 1',
      username: 'username1',
      time_limit: 60,
      exam_type: 'timed',
      started_at: null,
      completed_at: null,
      status: 'second_review_required',
      attempt_id: 0,
      severity: 1.0,
      submission_reason: 'Submitted by user',
    }]}
    />);
    // Expect a two cells with '-' to be present (index 1 is for the second entry)
    expect(screen.getAllByText('-')[1]).toBeInTheDocument();
  });
  it('filtering by status displays the correct entry', async () => {
    const user = userEvent.setup();
    render(<AttemptList attempts={testUtils.defaultAttemptsData.attemptsList} />);
    // Get the 2nd row of data which has the values of defaultAttemptsData[1]
    const secondRow = screen.getAllByRole('row')[2];
    await user.click(screen.getByText('Filters'));
    await user.click(screen.getByLabelText('Second Review Required'));
    // Expect the first data entry, but not the second from defaultAttemptsData
    // NOTE: row with index '0' in 'screen' is the header row.
    expect(screen.getAllByRole('row')[1]).toBeInTheDocument();
    expect(secondRow).not.toBeInTheDocument();
  });
  it('filtering by username displays the correct entry', () => {
    render(<AttemptList attempts={testUtils.defaultAttemptsData.attemptsList} />);
    // Get the 2nd row of data which has the values of defaultAttemptsData[1]
    const secondRow = screen.getAllByRole('row')[2];
    const searchInput = screen.getByLabelText('Search username');
    fireEvent.change(searchInput, { target: { value: 'username1' } });
    // Expect the first data entry, but not the second from defaultAttemptsData
    expect(screen.getAllByRole('row')[1]).toBeInTheDocument();
    expect(secondRow).not.toBeInTheDocument();
  });
});
