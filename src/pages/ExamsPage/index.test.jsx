import { render } from '@testing-library/react';

import ExamsPage from '.';
import * as hooks from './hooks';

jest.mock('./hooks', () => ({
  useInitializeExamsPage: jest.fn(),
  useExamsData: jest.fn(),
}));

jest.mock('./components/ExamList', () => 'ExamList');

describe('ExamsPage', () => {
  const defaultExamsData = {
    examsList: 'stub-exams-list', // explicity testable in snapshots
    isLoading: false,
  };
  test('snapshot loading', () => {
    hooks.useExamsData.mockReturnValue({
      ...defaultExamsData,
      isLoading: true,
    });
    // TODO: this is rendering the ExamList as examlist and causing DOM errors on the
    // snapshot. Need to figure out why this is happening.
    expect(render(<ExamsPage courseId="test_course" />)).toMatchSnapshot();
  });
  test('snapshot loaded', () => {
    hooks.useExamsData.mockReturnValue(defaultExamsData);
    expect(render(<ExamsPage courseId="test_course" />)).toMatchSnapshot();
  });
});
