import { render, screen } from '@testing-library/react';

import ExamsPage from '.';
import * as hooks from './hooks';
import * as testUtils from '../../testUtils';

// normally mocked for unit tests but required for rendering/snapshots
jest.unmock('react');

jest.mock('./hooks', () => ({
  useInitializeExamsPage: jest.fn(),
  useExamAttemptsData: jest.fn(),
  useExamsData: jest.fn(),
  useFetchExamAttempts: jest.fn(),
  useDeleteExamAttempt: jest.fn(),
  useModifyExamAttempt: jest.fn(),
  useButtonStateFromRequestStatus: jest.fn(),
}));

describe('ExamsPage', () => {
  beforeAll(() => {
    hooks.useExamAttemptsData.mockReturnValue(testUtils.defaultAttemptsData);
  });
  describe('snapshots', () => {
    test('exams and attempts loaded', () => {
      // temporary, this won't fire on useEffect once we have an exam selection handler
      hooks.useFetchExamAttempts.mockReturnValue(jest.fn());
      hooks.useButtonStateFromRequestStatus.mockReturnValue(jest.fn());
      hooks.useExamsData.mockReturnValue(testUtils.defaultExamsData);
      expect(render(<ExamsPage courseId="test_course" />)).toMatchSnapshot();
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
    test('switch tabs to allowances', () => {
      screen.getByText('Allowances').click();
      expect(screen.getByTestId('allowances')).toBeInTheDocument();
    });
  });
});
