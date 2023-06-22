import { render, screen } from '@testing-library/react';

import AttemptList from './AttemptList';

// nomally mocked for unit tests but required for rendering/snapshots
jest.unmock('react');

describe('AttemptList', () => {
  const defaultAttemptsData = [{
    exam_name: 'Exam 1',
    username: 'username',
    time_limit: 60,
    exam_type: 'Timed',
    started_at: '2023-04-05T19:27:16.000000Z',
    completed_at: '2023-04-05T19:27:17.000000Z',
    status: 'completed',
  }];
  describe('snapshots', () => {
    test('loaded', () => {
      expect(render(<AttemptList attempts={defaultAttemptsData} />)).toMatchSnapshot();
    });
  });
});
