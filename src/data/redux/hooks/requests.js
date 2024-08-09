import { useSelector, useDispatch } from 'react-redux';

import * as redux from 'data/redux';
import * as module from './requests'; // eslint-disable-line import/no-self-import

const selectors = redux.selectors.requests;
const actions = redux.actions.requests;

export const statusSelector = selector => (requestName) => useSelector(selector(requestName));
export const useRequestIsPending = module.statusSelector(selectors.isPending);
export const useRequestIsFailed = module.statusSelector(selectors.isFailed);
export const useRequestIsCompleted = module.statusSelector(selectors.isCompleted);
export const useRequestIsInactive = module.statusSelector(selectors.isInactive);
export const useRequestError = module.statusSelector(selectors.error);
export const useRequestErrorCode = module.statusSelector(selectors.errorCode);
export const useRequestErrorStatus = module.statusSelector(selectors.errorStatus);
export const useRequestData = module.statusSelector(selectors.data);

export const useMakeNetworkRequest = () => {
  const dispatch = useDispatch();
  return ({
    requestKey,
    promise,
    onSuccess,
    onFailure,
  }) => {
    dispatch(actions.startRequest({ requestKey }));
    return promise.then((response) => {
      if (onSuccess) { onSuccess(response); }
      dispatch(actions.completeRequest({ requestKey, response }));
    }).catch((error) => {
      // Parse backend error from axios object
      let errorParsed = error;
      if (error?.customAttributes?.httpErrorResponseData) {
        errorParsed = JSON.parse(error.customAttributes.httpErrorResponseData);
      }
      if (onFailure) { onFailure(errorParsed); }
      dispatch(actions.failRequest({ requestKey, error: errorParsed }));
    });
  };
};

export const useClearRequest = (requestKey) => {
  const dispatch = useDispatch();
  return () => {
    dispatch(actions.clearRequest({ requestKey }));
  };
};
