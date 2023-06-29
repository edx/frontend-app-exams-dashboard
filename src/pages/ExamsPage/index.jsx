import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Tabs, Tab, Container } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import messages from './messages';
import {
  useExamsData, useInitializeExamsPage, useFetchExamAttempts, useExamAttemptsData,
} from './hooks';
import AttemptList from './components/AttemptList';
import ExamList from './components/ExamList';
import ExternalReviewDashboard from './components/ExternalReviewDashboard';

const ExamsPage = ({ courseId }) => {
  useInitializeExamsPage(courseId);
  const { formatMessage } = useIntl();
  const {
    currentExam,
    examsList,
    isLoading,
  } = useExamsData();
  const {
    attemptsList,
  } = useExamAttemptsData();
  /*   eslint-disable react-hooks/exhaustive-deps */
  const fetchExamAttempts = useFetchExamAttempts();
  // NOTE: This useEffect hook is temporary until the currentExam is
  // Passed in via the exam selection component
  useEffect(() => {
    if (currentExam) {
      fetchExamAttempts(currentExam.id);
    }
  }, [currentExam]);
  /*   eslint-disable react-hooks/exhaustive-deps */

  return (
    <Container>
      {isLoading && <div>Loading...</div>}
      <ExamList exams={examsList} />
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
