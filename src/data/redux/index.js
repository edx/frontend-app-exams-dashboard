import { combineReducers } from 'redux';

import * as exams from 'pages/ExamsPage/data/reducer';
import * as requests from './requests';

const modules = {
  requests,
  exams,
};

const moduleProps = (propName) => Object.keys(modules).reduce(
  (obj, moduleKey) => {
    const value = modules[moduleKey][propName];
    return value ? { ...obj, [moduleKey]: value } : obj;
  },
  {},
);

// grab the reducer export for each module in 'modules'
// and combine them into a single root reducer. We follow
// the same pattern for actions and selectors.
const rootReducer = combineReducers(moduleProps('reducer'));

const actions = moduleProps('actions');

const selectors = moduleProps('selectors');

export { actions, selectors };

export default rootReducer;
