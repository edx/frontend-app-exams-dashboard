import { render, screen } from '@testing-library/react';

import { useDeleteAllowance } from '../hooks';
import AllowanceListActions from './AllowanceListActions';

jest.mock('../hooks', () => ({
  useDeleteAllowance: jest.fn(),
}));

// nomally mocked for unit tests but required for rendering/snapshots
jest.unmock('react');

const mockAllowance = {
  id: 1,
  examId: 1,
  examName: 'edX Exams',
  allowanceType: 'Minutes',
  extraTimeMins: 45,
};

describe('AllowanceListActions', () => {
  describe('snapshots', () => {
    test('displayed buttons should match snapshot', () => {
      expect(render(<AllowanceListActions allowance={mockAllowance} />)).toMatchSnapshot();
    });
  });

  it('should open the delete modal when the delete icon is clicked', () => {
    render(<AllowanceListActions allowance={mockAllowance} />);
    screen.getByTestId('delete-allowance-icon').click();
    expect(screen.getByText('Are you sure you want to delete this allowance?')).toBeInTheDocument();
  });

  describe('delete modal', () => {
    it('should delete the allowance when the delete button is clicked', () => {
      const mockDeleteAllowance = jest.fn();
      useDeleteAllowance.mockReturnValue(mockDeleteAllowance);
      render(<AllowanceListActions allowance={mockAllowance} />);
      screen.getByTestId('delete-allowance-icon').click();
      screen.getByText('Delete').click();
      expect(mockDeleteAllowance).toHaveBeenCalledWith(mockAllowance.id, expect.any(Function));
    });

    it('should close the modal when the cancel button is clicked', () => {
      render(<AllowanceListActions allowance={mockAllowance} />);
      screen.getByTestId('delete-allowance-icon').click();
      screen.getByText('Cancel').click();
      expect(screen.queryByText('Are you sure you want to delete this allowance?')).not.toBeInTheDocument();
    });

    it('should close the modal when the delete is successful', () => {
      const mockDeleteAllowance = jest.fn();
      useDeleteAllowance.mockReturnValue(mockDeleteAllowance);
      render(<AllowanceListActions allowance={mockAllowance} />);
      screen.getByTestId('delete-allowance-icon').click();
      screen.getByText('Delete').click();
      expect(screen.getByText('Are you sure you want to delete this allowance?')).toBeInTheDocument();
      mockDeleteAllowance.mock.calls[0][1]();
      expect(screen.queryByText('Are you sure you want to delete this allowance?')).not.toBeInTheDocument();
    });
  });
});
