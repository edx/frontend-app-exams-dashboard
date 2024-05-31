import React from 'react';
import PropTypes from 'prop-types';

import { Tabs, Tab, Container } from '@openedx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import messages from './messages';
import {
  useExamsData, useInitializeExamsPage, useExamAttemptsData,
} from './hooks';
import AttemptList from './components/AttemptList';
import ExternalReviewDashboard from './components/ExternalReviewDashboard';
import ExamSelection from './components/ExamSelection';

import './index.scss';

const ExamsPage = ({ courseId }) => {
  useInitializeExamsPage(courseId);
  const { formatMessage } = useIntl();
  const {
    currentExam,
    examsList,
    setCurrentExam,
  } = useExamsData();
  const {
    attemptsList,
  } = useExamAttemptsData();

  return (
    <Container>
      <Container id="exam-selector">
        <ExamSelection exams={examsList} onSelect={setCurrentExam} />
      </Container>
      <Tabs variant="tabs" mountOnEnter defaultActiveKey="attempts">
        <Tab eventKey="attempts" title={formatMessage(messages.attemptsViewTabTitle)}>
          <AttemptList attempts={attemptsList} />
        </Tab>
        <Tab eventKey="review" title={formatMessage(messages.reviewDashboardTabTitle)}>
          <ExternalReviewDashboard exam={currentExam} />
        </Tab>
      </Tabs>
    </Container>
  );
};

ExamsPage.propTypes = {
  courseId: PropTypes.string.isRequired,
};

export default ExamsPage;
