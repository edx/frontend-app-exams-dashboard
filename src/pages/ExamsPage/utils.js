import { getExamsBaseUrl } from './data/api';

export const getLaunchUrlByExamId = (id) => `${getExamsBaseUrl()}/lti/exam/${id}/instructor_tool`;
