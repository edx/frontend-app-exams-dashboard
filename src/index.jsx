import 'core-js/stable';
import 'regenerator-runtime/runtime';

import {
  APP_INIT_ERROR, APP_READY, subscribe, initialize, mergeConfig,
} from '@edx/frontend-platform';
import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';
import ReactDOM from 'react-dom';
import { Route, Routes } from 'react-router-dom';

import store from 'data/store';
import messages from './i18n';

import './index.scss';
import Dashboard from './Dashboard';

subscribe(APP_READY, () => {
  ReactDOM.render(
    <AppProvider store={store}>
      <Routes>
        <Route
          path="/course/:courseId/exams/*"
          element={<Dashboard />}
        />
      </Routes>
    </AppProvider>,
    document.getElementById('root'),
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  ReactDOM.render(<ErrorPage message={error.message} />, document.getElementById('root'));
});

initialize({
  handlers: {
    config: () => {
      mergeConfig({
        SUPPORT_URL: process.env.SUPPORT_URL || null,
        SUPPORT_EMAIL: process.env.SUPPORT_EMAIL || null,
        EXAMS_BASE_URL: process.env.EXAMS_BASE_URL || null,
      });
    },
  },
  messages,
  requireAuthenticatedUser: true,
});
