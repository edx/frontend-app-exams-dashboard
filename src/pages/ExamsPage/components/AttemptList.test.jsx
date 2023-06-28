import { render, screen } from '@testing-library/react';

import AttemptList from './AttemptList';

import * as hooks from '../hooks';

// nomally mocked for unit tests but required for rendering/snapshots
jest.unmock('react');

jest.mock('../hooks', () => ({
  useDeleteExamAttempt: jest.fn(),
}));

const mockMakeNetworkRequest = jest.fn();

describe('AttemptList', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    hooks.useDeleteExamAttempt.mockReturnValue(mockMakeNetworkRequest);
  });
  const defaultAttemptsData = [
    {
      exam_name: 'Exam 1',
      username: 'username',
      time_limit: 60,
      exam_type: 'Timed',
      started_at: '2023-04-05T19:27:16.000000Z',
      completed_at: '2023-04-05T19:27:17.000000Z',
      status: 'completed',
      attempt_id: 0,
    },
    {
      exam_name: 'Exam 2',
      username: 'username',
      time_limit: 60,
      exam_type: 'Proctored',
      started_at: '2023-04-05T19:37:16.000000Z',
      completed_at: '2023-04-05T19:37:17.000000Z',
      status: 'completed',
      attempt_id: 1,
    },
  ];
  it('Test that the AttemptList matches snapshot', () => {
    expect(render(<AttemptList attempts={defaultAttemptsData} />)).toMatchSnapshot();
  });
  it('Data appears in data table as expected', () => {
    render(<AttemptList attempts={defaultAttemptsData} />);
    defaultAttemptsData.forEach((attempt, index) => {
      // Expect a row to be in the table for each attempt in the data
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
    });
  });
});
