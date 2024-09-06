import { fireEvent, render, screen } from '@testing-library/react';

import { useDeleteAllowance, useEditAllowance } from '../hooks';
import AllowanceListActions from './AllowanceListActions';
import * as reduxHooks from '../../../data/redux/hooks';

const mockClearRequest = jest.fn();
const mockRequestError = jest.fn();

const mockAllowance = {
  id: 1,
  examId: 1,
  username: 'edx',
  examName: 'edX Exams',
  allowanceType: 'Minutes',
  extraTimeMins: 45,
};
const newExtraTimeMins = 60;

jest.mock('../hooks', () => ({
  useDeleteAllowance: jest.fn(),
  useEditAllowance: jest.fn(),
}));

jest.mock('../../../data/redux/hooks', () => ({
  useRequestError: jest.fn(),
  useClearRequest: jest.fn(),
}));

// nomally mocked for unit tests but required for rendering/snapshots
jest.unmock('react');

describe('AllowanceListActions', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    reduxHooks.useRequestError.mockReturnValue(mockRequestError);
    reduxHooks.useClearRequest.mockReturnValue(mockClearRequest);
  });

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

  it('should open the edit modal when the edit icon is clicked', () => {
    render(<AllowanceListActions allowance={mockAllowance} />);
    screen.getByTestId('edit-allowance-icon').click();
    expect(screen.getByTestId('edit-allowance-header')).toBeInTheDocument();
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

  describe('edit modal', () => {
    it('should edit the allowance when the save button is clicked', () => {
      const mockEditAllowance = jest.fn();
      useEditAllowance.mockReturnValue(mockEditAllowance);
      render(<AllowanceListActions allowance={mockAllowance} />);
      screen.getByTestId('edit-allowance-icon').click();
      fireEvent.change(screen.getByTestId('extra-time-mins'), { target: { value: newExtraTimeMins } });
      screen.getByText('Save').click();
      const expectedData = {
        username: mockAllowance.username,
        exam_id: mockAllowance.examId,
        extra_time_mins: newExtraTimeMins,
      };
      expect(mockEditAllowance).toHaveBeenCalledWith(mockAllowance.id, expectedData, expect.any(Function));
    });

    it('should display errors when the save button is clicked', () => {
      const mockEditAllowance = jest.fn();
      useEditAllowance.mockReturnValue(mockEditAllowance);
      render(<AllowanceListActions allowance={mockAllowance} />);
      screen.getByTestId('edit-allowance-icon').click();
      screen.getByText('Save').click();
      expect(screen.getByText('Enter minutes as a number greater than 0')).toBeInTheDocument();
    });

    it('should close the modal when the cancel button is clicked', () => {
      render(<AllowanceListActions allowance={mockAllowance} />);
      screen.getByTestId('edit-allowance-icon').click();
      screen.getByText('Cancel').click();
      expect(screen.queryByTestId('edit-allowance-header')).not.toBeInTheDocument();
    });

    it('should close the modal when the edit is successful', () => {
      const mockEditAllowance = jest.fn();
      useEditAllowance.mockReturnValue(mockEditAllowance);
      render(<AllowanceListActions allowance={mockAllowance} />);
      screen.getByTestId('edit-allowance-icon').click();
      fireEvent.change(screen.getByTestId('extra-time-mins'), { target: { value: newExtraTimeMins } });
      screen.getByText('Save').click();
      mockEditAllowance.mock.calls[0][2]();
      expect(screen.queryByTestId('edit-allowance-header')).not.toBeInTheDocument();
    });
  });
});
