/* eslint-disable import/prefer-default-export */

/**
 * Mocked formatMessage provided by react-intl
 */
export const formatMessage = (msg, values) => {
  let message = msg.defaultMessage;
  if (values === undefined) {
    return message;
  }
  // check if value is not a primitive type.
  if (Object.values(values).filter(value => Object(value) === value).length) {
    // eslint-disable-next-line react/jsx-filename-extension
    return <format-message-function {...{ message: msg, values }} />;
  }
  Object.keys(values).forEach((key) => {
    // eslint-disable-next-line
    message = message.replaceAll(`{${key}}`, values[key]);
  });
  return message;
};

export const defaultExamsData = {
  examsList: [
    {
      id: 1,
      name: 'exam1',
      examType: 'proctored',
      timeLimitMins: 60,
    },
  ],
  currentExamIndex: 0,
  currentExam: { id: 1, name: 'exam1' },
  setCurrentExam: jest.fn(),
};

export const defaultAttemptsData = {
  attemptsList:
    [{
      exam_name: 'Exam 1',
      username: 'username1',
      time_limit: 60,
      exam_type: 'timed',
      started_at: '2023-04-05T19:27:16.000000Z',
      completed_at: '2023-04-05T19:27:17.000000Z',
      status: 'second_review_required',
      attempt_id: 0,
      severity: 1.0,
      submission_reason: 'Submitted by user',
    },
    {
      exam_name: 'Exam 2',
      username: 'username2',
      time_limit: 60,
      exam_type: 'proctored',
      started_at: '2023-04-05T19:37:16.000000Z',
      completed_at: '2023-04-05T19:37:17.000000Z',
      status: 'submitted',
      attempt_id: 1,
    }],
};
