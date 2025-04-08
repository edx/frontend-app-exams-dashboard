import userEvent from '@testing-library/user-event';
import { initializeMockApp } from '@edx/frontend-platform/testing';
import { screen, waitFor } from '@testing-library/react';

import AllowanceList from './AllowanceList';
import { initialStoreState } from '../../../testUtils';
import { initializeTestStore, render } from '../../../setupTest';

describe('AllowanceList', () => {
  let user;
  beforeEach(() => {
    jest.resetAllMocks();

    user = userEvent.setup();
  });

  describe('when listing allowances', () => {
    beforeEach(() => {
      const initialStoreStateCopy = structuredClone(initialStoreState);
      const mockedAllowancesList = [
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
      ];
      initialStoreStateCopy.exams.allowancesList = mockedAllowancesList;

      initializeTestStore(initialStoreStateCopy);
      initializeMockApp();
    });

    it('should match snapshot', () => {
      expect(render(<AllowanceList />)).toMatchSnapshot();
    });

    it('should open allowance modal', async () => {
      render(<AllowanceList />);
      await user.click(screen.getByText('Add allowance'));
      await waitFor(() => expect(screen.getByText('Add a new allowance')).toBeInTheDocument());
    });
  });

  describe('when there are no allowances', () => {
    beforeEach(() => {
      initializeTestStore(initialStoreState);
      initializeMockApp();
    });

    it('should match snapshot', () => {
      expect(render(<AllowanceList />)).toMatchSnapshot();
    });
  });
});
