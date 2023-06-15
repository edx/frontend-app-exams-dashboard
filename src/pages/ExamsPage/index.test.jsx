import { render, screen } from '@testing-library/react';

import ExamsPage from '.';
import * as hooks from './hooks';

// nomally mocked for unit tests but required for rendering/snapshots
jest.unmock('react');

jest.mock('./hooks', () => ({
  useInitializeExamsPage: jest.fn(),
  useExamsData: jest.fn(),
}));

describe('ExamsPage', () => {
  const defaultExamsData = {
    examsList: [
      { id: 1, name: 'exam1' },
    ],
    isLoading: false,
  };
  describe('snapshots', () => {
    test('loaded', () => {
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
      hooks.useExamsData.mockReturnValue(defaultExamsData);
      render(<ExamsPage courseId="test_course" />);
    });
    it('should render attempt list by default', () => {
      expect(screen.getByTestId('attempt_list')).toBeInTheDocument();
    });
    test('swtich tabs to review dashboard', () => {
      screen.getByText('Review Dashboard').click();
      expect(screen.getByTestId('review_dash')).toBeInTheDocument();
    });
  });
});
