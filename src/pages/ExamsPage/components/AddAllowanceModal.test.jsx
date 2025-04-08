import { initializeMockApp } from '@edx/frontend-platform/testing';
import { screen, fireEvent, waitFor } from '@testing-library/react';

import AddAllowanceModal from './AddAllowanceModal';
import { createAllowance } from '../data/api';
import { initialStoreState } from '../../../testUtils';
import { initializeTestStore, render } from '../../../setupTest';

jest.mock('../data/api', () => ({
  ...jest.requireActual('../data/api'),
  createAllowance: jest.fn().mockResolvedValue({}),
}));

initializeTestStore(initialStoreState);
initializeMockApp();

describe('AddAllowanceModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    expect(render(<AddAllowanceModal isOpen close={jest.fn()} />)).toMatchSnapshot();
  });

  it('should display timed exam choices', async () => {
    render(<AddAllowanceModal isOpen close={jest.fn()} />);
    fireEvent.change(screen.getByTestId('exam-type'), { target: { value: 'timed' } });

    await waitFor(() => {
      expect(screen.getByText('exam4')).toBeInTheDocument();
    });
  });

  it('should update allowance input', () => {
    render(<AddAllowanceModal isOpen close={jest.fn()} />);
    fireEvent.change(screen.getByTestId('allowance-type'), { target: { value: 'time-multiplier' } });

    expect(screen.getByText('Multiplier')).toBeInTheDocument();
  });

  it('should submit with default values', () => {
    render(<AddAllowanceModal isOpen close={jest.fn()} />);
    fireEvent.change(screen.getByTestId('users'), { target: { value: 'edx, edx@example.com' } });
    fireEvent.click(screen.getByText('exam1'));
    fireEvent.click(screen.getByText('exam3'));
    fireEvent.change(screen.getByTestId('additional-time-minutes'), { target: { value: '60' } });
    fireEvent.click(screen.getByTestId('create-allowance-stateful-button'));

    const expectedData = [
      {
        username: 'edx',
        exam_id: 1,
        extra_time_mins: 60,
      },
      {
        username: 'edx',
        exam_id: 3,
        extra_time_mins: 60,
      },
      {
        email: 'edx@example.com',
        exam_id: 1,
        extra_time_mins: 60,
      },
      {
        email: 'edx@example.com',
        exam_id: 3,
        extra_time_mins: 60,
      },
    ];
    expect(createAllowance).toHaveBeenCalledWith('test_course', expectedData);
  });

  it('should display field errors', async () => {
    render(<AddAllowanceModal isOpen close={jest.fn()} />);
    fireEvent.click(screen.getByTestId('create-allowance-stateful-button'));

    await waitFor(() => {
      expect(screen.getByText('Enter learners')).toBeInTheDocument();
      expect(screen.getByText('Select exams')).toBeInTheDocument();
      expect(screen.getByText('Enter minutes as a number greater than 0')).toBeInTheDocument();
    });
  });

  it('should show an alert if the request fails', async () => {
    createAllowance.mockRejectedValue({ detail: 'some test error' });

    render(<AddAllowanceModal isOpen close={jest.fn()} />);

    fireEvent.change(screen.getByTestId('users'), { target: { value: 'edx, edx@example.com' } });
    fireEvent.click(screen.getByText('exam1'));
    fireEvent.click(screen.getByText('exam3'));
    fireEvent.change(screen.getByTestId('additional-time-minutes'), { target: { value: '60' } });
    fireEvent.click(screen.getByTestId('create-allowance-stateful-button'));

    await waitFor(() => {
      expect(screen.getByText('some test error')).toBeInTheDocument();
      expect(screen.getByText('some test error')).toBeVisible();
    });
  });

  it('should reset form state when closed', async () => {
    render(<AddAllowanceModal isOpen close={jest.fn()} />);
    fireEvent.change(screen.getByTestId('exam-type'), { target: { value: 'timed' } });
    fireEvent.click(screen.getByTestId('create-allowance-stateful-button'));

    await waitFor(() => {
      expect(screen.getByText('Enter minutes as a number greater than 0')).toBeInTheDocument();
      expect(screen.getByText('exam4')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId('close-modal'));

    await waitFor(() => {
      // any errors and timed exam selections should be reset
      expect(screen.queryByText('Enter minutes as a number greater than 0')).not.toBeInTheDocument();
      expect(screen.queryByText('exam4')).not.toBeInTheDocument();
      // expect the default selection to revert back to proctored exams
      expect(screen.queryByText('exam1')).toBeInTheDocument();
    });
  });

  it('should display error if minutes entered is 0 or less', () => {
    render(<AddAllowanceModal isOpen close={jest.fn()} />);
    fireEvent.change(screen.getByTestId('additional-time-minutes'), { target: { value: '-1' } });
    fireEvent.click(screen.getByTestId('create-allowance-stateful-button'));
    expect(screen.getByText('Enter minutes as a number greater than 0')).toBeInTheDocument();
  });

  it('should display error if multiplier entered is 1 or less', () => {
    render(<AddAllowanceModal isOpen close={jest.fn()} />);
    fireEvent.change(screen.getByTestId('allowance-type'), { target: { value: 'time-multiplier' } });
    fireEvent.change(screen.getByTestId('additional-time-multiplier'), { target: { value: '1' } });
    fireEvent.click(screen.getByTestId('create-allowance-stateful-button'));
    expect(screen.getByText('Enter multiplier as a number greater than 1')).toBeInTheDocument();
  });

  it('should display error if minutes entered is not a number', () => {
    render(<AddAllowanceModal isOpen close={jest.fn()} />);
    fireEvent.change(screen.getByTestId('additional-time-minutes'), { target: { value: 'something' } });
    fireEvent.click(screen.getByTestId('create-allowance-stateful-button'));
    expect(screen.getByText('Enter minutes as a number greater than 0')).toBeInTheDocument();
  });

  it('should display error if multiplier entered is not a number', () => {
    render(<AddAllowanceModal isOpen close={jest.fn()} />);
    fireEvent.change(screen.getByTestId('allowance-type'), { target: { value: 'time-multiplier' } });
    fireEvent.change(screen.getByTestId('additional-time-multiplier'), { target: { value: 'something' } });
    fireEvent.click(screen.getByTestId('create-allowance-stateful-button'));
    expect(screen.getByText('Enter multiplier as a number greater than 1')).toBeInTheDocument();
  });
});
