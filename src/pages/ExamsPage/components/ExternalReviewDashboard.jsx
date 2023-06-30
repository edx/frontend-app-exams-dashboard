import React from 'react';
import PropTypes from 'prop-types';

import { getExamsBaseUrl } from '../data/api';

const getLaunchUrlByExamId = (id) => `${getExamsBaseUrl()}/lti/exam/${id}/instructor_tool`;

const ExternalReviewDashboard = ({ exam }) => (
  <div data-testid="review_dash">
    {exam && <iframe title="lti_tool" src={getLaunchUrlByExamId(exam.id)} width="100%" height="1100" style={{ border: 'none' }} />}
  </div>
);

ExternalReviewDashboard.propTypes = {
  exam: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
};

ExternalReviewDashboard.defaultProps = {
  exam: null,
};

export default ExternalReviewDashboard;
