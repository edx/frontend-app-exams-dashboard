import userEvent from '@testing-library/user-event';
import { initializeMockApp } from '@edx/frontend-platform/testing';
import { screen } from '@testing-library/react';

import ExamsPage from '.';
import { initialStoreState } from '../../testUtils';
import { initializeTestStore, render } from '../../setupTest';

initializeTestStore(initialStoreState);
initializeMockApp();

describe('ExamsPage', () => {
  describe('snapshots', () => {
    test('exams and attempts loaded', () => {
      expect(render(<ExamsPage courseId="test_course" />)).toMatchSnapshot();
    });
  });
  describe('tab navigation', () => {
    let user;
    beforeEach(() => {
      user = userEvent.setup();
      render(<ExamsPage courseId="test_course" />);
    });
    it('should render attempt list by default', () => {
      expect(screen.getByTestId('attempt_list')).toBeInTheDocument();
    });
    it('should not render review dashboard by default', () => {
      expect(screen.queryByTestId('review_dash')).not.toBeInTheDocument();
    });
    test('switch tabs to review dashboard', async () => {
      await user.click(screen.getByText('Review Dashboard'));
      expect(screen.getByTestId('review_dash')).toBeInTheDocument();
    });
    test('switch tabs to allowances', async () => {
      await user.click(screen.getByText('Allowances'));
      expect(screen.getByTestId('allowances')).toBeInTheDocument();
    });
  });
});
