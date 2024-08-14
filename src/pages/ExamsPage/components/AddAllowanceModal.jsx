import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  ModalDialog,
  Form,
  ActionRow,
  StatefulButton,
} from '@openedx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import * as constants from '../../../data/constants';
import { useFilteredExamsData, useCreateOrUpdateAllowance, useButtonStateFromRequestStatus } from '../hooks';
import messages from '../messages';

const AddAllowanceModal = ({ isOpen, close }) => {
  const { proctoredExams, timedExams } = useFilteredExamsData();

  const defaultExamType = proctoredExams.length > 0 ? 'proctored' : 'timed';
  const defaultExamsList = defaultExamType === 'proctored' ? proctoredExams : timedExams;

  const initialFormState = {
    'allowance-type': 'additional-minutes',
    'exam-type': defaultExamType,
    exams: {},
  };

  const [displayExams, setDisplayExams] = useState(defaultExamsList);
  const [form, setForm] = useState(initialFormState);
  const [learnerFieldError, setLearnerFieldError] = useState(false);
  const [examFieldError, setExamFieldError] = useState(false);
  const [additionalTimeError, setAdditionalTimeError] = useState(false);
  const createAllowanceRequestStatus = useButtonStateFromRequestStatus(constants.RequestKeys.createAllowance);
  const createAllowance = useCreateOrUpdateAllowance();
  // const isCreate = useState(true);
  const { formatMessage } = useIntl();

  const handleExamTypeChange = (examType) => {
    if (examType === 'proctored') {
      setDisplayExams(proctoredExams);
    } else {
      setDisplayExams(timedExams);
    }
    // reset exam selection state
    setForm(prev => ({ ...prev, exams: {} }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (name === 'exam-type') {
      handleExamTypeChange(value);
    }
  };

  const handleCheckboxChange = (event) => {
    const el = event.target;
    const id = el.getAttribute('data-key');
    const timeLimitMins = el.value;
    const selectedExams = { ...form.exams };

    if (el.checked) {
      selectedExams[id] = timeLimitMins;
    } else {
      delete selectedExams[id];
    }
    setForm(prev => ({ ...prev, exams: selectedExams }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLearnerFieldError(!form.users);
    setExamFieldError(Object.keys(form.exams).length === 0);
    setAdditionalTimeError(!form['additional-time-minutes'] && !form['additional-time-multiplier']);
    const valid = (
      form.users
        && Object.keys(form.exams).length > 0
        && (form['additional-time-minutes'] || form['additional-time-multiplier'])
    );
    if (valid) {
      createAllowance(form, close);
      setForm(initialFormState);
    }
  };

  return (
    <ModalDialog
      title={formatMessage(messages.addAllowanceModalTitle)}
      isOpen={isOpen}
      onClose={close}
      size="md"
      hasCloseButton
      isFullscreenOnMobile
    >
      <ModalDialog.Header>
        <ModalDialog.Title>
          { formatMessage(messages.addAllowanceModalTitle) }
        </ModalDialog.Title>
      </ModalDialog.Header>
      <ModalDialog.Body>
        <Form id="add-allowance-form" onSubmit={onSubmit}>
          <Form.Group isInvalid={learnerFieldError}>
            <Form.Label>{ formatMessage(messages.addAllowanceLearnerField) }</Form.Label>
            <Form.Control name="users" value={form.users || ''} onChange={handleChange} data-testid="users" />
            { !learnerFieldError
              ? (
                <Form.Control.Feedback>
                  { formatMessage(messages.addAllowanceLearnerFieldFeedback) }
                </Form.Control.Feedback>
              )
              : (
                <Form.Control.Feedback type="invalid">
                  { formatMessage(messages.addAllowanceLearnerFieldErrorFeedback) }
                </Form.Control.Feedback>
              )}
          </Form.Group>
          <Form.Group controlId="form-exam-type">
            <Form.Label>{ formatMessage(messages.addAllowanceExamTypeField) }</Form.Label>
            <Form.Control
              as="select"
              onChange={handleChange}
              name="exam-type"
              value={form['exam-type']}
              data-testid="exam-type"
            >
              {
                proctoredExams.length > 0
                && <option value="proctored">{ formatMessage(messages.addAllowanceProctoredExamOption) }</option>
              }
              {
                timedExams.length > 0
                && <option value="timed">{ formatMessage(messages.addAllowanceTimedExamOption) }</option>
              }
            </Form.Control>
          </Form.Group>
          { displayExams.length > 0 ? (
            <Form.Group isInvalid={examFieldError}>
              <Form.Label>{ formatMessage(messages.addAllowanceExamField) }</Form.Label>
              <Form.CheckboxSet
                name="exams"
                onChange={handleCheckboxChange}
              >
                {
                  displayExams.map((exam) => (
                    <Form.Checkbox
                      key={exam.id}
                      data-key={exam.id}
                      value={exam.timeLimitMins}
                    >
                      {exam.name}
                    </Form.Checkbox>
                  ))
                }
              </Form.CheckboxSet>
              { examFieldError && <Form.Control.Feedback type="invalid">{ formatMessage(messages.addAllowanceExamErrorFeedback) }</Form.Control.Feedback>}
            </Form.Group>
          ) : null }
          <Form.Group controlId="form-allowance-type">
            <Form.Label>{ formatMessage(messages.addAllowanceAllowanceTypeField) }</Form.Label>
            <Form.Control
              as="select"
              name="allowance-type"
              onChange={handleChange}
              value={form['allowance-type']}
              data-testid="allowance-type"
            >
              <option value="additional-minutes">{ formatMessage(messages.addAllowanceAdditionalMinutesOption) }</option>
              <option value="time-multiplier">{ formatMessage(messages.addAllowanceTimeMultiplierOption) }</option>
            </Form.Control>
          </Form.Group>
          { form['allowance-type'] === 'additional-minutes'
            ? (
              <Form.Group controlId="form-allowance-value-minutes" isInvalid={additionalTimeError}>
                <Form.Label>{ formatMessage(messages.addAllowanceMinutesField) }</Form.Label>
                <Form.Control
                  name="additional-time-minutes"
                  value={form['additional-time-minutes'] || ''}
                  onChange={handleChange}
                  data-testid="additional-time-minutes"
                />
                { additionalTimeError && <Form.Control.Feedback type="invalid">{ formatMessage(messages.addAllowanceMinutesErrorFeedback) }</Form.Control.Feedback> }
              </Form.Group>
            )
            : (
              <Form.Group controlId="form-allowance-value-multiplier" isInvalid={additionalTimeError}>
                <Form.Label>{ formatMessage(messages.addAllowanceMultiplierField) }</Form.Label>
                <Form.Control
                  name="additional-time-multiplier"
                  value={form['additional-time-multiplier'] || ''}
                  onChange={handleChange}
                />
                {
                  additionalTimeError
                    ? (
                      <Form.Control.Feedback type="invalid">
                        { formatMessage(messages.addAllowanceMultiplierFeedback) }
                      </Form.Control.Feedback>
                    )
                    : (
                      <Form.Control.Feedback>
                        { formatMessage(messages.addAllowanceMultiplierErrorFeedback) }
                      </Form.Control.Feedback>
                    )
                }
              </Form.Group>
            )}
        </Form>
      </ModalDialog.Body>

      <ModalDialog.Footer>
        <ActionRow>
          <ModalDialog.CloseButton variant="tertiary">
            { formatMessage(messages.addAllowanceCloseButton) }
          </ModalDialog.CloseButton>
          <StatefulButton
            data-testid="create-allowance-stateful-button"
            state={createAllowanceRequestStatus()}
            labels={{
              default: formatMessage(messages.addAllowanceButtonDefaultLabel),
              pending: formatMessage(messages.addAllowanceButtonPendingLabel),
              complete: formatMessage(messages.addAllowanceButtonCompleteLabel),
              error: formatMessage(messages.addAllowanceButtonErrorLabel),
            }}
            type="submit"
            form="add-allowance-form"
          />
        </ActionRow>
      </ModalDialog.Footer>
    </ModalDialog>
  );
};

AddAllowanceModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default AddAllowanceModal;
