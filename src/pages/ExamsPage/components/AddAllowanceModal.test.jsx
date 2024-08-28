import { render, screen, fireEvent } from '@testing-library/react';

import * as hooks from '../hooks';
import * as reduxHooks from '../../../data/redux/hooks';
import AddAllowanceModal from './AddAllowanceModal';

const mockMakeNetworkRequest = jest.fn();
const mockCreateAllowance = jest.fn();
const mockClearRequest = jest.fn();
const mockRequestError = jest.fn();

const proctoredExams = [
  { id: 1, name: 'exam1', examType: 'proctored', timeLimitMins: 60 }, // eslint-disable-line object-curly-newline
  { id: 3, name: 'exam3', examType: 'proctored', timeLimitMins: 45 }, // eslint-disable-line object-curly-newline
];

const timedExams = [{ id: 2, name: 'exam2', examType: 'timed', timeLimitMins: 30 }]; // eslint-disable-line object-curly-newline

// normally mocked for unit tests but required for rendering/snapshots
jest.unmock('react');

jest.mock('../hooks', () => ({
  useExamsData: jest.fn(),
  useFilteredExamsData: jest.fn(),
  useButtonStateFromRequestStatus: jest.fn(),
  useCreateAllowance: jest.fn(),
}));

jest.mock('../../../data/redux/hooks', () => ({
  useRequestError: jest.fn(),
  useClearRequest: jest.fn(),
}));

describe('AddAllowanceModal', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    hooks.useFilteredExamsData.mockReturnValue({ proctoredExams, timedExams });
    hooks.useButtonStateFromRequestStatus.mockReturnValue(mockMakeNetworkRequest);
    hooks.useCreateAllowance.mockReturnValue(mockCreateAllowance);
    reduxHooks.useRequestError.mockReturnValue(mockRequestError);
    reduxHooks.useClearRequest.mockReturnValue(mockClearRequest);
  });

  it('should match snapshot', () => {
    expect(render(<AddAllowanceModal isOpen close={jest.fn()} />)).toMatchSnapshot();
  });

  it('should display timed exam choices', () => {
    render(<AddAllowanceModal isOpen close={jest.fn()} />);
    fireEvent.change(screen.getByTestId('exam-type'), { target: { value: 'timed' } });
    expect(screen.getByText('exam2')).toBeInTheDocument();
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
    const expectedData = {
      users: 'edx, edx@example.com',
      'exam-type': 'proctored',
      exams: { 1: '60', 3: '45' },
      'additional-time-minutes': '60',
      'allowance-type': 'additional-minutes',
    };
    expect(mockCreateAllowance).toHaveBeenCalledWith(expectedData, expect.any(Function));
  });

  it('should display field errors', () => {
    render(<AddAllowanceModal isOpen close={jest.fn()} />);
    fireEvent.click(screen.getByTestId('create-allowance-stateful-button'));
    expect(screen.getByText('Enter learners')).toBeInTheDocument();
    expect(screen.getByText('Select exams')).toBeInTheDocument();
    expect(screen.getByText('Enter minutes greater than 0')).toBeInTheDocument();
  });

  it('should show an alert if the request fails', () => {
    reduxHooks.useRequestError.mockReturnValue({ detail: 'some test error' });
    render(<AddAllowanceModal isOpen close={jest.fn()} />);
    expect(screen.getByText('some test error')).toBeInTheDocument();
  });

  it('should clear request errors if form is altered', () => {
    render(<AddAllowanceModal isOpen close={jest.fn()} />);
    fireEvent.change(screen.getByTestId('users'), { target: { value: 'edx, edx@example.com' } });
    expect(reduxHooks.useClearRequest).toHaveBeenCalled();
  });

  it('should reset form state when closed', () => {
    render(<AddAllowanceModal isOpen close={jest.fn()} />);
    fireEvent.change(screen.getByTestId('exam-type'), { target: { value: 'timed' } });
    fireEvent.click(screen.getByTestId('create-allowance-stateful-button'));

    expect(screen.getByText('Enter minutes greater than 0')).toBeInTheDocument();
    expect(screen.getByText('exam2')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('close-modal'));
    // any errors and timed exam selections should be reset
    expect(screen.queryByText('Enter minutes greater than 0')).not.toBeInTheDocument();
    expect(screen.queryByText('exam2')).not.toBeInTheDocument();
    // expect the default selection to revert back to proctored exams
    expect(screen.queryByText('exam1')).toBeInTheDocument();
  });
});
