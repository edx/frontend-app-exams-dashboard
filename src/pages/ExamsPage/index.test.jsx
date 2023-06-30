import { render, screen } from '@testing-library/react';

import ExamsPage from '.';
import * as hooks from './hooks';

// nomally mocked for unit tests but required for rendering/snapshots
jest.unmock('react');

jest.mock('./hooks', () => ({
  useInitializeExamsPage: jest.fn(),
  useExamAttemptsData: jest.fn(),
  useExamsData: jest.fn(),
  useFetchExamAttempts: jest.fn(),
  useDeleteExamAttempt: jest.fn(),
}));

describe('ExamsPage', () => {
  const defaultExamsData = {
    examsList: [
      { id: 1, name: 'exam1' },
    ],
    currentExam: { id: 1, name: 'exam1' },
    isLoading: false,
  };
  const defaultAttemptsData = {
    attemptsList: [{
      exam_name: 'Exam 1',
      username: 'username',
      time_limit: 60,
      exam_type: 'Timed',
      started_at: '2023-04-05T19:27:16.000000Z',
      completed_at: '2023-04-05T19:27:17.000000Z',
      status: 'completed',
      attempt_id: 0,
    }],
  };
  beforeAll(() => {
    hooks.useExamAttemptsData.mockReturnValue(defaultAttemptsData);
  });
  describe('snapshots', () => {
    test('exams and attempts loaded', () => {
      // temporary, this won't fire on useEffect once we have an exam selection handler
      hooks.useFetchExamAttempts.mockReturnValue(jest.fn());

      hooks.useExamsData.mockReturnValue(defaultExamsData);
      expect(render(<ExamsPage courseId="test_course" />)).toMatchSnapshot();
    });
  });
  describe('loading message', () => {
    it('should render while fetching data', () => {
      hooks.useExamsData.mockReturnValue({
        ...defaultExamsData,
        isLoading: true,
      });
      render(<ExamsPage courseId="test_course" />);
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });
  describe('tab navigation', () => {
    beforeEach(() => {
      render(<ExamsPage courseId="test_course" />);
    });
    it('should render attempt list by default', () => {
      expect(screen.getByTestId('attempt_list')).toBeInTheDocument();
    });
    it('should not render review dashboard by default', () => {
      expect(screen.queryByTestId('review_dash')).not.toBeInTheDocument();
    });
    test('switch tabs to review dashboard', () => {
      screen.getByText('Review Dashboard').click();
      expect(screen.getByTestId('review_dash')).toBeInTheDocument();
    });
  });
});
