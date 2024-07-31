import { render } from '@testing-library/react';

import AllowanceList from './AllowanceList';
import { useAllowancesData } from '../hooks';

// nomally mocked for unit tests but required for rendering/snapshots
jest.unmock('react');

const mockedAllowancesData = {
  allowancesList: [
    {
      id: 1,
      exam_id: 1,
      user_id: 1,
      extra_time_mins: 45,
      username: 'edx',
      exam_name: 'edX Exams',
      email: 'edx@example.com',
    },
    {
      id: 2,
      exam_id: 3,
      user_id: 1,
      extra_time_mins: 15,
      username: 'edx',
      exam_name: 'More Ways to Connect',
      email: 'edx@example.com',
    },
  ],
};

jest.mock('../hooks', () => ({
  useAllowancesData: jest.fn(),
  useDeleteAllowance: jest.fn(),
}));

describe('AllowanceList', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('when listing allowances', () => {
    beforeEach(() => {
      useAllowancesData.mockReturnValue(mockedAllowancesData);
    });

    it('should match snapshot', () => {
      expect(render(<AllowanceList />)).toMatchSnapshot();
    });
  });

  describe('when there are no allowances', () => {
    beforeEach(() => {
      useAllowancesData.mockReturnValue({ allowancesList: [] });
    });

    it('should match snapshot', () => {
      expect(render(<AllowanceList />)).toMatchSnapshot();
    });
  });
});
