import { render, screen } from '@testing-library/react';

import ExternalReviewDashboard from './ExternalReviewDashboard';

// nomally mocked for unit tests but required for rendering/snapshots
jest.unmock('react');

jest.mock('../data/api', () => ({
  getExamsBaseUrl: jest.fn().mockReturnValue('http://test.org'),
}));

const testExam = {
  id: 3,
  name: 'Test Proctored Exam',
};

describe('ExternalReviewDashboard', () => {
  it('does not include iframe if no exam provided', () => {
    render(<ExternalReviewDashboard exam={null} />);
    expect(screen.queryByTitle('lti_tool')).not.toBeInTheDocument();
  });
  it('includes an iframe with the correct url for the current exam', () => {
    render(<ExternalReviewDashboard exam={testExam} />);
    expect(screen.getByTitle('lti_tool')).toHaveAttribute('src', 'http://test.org/lti/exam/3/instructor_tool');
  });
});
