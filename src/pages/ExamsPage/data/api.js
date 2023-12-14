import { ensureConfig, getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

export function getExamsBaseUrl() {
  ensureConfig([
    'EXAMS_BASE_URL',
  ]);
  return getConfig().EXAMS_BASE_URL;
}

export async function getCourseExams(courseId) {
  const url = `${getExamsBaseUrl()}/api/v1/exams/course_id/${courseId}/`;
  const response = await getAuthenticatedHttpClient().get(url);
  return response.data;
}

export async function getExamAttempts(courseId, examId) {
  const url = `${getExamsBaseUrl()}/api/v1/instructor_view/course_id/${courseId}/attempts?exam_id=${examId}&limit=1000000`;
  const response = await getAuthenticatedHttpClient().get(url);
  return response.data;
}

export async function deleteExamAttempt(attemptId) {
  const url = `${getExamsBaseUrl()}/api/v1/exams/attempt/${attemptId}`;
  const response = await getAuthenticatedHttpClient().delete(url);
  return response.data;
}

// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

export async function modifyExamAttempt(attemptId, action) {
  // Temporary sleep code so I can see the button in the pending state, will remove in final version
  // await sleep(2000);
  const url = `${getExamsBaseUrl()}/api/v1/exams/attempt/${attemptId}`;
  const payload = { action };
  const response = await getAuthenticatedHttpClient().put(url, payload);
  return response.data;
}
