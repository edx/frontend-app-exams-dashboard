import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

// TODO: Tutor specific issue I haven't solved w/ configuring the base url
const examsBaseUrl = getConfig().EXAMS_BASE_URL || 'http://exams.local.overhang.io:8740'

export async function getCourseExams(courseId) {
  const url = `${examsBaseUrl}/api/v1/exams/course_id/${courseId}/`;
  const response = await getAuthenticatedHttpClient().get(url);
  return response.data;
}
