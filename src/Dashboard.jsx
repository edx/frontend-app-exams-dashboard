import SiteHeader from '@edx/frontend-component-header';
import SiteFooter from '@edx/frontend-component-footer';

import { useParams } from 'react-router';
import { useLocation } from 'react-router-dom';

import ExamsPage from './pages/ExamsPage';

const Dashboard = () => {
  const { courseId } = useParams();
  const { pathname } = useLocation();
  // show or hide header/footer depending on if this app is embedded in instructor dashboard or
  // standalone. If no need for a standalone version, this feature can be removed.
  return (
    <div>
      {!pathname.includes('/embed') && <SiteHeader />}
      <ExamsPage courseId={courseId} />
      {!pathname.includes('/embed') && <SiteFooter />}
    </div>
  );
};

export default Dashboard;
