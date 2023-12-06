import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Launch } from '@edx/paragon/icons';
import { getLaunchUrlByExamId } from '../utils';
import messages from '../messages';

const ltiToolEmbed = false; // This is set to false for now but will eventually need to be a configurable variable.

const ExternalReviewDashboard = ({ exam }) => {
  const { formatMessage } = useIntl();

  // By default, launch instructor tool in a new tab. Otherwise, embed in dashboard as iframe.
  return (
    <div data-testid="review_dash">
      <div style={{ padding: 10 }}>
        {
          // If an exam is selected, show the button to open the external review dashboard, otherwise prompt the user to select an exam.
          (!ltiToolEmbed && exam) ? (
            <Button as="a" title="lti_link" target="_blank" href={getLaunchUrlByExamId(exam.id)}>
              {formatMessage(messages.ReviewDashboardOpenLTITool) + exam.name}
              <Launch />
            </Button>
          ) : formatMessage(messages.ReviewDashboardPleaseSelectExam)
        }
      </div>
      {ltiToolEmbed && exam && <iframe title="lti_tool" src={getLaunchUrlByExamId(exam.id)} width="100%" height="1100" style={{ border: 'none' }} />}
    </div>
  );
};

ExternalReviewDashboard.propTypes = {
  exam: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
};

ExternalReviewDashboard.defaultProps = {
  exam: null,
};

export default ExternalReviewDashboard;
