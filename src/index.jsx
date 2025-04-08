import 'core-js/stable';
import 'regenerator-runtime/runtime';

import {
  APP_INIT_ERROR, APP_READY, subscribe, initialize, mergeConfig,
} from '@edx/frontend-platform';
import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';
import { IntlProvider } from 'react-intl';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { Route, Routes } from 'react-router-dom';

import store from 'data/store';
import messages from './i18n';

import './index.scss';
import Dashboard from './Dashboard';

const rootNode = createRoot(document.getElementById('root'));
subscribe(APP_READY, () => {
  rootNode.render(
    <StrictMode>
      <AppProvider store={store}>
        <IntlProvider locale="en">
          <Routes>
            <Route
              path="/course/:courseId/exams/*"
              element={<Dashboard />}
            />
          </Routes>
        </IntlProvider>
      </AppProvider>
    </StrictMode>,
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  rootNode.render(
    <IntlProvider locale="en">
      <ErrorPage message={error.message} />
    </IntlProvider>,
  );
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
