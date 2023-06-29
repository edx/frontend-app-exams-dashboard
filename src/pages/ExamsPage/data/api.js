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

export async function getExamAttempts(examId) {
  const url = `${getExamsBaseUrl()}/api/v1/instructor_view/attempts?exam_id=${examId}`;
  const response = await getAuthenticatedHttpClient().get(url);
  return response.data;
}

export async function deleteExamAttempt(attemptId) {
  const url = `${getExamsBaseUrl()}/api/v1/exams/attempt/${attemptId}`;
  const response = await getAuthenticatedHttpClient().delete(url);
  return response.data;
}
