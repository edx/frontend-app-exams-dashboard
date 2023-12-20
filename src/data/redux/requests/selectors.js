import { RequestStates } from 'data/constants';

export const requestStatus = (state, { requestKey }) => state.requests[requestKey];

const statusSelector = (fn) => (requestKey) => (state) => {
  if (state.requests[requestKey] === undefined) {
    throw new TypeError(`The request with RequestKey ${requestKey} is missing an initial state. \
    If you see this error, then you must initialize your request statuses in the initialState variable in \
    src/data/redux/requests/reducer.js \n\n \
    This error replaces this otherwise vague error: TypeError: Cannot destructure property 'status' of '_ref3' as it is undefined.`);
  }
  return fn(state.requests[requestKey]);
};

export const isInactive = ({ status }) => status === RequestStates.inactive;
export const isPending = ({ status }) => status === RequestStates.pending;
export const isCompleted = ({ status }) => status === RequestStates.completed;
export const isFailed = ({ status }) => status === RequestStates.failed;
export const error = (request) => request.error;
export const errorStatus = (request) => request.error?.response?.status;
export const errorCode = (request) => request.error?.response?.data;

export const data = (request) => request.data;

export default {
  requestStatus,
  isInactive: statusSelector(isInactive),
  isPending: statusSelector(isPending),
  isCompleted: statusSelector(isCompleted),
  isFailed: statusSelector(isFailed),
  error: statusSelector(error),
  errorCode: statusSelector(errorCode),
  errorStatus: statusSelector(errorStatus),
  data: statusSelector(data),
};
