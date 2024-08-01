import messages from 'pages/ExamsPage/messages';
import { getExamsBaseUrl } from './data/api';

export const getLaunchUrlByExamId = (id) => `${getExamsBaseUrl()}/lti/exam/${id}/instructor_tool`;

const examAttemptStatusLabels = {
  created: messages.statusLabelCreated,
  download_software_clicked: messages.statusLabelDownloadSoftwareClicked,
  ready_to_start: messages.statusLabelReadyToStart,
  started: messages.statusLabelStarted,
  ready_to_submit: messages.statusLabelReadyToSubmit,
  submitted: messages.statusLabelSubmitted,
  verified: messages.statusLabelVerified,
  rejected: messages.statusLabelRejected,
  expired: messages.statusLabelExpired,
  second_review_required: messages.statusLabelSecondReviewRequired,
  error: messages.statusLabelError,
};

export const getMessageLabelForStatus = (status) => examAttemptStatusLabels[status];

export const createAllowanceData = (form) => {
  const data = [];
  const users = form.users.split(',').map((item) => item.trim());
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    Object.keys(form.exams).forEach(examId => {
      const timeLimitMins = form.exams[examId];
      let additionalTime;
      if (form['allowance-type'] === 'time-multiplier') {
        additionalTime = (Number(timeLimitMins) * Number(form['additional-time-multiplier'])) - Number(timeLimitMins);
      } else {
        additionalTime = Number(form['additional-time-minutes']);
      }

      const userKey = user.includes('@') ? 'email' : 'username';
      data.push({ [userKey]: user, exam_id: Number(examId), extra_time_mins: additionalTime });
    });
  }
  return data;
};
