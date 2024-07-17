import PropTypes from 'prop-types';

import {
  Button,
} from '@openedx/paragon';
import { Add } from '@openedx/paragon/icons';
import { useIntl } from '@edx/frontend-platform/i18n';

import messages from '../messages';
import './AllowanceList.scss';

const AllowanceList = ({ allowances }) => {
  const { formatMessage } = useIntl();

  return (
    <>
      <div className="allowances-header">
        <h3 data-testid="allowances"> {formatMessage(messages.allowanceDashboardTabTitle)} </h3>
        <Button variant="outline-primary" iconBefore={Add} size="sm" className="header-allowance-button">
          {formatMessage(messages.allowanceButton)}
        </Button>
      </div>
      <div className="allowances-body">
        { allowances.length === 0
          ? (
            <>
              <h4> {formatMessage(messages.noAllowancesHeader)} </h4>
              <p> {formatMessage(messages.noAllowancesBody)} </p>
              <Button variant="primary" iconBefore={Add}>
                {formatMessage(messages.allowanceButton)}
              </Button>
            </>
          )
          : null }
      </div>
    </>
  );
};

AllowanceList.propTypes = {
  allowances: PropTypes.arrayOf(PropTypes.object).isRequired, // eslint-disable-line react/forbid-prop-types
};

export default AllowanceList;
