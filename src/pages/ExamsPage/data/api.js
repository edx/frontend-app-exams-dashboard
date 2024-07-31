import { ensureConfig, getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

export function getExamsBaseUrl() {
  ensureConfig([
    'EXAMS_BASE_URL',
  ]);
  return getConfig().EXAMS_BASE_URL;
}

export async function getAllowances(courseId) {
  const url = `${getExamsBaseUrl()}/api/v1/exams/course_id/${courseId}/allowances`;
  const response = await getAuthenticatedHttpClient().get(url);
  return response.data;
}

export async function deleteAllowance(courseId, allowanceId) {
  const url = `${getExamsBaseUrl()}/api/v1/exams/course_id/${courseId}/allowances/${allowanceId}`;
  const response = await getAuthenticatedHttpClient().delete(url);
  return response.data;
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

export async function modifyExamAttempt(attemptId, action) {
  const url = `${getExamsBaseUrl()}/api/v1/exams/attempt/${attemptId}`;
  const payload = { action };
  const response = await getAuthenticatedHttpClient().put(url, payload);
  return response.data;
}
