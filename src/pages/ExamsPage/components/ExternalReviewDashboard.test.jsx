import { render, screen } from '@testing-library/react';

import ExternalReviewDashboard from './ExternalReviewDashboard';

// normally mocked for unit tests but required for rendering/snapshots
jest.unmock('react');

jest.mock('../data/api', () => ({
  getExamsBaseUrl: jest.fn().mockReturnValue('http://test.org'),
}));

const testExam = {
  id: 3,
  name: 'Test Proctored Exam',
};

describe('ExternalReviewDashboard', () => {
  it('does not include button to open review dashboard if no exam provided', () => {
    render(<ExternalReviewDashboard exam={null} />);
    expect(screen.queryByTitle('lti_link')).not.toBeInTheDocument();
    expect(screen.queryByText('Open the Review Dashboard for Test Proctored Exam')).not.toBeInTheDocument();
    expect(screen.queryByText('Please select an exam from the dropdown above.')).toBeInTheDocument();
  });
  it('includes button to open review dashboard with the correct url for the current exam', () => {
    render(<ExternalReviewDashboard exam={testExam} />);
    expect(screen.getByTitle('lti_link')).toHaveAttribute('href', 'http://test.org/lti/exam/3/instructor_tool');
    expect(screen.queryByText('Open the Review Dashboard for Test Proctored Exam')).toBeInTheDocument();
    expect(screen.queryByText('Please select an exam from the dropdown above.')).not.toBeInTheDocument();
  });
  // todo: add back after embed vs new tab is a configurable option.
  // it('includes an iframe with the correct url for the current exam', () => {
  //   render(<ExternalReviewDashboard exam={testExam} />);
  //   expect(screen.getByTitle('lti_tool')).toHaveAttribute('src', 'http://test.org/lti/exam/3/instructor_tool');
  // });
});
