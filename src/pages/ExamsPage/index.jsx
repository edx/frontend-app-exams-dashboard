import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Tabs, Tab, Container } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import messages from './messages';
import { useExamsData, useExamAttemptsData, useInitializeExamsPage, useInitializeAttemptsList } from './hooks';
import AttemptList from './components/AttemptList';
import ExamAttemptDataTable from './components/ExamAttemptDataTable';
import ExamList from './components/ExamList';
import ExternalReviewDashboard from './components/ExternalReviewDashboard';

const ExamsPage = ({ courseId }) => {
  useInitializeExamsPage(courseId);
  const { formatMessage } = useIntl();
  const {
    examsList,
    isLoading,
  } = useExamsData();

  // I'm realizing we don't have an endpoint to get all the exam attempts within a course, so we'll have to make a separate
  // call to edx-exams for each exam unless we decide to add such an endpoint later on.

  // IDEA 1: call attempt endpoint using each exam in exam list, pass the returned list of attempts to ExamAttemptDataTable
  // IDEA 2: pass exam list into ExamAttemptDataTable, call endpoint there

  // Going with IDEA 1 for now in order to keep the API calls in the same place.

  // let attemptsList = [];
  // when the examsList is loaded, get the id of each exam, and get the attemptsList
  for (let exam in examsList) {
    useInitializeAttemptsList(exam.id);
  }
  let attemptsList = useExamAttemptsData();
  console.log("ATTEMPTS:", attemptsList);

return (
  <Container>
    {isLoading && <div>Loading...</div>}
    <ExamList exams={examsList} />
    <Tabs variant="tabs" defaultActiveKey="attempts">
      <Tab eventKey="attempts" title={formatMessage(messages.attemptsViewTabTitle)}>
        {/* <AttemptList /> */}
        {/* <ExamAttemptDataTable /> */}
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
