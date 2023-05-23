import PropTypes from 'prop-types';
import SiteHeader from '@edx/frontend-component-header';
import SiteFooter from '@edx/frontend-component-footer';

import { useLocation } from 'react-router-dom';

const ExamsDashboardPage = ({ children }) => {
  const { pathname } = useLocation();
  // show or hide header/footer depending on if this app is embedded in instructor dashboard or
  // standalone. If no need for a standalone version, this feature can be removed.
  return (
    <div>
      {!pathname.includes('/embed') && <SiteHeader />}
      {children}
      {!pathname.includes('/embed') && <SiteFooter />}
    </div>
  );
};

ExamsDashboardPage.propTypes = {
  children: PropTypes.node,
};

ExamsDashboardPage.defaultProps = {
  children: null,
};

export default ExamsDashboardPage;
