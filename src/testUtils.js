/* eslint-disable import/prefer-default-export */
import React from 'react'
import { render } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
// As a basic setup, import your same slice reducers
import { reducer as examReducer } from './pages/ExamsPage/data/reducer';
import { reducer as requestsReducer } from './data/redux/requests';

// Hi, just added the line you just posted and just ran the tests again, i'm just looking at the results now
export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    // yeah doesn't work, so we need to pass it in
    store = configureStore({ reducer: { exams: examReducer, requests: requestsReducer, }, preloadedState: preloadedState }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

/**
 * Mocked formatMessage provided by react-intl
 */
export const formatMessage = (msg, values) => {
  let message = msg.defaultMessage;
  if (values === undefined) {
    return message;
  }
  // check if value is not a primitive type.
  if (Object.values(values).filter(value => Object(value) === value).length) {
    // eslint-disable-next-line react/jsx-filename-extension
    return <format-message-function {...{ message: msg, values }} />;
  }
  Object.keys(values).forEach((key) => {
    // eslint-disable-next-line
    message = message.replaceAll(`{${key}}`, values[key]);
  });
  return message;
};

// oh should i pass this into renderwithproviders?
export const defaultExamsData = {
  examsList: [
    { id: 1, name: 'exam1' },
  ],
  currentExamIndex: 0,
  currentExam: { id: 1, name: 'exam1' },
  // setCurrentExam: jest.fn(),
};

export const defaultAttemptsData = {
  attemptsList:
    [{
      exam_name: 'Exam 1',
      username: 'username1',
      time_limit: 60,
      exam_type: 'timed',
      started_at: '2023-04-05T19:27:16.000000Z',
      completed_at: '2023-04-05T19:27:17.000000Z',
      status: 'second_review_required',
      attempt_id: 0,
      severity: 1.0,
      submission_reason: 'Submitted by user',
    },
    {
      exam_name: 'Exam 2',
      username: 'username2',
      time_limit: 60,
      exam_type: 'proctored',
      started_at: '2023-04-05T19:37:16.000000Z',
      completed_at: '2023-04-05T19:37:17.000000Z',
      status: 'submitted',
      attempt_id: 1,
    }],
};

