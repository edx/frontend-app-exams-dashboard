import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import PropTypes from 'prop-types';
import { AppProvider } from '@edx/frontend-platform/react';
import { createStore } from 'redux';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { mergeConfig } from '@edx/frontend-platform';
import { render as rtlRender } from '@testing-library/react';

import defaultStore from './data/store';
import rootReducer from './data/redux';

export const authenticatedUser = {
  userId: 'abc123',
  username: 'MockUser',
  roles: [],
  administrator: false,
};

mergeConfig({
  ...process.env,
  authenticatedUser: {
    userId: 'abc123',
    username: 'MockUser',
    roles: [],
    administrator: false,
  },
  EXAMS_BASE_URL: 'http://example.com',
});

class ResizeObserver {
  observe() {
    // do nothing
  }

  unobserve() {
    // do nothing
  }

  disconnect() {
    // do nothing
  }
}

let globalStore = defaultStore;

export function initializeTestStore(preloadedState = null, overrideStore = true) {
  let store = createStore(rootReducer);
  if (preloadedState) {
    store = createStore(rootReducer, preloadedState);
  }
  if (overrideStore) {
    globalStore = store;
  }
  return store;
}

function render(
  ui,
  {
  // eslint-disable-next-line no-unused-vars
    store = null,
    // eslint-disable-next-line no-unused-vars
    wrapWithRouter = false,
    ...renderOptions
  } = {},
) {
  const Wrapper = ({ children }) => (
    // eslint-disable-next-line react/jsx-filename-extension
    <AppProvider store={store || globalStore}>
      <IntlProvider locale="en">
        {children}
      </IntlProvider>
    </AppProvider>
  );

  Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

window.ResizeObserver = ResizeObserver;

// Override `render` method.
export {
  render,
};
