import { ensureConfig, getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

function getExamsBaseUrl() {
  ensureConfig([
    'EXAMS_BASE_URL',
  ]);
  return getConfig().EXAMS_BASE_URL;
}

/* eslint-disable import/prefer-default-export */
export async function getCourseExams(courseId) {
  const url = `${getExamsBaseUrl()}/api/v1/exams/course_id/${courseId}/`;
  const response = await getAuthenticatedHttpClient().get(url);
  return response.data;
}

function generateRandomString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

// TODO: Instead of just generating data in the frontend,
// Make a script that makes 10000 calls to edx-exams to
// create 10000+ exam attempts
// then call those exam attempts from the api
const generateBigData = () => {
  let bigArray = [];
  for (let i = 0; i <= 20000; i++) {
    const mockAttempt = {
      exam_display_name: generateRandomString(10),
      username: generateRandomString(10),
      allowed_time_limit_mins: generateRandomString(10),
      exam_type: generateRandomString(10),
      start_time: generateRandomString(10),
      end_time: generateRandomString(10),
      attempt_status: generateRandomString(10),
    }
    bigArray.push(mockAttempt);
  }
  return {
    data: {
      results: bigArray,
    },
  }
}

/* eslint-disable import/prefer-default-export */
export async function getExamAttempts(examId) {
  const url = `${getExamsBaseUrl()}/api/v1/instructor_view/attempts?exam_id=${examId}`;
  // const response = await getAuthenticatedHttpClient().get(url);
  const response = generateBigData();
  console.log("RESPONSE:", response)
  return response.data;
}
