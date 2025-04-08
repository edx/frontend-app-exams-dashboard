import userEvent from '@testing-library/user-event';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { initializeMockApp } from '@edx/frontend-platform/testing';

import AllowanceListActions from './AllowanceListActions';
import { createAllowance, deleteAllowance } from '../data/api';
import { initialStoreState } from '../../../testUtils';
import { initializeTestStore, render } from '../../../setupTest';

jest.mock('../data/api', () => ({
  ...jest.requireActual('../data/api'),
  createAllowance: jest.fn().mockResolvedValue({}),
  deleteAllowance: jest.fn().mockResolvedValue({}),
}));

initializeTestStore(initialStoreState);
initializeMockApp();

const mockAllowance = {
  id: 1,
  examId: 1,
  username: 'edx',
  examName: 'edX Exams',
  allowanceType: 'Minutes',
  extraTimeMins: 45,
};
const newExtraTimeMins = 60;

describe('AllowanceListActions', () => {
  let user;
  beforeEach(() => {
    user = userEvent.setup();
  });

  describe('snapshots', () => {
    test('displayed buttons should match snapshot', () => {
      expect(render(<AllowanceListActions allowance={mockAllowance} />)).toMatchSnapshot();
    });
  });

  it('should open the delete modal when the delete icon is clicked', async () => {
    render(<AllowanceListActions allowance={mockAllowance} />);
    await user.click(screen.getByTestId('delete-allowance-icon'));
    expect(screen.getByText('Are you sure you want to delete this allowance?')).toBeInTheDocument();
  });

  it('should open the edit modal when the edit icon is clicked', async () => {
    render(<AllowanceListActions allowance={mockAllowance} />);
    await user.click(screen.getByTestId('edit-allowance-icon'));
    expect(screen.getByTestId('edit-allowance-header')).toBeInTheDocument();
  });

  describe('delete modal', () => {
    it('should delete the allowance when the delete button is clicked', async () => {
      render(<AllowanceListActions allowance={mockAllowance} />);
      await user.click(screen.getByTestId('delete-allowance-icon'));
      await user.click(screen.getByText('Delete'));
      expect(deleteAllowance).toHaveBeenCalledWith('test_course', mockAllowance.id);
    });

    it('should close the modal when the cancel button is clicked', async () => {
      render(<AllowanceListActions allowance={mockAllowance} />);
      await user.click(screen.getByTestId('delete-allowance-icon'));
      await user.click(screen.getByText('Cancel'));
      expect(screen.queryByText('Are you sure you want to delete this allowance?')).not.toBeInTheDocument();
    });

    it('should close the modal when the delete is successful', async () => {
      render(<AllowanceListActions allowance={mockAllowance} />);
      await user.click(screen.getByTestId('delete-allowance-icon'));

      await waitFor(() => {
        expect(screen.getByText('Are you sure you want to delete this allowance?')).toBeInTheDocument();
      });

      await user.click(screen.getByText('Delete'));

      await waitFor(() => {
        expect(screen.queryByText('Are you sure you want to delete this allowance?')).not.toBeInTheDocument();
      });
    });
  });

  describe('edit modal', () => {
    it('should edit the allowance when the save button is clicked', async () => {
      render(<AllowanceListActions allowance={mockAllowance} />);
      await user.click(screen.getByTestId('edit-allowance-icon'));
      fireEvent.change(screen.getByTestId('extra-time-mins'), { target: { value: newExtraTimeMins } });
      await user.click(screen.getByText('Save'));
      const expectedData = [{
        username: mockAllowance.username,
        exam_id: mockAllowance.examId,
        extra_time_mins: newExtraTimeMins,
      }];
      expect(createAllowance).toHaveBeenCalledWith('test_course', expectedData);
    });

    it('should display errors when the save button is clicked', async () => {
      render(<AllowanceListActions allowance={mockAllowance} />);
      await user.click(screen.getByTestId('edit-allowance-icon'));
      await user.click(screen.getByText('Save'));
      expect(screen.getByText('Enter minutes as a number greater than 0')).toBeInTheDocument();
    });

    it('should close the modal when the cancel button is clicked', async () => {
      render(<AllowanceListActions allowance={mockAllowance} />);
      await user.click(screen.getByTestId('edit-allowance-icon'));
      await user.click(screen.getByText('Cancel'));
      expect(screen.queryByTestId('edit-allowance-header')).not.toBeInTheDocument();
    });

    it('should close the modal when the edit is successful', async () => {
      render(<AllowanceListActions allowance={mockAllowance} />);
      await user.click(screen.getByTestId('edit-allowance-icon'));
      fireEvent.change(screen.getByTestId('extra-time-mins'), { target: { value: newExtraTimeMins } });
      await user.click(screen.getByText('Save'));
      await waitFor(() => {
        expect(screen.queryByTestId('edit-allowance-header')).not.toBeInTheDocument();
      });
    });
  });
});
