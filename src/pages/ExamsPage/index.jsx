import React from 'react';
import PropTypes from 'prop-types';

import { Tabs, Tab, Container } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import messages from './messages';
import { useExamsData, useInitializeExamsPage } from './hooks';
import ExamList from './components/ExamList';
import AttemptList from './components/AttemptList';
import ExternalReviewDashboard from './components/ExternalReviewDashboard';

const ExamsPage = ({ courseId }) => {
  useInitializeExamsPage(courseId);
  const { formatMessage } = useIntl();
  const {
    examsList,
    isLoading,
  } = useExamsData();

  return (
    <Container>
      { isLoading && <div>Loading...</div>}
      <ExamList exams={examsList} />
      <Tabs variant="tabs" defaultActiveKey="attempts">
        <Tab eventKey="attempts" title={formatMessage(messages.attemptsViewTabTitle)}>
          <AttemptList />
        </Tab>
        <Tab eventKey="review" title={formatMessage(messages.reviewDashboardTabTitle)}>
          <ExternalReviewDashboard />
        </Tab>
      </Tabs>
    </Container>
  );
};

ExamsPage.propTypes = {
  courseId: PropTypes.string.isRequired,
};

export default ExamsPage;
