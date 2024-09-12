import { render, screen } from '@testing-library/react';

import AllowanceList from './AllowanceList';
import * as hooks from '../hooks';
import * as testUtils from '../../../testUtils';

// normally mocked for unit tests but required for rendering/snapshots
jest.unmock('react');

const mockMakeNetworkRequest = jest.fn();

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
  useExamsData: jest.fn(),
  useButtonStateFromRequestStatus: jest.fn(),
  useCreateAllowance: jest.fn(),
  useFilteredExamsData: jest.fn(),
  useEditAllowance: jest.fn(),
  useDeleteAllowance: jest.fn(),
}));

jest.mock('../../../data/redux/hooks', () => ({
  useRequestError: jest.fn(),
  useClearRequest: jest.fn(),
}));

describe('AllowanceList', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    hooks.useExamsData.mockReturnValue(testUtils.defaultExamsData);
    hooks.useButtonStateFromRequestStatus.mockReturnValue(mockMakeNetworkRequest);
    hooks.useFilteredExamsData.mockReturnValue({ proctoredExams: {}, timedExams: {} });
  });

  describe('when listing allowances', () => {
    beforeEach(() => {
      hooks.useAllowancesData.mockReturnValue(mockedAllowancesData);
    });

    it('should match snapshot', () => {
      expect(render(<AllowanceList />)).toMatchSnapshot();
    });

    it('should open allowance modal', () => {
      render(<AllowanceList />);
      screen.getByText('Add allowance').click();
      expect(screen.getByText('Add a new allowance')).toBeInTheDocument();
    });
  });

  describe('when there are no allowances', () => {
    beforeEach(() => {
      hooks.useAllowancesData.mockReturnValue({ allowancesList: [] });
    });

    it('should match snapshot', () => {
      expect(render(<AllowanceList />)).toMatchSnapshot();
    });
  });
});
