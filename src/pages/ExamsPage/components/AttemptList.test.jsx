import { render, screen } from '@testing-library/react';

import AttemptList from './AttemptList';

// nomally mocked for unit tests but required for rendering/snapshots
jest.unmock('react');

describe('AttemptList', () => {
  const defaultAttemptsData = [
    {
      exam_name: 'Exam 1',
      username: 'username',
      time_limit: 60,
      exam_type: 'Timed',
      started_at: '2023-04-05T19:27:16.000000Z',
      completed_at: '2023-04-05T19:27:17.000000Z',
      status: 'completed',
    },
    {
      exam_name: 'Exam 2',
      username: 'username',
      time_limit: 60,
      exam_type: 'Proctored',
      started_at: '2023-04-05T19:37:16.000000Z',
      completed_at: '2023-04-05T19:37:17.000000Z',
      status: 'completed',
    },
  ];
  it('snapshot', () => {
    expect(render(<AttemptList attempts={defaultAttemptsData} />)).toMatchSnapshot();
  });
  it('data table', () => {
    render(<AttemptList attempts={defaultAttemptsData} />);
    defaultAttemptsData.forEach((attempt, index) => {
      // Expect a row to be in the table for each attempt in the data
      expect(screen.getAllByRole('row', {
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
