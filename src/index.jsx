import 'core-js/stable';
import 'regenerator-runtime/runtime';

import {
  APP_INIT_ERROR, APP_READY, subscribe, initialize,
} from '@edx/frontend-platform';
import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router-dom';

import store from 'data/store';
import messages from './i18n';

import './index.scss';
import Dashboard from './Dashboard';
import ExamsPage from './ExamsPage';

subscribe(APP_READY, () => {
  ReactDOM.render(
    <AppProvider store={store}>
      <Switch>
        <Route
          path="/exams/course/:courseId"
          render={({ match }) => {
            const { params: { courseId } } = match;
            return (
              <Dashboard>
                <ExamsPage courseId={courseId} />
              </Dashboard>
            );
          }}
        />
      </Switch>
    </AppProvider>,
    document.getElementById('root'),
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  ReactDOM.render(<ErrorPage message={error.message} />, document.getElementById('root'));
});

initialize({
  messages,
  requireAuthenticatedUser: true,
});
